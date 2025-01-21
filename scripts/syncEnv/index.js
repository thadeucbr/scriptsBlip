import inquirer from 'inquirer';
import vars from '../shared/vars.js';
import decodeName from './src/decodeName.js';
import getBotJsonAndUpdateFlow from './src/getBotJsonAndUpdateFlow.js';
import updateEnv from './src/updateEnv.js';

function getProjects(env) {
  return Object.keys(vars[env]);
}

function getBotNamesByProject(env, project) {
  if (vars[env][project]) {
    return vars[env][project].map(({ name }) => name);
  }
  return [];
}

async function main() {
  const { origin, destination } = await inquirer.prompt([
    {
      type: 'list',
      name: 'origin',
      message: 'Selecione a origem:',
      choices: ['local', 'beta', 'prod'],
    },
    {
      type: 'list',
      name: 'destination',
      message: 'Selecione o destino:',
      choices: ['local', 'beta', 'prod'],
    },
  ]);

  const projects = getProjects(origin);
  
  const { project } = await inquirer.prompt([
    {
      type: 'list',
      name: 'project',
      message: 'Selecione o projeto:',
      choices: projects,
    },
  ]);

  const botNames = getBotNamesByProject(origin, project);
  
  const { bot } = await inquirer.prompt([
    {
      type: 'list',
      name: 'bot',
      message: 'Selecione o bot:',
      choices: ['Todos', ...botNames],
    },
  ]);

  if (bot !== 'Todos') {
    const keyOrigin = vars[origin][project].find(({ name }) => name === bot);
    const keyDestination = vars[destination][project].find(({ name }) => name === bot);
    if (keyOrigin && keyDestination) {
      decodeName(keyOrigin.key, keyDestination.key);
      getBotJsonAndUpdateFlow(keyOrigin.key, keyDestination.key);
    } else {
      console.log('Bot não encontrado.');
    }
  } else {
    updateEnv(origin, destination, project);
  }  
}

main();
