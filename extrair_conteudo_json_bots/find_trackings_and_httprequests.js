const fs = require('fs');
const path = require('path');
const csvWriter = require('csv-writer').createObjectCsvWriter;

const dirPath = '../scriptsBlip/scripts/backupAmbientes/backup/30-12-2024/local/';
const files = fs.readdirSync(dirPath).filter(file => file.endsWith('.json'));

const records = [];

files.forEach(file => {
    const filePath = path.join(dirPath, file);
    const doc = fs.readFileSync(filePath, 'utf8');
    const json = JSON.parse(doc).flow;

    const blockIds = Object.keys(json);

    for (let i = 0; i < blockIds.length; i++) {
        const httpEntering = json[blockIds[i]]['$enteringCustomActions'].filter(action => action.type === 'ProcessHttp');
        const trackingEntering = json[blockIds[i]]['$enteringCustomActions'].filter(action => action.type === 'TrackEvent');

        const http = [...httpEntering, ...json[blockIds[i]]['$leavingCustomActions'].filter(action => action.type === 'ProcessHttp')];
        const tracking = [...trackingEntering, ...json[blockIds[i]]['$leavingCustomActions'].filter(action => action.type === 'TrackEvent')];

        const title = json[blockIds[i]]['$title'];
        if (tracking.some(track => track['$title'].includes('api resumo'))) {
            const trackingName = tracking.filter(track => track['$title'].includes('api resumo')).map(trackName  => trackName['settings']['category']).join('\n').replace(/state.name/gi, title).replace(/{|}/gi, '');
            console.log(trackingName)
            // const uriList = http.map((url) => url['settings']['uri']).join('\n').replace(/{{config.urlCHT}}/gi, '').split('/n');
            
            // uriList.forEach(uri => {
                records.push({
                    filename: file.replace('.json', ''),
                    trackingName: trackingName,
                    // uri: uri.trim()
                });
            // });
        }
    }
});

const csvFilePath = './output.csv';
const csvWriterInstance = csvWriter({
    path: csvFilePath,
    header: [
        { id: 'filename', title: 'Nome do Arquivo' },
        { id: 'trackingName', title: 'Tracking Name' },
        // { id: 'uri', title: 'URI' }
    ]
});

csvWriterInstance.writeRecords(records)
    .then(() => console.log('CSV file was written successfully'));
