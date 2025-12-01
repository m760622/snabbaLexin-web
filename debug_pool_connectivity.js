const fs = require('fs');

const LEXIN_PATH = 'Lexin20210201.csv';
const content = fs.readFileSync(LEXIN_PATH, 'utf8');
const lines = content.split('\n');

const highQualityPool = [];

// Parse High Quality Pool (Same logic as generator)
for (const line of lines) {
    const parts = line.split(';');
    if (parts.length < 12) continue;
    let word = parts[2] ? parts[2].trim().split(',')[0].trim().replace(/[^a-zA-ZåäöÅÄÖ]/g, '') : "";
    let translation = parts[3] ? parts[3].trim() : "";
    if (!word || word.length < 3 || word.length > 7 || !translation) continue;

    // Simplified check for valid sentence presence
    // In real generator we check sentence length etc.
    let hasSentence = false;
    for (let i = 6; i < parts.length; i++) {
        const cell = parts[i] ? parts[i].trim() : "";
        if (!cell || /[\u0600-\u06FF]/.test(cell)) continue;
        const wc = cell.split(/\s+/).filter(w => w.length > 0).length;
        if (wc >= 4) { hasSentence = true; break; }
    }
    if (!hasSentence) continue;

    highQualityPool.push(word.toUpperCase());
}

console.log(`Pool Size: ${highQualityPool.length}`);

function canFormWord(target, sourceLetters) {
    const t = target.split('').sort();
    const s = sourceLetters.split('').sort();
    let i = 0, j = 0;
    while (i < t.length && j < s.length) {
        if (t[i] === s[j]) { i++; j++; }
        else { j++; }
    }
    return i === t.length;
}

// Analyze Roots for Level 10 (MaxLen 7, Words 5)
console.log("\nAnalyzing Level 10 Constraints (Len 7, 5 Words):");
let validRoots = 0;
const roots = highQualityPool.filter(w => w.length === 7);
console.log(`Potential Roots (Len 7): ${roots.length}`);

for (const root of roots) {
    const subwords = highQualityPool.filter(w =>
        w.length >= 4 && w.length <= 7 && canFormWord(w, root)
    );
    if (subwords.length >= 5) {
        validRoots++;
    }
}
console.log(`Valid Roots with >= 5 subwords: ${validRoots}`);

// Analyze Level 7-9 (Len 6, 4 Words)
console.log("\nAnalyzing Level 7-9 Constraints (Len 6, 4 Words):");
let validRoots6 = 0;
const roots6 = highQualityPool.filter(w => w.length === 6);
console.log(`Potential Roots (Len 6): ${roots6.length}`);

for (const root of roots6) {
    const subwords = highQualityPool.filter(w =>
        w.length >= 5 && w.length <= 6 && canFormWord(w, root)
    );
    if (subwords.length >= 4) {
        validRoots6++;
    }
}
console.log(`Valid Roots with >= 4 subwords: ${validRoots6}`);
