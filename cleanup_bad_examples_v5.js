/**
 * Cleanup Script V5: Remove military placeholder definitions
 * Pattern: "رتبة أو مصطلح عسكري" (military rank or term - without explanation)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

let content = fs.readFileSync(DATA_FILE, 'utf8');
const match = content.match(/const\s+dictionaryData\s*=\s*(\[[\s\S]*\]);/);
if (!match) { console.error('Could not find dictionaryData'); process.exit(1); }

let data = eval(match[1]);
console.log(`Loaded ${data.length} entries from data.js`);

const COL_ARB_DEF = 4;
let count = 0;

for (let i = 0; i < data.length; i++) {
    if (data[i][COL_ARB_DEF] && data[i][COL_ARB_DEF].trim() === "رتبة أو مصطلح عسكري") {
        data[i][COL_ARB_DEF] = "";
        count++;
    }
}

console.log(`\n📊 Cleaned ${count} military placeholder definitions\n`);

if (count === 0) {
    console.log('✅ No patterns found - data is clean!');
    process.exit(0);
}

const backupPath = DATA_FILE + '.backup_cleanup5_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ data.js updated!\n🎉 Done!`);
