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
        sandbox.WC_DICTIONARY = WC_DICTIONARY;
        sandbox.WC_ROOT_WORDS = WC_ROOT_WORDS;
    `;

    const sandbox = {
        WC_PREDEFINED_LEVELS: {},
        WC_DICTIONARY: [],
        WC_ROOT_WORDS: [],
        console: console
    };

    eval(modifiedContent);

    const dictionary = sandbox.WC_DICTIONARY;
    const issues = [];

    console.log(`Auditing ${dictionary.length} dictionary entries for 3-letter words...`);

    dictionary.forEach(entry => {
        const word = entry.w.toUpperCase();

        // Only check 3-letter words
        if (word.length !== 3) return;

        const sentence = (entry.s || "").toUpperCase();

        // Tokenize sentence using Swedish alphabet + alphanumeric
        // We split by anything that is NOT a letter/number
        const tokens = sentence.split(/[^A-ZÅÄÖ0-9]+/);

        if (!tokens.includes(word)) {
            issues.push({
                word: entry.w,
                sentence: entry.s,
                tokens: tokens.join(', ')
            });
        }
    });

    if (issues.length > 0) {
        console.log(`Found ${issues.length} 3-letter words not present as whole words in their sentences:`);
        issues.forEach(issue => {
            console.log(`- Word: "${issue.word}" | Sentence: "${issue.sentence}"`);
        });
    } else {
        console.log("✅ All 3-letter words are present as whole words in their sentences.");
    }

} catch (e) {
    console.error("Error running audit:", e);
}
