const fs = require('fs');

const DATA_FILE = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/wordConnectData.js';
const LEXIN_PATH = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/Lexin20210201.csv';

function isArabic(text) {
    return /[\u0600-\u06FF]/.test(text);
}

function repairData() {
    console.log("Loading data...");
    let content = fs.readFileSync(DATA_FILE, 'utf8');
    const lexinContent = fs.readFileSync(LEXIN_PATH, 'utf8');
    const lexinLines = lexinContent.split('\n');

    // Build a map of Word -> CSV Line(s)
    // A word might appear multiple times, we'll store all lines and pick the best one.
    const lexinMap = new Map();
    lexinLines.forEach(line => {
        const parts = line.split(';');
        if (parts.length < 3) return;
        const wordRaw = parts[2];
        if (!wordRaw) return;

        // Clean word
        const word = wordRaw.split(',')[0].trim().toUpperCase();
        if (!lexinMap.has(word)) {
            lexinMap.set(word, []);
        }
        lexinMap.get(word).push(parts);
    });

    // Extract WC_DICTIONARY
    const dictMatch = content.match(/const WC_DICTIONARY = (\[[\s\S]*?\]);/);
    if (!dictMatch) {
        console.error("Could not find WC_DICTIONARY");
        return;
    }

    const dictionary = eval('(' + dictMatch[1] + ')');
    let updates = 0;

    const newDictionary = dictionary.map(entry => {
        const word = entry.w.toUpperCase();
        let sentence = entry.s;
        let sentenceTrans = entry.st;
        let needsRepair = false;

        // Check 1: Sentence contains Arabic?
        if (isArabic(sentence)) {
            needsRepair = true;
        }

        // Check 2: Word not in sentence? (Strict whole word check)
        // We use the same regex as the audit
        const regex = new RegExp(`(?<![A-ZÅÄÖ])${word}(?![A-ZÅÄÖ])`, 'u');
        if (!regex.test(sentence.toUpperCase())) {
            needsRepair = true;
        }

        if (needsRepair) {
            // Try to find a better sentence in Lexin
            const candidates = lexinMap.get(word);
            if (candidates) {
                let bestS = null;
                let bestSt = null;

                // Iterate through all matching lines in CSV
                for (const parts of candidates) {
                    // Check columns 10 to end for a valid Swedish sentence
                    // We look for a column that:
                    // 1. Is NOT Arabic
                    // 2. Contains the word (whole word match)
                    // 3. Is reasonably long (e.g. > 10 chars) to be a sentence, or at least > word length

                    // The CSV structure seems to have pairs: (Sentence, Translation)
                    // But indices vary.
                    // Let's scan all columns from 6 onwards.

                    for (let i = 6; i < parts.length; i++) {
                        const cell = parts[i] ? parts[i].trim() : "";
                        if (!cell) continue;

                        // If it's Arabic, it's a translation, skip (we look for Swedish first)
                        if (isArabic(cell)) continue;

                        // Does it contain the word?
                        if (regex.test(cell.toUpperCase())) {
                            // Found a potential Swedish sentence!
                            // Look for its translation in the NEXT column (usually)
                            let trans = "";
                            if (i + 1 < parts.length) {
                                const nextCell = parts[i + 1] ? parts[i + 1].trim() : "";
                                if (isArabic(nextCell)) {
                                    trans = nextCell;
                                }
                            }

                            // If no translation found in i+1, maybe i+2? (Some cols are empty)
                            if (!trans && i + 2 < parts.length) {
                                const nextNext = parts[i + 2] ? parts[i + 2].trim() : "";
                                if (isArabic(nextNext)) {
                                    trans = nextNext;
                                }
                            }

                            // Prioritize sentences that are longer (more context)
                            if (!bestS || cell.length > bestS.length) {
                                bestS = cell;
                                bestSt = trans;
                            }
                        }
                    }
                }

                if (bestS) {
                    // console.log(`Repaired ${word}: "${bestS}"`);
                    sentence = bestS;
                    sentenceTrans = bestSt || ""; // Keep empty if no trans found, better than wrong data
                    updates++;
                } else {
                    // console.log(`Could not repair ${word} (no suitable sentence found in CSV)`);
                }
            }
        }

        return {
            w: entry.w,
            t: entry.t,
            s: sentence,
            st: sentenceTrans
        };
    });

    console.log(`Repaired ${updates} entries.`);

    // Reconstruct file content
    const newDictLines = newDictionary.map(item => {
        // Escape quotes in strings
        const sSafe = item.s.replace(/"/g, '\\"');
        const stSafe = item.st.replace(/"/g, '\\"');
        const tSafe = item.t.replace(/"/g, '\\"');
        return `    { w: "${item.w}", t: "${tSafe}", s: "${sSafe}", st: "${stSafe}" },`;
    });

    const newDictString = `const WC_DICTIONARY = [\n${newDictLines.join('\n')}\n];`;

    content = content.replace(
        /const WC_DICTIONARY = \[[\s\S]*?\];/,
        newDictString
    );

    fs.writeFileSync(DATA_FILE, content);
    console.log("Saved wordConnectData.js");
}

repairData();
