// Check adverbs without definitions
const fs = require('fs');
const data = fs.readFileSync('./data.js', 'utf-8');
const match = data.match(/const dictionaryData = (\[[\s\S]*?\]);/);
const dict = eval(match[1]);

const COL_TYPE = 1;
const COL_SWE = 2;
const COL_ARB = 3;
const COL_DEF = 5; // Swedish Definition

// Find all adverbs
const allAdverbs = dict.filter(e => (e[COL_TYPE] || '').toLowerCase().includes('adverb'));
const withDef = allAdverbs.filter(e => e[COL_DEF] && e[COL_DEF].trim() !== '');
const withoutDef = allAdverbs.filter(e => !e[COL_DEF] || e[COL_DEF].trim() === '');

console.log('=== إحصائيات التعريفات للظروف (Adverb) ===');
console.log('إجمالي الظروف:', allAdverbs.length);
console.log('مع تعريف:', withDef.length);
console.log('بدون تعريف:', withoutDef.length);

if (withoutDef.length > 0) {
    console.log('\n=== أول 30 ظرف بدون تعريف ===');
    withoutDef.slice(0, 30).forEach((e, i) => {
        console.log(`${i + 1}. ${e[COL_SWE]} (${e[COL_ARB]})`);
    });
}
