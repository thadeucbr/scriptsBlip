// Para utilizar essa função, adicione o fluxo (json do fluxo) na raiz do projeto.
const fs = require('fs');
const json2csv = require('json2csv').parse;
const path = require('path');

function identificarTrackings(fluxo, nome) {
const { flow } = fluxo


function getTransitFlows() {
  const keys = Object.keys(flow)
  let objetao = {}
  keys.forEach((key) => {
    const bloco = flow[key]["$title"]
    let objTracking = {}
    const trackingEntrada = flow[key]["$enteringCustomActions"].filter((item) => item.type === 'TrackEvent')
    const trackingSaida = flow[key]["$leavingCustomActions"].filter((item) => item.type === 'TrackEvent')

    const trackings = [...trackingEntrada, ...trackingSaida]

    trackings.forEach(item => {
      const tituloTracking = item['$title']
      const condicoesExecucao = item.conditions
      let condicaoExecucao = []

      if (condicoesExecucao.length > 0) {
        condicoesExecucao.forEach(({source, comparison, variable, values}) => {
          condicaoExecucao.push(`${source} ${comparison} ${variable ? 'variable: ' : ''}${variable || ''} ${values.length > 0 ? 'value: ': ''}${values || ''}`)
        })
        condicaoExecucao = condicaoExecucao.join('and ')
      } else {
        condicaoExecucao = 'Sem condicionais para execução'
      }
      objTracking[tituloTracking] = {
        'category': item.settings.category,
        'action': item.settings.action,
        'condicaoExecucao': condicaoExecucao
      }
    })
    objetao[bloco] = objTracking
  })
  return objetao
}


const data = getTransitFlows()

let csvData = [];

Object.keys(data).forEach((bloco) => {
  Object.keys(data[bloco]).forEach((tracking) => {
    let row = {
      Bot: nome,
      Bloco: bloco,
      Tracking: tracking,
      Category: data[bloco][tracking].category,
      Action: data[bloco][tracking].action,
      'Condição de Execução': Array.isArray(data[bloco][tracking].condicaoExecucao) ? JSON.stringify(data[bloco][tracking].condicaoExecucao) : data[bloco][tracking].condicaoExecucao
    };
    csvData.push(row);
  });
});

const csv = json2csv(csvData, { fields: ['Bot','Bloco', 'Tracking', 'Category', 'Action', 'Condição de Execução'] });

fs.writeFileSync(path.resolve(__dirname, `Trackings/${nome}-trackings.csv`), csv);
}

module.exports = { identificarTrackings }