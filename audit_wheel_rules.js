const fs = require('fs');

// Load Data
const wcDataContent = fs.readFileSync('wordConnectData.js', 'utf8');
const match = wcDataContent.match(/const WC_PREDEFINED_LEVELS = ({[\s\S]*?});/);
if (!match) {
    console.error("Could not parse WC_PREDEFINED_LEVELS");
    process.exit(1);
}
const levels = eval('(' + match[1] + ')');

let violations = 0;
let totalLevels = 0;

console.log("Starting Wheel Rules Audit...");

for (const [id, level] of Object.entries(levels)) {
    totalLevels++;
    const wheelSize = level.letters.length;

    // Find longest target word
    let maxWordLen = 0;
    let longestWord = "";
    for (const word of level.words) {
        if (word.length > maxWordLen) {
            maxWordLen = word.length;
            longestWord = word;
        }
    }

    // Rule 1: No word > wheel size (Implicitly checked by maxWordLen <= wheelSize logic below, but good to be explicit)
    if (maxWordLen > wheelSize) {
        console.error(`[VIOLATION] Level ${id}: Word '${longestWord}' (${maxWordLen}) is longer than wheel (${wheelSize}).`);
        violations++;
    }

    // Rule 2: Wheel size cannot be > longest word
    // This implies wheelSize === maxWordLen
    if (wheelSize > maxWordLen) {
        console.error(`[VIOLATION] Level ${id}: Wheel size (${wheelSize}) > Longest word '${longestWord}' (${maxWordLen}).`);
        violations++;
    }
}

console.log(`\nAudit Complete.`);
console.log(`Checked ${totalLevels} levels.`);
if (violations === 0) {
    console.log("✅ SUCCESS: All levels satisfy wheel size rules.");
} else {
    console.log(`❌ FAILED: Found ${violations} violations.`);
}
