const fs = require('fs');

const LEXIN_PATH = 'Lexin20210201.csv';

// Core Transport keywords (main words only)
const TRANSPORT_MAIN = new Set([
    "BIL", "BILAR", "BÅT", "BÅTAR", "TÅG", "BUSS", "BUSSAR", "FLYG", "PLAN",
    "CYKEL", "CYKLAR", "TAXI", "LASTBIL", "FÄRJA", "KANOT", "MOTOR",
    "STATION", "HAMN", "FLYGPLATS", "SPÅR", "VAGN", "VAGNAR", "PERRONG",
    "BRO", "VÄG", "VÄGAR", "GATA", "MATROS", "SEGLA", "MAST",
    "RESA", "RESOR", "KÖRA", "ÅKA", "ÅKER", "FLYGA", "AVGÅNG", "ANKOMST",
    "BILJETT", "SÄTE", "REST", "VÄSTER", "NORR", "SÖDER", "ÖSTER"
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

    for (let mainWord of TRANSPORT_MAIN) {
        if (!dictionary.has(mainWord)) continue;
        if (mainWord.length < 3 || mainWord.length > 7) continue;

        const allSubWords = getSubWords(mainWord, dictionary);

        if (allSubWords.length >= 2) {
            candidates.push({
                word: mainWord,
                subWords: allSubWords,
                count: allSubWords.length,
                length: mainWord.length
            });
        }
    }

    // Sort by Count (desc)
    candidates.sort((a, b) => b.count - a.count);

    console.log("--- Transport Main Words (Best Candidates) ---");
    console.log("\n=== ALL CANDIDATES ===");
    candidates.slice(0, 50).forEach(c => {
        console.log(`${c.word} (L:${c.length}, N:${c.count}) -> ${c.subWords.slice(0, 10).join(', ')}${c.subWords.length > 10 ? '...' : ''}`);
    });
}

analyze();
