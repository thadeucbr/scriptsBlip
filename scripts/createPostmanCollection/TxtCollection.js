class TextFileGenerator {
  constructor(botName, jsonPath) {
    this.saveFileName = `${jsonPath.split('/').pop().split('.').shift()}.txt`;
    this.fileContent = `Bot Name: ${botName}\n\n`;  // Inicializando o conteúdo do arquivo
    this.#openJsonFile(jsonPath);
  }

  #openJsonFile(path) {
    const fs = require('fs');
    const parsedFile = JSON.parse(fs.readFileSync(path, 'utf8')).flow;
    this.flow = parsedFile;
  }

  #findHttpRequests() {
    let requests = {};
    try {
      const flowIds = Object.keys(this.flow);
      flowIds.forEach(id => {
        let tempRequests = [];
        const blockName = this.flow[id].$title;
        const enteringCustomActions = this.flow[id]['$enteringCustomActions'].filter(({ type }) => type === 'ProcessHttp');
        if (enteringCustomActions.length > 0) {
          tempRequests = [...tempRequests, ...enteringCustomActions];
        }
        const leavingCustomActions = this.flow[id]['$leavingCustomActions'].filter(({ type }) => type === 'ProcessHttp');
        if (leavingCustomActions.length > 0) {
          tempRequests = [...tempRequests, ...leavingCustomActions];
        }
        if (tempRequests.length > 0) {
          requests[blockName] = tempRequests;
        }
      });
      return requests;
    } catch (err) {
      return false;
    }
  }

  createTextFile() {
    const allRequests = this.#findHttpRequests();
    if (allRequests) {
      for (const block in allRequests) {
        this.fileContent += `Block: ${block}\n`;
        allRequests[block].forEach(request => {
          this.fileContent += `\tRequest Name: ${request.$title}\n`;
          this.fileContent += `\tMethod: ${request.settings.method}\n`;
          this.fileContent += `\tURL: ${request.settings.uri}\n`;
          this.fileContent += `\tHeaders:\n`;

          Object.entries(request.settings.headers).forEach(([key, value]) => {
            this.fileContent += `\t\t${key}: ${value}\n`;
          });

          this.fileContent += `\tBody:\n${request.settings.body}\n\n`;
        });
      }
      const fs = require('fs');
      const path = require('path');

      // Cria o arquivo individual
      const directoryPath = path.join(`scripts/backupAmbientes/backup/${getDataFormatada()}/textFiles/`);
      fs.mkdirSync(directoryPath, { recursive: true });

      fs.writeFileSync(`scripts/backupAmbientes/backup/${getDataFormatada()}/textFiles/${this.saveFileName}`, this.fileContent);
      
      return this.fileContent;  // Retorna o conteúdo para uso no arquivo consolidado
    }
    console.log('No requests found');
    return '';
  }
}

function getDataFormatada() {
  const date = Intl.DateTimeFormat('pt-BR').format(new Date()).replaceAll('/', '-');
  return date;
}

function generateFiles() {
  const fs = require('fs');
  let consolidatedContent = '';  // Conteúdo consolidado

  // Processando os arquivos da pasta com os JSONs do Bot
  fs.readdirSync(`scripts/backupAmbientes/backup/${getDataFormatada()}/beta`).forEach(file => {
    const name = file.replace('[BETA] ', '').replace('.json', '');
    const textFile = new TextFileGenerator(name, `scripts/backupAmbientes/backup/${getDataFormatada()}/beta/${file}`);
    console.log(`${name}: Arquivo individual ${textFile.saveFileName} criado.`);
    consolidatedContent += textFile.createTextFile();  // Acumula o conteúdo para o arquivo consolidado
  });

  // Escrevendo o conteúdo consolidado em um arquivo único
  const path = require('path');
  const directoryPath = path.join(`scripts/backupAmbientes/backup/${getDataFormatada()}/textFiles/`);
  fs.mkdirSync(directoryPath, { recursive: true });

  const consolidatedFileName = `scripts/backupAmbientes/backup/${getDataFormatada()}/textFiles/all_consolidated_requests.txt`;
  fs.writeFileSync(consolidatedFileName, consolidatedContent);
  console.log(`Arquivo consolidado criado: ${consolidatedFileName}`);
}

// Executa a função para gerar os arquivos individuais e o consolidado
generateFiles();
