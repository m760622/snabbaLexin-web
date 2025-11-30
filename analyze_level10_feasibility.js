const fs = require('fs');

const LEXIN_PATH = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/Lexin20210201.csv';

function canFormWord(target, source) {
    const t = target.split('').sort();
    const s = source.split('').sort();
    let i = 0, j = 0;
    while (i < t.length && j < s.length) {
        if (t[i] === s[j]) { i++; j++; }
        else { j++; }
    }
    return i === t.length;
}

function analyzeLevel10() {
    const content = fs.readFileSync(LEXIN_PATH, 'utf8');
    const lines = content.split('\n');

    const pool = [];

    // 1. Parse and Filter High Quality
    for (const line of lines) {
        const parts = line.split(';');
        if (parts.length < 12) continue;
        let word = parts[2] ? parts[2].trim().split(',')[0].trim().toUpperCase() : "";
        word = word.replace(/[^A-ZÅÄÖ]/g, '');
        if (!word || word.length < 3 || word.length > 7) continue;

        // Strict Quality Filter (replicated)
        let hasGoodSentence = false;
        for (let i = 6; i < parts.length; i++) {
            const cell = parts[i] ? parts[i].trim() : "";
            if (!cell || /[\u0600-\u06FF]/.test(cell)) continue;
            const regex = new RegExp(`(?<![A-ZÅÄÖ])${word}(?![A-ZÅÄÖ])`, 'i');
            if (!regex.test(cell)) continue;
            const wc = cell.split(/\s+/).filter(w => w.length > 0).length;
            if (wc < 4) continue;
            let trans = "";
            if (i + 1 < parts.length && /[\u0600-\u06FF]/.test(parts[i + 1])) trans = parts[i + 1].trim();
            else if (i + 2 < parts.length && /[\u0600-\u06FF]/.test(parts[i + 2])) trans = parts[i + 2].trim();
            if (trans) { hasGoodSentence = true; break; }
        }

        if (hasGoodSentence) {
            pool.push(word);
        }
    }

    console.log(`Pool size (6-7 chars): ${pool.length}`);

    // 2. Find Roots
    let successCount = 0;
    const roots = pool.filter(w => w.length === 7);

    for (const root of roots) {
        const subwords = pool.filter(w => w.length >= 4 && w.length <= 7 && canFormWord(w, root));
        // Unique
        const unique = [...new Set(subwords)];

        if (unique.length >= 5) {
            console.log(`Found Root: ${root} -> ${unique.join(', ')}`);
            successCount++;
        }
    }

    console.log(`Total valid Level 10 candidates: ${successCount}`);
}

analyzeLevel10();
