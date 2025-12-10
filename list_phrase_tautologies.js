const fs = require('fs');

// Read data.js
const dataContent = fs.readFileSync('./data.js', 'utf-8');

// Parse
let dictionaryData;
const match = dataContent.match(/(?:const|var|let)\s+dictionaryData\s*=\s*(\[[\s\S]*?\]);/);
dictionaryData = eval(match[1]);

const items = [];
dictionaryData.forEach(e => {
    const word = e[2] ? e[2].trim() : "";
    const type = e[1] ? e[1].trim() : "";
    const exSwe = e[6] || "";

    if (word.includes(" ")) {
        const cleanEx = exSwe.toLowerCase().replace(/[.,!?-]/g, '').trim();
        const cleanWord = word.toLowerCase().trim();
        // Tautology check
        if ((cleanEx === cleanWord || exSwe.length < word.length + 5) && exSwe.length > 0) {
            items.push({ word, type, ex: exSwe });
        }
    }
});

console.log(JSON.stringify(items, null, 2));
