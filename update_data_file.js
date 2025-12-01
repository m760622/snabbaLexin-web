const fs = require('fs');

const DATA_FILE = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/wordConnectData.js';
const NEW_DATA_FILE = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/new_level_data.json';

const newData = JSON.parse(fs.readFileSync(NEW_DATA_FILE, 'utf8'));
let fileContent = fs.readFileSync(DATA_FILE, 'utf8');

// 1. Extract existing dictionary to preserve quality
const oldDictMatch = fileContent.match(/const WC_DICTIONARY = \[\s*([\s\S]*?)\];/);
const oldDictMap = new Map();
if (oldDictMatch) {
    // This is a bit hacky to parse JS object literal, but let's try to be safe.
    // Actually, since it's a JS file, we can't just JSON.parse the match.
    // We might need to rely on the fact that the file is valid JS.
    // Let's try to extract the array content and eval it (safe enough here as it's our own file).
    // Or better, just require the file? No, it has other consts.

    // Let's use a regex to extract individual objects roughly?
    // Or just use the new data and only overwrite if we find a match in the text?
    // Parsing the old file reliably is hard without `require`.
    // Let's try to `require` the file?
    // We need to export the constants to require them. The file probably doesn't export.

    // Alternative: Read the file, find the `WC_DICTIONARY` block, and parse it manually or use a simple regex for `w: "WORD"`.
    // The format is consistent: { w: "WORD", t: "...", ... },

    const lines = oldDictMatch[1].split('\n');
    lines.forEach(line => {
        const wMatch = line.match(/w:\s*"([^"]+)"/);
        if (wMatch) {
            oldDictMap.set(wMatch[1], line.trim());
        }
    });
}

// 2. Prepare new dictionary string
const newDictLines = newData.dictionary.map(item => {
    // Always use new data from generator (which includes manual overrides)
    return `    { w: "${item.w}", t: "${item.t}", s: "${item.s}", st: "${item.st}" },`;
});

const newDictString = `const WC_DICTIONARY = [\n${newDictLines.join('\n')}\n];`;

// 3. Prepare new levels string
// We need to format the levels object to look like the existing one
const levelLines = [];
// Sort keys to ensure order 1-1 to 10-10
const sortedKeys = Object.keys(newData.levels).sort((a, b) => {
    const [c1, l1] = a.split('-').map(Number);
    const [c2, l2] = b.split('-').map(Number);
    if (c1 !== c2) return c1 - c2;
    return l1 - l2;
});

let currentChapter = 0;
const chapterNames = [
    "Mat & Dryck (Food & Drink) 🍎",
    "Naturen (Nature) 🌲",
    "Resor (Travel) ✈️",
    "Vardag (Daily Life) 🏠",
    "Mat & Dryck (Advanced) 🍎",
    "Naturen (Advanced) 🌲",
    "Resor (Advanced) ✈️",
    "Vardag (Advanced) 🏠",
    "Familj (Family) 👨‍👩‍👧‍👦",
    "Skola (School) 📚"
];

levelLines.push('const WC_PREDEFINED_LEVELS = {');

sortedKeys.forEach(key => {
    const [chapter, level] = key.split('-').map(Number);

    // Add chapter header if new chapter
    if (chapter !== currentChapter) {
        currentChapter = chapter;
        levelLines.push('');
        levelLines.push('    // ===========================================');
        levelLines.push(`    // CHAPTER ${chapter}: ${chapterNames[chapter - 1] || 'Chapter ' + chapter}`);
        levelLines.push('    // ===========================================');
    }

    const lvl = newData.levels[key];
    const lettersStr = `["${lvl.letters.join('", "')}"]`;
    const wordsStr = `["${lvl.words.join('", "')}"]`;
    const validWordsStr = `["${lvl.validWords.join('", "')}"]`;

    levelLines.push(`    "${key}": { letters: ${lettersStr}, words: ${wordsStr}, validWords: ${validWordsStr} },`);
});

levelLines.push('};');
const newLevelsString = levelLines.join('\n');

// 4. Replace in file
// Replace WC_PREDEFINED_LEVELS
fileContent = fileContent.replace(
    /const WC_PREDEFINED_LEVELS = \{[\s\S]*?\};/,
    newLevelsString
);

// Replace WC_DICTIONARY
fileContent = fileContent.replace(
    /const WC_DICTIONARY = \[[\s\S]*?\];/,
    newDictString
);

// 5. Write back
fs.writeFileSync(DATA_FILE, fileContent);
console.log('Successfully updated wordConnectData.js');
