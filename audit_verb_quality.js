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

const CATEGORY = "Verb.";
const PLACEHOLDER_PATTERN = /används ofta/i;

let stats = {
    total: 0,
    placeholder: 0,
    missing: 0,
    short: 0,
    good: 0
};

let badExamples = [];

console.log("Auditing Verb Examples...\n");

dictionaryData.forEach(e => {
    if (e[1] && e[1].trim() === CATEGORY) {
        stats.total++;
        const id = e[0];
        const word = e[2];
        const exSwe = e[6] || "";
        const exArb = e[7] || "";

        if (!exSwe || exSwe.trim() === "") {
            stats.missing++;
            if (badExamples.length < 50) badExamples.push({ id, word, reason: "MISSING" });
        } else if (PLACEHOLDER_PATTERN.test(exSwe) || PLACEHOLDER_PATTERN.test(exArb)) {
            stats.placeholder++;
            if (badExamples.length < 50) badExamples.push({ id, word, reason: "PLACEHOLDER", ex: exSwe });
        } else if (exSwe.length < 15) { // Arbitrary length for "too short"
            stats.short++;
            if (badExamples.length < 50) badExamples.push({ id, word, reason: "SHORT", ex: exSwe });
        } else {
            stats.good++;
        }
    }
});

console.log("--- Statistics ---");
console.log(`Total Verbs: ${stats.total}`);
console.log(`✅ Good Examples: ${stats.good}`);
console.log(`❌ Placeholder ("används ofta"): ${stats.placeholder}`);
console.log(`❌ Missing Examples: ${stats.missing}`);
console.log(`⚠️ Very Short (<15 chars): ${stats.short}`);
console.log("\n--- Sample Issues ---");
badExamples.slice(0, 20).forEach(item => {
    console.log(`[${item.reason}] ${item.word}: "${item.ex || ''}"`);
});
