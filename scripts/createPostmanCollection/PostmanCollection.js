class PostmanCollection {
  constructor(botName, jsonPath) {
    this.saveFileName = `${jsonPath.split('/').pop().split('.').shift()}.postman_collection.json`
    this.collection = {
      info: {
        name: botName,
        schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json'
      },
      item: []
    }
    this.#openJsonFile(jsonPath);
  }
  #openJsonFile(path) {
    const fs = require('fs');
    const parsedFile = JSON.parse(fs.readFileSync(path, 'utf8')).flow;
    this.flow = parsedFile;
  }
  #findHttpRequests() {
    let requests = {}
    try {
      const flowIds = Object.keys(this.flow);
      flowIds.forEach(id => {
        let tempRequests = []
        const blockName = this.flow[id].$title
        const enteringCustomActions = this.flow[id]['$enteringCustomActions'].filter(({ type }) => type === 'ProcessHttp')
        if (enteringCustomActions.length > 0) {
          tempRequests = [...tempRequests, ...enteringCustomActions]
        }
        const leavingCustomActions = this.flow[id]['$leavingCustomActions'].filter(({ type }) => type === 'ProcessHttp')
        if (leavingCustomActions.length > 0) {
          tempRequests = [...tempRequests, ...leavingCustomActions]
        }
        if (tempRequests.length > 0) {
          requests[blockName] = tempRequests
        }
      })
      return requests
    } catch (err) {
      return false
    }
  }
  createCollection() {
    const allRequests = this.#findHttpRequests()
    if (allRequests) {
      for (const block in allRequests) {
        const item = {
          name: block,
          item: []
        }
        allRequests[block].forEach(request => {
          item.item.push({
            name: request.$title,
            request: {
              method: request.settings.method,
              header: Object.entries(request.settings.headers).map(([key, value]) => ({ key, value })),
              body: {
                mode: 'raw',
                raw: request.settings.body
              },
              url: request.settings.uri,
            }
          })
        })
        this.collection.item.push(item)
      }
      const fs = require('fs');
      fs.writeFileSync(`${this.saveFileName}`, JSON.stringify(this.collection, null, 2))
      return this.collection
    }
    console.log('No requests found')
  }
}

const fs = require('fs')
fs.readdirSync('./12-06-2024/beta/').forEach(file => { 
  const name = file.replace('[BETA] ', '').replace('.json', '')
  const teste = new PostmanCollection(name, `./12-06-2024/beta/${file}`);
  teste.createCollection()
})
// const teste = new PostmanCollection('Main', './12-06-2024/beta/[BETA] SPD Main.json');
// teste.createCollection()