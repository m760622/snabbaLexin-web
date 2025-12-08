// Fix Diesel and any other obvious mismatches
const fs = require('fs');
const dataContent = fs.readFileSync('./data.js', 'utf-8');
const match = dataContent.match(/const dictionaryData = (\[[\s\S]*?\]);/);
let dictionaryData = eval(match[1]);

const COL_ID = 0;
const COL_SWE = 2;
const COL_EX_SWE = 7;
const COL_EX_ARB = 8;

// Find and fix Diesel
for (let i = 0; i < dictionaryData.length; i++) {
    if (dictionaryData[i][COL_SWE] === 'Diesel') {
        dictionaryData[i][COL_EX_SWE] = 'Bilen körs på diesel.';
        dictionaryData[i][COL_EX_ARB] = 'السيارة تعمل بالديزل.';
        console.log('✓ Fixed Diesel');
    }
}

// Save
const newContent = dataContent.replace(
    /const dictionaryData = \[[\s\S]*?\];/,
    'const dictionaryData = ' + JSON.stringify(dictionaryData, null, 4) + ';'
);
fs.writeFileSync('./data.js', newContent, 'utf-8');
console.log('Done!');
