import log from '../../shared/log.js'
async function updateFlow(key, flow) {
  const headers = {
    'Authorization': key,
    'Content-Type': 'application/json'
  }
  const body = JSON.stringify({
    "id": "6cdace09-2f5d-4693-a2f2-40c69e76b79c",
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
  await fetch("https://safra.http.msging.net/commands", requestOptions).then((response) => response.text()).then((result) => {
    const { status, to } = JSON.parse(result)
    if (status === 'success') {
      log('verde', `${to.split('@')[0]} Status: ${status}`)
    } else {
      log('vermelho', `${to.split('@')[0]} Status: ${status}`)
    }
  })
}

export default updateFlow