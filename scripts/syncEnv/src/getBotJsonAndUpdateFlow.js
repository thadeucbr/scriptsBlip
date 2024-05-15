import log from './log.js'
import updateFlow from './updateFlow.js';

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

export default getBotJsonAndUpdateFlow;