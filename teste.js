const listaPermissoes = JSON.stringify({
	"SQE": {
		"1": "consultaCartoes",
		"5": "desbloqueioDeCartao",
		"6": "novaViaSenhaDeCartao",
		"4": "bloqueioDeCartao"
	},
	"CMU": {
		"2": "desbloqueioDeCartao",
		"7": "fatura",
		"4": "bloqueioDeCartao"
	},
	"CPR": {
		"3": "consLimiteCredito"
	},
	"POS": {
		"23": "limitesDeCreditos",
		"4": "extratoDeContaCorrente",
		"5": "consultarPacoteServico",
		"3": "consLimiteCredito"
	},
	"SPA": {
		"1": "extratoSafrapay",
		"6": "novoExtratoSafrapay",
		"2": "solicitarAntecipAuto",
		"3": "consultOperAutomatica",
		"4": "solicAntecipEvent",
		"5": "consultarCompromissos",
		"17": "solicCancelDeVendas",
		"18": "consultCancelDeVendas",
		"21": "simuladorSafrapay"
	},
	"GDM": {
		"3": "consultaSolicitacao",
		"2": "desinstalacao"
	},
	"AFO": {
		"1": "consultaAntecipFornec"
	},
	"PAG": {
		"48": "minhasChavesPix",
		"44": "transferenciaPix",
		"51": "consultaLancamentoPix",
		"9": "consultaCadForneced",
		"6": "inclusaoDeCompromissos",
		"7": "autorizacaoCompromissos"
	},
	"CRE": {
		"1": "contaGarantida"
	},
	"COB": {
		"32": "boletosComQrcodePix"
	},
	"NCL": {
		"1": "cadastroCelular"
	}
})

