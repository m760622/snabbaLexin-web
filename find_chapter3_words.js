
const fs = require('fs');

const dataFilePath = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/wordConnectData.js';
const fileContent = fs.readFileSync(dataFilePath, 'utf8');

// Extract dictionary
const dictMatch = fileContent.match(/const WC_DICTIONARY = (\[[\s\S]*\])\s*;/);
if (!dictMatch) {
    console.error("Could not find WC_DICTIONARY");
    process.exit(1);
}
let WC_DICTIONARY;
try {
    eval('WC_DICTIONARY = ' + dictMatch[1]);
} catch (e) {
    console.error("Error parsing dictionary:", e);
    process.exit(1);
}

// Helper to check if a word can be formed from letters
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

// Helper to check sentence quality
function checkSentenceQuality(entry, word) {
    if (!entry || !entry.s || !entry.t) return false;
    const sentenceWords = entry.s.split(' ');
    if (sentenceWords.length < 4) return false;

    // Check if word exists as whole word (case insensitive, ignoring punctuation)
    const cleanSentence = entry.s.toLowerCase().replace(/[.,!?]/g, '');
    const cleanWord = word.toLowerCase();
    const words = cleanSentence.split(' ');
    return words.includes(cleanWord);
}

// Forbidden words (from other chapters)
const FORBIDDEN_WORDS = [
    "KARTA", "ARREST", "FISKAR", "TÅGA", "BILA", "LASTAR", "SEGLAR", "KÖRA",
    "LISTA", "SOLA", "RENAR", "LAKAN", "KANAL", "GALA", "HALS", "ELEV", "SKOLA", "RISK", "LÄDER", "SKROT", "LAST",
    "KOKA", "FIKA", "GRÖT", "SMÖRA", "RENSA", "SKÅLAR", "ROSTAR", "FRUKOST", // Ch 1
    "TRÄD", "LÖVA", "BÖLJA", "MYROR", "REGNA", "GRENAR", "SVALLA", "STJÄRNA", // Ch 2
    "TAK", "BORD", "UGN", "LAMPA", "VASER", "BADAR", "GARDIN", "SKEDAR", "BALKONG", // Ch 4
    "RYGG", "BLOD", "HÄLSA", "LEVER", "PANNA", "TÄNDER", "HALSEN", "LÅRET", "ANSIKTE", // Ch 5
    "PROV", "LÄRA", "SKRIV", "TENTA", "RASTER", "SKOLAN", "RÄKNAR", "STUDENT", // Ch 6
    "KÖPA", "PRIS", "DYRA", "VAROR", "VÄSKA", "SKORNA", "KLÄDER", "KOSTAR", "SKJORTA", // Ch 7
    "BUSS", "KANOT", "KÖRAS", "BUSSAR", "TRAFIK", "LASTBIL", // Ch 8
    "DOM", "RÄTT", "SPÅR", "BROTT", "LAGAR", "HÄKTE", "DOMARE", "FÅNGAR", "DOMSTOL", // Ch 9
    "TRO", "BÖN", "GUD", "ANDE", "FRID", "SJÄL", "PASTOR", "ÄNGLAR", "KYRKAN", "KRISTUS" // Ch 10
];

// Desired themes/words for Chapter 3 (Travel)
const THEME_KEYWORDS = [
    "TURIST", "GUIDE", "RESA", "ÅKA", "SPÅRA", "BOKAS", "SPÅREN", "VISUM", "PACKA", "UTFLYKT",
    "HOTELL", "KARTA", "PLAN", "BÅT", "TÅG", "BIL", "BUSS", "FLYG", "PASS", "HAV", "SOL", "BAD",
    "BERG", "SKOG", "STAD", "LAND", "VÄG", "KUST", "Ö", "SJÖ", "RUM", "SÄNG", "MAT", "VILA"
];

// Structural Requirements
const LEVELS_CONFIG = [
    { count: 2, minLen: 3, maxLen: 4 }, // 1-3
    { count: 2, minLen: 3, maxLen: 4 },
    { count: 2, minLen: 3, maxLen: 4 },
    { count: 3, minLen: 4, maxLen: 5 }, // 4-6
    { count: 3, minLen: 4, maxLen: 5 },
    { count: 3, minLen: 4, maxLen: 5 },
    { count: 4, minLen: 5, maxLen: 6 }, // 7-9
    { count: 4, minLen: 5, maxLen: 6 },
    { count: 4, minLen: 5, maxLen: 6 },
    { count: 5, minLen: 4, maxLen: 7 }  // 10
];

