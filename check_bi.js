// Check Bi entry details
const fs = require('fs');
const data = fs.readFileSync('./data.js', 'utf-8');
const match = data.match(/const dictionaryData = (\[[\s\S]*?\]);/);
const dict = eval(match[1]);

// Find all entries for Bi
const biEntries = dict.filter(e => e[2] === 'Bi' || e[2].toLowerCase() === 'bi');

console.log('=== جميع المدخلات لكلمة Bi ===\n');

biEntries.forEach((e, i) => {
    console.log(`المدخل ${i + 1}:`);
    console.log('  ID:', e[0]);
    console.log('  النوع:', e[1]);
    console.log('  السويدية:', e[2]);
    console.log('  العربية:', e[3]);
    console.log('  المعنى الثاني:', e[4] || '(لا يوجد)');
    console.log('  التعريف:', e[5] || '(لا يوجد)');
    console.log('  الأشكال:', e[6] || '(لا يوجد)');
    console.log('  المثال السويدي:', e[7] || '(لا يوجد)');
    console.log('  المثال العربي:', e[8] || '(لا يوجد)');
    console.log('  التعبير السويدي:', e[9] || '(لا يوجد)');
    console.log('  التعبير العربي:', e[10] || '(لا يوجد)');
    console.log('');
});
