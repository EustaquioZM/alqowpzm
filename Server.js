require('dotenv').config();
const express = require('express');
const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');
const OpenAI = require('openai');
const chromium = require('@sparticuz/chromium');

const {
  LOGIN_URL,
  HORARIO_URL,
  NOTAS_URL,
  HISTORIAL_URL = 'https://intranet.ucss.edu.pe/ucss-intranet/academico/historial.aspx',
  CTA_CTE_URL = 'https://intranet.ucss.edu.pe/ucss-intranet/academico/cta-cte.aspx',
  groqConfig
} = require('./Server/config');

const {
  buscarRespuestaPreprogramada,
  obtenerListaPreguntas,
  normalizarTexto
} = require('./Server/preprogrammedData');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Instancia del cliente OpenAI apuntando a la API de Groq
const groqClient = new OpenAI({ ...groqConfig });

// Cargar base de conocimiento institucional (.txt)
let CONOCIMIENTO_TXT = '';
try {
  if (fs.existsSync(path.join(__dirname, 'datos.txt'))) {
    CONOCIMIENTO_TXT = fs.readFileSync(path.join(__dirname, 'datos.txt'), 'utf-8');
  } else if (fs.existsSync(path.join(__dirname, 'data_institucional.txt'))) {
    CONOCIMIENTO_TXT = fs.readFileSync(path.join(__dirname, 'data_institucional.txt'), 'utf-8');
  }
} catch (e) {
  console.log('Advertencia: No se pudo leer el archivo de datos institucional.');
}

// Memoria de sesión activa
let sesionUsuario = {
  autenticado: false,
  usuario: null,
  horario: [],
  notas: [],
  historial: null,
  cuentaCorriente: null
};

// --- RUTAS DE VISTAS ---
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/chat', (req, res) => res.sendFile(path.join(__dirname, 'chat.html')));

