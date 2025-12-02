const fs = require('fs');

const LEXIN_PATH = 'Lexin20210201.csv';

// Extended Islamic keywords - being even more strict
const ISLAM_STRICT = new Set([
    // Core
    "ISLAM", "MUSLIM", "ALLAH", "GUD", "PROFET", "MUHAMMED",
    "KORAN", "KORANEN",

    // Worship
    "BÖN", "BÖNER", "BED", "BEDER", "BER", "ANBEDER", "DYRKA",
    "FASTA", "RAMADAN", "ZAKAT", "HADJ",

    // Concepts
    "TRO", "TRON", "TROR", "FRED", "FRID", "NÅD", "FROMHET",
    "HELIG", "HELIGT", "HELGA", "HELGON",

    // Places/People
    "MOSKÉ", "MOSKÉN", "MOSKÉER", "IMAM", "MEKKA", "MEDINA",

    // Virtues
    "GOD", "SANN", "REN", "RENA", "MILD",

    // Other
    "AMEN", "ARK", "DUA", "SALAM"
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

    for (let mainWord of ISLAM_STRICT) {
        if (!dictionary.has(mainWord)) continue;
        if (mainWord.length < 3 || mainWord.length > 7) continue;

        const allSubWords = getSubWords(mainWord, dictionary);
        const islamSubWords = allSubWords.filter(sw => ISLAM_STRICT.has(sw));
        const islamPercent = allSubWords.length > 0 ? (islamSubWords.length / allSubWords.length) * 100 : 0;

        if (allSubWords.length >= 2) {
            candidates.push({
                word: mainWord,
                subWords: allSubWords,
                islamSubWords: islamSubWords,
                count: allSubWords.length,
                islamCount: islamSubWords.length,
                islamPercent: islamPercent,
                length: mainWord.length
            });
        }
    }

    candidates.sort((a, b) => {
        if (Math.abs(a.islamPercent - b.islamPercent) > 10) {
            return b.islamPercent - a.islamPercent;
        }
        return b.count - a.count;
    });

    console.log("=== BEST ISLAMIC WORDS (Avoiding ROT, ORT, TORN, LEG, PER) ===\n");

    candidates.forEach(c => {
        // Check if it has problematic words
        const hasProblematic = c.subWords.some(w => ['ROT', 'ORT', 'TORN', 'LEG', 'PER'].includes(w));
        const marker = hasProblematic ? ' ⚠️' : ' ✅';
        const islamWords = c.islamSubWords.length > 0 ? ` [${c.islamSubWords.join(', ')}]` : '';
        console.log(`${c.word} (L:${c.length}, N:${c.count}, Islam:${c.islamCount}/${c.count}=${c.islamPercent.toFixed(0)}%)${marker} -> ${c.subWords.join(', ')}${islamWords}`);
    });
}

analyze();
