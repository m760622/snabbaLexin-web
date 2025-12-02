const fs = require('fs');

const LEXIN_PATH = 'Lexin20210201.csv';

// Expanded Travel Keywords
const TRAVEL_KEYWORDS = new Set([
    "RESA", "RES", "REST", "RESOR", "TÅG", "BUSS", "BIL", "BÅT", "FLYG", "CYKEL",
    "GÅ", "VÄG", "KARTA", "PASS", "VISUM", "HOTELL", "RUM", "BOKA", "BILJETT",
    "STATION", "HAMN", "FLYGPLATS", "SPÅR", "VAGN", "SÄTE", "KÖRA", "ÅKA", "GATA",
    "BRO", "TUNNEL", "KUST", "LAND", "STAD", "BY", "NORR", "SÖDER", "ÖSTER",
    "VÄSTER", "BAGAGE", "VÄSKA", "RYGGSÄCK", "TURIST", "GUIDE", "SEMESTER", "LOV",
    "UTFLYKT", "CAMPING", "TÄLT", "HUSBIL", "FÄRJA", "KRYSSNING", "SEGLA", "RODD",
    "KANOT", "TAXI", "MOPED", "MOTORCYKEL", "LASTBIL", "TRAFIK", "KÖ", "STOPP",
    "LJUS", "KORSNING", "RONDELL", "AVFART", "PÅFART", "MOTORVÄG", "LANDSVÄG",
    "STIG", "LED", "VANDRA", "KLÄTTRA", "SIMMA", "DYKA", "SOLA", "BADA", "SKIDOR",
    "PULKA", "SKRIDSKOR", "HJUL", "DÄCK", "RATT", "MOTOR", "BENSIN", "DIESEL",
    "OLJA", "TANKA", "PARKERA", "GARAGE", "REPARATION", "VERKSTAD", "TUR", "RETUR",
    "ANKOMST", "AVGÅNG", "FÖRSENAD", "INSTÄLLD", "PLATS", "SÄTE", "HYTT", "KOJ",
    "DURK", "KÖL", "RODER", "ANKARE", "KAJ", "PIR", "BOJ", "FYR", "LOTS", "TULL",
    "GRÄNS", "VALUTA", "PENGAR", "KORT", "KONTANT", "BANK", "POST", "TELEFON",
    "INTERNET", "WIFI", "KOD", "NYCKEL", "LÅS", "SÄNG", "FRUKOST", "LUNCH",
    "MIDDAG", "RESTAURANG", "CAFÉ", "BAR", "MENY", "NOTA", "DRICKS", "MAT",
    "DRYCK", "VATTEN", "KAFFE", "TE", "ÖL", "VIN", "GLASS", "GODIS", "SNACKS",
    "FRUKT", "GRÖNSAK", "BRÖD", "KÖTT", "FISK", "KYCKLING", "SALLAD", "SOPPA",
    "SÅS", "POTATIS", "RIS", "PASTA", "PIZZA", "HAMBURGARE", "KORV", "MACKA",
    "SMÖRGÅS", "ÄGG", "OST", "SKINKA", "BACON", "YOGHURT", "FIL", "FLINGOR",
    "GRÖT", "MJÖLK", "JUICE", "LÄSK", "SAFT", "BULLE", "KAKA", "TÅRTA", "CHOKLAD",
    "NÖTTER", "CHIPS", "BIO", "TEATER", "MUSEUM", "KYRKA", "SLOTT", "TORG", "PARK",
    "ZOO", "NÖJESPARK", "BADHUS", "GYM", "SPA", "BASTU", "FRISÖR", "APOTEK",
    "SJUKHUS", "POLIS", "BRANDKÅR", "AMBULANS", "LÄKARE", "TANDLÄKARE", "VETERINÄR",
    "SKOLA", "DAGIS", "FRITIDS", "UNIVERSITET", "BIBLIOTEK", "BOKHANDEL", "AFFÄR",
    "BUTIK", "VARUHUS", "GALLERIA", "MARKNAD", "LOPPIS", "REA", "PRIS", "KVITTO",
    "PÅSE", "KASSE", "KORG", "KLÄDER", "SKOR", "JACKA", "BYXOR", "TRÖJA", "KJOL",
    "KLÄNNING", "KOSTYM", "SKJORTA", "BLUS", "LINNE", "TSHIRT", "SHORTS", "BADKLÄDER",
    "UNDERKLÄDER", "STRUMPOR", "MÖSSA", "VANTAR", "HALSDUK", "KEPS", "HATT",
    "GLASÖGON", "SOLGLASÖGON", "KLOCKA", "SMYCKE", "RING", "HALSBAND", "ARMBAND",
    "ÖRHÄNGEN", "PARFYM", "SMINK", "TVÅL", "SCHAMPO", "TANDKRÄM", "TANDBORSTE",
    "KAM", "BORSTE", "RAKHYVEL", "HANDDUK", "LAKAN", "KUDDE", "TÄCKE", "FILT",
    "MATTA", "LAMPA", "STOL", "BORD", "SOFFA", "FÅTÖLJ", "HYLLA", "SKÅP", "LÅDA",
    "SPEGEL", "TAVLA", "BLOMMA", "KRUKA", "VAS", "LJUSSTAKE", "GARDIN", "KUDDFODRAL",
    "DUK", "SERVETT", "TALLRIK", "GLAS", "KOPP", "MUGG", "SKÅL", "FAT", "BESTICK",
    "KNIV", "GAFFEL", "SKED", "KASTRULL", "STEKPANNA", "UGNSFORM", "VISP", "SLEV",
    "KNIVBLOCK", "SKÄRBRÄDA", "DURKSLAG", "RIVJÄRN", "KONSERVÖPPNARE", "KAPSYLÖPPNARE",
    "VINÖPPNARE", "SAX", "TEJP", "LIM", "GEM", "HÄFTAPPARAT", "HÅLSLAG", "PENNA",
    "SUDDGUMMI", "LINJAL", "BLOCK", "KALENDER", "PÄRM", "MAPP", "KUVERT", "FRIMÄRKE",
    "VYKORT", "BREV", "PAKET", "SEGEL", "MAST", "ÅRA", "ANKOMMA", "AVGÅ", "LANDA",
    "STARTA", "LYFTA", "CHECKIN", "GATE", "BOARDING", "SÄKERHET", "KONTROLL",
    "TULLEN", "PASSKONTROLL", "VISUMKONTROLL", "BAGAGEBAND", "HITTEGODS", "INFORMATION",
    "TOALETTER", "VÄNTHALL", "PERRONG", "SPÅR", "VAGN", "LOK", "KONDUKTÖR", "FÖRARE",
    "PILOT", "KAPTEN", "STYRMAN", "MATROS", "VÄRDINNA", "STEWARD", "GUIDE", "RESELEDARE",
    "RECEPTION", "LOBBY", "HISS", "TRAPPA", "VÅNING", "RUMSNUMMER", "NYCKELKORT",
    "FUKOSTBUFFÉ", "MINIBAR", "ROOMSERVICE", "STÄDNING", "TVÄTT", "STRYKNING",
    "VÄCKNING", "TAXI", "TRANSFER", "HYRBIL", "PARKERING", "BENSINSTATION", "MACK",
    "RASTPLATS", "VÄGKROG", "MOTELL", "VANDRARHEM", "BEDANDBREAKFAST", "AIRBNB",
    "COUCHSURFING", "TÅGLUFF", "BACKPACKING", "CHARTER", "SISTA", "MINUTEN",
    "ALLINCLUSIVE", "HALVPENSION", "HELPENSION", "ENKELRUM", "DUBBELRUM", "SVIIT",
    "HAVSUTSIKT", "BALKONG", "TERRASS", "POOL", "STRAND", "SOLSTOL", "PARASOLL",
    "HANDDUK", "BADLAKAN", "SOLKRÄM", "SOLGLASÖGON", "SIMFÖTTER", "CYKLOP", "SNORKEL",
    "LUFTMADRASS", "BADBOLL", "HINK", "SPADE", "SANDSLOTT", "SNÄCKA", "STEN",
    "KRABBA", "FISK", "MANET", "TÅNG", "SJÖGRÄS", "VÅG", "BRIS", "VIND", "SOL",
    "MOLN", "REGN", "ÅSKA", "BLIXT", "STORM", "ORKAN", "TSUNAMI", "JORDBÄVNING",
    "VULKAN", "BERG", "DAL", "FLOD", "SJÖ", "HAV", "OCEAN", "Ö", "HOLME", "SKÄR",
    "GRUND", "REV", "KORALL", "GROTTA", "VATTENFALL", "GLACIÄR", "FJORD", "BUKT",
    "VIK", "SUND", "NÄS", "UDDE", "HALVÖ", "KUST", "STRAND", "DYNER", "ÖKEN",
    "OAS", "SAVANN", "DJUNGEL", "REGNSKOG", "SKOG", "TRÄD", "BUSKE", "BLOMMA",
    "GRÄS", "MOSS", "LAV", "SVAMP", "BÄR", "FRUKT", "NÖT", "FRÖ", "ROT", "STAM",
    "GREN", "LÖV", "BARR", "KOTTE", "DJUR", "FÅGEL", "FISK", "INSEKT", "SPINDEL",
    "ORM", "ÖDLA", "GRODA", "PAGGA", "SKÖLDPADDA", "KROKODIL", "ALLIGATOR", "HAJ",
    "VAL", "DELFIN", "SÄL", "PINGVIN", "ISBJÖRN", "VARG", "BJÖRN", "LO", "JÄRV",
    "RÄV", "GRÄVLING", "MÅRD", "ILLER", "UTTER", "BÄVER", "EKORRE", "HARE", "KANIN",
    "RÅTTA", "MUS", "SORK", "IGELKOTT", "FLADDERMUS", "ÄLG", "HJORT", "RÅDJUR",
    "REN", "VILDSSVIN", "GRIS", "KO", "TJUR", "KALV", "HÄST", "STO", "HINGST",
    "FÖL", "ÅSNA", "MULA", "FÅR", "BAGGE", "TACKA", "LAMM", "GET", "BOCK", "KILLING",
    "HÖNA", "TUPP", "KYCKLING", "KALKON", "GÅS", "ANKA", "AND", "SVAN", "TRANA",
    "HÄGER", "STORK", "PELIKAN", "FLAMINGO", "PINGVIN", "STRUTS", "EMU", "KASUAR",
    "KIWI", "PAPEGOJA", "UNDULAT", "KANARIEFÅGEL", "FINK", "MES", "SPARV", "SVALA",
    "STAR", "TRAST", "KOLTRAST", "SKATA", "KRAKA", "KORP", "ÖRN", "HÖK", "FALK",
    "UGGLA", "GÖK", "HACKSPETT", "DUVA", "MÅS", "TRUT", "TÄRNA", "LUNNEFÅGEL",
    "ALKA", "GRISSLA", "SKARV"
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

    for (let mainWord of TRAVEL_KEYWORDS) {
        if (!dictionary.has(mainWord)) continue;
        // Max length 7 for Level 10
        if (mainWord.length < 3 || mainWord.length > 7) continue;

        const subWords = getSubWords(mainWord, dictionary);

        // Filter subwords: Keep ONLY those in TRAVEL_KEYWORDS
        const pureTravelSubWords = subWords.filter(sw => TRAVEL_KEYWORDS.has(sw));

        if (pureTravelSubWords.length >= 2) {
            candidates.push({
                word: mainWord,
                pureTravelSubWords: pureTravelSubWords,
                count: pureTravelSubWords.length,
                length: mainWord.length
            });
        }
    }

    // Sort by Count (desc)
    candidates.sort((a, b) => b.count - a.count);

    console.log("--- Structured Perfect Travel Levels ---");

    // Bucket 1: Levels 1-3 (2 words, Length 3-4)
    console.log("\n--- Bucket 1 (Levels 1-3): 2 words, Length 3-4 ---");
    candidates.filter(c => c.length >= 3 && c.length <= 4 && c.count >= 2).slice(0, 15).forEach(c => {
        console.log(`WORD: ${c.word} (Len: ${c.length}, Count: ${c.count}) -> ${c.pureTravelSubWords.join(', ')}`);
    });

    // Bucket 2: Levels 4-6 (3 words, Length 4-5)
    console.log("\n--- Bucket 2 (Levels 4-6): 3 words, Length 4-5 ---");
    candidates.filter(c => c.length >= 4 && c.length <= 5 && c.count >= 3).slice(0, 15).forEach(c => {
        console.log(`WORD: ${c.word} (Len: ${c.length}, Count: ${c.count}) -> ${c.pureTravelSubWords.join(', ')}`);
    });

    // Bucket 3: Levels 7-9 (4 words, Length 5-6)
    console.log("\n--- Bucket 3 (Levels 7-9): 4 words, Length 5-6 ---");
    candidates.filter(c => c.length >= 5 && c.length <= 6 && c.count >= 4).slice(0, 15).forEach(c => {
        console.log(`WORD: ${c.word} (Len: ${c.length}, Count: ${c.count}) -> ${c.pureTravelSubWords.join(', ')}`);
    });

    // Bucket 4: Level 10 (5 words, Length 4-7)
    console.log("\n--- Bucket 4 (Level 10): 5 words, Length 4-7 ---");
    candidates.filter(c => c.length >= 4 && c.length <= 7 && c.count >= 5).slice(0, 15).forEach(c => {
        console.log(`WORD: ${c.word} (Len: ${c.length}, Count: ${c.count}) -> ${c.pureTravelSubWords.join(', ')}`);
    });
}

analyze();
