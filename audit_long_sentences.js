const fs = require('fs');

const DATA_FILE = 'wordConnectData.js';
const content = fs.readFileSync(DATA_FILE, 'utf8');
const match = content.match(/const WC_DICTIONARY = (\[[\s\S]*?\]);/);
const dictionary = eval('(' + match[1] + ')');

console.log("Auditing Long Sentences (> 6 words)...\n");

let longCount = 0;
const longSentences = [];

dictionary.forEach(entry => {
    // Count words in Swedish sentence
    const wordCount = entry.s.split(/\s+/).filter(w => w.length > 0).length;

    if (wordCount > 6) {
        longCount++;
        longSentences.push({
            word: entry.w,
            len: wordCount,
            sv: entry.s,
            ar: entry.st
        });
    }
});

// Sort by length descending
longSentences.sort((a, b) => b.len - a.len);

console.log(`Found ${longCount} sentences longer than 6 words.\n`);

longSentences.forEach(item => {
    console.log(`[${item.word}] (${item.len} words)`);
    console.log(`  SV: ${item.sv}`);
    console.log(`  AR: ${item.ar}`);
    console.log('---');
});
