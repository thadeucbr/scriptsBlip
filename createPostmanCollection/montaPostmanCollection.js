const fs = require('fs');
const { type } = require('os');

const flow = JSON.parse(fs.readFileSync('./12-06-2024/beta/[BETA] SPD Main.json', 'utf8')).flow;

const flowIds = Object.keys(flow);

function getRequests(flowIds) {
  let requests = []
  flowIds.forEach(id => {
    const enteringCustomActions = flow[id]['$enteringCustomActions'].filter(({type}) => type === 'ProcessHttp')
    if (enteringCustomActions.length > 0) {
      requests = [...requests, ...enteringCustomActions]
    }
    const leavingCustomActions = flow[id]['$leavingCustomActions'].filter(({type}) => type === 'ProcessHttp')
    if (leavingCustomActions.length > 0) {
      requests = [...requests, ...leavingCustomActions]
    }
  })
  return requests
}

const test = {
  '$contentActions': [ { input: [Object], '$invalid': false } ],
  '$conditionOutputs': [
    {
      stateId: 'c9479f7b-dc6b-4f15-b610-2c69bdd1a97a',
      typeOfStateId: 'state',
      '$connId': 'con_193',
      '$id': '5405182f-cdaa-46c6-a002-8573045dca48',
      conditions: [Array],
      '$invalid': false
    },
    {
      stateId: '30e39880-1d2a-439a-a0ed-1e7210966286',
      typeOfStateId: 'state',
      '$connId': 'con_198',
      '$id': 'a4db9b7f-178d-4554-8ecc-f2a55f4999a6',
      conditions: [Array],
      '$invalid': false
    }
  ],
  '$enteringCustomActions': [
    {
      '$id': '506cda97-d7be-4c56-95ee-1513a6449bed',
      '$typeOfContent': '',
      type: 'SetVariable',
      '$title': 'Set "statusAccountManager" to "504"',
      '$invalid': false,
      settings: [Object],
      conditions: []
    },
    {
      '$id': '3595f2db-845a-46a9-b8e4-971d340e6e61',
      '$typeOfContent': '',
      type: 'SetVariable',
      '$title': 'Set "statusAccountManager2" to "504"',
      '$invalid': false,
      settings: [Object],
      conditions: []
    },
    {
      '$id': '2a9a6927-9903-4663-8428-728f53b306e1',
      '$typeOfContent': '',
      type: 'SetVariable',
      '$title': 'Set "statusAccountManager3" to "504"',
      '$invalid': false,
      settings: [Object],
      conditions: []
    },
    {
      '$id': 'c0c0c6b8-1afd-4ce4-b885-925a92a8cd73',
      '$typeOfContent': '',
      type: 'SetVariable',
      '$title': 'Set "statusAccountManager4" to "504"',
      '$invalid': false,
      settings: [Object],
      conditions: []
    }
  ],
  '$leavingCustomActions': [
    {
      '$id': '30d3d657-a220-4319-960b-99da5d05028d',
      '$typeOfContent': '',
      type: 'ProcessHttp',
      '$title': 'Process "bodyAccountManager" using "GET" AG/CONTA',
      '$invalid': false,
      settings: [Object],
      conditions: []
    },
    {
      '$id': '681fd1ec-ab7f-46cf-acb8-a00fcdeaedda',
      '$typeOfContent': '',
      type: 'TrackEvent',
      '$title': 'Tracking "api resumo" Agencia/Conta',
      '$invalid': false,
      settings: [Object],
      conditions: []
    },
    {
      '$id': '6ba9e482-f73a-4643-8d14-45bb28306258',
      '$typeOfContent': '',
      type: 'ProcessHttp',
      '$title': 'Process "bodyAccountManager" using "GET" Segmento 20',
      '$invalid': false,
      settings: [Object],
      conditions: [Array]
    },
    {
      '$id': '45fe4d58-7c28-438c-950f-952042acd9ec',
      '$typeOfContent': '',
      type: 'TrackEvent',
      '$title': 'Tracking "api resumo" Segmento 20',
      '$invalid': false,
      settings: [Object],
      conditions: [Array]
    },
    {
      '$id': 'feac2a4a-087d-414a-93eb-345ca1f991f5',
      '$typeOfContent': '',
      type: 'ProcessHttp',
      '$title': 'Process "bodyAccountManager" using "GET" Segmento 17',
      '$invalid': false,
      settings: [Object],
      conditions: [Array]
    },
    {
      '$id': 'fbbe8643-7f87-4484-8e52-216ad1b09264',
      '$typeOfContent': '',
      type: 'TrackEvent',
      '$title': 'Tracking "api resumo" Segmento 17',
      '$invalid': false,
      settings: [Object],
      conditions: [Array]
    },
    {
      '$id': '27d6671d-9b1c-47c7-9d6c-cdcd9929aea3',
      '$typeOfContent': '',
      type: 'ProcessHttp',
      '$title': 'Process "bodyAccountManager" using "GET" PHONE',
      '$invalid': false,
      settings: [Object],
      conditions: [Array]
    },
    {
      '$id': '81e4f97d-b045-488d-82ab-e91b2d278d4c',
      '$typeOfContent': '',
      type: 'TrackEvent',
      '$title': 'Tracking "api resumo" Phone',
      '$invalid': false,
      settings: [Object],
      conditions: [Array]
    },
    {
      '$id': '57d42e37-72f1-43e5-8a0b-49cc9217f78e',
      '$typeOfContent': '',
      type: 'ExecuteScript',
      '$title': 'Process "contaSelecionada"',
      '$invalid': false,
      settings: [Object],
      conditions: []
    },
    {
      '$id': '85a01d06-18f8-424a-9835-0cadc7a1f8f8',
      '$typeOfContent': '',
      type: 'ExecuteScript',
      '$title': 'Process "apiStatus"',
      '$invalid': false,
      settings: [Object],
      conditions: []
    },
    {
      '$id': '51538566-a3e0-4f14-9c21-42ddcaf26d1c',
      '$typeOfContent': '',
      type: 'TrackEvent',
      '$title': 'Track "SPD Main {state.name} api status"',
      '$invalid': false,
      settings: [Object],
      conditions: [Array]
    }
  ],
  '$inputSuggestions': [],
  '$defaultOutput': { stateId: 'fallback', '$invalid': false },
  isAiGenerated: false,
  '$tags': [
    {
      id: 'blip-tag-8b086a98-90c0-42ea-97ee-27755264df04',
      label: 'SetVariable',
      background: '#FF4A1E',
      canChangeBackground: false
    },
    {
      id: 'blip-tag-dbc66f9d-f500-4e63-9d79-1a007ff956c8',
      label: 'ProcessHttp',
      background: '#7762E3',
      canChangeBackground: false
    },
    {
      id: 'blip-tag-f6d37119-ffa4-462d-b22a-48c4858d778b',
      label: 'TrackEvent',
      background: '#61D36F',
      canChangeBackground: false
    },
    {
      id: 'blip-tag-be6046ff-6272-4079-8f84-5f482952b91c',
      label: 'ExecuteScript',
      background: '#FF961E',
      canChangeBackground: false
    }
  ],
  id: 'fde8a193-6fdc-4490-bbf2-a99a74582176',
  root: false,
  '$title': '[M.4.0.1][HTTP] Obtem Carterização',
  '$position': { top: '916px', left: '1449px' },
  '$invalidContentActions': false,
  '$invalidOutputs': false,
  '$invalidCustomActions': false,
  '$invalid': false
}