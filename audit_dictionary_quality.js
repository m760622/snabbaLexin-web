const fs = require('fs');
const path = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/wordConnectData.js';

try {
    const content = fs.readFileSync(path, 'utf8');

    // We need to extract WC_PREDEFINED_LEVELS and WC_DICTIONARY
    // Since we can't easily require the file (it might depend on browser globals), we'll use eval in a sandbox or just regex parsing if simple enough.
    // The file seems to be just data structures. Let's try eval with mocks.

    const sandbox = {
        WC_PREDEFINED_LEVELS: {},
        WC_DICTIONARY: [],
        console: console
    };

    // Naive eval might fail if there are other dependencies.
    // Let's try to extract the objects using regex or just assume standard JS format and use Function.
    // Actually, let's try to just run it with node, mocking what's needed.

    // We'll wrap the content in a function to avoid global scope pollution if we were running in a larger app, 
    // but here we are a standalone script.

    // Mock any potential missing globals if necessary. 
    // Based on previous views, it seems self-contained or depends on nothing.

    // Replace const declarations with global assignments to make them accessible after eval
    const modifiedContent = content
        .replace(/const WC_PREDEFINED_LEVELS =/, 'global.WC_PREDEFINED_LEVELS =')
        .replace(/const WC_DICTIONARY =/, 'global.WC_DICTIONARY =')
        .replace(/const WC_ROOT_WORDS =/, 'global.WC_ROOT_WORDS ='); // Handle this one too just in case

    eval(modifiedContent);

    const levels = global.WC_PREDEFINED_LEVELS;
    const dictionary = global.WC_DICTIONARY;

    if (!levels || !dictionary) {
        console.error("Could not load data.");
        process.exit(1);
    }

    // 1. Collect all used words
    const usedWords = new Set();
    for (const key in levels) {
        const level = levels[key];
        if (level.words) {
            level.words.forEach(w => usedWords.add(w));
        }
    }

    console.log(`Total unique words used in levels: ${usedWords.size}`);

    // 2. Check dictionary coverage and quality
    const missingWords = [];
    const poorQualityWords = []; // Sentence too short, missing translation, etc.

    const dictMap = new Map();
    dictionary.forEach(entry => {
        dictMap.set(entry.w, entry);
    });

    usedWords.forEach(word => {
        const entry = dictMap.get(word);

        if (!entry) {
            missingWords.push(word);
        } else {
            // Check quality
            const sentence = entry.s || "";
            const translation = entry.st || "";
            const wordCount = sentence.split(' ').filter(w => w.length > 0).length;

            const issues = [];
            if (wordCount < 4) issues.push(`Sentence too short (${wordCount} words): "${sentence}"`);
            if (!translation) issues.push("Missing translation");
            // We can't easily check for "professional translation" programmatically, but presence is a start.

            if (issues.length > 0) {
                poorQualityWords.push({ word, issues });
            }
        }
    });

    console.log(`Missing from dictionary: ${missingWords.length}`);
    if (missingWords.length > 0) {
        console.log("Missing words:", missingWords.join(", "));
    }

    console.log(`Poor quality entries: ${poorQualityWords.length}`);
    if (poorQualityWords.length > 0) {
        poorQualityWords.forEach(item => {
            console.log(`- ${item.word}: ${item.issues.join(", ")}`);
        });
    }

    if (missingWords.length === 0 && poorQualityWords.length === 0) {
        console.log("✅ All words pass the audit!");
    } else {
        console.log("❌ Audit failed.");
    }

} catch (e) {
    console.error("Error running audit:", e);
}
