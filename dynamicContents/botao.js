function run() {
	try {
		const buttons = [
			{
				"type": "reply",
				"reply": {
					"id": "1",
					"title": "Sim"
				}
			},
			{
				"type": "reply",
				"reply": {
					"id": "2",
					"title": "Não"
				}
			}
		];
		const bodyText = "O problema foi resolvido? 🤔";
		return {
			"recipient_type": "individual",
			"type": "interactive",
			"interactive": {
				"type": "button",
				"body": {
					"text": bodyText,
				},
				"action": {
					buttons
				}
			}
		};
	} catch (err) {
		return false;
	}
}