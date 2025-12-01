// ========================================
//  SWEDISH WORD CONNECT DATA
// ========================================

// --- THEMED WORLDS DATA ---
const WC_THEMES = [
    {
        id: 'food',
        name: 'Mat & Dryck / الطعام والشراب',
        icon: '🍎',
        background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)',
        accent: '#e11d48',
        words: [
            { word: "MAT", sentence: "Mat är viktigt för hälsan." },
            { word: "ÄTA", sentence: "Vi ska äta middag nu." },
            { word: "KAFFE", sentence: "Jag dricker kaffe varje morgon." },
            { word: "MJÖLK", sentence: "Barn behöver mjölk för att växa." },
            { word: "BRÖD", sentence: "Färskt bröd doftar gott." },
            { word: "KOCK", sentence: "Kocken lagar god mat." },
            { word: "RECEPT", sentence: "Följ receptet noga." },
            { word: "SMAK", sentence: "Matens smak var fantastisk." },
            { word: "LUNCH", sentence: "Vi äter lunch klockan tolv." },
            { word: "GRÖT", sentence: "Gröt är nyttig frukost." }
        ]
    },
    {
        id: 'nature',
        name: 'Naturen / الطبيعة',
        icon: '🌲',
        background: 'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)',
        accent: '#059669',
        words: [
            { word: "TRÄD", sentence: "Trädet ger oss skugga." },
            { word: "SOL", sentence: "Solen skiner idag." },
            { word: "HAV", sentence: "Havet är blått och djupt." },
            { word: "SKOG", sentence: "Vi promenerar i skogen." },
            { word: "BERG", sentence: "Berget är högt att bestiga." },
            { word: "FLOD", sentence: "Floden rinner genom staden." },
            { word: "MOLN", sentence: "Det finns vita moln på himlen." },
            { word: "STJÄRNA", sentence: "En stjärna lyser i natten." },
            { word: "BLAD", sentence: "Trädens blad faller på hösten." },
            { word: "MARK", sentence: "Marken är täckt av snö." }
        ]
    },
    {
        id: 'travel',
        name: 'Resor / السفر',
        icon: '✈️',
        background: 'linear-gradient(to top, #4481eb 0%, #04befe 100%)',
        accent: '#2563eb',
        words: [
            { word: "RESA", sentence: "Att resa är att leva." },
            { word: "TÅG", sentence: "Tåget går i tid." },
            { word: "BIL", sentence: "Vi åker bil till jobbet." },
            { word: "BUSS", sentence: "Bussen stannar vid hållplatsen." },
            { word: "FLYG", sentence: "Flyget lyfter mot solen." },
            { word: "KARTA", sentence: "Vi behöver en karta för att hitta." },
            { word: "VÄSKA", sentence: "Packa din väska inför resan." },
            { word: "PASS", sentence: "Glöm inte ditt pass." },
            { word: "HOTELL", sentence: "Vi bor på ett fint hotell." },
            { word: "TURIST", sentence: "Många turister besöker staden." }
        ]
    },
    {
        id: 'daily',
        name: 'Vardag / الحياة اليومية',
        icon: '🏠',
        background: 'linear-gradient(to right, #fa709a 0%, #fee140 100%)',
        accent: '#d97706',
        words: [
            { word: "HEM", sentence: "Borta bra men hemma bäst." },
            { word: "HUS", sentence: "De bor i ett rött hus." },
            { word: "RUM", sentence: "Mitt rum är städat." },
            { word: "SÄNG", sentence: "Sängen är mjuk och skön." },
            { word: "STOL", sentence: "Sitt ner på en stol." },
            { word: "BORD", sentence: "Maten står på bordet." },
            { word: "DÖRR", sentence: "Stäng dörren efter dig." },
            { word: "NYCKEL", sentence: "Jag tappade min nyckel." },
            { word: "LAMPA", sentence: "Tänd lampan när det blir mörkt." },
            { word: "SOFFA", sentence: "Vi sitter i soffan och pratar." }
        ]
    },
    {
        id: 'health',
        name: 'Hälsa / الصحة',
        icon: '❤️',
        background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
        accent: '#ef4444',
        words: [
            { word: "SJUK", sentence: "Han är sjuk idag." },
            { word: "LÄKARE", sentence: "Läkaren hjälper patienter." },
            { word: "KROPP", sentence: "Träning är bra för kroppen." },
            { word: "HJÄRTA", sentence: "Hjärtat slår för dig." },
            { word: "MEDICIN", sentence: "Ta din medicin i tid." },
            { word: "TAND", sentence: "Borsta varje tand noga." },
            { word: "BLOD", sentence: "Blod ger liv åt kroppen." },
            { word: "HÄLSA", sentence: "Hälsa är viktigare än pengar." },
            { word: "VÅRD", sentence: "Alla har rätt till vård." },
            { word: "SÖMN", sentence: "God sömn ger energi." }
        ]
    },
    {
        id: 'work',
        name: 'Arbete / العمل',
        icon: '💼',
        background: 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)',
        accent: '#2563eb',
        words: [
            { word: "JOBB", sentence: "Jag trivs på mitt jobb." },
            { word: "CHEF", sentence: "Chefen leder mötet." },
            { word: "LÖN", sentence: "Lönen kommer varje månad." },
            { word: "KONTOR", sentence: "Vi arbetar på ett kontor." },
            { word: "MÖTE", sentence: "Vi har ett viktigt möte." },
            { word: "KOLLEGA", sentence: "Min kollega är hjälpsam." },
            { word: "DATOR", sentence: "Jag arbetar vid min dator." },
            { word: "RAST", sentence: "Nu tar vi en rast." },
            { word: "AVTAL", sentence: "Vi skrev på ett avtal." },
            { word: "PLAN", sentence: "Vi har en bra plan." }
        ]
    },
    {
        id: 'education',
        name: 'Utbildning / التعليم',
        icon: '🎓',
        background: 'linear-gradient(to top, #c471f5 0%, #fa71cd 100%)',
        accent: '#7c3aed',
        words: [
            { word: "SKOLA", sentence: "Barnen går i skolan." },
            { word: "LÄRA", sentence: "Man lär sig något nytt varje dag." },
            { word: "BOK", sentence: "Läs en bok för att lära." },
            { word: "PENNA", sentence: "Skriv med en penna." },
            { word: "ELEV", sentence: "Eleven lyssnar på läraren." },
            { word: "LÄRARE", sentence: "Läraren undervisar klassen." },
            { word: "PROV", sentence: "Vi har prov imorgon." },
            { word: "KURS", sentence: "Jag går en kurs i svenska." },
            { word: "LÄXA", sentence: "Gör din läxa efter skolan." },
            { word: "KLASS", sentence: "Hela klassen åkte på utflykt." }
        ]
    },
    {
        id: 'transport',
        name: 'Transport / المواصلات',
        icon: '🚌',
        background: 'linear-gradient(to right, #f6d365 0%, #fda085 100%)',
        accent: '#f59e0b',
        words: [
            { word: "BUSS", sentence: "Bussen är ett bra transportmedel." },
            { word: "TÅG", sentence: "Tåget rullar på rälsen." },
            { word: "BIL", sentence: "Bilen behöver bensin." },
            { word: "CYKEL", sentence: "Det är nyttigt att cykla." },
            { word: "RESA", sentence: "En resa vidgar vyerna." },
            { word: "VÄG", sentence: "Vägen är lång och krokig." },
            { word: "BRO", sentence: "Vi kör över en bro." },
            { word: "HJUL", sentence: "Hjulet snurrar fort." },
            { word: "SPÅR", sentence: "Följ spåret i snön." },
            { word: "FÄRJA", sentence: "Vi tog färjan över havet." }
        ]
    },
    {
        id: 'law',
        name: 'Lag & Rätt / القانون',
        icon: '⚖️',
        background: 'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)',
        accent: '#4b5563',
        words: [
            { word: "LAG", sentence: "Lagen gäller för alla." },
            { word: "DOM", sentence: "Domstolen avkunnade sin dom." },
            { word: "RÄTT", sentence: "Gör det som är rätt." },
            { word: "POLIS", sentence: "Polisen skyddar samhället." },
            { word: "STRAFF", sentence: "Brott leder till straff." },
            { word: "ADVOKAT", sentence: "Advokaten försvarar sin klient." },
            { word: "BROTT", sentence: "Stöld är ett brott." },
            { word: "BEVIS", sentence: "Det finns bevis för brottet." },
            { word: "VITTNE", sentence: "Vittnet såg vad som hände." },
            { word: "LAGAR", sentence: "Vi måste följa landets lagar." }
        ]
    },
    {
        id: 'islam',
        name: 'Islam / الإسلام',
        icon: '☪️',
        background: 'linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)',
        accent: '#10b981',
        words: [
            { word: "ALLAH", sentence: "Allah är barmhärtig." },
            { word: "BÖN", sentence: "Bönen ger ro i själen." },
            { word: "KORAN", sentence: "Koranen är en helig bok." },
            { word: "MOSKÉ", sentence: "Vi ber i moskén." },
            { word: "FASTA", sentence: "Vi fastar under Ramadan." },
            { word: "ZAKAT", sentence: "Zakat hjälper de fattiga." },
            { word: "HAJJ", sentence: "Hajj är en resa till Mecka." },
            { word: "IMAM", sentence: "Imamen leder bönen." },
            { word: "FRED", sentence: "Islam betyder fred." },
            { word: "DUA", sentence: "Gör dua för dina nära." }
        ]
    }
];

// Helper to get theme for a chapter
function getThemeForChapter(chapter) {
    // Cycle through themes: 1->Food, 2->Nature, 3->Travel, 4->Daily, 5->Food...
    const index = (chapter - 1) % WC_THEMES.length;
    return WC_THEMES[index];
}

