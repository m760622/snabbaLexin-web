const fs = require('fs');

const LEXIN_PATH = 'Lexin20210201.csv';

// Chapter 1 Words (Main Words)
const CHAPTER_1_WORDS = [
    "KAKA", "ÄTA", "KAFFE", "OLJA", "BULLE",
    "KOCK", "BÖNA", "OST", "LUNCH", "RIS"
];

// Food Theme Keywords (from generate_new_levels.js)
const FOOD_KEYWORDS = [
    "mat", "äta", "dryck", "smak", "koka", "steka", "restaurang", "kök",
    "frukt", "grönsak", "bröd", "vatten", "kaffe", "te", "lunch", "middag",
    "frukost", "hungrig", "mätt", "recept", "skål", "tallrik", "glas", "kopp",
    "äpple", "banan", "bär", "kaka", "tårta", "glass", "ost", "smör", "mjölk",
    "kött", "fisk", "kyckling", "krydda", "salt", "socker", "peppar",
    "طعام", "أكل", "شرب", "مذاق", "طبخ", "قلي", "مطعم", "مطبخ", "فاكهة",
    "خضار", "خبز", "ماء", "قهوة", "شاي", "غداء", "عشاء", "فطور", "جائع",
    "شبعان", "وصفة", "وعاء", "صحن", "كأس", "كوب", "تفاح", "موز", "توت",
    "كعكة", "تورتة", "بوظة", "جبن", "زبدة", "حليب", "لحم", "سمك", "دجاج",
    "بهار", "ملح", "سكر", "فلفل"
];

function loadDictionary() {
    console.log("Loading dictionary...");
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

    // Helper to generate permutations
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

function checkTheme(word, keywords) {
    // Simple check: is the word itself a keyword?
    // Or does it contain a keyword? (Might be too broad)
    // Let's stick to exact match or containment of root.
    const lowerWord = word.toLowerCase();
    return keywords.some(k => lowerWord.includes(k) || k.includes(lowerWord));
}

function analyze() {
    const dictionary = loadDictionary();
    console.log(`Dictionary loaded with ${dictionary.size} words.`);

    console.log("\n--- Analyzing Chapter 1 Sub-words ---\n");

    CHAPTER_1_WORDS.forEach(mainWord => {
        console.log(`\nMain Word: ${mainWord}`);
        const subWords = getSubWords(mainWord, dictionary);

        const nonThematic = subWords.filter(sw => !checkTheme(sw, FOOD_KEYWORDS));

        if (nonThematic.length > 0) {
            console.log(`  Found ${nonThematic.length} non-thematic sub-words:`);
            console.log(`  ${nonThematic.join(', ')}`);
        } else {
            console.log("  All sub-words fit the theme!");
        }
    });
}

analyze();
