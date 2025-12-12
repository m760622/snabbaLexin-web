const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');
let content = fs.readFileSync(DATA_FILE, 'utf8');
const match = content.match(/const\s+dictionaryData\s*=\s*(\[[\s\S]*\]);/);
if (!match) { console.error('Error loading data'); process.exit(1); }

const data = eval(match[1]);

// Construction types
const constructionTypes = ['Bygg', 'Bygg.', 'Byggnad', 'Byggnad.'];
let missingByType = {};
let allMissing = [];

data.forEach((item, index) => {
    let type = item[1] || '';
    let cleanType = type.replace('.', '');

    if (cleanType.startsWith('Bygg')) {
        if (!missingByType[type]) missingByType[type] = 0;

        if (!item[7] || item[7].trim() === '' || !item[8] || item[8].trim() === '') {
            missingByType[type]++;
            allMissing.push({
                index: index,
                id: item[0],
                type: type,
                word: item[2],
                def: item[5] || item[4]
            });
        }
    }
});

console.log('--- Construction Terms without Examples ---');
for (let type in missingByType) {
    console.log(`${type}: ${missingByType[type]}`);
}
console.log(`\nTotal Missing: ${allMissing.length}`);

if (allMissing.length > 0) {
    const batchSize = 100;
    const batch = allMissing.slice(0, batchSize);
    fs.writeFileSync('construction_pending_batch.json', JSON.stringify(batch, null, 2));
    console.log(`\n✅ Saved ${batch.length} terms to construction_pending_batch.json`);
}
