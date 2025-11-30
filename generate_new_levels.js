const fs = require('fs');

// Configuration
const LEXIN_PATH = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/Lexin20210201.csv';
const OUTPUT_PATH = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/new_level_data.json';

// Level Structure Rules
const LEVEL_RULES = [
    { count: 3, words: 2, minLen: 3, maxLen: 4 }, // Levels 1-3
    { count: 3, words: 3, minLen: 4, maxLen: 5 }, // Levels 4-6
    { count: 3, words: 4, minLen: 5, maxLen: 6 }, // Levels 7-9
    { count: 1, words: 5, minLen: 4, maxLen: 7 }  // Level 10
];

function parseLexin() {
    const content = fs.readFileSync(LEXIN_PATH, 'utf8');
    const lines = content.split('\n');

    const highQualityPool = [];
    const fullPool = new Set(); // Use Set for fast lookup of all valid words

    for (const line of lines) {
        const parts = line.split(';');
        if (parts.length < 12) continue;

        let word = parts[2] ? parts[2].trim() : "";
        let translation = parts[3] ? parts[3].trim() : "";

        // Clean word
        word = word.split(',')[0].trim();
        word = word.replace(/[^a-zA-ZåäöÅÄÖ]/g, '');

        if (!word || word.length < 3 || word.length > 7) continue;

        // Add to full pool (for bonus words)
        fullPool.add(word.toUpperCase());

        // Skip words with no translation for high quality pool
        if (!translation) continue;

        // Scan for valid sentence and translation
        let bestSentence = "";
        let bestTrans = "";

        // Scan columns starting from 6
        for (let i = 6; i < parts.length; i++) {
            const cell = parts[i] ? parts[i].trim() : "";
            if (!cell || /[\u0600-\u06FF]/.test(cell)) continue; // Skip empty or Arabic cells

            // Check if cell contains the word (whole word match)
            const regex = new RegExp(`(?<![A-ZÅÄÖ])${word}(?![A-ZÅÄÖ])`, 'i');
            if (!regex.test(cell)) continue;

            // Check word count >= 4
            const wc = cell.split(/\s+/).filter(w => w.length > 0).length;
            if (wc < 4) continue;

            // Look for translation in next columns
            let trans = "";
            if (i + 1 < parts.length && /[\u0600-\u06FF]/.test(parts[i + 1])) trans = parts[i + 1].trim();
            else if (i + 2 < parts.length && /[\u0600-\u06FF]/.test(parts[i + 2])) trans = parts[i + 2].trim();

            if (trans) {
                if (!bestSentence || wc > bestSentence.split(/\s+/).length) {
                    bestSentence = cell;
                    bestTrans = trans;
                }
            }
        }

        if (!bestSentence || !bestTrans) continue;

        highQualityPool.push({
            w: word.toUpperCase(),
            t: translation,
            s: bestSentence,
            st: bestTrans
        });
    }
    return { highQualityPool, fullPool };
}

function generateLevels() {
    const { highQualityPool, fullPool } = parseLexin();
    console.log(`Parsed ${highQualityPool.length} high-quality words.`);
    console.log(`Parsed ${fullPool.size} total valid words.`);

    const levels = {};
    const usedWords = new Set();
    const dictionary = [];

    // Helper to check if word can be formed from letters
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

    for (let chapter = 1; chapter <= 10; chapter++) {
        for (let level = 1; level <= 10; level++) {
            const levelId = `${chapter}-${level}`;
            const rules = LEVEL_RULES[level <= 3 ? 0 : level <= 6 ? 1 : level <= 9 ? 2 : 3];

            let bestLevel = null;

            // Try to generate a valid level
            for (let attempt = 0; attempt < 500; attempt++) {
                // Pick a root word from highQualityPool that fits maxLen EXACTLY
                // This ensures wheel size == maxLen, and since we include root, longest word == wheel size
                const candidates = highQualityPool.filter(w => w.w.length === rules.maxLen);
                if (candidates.length === 0) continue;

                const rootObj = candidates[Math.floor(Math.random() * candidates.length)];
                const rootWord = rootObj.w;
                const letters = rootWord.split('').sort(() => Math.random() - 0.5); // Shuffle

                // Find all valid subwords from High Quality Pool (for targets)
                const validSubwords = highQualityPool.filter(w =>
                    w.w.length >= rules.minLen &&
                    w.w.length <= rules.maxLen &&
                    canFormWord(w.w, rootWord)
                );

                if (validSubwords.length < rules.words) continue;

                // Select words
                // Prioritize unused words
                validSubwords.sort((a, b) => {
                    const aUsed = usedWords.has(a.w) ? 1 : 0;
                    const bUsed = usedWords.has(b.w) ? 1 : 0;
                    return aUsed - bUsed;
                });

                // Try to pick a set that satisfies constraints
                const selected = [];
                const lengths = new Set();

                // ALWAYS add the root word first to ensure wheel size == longest word
                // The root word is in validSubwords because we filtered by canFormWord(root, root) which is true
                // But we need to find the specific object
                const rootEntry = validSubwords.find(w => w.w === rootWord);
                if (rootEntry) {
                    selected.push(rootEntry);
                    lengths.add(rootEntry.w.length);
                } else {
                    // Should not happen if logic is correct, but safe fallback
                    continue;
                }

                for (const w of validSubwords) {
                    if (selected.length >= rules.words) break;
                    if (selected.find(s => s.w === w.w)) continue;

                    selected.push(w);
                    lengths.add(w.w.length);
                }

                if (selected.length !== rules.words) continue;
                if (!lengths.has(rules.minLen) || !lengths.has(rules.maxLen)) continue;

                // Success!
                // Find ALL valid words (bonus words) from fullPool
                const allValidWords = [];
                for (const w of fullPool) {
                    if (w.length > 2 && canFormWord(w, rootWord)) {
                        allValidWords.push(w);
                    }
                }

                bestLevel = {
                    letters: letters,
                    words: selected.map(w => w.w),
                    validWords: allValidWords, // Includes targets + bonus
                    dictionaryEntries: selected
                };
                break;
            }

            if (bestLevel) {
                levels[levelId] = {
                    letters: bestLevel.letters,
                    words: bestLevel.words,
                    validWords: bestLevel.validWords
                };

                bestLevel.dictionaryEntries.forEach(entry => {
                    usedWords.add(entry.w);
                    if (!dictionary.find(d => d.w === entry.w)) {
                        dictionary.push(entry);
                    }
                });
            } else {
                console.error(`Failed to generate level ${levelId}`);
            }
        }
    }

    return { levels, dictionary };
}

try {
    const result = generateLevels();

    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(result, null, 2));
    console.log(`Generated ${Object.keys(result.levels).length} levels.`);
    console.log(`Dictionary size: ${result.dictionary.length}`);

} catch (e) {
    console.error("Error:", e);
}
