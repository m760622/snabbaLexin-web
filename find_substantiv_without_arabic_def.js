/**
 * Find Substantiv words without Arabic definition
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

const substantivWithoutArabicDef = [];

dictionaryData.forEach((entry, index) => {
    const type = (entry[COL_TYPE] || '').trim();
    const arabicDef = entry[COL_ARB_DEF] || '';

    if (type === 'Substantiv.' && !arabicDef.trim()) {
        substantivWithoutArabicDef.push({
            index,
            word: entry[COL_SWE],
            arabic: entry[COL_ARB],
            sweDef: entry[COL_SWE_DEF] || ''
        });
    }
});

console.log(`\n📊 أسماء (Substantiv) بدون تعريف عربي: ${substantivWithoutArabicDef.length}\n`);

// Show first 50
console.log('أول 50 كلمة:\n');
substantivWithoutArabicDef.slice(0, 50).forEach((item, i) => {
    console.log(`${i + 1}. ${item.word} (${item.arabic})`);
    console.log(`   التعريف السويدي: ${item.sweDef.substring(0, 60)}...`);
    console.log('');
});

// Save for reference
fs.writeFileSync('./substantiv_without_arabic_def.json', JSON.stringify(substantivWithoutArabicDef, null, 2));
console.log('✅ Saved to substantiv_without_arabic_def.json');
