const fs = require('fs');
const path = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/wordConnectData.js';

try {
    const content = fs.readFileSync(path, 'utf8');

    // Remove the original const declarations from the content
    let cleanContent = content
        .replace(/const WC_PREDEFINED_LEVELS =/g, 'WC_PREDEFINED_LEVELS =')
        .replace(/const WC_DICTIONARY =/g, 'WC_DICTIONARY =')
        .replace(/const WC_ROOT_WORDS =/g, 'WC_ROOT_WORDS =');

    let modifiedContent = `
        var WC_PREDEFINED_LEVELS = {};
        var WC_DICTIONARY = [];
        var WC_ROOT_WORDS = [];
        ${cleanContent}
        sandbox.WC_PREDEFINED_LEVELS = WC_PREDEFINED_LEVELS;
    `;

    const sandbox = {
        WC_PREDEFINED_LEVELS: {},
        WC_DICTIONARY: [],
        WC_ROOT_WORDS: [],
        console: console
    };

    eval(modifiedContent);

    const levels = sandbox.WC_PREDEFINED_LEVELS;
    const issues = [];

    console.log(`Auditing ${Object.keys(levels).length} levels...`);

    for (const [levelId, levelData] of Object.entries(levels)) {
        const words = levelData.words;

        // Check if it's the first level of a chapter (ends with "-1")
        const isFirstLevel = levelId.endsWith("-1");

        // Rule: Only first level can have 1 word. Others must have > 1.
        if (!isFirstLevel && words.length === 1) {
            issues.push({
                level: levelId,
                words: words,
                letters: levelData.letters
            });
        }
    }

    if (issues.length > 0) {
        console.log(`Found ${issues.length} levels with only 1 word (excluding first levels):`);
        issues.forEach(issue => {
            console.log(`- Level ${issue.level}: Words=[${issue.words.join(', ')}] | Wheel=[${issue.letters.join(', ')}]`);
        });
    } else {
        console.log("✅ All non-first levels have more than 1 word.");
    }

} catch (e) {
    console.error("Error running audit:", e);
}
