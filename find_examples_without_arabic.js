/**
 * Find and display examples without Arabic translation
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
const COL_EX = 7;
const COL_EX_ARB = 8;

const missingExampleTranslations = [];

dictionaryData.forEach((entry, index) => {
    const example = entry[COL_EX] || '';
    const exampleArabic = entry[COL_EX_ARB] || '';

    if (example.trim() && !exampleArabic.trim()) {
        missingExampleTranslations.push({
            index,
            word: entry[COL_SWE],
            arabic: entry[COL_ARB],
            type: entry[COL_TYPE],
            example: example
        });
    }
});

console.log(`\n📊 أمثلة بدون ترجمة عربية: ${missingExampleTranslations.length}\n`);

missingExampleTranslations.forEach((item, i) => {
    console.log(`${i + 1}. [${item.type}] ${item.word} (${item.arabic})`);
    console.log(`   المثال: ${item.example}`);
    console.log('');
});

// Save for reference
fs.writeFileSync('./examples_without_arabic.json', JSON.stringify(missingExampleTranslations, null, 2));
console.log('✅ Saved to examples_without_arabic.json');
