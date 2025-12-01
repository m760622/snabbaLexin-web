const fs = require('fs');

// Load the file content
const dataFilePath = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/wordConnectData.js';
const fileContent = fs.readFileSync(dataFilePath, 'utf8');

// Mock the data structures to evaluate them safely
let WC_THEMES = [];
let SWEDISH_DATA = [];
let WC_DICTIONARY = [];

// Extract WC_THEMES
const themesMatch = fileContent.match(/const WC_THEMES = (\[[\s\S]*?\]);\s*\/\//);
if (themesMatch) {
    eval('WC_THEMES = ' + themesMatch[1]);
}

// Extract SWEDISH_DATA
const swedishDataMatch = fileContent.match(/const SWEDISH_DATA = (\[[\s\S]*?\]);\s*\/\//);
if (swedishDataMatch) {
    eval('SWEDISH_DATA = ' + swedishDataMatch[1]);
}

// Extract WC_DICTIONARY
const dictMatch = fileContent.match(/const WC_DICTIONARY = (\[[\s\S]*?\]);/);
if (dictMatch) {
    eval('WC_DICTIONARY = ' + dictMatch[1]);
}

// Map to store unique words
const uniqueWords = new Map();

// 1. Process existing WC_DICTIONARY
WC_DICTIONARY.forEach(entry => {
    uniqueWords.set(entry.w, entry);
});

// 2. Process WC_THEMES words
WC_THEMES.forEach(theme => {
    if (theme.words) {
        theme.words.forEach(wordObj => {
            if (!uniqueWords.has(wordObj.word)) {
                // Create new entry if not exists
                // Note: Missing translation and Arabic sentence, marking for manual review if needed
                uniqueWords.set(wordObj.word, {
                    w: wordObj.word,
                    t: "TODO_TRANSLATION",
                    s: wordObj.sentence,
                    st: "TODO_ARABIC_SENTENCE"
                });
            } else {
                // Update sentence if missing in dictionary but present in theme
                const entry = uniqueWords.get(wordObj.word);
                if (!entry.s && wordObj.sentence) {
                    entry.s = wordObj.sentence;
                }
            }
        });
    }
});

// 3. Process SWEDISH_DATA words
SWEDISH_DATA.forEach(level => {
    if (level.dictionary) {
        Object.keys(level.dictionary).forEach(word => {
            const data = level.dictionary[word];
            if (!uniqueWords.has(word)) {
                uniqueWords.set(word, {
                    w: word,
                    t: data.ar.split('/')[0], // Take first translation
                    s: data.sv,
                    st: "TODO_ARABIC_SENTENCE"
                });
            }
        });
    }
});

// Convert back to array and sort
const sortedDictionary = Array.from(uniqueWords.values()).sort((a, b) => a.w.localeCompare(b.w));

// Output the new dictionary JSON
console.log(JSON.stringify(sortedDictionary, null, 4));
