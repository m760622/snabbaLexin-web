const fs = require('fs');

const LEXIN_PATH = 'Lexin20210201.csv';

// Comprehensive Daily/Home Keywords List
const DAILY_KEYWORDS = new Set([
    "HEM", "HUS", "RUM", "KÖK", "BAD", "HALL", "TAK", "GOLV", "VÄGG", "DÖRR",
    "FÖNSTER", "TRAPPA", "HISS", "NYCKEL", "LÅS", "BORD", "STOL", "SOFFA", "SÄNG",
    "LAMPA", "MATTA", "TAVLA", "SPEGEL", "HYLLA", "SKÅP", "LÅDA", "VAS", "DUK",
    "GARDIN", "KUDDE", "TÄCKE", "LAKAN", "FILT", "HANDDUK", "TVÅL", "SCHAMPO",
    "KAM", "BORSTE", "TANDBORSTE", "TANDKRÄM", "RAKHYVEL", "SMINK", "PARFYM",
    "KLÄDER", "SKOR", "STRUMPOR", "BYXOR", "KJOL", "KLÄNNING", "TRÖJA", "JACKA",
    "KAPPA", "ROCK", "MÖSSA", "HATT", "VANTAR", "HALSDUK", "SKJORTA", "BLUS",
    "LINNE", "KAVAJ", "KOSTYM", "SLIPS", "BÄLTE", "VÄSKA", "PLÅNBOK", "PENGAR",
    "KORT", "MYNT", "SEDEL", "BANK", "AFFÄR", "BUTIK", "TORG", "MARKNAD", "PRIS",
    "REA", "KVITTO", "PÅSE", "KASSE", "VAGN", "KORG", "MAT", "DRYCK", "FRUKOST",
    "LUNCH", "MIDDAG", "KAFFE", "TE", "VATTEN", "MJÖLK", "BRÖD", "SMÖR", "OST",
    "ÄGG", "KÖTT", "FISK", "FRUKT", "GRÖNSAK", "LAGA", "KOKA", "STEKA", "BAKA",
    "DISKA", "STÄDA", "TVÄTTA", "STRYKA", "DAMMSUGA", "SOPA", "SKURA", "TORKA",
    "SOVA", "VAKNA", "STIGA", "KLÄ", "ÄTA", "DRICKA", "BORSTA", "TVÄTTA", "DUSCHA",
    "BADA", "GÅ", "ÅKA", "CYKLA", "KÖRA", "JOBBA", "ARBETA", "PLUGGA", "STUDERA",
    "LÄSA", "SKRIVA", "RITA", "MÅLA", "LYSSNA", "TALA", "PRATA", "RINGA", "SMSA",
    "MEJLA", "SURFA", "SPELA", "TITTA", "SE", "HÖRA", "KÄNNA", "LUKTA", "SMAKA",
    "TID", "KLOCKA", "TIMME", "MINUT", "SEKUND", "DAG", "NATT", "MORGON", "KVÄLL",
    "VECKA", "MÅNAD", "ÅR", "HELG", "VARDAG", "LOV", "SEMESTER", "JUL", "PÅSK",
    "FÖDELSEDAG", "FEST", "KALAS", "GÄST", "VÄN", "FAMILJ", "MAMMA", "PAPPA",
    "SYSTER", "BROR", "DOTTER", "SON", "BARN", "BEBIS", "MORMOR", "MORFAR",
    "FARMOR", "FARFAR", "KUSIN", "MAN", "KVINNA", "POJKE", "FLICKA", "GUBBE",
    "GUMMA", "GRANNE", "LÄRARE", "ELEV", "DOKTOR", "LÄKARE", "SJUKSKÖTERSKA",
    "POLIS", "BRANDMAN", "BREVBÄRARE", "BUSS", "TÅG", "BIL", "CYKEL", "BÅT",
    "FLYG", "TAXI", "STATION", "HÅLLPLATS", "BILJETT", "RESA", "KARTA", "VÄG",
    "GATA", "BRO", "TUNNEL", "PARK", "SKOLA", "DAGIS", "JOBB", "KONTOR", "SJUKHUS",
    "APOTEK", "BIBLIOTEK", "BIO", "TEATER", "MUSEUM", "GYM", "SIMHALL", "KYRKA",
    "STAD", "BY", "LAND", "VÄRLD", "LIV", "DÖD", "SJUK", "FRISK", "GLAD", "LEDSEN",
    "ARG", "RÄDD", "TRÖTT", "PIGG", "HUNGRIG", "MÄTT", "TÖRSTIG", "VARM", "KALL",
    "STOR", "LITEN", "LÅNG", "KORT", "TJOCK", "SMAL", "HÖG", "LÅG", "BRE", "SMAL",
    "UNG", "GAMMAL", "NY", "FIN", "FUL", "BRA", "DÅLIG", "RÄTT", "FEL", "SANT",
    "FALSKT", "JA", "NEJ", "HEJ", "TACK", "FÖRLÅT", "VARSÅGOD", "URSÄKTA", "GRATTIS",
    "VÄLKOMMEN", "HEJDÅ", "SES", "HÖRS", "KRAM", "PUSS", "ÄLSKA", "TYCKA", "TRO",
    "VETA", "KUNNA", "VILJA", "FÅ", "BÖRA", "MÅSTE", "SKA", "KOMMA", "GÖRA", "BLI",
    "HA", "VAR", "ÄR", "VARIT", "SKED", "GAFFEL", "KNIV", "TALLRIK", "GLAS", "KOPP",
    "MUGG", "KANNA", "SKÅL", "FAT", "BRICKA", "SERVETT", "DUK", "LJUS", "TÄNDSTICKA",
    "ELD", "RÖK", "ASKA", "SOPOR", "SKRÄP", "PAPPERSKORG", "SOPTUNNA", "BREVLÅDA",
    "STAKET", "GRIND", "TRÄDGÅRD", "GRÄSMATTA", "BLOMMA", "TRÄD", "BUSKE", "HUND",
    "KATT", "KANIN", "FÅGEL", "FISK", "HAMSTER", "MARSVIN", "DJUR", "HUSDJUR",
    "VETERINÄR", "KOPPEL", "HALSBAND", "MATSKÅL", "LEKSAK", "BOLL", "DOCKA", "BIL",
    "PUZZEL", "SPEL", "BOK", "TIDNING", "PENNA", "SUDDGUMMI", "LINJAL", "BLOCK",
    "PÄRM", "TEJP", "LIM", "SAX", "GEM", "HÄFTAPPARAT", "HÅLSLAG", "DATOR", "PLATTA",
    "MOBIL", "TELEFON", "TV", "RADIO", "HÖGTALARE", "HÖRLURAR", "KAMERA", "FOTO",
    "FILM", "MUSIK", "SÅNG", "DANS", "KONST", "SPORT", "FOTBOLL", "ISHOCKEY",
    "TENNIS", "GOLF", "SIMNING", "LÖPNING", "GYMPA", "YOGA", "TRÄNING", "MATCH",
    "TÄVLING", "PRIS", "MEDALJ", "POKAL", "VINST", "FÖRLUST", "MÅL", "POÄNG",
    "DOMARE", "SPELARE", "LAG", "KLUBB", "FÖRENING", "MEDLEM", "MÖTE", "TRÄFF",
    "DEJT", "KÄRLEK", "HAT", "VÄNSKAP", "FRED", "KRIG", "POLITIK", "VAL", "RÖST",
    "PARTI", "LEDARE", "CHEF", "KOLLEGA", "KUND", "SÄLJARE", "KÖPARE", "ÄGARE",
    "HYRESGÄST", "VÄRD", "GÄST", "GRANNE", "FRÄMLING", "TURIST", "GUIDE", "PASS",
    "VISUM", "TULL", "GRÄNS", "SPRÅK", "ORD", "MENING", "TEXT", "BOKSTAV", "SIFFRA",
    "NUMMER", "NAMN", "ADRESS", "POSTNUMMER", "ORT", "LAND", "STAT", "KOMMUN", "LÄN",
    "REGION", "OMRÅDE", "DEL", "HELA", "ALLT", "INGET", "NÅGOT", "VEM", "VAD", "VAR",
    "NÄR", "HUR", "VARFÖR", "DÄRFÖR", "ATT", "OM", "MEN", "ELLER", "OCH", "SAMT",
    "UTAN", "MED", "MOT", "FÖR", "AV", "PÅ", "I", "TILL", "FRÅN", "ÖVER", "UNDER",
    "BAKOM", "FRAMFÖR", "MELLAN", "BREDVID", "HOS", "VID", "GENOM", "ENLIGT", "TROTS",
    "EFTERSOM", "MEDAN", "INNAN", "EFTER", "SEDAN", "NU", "DÅ", "SNART", "ALLTID",
    "ALDRIG", "OFTA", "SÄLLAN", "IBLAND", "KANSKE", "NOG", "VÄL", "JU", "BÄDDA",
    "DUKA", "MÖBLER", "SOVRUM", "VARDAGSRUM", "BADRUM", "TVÄTTSTUGA", "GARAGE",
    "KÄLLARE", "VIND", "BALKONG", "ALTAN", "VERANDA", "HALL", "ENTRÉ", "UTGÅNG",
    "NÖDUTGÅNG", "TRAPPUPPGÅNG", "HISS", "VÅNING", "PLAN", "LÄGENHET", "VILLA",
    "RADHUS", "STUGA", "TORP", "HERRGÅRD", "SLOTT", "KOJA", "TÄLT", "HUSBIL",
    "HUSVAGN", "BÅT", "FÄRJA", "KRYSSNINGSFARTYG", "FLYGPLAN", "HELIKOPTER",
    "RAKET", "RYMDSKEPP", "UFO", "ALIEN", "SPÖKE", "TROLL", "HÄXA", "TOMTE",
    "ÄNGEL", "GUD", "DJÄVUL", "HIMMEL", "HELVETE", "PARADIS", "DRÖM", "MARDRÖM",
    "TANKE", "IDÉ", "MINNE", "FANTASI", "VERKLIGHET", "SANNING", "LÖGN", "SKÄMT",
    "ALLVAR", "LEK", "SPEL", "HOBBY", "INTRESSE", "PASSION", "TALANG", "FÖRMÅGA",
    "KUNSKAP", "BILDNING", "UTBILDNING", "SKOLA", "UNIVERSITET", "HÖGSKOLA",
    "KURS", "LEKTION", "LÄXA", "PROV", "TENTA", "EXAMEN", "BETYG", "DIPLOM",
    "INTYG", "BEVIS", "KÖRKORT", "LEGITIMATION", "PASS", "VISUM", "BILJETT",
    "KORT", "NYCKEL", "KOD", "LÖSENORD", "SIGNATUR", "NAMNTECKNING", "STÄMPEL",
    "SIGILL", "MÄRKE", "LOGGA", "SYMBOL", "TECKEN", "BOKSTAV", "SIFFRA", "NUMMER",
    "ANTAL", "MÄNGD", "STORLEK", "VIKT", "LÄNGD", "BREDD", "HÖJD", "DJUP",
    "AVSTÅND", "HASTIGHET", "TID", "TEMPERATUR", "VÄRME", "KYLA", "TRYCK",
    "KRAFT", "ENERGI", "STRÖM", "SPÄNNING", "EFFEKT", "LJUS", "LJUD", "FÄRG",
    "FORM", "YTA", "VOLYM", "MASSA", "DENSITET", "MATERIAL", "TYG", "TRÄ",
    "METALL", "PLAST", "GLAS", "STEN", "BETONG", "TEGEL", "GIPS", "PÅSKLÄMMA",
    "VISP", "SLEV", "KASTULL", "STEKPANNA", "UGNSFORM", "SKÄRBRÄDA", "DURKSLAG",
    "RIVJÄRN", "KONSERVÖPPNARE", "KAPSYLÖPPNARE", "VINÖPPNARE", "TERMOMETER",
    "VÅG", "MÅTT", "DL", "LITER", "KILO", "GRAM", "HEKTO", "STYCKE", "PAR",
    "DUSSIN", "TJOG", "GROSS", "MILJON", "MILJARD", "BILJON", "TUSEN", "HUNDRA",
    "TIO", "NOLL", "ETT", "TVÅ", "TRE", "FYRA", "FEM", "SEX", "SJU", "ÅTTA",
    "NIO", "TOLV", "TJUGO", "TRETTIO", "FYRTIO", "FEMTIO", "SEXTIO", "SJUTTIO",
    "ÅTTIO", "NITTIO", "FÖRSTA", "ANDRA", "TREDJE", "FJÄRDE", "FEMTE", "SJÄTTE",
    "SJUNDE", "ÅTTONDE", "NIONDE", "TIONDE", "SISTA", "NÄSTA", "FÖRRA", "DENNA",
    "DETTA", "DESSA", "VILKEN", "VILKET", "VILKA", "INGEN", "INGET", "INGA",
    "NÅGON", "NÅGOT", "NÅGRA", "ALLA", "ALLT", "VARJE", "VARENDA", "VARANNAN",
    "VARANNAT", "BÅDA", "BÅDE", "ANTINGEN", "VARKEN", "HELLER", "DESSUTOM",
    "ÄVEN", "OCKSÅ", "LIKASÅ", "SAMTIDIGT", "DÄREMOT", "EMELLERTID", "DOCK",
    "ÄNDÅ", "TROTS", "FASTÄN", "OM", "IFALL", "SÅ", "DÄRFÖR", "ALLTSÅ", "TY",
    "FÖR", "MEDAN", "NÄR", "DÅ", "SEDAN", "EFTER", "INNAN", "FÖRE", "TILLS",
    "TILL", "FRÅN", "AV", "MED", "UTAN", "OM", "KRING", "RUNT", "ÖVER", "UNDER",
    "PÅ", "I", "VID", "HOS", "MELLAN", "BLAND", "GENOM", "VIA", "LÄNGS", "MOT",
    "ÅT", "FÖR", "TILL", "ENLIGT", "ANGÅENDE", "BETRÄFFANDE", "GÄLLANDE",
    "APROPÅ", "LIKSOM", "SÅSOM", "INKLUSIVE", "EXKLUSIVE", "PLUS", "MINUS",
    "GÅNGER", "DELAT", "PROCENT", "KRONOR", "ÖRE", "EURO", "DOLLAR", "PUND"
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

    for (let mainWord of DAILY_KEYWORDS) {
        if (!dictionary.has(mainWord)) continue;
        // Max length 7 for Level 10
        if (mainWord.length < 3 || mainWord.length > 7) continue;

        const subWords = getSubWords(mainWord, dictionary);

        // Filter subwords: Keep ONLY those in DAILY_KEYWORDS
        const pureDailySubWords = subWords.filter(sw => DAILY_KEYWORDS.has(sw));

        if (pureDailySubWords.length >= 2) {
            candidates.push({
                word: mainWord,
                pureDailySubWords: pureDailySubWords,
                count: pureDailySubWords.length,
                length: mainWord.length
            });
        }
    }

    // Sort by Count (desc)
    candidates.sort((a, b) => b.count - a.count);

    console.log("--- Structured Perfect Daily/Home Levels ---");

    // Bucket 1: Levels 1-3 (2 words, Length 3-4)
    console.log("\n--- Bucket 1 (Levels 1-3): 2 words, Length 3-4 ---");
    candidates.filter(c => c.length >= 3 && c.length <= 4 && c.count >= 2).slice(0, 15).forEach(c => {
        console.log(`WORD: ${c.word} (Len: ${c.length}, Count: ${c.count}) -> ${c.pureDailySubWords.join(', ')}`);
    });

    // Bucket 2: Levels 4-6 (3 words, Length 4-5)
    console.log("\n--- Bucket 2 (Levels 4-6): 3 words, Length 4-5 ---");
    candidates.filter(c => c.length >= 4 && c.length <= 5 && c.count >= 3).slice(0, 15).forEach(c => {
        console.log(`WORD: ${c.word} (Len: ${c.length}, Count: ${c.count}) -> ${c.pureDailySubWords.join(', ')}`);
    });

    // Bucket 3: Levels 7-9 (4 words, Length 5-6)
    console.log("\n--- Bucket 3 (Levels 7-9): 4 words, Length 5-6 ---");
    candidates.filter(c => c.length >= 5 && c.length <= 6 && c.count >= 4).slice(0, 15).forEach(c => {
        console.log(`WORD: ${c.word} (Len: ${c.length}, Count: ${c.count}) -> ${c.pureDailySubWords.join(', ')}`);
    });

    // Bucket 4: Level 10 (5 words, Length 4-7)
    console.log("\n--- Bucket 4 (Level 10): 5 words, Length 4-7 ---");
    candidates.filter(c => c.length >= 4 && c.length <= 7 && c.count >= 5).slice(0, 15).forEach(c => {
        console.log(`WORD: ${c.word} (Len: ${c.length}, Count: ${c.count}) -> ${c.pureDailySubWords.join(', ')}`);
    });
}

analyze();
