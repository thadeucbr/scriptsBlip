const fs = require('fs')
const path = require('path');


function setaIdsDefault() { 
  const templates = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'templates.json'), 'utf8'));
  for (key in templates) {
    const options = Object.keys(templates[key])
    if (options.length > 1) {
      templates[key][options[1]] = '430460cd-7e3d-4b0a-ba61-e2f6a2da38f7'
    }
  }
  fs.writeFileSync(path.resolve(__dirname, 'templatesX.json'), JSON.stringify(templates))
}

setaIdsDefault()