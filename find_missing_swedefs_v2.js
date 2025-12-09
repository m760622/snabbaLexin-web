
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_find_defs_v2.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

const dictionaryData = require(tempFile);

const BATCH_SIZE = 100;
const missing = [];
let totalMissing = 0;

for (const entry of dictionaryData) {

    if (!entry[5] || entry[5].trim() === "") {
        totalMissing++;
        if (missing.length < BATCH_SIZE) {
            missing.push({
                id: entry[0],
                type: entry[1],
                swe: entry[2],
                arb: entry[3],
                arb_def: entry[4]
            });
        }
    }
}

const missingDocs = missing; // Assuming 'missing' is the array to be saved
const missingCount = missing.length; // Assuming 'missing.length' is the count
const outputFile = path.join(__dirname, 'pending_batch.json'); // Assuming this is the desired output file

console.log(`Found ${totalMissing} total items with missing Swedish definitions.`);

if (missingDocs.length > 0) {
    fs.writeFileSync(outputFile, JSON.stringify(missingDocs, null, 2), 'utf8');
    console.log(`Saved ${missingDocs.length} items to ${outputFile}`);
} else {
    console.log("No missing definitions found.");
}
fs.unlinkSync(tempFile);
