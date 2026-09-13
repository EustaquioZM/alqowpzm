// Base de conocimiento preprogramada extraída estrictamente de datos.txt
// Respuestas en texto plano sin negritas (sin **) ni tablas de Markdown.

function normalizarTexto(texto) {
  if (!texto) return '';
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const preguntasPreprogramadas = [
  // ==========================================
  // MISIÓN Y VISIÓN
  // ==========================================
  {
    id: 'mision',
    pregunta: "¿Cuál es la misión de la UCSS?",
    variantes: [
      "mision de la ucss",
      "cual es la mision institucional",
      "que dice la mision de la universidad",
      "mision ucss"
    ],
    keywords: [
      ['mision', 'ucss'],
      ['mision', 'institucional'],
      ['cual', 'mision']
    ],
    respuesta:
"Misión de la UCSS (Resolución N° 064-2021-UCSS-AG/GC):\n\n" +
"Ser una comunidad universitaria católica, libre y autónoma, que contribuya a la construcción del bien común en una sociedad intercultural, inclusiva, equitativa y sostenible. Su compromiso es formar profesionales excelentes, competentes, capaces de asumir riesgos con responsabilidad y liderazgo, preparados para promover y aplicar el conocimiento científico y tecnológico en el ámbito laboral con un sentido humanista y cristiano que fomenta el respeto y la dignidad de la persona."
  },
  {
    id: 'vision',
    pregunta: "¿Cuál es la visión al 2028 de la UCSS?",
    variantes: [
      "vision de la ucss",
      "cual es la vision de la universidad",
      "que dice la vision de la ucss",
      "vision al 2028",
      "vision ucss"
    ],
    keywords: [
      ['vision', 'ucss'],
      ['vision', '2028'],
      ['cual', 'vision']
    ],
    respuesta:
"Visión al 2028 de la UCSS (Resolución N° 064-2021-UCSS-AG/GC):\n\n" +
"Al 2028, ser una universidad reconocida por su excelencia académica y humanista, basada en la mejor innovación científica y didáctica, la formación continua, la responsabilidad social y la investigación aplicada, realizada a nivel local, nacional e internacional; siendo aliado estratégico de actores públicos y privados promoviendo conocimientos originales para el desarrollo sostenible e integral del territorio."
  },
  {
    id: 'resolucion_mision_vision',
    pregunta: "¿En qué resolución se aprobaron la nueva misión y visión de la UCSS?",
    variantes: [
      "resolucion de mision y vision",
      "cuando se aprobo la mision y vision",
      "que resolucion aprobo la mision",
      "resolucion 064 2021"
    ],
    keywords: [
      ['resolucion', 'mision'],
      ['resolucion', 'vision'],
      ['aprobo', 'mision'],
      ['064', '2021']
    ],
    respuesta:
"La nueva misión y visión institucional de la UCSS fueron aprobadas mediante la Resolución N° 064-2021-UCSS-AG/GC, con fecha 13 de octubre de 2021, y se orientan al horizonte institucional hacia el 2028."
  },

  // ==========================================
  // SERVICIOS Y CONTACTOS UCSS - GONZALES PRADA
  // ==========================================
  {
    id: 'topico',
    pregunta: "¿Dónde queda el tópico y cuál es su horario?",
    variantes: [
      "contacto del topico",
      "servicio de topico",
      "horario del topico",
      "donde esta el topico de salud",
      "topico ucss",
      "correo de topico"
    ],
    keywords: [
      ['topico'],
      ['servicio', 'medico']
    ],
    respuesta:
"Servicio de Tópico (Gonzales Prada):\n" +
"- Ubicación: Pabellón P1, Piso 1\n" +
"- Horario de atención: Lunes a Sábado de 7:00 am a 10:30 pm\n" +
"- Correo de contacto: servicio_medico@ucss.edu.pe"
  },
  {
    id: 'psicopedagogico',
    pregunta: "¿Cuál es el correo de servicio psicopedagógico y su horario?",
    variantes: [
      "donde queda servicio psicopedagogico",
      "servicio psicopedagogico ucss",
      "contacto de psicopedagogico",
      "atencion psicologica",
      "correo de psicologia",
      "horario psicopedagogico"
    ],
    keywords: [
      ['psicopedagogico'],
      ['psicologia'],
      ['consultapsicologia']
    ],
    respuesta:
"Servicio Psicopedagógico (Gonzales Prada):\n" +
"- Ubicación: Pabellón P1, Piso 4\n" +
"- Correo de contacto: consultapsicologia_lima@ucss.edu.pe\n" +
"- Horarios de atención:\n" +
"  * Lunes a Miércoles: 8:00 am a 5:00 pm\n" +
"  * Jueves y Viernes (Virtual): 8:00 am a 1:00 pm\n" +
"  * Sábados (Virtual): 8:00 am a 1:00 pm"
  },
  {
    id: 'defensoria',
    pregunta: "¿Cómo contactar a la defensoría universitaria?",
    variantes: [
      "defensoria universitaria ucss",
      "horario de defensoria universitaria",
      "donde queda la defensoria universitaria",
      "correo de defensoria"
    ],
    keywords: [
      ['defensoria'],
      ['defensoria', 'universitaria']
    ],
    respuesta:
"Defensoría Universitaria UCSS:\n" +
"- Ubicación: Pabellón P1, Piso 4\n" +
"- Horario de atención: Martes y Jueves de 10:00 am a 11:45 am\n" +
"- Correo de contacto: defensoriauniversitaria@ucss.edu.pe"
  },
  {
    id: 'lactario',
    pregunta: "¿Dónde se ubica el lactario institucional?",
    variantes: [
      "lactario ucss",
      "donde queda el lactario",
      "correo de lactario",
      "ubicacion del lactario"
    ],
    keywords: [
      ['lactario']
    ],
    respuesta:
"Lactario Institucional (Gonzales Prada):\n" +
"- Ubicación: Pabellón P1, Piso 1\n" +
"- Correo de contacto: bienestaruniversitario@ucss.edu.pe"
  },
  {
    id: 'tutoria',
    pregunta: "¿Cuáles son los horarios de tutoría y su ubicación?",
    variantes: [
      "donde queda tutoria",
      "servicio de tutoria",
      "correo de tutoria",
      "atencion de tutoria",
      "tutoria ucss"
    ],
    keywords: [
      ['tutoria']
    ],
    respuesta:
"Área de Tutoría (Gonzales Prada):\n" +
"- Ubicación: Pabellón P4, Piso 4\n" +
"- Correo de contacto: tutoria_generales@ucss.edu.pe\n" +
"- Horarios de atención:\n" +
"  * Lunes a Viernes: 8:00 am a 6:00 pm\n" +
"  * Lunes, Miércoles y Viernes: 10:00 am a 8:00 pm\n" +
"  * Martes y Jueves: 8:00 am a 6:00 pm"
  },
  {
    id: 'asuntos_academicos',
    pregunta: "¿Cómo contactar a Asuntos Académicos (OAA)?",
    variantes: [
      "asuntos academicos ucss",
      "donde queda asuntos academicos",
      "horario de asuntos academicos",
      "oaa horario",
      "oaa contacto"
    ],
    keywords: [
      ['asuntos', 'academicos'],
      ['oaa']
    ],
    respuesta:
"Oficina de Asuntos Académicos (OAA - Gonzales Prada):\n" +
"- Ubicación: Pabellón P4, Piso 1 (Atención vía Zoom)\n" +
"- Horarios de atención:\n" +
"  * Lunes a Viernes: 8:30 am a 8:00 pm\n" +
"  * Sábados: 8:30 am a 12:30 pm"
  },
  {
    id: 'becas_contacto',
    pregunta: "¿Dónde solicito informes sobre becas y ayudas económicas?",
    variantes: [
      "oficina de becas ucss",
      "contacto de becas",
      "horario de becas y ayudas economicas",
      "donde queda becas",
      "correo de becas"
    ],
    keywords: [
      ['oficina', 'becas'],
      ['becas', 'horario'],
      ['donde', 'becas'],
      ['solicito', 'becas'],
      ['obae']
    ],
    respuesta:
"Oficina de Becas y Ayudas Económicas (OBAE - Gonzales Prada):\n" +
"- Ubicación: Pabellón P4, Piso 1\n" +
"- Horario regular: Lunes a Viernes de 8:30 am a 6:30 pm | Sábados de 8:30 am a 1:30 pm\n" +
"- Horario de firma de Carta de Compromiso: Lunes a Viernes de 8:30 am a 6:00 pm | Sábados de 8:30 am a 1:00 pm\n" +
"- Correos de contacto: obae@ucss.edu.pe / ayudaseconomicas@ucss.edu.pe\n" +
"- WhatsApp de atención: 991 928 251 / 993 539 857"
  },
  {
    id: 'becas_whatsapp',
    pregunta: "¿Cuál es el WhatsApp y correo de Becas y Ayudas Económicas?",
    variantes: [
      "whatsapp de becas ucss",
      "telefono de becas ucss",
      "numero de becas"
    ],
    keywords: [
      ['whatsapp', 'becas'],
      ['telefono', 'becas'],
      ['celular', 'becas']
    ],
    respuesta:
"Canales de Atención de Becas y Ayudas Económicas:\n" +
"- WhatsApp: 991 928 251 / 993 539 857\n" +
"- Correo electrónico: ayudaseconomicas@ucss.edu.pe / obae@ucss.edu.pe"
  },
  {
    id: 'misa_capilla',
    pregunta: "¿A qué hora son las misas en la capilla?",
    variantes: [
      "misas en la capilla",
      "horario de misa",
      "misas los viernes",
      "misas de lunes a jueves"
    ],
    keywords: [
      ['misa'],
      ['misas'],
      ['capilla']
    ],
    respuesta:
"Misas en la Capilla (Gonzales Prada):\n" +
"- De Lunes a Jueves: 8:00 am\n" +
"- Viernes: 5:30 pm (Pabellón P2, Piso 204)"
  },
  {
    id: 'pastoral_ubicacion',
    pregunta: "¿Dónde queda la pastoral?",
    variantes: [
      "pastoral universitaria ucss",
      "donde queda la pastoral",
      "correo de pastoral",
      "ubicacion de la pastoral"
    ],
    keywords: [
      ['pastoral'],
      ['ubicacion', 'pastoral']
    ],
    respuesta:
"Pastoral Universitaria (Gonzales Prada):\n" +
"- Ubicación de la oficina: Pabellón P4, Taller 304\n" +
"- Horario de atención: Lunes a Viernes de 8:30 am a 5:30 pm\n" +
"- Correo de contacto: pastoral@ucss.edu.pe"
  },
  {
    id: 'biblioteca',
    pregunta: "¿Cuál es el horario de atención de la biblioteca y su nombre?",
    variantes: [
      "biblioteca ucss horario",
      "donde queda la biblioteca",
      "como se llama la biblioteca",
      "biblioteca andres aziani",
      "cuantos libros tiene la biblioteca"
    ],
    keywords: [
      ['biblioteca'],
      ['aziani']
    ],
    respuesta:
"Biblioteca Especializada 'Andrés Aziani' (Gonzales Prada):\n" +
"- Ubicación: Pabellón P4, Piso 1\n" +
"- Horarios de atención:\n" +
"  * Lunes a Viernes: 9:00 am a 9:00 pm\n" +
"  * Sábados: 9:00 am a 1:00 pm\n" +
"- Cuenta con un acervo de más de 4,171 libros catalogados."
  },
  {
    id: 'contacto_salud',
    pregunta: "¿Cuál es el contacto de la Facultad de Ciencias de la Salud?",
    variantes: [
      "facultad de ciencias de la salud contacto",
      "telefono de facultad de salud",
      "correo de ciencias de la salud",
      "donde queda la facultad de salud"
    ],
    keywords: [
      ['facultad', 'salud'],
      ['ciencias', 'salud'],
      ['tramitesalud']
    ],
    respuesta:
"Facultad de Ciencias de la Salud (FCS):\n" +
"- Ubicación: Pabellón P1, Piso 3\n" +
"- Correo: tramitesalud@ucss.edu.pe\n" +
"- Teléfono: 940 520 775"
  },
  {
    id: 'contacto_ingenieria',
    pregunta: "¿Cuál es el contacto de la Facultad de Ingeniería?",
    variantes: [
      "facultad de ingenieria contacto",
      "telefono de ingenieria",
      "correo de ingenieria ucss",
      "donde queda la facultad de ingenieria"
    ],
    keywords: [
      ['facultad', 'ingenieria'],
      ['ingenieria', 'contacto'],
      ['tramitesfi']
    ],
    respuesta:
"Facultad de Ingeniería (FI):\n" +
"- Ubicación: Pabellón P1, Piso 4\n" +
"- Correo: tramitesfi@ucss.edu.pe\n" +
"- Teléfono: 986 747 531"
  },
  {
    id: 'programas_facultad_ingenieria',
    pregunta: "¿Qué programas ofrece la Facultad de Ingeniería?",
    variantes: [
      "programas de ingenieria",
      "cuales son los programas de ingenieria",
      "oferta de la facultad de ingenieria"
    ],
    keywords: [
      ['programas', 'ingenieria'],
      ['facultad', 'ingenieria']
    ],
    respuesta:
"Facultad de Ingeniería (FI):\n" +
"- Ingeniería Informática\n" +
"- Ingeniería de Sistemas\n" +
"- Ingeniería Industrial\n" +
"- Ingeniería Civil"
  },
  {
    id: 'programas_facultad_fcec',
    pregunta: "¿Qué programas ofrece la Facultad de Ciencias Económicas y Comerciales?",
    variantes: [
      "programas fcec",
      "cuales son los programas de fcec",
      "oferta de ciencias economicas"
    ],
    keywords: [
      ['programas', 'economicas'],
      ['administracion', 'contabilidad'],
      ['fcec']
    ],
    respuesta:
"Facultad de Ciencias Económicas y Comerciales (FCEC):\n" +
"- Administración\n" +
"- Contabilidad\n" +
"- Economía\n" +
"- Gestión de Operaciones y Logística Internacional (Nuevo)\n" +
"- Administración y Negocios Internacionales\n" +
"- Contabilidad y Finanzas"
  },
  {
    id: 'programas_facultad_fceh',
    pregunta: "¿Qué programas ofrece la Facultad de Ciencias de la Educación y Humanidades?",
    variantes: [
      "programas de educacion y humanidades",
      "cuales son los programas de fceh",
      "oferta de educacion"
    ],
    keywords: [
      ['educacion', 'humanidades'],
      ['programas', 'educacion'],
      ['fceh']
    ],
    respuesta:
"Facultad de Ciencias de la Educación y Humanidades (FCEH):\n" +
"- Educación Inicial\n" +
"- Educación Primaria\n" +
"- Educación Especial\n" +
"- Educación Secundaria Filosofía y Religión\n" +
"- Educación Secundaria Lengua Inglesa\n" +
"- Archivística y Gestión Documental\n" +
"- Turismo y Patrimonio Cultural\n" +
"- Educación Intercultural Bilingüe: Educación Inicial y Educación Primaria"
  },
  {
    id: 'programas_facultad_fcaa',
    pregunta: "¿Qué programas ofrece la Facultad de Ciencias Agrarias y Ambientales?",
    variantes: [
      "programas agrarias",
      "cuales son los programas de fcaa",
      "oferta de agrarias"
    ],
    keywords: [
      ['programas', 'agrarias'],
      ['facultad', 'agrarias'],
      ['fcaa']
    ],
    respuesta:
"Facultad de Ciencias Agrarias y Ambientales (FCAA):\n" +
"- Ingeniería Ambiental\n" +
"- Agronomía\n" +
"- Ingeniería Agraria con mención Forestal\n" +
"- Ingeniería Agroindustrial y de Biocomercio"
  },
  {
    id: 'contacto_fcec',
    pregunta: "¿Cuál es el contacto de Ciencias Económicas y Comerciales?",
    variantes: [
      "facultad de ciencias economicas y comerciales contacto",
      "telefono fcec",
      "correo fcec ucss",
      "donde queda fcec"
    ],
    keywords: [
      ['economicas', 'contacto'],
      ['fcec', 'contacto'],
      ['comerciales', 'contacto'],
      ['secretaria_fcec']
    ],
    respuesta:
"Facultad de Ciencias Económicas y Comerciales (FCEC):\n" +
"- Ubicación: Pabellón P1, Piso 4\n" +
"- Correo: secretaria_fcec@ucss.edu.pe\n" +
"- Teléfono: 989 569 270"
  },
  {
    id: 'contacto_derecho',
    pregunta: "¿Cuál es el número y contacto de la Facultad de Derecho?",
    variantes: [
      "facultad de derecho y ciencias politicas contacto",
      "telefono facultad de derecho",
      "correo derecho ucss",
      "donde queda derecho"
    ],
    keywords: [
      ['facultad', 'derecho'],
      ['derecho', 'contacto'],
      ['facdecp']
    ],
    respuesta:
"Facultad de Derecho y Ciencias Políticas (FDCP):\n" +
"- Ubicación: Pabellón P1, Piso 4\n" +
"- Correo: facdecp@ucss.edu.pe\n" +
"- Teléfono: 989 699 166"
  },
  {
    id: 'contacto_agrarias',
    pregunta: "¿Cuál es el contacto de Ciencias Agrarias y Ambientales?",
    variantes: [
      "facultad de ciencias agrarias y ambientales contacto",
      "telefono agrarias ucss",
      "correo agrarias ucss",
      "donde queda agrarias"
    ],
    keywords: [
      ['agrarias', 'contacto'],
      ['ambientales', 'contacto'],
      ['fcaa']
    ],
    respuesta:
"Facultad de Ciencias Agrarias y Ambientales (FCAA):\n" +
"- Ubicación: Pabellón P2, Piso 5\n" +
"- Correo: secretaria_fcaa@ucss.edu.pe\n" +
"- Teléfono: 987 513 071"
  },
  {
    id: 'contacto_educacion',
    pregunta: "¿Cuál es el contacto de Educación y Humanidades?",
    variantes: [
      "facultad de ciencias de la educacion y humanidades contacto",
      "telefono educacion ucss",
      "correo educacion ucss",
      "donde queda educacion"
    ],
    keywords: [
      ['educacion', 'contacto'],
      ['fced'],
      ['facultad', 'educacion']
    ],
    respuesta:
"Facultad de Ciencias de la Educación y Humanidades (FCEH):\n" +
"- Ubicación: Pabellón P3, Piso 5\n" +
"- Correo: secretaria_fced@ucss.edu.pe\n" +
"- Teléfono: 989 251 459"
  },
  {
    id: 'contacto_estudios_generales',
    pregunta: "¿Dónde queda el Departamento de Estudios Generales?",
    variantes: [
      "departamento de estudios generales ucss",
      "contacto estudios generales",
      "correo estudios generales"
    ],
    keywords: [
      ['estudios', 'generales', 'contacto'],
      ['departamento', 'estudios', 'generales'],
      ['estudiosgenerales']
    ],
    respuesta:
"Departamento de Estudios Generales:\n" +
"- Ubicación: Pabellón P4, Piso 4\n" +
"- Correo: estudiosgenerales@ucss.edu.pe"
  },

  // ==========================================
  // LICENCIAMIENTO SUNEDU
  // ==========================================
  {
    id: 'licenciamiento_sunedu',
    pregunta: "¿La UCSS cuenta con Licenciamiento de SUNEDU?",
    variantes: [
      "licenciamiento sunedu ucss",
      "esta licenciada la ucss",
      "resolucion de licenciamiento ucss",
      "vigencia de licencia sunedu",
      "resolucion 117 2018"
    ],
    keywords: [
      ['licenciamiento'],
      ['licencia', 'sunedu'],
      ['117', '2018']
    ],
    respuesta:
"Licenciamiento Institucional de la UCSS:\n" +
"- Resolución: N° 117-2018-SUNEDU/CD\n" +
"- Fecha de emisión: 12 de septiembre de 2018\n" +
"- Vigencia: Otorgada por un periodo de 6 años para ofrecer el servicio educativo superior universitario."
  },
  {
    id: 'sedes_filiales_sunedu',
    pregunta: "¿Cuáles son las sedes y filiales autorizadas por SUNEDU?",
    variantes: [
      "filiales autorizadas ucss",
      "sedes de la ucss",
      "donde tiene filiales la ucss",
      "locales autorizados sunedu"
    ],
    keywords: [
      ['sedes', 'filiales'],
      ['filiales', 'autorizadas'],
      ['locales', 'autorizados']
    ],
    respuesta:
"Sedes y Filiales autorizadas por SUNEDU:\n" +
"- Sede Central: Lima (4 locales)\n" +
"- Filial Huaura: 2 locales (Végueta y Huacho)\n" +
"- Filial Atalaya: 1 local (Raimondi)\n" +
"- Filial Morropón: 3 locales (Chulucanas)\n" +
"- Filial Rioja: 1 local (Nueva Cajamarca)\n" +
"- Filial Tarma: 1 local (Tarma)"
  },
  {
    id: 'programas_autorizados_sunedu',
    pregunta: "¿Cuántos programas académicos tiene autorizados la UCSS por SUNEDU?",
    variantes: [
      "programas autorizados ucss",
      "cuantas carreras tiene licenciadas la ucss",
      "oferta academica reconocida sunedu"
    ],
    keywords: [
      ['programas', 'autorizados'],
      ['oferta', 'academica', 'reconocida'],
      ['46', 'programas']
    ],
    respuesta:
"Oferta académica autorizada por SUNEDU (Total: 46 programas):\n" +
"- Pregrado: 30 programas conducentes al grado de bachiller\n" +
"- Posgrado: 10 programas de maestría\n" +
"- Segunda Especialidad: 6 programas\n\n" +
"Facultades con programas de pregrado y sus carreras son: Ingeniería (Ingeniería Informática, Ingeniería de Sistemas, Ingeniería Industrial, Ingeniería Civil), Ciencias Económicas y Comerciales (Administración, Contabilidad, Economía, Administración y Negocios Internacionales, Contabilidad y Finanzas, Gestión de Operaciones y Logística Internacional), Educación y Humanidades (Educación Inicial, Educación Primaria, Educación Especial, Educación Secundaria Filosofía y Religión, Educación Secundaria Lengua Inglesa, Archivística y Gestión Documental, Turismo y Patrimonio Cultural, Educación Intercultural Bilingüe), Ciencias Agrarias y Ambientales (Ingeniería Ambiental, Agronomía, Ingeniería Agraria con mención Forestal, Ingeniería Agroindustrial y de Biocomercio), Ciencias de la Salud (Enfermería, Psicología, Nutrición y Dietética, Tecnología Médica - Terapia Física y Rehabilitación)."
  },
  {
    id: 'programas_desistidos_sunedu',
    pregunta: "¿Cuáles fueron los programas desistidos o cancelados según SUNEDU?",
    variantes: [
      "programas desistidos ucss",
      "carreras canceladas ucss",
      "programas retirados sunedu"
    ],
    keywords: [
      ['desistidos'],
      ['cancelados', 'sunedu'],
      ['retirados', 'sunedu']
    ],
    respuesta:
"Programas desistidos/retirados según SUNEDU (Total: 15 programas):\n" +
"- Pregrado (3): Educación Secundaria: Lengua y Literatura, Teología, y Complementación Universitaria.\n" +
"- Maestrías: 8 programas.\n" +
"- Doctorados (4): Gestión Pública, Filosofía, Educación y Administración."
  },
  {
    id: 'requerimientos_sunedu',
    pregunta: "¿Cuáles fueron los requerimientos de SUNEDU en la licencia?",
    variantes: [
      "requerimientos sunedu ucss",
      "recomendaciones sunedu",
      "que le pidio sunedu a la ucss"
    ],
    keywords: [
      ['requerimientos', 'sunedu'],
      ['recomendaciones', 'sunedu']
    ],
    respuesta:
"Requerimientos de SUNEDU para la UCSS:\n" +
"- Implementación y seguimiento del Sistema de Gestión de la Calidad (SGC).\n" +
"- Estandarización de selección, evaluación y ratificación docente en sede y filiales.\n" +
"- Reporte de docentes en proceso de adecuación para obtención de grados académicos.\n" +
"- Fortalecimiento de la estructura y desarrollo de investigación en todas las facultades.\n" +
"- Plan de equipamiento homologado para laboratorios de Ingeniería Civil."
  },

  // ==========================================
  // FICHA TÉCNICA Y DATOS INSTITUCIONALES
  // ==========================================
  {
    id: 'fecha_creacion_gestion',
    pregunta: "¿Cuándo se creó la UCSS y cuál es su tipo de gestión?",
    variantes: [
      "cuando se fundo la ucss",
      "tipo de gestion de la ucss",
      "historia de fundacion ucss",
      "fecha de creacion ucss",
      "donde queda la sede central"
    ],
    keywords: [
      ['cuando', 'creo', 'ucss'],
      ['fundacion', 'ucss'],
      ['tipo', 'gestion'],
      ['patrocinio', 'carabayllo'],
      ['31', 'mayo', '1998']
    ],
    respuesta:
"Datos Institucionales de la UCSS:\n" +
"- Fecha de Creación: 31 de mayo de 1998\n" +
"- Tipo de Gestión: Privada - Asociativa (bajo el patrocinio de la Diócesis de Carabayllo)\n" +
"- Fecha de Licenciamiento: 13 de setiembre de 2018 (Resolución N° 117-2018-SUNEDU/CD)\n" +
"- Sitio Web Oficial: https://www.ucss.edu.pe\n" +
"- Dirección Sede Central (Los Olivos): Lt. s/n (esq. Calle Constelaciones y Av. Sol de Oro), Mz. U, Urb. Sol de Oro, 1ra. Etapa, Los Olivos, Lima."
  },
  {
    id: 'poblacion_estudiantil',
    pregunta: "¿Cuál es la población estudiantil y cómo se distribuye?",
    variantes: [
      "cuantos estudiantes tiene la ucss",
      "poblacion estudiantil ucss",
      "estudiantes por sede ucss"
    ],
    keywords: [
      ['poblacion', 'estudiantil'],
      ['cuantos', 'estudiantes'],
      ['distribucion', 'estudiantes']
    ],
    respuesta:
"Población Estudiantil UCSS (Censo 2018-I):\n" +
"- Total Estudiantes: 9,436\n" +
"  * Pregrado: 9,181 estudiantes\n" +
"  * Posgrado: 255 estudiantes\n\n" +
"Distribución por Sedes y Filiales:\n" +
"- Lima: 5,510 estudiantes\n" +
"- Rioja: 1,696 estudiantes\n" +
"- Tarma: 712 estudiantes\n" +
"- Atalaya: 656 estudiantes\n" +
"- Morropón (3 locales): 549 estudiantes\n" +
"- Huaura (2 locales): 313 estudiantes"
  },
  {
    id: 'programa_nopoki',
    pregunta: "¿Qué es el programa Nopoki en Atalaya y cuál es su enfoque?",
    variantes: [
      "programa nopoki ucss",
      "que significa nopoki",
      "filial atalaya nopoki",
      "enfoque intercultural nopoki"
    ],
    keywords: [
      ['nopoki'],
      ['atalaya', 'enfoque'],
      ['intercultural']
    ],
    respuesta:
"Programa Nopoki (Filial Atalaya):\n" +
"- Significado: 'Estoy aquí' en lengua asháninka.\n" +
"- Enfoque: Iniciativa intercultural orientada a la formación académica y profesional de jóvenes pertenecientes a comunidades nativas y pueblos originarios de la Amazonía peruana."
  },
  {
    id: 'infraestructura_laboratorios',
    pregunta: "¿Con qué infraestructura y laboratorios cuenta la UCSS?",
    variantes: [
      "infraestructura de la ucss",
      "cuantos laboratorios tiene la ucss",
      "cuantas aulas tiene la ucss"
    ],
    keywords: [
      ['infraestructura'],
      ['cuantos', 'laboratorios'],
      ['cuantas', 'aulas']
    ],
    respuesta:
"Infraestructura UCSS:\n" +
"- Locales totales: 12 locales (incluyendo sus 8 filiales)\n" +
"- Aulas: 135\n" +
"- Laboratorios: 42 (incluyendo 3 laboratorios dedicados a investigación)\n" +
"- Talleres: 22\n" +
"- Ambientes de trabajo docente: 54"
  },
  {
    id: 'plana_docente',
    pregunta: "¿Cuántos docentes tiene la universidad y cuál es su grado?",
    variantes: [
      "plana docente ucss",
      "cuantos profesores tiene la ucss",
      "docentes a tiempo completo ucss",
      "grados de los docentes"
    ],
    keywords: [
      ['docentes'],
      ['plana', 'docente'],
      ['profesores', 'tiempo', 'completo']
    ],
    respuesta:
"Plana Docente de la UCSS (Censo 2018-I):\n" +
"- Total docentes: 500\n\n" +
"Régimen de Dedicación:\n" +
"- Tiempo Completo: 168 docentes (34%)\n" +
"- Tiempo Parcial: 330 docentes\n" +
"- Dedicación Exclusiva: 2 docentes\n\n" +
"Grados Académicos:\n" +
"- Bachiller: 248 docentes\n" +
"- Maestro: 218 docentes\n" +
"- Doctor: 34 docentes"
  },
  {
    id: 'investigacion_presupuesto',
    pregunta: "¿Cuánto presupuesto destina la UCSS a la investigación?",
    variantes: [
      "presupuesto de investigacion ucss",
      "cuanto invierte en investigacion la ucss",
      "lineas de investigacion ucss",
      "proyectos de investigacion ucss"
    ],
    keywords: [
      ['presupuesto', 'investigacion'],
      ['lineas', 'investigacion'],
      ['proyectos', 'investigacion']
    ],
    respuesta:
"Investigación y Recursos UCSS:\n" +
"- Presupuesto de Investigación (2018): S/ 1,539,175\n" +
"- Líneas de investigación activas: 52\n" +
"- Proyectos registrados (2015-2018): 114\n" +
"- Proyectos publicados: 46 (Scopus: 8, Web of Science: 16, Latindex: 10, SciELO: 7, Revistas UCSS: 5)\n" +
"- Docentes investigadores registrados: 42 en DINA y 1 en REGINA."
  },

  // ==========================================
  // AUTORIDADES UCSS
  // ==========================================
  {
    id: 'autoridad_canciller',
    pregunta: "¿Quién es el Gran Canciller?",
    variantes: [
      "gran canciller de la ucss",
      "quien es el canciller",
      "nombre del gran canciller"
    ],
    keywords: [
      ['gran', 'canciller'],
      ['canciller']
    ],
    respuesta: "El Gran Canciller de la UCSS es S.E.R. Mons. Neri Menor Vargas, OFM."
  },
  {
    id: 'autoridad_vicecanciller',
    pregunta: "¿Quién es el Vice Canciller?",
    variantes: [
      "vice canciller de la ucss",
      "quien es el vicecanciller"
    ],
    keywords: [
      ['vice', 'canciller'],
      ['vicecanciller']
    ],
    respuesta: "El Vice Canciller de la UCSS es el Rvdo. P. Dr. César Antonio Buendía Romero."
  },
  {
    id: 'autoridad_rector',
    pregunta: "¿Quién es el Rector de la UCSS?",
    variantes: [
      "rector de la ucss",
      "quien es el rector",
      "nombre del rector"
    ],
    keywords: [
      ['rector']
    ],
    respuesta: "El Rector de la UCSS es el Dr. Gian Battista Fausto Bolis."
  },
  {
    id: 'autoridad_vicerrectora_academica',
    pregunta: "¿Quién es la Vicerrectora Académica?",
    variantes: [
      "vicerrectora academica de la ucss",
      "quien es la vicerrectora academica"
    ],
    keywords: [
      ['vicerrectora', 'academica'],
      ['vicerrector', 'academico']
    ],
    respuesta: "La Vicerrectora Académica (e.) de la UCSS es la Mtra. Edith Betty Alfaro Palacios de Huaita."
  },
  {
    id: 'autoridad_vicerrector_administrativo',
    pregunta: "¿Quién es el Vicerrector Administrativo?",
    variantes: [
      "vicerrector administrativo de la ucss",
      "quien es el vicerrector administrativo"
    ],
    keywords: [
      ['vicerrector', 'administrativo'],
      ['vicerrectora', 'administrativa']
    ],
    respuesta: "El Vicerrector Administrativo (e.) de la UCSS es el Mtro. José Enrique Guadalupe Aguilar Muñoz."
  },
  {
    id: 'autoridad_decana_fcec',
    pregunta: "¿Quién es la Decana de la Facultad de Ciencias Económicas y Comerciales?",
    variantes: [
      "decana de fcec",
      "decano de ciencias economicas y comerciales"
    ],
    keywords: [
      ['decana', 'economicas'],
      ['decana', 'fcec'],
      ['decano', 'economicas']
    ],
    respuesta: "La Decana (e.) de la Facultad de Ciencias Económicas y Comerciales es la Mtra. Sara Isabel Mazekina Oshiro."
  },
  {
    id: 'autoridad_decana_fceh',
    pregunta: "¿Quién es la Decana de la Facultad de Ciencias de la Educación y Humanidades?",
    variantes: [
      "decana de educacion y humanidades",
      "decano de educacion ucss"
    ],
    keywords: [
      ['decana', 'educacion'],
      ['decano', 'educacion'],
      ['decana', 'fceh']
    ],
    respuesta: "La Decana (e.) de la Facultad de Ciencias de la Educación y Humanidades es la Mag. Bertha Julia Terrazas Duhaut de Orizola."
  },
  {
    id: 'autoridad_decana_fcs',
    pregunta: "¿Quién es la Decana de la Facultad de Ciencias de la Salud?",
    variantes: [
      "decana de ciencias de la salud",
      "decano de salud ucss"
    ],
    keywords: [
      ['decana', 'salud'],
      ['decano', 'salud'],
      ['decana', 'fcs']
    ],
    respuesta: "La Decana (e.) de la Facultad de Ciencias de la Salud es la Mag. Sofía Coz Contreras."
  },
  {
    id: 'autoridad_decana_fi',
    pregunta: "¿Quién es la Decana de la Facultad de Ingeniería?",
    variantes: [
      "decana de ingenieria ucss",
      "decano de ingenieria"
    ],
    keywords: [
      ['decana', 'ingenieria'],
      ['decano', 'ingenieria'],
      ['decana', 'fi']
    ],
    respuesta: "La Decana (e.) de la Facultad de Ingeniería es la Mtra. Paola Analí Verónica Arellano Tume."
  },
  {
    id: 'autoridad_decano_fcaa',
    pregunta: "¿Quién es el Decano de la Facultad de Ciencias Agrarias y Ambientales?",
    variantes: [
      "decano de ciencias agrarias y ambientales",
      "decano de agrarias ucss"
    ],
    keywords: [
      ['decano', 'agrarias'],
      ['decano', 'fcaa']
    ],
    respuesta: "El Decano (e.) de la Facultad de Ciencias Agrarias y Ambientales es el Ing. Juan Ignacio Pastén Monárdez."
  },
  {
    id: 'autoridad_decano_fdcp',
    pregunta: "¿Quién es el Decano de la Facultad de Derecho y Ciencias Políticas?",
    variantes: [
      "decano de derecho y ciencias politicas",
      "decano de derecho ucss"
    ],
    keywords: [
      ['decano', 'derecho'],
      ['decano', 'fdcp']
    ],
    respuesta: "El Decano (e.) de la Facultad de Derecho y Ciencias Políticas es el Mtro. Edgar Odón Cruz Acuña."
  },
  {
    id: 'autoridad_decano_generales',
    pregunta: "¿Quién es el Decano de la Facultad de Estudios Generales?",
    variantes: [
      "decano de estudios generales",
      "director de estudios generales ucss"
    ],
    keywords: [
      ['decano', 'estudios', 'generales']
    ],
    respuesta: "El Decano (e.) de la Facultad de Estudios Generales es el Mag. Rauf Saud Neme Sánchez."
  },
  {
    id: 'autoridad_director_postgrado',
    pregunta: "¿Quién es el Director de la Escuela de Postgrado?",
    variantes: [
      "director de postgrado ucss",
      "director de la escuela de posgrado"
    ],
    keywords: [
      ['director', 'postgrado'],
      ['director', 'posgrado'],
      ['escuela', 'postgrado']
    ],
    respuesta: "El Director (e.) de la Escuela de Postgrado es el Mag. Luis Napoleón Quiroz Avilés."
  },
  {
    id: 'autoridad_secretaria_general',
    pregunta: "¿Quién es la Secretaria General?",
    variantes: [
      "secretaria general de la ucss",
      "quien es la secretaria general"
    ],
    keywords: [
      ['secretaria', 'general']
    ],
    respuesta: "La Secretaria General de la UCSS es la Mtra. Carla María Bio Gaidolfi."
  },
  {
    id: 'autoridad_directores_filiales',
    pregunta: "¿Quiénes son los directores de las filiales de la UCSS?",
    variantes: [
      "directores de filiales ucss",
      "quien es el director de la filial tarma",
      "quien es la directora de la filial atalaya",
      "quien es el director de filial morropon",
      "quien es la directora de filial rioja",
      "quien es la directora de filial huaura"
    ],
    keywords: [
      ['directores', 'filiales'],
      ['director', 'sede', 'lima'],
      ['directora', 'atalaya'],
      ['directora', 'huaura'],
      ['director', 'tarma'],
      ['directora', 'rioja'],
      ['director', 'morropon']
    ],
    respuesta:
"Directores de Sedes y Filiales de la UCSS:\n" +
"- Sede Lima: Ing. Mario Antonio Gutiérrez Castillo\n" +
"- Filial Atalaya: Mtra. Jovita Vásquez Balarezo\n" +
"- Filial Huaura (Santa María): Lic. Marisella del Rosario Palomino Arroyo\n" +
"- Filial Tarma: Mtro. Jorge Arturo Ramos Silva\n" +
"- Filial Rioja (Nueva Cajamarca): Mtra. Brígida Carolina Gutiérrez Zúñiga\n" +
"- Filial Morropón (Chulucanas): Mtro. Luis Alberto Chiroque Farfán"
  },

  // ==========================================
  // TEMARIO EXAMEN DE ADMISIÓN 2026
  // ==========================================
  {
    id: 'admision_tipos_pesos',
    pregunta: "¿Cuál es la estructura y pesos por tipo de examen de admisión?",
    variantes: [
      "tipos de examen de admision ucss",
      "pesos de examen de admision",
      "resolucion 179 2025 temario",
      "ponderaciones del examen de admision"
    ],
    keywords: [
      ['tipos', 'examen'],
      ['pesos', 'examen'],
      ['estructura', 'examen', 'admision'],
      ['179', '2025']
    ],
    respuesta:
"Estructura y Ponderaciones del Examen de Admisión 2026 (Resolución N° 179-2025-UCSS-CU/R):\n\n" +
"1. Tipo 01 (FCEC, FCEH, FCAA):\n" +
"- Razonamiento Matemático: 50%\n" +
"- Razonamiento Verbal: 50%\n\n" +
"2. Tipo 02 (Ciencias de la Salud - FCS):\n" +
"- Razonamiento Verbal: 50%\n" +
"- Razonamiento Matemático: 20%\n" +
"- Química: 10%\n" +
"- Física: 10%\n" +
"- Biología: 10%\n\n" +
"3. Tipo 03 (Facultad de Ingeniería - FI):\n" +
"- Razonamiento Matemático: 30%\n" +
"- Razonamiento Verbal: 30%\n" +
"- Química: 10%\n" +
"- Física: 10%\n" +
"- Aritmética: 5%\n" +
"- Álgebra: 5%\n" +
"- Trigonometría: 5%\n" +
"- Geometría: 5%\n\n" +
"4. Tipo 04 (Derecho y Ciencias Políticas - FDCP):\n" +
"- Razonamiento Verbal: 40%\n" +
"- Razonamiento Matemático: 30%\n" +
"- Historia: 15%\n" +
"- Cultura General: 15%"
  },
  {
    id: 'admision_ingenieria_tipo03',
    pregunta: "¿Qué cursos y pesos vienen en el examen para la Facultad de Ingeniería?",
    variantes: [
      "examen tipo 03 ingenieria",
      "ponderacion examen ingenieria ucss",
      "materias examen ingenieria"
    ],
    keywords: [
      ['examen', 'ingenieria'],
      ['tipo', '03'],
      ['pesos', 'ingenieria']
    ],
    respuesta:
"Examen de Admisión Tipo 03 (Facultad de Ingeniería):\n" +
"- Razonamiento Matemático: 30%\n" +
"- Razonamiento Verbal: 30%\n" +
"- Química: 10%\n" +
"- Física: 10%\n" +
"- Aritmética: 5%\n" +
"- Álgebra: 5%\n" +
"- Trigonometría: 5%\n" +
"- Geometría: 5%"
  },
  {
    id: 'admision_salud_tipo02',
    pregunta: "¿Cuál es el temario y las ponderaciones para la Facultad de Ciencias de la Salud?",
    variantes: [
      "examen tipo 02 salud",
      "ponderacion examen de salud ucss",
      "materias examen ciencias de la salud"
    ],
    keywords: [
      ['examen', 'salud'],
      ['tipo', '02'],
      ['pesos', 'salud']
    ],
    respuesta:
"Examen de Admisión Tipo 02 (Facultad de Ciencias de la Salud):\n" +
"- Razonamiento Verbal: 50%\n" +
"- Razonamiento Matemático: 20%\n" +
"- Química: 10%\n" +
"- Física: 10%\n" +
"- Biología: 10%"
  },
  {
    id: 'admision_derecho_tipo04',
    pregunta: "¿Qué temas de Historia y Cultura General evalúan para la carrera de Derecho?",
    variantes: [
      "examen tipo 04 derecho",
      "ponderacion examen derecho ucss",
      "temas historia derecho ucss"
    ],
    keywords: [
      ['examen', 'derecho'],
      ['tipo', '04'],
      ['historia', 'cultura', 'general']
    ],
    respuesta:
"Examen Tipo 04 (Derecho y Ciencias Políticas) - Ponderaciones y Temas:\n" +
"- Ponderaciones: Razonamiento Verbal (40%), Razonamiento Matemático (30%), Historia (15%), Cultura General (15%).\n\n" +
"- Temas de Historia: Origen del hombre, poblamiento de América, culturas antiguas y civilizaciones precolombinas, Virreinato, República, fuentes de riqueza e historia peruana reciente.\n\n" +
"- Temas de Cultura General: Formas de gobierno, división de poderes, Revolución Francesa, Guerras Mundiales, organismos de DDHH, siglas e instrumentos normativos peruanos."
  },
  {
    id: 'admision_temas_verbal_matematico',
    pregunta: "¿Qué temas evalúan en Razonamiento Verbal y Razonamiento Matemático?",
    variantes: [
      "temario de razonamiento verbal ucss",
      "temario de razonamiento matematico ucss",
      "que temas vienen en razonamiento verbal"
    ],
    keywords: [
      ['temario', 'razonamiento'],
      ['temas', 'verbal'],
      ['temas', 'matematico']
    ],
    respuesta:
"Temas Generales de Admisión UCSS:\n\n" +
"Razonamiento Verbal:\n" +
"- Vocabulario: Sinónimos, antónimos, analogías, términos excluidos.\n" +
"- Comprensión y relación de ideas: Oraciones incompletas, plan de redacción, ilativos, oraciones eliminadas.\n" +
"- Comprensión de textos: Lecturas, tipología y jerarquía textual, fundamentos de comprensión lectora.\n" +
"- Gramática y Ortografía: Acentuación, morfología (coherencia, cohesión, conectores), sintaxis y raíces griegas/latinas.\n\n" +
"Razonamiento Matemático:\n" +
"- Números reales, fracciones, decimales, aplicaciones (mezclas, parte-todo).\n" +
"- Porcentajes, descuentos, aumentos y variaciones porcentuales.\n" +
"- Ecuaciones (1er/2do grado, sistemas), desigualdades e inecuaciones.\n" +
"- Logaritmos, función lineal, sistema coordenado rectangular.\n" +
"- Geometría plana: Áreas de regiones sombreadas y polígonos.\n" +
"- Estadística y Psicotécnico: Tablas/gráficos, sucesiones, analogías numéricas, cortes/estacas, engranajes y conteo de cubos."
  },

  // ==========================================
  // REGLAMENTO GENERAL DE ADMISIÓN
  // ==========================================
  {
    id: 'admision_modalidades',
    pregunta: "¿Cuáles son las modalidades de admisión para pregrado y postgrado?",
    variantes: [
      "modalidades de admision ucss",
      "como postular a la ucss",
      "resolucion 178 2024 admision",
      "modalidades para postgrado"
    ],
    keywords: [
      ['modalidades', 'admision'],
      ['modalidades', 'pregrado'],
      ['modalidades', 'postgrado'],
      ['178', '2024']
    ],
    respuesta:
"Modalidades de Admisión (Resolución N° 178-2024-UCSS-CU/R - Versión 06):\n\n" +
"Pregrado:\n" +
"1. Examen de Admisión General: Conocimientos por estricto orden de mérito.\n" +
"2. Comunidades Nativas (EIB): Examen y entrevista en lengua originaria (Asháninka, Awajún, Shipibo-Konibo, etc.) + examen general de conocimientos.\n" +
"3. Modalidades Especiales / Exonerados:\n" +
"   - Graduados o Titulados.\n" +
"   - Traslados Externos (mínimo 4 semestres o 72 créditos).\n" +
"   - Egresados de Institutos Superiores.\n" +
"   - Primeros Puestos (1° y 2° de secundaria).\n" +
"   - Tercio Superior y Colegio Mayor Secundario Presidente del Perú.\n" +
"   - Vía Escolar (5to de secundaria con prueba aprobatoria).\n" +
"   - Deportistas Calificados (IPD).\n" +
"   - Centro Pre Universitario UCSS.\n" +
"   - Traslados Internos y Alumnos Especiales.\n" +
"   - Admisión Especial (universidades con licencia denegada).\n\n" +
"Postgrado:\n" +
"- Regular: Entrevista personal y evaluación documentaria.\n" +
"- Graduados UCSS.\n" +
"- Traslados Externos e Internos."
  },
  {
    id: 'admision_comunidades_nativas',
    pregunta: "¿Cómo es el examen de admisión para el programa de Comunidades Nativas?",
    variantes: [
      "admision comunidades nativas ucss",
      "examen lengua originaria ucss",
      "admision educacion bilingue ucss"
    ],
    keywords: [
      ['comunidades', 'nativas'],
      ['lengua', 'originaria'],
      ['ashaninka']
    ],
    respuesta:
"Modalidad Comunidades Nativas (Educación Básica Bilingüe Intercultural):\n" +
"Comprende:\n" +
"1. Examen de Lengua Originaria (Asháninka, Awajún, Shipibo-Konibo, etc.).\n" +
"2. Entrevista personal conducida en la lengua originaria correspondiente.\n" +
"3. Examen general de conocimientos."
  },
  {
    id: 'admision_resultados_sanciones',
    pregunta: "¿Qué plazo hay para retirar documentos y qué sanciones hay por fraude en admisión?",
    variantes: [
      "plazo para retirar documentos admision",
      "sanciones por fraude admision",
      "suplantacion en examen de admision",
      "resultados del examen de admision",
      "devolucion de documentos admision"
    ],
    keywords: [
      ['retirar', 'documentos'],
      ['sanciones', 'admision'],
      ['suplantacion', 'admision'],
      ['fraude', 'admision'],
      ['devolucion', 'documentos']
    ],
    respuesta:
"Resultados, Devolución de Documentos y Sanciones de Admisión (Reglamento 2024):\n\n" +
"- Publicación de Resultados: Inapelables, publicados como 'INGRESÓ' o 'NO INGRESÓ'. Los no ingresantes pueden solicitar traslado a otra carrera como segunda opción si existen vacantes.\n" +
"- Retiro de Documentos: Los postulantes no ingresantes disponen de 30 días calendario post-resultados para retirar su documentación; concluido este plazo son destruidos sin opción a reclamo.\n" +
"- Sanciones por Fraude o Suplantación: Anulación del examen, denuncia fiscal ante el Ministerio Público e inhabilitación definitiva. Si participan miembros de la UCSS, serán separados definitivamente."
  },

  // ==========================================
  // JEFES DE PRÁCTICA Y AYUDANTES DE CÁTEDRA
  // ==========================================
  {
    id: 'jefes_de_practica',
    pregunta: "¿Cuáles son los requisitos, funciones y derechos del Jefe de Práctica?",
    variantes: [
      "reglamento de jefes de practica",
      "requisitos para jefe de practica",
      "funciones del jefe de practica",
      "resolucion 029 2018",
      "jefe de practica ucss"
    ],
    keywords: [
      ['jefe', 'practica'],
      ['jefes', 'practica'],
      ['029', '2018']
    ],
    respuesta:
"Reglamento de Jefes de Práctica (Resolución N° 029-2018-UCSS-AG/GC):\n\n" +
"- Naturaleza: Actividad de apoyo a la docencia y preliminar a la carrera docente (no ejercen carrera docente).\n" +
"- Requisitos: Contar con título profesional y aprobar la evaluación de la Facultad (hoja de vida y entrevista; clase magistral opcional a discreción).\n" +
"- Funciones: Elaborar material didáctico, investigar lecturas y casos, apoyar en revisión de evaluaciones continuas y parciales, orientar trabajos en equipo y ejecutar horas prácticas.\n" +
"- Deberes: Puntualidad, firma de asistencia, capacitaciones semestrales, trato cordial y vestimenta formal.\n" +
"- Derechos: Asignación económica por horas de labor, certificado semestral, préstamo bibliotecario y uso de ambientes docentes."
  },
  {
    id: 'ayudantes_de_catedra',
    pregunta: "¿Cuáles son los requisitos y funciones del Ayudante de Cátedra?",
    variantes: [
      "reglamento de ayudantes de catedra",
      "requisitos para ayudante de catedra",
      "funciones del ayudante de catedra",
      "resolucion 032 2018",
      "ayudante de laboratorio"
    ],
    keywords: [
      ['ayudante', 'catedra'],
      ['ayudantes', 'catedra'],
      ['ayudante', 'laboratorio'],
      ['032', '2018']
    ],
    respuesta:
"Reglamento de Ayudantes de Cátedra y Laboratorio (Resolución N° 032-2018-UCSS-AG/GC):\n\n" +
"- Requisitos: Ser estudiante de los 2 últimos años de la carrera y pertenecer al tercio superior (excepcionalmente egresados en zonas originarias). Aprobar evaluación de hoja de vida y entrevista.\n" +
"- Funciones: Asistir en material didáctico, controlar asistencia, apoyar en supervisión de exámenes y orientar trabajos grupales bajo guía del docente titular.\n" +
"- Deberes: Puntualidad (llegar 10 minutos antes), capacitaciones, firma de asistencia y vestimenta formal.\n" +
"- Derechos: Certificado semestral de participación, acceso a biblioteca y uso de instalaciones universitarias."
  },

  // ==========================================
  // REGLAMENTO DE DISCIPLINA DE ESTUDIANTES
  // ==========================================
  {
    id: 'disciplina_faltas_sanciones',
    pregunta: "¿Cuáles son las faltas y sanciones según el Reglamento de Disciplina?",
    variantes: [
      "reglamento de disciplina ucss",
      "sanciones disciplinarias ucss",
      "faltas de probidad academica",
      "plazo para apelar sancion disciplinaria",
      "resolucion 023 2017",
      "amonestacion escrita",
      "separacion temporal o definitiva"
    ],
    keywords: [
      ['disciplina'],
      ['faltas', 'sanciones'],
      ['amonestacion', 'escrita'],
      ['separacion', 'temporal'],
      ['separacion', 'definitiva'],
      ['023', '2017']
    ],
    respuesta:
"Reglamento de Disciplina de Estudiantes (Resolución N° 023-2017-UCSS-AG/GC):\n\n" +
"Tipos de Faltas:\n" +
"- Probidad Académica: Copiar en evaluaciones, plagio de tesis o trabajos, falsear citas o alterar registros de notas.\n" +
"- Ambiente Académico: Falsificar documentos, dañar instalaciones/equipos, alterar sistemas informáticos y proselitismo político.\n" +
"- Derechos y Ley: Agresión física o psicológica, actos contra la ley, pertenecer a agrupaciones ilegales.\n" +
"- Conducta Moral: Hostigamiento sexual, posesión o consumo de drogas en el campus (expulsión) y actos contra principios éticos.\n\n" +
"Clasificación de Sanciones:\n" +
"1. Amonestación Escrita (Código 51): Con nota de demérito y posible calificación cero (00) en la prueba.\n" +
"2. Separación Temporal (Código 52): Suspensión de derechos. Se aplica directamente o por acumular 2 amonestaciones.\n" +
"3. Separación Definitiva (Código 53): Expulsión permanente. Se aplica por faltas muy graves o por acumular 2 separaciones temporales.\n\n" +
"Instancias y Apelación:\n" +
"- 1ra Instancia: Decano de Facultad o Directora de Postgrado.\n" +
"- 2da Instancia (Inapelable): Vicerrector Académico.\n" +
"- Plazo de Apelación: Máximo 4 días útiles tras la notificación escrita."
  },

  // ==========================================
  // TRÁMITES Y FORMAS DE PAGO (GRADOS, TÍTULOS Y BANCOS)
  // ==========================================
  {
    id: 'costos_grados_titulos',
    pregunta: "¿Cuáles son los costos de trámites de Grados y Títulos?",
    variantes: [
      "costo de duplicado de bachiller",
      "costo de duplicado de titulo profesional",
      "costo de constancia de tramite de grado",
      "correo de grados y titulos",
      "duplicado de diploma",
      "rectificacion de diploma"
    ],
    keywords: [
      ['grados', 'titulos'],
      ['duplicado', 'bachiller'],
      ['duplicado', 'titulo'],
      ['costo', 'duplicado']
    ],
    respuesta:
"Trámites y Costos - Oficina de Grados y Títulos (gradosytitulos@ucss.edu.pe):\n\n" +
"- Duplicado de Grado de Bachiller por pérdida o deterioro: S/. 1,000.00\n" +
"- Duplicado de Título Profesional por pérdida o deterioro: S/. 1,000.00\n" +
"- Nuevo diploma por rectificación (judicial/notarial): S/. 1,000.00\n" +
"- Constancia de trámite (Grado o Título): S/. 25.00\n" +
"- Legalización de copia (Grado de Bachiller): S/. 20.00\n" +
"- Legalización de copia (Título Profesional): S/. 20.00\n" +
"- Legalización de copia (Grado de Maestro): S/. 20.00\n" +
"- Legalizaciones varias (Resoluciones): S/. 10.00"
  },
  {
    id: 'canales_de_pago',
    pregunta: "¿Cuáles son los canales y métodos de pago de pensiones?",
    variantes: [
      "como pagar pensiones ucss",
      "se puede pagar por yape",
      "pagar en bcp ucss",
      "tiempos de actualizacion de pago ucss",
      "flywire ucss"
    ],
    keywords: [
      ['canales', 'pago'],
      ['metodos', 'pago'],
      ['pagar', 'pensiones'],
      ['yape'],
      ['flywire'],
      ['actualizacion', 'pagos']
    ],
    respuesta:
"Canales y Métodos de Pago Oficiales UCSS:\n\n" +
"1. Pregrado Presencial:\n" +
"- Agentes y Bancos: Buscar 'Universidad Católica Sedes Sapientiae' -> 'Pensiones' -> Indicar código de estudiante.\n" +
"- Banca por Internet/Móvil: Buscar 'SAPIENTIAE' -> 'Pensiones' -> Indicar código.\n" +
"- Yape: Sección 'Yapear servicios' -> 'Universidad Católica Sedes Sapientiae' -> Código de alumno.\n" +
"*Nota BCP: Solo acepta pagos por aplicativo móvil y agentes autorizados.\n\n" +
"2. Postgrado Presencial y Semipresencial:\n" +
"- Buscar empresa 'Ucss Erp' -> Ingresar código de estudiante -> Seleccionar recibo.\n\n" +
"3. Pregrado y Postgrado Online:\n" +
"- Bancos: 'Pensiones Ucss Online' / Pasarela Flywire o SIU.\n\n" +
"Tiempos de Actualización en Cuenta Corriente:\n" +
"- Lunes a Viernes (hasta las 8:00 pm): Se actualizan en 24 horas.\n" +
"- Después de las 8:00 pm, fines de semana o feriados: Se actualizan en 48 a 72 horas."
  },
  {
    id: 'pago_yape',
    pregunta: "¿Cómo pagar las pensiones de la UCSS por Yape?",
    variantes: [
      "pagar por yape ucss",
      "yapear servicios ucss",
      "se puede pagar ucss con yape"
    ],
    keywords: [
      ['pagar', 'yape'],
      ['yapear', 'servicios'],
      ['yape', 'ucss']
    ],
    respuesta:
"Procedimiento para pagar por Yape:\n" +
"1. Ingresa a la aplicación de Yape.\n" +
"2. Selecciona la opción 'Yapear servicios'.\n" +
"3. Busca 'Universidad Católica Sedes Sapientiae'.\n" +
"4. Ingresa tu código de estudiante de la UCSS.\n" +
"5. Selecciona la cuota a cancelar y confirma el pago."
  },
  {
    id: 'tiempos_actualizacion_pago',
    pregunta: "¿Cuánto demoran en actualizarse los pagos en la cuenta corriente?",
    variantes: [
      "cuanto demora en reflejarse mi pago",
      "cuando se actualiza mi cuota pagada",
      "tiempo de actualizacion de cuenta corriente"
    ],
    keywords: [
      ['demora', 'pago'],
      ['actualiza', 'pago'],
      ['refleja', 'pago'],
      ['tiempo', 'actualizacion']
    ],
    respuesta:
"Tiempos de actualización de pagos en cuenta corriente:\n" +
"- Pagos realizados de Lunes a Viernes hasta las 8:00 pm: Se reflejan en un plazo de 24 horas.\n" +
"- Pagos realizados después de las 8:00 pm, fines de semana o feriados: Se reflejan en un plazo de 48 a 72 horas."
  },

  // ==========================================
  // CONSIDERACIONES ECONÓMICAS DEL SEMESTRE (OAA)
  // ==========================================
  {
    id: 'descuento_pago_puntual',
    pregunta: "¿Hay descuento por pago puntual de pensiones en la UCSS?",
    variantes: [
      "descuento por pago puntual",
      "cuanto es el descuento por pagar a tiempo",
      "beneficio por pagar puntual"
    ],
    keywords: [
      ['descuento', 'pago', 'puntual'],
      ['descuento', 'puntual']
    ],
    respuesta:
"Descuento por Pago Puntual (OAA 2026-II):\n" +
"- Beneficio: 10% de descuento en la cuota vigente.\n" +
"- Requisito: Estar al día en todas las cuotas previas del semestre.\n" +
"- Plazo: Válido hasta 10 días calendario posteriores al vencimiento de la cuota vigente."
  },
  {
    id: 'mora_recargos',
    pregunta: "¿Cuál es la tasa de mora y recargo por repitencia de créditos?",
    variantes: [
      "mora por pago tardio ucss",
      "recargo por curso jalado",
      "costo de creditos repetidos",
      "recargo por creditos electivos"
    ],
    keywords: [
      ['mora', 'tasa'],
      ['recargo', 'repitencia'],
      ['credito', 'repetido']
    ],
    respuesta:
"Mora y Recargos por Créditos (OAA 2026-II):\n" +
"- Mora Diaria: Se calcula según la tasa de interés interbancario fijada por el Banco Central de Reserva del Perú (BCRP).\n" +
"- Créditos Repetidos: S/. 5.00 adicionales por cada crédito repetido en cada cuota.\n" +
"- Créditos Electivos: S/. 1.00 adicional por cada crédito electivo en cada cuota."
  },
  {
    id: 'material_didactico',
    pregunta: "¿Cuál es el costo por material didáctico y en qué cuota se cobra?",
    variantes: [
      "costo de material didactico",
      "cuanto cobran por material didactico",
      "en que cuota se paga material didactico"
    ],
    keywords: [
      ['material', 'didactico']
    ],
    respuesta:
"Costo por Material Didáctico (OAA 2026-II):\n" +
"- Monto: S/. 5.00 por cada asignatura matriculada.\n" +
"- Cobro: Se factura e incluye automáticamente en la Cuota 3 del semestre.\n" +
"- Finalidad: Garantizar el acceso a plataformas y recursos digitales (biblioteca virtual, bases de datos académicas, grabaciones de clases y lecturas)."
  },

  // ==========================================
  // TRÁMITES ACADÉMICOS DE LA OAA
  // ==========================================
  {
    id: 'tramites_matricula_retiros',
    pregunta: "¿Cuáles son las reglas de matrícula, reservas y retiros de cursos?",
    variantes: [
      "retiro de asignatura plazo",
      "reserva de matricula ucss",
      "actualizacion de matricula",
      "cuando se pierde la condicion de estudiante",
      "examen rezagado final"
    ],
    keywords: [
      ['retiro', 'asignatura'],
      ['reserva', 'matricula'],
      ['actualizacion', 'matricula'],
      ['rezagado', 'final'],
      ['perdida', 'condicion', 'estudiante']
    ],
    respuesta:
"Reglas y Trámites de la Oficina de Asuntos Académicos (OAA):\n\n" +
"1. Matrícula y Actualización:\n" +
"- Se realiza por Intranet Pregrado previa aceptación de términos.\n" +
"- Se pierde la condición de estudiante al dejar de matricularse por más de 8 años lectivos (16 semestres consecutivos).\n" +
"- La rectificación con aumento de créditos no tiene costo; la disminución sí genera tasa de trámite.\n\n" +
"2. Reservas y Retiros:\n" +
"- Reserva de Vacante (ingresantes) o de Matrícula (regulares): Válida por hasta 2 semestres consecutivos.\n" +
"- Retiro de Asignatura o Semestre: Plazo máximo hasta el término de la semana 10. Tiene fines académicos pero no exonera pagos de las cuotas. Si no lo tramitas, figurarás como desaprobado.\n\n" +
"3. Evaluaciones Especiales:\n" +
"- Examen Rezagado Final: Únicamente aplicable al examen final por fuerza mayor. Evalúa todo el contenido del ciclo y la calificación máxima alcanzable es quince (15)."
  },
  {
    id: 'plazo_retiro_curso',
    pregunta: "¿Cuál es el plazo máximo para solicitar retiro de asignatura o semestre?",
    variantes: [
      "hasta cuando puedo retirar un curso",
      "plazo para retirar materia",
      "semana de retiro de cursos"
    ],
    keywords: [
      ['hasta', 'cuando', 'retirar'],
      ['plazo', 'retiro', 'curso'],
      ['plazo', 'retiro', 'asignatura']
    ],
    respuesta:
"Plazo para Retiro de Asignatura o Semestre:\n" +
"- Fecha límite: Hasta el término de la semana 10 de clases.\n" +
"- Efecto: Tiene fines académicos para no perjudicar tu historial de notas, pero no exonera las obligaciones económicas contraídas del semestre.\n" +
"- Importante: Si dejas de asistir sin tramitar el retiro oficial, el curso figurará como desaprobado."
  },
  {
    id: 'examen_rezagado_final',
    pregunta: "¿Cuáles son las condiciones y nota máxima de un examen rezagado final?",
    variantes: [
      "examen rezagado nota maxima",
      "como dar examen rezagado",
      "rezagado final ucss"
    ],
    keywords: [
      ['examen', 'rezagado'],
      ['rezagado', 'final'],
      ['nota', 'maxima', 'rezagado']
    ],
    respuesta:
"Examen Rezagado Final (OAA):\n" +
"- Aplicación: Permitido únicamente para el examen final y justificado por causas de fuerza mayor.\n" +
"- Alcance: Evalúa todo el contenido curricular del ciclo.\n" +
"- Calificación máxima: La nota máxima que se puede obtener es quince (15)."
  },

  // ==========================================
  // COSTOS DE LEGALIZACIONES
  // ==========================================
  {
    id: 'costos_legalizaciones',
    pregunta: "¿Cuáles son los costos de legalizaciones oficiales de documentos?",
    variantes: [
      "costo de legalizacion de silabos",
      "costo de legalizacion de plan de estudios",
      "costo de legalizacion de certificado de estudios",
      "costo de legalizacion de record academico",
      "tarifario de legalizaciones ucss"
    ],
    keywords: [
      ['costos', 'legalizaciones'],
      ['legalizacion', 'silabo'],
      ['legalizacion', 'plan', 'estudios'],
      ['legalizacion', 'record'],
      ['legalizacion', 'certificado']
    ],
    respuesta:
"Costos de Legalizaciones Oficiales UCSS:\n\n" +
"- Legalización de sílabos (por unidad): S/. 10.00\n" +
"- Legalización de sílabos para el extranjero (por unidad): S/. 20.00\n" +
"- Plan de estudios pregrado: S/. 150.00\n" +
"- Plan de estudios posgrado: S/. 200.00\n" +
"- Copia de Grado de Bachiller / Título Profesional / Maestro: S/. 20.00\n" +
"- Original de Grado de Bachiller / Título Profesional / Maestro: S/. 40.00\n" +
"- Original de Certificado de Estudios: S/. 50.00\n" +
"- Copia de Certificado de Estudios: S/. 30.00\n" +
"- Récord Académico original: S/. 30.00\n" +
"- Récord Académico copia: S/. 20.00\n" +
"- Legalizaciones varias por hoja: S/. 10.00"
  },

  // ==========================================
  // ESCUELA DE POSTGRADO (COSTOS Y MAESTRÍAS)
  // ==========================================
  {
    id: 'postgrado_maestrias_costos',
    pregunta: "¿Cuáles son los costos y programas de la Escuela de Postgrado?",
    variantes: [
      "maestrias de la ucss",
      "cuanto cuesta una maestria en la ucss",
      "costo de inscripcion a postgrado",
      "tramites escuela de postgrado",
      "resolucion 039 2019 postgrado",
      "mba ucss costos",
      "maestria en administracion publica"
    ],
    keywords: [
      ['maestria'],
      ['maestrias'],
      ['postgrado', 'costos'],
      ['posgrado', 'costos'],
      ['mba'],
      ['039', '2019']
    ],
    respuesta:
"Escuela de Postgrado UCSS (Resolución N° 039-2019-UCSS-CU/R):\n\n" +
"1. Inscripción: S/. 100.00 (Pago BCP servicio 'UCSS PAGOS VARIOS' código empresa 05976 con DNI). Enviar voucher a informesepg2@ucss.edu.pe.\n\n" +
"2. Tarifario de Maestrías:\n" +
"- MBA Internacional (FCEC): Matrícula S/. 500.00 | Cuota General S/. 945.00 (Comunidad S/. 725.00)\n" +
"- Maestría en Administración Pública (FCEC): Matrícula S/. 500.00 | Cuota General S/. 945.00 (Comunidad S/. 725.00)\n" +
"- Maestrías de Educación (FCEH - Psicopedagogía, Gestión Educativa, Filosofía y Religión, etc.): Matrícula S/. 250.00 | Cuota General S/. 550.00 (Comunidad S/. 450.00)\n" +
"- Bioética y Bioderecho (FCS): Matrícula S/. 280.00 | Cuota General S/. 450.00 (Comunidad S/. 350.00)\n\n" +
"3. Trámites Destacados:\n" +
"- Carné Universitario Postgrado: Gratuito (sin costo para el alumno).\n" +
"- Constancias (Estudios, Mérito, Libre Adeudo): S/. 40.00\n" +
"- Certificado de Estudios: S/. 200.00 (S/. 50.00 por ciclo)\n" +
"- Sustentación de Tesis: S/. 800.00\n" +
"- Trámite de Grado: S/. 3,000.00 (incluye certificado y libre adeudo)"
  },
  {
    id: 'postgrado_carne',
    pregunta: "¿El carné universitario de postgrado tiene algún costo?",
    variantes: [
      "carne de posgrado costo",
      "cuanto cuesta el carne de postgrado"
    ],
    keywords: [
      ['carne', 'postgrado'],
      ['carne', 'posgrado']
    ],
    respuesta:
"El Carné Universitario de Postgrado es tramitado por la Dirección Administrativa de la Escuela de Postgrado y es completamente gratuito (sin costo para el alumno)."
  },

  // ==========================================
  // PROGRAMA DE BECAS Y AYUDAS ECONÓMICAS
  // ==========================================
  {
    id: 'becas_normativa_tipos',
    pregunta: "¿Cuáles son los tipos de becas, requisitos y condiciones?",
    variantes: [
      "tipos de becas en la ucss",
      "requisitos para beca tercio superior",
      "beca primeros puestos ucss",
      "beca por orfandad",
      "recuperacion automatica de beca",
      "resolucion 005 2026 becas",
      "programa de becas ucss"
    ],
    keywords: [
      ['tipos', 'becas'],
      ['beca', 'primeros', 'puestos'],
      ['beca', 'tercio', 'superior'],
      ['beca', 'hermanos'],
      ['beca', 'orfandad'],
      ['prestamo', 'honor'],
      ['carta', 'compromiso', 'beca'],
      ['005', '2026']
    ],
    respuesta:
"Programa de Becas y Ayudas Económicas UCSS (Resolución N° 005-2026-UCSS-CU/R):\n\n" +
"Beneficios Operativos:\n" +
"- Pago Único Administrativo: S/. 50.00 por única vez. Todas las renovaciones posteriores son gratuitas.\n" +
"- Firma Única de Carta de Compromiso: Se firma una sola vez (mínimo 12 créditos matriculados), presencial en Pabellón P4 Piso 1 o vía Zoom.\n" +
"- Recuperación Automática: Si pierdes la beca por bajo promedio, se reactiva automáticamente por única vez al aprobar los cursos y alcanzar la nota requerida.\n\n" +
"Tipos de Becas y Requisitos de Renovación:\n" +
"1. Primeros Puestos: Media beca (50%). Requiere PPS >= 14 (1ra mitad de carrera) o PPS >= 15 (2da mitad).\n" +
"2. Tercio Superior: Cuarto de beca (25%). Requiere PPS >= 13 (1ra mitad) o PPS >= 14 (2da mitad).\n" +
"3. Hermanos UCSS: Cuarto de beca (25%). Familiar directo matriculado y 100% de cursos aprobados.\n" +
"4. Trabajador o Familiar Directo: Cuarto de beca (25%). Contrato vigente y 100% de cursos aprobados.\n" +
"5. Beca por Orfandad: Cobertura del 100% en matrícula, créditos, bachiller y título por fallecimiento o inhabilitación del responsable económico (menores de 24 años).\n" +
"6. Préstamo de Honor: Prórroga de pago con garante moral; requiere PPS >= 14 y aprobar todos los cursos.\n\n" +
"Reglas Generales:\n" +
"- Matrícula mínima de 12 créditos y no registrar deudas ni sanciones disciplinarias.\n" +
"- Las becas no son acumulables entre sí (salvo recategorización)."
  },
  {
    id: 'beca_tercio_superior',
    pregunta: "¿Qué beneficios y requisitos tiene la Beca por Tercio Superior?",
    variantes: [
      "beca por tercio superior ucss",
      "requisitos tercio superior beca",
      "cuanto descuenta la beca de tercio superior"
    ],
    keywords: [
      ['beca', 'tercio', 'superior'],
      ['descuento', 'tercio', 'superior']
    ],
    respuesta:
"Beca por Tercio Superior:\n" +
"- Descuento: Cuarto de Beca (25% de descuento en créditos cubiertos).\n" +
"- Requisitos de Renovación:\n" +
"  * Primera mitad de la carrera: Promedio Ponderado Semestral (PPS) mayor o igual a 13.\n" +
"  * Segunda mitad de la carrera: Promedio Ponderado Semestral (PPS) mayor o igual a 14.\n" +
"  * Aprobar todos los cursos y estar matriculado en un mínimo de 12 créditos."
  },
  {
    id: 'beca_primeros_puestos',
    pregunta: "¿Qué beneficios y requisitos tiene la Beca Primeros Puestos?",
    variantes: [
      "beca primeros puestos ucss",
      "requisitos beca primeros puestos",
      "cuanto descuenta la beca de primeros puestos"
    ],
    keywords: [
      ['beca', 'primeros', 'puestos'],
      ['descuento', 'primeros', 'puestos']
    ],
    respuesta:
"Beca Primeros Puestos:\n" +
"- Descuento: Media Beca (50% de descuento en créditos cubiertos).\n" +
"- Requisitos de Renovación:\n" +
"  * Primera mitad de la carrera: Promedio Ponderado Semestral (PPS) mayor o igual a 14.\n" +
"  * Segunda mitad de la carrera: Promedio Ponderado Semestral (PPS) mayor o igual a 15.\n" +
"  * Aprobar todos los cursos matriculados y llevar un mínimo de 12 créditos."
  },
  {
    id: 'beca_orfandad',
    pregunta: "¿Qué cobertura tiene la Beca por Orfandad en la UCSS?",
    variantes: [
      "beca por orfandad ucss",
      "requisitos beca por orfandad",
      "que cubre la beca por orfandad"
    ],
    keywords: [
      ['beca', 'orfandad']
    ],
    respuesta:
"Beca por Orfandad (UCSS):\n" +
"- Cobertura: 100% de matrícula, créditos curriculares, trámites de bachiller y título.\n" +
"- Requisito: Estudiante menor de 24 años cuyo responsable económico legal haya fallecido o quedado permanentemente inhabilitado.\n" +
"- Evaluación: A cargo de Bienestar Universitario. Se pierde al desaprobar más del 50% de créditos matriculados o por falta disciplinaria."
  },
  {
    id: 'prestamo_de_honor',
    pregunta: "¿Qué es el Préstamo de Honor de la UCSS y cuáles son sus requisitos?",
    variantes: [
      "prestamo de honor ucss",
      "como funciona el prestamo de honor",
      "requisitos prestamo de honor"
    ],
    keywords: [
      ['prestamo', 'honor']
    ],
    respuesta:
"Préstamo de Honor (UCSS):\n" +
"- Beneficio: Prórroga parcial o total en el pago de los créditos académicos cubiertos.\n" +
"- Requisitos: Presentar un garante moral mayor de edad, mantener un PPS mayor o igual a 14 y aprobar el 100% de los cursos matriculados.\n" +
"- Devolución: El reembolso del monto prorrogado comienza una vez que el estudiante egresa o se inserta al mercado laboral."
  },
  {
    id: 'beca_pago_administrativo_carta',
    pregunta: "¿Cuánto es el pago administrativo y cómo se firma la Carta de Compromiso de becas?",
    variantes: [
      "pago administrativo beca ucss",
      "carta de compromiso beca",
      "donde se firma la carta de compromiso",
      "cuanto demora en reflejarse la beca"
    ],
    keywords: [
      ['pago', 'administrativo', 'beca'],
      ['firma', 'carta', 'compromiso'],
      ['carta', 'compromiso']
    ],
    respuesta:
"Trámite de Beca (Pago y Carta de Compromiso):\n" +
"- Pago Administrativo: S/. 50.00 por única vez. Las siguientes renovaciones son completamente gratuitas.\n" +
"- Carta de Compromiso: Se firma una sola vez (se requiere matrícula mínima de 12 créditos).\n" +
"- Modalidades de firma:\n" +
"  * Presencial: Oficina de Becas (Pabellón P4, Piso 1, Gonzales Prada).\n" +
"  * Virtual: Mediante enlace de Zoom oficial de la OBAE.\n" +
"- Aplicación en cuenta corriente: El descuento se refleja en la cuenta corriente 7 días hábiles después de la firma."
  }
];

// Motor de coincidencia preprogramada
function buscarRespuestaPreprogramada(mensajeUsuario) {
  if (!mensajeUsuario || typeof mensajeUsuario !== 'string') {
    return { encontrada: false };
  }

  const queryNorm = normalizarTexto(mensajeUsuario);
  if (!queryNorm) return { encontrada: false };

  // 1. Coincidencia exacta o coincidencia por inclusión de texto suficiente
  for (const item of preguntasPreprogramadas) {
    const pregNorm = normalizarTexto(item.pregunta);
    if (queryNorm === pregNorm) {
      return { encontrada: true, respuesta: item.respuesta, pregunta: item.pregunta, match: 'exact' };
    }

    if (item.variantes) {
      for (const variante of item.variantes) {
        const vNorm = normalizarTexto(variante);
        if (queryNorm === vNorm || (queryNorm.includes(vNorm) && vNorm.length >= 8)) {
          return { encontrada: true, respuesta: item.respuesta, pregunta: item.pregunta, match: 'variante' };
        }
      }
    }
  }

  // 2. Puntuación por grupos de palabras clave requeridas
  let mejorMatch = null;
  let maxPuntos = 0;

  for (const item of preguntasPreprogramadas) {
    if (!item.keywords) continue;

    for (const group of item.keywords) {
      const matchAll = group.every(kw => queryNorm.includes(normalizarTexto(kw)));
      if (matchAll) {
        const puntos = group.reduce((acc, kw) => acc + kw.length, 0);
        if (puntos > maxPuntos) {
          maxPuntos = puntos;
          mejorMatch = item;
        }
      }
    }
  }

  if (mejorMatch && maxPuntos >= 6) {
    return {
      encontrada: true,
      respuesta: mejorMatch.respuesta,
      pregunta: mejorMatch.pregunta,
      match: 'keywords'
    };
  }

  return { encontrada: false };
}

// Obtener lista completa de preguntas sugeridas
function obtenerListaPreguntas() {
  return preguntasPreprogramadas.map(p => p.pregunta);
}

module.exports = {
  preguntasPreprogramadas,
  buscarRespuestaPreprogramada,
  obtenerListaPreguntas,
  normalizarTexto
};
