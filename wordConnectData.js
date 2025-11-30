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
    "1-1": { letters: ["N", "E", "F", "A"], words: ["FENA", "ENA"], validWords: ["ENA", "FAN", "FENA"] },
    "1-2": { letters: ["Ö", "E", "N", "J"], words: ["NÖJE", "NEJ"], validWords: ["NEJ", "NÖJE"] },
    "1-3": { letters: ["R", "S", "V", "Å"], words: ["SVÅR", "ÅRS"], validWords: ["SVÅR", "ÅRS", "VÅR", "SÅR", "VRÅ"] },
    "1-4": { letters: ["K", "T", "T", "S", "A"], words: ["SKATT", "KAST", "STAT"], validWords: ["SATT", "TAK", "ATT", "TSK", "STAT", "AKT", "ASK", "KAST", "KATT", "SAK", "SKATT", "TAKT", "TASK", "SKA"] },
    "1-5": { letters: ["T", "A", "N", "F", "T"], words: ["FNATT", "FATT", "NATT"], validWords: ["FATT", "ATT", "TFA", "FAN", "FAT", "FNATT", "NATT", "TANT"] },
    "1-6": { letters: ["R", "U", "V", "K", "S"], words: ["SKRUV", "KRUS", "KURS"], validWords: ["SUR", "KRUS", "KUR", "KURS", "RUS", "RUSK", "SKRUV", "SKUR"] },
    "1-7": { letters: ["O", "B", "T", "A", "L", "T"], words: ["BLOTTA", "OTALT", "TOTAL", "LOTTA"], validWords: ["BLOTTA", "LAT", "OTALT", "TOTAL", "BLOTT", "ATT", "BLA", "ALT", "BAL", "BALT", "BLOT", "BOT", "LOTT", "LOTTA", "OBLAT", "OTAL", "OTTA", "TAL", "TOA"] },
    "1-8": { letters: ["T", "O", "A", "T", "L", "B"], words: ["BLOTTA", "OTALT", "TOTAL", "LOTTA"], validWords: ["BLOTTA", "LAT", "OTALT", "TOTAL", "BLOTT", "ATT", "BLA", "ALT", "BAL", "BALT", "BLOT", "BOT", "LOTT", "LOTTA", "OBLAT", "OTAL", "OTTA", "TAL", "TOA"] },
    "1-9": { letters: ["T", "E", "Y", "C", "R", "K"], words: ["TYCKER", "RYKTE", "TRYCK", "TYCKE"], validWords: ["KRY", "ETC", "REK", "TRE", "RYCK", "RYKTE", "TRYCK", "TYCKE", "YRKE", "TYCKER"] },
    "1-10": { letters: ["K", "K", "A", "R", "L", "I", "C"], words: ["KLICKAR", "KLAR", "LIKA", "KALK", "KARL"], validWords: ["KAL", "KLAR", "LIK", "RAK", "RIK", "CIRKA", "LIKA", "LACK", "ACK", "KLIAR", "IKC", "ARK", "KALK", "KAR", "KARL", "KICK", "KIL", "KLACK", "KLI", "KLICK", "RACK", "ILAR", "KICKAR", "KIKAR", "KILAR", "KLICKAR"] },

    // ===========================================
    // CHAPTER 2: Naturen (Nature) 🌲
    // ===========================================
    "2-1": { letters: ["B", "A", "D", "N"], words: ["BAND", "BAD"], validWords: ["ADB", "DNA", "BAD", "BAND", "DAN", "AND"] },
    "2-2": { letters: ["N", "F", "I", "T"], words: ["FINT", "FIN"], validWords: ["FIN", "FINT", "NIT"] },
    "2-3": { letters: ["S", "V", "Å", "R"], words: ["SVÅR", "SÅR"], validWords: ["SVÅR", "ÅRS", "VÅR", "SÅR", "VRÅ"] },
    "2-4": { letters: ["E", "N", "R", "D", "U"], words: ["UNDER", "RUND", "UNDRE"], validWords: ["REN", "RUND", "UNDRE", "NED", "DEN", "UNDER", "NER", "RED", "DUN", "DUR"] },
    "2-5": { letters: ["U", "T", "D", "S", "N"], words: ["STUND", "SUND", "DUST"], validWords: ["SUND", "STUD", "DUN", "DUNS", "DUS", "DUST", "SNUT", "STUND", "UNS"] },
    "2-6": { letters: ["R", "K", "A", "L", "S"], words: ["SKRAL", "KRAS", "SKAL"], validWords: ["KAL", "KLAR", "RAK", "RASK", "SKRAL", "SLAK", "RAS", "SKAR", "ARK", "ASK", "KAR", "KARL", "KRAS", "SAK", "SAL", "SKAL", "SKA"] },
    "2-7": { letters: ["K", "O", "T", "T", "A", "L"], words: ["KALOTT", "OTALT", "TOTAL", "LOTTA"], validWords: ["KAL", "LAT", "OTALT", "TOTAL", "TAK", "ATT", "TOLK", "KOL", "AKT", "ALT", "KALOTT", "KATT", "KLO", "KLOT", "KOLA", "KOTA", "LOK", "LOTT", "LOTTA", "OTAKT", "OTAL", "OTTA", "TAKT", "TAL", "TALK", "TOA", "TOK"] },
    "2-8": { letters: ["Y", "S", "R", "A", "K", "T"], words: ["STYRKA", "STARK", "STRYK", "RYKTAS"], validWords: ["KRY", "RAK", "RASK", "RYSK", "STARK", "TYSK", "TAK", "TSK", "ART", "RAS", "YRKA", "SKAR", "AKT", "ARK", "ASK", "KAR", "KAST", "KRAS", "RAST", "RYA", "RYSKA", "SAK", "SKRYT", "SKY", "STRYK", "STYR", "STYRKA", "SYRA", "TASK", "TSAR", "TYSKA", "YTA", "RYKTAS", "SKA", "SKYR", "SYR", "TAR"] },
    "2-9": { letters: ["T", "K", "S", "A", "R", "Y"], words: ["RYKTAS", "STARK", "STRYK", "STYRKA"], validWords: ["KRY", "RAK", "RASK", "RYSK", "STARK", "TYSK", "TAK", "TSK", "ART", "RAS", "YRKA", "SKAR", "AKT", "ARK", "ASK", "KAR", "KAST", "KRAS", "RAST", "RYA", "RYSKA", "SAK", "SKRYT", "SKY", "STRYK", "STYR", "STYRKA", "SYRA", "TASK", "TSAR", "TYSKA", "YTA", "RYKTAS", "SKA", "SKYR", "SYR", "TAR"] },
    "2-10": { letters: ["L", "K", "C", "E", "A", "N", "D"], words: ["NACKDEL", "ELAK", "ENDA", "KLEN", "ADEL"], validWords: ["ELAK", "ENDA", "KAL", "KLEN", "LED", "LEN", "NED", "DEN", "ANDEL", "CAD", "DAL", "ELD", "LACK", "ENL", "ACK", "DNA", "ENA", "AKNE", "DAN", "KAND", "LADE", "ACNE", "ADEL", "AND", "ANDE", "ANKEL", "DANK", "DEKAL", "DEL", "EKA", "KANEL", "KEL", "LAND", "LEDA", "LEK", "NACKDEL", "NACKE", "KAN"] },

    // ===========================================
    // CHAPTER 3: Resor (Travel) ✈️
    // ===========================================
    "3-1": { letters: ["O", "T", "D", "F"], words: ["DOFT", "FOT"], validWords: ["FOT", "DOFT"] },
    "3-2": { letters: ["H", "R", "N", "Ö"], words: ["HÖRN", "RÖN"], validWords: ["HÖRN", "RÖN", "ÖRN", "HÖR"] },
    "3-3": { letters: ["V", "A", "R", "T"], words: ["VART", "VAR"], validWords: ["VAR", "VART", "ART", "ARV", "TRAV", "TAR"] },
    "3-4": { letters: ["T", "O", "T", "L", "A"], words: ["TOTAL", "LOTT", "OTAL"], validWords: ["LAT", "OTALT", "TOTAL", "ATT", "ALT", "LOTT", "LOTTA", "OTAL", "OTTA", "TAL", "TOA"] },
    "3-5": { letters: ["S", "S", "Y", "N", "E"], words: ["SYNES", "NYSS", "SYNE"], validWords: ["SEN", "ENS", "NYSS", "ESS", "NYS", "SYN", "SYNE", "SYNES", "SYNS"] },
    "3-6": { letters: ["R", "A", "L", "I", "V"], words: ["VILAR", "VILA", "ILAR"], validWords: ["VAR", "VIA", "ARV", "AVI", "LARV", "LAV", "LIV", "RIVAL", "VAL", "VILA", "ILAR", "VILAR"] },
    "3-7": { letters: ["R", "R", "V", "A", "F", "Ö"], words: ["VARFÖR", "FÖRRA", "FAVÖR", "FÖRVAR"], validWords: ["FÖRRA", "RAR", "FÖR", "FÖRR", "VAR", "VARFÖR", "RÖR", "FÖRVAR", "ARV", "FAR", "FAVÖR", "FRÖ", "RÖRA", "RÖV", "ÖRA", "RÖVAR", "ÖVAR"] },
    "3-8": { letters: ["F", "R", "Ö", "R", "A", "V"], words: ["FÖRVAR", "FÖRRA", "VARFÖR", "FAVÖR"], validWords: ["FÖRRA", "RAR", "FÖR", "FÖRR", "VAR", "VARFÖR", "RÖR", "FÖRVAR", "ARV", "FAR", "FAVÖR", "FRÖ", "RÖRA", "RÖV", "ÖRA", "RÖVAR", "ÖVAR"] },
    "3-9": { letters: ["S", "Y", "C", "E", "T", "K"], words: ["STYCKE", "STYCK", "TYCKS", "TYCKE"], validWords: ["TYSK", "ETC", "SEK", "TSK", "SEKT", "SET", "SKY", "STEK", "STYCK", "STYCKE", "TES", "TYCKE", "TYCKS"] },
    "3-10": { letters: ["S", "H", "Ö", "N", "K", "E", "T"], words: ["SKÖNHET", "SKÖN", "HÖNS", "HÖST", "STEN"], validWords: ["HES", "HET", "SEN", "SKÖN", "SÖT", "ENS", "STEN", "SEK", "TSK", "SKEN", "HEN", "KÖN", "KNÖT", "NÖS", "SKÖT", "SNÖT", "HETS", "HÖK", "HÖNS", "HÖST", "NÖT", "SEKT", "SET", "SKÖNHET", "SKÖTE", "SNÖ", "STEK", "STÖK", "STÖN", "TES", "TÖS", "ÖKEN", "ÖST"] },

    // ===========================================
    // CHAPTER 4: Vardag (Daily Life) 🏠
    // ===========================================
    "4-1": { letters: ["T", "T", "M", "A"], words: ["MATT", "TAM"], validWords: ["MATT", "TAM", "ATT", "MAT"] },
    "4-2": { letters: ["R", "D", "A", "G"], words: ["DRAG", "ARG"], validWords: ["ARG", "DRAG", "DAR", "DAG", "GRAD", "RAD"] },
    "4-3": { letters: ["C", "E", "V", "K"], words: ["VECK", "VEK"], validWords: ["VEK", "VECK"] },
    "4-4": { letters: ["N", "Y", "E", "S", "S"], words: ["SYNES", "NYSS", "SYNE"], validWords: ["SEN", "ENS", "NYSS", "ESS", "NYS", "SYN", "SYNE", "SYNES", "SYNS"] },
    "4-5": { letters: ["F", "N", "A", "T", "T"], words: ["FNATT", "TANT", "FATT"], validWords: ["FATT", "ATT", "TFA", "FAN", "FAT", "FNATT", "NATT", "TANT"] },
    "4-6": { letters: ["N", "T", "Y", "T", "A"], words: ["NYTTA", "NATT", "TANT"], validWords: ["ATT", "NATT", "NYTTA", "TANT", "YTA"] },
    "4-7": { letters: ["K", "R", "Y", "T", "A", "S"], words: ["STYRKA", "STARK", "STRYK", "RYKTAS"], validWords: ["KRY", "RAK", "RASK", "RYSK", "STARK", "TYSK", "TAK", "TSK", "ART", "RAS", "YRKA", "SKAR", "AKT", "ARK", "ASK", "KAR", "KAST", "KRAS", "RAST", "RYA", "RYSKA", "SAK", "SKRYT", "SKY", "STRYK", "STYR", "STYRKA", "SYRA", "TASK", "TSAR", "TYSKA", "YTA", "RYKTAS", "SKA", "SKYR", "SYR", "TAR"] },
    "4-8": { letters: ["Å", "T", "R", "S", "N", "A"], words: ["ANSTÅR", "SNART", "TRANS", "ANSTÅ"], validWords: ["SNAR", "SNART", "ÅRS", "TRANS", "RÅN", "ART", "RAS", "RÅNA", "SÅN", "STAN", "RAST", "SNÅR", "STRÅ", "SÅR", "TSAR", "TÅR", "ÅRA", "ÅSNA", "ANSTÅ", "ANSTÅR", "NÅR", "STÅR", "TAR", "TÅRAS"] },
    "4-9": { letters: ["F", "Ö", "R", "V", "R", "A"], words: ["FÖRVAR", "FÖRRA", "VARFÖR", "FAVÖR"], validWords: ["FÖRRA", "RAR", "FÖR", "FÖRR", "VAR", "VARFÖR", "RÖR", "FÖRVAR", "ARV", "FAR", "FAVÖR", "FRÖ", "RÖRA", "RÖV", "ÖRA", "RÖVAR", "ÖVAR"] },
    "4-10": { letters: ["M", "Ä", "S", "T", "A", "R", "E"], words: ["MÄSTARE", "MEST", "SAMT", "SMÄRTA", "TEMA"], validWords: ["ARM", "MER", "MEST", "RETSAM", "RÄT", "SMART", "SMÄRT", "STRAM", "TAM", "MÄTA", "RAM", "AMS", "SAM", "STAM", "SÄR", "ART", "RAS", "SAMT", "SMÄRTA", "ARME", "TRE", "SAMER", "MERA", "MESTA", "SMET", "SÄMRE", "ASTER", "ERA", "MARS", "MAST", "MAT", "MES", "MÄSTARE", "MÄT", "MÄTARE", "RAST", "REA", "REM", "REMSA", "RESA", "REST", "RÄTA", "SAME", "SATE", "SET", "STARE", "SÄTE", "TARM", "TEAM", "TEMA", "TERM", "TES", "TRAMS", "TREA", "TRÄ", "TSAR", "ÄRA", "ÄRM", "ÄRT", "ETSAR", "METAR", "MÄTER", "RETAS", "SER", "SMETAR", "TAR", "TÄR", "ÄTER"] },

    // ===========================================
    // CHAPTER 5: Mat & Dryck (Advanced) 🍎
    // ===========================================
    "5-1": { letters: ["T", "L", "T", "Ä"], words: ["LÄTT", "TÄT"], validWords: ["LÄTT", "TÄT", "LÄT", "TÄLT", "ÄTT"] },
    "5-2": { letters: ["A", "R", "F", "M"], words: ["FRAM", "ARM"], validWords: ["ARM", "FRAM", "RAM", "FAR", "FARM"] },
    "5-3": { letters: ["H", "R", "T", "A"], words: ["HART", "ART"], validWords: ["HART", "ART", "HAT", "HAR", "TAR"] },
    "5-4": { letters: ["Ö", "F", "A", "R", "R"], words: ["FÖRRA", "FÖRR", "RÖRA"], validWords: ["FÖRRA", "RAR", "FÖR", "FÖRR", "RÖR", "FAR", "FRÖ", "RÖRA", "ÖRA"] },
    "5-5": { letters: ["M", "S", "L", "U", "P"], words: ["SLUMP", "PLUS", "PULS"], validWords: ["PLUS", "MSU", "PULS", "LUMP", "LUS", "MUS", "SLUM", "SLUMP", "SUMP", "SUP"] },
    "5-6": { letters: ["E", "A", "N", "D", "N"], words: ["DENNA", "NEDAN", "ANDE"], validWords: ["ENDA", "NED", "NEDAN", "DEN", "DNA", "DENNA", "ENA", "DAN", "AND", "ANDE"] },
    "5-7": { letters: ["G", "A", "L", "S", "N", "I"], words: ["INSLAG", "SALIG", "GLANS", "SIGNAL"], validWords: ["SALIG", "GLANS", "GLAS", "LAG", "AGS", "SIL", "SIG", "SIN", "ANG", "INGA", "AGN", "ALG", "ANIS", "GAS", "INSLAG", "LAGS", "LANS", "LIGA", "LIN", "LINA", "LINS", "LISA", "NIA", "SAL", "SIGNAL", "SLAG", "SLANG", "SLINGA", "GAL"] },
    "5-8": { letters: ["T", "S", "A", "R", "K", "T"], words: ["SKRATT", "START", "STARK", "SKATT"], validWords: ["RAK", "RASK", "SATT", "STARK", "TAK", "ATT", "TSK", "ART", "RAS", "STAT", "TRAKT", "SKAR", "AKT", "ARK", "ASK", "KAR", "KAST", "KATT", "KRAS", "RAST", "RATT", "SAK", "SKATT", "SKRATT", "START", "TAKT", "TASK", "TRAST", "TSAR", "SKA", "TAR"] },
    "5-9": { letters: ["Ö", "A", "V", "F", "R", "R"], words: ["FÖRVAR", "FÖRRA", "VARFÖR", "FAVÖR"], validWords: ["FÖRRA", "RAR", "FÖR", "FÖRR", "VAR", "VARFÖR", "RÖR", "FÖRVAR", "ARV", "FAR", "FAVÖR", "FRÖ", "RÖRA", "RÖV", "ÖRA", "RÖVAR", "ÖVAR"] },
    "5-10": { letters: ["S", "V", "R", "A", "A", "I", "V"], words: ["AVVISAR", "VARS", "SVAR", "VARA", "VARV"], validWords: ["VIS", "VAR", "VARAV", "VVS", "AVVISA", "RAS", "VIA", "VARS", "VARA", "ARIA", "ARV", "AVI", "RIS", "SAV", "SVAR", "SVARV", "VARV", "VAS", "VISA", "AVVISAR", "RIVS", "SIAR", "VISAR"] },

    // ===========================================
    // CHAPTER 6: Naturen (Advanced) 🌲
    // ===========================================
    "6-1": { letters: ["K", "C", "D", "O"], words: ["DOCK", "OCK"], validWords: ["DOCK", "OCK", "KOD"] },
    "6-2": { letters: ["K", "P", "A", "P"], words: ["KAPP", "KAP"], validWords: ["KAP", "KAPP"] },
    "6-3": { letters: ["O", "D", "E", "R"], words: ["REDO", "ORD"], validWords: ["REDO", "RED", "ORD"] },
    "6-4": { letters: ["E", "O", "N", "Ä", "V"], words: ["OÄVEN", "ÄVEN", "NÄVE"], validWords: ["OÄVEN", "VÄN", "ÄVEN", "VEN", "NÄVE", "OVÄN"] },
    "6-5": { letters: ["U", "S", "T", "L", "O"], words: ["OLUST", "SLUT", "LUST"], validWords: ["SLUT", "SOU", "SOL", "LOTS", "LUS", "LUST", "LUT", "OLUST", "OST", "SOT", "STO", "STOL"] },
    "6-6": { letters: ["R", "S", "E", "A", "V"], words: ["AVSER", "VARSE", "REVA"], validWords: ["VARSE", "VAR", "RAS", "VARS", "VERS", "REV", "REVS", "ARV", "ERA", "REA", "RESA", "REVA", "SAV", "SVAR", "VAS", "AVSER", "SER", "VARE"] },
    "6-7": { letters: ["R", "E", "K", "C", "Y", "T"], words: ["TYCKER", "RYKTE", "TRYCK", "TYCKE"], validWords: ["KRY", "ETC", "REK", "TRE", "RYCK", "RYKTE", "TRYCK", "TYCKE", "YRKE", "TYCKER"] },
    "6-8": { letters: ["T", "S", "R", "Ä", "V", "A"], words: ["VÄSTRA", "SVART", "TVÄRS", "VÄRST"], validWords: ["RÄT", "STRÄV", "SVART", "TVÄR", "VÄSTRA", "TVÄRS", "VAR", "VART", "VÄRST", "SÄR", "ART", "RAS", "STAV", "VARS", "ÄRVA", "ARV", "RAST", "RÄTA", "RÄV", "SAV", "STÄV", "SVAR", "SVÄRTA", "SÄV", "TRAV", "TRÄ", "TSAR", "VAS", "VÄST", "VÄTA", "ÄRA", "ÄRT", "STÄVAR", "SVÄR", "TAR", "TÄR"] },
    "6-9": { letters: ["T", "O", "A", "L", "B", "T"], words: ["BLOTTA", "OTALT", "TOTAL", "LOTTA"], validWords: ["BLOTTA", "LAT", "OTALT", "TOTAL", "BLOTT", "ATT", "BLA", "ALT", "BAL", "BALT", "BLOT", "BOT", "LOTT", "LOTTA", "OBLAT", "OTAL", "OTTA", "TAL", "TOA"] },
    "6-10": { letters: ["R", "E", "D", "S", "K", "P", "A"], words: ["REDSKAP", "REDA", "SKARP", "REPA", "SPADER"], validWords: ["RAK", "RASK", "REDA", "SKARP", "SPAK", "PERS", "REK", "RESP", "SAP", "SEK", "RAS", "PAD", "PER", "PASK", "DAR", "DERAS", "RED", "SADE", "SKAR", "SKRED", "SPAR", "SPRED", "ARK", "ASK", "ASP", "DASK", "DRAKE", "EKA", "ERA", "KAP", "KAR", "KEPS", "KRAS", "PAR", "PARK", "RAD", "RAP", "RAPS", "RASP", "REA", "REDSKAP", "REP", "REPA", "RESA", "SAK", "SED", "SKARE", "SKED", "SPAD", "SPADE", "SPADER", "SPARK", "SPE", "EKAR", "PEKAR", "SER", "SKA", "SKER"] },

    // ===========================================
    // CHAPTER 7: Resor (Advanced) ✈️
    // ===========================================
    "7-1": { letters: ["K", "N", "Ä", "L"], words: ["LÄNK", "LÄN"], validWords: ["LÄN", "KNÄ", "LÄNK"] },
    "7-2": { letters: ["T", "Ä", "S", "T"], words: ["SÄTT", "TÄT"], validWords: ["TÄT", "SÄTT", "ÄTT"] },
    "7-3": { letters: ["T", "A", "T", "S"], words: ["STAT", "ATT"], validWords: ["SATT", "ATT", "STAT"] },
    "7-4": { letters: ["F", "A", "K", "S", "T"], words: ["SKAFT", "FAST", "KAST"], validWords: ["FAST", "TAK", "TFA", "TSK", "AKT", "ASK", "FAS", "FAT", "KAF", "KAST", "SAFT", "SAK", "SKAFT", "TASK", "SKA"] },
    "7-5": { letters: ["K", "R", "I", "E", "V"], words: ["VIRKE", "RIKE", "VERK"], validWords: ["RIK", "VEK", "REK", "REV", "IVER", "RIKE", "VERK", "VIK", "VIRKE", "VIKER"] },
    "7-6": { letters: ["S", "K", "A", "L", "P"], words: ["SKALP", "PLASK", "SKAL"], validWords: ["KAL", "SLAK", "SPAK", "SAP", "PASK", "ASK", "ASP", "KAP", "PLASK", "SAK", "SAL", "SKAL", "SKALP", "SKA"] },
    "7-7": { letters: ["L", "A", "A", "N", "T", "G"], words: ["GALANT", "ANLAG", "ANTAL", "TALAN"], validWords: ["GALANT", "LAGA", "LAT", "ALTAN", "LAG", "LANT", "ANLAG", "ANTAL", "ANG", "LAGT", "AGA", "AGN", "ALG", "ALT", "GALA", "GALT", "GATA", "TAG", "TAL", "TALAN", "TALANG", "TALG", "GAL"] },
    "7-8": { letters: ["T", "S", "T", "K", "R", "A"], words: ["SKRATT", "STARK", "SKATT", "START"], validWords: ["RAK", "RASK", "SATT", "STARK", "TAK", "ATT", "TSK", "ART", "RAS", "STAT", "TRAKT", "SKAR", "AKT", "ARK", "ASK", "KAR", "KAST", "KATT", "KRAS", "RAST", "RATT", "SAK", "SKATT", "SKRATT", "START", "TAKT", "TASK", "TRAST", "TSAR", "SKA", "TAR"] },
    "7-9": { letters: ["O", "L", "A", "T", "T", "K"], words: ["KALOTT", "OTALT", "TOTAL", "LOTTA"], validWords: ["KAL", "LAT", "OTALT", "TOTAL", "TAK", "ATT", "TOLK", "KOL", "AKT", "ALT", "KALOTT", "KATT", "KLO", "KLOT", "KOLA", "KOTA", "LOK", "LOTT", "LOTTA", "OTAKT", "OTAL", "OTTA", "TAKT", "TAL", "TALK", "TOA", "TOK"] },
    "7-10": { letters: ["I", "N", "T", "D", "R", "E", "Ä"], words: ["INTRÄDE", "INRE", "TÄRD", "DÄRI", "INTE"], validWords: ["INRE", "REN", "RÄT", "TRIND", "TÄRD", "DIT", "DÄR", "DÄRI", "INTE", "NED", "NÄR", "RENT", "DEN", "RIT", "DET", "DIN", "TRE", "NER", "RED", "TÄNDER", "DIET", "ENTR", "IDE", "INTRÄDE", "NIT", "NÄT", "RÄD", "TID", "TREND", "TRÄ", "TRÄD", "ÄNDE", "ÄRT", "TÄR", "ÄTER"] },

    // ===========================================
    // CHAPTER 8: Vardag (Advanced) 🏠
    // ===========================================
    "8-1": { letters: ["Ä", "A", "L", "X"], words: ["LÄXA", "LAX"], validWords: ["LAX", "LÄXA"] },
    "8-2": { letters: ["A", "M", "S", "K"], words: ["SMAK", "AMS"], validWords: ["AMS", "MSK", "SAM", "ASK", "KAM", "MAK", "MASK", "SAK", "SKAM", "SMAK", "SKA"] },
    "8-3": { letters: ["A", "B", "D", "L"], words: ["BLAD", "BAD"], validWords: ["DAL", "ADB", "BLA", "BAD", "BAL", "BLAD"] },
    "8-4": { letters: ["S", "R", "Ö", "T", "F"], words: ["FÖRST", "RÖST", "STÖR"], validWords: ["SÖT", "FÖR", "FÖRST", "STRÖ", "FRÖS", "RÖS", "RÖT", "FRÖ", "RÖST", "STÖR", "TÖS", "ÖRT", "ÖST", "TÖRS"] },
    "8-5": { letters: ["E", "V", "Ö", "R", "S"], words: ["ÖVERS", "ÖVRE", "ÖVER"], validWords: ["ÖVRE", "ÖVER", "VERS", "REV", "REVS", "RÖS", "RÖSE", "RÖV", "ÖRE", "ÖVERS", "SER", "SÖVER", "ÖSER"] },
    "8-6": { letters: ["L", "Ä", "N", "G", "E"], words: ["LÄNGE", "LÄGE", "ÄNGEL"], validWords: ["GEN", "LEN", "LÄNGE", "LÄGE", "ENL", "GEL", "LÄN", "NEG", "LEG", "ÄLG", "ÄNG", "ÄNGEL"] },
    "8-7": { letters: ["Y", "R", "K", "T", "A", "S"], words: ["STYRKA", "STARK", "STRYK", "RYKTAS"], validWords: ["KRY", "RAK", "RASK", "RYSK", "STARK", "TYSK", "TAK", "TSK", "ART", "RAS", "YRKA", "SKAR", "AKT", "ARK", "ASK", "KAR", "KAST", "KRAS", "RAST", "RYA", "RYSKA", "SAK", "SKRYT", "SKY", "STRYK", "STYR", "STYRKA", "SYRA", "TASK", "TSAR", "TYSKA", "YTA", "RYKTAS", "SKA", "SKYR", "SYR", "TAR"] },
    "8-8": { letters: ["A", "T", "L", "T", "O", "K"], words: ["KALOTT", "OTALT", "TOTAL", "LOTTA"], validWords: ["KAL", "LAT", "OTALT", "TOTAL", "TAK", "ATT", "TOLK", "KOL", "AKT", "ALT", "KALOTT", "KATT", "KLO", "KLOT", "KOLA", "KOTA", "LOK", "LOTT", "LOTTA", "OTAKT", "OTAL", "OTTA", "TAKT", "TAL", "TALK", "TOA", "TOK"] },
    "8-9": { letters: ["A", "R", "K", "Y", "T", "S"], words: ["STYRKA", "STARK", "STRYK", "RYKTAS"], validWords: ["KRY", "RAK", "RASK", "RYSK", "STARK", "TYSK", "TAK", "TSK", "ART", "RAS", "YRKA", "SKAR", "AKT", "ARK", "ASK", "KAR", "KAST", "KRAS", "RAST", "RYA", "RYSKA", "SAK", "SKRYT", "SKY", "STRYK", "STYR", "STYRKA", "SYRA", "TASK", "TSAR", "TYSKA", "YTA", "RYKTAS", "SKA", "SKYR", "SYR", "TAR"] },
    "8-10": { letters: ["G", "R", "S", "Ä", "L", "N", "E"], words: ["GRÄNSLE", "LÄGER", "REGN", "RÄLS", "SLÄNG"], validWords: ["GEN", "GLES", "LEN", "REN", "SEG", "SEN", "ENS", "GRÄNSLE", "LÄNGE", "NÄR", "LÄGE", "ENL", "SÄR", "GEL", "LÄNGS", "LÄN", "LÄGRE", "LÄNGRE", "NEG", "NER", "GREN", "GRÄL", "GRÄNS", "GRÄS", "LEG", "LÄGER", "NÄS", "REGN", "RELÄ", "RÄLS", "SLÄNG", "SÄGEN", "SÄL", "SÄLG", "SÄNG", "ÄLG", "ÄNG", "ÄNGEL", "ÄRG", "GER", "GLÄNSER", "LER", "LÄR", "LÄSER", "SER", "SLÄNGER", "SÄGER", "ÄGER"] },

    // ===========================================
    // CHAPTER 9: Familj (Family) 👨‍👩‍👧‍👦
    // ===========================================
    "9-1": { letters: ["R", "E", "N", "E"], words: ["NERE", "REN"], validWords: ["NERE", "REN", "NER"] },
    "9-2": { letters: ["D", "O", "O", "G"], words: ["GODO", "GOD"], validWords: ["GOD", "DOG", "GODO"] },
    "9-3": { letters: ["S", "T", "O", "R"], words: ["STOR", "ORT"], validWords: ["STOR", "ORT", "ROST", "OST", "ROS", "ROT", "SORT", "SOT", "STO", "TRO"] },
    "9-4": { letters: ["S", "I", "V", "O", "S"], words: ["OVISS", "VISS", "VISSO"], validWords: ["OVISS", "VIS", "VISS", "OSV", "SIOS", "OSS", "SOV", "VISSO"] },
    "9-5": { letters: ["Ö", "V", "E", "R", "S"], words: ["ÖVERS", "ÖVRE", "ÖVER"], validWords: ["ÖVRE", "ÖVER", "VERS", "REV", "REVS", "RÖS", "RÖSE", "RÖV", "ÖRE", "ÖVERS", "SER", "SÖVER", "ÖSER"] },
    "9-6": { letters: ["P", "L", "A", "T", "S"], words: ["PLATS", "SALT", "LAST"], validWords: ["LAT", "SALT", "LAST", "PLAST", "ATP", "SAP", "STP", "STAL", "ALT", "ASP", "PALT", "PLATS", "SAL", "SPALT", "TAL"] },
    "9-7": { letters: ["Y", "T", "S", "K", "A", "R"], words: ["RYKTAS", "STARK", "STRYK", "STYRKA"], validWords: ["KRY", "RAK", "RASK", "RYSK", "STARK", "TYSK", "TAK", "TSK", "ART", "RAS", "YRKA", "SKAR", "AKT", "ARK", "ASK", "KAR", "KAST", "KRAS", "RAST", "RYA", "RYSKA", "SAK", "SKRYT", "SKY", "STRYK", "STYR", "STYRKA", "SYRA", "TASK", "TSAR", "TYSKA", "YTA", "RYKTAS", "SKA", "SKYR", "SYR", "TAR"] },
    "9-8": { letters: ["A", "T", "G", "A", "L", "N"], words: ["GALANT", "ANLAG", "ANTAL", "TALAN"], validWords: ["GALANT", "LAGA", "LAT", "ALTAN", "LAG", "LANT", "ANLAG", "ANTAL", "ANG", "LAGT", "AGA", "AGN", "ALG", "ALT", "GALA", "GALT", "GATA", "TAG", "TAL", "TALAN", "TALANG", "TALG", "GAL"] },
    "9-9": { letters: ["S", "A", "T", "N", "Å", "R"], words: ["ANSTÅR", "SNART", "TRANS", "ANSTÅ"], validWords: ["SNAR", "SNART", "ÅRS", "TRANS", "RÅN", "ART", "RAS", "RÅNA", "SÅN", "STAN", "RAST", "SNÅR", "STRÅ", "SÅR", "TSAR", "TÅR", "ÅRA", "ÅSNA", "ANSTÅ", "ANSTÅR", "NÅR", "STÅR", "TAR", "TÅRAS"] },
    "9-10": { letters: ["R", "A", "N", "N", "A", "T", "S"], words: ["STANNAR", "SANN", "SNAR", "ANNARS", "SANNA"], validWords: ["SANN", "SNAR", "ANNARS", "SNART", "TRANS", "ART", "RAS", "RANN", "STAN", "RAST", "SATAN", "SNARA", "TRANA", "TRASA", "TSAR", "ANAR", "ANSAR", "ANTAR", "SANNA", "STANNAR", "TAR"] },

    // ===========================================
    // CHAPTER 10: Skola (School) 📚
    // ===========================================
    "10-1": { letters: ["K", "I", "F", "L"], words: ["FLIK", "LIK"], validWords: ["LIK", "FIL", "FIK", "FLIK", "KIL", "KLI"] },
    "10-2": { letters: ["K", "L", "E", "A"], words: ["ELAK", "LEK"], validWords: ["ELAK", "KAL", "EKA", "KEL", "LEK"] },
    "10-3": { letters: ["K", "A", "M", "S"], words: ["SMAK", "KAM"], validWords: ["AMS", "MSK", "SAM", "ASK", "KAM", "MAK", "MASK", "SAK", "SKAM", "SMAK", "SKA"] },
    "10-4": { letters: ["A", "T", "K", "T", "S"], words: ["SKATT", "KAST", "STAT"], validWords: ["SATT", "TAK", "ATT", "TSK", "STAT", "AKT", "ASK", "KAST", "KATT", "SAK", "SKATT", "TAKT", "TASK", "SKA"] },
    "10-5": { letters: ["R", "Å", "G", "V", "A"], words: ["AVGÅR", "GÅVA", "RÅGA"], validWords: ["ARG", "GRAV", "GRÅ", "VAG", "VAR", "AVGÅR", "GÅRAV", "RÅG", "AVGÅ", "VÅR", "GAV", "ARV", "GÅR", "GÅVA", "RÅGA", "VARG", "VRÅ", "VÅG", "ÅRA", "VÅGAR"] },
    "10-6": { letters: ["A", "T", "K", "R", "O"], words: ["KORTA", "KORT", "TORK"], validWords: ["KORT", "RAK", "TAK", "ART", "ORT", "AKT", "ARK", "KAR", "KOR", "KORTA", "KOTA", "KROAT", "ORK", "ROT", "TOA", "TOK", "TORK", "TORKA", "TRO", "TAR"] },
    "10-7": { letters: ["Y", "T", "R", "A", "S", "K"], words: ["STYRKA", "STARK", "STRYK", "RYKTAS"], validWords: ["KRY", "RAK", "RASK", "RYSK", "STARK", "TYSK", "TAK", "TSK", "ART", "RAS", "YRKA", "SKAR", "AKT", "ARK", "ASK", "KAR", "KAST", "KRAS", "RAST", "RYA", "RYSKA", "SAK", "SKRYT", "SKY", "STRYK", "STYR", "STYRKA", "SYRA", "TASK", "TSAR", "TYSKA", "YTA", "RYKTAS", "SKA", "SKYR", "SYR", "TAR"] },
    "10-8": { letters: ["L", "A", "T", "T", "O", "K"], words: ["KALOTT", "OTALT", "TOTAL", "LOTTA"], validWords: ["KAL", "LAT", "OTALT", "TOTAL", "TAK", "ATT", "TOLK", "KOL", "AKT", "ALT", "KALOTT", "KATT", "KLO", "KLOT", "KOLA", "KOTA", "LOK", "LOTT", "LOTTA", "OTAKT", "OTAL", "OTTA", "TAKT", "TAL", "TALK", "TOA", "TOK"] },
    "10-9": { letters: ["L", "A", "T", "A", "G", "N"], words: ["GALANT", "ANLAG", "ANTAL", "TALAN"], validWords: ["GALANT", "LAGA", "LAT", "ALTAN", "LAG", "LANT", "ANLAG", "ANTAL", "ANG", "LAGT", "AGA", "AGN", "ALG", "ALT", "GALA", "GALT", "GATA", "TAG", "TAL", "TALAN", "TALANG", "TALG", "GAL"] },
    "10-10": { letters: ["G", "A", "N", "S", "L", "I", "M"], words: ["SAMLING", "MANLIG", "SMAL", "LAGS", "LISA"], validWords: ["LAM", "MALIGN", "MANLIG", "SALIG", "SMAL", "AMIN", "GLANS", "GLAS", "LAG", "AGS", "AMS", "MIN", "SAM", "SIL", "MAN", "MIG", "SIG", "SIN", "ANG", "INGA", "MAG", "AGN", "ALG", "ALM", "ANIS", "GAM", "GAS", "INSLAG", "ISLAM", "LAGS", "LANS", "LIGA", "LIM", "LIN", "LINA", "LINS", "LISA", "MAGI", "MAL", "MANI", "MANS", "MIL", "MINA", "NIA", "SAL", "SAMLING", "SIGNAL", "SIM", "SLAG", "SLAM", "SLANG", "SLINGA", "SMIL", "GAL"] },
};
const WC_DICTIONARY = [
    { w: "FENA", t: "زعنفة", s: "utan att röra en fena ( helt stilla )", st: "بدون أن يتحرك من مكانه" },
    { w: "ENA", t: "أحدهما", s: "varken det ena eller det andra", st: "لاهذا ولا ذاك" },
    { w: "NÖJE", t: "استمتاع", s: "jag hade inget nöje av resan jag ska med nöje läsa boken", st: "لم أستفد شيئاً من هذه الرحلة يسعدني أن أقرأ الكتاب" },
    { w: "NEJ", t: "لا", s: "nej tack! nej då! nej till kärnkraft", st: "شكراً لا أريد ذلك! بل لا! لا للطاقة النوويّة" },
    { w: "SVÅR", t: "صَعب", s: "en svår skrivning en svår fråga en svår tid det blir allt svårare att få pengarna att räcka", st: "امتحان مُعَقَّد مسألة مُعَقَّدة وقت عَسير أصبح من الصعب الاكتفاء بالنقود التي يكسبها المرء" },
    { w: "ÅRS", t: "من العام", s: "så här års ( vid den här tiden på året )", st: "في هذا الوقت من العام" },
    { w: "SKATT", t: "ضريبة, ضريبة مباشرة, ضريبة غير مباشرة", s: "progressiv skatt hög skatt vad betalar du i skatt? nya skatter på sprit och tobak", st: "ضريبة تَصاعدية ضريبة عالية كم تدفع ضريبة؟ ضرائب جديدة مفروضة على المشروبات الروحيّة والتبغ" },
    { w: "KAST", t: "قذفة", s: "ge sig i kast med ( ta itu med ( något besvärligt ) ) stå sitt kast ( skylla sig själv )", st: "تعامل مع عليه لوم نفسه" },
    { w: "STAT", t: "الدولة", s: "stat och kommun staten äger en tredjedel av företaget", st: "الدولة والبلدية تملك الدولة ثُلث الشركة" },
    { w: "FNATT", t: "جنون", s: "få fnatt ( bli galen )", st: "أصابه الجنون" },
    { w: "FATT", t: "حال", s: "hur är det fatt? ( hur står det till? )", st: "كيف الحال الآن" },
    { w: "NATT", t: "ليل", s: "i natt drömde jag om dej jag kommer i natt sova gott om natten ligga över natt ( en ) mitt i natten vakna på natten natten till tisdagen", st: "حلمت بك الليلة سوف آتي الليلة أتمنى لك نوماً سعيداً بقي في الليل في عزّ الليل استيقظ في الليل ليلة الثلاثاء" },
    { w: "SKRUV", t: "برغي, بُرغي", s: "ha en skruv lös ( vara lite galen )", st: "مجنون" },
    { w: "KRUS", t: "احترام مفرط", s: "( göra något ) utan krus ( direkt )", st: "فعل مباشرة" },
    { w: "KURS", t: "اتجاه", s: "hålla en rak kurs", st: "حافَظَ على وجهة مستقيمة" },
    { w: "BLOTTA", t: "مُجرّد", s: "se med blotta ögat komma undan med blotta förskräckelsen blotta misstanken är tillräcklig", st: "رأى بالعين المجردة نجا بجلده بالحظ فقط مجرد الاشتباه يكفى" },
    { w: "OTALT", t: "غير مَحسوم", s: "ha något otalt med någon ( ha en ouppklarad konflikt med någon )", st: "له نزاع غير محسوم مع شخص ما" },
    { w: "TOTAL", t: "شامل", s: "en total förnyelse totalt sett", st: "تجديد شامل بصورة إجمالية" },
    { w: "LOTTA", t: "جُندية مُتَطَوِّعة", s: "Lotta utbildas för olika befattningar inom totalförsvaret , t ex stabstjänst och luftbevakning .", st: "تقوم هذه الهيئة بتدريب النساء على مختلف المهامّ ضمن نظام الدفاع الكُلّي , مثلاً للخدمة في الأركان والمراقبة الجوية" },
    { w: "TYCKER", t: "يَرى", s: "jag tycker du har fel tycka synd om någon", st: "في رأيي أنك على خطأ أشْفَقَ على شخص" },
    { w: "RYKTE", t: "سُمعة, صيت", s: "hon har ett gott rykte hon har rykte om sig att vara hederlig", st: "لها سمعة حسنة مشهورة بكونها شريفة" },
    { w: "TRYCK", t: "طباعة", s: "uppsatsen finns i tryck", st: "أُرسلت الأطروحة إلى الطباعة" },
    { w: "TYCKE", t: "مَوَدّة", s: "fatta tycke för någon ( el . något )", st: "أحَبَّ شخصاً ( أو شيئاً )" },
    { w: "KLICKAR", t: "تقبض", s: "pistolen klickade omdömet klickar", st: "تقبض المسدس تختلّ المقدرة على التقييم" },
    { w: "KLAR", t: "واضح", s: "så klart ( naturligtvis ) det är klart att man blir arg ( naturligtvis blir man arg ) ha klart för sig ( vara medveten om ) vara klar över ( något ) ( förstå ( något ) )", st: "طبعا من الطبيعي أن يغضب المرء أدرك شيئاً يفهم شيئاً" },
    { w: "LIKA", t: "مساوٍ", s: "han är lika gammal som jag du kan lika gärna gå hans chanser är lika med noll lika lön för lika arbete", st: "يُماثلني سنّاً من الأفضل أن تغادر لا فُرْصَة له الأجْر مُعادل للعمل" },
    { w: "KALK", t: "جير", s: "bränd kalk släckt kalk", st: "جير غير مطفأ جير مطفأ" },
    { w: "KARL", t: "رَجُل", s: "starka karlar min karl arbeta som en hel karl", st: "رِجال أقوياء رَجُلي , زَوْجي يعمل كرجل تماماً" },
    { w: "BAND", t: "شريط", s: "( nyheterna strömmade in ) på löpande band ( i en ständig ström )", st: "وردت الأنباء بشكل متواصل ( تيار مستمر )" },
    { w: "BAD", t: "استحمام", s: "sjön inbjöd till bad", st: "أغرته البحيرة بالاستحمام" },
    { w: "FINT", t: "مناورة", s: "hon lurade mig med en enkel fint", st: "خدعتني بمناورة بسيطة" },
    { w: "FIN", t: "جميل", s: "en fin bil en fin kostym", st: "سيارة جميلة بدلة أنيقة" },
    { w: "SÅR", t: "جُرح, قُرْحَة, خَدْش", s: "tiden läker alla sår", st: "تلتئم كل الجروح مع الزمن" },
    { w: "UNDER", t: "تحت", s: "( betala ) under bordet ( inofficiellt ) ( få situationen ) under kontroll ( få kontroll över situationen ) ( sjunga ) under ledning av ( någon ) ( sjunga med någon som dirigent )", st: "دفع بصورة غير رسمية سيطر على الوضع غَنّى تحت إشراف شخص ما ( بقيادة شخص ما )" },
    { w: "RUND", t: "مستدير", s: "stora runda barnaögon jorden är rund raka runda trästammar", st: "عيون أطفال مستديرة واسعة الأرض كروية جذوع أشجار مستديرة ومستقيمة" },
    { w: "UNDRE", t: "سُفليّ", s: "den undre världen ( de kriminella kretsarna )", st: "العالم السُفلي ( عالم المجرمين )" },
    { w: "STUND", t: "لحظة", s: "i sista stund jag kommer om en stund en stunds förströelse", st: "في اللحظة الأخيرة سآتي بعد لحظة لحظة تسلية" },
    { w: "SUND", t: "سليم", s: "en sund själ i en sund kropp sunt förnuft", st: "العقل السليم في الجسم السليم تفكير سليم" },
    { w: "DUST", t: "صراع", s: "utkämpa en hård dust", st: "خاض صراعـاً مريراً" },
    { w: "SKRAL", t: "سيّئ", s: "skrala kunskaper känna sig skral", st: "معرفة رديئة شَعَرَ بسوء صحته" },
    { w: "KRAS", t: "تحطّم", s: "gå i kras ( gå sönder )", st: "تحطّم" },
    { w: "SKAL", t: "قِشرة", s: "dra sig inom sitt skal ( vara otillgänglig )", st: "انطوى على نفسه" },
    { w: "KALOTT", t: "قلنسوة ضيقة", s: "bildligt något som liknar en kalott", st: "تقال مجازاً عن شيء يشابه القلنسوة" },
    { w: "STYRKA", t: "قُوّة", s: "hon visade prov på en enastående själslig styrka", st: "أظْهَرَتْ مِثالاً على قوة روحيّة لا تُضارع" },
    { w: "STARK", t: "قويّ", s: "starka armar stark regering stark kyla", st: "أذرع قوية حكومة قوية برد قارس" },
    { w: "STRYK", t: "عَلْقة", s: "Sverige fick stryk i landskampen mot Finland", st: "خسرت السويد في المباراة الوطنية أمام فنلندة" },
    { w: "RYKTAS", t: "يُشاع", s: "det ryktas att regeringen håller på att spricka", st: "يشاع أن الحكومة على وشك التَصَدُّع" },
    { w: "NACKDEL", t: "ضَرَر", s: "vara till nackdel ( för ) nackdelen med teven är att man blir passiv", st: "ليس من الصالح , من المضرّ من مَساوئ التلفزيون أنه يجعل الإنسان سلبيّاً" },
    { w: "ELAK", t: "شرّير", s: "hon var elak mot sina små syskon", st: "كانت شرّيرة تجاه أشقّائها الصغار" },
    { w: "ENDA", t: "وحيد", s: "jag läste den enda bok som fanns i väntrummet", st: "قرأت الكتاب الوحيد الموجود في قاعة الانتظار" },
    { w: "KLEN", t: "ضعيف", s: "ett klent intresse hon är ännu för klen för att kunna resa", st: "اهتمام خفيف لا زالت ضعيفة لكي تتمكن من السفر" },
    { w: "ADEL", t: "نبيل", s: "Adeln var ett av de fyra s k stånd ( adel , präster , borgare och bönder ) som den svenska riksdagen bestod av fram till 1866 .", st: "كان النبلاء من بين الطبقات الاجتماعية الأربع ( النبلاء , القساوسة , العامة والفلاحين ) التي كان البرلمان السويدي يتألف منها حتى عام 1866م" },
    { w: "DOFT", t: "أريج", s: "en doft av honung", st: "رائحة عسل" },
    { w: "FOT", t: "قَدَم", s: "på stående fot ( genast ) stå på god fot med ( någon ) ( ha ett gott förhållande till ( någon ) ) gå till fots ( promenera )", st: "حالاً كان على علاقة طيبة مع شخص ذهب مشياً على الأقدام" },
    { w: "HÖRN", t: "زاوية", s: "vara med på ett hörn ( få delta ( i något ) )", st: "سُمِح له المشاركة" },
    { w: "RÖN", t: "إكتشاف", s: "enligt senaste rön nya rön om sälarnas livsvillkor", st: "حسب آخر الاكتشافات اكتشافات جديدة عن ظروف حياة سبع البحر" },
    { w: "VART", t: "إلى أين", s: "vart ska du åka?", st: "إلى أين تسافر؟" },
    { w: "VAR", t: "أين", s: "var bor du? jag vet inte var han är", st: "أين تسكن؟ لا أعرف أين هو" },
    { w: "LOTT", t: "لَفّّة على الأطراف", s: "( ligga el . lägga el . gå ) om lott ( så att kanterna på två material delvis täcker varandra )", st: "لَفَّ بعضه فوق بعض" },
    { w: "OTAL", t: "لا يُحصى", s: "jag har varit i Malmö ett otal gånger", st: "زرت مالمو مرات عديدة" },
    { w: "SYNES", t: "يبدو", s: "problemet kan synas trivialt en viss förbättring synes dock sannolik", st: "يمكن أن تبدو المشكلة تافهة على أية حال يبدو حصول تَحَسُّن مُعَيّن" },
    { w: "NYSS", t: "منذ لحظات", s: "jag såg honom alldeles nyss", st: "رأيته منذ لحظات" },
    { w: "SYNE", t: "بصيرة, خَيال, تَخَيّل", s: "se i syne ( se något som inte existerar )", st: "يرى في الخيال" },
    { w: "VILAR", t: "يستريح", s: "nu vilar vi ett tag vila upp sig vila benen vila i frid!", st: "دعنا نستريح الآن قليلاً استراح , ارتاح أراح ساقيه رقد بسلام" },
    { w: "VILA", t: "استراحة", s: "han unnade sig inte ett ögonblicks vila", st: "لم يُعطِ لنفسه ولا دقيقة راحة" },
    { w: "ILAR", t: "يُؤلم, يَنْخر", s: "det ilar i tanden", st: "اشعر بنخر في سنّي" },
    { w: "VARFÖR", t: "لماذا", s: "varför gråter du? jag undrar varför hon skrattade varför det? varför inte?", st: "لماذا تبكي؟ أتَساءَل لماذا ضَحِكَت؟ لماذا؟ لماذا لا؟" },
    { w: "FÖRRA", t: "السابق", s: "den förre presidenten i förra veckan", st: "الرئيس السابق في الأسبوع الفائت" },
    { w: "FAVÖR", t: "صالح", s: "matchen slutade 3 - 1 i svensk favör", st: "انتهت المباراة 3 - 1 لصالح السويد" },
    { w: "FÖRVAR", t: "وضع اليد", s: "ta i förvar i säkert förvar", st: "وَضْع اليد للرعاية في حفظ آمن" },
    { w: "STYCKE", t: "قِطعة", s: "ett stycke kulturhistoria komma ett stycke på väg fem stycken äpplen", st: "قطعة من التاريخ الثقافيّ قَطَعَ جُزءاً من الطريق خمس تفاحات" },
    { w: "STYCK", t: "واحدة", s: "äpplena kostar två kronor styck", st: "سعر التفاحة الواحدة كرونتان" },
    { w: "TYCKS", t: "يَظهر", s: "han tycks ha glömt bort saken", st: "بَدا وكأنه نَسِيَ الأمر" },
    { w: "SKÖNHET", t: "جمال", s: "skulpturens skönhet en firad skönhet", st: "جَمال التمثال جَمال محبوب" },
    { w: "SKÖN", t: "رائع", s: "skön musik sköna kvinnor", st: "موسيقى رائعة نساء رائعات" },
    { w: "HÖNS", t: "دجاج", s: "springa som yra höns ( inte veta vad man vill , irra hit och dit )", st: "هامَ على وجهه" },
    { w: "HÖST", t: "خريف", s: "i höst till hösten hösten 1979", st: "في الخريف حتى الخريف خريف عام 1979" },
    { w: "STEN", t: "حجر", s: "kasta inte sten på småfåglarna!", st: "لا ترمِ العصافير بالحجارة!" },
    { w: "MATT", t: "ضعيف", s: "matt av feber filmen gör ett matt intryck", st: "واهن بفعل الحمى يعطي الفيلم انطباعاً باهتاً" },
    { w: "TAM", t: "أليف", s: "en tam fågel ett tamt anfall", st: "طير داجن هجمة ضعيفة , هجوم ضعيف" },
    { w: "DRAG", t: "خطّ", s: "i stora ( el . grova ) drag ( ungefär ) i korta drag ( kort uttryckt )", st: "بالتقريب باختصار" },
    { w: "ARG", t: "غاضب", s: "varför blev hon arg på dig? en arg tjur", st: "لماذا غضبت منك ثور غاضب" },
    { w: "VECK", t: "طيّة, ثَنْية, تغضُّن, تجعُّد", s: "lägga pannan i djupa veck", st: "تغَضّنت ثَنايا جبينه" },
    { w: "VEK", t: "ضعيف", s: "en vek och begåvad tonåring", st: "مُراهق مهذَّب وذكي" },
    { w: "TANT", t: "سيّدة", s: "en gammal tant tant Sigrid", st: "امرأة عجوز العمة سيغريد" },
    { w: "NYTTA", t: "فائدة", s: "dra nytta av jag har haft stor nytta av bilen vara till nytta för mänskligheten göra nytta förena nytta med nöje", st: "استغلّ لصالحه استفدت كثيراً من السيارة عاد بالنفع على البشرية فعل شيئاً مفيداً نَفْع واستمتاع في آن واحد" },
    { w: "ANSTÅR", t: "يُلائم, يُليق, يناسب", s: "som det anstår en ledare", st: "بشكل يليق بقائد" },
    { w: "SNART", t: "عمّا قريب", s: "hon kommer snart det visar sig snart vem som hade rätt det är snart 50 år sen", st: "ستأتي عما قريب سيتبين عما قريب من هو على حق عن قريب سيكون قد مضى خمسون عاماً" },
    { w: "TRANS", t: "نَشْوَة, غَشْية", s: "pojken föll i trans över den vackra motorcykeln", st: "وقع الولد في غَشْية عندما رأى الدرّاجة الناريّة الجميلة" },
    { w: "ANSTÅ", t: "يؤجل, يؤخر", s: "det får anstå tills vidare", st: "أجل حتى إشعار آخر" },
    { w: "MÄSTARE", t: "بطل", s: "okänd mästare från 1500 - talet", st: "بطل مجهول من القرن الرابع عشر" },
    { w: "MEST", t: "الأكْثَر", s: "jag tjänar mest pengar den mesta tiden ägnar jag åt läsning man häller bort det mesta av spadet", st: "أنا الأكثر كسباً للنقود أقضي معظم وقتي في المطالعة يُزيل المرء معظم المرق" },
    { w: "SAMT", t: "وأيضاً, وكذلك", s: "ta med vänner och bekanta samt matsäck", st: "اصطحب معك أصدقاءك ومعارفك وكذلك زوّادة طعام" },
    { w: "SMÄRTA", t: "آلام", s: "akut smärta psykisk smärta skrika av smärta", st: "ألم حادّ معاناة نفسانية صَرَخ من الألم" },
    { w: "TEMA", t: "مـوضـوع", s: "konferensens tema ett tema med variationer", st: "موضوع المؤتمر موضوع ذو أوجه عديدة" },
    { w: "LÄTT", t: "خَفيف", s: "lätt som en fjäder", st: "خفيف كالرّيشة" },
    { w: "TÄT", t: "كثيف", s: "en tät skog tät trafik tät dimma", st: "غابة كثيفة حركة سير مزدحمة ضباب كثيف" },
    { w: "FRAM", t: "إلى الأمام", s: "gräva fram stiga fram", st: "أخرج خطا إلى الأمام" },
    { w: "ARM", t: "ذراع", s: "på rak arm ( utan vidare , utan förberedelse ) sitta med armarna i kors ( inte företa sig något )", st: "مباشرة ( بدون لف ودوران ) جلس متكتفاً ( لايعمل أي شيء )" },
    { w: "HART", t: "تقريباً", s: "hart när ( nästan ) ( omöjligt )", st: "تقريبا , مستحيل" },
    { w: "ART", t: "نوع", s: "huset är unikt i sin art", st: "البيت فريد من نوعه" },
    { w: "FÖRR", t: "سابقاً", s: "förr eller senare ( någon gång ) förr i tiden ( eller världen ) ( tidigare i historien )", st: "عاجلاً أو آجلاً في الماضي , في العهود السابقة" },
    { w: "RÖRA", t: "فوضى", s: "en enda röra av hela och trasiga leksaker", st: "فوضى من الألعاب السليمة والتالفة" },
    { w: "SLUMP", t: "صُدفة", s: "inget får lämnas åt slumpen av en ren slump", st: "لا يجب ترك أي شيء للصدفة بمحض الصدفة" },
    { w: "PLUS", t: "زائد", s: "två plus två är fyra fyra man plus en chef", st: "اثنان واثنان يساوي أربعة أربعة رجال ورئيس" },
    { w: "PULS", t: "نَبْض", s: "ta pulsen hög puls", st: "جَسّ النبض نبض عال" },
    { w: "DENNA", t: "هذا, هذه", s: "denna dag detta hus dessa böcker", st: "هذا اليوم هذا البيت هذه الكتب" },
    { w: "NEDAN", t: "إلى الأسفل", s: "bilden nedan till vänster", st: "الصورة السُفليّة اليُسرى" },
    { w: "ANDE", t: "روح", s: "den helige Ande ond ande", st: "الروح القدس روح شرير" },
    { w: "INSLAG", t: "عُنصر", s: "det praktiska arbetet är ett viktigt inslag i studierna", st: "يشكل التمرين العملي عنصراً مهماً في الدراسات" },
    { w: "SALIG", t: "سعيد", s: "en salig hädanfärd salig av lycka", st: "وفاة مبارَكة طار من الفرح" },
    { w: "GLANS", t: "بَريق", s: "klara något med glans ( klara något väldigt bra )", st: "نجح بامتياز" },
    { w: "SIGNAL", t: "إشارة", s: "ge signal nya signaler från regeringen", st: "اعطى اشارة إشارات جديدة من الحكومة" },
    { w: "SKRATT", t: "ضَحِك", s: "ett rungande skratt tjuta av skratt", st: "ضحكة عالية انفجر من الضحك" },
    { w: "START", t: "بداية", s: "hon fick en god start start och mål", st: "حَصَلَتْ على بداية جيدة نقطة الانطلاق والهدف" },
    { w: "AVVISAR", t: "يطرد, يرفض, لا يوافق", s: "flyktingarna avvisades vid gränsen SAF avvisar kraven på löneökningar ställa sig avvisande till", st: "طُرد اللاجئون عند الحدود رفض اتحاد أرباب العمل السويدي المطالبات المتعلقة بزيادة المرتبات اتخذ موقفاً رافضاً" },
    { w: "VARS", t: "مَن", s: "en person vars omdöme jag litar på", st: "الشخص الذي أثق بتقيمه" },
    { w: "SVAR", t: "إجابة", s: "ge svar på en fråga hon fick bara undanflykter till svar svaret blev nej", st: "أجاب على سؤال لم تُجِبْ عليها سوى بالأعذار والحُجج كان الجواب بالنَّفي" },
    { w: "VARA", t: "اعتنى", s: "ta vara på ( ta hand om , skydda ) ta till vara ( utnyttja , inte kasta bort )", st: "اعتنى بشيء استفاد من , انتفع بـ" },
    { w: "VARV", t: "دورة", s: "springa ett varv motorn kommer upp i varv toppvarv", st: "ركض لفَّةً ( حول المضمار ) تزايد عدد دورات المحرك , بدأ المحرك يتسارع عدد الدورات الأقصى , أعلى حد الدوران" },
    { w: "DOCK", t: "على أي حال", s: "tåget går dock inte på torsdagar", st: "لا يسافر القطار على أي حال أيام الخميس" },
    { w: "OCK", t: "أيضاً", s: "det finns en risk , om ock minimal", st: "هناك خَطَر حتى ولو أنّه قليل جداً" },
    { w: "KAPP", t: "لحاق", s: "( springa ) i kapp ( tävla om vem som springer fortast )", st: "لحق تسابق في العدو" },
    { w: "KAP", t: "غنيمة", s: "göra ett gott kap", st: "غنم شيئاً جيداً" },
    { w: "REDO", t: "مُسْتَعدّ", s: "vara redo att ge upp", st: "مستعد للاستسلام" },
    { w: "ORD", t: "كلمة", s: "med andra ord ( annorlunda uttryckt ) ha ord om sig ( vara känd för ) att vara snål ord för ord ( ordagrant ) ta någon på orden ( tro på vad någon säger ) ha sista ordet ( vara den som bestämmer ) begära el . ha ordet ( vilja hålla el . hålla ett anförande ) ordet är fritt ( vem som helst får yttra sig ) ta till orda ( börja tala ) hålla sitt ord ( hålla vad man lovat ) - innan man vet ordet av ( mycket snabbt )", st: "بمعنى آخر معروف بالبخل بدقة كلامية آمن بما قيل له له القرار الأخير طَلَب الكلمة يُمكن لأي شخص أن يُعرب عن رأيه بَدأ الحديث وَفى بوعده - بسرعة كبيرة" },
    { w: "OÄVEN", t: "سيّئ", s: "inte oäven ( inte så dålig , rätt bra )", st: "ليس بسيّئ" },
    { w: "ÄVEN", t: "حتى", s: "även i fortsättningen jag tänker gå ut även om det regnar", st: "حتى في المستقبل أنوي الخروج حتى لو كان الجو ماطراً" },
    { w: "NÄVE", t: "يَد", s: "slå näven i bordet en rejäl näve persilja", st: "خبط يده على الطاولة كمشة من البقدونس" },
    { w: "OLUST", t: "اشمئزاز", s: "känna olust inför något", st: "شعر بالاشمئزاز تجاه شيء ما" },
    { w: "SLUT", t: "مُنْتَهٍ", s: "skolan är slut för dagen nu får det vara slut med fjäskandet smöret är slut jag är alldeles slut efter cykelturen", st: "انتهت الدراسة اليوم دعنا نوقِف التَمَلُّق عند هذا الحدّ نَفَذَت الزبدة إنني منهوك القوى تماماً بعد جولة الدراجة" },
    { w: "LUST", t: "رغبة", s: "har du lust att följa med och bada? jag har inte lust att städa", st: "هل ترغب في أن تذهب للاستحمام معي؟ ليس لدي رغبة في أن أنَظِّف" },
    { w: "AVSER", t: "يهدف", s: "kommunen avser att ändra planerna bestämmelsen avser endast motorvägar ölet är avsett för export fastigheten är avsedd att rivas TV - programmet hade avsedd effekt ( el . verkan )", st: "تنوي البلدية تغيير المخططات تتعلق التشريعات بالأوتوسترادات فقط البيرة مخصصة للتصدير هناك مخططات لهدم العقار حقّق برنامج التلفزيون على الأثر المطلوب" },
    { w: "VARSE", t: "مُتَعَرِّف", s: "bli varse ( bli medveten om , få syn på , märka )", st: "اكتشف شيئاً" },
    { w: "REVA", t: "شَقّ", s: "en reva i byxorna", st: "شق في البنطلون" },
    { w: "VÄSTRA", t: "الغربي", s: "den västra sidan av sjön", st: "الجهة الغربية من البحيرة" },
    { w: "SVART", t: "أسود", s: "stå på svarta listan ( vara icke önskvärd ) svarta tavlan ( stor skrivtavla i skolan ) lämna svart på vitt ( intyga skriftligt )", st: "غير مرغوب به , على اللائحة السوداء السبورة شَهِدَ خطيّاً" },
    { w: "TVÄRS", t: "عرضيّاً", s: "härs och tvärs ( hit och dit )", st: "من زاوية إلى أخرى" },
    { w: "VÄRST", t: "بصورة خاصّة", s: "inte så värst ofta", st: "ليس كثيراً بصورة خاصة" },
    { w: "REDSKAP", t: "أداة", s: "de nödvändiga redskapen i ett hushåll konstnärerna får inte bli lydiga redskap för diktaturen", st: "الأدوات اللازمة في المنزل لا يجب أن يصبح الفنّانون أداة في يد الديكتاتور" },
    { w: "REDA", t: "نقديّ", s: "i reda pengar ( med kontanter )", st: "نقداً" },
    { w: "SKARP", t: "حادّ", s: "en skarp kniv skarp kritik i skarpa ordalag", st: "سكين حاد نقد لاذع بكلمات شديدة النَّبرة" },
    { w: "REPA", t: "خَدْش", s: "en repa i lacken", st: "خَدْش في الدهان" },
    { w: "SPADER", t: "البَسْتوني", s: "få spader ( bli vansinnig )", st: "أصيب بالجنون" },
    { w: "LÄNK", t: "وَصْلَة", s: "jag hittade en länk till deras webbplats", st: "عَثَرْت على وَصْلَة إلى مَوْقعهم على شبكة الإنترنت" },
    { w: "LÄN", t: "مُحافَظة", s: "Sverige är indelat i 23 län .", st: "تنقسم السويد إلى 21 محافظة" },
    { w: "SÄTT", t: "طريقة", s: "på så sätt ( jaså ) på sätt och vis ( i viss mening )", st: "يا للعجب نوعا ما" },
    { w: "ATT", t: "ليد", s: "att .: Katarina Wall", st: "ليد: كاتارينا فال" },
    { w: "SKAFT", t: "وَعي", s: "ha huvudet på skaft ( vara klyftig )", st: "كان واعياً" },
    { w: "FAST", t: "صلب, قاسٍ", s: "fast konsistens en fast grund att bygga på", st: "قوام صلب أساس متين للبناء عليه" },
    { w: "VIRKE", t: "خَشَب", s: "köpa virke hon är av segt virke", st: "اشترى خشباً إنها قاسية" },
    { w: "RIKE", t: "دولة", s: "fara land och rike runt", st: "تَجَوَّل في أنحاء البلاد" },
    { w: "VERK", t: "عَمَل", s: "gå till verket ett ögonblicks verk", st: "شَمَّر عن ساعده فِعْل لَحظة" },
    { w: "SKALP", t: "فروة الرأس", s: "vara ute efter någons skalp ( vilja besegra någon )", st: "أراد الانتصار عليه" },
    { w: "PLASK", t: "طَرْطَشة", s: "Jerker föll i vattnet med ett plask", st: "سقط جركر في الماء بحيث سُمِع صوت طرطشة" },
    { w: "GALANT", t: "أنيق", s: "det klarade du galant!", st: "لقد نَجَحت في ذلك بشكل ممتاز!" },
    { w: "ANLAG", t: "موهبة", s: "konstnärliga anlag anlag för fetma", st: "موهبة فنية لديه ميل إلى السمنة" },
    { w: "ANTAL", t: "عدد", s: "ett stort antal människor antalet bostäder minskar", st: "عدد كبير من الأشخاص يقل عدد المساكن" },
    { w: "TALAN", t: "مُطالَبة", s: "föra någons talan ( representera någon ) hon har ingen talan ( ingenting att säga till om )", st: "مَثَّل شخصاً ليس لها أن تتدخل بالموضوع" },
    { w: "INTRÄDE", t: "دخول", s: "söka inträde ( i en förening ) höstens inträde gratis inträde", st: "طلب الدخول في ( عضوية اتحاد ) دخول الخريف دخول مجاني" },
    { w: "INRE", t: "داخلي", s: "de inre delarna av landet", st: "الأجزاء الداخلية من البلاد" },
    { w: "TÄRD", t: "منهوك", s: "han var tärd av sjukdom", st: "أنْهَكَه المرض" },
    { w: "DÄRI", t: "في", s: "däri har du rätt", st: "لك حق في ذلك" },
    { w: "INTE", t: "لا", s: "inte alls inte bara . . . utan också inte ens inte heller", st: "لا , أبداً ليس هذا فقط . . .بل ذلك أيضاً حتى ولا ولا" },
    { w: "LÄXA", t: "واجب مدرسيّ", s: "ge någon en läxa ( ge någon något att tänka på )", st: "يُلَقِّنه درساً" },
    { w: "LAX", t: "سَلَمون - سلمون", s: "en glad lax ( en gladlynt person )", st: "إنسان سعيد" },
    { w: "SMAK", t: "مَذاق", s: "lukt och smak en smak av kanel", st: "الرائحة والمَذاق طعم القرفة" },
    { w: "AMS", t: "مجلس سوق العمل", s: "Central statlig myndighet som leder arbetsmarknadspolitiken för hela Sverige . AMS är remissinstans för ärenden om t ex arbetstillstånd .", st: "سلطة حكومية مركزية تشرف على سياسة سوق العمل في السويد بكاملها وهي السلطة التي تحوّل إليها القضايا المتعلقة مثلاً بتصاريح العمل لإبداء الرأي فيها" },
    { w: "BLAD", t: "ورقة النبات", s: "bland blommor och blad", st: "بين الأزهار والورق" },
    { w: "FÖRST", t: "أوّل", s: "komma först i en tävling", st: "احتل المركز الأول في مسابقة" },
    { w: "RÖST", t: "صوت", s: "göra sin röst hörd ( uttrycka sina åsikter )", st: "عَبّر عن آرائه" },
    { w: "STÖR", t: "يُزْعِج", s: "stör mig inte! störande inslag", st: "لا تزعجني! محتوى مزعج" },
    { w: "ÖVERS", t: "زيادة", s: "inte ha något till övers ( för ) ( inte gilla )", st: "لا يحب شخصاً" },
    { w: "ÖVRE", t: "علوي", s: "i övre delen av backen", st: "في الجزء العلوي من الهضبة" },
    { w: "ÖVER", t: "فوق", s: "hoppa över en häck flytta över till Sverige", st: "قفز فوق حاجز انتقل إلى السويد" },
    { w: "LÄNGE", t: "وقت طويل", s: "än så länge ( fortfarande ) hej så länge! ( vi ses om ett tag! ) hon bor inte här längre ( mer , i fortsättningen ) i det längsta ( under så lång tid som möjligt )", st: "إلى الآن إلى اللقاء! لم تَعُد تَسْكُن هنا أطول فترة مُمْكِنة" },
    { w: "LÄGE", t: "وَضْع", s: "det politiska läget i dagens läge utgångsläge läges|rapporten", st: "الوضع السياسي في الوضع الراهن نقطة الإنطلاق تقرير عن الوضع" },
    { w: "ÄNGEL", t: "مَلَاك", s: "du är en ängel!", st: "أنت ملاك!" },
    { w: "GRÄNSLE", t: "مُفرشِخ", s: "sitta gränsle ( sitta med benen på var sida om något )", st: "جلس فارجاً رجليه" },
    { w: "LÄGER", t: "مُعسكر", s: "dela sig i två läger", st: "انقسما إلى معسكرين" },
    { w: "REGN", t: "مَطَر", s: "åska och regn ett regn av pilar", st: "بَرْق ومَطَر وابل من السّهام" },
    { w: "RÄLS", t: "قضيب ( من قضبان السكة الحديدية )", s: "tåget går på räls", st: "يسير القطار على السكة الحديدية" },
    { w: "SLÄNG", t: "حركة مُفاجئة", s: "få en släng av influensa ( bli lindrigt sjuk i influensa )", st: "أصيب بأثر من الأنفلونزا" },
    { w: "NERE", t: "مُكْتَئِب", s: "hon var väldigt nere efter mammans död", st: "كان مُكتئباً بصورة كبيرة بعد وفاة الوالدة" },
    { w: "REN", t: "نظيف", s: "en ren blus rent vatten", st: "بلوزة نظيفة ماء نقي" },
    { w: "GODO", t: "حُبّي", s: "hålla till godo ( låta nöja sig ) med något ha till godo ( ha kvar , ha att fordra ) göra upp i godo ( på fredlig väg )", st: "اقتنع ظل قائماً أو ساري المفعول سوّى الخلافات سلمياً" },
    { w: "GOD", t: "جيد", s: "god morgon! i god tid ( före utsatt klockslag ) god vilja ( välvilja ) på goda grunder ( säkert ) vara i god tro ( inte veta bättre ) så gott som ( nästan ) gott om ( rikligt med )", st: "صباح الخير! في وقت مبكِّر رغبة طيّبة على أسس متينة بِنَوايا طيبة تقريباً كثير من" },
    { w: "STOR", t: "كبير", s: "ett stort hus besvikelsen var stor när jag blir stor ska jag bli flygare till stor del i stor skala i stor utsträckning", st: "بناية ضخمة خيبة الأمل كانت كبيرة عندما أكبر سأصبح طياراً إلى حدّ كبير على نطاق واسع إلى حدّ بعيد" },
    { w: "ORT", t: "منطقة", s: "från högsta ort ( från högsta myndighet ) på ort och ställe ( på själva platsen )", st: "من جهات عُليا في نفس المكان" },
    { w: "OVISS", t: "غير أكيد", s: "en oviss framtid det är ovisst om han överlever", st: "مستقبل غير مضمون غير أكيد أنه سيعيش" },
    { w: "VISS", t: "مُعَيَّن", s: "i viss mån ( till en del ) i vissa fall ( ibland ) på vissa håll ( på en del platser , bland somliga )", st: "إلى حد ما في بعض الأحيان , أحياناً , في حالات معينة في أماكن , في بعض الجهات" },
    { w: "VISSO", t: "تأكيد", s: "till yttermera visso ( som ännu ett bevis )", st: "كَإثْبات آخر" },
    { w: "PLATS", t: "مكان", s: "sätta någon på plats ( tillrättavisa någon som uppträder med för stora pretentioner )", st: "أوْقَفَه عند حدّه" },
    { w: "SALT", t: "مالح", s: "salt sill salt lakrits", st: "رنكة مُمَلَّحة سوس مالح" },
    { w: "LAST", t: "حِمْل", s: "ligga ( någon ) till last ( vara en tung börda ( för någon ) ) Lägga till last Det ni lägger mig till last", st: "صار عبئاً على غيره يحمل على عاتقه ما حمّلتني إياه على عاتقي" },
    { w: "STANNAR", t: "يَتَوَقَّف", s: "klockan har stannat tåget stannar i Hallsberg", st: "توقفت الساعة يتوقف القطار في هالسباري" },
    { w: "SANN", t: "حقيقيّ, صحيح, حق", s: "är det sant att du ska flytta? en sann bild av verkligheten", st: "هل من الصحيح انك ستنتقل؟ صورة حقيقية للواقع" },
    { w: "SNAR", t: "قريب", s: "inom en snar framtid", st: "في المستقبل القريب" },
    { w: "ANNARS", t: "وإلا", s: "skynda dig , annars missar vi tåget!", st: "أسرع وإلا فاتنا القطار" },
    { w: "SANNA", t: "سترى!", s: "sanna mina ord! ( det kommer att bli som jag har sagt )", st: "سترى حقّاً صِدْق أقوالي!" },
    { w: "FLIK", t: "حاشية, طيّة, طرف", s: "en flik av klänningen fastnade på en spik", st: "عَلِقت حاشية الثوب بمسمار" },
    { w: "LIK", t: "شَبيه", s: "du är lik din far hemma är allt sig likt", st: "أنت تشبه والدك ما زال بيتنا كما عهدناه" },
    { w: "LEK", t: "لَعِبٌ, لَهو", s: "på lek ( utan allvarliga avsikter ) dra sig ur leken ( sluta att delta i något ( som börjar bli obehagligt ) )", st: "على سبيل المزاح انسَحَب من اللعبة" },
    { w: "KAM", t: "مشط", s: "skära alla över en kam ( bedöma alla lika )", st: "يقيّم الجميع سواسيةً" },
    { w: "AVGÅR", t: "يستقيل", s: "regeringen tvingades avgå han avgår med pension nästa år", st: "اضطرت الحكومة إلى الاستقالة سيستقيل عند إحالته على التقاعد في العام القادم" },
    { w: "GÅVA", t: "هدية", s: "han har fått talets gåva", st: "حصل على موهبة الحديث" },
    { w: "RÅGA", t: "زيادة عن الحد", s: "till råga på allt ( förutom allt annat ( besvärligt ) )", st: "بالإضافة إلى كل ما حصل" },
    { w: "KORTA", t: "فشل", s: "komma till korta ( misslyckas )", st: "فشل" },
    { w: "KORT", t: "قصير", s: "kort sagt ( kortfattat , i korthet ) kort och gott ( uttryckt i få ord ) inom kort ( snart )", st: "باختصار خلاصة القول بالقريب العاجل" },
    { w: "TORK", t: "تجفيف", s: "hänga på tork ( hänga för att torka )", st: "عُلِّقَ ليجفّ" },
    { w: "SAMLING", t: "تَجَمُّع, ائتلاف", s: "samling kl 15 samling kring regeringens politik", st: "التجمع الساعة الثالثة بعد الظهر ائتلاف حول سياسة الحكومة" },
    { w: "MANLIG", t: "مذكر", s: "manlig och kvinnlig personal", st: "مستخدمون من الذكور والإناث" },
    { w: "SMAL", t: "ضيّق", s: "en smal gata vinna med smal marginal", st: "شارع ضيق فازَ بفارق ضئيل" },
    { w: "LAGS", t: "إطاعَة", s: "vara el . göra någon till lags ( vara el . göra så att någon blir nöjd )", st: "ينفذ رَغبة شخص ليحصل على رضاه" },
    { w: "LISA", t: "تَخفيف", s: "musiken är en lisa för själen", st: "الموسيقى راحة للنفس" },
];

const WC_ROOT_WORDS = WC_DICTIONARY.filter(item => item.w.length >= 5).map(item => item.w);

console.log(`Word Connect Data Loaded: ${Object.keys(WC_PREDEFINED_LEVELS).length} levels, ${WC_DICTIONARY.length} dictionary words.`);
