/**
 * Find words without examples for all word types
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

// Column indices
const COL_TYPE = 1;
const COL_SWE = 2;
const COL_ARB = 3;
const COL_EX = 7;

// Count words by type
const stats = {};
const wordsWithoutExamples = {};

dictionaryData.forEach(entry => {
    const type = (entry[COL_TYPE] || '').trim();
    const hasExample = entry[COL_EX] && entry[COL_EX].trim() !== '';

    if (!stats[type]) {
        stats[type] = { total: 0, withExample: 0, withoutExample: 0 };
        wordsWithoutExamples[type] = [];
    }

    stats[type].total++;
    if (hasExample) {
        stats[type].withExample++;
    } else {
        stats[type].withoutExample++;
        wordsWithoutExamples[type].push({
            word: entry[COL_SWE],
            arabic: entry[COL_ARB] || ''
        });
    }
});

console.log('\n📊 إحصائيات الكلمات حسب النوع:\n');
console.log('النوع'.padEnd(20) + 'الإجمالي'.padEnd(12) + 'مع أمثلة'.padEnd(12) + 'بدون أمثلة');
console.log('-'.repeat(60));

// Sort by number without examples
const sortedTypes = Object.entries(stats)
    .sort((a, b) => b[1].withoutExample - a[1].withoutExample);

sortedTypes.forEach(([type, data]) => {
    const percent = ((data.withExample / data.total) * 100).toFixed(1);
    console.log(
        type.padEnd(20) +
        String(data.total).padEnd(12) +
        String(data.withExample).padEnd(12) +
        String(data.withoutExample) + ` (${percent}% complete)`
    );
});

// Show top 100 words without examples for types that have missing examples
console.log('\n\n🔍 أهم 100 كلمة بدون أمثلة (من جميع الأنواع):\n');

// Combine all words without examples and score them
const allWordsWithoutExamples = [];
Object.entries(wordsWithoutExamples).forEach(([type, words]) => {
    words.forEach(w => {
        let score = 100;
        score -= w.word.length * 2;
        if (w.word.includes('-')) score -= 20;
        // Prioritize common word types
        if (type === 'Verb') score += 30;
        if (type === 'Substantiv') score += 25;
        if (type === 'Adjektiv') score += 20;
        if (type === 'Adverb') score += 15;

        allWordsWithoutExamples.push({
            ...w,
            type,
            score
        });
    });
});

// Sort by score and take top 100
const top100 = allWordsWithoutExamples
    .sort((a, b) => b.score - a.score)
    .slice(0, 100);

top100.forEach((v, i) => {
    console.log(`${i + 1}. [${v.type}] ${v.word} - ${v.arabic.substring(0, 40)}`);
});

console.log('\n📊 إجمالي الكلمات بدون أمثلة:', allWordsWithoutExamples.length);

// Save to file
fs.writeFileSync('./top100_words_without_examples.txt',
    top100.map((v, i) => `${i + 1}. [${v.type}] ${v.word} - ${v.arabic}`).join('\n')
);
console.log('\n✅ Saved to top100_words_without_examples.txt');
