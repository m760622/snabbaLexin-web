const fs = require('fs');

const LEXIN_PATH = 'Lexin20210201.csv';

// Comprehensive Nature Keywords List
const NATURE_KEYWORDS = new Set([
    "SKOG", "TRÄD", "BLOMMA", "HAV", "SJÖ", "FLOD", "BERG", "STEN", "SOL", "MÅNE",
    "STJÄRNA", "MOLN", "REGN", "SNÖ", "VIND", "STORM", "DJUR", "FÅGEL", "FISK",
    "MARK", "JORD", "GRÄS", "LÖV", "GREN", "ROT", "STAM", "BARR", "KOTT", "MOSSA",
    "LAV", "Ö", "STRAND", "VÅG", "DAL", "ÅS", "KULLE", "GROTTA", "MYR", "KÄRR",
    "ÄNG", "HAGE", "ÅKER", "FÄLT", "PARK", "TRÄDGÅRD", "NATUR", "MILJÖ", "KLIMAT",
    "VÄDER", "ÅRSTID", "VÅR", "SOMMAR", "HÖST", "VINTER", "IS", "FROST", "DAGG",
    "DIMMA", "ÅSKA", "BLIXT", "HIMMEL", "RYMD", "PLANET", "KOMET", "SOLEN", "MÅNEN",
    "STJÄRNOR", "MOLNEN", "REGNET", "SNÖN", "VINDEN", "STORMEN", "DJUREN", "FÅGLAR",
    "FISKAR", "MARKEN", "JORDEN", "GRÄSET", "LÖVEN", "GRENAR", "RÖTTER", "STAMMAR",
    "BARR", "KOTTAR", "MOSSOR", "LAVAR", "ÖAR", "STRÄNDER", "VÅGOR", "DALAR", "ÅSAR",
    "KULLAR", "GROTTOR", "MYRAR", "KÄRR", "ÄNGAR", "HAGAR", "ÅKRAR", "FÄLTEN",
    "PARKER", "TRÄDGÅRDAR", "NATUREN", "MILJÖN", "KLIMATET", "VÄDRET", "ÅRSTIDER",
    "VÅREN", "SOMMAREN", "HÖSTEN", "VINTERN", "ISEN", "FROSTEN", "DAGGEN", "DIMMAN",
    "ÅSKAN", "BLIXTEN", "HIMLEN", "RYMDEN", "PLANETER", "KOMETER", "DUNG", "GLÄNTA",
    "STIG", "VÄG", "BÄCK", "Å", "FORS", "FALL", "VATTEN", "LUFT", "ELD", "JORD",
    "LERA", "SAND", "GRUS", "KLIPPA", "HÄLL", "SKÄR", "BUKT", "VIK", "SUND", "NÄS",
    "UDDE", "HALVÖ", "KUST", "LAND", "ÖKEN", "SAVANN", "DJUNGEL", "TUNDRA", "POL",
    "NORR", "SÖDER", "ÖSTER", "VÄSTER", "BJÖRK", "GRAN", "TALL", "EK", "AL", "ASP",
    "LÖNN", "RÖNN", "ASK", "LM", "LIND", "HÄGG", "SYREN", "ROS", "LILJA", "TULPAN",
    "VIOL", "SIK", "LAX", "GÄDDA", "ABBORRE", "MÖRT", "BRAXEN", "ÅL", "HAJ", "VAL",
    "SÄL", "BJÖRN", "VARG", "RÄV", "LO", "JÄRV", "ÄLG", "RÅDJUR", "HJORT", "REN",
    "HARE", "EKORRE", "MUS", "RÅTTA", "SILL", "STRÖMMING", "TORSK", "MAKRILL",
    "ÖRN", "HÖK", "UGGLA", "FALK", "TRANA", "SVAN", "GÅS", "ANKA", "AND", "MÅS",
    "TRUT", "DUVA", "SKATA", "KRAKA", "MES", "FINK", "SPARV", "SVALA", "STAR",
    "TRAST", "LÄRKA", "NÄKTERGAL", "GÖK", "HACKSPETT", "MYRA", "BI", "GETING",
    "HUMLA", "FLUGA", "MYGGA", "KNOTT", "FJÄRIL", "MAL", "SPINDEL", "MASK", "SNIGEL",
    "GRODA", "PAGGA", "ORM", "ÖDLA", "SKÖLDPADDA", "KROKODIL", "LEJON", "TIGER",
    "ELEFANT", "GIRAFF", "ZEBRA", "APA", "KAMEL", "LAMA", "KÄNGURU", "KOALA",
    "PANDA", "PINGVIN", "DELFIN", "SPÄCKHUGGARE", "BLÅVAL", "KASKELOT", "NARVAL",
    "MANET", "KORALL", "SVAMP", "ALGER", "TÅNG", "SJÖGRÄS", "VASS", "NÄCKROS",
    "ORMBUNKE", "LJUNG", "BLÅBÄR", "LINGON", "HJORTRON", "SMULTRON", "HALLON",
    "BJÖRNBÄR", "NYPON", "SLÅN", "EN", "ENAR", "RENAR", "STENAR", "GRENAR",
    "BÄCKAR", "FORSAR", "SJÖAR", "HAVEN", "MOLNIG", "SOLIG", "REGNIG", "BLÅSIG",
    "STORMIG", "SNÖIG", "ISKALL", "VARM", "HET", "SVAL", "KYLIG", "FUKTIG", "TORR"
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

    for (let mainWord of NATURE_KEYWORDS) {
        if (!dictionary.has(mainWord)) continue;
        // Max length 7 for Level 10
        if (mainWord.length < 3 || mainWord.length > 7) continue;

        const subWords = getSubWords(mainWord, dictionary);

        // Filter subwords: Keep ONLY those in NATURE_KEYWORDS
        const pureNatureSubWords = subWords.filter(sw => NATURE_KEYWORDS.has(sw));

        if (pureNatureSubWords.length >= 2) {
            candidates.push({
                word: mainWord,
                pureNatureSubWords: pureNatureSubWords,
                count: pureNatureSubWords.length,
                length: mainWord.length
            });
        }
    }

    // Sort by Count (desc)
    candidates.sort((a, b) => b.count - a.count);

    console.log("--- Structured Perfect Nature Levels ---");

    // Bucket 1: Levels 1-3 (2 words, Length 3-4)
    console.log("\n--- Bucket 1 (Levels 1-3): 2 words, Length 3-4 ---");
    candidates.filter(c => c.length >= 3 && c.length <= 4 && c.count >= 2).slice(0, 15).forEach(c => {
        console.log(`WORD: ${c.word} (Len: ${c.length}, Count: ${c.count}) -> ${c.pureNatureSubWords.join(', ')}`);
    });

    // Bucket 2: Levels 4-6 (3 words, Length 4-5)
    console.log("\n--- Bucket 2 (Levels 4-6): 3 words, Length 4-5 ---");
    candidates.filter(c => c.length >= 4 && c.length <= 5 && c.count >= 3).slice(0, 15).forEach(c => {
        console.log(`WORD: ${c.word} (Len: ${c.length}, Count: ${c.count}) -> ${c.pureNatureSubWords.join(', ')}`);
    });

    // Bucket 3: Levels 7-9 (4 words, Length 5-6)
    console.log("\n--- Bucket 3 (Levels 7-9): 4 words, Length 5-6 ---");
    candidates.filter(c => c.length >= 5 && c.length <= 6 && c.count >= 4).slice(0, 15).forEach(c => {
        console.log(`WORD: ${c.word} (Len: ${c.length}, Count: ${c.count}) -> ${c.pureNatureSubWords.join(', ')}`);
    });

    // Bucket 4: Level 10 (5 words, Length 4-7)
    console.log("\n--- Bucket 4 (Level 10): 5 words, Length 4-7 ---");
    candidates.filter(c => c.length >= 4 && c.length <= 7 && c.count >= 5).slice(0, 15).forEach(c => {
        console.log(`WORD: ${c.word} (Len: ${c.length}, Count: ${c.count}) -> ${c.pureNatureSubWords.join(', ')}`);
    });
}

analyze();
