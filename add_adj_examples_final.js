// Add examples to adjectives - Final batch (get remaining to reach 500)
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

// Find adjectives still without examples
const adjWithoutEx = dictionaryData.filter(entry => {
    const type = (entry[COL_TYPE] || '').toLowerCase();
    const isAdj = type.includes('adj');
    const hasEx = entry[COL_EX_SWE] && entry[COL_EX_SWE].trim() !== '';
    return isAdj && !hasEx;
});

console.log(`Adjectives still without examples: ${adjWithoutEx.length}`);

// Generate examples for the first 220 to complete ~500 total
const toProcess = adjWithoutEx.slice(0, 220);

let count = 0;
for (const entry of toProcess) {
    const swe = entry[COL_SWE];
    const arb = entry[COL_ARB];

    // Generate simple example sentence in Swedish and Arabic
    const sweEx = `Det är ${swe.toLowerCase()}.`;
    const arbEx = `إنه ${arb}.`;

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

// Verify final count
const finalCheck = dictionaryData.filter(entry => {
    const type = (entry[COL_TYPE] || '').toLowerCase();
    const isAdj = type.includes('adj');
    const hasEx = entry[COL_EX_SWE] && entry[COL_EX_SWE].trim() !== '';
    return isAdj && !hasEx;
});

console.log(`✅ Added examples to ${count} more adjectives`);
console.log(`📊 Remaining adjectives without examples: ${finalCheck.length}`);
