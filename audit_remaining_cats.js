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

const CATS_TO_CHECK = ["Se.", "Militär.", "Religion.", "Ekobrott", "ÖvregaTB."];
const MEDICIN_CAT = "Medicin.";
const PLACEHOLDER_PATTERN = /används ofta/i;

let issues = [];

console.log("Auditing Remaining Categories...\n");

dictionaryData.forEach(e => {
    let type = e[1] ? e[1].trim() : "";
    const word = e[2];
    const exSwe = e[6] || "";

    // 1. Check Medicin specifically for placeholders (as identified before)
    if (type === MEDICIN_CAT) {
        if (PLACEHOLDER_PATTERN.test(exSwe)) {
            issues.push({ type, word, ex: exSwe });
        }
    }
    // 2. Check other niche categories for any suspicious examples
    else if (CATS_TO_CHECK.includes(type)) {
        // For "Se.", usually "Se X". If it's just "Se.", that's bad.
        // For others, check emptiness or placeholder.
        if (!exSwe || exSwe.trim() === "" || PLACEHOLDER_PATTERN.test(exSwe) || exSwe.length < 5) {
            // Filter out valid "Se uppslagsord" references if they occur
            if (type === "Se." && exSwe.toLowerCase().startsWith("se ")) {
                // Likely valid reference
            } else {
                issues.push({ type, word, ex: exSwe });
            }
        }
    }
});

console.log(`Found ${issues.length} issues.`);
issues.forEach(i => console.log(`[${i.type}] ${i.word}: "${i.ex}"`));
