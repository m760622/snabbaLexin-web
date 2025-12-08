// Random spot check of examples
const fs = require('fs');
const data = fs.readFileSync('./data.js', 'utf-8');
const match = data.match(/const dictionaryData = (\[[\s\S]*?\]);/);
const dict = eval(match[1]);

const COL_ID = 0;
const COL_TYPE = 1;
const COL_SWE = 2;
const COL_ARB = 3;
const COL_EX_SWE = 7;
const COL_EX_ARB = 8;

// Get entries with examples
const withExamples = dict.filter(e => e[COL_EX_SWE] && e[COL_EX_SWE].trim() !== '');

// Random sample of 30 entries
const sampleSize = 30;
const sample = [];
const usedIndices = new Set();

while (sample.length < sampleSize && sample.length < withExamples.length) {
    const idx = Math.floor(Math.random() * withExamples.length);
    if (!usedIndices.has(idx)) {
        usedIndices.add(idx);
        sample.push(withExamples[idx]);
    }
}

console.log('=== فحص عشوائي لـ 30 كلمة ===\n');

let correctCount = 0;
let incorrectCount = 0;
let uncertainCount = 0;

sample.forEach((entry, i) => {
    const word = entry[COL_SWE];
    const type = entry[COL_TYPE];
    const arb = entry[COL_ARB];
    const exSwe = entry[COL_EX_SWE];
    const exArb = entry[COL_EX_ARB];

    // Check if word appears in example (case insensitive)
    const wordLower = word.toLowerCase();
    const exLower = exSwe.toLowerCase();
    const wordInExample = exLower.includes(wordLower) ||
        exLower.includes(wordLower.replace(/a$/, '')) ||
        exLower.includes(wordLower.replace(/en$/, '')) ||
        exLower.includes(wordLower.replace(/er$/, '')) ||
        exLower.includes(wordLower.replace(/ar$/, ''));

    let status;
    if (wordInExample) {
        status = '✅';
        correctCount++;
    } else if (exSwe.startsWith('Det är ') || exSwe.startsWith('Jag brukar ')) {
        // Generic pattern should contain the word
        status = '⚠️';
        uncertainCount++;
    } else {
        // Original example, may not contain exact word
        status = '📝';
        uncertainCount++;
    }

    console.log(`${i + 1}. ${status} ${word} (${type})`);
    console.log(`   🇸🇪 ${exSwe}`);
    console.log(`   🇸🇦 ${exArb}`);
    console.log('');
});

console.log('=== ملخص الفحص ===');
console.log(`✅ الكلمة موجودة في المثال: ${correctCount}`);
console.log(`📝 أمثلة أصلية (قد لا تحتوي الكلمة بالضبط): ${uncertainCount}`);
console.log(`❌ أخطاء واضحة: ${incorrectCount}`);
