const cc = JSON.stringify({
  "codigoCliente": "PF",
  "baseDocumento": "PF",
  "agencia": "PF",
  "agenciaCadastroBacen": "PF",
  "conta": "PF",
  "contaCorrenteSPD": false,
  "canal": "PF",
  "shortname": "SONIA MARIA DA CONCEICAO SHIGA",
  "usuario": "SONIA MARIA DA CONCEICAO SHIGA",
  "codigoSegmento": "00",
  "nivel": "MASTER",
  "nomeEmpresa": "SONIA MARIA DA CONCEICAO SHIGA",
  "tipoPessoa": "F",
  "doc": "02182741810",
  "nomeCompleto": "SONIA MARIA DA CONCEICAO SHIGA",
  "primeiroNome": "SONIA",
  "permissoes": [
      "alteracaoDeLimite",
      "alteracaoDeTelefoneECelular",
      "alterarAntecipAutomatica",
      "autorizacaoCompromissos",
      "bloquearEReemitir",
      "bloqueioDeCartao",
      "boletosComQrcodePix",
      "cadastroCelular",
      "cancelarAntecipAutomatica",
      "consLimiteCredito",
      "consultCancelDeVendas",
      "consultOperAutomatica",
      "consultaAntecipFornec",
      "consultaCadForneced",
      "consultaCartoes",
      "consultaDeProtocolo",
      "consultaLancamentoPix",
      "consultaMeusLimites",
      "consultaSolicitacao",
      "consultarChaves",
      "consultarCompromissos",
      "consultarOS",
      "consultarPacoteServico",
      "consultarSaldoDevedor",
      "contaGarantida",
      "desbloquear",
      "desbloqueioDeCartao",
      "desinstalacao",
      "extratoDeContaCorrente",
      "extratoSafrapay",
      "extratoSafrapayDaMaquina",
      "fatura",
      "habilitarAntecipAutomatica",
      "habilitarAntecipEventual",
      "inclusaoDeCompromissos",
      "limiteDisponivel",
      "limitesDeCreditos",
      "minhasChavesPix",
      "naoRecebiAVenda",
      "novaViaSenhaDeCartao",
      "novoExtratoSafrapay",
      "pacotesDeServicos",
      "pagamentosESaques",
      "perdaERoubo",
      "simuladorSafrapay",
      "simularFaturamentoAtual",
      "solicAntecipEvent",
      "solicCancelDeVendas",
      "solicitarAntecipAuto",
      "taxaDeAntecipacao",
      "transferenciaPix",
      "transferencias",
      "valorDisponivel"
  ],
  "ec": "001003820",
  "codigoEc": "001003820"
})

