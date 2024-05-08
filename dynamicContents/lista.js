function run() {
	try {
		let defaultMenuOptions = [
			{
				"id": "1",
				"title": "Débito",
			},
			{
				"id": "2",
				"title": "Crédito",
			},
			{
				"id": "3",
				"title": "PIX",
			},
			{
				"id": "4",
				"title": "Boleto",
			},
			{
				"id": "5",
				"title": "TED",
			},
			{
				"id": "6",
				"title": "Tributos",
			}
		]
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
					"text": `Certo, primeiro selecione no menu abaixo qual o tipo de transação.👇`
				},
				"action": {
					"button": "Opções",
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
		return false;
	}
}