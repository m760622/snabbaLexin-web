
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_find_defs.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

const dictionaryData = require(tempFile);

const BATCH_SIZE = 50;
const missing = [];

for (const entry of dictionaryData) {
    // entry[5] is Swedish Def
    if (!entry[5] || entry[5].trim() === "") {
        missing.push({
            id: entry[0],
            type: entry[1],
            swe: entry[2],
            arb: entry[3],
            arb_def: entry[4]
        });
    }
    if (missing.length >= BATCH_SIZE) break;
}

console.log(JSON.stringify(missing, null, 2));

fs.unlinkSync(tempFile);
