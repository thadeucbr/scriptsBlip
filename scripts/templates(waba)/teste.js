const fs = require('fs')
const path = require('path');
const templates = fs.readFileSync(path.resolve(__dirname, 'templates.json'), 'utf8')


function run(broadcastOrigem, inputContent, templates) {
  try {
    const parsedTemplates = JSON.parse(templates)
    const broadcast = parsedTemplates[broadcastOrigem]
    let blockDestionationId = '5c9e2bde-c50b-4a0f-9c3b-b1dfb42345ef' // [Redirect] to Main (zera variaveis)
    if (broadcast) {
      const id = broadcast[inputContent]
      if (id) {
        blockDestionationId = id
      } else {
        blockDestionationId = broadcast
      }
    }
    if (blockDestionationId.match(/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/)) {
      return blockDestionationId
    }
    return '5c9e2bde-c50b-4a0f-9c3b-b1dfb42345ef' // [Redirect] to Main (zera variaveis)
  } catch (err) {
    return '5c9e2bde-c50b-4a0f-9c3b-b1dfb42345ef' // [Redirect] to Main (zera variaveis)
  }
}

console.log(run('genserico', 'inputContent', templates))