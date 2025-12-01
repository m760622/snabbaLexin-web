const fs = require('fs');

const dataFilePath = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/wordConnectData.js';
const fileContent = fs.readFileSync(dataFilePath, 'utf8');

// Extract WC_DICTIONARY
let WC_DICTIONARY = [];
const dictMatch = fileContent.match(/const WC_DICTIONARY = (\[[\s\S]*\])\s*;/);
if (dictMatch) {
    eval('WC_DICTIONARY = ' + dictMatch[1]);
}

console.log("Dictionary size:", WC_DICTIONARY.length);
if (WC_DICTIONARY.length > 0) {
    console.log("First 5 words:", WC_DICTIONARY.slice(0, 5).map(e => e.w));
    console.log("Does 'MAT' exist?", WC_DICTIONARY.some(e => e.w === 'MAT'));
    console.log("Does 'mat' exist?", WC_DICTIONARY.some(e => e.w === 'mat'));
}

const allWords = new Set(WC_DICTIONARY.map(e => e.w.toUpperCase())); // Ensure uppercase

const levels = [
    { id: "1-1", root: "MAT", letters: ["M", "A", "T"] },
    { id: "1-2", root: "OST", letters: ["O", "S", "T"] },
    { id: "1-3", root: "KOK", letters: ["K", "O", "K"] },
    { id: "1-4", root: "LÖK", letters: ["L", "Ö", "K"] },
    { id: "1-5", root: "BÄR", letters: ["B", "Ä", "R"] },
    { id: "1-6", root: "KAKA", letters: ["K", "A", "K", "A"] },
    { id: "1-7", root: "FISK", letters: ["F", "I", "S", "K"] },
    { id: "1-8", root: "KORV", letters: ["K", "O", "R", "V"] },
    { id: "1-9", root: "BRÖD", letters: ["B", "R", "Ö", "D"] },
    { id: "1-10", root: "GLAS", letters: ["G", "L", "A", "S"] }
];

function getSubsets(letters) {
    const results = new Set();
    const count = Math.pow(2, letters.length);
    for (let i = 0; i < count; i++) {
        let subset = "";
        for (let j = 0; j < letters.length; j++) {
            if ((i & (1 << j)) > 0) {
                subset += letters[j];
            }
        }
        if (subset.length >= 2) {
            // Permutations
            const perms = getPermutations(subset);
            perms.forEach(p => results.add(p));
        }
    }
    return Array.from(results);
}

function getPermutations(str) {
    if (str.length <= 1) return [str];
    const allPerms = [];
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        const remainingChars = str.slice(0, i) + str.slice(i + 1);
        const remainingPerms = getPermutations(remainingChars);
        for (const perm of remainingPerms) {
            allPerms.push(char + perm);
        }
    }
    return allPerms;
}

console.log("const NEW_LEVELS = {");
levels.forEach(lvl => {
    const subsets = getSubsets(lvl.letters);
    const valid = subsets.filter(w => allWords.has(w));
    // Ensure root word is in valid
    if (!valid.includes(lvl.root) && allWords.has(lvl.root)) valid.push(lvl.root);

    // Sort by length
    valid.sort((a, b) => a.length - b.length || a.localeCompare(b));

    // Select target words (simple heuristic: root + some others)
    const targets = valid.filter(w => w.length >= 2).slice(0, 5); // Limit targets

    console.log(`    "${lvl.id}": { letters: ${JSON.stringify(lvl.letters)}, words: ${JSON.stringify(targets)}, validWords: ${JSON.stringify(valid)} },`);
});
console.log("};");
