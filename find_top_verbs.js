/**
 * Find top 100 most common verbs without examples
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

// Find verbs without examples
const verbsWithoutExamples = dictionaryData
    .filter(entry => {
        const type = entry[1] || '';
        const hasExample = entry[7] && entry[7].trim() !== '';
        return type.includes('Verb') && !hasExample;
    })
    .map(entry => ({
        word: entry[2],
        arabic: entry[3] || ''
    }));

// Common/important verbs patterns (shorter words, no rare prefixes)
const scored = verbsWithoutExamples.map(v => {
    let score = 100;
    score -= v.word.length * 2;
    if (v.word.includes('-')) score -= 20;
    if (v.word.toLowerCase().endsWith('erar')) score -= 5;
    if (v.word.toLowerCase().startsWith('av')) score += 5;
    if (v.word.toLowerCase().startsWith('för')) score += 5;
    if (v.word.toLowerCase().startsWith('be')) score += 5;
    if (v.word.toLowerCase().startsWith('upp')) score += 5;
    if (v.word.toLowerCase().startsWith('ut')) score += 5;
    return { ...v, score };
});

// Sort by score and take top 100
const top100 = scored.sort((a, b) => b.score - a.score).slice(0, 100);

console.log('\n🔍 أهم 100 فعل بدون أمثلة:\n');
top100.forEach((v, i) => {
    console.log(`${i + 1}. ${v.word} - ${v.arabic.substring(0, 50)}`);
});

console.log('\n📊 إجمالي الأفعال بدون أمثلة:', verbsWithoutExamples.length);

// Save to file
fs.writeFileSync('./top100_verbs_without_examples.txt',
    top100.map((v, i) => `${i + 1}. ${v.word} - ${v.arabic}`).join('\n')
);
console.log('\n✅ Saved to top100_verbs_without_examples.txt');
