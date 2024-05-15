import inquirer from 'inquirer';
import vars from '../shared/vars.js';
import verificarUltimaPublicacao from './src/verificarUltimaPublicacao.js';
import verificaConfigs from './src/verificaConfigs.js';
import verificaActions from './src/verificaActions.js';

function getBotNames(env) {
  return vars[env].map(({ name }) => name);
}

async function main() {
  const { origin, functionToExecute } = await inquirer.prompt([
    {
      type: 'list',
      name: 'origin',
      message: 'Selecione o ambiente:',
      choices: ['local', 'dev', 'beta', 'prod'],
    },
    {
      type: 'list',
      name: 'functionToExecute',
      message: 'Selecione a função a ser executada:',
      choices: ['verificarUltimaPublicacao', 'verificaConfigs', 'verificaActions'],
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

  const keyOrigin = vars[origin].find(({ name }) => name === bot);

  if (bot === 'Todos') {
    for (let bot of botNames) {
      const keyOrigin = vars[origin].find(({ name }) => name === bot);
      switch (functionToExecute) {
        case 'verificarUltimaPublicacao':
          verificarUltimaPublicacao(keyOrigin.key, bot);
          break;
        case 'verificaConfigs':
          verificaConfigs(keyOrigin.key, bot, origin);
          break;
        case 'verificaActions':
          verificaActions(keyOrigin.key, bot, origin);
          break;
        default:
          console.log('Função não encontrada.');
      }
    }
  } else {
    const keyOrigin = vars[origin].find(({ name }) => name === bot);
    switch (functionToExecute) {
      case 'verificarUltimaPublicacao':
        verificarUltimaPublicacao(keyOrigin.key, bot);
        break;
      case 'verificaConfigs':
        verificaConfigs(keyOrigin.key, bot, origin);
        break;
      case 'verificaActions':
        verificaActions(keyOrigin.key, bot, origin);
        break;
      default:
        console.log('Função não encontrada.');
    }
  }
}

main();