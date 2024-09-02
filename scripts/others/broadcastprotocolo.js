function run(ocorrenciasEncontradas) {
    try {
        ocorrenciasEncontradas = JSON.parse(ocorrenciasEncontradas);
        let msg = "";
        for (let index = 0; index < ocorrenciasEncontradas.length; index++) {
            msg += `*Status*: ${getStatus(ocorrenciasEncontradas[index].descricaoStatus)}
${ocorrenciasEncontradas[index].descricaoMotivo} - ${ocorrenciasEncontradas[index].descricaoSubmotivo}
*Protocolo*: ${ocorrenciasEncontradas[index].idProtocolo}.${ocorrenciasEncontradas[index].id}
*Aberto em*: ${getDataFormatada(ocorrenciasEncontradas[index].dataHoraAbertura)}
*Fechado em*: ${getDataFormatada(ocorrenciasEncontradas[index].dataHoraEncerramento)}
${obsExiste(ocorrenciasEncontradas[index].motivoResolucao)}\n`;
        }

        return msg;
    }
    catch (e) {
        return e.message;
    }
}


function getStatus(status) {
    if (status == 'ABERTO') {
        return "⚠ Em aberto"
    }
    if (status == 'ENCERRADO') {
        return "✔ Encerrado"
    } else {
        return "🔍 Em análise"
    }
}
function getDataFormatada(data) {
    let partes = data.split(/[-\/]/);
    let ano = parseInt(partes[0], 10);
    let mes = parseInt(partes[1], 10) - 1;
    let dia = parseInt(partes[2], 10);
    let dataHora = new Date(ano, mes, dia);

    let diaFormatado = ("0" + dataHora.getDate()).slice(-2);
    let mesFormatado = ("0" + (dataHora.getMonth() + 1)).slice(-2);
    let anoFormatado = dataHora.getFullYear();

    return `${diaFormatado}/${mesFormatado}/${anoFormatado}`;
}

function obsExiste(obs) {
    if (obs) {
        return `*Observação*: ${obs}`
    }
    else
        return '';
}

// tests

var listaDeOcorencias = [
    {
      id: '29164',
      idProtocolo: '20240214033441',
      dataHoraAbertura: '2024-02-20T11:57:39',
      descricaoStatus: 'ENCERRADO',
      descricaoMotivo: 'ARRECADAÇÃO',
      descricaoSubmotivo: 'CANCELAMENTO',
      motivoResolucao: null,
      dataPrevistaEncerramento: '2024-02-23',
      dataHoraEncerramento: '2024-02-21T14:51:55'
    },
    {
      id: '29165',
      idProtocolo: '20240214033441',
      dataHoraAbertura: '2024-02-20T12:00:02',
      descricaoStatus: 'ENCERRADO',
      descricaoMotivo: 'ARRECADAÇÃO',
      descricaoSubmotivo: 'CANCELAMENTO',
      motivoResolucao: null,
      dataPrevistaEncerramento: '2024-02-23',
      dataHoraEncerramento: '2024-02-21T14:51:55'
    },
    {
      id: '29131',
      idProtocolo: '20240214033441',
      dataHoraAbertura: '2024-02-14T14:17:00',
      descricaoStatus: 'ENCERRADO',
      descricaoMotivo: 'Canais Digitais',
      descricaoSubmotivo: 'INTERNET BANKING',
      motivoResolucao: null,
      dataPrevistaEncerramento: '2024-02-19',
      dataHoraEncerramento: '2024-02-14T14:17:29'
    }
]

console.log(run(JSON.stringify(listaDeOcorencias))); // should print the formatted messages in a single string



