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

const LAZY_PATTERN = /är viktigt/i;
let items = [];

dictionaryData.forEach(e => {
    const word = e[2];
    const exSwe = e[6] || "";

    // Specific check for the "[Word] är viktigt." template
    // We trim punctuation and case to match exact template construction if possible
    // or just loose match "är viktigt" if short string.
    if (LAZY_PATTERN.test(exSwe) && exSwe.length < word.length + 15) {
        items.push({ id: e[0], type: e[1], word: word, ex: exSwe });
    }
});

console.log(`Found ${items.length} 'viktigt' templates.\n`);

// Group by category
let byCat = {};
items.forEach(i => {
    const t = i.type ? i.type.trim() : "Unknown";
    if (!byCat[t]) byCat[t] = 0;
    byCat[t]++;
});

Object.keys(byCat).forEach(c => console.log(`${c}: ${byCat[c]}`));

console.log("\n--- JSON Dump ---");
console.log(JSON.stringify(items.slice(0, 50), null, 2)); // Show first 50
