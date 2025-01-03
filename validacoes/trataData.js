function adicionaHorario(data, horario) {
    const [hora, minuto, segundo] = horario.split(':')
    return new Date(data.setHours(hora, minuto, segundo))
}

function acrescentaDias(data, dias) { 
    return new Date(data.setDate(data.getDate() + dias))
}

function verificaFeriado(data) {
    const arrayFeriados = [
        "01/01/2025", // Confraternização Universal (feriado nacional)
        "25/01/2025", // Aniversário da cidade de São Paulo (feriado municipal)
        "03/03/2025", // Carnaval (ponto facultativo)
        "04/03/2025", // Carnaval (ponto facultativo)
        "05/03/2025", // Quarta-feira de Cinzas (ponto facultativo)
        "18/04/2025", // Sexta-feira Santa (feriado nacional)
        "21/04/2025", // Tiradentes (feriado nacional)
        "01/05/2025", // Dia do Trabalho (feriado nacional)
        "19/06/2025", // Corpus Christi (ponto facultativo)
        "09/07/2025", // Revolução Constitucionalista (feriado estadual)
        "07/09/2025", // Independência do Brasil (feriado nacional)
        "12/10/2025", // Nossa Senhora Aparecida (feriado nacional)
        "02/11/2025", // Finados (feriado nacional)
        "15/11/2025", // Proclamação da República (feriado nacional)
        "20/11/2025", // Dia da Consciência Negra (feriado municipal)
        "25/12/2025"  // Natal (feriado nacional)
      ]      
    const dataFormatada = JSON.stringify(data).split('T')[0].split('-').reverse().join('/'). replace('"', '')
    return arrayFeriados.includes(dataFormatada)
}

function verificaFinalDeSemana(data) {
    if (data.getDay() === 0) {
        data = acrescentaDias(data, 1)
    }
    else if (data.getDay() === 6) {
        data = acrescentaDias(data, 2)
    }
    const feriado = verificaFeriado(data)
    if (feriado) { 
        data = acrescentaDias(data, 1)
        return verificaFinalDeSemana(data)
    }
    return data
}

function formataDataEHora(aberturaAgenda, fechamentoAgenda, configIntervaloDeDias) {
    let dataInicio = verificaFinalDeSemana(new Date())
    dataInicio = adicionaHorario(dataInicio, aberturaAgenda)

    let dataFim = acrescentaDias(new Date(dataInicio), Number(configIntervaloDeDias))
    dataFim = verificaFinalDeSemana(dataFim)
    dataFim = adicionaHorario(dataFim, fechamentoAgenda)

    return {
        dataInicio: {
            data: new Date(dataInicio),
            fusoHorario: 'UTC'
        },
        dataFim: {
            data: new Date(dataFim),
            fusoHorario: 'UTC'
        }
    }
}
/*
    configAberturaAgenda(ex: 08:00:00): Horario de abertura da agenda
    configFechamentoAgenda(ex: 09:00:00): Horario de fechamento da agenda
    emailGerente: Email do gerente
    configIntervaloMinutos(30): Intervalo de minutos entre os agendamentos
    configIntervaloDeDias(4): Intervalo de dias para obter da agenda do gerente
*/
function run (configAberturaAgenda, configFechamentoAgenda, emailGerente, configIntervaloMinutos, configIntervaloDeDias) {
    const datas = formataDataEHora(configAberturaAgenda, configFechamentoAgenda, configIntervaloDeDias)
    let body = {
        dataInicio: datas.dataInicio,
        dataFim: datas.dataFim,
        usuarios: [emailGerente],
        intervalo: Number(configIntervaloMinutos)
    }
    body = JSON.stringify(body)
    return body
}

// function formataData(data) {
//     data = new Date(data)
//     data = new Date(data.setHours(data.getHours() - 3))
//     data = JSON.stringify(data)
//     const dataFormatada = data.split('T')[0].split('-').reverse().join('/').replace('"', '')
//     const hora = data.split('T')[1].split('.')[0]
//     return `${dataFormatada} ${hora}`
// }

console.log(run('08:00:00', '09:00:00', 'teste@teste.com', 30, 4))