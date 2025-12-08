// Script to find adverbs without Arabic definition
const fs = require('fs');

// Read data.js
const dataContent = fs.readFileSync('./data.js', 'utf-8');
const match = dataContent.match(/const dictionaryData = (\[[\s\S]*?\]);/);
if (!match) {
    console.error('Could not parse data.js');
    process.exit(1);
}

const dictionaryData = eval(match[1]);

// Column indices based on the dictionary structure
const COL_ID = 0;
const COL_TYPE = 1;
const COL_SWE = 2;
const COL_ARB = 3;
const COL_ARB_DEF = 4;  // Arabic definition
const COL_FORMS = 5;
const COL_IDIOMS = 6;
const COL_EX_SWE = 7;
const COL_EX_ARB = 8;

// Find all adverbs
const allAdverbs = dictionaryData.filter(entry => {
    const type = (entry[COL_TYPE] || '').toLowerCase();
    return type.includes('adv') || type.includes('adverb');
});

// Find adverbs without definition
const adverbsWithoutDef = allAdverbs.filter(entry => {
    const def = entry[COL_ARB_DEF];
    return !def || def.trim() === '';
});

console.log(`\n=== Adverbs Analysis ===`);
console.log(`Total adverbs: ${allAdverbs.length}`);
console.log(`Adverbs without Arabic definition: ${adverbsWithoutDef.length}`);
console.log(`Adverbs with Arabic definition: ${allAdverbs.length - adverbsWithoutDef.length}`);

if (adverbsWithoutDef.length > 0) {
    console.log(`\n=== Adverbs Without Definition ===\n`);
    adverbsWithoutDef.forEach((entry, index) => {
        console.log(`${index + 1}. ID: ${entry[COL_ID]}`);
        console.log(`   Swedish: ${entry[COL_SWE]}`);
        console.log(`   Arabic: ${entry[COL_ARB]}`);
        console.log(`   Type: ${entry[COL_TYPE]}`);
        console.log(`   Current Def: "${entry[COL_ARB_DEF] || ''}"`);
        console.log('');
    });

    // Save to JSON
    const outputData = adverbsWithoutDef.map(entry => ({
        id: entry[COL_ID],
        swedish: entry[COL_SWE],
        arabic: entry[COL_ARB],
        type: entry[COL_TYPE],
        currentDef: entry[COL_ARB_DEF] || ''
    }));
    fs.writeFileSync('./adverbs_without_definition.json', JSON.stringify(outputData, null, 2));
    console.log(`Saved ${adverbsWithoutDef.length} adverbs to adverbs_without_definition.json`);
} else {
    console.log('\n✅ All adverbs have Arabic definitions!');
}
