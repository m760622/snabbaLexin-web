const fs = require('fs');

const LEXIN_PATH = 'Lexin20210201.csv';

// Expanded Food Keywords
const FOOD_KEYWORDS = new Set([
    "MAT", "ÄTA", "DRYCK", "SMAK", "KOKA", "STEKA", "RESTAURANG", "KÖK",
    "FRUKT", "GRÖNSAK", "BRÖD", "VATTEN", "KAFFE", "TE", "LUNCH", "MIDDAG",
    "FRUKOST", "HUNGRIG", "MÄTT", "RECEPT", "SKÅL", "TALLRIK", "GLAS", "KOPP",
    "ÄPPLE", "BANAN", "BÄR", "KAKA", "TÅRTA", "GLASS", "OST", "SMÖR", "MJÖLK",
    "KÖTT", "FISK", "KYCKLING", "KRYDDA", "SALT", "SOCKER", "PEPPAR",
    "LAX", "SILL", "TORSK", "RÄKA", "KRÄFTA", "HUMMER", "MUSSLA", "OSTRON",
    "BIFF", "STEK", "FÄRS", "SKINKA", "KORV", "BACON", "LEVER", "BLODPUDDING",
    "PANNKAKA", "VÅFFLA", "PAJ", "PIZZA", "PASTA", "RIS", "POTATIS", "MOS",
    "SOPPA", "SÅS", "GRYT", "SALLAD", "TOMAT", "GURKA", "LÖK", "VITLÖK",
    "MOROT", "KÅL", "BÖNA", "ÄRT", "MAJS", "SVAMP", "BÄR", "JORDGUBBE",
    "HALLON", "BLÅBÄR", "LINGON", "HJORTRON", "CITRON", "APELSIN", "PÄRON",
    "DRUVA", "PLOMMON", "KÖRSBÄR", "PERSIKA", "ANANAS", "MELON",
    "BULLE", "KAKOR", "KEX", "CHOKLAD", "GODIS", "CHIPS", "NÖT",
    "SAFT", "LÄSK", "ÖL", "VIN", "SPRIT", "MJÖL", "GRYN", "OLJA", "VINÄGER",
    "SIK", "ÖRT", "RÅ", "ROT", "KOR", "DEG", "FIL", "HONUNG", "IS", "JÄST",
    "KEX", "LÅR", "LÖKAR", "OSTAR", "BULLAR", "SOPPOR", "SÅSER", "BÄREN",
    "KORVAR", "LAXAR", "FISKAR", "GRÖT", "LIMPA", "LIMPOR", "MÜSLI", "YOGHURT"
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

    // Check all words in dictionary that contain our keywords or ARE our keywords
    // Actually, let's just iterate our keywords and their plurals/forms if they are in dict

    // Also check dictionary for words that contain food keywords as substrings?
    // No, let's stick to the explicit list + dictionary validation.

    // Let's expand the search to ALL dictionary words, but score them by how many FOOD subwords they have.
    // This is expensive (permute on 30k words).
    // Let's restrict to words that start with or contain a food keyword?
    // Or just iterate the FOOD_KEYWORDS list and try to find "Super Words" (e.g. Plurals).

    const searchList = Array.from(FOOD_KEYWORDS);
    // Add plurals manually if not present
    const plurals = searchList.map(w => w + "AR").concat(searchList.map(w => w + "ER")).concat(searchList.map(w => w + "OR")).concat(searchList.map(w => w + "EN"));

    const allSearch = new Set([...searchList, ...plurals]);

    for (let mainWord of allSearch) {
        if (!dictionary.has(mainWord)) continue;
        if (mainWord.length < 3 || mainWord.length > 8) continue; // Keep reasonable length

        const subWords = getSubWords(mainWord, dictionary);
        if (subWords.length < 2) continue;

        const foodSubWords = subWords.filter(sw => FOOD_KEYWORDS.has(sw));
        const score = foodSubWords.length / subWords.length;

        // We want high score AND reasonable number of words
        if (foodSubWords.length >= 1) {
            candidates.push({
                word: mainWord,
                subWords: subWords,
                foodSubWords: foodSubWords,
                score: score,
                total: subWords.length
            });
        }
    }

    // Sort by Score (desc), then Food Count (desc)
    candidates.sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return b.foodSubWords.length - a.foodSubWords.length;
    });

    console.log("--- Top 20 Pure Food Candidates ---");
    candidates.slice(0, 20).forEach(c => {
        console.log(`\nWORD: ${c.word} (Score: ${c.score.toFixed(2)})`);
        console.log(`  Food Sub-words: ${c.foodSubWords.join(', ')}`);
        console.log(`  All Sub-words: ${c.subWords.join(', ')}`);
    });
}

analyze();
