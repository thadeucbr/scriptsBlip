// function run(input) {
//   const months = {
//       janeiro: '01', fevereiro: '02', março: '03', abril: '04', maio: '05', junho: '06',
//       julho: '07', agosto: '08', setembro: '09', outubro: '10', novembro: '11', dezembro: '12',
//       jan: '01', fev: '02', mar: '03', abr: '04', mai: '05', jun: '06',
//       jul: '07', ago: '08', set: '09', out: '10', nov: '11', dez: '12'
//   };

//   const currentDate = new Date();
//   const currentYear = currentDate.getFullYear();
//   const ninetyDaysInMillis = 90 * 24 * 60 * 60 * 1000;

//   function parseDate(dateStr) {
//       let [day, month, year] = dateStr.split('/');
//       day = day.padStart(2, '0');
//       month = month.padStart(2, '0');
//       year = year ? (year.length === 2 ? '20' + year : year) : currentYear;
//       return new Date(year, month - 1, day);
//   }

//   function formatDate(date) {
//       const day = String(date.getDate()).padStart(2, '0');
//       const month = String(date.getMonth() + 1).padStart(2, '0');
//       const year = date.getFullYear();
//       return `${day}/${month}/${year}`;
//   }

//   function getMonthNumber(monthName) {
//       return months[monthName.toLowerCase()];
//   }

//   function extractDates(text) {
//       const regexPatterns = [
//           { pattern: /[uú]ltimos (\d{1,2}) dias/i, handler: match => {
//               const numberOfDays = parseInt(match[1], 10);
//               const endDate = currentDate;
//               const startDate = new Date(endDate.getTime() - numberOfDays * 24 * 60 * 60 * 1000);
//               return [startDate, endDate];
//           }},
//           { pattern: /(\d{1,2}) de (\w+) até (\d{1,2}) de (\w+)/i, handler: match => {
//               const startDay = match[1].padStart(2, '0');
//               const endDay = match[3].padStart(2, '0');
//               const startMonth = getMonthNumber(match[2]);
//               const endMonth = getMonthNumber(match[4]);
//               const year = currentYear;
//               return [parseDate(`${startDay}/${startMonth}/${year}`), parseDate(`${endDay}/${endMonth}/${year}`)];
//           }},
//           { pattern: /de (\w+) até (\w+)/i, handler: match => {
//               const startMonth = getMonthNumber(match[1]);
//               const endMonth = getMonthNumber(match[2]);
//               const year = currentYear;
//               return [parseDate(`01/${startMonth}/${year}`), new Date(year, parseInt(endMonth, 10), 0)];
//           }},
//           { pattern: /de (\w+)/i, handler: match => {
//               const month = getMonthNumber(match[1]);
//               const year = currentYear;
//               return [parseDate(`01/${month}/${year}`), new Date(year, parseInt(month, 10), 0)];
//           }},
//           { pattern: /(\d{1,2}\/\d{1,2}\/\d{2,4})/g, handler: match => match.map(date => parseDate(date))},
//           { pattern: /(\d{1,2}\/\d{1,2})/g, handler: match => match.map(dateStr => parseDate(`${dateStr}/${currentYear}`))},
//           { pattern: /(\d{1,2}\/\d{1,2}) até (\d{1,2}\/\d{1,2})/i, handler: match => {
//               const year = currentYear;
//               return [parseDate(`${match[1]}/${year}`), parseDate(`${match[2]}/${year}`)];
//           }},
//           { pattern: /dia (\d{1,2})/i, handler: match => {
//               const day = match[1].padStart(2, '0');
//               const month = String(currentDate.getMonth() + 1).padStart(2, '0');
//               return [parseDate(`${day}/${month}/${currentYear}`)];
//           }},
//           { pattern: /([úu]ltimo|mês) passad(o)/i, handler: () => {
//               const lastMonthStartDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
//               const lastMonthEndDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
//               return [lastMonthStartDate, lastMonthEndDate];
//           }},
//           { pattern: /([úu]ltima semana|semana passada)/i, handler: () => {
//               const lastWeekEndDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay());
//               const lastWeekStartDate = new Date(lastWeekEndDate.getFullYear(), lastWeekEndDate.getMonth(), lastWeekEndDate.getDate() - 6);
//               return [lastWeekStartDate, lastWeekEndDate];
//           }},
//           { pattern: /deste m[eê]s/i, handler: () => {
//               const thisMonthStartDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
//               const thisMonthEndDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
//               return [thisMonthStartDate, thisMonthEndDate];
//           }},
//           { pattern: /([úu]ltim(a|o)|trimestre) (passad(a|o)|trimestre)/i, handler: () => {
//               const currentQuarter = Math.floor(currentDate.getMonth() / 3) + 1;
//               let lastQuarter, lastQuarterYear;
//               if (currentQuarter === 1) {
//                   lastQuarter = 4;
//                   lastQuarterYear = currentYear - 1;
//               } else {
//                   lastQuarter = currentQuarter - 1;
//                   lastQuarterYear = currentYear;
//               }
//               const startMonth = (lastQuarter - 1) * 3;
//               const endMonth = startMonth + 2;
//               return [new Date(lastQuarterYear, startMonth, 1), new Date(lastQuarterYear, endMonth + 1, 0)];
//           }},
//           { pattern: /([úu]ltim(a|o)|bimestre) (passad(a|o)|bimestre)/i, handler: () => {
//               const currentBimester = Math.floor(currentDate.getMonth() / 2) + 1;
//               let lastBimester, lastBimesterYear;
//               if (currentBimester === 1) {
//                   lastBimester = 6;
//                   lastBimesterYear = currentYear - 1;
//               } else {
//                   lastBimester = currentBimester - 1;
//                   lastBimesterYear = currentYear;
//               }
//               const startMonth = (lastBimester - 1) * 2;
//               const endMonth = startMonth + 1;
//               return [new Date(lastBimesterYear, startMonth, 1), new Date(lastBimesterYear, endMonth + 1, 0)];
//           }}
//       ];

