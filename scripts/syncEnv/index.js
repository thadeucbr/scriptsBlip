import inquirer from 'inquirer';
import vars from './vars.js';
import decodeName from './src/decodeName.js';
import getBotJsonAndUpdateFlow from './src/getBotJsonAndUpdateFlow.js';
import updateEnv from './src/updateEnv.js';

function getBotNames(env) {
  return vars[env].map(({ name }) => name);
}

async function main() {
  const { origin, destination } = await inquirer.prompt([
    {
      type: 'list',
      name: 'origin',
      message: 'Selecione a origem:',
      choices: ['local', 'dev', 'beta', 'prod'],
    },
    {
      type: 'list',
      name: 'destination',
      message: 'Selecione o destino:',
      choices: ['local', 'dev', 'beta', 'prod'],
    },
  ]);

  const botNames = getBotNames(origin);

  const { bot } = await inquirer.prompt([
    {
      type: 'list',
      name: 'bot',
      message: 'Selecione o bot:',
      choices: ['Todos', ...botNames],
    },
  ]);

  if (bot !== 'Todos') {
    const keyOrigin = vars[origin].find(({ name }) => name === bot);
    const keyDestination = vars[destination].find(({ name }) => name === bot);
    if (keyOrigin && keyDestination) {
      decodeName(keyOrigin.key, keyDestination.key);
      getBotJsonAndUpdateFlow(keyOrigin.key, keyDestination.key);
    } else {
      console.log('Bot não encontrado.');
    }
  } else {
    updateEnv(origin, destination);
  }
}

main();
