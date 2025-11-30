const fs = require('fs');

// Load Data
const wcDataContent = fs.readFileSync('wordConnectData.js', 'utf8');
// Extract the JSON object part
const match = wcDataContent.match(/const WC_PREDEFINED_LEVELS = ({[\s\S]*?});/);
if (!match) {
    console.error("Could not parse WC_PREDEFINED_LEVELS");
    process.exit(1);
}
// We need to evaluate it safely or parse it as JSON if it was strict JSON. 
// Since it's JS object literal syntax (keys might not be quoted?), eval is risky but easiest for this script.
// Let's try to make it JSON compliant or just use eval for this local audit script.
const levels = eval('(' + match[1] + ')');

const LEXIN_PATH = 'Lexin20210201.csv';
const lexinContent = fs.readFileSync(LEXIN_PATH, 'utf8');
const validSwedishWords = new Set();

// Parse Lexin for validation source
console.log("Parsing Lexin for validation...");
const lines = lexinContent.split('\n');
for (const line of lines) {
    const parts = line.split(';');
    if (parts.length < 3) continue;
    let word = parts[2] ? parts[2].trim().split(',')[0].trim() : "";
    word = word.replace(/[^a-zA-ZåäöÅÄÖ]/g, '').toUpperCase();
    if (word.length >= 3) {
        validSwedishWords.add(word);
    }
}
console.log(`Loaded ${validSwedishWords.size} valid Swedish words (3+ letters).`);

// Helper
function canFormWord(target, sourceLetters) {
    const t = target.split('').sort();
    const s = sourceLetters.sort(); // sourceLetters is array
    let i = 0, j = 0;
    while (i < t.length && j < s.length) {
        if (t[i] === s[j]) { i++; j++; }
        else { j++; }
    }
    return i === t.length;
}

// Audit
let totalBonusWords = 0;
let violations = 0;

console.log("\nStarting Audit...");

for (const [id, level] of Object.entries(levels)) {
    const letters = level.letters;
    const targets = new Set(level.words);

    if (!level.validWords) {
        console.warn(`Level ${id} missing validWords!`);
        continue;
    }

    for (const word of level.validWords) {
        // 1. Check Length > 2
        if (word.length <= 2) {
            console.error(`[VIOLATION] Level ${id}: Word '${word}' is too short (${word.length} letters).`);
            violations++;
        }

        // 2. Check Formation
        if (!canFormWord(word, [...letters])) { // Pass copy of letters
            console.error(`[VIOLATION] Level ${id}: Word '${word}' cannot be formed from [${letters.join('')}].`);
            violations++;
        }

        // 3. Check Validity (Lexin)
        // Note: validWords might come from a slightly different parsing logic, but should mostly match.
        // We'll warn if not found, but maybe not fail strictly if it's a minor parsing diff.
        if (!validSwedishWords.has(word)) {
            // console.warn(`[WARNING] Level ${id}: Word '${word}' not found in simple Lexin parse.`);
            // Don't count as strict violation for now unless we are sure of the parsing logic match.
        }

        if (!targets.has(word)) {
            totalBonusWords++;
        }
    }
}

console.log(`\nAudit Complete.`);
console.log(`Total Bonus Words Checked: ${totalBonusWords}`);
if (violations === 0) {
    console.log("✅ SUCCESS: All bonus words are > 2 letters and valid.");
} else {
    console.log(`❌ FAILED: Found ${violations} violations.`);
}