const intencoes = JSON.stringify([
  {
    "intent": "Acesso",
    "destinationBlock": "ed7daa5a-8ec1-479d-b17d-bbdb3093bf90",
    "destinationBot": "App",
    "requirements": [
      "agencia"
    ],
    "auth": false,
    "segmento": "PJ"
  },
  {
    "intent": "Alterações cadastrais",
    "destinationBlock": "8dde4e04-03a4-49d0-b329-73923e1d59b7",
    "destinationBot": "App",
    "requirements": [
      "agencia"
    ],
    "auth": false,
    "segmento": "PJ"
  },
  {
    "intent": "Alterar domicílio",
    "destinationBlock": "f2bd8402-1da3-41b4-ad11-2e5d699e3107",
    "destinationBot": "App",
    "requirements": [
      "agencia"
    ],
    "auth": false,
    "segmento": "PJ"
  },
  {
    "intent": "Antecipar Saldo",
    "destinationBlock": "16cc5d45-c8d8-4b01-b000-e76eff268c33",
    "destinationBot": "Bot Main",
    "requirements": [
      "agencia"
    ],
    "auth": false,
    "segmento": "PJ"
  },
  {
    "intent": "Aplicativo",
    "destinationBlock": "welcome",
    "destinationBot": "App",
    "requirements": [
      "agencia"
    ],
    "auth": false,
    "segmento": "PJ"
  },
  {
    "intent": "Baixar aplicativo",
    "destinationBlock": "b1c8e006-ddb2-4d2a-9832-b66b95b20c0c",
    "destinationBot": "App",
    "requirements": [
      "agencia"
    ],
    "auth": false,
    "segmento": "PJ"
  },
  {
    "intent": "Condições e taxas",
    "destinationBlock": "a5ddf643-13c0-4a81-a174-e1aa9dd86873",
    "destinationBot": "Bot Main",
    "requirements": [
      "agencia",
      "doc"
    ],
    "auth": false,
    "segmento": "PJ"
  },
  {
    "intent": "Consulta de Protocolo",
    "destinationBlock": "44c346c4-2d0e-41e0-aa1e-63da89563f8c",
    "destinationBot": "Bot Soluções",
    "requirements": [
      "agencia"
    ],
    "auth": false,
    "segmento": "PJ"
  },
  {
    "intent": "Consultar máquinas",
    "destinationBlock": "24ee326c-2f65-4cf1-944e-2b178eaf2a82",
    "destinationBot": "Bot Taxas e Condições",
    "requirements": [
      "agencia",
      "codigoEc",
      "doc"
    ],
    "auth": true,
    "segmento": "PJ|PF"
  },
  {
    "intent": "Consultar ordem de serviço",
    "destinationBlock": "fb46f9fc-1dfe-45f8-a9c6-09bfd80f21db",
    "destinationBot": "Bot OS",
    "requirements": [
      "doc"
    ],
    "auth": false,
    "segmento": "PJ"
  },
  {
    "intent": "Conta corrente",
    "destinationBlock": "daa2d803-2548-400e-8782-47ecaec9aca1",
    "destinationBot": "contacorrente",
    "requirements": [
      "agencia"
    ],
    "auth": false,
    "segmento": "PJ"
  },
  {
    "intent": "Contratar antecipacao",
    "destinationBlock": "a5ddf643-13c0-4a81-a174-e1aa9dd86873",
    "destinationBot": "Bot Taxas e Condições",
    "requirements": [
      "agencia",
      "doc"
    ],
    "segmento": "PJ|PF"
  },
  {
    "intent": "Descredenciamento",
    "destinationBlock": "c5482705-133e-4f31-b01e-7930e16e12a3",
    "destinationBot": "Bot Soluções",
    "requirements": [
      "agencia",
      "doc"
    ],
    "segmento": "PJ"
  },
  {
    "intent": "Domicílio bancário",
    "destinationBlock": "ad3f23f8-0c79-4faf-8b19-06ad242f99d2",
    "destinationBot": "Bot Taxas e Condições",
    "requirements": [
      "agencia",
      "codigoEc"
    ],
    "auth": true,
    "segmento": "PJ|PF"
  },
  {
    "intent": "Erro no aplicativo",
    "destinationBlock": "fbfdaef0-87b1-4457-9fb2-4e3c3932e3be",
    "destinationBot": "App",
    "requirements": [
      "agencia"
    ],
    "auth": false,
    "segmento": "PJ"
  },
  {
    "intent": "Máquinas Safrapay",
    "destinationBlock": "a5ddf643-13c0-4a81-a174-e1aa9dd86873",
    "destinationBot": "Bot Main",
    "requirements": [
      "agencia"
    ],
    "auth": false,
    "segmento": "PJ"
  },
  {
    "intent": "pacotes",
    "destinationBlock": "191a2f33-c58e-4a64-9e66-af23348bcbad",
    "destinationBot": "contacorrente",
    "requirements": [
      "agencia",
      "codigoEc",
      "doc"
    ],
    "auth": false,
    "segmento": "PJ"
  },
  {
    "intent": "Problemas de Login",
    "destinationBlock": "ed7daa5a-8ec1-479d-b17d-bbdb3093bf90",
    "destinationBot": "App",
    "requirements": [
      "agencia"
    ],
    "auth": false,
    "segmento": "PJ"
  },
  {
    "intent": "Questionar uma cobrança",
    "destinationBlock": "4a101355-7808-4bb7-a96d-7053a966074a",
    "destinationBot": "Bot Taxas e Condições",
    "requirements": [
      "agencia",
      "codigoEc"
    ],
    "auth": true,
    "segmento": "PJ|PF"
  },
  {
    "intent": "Simulador de vendas",
    "destinationBlock": "c391e959-860e-4eaf-86b9-71fcd8888c86",
    "destinationBot": "Bot Máquina Safrapay",
    "requirements": [
      "agencia"
    ],
    "auth": false,
    "segmento": "PJ|PF"
  },
  {
    "intent": "Suporte Técnico",
    "destinationBlock": "4f6e7e6d-21b4-4b11-9913-6aa5149a7469",
    "destinationBot": "Bot Máquina Safrapay",
    "requirements": [
      "agencia"
    ],
    "segmento": "PJ|PF"
  },
  {
    "intent": "Taxa Pix na SafraPay",
    "destinationBlock": "91dec6e6-2e08-462d-8d81-d38d2b223594",
    "destinationBot": "Bot Taxas e Condições",
    "requirements": [
      "agencia",
      "codigoEc",
      'ec'
    ],
    "auth": true,
    "segmento": "PJ|PF"
  },
  {
    "intent": "Taxas de antecipação",
    "destinationBlock": "cac63fde-6671-4aa1-9a67-efc2f5336711",
    "destinationBot": "Bot Taxas e Condições",
    "requirements": [
      "agencia",
      "codigoEc"
    ],
    "auth": true,
    "segmento": "PJ|PF"
  },
  {
    "intent": "Taxas de venda",
    "destinationBlock": "c4fec3d1-c20d-43de-9160-8a93f67989eb",
    "destinationBot": "Bot Taxas e Condições",
    "requirements": [
      "agencia",
      "codigoEc"
    ],
    "auth": true,
    "segmento": "PJ|PF"
  },
  {
    "intent": "Venda não recebida",
    "destinationBlock": "4b038e89-c130-4869-a541-4954e12ebf81",
    "destinationBot": "Bot Máquina Safrapay",
    "requirements": [
      "agencia"
    ],
    "auth": false,
    "segmento": "PJ|PF"
  },
  {
    "intent": "cartoes",
    "destinationBlock": "37f23f86-2009-43f1-b7a5-f50093c784f0",
    "destinationBot": "contacorrente",
    "requirements": [
      "agencia"
    ],
    "auth": false,
    "segmento": "PJ"
  },
  {
    "intent": "Extratos",
    "destinationBlock": "a508df2f-7177-4554-959b-2b62037f453b",
    "destinationBot": "contacorrente",
    "requirements": [
      "agencia",
      "cpfAppKey"
    ],
    "auth": false,
    "segmento": "PJ"
  },
  {
    "intent": "Extrato Conta Corrente",
    "destinationBlock": "91017043-1b92-4e8b-b4ae-2251ba97d6fd",
    "destinationBot": "contacorrente",
    "requirements": [
      "agencia"
    ],
    "auth": false,
    "segmento": "PJ"
  },
  {
    "intent": "Extrato recebimentos",
    "destinationBlock": "48bd2fab-30a5-46c8-8a6b-cf482187a66e",
    "destinationBot": "contacorrente",
    "requirements": [
      "agencia",
      "cpfAppKey"
    ],
    "auth": false,
    "segmento": "PJ"
  },
  {
    "intent": "Extrato vendas",
    "destinationBlock": "c9666009-688a-4b7f-913b-e16f3ec2ca36",
    "destinationBot": "contacorrente",
    "requirements": [
      "agencia",
      "cpfAppKey"
    ],
    "auth": false,
    "segmento": "PJ"
  }
]
)

