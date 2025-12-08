// Check ALL words without examples
const fs = require('fs');
const data = fs.readFileSync('./data.js', 'utf-8');
const match = data.match(/const dictionaryData = (\[[\s\S]*?\]);/);
const dict = eval(match[1]);

const COL_TYPE = 1;
const COL_SWE = 2;
const COL_EX_SWE = 7;

// Find all words without examples
const withoutEx = dict.filter(e => !e[COL_EX_SWE] || e[COL_EX_SWE].trim() === '');
const withEx = dict.filter(e => e[COL_EX_SWE] && e[COL_EX_SWE].trim() !== '');

console.log('=== إحصائيات الأمثلة لجميع الكلمات ===');
console.log('إجمالي الكلمات:', dict.length);
console.log('مع أمثلة:', withEx.length);
console.log('بدون أمثلة:', withoutEx.length);

if (withoutEx.length > 0) {
    // Group by type
    const byType = {};
    withoutEx.forEach(e => {
        const type = e[COL_TYPE] || 'Unknown';
        if (!byType[type]) byType[type] = [];
        byType[type].push(e[COL_SWE]);
    });

    console.log('\n=== الكلمات بدون أمثلة حسب النوع ===');
    for (const [type, words] of Object.entries(byType).sort((a, b) => b[1].length - a[1].length)) {
        console.log(`${type}: ${words.length}`);
    }
}
