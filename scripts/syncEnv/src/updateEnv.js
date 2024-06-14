import decodeName from './decodeName.js'
import getBotJsonAndUpdateFlow from './getBotJsonAndUpdateFlow.js'
import vars from '../../shared/vars.js'
async function updateEnv(origin, destination) {
  const keyOrigin = vars[origin].map(({key, name}) => ({key, name}))
  const keyDestination = vars[destination].map(({key, name}) => ({key, name}))
  for (const iterator of keyOrigin) {
    const {key, name} = iterator
    const destinationKey = keyDestination.find(({name: nameDestination}) => name === nameDestination)
    if (destinationKey) {
      decodeName(key, destinationKey.key)
      await delay(1000)
      getBotJsonAndUpdateFlow(key, destinationKey.key)
    }
  }
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
export default updateEnv