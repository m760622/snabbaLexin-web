const fs = require('fs');

const DATA_FILE = 'wordConnectData.js';
const LEXIN_PATH = 'Lexin20210201.csv';

// Load current dictionary words
const content = fs.readFileSync(DATA_FILE, 'utf8');
const match = content.match(/const WC_DICTIONARY = (\[[\s\S]*?\]);/);
const dictionary = eval('(' + match[1] + ')');
const currentWords = new Set(dictionary.map(e => e.w));

// Load Lexin
const lexinContent = fs.readFileSync(LEXIN_PATH, 'utf8');
const lexinLines = lexinContent.split('\n');

console.log("Finding Stubborn Long Sentences...\n");

const stubbornWords = [];
const fixableWords = [];

for (const word of currentWords) {
    let bestLength = 999;
    let bestSentence = "";

    // Check all Lexin entries for this word
    for (const line of lexinLines) {
        const parts = line.split(';');
        if (parts.length < 3) continue;

        // Check if word matches (allowing for comma-separated forms)
        const forms = parts[2] ? parts[2].toLowerCase().split(',').map(s => s.trim()) : [];
        if (!forms.includes(word.toLowerCase())) continue;

        // Check examples
        const examples = parts[5] ? parts[5].split('|') : []; // Lexin examples often separated by | or just text
        // Actually Lexin CSV format is messy. Column 5 is usually examples.
        // Let's look at the "Exempel" column (index 5) and "Idiom" (index 4? No, let's check header).
        // Header: Type;?;Word;Arabic;Idiom;Example;...

        // Let's treat column 5 (Example) and 4 (Idiom) as sources.
        const candidates = [];
        if (parts[4]) candidates.push(...parts[4].split('|'));
        if (parts[5]) candidates.push(...parts[5].split('|')); // Sometimes examples are just one string

        // Also split by ')' or '.' if multiple sentences packed? 
        // Lexin often has "ex1 (trans1) ex2 (trans2)"
        // The generator logic splits by ')' usually.

        // Let's use the same parsing logic as the generator to be fair.
        // Generator logic:
        /*
        let examples = [];
        if (parts[5]) examples.push(parts[5]);
        if (parts[4]) examples.push(parts[4]); // Idioms
        
        for (let ex of examples) {
            // Split by ')' to separate multiple examples
            let subExamples = ex.split(')');
            for (let sub of subExamples) {
                // Clean up
                let clean = sub.replace(/\(.*\)/g, '').trim(); // Remove translation inside
                // Wait, the format is "Swedish (Arabic)".
                // We want the Swedish part.
                let match = sub.match(/^(.*?)\(/);
                if (match) {
                    let sv = match[1].trim();
                    if (sv) candidates.push(sv);
                } else {
                    // Maybe no translation
                    if (sub.trim()) candidates.push(sub.trim());
                }
            }
        }
        */

        // Simplified check: just look for ANY valid sentence <= 6 words
        const rawExamples = (parts[5] || "") + " " + (parts[4] || "");
        // Regex to find Swedish text before '('
        const matches = rawExamples.matchAll(/([^()]+)\(/g);
        for (const m of matches) {
            const s = m[1].trim();
            if (!s) continue;
            const len = s.split(/\s+/).length;
            if (len < bestLength) {
                bestLength = len;
                bestSentence = s;
            }
        }

        // Also check if the raw string itself is short (if no parens)
        if (!rawExamples.includes('(') && rawExamples.trim().length > 0) {
            const s = rawExamples.trim();
            const len = s.split(/\s+/).length;
            if (len < bestLength) {
                bestLength = len;
                bestSentence = s;
            }
        }
    }

    if (bestLength > 6) {
        stubbornWords.push({ word, len: bestLength, s: bestSentence });
    } else {
        fixableWords.push({ word, len: bestLength });
    }
}

console.log(`Total Words: ${currentWords.size}`);
console.log(`Fixable (have short examples): ${fixableWords.length}`);
console.log(`Stubborn (only long examples): ${stubbornWords.length}`);

console.log("\nStubborn Words List:");
stubbornWords.forEach(w => console.log(`${w.word} (Best: ${w.len} words) - ${w.s}`));
