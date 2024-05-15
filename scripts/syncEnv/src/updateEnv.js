import decodeName from './decodeName.js'
import getBotJsonAndUpdateFlow from './getBotJsonAndUpdateFlow.js'
import vars from '../../shared/vars.js'
function updateEnv(origin, destination) {
  const keyOrigin = vars[origin].map(({key, name}) => ({key, name}))
  const keyDestination = vars[destination].map(({key, name}) => ({key, name}))
  keyOrigin.forEach(({key, name}) => {
    const destinationKey = keyDestination.find(({name: nameDestination}) => name === nameDestination)
    if (destinationKey) {
      decodeName(key, destinationKey.key)
      getBotJsonAndUpdateFlow(key, destinationKey.key)
    }
  })
}



export default updateEnv