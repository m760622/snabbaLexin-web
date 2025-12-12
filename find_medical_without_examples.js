const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');
let content = fs.readFileSync(DATA_FILE, 'utf8');
const match = content.match(/const\s+dictionaryData\s*=\s*(\[[\s\S]*\]);/);
if (!match) { console.error('Error loading data'); process.exit(1); }

const data = eval(match[1]);

const medicalTypes = ['Medicin', 'MedicinMN', 'MedicinMR', 'MedicinR', 'MedicinTB'];
const batchSize = 100;
let medicalWithoutExamples = [];

data.forEach((item, index) => {
    let type = item[1] || '';
    type = type.replace('.', '');

    if (medicalTypes.includes(type)) {
        // Check if Example columns (7 or 8) are empty
        if (!item[7] || item[7].trim() === '' || !item[8] || item[8].trim() === '') {
            medicalWithoutExamples.push({
                index: index,
                id: item[0],
                type: type,
                word: item[2],
                def: item[5] || item[4] || ''
            });
        }
    }
});

console.log(`\n📊 Found ${medicalWithoutExamples.length} medical terms without examples\n`);

if (medicalWithoutExamples.length > 0) {
    const nextBatch = medicalWithoutExamples.slice(0, batchSize);
    fs.writeFileSync('medical_pending_batch.json', JSON.stringify(nextBatch, null, 2));
    console.log(`✅ Saved ${nextBatch.length} terms to medical_pending_batch.json\n`);

    console.log(`📝 Sample terms:`);
    nextBatch.slice(0, 5).forEach((item, i) => {
        console.log(`   ${i + 1}. ${item.word} (${item.def.substring(0, 30)}...)`);
    });
} else {
    console.log(`🎉 All Medical terms have examples!`);
}
