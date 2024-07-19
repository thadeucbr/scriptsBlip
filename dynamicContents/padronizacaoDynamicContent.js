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

const menuOptions = [
	{
		"id": "1",
		"title": "Perda ou Roubo",
		"description": "Bloqueio por perda ou roubo"
	},
	{
		"id": "2",
		"title": "Máquinas Safrapay",
		"description": "Taxas, Suporte, Retirada de máquina, Vendas, Antecipação, entre outros."
	},
	{
		"id": "3",
		"title": "Conta Corrente",
		"description": "Pix, Falar sobre conta, Consultar Pacotes"
	},
	{
		"id": "4",
		"title": "Soluções",
		"description": "Consulta de protocolo, Boletos, Descredenciamento"
	},
	{
		"id": "5",
		"title": "Apoio à Navegação",
		"description": "Acesso, Alterações cadastrais, Alterar domicílio"
	},
	{
		"id": "6",
		"title": "Transação não autorizada",
		"description": "Meu pagamento não foi autorizado"
	},
	{
		"id": "7",
		"title": "Produtos",
		"description": "Seguros, Investimento, Desempenho e Cartão,  Talão de cheque"
	}
]

function adicionaOpcaoNoMenu({ posicao, title, description }) {
	if (posicao > menuOptions.length) {
		posicao = Number(menuOptions[menuOptions.length - 1].id) + 1
	}
	if (menuOptions.find(option => option.id == posicao)) {
		quantidadeItens = menuOptions.length
		for (let i = Number(posicao - 1); i < quantidadeItens; i++) {
			menuOptions[i].id = (i + 2).toString()
		}
		menuOptions.push({
			id: posicao.toString(),
			title: title.slice(0, 24),
			description: description.slice(0, 72) || ''
		})
	} else {
		menuOptions.push({
			id: posicao.toString(),
			title: title.slice(0, 24),
			description: description.slice(0, 72)
		})
	}
	menuOptions.sort((a, b) => a.id - b.id)
}

function atualizaOpcaoMenu({ parametroDeBusca, title, description }) {
	// Parametro de busca é o title ou description da opção que deseja atualizar
	const opcao = menuOptions.find(option => option.title === parametroDeBusca || option.description === parametroDeBusca)
	if (!opcao) {
		return
	}
	menuOptions.find(option => option.id === opcao.id).title = title.slice(0, 24)
	menuOptions.find(option => option.id === opcao.id).description = description.slice(0, 72) || ''
}

function verificaPermissao({ tituloDoBotao, permissoes, permissoesNecessarias }) {
	const opcao = menuOptions.find(option => option.title === tituloDoBotao || option.description === tituloDoBotao)
	if (permissoes.includes(permissoesNecessarias)) {
		return
	}
	if (!opcao) {
		return
	}
	const index = menuOptions.indexOf(opcao)
	menuOptions.splice(index, 1)
}
function run(contaSelecionada) {
	try {
		const { cpfAppKey, permissoes, ec, segmentoGerente } = JSON.parse(contaSelecionada)
		if (!ec) {
			atualizaOpcaoMenu({
				parametroDeBusca: 'Máquinas Safrapay',
				title: 'Máquinas Safrapay',
				description: 'Condições e taxas, Suporte, Vendas, Antecipação, entre outros.'
			})
		}

		if (cpfAppKey != 'false') {
			atualizaOpcaoMenu({
				parametroDeBusca: 'Conta Corrente',
				title: 'Conta Corrente',
				description: 'Extratos, Fazer pix, Antecipar saldo, Falar sobre conta, entre outros.'
			})
		}

		if (segmentoGerente) {
			if (segmentoGerente == 'emp1') {
				atualizaOpcaoMenu({
					parametroDeBusca: 'Produtos',
					title: 'Produtos',
					description: 'Seguros, Investimento, Renegociação, Gravame, Desempenho e Cartão'
				})
			} else {
				atualizaOpcaoMenu({
					parametroDeBusca: 'Produtos',
					title: 'Produtos',
					description: 'Seguros, Investimento, Renegociação, Cartão, Cheque, entre outros.'
				})
			}
		}
		verificaPermissao({ tituloDoBotao: 'Conta Corrente', permissoes, permissoesNecessarias: 'extratoDeContaCorrente' })
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
					"text": `Ah! Você também pode digitar *Voltar* para voltar uma etapa, e *Sair* para finalizar o atendimento a qualquer momento.`
				},
				"action": {
					"button": "Escolha uma opção",
					"sections": [
						{
							"title": "",
							"rows": menuOptions
						}
					]
				}
			}
		}
	} catch (err) {
		return {
			error: err.message,
			exceptionType: 'reiniciarFluxo',
			dynamicContent: {
			}
		}
	}
}

console.log(run(exemploContaSelecionada))