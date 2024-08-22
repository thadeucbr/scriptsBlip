import fs from 'fs';
import path from 'path';

export default function saveToJsonFile(data, filename, callerDir) {
    const filePath = path.join(callerDir, filename);

    fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
        if (err) {
            console.error('Erro ao salvar o arquivo:', err);
        } else {
            console.log('Arquivo salvo com sucesso em:', filePath);
        }
    });
}

// Exemplo de uso
// import saveToJsonFile from '../shared/saveFile.js';
// import { fileURLToPath } from 'url';
// import path from 'path';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// saveToJsonFile({ chave: 'valor' }, 'dados.json', __dirname);