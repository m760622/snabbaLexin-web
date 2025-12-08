// Show sample nouns with idioms
const fs = require('fs');
const data = fs.readFileSync('./data.js', 'utf-8');
const match = data.match(/const dictionaryData = (\[[\s\S]*?\]);/);
const dict = eval(match[1]);

const COL_TYPE = 1;
const COL_SWE = 2;
const COL_ARB = 3;
const COL_IDIOM_SWE = 9;
const COL_IDIOM_ARB = 10;

// Find nouns with idioms
const nouns = dict.filter(e => (e[COL_TYPE] || '').toLowerCase().includes('subst') && e[COL_IDIOM_SWE]);

// Get random samples
const samples = [];
const indices = [10, 50, 100, 200, 500, 1000, 2000, 5000, 8000, 10000];
for (const idx of indices) {
    if (nouns[idx]) samples.push(nouns[idx]);
}

console.log('=== 10 أمثلة عشوائية من الأسماء مع idioms ===\n');

samples.forEach((e, i) => {
    console.log(`${i + 1}. ${e[COL_SWE]} (${e[COL_ARB]})`);
    console.log(`   📖 ${e[COL_IDIOM_SWE]}`);
    console.log(`   🇸🇦 ${e[COL_IDIOM_ARB]}`);
    console.log('');
});
