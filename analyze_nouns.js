// Script to find nouns without Arabic definition
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

// Find all nouns (Substantiv)
const allNouns = dictionaryData.filter(entry => {
    const type = (entry[COL_TYPE] || '').toLowerCase();
    return type.includes('subst');
});

// Find nouns without Arabic definition
const nounsWithoutDef = allNouns.filter(entry => {
    const arabicDef = entry[COL_ARB_DEF];
    return !arabicDef || arabicDef.trim() === '';
});

console.log(`\n=== Nouns Analysis ===`);
console.log(`Total nouns: ${allNouns.length}`);
console.log(`Nouns without Arabic definition: ${nounsWithoutDef.length}`);
console.log(`Nouns WITH Arabic definition: ${allNouns.length - nounsWithoutDef.length}`);
console.log(`Percentage complete: ${((allNouns.length - nounsWithoutDef.length) / allNouns.length * 100).toFixed(1)}%`);

if (nounsWithoutDef.length > 0) {
    console.log(`\n=== Sample Nouns Without Definition (first 30) ===\n`);
    nounsWithoutDef.slice(0, 30).forEach((entry, index) => {
        console.log(`${index + 1}. ID: ${entry[COL_ID]}`);
        console.log(`   Swedish: ${entry[COL_SWE]}`);
        console.log(`   Arabic: ${entry[COL_ARB]}`);
        console.log(`   Swedish Def: "${(entry[COL_SWE_DEF] || '').substring(0, 60)}..."`);
        console.log('');
    });

    // Save the list
    const outputData = nounsWithoutDef.map(entry => ({
        id: entry[COL_ID],
        swedish: entry[COL_SWE],
        arabic: entry[COL_ARB],
        swedishDef: entry[COL_SWE_DEF] || ''
    }));

    fs.writeFileSync('./nouns_needing_arabic_def.json', JSON.stringify(outputData, null, 2));
    console.log(`Saved ${outputData.length} nouns to nouns_needing_arabic_def.json`);
} else {
    console.log('\n✅ All nouns have Arabic definitions!');
}
