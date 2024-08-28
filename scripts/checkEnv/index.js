import inquirer from 'inquirer';
import vars from '../shared/vars.js';
import verificarUltimaPublicacao from './src/verificarUltimaPublicacao.js';
import verificaConfigs from './src/verificaConfigs.js';
import verificaActions from './src/verificaActions.js';
import obterIdDoBloco from './src/obterIdDoBloco.js';

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
      choices: ['verificarUltimaPublicacao', 'verificaConfigs', 'verificaActions', 'obterIdDoBloco'],
    },
  ]);

  const botNames = getBotNames(origin);
  let choices = ['Todos', ...botNames]
  if (functionToExecute === 'obterIdDoBloco') {
    choices = choices.filter(bot => bot !== 'Todos');
  }
  const { bot } = await inquirer.prompt([
    {
      type: 'list',
      name: 'bot',
      message: 'Selecione o bot:',
      choices
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
          await verificaConfigs(bot);
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
      case 'obterIdDoBloco':
        obterIdDoBloco(keyOrigin.key)
        break
      default:
        console.log('Função não encontrada.');
    }
  }
}

main();