// Para utilizar essa função, adicione o fluxo (json do fluxo) na raiz do projeto.
const fs = require('fs');
const json2csv = require('json2csv').parse;
const path = require('path');

function identificarChamadas(fluxo, nome) {
console.log('AQUI', nome)

const { flow } = fluxo


function getTransitFlows() {
  const keys = Object.keys(flow)
  let objetao = {}
  keys.forEach((key) => {
    const bloco = flow[key]["$title"]
    let objTracking = {}
    const httpEntrada = flow[key]["$enteringCustomActions"].filter((item) => item.type === 'ProcessHttp')
    const httpSaida = flow[key]["$leavingCustomActions"].filter((item) => item.type === 'ProcessHttp')

    const requestsHttp = [...httpEntrada, ...httpSaida]

    requestsHttp.forEach(item => {
      const tituloRequest = item['$title']
      const { method, uri, responseStatusVariable, responseBodyVariable, body, headers } = item.settings;
      objTracking[tituloRequest] = {
        uri,
        method,
        responseBodyVariable,
        responseStatusVariable,
        body,
        description: '',
        token: headers.Authorization
      }
    })
    objetao[bloco] = objTracking
  })
  return objetao
}


const data = getTransitFlows()

let csvData = [];

Object.keys(data).forEach((bloco) => {
  Object.keys(data[bloco]).forEach((process) => {
    let row = {
      Bot: nome,
      Bloco: bloco,
      'Nome do Script': process,
      'Endpoint': data[bloco][process].uri,
      'Metodo': data[bloco][process].method,
      'Token': data[bloco][process].token,
      'Variavel De Resposta': data[bloco][process].responseBodyVariable,
      'Variavel De Status': data[bloco][process].responseStatusVariable,
      'Descrição': data[bloco][process].description,
      'Variavel enviada no body': data[bloco][process].body || '-'
    };
    csvData.push(row);
  });
});

const csv = json2csv(csvData, { fields: ['Bot','Bloco', 'Nome do Script', 'Endpoint', 'Metodo', 'Token','Variavel De Resposta', 'Variavel De Status', 'Variavel enviada no body', 'Descrição'] });

fs.writeFileSync(path.resolve(__dirname, `Requests/${nome}-http.csv`), csv);
}

module.exports = { identificarChamadas }