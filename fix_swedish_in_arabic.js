// إصلاح الإدخالات التي تحتوي على نص سويدي في الحقول العربية
// Fix entries with Swedish text in Arabic fields

const fs = require('fs');

// Load data
const dataContent = fs.readFileSync('data.js', 'utf8');

// Extract the array part
const startMarker = 'const dictionaryData = ';
const startIndex = dataContent.indexOf(startMarker);
const arrayStart = dataContent.indexOf('[', startIndex);

let dictionaryData;
try {
    dictionaryData = eval(dataContent.slice(arrayStart));
} catch (e) {
    console.error('Error parsing data:', e);
    process.exit(1);
}

console.log(`Total entries: ${dictionaryData.length}\n`);

// IDs that need fixing (Swedish in Arabic fields)
const idsToFix = [
    'NEW001',
    'ADDED100000', 'ADDED100001', 'ADDED100007', 'ADDED100014', 'ADDED100015',
    'ADDED100016', 'ADDED100019', 'ADDED100021', 'ADDED100022', 'ADDED100024',
    'ADDED200001', 'ADDED200002', 'ADDED200006', 'ADDED200007', 'ADDED200008',
    'ADDED200011', 'ADDED200015', 'ADDED200017', 'ADDED200021', 'ADDED200022',
    'ADDED300001', 'ADDED300008', 'ADDED300010'
];

// Structure:
// [0] ID
// [1] Type
// [2] Swedish word
// [3] Arabic translation
// [4] Arabic explanation (currently has Swedish forms - ERROR)
// [5] Swedish explanation
// [6] Forms (currently empty - should have Swedish forms)
// [7] Swedish example
// [8] Arabic example
// ...

let fixedCount = 0;

for (const entry of dictionaryData) {
    const id = entry[0];

    if (idsToFix.includes(id)) {
        const field4 = entry[4]; // Currently has Swedish forms
        const field6 = entry[6]; // Currently empty

        // Check if field 4 contains Swedish letters (åäö) - these should be forms
        if (/[åäöÅÄÖ]/.test(field4) || /^[a-z,\s]+$/i.test(field4)) {
            console.log(`Fixing ${id}:`);
            console.log(`  Swedish word: ${entry[2]}`);
            console.log(`  Field 4 (was Arabic explanation): "${field4}"`);
            console.log(`  Field 6 (was forms): "${field6}"`);

            // Move Swedish forms from field 4 to field 6
            entry[6] = field4;
            entry[4] = ""; // Clear the Arabic explanation

            console.log(`  -> Moved forms to field 6: "${entry[6]}"`);
            console.log(`  -> Cleared field 4`);
            console.log();

            fixedCount++;
        }
    }
}

// Also check for Lexin012073 - "Att ta i med hårdhandskarna"
for (const entry of dictionaryData) {
    if (entry[0] === 'Lexin012073') {
        console.log(`Checking Lexin012073:`);
        console.log(`  Full entry:`, entry);
        // This seems to be correct - it's a phrase entry, not a translation error
        break;
    }
}

console.log(`\nFixed ${fixedCount} entries`);

// Regenerate the data.js content
const newDataContent = `const dictionaryData = ${JSON.stringify(dictionaryData, null, 4)
    .replace(/\[\n\s+"/g, '[\n        "')
    .replace(/",\n\s+"/g, '",\n        "')
    .replace(/"\n\s+\]/g, '"\n    ]')
    };`;

// Backup original
fs.writeFileSync('data.js.backup_swedish_fix', dataContent, 'utf8');
console.log('Backup saved to data.js.backup_swedish_fix');

// Write fixed data
fs.writeFileSync('data.js', newDataContent, 'utf8');
console.log('Fixed data saved to data.js');
