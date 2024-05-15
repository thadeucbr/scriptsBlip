import log from '../../shared/log.js'
import configs from '../configs.json' assert { type: "json" }

async function verificaConfigs(key, name, env) {
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
      for (const key in configs[env][name].config) { //  || resource[key] !== configs[env][name][key] (verifica valor da chave)
        if (!resource.hasOwnProperty(key)) {
          text += `${key} não está configurado corretamente\n`
        }
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