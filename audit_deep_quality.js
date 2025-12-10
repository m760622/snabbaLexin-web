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
    tautology: 0,
    short: 0,
    generic_det: 0,
    generic_han_hon: 0
};

let samples = {
    tautology: [],
    short: [],
    generic_det: [],
    generic_han_hon: []
};

console.log("Deep Quality Audit...\n");

dictionaryData.forEach(e => {
    const word = e[2] ? e[2].trim() : "";
    const exSwe = e[6] || "";

    if (!exSwe) return;

    const cleanEx = exSwe.toLowerCase().replace(/[.,!?-]/g, '').trim();
    const cleanWord = word.toLowerCase().trim();

    // Tautology: Example is just the word
    if (cleanEx === cleanWord) {
        stats.tautology++;
        if (samples.tautology.length < 20) samples.tautology.push(`${word}: "${exSwe}"`);
    }
    // Very Short: < 15 chars (and not tautology)
    else if (exSwe.length < 15) {
        stats.short++;
        if (samples.short.length < 20) samples.short.push(`${word}: "${exSwe}"`);
    }

    // Generic "Det är [word]"
    if (exSwe.toLowerCase().startsWith(`det är ${cleanWord}`)) {
        stats.generic_det++;
        if (samples.generic_det.length < 20) samples.generic_det.push(`${word}: "${exSwe}"`);
    }

    // Generic "Han/Hon är [word]"
    if (exSwe.toLowerCase().startsWith(`han är ${cleanWord}`) || exSwe.toLowerCase().startsWith(`hon är ${cleanWord}`)) {
        stats.generic_han_hon++;
        if (samples.generic_han_hon.length < 20) samples.generic_han_hon.push(`${word}: "${exSwe}"`);
    }
});

console.log("--- Statistics ---");
console.log(`Tautologies (Word == Example): ${stats.tautology}`);
console.log(`Very Short (< 15 char): ${stats.short}`);
console.log(`Generic "Det är [Word]...": ${stats.generic_det}`);
console.log(`Generic "Han/Hon är [Word]...": ${stats.generic_han_hon}`);

console.log("\n--- Tautology Samples ---");
samples.tautology.forEach(s => console.log(s));

console.log("\n--- Short Samples ---");
samples.short.forEach(s => console.log(s));

console.log("\n--- 'Det är...' Samples ---");
samples.generic_det.forEach(s => console.log(s));
