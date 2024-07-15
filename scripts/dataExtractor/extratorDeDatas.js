function run(input) {
    try {
        const months = {
            janeiro: '01', fevereiro: '02', março: '03', abril: '04', maio: '05', junho: '06',
            julho: '07', agosto: '08', setembro: '09', outubro: '10', novembro: '11', dezembro: '12',
            jan: '01', fev: '02', mar: '03', abr: '04', mai: '05', jun: '06', jul: '07', ago: '08',
            set: '09', out: '10', nov: '11', dez: '12'
        };
        const monthsRegex = '(janeiro|jan|fevereiro|fev|março|mar|abril|abr|maio|mai|junho|jun|julho|jul|agosto|ago|setembro|set|outubro|out|novembro|nov|dezembro|dez)';
        const numbersInWords = {
            um: 1, dois: 2, três: 3, quatro: 4, cinco: 5, seis: 6, sete: 7, oito: 8, nove: 9,
            dez: 10, onze: 11, doze: 12, treze: 13, quatorze: 14, quinze: 15, dezesseis: 16, dezessete: 17,
            dezoito: 18, dezenove: 19, vinte: 20, "vinte e um": 21, "vinte e dois": 22, "vinte e três": 23,
            "vinte e quatro": 24, "vinte e cinco": 25, "vinte e seis": 26, "vinte e sete": 27, "vinte e oito": 28,
            "vinte e nove": 29, trinta: 30, "trinta e um": 31, "trinta e dois": 32, "trinta e três": 33,
            "trinta e quatro": 34, "trinta e cinco": 35, "trinta e seis": 36, "trinta e sete": 37,
            "trinta e oito": 38, "trinta e nove": 39, quarenta: 40, "quarenta e um": 41, "quarenta e dois": 42,
            "quarenta e três": 43, "quarenta e quatro": 44, "quarenta e cinco": 45, "quarenta e seis": 46,
            "quarenta e sete": 47, "quarenta e oito": 48, "quarenta e nove": 49, cinquenta: 50,
            "cinquenta e um": 51, "cinquenta e dois": 52, "cinquenta e três": 53, "cinquenta e quatro": 54,
            "cinquenta e cinco": 55, "cinquenta e seis": 56, "cinquenta e sete": 57, "cinquenta e oito": 58,
            "cinquenta e nove": 59, sessenta: 60, "sessenta e um": 61, "sessenta e dois": 62,
            "sessenta e três": 63, "sessenta e quatro": 64, "sessenta e cinco": 65, "sessenta e seis": 66,
            "sessenta e sete": 67, "sessenta e oito": 68, "sessenta e nove": 69, setenta: 70, "setenta e um": 71,
            "setenta e dois": 72, "setenta e três": 73, "setenta e quatro": 74, "setenta e cinco": 75,
            "setenta e seis": 76, "setenta e sete": 77, "setenta e oito": 78, "setenta e nove": 79, oitenta: 80,
            "oitenta e um": 81, "oitenta e dois": 82, "oitenta e três": 83, "oitenta e quatro": 84,
            "oitenta e cinco": 85, "oitenta e seis": 86, "oitenta e sete": 87, "oitenta e oito": 88,
            "oitenta e nove": 89, noventa: 90
        };


        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        const ninetyDaysInMillis = 90 * 24 * 60 * 60 * 1000;

        function parseDate(dateStr) {
            let [day, month, year] = dateStr.split('/');
            day = day.padStart(2, '0');
            month = month.padStart(2, '0');
            year = year ? (year.length === 2 ? '20' + year : year) : currentDate.getFullYear();
            return new Date(year, month - 1, day);
        }

        function formatDate(date) {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        }

        function getMonthNumber(monthName) {
            return months[monthName.toLowerCase()];
        }

        function getNumberFromWords(word) {
            return numbersInWords[word.toLowerCase()];
        }

        function extractDates(text) {
            text = text.toLowerCase();

            // Verifica ultimos X dias
            let match = text.match(/[uú]ltimos (\d{1,4}) dias/i);
            if (match) {
                const numberOfDays = parseInt(match[1], 10);
                const endDate = currentDate;
                const startDate = new Date(endDate.getTime() - numberOfDays * 24 * 60 * 60 * 1000);
                return ([startDate, endDate]);
            }

            // Verifica ultimos X dias por extenso
            match = text.match(new RegExp(`últimos (${Object.keys(numbersInWords).join('|')}) dias`, 'i'));
            if (match) {
                const numberOfDays = getNumberFromWords(match[1]);
                const endDate = currentDate;
                const startDate = new Date(endDate.getTime() - numberOfDays * 24 * 60 * 60 * 1000);
                return ([startDate, endDate]);
            }

            // Verifica intervalos de meses por extenso e dias numéricos
            match = text.match(new RegExp(`(\\d{1,2}) de (${monthsRegex}) (at[eé]|a) (\\d{1,2}) de (${monthsRegex})`, 'i'));
            if (match) {
                let startDay = match[1].padStart(2, '0');
                let endDay = match[5].padStart(2, '0');
                const startMonth = getMonthNumber(match[2]);
                const endMonth = getMonthNumber(match[6]);
                const year = currentDate.getFullYear();
                const startDate = parseDate(`${startDay}/${startMonth}/${year}`);
                const endDate = parseDate(`${endDay}/${endMonth}/${year}`);
                return [startDate, endDate];
            }

            // Verifica intervalos de meses por extenso
            match = text.match(new RegExp(`de (${monthsRegex}) (at[eé]|a) (${monthsRegex})`, 'i'));
            if (match) {
                const startMonth = getMonthNumber(match[1]);
                const endMonth = getMonthNumber(match[5]);
                const year = currentDate.getFullYear();
                const startDate = parseDate(`01/${startMonth}/${year}`);
                const endDate = new Date(year, parseInt(endMonth, 10), 0);
                return [startDate, endDate];
            }

            // Verifica frases com mês por extenso
            match = text.match(new RegExp('de (' + monthsRegex + ')', 'i'));
            if (match) {
                const month = getMonthNumber(match[1]);
                const year = currentDate.getFullYear();
                const startDate = parseDate(`01/${month}/${year}`);
                const endDate = new Date(year, parseInt(month, 10), 0);
                if (currentDate.getMonth() + 1 === parseInt(month, 10)) {
                    // Se o mês solicitado é o mês atual
                    return [startDate, currentDate];
                }
                return [startDate, endDate];
            }
            
            // Verifica intervalos no formato DD/MM até DD/MM
            match = text.match(/(\d{1,2}\/\d{1,2}) (at[eé]|a) (\d{1,2}\/\d{1,2})/i);
            if (match) {
                const year = currentDate.getFullYear();
                return [parseDate(`${match[1]}/${year}`), parseDate(`${match[3]}/${year}`)];
            }
        
            // Verifica intervalos no formato MM/AAAA até MM/AAAA
            match = text.match(/(\d{1,2}\/\d{4}) (at[eé]|a) (\d{1,2}\/\d{4})/i);
            if (match) {
                const [endMonth, endYear] = match[3].split('/');
                const endDate = new Date(endYear, endMonth, 0); // O dia 0 do próximo mês é o último dia do mês anterior
                const lastDay = endDate.getDate();
                
                return [parseDate(`01/${match[1]}`), parseDate(`${lastDay}/${match[3]}`)];
            }

            // Verifica data no formato "dia D"
            match = text.match(/dia (\d{1,2})/i);
            if (match) {
                const day = match[1].padStart(2, '0');
                const month = String(currentDate.getMonth() + 1).padStart(2, '0');
                const year = currentDate.getFullYear();
                return [parseDate(`${day}/${month}/${year}`)];
            }

            // Verifica último mês ou mês passado
            match = text.match(/([úu]ltimo|m[eê]s) passad(o)/i);
            if (match) {
                const lastMonthStartDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
                const lastMonthEndDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
                return [lastMonthStartDate, lastMonthEndDate];
            }

            // Verifica "dessa semana" ou "essa semana"
            match = text.match(/(dessa semana|essa semana)/i);
            if (match) {
                const weekStartDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay() + 1);
                return [weekStartDate, currentDate];
            }

            // Verifica semana passada
            match = text.match(/semana passada/i);
            if (match) {
                const lastWeekEndDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay());
                const lastWeekStartDate = new Date(lastWeekEndDate.getFullYear(), lastWeekEndDate.getMonth(), lastWeekEndDate.getDate() - 6);
                return [lastWeekStartDate, lastWeekEndDate];
            }

            // Verifica semana retrasada
            match = text.match(/semana retrasada/i);
            if (match) {
                const twoWeeksAgoEndDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay() - 7);
                const twoWeeksAgoStartDate = new Date(twoWeeksAgoEndDate.getFullYear(), twoWeeksAgoEndDate.getMonth(), twoWeeksAgoEndDate.getDate() - 6);
                return [twoWeeksAgoStartDate, twoWeeksAgoEndDate];
            }

            // Verifica deste mês
            match = text.match(/[d]?esse m[eê]s|m[eê]s atual/i);
            if (match) {
                const thisMonthStartDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
                return [thisMonthStartDate, currentDate];
            }

            // Verifica último trimestre ou trimestre passado
            match = text.match(/([úu]ltim(a|o)|trimestre) (passad(a|o)|trimestre)/i);
            if (match) {
                const currentQuarter = Math.floor(currentMonth / 3) + 1;
                let lastQuarter, lastQuarterYear;
                if (currentQuarter === 1) {
                    lastQuarter = 4;
                    lastQuarterYear = currentYear - 1;
                } else {
                    lastQuarter = currentQuarter - 1;
                    lastQuarterYear = currentYear;
                }
                const startMonthX = (lastQuarter - 1) * 3;
                const endMonthX = startMonthX + 2;
                const lastQuarterStartDate = new Date(lastQuarterYear, startMonthX, 1);
                const lastQuarterEndDate = new Date(lastQuarterYear, endMonthX + 1, 0);
                return [lastQuarterStartDate, lastQuarterEndDate];
            }

            // Verifica último bimestre ou bimestre passado
            match = text.match(/([úu]ltim(a|o)|bimestre) (passad(a|o)|bimestre)/i);
            if (match) {
                const currentBimester = Math.floor(currentMonth / 2) + 1;
                let lastBimester, lastBimesterYear;
                if (currentBimester === 1) {
                    lastBimester = 6;
                    lastBimesterYear = currentYear - 1;
                } else {
                    lastBimester = currentBimester - 1;
                    lastBimesterYear = currentYear;
                }
                const startMonth = (lastBimester - 1) * 2;
                const endMonth = startMonth + 1;
                const lastBimesterStartDate = new Date(lastBimesterYear, startMonth, 1);
                const lastBimesterEndDate = new Date(lastBimesterYear, endMonth + 1, 0);
                return [lastBimesterStartDate, lastBimesterEndDate];
            }

            // Verifica X dias
            match = text.match(/(\d{1,4}) dias/i);
            if (match) {
                const numberOfDays = parseInt(match[1], 10);
                const endDate = currentDate;
                const startDate = new Date(endDate.getTime() - numberOfDays * 24 * 60 * 60 * 1000);
                return ([startDate, endDate]);
            }

            // Verifica X dias por extenso
            match = text.match(new RegExp(`(${Object.keys(numbersInWords).join('|')}) dias`, 'i'));
            if (match) {
                const numberOfDays = getNumberFromWords(match[1]);
                const endDate = currentDate;
                const startDate = new Date(endDate.getTime() - numberOfDays * 24 * 60 * 60 * 1000);
                return ([startDate, endDate]);
            }

            // Verifica hoje
            match = text.match(/de hoje|(hoje)/i);
            if (match) {
                return [currentDate, currentDate];
            }

            // Verifica ontem
            match = text.match(/de ontem|(ontem)/i);
            if (match) {
                let yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                return [yesterday, yesterday];
            }

            // Verifica datas no formato DD/MM/AAAA
            match = text.match(/(\d{1,2}\/\d{1,2}\/\d{2,4})/g);
            if (match) return match.map(date => parseDate(date));

            // Verifica datas no formato DD/MM
            match = text.match(/(\d{1,2}\/\d{1,2})/g);
            if (match) {
                return match.map(dateStr => parseDate(`${dateStr}/${currentDate.getFullYear()}`));
            }

            return [];
        }

        const dates = extractDates(input);

        if (dates.length === 1) {
            const startDate = dates[0];
            const endDate = new Date();
            const diffInMillis = endDate - startDate;
            if (diffInMillis < 0 || startDate > endDate) {
                return { error: 'extratoLancamentoFuturo' };
            }
            return formatDate(dates[0]);
        } else if (dates.length === 2) {
            const actualDate = new Date();
            const startDate = dates[0];
            const endDate = dates[1];
            const diffInMillis = endDate - startDate;
            if (diffInMillis < 0 || startDate > actualDate || endDate > actualDate) {
                return { error: 'extratoLancamentoFuturo' };
            }
            if (diffInMillis <= ninetyDaysInMillis) {
                return `${formatDate(startDate)} - ${formatDate(endDate)}`;
            } else {
                return { error: 'extrato90dias' };
            }
        } else {
            return { error: 'extratoDataInvalida' };
        }
    } catch (err) {
        return { error: 'extratoDataInvalida' };
    }
}

