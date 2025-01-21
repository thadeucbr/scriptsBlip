import decodeName from './decodeName.js';
import getBotJsonAndUpdateFlow from './getBotJsonAndUpdateFlow.js';
import vars from '../../shared/vars.js';

async function updateEnv(origin, destination, project) {
  // Acessa os bots do projeto específico no ambiente de origem e destino
  const keyOrigin = vars[origin][project] || []; // Pega os bots do projeto ou um array vazio se não existir
  const keyDestination = vars[destination][project] || []; // Pega os bots do projeto ou um array vazio se não existir
  
  for (const iterator of keyOrigin) {
    const { key, name } = iterator;
    const destinationKey = keyDestination.find(({ name: nameDestination }) => name === nameDestination);
    if (destinationKey) {
      decodeName(key, destinationKey.key);
      await delay(1000);
      getBotJsonAndUpdateFlow(key, destinationKey.key);
    }
  }
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default updateEnv;
