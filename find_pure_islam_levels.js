const fs = require('fs');

const LEXIN_PATH = 'Lexin20210201.csv';

// Islamic/Religious keywords
const ISLAM_KEYWORDS = new Set([
    // Core Islamic terms
    "ISLAM", "MUSLIM", "MUSLIMER", "ALLAH", "GUD",
    "PROFET", "MUHAMMED", "KORAN", "KORANEN",

    // Pillars of Islam
    "BÖN", "BÖNER", "BEDER", "FASTA", "ZAKAT", "RAMADAN",

    // Religious concepts
    "TRO", "TRON", "TROR", "FRED", "FRID", "NÅD",
    "HELGON", "HELIG", "HELIGT", "HELGA",

    // Places
    "MOSKÉ", "MOSKÉN", "MOSKÉER", "MEKKA", "MEDINA",

    // Religious practices
    "DUA", "BED", "BEDER", "IMAM", "AMEN",

    // Related
    "FROMHET", "SANN", "REN", "RENA",

    // Arabic origin words in Swedish
    "SALAM", "ARK" // Noaks ark
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

    for (let mainWord of ISLAM_KEYWORDS) {
        if (!dictionary.has(mainWord)) continue;
        if (mainWord.length < 3 || mainWord.length > 7) continue;

        const allSubWords = getSubWords(mainWord, dictionary);
        const islamSubWords = allSubWords.filter(sw => ISLAM_KEYWORDS.has(sw));
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

    // Sort by islam percentage and count
    candidates.sort((a, b) => {
        if (Math.abs(a.islamPercent - b.islamPercent) > 10) {
            return b.islamPercent - a.islamPercent;
        }
        return b.count - a.count;
    });

    console.log("--- Islamic Candidates (Best Quality) ---");
    console.log("\n=== TOP CANDIDATES ===");
    candidates.slice(0, 50).forEach(c => {
        const islamWords = c.islamSubWords.length > 0 ? ` [ISLAM: ${c.islamSubWords.join(', ')}]` : '';
        console.log(`${c.word} (L:${c.length}, N:${c.count}, Islam:${c.islamCount}=${c.islamPercent.toFixed(0)}%) -> ${c.subWords.slice(0, 8).join(', ')}${c.subWords.length > 8 ? '...' : ''}${islamWords}`);
    });
}

analyze();
