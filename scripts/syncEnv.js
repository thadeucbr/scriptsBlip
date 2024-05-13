const vars = require('./vars')
const verificaPublicacao = require('./utils/verificarUltimaPublicacao')
const verificaConfig = require('./utils/verificaConfigs')
const { verificaActions } = require('./utils/verificaActions')
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
async function getBotJsonAndUpdateFlow(keyOrigin, keyDestination) {
  const headers = {
    'Authorization': keyOrigin,
    'Content-Type': 'application/json'
  }
  const body = JSON.stringify({
    "id": "f09d5ff3-b6b6-441d-ac75-277e3e7c04e7",
    "method": "get",
    "uri": "/buckets/blip_portal:builder_working_flow"
  })
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: body,
    redirect: 'follow'
  };
  await fetch("https://msging.net/commands", requestOptions)
    .then(response => response.text())
    .then(result => {
      const { resource } = JSON.parse(result)
      updateFlow(keyDestination, resource)
    }).catch(err => log('vermelho', err.message))
}

async function updateFlow(key, flow) {
  const headers = {
    'Authorization': key,
    'Content-Type': 'application/json'
  }
  const body = JSON.stringify({
    "id": "f09d5ff3-b6b6-441d-ac75-277e3e7c04e7",
    "method": "set",
    "uri": "/buckets/blip_portal:builder_working_flow",
    type: "application/json",
    resource: flow
  })
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: body,
    redirect: 'follow'
  };
  await fetch("https://msging.net/commands", requestOptions).then((response) => response.text()).then((result) => {
    const { status, to } = JSON.parse(result)
    if (status === 'success') {
      log('verde', `${to.split('@')[0]} Status: ${status}`)
    } else {
      log('vermelho', `${to.split('@')[0]} Status: ${status}`)
    }
  })
}

function decodeName(origin, destination) {
  origin = Buffer.from(origin.split(' ')[1], 'base64').toString('utf8');
  destination = Buffer.from(destination.split(' ')[1], 'base64').toString('utf8');
  log('amarelo', `Iniciando atualização\nOrigem:${origin.split(':')[0]}\nDestino:${destination.split(':')[0]}\n\n`);
}

function updateEnv(origin, destination) {
  const keyOrigin = vars[origin].map(({key, name}) => ({key, name}))
  const keyDestination = vars[destination].map(({key, name}) => ({key, name}))
  keyOrigin.forEach(({key, name}) => {
    const destinationKey = keyDestination.find(({name: nameDestination}) => name === nameDestination)
    if (destinationKey) {
      decodeName(key, destinationKey.key)
      getBotJsonAndUpdateFlow(key, destinationKey.key)
    }
  })
}

function checkPublished(env) {
  const key = vars[env].map(({key, name}) => ({key, name}))
  key.forEach(({key, name}) => {
    // verificaPublicacao(key, name)
    // verificaConfig(key, name)
    // verificaActions(key, name)
  })
}

// updateEnv('local', 'beta')
checkPublished('beta')