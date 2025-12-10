const fs = require('fs');

// Read data.js
let dataContent = fs.readFileSync('./data.js', 'utf-8');

// Parse
let dictionaryData;
let prefix = "";
let suffix = "";

if (dataContent.includes('const dictionaryData =')) {
    prefix = "const dictionaryData = ";
    suffix = ";";
    dictionaryData = JSON.parse(dataContent.replace(prefix, '').replace(/;$/, ''));
} else {
    process.exit(1);
}

// Lists of words modified in recent batches (Adjectives, Expressions, Adverbs)
// I will just scan ALL entries. 
// If Index 6 contains a long sentence (spaces, > 3 words) AND Index 7 contains Arabic...
// Then it's a shifted entry.
// Normal "Forms" (Index 6) should be comma-separated single words, or short.
// My inserted sentences are full sentences.

let fixedCount = 0;

dictionaryData.forEach(e => {
    const word = e[2] || "";
    const type = e[1] || "";

    // Target types: Adjektiv, Adverb, Subst, Expressions... basically anything.
    // But be careful not to break valid data.

    // Heuristic for "Sentences in Form Column":
    // 1. Length > 15 chars
    // 2. Contains spaces (Forms usually comma separated, but sentences have spaces)
    // 3. Does NOT look like form list "glad, glatt, glada" (few spaces, commas)
    // 4. Ends with "." or "!" or "?" (Strong signal of sentence)
    // 5. Index 7 contains Arabic (Strong signal of my shift)

    let col6 = e[6] || "";
    let col7 = e[7] || "";

    const isSentence = (text) => {
        return text.length > 15 && /[.!?]$/.test(text.trim()) && text.includes(" ");
    };

    const isArabic = (text) => {
        return /[\u0600-\u06FF]/.test(text);
    };

    if (isSentence(col6) && isArabic(col7)) {
        // This is highly likely one of my broken entries
        console.log(`Reparing [${word}]:`);
        console.log(`   Col 6 (Was Forms): "${col6}" -> Moving to Col 7`);
        console.log(`   Col 7 (Was Swe Ex): "${col7}" -> Moving to Col 8`);

        // Move
        e[8] = col7; // Move Arabic of Ex to 8
        e[7] = col6; // Move Swe of Ex to 7
        e[6] = word; // Restore Forms to just Word (Safe default for tautologies)

        fixedCount++;
    }
});

console.log(`\nRepaired ${fixedCount} entries.`);

const newContent = prefix + JSON.stringify(dictionaryData, null, 2) + suffix;
fs.writeFileSync('./data.js', newContent, 'utf-8');
