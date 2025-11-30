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
        const letters = levelData.letters;

        const maxWordLength = Math.max(...words.map(w => w.length));

        // Rule: If max word length is 3, letters array should not be > 3
        if (maxWordLength === 3 && letters.length > 3) {
            issues.push({
                level: levelId,
                words: words,
                letters: letters,
                letterCount: letters.length
            });
        }
    }

    if (issues.length > 0) {
        console.log(`Found ${issues.length} levels with max 3-letter words but >3 letters in wheel:`);
        issues.forEach(issue => {
            console.log(`- Level ${issue.level}: Words=[${issue.words.join(', ')}] | Wheel=[${issue.letters.join(', ')}] (${issue.letterCount})`);
        });
    } else {
        console.log("✅ All levels with max 3-letter words have exactly 3 letters in the wheel.");
    }

} catch (e) {
    console.error("Error running audit:", e);
}