function checkVariables(contaSelecionada, intent) {
  try {
      let variables = []
      if (contaSelecionada) {
          contaSelecionada = JSON.parse(contaSelecionada)
          if (!intent.segmento.includes(contaSelecionada.tipoPessoa)) {
              return variables
          }
          const keyContaSelecionada = Object.keys(contaSelecionada)
          keyContaSelecionada.forEach((key) => {
              if (contaSelecionada[key] && contaSelecionada[key] !== 'false') {
                  return variables.push(key)
              }
          })
          contaSelecionada.permissoes.forEach((permissao) => {
              variables.push(permissao)
          })
      }
      return variables
  } catch (err) {
      return []
  }
}

function run(intencaoIdentificada, contaSelecionada, intentDestination) {
  try {
      const intent = JSON.parse(intentDestination).find(intent => intent.intent.toLowerCase() === intencaoIdentificada.toLowerCase())
      const userContext = {
          variables: checkVariables(contaSelecionada, intent),
          destinationBlock: '',
          allowed: false,
          auth: false
      }
      if (intent) {
          if (intent.requirements.length === 0 || intent.requirements[0] === '') {
              userContext.allowed = true;
              userContext.destinationBlock = intent.destinationBlock;
              userContext.destinationBot = intent.destinationBot
          } else {
              userContext.allowed = intent.requirements.every(requirement => userContext.variables.includes(requirement));
              if (userContext.allowed) {
                  userContext.destinationBlock = intent.destinationBlock;
                  userContext.destinationBot = intent.destinationBot
                  userContext.auth = intent.auth
              }
          }
      }
      return userContext
  } catch (err) {
      return {
          allowed: false,
          destinationBlock: '',
          error: err.message
      }
  }
}

console.log(run('cartoes', cc, intencoes))