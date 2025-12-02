const fs = require('fs');

const LEXIN_PATH = 'Lexin20210201.csv';

// Food keywords - comprehensive list
const FOOD_KEYWORDS = new Set([
    // Basics
    "MAT", "ÄTER", "DRYCK", "DRICKA", "ÄTA",

    // Proteins
    "KÖTT", "FISK", "ÄGG", "TORSK", "LAX", "SIK", "KÖTTFÄRS", "FÄRS",
    "KYCKLING", "KALKON", "KORV", "SKINKA", "BACON",

    // Dairy
    "MJÖLK", "OST", "SMÖR", "GRÄDDE", "YOGHURT", "FIL",

    // Vegetables
    "GRÖNSAK", "KÅL", "POTATIS", "MOROT", "LÖK", "TOMAT", "GURKA",
    "SALLAD", "ÄRTOR", "ÄRT", "BÖNA", "BÖNOR",

    // Fruits
    "FRUKT", "ÄPPLE", "BANAN", "PÄRON", "APELSIN", "BÄR", "BÄREN",
    "HALLON", "JORDGUBBE", "BLÅBÄR",

    // Grains/Baking
    "BRÖD", "MJÖL", "PASTA", "RIS", "GRÖT", "FLINGOR", "HAVRE",
    "VETE", "RÅG", "KORN",

    // Sweets
    "SOCKER", "SÖT", "KAKA", "KAKOR", "TÅRTA", "BULLE", "GODIS",

    // Cooking
    "LAGA", "KOKA", "STEKA", "BAKA", "KOK", "FÄRSK", "SÖTA",

    // Utensils/Containers
    "SKÅL", "FAT", "TALLRIK", "GLAS", "KOPP",

    // Herbs/Spices
    "ÖRT", "KRYDDA", "SALT", "PEPPAR",

    // Other
    "SÅS", "SOPPA", "SAFT", "TE", "KAFFE"
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
    const candidates = [];

    for (let mainWord of FOOD_KEYWORDS) {
        if (!dictionary.has(mainWord)) continue;
        if (mainWord.length < 4 || mainWord.length > 7) continue;

        const allSubWords = getSubWords(mainWord, dictionary);
        const foodSubWords = allSubWords.filter(sw => FOOD_KEYWORDS.has(sw));

        // Check if it has problematic words
        const hasProblematic = allSubWords.some(w => ['ASP', 'RÖR', 'ÖRA', 'RO'].includes(w));

        if (allSubWords.length >= 2 && !hasProblematic) {
            const foodPercent = allSubWords.length > 0 ? (foodSubWords.length / allSubWords.length) * 100 : 0;
            candidates.push({
                word: mainWord,
                subWords: allSubWords,
                foodSubWords: foodSubWords,
                count: allSubWords.length,
                foodCount: foodSubWords.length,
                foodPercent: foodPercent,
                length: mainWord.length
            });
        }
    }

    candidates.sort((a, b) => {
        if (Math.abs(a.foodPercent - b.foodPercent) > 10) {
            return b.foodPercent - a.foodPercent;
        }
        return b.count - a.count;
    });

    console.log("=== CLEAN FOOD WORDS (No ASP, RÖR, ÖRA, RO) ===\n");
    console.log("Looking for replacements for:");
    console.log("- PASTA (has ASP)");
    console.log("- ÄRTOR (has RÖR, ÖRA)");
    console.log("- KAKOR (has RO)\n");

    candidates.slice(0, 40).forEach(c => {
        const foodWords = c.foodSubWords.length > 0 ? ` [FOOD: ${c.foodSubWords.join(', ')}]` : '';
        console.log(`${c.word} (L:${c.length}, N:${c.count}, Food:${c.foodCount}/${c.count}=${c.foodPercent.toFixed(0)}%) -> ${c.subWords.join(', ')}${foodWords}`);
    });
}

analyze();
