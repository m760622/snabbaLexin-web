/**
 * Find words without Arabic definition by category
 */

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
const COL_SWE = 2;
const COL_ARB = 3;
const COL_SWE_DEF = 4;
const COL_ARB_DEF = 5;

// Get category from command line argument
const category = process.argv[2] || 'Samhälle.';

const wordsWithoutArabicDef = [];

dictionaryData.forEach((entry, index) => {
    const type = (entry[COL_TYPE] || '').trim();
    const arabicDef = entry[COL_ARB_DEF] || '';

    if (type === category && !arabicDef.trim()) {
        wordsWithoutArabicDef.push({
            index,
            word: entry[COL_SWE],
            arabic: entry[COL_ARB],
            sweDef: entry[COL_SWE_DEF] || ''
        });
    }
});

console.log(`\n📊 ${category} بدون تعريف عربي: ${wordsWithoutArabicDef.length}\n`);

// Show first 100
console.log('أول 100 كلمة:\n');
wordsWithoutArabicDef.slice(0, 100).forEach((item, i) => {
    console.log(`${i + 1}. ${item.word} (${item.arabic})`);
});

// Save for reference
fs.writeFileSync(`./${category.replace('.', '')}_without_arabic_def.json`, JSON.stringify(wordsWithoutArabicDef, null, 2));
console.log(`\n✅ Saved to ${category.replace('.', '')}_without_arabic_def.json`);
