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

const TECH_CATS = [
    "Medicin.", "MedicinMR.", "MedicinTB.", "MedicinR.", "MedicinMN.",
    "JuridikS.", "JuridikTB.", "JuridikR.", "JuridikMN.", "Juridik.",
    "Bygg.",
    "Samhälle.", "SamhälleTB.", "SamhälleR.", "SamhälleMN."
];

const PLACEHOLDER_PATTERN = /används ofta/i;

let stats = {};
let badExamples = [];

TECH_CATS.forEach(cat => {
    stats[cat] = { total: 0, missing: 0, placeholder: 0 };
});

console.log("Auditing Technical Categories...\n");

dictionaryData.forEach(e => {
    let type = e[1] ? e[1].trim() : "";
    if (TECH_CATS.includes(type)) {
        stats[type].total++;
        const word = e[2];
        const exSwe = e[6] || "";
        const exArb = e[7] || "";

        if (!exSwe || exSwe.trim() === "") {
            stats[type].missing++;
            if (badExamples.length < 50) badExamples.push({ type, word, reason: "MISSING" });
        } else if (PLACEHOLDER_PATTERN.test(exSwe) || PLACEHOLDER_PATTERN.test(exArb)) {
            stats[type].placeholder++;
            if (badExamples.length < 50) badExamples.push({ type, word, reason: "PLACEHOLDER", ex: exSwe });
        }
    }
});

console.log("--- Statistics ---");
Object.keys(stats).forEach(cat => {
    if (stats[cat].total > 0) {
        console.log(`${cat.padEnd(15)} Total: ${stats[cat].total}, Missing: ${stats[cat].missing}, Bad: ${stats[cat].placeholder}`);
    }
});

if (badExamples.length > 0) {
    console.log("\n--- Sample Issues ---");
    badExamples.slice(0, 20).forEach(s => console.log(`[${s.reason}] (${s.type}) ${s.word}: "${s.ex || ''}"`));
}
