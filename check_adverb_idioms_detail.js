// Check adverbs with idioms/proverbs (Ordspråk)
const fs = require('fs');
const data = fs.readFileSync('./data.js', 'utf-8');
const match = data.match(/const dictionaryData = (\[[\s\S]*?\]);/);
const dict = eval(match[1]);

const COL_TYPE = 1;
const COL_SWE = 2;
const COL_ARB = 3;
const COL_IDIOM_SWE = 9;
const COL_IDIOM_ARB = 10;

// Find all adverbs
const allAdverbs = dict.filter(e => (e[COL_TYPE] || '').toLowerCase().includes('adverb'));
const withIdiom = allAdverbs.filter(e => e[COL_IDIOM_SWE] && e[COL_IDIOM_SWE].trim() !== '');
const withoutIdiom = allAdverbs.filter(e => !e[COL_IDIOM_SWE] || e[COL_IDIOM_SWE].trim() === '');

console.log('=== إحصائيات التعبيرات/الأمثال للظروف (Adverb) ===');
console.log('إجمالي الظروف:', allAdverbs.length);
console.log('مع تعبير/مثل:', withIdiom.length);
console.log('بدون تعبير/مثل:', withoutIdiom.length);

console.log('\n=== أمثلة من الظروف مع تعبيرات ===');
withIdiom.slice(0, 15).forEach((e, i) => {
    console.log(`${i + 1}. ${e[COL_SWE]} (${e[COL_ARB]})`);
    console.log(`   📖 ${e[COL_IDIOM_SWE]}`);
    console.log(`   🇸🇦 ${e[COL_IDIOM_ARB]}`);
    console.log('');
});
