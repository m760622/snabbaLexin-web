/**
 * FIND RARE WORDS WITHOUT EXAMPLES
 * This script finds words that don't have examples yet
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

// Find entries without examples
const wordsWithoutExamples = {
    verbs: [],
    nouns: [],
    adjectives: [],
    adverbs: [],
    others: []
};

let totalWithExamples = 0;
let totalWithoutExamples = 0;

for (const entry of dictionaryData) {
    const hasExample = entry[7] && entry[7].trim() !== '';
    const wordType = entry[1] || '';
    const swedishWord = entry[2] || '';

    if (hasExample) {
        totalWithExamples++;
    } else {
        totalWithoutExamples++;

        const wordInfo = {
            word: swedishWord,
            type: wordType,
            arabic: entry[3] || ''
        };

        if (wordType.includes('Verb')) {
            wordsWithoutExamples.verbs.push(wordInfo);
        } else if (wordType.includes('Substantiv')) {
            wordsWithoutExamples.nouns.push(wordInfo);
        } else if (wordType.includes('Adjektiv')) {
            wordsWithoutExamples.adjectives.push(wordInfo);
        } else if (wordType.includes('Adverb')) {
            wordsWithoutExamples.adverbs.push(wordInfo);
        } else {
            wordsWithoutExamples.others.push(wordInfo);
        }
    }
}

console.log('═══════════════════════════════════════════════════════════════');
console.log('          WORDS WITHOUT EXAMPLES - ANALYSIS');
console.log('═══════════════════════════════════════════════════════════════\n');

console.log(`📊 Total entries: ${dictionaryData.length}`);
console.log(`✅ With examples: ${totalWithExamples} (${Math.round(totalWithExamples / dictionaryData.length * 100)}%)`);
console.log(`❌ Without examples: ${totalWithoutExamples} (${Math.round(totalWithoutExamples / dictionaryData.length * 100)}%)`);

console.log('\n📋 Breakdown by type:');
console.log(`   Verbs: ${wordsWithoutExamples.verbs.length}`);
console.log(`   Nouns: ${wordsWithoutExamples.nouns.length}`);
console.log(`   Adjectives: ${wordsWithoutExamples.adjectives.length}`);
console.log(`   Adverbs: ${wordsWithoutExamples.adverbs.length}`);
console.log(`   Others: ${wordsWithoutExamples.others.length}`);

// Sample some words for each category
console.log('\n═══════════════════════════════════════════════════════════════');
console.log('          SAMPLE WORDS TO ADD EXAMPLES FOR');
console.log('═══════════════════════════════════════════════════════════════\n');

console.log('🔹 VERBS (sample 30):');
wordsWithoutExamples.verbs.slice(0, 30).forEach(w => {
    console.log(`   "${w.word}|Verb": { exSwe: "", exArb: "" }, // ${w.arabic}`);
});

console.log('\n🔹 NOUNS (sample 30):');
wordsWithoutExamples.nouns.slice(0, 30).forEach(w => {
    console.log(`   "${w.word}|Substantiv": { exSwe: "", exArb: "" }, // ${w.arabic}`);
});

console.log('\n🔹 ADJECTIVES (sample 20):');
wordsWithoutExamples.adjectives.slice(0, 20).forEach(w => {
    console.log(`   "${w.word}|Adjektiv": { exSwe: "", exArb: "" }, // ${w.arabic}`);
});

// Save to JSON for easier processing
const outputData = {
    stats: {
        total: dictionaryData.length,
        withExamples: totalWithExamples,
        withoutExamples: totalWithoutExamples
    },
    wordsWithoutExamples: wordsWithoutExamples
};

fs.writeFileSync('./words_without_examples.json', JSON.stringify(outputData, null, 2));
console.log('\n✅ Full list saved to words_without_examples.json');