// --- ENDPOINT DE LOGIN Y SCRAPING RESILIENTE ---
app.post('/api/login', async (req, res) => {
  const { usuario, password } = req.body;
  let browser = null;

  try {
      const isProduction = process.env.NODE_ENV === 'production' || process.env.RENDER;

    // Resolver executablePath de forma segura
    let execPath;
    if (isProduction) {
      execPath = typeof chromium.executablePath === 'function' 
        ? await chromium.executablePath() 
        : await chromium.executablePath;
    } else {
      // Ruta local por defecto de Chrome en Windows (o cámbiala por la tuya si difiere)
      execPath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'; 
    }

    browser = await puppeteer.launch({
      args: isProduction ? chromium.args : ['--no-sandbox', '--disable-setuid-sandbox'],
      defaultViewport: chromium.defaultViewport,
      executablePath: execPath,
      headless: isProduction ? chromium.headless : true
    });

    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    // 1. Autenticación
    await page.goto(LOGIN_URL, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForSelector('#txtUsuarioMail', { timeout: 10000 });

    await page.type('#txtUsuarioMail', usuario);
    await page.type('#txtPwd', password);

    await Promise.all([
      page.click('#btnIngresar'),
      page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 30000 }).catch(() => {})
    ]);

    if (page.url().includes('ingresar.aspx')) {
      await browser.close();
      return res.json({ success: false, message: 'Usuario o contraseña incorrectos.' });
    }

    // Inicializar contenedores de datos de la sesión
    let horarioExtraido = [];
    let notasExtraidas = [];
    let historialExtraido = null;
    let cuentaCorrienteExtraida = null;

    // 2. Extraer Horario
    try {
      await page.goto(HORARIO_URL, { waitUntil: 'networkidle2', timeout: 30000 });
      await page.waitForSelector('#cphBody_grvHorario', { timeout: 8000 }).catch(() => {});

      horarioExtraido = await page.evaluate(() => {
        const tabla = document.querySelector('#cphBody_grvHorario');
        if (!tabla) return [];
        const filas = Array.from(tabla.querySelectorAll('tr')).slice(1);
        const mapaDias = { 'LUN': 'Lunes', 'MAR': 'Martes', 'MIE': 'Miércoles', 'JUE': 'Jueves', 'VIE': 'Viernes', 'SAB': 'Sábado', 'DOM': 'Domingo' };

        return filas.map(fila => {
          const c = fila.querySelectorAll('td');
          if (c.length < 6) return null;
          const horas = c[2].innerText.trim().split('-');
          const enlaceZoom = c[6]?.querySelector('a')?.href || c[6]?.innerText.trim() || null;

          return {
            idCarga: c[0].innerText.trim(),
            dia: mapaDias[c[1].innerText.trim()] || c[1].innerText.trim(),
            horaInicio: horas[0] ? horas[0].trim() : '',
            horaFin: horas[1] ? horas[1].trim() : '',
            curso: c[3].innerText.trim(),
            seccion: c[4].innerText.trim(),
            aula: c[5].innerText.trim(),
            linkZoom: (enlaceZoom && enlaceZoom.startsWith('http')) ? enlaceZoom : null
          };
        }).filter(Boolean);
      });
      console.log('✅ Scraping de Horario exitoso.');
    } catch (errHorario) {
      console.error('⚠️ Error al extraer Horario:', errHorario.message);
    }

    // 3. Extraer Notas del Semestre
    try {
      await page.goto(NOTAS_URL, { waitUntil: 'networkidle2', timeout: 30000 });
      await page.waitForSelector('.css-curso-card', { timeout: 8000 }).catch(() => {});

      notasExtraidas = await page.evaluate(() => {
        const tarjetas = Array.from(document.querySelectorAll('.css-curso-card'));
        return tarjetas.map(card => {
          const parrafos = Array.from(card.querySelectorAll('.css-curso-card-body p'));
          const curso = parrafos[1] ? parrafos[1].innerText.trim() : '';

          const itemsMetadata = card.querySelectorAll('.css-curso-card-body-cred-tipo-item');
          const codigo = itemsMetadata[0]?.innerText.replace('CÓD.:', '').trim() || '';
          const creditos = itemsMetadata[1]?.innerText.replace('CRÉD.:', '').trim() || '';
          const tipo = itemsMetadata[2]?.innerText.replace('TIPO:', '').trim() || '';

          const docenteEl = parrafos.find(p => p.innerText.includes('DOCENTE:'));
          const docente = docenteEl ? docenteEl.innerText.replace('DOCENTE:', '').trim() : '';

          const tablaG = card.querySelectorAll('.css-curso-card-tabla-notas')[0];
          const notasPrincipales = {};
          if (tablaG) {
            const ths = Array.from(tablaG.querySelectorAll('th')).map(t => t.innerText.trim());
            const tds = Array.from(tablaG.querySelectorAll('td')).map(t => t.innerText.trim());
            ths.forEach((h, i) => notasPrincipales[h] = tds[i] || '');
          }

          const tablaEC = card.querySelectorAll('.css-curso-card-tabla-notas')[1];
          const evaluacionesContinuas = {};
          if (tablaEC) {
            const thsEC = Array.from(tablaEC.querySelectorAll('th:not(.d-none)')).map(t => t.innerText.trim());
            const tdsEC = Array.from(tablaEC.querySelectorAll('td:not(.d-none)')).map(t => t.innerText.trim());
            thsEC.forEach((h, i) => evaluacionesContinuas[h] = tdsEC[i] || '');
          }

          return { codigo, curso, creditos, tipo, docente, notasPrincipales, evaluacionesContinuas };
        });
      });
      console.log('✅ Scraping de Notas exitoso.');
    } catch (errNotas) {
      console.error('⚠️ Error al extraer Notas:', errNotas.message);
    }

    // 4. Extraer Historial Académico
    try {
      await page.goto(HISTORIAL_URL, { waitUntil: 'networkidle2', timeout: 30000 });

      const resumen = await page.evaluate(() => {
        const getTxt = (id) => document.querySelector(`#${id}`)?.innerText.trim() || 'N/A';
        return {
          creditosObligatoriosAprobados: getTxt('cphBody_lblCredObligAprob'),
          creditosElectivosConsiderados: getTxt('cphBody_lblCredElectConsid'),
          creditosObligatoriosPendientes: getTxt('cphBody_lblCredObligPend'),
          creditosElectivosPendientes: getTxt('cphBody_lblCredElectPend'),
          creditosRequeridosEgreso: getTxt('cphBody_lblCredReqEgreso'),
          cursosObligatoriosPendientes: getTxt('cphBody_lblCursosObligPend'),
          promedioPonderadoHistorico: getTxt('cphBody_lblPPH'),
          promedioPonderadoEvolutivo: getTxt('cphBody_lblPPE'),
          promedioPonderadoSemestral: getTxt('cphBody_lblPPS')
        };
      });

      let cursosPendientes = [];
      if (await page.$('label[for="btnPendientes"]')) {
        await page.click('label[for="btnPendientes"]').catch(() => {});
        cursosPendientes = await page.evaluate(() => {
          const tabla = document.querySelector('#cphBody_grvCursoPend');
          if (!tabla) return [];
          const filas = Array.from(tabla.querySelectorAll('tr')).slice(1);
          return filas.map(f => {
            const c = f.querySelectorAll('td');
            if (c.length < 6) return null;
            return {
              ciclo: c[0].innerText.trim(),
              codigo: c[1].innerText.trim(),
              curso: c[2].innerText.trim(),
              creditos: c[3].innerText.trim(),
              vecesCursado: c[4].innerText.trim(),
              prerrequisitos: c[5].innerText.trim()
            };
          }).filter(Boolean);
        });
      }

      let cursosAprobados = [];
      if (await page.$('label[for="btnAprobados"]')) {
        await page.click('label[for="btnAprobados"]').catch(() => {});
        cursosAprobados = await page.evaluate(() => {
          const tabla = document.querySelector('#cphBody_grvCursoAprob');
          if (!tabla) return [];
          const filas = Array.from(tabla.querySelectorAll('tr')).slice(1);
          return filas.map(f => {
            const c = f.querySelectorAll('td');
            if (c.length < 6) return null;
            return {
              semestre: c[0].innerText.trim(),
              codigo: c[1].innerText.trim(),
              curso: c[2].innerText.trim(),
              creditos: c[3].innerText.trim(),
              nota: c[4].innerText.trim(),
              docente: c[5].innerText.trim()
            };
          }).filter(Boolean);
        });
      }

      historialExtraido = { resumen, cursosPendientes, cursosAprobados };
      console.log('✅ Scraping de Historial Académico exitoso.');
    } catch (errHistorial) {
      console.error('⚠️ Error al extraer Historial Académico:', errHistorial.message);
    }

    // 5. Extraer Cuenta Corriente / Pagos / Deudas
    try {
      await page.goto(CTA_CTE_URL, { waitUntil: 'networkidle2', timeout: 30000 });
      cuentaCorrienteExtraida = await page.evaluate(() => {
        const tabla = document.querySelector('table.css-cta-cte-resumen-table');
        if (!tabla) return { detalle: [], deudaTotal: '0.00' };

        const filas = Array.from(tabla.querySelectorAll('tbody tr'));
        const detalle = [];
        let deudaTotal = '0.00';

        filas.forEach(f => {
          const c = f.querySelectorAll('td');
          if (c.length === 4) {
            detalle.push({
              periodo: c[0].innerText.trim(),
              creditos: c[1].innerText.trim(),
              categoria: c[2].innerText.trim(),
              saldo: c[3].innerText.trim()
            });
          } else if (c.length === 2) {
            deudaTotal = c[1].innerText.trim();
          }
        });

        return { detalle, deudaTotal };
      });
      console.log('✅ Scraping de Cuenta Corriente/Pagos exitoso.');
    } catch (errCta) {
      console.error('⚠️ Error al extraer Cuenta Corriente:', errCta.message);
    }

    await browser.close();

    // Guardar en la sesión global del usuario
    sesionUsuario = {
      autenticado: true,
      usuario,
      horario: horarioExtraido,
      notas: notasExtraidas,
      historial: historialExtraido,
      cuentaCorriente: cuentaCorrienteExtraida
    };

    return res.json({ success: true, message: 'Autenticación e integración completadas.', redirectUrl: '/chat' });

  } catch (error) {
    if (browser) await browser.close();
    console.error('Error general durante la autenticación:', error.message);
    return res.status(500).json({ success: false, message: 'Error en la autenticación: ' + error.message });
  }
});

