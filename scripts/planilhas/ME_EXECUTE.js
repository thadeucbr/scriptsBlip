const fs = require('fs');
const path = require('path');

const pasta = path.resolve(__dirname, 'config/Fluxos/beta'); // Substitua pelo caminho da sua pasta

const { identificarChamadas } = require('./config/identificaChamadasHttp')
const { identificarTrackings } = require('./config/identificaTrackings')
const { identificaVariaveis } = require('./config/identificaVariaveisDoFluxo')
const { criaPastas } = require('./config/criaPastas');
const { unificaCsv } = require('./config/unificaCsv');
const { identificarScripts } = require('./config/identificaScripts');

criaPastas()
// Lê os arquivos no diretório
fs.readdir(pasta, (err, arquivos) => {
  let x = new Set()
  if (err) {
    console.error('Erro ao ler o diretório:', err);
    return;
  }

  // Filtra apenas os arquivos com extensão .json
  const arquivosJson = arquivos.filter(arquivo => path.extname(arquivo) === '.json');

  // Exibe os nomes dos arquivos .json
  arquivosJson.forEach(arquivo => {
    console.log(arquivo)
    const fluxo = JSON.parse(fs.readFileSync(path.resolve(pasta, arquivo)))
    const nome = arquivo.replace('.json', '')
    identificarChamadas(fluxo, nome)
    identificarTrackings(fluxo, nome)
    identificaVariaveis(fluxo, nome)
    identificarScripts(fluxo, nome)
  });
});

unificaCsv()