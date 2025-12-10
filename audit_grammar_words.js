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

const CATEGORIES = ["Pronomen.", "Preposition.", "Konjunktion.", "Interjektion."];
const PLACEHOLDER_PATTERN = /används ofta/i;

let issues = {};

CATEGORIES.forEach(cat => issues[cat] = []);

console.log("Auditing Grammar Words...\n");

dictionaryData.forEach(e => {
    let type = e[1] ? e[1].trim() : "";
    if (CATEGORIES.includes(type)) {
        const word = e[2];
        const exSwe = e[6] || "";
        const cleanEx = exSwe.toLowerCase().replace(/[.,!?-]/g, '').trim();
        const cleanWord = word.toLowerCase().trim();

        if (!exSwe || exSwe.trim() === "" || PLACEHOLDER_PATTERN.test(exSwe) || cleanEx === cleanWord || exSwe.length < 4) {
            if (issues[type].length < 20) issues[type].push({ word, reason: "BAD", ex: exSwe });
        }
    }
});

CATEGORIES.forEach(cat => {
    console.log(`\n--- ${cat} (${issues[cat].length} samples) ---`);
    issues[cat].forEach(i => console.log(`"${i.word}": "${i.ex}"`));
});
