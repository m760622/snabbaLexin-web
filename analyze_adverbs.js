// Script to add Arabic definitions to adverbs
// The definitions will be Arabic translations of the Swedish definitions in column 5
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
const COL_ARB_DEF = 4;  // Arabic definition (often empty)
const COL_SWE_DEF = 5;  // Swedish definition

// Find all adverbs
const allAdverbs = dictionaryData.filter(entry => {
    const type = (entry[COL_TYPE] || '').toLowerCase();
    return type.includes('adv');
});

// Find adverbs without Arabic definition
const adverbsWithoutArabicDef = allAdverbs.filter(entry => {
    const arabicDef = entry[COL_ARB_DEF];
    return !arabicDef || arabicDef.trim() === '';
});

console.log(`\n=== Adverbs Analysis ===`);
console.log(`Total adverbs: ${allAdverbs.length}`);
console.log(`Adverbs without Arabic definition: ${adverbsWithoutArabicDef.length}`);
console.log(`Adverbs WITH Arabic definition: ${allAdverbs.length - adverbsWithoutArabicDef.length}`);

// Show some examples with their Swedish definitions
console.log(`\n=== Sample Adverbs Without Arabic Definitions ===\n`);
adverbsWithoutArabicDef.slice(0, 30).forEach((entry, index) => {
    console.log(`${index + 1}. ID: ${entry[COL_ID]}`);
    console.log(`   Swedish: ${entry[COL_SWE]}`);
    console.log(`   Arabic: ${entry[COL_ARB]}`);
    console.log(`   Swedish Def: "${entry[COL_SWE_DEF] || ''}"`);
    console.log(`   Arabic Def: "${entry[COL_ARB_DEF] || ''}"`);
    console.log('');
});

// Save the list with Swedish definitions for translation
const outputData = adverbsWithoutArabicDef.map(entry => ({
    id: entry[COL_ID],
    swedish: entry[COL_SWE],
    arabic: entry[COL_ARB],
    swedishDef: entry[COL_SWE_DEF] || '',
    arabicDef: entry[COL_ARB_DEF] || ''
}));

fs.writeFileSync('./adverbs_needing_arabic_def.json', JSON.stringify(outputData, null, 2));
console.log(`\nSaved ${outputData.length} adverbs to adverbs_needing_arabic_def.json`);
