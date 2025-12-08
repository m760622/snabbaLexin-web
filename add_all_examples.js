// Add examples to all words without them
const fs = require('fs');
const dataContent = fs.readFileSync('./data.js', 'utf-8');
const match = dataContent.match(/const dictionaryData = (\[[\s\S]*?\]);/);
let dictionaryData = eval(match[1]);

const COL_ID = 0;
const COL_TYPE = 1;
const COL_SWE = 2;
const COL_ARB = 3;
const COL_EX_SWE = 7;
const COL_EX_ARB = 8;

console.log('بدء إضافة الأمثلة...');

let count = 0;
for (let i = 0; i < dictionaryData.length; i++) {
    const hasEx = dictionaryData[i][COL_EX_SWE] && dictionaryData[i][COL_EX_SWE].trim() !== '';

    if (!hasEx) {
        const word = dictionaryData[i][COL_SWE];
        const arb = dictionaryData[i][COL_ARB];
        const type = (dictionaryData[i][COL_TYPE] || '').toLowerCase();

        // Ensure array has enough elements
        while (dictionaryData[i].length < 9) {
            dictionaryData[i].push('');
        }

        let exSwe = '', exArb = '';

        // Generate example based on type
        if (type.includes('verb') && !type.includes('adverb')) {
            exSwe = `Jag brukar ${word.toLowerCase()}.`;
            exArb = `أنا عادةً ${arb}.`;
        } else if (type.includes('adj')) {
            exSwe = `Det är ${word.toLowerCase()}.`;
            exArb = `إنه ${arb}.`;
        } else if (type.includes('adverb') || type.includes('adv')) {
            exSwe = `Han gör det ${word.toLowerCase()}.`;
            exArb = `هو يفعل ذلك ${arb}.`;
        } else if (type.includes('subst') || type.includes('medicin') || type.includes('bygg') ||
            type.includes('juridik') || type.includes('samhälle') || type.includes('militär') ||
            type.includes('religion') || type.includes('tandvård') || type.includes('migration')) {
            exSwe = `${word} är viktigt.`;
            exArb = `${arb} مهم.`;
        } else if (type.includes('prep')) {
            exSwe = `Boken ligger ${word.toLowerCase()} bordet.`;
            exArb = `الكتاب ${arb} الطاولة.`;
        } else if (type.includes('pronomen')) {
            exSwe = `${word} är här.`;
            exArb = `${arb} هنا.`;
        } else if (type.includes('konj')) {
            exSwe = `Jag kommer ${word.toLowerCase()} du vill.`;
            exArb = `سآتي ${arb} تريد.`;
        } else if (type.includes('interjektion')) {
            exSwe = `${word}! sa han.`;
            exArb = `${arb}! قال.`;
        } else {
            // Default for unknown types
            exSwe = `${word} används ofta.`;
            exArb = `${arb} يُستخدم كثيراً.`;
        }

        dictionaryData[i][COL_EX_SWE] = exSwe;
        dictionaryData[i][COL_EX_ARB] = exArb;
        count++;

        if (count % 5000 === 0) {
            console.log(`تم إضافة ${count} مثال...`);
        }
    }
}

console.log(`\n✅ تم إضافة ${count} مثال`);

// Save
console.log('جاري الحفظ...');
const newContent = dataContent.replace(
    /const dictionaryData = \[[\s\S]*?\];/,
    'const dictionaryData = ' + JSON.stringify(dictionaryData, null, 4) + ';'
);
fs.writeFileSync('./data.js', newContent, 'utf-8');

// Verify
const remaining = dictionaryData.filter(e => !e[COL_EX_SWE] || e[COL_EX_SWE].trim() === '').length;
console.log(`📊 المتبقي بدون أمثلة: ${remaining}`);
