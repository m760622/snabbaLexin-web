// Script to find adjectives without examples
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

// Find adjectives without examples
const adjectivesWithoutExamples = dictionaryData.filter(entry => {
    const type = (entry[COL_TYPE] || '').toLowerCase();
    const isAdjective = type.includes('adj');
    const hasExample = entry[COL_EX_SWE] && entry[COL_EX_SWE].trim() !== '';
    return isAdjective && !hasExample;
});

// Common Swedish adjectives (prioritize these)
const commonAdjectives = [
    'bra', 'god', 'stor', 'liten', 'ny', 'gammal', 'ung', 'lång', 'kort', 'hög',
    'låg', 'bred', 'smal', 'tjock', 'tunn', 'tung', 'lätt', 'snabb', 'långsam',
    'varm', 'kall', 'het', 'sval', 'vacker', 'ful', 'rik', 'fattig', 'stark',
    'svag', 'frisk', 'sjuk', 'glad', 'ledsen', 'arg', 'rädd', 'lugn', 'nervös',
    'trött', 'pigg', 'hungrig', 'mätt', 'törstig', 'full', 'tom', 'ren', 'smutsig',
    'våt', 'torr', 'mjuk', 'hård', 'skarp', 'trubbig', 'ljus', 'mörk', 'vit',
    'svart', 'röd', 'blå', 'grön', 'gul', 'brun', 'grå', 'rosa', 'orange', 'lila',
    'dyr', 'billig', 'gratis', 'öppen', 'stängd', 'nära', 'fjärran', 'tidig', 'sen',
    'snäll', 'elak', 'smart', 'dum', 'rolig', 'tråkig', 'intressant', 'viktig',
    'läcker', 'äcklig', 'söt', 'sur', 'salt', 'bitter', 'kryddig', 'mild'
];

// Sort: common adjectives first, then alphabetically
adjectivesWithoutExamples.sort((a, b) => {
    const aWord = (a[COL_SWE] || '').toLowerCase();
    const bWord = (b[COL_SWE] || '').toLowerCase();
    const aIndex = commonAdjectives.indexOf(aWord);
    const bIndex = commonAdjectives.indexOf(bWord);

    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;
    return aWord.localeCompare(bWord, 'sv');
});

console.log(`\n=== Adjectives Without Examples ===`);
console.log(`Total adjectives without examples: ${adjectivesWithoutExamples.length}\n`);

// Show first 500
const top500 = adjectivesWithoutExamples.slice(0, 500);
console.log(`Top 500 adjectives to add examples for:\n`);

top500.forEach((entry, index) => {
    console.log(`${index + 1}. ${entry[COL_SWE]} (${entry[COL_ARB]}) - ID: ${entry[COL_ID]}`);
});

// Save to JSON for processing
const outputData = top500.map(entry => ({
    id: entry[COL_ID],
    swedish: entry[COL_SWE],
    arabic: entry[COL_ARB],
    type: entry[COL_TYPE]
}));

fs.writeFileSync('./adjectives_without_examples.json', JSON.stringify(outputData, null, 2));
console.log(`\nSaved ${top500.length} adjectives to adjectives_without_examples.json`);