function findBestLevels() {
    const usedWords = new Set(FORBIDDEN_WORDS);
    const levels = [];

    for (let i = 0; i < 10; i++) {
        const config = LEVELS_CONFIG[i];
        let bestLevel = null;
        let maxScore = -1;

        // Iterate through dictionary to find potential MAIN words
        for (const entry of WC_DICTIONARY) {
            const mainWord = entry.w;

            // Skip if already used
            if (usedWords.has(mainWord)) continue;

            // Check main word length constraints (Wheel size = Main word length)
            // The main word length effectively sets the wheel size.
            // The requirements say: "Wheel size equals length of longest word required".
            // So if we pick a main word of length L, the wheel is size L.
            // And all target words must be <= L.
            // The config specifies min/max length for TARGET words.
            // So Main word must be at least the maxLen of the config to support those words?
            // Actually, "Wheel size equals length of longest word required".
            // If we need words of length 3-4, the longest is 4. So wheel must be 4.
            // So Main Word MUST be length 4 for levels 1-3.
            // For levels 4-6 (4-5 letters), Main Word MUST be length 5.
            // For levels 7-9 (5-6 letters), Main Word MUST be length 6.
            // For level 10 (4-7 letters), Main Word MUST be length 7.

            let requiredWheelSize = config.maxLen;
            if (i === 9) requiredWheelSize = 7; // Level 10 specific

            if (mainWord.length !== requiredWheelSize) continue;

            // Check quality of main word
            if (!checkSentenceQuality(entry, mainWord)) continue;

            // Find valid target words from this wheel
            const wheelLetters = mainWord.split('');
            const potentialTargets = WC_DICTIONARY.filter(e => {
                if (usedWords.has(e.w) && e.w !== mainWord) return false; // Avoid forbidden targets too
                if (e.w.length < config.minLen || e.w.length > config.maxLen) return false;
                if (!canFormWord(e.w, wheelLetters)) return false;
                if (!checkSentenceQuality(e, e.w)) return false;
                return true;
            });

            // We need exactly 'config.count' words.
            // One of them SHOULD be the main word (to use all letters), but not strictly required by the prompt text, 
            // BUT "Wheel size equals length of longest word required". If main word is 6 letters, and we need 4 words of 5-6 letters.
            // Ideally the main word is one of the targets.

            if (potentialTargets.length < config.count) continue;

            // Score this candidate
            let score = 0;
            // Theme bonus
            if (THEME_KEYWORDS.includes(mainWord)) score += 100;
            potentialTargets.forEach(t => {
                if (THEME_KEYWORDS.includes(t.w)) score += 10;
            });

            // Prefer words that include the main word as one of the targets
            if (potentialTargets.find(t => t.w === mainWord)) score += 50;

            if (score > maxScore) {
                // Select best targets
                // Sort by length desc, then theme
                potentialTargets.sort((a, b) => {
                    const aTheme = THEME_KEYWORDS.includes(a.w);
                    const bTheme = THEME_KEYWORDS.includes(b.w);
                    if (aTheme && !bTheme) return -1;
                    if (!aTheme && bTheme) return 1;
                    return b.w.length - a.w.length;
                });

                // Ensure we pick the main word if possible
                let selected = [];
                const mainTarget = potentialTargets.find(t => t.w === mainWord);
                if (mainTarget) {
                    selected.push(mainTarget);
                    potentialTargets.splice(potentialTargets.indexOf(mainTarget), 1);
                }

                // Fill rest
                for (const t of potentialTargets) {
                    if (selected.length < config.count) {
                        selected.push(t);
                    }
                }

                if (selected.length === config.count) {
                    bestLevel = {
                        main: mainWord,
                        targets: selected.map(t => t.w),
                        score: score
                    };
                    maxScore = score;
                }
            }
        }

        if (bestLevel) {
            levels.push(bestLevel);
            usedWords.add(bestLevel.main);
            // Don't mark targets as used, they can be reused in other levels if needed? 
            // Better to avoid reusing main words.
        } else {
            console.log(`Could not find perfect match for Level ${i + 1}`);
        }
    }

    return levels;
}

const levels = findBestLevels();
console.log(JSON.stringify(levels, null, 2));
