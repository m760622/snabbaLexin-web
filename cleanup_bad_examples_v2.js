/**
 * Cleanup Script V2: Remove additional useless auto-generated patterns
 * 
 * Patterns to clear:
 * 1. "vara X (ha egenskapen X)" - Swedish idiom pattern
 * 2. "أن يكون X" - Arabic "to be X" pattern  
 * 3. "مرادف أو مرجع" - Placeholder definition
 * 4. "X är en term inom byggbranschen/juridik/medicin" - Generic term sentences
 * 5. "X هو مصطلح في..." - Arabic term pattern
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
const COL_ARB_DEF = 4;          // Arabic definition (index 4)
const COL_SWE_EXAMPLE = 7;      // Swedish example sentence
const COL_ARB_EXAMPLE = 8;      // Arabic example translation
const COL_SWE_IDIOM = 9;        // Swedish idiom
const COL_ARB_IDIOM = 10;       // Arabic idiom translation

// Bad patterns to detect
const badPatterns = {
    // Swedish patterns
    varaHaEgenskapen: /^vara\s+.+\s*\(\s*ha egenskapen\s+.+\s*\)$/i,
    termInom: /^.+\s+är en term inom\s+(byggbranschen|juridik|medicin|القانون)\.?$/i,

    // Arabic patterns
    anYakon: /^أن يكون\s+.+$/,
    moradifRef: /^مرادف أو مرجع$/,
    hoMostalah: /^.+\s+هو مصطلح في\s+.+\.?$/,
};

// Statistics
let stats = {
    varaHaEgenskapen: 0,
    termInom: 0,
    anYakon: 0,
    moradifRef: 0,
    hoMostalah: 0,
    totalCleared: 0,
    entriesAffected: 0
};

// Process each entry
let modifiedCount = 0;

for (let i = 0; i < data.length; i++) {
    const entry = data[i];
    let modified = false;

    // Check Arabic definition (COL 4) for "مرادف أو مرجع"
    if (entry[COL_ARB_DEF]) {
        const val = entry[COL_ARB_DEF].trim();
        if (badPatterns.moradifRef.test(val)) {
            entry[COL_ARB_DEF] = "";
            stats.moradifRef++;
            stats.totalCleared++;
            modified = true;
        }
    }

    // Check Swedish example (COL 7) for "term inom"
    if (entry[COL_SWE_EXAMPLE]) {
        const val = entry[COL_SWE_EXAMPLE].trim();
        if (badPatterns.termInom.test(val)) {
            entry[COL_SWE_EXAMPLE] = "";
            entry[COL_ARB_EXAMPLE] = ""; // Clear corresponding Arabic too
            stats.termInom++;
            stats.totalCleared++;
            modified = true;
        }
    }

    // Check Arabic example (COL 8) for "هو مصطلح"
    if (entry[COL_ARB_EXAMPLE]) {
        const val = entry[COL_ARB_EXAMPLE].trim();
        if (badPatterns.hoMostalah.test(val)) {
            entry[COL_ARB_EXAMPLE] = "";
            stats.hoMostalah++;
            stats.totalCleared++;
            modified = true;
        }
    }

    // Check Swedish idiom (COL 9) for "vara X (ha egenskapen)"
    if (entry[COL_SWE_IDIOM]) {
        const val = entry[COL_SWE_IDIOM].trim();
        if (badPatterns.varaHaEgenskapen.test(val)) {
            entry[COL_SWE_IDIOM] = "";
            entry[COL_ARB_IDIOM] = ""; // Clear corresponding Arabic
            stats.varaHaEgenskapen++;
            stats.totalCleared++;
            modified = true;
        }
    }

    // Check Arabic idiom (COL 10) for "أن يكون"
    if (entry[COL_ARB_IDIOM]) {
        const val = entry[COL_ARB_IDIOM].trim();
        if (badPatterns.anYakon.test(val)) {
            entry[COL_ARB_IDIOM] = "";
            stats.anYakon++;
            stats.totalCleared++;
            modified = true;
        }
    }

    if (modified) {
        modifiedCount++;
    }
}

stats.entriesAffected = modifiedCount;

// Print statistics
console.log('\n📊 Cleanup V2 Statistics:');
console.log('══════════════════════════════════════════════════════');
console.log(`  "vara X (ha egenskapen)" cleared:  ${stats.varaHaEgenskapen}`);
console.log(`  "X är en term inom" cleared:       ${stats.termInom}`);
console.log(`  "أن يكون X" patterns cleared:       ${stats.anYakon}`);
console.log(`  "مرادف أو مرجع" cleared:             ${stats.moradifRef}`);
console.log(`  "هو مصطلح في" cleared:               ${stats.hoMostalah}`);
console.log('══════════════════════════════════════════════════════');
console.log(`  Total fields cleared:              ${stats.totalCleared}`);
console.log(`  Entries affected:                  ${stats.entriesAffected}`);
console.log('══════════════════════════════════════════════════════\n');

// Create backup
const backupPath = DATA_FILE + '.backup_cleanup2_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup created: ${path.basename(backupPath)}`);

// Generate new content
const newDataStr = JSON.stringify(data, null, 2);
const newContent = `const dictionaryData = ${newDataStr};\n`;

// Write back
fs.writeFileSync(DATA_FILE, newContent, 'utf8');
console.log(`✅ data.js updated successfully!`);
console.log(`\n🎉 Cleanup V2 complete! ${stats.entriesAffected} entries cleaned.`);
