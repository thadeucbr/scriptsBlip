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
    if (data) {
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
    return "00/00/0000"
}

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
        "id": "21712793",
        "idProtocolo": "20240830010032",
        "dataHoraAbertura": "2024-08-30T12:24:34",
        "descricaoStatus": "ENCERRADO",
        "descricaoMotivo": "ACESSO CANAIS",
        "descricaoSubmotivo": "DISPOSITIVO COM ACESSO FRAGILIZADO",
        "motivoResolucao": null,
        "dataPrevistaEncerramento": "2024-09-02",
        "dataHoraEncerramento": "2024-08-30T15:45:01"
    },
    {
        "id": "21717706",
        "idProtocolo": "20240830010032",
        "dataHoraAbertura": "2024-08-30T15:45:01",
        "descricaoStatus": "ABERTO",
        "descricaoMotivo": "IB/MOBILE",
        "descricaoSubmotivo": "TRANSAÇÃO NÃO AUTORIZADA NO IB OU APP",
        "motivoResolucao": null,
        "dataPrevistaEncerramento": "2024-09-02",
        "dataHoraEncerramento": null
    }
]



console.log(run(JSON.stringify(bodyConsultaProtocolo), JSON.stringify(listaDeOcorencias))); //