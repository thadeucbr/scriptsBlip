const fs = require('fs');
const path = require('path');

// Configurações
const TARGET_STRING = 'teste';
const DIR_PATH = '../teste';

// Função principal
function searchInJsonFiles() {
  try {
    // Ler todos os arquivos do diretório
    const files = fs.readdirSync(DIR_PATH);

    // Filtrar apenas arquivos JSON
    const jsonFiles = files.filter(file => path.extname(file) === '.json');

    if (jsonFiles.length === 0) {
      console.log('Nenhum arquivo JSON encontrado na pasta');
      return;
    }

    // Procurar a string em cada arquivo
    jsonFiles.forEach(file => {
      let filePath = path.join(DIR_PATH, file);
      console.log(`Verificando arquivo: ${filePath}`);
      
      try {
        // Ler conteúdo do arquivo
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Verificar se contém a string
        if (content.toLowerCase().includes(TARGET_STRING.toLowerCase())) {
          console.warn(`✓ Encontrado em: ${filePath}`);
        }
        else {
          console.log(`  Não encontrado em: ${filePath}`);
        }
      } catch (error) {
        console.error(`Erro ao ler o arquivo ${filePath}:`, error.message);
      }
    });

  } catch (error) {
    console.error('Erro ao acessar o diretório:', error.message);
  }
}

// Executar a busca
searchInJsonFiles();