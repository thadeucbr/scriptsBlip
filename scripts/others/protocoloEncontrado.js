function run(bodyConsultaProtocolo, bodyConsultaProtocoloLista, numeroProtocolo) {
    try {
        bodyConsultaProtocolo = JSON.parse(bodyConsultaProtocolo).data;
        bodyConsultaProtocoloLista = JSON.parse(bodyConsultaProtocoloLista).data;
        var protocoloInProtocolo = bodyConsultaProtocolo.id == numeroProtocolo;
        var protocoloInProtocoloLista = bodyConsultaProtocoloLista.some(item => item.idProtocolo == numeroProtocolo);
        if (protocoloInProtocoloLista == true && protocoloInProtocolo == true) {
            return "Sim"
        }
        return "Não"
    }
    catch (e) {
        return e.message;
    }
}


//tests
var bodyConsultaProtocolo = {
    "data": {
        "id": "20240806038862",
        "idCentralOrigem": "3",
        "documento": "07308577000104",
        "status": "3",
        "statusDescricao": "ENCERRADO",
        "dataHoraInclusao": "2024-08-06T19:36:32.847",
        "dataHoraEncerramento": "2024-08-06T19:40:50",
        "maiorSlaOcorrencia": null,
        "qtdOcorrencias": 1
    }
}
var bodyConsultaProtocoloLista = {
    "data": [
        {
            "id": "31573",
            "idProtocolo": "20240806038862",
            "dataHoraAbertura": "2024-08-06T19:36:32",
            "descricaoStatus": "ABERTO",
            "descricaoMotivo": "CADASTRO",
            "descricaoSubmotivo": "DOMÍCILIO SAFRA",
            "motivoResolucao": "Sua solicitação foi encerrada",
            "dataPrevistaEncerramento": "2024-08-13",
            "dataHoraEncerramento": null
        }
    ]
}
var numeroProtocolo = "20240806038862";

console.log(run(JSON.stringify(bodyConsultaProtocolo), JSON.stringify(bodyConsultaProtocoloLista), numeroProtocolo)); // returns "Sim"
