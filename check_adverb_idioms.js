// Check adverbs without idioms (تعبير)
const fs = require('fs');
const data = fs.readFileSync('./data.js', 'utf-8');
const match = data.match(/const dictionaryData = (\[[\s\S]*?\]);/);
const dict = eval(match[1]);

const COL_TYPE = 1;
const COL_SWE = 2;
const COL_IDIOM_SWE = 9;
const COL_IDIOM_ARB = 10;

// Find all adverbs
const allAdverbs = dict.filter(e => (e[COL_TYPE] || '').toLowerCase().includes('adverb'));
const withIdiom = allAdverbs.filter(e => e[COL_IDIOM_SWE] && e[COL_IDIOM_SWE].trim() !== '');
const withoutIdiom = allAdverbs.filter(e => !e[COL_IDIOM_SWE] || e[COL_IDIOM_SWE].trim() === '');

console.log('=== إحصائيات التعبيرات للظروف (Adverb) ===');
console.log('إجمالي الظروف:', allAdverbs.length);
console.log('مع تعبيرات:', withIdiom.length);
console.log('بدون تعبيرات:', withoutIdiom.length);

if (withoutIdiom.length > 0 && withoutIdiom.length <= 30) {
    console.log('\n=== الظروف بدون تعبيرات ===');
    withoutIdiom.forEach((e, i) => {
        console.log(`${i + 1}. ${e[COL_SWE]}`);
    });
} else if (withoutIdiom.length > 30) {
    console.log('\n=== أول 30 ظرف بدون تعبير ===');
    withoutIdiom.slice(0, 30).forEach((e, i) => {
        console.log(`${i + 1}. ${e[COL_SWE]}`);
    });
}
