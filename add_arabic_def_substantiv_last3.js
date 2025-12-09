/**
 * Add Arabic definitions for last 3 Substantiv words
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
const COL_ARB_DEF = 5;

// Arabic definitions for last 3 words
const arabicDefinitions = {
    "Avslut": "إنهاء وختام شيء ما، نهاية عملية أو مشروع",
    "Antiseptika": "مواد كيميائية تُستخدم لقتل الجراثيم والميكروبات",
    "Altruism": "الإيثار وتفضيل مصلحة الآخرين على مصلحة النفس"
};

let updatedCount = 0;

dictionaryData.forEach((entry) => {
    const type = (entry[COL_TYPE] || '').trim();
    const word = entry[COL_SWE];
    const currentDef = entry[COL_ARB_DEF] || '';

    if (type === 'Substantiv.' && !currentDef.trim() && arabicDefinitions[word]) {
        entry[COL_ARB_DEF] = arabicDefinitions[word];
        updatedCount++;
        console.log(`✅ ${word}`);
    }
});

// Write back to data.js
const output = 'const dictionaryData = ' + JSON.stringify(dictionaryData, null, 2) + ';';
fs.writeFileSync('./data.js', output);

console.log(`\n📊 تم تحديث ${updatedCount} كلمة`);
console.log('✅ تم حفظ التغييرات في data.js');
