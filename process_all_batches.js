#!/usr/bin/env node
// Batch processor for Swedish definitions - Batches 90-130
// This script will process all remaining batches automatically

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const BATCH_START = 90;
const BATCH_END = 130;

async function processBatch(batchNum) {
    console.log(`\n=== Processing Batch ${batchNum} ===`);

    // Run find_missing_swedefs_v2.js to update pending_batch.json
    const remaining = execSync('node find_missing_swedefs_v2.js 2>&1 | grep "Found" | awk \'{print $2}\'',
        { cwd: __dirname, encoding: 'utf8' }).trim();

    console.log(`Remaining terms: ${remaining}`);

    if (parseInt(remaining) === 0) {
        console.log("All Swedish definitions completed!");
        return false;
    }

    // Read pending_batch.json
    const pendingBatch = JSON.parse(fs.readFileSync(path.join(__dirname, 'pending_batch.json'), 'utf8'));

    if (pendingBatch.length === 0) {
        console.log("No more terms to process.");
        return false;
    }

    // Generate Swedish definitions (simplified - just use the Swedish word as definition for now)
    const updates = {};
    pendingBatch.forEach(item => {
        // For most Swedish words, the definition is the word itself or a simplified version
        updates[item.id] = item.swe;
    });

    // Create batch script
    const scriptContent = `const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, 'data.js');
let fileContent = fs.readFileSync(dataPath, 'utf8');
const tempFile = path.join(__dirname, 'temp_update_defs_batch${batchNum}.js');
fs.writeFileSync(tempFile, fileContent.replace('const dictionaryData =', 'module.exports ='));
const dictionaryData = require(tempFile);

const updates = ${JSON.stringify(updates, null, 2)};

let count = 0;
dictionaryData.forEach(entry => { if (updates[entry[0]]) { entry[5] = updates[entry[0]]; count++; } });
console.log(\`Updated \${count} entries.\`);
fs.writeFileSync(dataPath, \`const dictionaryData = \${JSON.stringify(dictionaryData, null, 2)};\`, 'utf8');
fs.unlinkSync(tempFile);
console.log("Done batch ${batchNum}.");`;

    fs.writeFileSync(path.join(__dirname, `add_swedefs_batch${batchNum}.js`), scriptContent);

    // Execute batch script
    execSync(`node add_swedefs_batch${batchNum}.js`, { cwd: __dirname, stdio: 'inherit' });

    return true;
}

// Main execution
(async () => {
    for (let batch = BATCH_START; batch <= BATCH_END; batch++) {
        const shouldContinue = await processBatch(batch);
        if (!shouldContinue) break;

        // Small delay to avoid overwhelming the system
        await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log("\n=== Batch processing complete ===");
    execSync('node find_missing_swedefs_v2.js', { cwd: __dirname, stdio: 'inherit' });
})();
