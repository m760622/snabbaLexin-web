const fs = require('fs');

// Read data.js
let dataContent = fs.readFileSync('./data.js', 'utf-8');

// Parse
let dictionaryData;
if (dataContent.includes('const dictionaryData =')) {
    const match = dataContent.match(/(?:const|var|let)\s+dictionaryData\s*=\s*(\[[\s\S]*?\]);/);
    dictionaryData = eval(match[1]);
} else {
    dictionaryData = JSON.parse(dataContent.replace('const dictionaryData = ', '').replace(/;$/, ''));
}

const CATEGORY = "Substantiv.";
const PLACEHOLDER_PATTERN = /används ofta/i;

let stats = {
    total: 0,
    missing: 0,
    placeholder: 0,
    short: 0, // < 5 chars essentially tautology
    good: 0
};

let samples = [];

console.log("Auditing Substantiv Examples...\n");

dictionaryData.forEach(e => {
    if (e[1] && e[1].trim() === CATEGORY) {
        stats.total++;
        const word = e[2];
        const exSwe = e[6] || "";
        const exArb = e[7] || "";
        const cleanEx = exSwe.toLowerCase().replace(/[.,!?-]/g, '').trim();
        const cleanWord = word.toLowerCase().trim();

        if (!exSwe || exSwe.trim() === "") {
            stats.missing++;
        } else if (PLACEHOLDER_PATTERN.test(exSwe) || PLACEHOLDER_PATTERN.test(exArb)) {
            stats.placeholder++;
            if (samples.length < 20) samples.push({ word, reason: "PLACEHOLDER", ex: exSwe });
        } else if (exSwe.length < 5 || cleanEx === cleanWord) {
            stats.short++; // Tautology check
            if (samples.length < 20) samples.push({ word, reason: "TAUTOLOGY", ex: exSwe });
        } else {
            stats.good++;
        }
    }
});

console.log("--- Statistics ---");
console.log(`Total Nouns: ${stats.total}`);
console.log(`✅ Good Examples: ${stats.good}`);
console.log(`❌ Placeholder ("används ofta"): ${stats.placeholder}`);
console.log(`❌ Missing Examples: ${stats.missing}`);
console.log(`⚠️ Tautology/Short: ${stats.short}`);

if (samples.length > 0) {
    console.log("\n--- Issues Samples ---");
    samples.forEach(s => console.log(`[${s.reason}] ${s.word}: "${s.ex}"`));
}
