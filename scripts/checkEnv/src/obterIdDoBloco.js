import getBotJson from '../../shared/getBotJson.js';
import inquirer from 'inquirer';

const guidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

export default async function obterIdDoBloco(bot) {
  const { flow } = await getBotJson(bot);
  inquirer.prompt([
    {
      type: 'input',
      name: 'userInput',
      message: 'Digite o GUID do bloco ou o nome:'
    }
  ]).then(answers => {
    const blockIds = Object.keys(flow)
    if (answers.userInput.match(guidRegex)) {
      const blockName = flow[answers.userInput.trim()].$title
      console.log(`O id do bloco é: ${answers.userInput.trim()}`);
      console.log(`O nome do bloco é: ${blockName}`);
    } else {
      const blockId = blockIds.find(blockId => {
        return flow[blockId].$title.includes(answers.userInput)
      })
      console.log(`O id do bloco é: ${blockId}`);
      console.log(`O nome do bloco é: ${flow[blockId].$title}`);
    }
  });
}