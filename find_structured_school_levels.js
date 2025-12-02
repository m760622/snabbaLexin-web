const fs = require('fs');

const LEXIN_PATH = 'Lexin20210201.csv';

// Expanded School/Work Keywords List
const SCHOOL_KEYWORDS = new Set([
    "SKOLA", "JOBB", "ARBETE", "LÄRARE", "ELEV", "CHEF", "KOLLEGA", "KONTOR",
    "KLASS", "RUM", "BOK", "PENNA", "SUDD", "DATOR", "PÄRM", "BLOCK", "TEST",
    "PROV", "LÄXA", "RAST", "LOV", "LÖN", "SKATT", "MÖTE", "TID", "SCHEMA",
    "KURS", "BETYG", "STUDIE", "PLUGGA", "LÄSA", "SKRIVA", "RÄKNA", "TALA",
    "LYSSNA", "LÄRA", "KUNNA", "VETA", "FRÅGA", "SVARA", "TENTA", "EXAMEN",
    "UNIVERSITET", "HÖGSKOLA", "GYMNASIUM", "DAGIS", "FRITIDS", "LEKTION",
    "TERMIN", "ÅRSKURS", "ÄMNE", "MATTE", "SVENSKA", "ENGELSKA", "IDROTT",
    "BILD", "SLÖJD", "MUSIK", "SO", "NO", "FIKA", "LUNCH", "MATSAL", "AULA",
    "BIBLIOTEK", "SKOLGÅRD", "KORRIDOR", "SKÅP", "BÄNK", "STOL", "TAVLA",
    "KRITA", "PENNVÄSSARE", "LINJAL", "SAX", "LIM", "TEJP", "GEM", "HÄFTAPPARAT",
    "HÅLSLAG", "MAP", "PAPPER", "KOPIATOR", "SKRIVARE", "TELEFON", "MOBIL",
    "MEJL", "BREV", "RAPPORT", "PROJEKT", "GRUPP", "UPPGIFT", "MÅL", "PLAN",
    "IDE", "TANKE", "LÖSNING", "PROBLEM", "FEL", "RÄTT", "BRA", "DÅLIG",
    "SVÅR", "LÄTT", "ROLIG", "TRÅKIG", "VIKTIG", "INTRESSANT", "NYTTIG",
    "KUNSKAP", "UTBILDNING", "YRKE", "KARRIÄR", "ANSÖKAN", "CV", "INTERVJU",
    "ANSTÄLLD", "PERSONAL", "FÖRETAG", "FIRMA", "BOLAG", "EGEN", "STARTA",
    "DRIVA", "SÄLJA", "KÖPA", "VINST", "FÖRLUST", "KUND", "MARKNAD", "REKLAM",
    "PRIS", "VARA", "TJÄNST", "AVTAL", "KONTRAKT", "LAG", "REGEL", "POLICY",
    "RUTIN", "METOD", "SYSTEM", "VERKTYG", "MASKIN", "FORDON", "BIL", "BUSS",
    "TÅG", "RESA", "PENDLA", "HEM", "BORTA", "SJUK", "FRISK", "LEDIG", "SEMESTER",
    "HELGDAG", "VARDAG", "MORGON", "KVÄLL", "NATT", "DAG", "VECKA", "MÅNAD",
    "ÅR", "TIDIG", "SEN", "PUNKT", "KLOCKA", "TIMME", "MINUT", "SEKUND",
    "STRESS", "PRESS", "KRAV", "ANSVAR", "MAKT", "STATUS", "TITEL", "ROLL",
    "UPPDRAG", "TJÄNST", "VIKARIE", "REKTOR", "VAKTMÄSTARE", "STÄDARE", "KOCK",
    "CHAUFFÖR", "POLIS", "LÄKARE", "SJUKSKÖTERSKA", "BRANDMAN", "ADVOKAT",
    "DOMARE", "PRÄST", "MILITÄR", "POLITIKER", "KONSTNÄR", "FÖRFATTARE",
    "MUSIKER", "SKÅDESPELARE", "SÅNGARE", "DANSARE", "IDROTTARE", "BONDE",
    "FISKARE", "HANTVERKARE", "SNICKARE", "MÅLARE", "RÖRMOKARE", "ELEKTRIKER",
    "MEKANIKER", "INGENJÖR", "ARKITEKT", "DESIGNER", "PROGRAMMERARE", "TEKNIKER",
    "FORSKARE", "LÄRARE", "JOURNALIST", "FOTOGRAF", "TOLK", "GUIDE", "SÄLJARE",
    "EKONOM", "JURIST", "SEKRETERARE", "RECEPTIONIST", "VÄKTARE", "BULLER",
    "TYSTNAD", "RO", "KONCENTRATION", "FOKUS", "MINNE", "LOGIK", "KREATIVITET",
    "FANTASI", "SAMARBETE", "DISKUSSION", "DEBATT", "ARGUMENT", "ÅSIKT",
    "BESLUT", "RESULTAT", "FRAMGÅNG", "MISSLYCKANDE", "UTVECKLING", "FRAMSTEG",
    "FÖRÄNDRING", "NYHET", "INFORMATION", "FAKTA", "SANNING", "LÖGN", "RYKTE",
    "SKVALLER", "HEMLIGHET", "PRIVAT", "OFFENTLIG", "STATLIG", "KOMMUNAL",
    "PRIVAT", "IDEELL", "FÖRENING", "KLUBB", "ORGANISATION", "MYNDIGHET",
    "VERK", "STYRELSE", "NÄMND", "RÅD", "KOMMITTE", "GRUPP", "TEAM", "LAG",
    "AVDELNING", "ENHET", "SEKTION", "FILIAL", "KONTOR", "FABRIK", "LAGER",
    "VERKSTAD", "ATELJE", "STUDIO", "LABORATORIUM", "KLINIK", "MOTTAGNING",
    "BUTIK", "AFFÄR", "VARUHUS", "GALLERIA", "TORG", "MARKNAD", "MÄSSA",
    "UTSTÄLLNING", "KONFERENS", "KONGRESS", "SEMINARIUM", "FÖRELÄSNING",
    "KURS", "UTBILDNING", "SKOLA", "UNIVERSITET", "HÖGSKOLA", "INSTITUT",
    "AKADEMI", "CENTRUM", "INSTITUTION", "FAKULTET", "CAMPUS", "STUDENT",
    "LÄRARE", "PROFESSOR", "DOCENT", "DOKTORAND", "FORSKARE", "ASSISTENT",
    "ADMINISTRATÖR", "VAKTMÄSTARE", "BIBLIOTEKARIE", "SYV", "KURATOR",
    "SKOLSKÖTERSKA", "PSYKOLOG", "MENTOR", "HANDLEDARE", "COACH", "TRÄNARE",
    "LEDARE", "CHEF", "DIREKTÖR", "VD", "STYRELSEORDFÖRANDE", "ÄGARE",
    "GRUNDARE", "ENTREPRENÖR", "INVESTERARE", "AKTIEÄGARE", "PARTNER",
    "MEDARBETARE", "KOLLEGA", "KAMRAT", "VÄN", "KONTAKT", "NÄTVERK",
    "SAL", "ORD", "TAL", "MER", "SER", "GÖR", "FÅR", "TAR", "GER", "DUM",
    "SEN", "DAG", "ÅR", "LÄR", "GÅR", "STÅ", "SITT", "SKRIV", "LÄS",
    "KUL", "LEK", "SPEL", "HJÄLP", "SÖK", "FINN", "LÖS", "SVAR", "VISA",
    "SE", "HÖR", "KAN", "VILL", "SKA", "MÅSTE", "BÖR", "FÅ", "BOK", "PENNA",
    "SUDD", "TEJP", "LIM", "SAX", "MAP", "FIL", "APP", "KOD", "DATA", "WIFI",
    "NÄT", "LÄNK", "SIDA", "TEXT", "BILD", "LJUD", "FILM", "FOTO", "VIDEO",
    "CHATT", "FORUM", "BLOGG", "VLOGG", "PODD", "RADIO", "TV", "MEDIA", "PRESS",
    "NYHET", "NOTIS", "RUBRIK", "INGRESS", "BRÖDTEXT", "KÄLLA", "CITAT",
    "REFERENS", "FOTNOT", "INDEX", "REGISTER", "LISTA", "TABELL", "GRAF",
    "DIAGRAM", "KARTA", "SKISS", "RITNING", "MODELL", "PROTOTYP", "PRODUKT",
    "TJÄNST", "VARA", "SAK", "TING", "OBJEKT", "ARTIKEL", "INLÄGG", "KOMMENTAR",
    "RECENSION", "KRITIK", "BERÖM", "PRIS", "BELÖNING", "STRAFF", "BÖTER",
    "FÄNGELSE", "DOM", "LAG", "RÄTT", "FEL", "SANT", "FALSKT", "JA", "NEJ",
    "KANSKE", "NOG", "VÄL", "JU", "NÄSTAN", "UNGEFÄR", "CIRKA", "EXAKT",
    "PRECIS", "JUST", "BARA", "ENDAST", "MINST", "MEST", "FLEST", "FÄRST",
    "BÄST", "SÄMST", "HÖGST", "LÄGST", "STÖRST", "MINST", "LÄNGST", "KORTAST",
    "TYNGST", "LÄTTAST", "DYRAST", "BILLIGAST", "RIKAST", "FATTIGAST",
    "VACKRAST", "FULAST", "KLOKAST", "DUMMAST", "SNÄLLAST", "ELAKAST",
    "ROLIGAST", "TRÅKIGAST", "SVÅRAST", "LÄTTAST", "VIKTIGAST", "OVÄSENTLIGAST"
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

    for (let mainWord of SCHOOL_KEYWORDS) {
        if (!dictionary.has(mainWord)) continue;
        // Max length 7 for Level 10
        if (mainWord.length < 3 || mainWord.length > 7) continue;

        const subWords = getSubWords(mainWord, dictionary);

        // Filter subwords: Keep ONLY those in SCHOOL_KEYWORDS
        const pureSchoolSubWords = subWords.filter(sw => SCHOOL_KEYWORDS.has(sw));

        if (pureSchoolSubWords.length >= 2) {
            candidates.push({
                word: mainWord,
                pureSchoolSubWords: pureSchoolSubWords,
                count: pureSchoolSubWords.length,
                length: mainWord.length
            });
        }
    }

    // Sort by Count (desc)
    candidates.sort((a, b) => b.count - a.count);

    console.log("--- Structured Perfect School/Work Levels ---");

    // Bucket 1: Levels 1-3 (2 words, Length 3-4)
    console.log("\n--- Bucket 1 (Levels 1-3): 2 words, Length 3-4 ---");
    candidates.filter(c => c.length >= 3 && c.length <= 4 && c.count >= 2).slice(0, 15).forEach(c => {
        console.log(`WORD: ${c.word} (Len: ${c.length}, Count: ${c.count}) -> ${c.pureSchoolSubWords.join(', ')}`);
    });

    // Bucket 2: Levels 4-6 (3 words, Length 4-5)
    console.log("\n--- Bucket 2 (Levels 4-6): 3 words, Length 4-5 ---");
    candidates.filter(c => c.length >= 4 && c.length <= 5 && c.count >= 3).slice(0, 15).forEach(c => {
        console.log(`WORD: ${c.word} (Len: ${c.length}, Count: ${c.count}) -> ${c.pureSchoolSubWords.join(', ')}`);
    });

    // Bucket 3: Levels 7-9 (4 words, Length 5-6)
    console.log("\n--- Bucket 3 (Levels 7-9): 4 words, Length 5-6 ---");
    candidates.filter(c => c.length >= 5 && c.length <= 6 && c.count >= 4).slice(0, 15).forEach(c => {
        console.log(`WORD: ${c.word} (Len: ${c.length}, Count: ${c.count}) -> ${c.pureSchoolSubWords.join(', ')}`);
    });

    // Bucket 4: Level 10 (5 words, Length 4-7)
    console.log("\n--- Bucket 4 (Level 10): 5 words, Length 4-7 ---");
    candidates.filter(c => c.length >= 4 && c.length <= 7 && c.count >= 5).slice(0, 15).forEach(c => {
        console.log(`WORD: ${c.word} (Len: ${c.length}, Count: ${c.count}) -> ${c.pureSchoolSubWords.join(', ')}`);
    });
}

analyze();
