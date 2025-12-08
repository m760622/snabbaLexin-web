// List all adverbs with their Arabic translations for review
const fs = require('fs');
const data = fs.readFileSync('./data.js', 'utf-8');
const match = data.match(/const dictionaryData = (\[[\s\S]*?\]);/);
const dict = eval(match[1]);

const COL_TYPE = 1;
const COL_SWE = 2;
const COL_ARB = 3;

// Find all adverbs
const allAdverbs = dict.filter(e => (e[COL_TYPE] || '').toLowerCase().includes('adverb'));

console.log('=== جميع الظروف (643) مع ترجماتها ===\n');
console.log('راجع هذه القائمة لتحديد الترجمات غير الصحيحة:\n');

// Show all in a reviewable format
allAdverbs.forEach((e, i) => {
    console.log(`${i + 1}. ${e[COL_SWE]} = ${e[COL_ARB]}`);
});
