const fs = require('fs');

const LEXIN_PATH = 'Lexin20210201.csv';

// Comprehensive Shopping/Clothes Keywords List
const SHOPPING_KEYWORDS = new Set([
    "SHOPPA", "KÖPA", "SÄLJA", "REA", "PRIS", "KASSA", "KVITTO", "PENGAR", "KORT",
    "KUND", "BUTIK", "AFFÄR", "MARKNAD", "TORG", "VARA", "PÅSE", "VAGN", "KORG",
    "KLÄDER", "TRÖJA", "BYXA", "KJOL", "KLÄNNING", "SKOR", "STRUMPA", "JACKA",
    "KAPPA", "ROCK", "MÖSSA", "VANTE", "HALSDUK", "SKJORTA", "BLUS", "VÄST",
    "KOFTA", "TROSOR", "KALSONGER", "BH", "BÄLTE", "SLIPS", "FLUGA", "KOSTYM",
    "STORLEK", "FÄRG", "PROVA", "PASSAR", "SNYGG", "FUL", "DYR", "BILLIG",
    "MODE", "STIL", "MÄRKE", "KVALITET", "TYG", "BOMULL", "ULL", "SIDEN",
    "LÄDER", "SKINN", "GULD", "SILVER", "SMYCKE", "RING", "HALSBAND", "ARMBAND",
    "ÖRHÄNGE", "KLOCKA", "VÄSKA", "PLÅNBOK", "RYGGSÄCK", "HANDLA", "BETALA",
    "SPARA", "SLÖSA", "LÅNA", "SKULD", "RÄKNING", "MYNT", "SEDEL", "BANK",
    "KONTO", "RÄNTA", "LÖN", "RABATT", "ERBJUDANDE", "FYND", "LOPPIS", "SECONDHAND",
    "RETUR", "BYTE", "ÖPPET", "STÄNGT", "LAGER", "HYLLA", "DISK", "SKYLT",
    "PROVRUM", "SPEGEL", "GALGE", "KNAPP", "DRAGKEDJA", "FICKA", "KRAGE",
    "ÄRM", "BEN", "MIDJA", "SÖM", "TRÅD", "NÅL", "SAX", "MÅTTBAND", "SY",
    "LAGA", "TVÄTTA", "STRYKA", "REN", "SMUTSIG", "TRASIG", "HEL", "NY",
    "GAMMAL", "MODERN", "OANVÄND", "BEGAGNAD", "ÄKTA", "FALSK", "KOPIA",
    "LYX", "BUDGET", "UNIK", "VANLIG", "SPECIELL", "POPULÄR", "TRENDIG",
    "SVART", "VIT", "RÖD", "BLÅ", "GUL", "GRÖN", "BRUN", "GRÅ", "ROSA",
    "LILA", "ORANGE", "BEIGE", "TURKOS", "MÖRK", "LJUS", "KLAR", "MATT",
    "BLANK", "MÖNSTRAD", "RANDIG", "RUTIG", "PRICKIG", "BLOMMIG", "ENFÄRGAD",
    "MJUK", "HÅRD", "SKÖN", "OBEKVÄM", "VARM", "KALL", "TOCK", "TUNN",
    "LÅNG", "KORT", "STOR", "LITEN", "TRÅNG", "VID", "BRED", "SMAL",
    "HÖG", "LÅG", "DYRBAR", "VÄRDEFULL", "BILLIGT", "GRATIS", "KOSTAR",
    "VÄRD", "SUMMA", "TOTALT", "MOMS", "SKATT", "VALUTA", "KRONA", "ÖRE",
    "EURO", "DOLLAR", "PUND", "IMPORT", "EXPORT", "HANDEL", "KONSUMENT",
    "SÄLJARE", "KÖPARE", "ÄGARE", "CHEF", "PERSONAL", "BITRÄDE", "MODELL",
    "DESIGN", "DESIGNER", "SKRÄDDARE", "SKOMAKARE", "JUVELERARE", "GULDSMED",
    "OPTICER", "APOTEK", "KIOSK", "MACK", "VARUHUS", "GALLERIA", "CENTRUM",
    "CITY", "STAN", "NÄTET", "ONLINE", "WEBBSHOP", "HEMSIDA", "APP", "KOD",
    "LÖSENORD", "LOGGA", "REGISTRERA", "BESTÄLLA", "LEVERANS", "FRAKT", "POST",
    "PAKET", "BREV", "AVI", "HÄMTA", "SKICKA", "RETUNERA", "REKLAMERA", "ÅNGRA",
    "NÖJD", "MISSNÖJD", "KLAGA", "BYTA", "LÄMNA", "FÅ", "GE", "TA",
    "HA", "ÄGA", "VILJA", "BEHÖVA", "SÖKA", "HITTA", "VÄLJA", "BESLUTA",
    "BESTÄMMA", "TVEKA", "FUNDERA", "JÄMFÖRA", "TESTA", "PROVA", "KÄNNA",
    "TITTA", "SE", "HÖRA", "LUKTA", "SMAKA", "GILLA", "TYCKA", "ÄLSKA",
    "HATA", "AVSKY", "UNDVIKA", "VÄGRA", "NEKA", "ACCEPTERA", "GODKÄNNA",
    "SKRIVA", "LÄSA", "RÄKNA", "TALA", "PRATA", "FRÅGA", "SVARA", "SÄGA",
    "BERÄTTA", "VISA", "PEKA", "GEST", "MIN", "LEENDE", "SKRATT", "GRÅT",
    "TÅR", "GLÄDJE", "LYCKA", "SORG", "ILSKA", "VREDE", "RÄDSLA", "ORO",
    "STRESS", "LUGN", "RO", "VILA", "PAUS", "RAST", "FIKA", "KAFFE",
    "TE", "KAKA", "BULLE", "TÅRTA", "GLASS", "GODIS", "CHOKLAD", "LÄSK",
    "VATTEN", "JUICE", "MJÖLK", "ÖL", "VIN", "SPRIT", "MAT", "BRÖD",
    "SMÖR", "OST", "KÖTT", "FISK", "KYCKLING", "ÄGG", "GRÖNSAK", "FRUKT",
    "BÄR", "KRYDDA", "SÅS", "SOPPA", "GRYTA", "SALLAD", "PASTA", "RIS",
    "POTATIS", "PIZZA", "BURGARE", "KORV", "MACKA", "SMÖRGÅS", "LUNCH",
    "MIDDAG", "FRUKOST", "KVÄLLSMAT", "MELLANMÅL", "SNACKS", "TUGGUMMI", "TABLETT",
    "MEDICIN", "PLÅSTER", "SALVA", "KRÄM", "TVÅL", "SCHAMPO", "BALSAM", "DEO",
    "PARFYM", "SMINK", "LÄPPSTIFT", "MASCARA", "PUDER", "LACK", "BORSTE", "KAM",
    "RAKHYVEL", "BLAD", "SKUM", "GEL", "VAX", "SPRAY", "MOUSSE", "FÄRG",
    "TONING", "SLINGOR", "KLIPP", "FRISYR", "LUGG", "TOPPAR", "NACKE", "SIDA",
    "BEN", "ARM", "HAND", "FOT", "HUVUD", "ANSIKTE", "KROPP", "HUD",
    "HÅR", "NAGEL", "ÖGA", "ÖRA", "NÄSA", "MUN", "TAND", "LEENDE",
    "BLICK", "SYN", "HÖRSEL", "LUKT", "SMAK", "KÄNSEL", "TANKE", "MINNE",
    "DRÖM", "FANTASI", "IDÉ", "PLAN", "MÅL", "MENING", "SYFTE", "RESULTAT",
    "EFFEKT", "KONSEKVENS", "ORSAK", "ANLEDNING", "GRUND", "BAS", "TOPP",
    "BOTTEN", "MITT", "SIDA", "KANT", "HÖRN", "VINKEL", "RAK", "KROKIG",
    "RUND", "FYRKANTIG", "PLATT", "TJOCK", "SMAL", "BRED", "HÖG", "LÅG",
    "LÅNG", "KORT", "STOR", "LITEN", "TUNG", "LÄTT", "HÅRD", "MJUK",
    "VARM", "KALL", "TORR", "VÅT", "FUKTIG", "BLÖT", "REN", "SMUTSIG",
    "FIN", "FUL", "BRA", "DÅLIG", "RÄTT", "FEL", "SANT", "FALSKT",
    "JA", "NEJ", "KANSKE", "NOG", "VÄL", "JU", "NÄSTAN", "UNGEFÄR",
    "CIRKA", "EXAKT", "PRECIS", "JUST", "BARA", "ENDAST", "MINST", "MEST",
    "ALLT", "INGET", "NÅGOT", "VAD", "VEM", "VAR", "NÄR", "HUR",
    "VARFÖR", "DÄRFÖR", "ATT", "OM", "MEN", "ELLER", "OCH", "SAMT",
    "MED", "UTAN", "TILL", "FRÅN", "PÅ", "I", "VID", "HOS",
    "ÖVER", "UNDER", "FRAMFÖR", "BAKOM", "MELLAN", "BLAND", "GENOM", "MOT",
    "FÖR", "AV", "OMKRING", "RUNT", "INOM", "UTOM", "ENLIGT", "ANGÅENDE"
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

    for (let mainWord of SHOPPING_KEYWORDS) {
        if (!dictionary.has(mainWord)) continue;
        // Max length 7 for Level 10
        if (mainWord.length < 3 || mainWord.length > 7) continue;

        const subWords = getSubWords(mainWord, dictionary);

        // Filter subwords: Keep ONLY those in SHOPPING_KEYWORDS
        const pureShoppingSubWords = subWords.filter(sw => SHOPPING_KEYWORDS.has(sw));

        if (pureShoppingSubWords.length >= 2) {
            candidates.push({
                word: mainWord,
                pureShoppingSubWords: pureShoppingSubWords,
                count: pureShoppingSubWords.length,
                length: mainWord.length
            });
        }
    }

    // Sort by Count (desc)
    candidates.sort((a, b) => b.count - a.count);

    console.log("--- Structured Perfect Shopping/Clothes Levels ---");

    // Bucket 1: Levels 1-3 (2 words, Length 3-4)
    console.log("\n--- Bucket 1 (Levels 1-3): 2 words, Length 3-4 ---");
    candidates.filter(c => c.length >= 3 && c.length <= 4 && c.count >= 2).slice(0, 15).forEach(c => {
        console.log(`WORD: ${c.word} (Len: ${c.length}, Count: ${c.count}) -> ${c.pureShoppingSubWords.join(', ')}`);
    });

    // Bucket 2: Levels 4-6 (3 words, Length 4-5)
    console.log("\n--- Bucket 2 (Levels 4-6): 3 words, Length 4-5 ---");
    candidates.filter(c => c.length >= 4 && c.length <= 5 && c.count >= 3).slice(0, 15).forEach(c => {
        console.log(`WORD: ${c.word} (Len: ${c.length}, Count: ${c.count}) -> ${c.pureShoppingSubWords.join(', ')}`);
    });

    // Bucket 3: Levels 7-9 (4 words, Length 5-6)
    console.log("\n--- Bucket 3 (Levels 7-9): 4 words, Length 5-6 ---");
    candidates.filter(c => c.length >= 5 && c.length <= 6 && c.count >= 4).slice(0, 15).forEach(c => {
        console.log(`WORD: ${c.word} (Len: ${c.length}, Count: ${c.count}) -> ${c.pureShoppingSubWords.join(', ')}`);
    });

    // Bucket 4: Level 10 (5 words, Length 4-7)
    console.log("\n--- Bucket 4 (Level 10): 5 words, Length 4-7 ---");
    candidates.filter(c => c.length >= 4 && c.length <= 7 && c.count >= 5).slice(0, 15).forEach(c => {
        console.log(`WORD: ${c.word} (Len: ${c.length}, Count: ${c.count}) -> ${c.pureShoppingSubWords.join(', ')}`);
    });
}

analyze();
