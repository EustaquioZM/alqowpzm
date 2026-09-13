const LOGIN_URL = 'https://intranet.ucss.edu.pe/ucss-intranet/login/ingresar.aspx';
const HORARIO_URL = 'https://intranet.ucss.edu.pe/ucss-intranet/academico/horario.aspx';
const NOTAS_URL = 'https://intranet.ucss.edu.pe/ucss-intranet/academico/notas.aspx';

const groqConfig = {
  apiKey: process.env.GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1'
};

module.exports = {
  LOGIN_URL,
  HORARIO_URL,
  NOTAS_URL,
  groqConfig
};
