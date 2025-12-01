const fs = require('fs');

const LEXIN_PATH = 'Lexin20210201.csv';

// Food Theme Keywords (Broad list)
const FOOD_KEYWORDS = [
    "MAT", "ÄTA", "DRYCK", "SMAK", "KOKA", "STEKA", "RESTAURANG", "KÖK",
    "FRUKT", "GRÖNSAK", "BRÖD", "VATTEN", "KAFFE", "TE", "LUNCH", "MIDDAG",
    "FRUKOST", "HUNGRIG", "MÄTT", "RECEPT", "SKÅL", "TALLRIK", "GLAS", "KOPP",
    "ÄPPLE", "BANAN", "BÄR", "KAKA", "TÅRTA", "GLASS", "OST", "SMÖR", "MJÖLK",
    "KÖTT", "FISK", "KYCKLING", "KRYDDA", "SALT", "SOCKER", "PEPPAR",
    "LAX", "SILL", "TORSK", "RÄKA", "KRÄFTA", "HUMMER", "MUSSLA", "OSTRON",
    "BIFE", "STEK", "FÄRS", "SKINKA", "KORV", "BACON", "LEVER", "BLODPUDDING",
    "PANNKAKA", "VÅFFLA", "PAJ", "PIZZA", "PASTA", "RIS", "POTATIS", "MOS",
    "SOPPA", "SÅS", "GRYT", "SALLAD", "TOMAT", "GURKA", "LÖK", "VITLÖK",
    "MOROT", "KÅL", "BÖNA", "ÄRT", "MAJS", "SVAMP", "BÄR", "JORDGUBBE",
    "HALLON", "BLÅBÄR", "LINGON", "HJORTRON", "CITRON", "APELSIN", "PÄRON",
    "DRUVA", "PLOMMON", "KÖRSBÄR", "PERSIKA", "ANANAS", "MELON",
    "BULLE", "KAKOR", "KEX", "CHOKLAD", "GODIS", "CHIPS", "NÖT",
    "SAFT", "LÄSK", "ÖL", "VIN", "SPRIT", "MJÖL", "GRYN", "OLJA", "VINÄGER"
];

// Problematic sub-words to avoid if possible
const BAD_SUBWORDS = new Set([
    "TAM", "KÖL", "DÖR", "SKAM", "MASK", "TRÖG", "DÖD", "HAT", "HOT", "FEL", "FUL",
    "LOJ", "ULL", "BÖN", "SOT", "STO", "GNYR", "AS", "SOP"
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

    // Filter dictionary for potential main words (must be in FOOD_KEYWORDS or contain them?)
    // Actually, let's just check the FOOD_KEYWORDS list itself as candidates.

    const candidates = [];

    for (let mainWord of FOOD_KEYWORDS) {
        if (!dictionary.has(mainWord)) continue;
        if (mainWord.length < 3 || mainWord.length > 7) continue; // Keep reasonable length

        const subWords = getSubWords(mainWord, dictionary);
        if (subWords.length < 2) continue; // Need at least 2 words for a level

        // Check for bad subwords
        const hasBad = subWords.some(sw => BAD_SUBWORDS.has(sw));

        // Check theme of subwords
        const thematicSubWords = subWords.filter(sw => FOOD_KEYWORDS.includes(sw));
        const score = thematicSubWords.length / subWords.length;

        candidates.push({
            word: mainWord,
            subWords: subWords,
            thematicCount: thematicSubWords.length,
            totalCount: subWords.length,
            score: score,
            hasBad: hasBad,
            badWords: subWords.filter(sw => BAD_SUBWORDS.has(sw))
        });
    }

    // Sort by Score (desc) then Total Count (desc)
    candidates.sort((a, b) => {
        if (a.hasBad !== b.hasBad) return a.hasBad ? 1 : -1; // Prefer no bad words
        if (b.score !== a.score) return b.score - a.score;
        return b.totalCount - a.totalCount;
    });

    console.log("--- Top 20 Candidates ---");
    candidates.slice(0, 20).forEach(c => {
        console.log(`\nWORD: ${c.word} (Score: ${c.score.toFixed(2)})`);
        console.log(`  Sub-words (${c.totalCount}): ${c.subWords.join(', ')}`);
        if (c.hasBad) console.log(`  BAD: ${c.badWords.join(', ')}`);
    });
}

analyze();
