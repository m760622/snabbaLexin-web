const fs = require('fs');

// Read data.js
let dataContent = fs.readFileSync('./data.js', 'utf-8');

// Parse
let dictionaryData;
if (dataContent.includes('const dictionaryData =')) {
    const match = dataContent.match(/(?:const|var|let)\s+dictionaryData\s*=\s*(\[[\s\S]*?\]);/);
    if (match) {
        dictionaryData = eval(match[1]);
    } else {
        dictionaryData = JSON.parse(dataContent.replace('const dictionaryData = ', '').replace(/;$/, ''));
    }
}

const CATEGORY = "Adverb.";
let items = [];

dictionaryData.forEach(e => {
    if (e[1] && e[1].trim() === CATEGORY) {
        const word = e[2];
        const exSwe = e[6] || "";
        const exArb = e[7] || "";

        // Tautology check: Example is basically the word itself (case-insensitive, ignoring punctuation)
        const cleanEx = exSwe.toLowerCase().replace(/[.,!?-]/g, '').trim();
        const cleanWord = word.toLowerCase().trim();

        if (!exSwe || exSwe.trim() === "" || cleanEx === cleanWord || exSwe.length < 5) {
            items.push({ id: e[0], word: word, ex: exSwe });
        }
    }
});

console.log(`Found ${items.length} tautological/missing Adverb examples.\n`);
items.forEach(i => {
    console.log(`"${i.word}": { swe: "", arb: "" }, // Old: "${i.ex}"`);
});
