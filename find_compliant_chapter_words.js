
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

// Forbidden words (from other chapters - updated list)
const FORBIDDEN_WORDS = [
    // Chapter 3 (Finalized)
    "RESA", "PASS", "BERG", "BOKAS", "SPÅRA", "ASTER", "FÄRDEN", "VÄDRET", "PENGAR", "UTFLYKT",
    // Chapter 1 (Finalized)
    "SKÅL", "SAFT", "KNIV", "KAKOR", "SKALA", "BAKAR", "FISKAR", "ROSTAR", "SKÅLAR", "FRUKOST",
    "KÅL", "FAT", "VIN", "KOKA", "KORA", "KALAS", "SALA", "BAKA", "BARA", "FISKA", "FRISK", "SIKAR",
    "OSTAR", "ROSTA", "STORA", "KÅLAR", "SKÅLA", "SKÅRA", "FRUKT", "KOST", "ROST", "KORT",
    // Chapter 2 (Finalized)
    "TRÄD", "LÖVA", "MYRA", "ANDAS", "REGNA", "ALVAR", "GRENAR", "STENAR", "GRODAN", "STJÄRNA",
    "TRÄ", "LÖV", "MYR", "SAND", "ANDA", "REGN", "GRAN", "LAVA", "VARA", "RENAR", "GRANE", "ANGRE",
    "RENSA", "ARTEN", "GRODA", "DRAGON", "ORGAN", "TJÄRN", "TÄRNA", "SÄRTA", "TJÄRA",
    // Chapter 4 (Finalized)
    "BORD", "STOL", "DÖRR", "SKOLA", "LAMPA", "KARTA", "SKRIVA", "KLÄDER", "BORSTA", "STATION",
    "BOR", "SOL", "DÖR", "KOLA", "SKAL", "LAMA", "PALM", "AKTA", "RATA", "ARKIV", "SKIVA", "VIRKA",
    "LÄDER", "KLÄDE", "LÄRDE", "BORST", "NATT", "SATT", "STAT", "TANT",
    // Chapter 5 (Finalized)
    "TAND", "SMAK", "BLOD", "STARK", "SPORT", "TRÄNA", "GRAVID", "SKÖTER", "HÄLSAN", "PLÅSTER",
    "AND", "ASK", "BOD", "KAST", "KRAS", "STOR", "SORT", "NÄRA", "ÄRTA", "VIDGAR", "DRIVA", "VIDGA",
    "SÖKER", "KÖRET", "RÖKTE", "HÄLSA", "NÄSA", "LÄSA", "LÅTER", "LÅSER", "PEST", "PÅSE",
    // Chapter 6 (Finalized)
    "PROV", "ELEV", "LÄRA", "AVTAL", "MATTE", "RÄKNA", "SJUNGA", "IDROTT", "MATSAL", "SVENSKA",
    "ROP", "LEV", "LÄR", "TAVLA", "TALA", "TEAM", "TEMA", "RÄKA", "SJUNG", "GUNGA", "LUGNA",
    "TROTT", "TORRT", "RIDIT", "SAMLA", "SMALT", "ATLAS", "SVENSK", "VÄSKA", "VAKEN", "SVEK",
    // Chapter 7 (Finalized)
    "KÖPA", "PRIS", "DYRA", "SÄLJA", "VÄSKA", "PLAST", "KLÄDER", "SKORNA", "KOSTAR", "SKJORTA",
    "KÖP", "RIS", "DYR", "SÄLJ", "SJÄL", "VÄSA", "VAKA", "LAST", "SALT", "LÄRDE", "KLÄDE",
    "KORNA", "NORSK", "ORKAN", "ROSTA", "STORA", "KORTA", "SKROT", "KARTA",
    // Chapter 8 (Finalized)
    "GATA", "HAMN", "KÖRA", "KANOT", "KÄRRA", "ÖSTER", "SÖDER", "BÖTER", "REGLER", "LASTBIL",
    "TAG", "HAN", "ÖKAR", "NATO", "TANK", "ÄRRA", "KARR", "REST", "RÖST", "RÖD", "ÖDE", "ÖRE",
    "BER", "BÖR", "TRE", "REGEL", "GER", "LER", "LISTA", "TILLS", "BILA", "LISA",
    // Chapter 9 (Finalized)
    "LAG", "DOM", "LÖGN", "VAKT", "MAKT", "SKULD", "BROTT", "STRAFF", "FÅNGAR", "ADVOKAT",
    "GAL", "MOD", "LÖN", "AKT", "TAK", "MAT", "GULD", "SLUT", "BORT", "TORR", "ORT",
    "FAST", "RAST", "FART", "FÅNGA", "ÅNGAR", "FANA", "VAKA",
    // Words from other chapters currently in use (to be replaced, but avoid for now)
    "TRO", "BÖN", "GUD", "ANDE", "FRID", "SJÄL", "PASTOR", "ÄNGLAR", "KYRKAN", "KRISTUS" // Ch 10
];

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

