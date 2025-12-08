// Check adjectives with idioms
const fs = require('fs');
const data = fs.readFileSync('./data.js', 'utf-8');
const match = data.match(/const dictionaryData = (\[[\s\S]*?\]);/);
const dict = eval(match[1]);

const COL_TYPE = 1;
const COL_SWE = 2;
const COL_ARB = 3;
const COL_IDIOM_SWE = 9;
const COL_IDIOM_ARB = 10;

// Find all adjectives
const allAdj = dict.filter(e => (e[COL_TYPE] || '').toLowerCase().includes('adj'));
const withIdiom = allAdj.filter(e => e[COL_IDIOM_SWE] && e[COL_IDIOM_SWE].trim() !== '');
const withoutIdiom = allAdj.filter(e => !e[COL_IDIOM_SWE] || e[COL_IDIOM_SWE].trim() === '');

console.log('=== إحصائيات التعبيرات للصفات (Adjektiv) ===');
console.log('إجمالي الصفات:', allAdj.length);
console.log('مع idiom:', withIdiom.length);
console.log('بدون idiom:', withoutIdiom.length);

if (withIdiom.length <= 50) {
    console.log('\n=== الصفات مع idiom ===');
    withIdiom.forEach((e, i) => {
        console.log(`${i + 1}. ${e[COL_SWE]}: ${e[COL_IDIOM_SWE]}`);
    });
} else {
    console.log('\n=== أول 30 صفة مع idiom ===');
    withIdiom.slice(0, 30).forEach((e, i) => {
        console.log(`${i + 1}. ${e[COL_SWE]}: ${e[COL_IDIOM_SWE].substring(0, 60)}...`);
    });
}