//       for (const { pattern, handler } of regexPatterns) {
//           const match = text.match(pattern);
//           if (match) {
//               return handler(match);
//           }
//       }

//       return [];
//   }

//   const dates = extractDates(input);

//   if (dates.length === 1) {
//       const date = dates[0];
//       if (date > currentDate || (currentDate - date) > ninetyDaysInMillis) {
//           return 'Data não pode ser superior à data atual e deve estar dentro do intervalo de 90 dias';
//       }
//       return formatDate(date);
//   } else if (dates.length === 2) {
//       const [startDate, endDate] = dates;
//       if (startDate > currentDate || endDate > currentDate) {
//           return 'Datas não podem ser superiores à data atual';
//       }
//       const diffInMillis = endDate - startDate;
//       if (diffInMillis > 0 && diffInMillis <= ninetyDaysInMillis) {
//           return `${formatDate(startDate)} - ${formatDate(endDate)}`;
//       } else {
//           return 'Período deve ser inferior a 90 dias';
//       }
//   } else {
//       return 'Formato de data não reconhecido';
//   }
// }

function run(input) {
    try {
        const months = {
            janeiro: '01', fevereiro: '02', março: '03', abril: '04', maio: '05', junho: '06',
            julho: '07', agosto: '08', setembro: '09', outubro: '10', novembro: '11', dezembro: '12',
            jan: '01', fev: '02', mar: '03', abr: '04', mai: '05', jun: '06',
            jul: '07', ago: '08', set: '09', out: '10', nov: '11', dez: '12'
        };

        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const ninetyDaysInMillis = 90 * 24 * 60 * 60 * 1000;

        function parseDate(dateStr) {
            const parts = dateStr.split('/');
            const day = parts[0].padStart(2, '0');
            const month = parts[1].padStart(2, '0');
            const year = parts[2] ? (parts[2].length === 2 ? '20' + parts[2] : parts[2]) : currentYear;
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

        function extractDates(text) {
            const patterns = [
                { pattern: /[uú]ltimos (\d{1,2}) dias/i, handler: match => {
                    const numberOfDays = parseInt(match[1], 10);
                    const endDate = currentDate;
                    const startDate = new Date(endDate.getTime() - numberOfDays * 24 * 60 * 60 * 1000);
                    return [startDate, endDate];
                }},
                { pattern: /(\d{1,2}) de (\w+) até (\d{1,2}) de (\w+)/i, handler: match => {
                    const startDay = match[1].padStart(2, '0');
                    const endDay = match[3].padStart(2, '0');
                    const startMonth = getMonthNumber(match[2]);
                    const endMonth = getMonthNumber(match[4]);
                    const year = currentYear;
                    return [parseDate(`${startDay}/${startMonth}/${year}`), parseDate(`${endDay}/${endMonth}/${year}`)];
                }},
                { pattern: /(\d{1,2}\/\d{1,2}\/\d{2,4})/g, handler: match => match.map(date => parseDate(date))},
                { pattern: /(\d{1,2}\/\d{1,2}) até (\d{1,2}\/\d{1,2})/i, handler: match => {
                    const year = currentYear;
                    return [parseDate(`${match[1]}/${year}`), parseDate(`${match[2]}/${year}`)];
                }},
                { pattern: /(\d{1,2}\/\d{1,2})/g, handler: match => match.map(dateStr => parseDate(`${dateStr}/${currentYear}`))},
                { pattern: /de (\w+) até (\w+)/i, handler: match => {
                    const startMonth = getMonthNumber(match[1]);
                    const endMonth = getMonthNumber(match[2]);
                    const year = currentYear;
                    return [parseDate(`01/${startMonth}/${year}`), new Date(year, parseInt(endMonth, 10), 0)];
                }},
                { pattern: /de (\w+)/i, handler: match => {
                    const month = getMonthNumber(match[1]);
                    const year = currentYear;
                    return [parseDate(`01/${month}/${year}`), new Date(year, parseInt(month, 10), 0)];
                }},
                { pattern: /dia (\d{1,2})/i, handler: match => {
                    const day = match[1].padStart(2, '0');
                    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
                    return [parseDate(`${day}/${month}/${currentYear}`)];
                }}
            ];

            for (const { pattern, handler } of patterns) {
                const match = text.match(pattern);
                if (match) {
                    return handler(match);
                }
            }

            return [];
        }

        const dates = extractDates(input);

        if (dates.length === 1) {
            const date = dates[0];
            if (date > currentDate || (currentDate - date) > ninetyDaysInMillis) {
                return 'Data não pode ser superior à data atual e deve estar dentro do intervalo de 90 dias';
            }
            return formatDate(date);
        } else if (dates.length === 2) {
            const [startDate, endDate] = dates;
            if (startDate > currentDate || endDate > currentDate) {
                return 'Datas não podem ser superiores à data atual';
            }
            const diffInMillis = endDate - startDate;
            if (diffInMillis > 0 && diffInMillis <= ninetyDaysInMillis) {
                return `${formatDate(startDate)} - ${formatDate(endDate)}`;
            } else {
                return 'Período deve ser inferior a 90 dias';
            }
        } else {
            return 'Formato de data não reconhecido';
        }
    } catch (err) {
        return 'Erro ao processar as datas: ' + err.message;
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
    console.log(run(testCase), "| " + testCase);
});
// console.log(run('02/07/2024'))