import log from '../../shared/log.js'

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

export default verificaConfigs;