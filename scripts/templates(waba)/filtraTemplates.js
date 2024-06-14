const fs = require('fs')
const path = require('path');
const templatesWaba = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'templatesWaba.json'), 'utf8')).resource.data;
const templatesEmp = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'templatesEmp.json'), 'utf8'));

function filtraTemplates() {
  const objTemplates = {}
  templatesEmp.forEach((template) => {
    const foundTemplate = templatesWaba.find(({ name }) => name === template)
    objTemplates[template] = foundTemplate
    // if (foundTemplate) {
    //   const buttons = foundTemplate.components.find(({ type }) => type === 'BUTTONS')?.buttons
    //   if (buttons) {
    //     const buttonsOjb = {}
    //     buttons.forEach((button) => {
    //       buttonsOjb[button.text] = ''
    //     })
    //     objTemplates[template] = buttonsOjb
    //   } else {
    //     objTemplates[template] = 'sem botão'
    //   }
    // }
  })
  fs.writeFileSync(path.resolve(__dirname, 'templates.json'), JSON.stringify(objTemplates))
}

filtraTemplates()