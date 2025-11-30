const fs = require('fs');

const DATA_FILE = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/wordConnectData.js';

function auditStructure() {
    const content = fs.readFileSync(DATA_FILE, 'utf8');

    // Extract WC_PREDEFINED_LEVELS
    const match = content.match(/const WC_PREDEFINED_LEVELS = (\{[\s\S]*?\});/);
    if (!match) {
        console.error("Could not find WC_PREDEFINED_LEVELS");
        return;
    }

    // Evaluate the object (safe here)
    const levels = eval('(' + match[1] + ')');

    const issues = [];

    for (let chapter = 1; chapter <= 10; chapter++) {
        for (let level = 1; level <= 10; level++) {
            const levelId = `${chapter}-${level}`;
            const levelData = levels[levelId];

            if (!levelData) {
                issues.push(`Missing level ${levelId}`);
                continue;
            }

            const words = levelData.words;
            const lengths = words.map(w => w.length);
            const minLen = Math.min(...lengths);
            const maxLen = Math.max(...lengths);

            // Define rules
            let expectedCount, expectedMin, expectedMax;

            if (level <= 3) {
                expectedCount = 2;
                expectedMin = 3;
                expectedMax = 4;
            } else if (level <= 6) {
                expectedCount = 3;
                expectedMin = 4;
                expectedMax = 5;
            } else if (level <= 9) {
                expectedCount = 4;
                expectedMin = 5;
                expectedMax = 6;
            } else { // Level 10
                expectedCount = 5;
                expectedMin = 4;
                expectedMax = 7;
            }

            // Check Word Count
            if (words.length !== expectedCount) {
                issues.push(`[${levelId}] Word count mismatch. Expected ${expectedCount}, got ${words.length}`);
            }

            // Check Lengths
            // Rule: "shortest X letters, longest Y letters"
            // This usually means we MUST have at least one word of shortest length, and one of longest.
            // And NO words outside this range.

            if (minLen < expectedMin) {
                issues.push(`[${levelId}] Found word shorter than ${expectedMin} letters (found ${minLen})`);
            }
            if (maxLen > expectedMax) {
                issues.push(`[${levelId}] Found word longer than ${expectedMax} letters (found ${maxLen})`);
            }

            // Check if we actually hit the bounds (optional but good for difficulty)
            // "shortest 3 letters" implies there IS a 3-letter word.
            // My generator enforced this (hasMin, hasMax).
            if (minLen > expectedMin) {
                issues.push(`[${levelId}] Missing shortest word length ${expectedMin} (min found ${minLen})`);
            }
            if (maxLen < expectedMax) {
                issues.push(`[${levelId}] Missing longest word length ${expectedMax} (max found ${maxLen})`);
            }
        }
    }

    if (issues.length === 0) {
        console.log("✅ All 100 levels pass strict structure audit.");
    } else {
        console.log(`❌ Found ${issues.length} structure issues:`);
        issues.forEach(i => console.log(i));
    }
}

auditStructure();