// Configuration for Chapter 10 (Religion)
const TARGET_CHAPTER_THEMES = [
    "GUD", "TRO", "BÖN", "ANDE", "SJÄL", "LIV", "DÖD", "FRID", "HOPP", "KÄRLEK",
    "KYRKA", "MOSKÉ", "TEMP", "KLOSTER", "PRÄST", "IMAM", "MUNK", "NONNA", "PASTOR", "BISKOP",
    "PÅVE", "PROFET", "ÄNGEL", "DJÄVUL", "HELIG", "SYND", "NÅD", "FÖRLÅT", "HIMMEL", "HELVETE",
    "PARADIS", "EDEN", "BIBEL", "KORAN", "BOK", "SKRIFT", "ORD", "LÄRA", "RELIGION", "ISLAM",
    "KRISTEN", "JUDISK", "BUDDHA", "HINDU", "SIKH", "GUDSTJÄNST", "MÄSSA", "BÖNE", "FASTAN", "RAMADAN",
    "JUL", "PÅSK", "EID", "HÖGTID", "FIRA", "DÖPA", "VIGA", "BEGRAVA", "KORS", "HALVMÅNE",
    "STJÄRNA", "LJUSET", "MÖRKER", "GOD", "OND", "RÄTT", "FEL", "SANNING", "LÖGN", "VISDOM",
    "KRAFT", "MAKT", "SKAPA", "VÄRLD", "MÄNNISKA", "ADAM", "EVA", "NOK", "ABRAHAM", "MOSES",
    "JESUS", "MUHAMMED", "MARIA", "JOSEF", "APOSTEL", "LÄRJUNGE", "HELGON", "MARTYR", "PILGRIM", "VALLFÄRD",
    "MEKKA", "JERUSALEM", "ROM", "HELGEDOM", "ALTARE", "PREDIKAN", "PSALM", "SÅNG", "LOVSÅNG", "TACKA",
    "LOVA", "PRISA", "ÄRA", "HEDER", "RESPEKT", "VÖRDNAD", "FRUKTAN", "LYDNA", "TJÄNA", "OFFRA"
];

function findBestLevels() {
    const usedWords = new Set(FORBIDDEN_WORDS);
    const levels = [];

    for (let i = 0; i < 10; i++) {
        const config = LEVELS_CONFIG[i];
        let bestLevel = null;
        let maxScore = -1;

        for (const entry of WC_DICTIONARY) {
            const mainWord = entry.w;

            if (usedWords.has(mainWord)) continue;

            let requiredWheelSize = config.maxLen;
            if (i === 9) requiredWheelSize = 7;

            if (mainWord.length !== requiredWheelSize) continue;
            if (!checkSentenceQuality(entry, mainWord)) continue;

            const wheelLetters = mainWord.split('');
            const potentialTargets = WC_DICTIONARY.filter(e => {
                if (usedWords.has(e.w) && e.w !== mainWord) return false;
                if (e.w.length < config.minLen || e.w.length > config.maxLen) return false;
                if (!canFormWord(e.w, wheelLetters)) return false;
                if (!checkSentenceQuality(e, e.w)) return false;
                return true;
            });

            if (potentialTargets.length < config.count) continue;

            let score = 0;
            // Strict theme enforcement for Chapter 10
            if (!TARGET_CHAPTER_THEMES.includes(mainWord)) continue;

            if (TARGET_CHAPTER_THEMES.includes(mainWord)) score += 100;
            potentialTargets.forEach(t => {
                if (TARGET_CHAPTER_THEMES.includes(t.w)) score += 10;
            });
            if (potentialTargets.find(t => t.w === mainWord)) score += 50;

            if (score > maxScore) {
                potentialTargets.sort((a, b) => {
                    const aTheme = TARGET_CHAPTER_THEMES.includes(a.w);
                    const bTheme = TARGET_CHAPTER_THEMES.includes(b.w);
                    if (aTheme && !bTheme) return -1;
                    if (!aTheme && bTheme) return 1;
                    return b.w.length - a.w.length;
                });

                let selected = [];
                const mainTarget = potentialTargets.find(t => t.w === mainWord);
                if (mainTarget) {
                    selected.push(mainTarget);
                    potentialTargets.splice(potentialTargets.indexOf(mainTarget), 1);
                }

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
        } else {
            console.log(`Could not find perfect match for Level ${i + 1}`);
        }
    }

    return levels;
}

const levels = findBestLevels();
console.log(JSON.stringify(levels, null, 2));
