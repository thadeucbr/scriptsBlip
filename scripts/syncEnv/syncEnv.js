const vars = require('../vars')
const verificaPublicacao = require('../utils/verificarUltimaPublicacao')
const verificaConfig = require('../utils/verificaConfigs')
const { verificaActions } = require('../utils/verificaActions')









// function checkPublished(env) {
//   const key = vars[env].map(({key, name}) => ({key, name}))
//   key.forEach(({key, name}) => {
//     verificaPublicacao(key, name)
//     // verificaConfig(key, name)
//     // verificaActions(key, name)
//   })
// }

updateEnv('local', 'beta')
// checkPublished('beta')