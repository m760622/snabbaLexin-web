/**
 * Find JuridikR words without Arabic definitions
 * JuridikR seems to be another legal sub-category.
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

const missingDefs = dictionaryData.filter(entry => {
    const type = (entry[COL_TYPE] || '').trim();
    return type === 'JuridikR.' && (!entry[COL_ARB_DEF] || entry[COL_ARB_DEF].trim() === '');
});

console.log(`\n📊 JuridikR. utan arabisk definition: ${missingDefs.length}`);

if (missingDefs.length > 0) {
    console.log('\nTopp 100 ord:');
    missingDefs.slice(0, 100).forEach((entry, index) => {
        console.log(`${index + 1}. ${entry[COL_SWE]}`);
    });

    // Save to file for easy access
    fs.writeFileSync('JuridikR_without_arabic_def.json', JSON.stringify(missingDefs.map(e => e[COL_SWE]), null, 2));
    console.log('\n✅ Sparad till JuridikR_without_arabic_def.json');
}
