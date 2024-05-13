// Para utilizar essa função, adicione o fluxo (json do fluxo) na raiz do projeto.
const fs = require('fs');
const { Parser } = require('json2csv');
const path = require('path');

function identificaVariaveis (fluxo, nome) {
const { flow } = fluxo

function getTransitFlows() {
  const keys = Object.keys(flow)
  let objetao = {}
  keys.forEach((key) => {
    const bloco = flow[key]["$title"]
    let objTracking = {}
    const variaveisEntrada = flow[key]["$enteringCustomActions"].filter((item) => item.type === 'SetVariable')
    const variaveisSaida = flow[key]["$leavingCustomActions"].filter((item) => item.type === 'SetVariable')

    const scriptsEntrada = flow[key]["$enteringCustomActions"].filter((item) => item.type === 'ExecuteScript')
    const scriptsSaida = flow[key]["$enteringCustomActions"].filter((item) => item.type === 'ExecuteScript')

    const variaveis = [...variaveisEntrada, ...variaveisSaida]
    const scripts = [...scriptsEntrada, ...scriptsSaida]

    if (scripts.length > 0 ) {
      scripts.forEach(script => {
        objTracking[script.settings.outputVariable] = 'Execução de script'
      })
    }
    if (variaveis.length > 0 ) {
      variaveis.forEach(item => {
        objTracking[item.settings.variable] = item.settings.value
      })
    }
    if(variaveis.length > 0 || scripts.length > 0) {
      objetao[bloco] = objTracking
    }
  })
  return objetao
}


const data = getTransitFlows()
let csvData = [];

for (let bloco in data) {
  for (let variavel in data[bloco]) {
    let row = {
      Bot: nome,
      "Bloco": bloco,
      "Variavel": variavel,
      "Valor Setado": data[bloco][variavel],
      "Descrição": "" // Adicione a descrição aqui se tiver
    };
    csvData.push(row);
  }
}

const json2csvParser = new Parser();
const csv = json2csvParser.parse(csvData);

fs.writeFileSync(path.resolve(__dirname, `Variaveis/${nome}-variaveis.csv`), csv)
}

module.exports = { identificaVariaveis }