const fs = require('fs');

const LEXIN_PATH = 'Lexin20210201.csv';

// Law/Legal keywords
const LAW_KEYWORDS = new Set([
    // Core legal terms
    "LAG", "LAGAR", "DOM", "DOMAR", "RÄTT", "RÄTTIGHET", "BROTT",
    "POLIS", "DOMSTOL", "ADVOKAT", "ÅKLAGARE", "DOMARE",

    // Legal concepts
    "REGEL", "REGLER", "STRAFF", "BOT", "BÖTER", "FÄNGELSE",
    "ARV", "ARVET", "TESTAMENT", "SKULD", "GÄLD",

    // Legal actions
    "STÄMMA", "ANSE", "ANMÄLA", "VITTNE", "FÖRHÖR", "RÄTTEGÅNG",

    // Rights/Justice
    "FRIHET", "RÄTTVISA", "ANSVAR", "SKYLDIGHET",

    // Criminal justice
    "BÅK", "FÅNGE", "FÅNGVÅRD", "ARREST", "HÄKTE",

    // Documents
    "BEVIS", "HANDLING", "KONTRAKT", "AVTAL",

    // People
    "TJUV", "BROTTSLING", "OFFER", "PART",

    // Related
    "STAT", "MAKT", "MYNDIGHET", "TILLSTÅND"
]);

function loadDictionary() {
    const content = fs.readFileSync(LEXIN_PATH, 'utf8');
    const lines = content.split('\n');
    const dictionary = new Set();

    for (let line of lines) {
        const parts = line.split(';');
        if (parts.length < 3) continue;
        let word = parts[2] ? parts[2].trim().split(',')[0].trim() : "";
        word = word.replace(/[^a-zA-ZåäöÅÄÖ]/g, '').toUpperCase();
        if (word.length >= 3) {
            dictionary.add(word);
        }
    }
    return dictionary;
}

function getSubWords(mainWord, dictionary) {
    const subWords = new Set();
    const letters = mainWord.split('');

    function permute(currentWord, remainingLetters) {
        if (currentWord.length >= 3) {
            if (dictionary.has(currentWord)) {
                subWords.add(currentWord);
            }
        }

        if (remainingLetters.length === 0) return;

        for (let i = 0; i < remainingLetters.length; i++) {
            const nextLetter = remainingLetters[i];
            const newRemaining = [...remainingLetters];
            newRemaining.splice(i, 1);
            permute(currentWord + nextLetter, newRemaining);
        }
    }

    permute("", letters);
    return Array.from(subWords);
}

function analyze() {
    const dictionary = loadDictionary();
    console.log(`Dictionary loaded.`);

    const candidates = [];

    for (let mainWord of LAW_KEYWORDS) {
        if (!dictionary.has(mainWord)) continue;
        if (mainWord.length < 3 || mainWord.length > 7) continue;

        const allSubWords = getSubWords(mainWord, dictionary);

        if (allSubWords.length >= 2) {
            // Count how many subwords are law-related
            const lawSubWords = allSubWords.filter(sw => LAW_KEYWORDS.has(sw));
            const lawPercentage = (lawSubWords.length / allSubWords.length) * 100;

            candidates.push({
                word: mainWord,
                subWords: allSubWords,
                lawSubWords: lawSubWords,
                count: allSubWords.length,
                lawCount: lawSubWords.length,
                lawPercent: lawPercentage,
                length: mainWord.length
            });
        }
    }

    // Sort by law percentage and count
    candidates.sort((a, b) => {
        if (Math.abs(a.lawPercent - b.lawPercent) > 10) {
            return b.lawPercent - a.lawPercent;
        }
        return b.count - a.count;
    });

    console.log("--- Law-Themed Candidates (Best Quality) ---");
    console.log("\n=== TOP CANDIDATES ===");
    candidates.slice(0, 50).forEach(c => {
        const lawWords = c.lawSubWords.length > 0 ? ` [LAW: ${c.lawSubWords.join(', ')}]` : '';
        console.log(`${c.word} (L:${c.length}, N:${c.count}, Law:${c.lawCount}=${c.lawPercent.toFixed(0)}%) -> ${c.subWords.slice(0, 8).join(', ')}${c.subWords.length > 8 ? '...' : ''}${lawWords}`);
    });
}

analyze();
