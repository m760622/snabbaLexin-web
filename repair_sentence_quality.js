const fs = require('fs');

const DATA_FILE = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/wordConnectData.js';
const LEXIN_PATH = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/Lexin20210201.csv';

function isArabic(text) {
    return /[\u0600-\u06FF]/.test(text);
}

function countWords(text) {
    return text.split(/\s+/).filter(w => w.length > 0).length;
}

function repairQuality() {
    console.log("Loading data...");
    let content = fs.readFileSync(DATA_FILE, 'utf8');
    const lexinContent = fs.readFileSync(LEXIN_PATH, 'utf8');
    const lexinLines = lexinContent.split('\n');

    // Build map of Word -> List of CSV rows
    const lexinMap = new Map();
    lexinLines.forEach(line => {
        const parts = line.split(';');
        if (parts.length < 3) return;
        const wordRaw = parts[2];
        if (!wordRaw) return;

        // Clean word (remove commas, synonyms)
        // Lexin format: "Word, synonym..."
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
        let sentence = entry.s || "";
        let sentenceTrans = entry.st || "";
        let translation = entry.t || "";

        const currentWordCount = countWords(sentence);
        const hasTrans = isArabic(sentenceTrans);
        const hasDef = isArabic(translation);

        // Criteria for repair:
        // 1. Sentence is too short (< 4 words)
        // 2. Sentence translation is missing/invalid
        // 3. Main translation is missing (rare but possible)

        if (currentWordCount < 4 || !hasTrans || !hasDef) {
            const candidates = lexinMap.get(word);

            if (candidates) {
                let bestMatch = null;

                // Search for best sentence/translation pair
                for (const parts of candidates) {
                    // Try to find main translation if missing
                    let foundDef = translation;
                    if (!hasDef) {
                        // Column 3 is usually translation
                        if (parts[3] && isArabic(parts[3])) foundDef = parts[3].trim();
                    }

                    // Scan for sentences (col 6 onwards)
                    for (let i = 6; i < parts.length; i++) {
                        const cell = parts[i] ? parts[i].trim() : "";
                        if (!cell || isArabic(cell)) continue;

                        // Check if cell contains the word (whole word)
                        const regex = new RegExp(`(?<![A-ZÅÄÖ])${word}(?![A-ZÅÄÖ])`, 'i');
                        if (!regex.test(cell)) continue;

                        // Check word count
                        const wc = countWords(cell);
                        if (wc < 4) continue; // Enforce 4 words minimum

                        // Look for translation in next columns
                        let trans = "";
                        if (i + 1 < parts.length && isArabic(parts[i + 1])) trans = parts[i + 1].trim();
                        else if (i + 2 < parts.length && isArabic(parts[i + 2])) trans = parts[i + 2].trim();

                        if (trans) {
                            // Found a valid pair!
                            // Prioritize longer sentences or just take first good one?
                            // Let's take the longest one to ensure "meaningful" context
                            if (!bestMatch || wc > bestMatch.wc) {
                                bestMatch = {
                                    s: cell,
                                    st: trans,
                                    wc: wc,
                                    def: foundDef
                                };
                            }
                        }
                    }
                }

                if (bestMatch) {
                    sentence = bestMatch.s;
                    sentenceTrans = bestMatch.st;
                    if (!hasDef && bestMatch.def) translation = bestMatch.def;
                    updates++;
                }
            }
        }

        return {
            w: entry.w,
            t: translation,
            s: sentence,
            st: sentenceTrans
        };
    });

    console.log(`Repaired ${updates} entries.`);

    // Reconstruct file content
    const newDictLines = newDictionary.map(item => {
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

repairQuality();