// const testCases = [
//     "Preciso do extrato dos últimos 30 dias",
//     "Quero consultar o extrato de junho",
//     "Quero consultar o extrato de 10/05 até 15/06",
//     "Quero consultar o extrato do dia 10",
//     "Extrato de junho até julho",
//     "Extrato do dia 01/05",
//     "Preciso do extrato dos últimos 15 dias",
//     "Preciso do extrato dos últimos 90 dias",
//     "Quero consultar o extrato do dia 1 de maio até 5 de junho",
//     "Tem como pegar o extrato do mês de abril",
//     "Quero ver o extrato do último mês.",
//     "Pode me enviar o extrato do mês passado?",
//     "Envia o extrato da semana passada.",
//     "Quero ver o extrato da semana passada por favor.",
//     "Quero consultar o extrato de março até maio",
//     "Quero o extrato deste mês, por favor.",
//     "Pode me mostrar o extrato do último trimestre?",
//     "Quero consultar o extrato do último trimestre por favor.",
//     "Quero o extrato do último bimestre, por gentileza.",
//     "Extrado da semana passada",
//     "Extrado da última semana",
// ];

// const testCases = [
//     "Extrato de abril até setembro",
//     "Extrato de fevereiro até dezembro",
//     "Quero o extrato de 05/03 até 20/03",
//     "Extrato de 01/01 até 31/12",
//     "Quero o extrato do dia 25 de agosto",
//     "Quero o extrato do dia 12/07",
//     "Preciso do extrato dos últimos 7 dias",
//     "Preciso do extrato dos últimos 60 dias",
//     "Quero o extrato de outubro até novembro",
//     "Extrato do dia 02/04",
//     "Extrato do dia 15 de setembro até 20 de outubro",
//     "Quero consultar o extrato de março",
//     "Quero o extrato de 01/06 até 10/06",
//     "Extrato de agosto até setembro",
//     "Preciso do extrato dos últimos 45 dias",
//     "Quero consultar o extrato do dia 10 de abril até 15 de maio",
//     "Extrato do dia 10/03",
//     "Quero o extrato de 01/01 até 31/01",
//     "Extrato de janeiro até março",
//     "Quero o extrato de 01/09 até 30/09",
//     "Preciso do extrato dos últimos 20 dias",
//     "Extrato do dia 03/07",
//     "Quero o extrato de abril até agosto",
//     "Extrato do dia 20 de agosto",
//     "Quero o extrato de 15/02 até 28/02",
//     "Quero consultar o extrato do dia 01 de abril até 15 de maio",
//     "Quero o extrato de março até abril",
//     "Quero o extrato de 10/01 até 20/01",
//     "Quero o extrato de 10/05 até 20/05",
//     "Preciso do extrato dos últimos 10 dias",
//     "Quero o extrato de 01/08 até 31/08",
//     "Extrato do dia 05/06",
//     "Quero o extrato de 01/07 até 31/07",
//     "Quero o extrato de 01/04 até 30/04",
//     "Quero o extrato de 10/10 até 20/10",
//     "Quero o extrato de 01/12 até 31/12",
//     "Preciso do extrato dos últimos 75 dias",
//     "Quero o extrato de maio até junho",
//     "Extrato do dia 25/04",
//     "Quero o extrato de 01/03 até 31/03",
//     "Extrato do dia 12/12",
//     "Quero o extrato de 01/11 até 30/11",
//     "Quero o extrato de 01/05 até 31/05",
//     "Extrato do dia 15/07",
//     "Preciso do extrato dos últimos 5 dias",
//     "Quero o extrato de 01/02 até 28/02",
//     "Extrato do dia 20/01"
// ];

// testCases.forEach(testCase => {
//     console.log(run(testCase), "| " + testCase);
// });
console.log(run("Extrato de 03/04/2024 até 05/05/2024"));