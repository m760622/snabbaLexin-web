/**
 * Cleanup Script V3: Remove remaining "term inom" patterns
 * Specifically targets military and other categories missed by V2
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

// Read the data file
let content = fs.readFileSync(DATA_FILE, 'utf8');

// Extract the data array
const match = content.match(/const\s+dictionaryData\s*=\s*(\[[\s\S]*\]);/);
if (!match) {
    console.error('Could not find dictionaryData array in file');
    process.exit(1);
}

let data;
try {
    data = eval(match[1]);
} catch (e) {
    console.error('Error parsing data:', e.message);
    process.exit(1);
}

console.log(`Loaded ${data.length} entries from data.js`);

// Column indices
const COL_SWE_EXAMPLE = 7;      // Swedish example sentence
const COL_ARB_EXAMPLE = 8;      // Arabic example translation

// Bad patterns - broader matching for "term inom"
const termInomPattern = /^.+\s+är en term inom\s+.+\.?$/i;
const hoMostalahPattern = /^.+\s+هو مصطلح في\s+.+\.?$/;

// Statistics
let stats = {
    termInom: 0,
    hoMostalah: 0,
    entriesAffected: 0
};

// Process each entry
for (let i = 0; i < data.length; i++) {
    const entry = data[i];
    let modified = false;

    // Check Swedish example (COL 7) for any "term inom" pattern
    if (entry[COL_SWE_EXAMPLE]) {
        const val = entry[COL_SWE_EXAMPLE].trim();
        if (termInomPattern.test(val)) {
            entry[COL_SWE_EXAMPLE] = "";
            entry[COL_ARB_EXAMPLE] = ""; // Clear corresponding Arabic too
            stats.termInom++;
            modified = true;
        }
    }

    // Check Arabic example (COL 8) for "هو مصطلح في"
    if (entry[COL_ARB_EXAMPLE]) {
        const val = entry[COL_ARB_EXAMPLE].trim();
        if (hoMostalahPattern.test(val)) {
            entry[COL_ARB_EXAMPLE] = "";
            stats.hoMostalah++;
            modified = true;
        }
    }

    if (modified) {
        stats.entriesAffected++;
    }
}

// Print statistics
console.log('\n📊 Cleanup V3 Statistics:');
console.log('══════════════════════════════════════════════════════');
console.log(`  "X är en term inom Y" cleared:       ${stats.termInom}`);
console.log(`  "X هو مصطلح في Y" cleared:             ${stats.hoMostalah}`);
console.log('══════════════════════════════════════════════════════');
console.log(`  Entries affected:                    ${stats.entriesAffected}`);
console.log('══════════════════════════════════════════════════════\n');

if (stats.entriesAffected === 0) {
    console.log('✅ No patterns found - data is already clean!');
    process.exit(0);
}

// Create backup
const backupPath = DATA_FILE + '.backup_cleanup3_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup created: ${path.basename(backupPath)}`);

// Generate new content
const newDataStr = JSON.stringify(data, null, 2);
const newContent = `const dictionaryData = ${newDataStr};\n`;

// Write back
fs.writeFileSync(DATA_FILE, newContent, 'utf8');
console.log(`✅ data.js updated successfully!`);
console.log(`\n🎉 Cleanup V3 complete! ${stats.entriesAffected} entries cleaned.`);
