const fs = require('fs');

const LEXIN_PATH = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/Lexin20210201.csv';

function isArabic(text) {
    return /[\u0600-\u06FF]/.test(text);
}

function countWords(text) {
    return text.split(/\s+/).filter(w => w.length > 0).length;
}

function analyzeLexinQuality() {
    const content = fs.readFileSync(LEXIN_PATH, 'utf8');
    const lines = content.split('\n');

    let total = 0;
    let good = 0;
    const byLength = {};

    for (const line of lines) {
        const parts = line.split(';');
        if (parts.length < 12) continue;

        let word = parts[2] ? parts[2].trim() : "";

        // Clean word
        word = word.split(',')[0].trim();
        word = word.replace(/[^a-zA-ZåäöÅÄÖ]/g, '');

        if (!word || word.length < 3 || word.length > 7) continue;

        total++;

        // Check for ANY valid sentence in the row
        let hasGoodSentence = false;

        // Scan columns for sentences
        for (let i = 6; i < parts.length; i++) {
            const cell = parts[i] ? parts[i].trim() : "";
            if (!cell || isArabic(cell)) continue;

            // Check word presence
            const regex = new RegExp(`(?<![A-ZÅÄÖ])${word}(?![A-ZÅÄÖ])`, 'i');
            if (!regex.test(cell)) continue;

            // Check length >= 4
            if (countWords(cell) < 4) continue;

            // Check translation
            let trans = "";
            if (i + 1 < parts.length && isArabic(parts[i + 1])) trans = parts[i + 1].trim();
            else if (i + 2 < parts.length && isArabic(parts[i + 2])) trans = parts[i + 2].trim();

            if (trans) {
                hasGoodSentence = true;
                break;
            }
        }

        if (hasGoodSentence) {
            good++;
            const len = word.length;
            byLength[len] = (byLength[len] || 0) + 1;
        }
    }

    console.log(`Total candidate words (3-7 chars): ${total}`);
    console.log(`High-quality words (sentence >= 4 words + Arabic trans): ${good}`);
    console.log("Distribution by length:");
    console.log(JSON.stringify(byLength, null, 2));
}

analyzeLexinQuality();
