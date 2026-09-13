// Banco de preguntas preprogramadas institucionales basadas estrictamente en datos.txt
const bancoPreguntas = [
  // Misión y Visión
  "¿Cuál es la misión de la UCSS?",
  "¿Cuál es la visión al 2028 de la UCSS?",
  "¿En qué resolución se aprobaron la nueva misión y visión de la UCSS?",

  // Servicios y Contactos
  "¿Dónde queda el tópico y cuál es su horario?",
  "¿Cuál es el correo de servicio psicopedagógico y su horario?",
  "¿Cómo contactar a la defensoría universitaria?",
  "¿Dónde se ubica el lactario institucional?",
  "¿Cuáles son los horarios de tutoría y su ubicación?",
  "¿Cómo contactar a Asuntos Académicos (OAA)?",
  "¿Dónde solicito informes sobre becas y ayudas económicas?",
  "¿Cuál es el WhatsApp y correo de Becas y Ayudas Económicas?",
  "¿A qué hora son las misas en la capilla?",
  "¿Dónde queda la pastoral?",
  "¿Cuál es el horario de atención de la biblioteca y su nombre?",
  "¿Qué programas ofrece la Facultad de Ingeniería?",
  "¿Qué programas ofrece la Facultad de Ciencias Económicas y Comerciales?",
  "¿Qué programas ofrece la Facultad de Ciencias de la Educación y Humanidades?",
  "¿Qué programas ofrece la Facultad de Ciencias Agrarias y Ambientales?", 

  "¿Cuál es el contacto de la Facultad de Ciencias de la Salud?",
  "¿Cuál es el contacto de la Facultad de Ingeniería?",
  "¿Cuál es el contacto de Ciencias Económicas y Comerciales?",
  "¿Cuál es el número y contacto de la Facultad de Derecho?",
  "¿Cuál es el contacto de Ciencias Agrarias y Ambientales?",
  "¿Cuál es el contacto de Educación y Humanidades?",
  "¿Dónde queda el Departamento de Estudios Generales?",

  // Licenciamiento SUNEDU
  "¿La UCSS cuenta con Licenciamiento de SUNEDU?",
  "¿Cuáles son las sedes y filiales autorizadas por SUNEDU?",
  "¿Cuántos programas académicos tiene autorizados la UCSS por SUNEDU?",
  "¿Cuáles fueron los programas desistidos o cancelados según SUNEDU?",
  "¿Cuáles fueron los requerimientos de SUNEDU en la licencia?",

  // Ficha Técnica y Datos Institucionales
  "¿Cuándo se creó la UCSS y cuál es su tipo de gestión?",
  "¿Cuál es la población estudiantil y cómo se distribuye?",
  "¿Qué es el programa Nopoki en Atalaya y cuál es su enfoque?",
  "¿Con qué infraestructura y laboratorios cuenta la UCSS?",
  "¿Cuántos docentes tiene la universidad y cuál es su grado?",
  "¿Cuánto presupuesto destina la UCSS a la investigación?",

  // Autoridades
  "¿Quién es el Gran Canciller?",
  "¿Quién es el Vice Canciller?",
  "¿Quién es el Rector de la UCSS?",
  "¿Quién es la Vicerrectora Académica?",
  "¿Quién es el Vicerrector Administrativo?",
  "¿Quién es la Decana de la Facultad de Ciencias Económicas y Comerciales?",
  "¿Quién es la Decana de la Facultad de Ciencias de la Educación y Humanidades?",
  "¿Quién es la Decana de la Facultad de Ciencias de la Salud?",
  "¿Quién es la Decana de la Facultad de Ingeniería?",
  "¿Quién es el Decano de la Facultad de Ciencias Agrarias y Ambientales?",
  "¿Quién es el Decano de la Facultad de Derecho y Ciencias Políticas?",
  "¿Quién es el Decano de la Facultad de Estudios Generales?",
  "¿Quién es el Director de la Escuela de Postgrado?",
  "¿Quién es la Secretaria General?",
  "¿Quiénes son los directores de las filiales de la UCSS?",

  // Admisión 2026 y Reglamentos
  "¿Cuál es la estructura y pesos por tipo de examen de admisión?",
  "¿Qué cursos y pesos vienen en el examen para la Facultad de Ingeniería?",
  "¿Cuál es el temario y las ponderaciones para la Facultad de Ciencias de la Salud?",
  "¿Qué temas de Historia y Cultura General evalúan para la carrera de Derecho?",
  "¿Qué temas evalúan en Razonamiento Verbal y Razonamiento Matemático?",
  "¿Cuáles son las modalidades de admisión para pregrado y postgrado?",
  "¿Cómo es el examen de admisión para el programa de Comunidades Nativas?",
  "¿Qué plazo hay para retirar documentos y qué sanciones hay por fraude en admisión?",

  // Jefes de Práctica y Ayudantes de Cátedra
  "¿Cuáles son los requisitos, funciones y derechos del Jefe de Práctica?",
  "¿Cuáles son los requisitos y funciones del Ayudante de Cátedra?",

  // Disciplina
  "¿Cuáles son las faltas y sanciones según el Reglamento de Disciplina?",

  // Trámites, Grados y Pagos
  "¿Cuáles son los costos de trámites de Grados y Títulos?",
  "¿Cuáles son los canales y métodos de pago de pensiones?",
  "¿Cómo pagar las pensiones de la UCSS por Yape?",
  "¿Cuánto demoran en actualizarse los pagos en la cuenta corriente?",

  // Aspectos Económicos y OAA
  "¿Hay descuento por pago puntual de pensiones en la UCSS?",
  "¿Cuál es la tasa de mora y recargo por repitencia de créditos?",
  "¿Cuál es el costo por material didáctico y en qué cuota se cobra?",
  "¿Cuáles son las reglas de matrícula, reservas y retiros de cursos?",
  "¿Cuál es el plazo máximo para solicitar retiro de asignatura o semestre?",
  "¿Cuáles son las condiciones y nota máxima de un examen rezagado final?",
  "¿Cuáles son los costos de legalizaciones oficiales de documentos?",

  // Postgrado y Becas
  "¿Cuáles son los costos y programas de la Escuela de Postgrado?",
  "¿El carné universitario de postgrado tiene algún costo?",
  "¿Cuáles son los tipos de becas, requisitos y condiciones?",
  "¿Qué beneficios y requisitos tiene la Beca por Tercio Superior?",
  "¿Qué beneficios y requisitos tiene la Beca Primeros Puestos?",
  "¿Qué cobertura tiene la Beca por Orfandad en la UCSS?",
  "¿Qué es el Préstamo de Honor de la UCSS y cuáles son sus requisitos?",
  "¿Cuánto es el pago administrativo y cómo se firma la Carta de Compromiso de becas?"
];