// --- FUNCIÓN LIMPIADORA DE FORMATO SIMPLE (SIN NEGRITAS, SIN TABLAS) ---
function limpiarFormatoSimple(texto) {
  if (!texto || typeof texto !== 'string') return '';
  return texto
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    .replace(/^\|[^\n]+\|$/gm, (match) => {
      // Reemplazar tuberías por espacios para eliminar tablas Markdown
      const celdas = match.split('|').map(c => c.trim()).filter(Boolean);
      return celdas.join(' - ');
    })
    .replace(/^[-|:\s]{4,}$/gm, '')
    .trim();
}

function obtenerContextoInstitucionalSeleccionado(mensaje, sesion = sesionUsuario) {
  if (!CONOCIMIENTO_TXT || !CONOCIMIENTO_TXT.trim()) {
    return '';
  }

  const bloques = CONOCIMIENTO_TXT
    .replace(/\r/g, '')
    .split(/\n\s*\n+/)
    .map(b => b.trim())
    .filter(b => b.length > 80);

  if (bloques.length === 0) {
    return '';
  }

  const msgNorm = normalizarTexto(mensaje);
  const preguntaTokens = new Set(
    msgNorm
      .split(/\s+/)
      .filter(t => t.length >= 3 && !['como', 'cual', 'donde', 'cuando', 'que', 'para', 'de', 'la', 'del', 'las', 'los', 'por', 'con', 'una', 'una', 'este', 'esta', 'sobre', 'porque', 'cuanto', 'son', 'sus'].includes(t))
  );

  const infoTokens = new Set();
  if (sesion && sesion.autenticado) {
    const cursos = Array.isArray(sesion.horario) ? sesion.horario.map(h => h.curso || '') : [];
    cursos.forEach(c => {
      const tc = normalizarTexto(c).split(/\s+/);
      tc.forEach(t => {
        if (t.length >= 3) infoTokens.add(t);
      });
    });
  }

  const scored = bloques.map(bloque => {
    const bloqueNorm = normalizarTexto(bloque);
    let score = 0;
    const overlap = Array.from(preguntaTokens).filter(t => bloqueNorm.includes(t)).length;
    const overlapInfo = Array.from(infoTokens).filter(t => bloqueNorm.includes(t)).length;

    score += overlap * 4;
    score += overlapInfo * 3;

    // bonificación si el bloque presenta las palabras del mensaje o sus variantes
    Array.from(preguntaTokens).forEach(token => {
      if (bloqueNorm.includes(token)) score += 1.5;
    });

    // penalización por chunks demasiado largos, para no saturar el contexto
    score -= Math.max(0, bloque.length - 450) / 180;

    return { bloque, score };
  });

  const relevantes = scored
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  if (relevantes.length === 0) {
    return bloques[0].slice(0, 900);
  }

  let contexto = '';
  let size = 0;
  const maxChars = 1800;

  for (const item of relevantes) {
    if (size + item.bloque.length > maxChars) {
      continue;
    }
    contexto += `${item.bloque}\n\n`;
    size += item.bloque.length;
  }

  if (!contexto.trim()) {
    return bloques[0].slice(0, maxChars);
  }

  return contexto.trim();
}

