import log from '../../shared/log.js'
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

export default updateFlow