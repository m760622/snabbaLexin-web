// Fix ALL mismatched examples by regenerating with correct word
const fs = require('fs');
const dataContent = fs.readFileSync('./data.js', 'utf-8');
const match = dataContent.match(/const dictionaryData = (\[[\s\S]*?\]);/);
let dictionaryData = eval(match[1]);

const COL_ID = 0;
const COL_TYPE = 1;
const COL_SWE = 2;
const COL_ARB = 3;
const COL_EX_SWE = 7;
const COL_EX_ARB = 8;

let fixCount = 0;

for (let i = 0; i < dictionaryData.length; i++) {
    const word = dictionaryData[i][COL_SWE];
    const type = (dictionaryData[i][COL_TYPE] || '').toLowerCase();
    const arb = dictionaryData[i][COL_ARB];
    const example = dictionaryData[i][COL_EX_SWE] || '';

    // Skip if no example or if it's already correct
    if (!example) continue;

    // Check if example uses generic pattern that we added
    const isGenericAdj = example.startsWith('Det är ');
    const isGenericVerb = example.startsWith('Jag brukar ');

    // Skip non-generic examples (likely original good examples)
    if (!isGenericAdj && !isGenericVerb) continue;

    // Check if the word is actually in the example
    const wordLower = word.toLowerCase();
    const exampleLower = example.toLowerCase();

    if (!exampleLower.includes(wordLower)) {
        // This is mismatched - regenerate with correct word
        let newSwe, newArb;

        if (type.includes('adj')) {
            newSwe = `Det är ${word.toLowerCase()}.`;
            newArb = `إنه ${arb}.`;
        } else if (type.includes('verb')) {
            newSwe = `Jag brukar ${word.toLowerCase()}.`;
            newArb = `أنا عادةً ${arb}.`;
        } else {
            // For other types
            newSwe = `${word} är viktigt.`;
            newArb = `${arb} مهم.`;
        }

        dictionaryData[i][COL_EX_SWE] = newSwe;
        dictionaryData[i][COL_EX_ARB] = newArb;
        fixCount++;
    }
}

// Save changes
const newContent = dataContent.replace(
    /const dictionaryData = \[[\s\S]*?\];/,
    'const dictionaryData = ' + JSON.stringify(dictionaryData, null, 4) + ';'
);
fs.writeFileSync('./data.js', newContent, 'utf-8');

console.log(`✅ Fixed ${fixCount} mismatched examples`);

// Verify
const verifyMismatches = [];
for (let i = 0; i < dictionaryData.length; i++) {
    const word = dictionaryData[i][COL_SWE];
    const example = dictionaryData[i][COL_EX_SWE] || '';

    if (!example) continue;

    const isGeneric = example.startsWith('Det är ') || example.startsWith('Jag brukar ') || example.includes(' är viktigt');
    if (!isGeneric) continue;

    const wordLower = word.toLowerCase();
    const exampleLower = example.toLowerCase();

    if (!exampleLower.includes(wordLower)) {
        verifyMismatches.push({ word, example });
    }
}

console.log(`📊 Remaining mismatches in generic examples: ${verifyMismatches.length}`);
if (verifyMismatches.length > 0 && verifyMismatches.length <= 10) {
    verifyMismatches.forEach(m => console.log(`  ${m.word}: "${m.example}"`));
}
