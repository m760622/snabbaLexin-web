// Comprehensive analysis of ALL words without Arabic definition
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

// Find ALL words without Arabic definition
const wordsWithoutDef = dictionaryData.filter(entry => {
    const arabicDef = entry[COL_ARB_DEF];
    return !arabicDef || arabicDef.trim() === '';
});

// Group by type
const byType = {};
wordsWithoutDef.forEach(entry => {
    const type = entry[COL_TYPE] || 'Unknown';
    if (!byType[type]) {
        byType[type] = [];
    }
    byType[type].push(entry);
});

console.log(`\n=== Complete Dictionary Analysis ===`);
console.log(`Total words in dictionary: ${dictionaryData.length}`);
console.log(`Words WITHOUT Arabic definition: ${wordsWithoutDef.length}`);
console.log(`Words WITH Arabic definition: ${dictionaryData.length - wordsWithoutDef.length}`);
console.log(`Percentage complete: ${((dictionaryData.length - wordsWithoutDef.length) / dictionaryData.length * 100).toFixed(1)}%`);

if (wordsWithoutDef.length > 0) {
    console.log(`\n=== Words Without Definition by Type ===\n`);
    Object.keys(byType).sort((a, b) => byType[b].length - byType[a].length).forEach(type => {
        console.log(`${type}: ${byType[type].length} words`);
    });

    console.log(`\n=== Sample Words Without Definition ===\n`);
    Object.keys(byType).forEach(type => {
        console.log(`\n--- ${type} (${byType[type].length} total) ---`);
        byType[type].slice(0, 5).forEach((entry, index) => {
            console.log(`${index + 1}. ${entry[COL_SWE]} = ${entry[COL_ARB]}`);
            console.log(`   Swedish Def: "${(entry[COL_SWE_DEF] || '').substring(0, 50)}"`);
        });
    });

    // Save the complete list
    fs.writeFileSync('./all_words_without_def.json', JSON.stringify(wordsWithoutDef.map(e => ({
        id: e[COL_ID],
        type: e[COL_TYPE],
        swedish: e[COL_SWE],
        arabic: e[COL_ARB],
        swedishDef: e[COL_SWE_DEF] || ''
    })), null, 2));
    console.log(`\nSaved ${wordsWithoutDef.length} words to all_words_without_def.json`);
} else {
    console.log('\n🎉 ALL WORDS HAVE ARABIC DEFINITIONS! 🎉');
}