// --- NEW DATA STRUCTURE (TIERED LEVELS) ---
const SWEDISH_DATA = [
    // --- TIER 1 (Levels 1-10): 2-3 Letters ---
    {
        "id": "lvl_01", "tier": 1, "main_chars": "OS", "targets": ["OS", "SE"],
        "dictionary": {
            "OS": { "ar": "دخان/رائحة طهي", "sv": "Det osar mat." },
            "SE": { "ar": "يرى", "sv": "Jag kan se dig." },
            "SO": { "ar": "أنثى الخنزير", "sv": "En stor so." }
        }
    },
    {
        "id": "lvl_02", "tier": 1, "main_chars": "KO", "targets": ["KO", "OK"],
        "dictionary": {
            "KO": { "ar": "بقرة", "sv": "En brun ko." },
            "OK": { "ar": "حسناً", "sv": "Det är helt ok." }
        }
    },
    {
        "id": "lvl_03", "tier": 1, "main_chars": "IS", "targets": ["IS", "SI"],
        "dictionary": {
            "IS": { "ar": "جليد", "sv": "Halka på is." },
            "SI": { "ar": "نوتة موسيقية", "sv": "En ton." }
        }
    },
    {
        "id": "lvl_04", "tier": 1, "main_chars": "NI", "targets": ["NI", "IN"],
        "dictionary": {
            "NI": { "ar": "أنتم", "sv": "Kommer ni?" },
            "IN": { "ar": "داخل", "sv": "Gå in." }
        }
    },
    {
        "id": "lvl_05", "tier": 1, "main_chars": "EN", "targets": ["EN"],
        "dictionary": {
            "EN": { "ar": "واحد/أداة نكرة", "sv": "En bil." }
        }
    },
    // TIER 2 (3-4 Letters)
    {
        "id": "lvl_06", "tier": 2, "main_chars": "HEJ", "targets": ["HEJ"],
        "dictionary": {
            "HEJ": { "ar": "مرحباً", "sv": "Hej på dig!" }
        }
    },
    {
        "id": "lvl_07", "tier": 2, "main_chars": "TÅG", "targets": ["TÅG", "GÅ", "TÅ"],
        "dictionary": {
            "TÅG": { "ar": "قطار", "sv": "Ta tåget." },
            "GÅ": { "ar": "يمشي", "sv": "Att gå hem." },
            "TÅ": { "ar": "إصبع قدم", "sv": "Jag slog min tå." }
        }
    },
    {
        "id": "lvl_08", "tier": 2, "main_chars": "BIL", "targets": ["BIL", "IL"],
        "dictionary": {
            "BIL": { "ar": "سيارة", "sv": "En snabb bil." },
            "IL": { "ar": "سرعة/عجلة", "sv": "I full il." },
            "BLI": { "ar": "يصبح", "sv": "Det kommer bli bra." } // Bonus?
        }
    },
    {
        "id": "lvl_09", "tier": 2, "main_chars": "SOL", "targets": ["SOL", "OS"],
        "dictionary": {
            "SOL": { "ar": "شمس", "sv": "Solen skiner." },
            "OS": { "ar": "دخان", "sv": "Det osar." }
        }
    },
    {
        "id": "lvl_10", "tier": 2, "main_chars": "LÅS", "targets": ["LÅS", "SÅ"],
        "dictionary": {
            "LÅS": { "ar": "قفل", "sv": "Ett hänglås." },
            "SÅ": { "ar": "هكذا/زرع", "sv": "Gör så här." }
        }
    }
];
// Pre-defined levels to ensure exact difficulty curve
// ============================================
// WORD CONNECT - 100 STATIC LEVELS
// 10 Chapters × 10 Stages
// ============================================

// ============================================
// WORD CONNECT - 100 STATIC LEVELS (NO 2-LETTER WORDS)
// 10 Chapters × 10 Stages
// All words are 3+ letters
// ============================================

