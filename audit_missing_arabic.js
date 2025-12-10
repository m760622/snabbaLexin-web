const fs = require('fs');

const dataContent = fs.readFileSync('./data.js', 'utf-8');
let dictionaryData;
try {
    dictionaryData = JSON.parse(dataContent.replace('const dictionaryData = ', '').replace(/;$/, ''));
} catch (e) {
    const match = dataContent.match(/(?:const|var|let)\s+dictionaryData\s*=\s*(\[[\s\S]*?\]);/);
    dictionaryData = eval(match[1]);
}

const COL_TYPE = 1;
const COL_ARB_DEF = 5;

const missingCounts = {};

dictionaryData.forEach(entry => {
    const type = (entry[COL_TYPE] || '').trim();
    const arabicDef = entry[COL_ARB_DEF] || '';

    if (!arabicDef.trim() && type) {
        missingCounts[type] = (missingCounts[type] || 0) + 1;
    }
});

console.log('\n📊 Missing Arabic Definitions by Category:\n');
const sorted = Object.entries(missingCounts).sort((a, b) => b[1] - a[1]);

sorted.forEach(([cat, count]) => {
    console.log(`${cat}: ${count}`);
});

if (sorted.length === 0) {
    console.log('✅ All categories have Arabic definitions!');
}
