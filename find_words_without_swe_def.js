/**
 * Find words without Swedish definition
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

const missingSweDef = [];

dictionaryData.forEach((entry, index) => {
    const sweDef = entry[COL_SWE_DEF] || '';

    if (!sweDef.trim()) {
        missingSweDef.push({
            index,
            word: entry[COL_SWE],
            arabic: entry[COL_ARB],
            type: entry[COL_TYPE],
            arabicDef: entry[COL_ARB_DEF] || ''
        });
    }
});

console.log(`\n📊 كلمات بدون تعريف سويدي: ${missingSweDef.length}\n`);

missingSweDef.forEach((item, i) => {
    console.log(`${i + 1}. [${item.type}] ${item.word} (${item.arabic})`);
    if (item.arabicDef) {
        console.log(`   التعريف العربي: ${item.arabicDef}`);
    }
    console.log('');
});

// Save for reference
fs.writeFileSync('./words_without_swe_def.json', JSON.stringify(missingSweDef, null, 2));
console.log('✅ Saved to words_without_swe_def.json');
