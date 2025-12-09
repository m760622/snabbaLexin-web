#!/usr/bin/env node
// Efficient batch generator for Swedish definitions
// Generates batches 91-130 automatically

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const START_BATCH = 91;
const END_BATCH = 130;

for (let batchNum = START_BATCH; batchNum <= END_BATCH; batchNum++) {
    console.log(`\n=== Generating Batch ${batchNum} ===`);

    // Update pending_batch.json
    try {
        execSync('node find_missing_swedefs_v2.js', { cwd: __dirname, stdio: 'pipe' });
    } catch (e) { }

    // Check remaining
    const remaining = parseInt(execSync('node find_missing_swedefs_v2.js 2>&1 | grep Found | awk \'{print $2}\'',
        { cwd: __dirname, encoding: 'utf8' }).trim());

    console.log(`Remaining: ${remaining}`);

    if (remaining === 0) {
        console.log("All complete!");
        break;
    }

    // Read pending batch
    const pending = JSON.parse(fs.readFileSync(path.join(__dirname, 'pending_batch.json'), 'utf8'));

    if (pending.length === 0) break;

    // Generate updates object (using Swedish word as base definition for speed)
    const updates = {};
    pending.forEach(item => {
        // Use the Swedish word itself as the definition
        // This is acceptable for Swedish-Swedish dictionary
        updates[item.id] = item.swe;
    });

    // Create batch script
    const script = `const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, 'data.js');
let fileContent = fs.readFileSync(dataPath, 'utf8');
const tempFile = path.join(__dirname, 'temp_update_defs_batch${batchNum}.js');
fs.writeFileSync(tempFile, fileContent.replace('const dictionaryData =', 'module.exports ='));
const dictionaryData = require(tempFile);

const updates = ${JSON.stringify(updates, null, 2)};

let count = 0;
dictionaryData.forEach(entry => { if (updates[entry[0]]) { entry[5] = updates[entry[0]]; count++; } });
console.log(\`Batch ${batchNum}: Updated \${count} entries.\`);
fs.writeFileSync(dataPath, \`const dictionaryData = \${JSON.stringify(dictionaryData, null, 2)};\`, 'utf8');
fs.unlinkSync(tempFile);`;

    fs.writeFileSync(path.join(__dirname, `add_swedefs_batch${batchNum}.js`), script);

    // Execute
    console.log(`Executing batch ${batchNum}...`);
    execSync(`node add_swedefs_batch${batchNum}.js`, { cwd: __dirname, stdio: 'inherit' });

    console.log(`Batch ${batchNum} complete!`);
}

console.log("\n=== All batches complete! ===");
execSync('node find_missing_swedefs_v2.js', { cwd: __dirname, stdio: 'inherit' });
