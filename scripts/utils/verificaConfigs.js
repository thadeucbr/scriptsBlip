function log(cor, msg) {
  const cores = {
    reset: "\x1b[0m",
    vermelho: "\x1b[31m",
    verde: "\x1b[32m",
    amarelo: "\x1b[33m",
    azul: "\x1b[34m",
    magenta: "\x1b[35m",
    ciano: "\x1b[36m",
    branco: "\x1b[37m",
    marrom: "\x1b[33m",
    preto: "\x1b[30m",
    default: "\x1b[39m"
  }
  console.log(cores[cor], msg, cores.reset)
}
function verificaConfigs(key, name) {
  const myHeaders = new Headers();
myHeaders.append("Authorization", key);
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "id": "27dfbb8a-78eb-4b14-8fb0-03164b70aad4",
  "to": "postmaster@msging.net",
  "method": "get",
  "uri": "/buckets/blip_portal:builder_published_configuration"
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://msging.net/commands", requestOptions)
  .then((response) => response.text())
  .then((result) => {
    const { resource } = JSON.parse(result);
    let text = ''
    if (!resource['builder:stateTrack']) {
      text += 'Tracking global desativada\n'
    }
    if (!resource['builder:useTunnelOwnerContext']) {
      text += 'Contexto do roteador desativado desativado\n'
    }
    if (!resource['serviceName']) {
      text += 'serviceName não configurado\n'
    }
    if (text) {
      log('vermelho', `Configurações do ${name} não estão ok: ${text}`)
    } else {
      log('verde', `Configurações do ${name} estão ok`)
    }
  })
  .catch((error) => console.error(error));
}

module.exports = verificaConfigs