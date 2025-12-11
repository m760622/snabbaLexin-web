/**
 * Cleanup Script V4: Remove placeholder definitions
 * 
 * These are generic category descriptors that don't provide meaning:
 * - "اسم يشير إلى شيء أو مفهوم"
 * - "شخص يقوم بعمل أو له صفة معينة"  
 * - "صفة تصف: X"
 * And various other placeholders
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
const COL_ARB_DEF = 4;  // Arabic definition (index 4)

// Generic placeholder patterns to clear (exact matches or patterns)
const placeholderPatterns = [
    // Exact matches
    /^اسم يشير إلى شيء أو مفهوم$/,
    /^شخص يقوم بعمل أو له صفة معينة$/,
    /^شخص يقوم بعمل أو مهنة معينة$/,
    /^فعل أو عملية$/,
    /^مثال أو حالة$/,
    /^فكرة أو مفهوم$/,
    /^كتاب أو نص مكتوب$/,
    /^صوت أو ضجيج$/,
    /^مشروب أو شراب$/,
    /^فيلم أو عمل درامي$/,
    /^حيوان أو كائن حي$/,
    /^رقم أو عدد$/,

    // Pattern matches - "صفة تصف: X" (attribute describes: X)
    /^صفة تصف:\s*.+$/,
];

// Statistics
let stats = {
    placeholdersCleared: 0,
    entriesAffected: 0
};

// Process each entry
for (let i = 0; i < data.length; i++) {
    const entry = data[i];

    // Check Arabic definition (COL 4)
    if (entry[COL_ARB_DEF]) {
        const val = entry[COL_ARB_DEF].trim();

        for (const pattern of placeholderPatterns) {
            if (pattern.test(val)) {
                entry[COL_ARB_DEF] = "";
                stats.placeholdersCleared++;
                stats.entriesAffected++;
                break; // Only count once per entry
            }
        }
    }
}

// Print statistics
console.log('\n📊 Cleanup V4 Statistics (Placeholder Definitions):');
console.log('══════════════════════════════════════════════════════');
console.log(`  Placeholder definitions cleared:    ${stats.placeholdersCleared}`);
console.log(`  Entries affected:                   ${stats.entriesAffected}`);
console.log('══════════════════════════════════════════════════════\n');

if (stats.entriesAffected === 0) {
    console.log('✅ No placeholder patterns found - data is already clean!');
    process.exit(0);
}

// Create backup
const backupPath = DATA_FILE + '.backup_cleanup4_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup created: ${path.basename(backupPath)}`);

// Generate new content
const newDataStr = JSON.stringify(data, null, 2);
const newContent = `const dictionaryData = ${newDataStr};\n`;

// Write back
fs.writeFileSync(DATA_FILE, newContent, 'utf8');
console.log(`✅ data.js updated successfully!`);
console.log(`\n🎉 Cleanup V4 complete! ${stats.entriesAffected} placeholder definitions removed.`);
