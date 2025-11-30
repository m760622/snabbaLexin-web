const fs = require('fs');

const DATA_FILE = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/wordConnectData.js';

function auditDictionary() {
    const content = fs.readFileSync(DATA_FILE, 'utf8');

    // Extract WC_DICTIONARY
    const match = content.match(/const WC_DICTIONARY = (\[[\s\S]*?\]);/);
    if (!match) {
        console.error("Could not find WC_DICTIONARY");
        return;
    }

    const dictionary = eval('(' + match[1] + ')');
    const issues = [];

    console.log(`Auditing ${dictionary.length} words...`);

    dictionary.forEach(entry => {
        const word = entry.w.toUpperCase();
        const sentence = entry.s;

        if (!sentence) {
            issues.push({ word, reason: "Missing sentence" });
            return;
        }

        // Normalize for case-insensitive check
        const normSentence = sentence.toUpperCase();

        // Strict Whole Word Check
        // We look for the word surrounded by non-alphanumeric characters (or start/end of string)
        // Swedish characters ÅÄÖ must be treated as letters.
        // Regex: (?<![A-ZÅÄÖ])WORD(?![A-ZÅÄÖ])

        const regex = new RegExp(`(?<![A-ZÅÄÖ])${word}(?![A-ZÅÄÖ])`, 'u');

        if (!regex.test(normSentence)) {
            issues.push({
                word,
                sentence,
                reason: "Word not found as whole word (may be missing, substring, or inflected form)"
            });
        }
    });

    if (issues.length === 0) {
        console.log("✅ All words pass the strict whole-word presence check.");
    } else {
        console.log(`❌ Found ${issues.length} issues:`);
        issues.forEach(i => console.log(`- Word: "${i.word}" | Sentence: "${i.sentence}" | Reason: ${i.reason}`));
    }
}

auditDictionary();
