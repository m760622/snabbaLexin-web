/**
 * Script to find MedicinR terms without Arabic definitions
 * To be run with node
 */

const fs = require('fs');

const dataContent = fs.readFileSync('./data.js', 'utf-8');
let dictionaryData;
try {
    dictionaryData = JSON.parse(dataContent.replace('const dictionaryData = ', '').replace(/;$/, ''));
} catch (e) {
    // Fallback for simple evaluation if JSON parse fails (e.g. if it's a JS file with comments)
    // This is risky in production but acceptable for this local utility script context
    const match = dataContent.match(/(?:const|var|let)\s+dictionaryData\s*=\s*(\[[\s\S]*?\]);/);
    if (match) {
        dictionaryData = eval(match[1]);
    } else {
        console.error("Could not parse dictionaryData");
        process.exit(1);
    }
}

const COL_TYPE = 1;
const COL_SWE = 2;
const COL_ARB_DEF = 5;

const missingDefinitions = dictionaryData.filter(entry => {
    const type = (entry[COL_TYPE] || '').trim();
    // Check for Main MedicinR category
    return type === 'MedicinR.' && !entry[COL_ARB_DEF];
});

console.log(`\n📊 MedicinR. utan arabisk definition: ${missingDefinitions.length}`);

if (missingDefinitions.length > 0) {
    console.log('\nTopp 100 ord:');
    missingDefinitions.slice(0, 100).forEach((entry, index) => {
        console.log(`${index + 1}. ${entry[COL_SWE]}`);
    });

    // Save to file for easy reference
    const outputList = missingDefinitions.map(entry => entry[COL_SWE]);
    fs.writeFileSync('./MedicinR_without_arabic_def.json', JSON.stringify(outputList, null, 2));
    console.log('\n✅ Sparad till MedicinR_without_arabic_def.json');
} else {
    console.log('🎉 Alla MedicinR. ord har arabiska definitioner!');
}
