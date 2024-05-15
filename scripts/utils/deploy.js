try {
  startPublishFlow();
}
catch (e) {
  console.log(e);
}

function startPublishFlow() {
  const fs = require('fs');
  const path = require('path');
  const directoryPath = './deploy'
  const key = 'Key YmV0YXNwZGZpbmFsaXphY2FvOmlhYkpRaFBhVEh0bnJzVFp1Vldo'
  const files = fs.readdirSync(directoryPath);
  const firstFile = files[0];
  const data = JSON.parse(fs.readFileSync(path.join(directoryPath, firstFile)));
  const flow = data.flow;
  publishbotjson(key, flow);
}

function publishbotjson(key, data) {
  let myHeaders = new Headers();
  myHeaders.append("Authorization", key);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    id: 'f09d5ff3-b6b6-441d-ac75-277e3e7c04e7',
    method: "set",
    uri: "/buckets/blip_portal:builder_working_flow",
    type: "application/json",
    resource: data
  });

  var requestOptions = {
    method: 'post',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("https://msging.net/commands", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}