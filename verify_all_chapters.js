
const fs = require('fs');

const dataFilePath = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/generate_advanced_levels.js';
const fileContent = fs.readFileSync(dataFilePath, 'utf8');

// Extract ADVANCED_THEMES
const themesMatch = fileContent.match(/const ADVANCED_THEMES = ({[\s\S]*?});\s*\/\//) || fileContent.match(/const ADVANCED_THEMES = ({[\s\S]*?});/);

if (!themesMatch) {
    console.error("Could not find ADVANCED_THEMES");
    process.exit(1);
}

let ADVANCED_THEMES;
try {
    eval('ADVANCED_THEMES = ' + themesMatch[1]);
} catch (e) {
    console.error("Error parsing themes:", e);
    process.exit(1);
}

const LEVELS_CONFIG = [
    { count: 2, minLen: 3, maxLen: 4 }, // 1-3
    { count: 2, minLen: 3, maxLen: 4 },
    { count: 2, minLen: 3, maxLen: 4 },
    { count: 3, minLen: 4, maxLen: 5 }, // 4-6
    { count: 3, minLen: 4, maxLen: 5 },
    { count: 3, minLen: 4, maxLen: 5 },
    { count: 4, minLen: 5, maxLen: 6 }, // 7-9
    { count: 4, minLen: 5, maxLen: 6 },
    { count: 4, minLen: 5, maxLen: 6 },
    { count: 5, minLen: 4, maxLen: 7 }  // 10
];

function checkSentenceQuality(data, word) {
    if (!data || !data.s || !data.t) return false;
    if (data.s.split(' ').length < 4) return false;
    const cleanSentence = data.s.toLowerCase().replace(/[.,!?]/g, '');
    return cleanSentence.split(' ').includes(word.toLowerCase());
}

let hasViolations = false;

Object.keys(ADVANCED_THEMES).forEach(chapter => {
    console.log(`\nChecking Chapter ${chapter}...`);
    const levels = ADVANCED_THEMES[chapter];

    levels.forEach((level, index) => {
        const config = LEVELS_CONFIG[index];
        const levelNum = index + 1;
        const mainWord = level.main;
        const targets = level.targets;
        const data = level.data;

        // 1. Word Count
        if (targets.length !== config.count) {
            console.log(`  [VIOLATION] Level ${levelNum}: Target count ${targets.length} != ${config.count}`);
            hasViolations = true;
        }

        // 2. Word Lengths
        let maxTargetLen = 0;
        targets.forEach(t => {
            if (t.length < config.minLen || t.length > config.maxLen) {
                // Special case for Level 10: 4-7 letters.
                // Actually, Level 10 config is min 4, max 7.
                // But wait, my config array says:
                // { count: 5, minLen: 4, maxLen: 7 }
                // So this check covers it.
                console.log(`  [VIOLATION] Level ${levelNum}: Word '${t}' length ${t.length} out of range [${config.minLen}, ${config.maxLen}]`);
                hasViolations = true;
            }
            if (t.length > maxTargetLen) maxTargetLen = t.length;
        });

        // 3. Wheel Rules
        // "Wheel size equals length of longest word required"
        // In my implementation, Main Word IS the wheel.
        // So Main Word length must equal the longest target word in this level.
        if (mainWord.length !== maxTargetLen) {
            console.log(`  [VIOLATION] Level ${levelNum}: Wheel size (Main '${mainWord}' len ${mainWord.length}) != Longest target len ${maxTargetLen}`);
            hasViolations = true;
        }

        // 4. Quality Rules
        // Check Main Word
        if (!checkSentenceQuality(data[mainWord], mainWord)) {
            console.log(`  [VIOLATION] Level ${levelNum}: Main Word '${mainWord}' poor sentence quality`);
            hasViolations = true;
        }
        // Check Targets
        targets.forEach(t => {
            if (!checkSentenceQuality(data[t], t)) {
                console.log(`  [VIOLATION] Level ${levelNum}: Target '${t}' poor sentence quality`);
                hasViolations = true;
            }
        });
    });
});

if (!hasViolations) {
    console.log("\nAll chapters passed verification!");
} else {
    console.log("\nVerification failed with violations.");
}
