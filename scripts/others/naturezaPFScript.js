const exemploContaSelecionada = JSON.stringify({
    "codigoCliente": 505148,
    "baseDocumento": "000250699",
    "agencia": "11500",
    "agenciaCadastroBacen": "0115",
    "conta": "000275291",
    "contaCorrenteSPD": false,
    "canal": "IPJ",
    "shortname": "AGK CORRETO 250",
    "usuario": "AGK CORR",
    "codigoSegmento": 11,
    "nivel": "MASTER",
    "nomeEmpresa": "AGK CORRETORA DE CAMBIO SA                                       ",
    "tipoPessoa": "PJ",
    "doc": "00250699000148",
    "nomeCompleto": "JOANA PAULA SILVA",
    "primeiroNome": "Joana",
    "filaGerente": "DOUGBOR",
    "permissoes": [
        "consultaCartoes",
        "bloqueioDeCartao",
        "desbloqueioDeCartao",
        "novaViaSenhaDeCartao",
        "desbloqueioDeCartao",
        "bloqueioDeCartao",
        "fatura",
        "consLimiteCredito",
        "consLimiteCredito",
        "extratoDeContaCorrente",
        "consultarPacoteServico",
        "limitesDeCreditos",
        "extratoSafrapay",
        "solicitarAntecipAuto",
        "consultOperAutomatica",
        "solicAntecipEvent",
        "consultarCompromissos",
        "novoExtratoSafrapay",
        "solicCancelDeVendas",
        "consultCancelDeVendas",
        "simuladorSafrapay",
        "desinstalacao",
        "consultaSolicitacao",
        "consultaAntecipFornec",
        "inclusaoDeCompromissos",
        "autorizacaoCompromissos",
        "consultaCadForneced",
        "transferenciaPix",
        "minhasChavesPix",
        "consultaLancamentoPix",
        "contaGarantida",
        "boletosComQrcodePix",
        "cadastroCelular"
    ],
    "cpfAppKey": "false",
    "ec": false,
    "segmentoGerente": "emp1"
})
const dynamicContent = {
    "recipient_type": "individual",
    "type": "document",
    "document": {
      "link": "<MEDIA_URL>", // REQUIRED - URL of image asset on your public server. For better performance, we recommend that you upload your media asset instead.
      // "caption": "<DOCUMENT_CAPTION>", // OPTIONAL - Document caption text.
      "filename": "<DOCUMENT_FILENAME>" // OPTIONAL - Document filename, with extension. The WhatsApp client will use an appropriate file type icon based on the extension.
    }
  }
  function run(extratoResponse, dataExtractor) {
    try {
      const [inicial, final] = dataExtractor.split(' - ')
      console.log(inicial)
      const [anoInicial, mesInicial, diaInicial] = inicial.split('-')
      const [anoFinal, mesFinal, diaFinal] = final.split('-')
      const periodo = `extrato_de_${diaInicial}-${mesInicial}-${anoInicial}_a_${diaFinal}-${mesFinal}-${anoFinal}.pdf`
      return periodo
      const { data } = JSON.parse(extratoResponse)
      if (!data.urlDocumento) {
        return false
      }
      dynamicContent.document.link = data.urlDocumento
      // dynamicContent.document.caption = 'teste'
      dynamicContent.document.filename = periodo
      return dynamicContent
    } catch (err) {
      return false
    }
  }

  console.log(run(undefined, '2022-01-10 - 2023-01-10'))