function run(inputUsuario, dynamicContent) {
  const posicoes = {
      "1": "primeir[oa]|u[mn]",
      "2": "segund[ao]|do[ie]s",
      "3": "terceir[ao]|tr[eê]s"
  }
  try {
      if (!inputUsuario) return 'inatividade'
      const regexDictionary = {}
      const { buttons } = JSON.parse(dynamicContent).interactive.action
      buttons.forEach((button, index) => {
          const key = `^(${index + 1}|${posicoes[index + 1]}|${button.reply.title.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()})$`
          regexDictionary[key] = button.reply.title
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