// Determinar si una consulta solicita información privada o académica del estudiante
function esConsultaPrivada(mensaje, cursos = []) {
  const norm = normalizarTexto(mensaje);

  const frasesPrivadas = [
    'mi nota', 'mis notas', 'mi horario', 'mis clases', 'que clases tengo',
    'tengo clases', 'me toca hoy', 'tengo hoy', 'clases hoy', 'mis cursos',
    'mi curso', 'mi pph', 'mi pps', 'mi ppe', 'mi promedio', 'mis deudas',
    'mi saldo', 'mi deuda', 'cuanto debo', 'tengo deudas', 'mis cursos pendientes',
    'cursos pendientes', 'cursos aprobados', 'mis clases virtuales', 'mis links de zoom',
    'mi cuenta corriente', 'quien es mi docente', 'quien me ensena', 'cuanto tengo en',
    'cuanto saque en', 'mis calificaciones', 'cuanta nota tengo', 'cuanto tengo de nota'
  ];

  if (frasesPrivadas.some(fp => norm.includes(fp))) {
    return true;
  }

  // Comprobar si menciona alguno de los cursos del alumno junto con intención académica personal
  if (cursos && cursos.length > 0) {
    for (const curso of cursos) {
      const cNorm = normalizarTexto(curso);
      if (cNorm.length > 3 && norm.includes(cNorm)) {
        if (norm.includes('nota') || norm.includes('profesor') || norm.includes('docente') || norm.includes('toca') || norm.includes('clase') || norm.includes('horario') || norm.includes('cuanto')) {
          return true;
        }
      }
    }
  }

  // Expresiones en primera persona relativas al alumno
  if ((norm.startsWith('mi ') || norm.includes(' mi ') || norm.startsWith('mis ') || norm.includes(' mis ')) &&
      (norm.includes('nota') || norm.includes('curso') || norm.includes('clase') || norm.includes('horario') || norm.includes('profesor') || norm.includes('docente') || norm.includes('deuda') || norm.includes('saldo'))) {
    return true;
  }

  return false;
}

