// Script to find prepositions without Arabic definition
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

// Find all prepositions (Prep, Preposition)
const allPrepositions = dictionaryData.filter(entry => {
    const type = (entry[COL_TYPE] || '').toLowerCase();
    return type.includes('prep');
});

// Find prepositions without Arabic definition
const prepositionsWithoutDef = allPrepositions.filter(entry => {
    const arabicDef = entry[COL_ARB_DEF];
    return !arabicDef || arabicDef.trim() === '';
});

console.log(`\n=== Prepositions Analysis ===`);
console.log(`Total prepositions: ${allPrepositions.length}`);
console.log(`Prepositions without Arabic definition: ${prepositionsWithoutDef.length}`);
console.log(`Prepositions WITH Arabic definition: ${allPrepositions.length - prepositionsWithoutDef.length}`);
console.log(`Percentage complete: ${((allPrepositions.length - prepositionsWithoutDef.length) / allPrepositions.length * 100).toFixed(1)}%`);

if (prepositionsWithoutDef.length > 0) {
    console.log(`\n=== Prepositions Without Definition ===\n`);
    prepositionsWithoutDef.forEach((entry, index) => {
        console.log(`${index + 1}. ID: ${entry[COL_ID]}`);
        console.log(`   Swedish: ${entry[COL_SWE]}`);
        console.log(`   Arabic: ${entry[COL_ARB]}`);
        console.log(`   Swedish Def: "${entry[COL_SWE_DEF] || ''}"`);
        console.log('');
    });

    // Save the list
    const outputData = prepositionsWithoutDef.map(entry => ({
        id: entry[COL_ID],
        swedish: entry[COL_SWE],
        arabic: entry[COL_ARB],
        swedishDef: entry[COL_SWE_DEF] || ''
    }));

    fs.writeFileSync('./prepositions_needing_arabic_def.json', JSON.stringify(outputData, null, 2));
    console.log(`Saved ${outputData.length} prepositions to prepositions_needing_arabic_def.json`);
} else {
    console.log('\n✅ All prepositions have Arabic definitions!');
}
