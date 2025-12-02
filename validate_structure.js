const fs = require('fs');

// Read and parse the file
const content = fs.readFileSync('generate_advanced_levels.js', 'utf8');
const startIdx = content.indexOf('const ADVANCED_THEMES = {');
const endIdx = content.indexOf('};', startIdx) + 2;
const themesStr = content.substring(startIdx, endIdx);

// Execute to get the object
eval(themesStr);

console.log('=== STRUCTURAL VALIDATION ===\n');

const issues = [];

for (let ch = 1; ch <= 10; ch++) {
    console.log(`Chapter ${ch}:`);
    const levels = ADVANCED_THEMES[ch];

    levels.forEach((level, idx) => {
        const levelNum = idx + 1;
        const mainWord = level.main;
        const targets = level.targets;
        const mainLen = mainWord.length;
        const targetCount = targets.length;

        // Expected counts based on structure rules
        let expectedCount, expectedMinLen, expectedMaxLen;
        if (levelNum <= 3) {
            expectedCount = 2;
            expectedMinLen = 3;
            expectedMaxLen = 4;
        } else if (levelNum <= 6) {
            expectedCount = 3;
            expectedMinLen = 4;
            expectedMaxLen = 5;
        } else if (levelNum <= 9) {
            expectedCount = 4;
            expectedMinLen = 5;
            expectedMaxLen = 6;
        } else {
            expectedCount = 5;
            expectedMinLen = 4;
            expectedMaxLen = 7;
        }

        const problems = [];
        if (targetCount !== expectedCount) {
            problems.push(`Count: ${targetCount}≠${expectedCount}`);
            issues.push(`Ch${ch}-L${levelNum} ${mainWord}: Wrong count ${targetCount} (expected ${expectedCount})`);
        }
        if (mainLen < expectedMinLen || mainLen > expectedMaxLen) {
            problems.push(`Len: ${mainLen}∉[${expectedMinLen},${expectedMaxLen}]`);
            issues.push(`Ch${ch}-L${levelNum} ${mainWord}: Wrong length ${mainLen} (expected ${expectedMinLen}-${expectedMaxLen})`);
        }

        if (problems.length > 0) {
            console.log(`  L${levelNum} ${mainWord}: ❌ ${problems.join(', ')}`);
        } else {
            console.log(`  L${levelNum} ${mainWord}: ✅`);
        }
    });
    console.log('');
}

console.log('\n=== SUMMARY ===');
if (issues.length === 0) {
    console.log('✅ ALL LEVELS PASS STRUCTURAL VALIDATION!');
} else {
    console.log(`❌ Found ${issues.length} issues:\n`);
    issues.forEach(issue => console.log(`  - ${issue}`));
}
