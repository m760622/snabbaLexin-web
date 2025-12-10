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
const COL_EX = 7;
const COL_EX_ARB = 8;
const COL_IDIOM = 9;

const missingCounts = {};

dictionaryData.forEach(entry => {
    const type = (entry[COL_TYPE] || '').trim();
    // Check if both example and idiom are missing. Some words might have idiom but no example.
    // Let's count missing *standard* examples.
    const hasExample = (entry[COL_EX] && entry[COL_EX].trim().length > 0) || (entry[COL_EX_ARB] && entry[COL_EX_ARB].trim().length > 0);

    if (!hasExample && type) {
        missingCounts[type] = (missingCounts[type] || 0) + 1;
    }
});

console.log('\n📊 Words without Example Sentences by Category:\n');
const sorted = Object.entries(missingCounts).sort((a, b) => b[1] - a[1]);

sorted.forEach(([cat, count]) => {
    console.log(`${cat}: ${count}`);
});

if (sorted.length === 0) {
    console.log('✅ All words have examples!');
}
