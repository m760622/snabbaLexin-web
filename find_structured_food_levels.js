const fs = require('fs');

const LEXIN_PATH = 'Lexin20210201.csv';

// Comprehensive Food Keywords List
const FOOD_KEYWORDS = new Set([
    "MAT", "ÄTA", "DRYCK", "SMAK", "KOKA", "STEKA", "RESTAURANG", "KÖK",
    "FRUKT", "GRÖNSAK", "BRÖD", "VATTEN", "KAFFE", "TE", "LUNCH", "MIDDAG",
    "FRUKOST", "HUNGRIG", "MÄTT", "RECEPT", "SKÅL", "TALLRIK", "GLAS", "KOPP",
    "ÄPPLE", "BANAN", "BÄR", "KAKA", "TÅRTA", "GLASS", "OST", "SMÖR", "MJÖLK",
    "KÖTT", "FISK", "KYCKLING", "KRYDDA", "SALT", "SOCKER", "PEPPAR",
    "LAX", "SILL", "TORSK", "RÄKA", "KRÄFTA", "HUMMER", "MUSSLA", "OSTRON",
    "BIFF", "STEK", "FÄRS", "SKINKA", "KORV", "BACON", "LEVER", "BLODPUDDING",
    "PANNKAKA", "VÅFFLA", "PAJ", "PIZZA", "PASTA", "RIS", "POTATIS", "MOS",
    "SOPPA", "SÅS", "GRYT", "SALLAD", "TOMAT", "GURKA", "LÖK", "VITLÖK",
    "MOROT", "KÅL", "BÖNA", "ÄRT", "MAJS", "SVAMP", "BÄR", "JORDGUBBE",
    "HALLON", "BLÅBÄR", "LINGON", "HJORTRON", "CITRON", "APELSIN", "PÄRON",
    "DRUVA", "PLOMMON", "KÖRSBÄR", "PERSIKA", "ANANAS", "MELON",
    "BULLE", "KAKOR", "KEX", "CHOKLAD", "GODIS", "CHIPS", "NÖT",
    "SAFT", "LÄSK", "ÖL", "VIN", "SPRIT", "MJÖL", "GRYN", "OLJA", "VINÄGER",
    "SIK", "ÖRT", "RÅ", "ROT", "KOR", "DEG", "FIL", "HONUNG", "IS", "JÄST",
    "KEX", "LÅR", "LÖKAR", "OSTAR", "BULLAR", "SOPPOR", "SÅSER", "BÄREN",
    "KORVAR", "LAXAR", "FISKAR", "GRÖT", "LIMPA", "LIMPOR", "MÜSLI", "YOGHURT",
    "FILE", "FILÉ", "ALADÅB", "AMBROSIA", "ANSJOVIS", "APRIKOS", "ARRAK",
    "AUBERGINE", "AVOKADO", "BAGARE", "BAGETT", "BAKELSE", "BAKÅT", "BANANER",
    "BASILIKA", "BIFFAR", "BISKVI", "BJÖRNBÄR", "BLANDFÄRS", "BLODKORV",
    "BOK", "BORD", "BOWL", "BRÄCKA", "BRÄNNVIN", "BULLARNA", "BÄR", "BÖNOR",
    "CHILI", "CIDER", "CITRUS", "COLA", "CURRY", "DADEL", "DEG", "DILL",
    "DIP", "DIPP", "DISK", "DOLMA", "DRICKA", "DRYCKER", "DÄGG", "DÄEG",
    "ENBÄR", "ENERGI", "FALUKORV", "FASTMAT", "FETT", "FIKON", "FILMJÖLK",
    "FLINGOR", "FLÄSK", "FLÄSKFILÉ", "FLÄSKKOTLETT", "FROST", "FRUKTER",
    "FRYSA", "FÄRSK", "FÖDA", "GAFFEL", "GARNERA", "GRILL", "GRILLA", "GRIS",
    "GROGG", "GRÄDDE", "GRÄSLÖK", "GULASCH", "GURKOR", "HACKA", "HALVA",
    "HAMBURGARE", "HASSELNÖT", "HAVRE", "HAVREGRYN", "HEL", "HEMLAGAD",
    "HONUNGSMELON", "HUMLE", "HUSETS", "HYLLA", "HÄLL", "HÄLLA", "INGEFÄRA",
    "ISBERGSSALLAD", "ISTER", "JORDGUBBAR", "JÄST", "KAKAO", "KALKON", "KALOPS",
    "KALV", "KANEL", "KANTARELL", "KARAMELL", "KARDEMUMMA", "KASSTRULL",
    "KAVIAR", "KEBAB", "KETCHUP", "KIKÄRT", "KISSEL", "KIVIK", "KLADDKAKA",
    "KLEMENTIN", "KL klimp", "KOKBOK", "KOKOS", "KOLA", "KONFEKT", "KONSERV",
    "KOPPAR", "KORN", "KOTLETT", "KRABBA", "KRINGLA", "KRUKA", "KRYDDOR",
    "KRÅS", "KUMMIN", "KVARG", "KYL", "KÅLDOLME", "KÅLROT", "KÄEX", "KÄK",
    "KÄKA", "KÄRNA", "KÖKS", "KÖTTBULLAR", "KÖTTFÄRS", "LAGA", "LAGAD",
    "LAGRAD", "LAMM", "LASAGNE", "LATTE", "LEMONAD", "LIM", "LIME", "LINGONS",
    "LINS", "LITER", "LIVSMEDEL", "LUNCH", "LÅDA", "LÄGG", "LÄSKEDRYCK",
    "LÖK", "LÖKAR", "LÖSVIKT", "MAJSKOLV", "MAKRILL", "MANDARIN", "MANDEL",
    "MANGO", "MARINAD", "MARMELAD", "MARSIPAN", "MAT", "MATA", "MATBORD",
    "MATFETT", "MATJES", "MATOLJA", "MATRÄTT", "MATSKED", "MEDWURST", "MEJERI",
    "MELONER", "MENY", "MER", "MIDA", "MIDDAG", "MINERALVATTEN", "MJUKOST",
    "MJÖL", "MJÖLK", "MORÖTTER", "MOSA", "MUMS", "MUNK", "MUSSLA", "MYNTA",
    "MÜSLI", "MÄTT", "MÖRT", "NAPOLEON", "NEKTARIN", "NOPPA", "NOUGAT",
    "NUDLAR", "NÄRING", "NÖT", "NÖTFÄRS", "NÖTKÖTT", "OBOS", "ODLA", "OLIV",
    "OLIVER", "OMELETT", "OREGANO", "OST", "OSTAR", "OSTKAKA", "OSTRON",
    "OXFILÉ", "PAJ", "PANERA", "PAPRIKA", "PARMESAN", "PASSION", "PASTA",
    "PASTEJ", "PEPPARKAKOR", "PEPPARROT", "PERSILJA", "PIROG", "PISTAGE",
    "PITABRÖD", "PLÄTTAR", "PORTION", "POTATISAR", "POTATISMOS", "PRALIN",
    "PRINSKORV", "PUDDING", "PUMP", "PUMPA", "PUNSCH", "PURJO", "PURJOLÖK",
    "PÄRON", "RABARBER", "RADISA", "RAPS", "RAPSOLJA", "REVBEN", "RISGRYN",
    "RIV", "RIVA", "ROSTBIFF", "ROSTBRÖD", "RULLTÅRTA", "RÅG", "RÅRÖRDA",
    "RÄDISA", "RÄKOR", "RÄTT", "RÖDBETA", "RÖDKÅL", "RÖDLÖK", "RÖDS", "RÖRA",
    "RÖKT", "SAFFRAN", "SAFT", "SALAMI", "SALLAD", "SALLADER", "SALT", "SALTA",
    "SARDIN", "SEMLA", "SENAP", "SERVERA", "SILD", "SILL", "SKAL", "SKALA",
    "SKINKA", "SKIVA", "SKORPA", "SKÄRA", "SLICE", "SLURP", "SMAKA", "SMULA",
    "SMULPAJ", "SMÅGODIS", "SMÄLTA", "SMÖR", "SMÖRGÅS", "SNACKS", "SNAPS",
    "SOCKER", "SODA", "SOPPA", "SPAGETTI", "SPARRIS", "SPENAT", "SPIS",
    "STEKPANNA", "STRÖMMING", "STUVAD", "SURDEG", "SUSHI", "SVAMP", "SYLT",
    "SÅS", "SÅSER", "SÖT", "SÖTSAK", "TACO", "TALLRIK", "TAPAS", "TARTA",
    "TE", "TESKED", "TILLAGA", "TIMJAN", "TOAST", "TOMAT", "TOMATER", "TORSK",
    "TORR", "TRANBÄR", "TUGG", "TUGGA", "TUNNBRÖD", "TÅRTA", "UGN", "UNG",
    "VARM", "VARMKORV", "VATTEN", "VEGAN", "VEGO", "VETE", "VILT", "VIN",
    "VINDRUVA", "VISPA", "VITLÖK", "VÅFFLOR", "WOK", "YOGHURT", "ÅL", "ÄGG",
    "ÄGGULA", "ÄLG", "ÄPPELPAJ", "ÄPPLEN", "ÄRTOR", "ÄTA", "ÖL", "ÖRT"
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

    for (let mainWord of FOOD_KEYWORDS) {
        if (!dictionary.has(mainWord)) continue;
        // Max length 7 for Level 10
        if (mainWord.length < 3 || mainWord.length > 7) continue;

        const subWords = getSubWords(mainWord, dictionary);

        // Filter subwords: Keep ONLY those in FOOD_KEYWORDS
        const pureFoodSubWords = subWords.filter(sw => FOOD_KEYWORDS.has(sw));

        if (pureFoodSubWords.length >= 2) {
            candidates.push({
                word: mainWord,
                pureFoodSubWords: pureFoodSubWords,
                count: pureFoodSubWords.length,
                length: mainWord.length
            });
        }
    }

    // Sort by Count (desc)
    candidates.sort((a, b) => b.count - a.count);

    console.log("--- Structured Perfect Food Levels ---");

    // Bucket 1: Levels 1-3 (2 words, Length 3-4)
    console.log("\n--- Bucket 1 (Levels 1-3): 2 words, Length 3-4 ---");
    candidates.filter(c => c.length >= 3 && c.length <= 4 && c.count >= 2).slice(0, 15).forEach(c => {
        console.log(`WORD: ${c.word} (Len: ${c.length}, Count: ${c.count}) -> ${c.pureFoodSubWords.join(', ')}`);
    });

    // Bucket 2: Levels 4-6 (3 words, Length 4-5)
    console.log("\n--- Bucket 2 (Levels 4-6): 3 words, Length 4-5 ---");
    candidates.filter(c => c.length >= 4 && c.length <= 5 && c.count >= 3).slice(0, 15).forEach(c => {
        console.log(`WORD: ${c.word} (Len: ${c.length}, Count: ${c.count}) -> ${c.pureFoodSubWords.join(', ')}`);
    });

    // Bucket 3: Levels 7-9 (4 words, Length 5-6)
    console.log("\n--- Bucket 3 (Levels 7-9): 4 words, Length 5-6 ---");
    candidates.filter(c => c.length >= 5 && c.length <= 6 && c.count >= 4).slice(0, 15).forEach(c => {
        console.log(`WORD: ${c.word} (Len: ${c.length}, Count: ${c.count}) -> ${c.pureFoodSubWords.join(', ')}`);
    });

    // Bucket 4: Level 10 (5 words, Length 4-7)
    console.log("\n--- Bucket 4 (Level 10): 5 words, Length 4-7 ---");
    candidates.filter(c => c.length >= 4 && c.length <= 7 && c.count >= 5).slice(0, 15).forEach(c => {
        console.log(`WORD: ${c.word} (Len: ${c.length}, Count: ${c.count}) -> ${c.pureFoodSubWords.join(', ')}`);
    });
}

analyze();
