function formatarData(dataStr) {
    const [ano, mes, dia] = dataStr.split("-");
    return `${dia}/${mes}/${ano}`;
  }
  function formatarNomeTransferencia(dataStr) {
    if (dataStr == "DOC") {
      return "DOC/TED"
    }
    return "Tranferência"
  }
  function formatarValor(number) {
    return number
      .toFixed(2) // Garantir que sempre tenha 2 casas decimais
      .replace('.', ',') // Substituir ponto por vírgula
      .replace(/(\d)(?=(\d{3})+(?=\D))/g, '$1.'); // Adicionar separador de milhar
  }
  
  function run(flowToken, dataArray) {
    dataArray = JSON.parse(dataArray).data;
    let objOpcoes = [];
    dataArray.slice(0, 30).forEach((data, index) => {
      objOpcoes.push({
        "id": `${data.operacao.numero}`,
        "title": `Tipo: ${formatarNomeTransferencia(data.operacao.tipo)} ➖ Data: ${formatarData(data.data)} ➖ Valor: R$ ${formatarValor(data.valor)}`,
      })
    });
  
    let data = {
      "dataSourceComprovantes": objOpcoes
    }
  
    let conteudoDinamico = {
      "recipient_type": "individual",
      "messaging_product": "whatsapp",
      "type": "interactive",
      "interactive": {
        "type": "flow",
        "body": {
          "text": "De qual comprovante você precisa?\n\nÉ só tocar no botão abaixo que te mostro."
        },
        "action": {
          "name": "flow",
          "parameters": {
            "flow_message_version": "3",
            "flow_token": flowToken,
            "flow_id": "1221428179156903",
            "flow_cta": "Ver comprovante",
            "flow_action": "navigate",
            "flow_action_payload": {
              "screen": "SELECIONAR_COMPROVANTE",
              "data": data
            }
          }
        }
      }
    }
    return conteudoDinamico;
  }