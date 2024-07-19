function run(contaSelecionada) {
	try {
		const parsedContaSelecionada = JSON.parse(contaSelecionada)
		let defaultMenuOptions = [
		]
		if (cpfAppKey && cpfAppKey != 'false') {
			defaultMenuOptions = [
			]
		}
		if (!selectedEc) {
			defaultMenuOptions = [
			]
		}
		if (parsedContaSelecionada.segmentoGerente) {
			if (parsedContaSelecionada.segmentoGerente == "emp1") {
				defaultMenuOptions.find(option => option.title === "Produtos").description = "Seguros, Investimento, Renegociação, Gravame, Desempenho e Cartão"
			}
			else {
				defaultMenuOptions.find(option => option.title === "Produtos").description = "Seguros, Investimento, Renegociação, Cartão, Cheque, entre outros."
			}
		}
		return {
			"recipient_type": "individual",
			"type": "interactive",
			"interactive": {
				"type": "list",
				"header": {
					"type": "text",
					"text": ""
				},
				"body": {
					"text": `Ah! Você também pode digitar *Voltar* para voltar uma etapa, e *Sair* para finalizar o atendimento a qualquer momento.`
				},
				"action": {
					"button": "Escolha uma opção",
					"sections": [
						{
							"title": "",
							"rows": defaultMenuOptions
						}
					]
				}
			}
		}
	} catch (err) {
		return err.message;
	}
}