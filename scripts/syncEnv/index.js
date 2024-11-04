import inquirer from 'inquirer';
import vars from '../shared/vars.js';
import decodeName from './src/decodeName.js';
import getBotJsonAndUpdateFlow from './src/getBotJsonAndUpdateFlow.js';
import updateEnv from './src/updateEnv.js';

function getProjects(env) {
  const projects = new Set(vars[env].map(({ project }) => project));
  return [...projects];
}

function getBotNamesByProject(env, project) {
  return vars[env].filter(({ project: botProject }) => botProject === project).map(({ name }) => name);
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
