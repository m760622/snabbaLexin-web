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
        const wheelSize = letters.length;

        for (const word of words) {
            if (word.length > wheelSize) {
                issues.push({
                    level: levelId,
                    word: word,
                    wordLength: word.length,
                    wheel: letters,
                    wheelSize: wheelSize
                });
            }
        }
    }

    if (issues.length > 0) {
        console.log(`Found ${issues.length} words that are longer than the wheel:`);
        issues.forEach(issue => {
            console.log(`- Level ${issue.level}: Word "${issue.word}" (${issue.wordLength}) > Wheel [${issue.wheel.join(', ')}] (${issue.wheelSize})`);
        });
    } else {
        console.log("✅ All words are shorter than or equal to the wheel size.");
    }

} catch (e) {
    console.error("Error running audit:", e);
}
