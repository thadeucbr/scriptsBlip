function formatDate(date) {
    let day = String(date.getDate()).padStart(2, '0');
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let year = date.getFullYear();
    return `${day}/${month}/${year}`;
}
function extractDates(userInput) {
    const today = new Date();
    const msInDay = 24 * 60 * 60 * 1000;

    function parseRelativeDate(keyword) {
        switch (keyword.toLowerCase()) {
            case 'hoje':
            case 'hoje.':
                return [today, today];
            case 'ontem':
            case 'ontem.':
                let yesterday = new Date(today.getTime() - msInDay);
                return [yesterday, yesterday];
            default:
                return null;
        }
    }

    function parseDaysAgo(days) {
        let endDate = today;
        let startDate = new Date(today.getTime() - (days * msInDay));
        return [startDate, endDate];
    }

    function parseSingleDay(day) {
        let startDate = new Date(today.getFullYear(), today.getMonth(), day);
        return [startDate, startDate];
    }

    function parseDateRange(start, end) {
        let startDate = new Date(start.split('/').reverse().join('-'));
        let endDate = new Date(end.split('/').reverse().join('-'));
        return [startDate, endDate];
    }

    // Check for specific keywords
    let relativeDates = parseRelativeDate(userInput);
    if (relativeDates) {
        return validateDates(relativeDates[0], relativeDates[1]);
    }

    // Check for patterns
    let daysAgoMatch = userInput.match(/últimos (\d+) dias/i);
    if (daysAgoMatch) {
        let days = parseInt(daysAgoMatch[1]);
        return validateDates(...parseDaysAgo(days));
    }

    let singleDayMatch = userInput.match(/dia (\d+)/i);
    if (singleDayMatch) {
        let day = parseInt(singleDayMatch[1]);
        return validateDates(...parseSingleDay(day));
    }

    let dateRangeMatch = userInput.match(/(\d{2}\/\d{2}\/\d{4}) até (\d{2}\/\d{2}\/\d{4})/i);
    if (dateRangeMatch) {
        let start = dateRangeMatch[1];
        let end = dateRangeMatch[2];
        return validateDates(...parseDateRange(start, end));
    }

    return { error: 'dataInvalida' };
}

function validateDates(startDate, endDate) {
    const today = new Date();
    const msInDay = 24 * 60 * 60 * 1000;
    const maxDays = 90;

    if (startDate > endDate) {
        return { error: 'dataInvalida' };
    }

    if (endDate > today) {
        return { error: 'dataFutura' };
    }

    let diffDays = Math.floor((endDate - startDate) / msInDay);
    if (diffDays > maxDays) {
        return { error: 'superior90dias' };
    }

    return {
        startDate: formatDate(startDate),
        endDate: formatDate(endDate)
    };
}

const testCases = [
    "Extrato de abril até setembro",
    "Extrato de fevereiro até dezembro",
    "Quero o extrato de 05/03 até 20/03",
    "Extrato de 01/01 até 31/12",
    "Quero o extrato do dia 25 de agosto",
    "Quero o extrato do dia 12/07",
    "Preciso do extrato dos últimos 7 dias",
    "Preciso do extrato dos últimos 60 dias",
    "Quero o extrato de outubro até novembro",
    "Extrato do dia 02/04",
    "Extrato do dia 15 de setembro até 20 de outubro",
    "Quero consultar o extrato de março",
    "Quero o extrato de 01/06 até 10/06",
    "Extrato de agosto até setembro",
    "Preciso do extrato dos últimos 45 dias",
    "Quero consultar o extrato do dia 10 de abril até 15 de maio",
    "Extrato do dia 10/03",
    "Quero o extrato de 01/01 até 31/01",
    "Extrato de janeiro até março",
    "Quero o extrato de 01/09 até 30/09",
    "Preciso do extrato dos últimos 20 dias",
    "Extrato do dia 03/07",
    "Quero o extrato de abril até agosto",
    "Extrato do dia 20 de agosto",
    "Quero o extrato de 15/02 até 28/02",
    "Quero consultar o extrato do dia 01 de abril até 15 de maio",
    "Quero o extrato de março até abril",
    "Quero o extrato de 10/01 até 20/01",
    "Quero o extrato de 10/05 até 20/05",
    "Preciso do extrato dos últimos 10 dias",
    "Quero o extrato de 01/08 até 31/08",
    "Extrato do dia 05/06",
    "Quero o extrato de 01/07 até 31/07",
    "Quero o extrato de 01/04 até 30/04",
    "Quero o extrato de 10/10 até 20/10",
    "Quero o extrato de 01/12 até 31/12",
    "Preciso do extrato dos últimos 75 dias",
    "Quero o extrato de maio até junho",
    "Extrato do dia 25/04",
    "Quero o extrato de 01/03 até 31/03",
    "Extrato do dia 12/12",
    "Quero o extrato de 01/11 até 30/11",
    "Quero o extrato de 01/05 até 31/05",
    "Extrato do dia 15/07",
    "Preciso do extrato dos últimos 5 dias",
    "Quero o extrato de 01/02 até 28/02",
    "Extrato do dia 20/01"
];

testCases.forEach(testCase => {
    console.log(extractDates(testCase), "| " + testCase);
});