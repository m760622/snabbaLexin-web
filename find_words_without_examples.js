// Script to find ALL words without examples
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
const COL_EX_SWE = 7;
const COL_EX_ARB = 8;

// Find all words without examples
const wordsWithoutExamples = dictionaryData.filter(entry => {
    const hasExample = entry[COL_EX_SWE] && entry[COL_EX_SWE].trim() !== '';
    return !hasExample;
});

// Group by type
const byType = {};
wordsWithoutExamples.forEach(entry => {
    const type = (entry[COL_TYPE] || 'unknown').toLowerCase();
    if (!byType[type]) {
        byType[type] = [];
    }
    byType[type].push(entry);
});

console.log(`\n=== Words Without Examples Summary ===`);
console.log(`Total words without examples: ${wordsWithoutExamples.length}`);
console.log(`Total words in dictionary: ${dictionaryData.length}`);
console.log(`Percentage complete: ${((dictionaryData.length - wordsWithoutExamples.length) / dictionaryData.length * 100).toFixed(2)}%\n`);

console.log(`=== By Type ===`);
Object.keys(byType).sort((a, b) => byType[b].length - byType[a].length).forEach(type => {
    console.log(`${type}: ${byType[type].length}`);
});

// Show sample words for each type
console.log(`\n=== Sample Words Without Examples (first 10 of each type) ===\n`);
Object.keys(byType).sort((a, b) => byType[b].length - byType[a].length).forEach(type => {
    console.log(`--- ${type.toUpperCase()} (${byType[type].length} total) ---`);
    const sample = byType[type].slice(0, 10);
    sample.forEach((entry, index) => {
        console.log(`  ${index + 1}. ${entry[COL_SWE]} (${entry[COL_ARB]})`);
    });
    console.log('');
});
