/**
 * Find MedicinTB words without Arabic definitions
 */

const fs = require('fs');

const dataContent = fs.readFileSync('./data.js', 'utf-8');
let dictionaryData;
try {
    const match = dataContent.match(/(?:const|var|let)\s+dictionaryData\s*=\s*(\[[\s\S]*?\]);/);
    if (match) {
        dictionaryData = eval(match[1]);
    }
} catch (e) { }

const COL_TYPE = 1;
const COL_SWE = 2;
const COL_ARB_DEF = 5;

const missingDefinitions = [];

dictionaryData.forEach(entry => {
    const type = (entry[COL_TYPE] || '').trim();
    if (type === 'MedicinTB.' && (!entry[COL_ARB_DEF] || entry[COL_ARB_DEF].trim() === '')) {
        missingDefinitions.push(entry[COL_SWE]);
    }
});

console.log(`\n📊 MedicinTB. utan arabisk definition: ${missingDefinitions.length}`);
missingDefinitions.forEach(word => console.log(word));
