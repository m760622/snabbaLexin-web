const fs = require('fs');
const path = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/wordConnectData.js';

try {
    const content = fs.readFileSync(path, 'utf8');

    // Mock globals for eval
    const sandbox = {
        WC_PREDEFINED_LEVELS: {},
        WC_DICTIONARY: [],
        WC_ROOT_WORDS: [],
        console: console
    };

    // Replace const with sandbox assignment
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
        sandbox.WC_DICTIONARY = WC_DICTIONARY;
        sandbox.WC_ROOT_WORDS = WC_ROOT_WORDS;
    `;

    eval(modifiedContent);

    const levels = sandbox.WC_PREDEFINED_LEVELS;
    const issues = [];

    for (const key in levels) {
        const level = levels[key];
        const wheelLetters = new Set(level.letters.map(l => l.toUpperCase()));

        level.words.forEach(word => {
            const wordLetters = word.toUpperCase().split('');
            const missing = [];

            wordLetters.forEach(char => {
                if (!wheelLetters.has(char)) {
                    missing.push(char);
                }
            });

            if (missing.length > 0) {
                issues.push({
                    level: key,
                    word: word,
                    wheel: level.letters.join(','),
                    missing: [...new Set(missing)].join(',')
                });
            }
        });
    }

    if (issues.length > 0) {
        console.log(`Found ${issues.length} issues:`);
        issues.forEach(issue => {
            console.log(`- Level ${issue.level}: Word "${issue.word}" missing letters [${issue.missing}] from wheel [${issue.wheel}]`);
        });
    } else {
        console.log("✅ All levels passed integrity check.");
    }

} catch (e) {
    console.error("Error running audit:", e);
}
