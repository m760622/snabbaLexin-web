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

// Patterns to check (case insensitive)
const PATTERNS = [
    /är viktigt/i,
    /är bra/i,
    /är dåligt/i,
    /är vanligt/i,
    /är möjligt/i,
    /är förbjudet/i,
    /är tillåtet/i,
    /är svårt/i,
    /är lätt/i,
    /är roligt/i,
    /är tråkigt/i
];

let findings = [];

console.log("Searching for lazy 'X är Y' patterns...\n");

dictionaryData.forEach(e => {
    const word = e[2];
    const exSwe = e[6] || "";

    // Check if example matches any pattern AND is very short (likely just "Word är viktigt")
    if (exSwe.length < 30) {
        for (let p of PATTERNS) {
            if (p.test(exSwe)) {
                findings.push({ word, ex: exSwe, pattern: p.toString() });
                break;
            }
        }
    }
});

console.log(`Found ${findings.length} potential lazy examples.`);
findings.forEach(f => {
    console.log(`"${f.word}": "${f.ex}"`);
});
