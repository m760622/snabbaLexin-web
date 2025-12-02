const fs = require('fs');

const LEXIN_PATH = 'Lexin20210201.csv';

// Travel/Transport keywords
const TRAVEL_KEYWORDS = new Set([
    // Transport
    "RESA", "RESAN", "FÄRD", "TUR", "FLYG", "TÅG", "BÅT", "BUSS",
    "BIL", "CYKEL", "MOTOR", "TAXI",

    // Vehicles/Vessels
    "FARTYG", "SKEPP", "BÅTAR", "KANOT", "DURK", "MAST", "SEGLA",
    "TÅGET", "VAGN", "SPÅR",

    // Travel Items
    "VÄSKA", "BAGAGE", "PASS", "BILJETT", "KARTA", "KOMPASS",

    // People
    "TURIST", "GUIDE", "PILOT", "KAPTEN", "MATROS", "STEWARD",

    // Places
    "LAND", "STAD", "HAMN", "STATION", "FLYGPLATS", "TERMINAL",
    "HOTELL", "VÄRD", "HYRA",

    // Directions
    "NORR", "SÖDER", "ÖSTER", "VÄSTER", "VÄG", "STIG", "DESTINATION",

    // Actions
    "ÅKER", "RESTE", "REST", "ANKOMMA", "AVGÅ", "PACKA",

    // Money/Practical
    "PENGAR", "VALUTA", "KOSTNAD", "PLATS"
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
    console.log(`Dictionary loaded.\n`);

    // Problem words
    const problemWords = ['DUK', 'KNIV', 'VIN', 'KANT', 'STAL', 'VÄXA', 'SKAV',
        'VÄRST', 'ÄRTER', 'RESÄR', 'REGNA', 'REPAN', 'ANGRE',
        'ROSA', 'ROSTA', 'RASAT', 'SVAR'];

    const candidates = [];

    for (let mainWord of TRAVEL_KEYWORDS) {
        if (!dictionary.has(mainWord)) continue;
        if (mainWord.length < 3 || mainWord.length > 7) continue;

        const allSubWords = getSubWords(mainWord, dictionary);
        const travelSubWords = allSubWords.filter(sw => TRAVEL_KEYWORDS.has(sw));

        const hasProblematic = allSubWords.some(w => problemWords.includes(w));

        if (allSubWords.length >= 2 && !hasProblematic) {
            const travelPercent = allSubWords.length > 0 ? (travelSubWords.length / allSubWords.length) * 100 : 0;
            candidates.push({
                word: mainWord,
                subWords: allSubWords,
                travelSubWords: travelSubWords,
                count: allSubWords.length,
                travelCount: travelSubWords.length,
                travelPercent: travelPercent,
                length: mainWord.length
            });
        }
    }

    candidates.sort((a, b) => {
        if (Math.abs(a.travelPercent - b.travelPercent) > 10) {
            return b.travelPercent - a.travelPercent;
        }
        return b.count - a.count;
    });

    console.log("=== CLEAN TRAVEL WORDS ===\n");

    candidates.slice(0, 50).forEach(c => {
        const travelWords = c.travelSubWords.length > 0 ? ` [TRAVEL: ${c.travelSubWords.join(', ')}]` : '';
        console.log(`${c.word} (L:${c.length}, N:${c.count}, Travel:${c.travelCount}/${c.count}=${c.travelPercent.toFixed(0)}%) -> ${c.subWords.join(', ')}${travelWords}`);
    });
}

analyze();
