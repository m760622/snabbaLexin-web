const fs = require('fs');

const LEXIN_PATH = 'Lexin20210201.csv';

// Daily life keywords
const DAILY_KEYWORDS = new Set([
    // Home items
    "BORD", "VÄGG", "TAK", "GOLV", "FÖNSTER", "DÖRR", "SPEGEL",
    "GARDIN", "LAMPA", "LJUS", "STOL", "SÄNG", "SOFFA",

    // Activities
    "STÄDA", "TORKA", "TVÄTTA", "DISKA", "LAGA", "ÄTA", "SOVA",
    "VAKNA", "LÄSA", "SKRIVA", "RINGA", "TITTA", "LYSSNA",

    // Time
    "DAG", "MORGON", "KVÄLL", "NATT", "TIMME", "MINUT",

    // Common
    "HEM", "MAT", "DRYCK", "KLÄDER", "PENGAR", "NÄR", "VAR",
    "ORD", "SPEL", "MUSIK", "BOK",

    // Places
    "GATA", "BUTIK", "PARK", "ALTAN", "TRÄDGÅRD"
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

    const problemWords = ['BRO', 'JUL', 'SJU'];

    const candidates = [];

    for (let mainWord of DAILY_KEYWORDS) {
        if (!dictionary.has(mainWord)) continue;
        if (mainWord.length < 4 || mainWord.length > 7) continue;

        const allSubWords = getSubWords(mainWord, dictionary);
        const dailySubWords = allSubWords.filter(sw => DAILY_KEYWORDS.has(sw));

        const hasProblematic = allSubWords.some(w => problemWords.includes(w));

        if (allSubWords.length >= 2 && !hasProblematic && allSubWords.length <= 5) {
            const dailyPercent = allSubWords.length > 0 ? (dailySubWords.length / allSubWords.length) * 100 : 0;
            candidates.push({
                word: mainWord,
                subWords: allSubWords,
                dailySubWords: dailySubWords,
                count: allSubWords.length,
                dailyCount: dailySubWords.length,
                dailyPercent: dailyPercent,
                length: mainWord.length
            });
        }
    }

    candidates.sort((a, b) => {
        if (Math.abs(a.dailyPercent - b.dailyPercent) > 10) {
            return b.dailyPercent - a.dailyPercent;
        }
        return a.count - b.count; // Prefer fewer total words
    });

    console.log("=== CLEAN DAILY WORDS (No BRO, JUL, SJU) ===\n");
    console.log("Need replacements for:");
    console.log("- BORD (has BRO)");
    console.log("- LJUS (has JUL, SJU)\n");

    candidates.slice(0, 30).forEach(c => {
        const dailyWords = c.dailySubWords.length > 0 ? ` [DAILY: ${c.dailySubWords.join(', ')}]` : '';
        console.log(`${c.word} (L:${c.length}, N:${c.count}, Daily:${c.dailyCount}/${c.count}=${c.dailyPercent.toFixed(0)}%) -> ${c.subWords.join(', ')}${dailyWords}`);
    });
}

analyze();
