const fs = require('fs');
const LEXIN_PATH = 'Lexin20210201.csv';
const MANUAL_SENTENCES = require('./manual_sentences.js');

const content = fs.readFileSync(LEXIN_PATH, 'utf8');
const lines = content.split('\n');

console.log("Finding Missing Roots (Filtered by Sentence Length > 6)...\n");

const candidates = [];

for (const line of lines) {
    const parts = line.split(';');
    if (parts.length < 6) continue;

    let word = parts[2] ? parts[2].trim().split(',')[0].trim() : "";
    word = word.replace(/[^a-zA-ZåäöÅÄÖ]/g, '').toUpperCase();

    if (word.length < 5 || word.length > 7) continue; // Focus on roots for failed levels
    if (MANUAL_SENTENCES[word]) continue; // Already handled

    // Check sentence length
    let bestLen = 999;
    let bestSentence = "";

    // Scan columns 6+
    for (let i = 6; i < parts.length; i++) {
        const cell = parts[i] ? parts[i].trim() : "";
        if (!cell || /[\u0600-\u06FF]/.test(cell)) continue;

        const suffixes = "(?:en|et|ar|er|na|a|s|an|on|or|erna|arna|t|de|r|te|dd|tt)?";
        const regex = new RegExp(`(?<![A-ZÅÄÖ])${word}${suffixes}(?![A-ZÅÄÖ])`, 'i');
        if (!regex.test(cell)) continue;

        const wc = cell.split(/\s+/).filter(w => w.length > 0).length;
        if (wc < 3) continue;

        if (wc < bestLen) {
            bestLen = wc;
            bestSentence = cell;
        }
    }

    if (bestLen > 6 && bestLen < 999) {
        candidates.push({ w: word, len: bestLen, s: bestSentence });
    }
}

// Sort by length (prioritize shorter ones close to cutoff)
candidates.sort((a, b) => a.len - b.len);

console.log(`Found ${candidates.length} potential roots filtered out.`);
candidates.slice(0, 50).forEach(c => {
    console.log(`[${c.w}] (${c.len} words): ${c.s}`);
});
