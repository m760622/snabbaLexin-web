const fs = require('fs');

// Load generate_advanced_levels.js
const content = fs.readFileSync('generate_advanced_levels.js', 'utf8');
const startIdx = content.indexOf('const ADVANCED_THEMES = {');
const endIdx = content.indexOf('};', startIdx) + 2;
const themesCode = content.substring(startIdx, endIdx);

eval(themesCode);

console.log('=== DETAILED STRUCTURAL VALIDATION ===\n');

const allIssues = [];

for (let ch = 1; ch <= 10; ch++) {
    const levels = ADVANCED_THEMES[ch];
    const chapterIssues = [];

    levels.forEach((level, idx) => {
        const levelNum = idx + 1;
        const mainWord = level.main;
        const targets = level.targets;
        const mainLen = mainWord.length;
        const targetCount = targets.length;

        // Expected values
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

        const issues = [];
        if (targetCount !== expectedCount) {
            issues.push({
                type: 'count',
                actual: targetCount,
                expected: expectedCount
            });
        }
        if (mainLen < expectedMinLen || mainLen > expectedMaxLen) {
            issues.push({
                type: 'length',
                actual: mainLen,
                expected: `${expectedMinLen}-${expectedMaxLen}`
            });
        }

        if (issues.length > 0) {
            chapterIssues.push({
                level: levelNum,
                word: mainWord,
                issues: issues
            });
        }
    });

    if (chapterIssues.length > 0) {
        console.log(`Chapter ${ch}:`);
        chapterIssues.forEach(issue => {
            const problems = issue.issues.map(i => {
                if (i.type === 'count') {
                    return `Count: ${i.actual}≠${i.expected}`;
                } else {
                    return `Length: ${i.actual}∉[${i.expected}]`;
                }
            }).join(', ');
            console.log(`  L${issue.level} ${issue.word}: ❌ ${problems}`);
            allIssues.push(`Ch${ch}-L${issue.level} ${issue.word}: ${problems}`);
        });
        console.log('');
    }
}

console.log('=== SUMMARY ===');
if (allIssues.length === 0) {
    console.log('✅ ALL LEVELS COMPLY WITH STRUCTURE RULES!');
} else {
    console.log(`❌ Found ${allIssues.length} violations\n`);
    console.log('Need to fix these levels:');
    allIssues.forEach((issue, idx) => console.log(`${idx + 1}. ${issue}`));
}
