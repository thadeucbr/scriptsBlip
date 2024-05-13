function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }

function run(inputUsuario, dynamicContent) {
  const posicoes = {
      "1": "primeir[oa]|u[mn]",
      "2": "segund[ao]|do[ie]s",
      "3": "terceir[ao]|tr[eê]s",
      "4": "quart[ao]|[qc]uat(r)?o",
      "5": "quint[ao]|[sc]inc[ou]",
      "6": "sext[ao]|[sc]inc[uo]",
      "7": "s[eé]tim[ao]|[sc]et[ei]",
      "8": "oitav[ao]|oit[ou]",
      "9": "non[ao]|nov[ei]",
      "10": "d[eé][cs]im[ou]|d[ée][sz]"
  }
  try {
      if (!inputUsuario) return 'inatividade'
      const regexDictionary = {}
      const { rows } = JSON.parse(dynamicContent).interactive.action.sections[0]
      rows.forEach((button, index) => {
            const key = `^(${index + 1}|${posicoes[index + 1]}|${escapeRegExp(button.reply.title.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase())})$`
          regexDictionary[key] = button.title
      })
      for (let regex in regexDictionary) {
          if (new RegExp(regex, 'i').test(inputUsuario.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
              return regexDictionary[regex]
          }
      }
      return 'input inesperado'
  } catch (err) {
      return 'input inesperado'
  }
}

var obj = {
    "recipient_type": "individual",
    "type": "interactive",
    "interactive": {
        "type": "list",
        "header": {
            "type": "text",
            "text": ""
        },
        "body": {
            "text": "Agora, por gentileza, selecione no menu abaixo a opção desejada.👇"
        },
        "action": {
            "button": "Assuntos",
            "sections": [
                {
                    "title": "",
                    "rows": [
                        {
                            "id": "1",
                            "title": "Suporte",
                            "description": "Ajuda com problemas na máquina"
                        },
                        {
                            "id": "2",
                            "title": "Configurações",
                            "description": "Ajuda com as configurações básicas da máquina."
                        },
                        {
                            "id": "3",
                            "title": "Erros gerais",
                            "description": "Mensagens de erro na máquina"
                        }
                    ]
                }
            ]
        }
    }
}

console.log(run('Configuração', JSON.stringify(obj))) // Suporte