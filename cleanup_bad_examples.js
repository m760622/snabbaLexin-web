/**
 * Cleanup Script: Remove useless auto-generated example sentences
 * 
 * This script identifies and clears bad example patterns:
 * 1. "en X (något som är X)" - Useless idiom pattern
 * 2. "X används ofta." - Generic "used often" pattern
 * 3. "X (används i sammanhang)" - Generic context pattern
 * 4. "X يُستخدم كثيراً." - Arabic translation of bad pattern
 * 5. "X (يُستخدم في سياق)" - Arabic context pattern
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

// Read the data file
let content = fs.readFileSync(DATA_FILE, 'utf8');

// Extract the data array - look for dictionaryData
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

// Column indices (based on file analysis)
const COL_SWE_EXAMPLE = 7;      // Swedish example sentence
const COL_ARB_EXAMPLE = 8;      // Arabic example translation
const COL_SWE_IDIOM = 9;        // Swedish idiom
const COL_ARB_IDIOM = 10;       // Arabic idiom translation

// Bad patterns to detect and clear
const badPatterns = {
    // Pattern 1: "en/ett X (något som är X)"
    nagotSomAr: /^(en|ett)\s+.+\s*\(\s*något som är\s+.+\s*\)$/i,

    // Pattern 2: "X används ofta."
    anvandOfta: /^.+\s+används ofta\.?$/i,

    // Pattern 3: "X (används i sammanhang)"
    anvandsSammanhang: /^.+\s*\(\s*används i sammanhang\s*\)$/i,

    // Pattern 4: "X يُستخدم كثيراً."
    arabicUsedOften: /^.+\s+يُستخدم كثيراً\.?$/,

    // Pattern 5: "X (يُستخدم في سياق)"
    arabicContext: /^.+\s*\(\s*يُستخدم في سياق\s*\)$/,
};

// Statistics
let stats = {
    nagotSomAr: 0,
    anvandOfta: 0,
    anvandsSammanhang: 0,
    arabicUsedOften: 0,
    arabicContext: 0,
    totalCleared: 0,
    entriesAffected: 0
};

// Process each entry
let modifiedCount = 0;

for (let i = 0; i < data.length; i++) {
    const entry = data[i];
    let modified = false;

    // Check Swedish example (COL 7)
    if (entry[COL_SWE_EXAMPLE]) {
        const val = entry[COL_SWE_EXAMPLE].trim();
        if (badPatterns.anvandOfta.test(val)) {
            entry[COL_SWE_EXAMPLE] = "";
            entry[COL_ARB_EXAMPLE] = ""; // Clear corresponding Arabic too
            stats.anvandOfta++;
            stats.totalCleared++;
            modified = true;
        }
    }

    // Check Arabic example (COL 8) 
    if (entry[COL_ARB_EXAMPLE]) {
        const val = entry[COL_ARB_EXAMPLE].trim();
        if (badPatterns.arabicUsedOften.test(val)) {
            entry[COL_ARB_EXAMPLE] = "";
            stats.arabicUsedOften++;
            stats.totalCleared++;
            modified = true;
        }
    }

    // Check Swedish idiom (COL 9)
    if (entry[COL_SWE_IDIOM]) {
        const val = entry[COL_SWE_IDIOM].trim();
        if (badPatterns.nagotSomAr.test(val)) {
            entry[COL_SWE_IDIOM] = "";
            entry[COL_ARB_IDIOM] = ""; // Clear corresponding Arabic too
            stats.nagotSomAr++;
            stats.totalCleared++;
            modified = true;
        } else if (badPatterns.anvandsSammanhang.test(val)) {
            entry[COL_SWE_IDIOM] = "";
            entry[COL_ARB_IDIOM] = ""; // Clear corresponding Arabic too
            stats.anvandsSammanhang++;
            stats.totalCleared++;
            modified = true;
        }
    }

    // Check Arabic idiom (COL 10)
    if (entry[COL_ARB_IDIOM]) {
        const val = entry[COL_ARB_IDIOM].trim();
        if (badPatterns.arabicContext.test(val)) {
            entry[COL_ARB_IDIOM] = "";
            stats.arabicContext++;
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
console.log('\n📊 Cleanup Statistics:');
console.log('══════════════════════════════════════════════════');
console.log(`  "något som är X" patterns cleared: ${stats.nagotSomAr}`);
console.log(`  "används ofta" patterns cleared:   ${stats.anvandOfta}`);
console.log(`  "används i sammanhang" cleared:    ${stats.anvandsSammanhang}`);
console.log(`  "يُستخدم كثيراً" patterns cleared:   ${stats.arabicUsedOften}`);
console.log(`  "يُستخدم في سياق" patterns cleared: ${stats.arabicContext}`);
console.log('══════════════════════════════════════════════════');
console.log(`  Total fields cleared:              ${stats.totalCleared}`);
console.log(`  Entries affected:                  ${stats.entriesAffected}`);
console.log('══════════════════════════════════════════════════\n');

// Create backup
const backupPath = DATA_FILE + '.backup_cleanup_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup created: ${path.basename(backupPath)}`);

// Generate new content
const newDataStr = JSON.stringify(data, null, 2);
const newContent = `const dictionaryData = ${newDataStr};\n`;

// Write back
fs.writeFileSync(DATA_FILE, newContent, 'utf8');
console.log(`✅ data.js updated successfully!`);
console.log(`\n🎉 Cleanup complete! ${stats.entriesAffected} entries cleaned.`);
