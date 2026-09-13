document.getElementById('loginForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const button = document.getElementById('btnProcesar');
  const result = document.getElementById('resultado');

  button.textContent = 'Verificando con la Intranet...';
  button.disabled = true;
  result.style.display = 'none';

  const usuario = document.getElementById('usuario').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuario, password })
    });

    const data = await response.json();

    result.style.display = 'block';
    if (data.success) {
      result.className = 'exito';
      result.textContent = data.message;
      setTimeout(() => {
        window.location.href = data.redirectUrl;
      }, 1000);
    } else {
      result.className = 'error';
      result.textContent = data.message;
    }
  } catch (error) {
    result.style.display = 'block';
    result.className = 'error';
    result.textContent = 'Error de conexión con el servidor interno.';
  } finally {
    button.textContent = 'Probar Login';
    button.disabled = false;
  }
});
