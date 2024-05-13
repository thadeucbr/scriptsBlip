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
function getPublishedFlows(key) {
  let myHeaders = new Headers();
  myHeaders.append("Authorization", key);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    id: 'f09d5ff3-b6b6-441d-ac75-277e3e7c04e7',
    method: 'get',
    uri: '/buckets',
    type: 'application/json'
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


console.log(getPublishedFlows('Key c3BkbWFxdWluYXNhZnJhcGF5Ok1QRk9GMVdmTWVobzJ2cGk1NkhT'))