const bodypermissoes = JSON.stringify({ "data": [{ "codigoGrupo": "AFO", "codigoServico": "1" }, { "codigoGrupo": "AFO", "codigoServico": "2" }, { "codigoGrupo": "AFO", "codigoServico": "3" }, { "codigoGrupo": "AFO", "codigoServico": "4" }, { "codigoGrupo": "AFO", "codigoServico": "5" }, { "codigoGrupo": "AFO", "codigoServico": "7" }, { "codigoGrupo": "CBS", "codigoServico": "4" }, { "codigoGrupo": "CBS", "codigoServico": "5" }, { "codigoGrupo": "CBS", "codigoServico": "6" }, { "codigoGrupo": "CBS", "codigoServico": "7" }, { "codigoGrupo": "CBS", "codigoServico": "8" }, { "codigoGrupo": "CBS", "codigoServico": "9" }, { "codigoGrupo": "CBS", "codigoServico": "10" }, { "codigoGrupo": "CBS", "codigoServico": "11" }, { "codigoGrupo": "CBS", "codigoServico": "12" }, { "codigoGrupo": "CBS", "codigoServico": "13" }, { "codigoGrupo": "CBS", "codigoServico": "14" }, { "codigoGrupo": "CBS", "codigoServico": "15" }, { "codigoGrupo": "CBS", "codigoServico": "16" }, { "codigoGrupo": "CCI", "codigoServico": "1" }, { "codigoGrupo": "CCY", "codigoServico": "1" }, { "codigoGrupo": "CCY", "codigoServico": "2" }, { "codigoGrupo": "CCY", "codigoServico": "3" }, { "codigoGrupo": "CHQ", "codigoServico": "1" }, { "codigoGrupo": "CHQ", "codigoServico": "2" }, { "codigoGrupo": "CHQ", "codigoServico": "3" }, { "codigoGrupo": "CHQ", "codigoServico": "4" }, { "codigoGrupo": "CHQ", "codigoServico": "5" }, { "codigoGrupo": "CHQ", "codigoServico": "10" }, { "codigoGrupo": "CHQ", "codigoServico": "11" }, { "codigoGrupo": "CHS", "codigoServico": "1" }, { "codigoGrupo": "CHS", "codigoServico": "2" }, { "codigoGrupo": "CHS", "codigoServico": "5" }, { "codigoGrupo": "CHS", "codigoServico": "8" }, { "codigoGrupo": "CHS", "codigoServico": "9" }, { "codigoGrupo": "CHS", "codigoServico": "10" }, { "codigoGrupo": "CMC", "codigoServico": "1" }, { "codigoGrupo": "CMC", "codigoServico": "2" }, { "codigoGrupo": "CMC", "codigoServico": "3" }, { "codigoGrupo": "CMU", "codigoServico": "1" }, { "codigoGrupo": "CMU", "codigoServico": "2" }, { "codigoGrupo": "CMU", "codigoServico": "3" }, { "codigoGrupo": "CMU", "codigoServico": "4" }, { "codigoGrupo": "CMU", "codigoServico": "5" }, { "codigoGrupo": "CMU", "codigoServico": "6" }, { "codigoGrupo": "CMU", "codigoServico": "7" }, { "codigoGrupo": "CMU", "codigoServico": "8" }, { "codigoGrupo": "COB", "codigoServico": "1" }, { "codigoGrupo": "COB", "codigoServico": "2" }, { "codigoGrupo": "COB", "codigoServico": "3" }, { "codigoGrupo": "COB", "codigoServico": "4" }, { "codigoGrupo": "COB", "codigoServico": "5" }, { "codigoGrupo": "COB", "codigoServico": "6" }, { "codigoGrupo": "COB", "codigoServico": "7" }, { "codigoGrupo": "COB", "codigoServico": "8" }, { "codigoGrupo": "COB", "codigoServico": "9" }, { "codigoGrupo": "COB", "codigoServico": "11" }, { "codigoGrupo": "COB", "codigoServico": "13" }, { "codigoGrupo": "COB", "codigoServico": "14" }, { "codigoGrupo": "COB", "codigoServico": "15" }, { "codigoGrupo": "COB", "codigoServico": "16" }, { "codigoGrupo": "COB", "codigoServico": "17" }, { "codigoGrupo": "COB", "codigoServico": "18" }, { "codigoGrupo": "COB", "codigoServico": "22" }, { "codigoGrupo": "COB", "codigoServico": "23" }, { "codigoGrupo": "COB", "codigoServico": "24" }, { "codigoGrupo": "COB", "codigoServico": "25" }, { "codigoGrupo": "COB", "codigoServico": "26" }, { "codigoGrupo": "COB", "codigoServico": "29" }, { "codigoGrupo": "COB", "codigoServico": "30" }, { "codigoGrupo": "COB", "codigoServico": "31" }, { "codigoGrupo": "CON", "codigoServico": "1" }, { "codigoGrupo": "CON", "codigoServico": "2" }, { "codigoGrupo": "CPR", "codigoServico": "1" }, { "codigoGrupo": "CPR", "codigoServico": "2" }, { "codigoGrupo": "CPR", "codigoServico": "3" }, { "codigoGrupo": "CRE", "codigoServico": "1" }, { "codigoGrupo": "CRE", "codigoServico": "2" }, { "codigoGrupo": "CRE", "codigoServico": "3" }, { "codigoGrupo": "CRO", "codigoServico": "1" }, { "codigoGrupo": "CTO", "codigoServico": "1" }, { "codigoGrupo": "CTO", "codigoServico": "2" }, { "codigoGrupo": "CTO", "codigoServico": "3" }, { "codigoGrupo": "CTO", "codigoServico": "4" }, { "codigoGrupo": "CTO", "codigoServico": "5" }, { "codigoGrupo": "CTO", "codigoServico": "6" }, { "codigoGrupo": "CTO", "codigoServico": "7" }, { "codigoGrupo": "CTO", "codigoServico": "8" }, { "codigoGrupo": "CTO", "codigoServico": "9" }, { "codigoGrupo": "DDA", "codigoServico": "1" }, { "codigoGrupo": "DDA", "codigoServico": "2" }, { "codigoGrupo": "DDA", "codigoServico": "3" }, { "codigoGrupo": "DDA", "codigoServico": "4" }, { "codigoGrupo": "DES", "codigoServico": "1" }, { "codigoGrupo": "DES", "codigoServico": "2" }, { "codigoGrupo": "DES", "codigoServico": "3" }, { "codigoGrupo": "DES", "codigoServico": "4" }, { "codigoGrupo": "EMC", "codigoServico": "1" }, { "codigoGrupo": "EMC", "codigoServico": "2" }, { "codigoGrupo": "EMC", "codigoServico": "3" }, { "codigoGrupo": "EMC", "codigoServico": "4" }, { "codigoGrupo": "FIA", "codigoServico": "1" }, { "codigoGrupo": "FRA", "codigoServico": "1" }, { "codigoGrupo": "FRA", "codigoServico": "2" }, { "codigoGrupo": "FRA", "codigoServico": "3" }, { "codigoGrupo": "FRA", "codigoServico": "4" }, { "codigoGrupo": "FXG", "codigoServico": "1" }, { "codigoGrupo": "FXG", "codigoServico": "2" }, { "codigoGrupo": "FXG", "codigoServico": "3" }, { "codigoGrupo": "FXG", "codigoServico": "4" }, { "codigoGrupo": "GOJ", "codigoServico": "1" }, { "codigoGrupo": "GTC", "codigoServico": "1" }, { "codigoGrupo": "GTC", "codigoServico": "2" }, { "codigoGrupo": "GTC", "codigoServico": "3" }, { "codigoGrupo": "HBE", "codigoServico": "1" }, { "codigoGrupo": "HBE", "codigoServico": "2" }, { "codigoGrupo": "JSA", "codigoServico": "1" }, { "codigoGrupo": "JSA", "codigoServico": "2" }, { "codigoGrupo": "JSA", "codigoServico": "3" }, { "codigoGrupo": "JSA", "codigoServico": "4" }, { "codigoGrupo": "JSA", "codigoServico": "5" }, { "codigoGrupo": "JSA", "codigoServico": "6" }, { "codigoGrupo": "JSA", "codigoServico": "7" }, { "codigoGrupo": "JSA", "codigoServico": "8" }, { "codigoGrupo": "JSA", "codigoServico": "9" }, { "codigoGrupo": "JSA", "codigoServico": "10" }, { "codigoGrupo": "MNT", "codigoServico": "1" }, { "codigoGrupo": "NCL", "codigoServico": "1" }, { "codigoGrupo": "NCS", "codigoServico": "1" }, { "codigoGrupo": "NCS", "codigoServico": "2" }, { "codigoGrupo": "NCS", "codigoServico": "3" }, { "codigoGrupo": "NCS", "codigoServico": "4" }, { "codigoGrupo": "NMR", "codigoServico": "1" }, { "codigoGrupo": "NST", "codigoServico": "2" }, { "codigoGrupo": "OPB", "codigoServico": "2" }, { "codigoGrupo": "PAG", "codigoServico": "1" }, { "codigoGrupo": "PAG", "codigoServico": "2" }, { "codigoGrupo": "PAG", "codigoServico": "3" }, { "codigoGrupo": "PAG", "codigoServico": "4" }, { "codigoGrupo": "PAG", "codigoServico": "5" }, { "codigoGrupo": "PAG", "codigoServico": "6" }, { "codigoGrupo": "PAG", "codigoServico": "7" }, { "codigoGrupo": "PAG", "codigoServico": "8" }, { "codigoGrupo": "PAG", "codigoServico": "9" }, { "codigoGrupo": "PAG", "codigoServico": "11" }, { "codigoGrupo": "PAG", "codigoServico": "12" }, { "codigoGrupo": "PAG", "codigoServico": "13" }, { "codigoGrupo": "PAG", "codigoServico": "14" }, { "codigoGrupo": "PAG", "codigoServico": "17" }, { "codigoGrupo": "PAG", "codigoServico": "20" }, { "codigoGrupo": "PAG", "codigoServico": "21" }, { "codigoGrupo": "PAG", "codigoServico": "22" }, { "codigoGrupo": "PAG", "codigoServico": "23" }, { "codigoGrupo": "PAG", "codigoServico": "24" }, { "codigoGrupo": "PAG", "codigoServico": "25" }, { "codigoGrupo": "PAG", "codigoServico": "26" }, { "codigoGrupo": "PAG", "codigoServico": "27" }, { "codigoGrupo": "PAG", "codigoServico": "28" }, { "codigoGrupo": "PAG", "codigoServico": "29" }, { "codigoGrupo": "PAG", "codigoServico": "30" }, { "codigoGrupo": "PAG", "codigoServico": "33" }, { "codigoGrupo": "PAG", "codigoServico": "34" }, { "codigoGrupo": "PAG", "codigoServico": "36" }, { "codigoGrupo": "PAG", "codigoServico": "37" }, { "codigoGrupo": "PAG", "codigoServico": "38" }, { "codigoGrupo": "PAG", "codigoServico": "39" }, { "codigoGrupo": "PAG", "codigoServico": "40" }, { "codigoGrupo": "PAG", "codigoServico": "41" }, { "codigoGrupo": "PAG", "codigoServico": "42" }, { "codigoGrupo": "PAG", "codigoServico": "43" }, { "codigoGrupo": "PAG", "codigoServico": "44" }, { "codigoGrupo": "POR", "codigoServico": "2" }, { "codigoGrupo": "POR", "codigoServico": "3" }, { "codigoGrupo": "POS", "codigoServico": "1" }, { "codigoGrupo": "POS", "codigoServico": "4" }, { "codigoGrupo": "POS", "codigoServico": "9" }, { "codigoGrupo": "POS", "codigoServico": "10" }, { "codigoGrupo": "POS", "codigoServico": "11" }, { "codigoGrupo": "POS", "codigoServico": "12" }, { "codigoGrupo": "POS", "codigoServico": "13" }, { "codigoGrupo": "POS", "codigoServico": "14" }, { "codigoGrupo": "POS", "codigoServico": "15" }, { "codigoGrupo": "POS", "codigoServico": "16" }, { "codigoGrupo": "POS", "codigoServico": "17" }, { "codigoGrupo": "POS", "codigoServico": "20" }, { "codigoGrupo": "POS", "codigoServico": "21" }, { "codigoGrupo": "POS", "codigoServico": "22" }, { "codigoGrupo": "POS", "codigoServico": "23" }, { "codigoGrupo": "POS", "codigoServico": "24" }, { "codigoGrupo": "POS", "codigoServico": "25" }, { "codigoGrupo": "POS", "codigoServico": "26" }, { "codigoGrupo": "POS", "codigoServico": "27" }, { "codigoGrupo": "POS", "codigoServico": "30" }, { "codigoGrupo": "POS", "codigoServico": "31" }, { "codigoGrupo": "POS", "codigoServico": "32" }, { "codigoGrupo": "POS", "codigoServico": "33" }, { "codigoGrupo": "POS", "codigoServico": "34" }, { "codigoGrupo": "POS", "codigoServico": "35" }, { "codigoGrupo": "POS", "codigoServico": "36" }, { "codigoGrupo": "POS", "codigoServico": "37" }, { "codigoGrupo": "POS", "codigoServico": "38" }, { "codigoGrupo": "POS", "codigoServico": "40" }, { "codigoGrupo": "POS", "codigoServico": "41" }, { "codigoGrupo": "POS", "codigoServico": "42" }, { "codigoGrupo": "POS", "codigoServico": "43" }, { "codigoGrupo": "POS", "codigoServico": "44" }, { "codigoGrupo": "REP", "codigoServico": "1" }, { "codigoGrupo": "REP", "codigoServico": "2" }, { "codigoGrupo": "SAD", "codigoServico": "1" }, { "codigoGrupo": "SAD", "codigoServico": "2" }, { "codigoGrupo": "SAD", "codigoServico": "10" }, { "codigoGrupo": "SAD", "codigoServico": "11" }, { "codigoGrupo": "SAD", "codigoServico": "12" }, { "codigoGrupo": "SAQ", "codigoServico": "1" }, { "codigoGrupo": "SAQ", "codigoServico": "2" }, { "codigoGrupo": "SEG", "codigoServico": "7" }, { "codigoGrupo": "SEG", "codigoServico": "8" }, { "codigoGrupo": "SGA", "codigoServico": "1" }, { "codigoGrupo": "SGA", "codigoServico": "2" }, { "codigoGrupo": "SGA", "codigoServico": "3" }, { "codigoGrupo": "SGA", "codigoServico": "4" }, { "codigoGrupo": "SGA", "codigoServico": "5" }, { "codigoGrupo": "SNA", "codigoServico": "1" }, { "codigoGrupo": "SNA", "codigoServico": "2" }, { "codigoGrupo": "SNA", "codigoServico": "4" }, { "codigoGrupo": "SNC", "codigoServico": "1" }, { "codigoGrupo": "SNC", "codigoServico": "2" }, { "codigoGrupo": "SNM", "codigoServico": "1" }, { "codigoGrupo": "SNM", "codigoServico": "2" }, { "codigoGrupo": "SNM", "codigoServico": "3" }, { "codigoGrupo": "SNS", "codigoServico": "1" }, { "codigoGrupo": "SPA", "codigoServico": "2" }, { "codigoGrupo": "SPA", "codigoServico": "7" }, { "codigoGrupo": "SQE", "codigoServico": "1" }, { "codigoGrupo": "SQE", "codigoServico": "2" }, { "codigoGrupo": "SQE", "codigoServico": "3" }, { "codigoGrupo": "SQE", "codigoServico": "4" }, { "codigoGrupo": "SQE", "codigoServico": "5" }, { "codigoGrupo": "SQE", "codigoServico": "6" }, { "codigoGrupo": "SRV", "codigoServico": "3" }, { "codigoGrupo": "SRV", "codigoServico": "4" }, { "codigoGrupo": "SRV", "codigoServico": "5" }, { "codigoGrupo": "SRV", "codigoServico": "6" }, { "codigoGrupo": "TAC", "codigoServico": "1" }, { "codigoGrupo": "TAC", "codigoServico": "2" }, { "codigoGrupo": "TAC", "codigoServico": "3" }, { "codigoGrupo": "TAC", "codigoServico": "4" }, { "codigoGrupo": "TAC", "codigoServico": "5" }, { "codigoGrupo": "TAC", "codigoServico": "6" }, { "codigoGrupo": "TAC", "codigoServico": "8" }, { "codigoGrupo": "TAC", "codigoServico": "10" }, { "codigoGrupo": "TAC", "codigoServico": "706" }, { "codigoGrupo": "TAC", "codigoServico": "707" }, { "codigoGrupo": "TAC", "codigoServico": "750" }, { "codigoGrupo": "TER", "codigoServico": "1" }, { "codigoGrupo": "TER", "codigoServico": "2" }, { "codigoGrupo": "TKN", "codigoServico": "1" }, { "codigoGrupo": "TKN", "codigoServico": "5" }, { "codigoGrupo": "TKN", "codigoServico": "6" }, { "codigoGrupo": "VDO", "codigoServico": "1" }, { "codigoGrupo": "VDO", "codigoServico": "2" }, { "codigoGrupo": "VDO", "codigoServico": "3" }] })

function run(bodyPermissoes, contaSelecionada, listaPermissoes) {
	try {
		const parsedListaPermissoes = JSON.parse(listaPermissoes)
		const { nivel } = JSON.parse(contaSelecionada)
		if (nivel.toUpperCase() === 'MASTER') {
			const permissoes = Object.values(parsedListaPermissoes).map(key => Object.values(key)).flat()

			return permissoes
		}
		const parsedBodyPermissoes = JSON.parse(bodyPermissoes)
		const permissoes = parsedBodyPermissoes.data.map(({ codigoGrupo, codigoServico }) => {
			if (parsedListaPermissoes[codigoGrupo]) {
				return parsedListaPermissoes[codigoGrupo][codigoServico] || undefined
			}
		}).filter(item => item)
		return permissoes
	} catch (err) {
		return err.message
	}
}

console.log(run(bodypermissoes, JSON.stringify({ nivel: 'MASTER' }), listaPermissoes))