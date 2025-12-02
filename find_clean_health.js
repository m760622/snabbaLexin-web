const fs = require('fs');

const LEXIN_PATH = 'Lexin20210201.csv';

// Health keywords
const HEALTH_KEYWORDS = new Set([
    // Body parts
    "TAND", "ARM", "BEN", "HAND", "FINGER", "HÄL", "HALS", "HUVUD",
    "HJÄRTA", "LUNGA", "LEVER", "NJURE", "TARM", "HANDLED", "LED",
    "MAGE", "RYGG", "ÖGA", "ÖRA", "MUSKLER", "VAD",

    // Health conditions
    "HÄLSA", "SJUK", "FRISK", "SJUKDOM", "FEBER", "PULS", "KRAMP",
    "SMÄRTA", "ONT", "GRAVID", "SÅR",

    // Medical
    "LÄKARE", "DOKTOR", "RECEPT", "MEDICIN", "PILLER", "SALVA",
    "BANDAGE", "PLÅSTER", "SPRUTAS", "DNA",

    // Actions
    "ANDAS", "VILA", "BLÖDA", "TRÄNA"
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

    const problemWords = ['LUS', 'KRAM', 'KAM', 'BRE', 'BER', 'GRAV', 'GAV',
        'ANDE', 'PET', 'MER', 'ER', 'KOS', 'MUS', 'SUM'];

    const candidates = [];

    for (let mainWord of HEALTH_KEYWORDS) {
        if (!dictionary.has(mainWord)) continue;
        if (mainWord.length < 4 || mainWord.length > 7) continue;

        const allSubWords = getSubWords(mainWord, dictionary);
        const healthSubWords = allSubWords.filter(sw => HEALTH_KEYWORDS.has(sw));

        const hasProblematic = allSubWords.some(w => problemWords.includes(w));

        if (allSubWords.length >= 2 && !hasProblematic && allSubWords.length <= 6) {
            const healthPercent = allSubWords.length > 0 ? (healthSubWords.length / allSubWords.length) * 100 : 0;
            candidates.push({
                word: mainWord,
                subWords: allSubWords,
                healthSubWords: healthSubWords,
                count: allSubWords.length,
                healthCount: healthSubWords.length,
                healthPercent: healthPercent,
                length: mainWord.length
            });
        }
    }

    candidates.sort((a, b) => {
        if (Math.abs(a.healthPercent - b.healthPercent) > 10) {
            return b.healthPercent - a.healthPercent;
        }
        return a.count - b.count;
    });

    console.log("=== CLEAN HEALTH WORDS ===\n");
    console.log("Worst levels to replace:");
    console.log("- SJUKDOM (has KOS, MUS, SUM)");
    console.log("- RECEPT (has PET, MER, ER)");
    console.log("- FEBER (has BRE, BER)");
    console.log("- KRAMP (has KRAM, KAM)");
    console.log("- GRAVID (has GRAV, GAV)\n");

    candidates.slice(0, 30).forEach(c => {
        const healthWords = c.healthSubWords.length > 0 ? ` [HEALTH: ${c.healthSubWords.join(', ')}]` : '';
        console.log(`${c.word} (L:${c.length}, N:${c.count}, Health:${c.healthCount}/${c.count}=${c.healthPercent.toFixed(0)}%) -> ${c.subWords.join(', ')}${healthWords}`);
    });
}

analyze();
