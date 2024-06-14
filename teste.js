function run(cpfAppKey, ec) {
    try {
        let defaultMenuOptions = [
            {
                "id": "5",
                "title": "Cheque empresas",
                "description": "Como solicitar novo talão de cheques"
            },
            {
                "id": "6",
                "title": "Falar sobre conta",
                "description": ""
            },
            {
                "id": "10",
                "title": "Pacotes contratados",
                "description": ""
            },
        ]

        if (!cpfAppKey) {

            const cpfAppKeyOnlyOptions = [
                {
                    "id": "2",
                    "title": "Pix",
                    "description": ""
                }
            ]
            defaultMenuOptions = [...defaultMenuOptions, ...cpfAppKeyOnlyOptions].sort((a, b) => a.id - b.id)
        }



        if (cpfAppKey) {
            //  defaultMenuOptions = defaultMenuOptions.filter(({ id }) => id !== "2")

            const cpfAppKeyOnlyOptions = [
                {
                    "id": "1",
                    "title": "Extratos",
                    "description": "Consulte os extratos de sua conta"
                },
                {
                    "id": "2",
                    "title": "Fazer Pix",
                    "description": "Realize um pix"
                },
                {
                    "id": "3",
                    "title": "Pagar Contas",
                    "description": "Pagar boleto com código de barras"
                },
                {
                    "id": "4",
                    "title": "Antecipar saldo",
                    "description": "Antecipação de recebíveis"
                }
            ]
            defaultMenuOptions = [...defaultMenuOptions, ...cpfAppKeyOnlyOptions].sort((a, b) => a.id - b.id)
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
                    "text": `Certo! Sobre *Conta Corrente*, do que você precisa? Escolha na lista a seguir.👇`
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

console.log(run().interactive.action.sections[0].rows)