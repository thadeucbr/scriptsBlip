function run(nome, cpf, email, governoBahia, flowToken) {
    const governoBahiaBoolean = governoBahia.toLowerCase() === "true";
    let labelFooterInformacoesBasicas = governoBahiaBoolean ? "Seguir jornada" : "Finalizar";

    let data = {
        "nome": nome,
        "cpf": cpf,
        "email": email,
        "governoBahia": governoBahiaBoolean,
        "labelFooterInformacoesBasicas": labelFooterInformacoesBasicas
    }

    let conteudoDinamico = {
        "recipient_type": "individual",
        "messaging_product": "whatsapp",
        "type": "interactive",
        "interactive": {
            "type": "flow",
            "body": {
                "text": "Esta é uma jornada da Financeira para captura de informações de potenciais clientes.\n\nO cenário é o seguinte: o prospecto, em um evento do Safra, realiza a captura de um QR na sua cidade.\n\nAo final do evento, um representante do Banco diz que quem realizasse o cadastro receberia um brinde na recepção.\n\nPode ser que já tenhamos as informações desse potencial cliente. 😉"
            },
            "action": {
                "name": "flow",
                "parameters": {
                    "flow_message_version": "3",
                    "flow_token": flowToken,
                    "flow_id": "7806971272757854",
                    "flow_cta": "Inserir informações",
                    "flow_action": "navigate",
                    "flow_action_payload": {
                        "screen": "INFORMACOES_BASICAS",
                        "data": data
                    }
                }
            }
        }
    }

    return conteudoDinamico;
}