//To Find QuickReply Buttons
const fs = require('fs');
const path = require('path');
const csvWriter = require('csv-writer').createObjectCsvWriter;

const dirPath = '../scriptsBlip/scripts/backupAmbientes/backup/03-01-2025/local/';
const files = fs.readdirSync(dirPath).filter(file => file.endsWith('.json'));

const records = [];

files.forEach(file => {
    const filePath = path.join(dirPath, file);
    const doc = fs.readFileSync(filePath, 'utf8');
    const json = JSON.parse(doc).flow;

    const blockIds = Object.keys(json);

    for (let i = 0; i < blockIds.length; i++) {
        const contentActions = json[blockIds[i]]['$contentActions'];
        let title = json[blockIds[i]]['content'];

        if (contentActions) {
            contentActions.forEach(action => {
            if (action.action && action.action.settings && action.action.settings.content && action.action.settings.content.options) {
                title = action.action.settings.content.text;
                const options = action.action.settings.content.options.filter(option => option.text && option.text.includes('{{opcao'));
                if (options.length > 0) {
                records.push({
                    filename: file.replace('.json', ''),
                    name: options.map(option => option.text).join(', '),
                    title: title,
                });
                }
            }
            });
        }
    }
});

const csvFilePath = './output.csv';
const csvWriterInstance = csvWriter({
    path: csvFilePath,
    header: [
        {id: 'filename', title: 'Filename'},
        {id: 'name', title: 'Name'},
        {id: 'title', title: 'Title'}
    ]
});

csvWriterInstance.writeRecords(records)
    .then(() => console.log('CSV file was written successfully'));
