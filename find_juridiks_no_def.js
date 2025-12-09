/**
 * Find 'JuridikS.' (Legal - Society) terms without Arabic definitions
 */

const fs = require('fs');

const dataContent = fs.readFileSync('./data.js', 'utf-8');
let dictionaryData;
try {
    dictionaryData = JSON.parse(dataContent.replace('const dictionaryData = ', '').replace(/;$/, ''));
} catch (e) {
    const match = dataContent.match(/(?:const|var|let)\s+dictionaryData\s*=\s*(\[[\s\S]*?\]);/);
    dictionaryData = eval(match[1]);
}

const COL_TYPE = 1;
const COL_SWE = 2;
const COL_ARB_DEF = 5;

const missingDefs = dictionaryData
    .filter(entry => (entry[COL_TYPE] || '').trim() === 'JuridikS.' && !entry[COL_ARB_DEF])
    .map(entry => entry[COL_SWE]);

console.log(`\n📊 JuridikS. utan arabisk definition: ${missingDefs.length}\n`);
console.log('Topp 100 ord:');
missingDefs.slice(0, 100).forEach((word, index) => {
    console.log(`${index + 1}. ${word}`);
});

// Save to file for reference
fs.writeFileSync('JuridikS_without_arabic_def.json', JSON.stringify(missingDefs, null, 2));
console.log('\n✅ Sparad till JuridikS_without_arabic_def.json');
