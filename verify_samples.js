const fs = require('fs');
const content = fs.readFileSync('data.js', 'utf8');
const match = content.match(/const dictionaryData = (\[[\s\S]*?\]);/);
if (!match) {
    console.log('Could not parse data');
    process.exit(1);
}
const data = eval(match[1]);

// Column indices
const COL_TYPE = 1;
const COL_SWE = 2;
const COL_ARB = 3;
const COL_ARB_DEF = 4;
const COL_SWE_DEF = 6;

// Sample entries from different categories
const categories = ['Medicin', 'JuridikS', 'Bygg', 'MedicinMR', 'Samhälle', 'MigrationTB'];

console.log('=== Sample Verification of Swedish Definitions ===\n');

categories.forEach(cat => {
    console.log(`\n--- ${cat} ---`);
    const sample = data.filter(row => (row[COL_TYPE] || '').startsWith(cat)).slice(0, 3);
    sample.forEach((row, i) => {
        console.log(`\n${i + 1}. Swedish: ${row[COL_SWE]}`);
        console.log(`   Arabic: ${row[COL_ARB]}`);
        console.log(`   Arabic Def: ${(row[COL_ARB_DEF] || '').substring(0, 60)}...`);
        console.log(`   Swedish Def: ${row[COL_SWE_DEF] || '[EMPTY]'}`);
    });
});