// Resolver consultas académicas directamente desde la sesión del usuario en texto plano
function manejarConsultaEstudiante(mensaje, sesion) {
  const norm = normalizarTexto(mensaje);
  const horario = sesion.horario || [];
  const notas = sesion.notas || [];
  const historial = sesion.historial || {};
  const cta = sesion.cuentaCorriente || { detalle: [], deudaTotal: '0.00' };

  // 1. ¿Qué clases tengo hoy?
  if (norm.includes('hoy') && (norm.includes('clase') || norm.includes('horario') || norm.includes('toca') || norm.includes('curso'))) {
    const dias = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
    const diaActual = dias[new Date().getDay()];
    const diaNombre = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'][new Date().getDay()];

    const clasesHoy = horario.filter(h => normalizarTexto(h.dia) === diaActual);
    if (clasesHoy.length === 0) {
      return `Hoy ${diaNombre} no tienes clases programadas en tu horario.`;
    }
    const lineas = clasesHoy.map(c => {
      const zoom = c.linkZoom ? `Enlace Zoom: ${c.linkZoom}` : 'Modalidad: Presencial / Aula tradicional';
      return `- ${c.curso}\n  Horario: ${c.horaInicio} a ${c.horaFin}\n  Aula: ${c.aula}\n  Sección: ${c.seccion}\n  ${zoom}`;
    });
    return `Tus clases para hoy (${diaNombre}) son:\n\n` + lineas.join('\n\n');
  }

  // 2. Clases virtuales y enlaces Zoom
  if ((norm.includes('virtual') || norm.includes('zoom')) && (norm.includes('clase') || norm.includes('link') || norm.includes('enlace') || norm.includes('horario'))) {
    const virtuales = horario.filter(h => h.linkZoom);
    if (virtuales.length === 0) {
      return "No tienes cursos con enlaces virtuales de Zoom registrados en tu horario actual.";
    }
    const lineas = virtuales.map(c => {
      return `- ${c.curso}\n  Día: ${c.dia} (${c.horaInicio} - ${c.horaFin})\n  Aula: ${c.aula}\n  Enlace Zoom: ${c.linkZoom}`;
    });
    return "Tus clases virtuales con enlaces de Zoom son:\n\n" + lineas.join('\n\n');
  }

  // 3. Clases por día de la semana
  const diasMap = {
    'lunes': 'Lunes',
    'martes': 'Martes',
    'miercoles': 'Miércoles',
    'jueves': 'Jueves',
    'viernes': 'Viernes',
    'sabado': 'Sábado',
    'sabados': 'Sábado',
    'domingo': 'Domingo'
  };
  for (const [dClave, dNombre] of Object.entries(diasMap)) {
    if (norm.includes(dClave) && (norm.includes('clase') || norm.includes('horario') || norm.includes('toca') || norm.includes('tengo'))) {
      const clasesDia = horario.filter(h => normalizarTexto(h.dia).startsWith(dClave.substring(0, 4)));
      if (clasesDia.length === 0) {
        return `No tienes clases programadas para los días ${dNombre}.`;
      }
      const lineas = clasesDia.map(c => {
        const zoom = c.linkZoom ? `Enlace Zoom: ${c.linkZoom}` : 'Modalidad: Presencial';
        return `- ${c.curso}\n  Horario: ${c.horaInicio} a ${c.horaFin}\n  Aula: ${c.aula}\n  Sección: ${c.seccion}\n  ${zoom}`;
      });
      return `Tus clases para los días ${dNombre} son:\n\n` + lineas.join('\n\n');
    }
  }

  // 4. Horario o días de un curso específico
  if (norm.includes('cuando tengo') || norm.includes('que dias me toca') || norm.includes('que dia me toca') || norm.includes('horario de') || norm.includes('clases de') || norm.includes('me toca')) {
    for (const item of horario) {
      const cursoNorm = normalizarTexto(item.curso);
      const palabrasCurso = cursoNorm.split(' ').filter(w => w.length > 3);
      if (cursoNorm.length > 3 && (norm.includes(cursoNorm) || palabrasCurso.some(p => norm.includes(p)))) {
        const clasesCurso = horario.filter(h => h.curso.toLowerCase() === item.curso.toLowerCase());
        const lineas = clasesCurso.map(c => {
          const zoom = c.linkZoom ? `Enlace Zoom: ${c.linkZoom}` : 'Modalidad: Presencial';
          return `- Día: ${c.dia}\n  Horario: ${c.horaInicio} a ${c.horaFin}\n  Aula: ${c.aula}\n  Sección: ${c.seccion}\n  ${zoom}`;
        });
        return `Horario de clases para ${item.curso}:\n\n` + lineas.join('\n\n');
      }
    }
  }

  // 5. Nota de un curso específico
  if (norm.includes('nota de') || norm.includes('nota en') || norm.includes('cuanto tengo en') || norm.includes('cuanto saque en') || norm.includes('calificacion de') || (norm.includes('nota') && !norm.includes('cuales son mis notas') && !norm.includes('todas mis notas'))) {
    for (const n of notas) {
      const cursoNorm = normalizarTexto(n.curso);
      const palabrasCurso = cursoNorm.split(' ').filter(w => w.length > 3);
      if (cursoNorm.length > 3 && (norm.includes(cursoNorm) || palabrasCurso.some(p => norm.includes(p)))) {
        let resp = `Calificaciones de ${n.curso} (Código: ${n.codigo || 'N/A'}, Créditos: ${n.creditos || 'N/A'}):\n`;
        resp += `Docente: ${n.docente || 'No registrado'}\n\n`;

        resp += 'Notas Principales:\n';
        const princip = Object.entries(n.notasPrincipales || {});
        if (princip.length > 0) {
          princip.forEach(([k, v]) => { resp += `  - ${k}: ${v || 'Pendiente'}\n`; });
        } else {
          resp += '  - Sin registros\n';
        }

        resp += '\nEvaluaciones Continuas:\n';
        const contin = Object.entries(n.evaluacionesContinuas || {});
        if (contin.length > 0) {
          contin.forEach(([k, v]) => { resp += `  - ${k}: ${v || 'Pendiente'}\n`; });
        } else {
          resp += '  - Sin registros\n';
        }
        return resp.trim();
      }
    }
  }

  // 6. Docente de un curso específico
  if (norm.includes('docente de') || norm.includes('profesor de') || norm.includes('profesora de') || norm.includes('quien me ensena') || norm.includes('quien ensena')) {
    for (const n of notas) {
      const cursoNorm = normalizarTexto(n.curso);
      const palabrasCurso = cursoNorm.split(' ').filter(w => w.length > 3);
      if (cursoNorm.length > 3 && (norm.includes(cursoNorm) || palabrasCurso.some(p => norm.includes(p)))) {
        return `El docente registrado para la asignatura ${n.curso} es: ${n.docente || 'No asignado en la Intranet'}.`;
      }
    }
  }

  // 7. Todas las notas del semestre
  if (norm.includes('mis notas') || norm.includes('cuales son mis notas') || norm.includes('todas mis notas') || norm.includes('resumen de notas')) {
    if (notas.length === 0) {
      return "No se encontraron notas registradas en tu semestre actual.";
    }
    const lineas = notas.map(n => {
      let bloque = `- ${n.curso} (Cód: ${n.codigo || 'N/A'})\n  Docente: ${n.docente || 'No asignado'}\n  Notas Principales:`;
      const p = Object.entries(n.notasPrincipales || {});
      if (p.length > 0) {
        bloque += '\n' + p.map(([k, v]) => `    * ${k}: ${v || '-'}`).join('\n');
      } else {
        bloque += ' Sin registrar';
      }
      return bloque;
    });
    return "Resumen de tus calificaciones del semestre actual:\n\n" + lineas.join('\n\n');
  }

  // 8. Historial académico, PPH, PPS, PPE y avance de créditos
  if (norm.includes('pph') || norm.includes('pps') || norm.includes('ppe') || norm.includes('promedio') || norm.includes('avance curricular') || norm.includes('creditos aprobados') || norm.includes('cuantos creditos')) {
    const res = historial.resumen || {};
    return "Resumen de Historial Académico y Promedios:\n\n" +
      `- Promedio Ponderado Histórico (PPH): ${res.promedioPonderadoHistorico || 'N/A'}\n` +
      `- Promedio Ponderado Semestral (PPS): ${res.promedioPonderadoSemestral || 'N/A'}\n` +
      `- Promedio Ponderado Evolutivo (PPE): ${res.promedioPonderadoEvolutivo || 'N/A'}\n` +
      `- Créditos Obligatorios Aprobados: ${res.creditosObligatoriosAprobados || '0'}\n` +
      `- Créditos Electivos Considerados: ${res.creditosElectivosConsiderados || '0'}\n` +
      `- Créditos Obligatorios Pendientes: ${res.creditosObligatoriosPendientes || '0'}\n` +
      `- Créditos Electivos Pendientes: ${res.creditosElectivosPendientes || '0'}\n` +
      `- Cursos Obligatorios Pendientes: ${res.cursosObligatoriosPendientes || '0'}\n` +
      `- Créditos Requeridos para Egreso: ${res.creditosRequeridosEgreso || 'N/A'}`;
  }

  // 9. Cursos pendientes
  if ((norm.includes('pendiente') || norm.includes('me falta') || norm.includes('debo') || norm.includes('por cursar')) && (norm.includes('curso') || norm.includes('materia') || norm.includes('asignatura'))) {
    const pendientes = historial.cursosPendientes || [];
    if (pendientes.length === 0) {
      return "No se encontraron cursos pendientes registrados en tu historial.";
    }
    const lineas = pendientes.map(c => {
      const req = c.prerrequisitos ? `Prerrequisito: ${c.prerrequisitos}` : 'Sin prerrequisito';
      return `- Ciclo ${c.ciclo}: ${c.curso} (Cód: ${c.codigo}, Créditos: ${c.creditos})\n  Veces cursado: ${c.vecesCursado} | ${req}`;
    });
    return "Cursos pendientes por cursar y aprobar:\n\n" + lineas.join('\n\n');
  }

  // 10. Cursos aprobados
  if (norm.includes('aprobad') && (norm.includes('curso') || norm.includes('materia') || norm.includes('asignatura') || norm.includes('historial') || norm.includes('mis'))) {
    const aprobados = historial.cursosAprobados || [];
    if (aprobados.length === 0) {
      return "No se encontraron cursos aprobados en tu historial académico.";
    }
    const lineas = aprobados.map(c => {
      return `- Semestre ${c.semestre}: ${c.curso} (Cód: ${c.codigo}, Créditos: ${c.creditos}, Nota: ${c.nota})`;
    });
    return "Cursos aprobados registrados en tu historial académico:\n\n" + lineas.join('\n');
  }

  // 11. Deudas y Cuenta Corriente
  if (norm.includes('deuda') || norm.includes('deudas') || norm.includes('cuanto debo') || norm.includes('saldo') || norm.includes('cuenta corriente') || norm.includes('cta cte')) {
    const detalle = cta.detalle || [];
    let resp = `Estado de Cuenta Corriente y Deudas:\n\n- Deuda Total: S/. ${cta.deudaTotal || '0.00'}\n\nDetalle por Periodos:\n`;
    if (detalle.length > 0) {
      resp += detalle.map(d => `- Periodo: ${d.periodo} | Categoría: ${d.categoria} | Créditos: ${d.creditos} | Saldo: S/. ${d.saldo}`).join('\n');
    } else {
      resp += '- No registras deudas pendientes en tus periodos académicos.';
    }
    return resp;
  }

  return null;
}

