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
var id = "31573";


function run(bodyConsultaOcorrenciaLista,idOcorrencia) {
    try {
        let data = JSON.parse(bodyConsultaOcorrenciaLista).data;
        let filteredData = filterById(data, idOcorrencia);
        return filteredData;
    }
    catch (e) {
        return e.message;
    }
}

function filterById(data, id) {
    let filtered = data.filter(item => item.id === id)[0];
    if (!filtered) {
        return "Ocorrência não encontrada";
    }
    return filtered;
}


console.log(run(JSON.stringify(bodyConsultaProtocoloLista),id));