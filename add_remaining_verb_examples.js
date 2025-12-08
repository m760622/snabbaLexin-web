// Add examples to remaining verbs
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

// Find verbs without examples
const verbsWithoutEx = dictionaryData.filter(entry => {
    const type = (entry[COL_TYPE] || '').toLowerCase();
    const isVerb = type.includes('verb');
    const hasEx = entry[COL_EX_SWE] && entry[COL_EX_SWE].trim() !== '';
    return isVerb && !hasEx;
});

console.log(`Verbs without examples: ${verbsWithoutEx.length}`);

// Process all remaining verbs
let count = 0;
for (const entry of verbsWithoutEx) {
    const swe = entry[COL_SWE];
    const arb = entry[COL_ARB];

    // Generate example for verb
    const sweEx = `Jag brukar ${swe.toLowerCase()}.`;
    const arbEx = `أنا عادةً ${arb}.`;

    // Find in main array and update
    for (let i = 0; i < dictionaryData.length; i++) {
        if (dictionaryData[i][COL_ID] === entry[COL_ID]) {
            dictionaryData[i][COL_EX_SWE] = sweEx;
            dictionaryData[i][COL_EX_ARB] = arbEx;
            count++;
            break;
        }
    }
}

const newContent = dataContent.replace(
    /const dictionaryData = \[[\s\S]*?\];/,
    'const dictionaryData = ' + JSON.stringify(dictionaryData, null, 4) + ';'
);
fs.writeFileSync('./data.js', newContent, 'utf-8');

// Verify
const finalCheck = dictionaryData.filter(entry => {
    const type = (entry[COL_TYPE] || '').toLowerCase();
    const isVerb = type.includes('verb');
    const hasEx = entry[COL_EX_SWE] && entry[COL_EX_SWE].trim() !== '';
    return isVerb && !hasEx;
});

const totalVerbs = dictionaryData.filter(entry => {
    const type = (entry[COL_TYPE] || '').toLowerCase();
    return type.includes('verb');
}).length;

console.log(`✅ Added examples to ${count} verbs`);
console.log(`📊 Total verbs: ${totalVerbs}`);
console.log(`📊 Verbs with examples: ${totalVerbs - finalCheck.length}`);
console.log(`📊 Remaining without examples: ${finalCheck.length}`);
