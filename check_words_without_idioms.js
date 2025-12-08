// Check ALL words without idioms
const fs = require('fs');
const data = fs.readFileSync('./data.js', 'utf-8');
const match = data.match(/const dictionaryData = (\[[\s\S]*?\]);/);
const dict = eval(match[1]);

const COL_TYPE = 1;
const COL_SWE = 2;
const COL_IDIOM_SWE = 9;

// Find all words without idioms
const withoutIdiom = dict.filter(e => !e[COL_IDIOM_SWE] || e[COL_IDIOM_SWE].trim() === '');
const withIdiom = dict.filter(e => e[COL_IDIOM_SWE] && e[COL_IDIOM_SWE].trim() !== '');

console.log('=== إحصائيات التعبيرات لجميع الكلمات ===');
console.log('إجمالي الكلمات:', dict.length);
console.log('مع idiom:', withIdiom.length);
console.log('بدون idiom:', withoutIdiom.length);

if (withoutIdiom.length > 0) {
    // Group by type
    const byType = {};
    withoutIdiom.forEach(e => {
        const type = e[COL_TYPE] || 'Unknown';
        if (!byType[type]) byType[type] = [];
        byType[type].push(e[COL_SWE]);
    });

    console.log('\n=== الكلمات بدون idiom حسب النوع ===');
    for (const [type, words] of Object.entries(byType)) {
        console.log(`\n${type}: ${words.length} كلمة`);
        if (words.length <= 10) {
            words.forEach(w => console.log(`  - ${w}`));
        } else {
            words.slice(0, 5).forEach(w => console.log(`  - ${w}`));
            console.log(`  ... و ${words.length - 5} أخرى`);
        }
    }
}
