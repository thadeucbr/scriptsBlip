
function run(dadosCartao) {
    dadosCartao = JSON.parse(dadosCartao);
    const template_name = "facilitaai_rastreio_cartao_segunda_tentativa";
    return {
        "type": "template", "template":
        {
            "name": template_name,
            "language":
            {
                "policy": "deterministic",
                "code": "pt_BR"
            },
            "components": [
                {
                    "type": "body",
                    "parameters": [
                        {
                            "type": "text",
                            "text": dadosCartao.descricao
                        },
                        {
                            "type": "text",
                            "text": dadosCartao.funcao
                        },
                        {
                            "type": "text",
                            "text": dadosCartao.numero
                        }
                    ]
                }
            ]
        }
    }
}