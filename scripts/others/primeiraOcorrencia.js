function run(listaDeOcorrencias) {
	try {
		listaDeOcorrencias = JSON.parse(listaDeOcorrencias); //Lista de Ocorrencias
		let dataAtual = new Date();
		let itemAberto;
		for (let i = 0; i < listaDeOcorrencias.length; i++) {
			if (listaDeOcorrencias[i].descricaoStatus == "ABERTO" || listaDeOcorrencias[i].descricaoStatus == "EM ANDAMENTO") {
				itemAberto = listaDeOcorrencias[i];
				return itemAberto;
			}
		}
	} catch (e) {
		return e.message;
	}
}
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

console.log(run(JSON.stringify(listaDeOcorrencias))); 