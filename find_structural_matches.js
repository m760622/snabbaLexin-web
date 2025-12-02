
const fs = require('fs');

const dataFilePath = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/wordConnectData.js';
const fileContent = fs.readFileSync(dataFilePath, 'utf8');

const dictMatch = fileContent.match(/const WC_DICTIONARY = (\[[\s\S]*\])\s*;/);
let WC_DICTIONARY;
eval('WC_DICTIONARY = ' + dictMatch[1]);

function canFormWord(word, letters) {
    const wordChars = word.split('');
    const letterCounts = {};
    letters.forEach(l => letterCounts[l] = (letterCounts[l] || 0) + 1);
    for (const char of wordChars) {
        if (!letterCounts[char]) return false;
        letterCounts[char]--;
    }
    return true;
}

function checkSentenceQuality(entry, word) {
    if (!entry || !entry.s || !entry.t) return false;
    if (entry.s.split(' ').length < 4) return false;
    const cleanSentence = entry.s.toLowerCase().replace(/[.,!?]/g, '');
    return cleanSentence.split(' ').includes(word.toLowerCase());
}

const FORBIDDEN_WORDS = [
    // Chapter 3 (Finalized)
    "RESA", "PASS", "BERG", "BOKAS", "SPÅRA", "ASTER", "FÄRDEN", "VÄDRET", "PENGAR", "UTFLYKT",
    // Words from other chapters currently in use (to be replaced, but avoid for now)
    "SOLA", "TRÄD", "LÖVA", "BÖLJA", "MYROR", "REGNA", "GRENAR", "SVALLA", "STJÄRNA", // Ch 2
    "TAK", "BORD", "UGN", "LAMPA", "VASER", "BADAR", "GARDIN", "LAKAN", "SKEDAR", "BALKONG", // Ch 4
    "NACKE", "RYGG", "BLOD", "HÄLSA", "LEVER", "PANNA", "TÄNDER", "HALSEN", "LÅRET", "ANSIKTE", // Ch 5
    "ELEV", "PROV", "LÄRA", "KLASS", "SKRIV", "TENTA", "RASTER", "SKOLAN", "RÄKNAR", "STUDENT", // Ch 6
    "KÖPA", "PRIS", "DYRA", "VAROR", "VÄSKA", "SIDEN", "SKORNA", "KLÄDER", "KOSTAR", "SKJORTA", // Ch 7
    "TÅGA", "BILA", "BUSS", "LASTA", "KANOT", "KÖRAS", "BUSSAR", "TRAFIK", "SEGLAR", "LASTBIL", // Ch 8
    "DOM", "RÄTT", "SPÅR", "BROTT", "LAGAR", "HÄKTE", "DOMARE", "ARREST", "FÅNGAR", "DOMSTOL", // Ch 9
    "TRO", "BÖN", "GUD", "ANDE", "FRID", "SJÄL", "PASTOR", "ÄNGLAR", "KYRKAN", "KRISTUS" // Ch 10
];

console.log("Searching for structural matches...");

// Levels 4-6: 3 words, 4-5 letters
console.log("\n--- Candidates for Levels 4-6 (3 words, 4-5 letters) ---");
for (const entry of WC_DICTIONARY) {
    const mainWord = entry.w;
    if (mainWord.length !== 5) continue; // Main word must be 5 to allow 5 letter targets
    if (FORBIDDEN_WORDS.includes(mainWord)) continue;
    if (!checkSentenceQuality(entry, mainWord)) continue;

    const wheelLetters = mainWord.split('');
    const targets = WC_DICTIONARY.filter(e => {
        if (e.w.length < 4 || e.w.length > 5) return false;
        if (FORBIDDEN_WORDS.includes(e.w)) return false;
        if (!canFormWord(e.w, wheelLetters)) return false;
        if (!checkSentenceQuality(e, e.w)) return false;
        return true;
    });

    if (targets.length >= 3) {
        console.log(`${mainWord}: ${targets.map(t => t.w).join(', ')}`);
    }
}

// Levels 7-9: 4 words, 5-6 letters
console.log("\n--- Candidates for Levels 7-9 (4 words, 5-6 letters) ---");
for (const entry of WC_DICTIONARY) {
    const mainWord = entry.w;
    if (mainWord.length !== 6) continue;
    if (FORBIDDEN_WORDS.includes(mainWord)) continue;
    if (!checkSentenceQuality(entry, mainWord)) continue;

    const wheelLetters = mainWord.split('');
    const targets = WC_DICTIONARY.filter(e => {
        if (e.w.length < 5 || e.w.length > 6) return false;
        if (FORBIDDEN_WORDS.includes(e.w)) return false;
        if (!canFormWord(e.w, wheelLetters)) return false;
        if (!checkSentenceQuality(e, e.w)) return false;
        return true;
    });

    if (targets.length >= 4) {
        console.log(`${mainWord}: ${targets.map(t => t.w).join(', ')}`);
    }
}
