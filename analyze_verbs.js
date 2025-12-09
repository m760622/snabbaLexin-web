// Script to find verbs without Arabic definition
const fs = require('fs');

// Read data.js
const dataContent = fs.readFileSync('./data.js', 'utf-8');
const match = dataContent.match(/const dictionaryData = (\[[\s\S]*?\]);/);
if (!match) {
    console.error('Could not parse data.js');
    process.exit(1);
}

const dictionaryData = eval(match[1]);

// Column indices
const COL_ID = 0;
const COL_TYPE = 1;
const COL_SWE = 2;
const COL_ARB = 3;
const COL_ARB_DEF = 4;
const COL_SWE_DEF = 5;

// Find all verbs
const allVerbs = dictionaryData.filter(entry => {
    const type = (entry[COL_TYPE] || '').toLowerCase();
    return type.includes('verb');
});

// Find verbs without Arabic definition
const verbsWithoutDef = allVerbs.filter(entry => {
    const arabicDef = entry[COL_ARB_DEF];
    return !arabicDef || arabicDef.trim() === '';
});

console.log(`\n=== Verbs Analysis ===`);
console.log(`Total verbs: ${allVerbs.length}`);
console.log(`Verbs without Arabic definition: ${verbsWithoutDef.length}`);
console.log(`Verbs WITH Arabic definition: ${allVerbs.length - verbsWithoutDef.length}`);
console.log(`Percentage complete: ${((allVerbs.length - verbsWithoutDef.length) / allVerbs.length * 100).toFixed(1)}%`);

if (verbsWithoutDef.length > 0) {
    console.log(`\n=== Sample Verbs Without Definition (first 30) ===\n`);
    verbsWithoutDef.slice(0, 30).forEach((entry, index) => {
        console.log(`${index + 1}. ID: ${entry[COL_ID]}`);
        console.log(`   Swedish: ${entry[COL_SWE]}`);
        console.log(`   Arabic: ${entry[COL_ARB]}`);
        console.log(`   Swedish Def: "${(entry[COL_SWE_DEF] || '').substring(0, 60)}..."`);
        console.log('');
    });

    // Save the list
    const outputData = verbsWithoutDef.map(entry => ({
        id: entry[COL_ID],
        swedish: entry[COL_SWE],
        arabic: entry[COL_ARB],
        swedishDef: entry[COL_SWE_DEF] || ''
    }));

    fs.writeFileSync('./verbs_needing_arabic_def.json', JSON.stringify(outputData, null, 2));
    console.log(`Saved ${outputData.length} verbs to verbs_needing_arabic_def.json`);
} else {
    console.log('\n✅ All verbs have Arabic definitions!');
}
