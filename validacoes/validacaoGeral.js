function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

function botao(inputUsuario, dynamicContent) {
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
          const key = `^(${index + 1}|${posicoes[index + 1]}|${escapeRegExp(button.reply.title.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase())})$`
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

function lista(inputUsuario, dynamicContent) {
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

function run(inputUsuario, dynamicContent) {
  try {
    if(!inputUsuario) {
      return 'inatividade'
    }
    if (JSON.parse(dynamicContent).interactive.type === 'button') {
        return botao(inputUsuario, dynamicContent)
    } else {
        return lista(inputUsuario, dynamicContent)
    }
  } catch (err) {
    return 'input inesperado'
  }
}