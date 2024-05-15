import vars from '../shared/vars.js';
const { dev, beta, prod, local } = vars;
import { writeFileSync, existsSync, mkdirSync } from 'fs';

const date = Intl.DateTimeFormat('pt-BR').format(new Date()).replaceAll('/', '-')

async function getBotJson({ key, bot, env }) {
  let myHeaders = new Headers();
  myHeaders.append("Authorization", key);
  myHeaders.append("Content-Type", "application/json");

  let raw = JSON.stringify({
    "id": "f09d5ff3-b6b6-441d-ac75-277e3e7c04e7",
    "method": "get",
    "uri": "/buckets/blip_portal:builder_latestpublications"
  });

  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  const index = await fetch("https://msging.net/commands", requestOptions)
    .then(response => response.text())
    .then(result => {
      const parsedData = JSON.parse(result)
      const { resource } = parsedData;
      const index = resource.publications.sort((a, b) => a.publishedAt - b.publishedAt)[0]
      return index.index
    })
    .catch(error => console.log('error', error));

  raw = JSON.stringify({
    "id": "f09d5ff3-b6b6-441d-ac75-277e3e7c04e7",
    "method": "get",
    "uri": `/buckets/blip_portal:builder_latestpublications:${index}`
  });

  requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  await fetch("https://msging.net/commands", requestOptions)
    .then(response => response.text())
    .then(result => {
      const { resource } = JSON.parse(result)
      writeFileSync(`./backup/${date}/${env}/${bot}.json`, JSON.stringify(resource))
    }
    )
    .catch(error => console.log('error', error));
}

const bots = [...dev, ...beta, ...prod, ...local]
function backup(index) {
  if (index === 0 && !existsSync(`./backup/${date}`)) {
    mkdirSync(`./backup/${date}/local`, { recursive: true })
    mkdirSync(`./backup/${date}/dev`, { recursive: true })
    mkdirSync(`./backup/${date}/beta`, { recursive: true })
    mkdirSync(`./backup/${date}/prod`, { recursive: true })
  }
  if (index >= bots.length) {
    console.log('Backup concluido.')
    return;
  }

  setTimeout(() => {
    getBotJson(bots[index]);
    backup(index + 1);
  }, 500);
}

backup(0);