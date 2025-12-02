const fs = require('fs');

const LEXIN_PATH = 'Lexin20210201.csv';

// Comprehensive Body/Health Keywords List
const BODY_KEYWORDS = new Set([
    "KROPP", "HUVUD", "HÅR", "ÖGA", "ÖRA", "NÄSA", "MUN", "TAND", "TUNGA", "HALS",
    "AXEL", "ARM", "HAND", "FINGER", "BRÖST", "MAGE", "RYGG", "BEN", "KNÄ", "FOT",
    "TÅ", "HUD", "BLOD", "HJÄRTA", "LUNGA", "MAGSÄCK", "TARM", "LEVER", "NJURE",
    "MUSKEL", "SKELETT", "LED", "HÄLSA", "SJUK", "FRISK", "ONT", "VÄRK", "FEBER",
    "HOSTA", "SNUVA", "FÖRKYLD", "INFLUENSA", "SJUKDOM", "MEDICIN", "PILLER",
    "TABLETT", "SPRUTA", "PLÅSTER", "BANDAGE", "LÄKARE", "DOKTOR", "SJUKSKÖTERSKA",
    "PATIENT", "SJUKHUS", "VÅRDCENTRAL", "APOTEK", "RECEPT", "UNDERSÖKNING",
    "OPERATION", "BLODPROV", "PULS", "TRYCK", "ANDAS", "SOVA", "VILA", "ÄTA",
    "DRICKA", "TRÄNA", "MOTION", "SPRINGA", "GÅ", "STÅ", "SITTA", "LIGGA", "MÅ",
    "KÄNNA", "LEVA", "DÖ", "FÖDAS", "VÄXA", "ÅLDRAS", "GAMMAL", "UNG", "STARK",
    "SVAG", "PIGG", "TRÖTT", "GLAD", "LEDSEN", "ARG", "RÄDD", "ORO", "STRESS",
    "LUGN", "LYCKA", "KÄRLEK", "HAT", "TANKE", "MINNE", "DRÖM", "SYN", "HÖRSEL",
    "LUKT", "SMAK", "KÄNSEL", "BALANS", "SMÄRTA", "SÅR", "BLÅMÄRKE", "SVULLNAD",
    "INFEKTION", "VIRUS", "BAKTERIE", "HYGIEN", "TVÄTTA", "DUSCHA", "BADA",
    "BORSTA", "TANDKRÄM", "TVÅL", "SCHAMPO", "KAM", "RAKHYVEL", "GLASÖGON",
    "LINSER", "HÖRAPPARAT", "RULLSTOL", "KRYCKA", "TÅR", "GRÅTA", "SKRATTA", "LE",
    "KYSS", "KRAM", "SEX", "GRAVID", "FÖRLOSSNING", "AMMA", "BLÖJA", "BVC",
    "TANDLÄKARE", "OPTIKER", "PSYKOLOG", "TERAPEUT", "KURATOR", "DIETIST",
    "SJUKGYMNAST", "NAPRAPAT", "CHIROPRAKTOR", "MASSAGE", "SPA", "BASTU",
    "SOLA", "SIMMA", "PROMENERA", "JOGGA", "CYKLA", "GYMPA", "YOGA", "MEDITERA",
    "VILA", "SLAPPA", "SOVA", "DRÖMMA", "VAKNA", "STIGA", "KLÄ", "ÄTA", "DRICKA",
    "KISSA", "BAJSA", "SPY", "KRÄKAS", "SVETTAS", "FRYSA", "SKAKA", "DARRAS",
    "SVIMMA", "BLÖDA", "LÄKA", "TRO", "HOPPAS", "VILJA", "KUNNA", "ORKA", "VÅGA",
    "BÖRA", "MÅSTE", "SKA", "KOMMA", "GÖRA", "BLI", "VAR", "ÄR", "VARIT", "ANSIKTE",
    "PANNA", "ÖGONBRYN", "ÖGONFRANS", "KIND", "HAKA", "LÄPP", "GOM", "STRUPE",
    "NACKE", "SKULDERBLAD", "ARMBÅGE", "HANDLED", "TUMME", "PEKFINGER", "LÅNGFINGER",
    "RINGFINGER", "LILLFINGER", "NAGEL", "MIDJA", "HÖFT", "SKINKA", "LÅR", "VAD",
    "VRIST", "HÄL", "SULA", "POR", "RYNKA", "ÄRR", "FÖDELSEMÄRKE", "VÅRTA",
    "FINNE", "PUPPA", "LARV", "MYGGA", "FÄSTING", "LUS", "LOPPA", "MASK", "BAKTERIE",
    "VIRUS", "CELL", "DNA", "GEN", "BLODKROPP", "PLASMA", "NERV", "HJÄRNA",
    "RYGGRAD", "REVBEN", "BÄCKEN", "KRANIUM", "KÄKE", "TANDKÖTT", "SALIV", "SVETT",
    "TÅRAR", "SNOR", "SLEM", "VAR", "URIN", "AVFÖRING", "MENS", "SPERMA", "ÄGG",
    "FOSTER", "NAVEL", "NAVELSTRÄNG", "MODERKAKA", "LIVMODER", "ÄGGSTOCK", "TESTIKEL",
    "PENIS", "SLIDA", "BRÖSTVÅRTA", "MJÖLK", "HORMON", "VITAMIN", "MINERAL",
    "PROTEIN", "FETT", "KOLHYDRAT", "SOCKER", "SALT", "VATTEN", "KALK", "JÄRN",
    "ZINK", "MAGNESIUM", "CANCER", "DIABETES", "ASTMA", "ALLERGI", "EKSEM",
    "PSORIASIS", "REUMATISM", "DEMENS", "ALZHEIMER", "STROKE", "INFARKT", "KRAMP",
    "ANFALL", "CHOCK", "KOMA", "DÖD", "LIK", "BEGRAVNING", "KYRKOGÅRD", "GRAV",
    "KISTA", "URNA", "ASKA", "SJÄL", "ANDE", "SPÖKE", "HIMMEL", "HELVETE", "GUD",
    "DJÄVUL", "ÄNGEL", "BÖN", "TRO", "HOPP", "KÄRLEK", "LIVET", "DÖDEN"
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

    for (let mainWord of BODY_KEYWORDS) {
        if (!dictionary.has(mainWord)) continue;
        // Max length 7 for Level 10
        if (mainWord.length < 3 || mainWord.length > 7) continue;

        const subWords = getSubWords(mainWord, dictionary);

        // Filter subwords: Keep ONLY those in BODY_KEYWORDS
        const pureBodySubWords = subWords.filter(sw => BODY_KEYWORDS.has(sw));

        if (pureBodySubWords.length >= 2) {
            candidates.push({
                word: mainWord,
                pureBodySubWords: pureBodySubWords,
                count: pureBodySubWords.length,
                length: mainWord.length
            });
        }
    }

    // Sort by Count (desc)
    candidates.sort((a, b) => b.count - a.count);

    console.log("--- Structured Perfect Body/Health Levels ---");

    // Bucket 1: Levels 1-3 (2 words, Length 3-4)
    console.log("\n--- Bucket 1 (Levels 1-3): 2 words, Length 3-4 ---");
    candidates.filter(c => c.length >= 3 && c.length <= 4 && c.count >= 2).slice(0, 15).forEach(c => {
        console.log(`WORD: ${c.word} (Len: ${c.length}, Count: ${c.count}) -> ${c.pureBodySubWords.join(', ')}`);
    });

    // Bucket 2: Levels 4-6 (3 words, Length 4-5)
    console.log("\n--- Bucket 2 (Levels 4-6): 3 words, Length 4-5 ---");
    candidates.filter(c => c.length >= 4 && c.length <= 5 && c.count >= 3).slice(0, 15).forEach(c => {
        console.log(`WORD: ${c.word} (Len: ${c.length}, Count: ${c.count}) -> ${c.pureBodySubWords.join(', ')}`);
    });

    // Bucket 3: Levels 7-9 (4 words, Length 5-6)
    console.log("\n--- Bucket 3 (Levels 7-9): 4 words, Length 5-6 ---");
    candidates.filter(c => c.length >= 5 && c.length <= 6 && c.count >= 4).slice(0, 15).forEach(c => {
        console.log(`WORD: ${c.word} (Len: ${c.length}, Count: ${c.count}) -> ${c.pureBodySubWords.join(', ')}`);
    });

    // Bucket 4: Level 10 (5 words, Length 4-7)
    console.log("\n--- Bucket 4 (Level 10): 5 words, Length 4-7 ---");
    candidates.filter(c => c.length >= 4 && c.length <= 7 && c.count >= 5).slice(0, 15).forEach(c => {
        console.log(`WORD: ${c.word} (Len: ${c.length}, Count: ${c.count}) -> ${c.pureBodySubWords.join(', ')}`);
    });
}

analyze();
