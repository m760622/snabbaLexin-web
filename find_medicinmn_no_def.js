/**
 * Find MedicinMN words without Arabic definitions
 */

const fs = require('fs');

const dataContent = fs.readFileSync('./data.js', 'utf-8');
// Parse the file content to get the dictionaryData array
let dictionaryData;
try {
    // Try simple parsing if it's just a variable assignment
    dictionaryData = JSON.parse(dataContent.replace('const dictionaryData = ', '').replace(/;$/, ''));
} catch (e) {
    // If that fails (e.g. comments or spacing), try eval or Regex extraction
    // Regex to extract the array content
    const match = dataContent.match(/(?:const|var|let)\s+dictionaryData\s*=\s*(\[[\s\S]*?\]);/);
    if (match) {
        dictionaryData = eval(match[1]);
    } else {
        console.error('Could not parse dictionaryData');
        process.exit(1);
    }
}

const COL_TYPE = 1;
const COL_SWE = 2;
const COL_ARB_DEF = 5;

const missingDefinitions = [];

dictionaryData.forEach(entry => {
    const type = (entry[COL_TYPE] || '').trim();
    // Check for MedicinMN.
    if (type === 'MedicinMN.' && (!entry[COL_ARB_DEF] || entry[COL_ARB_DEF].trim() === '')) {
        missingDefinitions.push(entry[COL_SWE]);
    }
});

console.log(`\n📊 MedicinMN. utan arabisk definition: ${missingDefinitions.length}`);

if (missingDefinitions.length > 0) {
    console.log('\nTopp 100 ord:');
    missingDefinitions.slice(0, 100).forEach((word, index) => {
        console.log(`${index + 1}. ${word}`);
    });

    // Save list to file for reference
    fs.writeFileSync('MedicinMN_without_arabic_def.json', JSON.stringify(missingDefinitions, null, 2));
    console.log('\n✅ Sparad till MedicinMN_without_arabic_def.json');
} else {
    console.log('🎉 Alla MedicinMN-ord har arabiska definitioner!');
}
