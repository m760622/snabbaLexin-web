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

let stats = {
    total: 0,
    tautology: 0,
    short: 0,
    missing: 0
};

let samples = [];

console.log("Auditing Multi-word Expressions (Phrases)...\n");

dictionaryData.forEach(e => {
    const word = e[2] ? e[2].trim() : "";
    const type = e[1] ? e[1].trim() : "";
    const exSwe = e[6] || "";

    // Definition of an "Expression": Word contains a space AND isn't just a compound noun written with space (though Swedish usually compounds).
    // Actually, any multi-word headword is interesting.
    if (word.includes(" ")) {
        stats.total++;

        const cleanEx = exSwe.toLowerCase().replace(/[.,!?-]/g, '').trim();
        const cleanWord = word.toLowerCase().trim();

        if (!exSwe || exSwe.trim() === "") {
            stats.missing++;
            if (samples.length < 50) samples.push({ word, type, reason: "MISSING" });
        } else if (cleanEx === cleanWord || exSwe.length < word.length + 5) { // Tautology or near-tautology
            stats.tautology++;
            if (samples.length < 50) samples.push({ word, type, reason: "TAUTOLOGY", ex: exSwe });
        }
    }
});

console.log(`Total Multi-word Entries: ${stats.total}`);
console.log(`Missing Examples: ${stats.missing}`);
console.log(`Tautologies/Weak: ${stats.tautology}`);

console.log("\n--- Samples ---");
samples.forEach(s => console.log(`[${s.reason}] (${s.type}) ${s.word}: "${s.ex || ''}"`));
