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

let byCat = {};
let items = [];

dictionaryData.forEach(e => {
    const word = e[2] ? e[2].trim() : "";
    const type = e[1] ? e[1].trim() : "Unknown";
    const exSwe = e[6] || "";

    if (!exSwe) return;

    const cleanEx = exSwe.toLowerCase().replace(/[.,!?-]/g, '').trim();
    const cleanWord = word.toLowerCase().trim();

    // Tautology check
    if (cleanEx === cleanWord) {
        if (!byCat[type]) byCat[type] = [];
        byCat[type].push(word);
        items.push({ word, type });
    }
});

console.log("--- Tautologies by Category ---");
Object.entries(byCat)
    .sort((a, b) => b[1].length - a[1].length)
    .forEach(([type, list]) => {
        console.log(`${type}: ${list.length}`);
    });

console.log("\n--- Top 30 Adjectives/Verbs ---");
const highValue = items.filter(i => i.type.startsWith("Adjektiv") || i.type.startsWith("Verb"));
highValue.slice(0, 30).forEach(i => console.log(`[${i.type}] ${i.word}`));
