// Script to find adjectives without Arabic definition
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
const COL_ARB_DEF = 4;  // Arabic definition
const COL_SWE_DEF = 5;  // Swedish definition

// Find all adjectives
const allAdjectives = dictionaryData.filter(entry => {
    const type = (entry[COL_TYPE] || '').toLowerCase();
    return type.includes('adj');
});

// Find adjectives without Arabic definition
const adjectivesWithoutDef = allAdjectives.filter(entry => {
    const arabicDef = entry[COL_ARB_DEF];
    return !arabicDef || arabicDef.trim() === '';
});

console.log(`\n=== Adjectives Analysis ===`);
console.log(`Total adjectives: ${allAdjectives.length}`);
console.log(`Adjectives without Arabic definition: ${adjectivesWithoutDef.length}`);
console.log(`Adjectives WITH Arabic definition: ${allAdjectives.length - adjectivesWithoutDef.length}`);
console.log(`Percentage complete: ${((allAdjectives.length - adjectivesWithoutDef.length) / allAdjectives.length * 100).toFixed(1)}%`);

if (adjectivesWithoutDef.length > 0) {
    console.log(`\n=== Sample Adjectives Without Definition (first 30) ===\n`);
    adjectivesWithoutDef.slice(0, 30).forEach((entry, index) => {
        console.log(`${index + 1}. ID: ${entry[COL_ID]}`);
        console.log(`   Swedish: ${entry[COL_SWE]}`);
        console.log(`   Arabic: ${entry[COL_ARB]}`);
        console.log(`   Swedish Def: "${entry[COL_SWE_DEF] || ''}"`);
        console.log('');
    });

    // Save the list for processing
    const outputData = adjectivesWithoutDef.map(entry => ({
        id: entry[COL_ID],
        swedish: entry[COL_SWE],
        arabic: entry[COL_ARB],
        swedishDef: entry[COL_SWE_DEF] || '',
        arabicDef: entry[COL_ARB_DEF] || ''
    }));

    fs.writeFileSync('./adjectives_needing_arabic_def.json', JSON.stringify(outputData, null, 2));
    console.log(`\nSaved ${outputData.length} adjectives to adjectives_needing_arabic_def.json`);
} else {
    console.log('\n✅ All adjectives have Arabic definitions!');
}
