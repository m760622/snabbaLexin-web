const fs = require('fs');

// Read data.js
let dataContent = fs.readFileSync('./data.js', 'utf-8');

// Parse
let dictionaryData;
let prefix = "";
let suffix = "";

if (dataContent.includes('const dictionaryData =')) {
    prefix = "const dictionaryData = ";
    suffix = ";";
    dictionaryData = JSON.parse(dataContent.replace(prefix, '').replace(/;$/, ''));
} else {
    process.exit(1);
}

const LAZY_PATTERN = /är viktigt/i;
let items = [];

dictionaryData.forEach(e => {
    const word = e[2];

    // Check Index 6 AND 7 for the pattern
    [6, 7].forEach(idx => {
        const exSwe = e[idx] || "";
        // Strict check: Must contain pattern AND be relatively short
        if (LAZY_PATTERN.test(exSwe) && exSwe.length < word.length + 25) {
            items.push({
                id: e[0],
                type: e[1],
                word: word,
                ex: exSwe,
                col: idx
            });
        }
    });
});

console.log(`Found ${items.length} 'viktigt' templates.\n`);

// Group by category
let byCat = {};
items.forEach(i => {
    const t = i.type ? i.type.trim() : "Unknown";
    if (!byCat[t]) byCat[t] = 0;
    byCat[t]++;
});

Object.keys(byCat).sort().forEach(c => console.log(`${c}: ${byCat[c]}`));

// Dump sample for verify
console.log("\n--- JSON Dump (First 20) ---");
console.log(JSON.stringify(items.slice(0, 20), null, 2));

console.log("\n--- JSON Dump (Dentistry Sample) ---");
const dentistry = items.filter(i => i.type === "Tandvård.");
console.log(JSON.stringify(dentistry.slice(0, 10), null, 2));
