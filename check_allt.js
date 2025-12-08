// Check Allt entries
const fs = require('fs');
const data = fs.readFileSync('./data.js', 'utf-8');
const match = data.match(/const dictionaryData = (\[[\s\S]*?\]);/);
const dict = eval(match[1]);

// Find all Allt entries
const alltEntries = dict.filter(e => e[2] === 'Allt');

console.log('=== جميع المدخلات لكلمة Allt ===\n');

alltEntries.forEach((e, i) => {
    console.log(`المدخل ${i + 1}:`);
    console.log('  ID:', e[0]);
    console.log('  النوع (Type):', e[1]);
    console.log('  السويدية:', e[2]);
    console.log('  العربية:', e[3]);
    console.log('');
});
