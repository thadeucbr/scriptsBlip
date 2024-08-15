function run(listaDeOcorrencias) {
    try {
        listaDeOcorrencias = JSON.parse(listaDeOcorrencias); //Lista de Ocorrencias
        let dataAtual = new Date();
        let itemAberto;
        for (let i = 0; i < listaDeOcorrencias.length; i++) {
            if (listaDeOcorrencias[i].descricaoStatus == "ABERTO" || listaDeOcorrencias[i].descricaoStatus == "EM ANDAMENTO") {
                itemAberto = listaDeOcorrencias[i];
                break;
            }
        }
        if (itemAberto) {
            let dataLimite = getDataFormatada(itemAberto.dataPrevistaEncerramento);
            if (dataLimite < dataAtual) {
                return `Fora do prazo`;
            }
        }
        return `Dentro do prazo`;
    }
    catch (e) {
        return e.message;
    }
}
function getDataFormatada(data) {
    let dataHoraInclusao = new Date(data);
    return dataHoraInclusao;
};

//Testes

var listaDeOcorrencias = [
    {
        "id": "31573",
        "idProtocolo": "20240806038862",
        "dataHoraAbertura": "2024-08-06T19:36:32",
        "descricaoStatus": "ABERTO",
        "descricaoMotivo": "CADASTRO",
        "descricaoSubmotivo": "DOMÍCILIO SAFRA",
        "motivoResolucao": null,
        "dataPrevistaEncerramento": "2024-08-16",
        "dataHoraEncerramento": null
    }
]

console.log(run(JSON.stringify(listaDeOcorrencias))); // Dentro do prazo