const input = document.getElementById('mensajeInput');
const suggestionsBox = document.getElementById('suggestionsBox');
const chatMessages = document.getElementById('chatMessages');
const chatForm = document.getElementById('chatForm');
const sessionStatus = document.getElementById('sessionStatus');
const sessionAction = document.getElementById('sessionAction');

function normalizarTexto(texto) {
  if (!texto) return '';
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('/api/estado-sesion');
    const data = await response.json();

    if (data.success && data.autenticado) {
      // Actualizar interfaz a usuario autenticado
      if (sessionStatus) sessionStatus.textContent = `Estudiante: ${data.usuario}`;
      if (sessionAction) {
        sessionAction.textContent = 'Cerrar Sesión';
        sessionAction.href = '#';
        sessionAction.onclick = async (e) => {
          e.preventDefault();
          await fetch('/api/logout', { method: 'POST' });
          window.location.reload();
        };
      }

      // Preguntas académicas personalizadas prioritarias
      const preguntasPersonales = [
        "¿Qué clases tengo hoy?",
        "¿Cuáles son mis clases virtuales y sus links de Zoom?",
        "¿Cuáles son mis notas?",
        "¿Cuál es mi promedio ponderado histórico (PPH)?",
        "¿Qué cursos tengo pendientes?",
        "¿Qué cursos tengo aprobados?",
        "¿Tengo deudas pendientes?",
        "¿Cuál es mi deuda total?",
        "¿Qué clases tengo los Lunes?",
        "¿Qué clases tengo los Martes?",
        "¿Qué clases tengo los Miércoles?",
        "¿Qué clases tengo los Jueves?",
        "¿Qué clases tengo los Viernes?",
        "¿Qué clases tengo los Sábados?"
      ];

      // Preguntas personalizadas por cada curso inscrito
      if (data.cursos && data.cursos.length > 0) {
        data.cursos.forEach(curso => {
          preguntasPersonales.push(`¿Cuándo tengo clases de ${curso}?`);
          preguntasPersonales.push(`¿Qué días me toca ${curso}?`);
          preguntasPersonales.push(`¿Cuál es mi nota de ${curso}?`);
          preguntasPersonales.push(`¿Cuánto tengo de nota en ${curso}?`);
          preguntasPersonales.push(`¿Quién es el docente de ${curso}?`);
        });
      }

      // Insertar las preguntas personales al inicio del banco
      bancoPreguntas.unshift(...preguntasPersonales);

    } else {
      // Usuario en modo invitado (sin login)
      if (sessionStatus) sessionStatus.textContent = 'Modo Invitado (Consultas generales)';
      if (sessionAction) {
        sessionAction.textContent = 'Iniciar Sesión';
        sessionAction.href = '/';
      }
    }
  } catch (error) {
    console.error('Error al verificar el estado de la sesión:', error);
  }
});

