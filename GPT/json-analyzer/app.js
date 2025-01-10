import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Carregar variáveis de ambiente manualmente
const envFilePath = path.join(process.cwd(), '.env');
if (fs.existsSync(envFilePath)) {
  const envContent = fs.readFileSync(envFilePath, 'utf8');
  envContent.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) {
      process.env[key.trim()] = value.trim();
    }
  });
} else {
  console.error('Arquivo .env não encontrado!');
  process.exit(1);
}

// Diretórios
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const INPUT_DIR = path.join(__dirname, 'jsons');
const PROCESSED_DIR = path.join(__dirname, 'concluidos');
const ANALYSIS_DIR = path.join(__dirname, 'analises');

// Variáveis de ambiente
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_API_KEY) {
  console.error('Erro: OPENAI_API_KEY não definida no arquivo .env');
  process.exit(1);
}
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

// Criar diretórios, caso não existam
[INPUT_DIR, PROCESSED_DIR, ANALYSIS_DIR].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
});

// Função para dividir o JSON em blocos menores respeitando arrays grandes
function splitJson(jsonData, maxTokensPerChunk) {
  const chunks = [];
  let currentChunk = {};
  let currentTokenCount = 0;

  function addToChunk(key, value) {
    const serialized = JSON.stringify({ [key]: value });
    const tokenCount = Math.ceil(serialized.length / 4); // Aproximação de tokens

    if (currentTokenCount + tokenCount > maxTokensPerChunk) {
      chunks.push(currentChunk);
      currentChunk = {};
      currentTokenCount = 0;
    }

    currentChunk[key] = value;
    currentTokenCount += tokenCount;
  }

  for (const [key, value] of Object.entries(jsonData)) {
    if (Array.isArray(value)) {
      let arrayChunk = [];
      let arrayTokenCount = 0;

      for (const item of value) {
        const serialized = JSON.stringify(item);
        const tokenCount = Math.ceil(serialized.length / 4);

        if (arrayTokenCount + tokenCount > maxTokensPerChunk) {
          addToChunk(key, arrayChunk);
          arrayChunk = [];
          arrayTokenCount = 0;
        }

        arrayChunk.push(item);
        arrayTokenCount += tokenCount;
      }

      if (arrayChunk.length > 0) {
        addToChunk(key, arrayChunk);
      }
    } else {
      addToChunk(key, value);
    }
  }

  if (Object.keys(currentChunk).length > 0) {
    chunks.push(currentChunk);
  }

  return chunks;
}

// Função para enviar um bloco para a API OpenAI
// Função para enviar um bloco para a API OpenAI com tratamento de erros de rate limit
async function analyzeChunk(chunk, analysisContext, model, retryCount = 0, maxRetries = 5) {
  try {
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: 'Você é um assistente que analisa dados JSON de forma detalhada e clara.' },
          { role: 'user', content: `${analysisContext}\n\nAqui está o bloco de dados JSON para análise: ${JSON.stringify(chunk)}` },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      const errorJson = JSON.parse(errorText);
      
      if (errorJson.error.code === 'rate_limit_exceeded') {
        const retryAfter = errorJson.error.message.match(/try again in (\d+)ms/);
        const waitTime = retryAfter ? parseInt(retryAfter[1]) : 5000;

        if (retryCount < maxRetries) {
          console.warn(`Rate limit atingido. Aguardando ${waitTime}ms antes de tentar novamente... (Tentativa ${retryCount + 1}/${maxRetries})`);
          await new Promise(resolve => setTimeout(resolve, waitTime));
          return analyzeChunk(chunk, analysisContext, model, retryCount + 1, maxRetries);
        } else {
          throw new Error(`Número máximo de tentativas atingido (${maxRetries}).`);
        }
      } else {
        throw new Error(`Erro na API OpenAI: ${response.status} - ${errorText}`);
      }
    }

    const data = await response.json();
    return data.choices[0].message.content;

  } catch (error) {
    console.error('Erro ao chamar a API OpenAI:', error.message);
    return null;
  }
}


// Função principal para processar um JSON
async function analyzeLargeJson(filePath, maxTokensPerChunk, analysisContext, model) {
  const fileName = path.basename(filePath, '.json');
  const outputFilePath = path.join(ANALYSIS_DIR, `${fileName}.txt`);

  // Ler o arquivo JSON
  const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  // Dividir o JSON em blocos menores
  const chunks = splitJson(jsonData, maxTokensPerChunk);

  const results = [];

  console.log(`Iniciando a análise de ${fileName} com ${chunks.length} blocos...`);
  for (const [index, chunk] of chunks.entries()) {
    console.log(`Analisando bloco ${index + 1}/${chunks.length}...`);
    const result = await analyzeChunk(chunk, analysisContext, model);
    if (result) {
      results.push(result);
    } else {
      // Parar processamento em caso de erro na API
      throw new Error(`Erro na análise do bloco ${index + 1}`);
    }
  }

  // Agregar os resultados para criar uma análise global
  const aggregatedResult = `Resumo consolidado da análise:\n\n${results.join('\n---\n')}`;
  console.log(`Análise de ${fileName} concluída!`);

  // Salvar os resultados em um arquivo
  fs.writeFileSync(outputFilePath, aggregatedResult);
  console.log(`Resultados salvos em ${outputFilePath}`);
}

// Função para processar todos os JSONs
async function processAllJsons(maxTokensPerChunk, analysisContext, model = 'gpt-4o-mini') {
  const files = fs.readdirSync(INPUT_DIR).filter((file) => file.endsWith('.json'));

  for (const file of files) {
    const filePath = path.join(INPUT_DIR, file);

    // Processar o arquivo JSON
    try {
      await analyzeLargeJson(filePath, maxTokensPerChunk, analysisContext, model);

      // Mover o JSON para a pasta de concluídos
      const newFilePath = path.join(PROCESSED_DIR, file);
      fs.renameSync(filePath, newFilePath);
      console.log(`Movido ${file} para ${PROCESSED_DIR}`);
    } catch (error) {
      console.error(`Erro ao processar ${file}:`, error.message);
      console.log(`${file} permanecerá em ${INPUT_DIR} para reprocessamento.`);
    }
  }

  console.log('Todos os JSONs foram processados!');
}

// Executar o pipeline
const maxTokensPerChunk = 80000; // Limite aproximado de tokens por bloco
const analysisContext = 'Identifique os nós referentes à identificação de cliente'; // Exemplo de contexto dinâmico
processAllJsons(maxTokensPerChunk, analysisContext, 'gpt-4o-mini');
