const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');
let content = fs.readFileSync(DATA_FILE, 'utf8');
const match = content.match(/const\s+dictionaryData\s*=\s*(\[[\s\S]*\]);/);
if (!match) { console.error('Error loading data'); process.exit(1); }

const data = eval(match[1]);

const medicalTypes = ['Medicin', 'MedicinMN', 'MedicinMR', 'MedicinR', 'MedicinTB'];
let missingByType = {};
let allMissing = [];

data.forEach(item => {
    let type = item[1] || '';
    type = type.replace('.', '');

    if (medicalTypes.includes(type)) {
        if (!missingByType[type]) missingByType[type] = 0;

        if (!item[7] || item[7].trim() === '' || !item[8] || item[8].trim() === '') {
            missingByType[type]++;
            allMissing.push({
                id: item[0],
                type: type,
                word: item[2],
                def: item[5] || item[4]
            });
        }
    }
});

console.log('--- Medical Terms without Examples ---');
for (let type of medicalTypes) {
    console.log(`${type}: ${missingByType[type] || 0}`);
}
console.log(`\nTotal Missing: ${allMissing.length}`);

// Save the first 100 to a temp file for batching
if (allMissing.length > 0) {
    const batchSize = 100;
    const batch = allMissing.slice(0, batchSize);
    fs.writeFileSync('medical_pending_batch.json', JSON.stringify(batch, null, 2));
    console.log(`\nSaved ${batch.length} terms to medical_pending_batch.json`);
}
