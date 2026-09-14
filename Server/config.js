const LOGIN_URL = 'https://intranet.ucss.edu.pe/ucss-intranet/login/ingresar.aspx';
const HORARIO_URL = 'https://intranet.ucss.edu.pe/ucss-intranet/academico/horario.aspx';
const NOTAS_URL = 'https://intranet.ucss.edu.pe/ucss-intranet/academico/notas.aspx';

const groqConfig = {
  apiKey: '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',
  baseURL: 'https://api.groq.com/openai/v1'
};

module.exports = {
  LOGIN_URL,
  HORARIO_URL,
  NOTAS_URL,
  groqConfig
};
