const data = JSON.stringify({
    "data": {
        "dataAtualizacao": "2022-09-26T17:08:09",
        "anotacoes": [
            {
                "natureza": "pefin",
                "dataInicial": "2020-11-07",
                "dataFinal": "2020-11-07",
                "quantidadeOcorrencias": 1,
                "valorTotal": 200.0,
                "ocorrencias": [
                    {
                        "data": "2020-11-07",
                        "natureza": "VM",
                        "valor": 200.0
                    }
                ]
            }
        ]
    }
})

function run(cartaSerasa) {
    try {
        const { anotacoes } = JSON.parse(cartaSerasa).data
        const anotacoesFiltradas = anotacoes.filter(anotacao => anotacao.natureza.toLowerCase() === 'pefin')
        if (anotacoesFiltradas.length === 0) {
            return false
        }
        const ocorrencias = anotacoesFiltradas.some(anotacao => anotacao.ocorrencias.some(ocorrencia => ocorrencia.natureza.toUpperCase() === 'VM'))

        return ocorrencias
    } catch (err) {
        return false
    }
}
console.log(run(data))