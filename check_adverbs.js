// Check adverbs without examples
const fs = require('fs');
const data = fs.readFileSync('./data.js', 'utf-8');
const match = data.match(/const dictionaryData = (\[[\s\S]*?\]);/);
const dict = eval(match[1]);

const COL_TYPE = 1;
const COL_SWE = 2;
const COL_EX_SWE = 7;

// Find all adverbs
const allAdverbs = dict.filter(e => (e[COL_TYPE] || '').toLowerCase().includes('adverb'));
const withEx = allAdverbs.filter(e => e[COL_EX_SWE] && e[COL_EX_SWE].trim() !== '');
const withoutEx = allAdverbs.filter(e => !e[COL_EX_SWE] || e[COL_EX_SWE].trim() === '');

console.log('=== إحصائيات الظروف (Adverb) ===');
console.log('إجمالي الظروف:', allAdverbs.length);
console.log('مع أمثلة:', withEx.length);
console.log('بدون أمثلة:', withoutEx.length);

if (withoutEx.length > 0) {
    console.log('\n=== أول 20 ظرف بدون مثال ===');
    withoutEx.slice(0, 20).forEach((e, i) => {
        console.log(`${i + 1}. ${e[COL_SWE]}`);
    });
}
