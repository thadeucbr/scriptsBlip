const fs = require('fs');
const csv = require('csv-parser');
const json2csv = require('json2csv').parse;
const glob = require('glob');
const path = require('path');

const pastas = ['Scripts', 'Variaveis', 'Trackings', 'Requests', 'Fluxos']; // Lista das pastas

function unificaCsv() {
    // Lista de todos os arquivos csv no diretório atual
    pastas.forEach(pasta => {
        let arquivos_csv = glob.sync(path.resolve(__dirname, `${pasta}/*.csv`));
        console.log(path.resolve(__dirname, `${pasta}/*.csv`))
        let dados = [];
        arquivos_csv.forEach((arquivo) => {
            fs.createReadStream(arquivo)
                .pipe(csv())
                .on('data', (row) => {
                    dados.push(row);
                })
                .on('end', () => {
                    let csv = json2csv(dados);
                    fs.writeFileSync(path.resolve(__dirname, `csv/${pasta}.csv`), csv, 'utf8');
                });

        });
        console.log(`Arquivo ${path.resolve(__dirname, pasta)}.csv criado com sucesso.`)
    })
}

module.exports = { unificaCsv }

unificaCsv()