/**
 * Audit database completeness - check for missing fields
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

// Column indices based on typical structure
const COL_ID = 0;
const COL_TYPE = 1;
const COL_SWE = 2;      // Swedish word
const COL_ARB = 3;      // Arabic translation
const COL_SWE_DEF = 4;  // Swedish definition
const COL_ARB_DEF = 5;  // Arabic definition
const COL_FORMS = 6;    // Word forms
const COL_EX = 7;       // Example
const COL_EX_ARB = 8;   // Arabic example translation
const COL_IDIOM = 9;    // Idiom

const issues = {
    noArabicTranslation: [],
    noArabicDefinition: [],
    noSwedishDefinition: [],
    noExampleTranslation: [],
    noIdiom: []
};

dictionaryData.forEach(entry => {
    const type = (entry[COL_TYPE] || '').trim();
    const sweWord = entry[COL_SWE] || '';
    const arabicTrans = entry[COL_ARB] || '';
    const sweDef = entry[COL_SWE_DEF] || '';
    const arabicDef = entry[COL_ARB_DEF] || '';
    const example = entry[COL_EX] || '';
    const exampleArabic = entry[COL_EX_ARB] || '';
    const idiom = entry[COL_IDIOM] || '';

    // Check for missing Arabic translation
    if (!arabicTrans.trim()) {
        issues.noArabicTranslation.push({ word: sweWord, type });
    }

    // Check for missing Arabic definition
    if (!arabicDef.trim()) {
        issues.noArabicDefinition.push({ word: sweWord, type, sweDef: sweDef.substring(0, 50) });
    }

    // Check for missing Swedish definition
    if (!sweDef.trim()) {
        issues.noSwedishDefinition.push({ word: sweWord, type });
    }

    // Check for example without Arabic translation
    if (example.trim() && !exampleArabic.trim()) {
        issues.noExampleTranslation.push({ word: sweWord, type, example: example.substring(0, 50) });
    }
});

console.log('\n📊 تدقيق اكتمال قاعدة البيانات:\n');
console.log('='.repeat(60));

console.log(`\n❌ كلمات بدون ترجمة عربية: ${issues.noArabicTranslation.length}`);
if (issues.noArabicTranslation.length > 0 && issues.noArabicTranslation.length <= 20) {
    issues.noArabicTranslation.forEach((w, i) => console.log(`   ${i + 1}. [${w.type}] ${w.word}`));
}

console.log(`\n❌ كلمات بدون تعريف عربي: ${issues.noArabicDefinition.length}`);
if (issues.noArabicDefinition.length > 0 && issues.noArabicDefinition.length <= 10) {
    issues.noArabicDefinition.slice(0, 10).forEach((w, i) =>
        console.log(`   ${i + 1}. [${w.type}] ${w.word} - ${w.sweDef}`)
    );
}

console.log(`\n❌ كلمات بدون تعريف سويدي: ${issues.noSwedishDefinition.length}`);

console.log(`\n❌ أمثلة بدون ترجمة عربية: ${issues.noExampleTranslation.length}`);
if (issues.noExampleTranslation.length > 0 && issues.noExampleTranslation.length <= 10) {
    issues.noExampleTranslation.slice(0, 10).forEach((w, i) =>
        console.log(`   ${i + 1}. [${w.type}] ${w.word}: ${w.example}...`)
    );
}

// Summary by type for Arabic definition issues
if (issues.noArabicDefinition.length > 0) {
    console.log('\n\n📈 توزيع الكلمات بدون تعريف عربي حسب النوع:');
    const byType = {};
    issues.noArabicDefinition.forEach(w => {
        byType[w.type] = (byType[w.type] || 0) + 1;
    });
    Object.entries(byType)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 15)
        .forEach(([type, count]) => console.log(`   ${type}: ${count}`));
}

// Save detailed reports
fs.writeFileSync('./audit_no_arabic_def.txt',
    issues.noArabicDefinition.map((w, i) => `${i + 1}. [${w.type}] ${w.word}`).join('\n')
);

fs.writeFileSync('./audit_no_arabic_trans.txt',
    issues.noArabicTranslation.map((w, i) => `${i + 1}. [${w.type}] ${w.word}`).join('\n')
);

console.log('\n\n✅ تم حفظ التقارير التفصيلية');
console.log('   - audit_no_arabic_def.txt');
console.log('   - audit_no_arabic_trans.txt');

// Total entries
console.log(`\n📊 إجمالي الكلمات في القاموس: ${dictionaryData.length}`);
