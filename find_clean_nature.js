const fs = require('fs');

const LEXIN_PATH = 'Lexin20210201.csv';

// Nature keywords
const NATURE_KEYWORDS = new Set([
    // Weather
    "ÅSKA", "REGN", "SNÖ", "SOL", "VIND", "MOLN", "IS", "DIMMA",
    "STORM", "FROST", "ÅSKVÄDER",

    // Earth/Geography
    "STEN", "BERG", "FJÄLL", "DAL", "HAV", "SJÖ", "Å", "BÄCK",
    "HALVÖ", "ÖAR", "STRAND", "KLIPPA", "GROTTA",

    // Plants/Trees
    "TRÄD", "BLOM", "BLOMMA", "GRÄS", "BUSKE", "MOSSA", "SVAMP",
    "ASK", "EK", "TALL", "GRAN", "BJÖRK", "AL", "VID", "LÖV",
    "RÖNN", "ENAR", "LAV", "ÖRT", "ROTFRUKT",

    // Animals/Birds
    "FÅGEL", "FÅGLAR", "ÖRN", "HÄGER", "SVALA", "GÅS", "AND",
    "BJÖRN", "VARG", "RÄVEN", "ÄLGEN", "RENAR", "REN",
    "INSEKT", "MYRA", "MYROR", "BIN", "FISKE", "ROM",
    "VAL", "HAJAR",

    // Sky/Space
    "HIMMEL", "PLANET", "STJÄRNA", "MÅNE", "SOLEN",

    // Ecosystems
    "SKOG", "ÄNG", "MARK", "JORD", "DJUNGEL", "ÖKEN",

    // Descriptive
    "VILD", "NATURLIG", "GRÖN", "BLOMMANDE"
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

    // Problematic words to avoid
    const problemWords = ['SEN', 'REA', 'HEM', 'LIM', 'HEL', 'PLAN', 'EL', 'UGN', 'DEL'];

    const candidates = [];

    for (let mainWord of NATURE_KEYWORDS) {
        if (!dictionary.has(mainWord)) continue;
        if (mainWord.length < 3 || mainWord.length > 7) continue;

        const allSubWords = getSubWords(mainWord, dictionary);
        const natureSubWords = allSubWords.filter(sw => NATURE_KEYWORDS.has(sw));

        // Check if it has problematic words
        const hasProblematic = allSubWords.some(w => problemWords.includes(w));

        if (allSubWords.length >= 2 && !hasProblematic) {
            const naturePercent = allSubWords.length > 0 ? (natureSubWords.length / allSubWords.length) * 100 : 0;
            candidates.push({
                word: mainWord,
                subWords: allSubWords,
                natureSubWords: natureSubWords,
                count: allSubWords.length,
                natureCount: natureSubWords.length,
                naturePercent: naturePercent,
                length: mainWord.length
            });
        }
    }

    candidates.sort((a, b) => {
        if (Math.abs(a.naturePercent - b.naturePercent) > 10) {
            return b.naturePercent - a.naturePercent;
        }
        return b.count - a.count;
    });

    console.log("=== CLEAN NATURE WORDS (No SEN, REA, HEM, LIM, HEL, PLAN, EL, UGN, DEL) ===\n");
    console.log("Looking for replacements for:");
    console.log("- STEN (has SEN)");
    console.log("- RENAR (has REA)");
    console.log("- HIMMEL (has HEM, LIM, HEL)");
    console.log("- PLANET (has PLAN, EL)");
    console.log("- DJUNGEL (has UGN, DEL)\n");

    candidates.slice(0, 40).forEach(c => {
        const natureWords = c.natureSubWords.length > 0 ? ` [NATURE: ${c.natureSubWords.join(', ')}]` : '';
        console.log(`${c.word} (L:${c.length}, N:${c.count}, Nature:${c.natureCount}/${c.count}=${c.naturePercent.toFixed(0)}%) -> ${c.subWords.join(', ')}${natureWords}`);
    });
}

analyze();