const WC_PREDEFINED_LEVELS = {

    // ===========================================
    // CHAPTER 1: Mat & Dryck (Food & Drink) 🍎
    // ===========================================
    "1-1": { letters: ["S", "A", "F", "A"], words: ["FASA", "FAS"], validWords: ["FAS", "FASA"] },
    "1-2": { letters: ["T", "L", "U", "K"], words: ["LUKT", "KUL"], validWords: ["KUL", "LUKT"] },
    "1-3": { letters: ["N", "Ä", "R", "F"], words: ["FRÄN", "NÄR"], validWords: ["FRÄN", "NÄR"] },
    "1-4": { letters: ["I", "E", "L", "T", "R"], words: ["LITER", "LITE", "ELIT"], validWords: ["LITE", "ELIT", "LITER"] },
    "1-5": { letters: ["D", "I", "K", "S", "A"], words: ["SKIDA", "SIDA", "DASK"], validWords: ["SIDA", "ASK", "DASK", "SAK", "SKIDA", "SKA"] },
    "1-6": { letters: ["R", "Ö", "T", "S", "B"], words: ["BRÖST", "RÖST", "TÖRS"], validWords: ["SÖT", "BRÖST", "RÖST", "TÖRS"] },
    "1-7": { letters: ["O", "T", "L", "A", "K", "T"], words: ["KALOTT", "TOTAL", "KATT", "LOTTA"], validWords: ["KAL", "TOTAL", "ATT", "AKT", "KALOTT", "KATT", "LOTTA", "OTAKT", "OTAL", "TOK"] },
    "1-8": { letters: ["G", "R", "V", "A", "I", "D"], words: ["GRAVID", "GRAV", "GRAD", "VIDGAR"], validWords: ["ARG", "GRAV", "GRAVID", "VAG", "VID", "VIG", "DAG", "GRAD", "RAD", "VIDGAR"] },
    "1-9": { letters: ["K", "A", "F", "I", "S", "R"], words: ["FISKAR", "RASK", "SKIR", "KRAS"], validWords: ["FRI", "RAK", "RASK", "RIK", "SKIR", "ASK", "FAS", "KRAS", "KRIS", "RIS", "SAK", "SKRI", "FISKAR", "SKA"] },
    "1-10": { letters: ["M", "S", "I", "A", "G", "S", "K"], words: ["SMASKIG", "SAMS", "AMS", "ASS", "GAS"], validWords: ["SAMS", "SMASKIG", "AMS", "ASS", "ASK", "GAS", "SAK", "SMISK", "SKA"] },

    // ===========================================
    // CHAPTER 2: Naturen (Nature) 🌲
    // ===========================================
    "2-1": { letters: ["Ö", "S", "T", "R"], words: ["RÖST", "SÖT"], validWords: ["SÖT", "RÖST", "TÖRS"] },
    "2-2": { letters: ["G", "U", "N", "L"], words: ["LUGN", "GUL"], validWords: ["GUL", "LUGN", "UGN"] },
    "2-3": { letters: ["G", "R", "V", "A"], words: ["GRAV", "ARG"], validWords: ["ARG", "GRAV", "VAG"] },
    "2-4": { letters: ["I", "N", "G", "E", "S"], words: ["SENIG", "ENIG", "IGEN"], validWords: ["ENIG", "SENIG", "IGEN"] },
    "2-5": { letters: ["Ö", "S", "T", "R", "E"], words: ["ÖSTER", "REST", "RÖST"], validWords: ["SÖT", "REST", "RÖST", "ÖRE", "ÖSTER", "TÖRS"] },
    "2-6": { letters: ["G", "L", "L", "R", "O"], words: ["GROLL", "ROLL", "GLOR"], validWords: ["GROLL", "ROLL", "GLOR"] },
    "2-7": { letters: ["G", "I", "E", "N", "N", "U"], words: ["GENUIN", "INNE", "ENIG", "IGEN"], validWords: ["ENIG", "GENUIN", "INNE", "IGEN", "UGN"] },
    "2-8": { letters: ["P", "A", "R", "T", "S", "O"], words: ["PASTOR", "ROSA", "PATOS", "PORT"], validWords: ["ROSA", "ATP", "PASTOR", "PAR", "PATOS", "PORT", "PRAT", "RAST", "ROS", "ROT"] },
    "2-9": { letters: ["T", "P", "R", "A", "O", "P"], words: ["TOPPAR", "RAPP", "PORT", "PRAT"], validWords: ["RAPP", "ATP", "PAR", "PORT", "PRAT", "ROT", "TOPPAR"] },
    "2-10": { letters: ["E", "N", "R", "A", "B", "K", "S"], words: ["SKENBAR", "BAR", "BESK", "REN", "SNAR"], validWords: ["BAR", "BESK", "RAK", "RASK", "REN", "SKENBAR", "SNAR", "BAK", "ENA", "ABER", "ASK", "BARN", "BEN", "KRAS", "SAK", "KAN", "SKA", "SKENAR"] },

    // ===========================================
    // CHAPTER 3: Resor (Travel) ✈️
    // ===========================================
    "3-1": { letters: ["N", "O", "R", "D"], words: ["NORD", "OND"], validWords: ["OND", "NORD", "ROND"] },
    "3-2": { letters: ["R", "Å", "T", "S"], words: ["STÅR", "SÅR"], validWords: ["SÅR", "TÅR", "STÅR"] },
    "3-3": { letters: ["O", "T", "U", "R"], words: ["OTUR", "TUR"], validWords: ["OTUR", "ROT", "TUR"] },
    "3-4": { letters: ["Ä", "R", "V", "S", "T"], words: ["TVÄRS", "STRÄV", "TVÄR"], validWords: ["RÄT", "STRÄV", "TVÄR", "TVÄRS", "VÄRST", "TÄR"] },
    "3-5": { letters: ["I", "R", "K", "S", "K"], words: ["SKRIK", "SKIR", "KRIS"], validWords: ["RIK", "SKIR", "KRIS", "RIS", "SKRI", "SKRIK"] },
    "3-6": { letters: ["Ä", "T", "L", "S", "J"], words: ["STJÄL", "SLÄT", "SJÄL"], validWords: ["SLÄT", "SJÄL", "STJÄL"] },
    "3-7": { letters: ["Ä", "S", "A", "R", "V", "T"], words: ["VÄSTRA", "VART", "VARS", "SVAR"], validWords: ["RÄT", "STRÄV", "TVÄR", "VÄSTRA", "TVÄRS", "VART", "VÄRST", "VARS", "RAST", "SVAR", "VÄTA", "TÄR"] },
    "3-8": { letters: ["D", "N", "A", "R", "O", "R"], words: ["ORDNAR", "NORR", "DARR", "NORD"], validWords: ["OND", "NORR", "DARR", "NORD", "RAD", "ROND", "ORDNAR"] },
    "3-9": { letters: ["S", "Ö", "N", "D", "E", "R"], words: ["SÖNDER", "SNÖD", "SÖDER", "SNÖRE"], validWords: ["REN", "RÖD", "SNÖD", "SÖNDER", "ÖDE", "SÖDER", "NÖD", "RÖN", "SNÖRE", "ÖRE"] },
    "3-10": { letters: ["K", "A", "R", "N", "T", "A", "R"], words: ["KANTRAR", "RAKAR", "RAK", "AKT", "KAN"], validWords: ["RAK", "AKT", "KAN", "KANTRAR", "RAKAR"] },

    // ===========================================
    // CHAPTER 4: Vardag (Daily Life) 🏠
    // ===========================================
    "4-1": { letters: ["R", "E", "A", "P"], words: ["REPA", "PAR"], validWords: ["PAR", "REPA"] },
    "4-2": { letters: ["S", "A", "L", "T"], words: ["SALT", "SAL"], validWords: ["SALT", "SAL"] },
    "4-3": { letters: ["E", "R", "Ö", "F"], words: ["FÖRE", "FÖR"], validWords: ["FÖR", "FÖRE", "ÖRE"] },
    "4-4": { letters: ["A", "V", "T", "R", "K"], words: ["KVART", "KRAV", "VAKT"], validWords: ["RAK", "VART", "AKT", "KRAV", "KVART", "VAKT"] },
    "4-5": { letters: ["R", "S", "V", "Å", "A"], words: ["VÅRAS", "VARS", "SVAR"], validWords: ["VARS", "VÅR", "SVAR", "SÅR", "VRÅ", "VÅRAS"] },
    "4-6": { letters: ["I", "N", "E", "G", "B"], words: ["BENIG", "ENIG", "IGEN"], validWords: ["BENIG", "ENIG", "IGEN", "BEN"] },
    "4-7": { letters: ["T", "N", "A", "Å", "R", "S"], words: ["ANSTÅR", "ANSTÅ", "SNAR", "RAST"], validWords: ["SNAR", "RAST", "SÅR", "TÅR", "ANSTÅ", "ANSTÅR", "STÅR"] },
    "4-8": { letters: ["D", "E", "T", "I", "R", "K"], words: ["KREDIT", "DIREKT", "DIKE", "RIKE"], validWords: ["DIREKT", "RIK", "DIKE", "IDE", "KREDIT", "RIKE"] },
    "4-9": { letters: ["A", "N", "D", "U", "R", "M"], words: ["ANDRUM", "RUND", "RUNA", "RUNDA"], validWords: ["RUND", "ANDRUM", "RAD", "RUNA", "RUNDA"] },
    "4-10": { letters: ["V", "D", "I", "Ä", "G", "L", "T"], words: ["VÄLDIGT", "VILD", "VIT", "VÄLDIG", "ÄLV"], validWords: ["VID", "VIG", "VILD", "VIT", "VÄLDIG", "VÄLDIGT", "ÄLV"] },

    // ===========================================
    // CHAPTER 5: Mat & Dryck (Advanced) 🍎
    // ===========================================
    "5-1": { letters: ["R", "K", "Ö", "S"], words: ["SKÖR", "KÖR"], validWords: ["SKÖR", "KÖR"] },
    "5-2": { letters: ["G", "O", "V", "A"], words: ["AVOG", "VAG"], validWords: ["AVOG", "VAG"] },
    "5-3": { letters: ["T", "T", "A", "N"], words: ["TANT", "ATT"], validWords: ["ATT", "TANT"] },
    "5-4": { letters: ["S", "T", "T", "R", "A"], words: ["START", "RATT", "RAST"], validWords: ["ATT", "RAST", "RATT", "START"] },
    "5-5": { letters: ["L", "T", "T", "A", "O"], words: ["LOTTA", "TOTAL", "OTAL"], validWords: ["TOTAL", "ATT", "LOTTA", "OTAL"] },
    "5-6": { letters: ["A", "R", "T", "S", "K"], words: ["STARK", "KAST", "RASK"], validWords: ["RAK", "RASK", "STARK", "AKT", "ASK", "KAST", "KRAS", "RAST", "SAK", "SKA"] },
    "5-7": { letters: ["B", "G", "L", "I", "O", "D"], words: ["BLODIG", "BLOD", "BILD", "LOGI"], validWords: ["BLODIG", "BLOD", "BILD", "LOGI"] },
    "5-8": { letters: ["A", "T", "S", "O", "R", "K"], words: ["KOSTAR", "KORTA", "RASK", "ROSA"], validWords: ["RAK", "RASK", "ROSA", "STARK", "AKT", "ASK", "KAST", "KORTA", "KRAS", "RAST", "ROS", "ROT", "SAK", "TOK", "KOSTAR", "SKA"] },
    "5-9": { letters: ["V", "R", "E", "Ö", "N", "S"], words: ["NERVÖS", "ÖVRE", "VERS", "SNÖRE"], validWords: ["NERVÖS", "REN", "ÖVRE", "VERS", "RÖN", "SNÖRE", "ÖRE"] },
    "5-10": { letters: ["M", "R", "O", "T", "A", "S", "R"], words: ["STORMAR", "STRAM", "TAM", "TORR", "MOT"], validWords: ["ROSA", "STRAM", "TAM", "TORR", "AMS", "MOT", "MOR", "RAST", "ROS", "ROT", "STARR", "STORM", "STORMAR"] },

    // ===========================================
    // CHAPTER 6: Naturen (Advanced) 🌲
    // ===========================================
    "6-1": { letters: ["I", "L", "V", "D"], words: ["VILD", "VID"], validWords: ["VID", "VILD"] },
    "6-2": { letters: ["I", "N", "K", "D"], words: ["KIND", "DIN"], validWords: ["DIN", "KIND"] },
    "6-3": { letters: ["V", "N", "Ä", "S"], words: ["SNÄV", "VÄN"], validWords: ["SNÄV", "VÄN"] },
    "6-4": { letters: ["Ö", "F", "R", "S", "T"], words: ["FÖRST", "RÖST", "TÖRS"], validWords: ["SÖT", "FÖR", "FÖRST", "RÖST", "TÖRS"] },
    "6-5": { letters: ["R", "G", "E", "E", "N"], words: ["GENRE", "NERE", "REGN"], validWords: ["NERE", "REN", "GENRE", "REGN"] },
    "6-6": { letters: ["S", "K", "A", "R", "P"], words: ["SKARP", "SPARK", "RASK"], validWords: ["RAK", "RASK", "SKARP", "ASK", "KAP", "KRAS", "PAR", "SAK", "SPARK", "SKA"] },
    "6-7": { letters: ["S", "T", "I", "T", "K", "R"], words: ["STRIKT", "TRIST", "SKIT", "SKIR"], validWords: ["RIK", "SKIR", "STRIKT", "TRIST", "SKIT", "KRIS", "RIS", "SKRI"] },
    "6-8": { letters: ["N", "I", "E", "T", "G", "L"], words: ["GENTIL", "ENLIGT", "ENIG", "IGEN"], validWords: ["ENIG", "GENTIL", "LEN", "IGEN", "LITE", "ENLIGT", "ELIT", "NIT"] },
    "6-9": { letters: ["E", "R", "N", "I", "G", "E"], words: ["ENERGI", "INRE", "REGI", "RING"], validWords: ["ENIG", "INRE", "NERE", "REN", "IGEN", "ENERGI", "GENRE", "REGI", "REGN", "RING"] },
    "6-10": { letters: ["N", "E", "G", "L", "Å", "H", "L"], words: ["HELLÅNG", "LÅG", "LÅNG", "HÅN", "LÅN"], validWords: ["HELLÅNG", "LEN", "LÅG", "LÅNG", "HÅN", "LÅN", "NÅL"] },

    // ===========================================
    // CHAPTER 7: Resor (Advanced) ✈️
    // ===========================================
    "7-1": { letters: ["A", "G", "T", "A"], words: ["GATA", "TAG"], validWords: ["GATA", "TAG"] },
    "7-2": { letters: ["T", "T", "Ä", "M"], words: ["MÄTT", "TÄT"], validWords: ["MÄTT", "TÄT"] },
    "7-3": { letters: ["S", "S", "A", "D"], words: ["DASS", "ASS"], validWords: ["ASS", "DASS"] },
    "7-4": { letters: ["K", "R", "S", "L", "U"], words: ["SLURK", "KRUS", "KURS"], validWords: ["KUL", "SUR", "KRUS", "KURS", "RUS", "RUSK", "SKUR", "SLURK"] },
    "7-5": { letters: ["S", "E", "A", "T", "R"], words: ["RETAS", "RAST", "REST"], validWords: ["RAST", "REST", "RETAS"] },
    "7-6": { letters: ["S", "S", "K", "R", "A"], words: ["KRASS", "RASK", "KRAS"], validWords: ["KRASS", "RAK", "RASK", "ASS", "ASK", "KRAS", "SAK", "SKA"] },
    "7-7": { letters: ["A", "S", "N", "K", "R", "A"], words: ["SAKNAR", "RASK", "SNAR", "KRAS"], validWords: ["RAK", "RASK", "SNAR", "ASK", "KRAS", "SAK", "KAN", "SAKNAR", "SKA"] },
    "7-8": { letters: ["I", "S", "K", "A", "L", "L"], words: ["ISKALL", "SLAK", "LISA", "SILL"], validWords: ["ISKALL", "KAL", "LIK", "SLAK", "ASK", "KIL", "LISA", "SAK", "SAL", "SILL", "SKA"] },
    "7-9": { letters: ["T", "L", "E", "D", "D", "I"], words: ["DELTID", "IDEL", "LEDD", "LITE"], validWords: ["IDEL", "LED", "LITE", "DEL", "DELTID", "ELIT", "IDE", "LEDD"] },
    "7-10": { letters: ["P", "O", "S", "E", "R", "A", "R"], words: ["POSERAR", "SPE", "ROSA", "PAR", "REPA"], validWords: ["ROSA", "PAR", "REPA", "ROS", "SPE", "POSERAR"] },

    // ===========================================
    // CHAPTER 8: Vardag (Advanced) 🏠
    // ===========================================
    "8-1": { letters: ["V", "I", "P", "S"], words: ["VIPS", "VIS"], validWords: ["VIS", "VIPS"] },
    "8-2": { letters: ["S", "T", "Ö", "D"], words: ["STÖD", "SÖT"], validWords: ["SÖT", "STÖD"] },
    "8-3": { letters: ["T", "A", "M", "T"], words: ["MATT", "TAM"], validWords: ["MATT", "TAM", "ATT"] },
    "8-4": { letters: ["D", "E", "A", "N", "N"], words: ["DENNA", "NEDAN", "ANDE"], validWords: ["NEDAN", "DENNA", "ENA", "ANDE"] },
    "8-5": { letters: ["G", "O", "E", "N", "I"], words: ["OENIG", "ENIG", "IGEN"], validWords: ["ENIG", "OENIG", "IGEN"] },
    "8-6": { letters: ["K", "S", "A", "L", "R"], words: ["SKRAL", "KLAR", "KARL"], validWords: ["KAL", "KLAR", "RAK", "RASK", "SKRAL", "SLAK", "ASK", "KARL", "KRAS", "SAK", "SAL", "SKA"] },
    "8-7": { letters: ["T", "A", "K", "T", "U", "N"], words: ["UTKANT", "AKUT", "KATT", "TANT"], validWords: ["AKUT", "ATT", "AKT", "KATT", "TANT", "UTKANT", "KAN"] },
    "8-8": { letters: ["A", "U", "N", "N", "D", "R"], words: ["UNDRAN", "UNDAN", "RUND", "RUNA"], validWords: ["RUND", "UNDAN", "RAD", "RUNA", "RUNDA", "UNDRAN"] },
    "8-9": { letters: ["S", "K", "I", "T", "R", "F"], words: ["SKRIFT", "SKIFT", "SKIR", "SKIT"], validWords: ["FRI", "RIK", "SKIR", "SKIT", "KRIS", "RIS", "SKIFT", "SKRI", "SKRIFT"] },
    "8-10": { letters: ["N", "U", "I", "F", "T", "Å", "R"], words: ["UTIFRÅN", "FIN", "IFRÅN", "INÅT", "FÅR"], validWords: ["FIN", "FRI", "IFRÅN", "UTIFRÅN", "INÅT", "FÅR", "NIT", "RUIN", "TUR", "TÅR"] },

    // ===========================================
    // CHAPTER 9: Familj (Family) 👨‍👩‍👧‍👦
    // ===========================================
    "9-1": { letters: ["A", "K", "T", "V"], words: ["VAKT", "AKT"], validWords: ["AKT", "VAKT"] },
    "9-2": { letters: ["R", "Ä", "L", "S"], words: ["RÄLS", "LÄR"], validWords: ["RÄLS", "LÄR"] },
    "9-3": { letters: ["S", "L", "K", "A"], words: ["SLAK", "KAL"], validWords: ["KAL", "SLAK", "ASK", "SAK", "SAL", "SKA"] },
    "9-4": { letters: ["R", "Å", "D", "G", "A"], words: ["RÅGAD", "ÅDRA", "GRAD"], validWords: ["ARG", "RÅGAD", "DAG", "GRAD", "GÅR", "RAD", "ÅDRA"] },
    "9-5": { letters: ["T", "I", "L", "L", "S"], words: ["TILLS", "TILL", "SLIT"], validWords: ["TILL", "TILLS", "SILL", "SLIT"] },
    "9-6": { letters: ["U", "A", "D", "R", "N"], words: ["RUNDA", "RUND", "RUNA"], validWords: ["RUND", "RAD", "RUNA", "RUNDA"] },
    "9-7": { letters: ["D", "Ä", "R", "R", "F", "Ö"], words: ["DÄRFÖR", "RÖRD", "DÖRR", "FÄRD"], validWords: ["RÖD", "RÖRD", "DÄRFÖR", "FÖR", "DÖRR", "FÄRD"] },
    "9-8": { letters: ["T", "I", "R", "L", "O", "G"], words: ["TROLIG", "TORG", "LOGI", "GLOR"], validWords: ["TROLIG", "LOGI", "ROT", "TORG", "GLOR"] },
    "9-9": { letters: ["I", "R", "S", "U", "C", "K"], words: ["CIRKUS", "SUCK", "SKIR", "KRIS"], validWords: ["RIK", "SKIR", "SUR", "CIRKUS", "KRIS", "KRUS", "KURS", "RIS", "RUS", "RUSK", "SKRI", "SKUR", "SUCK"] },
    "9-10": { letters: ["S", "A", "J", "R", "Ö", "F", "T"], words: ["SJÖFART", "FAST", "SAFT", "SÖT", "FÖR"], validWords: ["FAST", "SÖT", "FÖR", "FÖRST", "FAS", "RAST", "RÖST", "SAFT", "SJÖFART", "TÖRS"] },

    // ===========================================
    // CHAPTER 10: Skola (School) 📚
    // ===========================================
    "10-1": { letters: ["K", "R", "I", "S"], words: ["KRIS", "RIK"], validWords: ["RIK", "SKIR", "KRIS", "RIS", "SKRI"] },
    "10-2": { letters: ["D", "A", "R", "R"], words: ["DARR", "RAD"], validWords: ["DARR", "RAD"] },
    "10-3": { letters: ["I", "Å", "N", "T"], words: ["INÅT", "NIT"], validWords: ["INÅT", "NIT"] },
    "10-4": { letters: ["S", "M", "U", "L", "A"], words: ["SMULA", "SMAL", "SALU"], validWords: ["LAM", "SMAL", "AMS", "MAL", "SAL", "SALU", "SMULA"] },
    "10-5": { letters: ["V", "Ä", "R", "T", "S"], words: ["VÄRST", "STRÄV", "TVÄR"], validWords: ["RÄT", "STRÄV", "TVÄR", "TVÄRS", "VÄRST", "TÄR"] },
    "10-6": { letters: ["I", "D", "E", "R", "G"], words: ["REDIG", "DIGER", "REGI"], validWords: ["DIGER", "REDIG", "IDE", "REGI"] },
    "10-7": { letters: ["V", "S", "L", "I", "E", "D"], words: ["DELVIS", "LIVS", "IDEL", "VILD"], validWords: ["IDEL", "LED", "VID", "VILD", "VIS", "DELVIS", "LIVS", "DEL", "IDE"] },
    "10-8": { letters: ["E", "N", "A", "K", "S", "R"], words: ["SKENAR", "RASK", "SNAR", "KRAS"], validWords: ["RAK", "RASK", "REN", "SNAR", "ENA", "ASK", "KRAS", "SAK", "KAN", "SKA", "SKENAR"] },
    "10-9": { letters: ["U", "L", "R", "K", "T", "A"], words: ["LUKTAR", "AKUT", "KLAR", "KARL"], validWords: ["AKUT", "KAL", "KLAR", "KUL", "RAK", "AKT", "KARL", "LUKT", "TUR", "LUKTAR"] },
    "10-10": { letters: ["A", "R", "O", "R", "D", "P", "P"], words: ["DROPPAR", "DOPP", "RAPP", "DARR", "PAR"], validWords: ["RAPP", "DARR", "DOPP", "PAR", "RAD", "DROPPAR"] },
};
const WC_DICTIONARY = [
    { w: "FAS", t: "مرحلة", s: "arbetets sista fas har påbörjats", st: "بدأ العمل في المرحلة الأخيرة من المشروع" },
    { w: "FASA", t: "رُعب, هَلَع", s: "med avsky och fasa", st: "ببغض و رُعب" },
    { w: "KUL", t: "لطيف", s: "Det var en kul fest.", st: "كانت حفلة ممتعة." },
    { w: "LUKT", t: "شَمّ", s: "lukt och smak", st: "شَمّ وذَوْق" },
    { w: "FRÄN", t: "حادّ", s: "frän kritik en frän lukt", st: "نقد لاذع رائحة حادة" },
    { w: "NÄR", t: "متى؟", s: "när kommer tåget?", st: "متى سيأتي القطار؟" },
    { w: "LITE", t: "قليل", s: "lite rädd lite mer ost", st: "خائف قليلاً مزيد من الجبن" },
    { w: "ELIT", t: "نُخبة", s: "han tillhör eliten i svensk idrott", st: "إنه من النخبة في مجال الرياضة في السويد" },
    { w: "LITER", t: "ليتر", s: "en liter mjölk", st: "ليتر من الحليب" },
    { w: "SIDA", t: "سيدا", s: "Vänd sida i boken.", st: "اقلب الصفحة في الكتاب." },
    { w: "ASK", t: "عُلبة ( صغيرة )", s: "en ask tändstickor", st: "عُلبة كبريت" },
    { w: "DASK", t: "صفعة", s: "dask i stjärten", st: "صفعة على الكِفل" },
    { w: "SAK", t: "شيء", s: "var sak på sin plats", st: "كل شيء في مكانه" },
    { w: "SKIDA", t: "زحّافة", s: "Vi åker skidor i fjällen.", st: "نتزلج في الجبال." },
    { w: "SKA", t: "سوف, سـ, سيكون", s: "huset ska rivas", st: "سوف تُهْدَم البناية" },
    { w: "SÖT", t: "حلو", s: "Kakan är söt.", st: "الكعكة حلوة." },
    { w: "BRÖST", t: "صدر", s: "mamman gav babyn bröstet", st: "أرضعت الأم طفلها" },
    { w: "RÖST", t: "صوت", s: "hon talade med hög röst", st: "تكلمت بصوت مرتفع" },
    { w: "TÖRS", t: "يجرؤ", s: "hon törs inte säga ifrån", st: "لا تجرؤ على الرفض" },
    { w: "KAL", t: "أجرد", s: "kala grenar kala klippor", st: "أغصان عارية صخور جرداء" },
    { w: "TOTAL", t: "شامل", s: "en total förnyelse totalt sett", st: "تجديد شامل بصورة إجمالية" },
    { w: "ATT", t: "ليد", s: "att .: Katarina Wall", st: "ليد: كاتارينا فال" },
    { w: "AKT", t: "مرسوم, مراسيم رسمية", s: "Ta dig i akt!", st: "احذر!" },
    { w: "KALOTT", t: "قلنسوة ضيقة", s: "bildligt något som liknar en kalott", st: "تقال مجازاً عن شيء يشابه القلنسوة" },
    { w: "KATT", t: "قِطّ", s: "Katten jamar.", st: "القطة تموء." },
    { w: "LOTTA", t: "جُندية مُتَطَوِّعة", s: "Lotta är en lottakår.", st: "لوتا هي مجندة متطوعة." },
    { w: "OTAKT", t: "عدم انتظام", s: "komma i otakt", st: "حالة عدم انتظام" },
    { w: "OTAL", t: "لا يُحصى", s: "Ett otal gånger.", st: "مرات لا تحصى." },
    { w: "TOK", t: "أبْلَه", s: "Det gick på tok.", st: "سارت الأمور بشكل خاطئ." },
    { w: "ARG", t: "غاضب", s: "Var inte arg på mig.", st: "لا تغضب مني." },
    { w: "GRAV", t: "جَدّيّ", s: "en grav hörselskada", st: "إصابة سمعية حادّة" },
    { w: "GRAVID", t: "حامِل", s: "en gravid kvinna", st: "امرأة حامل" },
    { w: "VAG", t: "غير واضح", s: "en vag känsla av obehag", st: "إحساس غامض بعدم الارتياح" },
    { w: "VID", t: "عريض", s: "Huset ligger vid sjön.", st: "يقع المنزل عند البحيرة." },
    { w: "VIG", t: "مَرِن", s: "ett vigt språng", st: "قفزة رشيقة" },
    { w: "DAG", t: "نهار", s: "natt och dag", st: "ليلاً نهاراً" },
    { w: "GRAD", t: "درجة", s: "tio grader varmt", st: "عشر درجات فوق الصفر" },
    { w: "RAD", t: "مجموعة", s: "Stå i en rad.", st: "قف في صف." },
    { w: "VIDGAR", t: "يُوَسِّع", s: "medicinen vidgar blodkärlen vidgat inflytande", st: "يوسع الدواء الأوعية الدمويّة نفوذ ممتدّ , نفوذ واسع" },
    { w: "FRI", t: "حُرّ", s: "fri från bekymmer", st: "خالٍ من الهموم" },
    { w: "RAK", t: "مُستقيم", s: "rak i ryggen stå rak", st: "مستقيم الظهر وَقَف مُستَقيماً" },
    { w: "RASK", t: "سَريع", s: "gå med raska steg", st: "سار بخطىً سريعة" },
    { w: "RIK", t: "ثَريّ", s: "en rik kvinna", st: "امرأة ثريّة" },
    { w: "SKIR", t: "رقيق", s: "vårens skira grönska skira moln", st: "خَضار الربيع الرقيق غيوم رقيقة" },
    { w: "KRAS", t: "تحطّم", s: "Vasen gick i kras.", st: "تحطمت المزهرية." },
    { w: "KRIS", t: "أزمة", s: "en ekonomisk kris människa i kris", st: "أزمة اقتصادية إنسان في أزمة" },
    { w: "RIS", t: "أرُزّ", s: "Vi äter ris och kyckling.", st: "نأكل الأرز والدجاج." },
    { w: "SKRI", t: "صَيْحَة", s: "ett skri av fasa", st: "صيحة هَلَع" },
    { w: "FISKAR", t: "يصيد السمك", s: "He fiskar i sjön.", st: "هو يصطاد في البحيرة." },
    { w: "SAMS", t: "مُتَّفِق", s: "barnen kan aldrig vara sams", st: "لايتفق الأطفال أبداً" },
    { w: "SMASKIG", t: "شَهيّ", s: "en smaskig tårta", st: "كعكة مشهية" },
    { w: "AMS", t: "مجلس سوق العمل", s: "AMS - bidrag", st: "منحة مجلس سوق العمل" },
    { w: "ASS", t: "رسالة مُسجلة", s: "rek och ass", st: "مُسجل ومضمون" },
    { w: "GAS", t: "دعاسة البنزين", s: "giftiga gaser elda med gas", st: "غازات سامة أشعل بالغاز" },
    { w: "SMISK", t: "خَبْطَة", s: "barnen fick smisk på fingrarna", st: "تَعَرَّض الأطفال لخبطة على أصابعهم" },
    { w: "GUL", t: "أصفر", s: "solen lyser gul gul lök", st: "شُعاع الشمس أَصفر بصل" },
    { w: "LUGN", t: "هادئ", s: "lugn vilar sjön en lugn gata", st: "ساد الهدوء على البحيرة شارع هادئ" },
    { w: "UGN", t: "فُرن", s: "steka kött i ugnen", st: "شوى اللحم بالفرن" },
    { w: "ENIG", t: "مُجمِع", s: "man var rörande enig om beslutet", st: "كان الجميع متفقين حول القرار بصورة مؤثّرة" },
    { w: "SENIG", t: "وَتَريّ", s: "mager och senig", st: "نحيل ووتري" },
    { w: "IGEN", t: "ثانية", s: "Kom gärna tillbaka igen!", st: "أهلاً بك مجدداً!" },
    { w: "REST", t: "الباقي", s: "Vi åt upp resten av maten.", st: "أكلنا بقية الطعام." },
    { w: "ÖRE", t: "أوره", s: "det stämmer på öret", st: "الحساب مضبوط بالأوره" },
    { w: "ÖSTER", t: "شرق", s: "solen går upp i öster", st: "تُشرق الشمس من الشرق" },
    { w: "GROLL", t: "خُصومة", s: "glömma gammalt groll", st: "نَسِيَ الخصومة القديمة" },
    { w: "ROLL", t: "دَوْر", s: "spela rollen som Hamlet", st: "أدّى دور هاملت" },
    { w: "GLOR", t: "يُبَحلق", s: "vad glor du på?", st: "بماذا تبحلق؟" },
    { w: "GENUIN", t: "أصيل", s: "en genuin göteborgare", st: "من سكان يوتيبوري الأصليين" },
    { w: "INNE", t: "رائج", s: "det är inne att cykla", st: "ركوب الدراجة شائع حالياً" },
    { w: "ROSA", t: "زهريّ", s: "en rosa klänning", st: "فستان زهري" },
    { w: "ATP", t: "التقاعد الإضافي العام", s: "ATP - poäng", st: "اسم" },
    { w: "PASTOR", t: "قِسّ", s: "Pastorn talade i kyrkan.", st: "تحدث القس في الكنيسة." },
    { w: "PAR", t: "زوجان", s: "ett par skor ett äkta par", st: "زوجا أحذية زوجان شرعيّان" },
    { w: "PATOS", t: "شعور, عاطفة", s: "hennes politiska patos", st: "مشاعرها السياسيّة" },
    { w: "PORT", t: "بوابة", s: "Öppna porten!", st: "افتح البوابة!" },
    { w: "PRAT", t: "ثَرثرة", s: "det är bara löst prat", st: "هذه مجرد ثرثرة" },
    { w: "RAST", t: "استراحة, راحة", s: "gå på rast", st: "أخَذَ استراحة" },
    { w: "ROS", t: "ورد", s: "En röd ros doftar gott.", st: "الوردة الحمراء تفوح منها رائحة طيبة." },
    { w: "ROT", t: "جِذْر", s: "Trädet har en djup rot.", st: "للشجرة جذر عميق." },
    { w: "RAPP", t: "سريع", s: "ett rappt svar", st: "إجابة سريعة" },
    { w: "TOPPAR", t: "يحتلّ مرتبة الصَدارة", s: "boken toppar listan på bra barnböcker", st: "يحتل الكتاب مرتبة الصدارة بين أفضل كتب الأطفال" },
    { w: "BAR", t: "عارٍ", s: "sova under bar himmel", st: "نام تحت السماء المكشوفة" },
    { w: "BESK", t: "مُرّ", s: "besk smak beska kommentarer", st: "مذاق مر تعليقات مريرة" },
    { w: "REN", t: "نظيف", s: "en ren blus rent vatten", st: "بلوزة نظيفة ماء نقي" },
    { w: "SKENBAR", t: "زائف", s: "en skenbar förändring", st: "تَغَيُّر زائف" },
    { w: "SNAR", t: "قريب", s: "inom en snar framtid", st: "في المستقبل القريب" },
    { w: "BAK", t: "في الخلف", s: "de satt längst bak i salen", st: "جلسوا في آخر القاعة" },
    { w: "ENA", t: "أحدهما", s: "varken det ena eller det andra", st: "لاهذا ولا ذاك" },
    { w: "ABER", t: "عقبة", s: "ett litet aber", st: "عقبة بسيطة" },
    { w: "BARN", t: "طفل", s: "bli med barn passa barn", st: "حملت لاحظ طفلاً" },
    { w: "BEN", t: "رِجْل", s: "sträcka på benen", st: "مَدَّ ساقيه" },
    { w: "KAN", t: "يعرف", s: "Jag kan simma.", st: "أستطيع السباحة." },
    { w: "SKENAR", t: "يندفع هائجاً", s: "hästen skenade tiden skenar iväg", st: "اندفع الحصان هائجاً يمر الوقت بسرعة" },
    { w: "OND", t: "غاضب", s: "Han har ont i magen.", st: "لديه ألم في البطن." },
    { w: "NORD", t: "شمال", s: "vind mellan nord och nordost", st: "الرياح ما بين شمالية وشمال شرقية" },
    { w: "ROND", t: "دَورة", s: "läkaren gick ronden", st: "قام الطبيب بجولة استطلاع" },
    { w: "SÅR", t: "جُرح, قُرْحَة, خَدْش", s: "tiden läker alla sår", st: "تلتئم كل الجروح مع الزمن" },
    { w: "TÅR", t: "دمعة", s: "tårarna rann med tårar i ögonen", st: "سالت الدموع والدموع في عينيه" },
    { w: "STÅR", t: "يقف, ينهض, يقوم", s: "Bilen står på gatan.", st: "السيارة واقفة في الشارع." },
    { w: "OTUR", t: "سوء حظ", s: "han hade oturen att missa tåget", st: "لسوء الحظ فاته القطار" },
    { w: "TUR", t: "رحلة", s: "båten gör två turer om dagen", st: "قام القارب برحلتين في اليوم" },
    { w: "RÄT", t: "مستقيم", s: "en rät linje", st: "مستقيم خط" },
    { w: "STRÄV", t: "خَشِن", s: "en sträv röst", st: "صوت خشن , صوت غليظ" },
    { w: "TVÄR", t: "فجائيّ", s: "en tvär inbromsning sur och tvär", st: "فرملة فجائيّة غاضب وغير لَبِق" },
    { w: "TVÄRS", t: "عرضيّاً", s: "tvärs över gatan", st: "بِعَرض الشارع" },
    { w: "VÄRST", t: "بصورة خاصّة", s: "inte så värst ofta", st: "ليس كثيراً بصورة خاصة" },
    { w: "TÄR", t: "يستهلك", s: "projekten tärde hårt på ekonomin", st: "استهلك المشروع كثيراً من الموارد الاقتصادية" },
    { w: "SKRIK", t: "صُراخ حادّ", s: "ett gällt skrik", st: "صراخ حاد" },
    { w: "SLÄT", t: "مُسْتَوٍ, ناعم - أملس", s: "en slät yta släta betyg", st: "سطح مستو علامات على حافة النجاح" },
    { w: "SJÄL", t: "روح", s: "kropp och själ", st: "الجسد والروح" },
    { w: "STJÄL", t: "يَسْرُق", s: "stjäla en cykel stjäla en idé", st: "سَرَقَ درّاجة سَرَقَ فِكْرة" },
    { w: "VÄSTRA", t: "الغربي", s: "den västra sidan av sjön", st: "الجهة الغربية من البحيرة" },
    { w: "VART", t: "إلى أين", s: "vart ska du åka?", st: "إلى أين تسافر؟" },
    { w: "VARS", t: "مَن", s: "En man vars bil är röd.", st: "رجل سيارته حمراء." },
    { w: "SVAR", t: "إجابة", s: "Jag vill ha ett svar.", st: "أريد جواباً." },
    { w: "VÄTA", t: "بَلَل", s: "tyget stöter bort väta", st: "قماش صادّ للبلل" },
    { w: "NORR", t: "شمالاً", s: "norr om Stockholm", st: "في شمال ستوكهولم" },
    { w: "DARR", t: "اهتزاز", s: "med darr på rösten", st: "بصوت مهتزّ" },
    { w: "ORDNAR", t: "يُنَظِّم", s: "Jag ordnar festen.", st: "أنا أنظم الحفلة." },
    { w: "RÖD", t: "أحمر", s: "röd tråd ( sammanhang )", st: "خيط دليلي ( سياق الكلام )" },
    { w: "SNÖD", t: "بَسيط", s: "för snöd vinnings skull", st: "من أجل ربح بسيط" },
    { w: "SÖNDER", t: "تالِف", s: "bilen är sönder gå sönder", st: "تَعَطَّلَت السيارة تَلِفَ" },
    { w: "ÖDE", t: "مُقْفِر", s: "en öde ö", st: "جزيرة مُقْفرة" },
    { w: "SÖDER", t: "جنوباً", s: "söder om Stockholm", st: "جنوب ستوكهولم" },
    { w: "NÖD", t: "ضَرُورَة, عَوَز - حاجة - محنة - كرب - خطر", s: "en människa i nöd", st: "إنسان في حالة العوز" },
    { w: "RÖN", t: "إكتشاف", s: "Nya rön om hälsa.", st: "اكتشافات جديدة حول الصحة." },
    { w: "SNÖRE", t: "خَيْط", s: "slå ett snöre om paketet", st: "لَفَّ رباطاً على الطَّرد" },
    { w: "KANTRAR", t: "ينقلب", s: "båten kantrar vinden kantrade", st: "ينقلب الزورق إنعكست الريح" },
    { w: "RAKAR", t: "يَحْلِق ذَقْنَه", s: "han rakar sig bara varannan dag", st: "يحلق ذقنه مرة كل يومين فقط" },
    { w: "REPA", t: "خَدْش", s: "en repa i lacken", st: "خَدْش في الدهان" },
    { w: "SALT", t: "مالح", s: "salt sill salt lakrits", st: "رنكة مُمَلَّحة سوس مالح" },
    { w: "SAL", t: "صالة", s: "patienten ligger på sal 11", st: "المريض موجود في الصالة رقم 11" },
    { w: "FÖR", t: "جداًً", s: "för gammal för snål", st: "هَرِم جداًً بخيل جداًً" },
    { w: "FÖRE", t: "قبل", s: "före månadens utgång före intervjun", st: "قبل انتهاء الشهر قبل المقابلة" },
    { w: "KRAV", t: "مطالبة", s: "ställa krav på en bättre service", st: "طالب بالحصول على خدمات أفضل" },
    { w: "KVART", t: "ربع", s: "om en kvart ett kvarts kilo", st: "بعد ربع ساعة ربع كيلوغرام" },
    { w: "VAKT", t: "حِراسة", s: "även om platsen där man vaktar", st: "تقال أيضاً عن المكان المحروس" },
    { w: "VÅR", t: "لنا", s: "vårt eget modersmål", st: "لغتنا الأم" },
    { w: "VRÅ", t: "زاوية", s: "leta igenom varenda vrå av huset", st: "بَحَث في كل زوايا المنزل" },
    { w: "VÅRAS", t: "الربيع الفائت", s: "i våras ( förra våren )", st: "في الربيع الفائت" },
    { w: "BENIG", t: "نحيل", s: "mager och benig", st: "نحيل وهزيل" },
    { w: "ANSTÅ", t: "يؤجل, يؤخر", s: "det får anstå tills vidare", st: "أجل حتى إشعار آخر" },
    { w: "ANSTÅR", t: "يُلائم, يُليق, يناسب", s: "som det anstår en ledare", st: "بشكل يليق بقائد" },
    { w: "DIREKT", t: "مباشر", s: "direkt demokrati direkta ledningar", st: "ديموقراطية مباشرة خطوط مباشرة" },
    { w: "DIKE", t: "خندق", s: "köra i diket", st: "ساق السيارة في الخندق" },
    { w: "IDE", t: "مَرْبَض", s: "gå i ide", st: "يرقد في البيات الشتوي" },
    { w: "KREDIT", t: "ائتمان", s: "köpa på kredit bevilja långa krediter", st: "اشترى بالتسليف منح ائتمانات طويلة الأجل" },
    { w: "RIKE", t: "دولة", s: "fara land och rike runt", st: "تَجَوَّل في أنحاء البلاد" },
    { w: "RUND", t: "مستدير", s: "Bollen är rund.", st: "الكرة مستديرة." },
    { w: "ANDRUM", t: "فترة", s: "ett ögonblicks andrum", st: "لحظة" },
    { w: "RUNA", t: "الأبجدية الرونية", s: "En gammal runa på stenen.", st: "حرف رونية قديم على الحجر." },
    { w: "RUNDA", t: "جَوْلة", s: "gå en runda", st: "تَجَوّل الطبيب على المرضى , قام بِجَولة" },
    { w: "VILD", t: "بَريّ", s: "vilda växter vilda djur", st: "نباتات بريّة حيوانات برية ( وحشيّة )" },
    { w: "VIT", t: "أبيض", s: "Snön är vit.", st: "الثلج أبيض." },
    { w: "VÄLDIG", t: "عظيم", s: "ett väldigt fartyg en väldig påfrestning", st: "سفينة ضخمة إجهاد كبير" },
    { w: "VÄLDIGT", t: "جدّ", s: "väldigt glad väldigt svårt", st: "سعيد جداً صعب جداً" },
    { w: "ÄLV", t: "نهر", s: "Göta älv Kalix älv", st: "نهر يوتا نهر كاليكس" },
    { w: "SKÖR", t: "رقيق", s: "ett skört vinglas", st: "كأس نبيذ رقيق" },
    { w: "KÖR", t: "استمرار", s: "i ett kör ( oavbrutet )", st: "باستمرار" },
    { w: "AVOG", t: "عدواني", s: "en avog inställning till allt nytt", st: "موقف عدواني تجاه كل جديد" },
    { w: "TANT", t: "سيّدة", s: "en gammal tant tant Sigrid", st: "امرأة عجوز العمة سيغريد" },
    { w: "RATT", t: "مِقْوَد", s: "sitta vid ratten", st: "جلس وراء عجلة القيادة" },
    { w: "START", t: "بداية", s: "skolstart __ turnéstart __ startskott", st: "بدء الدراسة __ بداية الجولة __ طلقة الانطلاق" },
    { w: "STARK", t: "قويّ", s: "starka armar stark regering stark kyla", st: "أذرع قوية حكومة قوية برد قارس" },
    { w: "KAST", t: "قذفة", s: "han fick iväg ett långt kast", st: "رمى رمية طويلة" },
    { w: "BLODIG", t: "دَمَوي", s: "Biffen var blodig.", st: "شريحة اللحم كانت نيئة." },
    { w: "BLOD", t: "دم", s: "Blodet rinner.", st: "الدم يسيل." },
    { w: "BILD", t: "درس الرسم", s: "En fin bild på familjen.", st: "صورة جميلة للعائلة." },
    { w: "LOGI", t: "مَسكن مُؤَقّت", s: "kost och logi", st: "طعام وسكن" },
    { w: "KORTA", t: "فشل", s: "komma till korta ( misslyckas )", st: "فشل" },
    { w: "KOSTAR", t: "يكلـّف", s: "vad kostar äpplena?", st: "كم سعر التفاح؟" },
    { w: "NERVÖS", t: "مُضطرب, عصبيّ", s: "vara nervös inför en tävling", st: "شعر بقلق قُبَيل المباراة" },
    { w: "ÖVRE", t: "علوي", s: "i övre delen av backen", st: "في الجزء العلوي من الهضبة" },
    { w: "VERS", t: "آية", s: "Läs en vers ur boken.", st: "اقرأ بيتاً من الكتاب." },
    { w: "STRAM", t: "ضَيِّق", s: "en stram stil", st: "طابع مُتَحَفِّظ" },
    { w: "TAM", t: "أليف", s: "en tam fågel ett tamt anfall", st: "طير داجن هجمة ضعيفة , هجوم ضعيف" },
    { w: "TORR", t: "جافّ", s: "Marken är torr.", st: "الأرض جافة." },
    { w: "MOT", t: "ضد", s: "Vi går mot stranden.", st: "نحن ذاهبون نحو الشاطئ." },
    { w: "MOR", t: "والدة", s: "mor och barn", st: "أم وطفل" },
    { w: "STARR", t: "مرض السّاد البصري", s: "grå starr grön starr", st: "الماء الأزرق ( يُسَبّب عتامة عدسة العين ) غْلُوكوما: الماء الأسود ( عِلّة في العين )" },
    { w: "STORM", t: "عاصفة", s: "Stormen fällde många träd.", st: "أسقطت العاصفة أشجاراً كثيرة." },
    { w: "STORMAR", t: "يَعْصِف", s: "det stormar stormande känslor", st: "تَعْصِف مشاعر عنيفة" },
    { w: "DIN", t: "ك", s: "är det här din bok?", st: "هل هذا كتابك؟" },
    { w: "KIND", t: "خَدّ", s: "Hon fick en kyss på kinden.", st: "حصلت على قبلة على الخد." },
    { w: "SNÄV", t: "ضيّق", s: "Kjolen är för snäv.", st: "التنورة ضيقة جداً." },
    { w: "VÄN", t: "لطيف", s: "en vän varelse", st: "مخلوق لطيف" },
    { w: "FÖRST", t: "أوّل", s: "komma först i en tävling", st: "احتل المركز الأول في مسابقة" },
    { w: "NERE", t: "مُكْتَئِب", s: "Katten är där nere.", st: "القطة هناك في الأسفل." },
    { w: "GENRE", t: "نوع", s: "en ny genre inom måleriet", st: "نوع جديد ضمن مجال الدهان" },
    { w: "REGN", t: "مَطَر", s: "Regnet öser ner.", st: "المطر ينهمر." },
    { w: "SKARP", t: "حادّ", s: "skarp ammunition ( riktig ammunition )", st: "ذخيرة حيّة" },
    { w: "KAP", t: "غنيمة", s: "göra ett gott kap", st: "غنم شيئاً جيداً" },
    { w: "SPARK", t: "ركلة", s: "hon gav katten en spark", st: "ركَلَتْ القطة برجلها" },
    { w: "STRIKT", t: "صارم", s: "strikt tillämpning av reglerna strikt klädsel", st: "تطبيق صارم للقواعد ملابس مُتَزمّتة" },
    { w: "TRIST", t: "مُحْزِن", s: "ett trist bostadsområde en trist föreläsning", st: "منطقة سكنية كئيبة مُحاضَرة مُضْجِرة" },
    { w: "SKIT", t: "كثيراً", s: "Det var bara skit.", st: "كان مجرد هراء." },
    { w: "GENTIL", t: "سخّي", s: "ett gentilt erbjudande", st: "عرض سخي" },
    { w: "LEN", t: "لَيّن", s: "en matta av len ull", st: "سجادة من الصوف الناعم" },
    { w: "ENLIGT", t: "حَسَب", s: "enligt alla beräkningar", st: "حَسَب جميع الحسابات" },
    { w: "NIT", t: "خسارة", s: "Det var en nit.", st: "كانت ورقة خاسرة." },
    { w: "INRE", t: "داخلي", s: "de inre delarna av landet", st: "الأجزاء الداخلية من البلاد" },
    { w: "ENERGI", t: "طاقة", s: "Solenergi är bra.", st: "الطاقة الشمسية جيدة." },
    { w: "REGI", t: "إخراج", s: "regi och dekor", st: "إخراج و ديكور" },
    { w: "RING", t: "خاتم", s: "Hon bär en guldring.", st: "هي ترتدي خاتماً ذهبياً." },
    { w: "HELLÅNG", t: "طويل", s: "en hellång ärm en hellång klänning", st: "كُمّ طويل فستان طويل" },
    { w: "LÅG", t: "مُنْخَفِض", s: "ett lågt bord", st: "طاولة منخفضة" },
    { w: "LÅNG", t: "طويل", s: "två meter lång", st: "طوله متران" },
    { w: "HÅN", t: "ازْدِراء", s: "det känns som ett hån", st: "أشعر كـأنه ازدراء من طرفك" },
    { w: "LÅN", t: "قَرضْ", s: "tack för lånet!", st: "شكراً على الإعارة!" },
    { w: "NÅL", t: "إبرة", s: "nål och tråd", st: "إبرة وخيط" },
    { w: "GATA", t: "شارع", s: "Gatan är lång.", st: "الشارع طويل." },
    { w: "TAG", t: "مِقْبَض", s: "ta ett ordentligt tag tuffa tag", st: "أمسك مسكة قوية ظروف حرجة" },
    { w: "MÄTT", t: "شبعان", s: "äta sig mätt mätt på framgångar", st: "أكل حتى شبع شبع من الانتصارات" },
    { w: "TÄT", t: "كثيف", s: "Skogen är tät.", st: "الغابة كثيفة." },
    { w: "DASS", t: "بيت خلاء", s: "gå på dass", st: "ذهب إلى بيت الخلاء" },
    { w: "SUR", t: "حامِض", s: "Citronen är sur.", st: "الليمون حامض." },
    { w: "KRUS", t: "قدر فخاري", s: "Inget krus, tack.", st: "بدون مجاملات، شكراً." },
    { w: "KURS", t: "اتجاه", s: "hålla en rak kurs", st: "حافَظَ على وجهة مستقيمة" },
    { w: "RUS", t: "نَشْوة", s: "Han sov ruset av sig.", st: "نام ليزول عنه السكر." },
    { w: "RUSK", t: "عاصفة", s: "regn och rusk", st: "مطر وعواصف" },
    { w: "SKUR", t: "وابل", s: "En skur av regn.", st: "زخّة مطر." },
    { w: "SLURK", t: "رَشْفة", s: "ta sig en slurk ur flaskan", st: "أخذ رشفة من الزجاجة" },
    { w: "RETAS", t: "يُمازح", s: "barnen retas med varandra", st: "يتمازح الأطفال مع بعضهم الآخر" },
    { w: "KRASS", t: "واقعي", s: "den krassa verkligheten", st: "واقع لا جدال عليه" },
    { w: "SAKNAR", t: "يفتقر", s: "checken saknar täckning", st: "يفتقر الشيك إلى تغطية نقدية" },
    { w: "ISKALL", t: "مُثَلِّج", s: "iskall pilsner iskall beräkning", st: "بيرة مثلجة تقييم بأعصاب باردة" },
    { w: "LIK", t: "شَبيه", s: "likt ( som )", st: "مِثلْ , شِبهْ" },
    { w: "SLAK", t: "مرخيّ", s: "seglen hängde slaka i stiltjen", st: "أرخى الشراع عند توقف هبوب الرياح" },
    { w: "KIL", t: "خازوق", s: "slå i en kil", st: "دَقَّ اسْفيناً" },
    { w: "LISA", t: "تَخفيف", s: "musiken är en lisa för själen", st: "الموسيقى راحة للنفس" },
    { w: "SILL", t: "سمكة الرنكة", s: "Sill är gott.", st: "الرنجة لذيذة." },
    { w: "IDEL", t: "مَحْض", s: "pjäsen möttes av idel lovord", st: "قوبلت المسرحية باستحسان تام" },
    { w: "LED", t: "مُتْعَب", s: "jag är led på mitt jobb", st: "سَئِمت عَمَلي" },
    { w: "DEL", t: "جزء", s: "en del av semestern motorns delar", st: "جزء من الإجازة أجزاء المحرك" },
    { w: "DELTID", t: "جزء من الوقت", s: "arbeta på deltid", st: "عمل عملاً جزئياً" },
    { w: "LEDD", t: "اتّجاه", s: "mattan passar bättre på andra ledden", st: "تُناسِب السجادة بصورة أفضل في الإتّجاه الآخَر" },
    { w: "SPE", t: "إهانة", s: "spott och spe", st: "تحقير وإهانة" },
    { w: "POSERAR", t: "يَتَّخذ وضعاً متكلفاً", s: "hon poserar framför kameran", st: "تَتَّخذ وضعاً أمام الكاميرا" },
    { w: "VIS", t: "حكيم", s: "vis av skadan", st: "تَعَلَّم درساً من الحادث" },
    { w: "VIPS", t: "طَرْفة عَيْن", s: "vips , var han försvunnen", st: "اختفى بطرفة عين" },
    { w: "STÖD", t: "مسند", s: "ta stöd mot väggen", st: "استند إلى الجدار" },
    { w: "MATT", t: "ضعيف", s: "Färgen är matt.", st: "اللون باهت." },
    { w: "NEDAN", t: "إلى الأسفل", s: "bilden nedan till vänster", st: "الصورة السُفليّة اليُسرى" },
    { w: "DENNA", t: "هذا, هذه", s: "denna dag detta hus dessa böcker", st: "هذا اليوم هذا البيت هذه الكتب" },
    { w: "ANDE", t: "روح", s: "den helige Ande ond ande", st: "الروح القدس روح شرير" },
    { w: "OENIG", t: "غَير مُتَّفِق", s: "partierna är oeniga ifråga om kärnkraften", st: "كان الطرفان غير مُتَّفِقين حول مسألة الطاقة الذرية" },
    { w: "KLAR", t: "صافٍ", s: "klara ögon klart vatten", st: "عيون صافية ماء صاف" },
    { w: "SKRAL", t: "سيّئ", s: "skrala kunskaper känna sig skral", st: "معرفة رديئة شَعَرَ بسوء صحته" },
    { w: "KARL", t: "رَجُل", s: "Han är en stilig karl.", st: "إنه رجل وسيم." },
    { w: "AKUT", t: "طارئ", s: "akuta sjukdomar akuta problem akuta behov", st: "أمراض طارئة مشكلات طارئة حاجة طارئة" },
    { w: "UTKANT", t: "طَرَف", s: "i utkanten av staden", st: "في طرف المدينة" },
    { w: "UNDAN", t: "جانباً", s: "dra sig undan hålla sig undan", st: "تحاشى الناس تحاشى الناس" },
    { w: "UNDRAN", t: "تَعَجُّب", s: "hans agerande väckte undran", st: "دَعَت تصرفاته إلى العَجَب" },
    { w: "SKIFT", t: "وَرْدِية, مُناوَبة, نوبة عمل", s: "arbeta ( i ) skift", st: "عَمِلَ في وردية" },
    { w: "SKRIFT", t: "كتابة", s: "tal och skrift", st: "الكلام والكتابة" },
    { w: "FIN", t: "جميل", s: "en fin bil en fin kostym", st: "سيارة جميلة بدلة أنيقة" },
    { w: "IFRÅN", t: "مِن", s: "jag är långt ifrån nöjd", st: "لست راضِياً أبداً" },
    { w: "UTIFRÅN", t: "من الخارج", s: "skaffa folk utifrån", st: "أحْضَرَ عُمّالاً من الخارج" },
    { w: "INÅT", t: "إلى الداخل", s: "han bor någonstans inåt landet", st: "إنه يسكن في مكان ما داخل البلاد" },
    { w: "FÅR", t: "خروف", s: "svart får ( misslyckad person )", st: "شخص فاشل" },
    { w: "RUIN", t: "أنقاض", s: "Huset är en ruin.", st: "المنزل عبارة عن حطام." },
    { w: "RÄLS", t: "قضيب ( من قضبان السكة الحديدية )", s: "tåget går på räls", st: "يسير القطار على السكة الحديدية" },
    { w: "LÄR", t: "يُدّعى أن", s: "hon lär vara miljonär", st: "يُقال إنها مليونيرة" },
    { w: "RÅGAD", t: "طافح", s: "en rågad sked", st: "ملعقة طافحة" },
    { w: "GÅR", t: "الأمس", s: "Tiden går fort.", st: "الوقت يمضي بسرعة." },
    { w: "ÅDRA", t: "نَزْعَة, مَيِّزَة, مَوهِبَة", s: "hon har en poetisk ådra", st: "لديها موهبة شعريّة" },
    { w: "TILL", t: "مرة أخرى", s: "ta en kaka till!", st: "خذ كعكة ثانية!" },
    { w: "TILLS", t: "حتى", s: "vänta här tills jag kommer", st: "انتظر هنا حتى آتي" },
    { w: "SLIT", t: "عمل مُجْهِد", s: "vardagens slit och släp", st: "العمل والكدح اليوميّ" },
    { w: "RÖRD", t: "مُتَأثّر", s: "alla var djupt rörda", st: "تأثر الجميع بصورة كبيرة" },
    { w: "DÄRFÖR", t: "لأن", s: "Jag är sjuk, därför stannar jag.", st: "أنا مريض، لذلك سأبقى." },
    { w: "DÖRR", t: "باب", s: "Stäng dörren.", st: "أغلق الباب." },
    { w: "FÄRD", t: "رحلة", s: "en färd genom öknen", st: "رحلة عبر الصحراء" },
    { w: "TROLIG", t: "مُحْتَمل", s: "en trolig utveckling", st: "تَطَوُّر مُحْتَمَل" },
    { w: "TORG", t: "ساحة", s: "Vi möts på torget.", st: "نلتقي في الساحة." },
    { w: "CIRKUS", t: "السيرك", s: "Vi gick på cirkus.", st: "ذهبنا إلى السيرك." },
    { w: "SUCK", t: "تَنَهُّد", s: "Hon drog en djup suck.", st: "تنهدت بعمق." },
    { w: "FAST", t: "صلب, قاسٍ", s: "Han satt fast i trafiken.", st: "علق في الازدحام المروري." },
    { w: "SAFT", t: "عصير, شراب الفاكهة", s: "saften från en apelsin", st: "عصير البرتقال" },
    { w: "SJÖFART", t: "مِلاحة بحرية", s: "den internationella sjöfarten", st: "حركة الملاحة البحرية الدولية" },
    { w: "LAM", t: "مَشلول", s: "ett lamt intresse", st: "اهتمام ضعيف" },
    { w: "SMAL", t: "ضيّق", s: "Vägen är smal.", st: "الطريق ضيق." },
    { w: "MAL", t: "عِثّة", s: "Kvarnen mal säden.", st: "الطاحونة تطحن الحبوب." },
    { w: "SALU", t: "بَيع", s: "till salu ( till försäljning )", st: "للبيع" },
    { w: "SMULA", t: "مقدار ضئيل", s: "en smula ( lite ) hänsyn", st: "مقدار ضئيل من الاعتبار" },
    { w: "DIGER", t: "ضخم", s: "en diger lunta", st: "رزمة ضخمة من الأوراق" },
    { w: "REDIG", t: "جَلِيّ", s: "ett redigt och klart resonemang", st: "نقاش واضح وجليّ" },
    { w: "DELVIS", t: "جزئياً", s: "svaret är bara delvis rätt", st: "الإجابة صحيحة جزئياً فقط" },
    { w: "LIVS", t: "حيّ", s: "Det är en livs levande älg.", st: "إنه лось حي يرزق." },
    { w: "LUKTAR", t: "تفوح منه رائحة", s: "fisken luktar illa du luktar rök", st: "تفوح رائحة كريهة من السمك تفوح منك رائحة الدخان" },
    { w: "DOPP", t: "غَطْس", s: "ta ( sig ) ett dopp", st: "غَطَس , سبح" },
    { w: "DROPPAR", t: "يُنَقّط", s: "det droppar från taket", st: "تساقطت القطرات من السقف" },
];

const WC_ROOT_WORDS = WC_DICTIONARY.filter(item => item.w.length >= 5).map(item => item.w);

console.log(`Word Connect Data Loaded: ${Object.keys(WC_PREDEFINED_LEVELS).length} levels, ${WC_DICTIONARY.length} dictionary words.`);
