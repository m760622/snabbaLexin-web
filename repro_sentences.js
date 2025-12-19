const fs = require('fs');

// Mock Data Loading (simplified parser for the big file)
// We'll just read the file and extract a chunk to parse, or better, just read known 'bad' lines if we knew them.
// Since data.js is huge, let's just use some hardcoded samples that look like typical dictionary entries.
const dictionaryData = [
    ["", "", "abnorm", "shaz", "", "abnormt, abnorma", "", "", ""],
    ["", "", "katt", "qit", "", "en katt", "", "", ""],
    ["", "", "boll", "kura", "", "en rund boll", "", "", ""],
    ["", "", "gå", "yamshee", "", "att gå", "", "", ""],
    ["", "", "bra", "jayyid", "", "det är bra", "", "", ""], // Circular defs
    ["", "", "bil", "sayyara", "", "fordon", "", "en bil kör", "sayyara taseer"], // Good Def, Bad Ex?
    ["", "", "hus", "bayt", "", "byggnad", "", "jag bor i ett hus", "askun fi bayt"], // Good Ex
    ["", "", "Välkomnar", "yurahhib", "", "säga välkommen till", "", "regeringen välkomnar en debatt om EG", "ترحب الحكومة بمناقشة حول المجموعة الأوروبية"] // Target Case
];

// Paste the CURRENT logic from utils.js here to test it
function generateEducationalSentence(word, translation, exampleSwe, exampleArb, definitionSwe, type) {
    // 1. Smart Example Check
    if (exampleSwe && exampleSwe.split(' ').length >= 5) {
        const lowerEx = exampleSwe.toLowerCase();
        const lowerWord = (word || '').toLowerCase();
        const rootWord = lowerWord.length > 4 ? lowerWord.substring(0, lowerWord.length - 2) : lowerWord;

        if (lowerEx.includes(rootWord)) {
            return { type: 'EXAMPLE', s: exampleSwe, a: exampleArb };
        }
    }

    // 2. Templates using Definition
    let templates = [];
    let cleanDef = definitionSwe ? definitionSwe.replace(/[\.,]$/g, '').trim() : '';
    const cleanType = type ? type.replace(/[\.,]$/g, '').toLowerCase() : 'ord';

    if (cleanDef) {
        const lowerDef = cleanDef.toLowerCase();
        const lowerWord = (word || '').toLowerCase();

        if (lowerDef.startsWith('se ') || lowerDef.startsWith('se även')) cleanDef = '';

        if (cleanDef.includes(',') && lowerDef.includes(lowerWord)) {
            const parts = lowerDef.split(',');
            if (parts[0].trim() === lowerWord) cleanDef = '';
        }

        // AGGRESSIVE Circular Check
        if (cleanDef.length < 30 && lowerDef.includes(lowerWord)) {
            cleanDef = '';
        }

        if (lowerDef === lowerWord || lowerDef.length < 5) cleanDef = '';
    }

    if (cleanDef && cleanDef.length > 5) {
        // Return raw definition
        return {
            type: 'DEF',
            s: cleanDef.charAt(0).toUpperCase() + cleanDef.slice(1) + ".",
            a: translation
        };
    } else {
        // Fallback
        return {
            type: 'TRANS',
            s: "",
            a: translation
        };
    }
}

// Run Test
console.log("--- Testing Sentence Generation ---");
dictionaryData.forEach(row => {
    const word = row[2];
    const trans = row[3];
    const def = row[5];
    const exSwe = row[7];
    const exArb = row[8];

    const result = generateEducationalSentence(word, trans, exSwe, exArb, def, "substantiv");
    console.log(`Word: ${word}`);
    console.log(`Input -> Def: "${def}", Ex: "${exSwe}"`);
    console.log(`Result (${result.type}): S="${result.s}" | A="${result.a}"`);
    console.log("-".repeat(20));
});
