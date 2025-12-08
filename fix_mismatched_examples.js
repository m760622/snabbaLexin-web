// Fix incorrect examples in data.js
const fs = require('fs');
const dataContent = fs.readFileSync('./data.js', 'utf-8');
const match = dataContent.match(/const dictionaryData = (\[[\s\S]*?\]);/);
let dictionaryData = eval(match[1]);

const COL_ID = 0;
const COL_SWE = 2;
const COL_ARB = 3;
const COL_EX_SWE = 7;
const COL_EX_ARB = 8;

// Corrections map - word -> correct example
const corrections = {
    "Detsamma": { swe: "Tack detsamma!", arb: "شكراً لك أيضاً!" },
    "Glödande": { swe: "Rummet var glödande.", arb: "كانت الغرفة متوهجة." }
};

let fixCount = 0;

for (let i = 0; i < dictionaryData.length; i++) {
    const word = dictionaryData[i][COL_SWE];
    if (corrections[word]) {
        dictionaryData[i][COL_EX_SWE] = corrections[word].swe;
        dictionaryData[i][COL_EX_ARB] = corrections[word].arb;
        console.log(`✓ Fixed: ${word}`);
        console.log(`  New example: ${corrections[word].swe}`);
        fixCount++;
    }
}

// Also find all entries where example doesn't contain the word (basic check)
console.log('\n=== Scanning for mismatched examples ===');
let mismatchCount = 0;
const mismatches = [];

for (let i = 0; i < dictionaryData.length; i++) {
    const word = dictionaryData[i][COL_SWE];
    const example = dictionaryData[i][COL_EX_SWE] || '';

    // Skip if example is empty or uses generic pattern
    if (!example || example.startsWith('Det är ') || example.startsWith('Jag brukar ')) continue;

    // Check if example contains the word (case insensitive)
    const wordLower = word.toLowerCase();
    const exampleLower = example.toLowerCase();

    if (!exampleLower.includes(wordLower) && !exampleLower.includes(wordLower.replace(/a$/, ''))) {
        mismatchCount++;
        if (mismatchCount <= 20) {
            mismatches.push({ word, example });
        }
    }
}

console.log(`Found ${mismatchCount} potential mismatches (showing first 20):`);
mismatches.forEach(m => {
    console.log(`  ${m.word}: "${m.example}"`);
});

// Save changes
const newContent = dataContent.replace(
    /const dictionaryData = \[[\s\S]*?\];/,
    'const dictionaryData = ' + JSON.stringify(dictionaryData, null, 4) + ';'
);
fs.writeFileSync('./data.js', newContent, 'utf-8');

console.log(`\n✅ Fixed ${fixCount} entries`);
