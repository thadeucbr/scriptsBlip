function run(bodyConsultaProtocolo, listaDeOcorencias) {
    try {
        bodyConsultaProtocolo = JSON.parse(bodyConsultaProtocolo).data;
        listaDeOcorencias = JSON.parse(listaDeOcorencias);;
        let msgsProtocolo = "Segue status detalhado do seu protocolo:\n\n";
        msgsProtocolo += listaDeOcorencias.map((item) => {
            let msgProtocolo = `*Ocorrência*: ${item.descricaoMotivo} - ${item.descricaoSubmotivo}
*Status*: ${item.descricaoStatus}
*Aberto em*: ${getDataFormatada(item.dataHoraAbertura)}`;
            if (bodyConsultaProtocolo.statusDescricao == 'ENCERRADO') {
                if (item.dataHoraEncerramento != "0001-01-01T00:00:00") {
                    msgProtocolo += `\n*Encerrado em*: ${getDataFormatada(item.dataHoraEncerramento)}`;
                }
                if (item.motivoResolucao) {
                    msgProtocolo += `\n*Comentario*: ${item.motivoResolucao}`;
                }
            } else {
                msgProtocolo += `\n*Retorno previsto*: ${getDataFormatada(dataPrevistaEncerramento)}`;
                 if (item.motivoResolucao) {
                    msgProtocolo += `\n*Comentario*: ${item.motivoResolucao}`;
                }
            }
            return msgProtocolo;
        }).join("\n\n");

        return msgsProtocolo;
    }
    catch (e) {
        return e.message;
    }
}
function getDataFormatada(data) {
    let dataHoraInclusao = new Date(data);
    let dia = ("0" + dataHoraInclusao.getDate()).slice(-2);
    let mes = ("0" + (dataHoraInclusao.getMonth() + 1)).slice(-2);
    let ano = dataHoraInclusao.getFullYear();
    return `${dia}/${mes}/${ano}`;
};

//tests

var bodyConsultaProtocolo = {
    "data": {
        "id": "20240214033441",
        "idCentralOrigem": "86",
        "documento": "57484768000103",
        "status": "3",
        "statusDescricao": "ENCERRADO",
        "dataHoraInclusao": "2024-02-14T14:15:14.183",
        "dataHoraEncerramento": "0001-01-01T00:00:00",
        "maiorSlaOcorrencia": null,
        "qtdOcorrencias": 9
    }
}
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

console.log(run(JSON.stringify(bodyConsultaProtocolo), JSON.stringify(listaDeOcorencias))); //