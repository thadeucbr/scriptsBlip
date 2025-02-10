const dynamicContent = {
  "recipient_type": "individual",
  "type": "interactive",
  "interactive": {
    "type": "cta_url",
    "body": {
      "text": ""
    },
    "action": {
      "name": "cta_url",
      "parameters": {
        "display_text": "",
        "url": ""
      }
    }
  }
}

function run() {
  try {
    dynamicContent.interactive.body.text = `Preciso que confirme o seu número de telefone. Para isso, você precisa acessar o aplicativo e realizar o processo por lá.

Após atualizar o seu cadastro, volte aqui e envie um *oi* que eu já confirmo a atualização.`
    dynamicContent.interactive.action.parameters.display_text = `Acessar o app`
    dynamicContent.interactive.action.parameters.url = `https://google.com.br`
    return dynamicContent
  } catch (err) {
    return false
  }
}