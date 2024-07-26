import log from '../../shared/log.js'
import vars from '../../shared/vars.js';

const difference = (setA, setB) => {
  return [...setA].filter(x => !setB.has(x));
}

async function verificaConfigs(botName) {
  try {
    const betaKey = vars.beta.find(({ name }) => name === botName).key;
    const prodKey = vars.prod.find(({ name }) => name === botName).key;
  
    const myHeaders = new Headers();
    myHeaders.append("Authorization", betaKey);
    myHeaders.append("Content-Type", "application/json");
  
    const raw = JSON.stringify({
      "id": "27dfbb8a-78eb-4b14-8fb0-03164b70aad4",
      "to": "postmaster@msging.net",
      "method": "get",
      "uri": "/buckets/blip_portal:builder_working_configuration"
    });
  
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
  
    const beta = new Set(await fetch("https://msging.net/commands", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const { resource } = JSON.parse(result);
        return Object.keys(resource)
      }))
  
    requestOptions.headers.set("Authorization", prodKey)
    const prod = new Set(await fetch("https://msging.net/commands", requestOptions)
      .then((response) => response.text()
        .then((result) => {
          const { resource } = JSON.parse(result);
          return Object.keys(resource)
        })))
  
        const diff = difference(beta, prod)
        if (diff.length) {
          log('vermelho', `${botName}: ${diff.join(', ')}`)
        } else {
          log('verde', `${botName}: OK`)
        }
  } catch (err) {
    log('vermelho', `Erro ao verificar configurações do bot ${botName}: ${err.message}`)
  }
}

export default verificaConfigs;