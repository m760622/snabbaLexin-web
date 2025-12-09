const fs = require('fs');
const content = fs.readFileSync('data.js', 'utf8');
const match = content.match(/const dictionaryData = (\[[\s\S]*?\]);/);
if (!match) {
    console.log('Could not parse data');
    process.exit(1);
}
const data = eval(match[1]);

// Column indices based on dictionary structure
const COL_ID = 0;
const COL_TYPE = 1;
const COL_SWE = 2;
const COL_ARB = 3;
const COL_ARB_DEF = 4;
const COL_ARB_DEF_SIMPLE = 5;
const COL_SWE_DEF = 6;

// Find entries where Arabic definition exists but Swedish definition is missing
const missingSweDef = [];

data.forEach((row, index) => {
    const arbDef = row[COL_ARB_DEF] || '';
    const sweDef = row[COL_SWE_DEF] || '';

    // If Arabic definition exists but Swedish definition is empty
    if (arbDef.trim() !== '' && sweDef.trim() === '') {
        missingSweDef.push({
            lineIndex: index,
            id: row[COL_ID],
            type: row[COL_TYPE],
            sweWord: row[COL_SWE],
            arbWord: row[COL_ARB],
            arbDef: arbDef,
            sweDef: sweDef
        });
    }
});

console.log('=== Audit: Swedish Definition Parity ===\n');
console.log('Total entries with Arabic definition but NO Swedish definition:', missingSweDef.length);

// Group by category
const byCategory = {};
missingSweDef.forEach(item => {
    const cat = item.type.split('.')[0];
    if (!byCategory[cat]) byCategory[cat] = [];
    byCategory[cat].push(item);
});

console.log('\nBreakdown by category:');
Object.keys(byCategory).sort().forEach(cat => {
    console.log(`  ${cat}: ${byCategory[cat].length}`);
});

console.log('\nFirst 10 examples:');
missingSweDef.slice(0, 10).forEach((item, i) => {
    console.log(`\n${i + 1}. ${item.sweWord} (${item.type})`);
    console.log(`   Arabic def: ${item.arbDef.substring(0, 60)}...`);
    console.log(`   Swedish def: [EMPTY]`);
});
