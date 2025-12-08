// Check all word types for idioms
const fs = require('fs');
const data = fs.readFileSync('./data.js', 'utf-8');
const match = data.match(/const dictionaryData = (\[[\s\S]*?\]);/);
const dict = eval(match[1]);

const COL_TYPE = 1;
const COL_IDIOM_SWE = 9;

// Check each type
const types = ['verb', 'subst', 'adj', 'adverb', 'prep', 'pronomen'];

console.log('=== إحصائيات التعبيرات لكل نوع ===\n');

for (const t of types) {
    const all = dict.filter(e => (e[COL_TYPE] || '').toLowerCase().includes(t));
    const withIdiom = all.filter(e => e[COL_IDIOM_SWE] && e[COL_IDIOM_SWE].trim() !== '');
    const withoutIdiom = all.length - withIdiom.length;

    console.log(`${t.toUpperCase()}:`);
    console.log(`  إجمالي: ${all.length}`);
    console.log(`  مع idiom: ${withIdiom.length}`);
    console.log(`  بدون idiom: ${withoutIdiom}`);
    console.log('');
}
