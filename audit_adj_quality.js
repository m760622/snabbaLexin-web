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

const CATEGORY = "Adjektiv.";
const PLACEHOLDER_PATTERN = /används ofta/i;

let badExamples = [];

console.log("Auditing Adjective Examples...\n");

dictionaryData.forEach(e => {
    if (e[1] && e[1].trim() === CATEGORY) {
        const id = e[0];
        const word = e[2];
        const exSwe = e[6] || "";
        const exArb = e[7] || "";

        if (!exSwe || exSwe.trim() === "") {
            if (badExamples.length < 50) badExamples.push({ id, word, reason: "MISSING" });
        } else if (PLACEHOLDER_PATTERN.test(exSwe) || PLACEHOLDER_PATTERN.test(exArb)) {
            if (badExamples.length < 50) badExamples.push({ id, word, reason: "PLACEHOLDER", ex: exSwe });
        }
    }
});

console.log(`Found ${badExamples.length} issues in Adjectives.`);
badExamples.forEach(item => {
    console.log(`[${item.reason}] ${item.word}: "${item.ex || ''}"`);
});
