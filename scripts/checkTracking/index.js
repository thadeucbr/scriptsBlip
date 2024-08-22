import saveToJsonFile from '../shared/saveFile.js';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import getBotJson from '../shared/getBotJson.js'
import vars from '../shared/vars.js'

function getTrackingEvents(flow) {
  const fileData = {}
  const blockIds = Object.keys(flow)
  blockIds.forEach(blockId => {
    const block = flow[blockId]
    const events = [...block.$enteringCustomActions, ...block.$leavingCustomActions].filter(event => event.type === 'TrackEvent')
    if (events.length > 0) {
      events.forEach(event => {
        const trackingName = event.settings.category.replace('{{state.name}}', block.$title)
        const content = event.settings.action
        if (!fileData[block.$title]) {
          fileData[block.$title] = {}
        }
        fileData[block.$title][trackingName] = content
      })
    }
  })
  const sortedFileData = {};
  Object.keys(fileData).sort().forEach(key => {
    sortedFileData[key] = fileData[key];
  });

  return sortedFileData;
}

vars.beta.forEach(async bot => {
  const botJson = await getBotJson(bot.key)
  const trackingEvents = getTrackingEvents(botJson.flow)
  saveToJsonFile(trackingEvents, `${bot.name}.json`, `${__dirname}/trackings`)
})