// --- ENDPOINTS AUXILIARES DE CONSULTA DIRECTA ---
app.get('/api/estado-sesion', (req, res) => {
  const cursosUnicos = (sesionUsuario.autenticado && sesionUsuario.horario)
    ? [...new Set(sesionUsuario.horario.map(item => item.curso))].filter(Boolean)
    : [];

  return res.json({
    success: true,
    autenticado: sesionUsuario.autenticado,
    usuario: sesionUsuario.usuario,
    cursos: cursosUnicos
  });
});

app.get('/api/preguntas-banco', (req, res) => {
  return res.json({
    success: true,
    preguntas: obtenerListaPreguntas()
  });
});

app.get('/api/cursos', (req, res) => {
  if (!sesionUsuario.autenticado || !sesionUsuario.horario) {
    return res.json({ success: true, cursos: [] });
  }
  const cursosUnicos = [...new Set(sesionUsuario.horario.map(item => item.curso))];
  return res.json({ success: true, cursos: cursosUnicos });
});

app.get('/api/notas', (req, res) => {
  if (!sesionUsuario.autenticado || !sesionUsuario.notas) {
    return res.json({ success: true, notas: [] });
  }
  return res.json({ success: true, notas: sesionUsuario.notas });
});

// --- ENDPOINT PRINCIPAL DEL CHAT (DECISIÓN: PERSONAL -> PREPROGRAMADA -> IA ÚLTIMO RECURSO) ---
app.post('/api/chat', async (req, res) => {
  const { mensaje } = req.body || {};

  if (!mensaje || !mensaje.trim()) {
    return res.json({ success: false, respuesta: 'No se recibió ningún mensaje.' });
  }

  const cursosUsuario = (sesionUsuario.autenticado && sesionUsuario.horario)
    ? [...new Set(sesionUsuario.horario.map(h => h.curso))].filter(Boolean)
    : [];

  // 1. Criterio 1: ¿Es una consulta privada sobre notas, horario, deudas o cursos personales?
  const requierePrivado = esConsultaPrivada(mensaje, cursosUsuario);

  if (requierePrivado) {
    if (!sesionUsuario.autenticado) {
      return res.json({
        success: true,
        requiereLogin: true,
        respuesta: "Para consultar tu información académica (horarios, notas, deudas, avance curricular o promedios) necesitas iniciar sesión con tu cuenta institucional. Puedes ingresar a la página de inicio para iniciar sesión."
      });
    }

    // Usuario autenticado: procesar consulta personal
    const respuestaEstudiante = manejarConsultaEstudiante(mensaje, sesionUsuario);
    if (respuestaEstudiante) {
      return res.json({
        success: true,
        respuesta: respuestaEstudiante,
        autenticado: true,
        origen: 'personal'
      });
    }
  }

  // 2. Criterio 2: Buscar en la base de preguntas preprogramadas institucionales de datos.txt
  const resPreprog = buscarRespuestaPreprogramada(mensaje);
  if (resPreprog.encontrada) {
    return res.json({
      success: true,
      respuesta: resPreprog.respuesta,
      autenticado: sesionUsuario.autenticado,
      origen: 'preprogramada'
    });
  }

  // 3. Criterio 3 (ÚLTIMO RECURSO): Modelo de Lenguaje de Inteligencia Artificial (Groq)
  let contextoPrivado = "";
  if (sesionUsuario.autenticado) {
    contextoPrivado = `
INFORMACIÓN ACADÉMICA DEL ESTUDIANTE:
- Horario de Clases: ${JSON.stringify(sesionUsuario.horario)}
- Calificaciones y Notas: ${JSON.stringify(sesionUsuario.notas)}
- Resumen Académico (PPH, PPS, Créditos): ${JSON.stringify(sesionUsuario.historial?.resumen || {})}
- Cursos Pendientes: ${JSON.stringify(sesionUsuario.historial?.cursosPendientes || [])}
- Cursos Aprobados: ${JSON.stringify(sesionUsuario.historial?.cursosAprobados || [])}
- Cuenta Corriente: ${JSON.stringify(sesionUsuario.cuentaCorriente || {})}
`;
  }

  const contextoInstitucionalSeleccionado = obtenerContextoInstitucionalSeleccionado(mensaje, sesionUsuario);

  const systemPrompt = `Eres el asistente virtual académico de la Universidad Católica Sedes Sapientiae (UCSS).
Responde de forma clara, directa, educada y concisa.

REGLAS DE FORMATO OBLIGATORIAS:
1. Responde únicamente en texto plano.
2. NO uses texto en negrita (está terminantemente prohibido usar asteriscos dobles **).
3. NO uses tablas de Markdown (evita tuberías | y separadores de tabla).
4. Para enumerar o listar información usa guiones simples (-) y saltos de línea claros y legibles estilo bloc de notas.

BASE DE CONOCIMIENTO INSTITUCIONAL UCSS:
${contextoInstitucionalSeleccionado || CONOCIMIENTO_TXT.slice(0, 1800)}

${contextoPrivado}`;

  try {
    const completion = await groqClient.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: mensaje }
      ],
      temperature: 0.3
    });

    const respuestaLimpia = limpiarFormatoSimple(completion.choices[0].message.content);

    return res.json({
      success: true,
      respuesta: respuestaLimpia,
      autenticado: sesionUsuario.autenticado,
      origen: 'ia'
    });

  } catch (error) {
    console.error('Error en el pipeline del chat con Groq:', error.message);
    return res.json({
      success: true,
      respuesta: "No se pudo consultar el modelo externo en este momento. Puedes formular tu pregunta sobre temas institucionales de la UCSS (admisión, trámites, becas, biblioteca, tópico, directores y reglamentos).",
      autenticado: sesionUsuario.autenticado,
      origen: 'fallback_error'
    });
  }
});

// Endpoint para cerrar sesión
app.post('/api/logout', (req, res) => {
  sesionUsuario = {
    autenticado: false,
    usuario: null,
    horario: [],
    notas: [],
    historial: null,
    cuentaCorriente: null
  };
  res.json({ success: true, message: "Sesión cerrada correctamente." });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor iniciado en http://localhost:${PORT}`));
