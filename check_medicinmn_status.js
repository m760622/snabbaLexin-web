const fs = require('fs');
const content = fs.readFileSync('data.js', 'utf8');
const match = content.match(/const dictionaryData = (\[[\s\S]*?\]);/);
if (!match) {
    console.log('Could not parse data');
    process.exit(1);
}
const data = eval(match[1]);

// Column indices
const COL_SWE = 0, COL_TYPE = 1, COL_ARB = 2, COL_SWE_DEF = 3, COL_ARB_DEF = 4;

// Find MedicinMN terms without Arabic definitions
const missingDefs = data.filter(row => {
    const type = row[COL_TYPE] || '';
    const arbDef = row[COL_ARB_DEF] || '';
    return type.startsWith('MedicinMN.') && arbDef.trim() === '';
});

console.log('=== MedicinMN Category Status ===');
console.log('Total MedicinMN terms without Arabic definitions:', missingDefs.length);

if (missingDefs.length > 0) {
    console.log('\nFirst 30 terms needing definitions:');
    missingDefs.slice(0, 30).forEach((row, i) => {
        console.log((i + 1) + '. ' + row[COL_SWE] + ' (' + row[COL_TYPE] + ')');
        console.log('   Swedish def: ' + (row[COL_SWE_DEF] || 'N/A'));
    });
}
