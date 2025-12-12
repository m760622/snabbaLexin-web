const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');
const OUTPUT_FILE = path.join(__dirname, 'others_pending_batch.json');

// Categories to target
const targetTypes = ['Samhälle', 'Migration'];

const BATCH_SIZE = 100;

try {
    let content = fs.readFileSync(DATA_FILE, 'utf8');
    const match = content.match(/const\s+dictionaryData\s*=\s*(\[[\s\S]*\]);/);

    if (!match) {
        console.error('Could not parse dictionaryData');
        process.exit(1);
    }

    const data = eval(match[1]);
    const allMissing = [];
    const missingByType = {};

    targetTypes.forEach(t => missingByType[t] = 0);

    data.forEach((item, index) => {
        let type = item[1] || '';
        type = type.replace('.', ''); // Remove trailing dot if present

        if (targetTypes.includes(type)) {
            // Check if examples (item[7] and item[8]) are missing or empty
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

    console.log(`--- Other Terms without Examples ---`);
    let totalMissing = 0;
    targetTypes.forEach(type => {
        console.log(`${type}: ${missingByType[type]}`);
        totalMissing += missingByType[type];
    });
    console.log(`\nTotal Missing: ${totalMissing}`);

    // Save batch
    const batch = allMissing.slice(0, BATCH_SIZE);
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(batch, null, 2), 'utf8');
    console.log(`\n✅ Saved ${batch.length} terms to ${path.basename(OUTPUT_FILE)}`);

} catch (err) {
    console.error('Error:', err);
}
