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

/**
 * @typedef {Object} MenuOption
 * @property {string} id - ID da opção do menu
 * @property {string} title - Título da opção do menu
 * @property {string} description - Descrição da opção do menu
 */

/**
 * Adicione as opções que devem ser exibidas por padrão para todos os usuários. 
 * O id deve ser igual a posição do menu que será exibido o botão. Ex: { id: 1 } para o primeiro item da lista.
 * @type {MenuOption[]}
 */
const menuOptions = [
	{
		"id": "1",
		"title": "Contratar",
		"description": ""
	},
	{
		"id": "2",
		"title": "Cancelamento",
		"description": ""
	},
	{
		"id": "3",
		"title": "Dúvidas",
		"description": ""
	}
]

/**
 * @typedef {Object} MenuOption
 * @property {number} posicao - Posição que o botão deve ser inserido no menu
 * @property {string} title - Título do botão
 * @property {string} description - Descrição do botão
 */
/**
 * @summary Essa função adiciona uma opção (botão) no menu de acordo com a posição informada e reordena todos os botões.
 * @param {MenuOption} option - Objeto contendo a posição, título e descrição do botão
 * @example adicionaOpcaoNoMenu({ posicao: 2, title: 'Conta Corrente', description: 'Extratos, Fazer pix, Antecipar saldo, Falar sobre conta, entre outros.' })
 */
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

/**
 * @typedef {Object} MenuOptionUpdate
 * @property {string} parametroDeBusca - Título ou descrição da opção que deseja atualizar
 * @property {string} title - Novo título do botão
 * @property {string} description - Nova descrição do botão
 */

/**
 * @summary Essa função atualiza o título e descrição de uma opção (botão) do menu.
 * @param {MenuOptionUpdate} option - Objeto contendo o título ou descrição da opção que deseja atualizar, novo título e nova descrição do botão
 * @example atualizaOpcaoMenu({ parametroDeBusca: 'Conta Corrente', title: 'Conta Corrente', description: 'Extratos, Fazer pix, Antecipar saldo, Falar sobre conta, entre outros.' })
 */
function atualizaOpcaoMenu({ parametroDeBusca, title, description }) {
	// Parametro de busca é o title ou description da opção que deseja atualizar
	const opcao = menuOptions.find(option => option.title === parametroDeBusca || option.description === parametroDeBusca)
	if (!opcao) {
		return
	}
	menuOptions.find(option => option.id === opcao.id).title = title.slice(0, 24)
	menuOptions.find(option => option.id === opcao.id).description = description.slice(0, 72) || ''
}
/**
 * @typedef {Object} PermissionCheck
 * @property {string} tituloDoBotao - Título ou descrição da opção que deseja verificar
 * @property {Array.<string>} permissoes - Permissões do usuário (usar o array de permissões da conta selecionada)
 * @property {string} permissoesNecessarias - Permissão necessária para exibir a opção
 */

/**
 * @summary Essa função verifica se o usuário possui a permissão necessária para exibir a opção no menu.
 * @param {PermissionCheck} permission - Objeto contendo o título ou descrição da opção que deseja verificar, permissões do usuário e permissão necessária para exibir a opção
 * @example verificaPermissao({ tituloDoBotao: 'Conta Corrente', permissoes: ['extratoDeContaCorrente'], permissoesNecessarias: 'extratoDeContaCorrente' })
 */
function verificaPermissao({ tituloDoBotao, permissoes, permissoesNecessarias }) {
	const opcao = menuOptions.find(option => option.title === tituloDoBotao || option.description === tituloDoBotao);

	if (!opcao) {
		return;
	}

	const hasPermission = permissoesNecessarias.some(necessaria => permissoes.includes(necessaria));

	if (hasPermission) {
		return;
	}

	const index = menuOptions.indexOf(opcao);
	if (index > -1) {
		menuOptions.splice(index, 1);
	}
}

function removeOpcaoDoMenu({ tituloDoBotao }) {
	const opcao = menuOptions.find(option => option.title === tituloDoBotao || option.description === tituloDoBotao)
	if (!opcao) {
		return
	}
	const index = menuOptions.indexOf(opcao)
	menuOptions.splice(index, 1)
}

/**
 * @typedef {Object} ContaSelecionada
 * @property {number} codigoCliente
 * @property {string} baseDocumento
 * @property {string} agencia
 * @property {string} agenciaCadastroBacen
 * @property {string} conta
 * @property {(boolean|string)} contaCorrenteSPD
 * @property {string} canal
 * @property {string} shortname
 * @property {string} usuario
 * @property {number} codigoSegmento
 * @property {string} nivel
 * @property {string} nomeEmpresa
 * @property {string} tipoPessoa
 * @property {string} doc
 * @property {string} nomeCompleto
 * @property {string} primeiroNome
 * @property {string} filaGerente
 * @property {Array.<string>} permissoes
 * @property {string} cpfAppKey
 * @property {(boolean|string)} ec
 * @property {string} segmentoGerente
 */

/**
 * @param {ContaSelecionada} contaSelecionada - Objeto contendo as informações da conta selecionada
 * @description Dentro do try, defina todas as regras de exibição, utilizando as funções disponiveis: "verificaPermissao", "atualizaOpcaoMenu", "adicionaOpcaoNoMenu"
 */
function run(contaSelecionada) {
	try {
		// const { segmentoGerente } = JSON.parse(contaSelecionada)

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
				"type": "text/plain",
				"content": `Estamos fazendo alguns ajustes no sistema e alguns recursos podem estar temporariamente indisponíveis. Em breve, estaremos de volta ao normal.`
			}
		}
	}
}

console.log(run(exemploContaSelecionada))