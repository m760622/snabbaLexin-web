// Fix Bi adverb example
const fs = require('fs');
const dataContent = fs.readFileSync('./data.js', 'utf-8');
const match = dataContent.match(/const dictionaryData = (\[[\s\S]*?\]);/);
let dictionaryData = eval(match[1]);

// Find and fix Bi adverb
for (let i = 0; i < dictionaryData.length; i++) {
    if (dictionaryData[i][0] === 'Lexin003283') {
        console.log('قبل الإصلاح:');
        console.log('  المثال:', dictionaryData[i][7]);

        dictionaryData[i][7] = 'Hon stod mig bi när jag behövde hjälp.';
        dictionaryData[i][8] = 'وقفت بجانبي عندما احتجت للمساعدة.';

        console.log('\nبعد الإصلاح:');
        console.log('  المثال:', dictionaryData[i][7]);
        console.log('  الترجمة:', dictionaryData[i][8]);
    }
}

// Save
const newContent = dataContent.replace(
    /const dictionaryData = \[[\s\S]*?\];/,
    'const dictionaryData = ' + JSON.stringify(dictionaryData, null, 4) + ';'
);
fs.writeFileSync('./data.js', newContent, 'utf-8');

console.log('\n✅ تم إصلاح مثال Bi');
