// Script to find entries with mixed Arabic and Swedish in same field
const fs = require('fs');

let content = fs.readFileSync('data.js', 'utf8');
const match = content.match(/const dictionaryData = (\[[\s\S]*\]);/);
let data = eval(match[1]);

console.log(`Total entries: ${data.length}`);

// Check each field for mixed content
const arabicRegex = /[\u0600-\u06FF]/;
const latinRegex = /[a-zA-ZåäöÅÄÖ]/;

let mixedCases = [];

data.forEach((entry, idx) => {
    // Check COL_ARB_DEF (index 4) - should be Arabic only
    const arbDef = entry[4] || '';
    if (arabicRegex.test(arbDef) && latinRegex.test(arbDef)) {
        // Exclude known patterns like "مصطلح" prefix
        if (!arbDef.startsWith('مصطلح')) {
            mixedCases.push({
                index: idx,
                word: entry[2],
                field: 'ARB_DEF',
                value: arbDef
            });
        }
    }

    // Check COL_SWE_DEF (index 5) - should be Swedish only
    const sweDef = entry[5] || '';
    if (arabicRegex.test(sweDef) && latinRegex.test(sweDef)) {
        mixedCases.push({
            index: idx,
            word: entry[2],
            field: 'SWE_DEF',
            value: sweDef
        });
    }
});

console.log(`\nFound ${mixedCases.length} mixed Arabic/Swedish entries:\n`);

// Show first 20
mixedCases.slice(0, 20).forEach(c => {
    console.log(`[${c.field}] ${c.word}: "${c.value.substring(0, 100)}..."`);
});

if (mixedCases.length > 20) {
    console.log(`\n... and ${mixedCases.length - 20} more`);
}