input.addEventListener('input', () => {
  const value = normalizarTexto(input.value.trim());
  suggestionsBox.innerHTML = '';

  if (!value) {
    suggestionsBox.style.display = 'none';
    return;
  }

  const coincidencias = bancoPreguntas.filter(question => normalizarTexto(question).includes(value));

  if (coincidencias.length > 0) {
    coincidencias.slice(0, 10).forEach(texto => {
      const item = document.createElement('div');
      item.className = 'suggestion-item';
      item.innerHTML = `<span>🔍</span> <span>${texto}</span>`;
      item.onclick = () => {
        input.value = texto;
        suggestionsBox.style.display = 'none';
        enviarMensaje(texto);
      };
      suggestionsBox.appendChild(item);
    });
    suggestionsBox.style.display = 'block';
  } else {
    suggestionsBox.style.display = 'none';
  }
});

document.addEventListener('click', event => {
  if (!input.contains(event.target) && !suggestionsBox.contains(event.target)) {
    suggestionsBox.style.display = 'none';
  }
});

chatForm.addEventListener('submit', event => {
  event.preventDefault();
  const texto = input.value.trim();
  if (texto) {
    suggestionsBox.style.display = 'none';
    enviarMensaje(texto);
  }
});

async function enviarMensaje(mensaje) {
  agregarMensaje(mensaje, 'user');
  input.value = '';

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mensaje })
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok || data.success === false) {
      throw new Error(data.respuesta || data.message || `HTTP ${response.status}`);
    }

    agregarMensaje(data.respuesta || 'No se recibió una respuesta válida del servidor.', 'bot', data.requiereLogin);
  } catch (error) {
    console.error('Error al consultar el chat:', error);
    agregarMensaje(`ERROR: ${error.message || 'No se pudo conectar con el servidor.'}`, 'bot');
  }
}

function agregarMensaje(texto, remitente, requiereLogin = false) {
  const div = document.createElement('div');
  div.className = `message ${remitente}`;
  div.textContent = texto;

  if (requiereLogin) {
    const loginLink = document.createElement('a');
    loginLink.href = '/';
    loginLink.textContent = 'Ir a Iniciar Sesión institucional';
    loginLink.style.display = 'inline-block';
    loginLink.style.marginTop = '8px';
    loginLink.style.padding = '6px 12px';
    loginLink.style.backgroundColor = '#003366';
    loginLink.style.color = '#ffffff';
    loginLink.style.textDecoration = 'none';
    loginLink.style.borderRadius = '4px';
    loginLink.style.fontSize = '12px';
    div.appendChild(document.createElement('br'));
    div.appendChild(loginLink);
  }

  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
