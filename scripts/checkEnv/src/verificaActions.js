import log from '../../shared/log.js'
import configs from '../configs.json' assert { type: "json" }

function verificaActions(key, name, env) {
  if (env !== 'prod') {
    env = 'dev'
  }
  const myHeaders = new Headers();
  myHeaders.append("Authorization", key);
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "id": "4de96993-08f9-40a4-928c-d3cce0ece63d",
    "to": "postmaster@msging.net",
    "method": "get",
    "uri": "/buckets/blip_portal:builder_published_global_actions"
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
      const actionsResource = [...resource['$leavingCustomActions'], ...resource['$enteringCustomActions']].map((action) => action['$title'])
      const mustHave = [...configs[env][name]['$leavingCustomActions'], ...configs[env][name]['$enteringCustomActions']].map((action) => action['$title'])
      const missing = mustHave.filter((action) => !actionsResource.includes(action))
      if (missing.length) {
        log('vermelho', `Ação do ${name} não está ok: ${missing}`)
      } else {
        log('verde', `Ação do ${name} está ok`)
      }
    })
    .catch((error) => console.error(error));
}

export default verificaActions;