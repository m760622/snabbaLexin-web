// Comprehensive scan and fix of all mismatched examples
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

console.log('=== فحص شامل للأمثلة غير المتطابقة ===\n');

let mismatchCount = 0;
let fixCount = 0;
const mismatches = [];

for (let i = 0; i < dictionaryData.length; i++) {
    const word = dictionaryData[i][COL_SWE];
    const type = (dictionaryData[i][COL_TYPE] || '').toLowerCase();
    const arb = dictionaryData[i][COL_ARB];
    const example = dictionaryData[i][COL_EX_SWE] || '';

    if (!example || example.trim() === '') continue;

    // Check if word appears in example (case insensitive, with variations)
    const wordLower = word.toLowerCase();
    const exampleLower = example.toLowerCase();

    // Check various forms
    const wordInExample = exampleLower.includes(wordLower) ||
        exampleLower.includes(wordLower.replace(/a$/, '')) ||
        exampleLower.includes(wordLower.replace(/ar$/, '')) ||
        exampleLower.includes(wordLower.replace(/er$/, '')) ||
        exampleLower.includes(wordLower.replace(/or$/, '')) ||
        exampleLower.includes(wordLower.replace(/en$/, '')) ||
        exampleLower.includes(wordLower.replace(/et$/, '')) ||
        exampleLower.includes(wordLower.replace(/na$/, '')) ||
        exampleLower.includes(wordLower.replace(/t$/, '')) ||
        exampleLower.includes(wordLower.replace(/d$/, '')) ||
        exampleLower.includes(wordLower.replace(/de$/, '')) ||
        exampleLower.includes(wordLower.replace(/s$/, ''));

    if (!wordInExample) {
        mismatchCount++;
        mismatches.push({
            index: i,
            word: word,
            type: type,
            arb: arb,
            example: example
        });

        // Generate correct example based on type
        let newSwe, newArb;

        if (type.includes('verb')) {
            newSwe = `Jag brukar ${word.toLowerCase()}.`;
            newArb = `أنا عادةً ${arb}.`;
        } else if (type.includes('adj')) {
            newSwe = `Det är ${word.toLowerCase()}.`;
            newArb = `إنه ${arb}.`;
        } else if (type.includes('adverb')) {
            newSwe = `Han gör det ${word.toLowerCase()}.`;
            newArb = `هو يفعل ذلك ${arb}.`;
        } else if (type.includes('subst')) {
            newSwe = `${word} är viktigt.`;
            newArb = `${arb} مهم.`;
        } else if (type.includes('pronomen')) {
            newSwe = `${word} är det.`;
            newArb = `${arb} هو ذلك.`;
        } else {
            newSwe = `${word} används ofta.`;
            newArb = `${arb} يُستخدم غالباً.`;
        }

        dictionaryData[i][COL_EX_SWE] = newSwe;
        dictionaryData[i][COL_EX_ARB] = newArb;
        fixCount++;
    }
}

console.log(`إجمالي الأمثلة غير المتطابقة: ${mismatchCount}`);
console.log(`تم إصلاح: ${fixCount}`);

if (mismatches.length > 0) {
    console.log('\n=== أمثلة من المشاكل التي تم إصلاحها (أول 20) ===');
    mismatches.slice(0, 20).forEach((m, i) => {
        console.log(`${i + 1}. ${m.word} (${m.type})`);
        console.log(`   المثال القديم: ${m.example.substring(0, 50)}...`);
    });
}

// Save
const newContent = dataContent.replace(
    /const dictionaryData = \[[\s\S]*?\];/,
    'const dictionaryData = ' + JSON.stringify(dictionaryData, null, 4) + ';'
);
fs.writeFileSync('./data.js', newContent, 'utf-8');

console.log('\n✅ تم حفظ الإصلاحات');
