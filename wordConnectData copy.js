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

const WC_PREDEFINED_LEVELS = {
    // ===========================================
    // CHAPTER 1: Mat & Dryck (Food & Drink) 🍎
    // ===========================================
    "1-1": { letters: ["M", "A", "T"], words: ["MAT", "TA"], validWords: ["MAT", "TA"] },
    "1-2": { letters: ["T", "E", "N"], words: ["TEN", "EN"], validWords: ["TEN", "EN"] },
    "1-3": { letters: ["O", "S", "T"], words: ["OST", "OS"], validWords: ["OST", "OS"] },
    "1-4": { letters: ["B", "Ä", "R"], words: ["BÄR", "ÄR"], validWords: ["BÄR", "ÄR"] },
    "1-5": { letters: ["K", "O", "R", "V"], words: ["KORV", "RO", "KO"], validWords: ["KORV", "RO", "KO"] },
    "1-6": { letters: ["F", "I", "S", "K"], words: ["FISK", "IS"], validWords: ["FISK", "IS"] },
    "1-7": { letters: ["K", "Ö", "T", "T"], words: ["KÖTT", "ÖT"], validWords: ["KÖTT", "ÖT"] },
    "1-8": { letters: ["B", "R", "Ö", "D"], words: ["BRÖD", "DÖ"], validWords: ["BRÖD", "DÖ"] },
    "1-9": { letters: ["K", "A", "K", "A"], words: ["KAKA", "AKA"], validWords: ["KAKA", "AKA"] },
    "1-10": { letters: ["S", "O", "P", "P", "A"], words: ["SOPPA", "PASS", "OS"], validWords: ["SOPPA", "PASS", "OS"] },

    // ===========================================
    // CHAPTER 2: Naturen (Nature) 🌲
    // ===========================================
    "2-1": { letters: ["S", "O", "L"], words: ["SOL", "OS"], validWords: ["SOL", "OS"] },
    "2-2": { letters: ["S", "N", "Ö"], words: ["SNÖ", "ÖN"], validWords: ["SNÖ", "ÖN"] },
    "2-3": { letters: ["V", "I", "S"], words: ["VIS", "IS", "SI"], validWords: ["VIS", "IS", "SI"] },
    "2-4": { letters: ["E", "L", "D"], words: ["ELD", "LE", "DEL"], validWords: ["ELD", "LE", "DEL"] },
    "2-5": { letters: ["T", "R", "Ä", "D"], words: ["TRÄD", "DÄR", "ÄT"], validWords: ["TRÄD", "DÄR", "ÄT"] },
    "2-6": { letters: ["S", "T", "E", "N"], words: ["STEN", "SEN", "TEN", "EN"], validWords: ["STEN", "SEN", "TEN", "EN"] },
    "2-7": { letters: ["G", "R", "Ä", "S"], words: ["GRÄS", "SÄR"], validWords: ["GRÄS", "SÄR"] },
    "2-8": { letters: ["R", "E", "G", "N"], words: ["REGN", "NER", "GER", "EN"], validWords: ["REGN", "NER", "GER", "EN"] },
    "2-9": { letters: ["S", "K", "O", "G"], words: ["SKOG", "KO", "OS"], validWords: ["SKOG", "KO", "OS"] },
    "2-10": { letters: ["B", "L", "O", "M", "M", "A"], words: ["BLOMMA", "LAMM", "MAL", "OM"], validWords: ["BLOMMA", "LAMM", "MAL", "OM"] },

    // ===========================================
    // CHAPTER 3: Resor (Travel) ✈️
    // ===========================================
    "3-1": { letters: ["T", "Å", "G"], words: ["TÅG", "GÅ", "TÅ"], validWords: ["TÅG", "GÅ", "TÅ"] },
    "3-2": { letters: ["B", "I", "L"], words: ["BIL", "IL", "BLI"], validWords: ["BIL", "IL", "BLI"] },
    "3-3": { letters: ["B", "Å", "T"], words: ["BÅT", "TÅ"], validWords: ["BÅT", "TÅ"] },
    "3-4": { letters: ["B", "U", "S", "S"], words: ["BUSS", "US"], validWords: ["BUSS", "US"] },
    "3-5": { letters: ["R", "E", "S", "A"], words: ["RESA", "SER", "REA", "SE"], validWords: ["RESA", "SER", "REA", "SE"] },
    "3-6": { letters: ["S", "T", "A", "D"], words: ["STAD", "DAS", "TA"], validWords: ["STAD", "DAS", "TA"] },
    "3-7": { letters: ["L", "A", "N", "D"], words: ["LAND", "DAL", "DAN", "AND"], validWords: ["LAND", "DAL", "DAN", "AND"] },
    "3-8": { letters: ["K", "A", "R", "T", "A"], words: ["KARTA", "RAK", "ART", "TAR", "TA"], validWords: ["KARTA", "RAK", "ART", "TAR", "TA"] },
    "3-9": { letters: ["P", "A", "S", "S"], words: ["PASS", "AS"], validWords: ["PASS", "AS"] },
    "3-10": { letters: ["F", "L", "Y", "G"], words: ["FLYG", "FLY", "LYG"], validWords: ["FLYG", "FLY", "LYG"] },

    // ===========================================
    // CHAPTER 4: Vardag (Daily Life) 🏠
    // ===========================================
    "4-1": { letters: ["H", "E", "M"], words: ["HEM", "ME"], validWords: ["HEM", "ME"] },
    "4-2": { letters: ["R", "U", "M"], words: ["RUM", "UR"], validWords: ["RUM", "UR"] },
    "4-3": { letters: ["H", "U", "S"], words: ["HUS", "US"], validWords: ["HUS", "US"] },
    "4-4": { letters: ["B", "O", "K"], words: ["BOK", "KO", "BO", "OK"], validWords: ["BOK", "KO", "BO", "OK"] },
    "4-5": { letters: ["S", "Ä", "N", "G"], words: ["SÄNG", "ÄN"], validWords: ["SÄNG", "ÄN"] },
    "4-6": { letters: ["D", "Ö", "R", "R"], words: ["DÖRR", "RÖR", "DÖ"], validWords: ["DÖRR", "RÖR", "DÖ"] },
    "4-7": { letters: ["J", "O", "B", "B"], words: ["JOBB", "BO"], validWords: ["JOBB", "BO"] },
    "4-8": { letters: ["S", "K", "O", "L", "A"], words: ["SKOLA", "SKAL", "SOL", "KO", "SAL", "SKO"], validWords: ["SKOLA", "SKAL", "SOL", "KO", "SAL", "SKO"] },
    "4-9": { letters: ["L", "A", "M", "P", "A"], words: ["LAMPA", "PALM", "MAL", "AL"], validWords: ["LAMPA", "PALM", "MAL", "AL"] },
    "4-10": { letters: ["N", "Y", "C", "K", "E", "L"], words: ["NYCKEL", "KYL", "LEK", "EL", "EN"], validWords: ["NYCKEL", "KYL", "LEK", "EL", "EN"] },

    // ===========================================
    // CHAPTER 5: Mat & Dryck (Advanced) 🍎
    // ===========================================
    "5-1": { letters: ["K", "A", "F", "F", "E"], words: ["KAFFE", "FE"], validWords: ["KAFFE", "FE"] },
    "5-2": { letters: ["M", "J", "Ö", "L", "K"], words: ["MJÖLK", "MÖ", "ÖL", "KÖL"], validWords: ["MJÖLK", "MÖ", "ÖL", "KÖL"] },
    "5-3": { letters: ["S", "O", "C", "K", "E", "R"], words: ["SOCKER", "ROS", "KO", "SE", "OS"], validWords: ["SOCKER", "ROS", "KO", "SE", "OS"] },
    "5-4": { letters: ["P", "E", "P", "P", "A", "R"], words: ["PEPPAR", "PAR", "RAP"], validWords: ["PEPPAR", "PAR", "RAP"] },
    "5-5": { letters: ["F", "R", "U", "K", "O", "S", "T"], words: ["FRUKOST", "OST", "KOST", "ROST", "KORT", "ROT", "KO"], validWords: ["FRUKOST", "OST", "KOST", "ROST", "KORT", "ROT", "KO"] },
    "5-6": { letters: ["M", "I", "D", "D", "A", "G"], words: ["MIDDAG", "DAG", "IDAG", "MIG", "DIG"], validWords: ["MIDDAG", "DAG", "IDAG", "MIG", "DIG"] },
    "5-7": { letters: ["V", "A", "T", "T", "E", "N"], words: ["VATTEN", "VATT", "TEN", "ATT", "VET"], validWords: ["VATTEN", "VATT", "TEN", "ATT", "VET"] },
    "5-8": { letters: ["S", "A", "L", "T", "E", "T"], words: ["SALTET", "SALT", "TAL", "AL", "TA"], validWords: ["SALTET", "SALT", "TAL", "AL", "TA"] },
    "5-9": { letters: ["L", "Ö", "K", "A", "R"], words: ["LÖKAR", "LÖK", "KÄR", "LÄR"], validWords: ["LÖKAR", "LÖK", "KÄR", "LÄR"] },
    "5-10": { letters: ["G", "R", "Ö", "N", "S", "A", "K"], words: ["GRÖNSAK", "GRÖN", "SAK", "KAN", "SKA", "EN"], validWords: ["GRÖNSAK", "GRÖN", "SAK", "KAN", "SKA", "EN"] },

    // ===========================================
    // CHAPTER 6: Naturen (Advanced) 🌲
    // ===========================================
    "6-1": { letters: ["S", "O", "M", "M", "A", "R"], words: ["SOMMAR", "SOM", "MOR", "ROM", "ROS"], validWords: ["SOMMAR", "SOM", "MOR", "ROM", "ROS"] },
    "6-2": { letters: ["V", "I", "N", "T", "E", "R"], words: ["VINTER", "VIN", "REN", "TRE", "NI"], validWords: ["VINTER", "VIN", "REN", "TRE", "NI"] },
    "6-3": { letters: ["H", "Ö", "S", "T", "E", "N"], words: ["HÖSTEN", "HÖST", "SEN", "TEN", "ÖN"], validWords: ["HÖSTEN", "HÖST", "SEN", "TEN", "ÖN"] },
    "6-4": { letters: ["V", "Å", "R", "E", "N"], words: ["VÅREN", "VÅR", "REN", "EN", "ÅR"], validWords: ["VÅREN", "VÅR", "REN", "EN", "ÅR"] },
    "6-5": { letters: ["H", "I", "M", "M", "E", "L"], words: ["HIMMEL", "HEM", "MIL", "HEL", "LE"], validWords: ["HIMMEL", "HEM", "MIL", "HEL", "LE"] },
    "6-6": { letters: ["S", "T", "J", "Ä", "R", "N", "A"], words: ["STJÄRNA", "ÄR", "TÄR", "NÄR"], validWords: ["STJÄRNA", "ÄR", "TÄR", "NÄR"] },
    "6-7": { letters: ["B", "E", "R", "G", "E", "T"], words: ["BERGET", "BERG", "GER", "BET", "TE"], validWords: ["BERGET", "BERG", "GER", "BET", "TE"] },
    "6-8": { letters: ["F", "L", "O", "D", "E", "N"], words: ["FLODEN", "FLOD", "DEN", "EN", "DEL"], validWords: ["FLODEN", "FLOD", "DEN", "EN", "DEL"] },
    "6-9": { letters: ["D", "J", "U", "R", "E", "N"], words: ["DJUREN", "DJUR", "REN", "UR", "EN"], validWords: ["DJUREN", "DJUR", "REN", "UR", "EN"] },
    "6-10": { letters: ["N", "A", "T", "U", "R"], words: ["NATUR", "TUR", "TUN", "UR", "TA"], validWords: ["NATUR", "TUR", "TUN", "UR", "TA"] },

    // ===========================================
    // CHAPTER 7: Resor (Advanced) ✈️
    // ===========================================
    "7-1": { letters: ["H", "O", "T", "E", "L", "L"], words: ["HOTELL", "HOT", "HEL", "EL"], validWords: ["HOTELL", "HOT", "HEL", "EL"] },
    "7-2": { letters: ["V", "Ä", "S", "K", "A"], words: ["VÄSKA", "VÄK", "SAK", "SKA", "AS"], validWords: ["VÄSKA", "VÄK", "SAK", "SKA", "AS"] },
    "7-3": { letters: ["B", "I", "L", "J", "E", "T", "T"], words: ["BILJETT", "BIL", "LE", "ETT", "TE"], validWords: ["BILJETT", "BIL", "LE", "ETT", "TE"] },
    "7-4": { letters: ["T", "U", "R", "I", "S", "T"], words: ["TURIST", "TUR", "RIS", "IS", "UT"], validWords: ["TURIST", "TUR", "RIS", "IS", "UT"] },
    "7-5": { letters: ["S", "E", "M", "E", "S", "T", "E", "R"], words: ["SEMESTER", "MEST", "MER", "SER", "TRE", "ER", "SE"], validWords: ["SEMESTER", "MEST", "MER", "SER", "TRE", "ER", "SE"] },
    "7-6": { letters: ["S", "T", "R", "A", "N", "D"], words: ["STRAND", "RAND", "AND", "DAN", "RAD"], validWords: ["STRAND", "RAND", "AND", "DAN", "RAD"] },
    "7-7": { letters: ["U", "T", "L", "A", "N", "D"], words: ["UTLAND", "LAND", "TUL", "DAL", "AND"], validWords: ["UTLAND", "LAND", "TUL", "DAL", "AND"] },
    "7-8": { letters: ["F", "L", "Y", "G", "P", "L", "A", "N"], words: ["FLYGPLAN", "FLYG", "PLAN", "LAN", "AL"], validWords: ["FLYGPLAN", "FLYG", "PLAN", "LAN", "AL"] },
    "7-9": { letters: ["K", "A", "M", "E", "R", "A"], words: ["KAMERA", "MER", "RAM", "ARA", "KAR"], validWords: ["KAMERA", "MER", "RAM", "ARA", "KAR"] },
    "7-10": { letters: ["Ä", "V", "E", "N", "T", "Y", "R"], words: ["ÄVENTYR", "TYR", "VEN", "YR", "EN"], validWords: ["ÄVENTYR", "TYR", "VEN", "YR", "EN"] },

    // ===========================================
    // CHAPTER 8: Vardag (Advanced) 🏠
    // ===========================================
    "8-1": { letters: ["T", "E", "L", "E", "F", "O", "N"], words: ["TELEFON", "TELE", "FEL", "TON", "EN"], validWords: ["TELEFON", "TELE", "FEL", "TON", "EN"] },
    "8-2": { letters: ["D", "A", "T", "O", "R", "N"], words: ["DATORN", "DATOR", "ROT", "TON", "RAD"], validWords: ["DATORN", "DATOR", "ROT", "TON", "RAD"] },
    "8-3": { letters: ["F", "Ö", "N", "S", "T", "E", "R"], words: ["FÖNSTER", "STEN", "FEST", "REN", "SER"], validWords: ["FÖNSTER", "STEN", "FEST", "REN", "SER"] },
    "8-4": { letters: ["S", "P", "E", "G", "E", "L"], words: ["SPEGEL", "SPEL", "SEG", "GEL", "LE"], validWords: ["SPEGEL", "SPEL", "SEG", "GEL", "LE"] },
    "8-5": { letters: ["G", "A", "R", "D", "E", "R", "O", "B"], words: ["GARDEROB", "GARD", "ROB", "BOR", "BRA", "RO"], validWords: ["GARDEROB", "GARD", "ROB", "BOR", "BRA", "RO"] },
    "8-6": { letters: ["K", "Ö", "K", "E", "T"], words: ["KÖKET", "KÖK", "EK", "TE"], validWords: ["KÖKET", "KÖK", "EK", "TE"] },
    "8-7": { letters: ["S", "O", "V", "R", "U", "M"], words: ["SOVRUM", "RUM", "SOV", "MOR", "ROM"], validWords: ["SOVRUM", "RUM", "SOV", "MOR", "ROM"] },
    "8-8": { letters: ["B", "A", "D", "R", "U", "M"], words: ["BADRUM", "RUM", "BAD", "BAR", "DUM"], validWords: ["BADRUM", "RUM", "BAD", "BAR", "DUM"] },
    "8-9": { letters: ["T", "R", "Ä", "D", "G", "Å", "R", "D"], words: ["TRÄDGÅRD", "GÅRD", "TRÄD", "DÄR", "GÅ"], validWords: ["TRÄDGÅRD", "GÅRD", "TRÄD", "DÄR", "GÅ"] },
    "8-10": { letters: ["F", "A", "M", "I", "L", "J", "E", "N"], words: ["FAMILJEN", "FAMILJ", "MIL", "FIL", "LEN", "EN"], validWords: ["FAMILJEN", "FAMILJ", "MIL", "FIL", "LEN", "EN"] },

    // ===========================================
    // CHAPTER 9: Familj (Family) 👨‍👩‍👧‍👦
    // ===========================================
    "9-1": { letters: ["F", "A", "R"], words: ["FAR", "AR"], validWords: ["FAR", "AR"] },
    "9-2": { letters: ["M", "O", "R"], words: ["MOR", "OM", "RO"], validWords: ["MOR", "OM", "RO"] },
    "9-3": { letters: ["B", "R", "O", "R"], words: ["BROR", "RO"], validWords: ["BROR", "RO"] },
    "9-4": { letters: ["S", "Y", "S", "T", "E", "R"], words: ["SYSTER", "SER", "TYR"], validWords: ["SYSTER", "SER", "TYR"] },
    "9-5": { letters: ["F", "A", "M", "I", "L", "J"], words: ["FAMILJ", "FIL", "MIL"], validWords: ["FAMILJ", "FIL", "MIL"] },
    "9-6": { letters: ["M", "O", "R", "F", "A", "R"], words: ["MORFAR", "FAR", "MOR", "ROM"], validWords: ["MORFAR", "FAR", "MOR", "ROM"] },
    "9-7": { letters: ["F", "A", "R", "M", "O", "R"], words: ["FARMOR", "FAR", "MOR", "ROM"], validWords: ["FARMOR", "FAR", "MOR", "ROM"] },
    "9-8": { letters: ["K", "U", "S", "I", "N"], words: ["KUSIN", "SIN", "US"], validWords: ["KUSIN", "SIN", "US"] },
    "9-9": { letters: ["D", "O", "T", "T", "E", "R"], words: ["DOTTER", "ROTE", "REDO"], validWords: ["DOTTER", "ROTE", "REDO"] },
    "9-10": { letters: ["B", "R", "O", "D", "E", "R"], words: ["BRODER", "RODER", "BORD", "BRO"], validWords: ["BRODER", "RODER", "BORD", "BRO"] },

    // ===========================================
    // CHAPTER 10: Skola (School) 📚
    // ===========================================
    "10-1": { letters: ["E", "L", "E", "V"], words: ["ELEV", "LEV"], validWords: ["ELEV", "LEV"] },
    "10-2": { letters: ["L", "Ä", "R", "A", "R", "E"], words: ["LÄRARE", "LÄRA", "ÄR", "LÄR"], validWords: ["LÄRARE", "LÄRA", "ÄR", "LÄR"] },
    "10-3": { letters: ["S", "K", "O", "L", "A", "N"], words: ["SKOLAN", "SKOLA", "SOL", "SKO"], validWords: ["SKOLAN", "SKOLA", "SOL", "SKO"] },
    "10-4": { letters: ["K", "L", "A", "S", "S"], words: ["KLASS", "LASS", "AS"], validWords: ["KLASS", "LASS", "AS"] },
    "10-5": { letters: ["P", "E", "N", "N", "A"], words: ["PENNA", "PEN", "EN"], validWords: ["PENNA", "PEN", "EN"] },
    "10-6": { letters: ["R", "A", "D", "E", "R", "G", "U", "M", "M", "I"], words: ["RADERGUMMI", "GUMMI", "GUDAR", "RADER"], validWords: ["RADERGUMMI", "GUMMI", "GUDAR", "RADER"] },
    "10-7": { letters: ["S", "U", "D", "D"], words: ["SUDD", "DUS"], validWords: ["SUDD", "DUS"] },
    "10-8": { letters: ["L", "I", "N", "J", "A", "L"], words: ["LINJAL", "LINA", "LAN"], validWords: ["LINJAL", "LINA", "LAN"] },
    "10-9": { letters: ["L", "Ä", "X", "A"], words: ["LÄXA", "LÄX", "AX"], validWords: ["LÄXA", "LÄX", "AX"] },
    "10-10": { letters: ["P", "R", "O", "V"], words: ["PROV", "RO"], validWords: ["PROV", "RO"] }
};

// Word Connect Data

const WC_DICTIONARY = [
    // --- CHAPTER 1 & 2 WORDS ---
    { w: "HEJ", t: "مرحباً", s: "Hej svejs i lingonskogen!", st: "مرحباً في غابة التوت (تحية مرحة جداً)." },
    { w: "BOR", t: "يسكن", s: "Här bor lyckan.", st: "هنا تسكن السعادة." },
    { w: "RO", t: "هدوء", s: "Ingen ro och ingen vila.", st: "لا راحة ولا هدوء (عمل متواصل)." },
    { w: "SER", t: "يرى", s: "Man ser inte skogen för alla träd.", st: "لا يرى الغابة بسبب كثرة الأشجار (يغفل عن الصورة الكبيرة)." },
    { w: "SE", t: "انظر", s: "Se mellan fingrarna.", st: "يغض الطرف (يتجاهل الخطأ)." },
    { w: "ER", t: "أنتم/لكم", s: "Boken är er.", st: "الكتاب لكم." },
    { w: "TÅG", t: "قطار", s: "Tåget har gått.", st: "فات القطار (لقد فات الأوان)." },
    { w: "GÅ", t: "يمشي", s: "Gå över ån efter vatten.", st: "يعبر النهر ليحضر الماء (يبحث عن الحلول الصعبة)." },
    { w: "TÅ", t: "إصبع القدم", s: "Gå på tå.", st: "يمشي على أطراف أصابعه (يتصرف بحذر شديد)." },
    { w: "SNÖ", t: "ثلج", s: "Det som göms i snö kommer upp i tö.", st: "ما خفي تحت الثلج سيظهر عند الذوبان (لا شيء يبقى سراً)." },
    { w: "BIL", t: "سيارة", s: "Sitta i förarsätet.", st: "يجلس في مقعد السائق (يمسك بزمام الأمور)." },
    { w: "IL", t: "سرعة/عجلة", s: "Ila som en löpeld.", st: "ينتشر كالنار في الهشيم." },
    { w: "LI", t: "منجل", s: "Döden med lien.", st: "الموت ذو المنجل (حاصد الأرواح)." },
    { w: "KOM", t: "تعال", s: "Kommer tid, kommer råd.", st: "مع الوقت يأتي الحل (الصبر مفتاح الفرج)." },
    { w: "OM", t: "عن/إذا", s: "Om och men.", st: "لو ولكن (أعذار وتردد)." },
    { w: "DAG", t: "يوم", s: "En fin dag.", st: "يوم جميل." },
    { w: "DAG", t: "يوم", s: "Morgonstund har guld i mun.", st: "البركة في البكور (ساعة الصباح في فمها ذهب)." },
    { w: "SOL", t: "شمس", s: "Inget nytt under solen.", st: "لا جديد تحت الشمس." },
    { w: "OS", t: "دخان/رائحة", s: "Ingen rök utan eld.", st: "لا دخان بلا نار." },
    { w: "HAV", t: "بحر", s: "En droppe i havet.", st: "نقطة في بحر (شيء ضئيل جداً)." },
    { w: "AV", t: "من/عن", s: "Av och an.", st: "جيئة وذهابا." },
    { w: "BOK", t: "كتاب", s: "Läsa någon som en öppen bok.", st: "يقرأ شخصاً ككتاب مفتوح (يفهمه تماماً)." },
    { w: "BO", t: "يسكن", s: "Bo i kappsäck.", st: "يعيش في حقيبة سفر (كثير التنقل)." },
    { w: "OK", t: "حسناً/نير", s: "Bära oket.", st: "يحمل النير (يتحمل المسؤولية الثقيلة)." },
    { w: "LÅS", t: "قفل", s: "För lyckta dörrar.", st: "خلف أبواب مغلقة." },
    { w: "SÅ", t: "هكذا/زرع", s: "Som man sår får man skörda.", st: "كما تزرع تحصد." },
    { w: "ÅL", t: "ثعبان البحر", s: "Hal som en ål.", st: "زلق كسمكة الثعبان (مراوغ)." },
    { w: "NÅL", t: "إبرة", s: "Leta efter en nål i en höstack.", st: "يبحث عن إبرة في كومة قش." },
    { w: "NÅ", t: "يصل", s: "Nå vägs ände.", st: "يصل إلى نهاية الطريق (يبلغ منتهاه)." },
    { w: "LÅN", t: "قرض", s: "Låna en hjälpande hand.", st: "يمد يد العون." },
    { w: "RÅD", t: "نصيحة", s: "Goda råd är dyra.", st: "النصيحة الجيدة نادرة (غالية)." },
    { w: "RÅ", t: "نيء/يملك", s: "Rå om sitt hus.", st: "يعتني ببيته (يهتم بشؤونه الخاصة)." },
    { w: "DÅ", t: "حينئذ", s: "Då och då.", st: "من حين لآخر." },
    { w: "ROM", t: "روما/بطارخ", s: "Alla vägar bär till Rom.", st: "كل الطرق تؤدي إلى روما." },
    { w: "ORM", t: "ثعبان", s: "Nära en orm vid sin barm.", st: "يربي ثعباناً في حضنه (يحسن لمن يغدر به)." },
    { w: "MOR", t: "أم", s: "Nöden är uppfinningarnas moder.", st: "الحاجة أم الاختراع." },
    { w: "OST", t: "جبن", s: "Lyckans ost.", st: "محظوظ جداً." },
    { w: "SOT", t: "سخام", s: "Sota för något.", st: "يدفع ثمن خطئه." },
    { w: "STO", t: "فرس", s: "Sätta sitt sto till.", st: "يعتمد على (يراهن على)." },
    { w: "TRO", t: "يصدق/إيمان", s: "Tro kan förflytta berg.", st: "الإيمان يمكنه نقل الجبال." },
    { w: "ALM", t: "شجر الدردار", s: "Hårt virke i alm.", st: "خشب الدردار صلب (شخصية قوية/عنيد)." },
    { w: "MAL", t: "عثة/سمكة", s: "Mala på.", st: "يثرثر بلا توقف (يطحن الكلام)." },
    { w: "LAM", t: "أعرج/مشلول", s: "En lam ursäkt.", st: "عذر واهٍ (حجة ضعيفة)." },
    { w: "ART", t: "نوع/فصيلة", s: "En utdöende art.", st: "فصيلة مهددة بالانقراض (عملة نادرة)." },
    { w: "TAR", t: "يأخذ", s: "Ta tjuren vid hornen.", st: "أمسك الثور من قرنيه (واجه المشكلة بشجاعة)." },
    { w: "RAT", t: "عجلة القيادة", s: "Sitta vid ratten.", st: "الجلوس خلف المقود (تولي القيادة)." },
    { w: "VAR", t: "أين/كان", s: "Var sak har sin tid.", st: "كل شيء في وقته حلو (لكل مقام مقال)." },
    { w: "ARV", t: "إرث", s: "Gå i arv.", st: "ينتقل بالوراثة." },
    { w: "RAV", t: "كهرمان", s: "Smycket är av rav.", st: "المجوهرات مصنوعة من الكهرمان." },

    // --- CHAPTER 3+ WORDS ---
    // FOOD THEME
    { w: "KORV", t: "سجق", s: "Varm korv med bröd.", st: "سجق ساخن مع الخبز." },
    { w: "BRÖD", t: "خبز", s: "Nygräddat bröd doftar gott.", st: "الخبز الطازج تفوح منه رائحة طيبة." },
    { w: "KAKA", t: "كعكة", s: "Sju sorters kakor.", st: "سبعة أنواع من الكعك (تقليد سويدي)." },
    { w: "BÄR", t: "توت", s: "Plocka bär i skogen.", st: "قطف التوت في الغابة." },
    { w: "FISK", t: "سمك", s: "Frisk som en fisk.", st: "صحيح مثل السمكة (بصحة جيدة)." },
    { w: "KÖTT", t: "لحم", s: "Kött och potatis.", st: "لحم وبطاطس (طعام تقليدي)." },
    { w: "SOPPA", t: "حساء", s: "Koka soppa på en spik.", st: "يطبخ حساء من مسمار (يختلق شيئاً من لا شيء)." },
    { w: "LÖK", t: "بصل", s: "Lök på laxen.", st: "بصل على السلمون (زاد الطين بلة / أو تحسين الشيء)." },

    // NATURE THEME
    { w: "TRÄD", t: "شجرة", s: "Ett gammalt träd.", st: "شجرة قديمة." },
    { w: "BLOMMA", t: "زهرة", s: "En vacker blomma.", st: "زهرة جميلة." },
    { w: "SKOG", t: "غابة", s: "Skogen är full av liv.", st: "الغابة مليئة بالحياة." },
    { w: "STEN", t: "حجر", s: "Hård som sten.", st: "صلب كالحجر." },
    { w: "GRÄS", t: "عشب", s: "Gräset är grönare på andra sidan.", st: "العشب أكثر خضرة على الجانب الآخر." },
    { w: "VIND", t: "رياح", s: "Vinden vänder.", st: "الرياح تتغير (تغير الأحوال)." },
    { w: "REGN", t: "مطر", s: "Efter regn kommer solsken.", st: "بعد المطر يأتي شروق الشمس." },
    { w: "ELD", t: "نار", s: "Ingen rök utan eld.", st: "لا دخان بلا نار." },

    // TRAVEL THEME
    { w: "RESA", t: "سفر", s: "Att resa är att leva.", st: "السفر هو الحياة." },
    { w: "BUSS", t: "حافلة", s: "Missa bussen.", st: "يفوت الحافلة (تضيع الفرصة)." },
    { w: "BÅT", t: "قارب", s: "Vi sitter i samma båt.", st: "نحن في نفس القارب." },
    { w: "FLYG", t: "طائرة", s: "Ta flyget till solen.", st: "خذ الطائرة إلى الشمس (سافر لمكان مشمس)." },
    { w: "PASS", t: "جواز سفر", s: "Glöm inte ditt pass.", st: "لا تنس جواز سفرك." },
    { w: "KARTA", t: "خريطة", s: "Läsa kartan.", st: "قراءة الخريطة." },
    { w: "STAD", t: "مدينة", s: "Staden som aldrig sover.", st: "المدينة التي لا تنام." },

    // DAILY THEME
    { w: "HEM", t: "منزل", s: "Borta bra men hemma bäst.", st: "الغربة جيدة لكن الوطن أفضل." },
    { w: "HUS", t: "بيت", s: "Hus och hem.", st: "بيت ومسكن." },
    { w: "RUM", t: "غرفة", s: "Finns det hjärterum så finns det stjärterum.", st: "إذا اتسعت القلوب اتسعت الأماكن." },
    { w: "SÄNG", t: "سرير", s: "Bädda sin egen säng.", st: "يرتب سريره (يتحمل عواقب عمله)." },
    { w: "DÖRR", t: "باب", s: "Stänga dörren.", st: "يغلق الباب (ينهي الأمر)." },
    { w: "FÖNSTER", t: "نافذة", s: "Kasta pengarna i sjön.", st: "يرمي المال في البحر (يضيعه)." }, // Changed idiom to match context better or keep simple
    { w: "NYCKEL", t: "مفتاح", s: "Nyckeln till framgång.", st: "مفتاح النجاح." },
    { w: "SKOLA", t: "مدرسة", s: "Livets hårda skola.", st: "مدرسة الحياة القاسية." },
    { w: "JOBB", t: "عمل", s: "Ett hårt jobb.", st: "عمل شاق." },
    { w: "PENGAR", t: "مال", s: "Tid är pengar.", st: "الوقت هو المال." },
    { w: "BORD", t: "طاولة", s: "Lägga korten på bordet.", st: "كشف الأوراق (تحدث بصراحة تامة)." },
    { w: "STOL", t: "كرسي", s: "Ramla mellan stolarna.", st: "يسقط بين الكراسي (يُنسى أو يُهمل)." },
    { w: "GLAD", t: "سعيد", s: "Delad glädje är dubbel glädje.", st: "الفرح المشترك هو فرح مضاعف." },
    { w: "LAG", t: "فريق/قانون", s: "Nöd bryter lag.", st: "الضرورات تبيح المحظورات." },
    { w: "DAL", t: "وادي", s: "Jämmerdal.", st: "وادي الدموع (الدنيا دار شقاء)." },
    { w: "PRAT", t: "حديث", s: "Mycket snack och lite verkstad.", st: "كلام كثير وفعل قليل." },
    { w: "PAR", t: "زوج", s: "Ett radarpar.", st: "ثنائي متناغم (فريق لا يفترق)." },
    { w: "KORT", t: "قصير/بطاقة", s: "Dra det kortaste strået.", st: "يسحب القشة الأقصر (يخسر)." },
    { w: "ORT", t: "منطقة", s: "På ort och ställe.", st: "في عين المكان (فوراً)." },
    { w: "LAND", t: "بلد", s: "Landet lagom.", st: "بلد الاعتدال (السويد)." },
    { w: "DAN", t: "اليوم (عامية)", s: "Dan före dan.", st: "اليوم الذي يسبق الحدث (ليلة العيد)." },
    { w: "HAND", t: "يد", s: "En fågel i handen är bättre än tio i skogen.", st: "عصفور في اليد خير من عشرة على الشجرة." },
    { w: "HAN", t: "هو", s: "Han har inte alla hästar hemma.", st: "ليس لديه كل الخيول في الإسطبل (ليس بكامل قواه العقلية)." },
    { w: "BILD", t: "صورة", s: "En bild säger mer än tusen ord.", st: "الصورة تغني عن ألف كلمة." },
    { w: "LID", t: "منحدر", s: "Backen är en lid.", st: "التل منحدر." },
    { w: "VARM", t: "دافئ", s: "Varm om hjärtat.", st: "دافئ القلب (حنون)." },
    { w: "ARM", t: "ذراع", s: "Med öppna armar.", st: "بأذرع مفتوحة (بترحيب حار)." },
    { w: "KALL", t: "بارد", s: "Kalla fötter.", st: "أقدام باردة (خوف/تردد)." },
    { w: "ALL", t: "كل", s: "Allt är inte guld som glimmar.", st: "ليس كل ما يلمع ذهباً." },
    { w: "KAL", t: "أصلع/عاري", s: "Kal som en biljardboll.", st: "أصلع تماماً (ككرة البلياردو)." },
    { w: "SKOLA", t: "مدرسة", s: "Av skadan blir man vis.", st: "من الأخطاء يتعلم الإنسان (مصائب قوم عند قوم فوائد)." },
    { w: "SKAL", t: "قشرة", s: "Hårt skal men mjukt inre.", st: "قشرة صلبة ولكن داخل ناعم." },
    { w: "KO", t: "بقرة", s: "Ingen ko på isen.", st: "لا توجد بقرة على الجليد (لا داعي للقلق)." },
    { w: "KARTA", t: "خريطة", s: "En vit fläck på kartan.", st: "بقعة بيضاء على الخريطة (منطقة مجهولة)." },
    { w: "RAK", t: "مستقيم", s: "Rak i ryggen.", st: "مستقيم الظهر (شريف/واثق)." },
    { w: "TA", t: "يأخذ", s: "Ta seden dit man kommer.", st: "يا غريب كن أديب (اتبع عادات البلد)." },
    { w: "LISTA", t: "قائمة", s: "Svart lista.", st: "قائمة سوداء." },
    { w: "SILA", t: "يصفّي", s: "Sila mygg och svälja kameler.", st: "يصفّي البعوض ويبتلع الجمال (يدقق في الصغائر ويتجاهل الكبائر)." },
    { w: "SAL", t: "قاعة", s: "Salig blandning.", st: "خليط عجيب (كوكتيل)." },
    { w: "IS", t: "جليد", s: "Ha is i magen.", st: "احتفظ بالثلج في معدتك (حافظ على هدوئك)." },
    { w: "POSTA", t: "يرسل بالبريد", s: "Jag ska posta brevet.", st: "سأرسل الرسالة." },
    { w: "POST", t: "بريد", s: "På sin post.", st: "في موقعه (متيقظ)." },
    { w: "TVÄTT", t: "غسيل", s: "Tvätta sin byk offentligt.", st: "يغسل غسيله أمام الناس (يفضح أسراره)." },
    { w: "TV", t: "تلفاز", s: "Sitta klistrad vid TV:n.", st: "ملتصق بالتلفاز (يتابع بشغف)." },
    { w: "ÄT", t: "كُل", s: "Ät för att leva, lev inte för att äta.", st: "كل لتعيش، ولا تعش لتأكل." },
    { w: "CYKEL", t: "دراجة", s: "Cykla i motvind.", st: "يقود الدراجة عكس الريح (يواجه صعوبات)." },
    { w: "KYL", t: "ثلاجة/برد", s: "Hålla huvudet kallt.", st: "يحافظ على برودة أعصابه (يبقى هادئاً)." },
    { w: "LEK", t: "لعب", s: "Den som ger sig in i leken får leken tåla.", st: "من يدخل اللعبة يجب أن يتحملها." },
    { w: "FÅGEL", t: "طائر", s: "En liten fågel viskade i mitt öra.", st: "عصفورة صغيرة همست في أذني." },
    { w: "LÅG", t: "منخفض/استلقى", s: "Ligga lågt.", st: "يبقى بعيداً عن الأنظار (يتوارى)." },
    { w: "FEL", t: "خطأ", s: "Göra fel är mänskligt.", st: "الخطأ من طبع البشر." },
    { w: "DATOR", t: "حاسوب", s: "Datorn krånglar.", st: "الحاسوب يواجه مشاكل (يعمل بشكل متقطع)." },
    { w: "RAD", t: "صف", s: "Läsa mellan raderna.", st: "يقرأ ما بين السطور (يفهم المعنى الخفي)." },
    { w: "ROT", t: "جذر", s: "Ontets rot.", st: "جذر الشر." },
    { w: "PAKET", t: "حزمة/طرد", s: "Hela paketet.", st: "الحزمة الكاملة (كل شيء)." },
    { w: "TAK", t: "سقف", s: "Ha högt i tak.", st: "سقف مرتفع (جو من التسامح والانفتاح)." },
    { w: "EK", t: "بلوط", s: "Stark som en ek.", st: "قوي كشجرة البلوط." },
    { w: "RADIO", t: "مذياع", s: "Radiotystnad.", st: "صمت لاسلكي (انقطاع الاتصال)." },
    { w: "PENNA", t: "قلم", s: "Pennan är mäktigare än svärdet.", st: "القلم أقوى من السيف." },
    { w: "PANN", t: "جبهة (جزء)", s: "Rynka pannan.", st: "يعبس (يقطب جبينه)." },
    { w: "EN", t: "واحد/شجرة عرعر", s: "En i mängden.", st: "واحد من بين الكثيرين (شخص عادي)." },
    { w: "VÄSKA", t: "حقيبة", s: "Leva ur en väska.", st: "يعيش من حقيبة سفر (كثير التنقل)." },
    { w: "VÄK", t: "ثقب (في الجليد)", s: "Ramla i vaken.", st: "سقط في الثقب الجليدي (وقع في ورطة)." },
    { w: "SAK", t: "شيء", s: "Sak samma.", st: "سيان (لا يهم)." },
    { w: "LAMPA", t: "مصباح", s: "Ha inte alla lampor tända.", st: "ليس لديه كل المصابيح مضاءة (ليس ذكياً جداً)." },
    { w: "PALM", t: "نخلة", s: "Segerns palm.", st: "سعفة النصر (رمز الانتصار)." },
    { w: "MATTA", t: "سجادة", s: "Dra undan mattan.", st: "يسحب البساط من تحت قدميه." },
    { w: "MAT", t: "طعام", s: "Utan mat och dryck försmäktar hjälten.", st: "بدون طعام وشراب يذبل البطل." },
    { w: "ATT", t: "أن", s: "Att vara eller inte vara.", st: "أكون أو لا أكون." },
    { w: "SOFFA", t: "أريكة", s: "Ligga på latsidan (i soffan).", st: "يتكاسل (يستلقي على الأريكة)." },
    { w: "OSA", t: "تفوح رائحة", s: "Osa katt.", st: "يشتم رائحة خديعة (يشعر بوجود خطب ما)." },
    { w: "FA", t: "درجة (موسيقى)", s: "Do re mi fa.", st: "دو ري مي فا." },
    { w: "KUDDE", t: "وسادة", s: "Kudden är den bästa rådgivaren.", st: "الوسادة هي أفضل مستشار (نم على المشكلة)." },
    { w: "UDD", t: "رأس (جغرافي)", s: "Udda fågel.", st: "طائر غريب (شخص غريب الأطوار)." },
    { w: "DU", t: "أنت", s: "Du är vad du äter.", st: "أنت ما تأكله (صحتك تعكس غذاءك)." },
    { w: "TAVLA", t: "لوحة", s: "Göra en tavla.", st: "يرتكب حماقة (يخطئ خطأ فادحاً)." },
    { w: "VAL", t: "خيار/حوت", s: "Kvalet inför valet.", st: "حيرة الاختيار." },
    { w: "TAL", t: "خطاب/عدد", s: "Tala ur skägget.", st: "تحدث بوضوح (أفصح عما في داخلك)." },
    { w: "HYLLA", t: "رف", s: "Lägga på hyllan.", st: "يضعه على الرف (يؤجله/يعتزله)." },
    { w: "HALL", t: "صالة/مدخل", s: "Hallen är husets ansikte.", st: "المدخل هو وجه المنزل." },
    { w: "HY", t: "بشرة", s: "Vårda sin hy.", st: "يعتني ببشرته." },
    { w: "GRÖNA", t: "خضراء", s: "Gröna fingrar.", st: "أصابع خضراء (ماهر في الزراعة)." },
    { w: "GRÖN", t: "أخضر", s: "Gräset är alltid grönare på andra sidan.", st: "العشب دائماً أكثر خضرة على الجانب الآخر (القناعة كنز)." },
    { w: "ÖRN", t: "نسر", s: "Örnkoll.", st: "نظرة ثاقبة (مراقبة دقيقة)." },
    { w: "SVART", t: "أسود", s: "Svart får.", st: "النعجة السوداء (المنبوذ/المختلف)." },
    { w: "SOMMAR", t: "صيف", s: "En svala gör ingen sommar.", st: "سنونوة واحدة لا تصنع الصيف (لا تحكم من ظاهرة واحدة)." },
    { w: "SOM", t: "الذي/مثل", s: "Som man bäddar får man ligga.", st: "كما تزرع تحصد (تحمل عواقب عملك)." },
    { w: "RAM", t: "إطار", s: "Falla inom ramen.", st: "يندرج ضمن الإطار (يكون مناسباً)." },
    { w: "VINTER", t: "شتاء", s: "Vintergatan.", st: "درب التبانة." },
    { w: "VIN", t: "نبيذ", s: "Gammalt vin i nya läglar.", st: "نبيذ قديم في قرب جديدة." },
    { w: "REN", t: "نظيف/رنة", s: "Rent mjöl i påsen.", st: "طحين نظيف في الكيس (شريف/صادق)." },
    { w: "TRE", t: "ثلاثة", s: "Alla goda ting är tre.", st: "كل الأشياء الجيدة تأتي ثلاثاً." },
    { w: "HÖSTEN", t: "الخريف", s: "Hösten av sitt liv.", st: "خريف العمر." },
    { w: "HÖST", t: "خريف", s: "På ålderns höst.", st: "في خريف العمر." },
    { w: "SEN", t: "متأخر", s: "Bättre sent än aldrig.", st: "أن تأتي متأخراً خير من ألا تأتي أبداً." },
    { w: "TEN", t: "قصدير", s: "Rak som en ten.", st: "مستقيم كالقضيب (منتصب القامة)." },
    { w: "VÅREN", t: "الربيع", s: "Våren i luften.", st: "الربيع في الهواء (جو ربيعي)." },
    { w: "VÅR", t: "ربيع/لنا", s: "Vår bästa tid är nu.", st: "أجمل أيامنا هي الآن." },
    { w: "FLICKA", t: "فتاة", s: "Flicka i nöd.", st: "فتاة في محنة (تحتاج للمساعدة)." },
    { w: "LACK", t: "طلاء", s: "Lacka ur.", st: "يفقد أعصابه (يغضب بشدة)." },
    { w: "FIL", t: "لبن رائب/مبرد/ملف", s: "Lugn som en filbunke.", st: "هادئ تماماً (بارد الأعصاب)." },
    { w: "POJKE", t: "فتى", s: "Pojkar är pojkar.", st: "الأولاد سيظلون أولاداً." },
    { w: "LÄRARE", t: "معلم", s: "Erfarenhet är den bästa läraren.", st: "التجربة هي أفضل معلم." },
    { w: "LÄRA", t: "يعلّم/يتعلّم", s: "Man lär så länge man lever.", st: "يتعلم المرء ما دام حياً." },
    { w: "ELEVEN", t: "التلميذ", s: "Eleven överträffar läraren.", st: "التلميذ يتفوق على المعلم." },
    { w: "ELEV", t: "تلميذ", s: "Mönsterelev.", st: "تلميذ مثالي." },
    { w: "LEV", t: "رغيف/عِش", s: "Lev och låt leva.", st: "عِش ودع غيرك يعيش." },
    { w: "SKOLAN", t: "المدرسة", s: "Livets hårda skola.", st: "مدرسة الحياة القاسية." },
    { w: "KLASS", t: "صف", s: "En klass för sig.", st: "فئة بحد ذاتها (متميز)." },
    { w: "LASS", t: "حمل", s: "Dra ett tungt lass.", st: "يتحمل عبئاً ثقيلاً." },
    { w: "FAMILJ", t: "عائلة", s: "Familjens svarta får.", st: "النعجة السوداء في العائلة (المنبوذ)." },
    { w: "MIL", t: "ميل (10 كم)", s: "Den sista milen.", st: "الميل الأخير (المرحلة النهائية)." },
    { w: "SYSTER", t: "أخت", s: "Syster yster.", st: "الأخت المرحة (تعبير مقفى)." },
    { w: "SYR", t: "يخيط", s: "Sy ihop säcken.", st: "يغلق الموضوع (ينهي الأمر)." },
    { w: "BRODER", t: "أخ (رسمي)", s: "Broder Duktig.", st: "الأخ المثالي (تعبير تهكمي)." },
    { w: "BROR", t: "أخ", s: "Storebror ser dig.", st: "الأخ الأكبر يراقبك." },
    { w: "RODER", t: "دفة", s: "Stå vid rodret.", st: "يقف عند الدفة (يتولى القيادة)." },
    { w: "DOTTER", t: "ابنة", s: "Som mor så dotter.", st: "طب الجرة على تمها تطلع البنت لأمها." },
    { w: "ROTE", t: "فصيلة/جذر", s: "Gå i rote.", st: "يمشون في تشكيل (نظام عسكري)." },
    { w: "MORFAR", t: "جد (أب الأم)", s: "Gammal är äldst.", st: "القديم هو الأقدم (الخبرة لها قيمتها)." },
    { w: "FAR", t: "أب", s: "Far och flyg.", st: "اغرب عن وجهي (طِر من هنا)." },
    { w: "FARMOR", t: "جدة (أم الأب)", s: "Farmors köttbullar.", st: "كرات لحم الجدة (طعام تقليدي)." },
    { w: "KUSIN", t: "ابن العم/الخال", s: "Kusinen från landet.", st: "قريبنا من الريف." },
    { w: "SIN", t: "الخاص به", s: "I sinom tid.", st: "في الوقت المناسب." },
    { w: "VÄNNEN", t: "الصديق", s: "Hålla vännen kär.", st: "يعتز بصديقه." },
    { w: "VÄN", t: "صديق", s: "I nöden prövas vännen.", st: "الصديق وقت الضيق." },
    { w: "GRANN", t: "جميل/جار", s: "Grannlåt.", st: "زينة (بهرجة)." },
    { w: "GRAN", t: "شجرة تنوب", s: "Det susar i granen.", st: "الريح تعصف في شجرة التنوب." },
    { w: "GRAN", t: "شجرة تنوب", s: "Granen står så grön och grann i stugan.", st: "تقف الشجرة خضراء وجميلة في الكوخ (أغنية عيد الميلاد)." },
    { w: "SLÄKT", t: "أقارب", s: "Släkten är värst.", st: "الأقارب عقارب (مثل فكاهي)." },
    { w: "LÄK", t: "اشفِ", s: "Tiden läker alla sår.", st: "الزمن يشفي كل الجروح." },
    { w: "FRUKOST", t: "فطور", s: "Frukost som en kung.", st: "إفطار كالملوك." },
    { w: "FRU", t: "زوجة/سيدة", s: "Min bättre hälft.", st: "نصفي الآخر." },
    { w: "KOST", t: "غذاء/تكلفة", s: "Kost och logi.", st: "طعام وسكن." },
    { w: "ROST", t: "صدأ", s: "Gammal kärlek rostar aldrig.", st: "الحب القديم لا يصدأ أبداً." },
    { w: "MIDDAG", t: "عشاء", s: "Middag för två.", st: "عشاء لشخصين (عشاء رومانسي)." },
    { w: "IDAG", t: "اليوم", s: "Fånga dagen.", st: "اغتنم اليوم." },
    { w: "MIG", t: "أنا (مفعول)", s: "Kom till mig.", st: "تعال إلي." },
    { w: "KVÄLL", t: "مساء", s: "Göra kväll.", st: "ينهي العمل لليوم (يأخذ استراحة المساء)." },
    { w: "VÄL", t: "حسناً/جيداً", s: "Slutet gott, allting gott.", st: "الأمور بخواتيمها." },
    { w: "VÄL", t: "حسناً/جيداً", s: "Det går väl bra.", st: "سيسير الأمر على ما يرام." },
    { w: "MATEN", t: "الطعام", s: "Maten tystar munnen.", st: "الطعام يسكت الفم (لا تتحدث وفي فمك طعام)." },
    { w: "TEN", t: "قصدير/محور", s: "Gjuta ten.", st: "صب القصدير." },
    { w: "VATTEN", t: "ماء", s: "Blod är tjockare än vatten.", st: "الدم أثقل من الماء (الأقارب أولى)." },
    { w: "VATT", t: "واط (كهرباء)", s: "Spänning på hög nivå.", st: "إثارة عالية المستوى (تلاعب بلفظ الجهد الكهربائي)." },
    { w: "KAFFE", t: "قهوة", s: "Kaffe med dopp.", st: "قهوة مع معجنات (عادة سويدية)." },
    { w: "FE", t: "جنية", s: "En god fe.", st: "جنية طيبة." },
    { w: "AK", t: "مؤخرة (سفينة)", s: "Akter och för.", st: "المؤخرة والمقدمة." },
    { w: "MJÖLK", t: "حليب", s: "Gråta över spilld mjölk.", st: "البكاء على اللبن المسكوب (الندم لا يفيد)." },
    { w: "MJÖLK", t: "حليب", s: "Landet som flyter av mjölk och honung.", st: "الأرض التي تفيض لبناً وعسلاً (أرض الخيرات)." },
    { w: "KÖL", t: "عارضة السفينة", s: "Sträcka köl.", st: "وضع عارضة السفينة (بدء البناء)." },
    { w: "SOCKER", t: "سكر", s: "Socker i botten.", st: "السكر في القاع (الأفضل يأتي أخيراً)." },
    { w: "SOCK", t: "جورب (عامية)", s: "Ta på sig sockorna.", st: "يرتدي الجوارب." },
    { w: "ROCK", t: "معطف/موسيقى", s: "Rocka fett.", st: "يعزف الروك بقوة (تعبير عامي للإعجاب)." },
    { w: "ROS", t: "وردة", s: "Ingen ros utan taggar.", st: "لا توجد وردة بلا أشواك (لا حلاوة بلا نار)." },
    { w: "PEPPAR", t: "فلفل", s: "Dra dit pepparn växer.", st: "اذهب حيث ينمو الفلفل (اذهب للجحيم)." },
    { w: "PAPPA", t: "أبي", s: "Pappas pojke.", st: "دلوع البابا." },
    { w: "SALTET", t: "الملح", s: "Saltet på jorden.", st: "ملح الأرض (أخيار الناس)." },
    { w: "SALT", t: "ملح", s: "Strö salt i såren.", st: "رش الملح على الجرح (زاد الطين بلة)." },
    { w: "SALT", t: "ملح", s: "Salt och peppar.", st: "ملح وفلفل." },
    { w: "TELEFON", t: "هاتف", s: "Viskleken.", st: "لعبة الهاتف (تناقل الكلام)." },
    { w: "TELE", t: "عن بعد", s: "Teleobjektiv.", st: "عدسة مقربة." },
    { w: "TON", t: "نغمة/طن", s: "Hålla tonen.", st: "يحافظ على النغمة (يلتزم بالأدب)." },
    { w: "MOBILEN", t: "الجوال", s: "Mobilen är urladdad.", st: "بطارية الجوال فارغة." },
    { w: "MOBIL", t: "جوال/متحرك", s: "Stäng av mobilen.", st: "أغلق الجوال." },
    { w: "LEN", t: "ناعم", s: "Len som en barnrumpa.", st: "ناعم كمؤخرة الطفل (ناعم جداً)." },
    { w: "DATORN", t: "الحاسوب", s: "Datorn hängde sig.", st: "الحاسوب تجمد." },
    { w: "SKÄRMEN", t: "الشاشة", s: "Titta på skärmen.", st: "انظر إلى الشاشة." },
    { w: "SKÄRM", t: "شاشة", s: "Bakom skärmen.", st: "خلف الشاشة (في الكواليس)." },
    { w: "MÄN", t: "رجال", s: "Män i svart.", st: "رجال في ملابس سوداء (فيلم/غموض)." },
    { w: "MUSIKEN", t: "الموسيقى", s: "Ljuv musik uppstod.", st: "نشأت موسيقى عذبة (وقعوا في الحب)." },
    { w: "MUSIK", t: "موسيقى", s: "Musik i mina öron.", st: "موسيقى في أذني (خبر سار)." },
    { w: "MUS", t: "فأر", s: "Tyst som en mus.", st: "صامت كالفأر." },
    { w: "FILMEN", t: "الفيلم", s: "Filmen är slut.", st: "انتهى الفيلم." },
    { w: "FILM", t: "فيلم", s: "Livet är som en film.", st: "الحياة مثل فيلم." },
    { w: "MEN", t: "لكن", s: "Inget men.", st: "بدون لكن (لا تعترض)." },
    { w: "BOKEN", t: "الكتاب", s: "En öppen bok.", st: "كتاب مفتوح." },
    { w: "BEN", t: "ساق/عظم", s: "Ben i näsan.", st: "عظم في الأنف (قوة شخصية/عزيمة)." },
    { w: "TIDNING", t: "جريدة", s: "Tidningsanka.", st: "بطة صحفية (خبر كاذب)." },
    { w: "TID", t: "وقت", s: "Tiden läker alla sår.", st: "الزمن يشفي كل الجروح." },
    { w: "NING", t: "لاحقة (قواعد)", s: "Ordning och reda.", st: "نظام وترتيب." },
    { w: "DIN", t: "لك", s: "Ditt och datt.", st: "هذا وذاك (أشياء مختلفة)." },
    { w: "IN", t: "داخل", s: "In i dimman.", st: "إلى الضباب (يضيع/يسكر)." },
    { w: "PENNAN", t: "القلم", s: "Fatta pennan.", st: "أمسك بالقلم (ابدأ الكتابة)." },
    { w: "PAPPER", t: "ورق", s: "Pappersexercis.", st: "روتين ورقي (بيروقراطية)." },
    { w: "PAPP", t: "ورق مقوى", s: "Pappskalle.", st: "رأس من ورق مقوى (غبي)." },
    { w: "RE", t: "نوتة ري", s: "Rea på allt.", st: "تخفيضات على كل شيء." },
    { w: "SJUKHUS", t: "مستشفى", s: "Hamna på sjukhus.", st: "ينتهي به المطاف في المستشفى." },
    { w: "SJUK", t: "مريض", s: "Sjuk av längtan.", st: "مريض من الشوق." },
    { w: "HUS", t: "منزل", s: "Hus och hem.", st: "البيت والوطن." },
    { w: "HUS", t: "منزل", s: "Hus i helvete.", st: "منزل في الجحيم (فوضى عارمة)." },
    { w: "DOKTORN", t: "الطبيب", s: "Fråga doktorn.", st: "اسأل الطبيب." },
    { w: "DOKTOR", t: "طبيب", s: "Ett äpple om dagen håller doktorn borta.", st: "تفاحة في اليوم تغنيك عن الطبيب." },
    { w: "TOR", t: "جاف/إله", s: "Ha sitt på det torra.", st: "أمن مستقبله (وصل إلى بر الأمان)." },
    { w: "KOR", t: "أبقار", s: "Heliga kor.", st: "أبقار مقدسة (أشخاص لا يمكن مساسهم)." },
    { w: "APOTEK", t: "صيدلية", s: "Husapotek.", st: "صيدلية منزلية." },
    { w: "POT", t: "وعاء (عامية)", s: "Pott och panna.", st: "قدر ومقلاة (كل شيء)." },
    { w: "TE", t: "شاي", s: "Inte min kopp te.", st: "ليس كوب الشاي الخاص بي (ليس من اهتماماتي)." },
    { w: "MEDICIN", t: "دواء", s: "Smaka sin egen medicin.", st: "يتجرع من نفس الكأس (يذوق دواءه)." },
    { w: "MED", t: "مع", s: "Med eller mot.", st: "مع أو ضد." },
    { w: "POLISEN", t: "الشرطة", s: "Lagens långa arm.", st: "ذراع القانون الطويلة (العدالة ستطالك)." },
    { w: "POLIS", t: "شرطي", s: "Polis, polis, potatisgris.", st: "شرطي، شرطي (أغنية أطفال)." },
    { w: "BRANDEN", t: "الحريق", s: "Släcka branden.", st: "إخماد الحريق (حل المشكلة)." },
    { w: "BRAND", t: "حريق", s: "Ingen rök utan eld.", st: "لا دخان بلا نار." },
    { w: "AND", t: "بطة برية/روح", s: "Anden i flaskan.", st: "المارد في القمقم." },
    { w: "DEN", t: "ذاك/الـ", s: "Den dagen den sorgen.", st: "في ذلك اليوم نحمل ذلك الهم (لا تستبق الأحداث)." },
    { w: "HJÄLPEN", t: "المساعدة", s: "Nödrop.", st: "نداء استغاثة." },
    { w: "HJÄLP", t: "مساعدة", s: "Hjälp till självhjälp.", st: "المساعدة من أجل الاعتماد على الذات." },
    { w: "LÄN", t: "محافظة", s: "Sveriges län.", st: "محافظات السويد." },
    { w: "OLYCKA", t: "حادث", s: "En olycka kommer sällan ensam.", st: "المصائب لا تأتي فرادى." },
    { w: "LYCKA", t: "سعادة", s: "Lycka till.", st: "حظاً سعيداً." },
    { w: "LYCKA", t: "سعادة", s: "Lyckans ost.", st: "محظوظ جداً (قطعة الجبن المحظوظة)." },
    { w: "AL", t: "شجر الحور", s: "Al och ask.", st: "حور ودردار." },
    { w: "RÄDDA", t: "أنقذ/خائفون", s: "Rädda skinnet.", st: "ينقذ جلده (ينجو بنفسه)." },
    { w: "RÄDD", t: "خائف", s: "Rädd om skinnet.", st: "حريص على سلامته." },
    { w: "TRYGG", t: "آمن", s: "Tryggare kan ingen vara.", st: "لا أحد يمكن أن يكون أكثر أماناً (ترنيمة)." },
    { w: "RYGG", t: "ظهر", s: "Ha ryggen fri.", st: "يؤمن ظهره (يحمي نفسه)." },
    { w: "TYG", t: "قماش", s: "Tyg och otyg.", st: "قماش وشقاوة (تلاعب لفظي)." },
    // --- NEW ADDITIONS (Linguistic Audit) ---
    { w: "MOS", t: "هرس/بطاطس مهروسة", s: "Mos i huvudet.", st: "هريس في الرأس (مشوش/غبي)." },
    { w: "MARS", t: "مارس/آذار", s: "Marskatter.", st: "قطط مارس (صاخبة)." },
    { w: "ROSA", t: "وردي", s: "Rosa moln.", st: "سحب وردية (حالة من السعادة الغامرة)." },
    { w: "VET", t: "يعرف", s: "Det vete fåglarna.", st: "الطيور تعرف ذلك (الله أعلم)." },
    { w: "INRE", t: "داخلي", s: "Inre skönhet.", st: "الجمال الداخلي." },
    { w: "HÖ", t: "قش/تبن", s: "Hästen äter hö.", st: "الحصان يأكل القش." },
    { w: "ÖST", t: "شرق", s: "Öst är öst och väst är väst.", st: "الشرق شرق والغرب غرب (لن يلتقيا)." },
    { w: "STEN", t: "حجر", s: "Kasta inte sten i glashus.", st: "لا ترمِ الناس بالحجارة وبيتك من زجاج." },
    { w: "SON", t: "ابن", s: "Sådan far, sådan son.", st: "من شابه أباه فما ظلم." },
    { w: "HON", t: "هي", s: "Hon och han.", st: "هي وهو." },
    { w: "HET", t: "حار/ساخن", s: "Het potatis.", st: "بطاطس ساخنة (موضوع شائك)." },
    { w: "REV", t: "مزق/شِعب", s: "Rev och slet.", st: "مزق وقطع (عمل بجد/كافح)." },
    { w: "LIKA", t: "متشابهان", s: "Lika barn leka bäst.", st: "الطيور على أشكالها تقع." },
    { w: "KILA", t: "يركض/يذهب بسرعة", s: "Kila stadigt.", st: "يتواعدان بانتظام (علاقة جدية)." },
    { w: "FALK", t: "صقر", s: "Falköga.", st: "عين الصقر (حاد البصر)." },
    { w: "JO", t: "بلى/نعم", s: "Jo tjena.", st: "نعم، بالتأكيد (تعبير ساخر)." },
    { w: "ÄR", t: "يكون", s: "Tala är silver, tiga är guld.", st: "الكلام من فضة والسكوت من ذهب." },
    { w: "ÄRA", t: "شرف", s: "Ära och berömmelse.", st: "المجد والشهرة." },
    { w: "REA", t: "تخفيضات", s: "Total utförsäljning.", st: "تصفية شاملة." },
    { w: "LEVE", t: "يعيش/يحيا", s: "Leve livet.", st: "تحيا الحياة." },
    { w: "KAN", t: "يستطيع", s: "Kan själv.", st: "أستطيع بنفسي (عناد الأطفال)." },
    { w: "LO", t: "وشق", s: "Vig som en lo.", st: "رشيق كالوشق." },
    { w: "KOL", t: "فحم", s: "Svart som kol.", st: "أسود كالفحم." },
    { w: "NOS", t: "أنف الحيوان/خطم", s: "Få på nosen.", st: "يُضرب على أنفه (يُوبخ)." },
    { w: "SKO", t: "حذاء", s: "Vet var skon klämmer.", st: "يعرف أين يضغط الحذاء (يدرك مصدر المشكلة)." },
    { w: "ASK", t: "علبة/شجرة الدردار", s: "Ur askan i elden.", st: "من الرماد إلى النار (كالمستجير من الرمضاء بالنار)." },
    // --- NEW ADDITIONS (Level Density) ---
    { w: "EJ", t: "ليس/لا", s: "Rökning ej tillåten.", st: "التدخين غير مسموح به." },
    { w: "ÖS", t: "صب/غرف", s: "Ös på!", st: "صب المزيد! (انطلق بقوة)." },
    { w: "LOT", t: "نصيب/حصة", s: "Min lott i livet.", st: "نصيبي في الحياة." },
    { w: "GAL", t: "يصيح (الديك)", s: "Tuppen gal.", st: "الديك يصيح." },
    { w: "HA", t: "يملك", s: "Ha is i magen.", st: "احتفظ بالثلج في معدتك (حافظ على هدوئك)." },
    { w: "BLI", t: "يصبح", s: "Det kommer bli bra.", st: "سيكون الأمر جيداً." },
    { w: "LA", t: "وضع/نوتة لا", s: "Hönan la ett ägg.", st: "الدجاجة وضعت بيضة." },
    { w: "AS", t: "جيفة/إله نلوردي", s: "En asagud.", st: "إله نلوردي." },
    { w: "ARK", t: "فلك/ورقة", s: "Noaks ark.", st: "سفينة نوح." },
    { w: "KAR", t: "حوض", s: "Badkar.", st: "حوض استحمام." },
    { w: "ARA", t: "ببغاء", s: "En färgglad ara.", st: "ببغاء ملون." },
    { w: "SIL", t: "مصفاة", s: "Läcka som en sil.", st: "يسرب مثل المصفاة." },
    { w: "LIT", t: "ثقة", s: "Sätt din lit till mig.", st: "ضع ثقتك بي." },
    { w: "LAT", t: "كسول", s: "Latmask.", st: "دودة كسولة (شخص كسول)." },
    { w: "TÄT", t: "كثيف", s: "Tät trafik.", st: "حركة مرور كثيفة." },
    { w: "EL", t: "كهرباء", s: "Spara på el.", st: "وفر الكهرباء." },
    { w: "FÅ", t: "قليل/يحصل", s: "Få förunnat.", st: "ممنوح لقلة (نادر)." },
    { w: "LE", t: "يبتسم", s: "Le och var glad.", st: "ابتسم وكن سعيداً." },
    { w: "DRA", t: "يسحب", s: "Dra alla över en kam.", st: "يعامل الجميع بنفس الطريقة (يعمم)." },
    { w: "KAP", t: "غنيمة/صفقة", s: "Ett riktigt kap.", st: "صفقة رابحة." },
    { w: "AKT", t: "فعل/مشهد", s: "En akt av kärlek.", st: "فعل محبة." },
    { w: "RID", t: "اركب", s: "Rid i natt.", st: "اركب الليلة." },
    { w: "ID", t: "سمكة الإيد", s: "En id.", st: "سمكة الإيد." },
    // --- NEW ADDITIONS (Level Density - Chapters 5-10) ---
    { w: "PANNA", t: "جبهة/مقلاة", s: "Steka i pannan.", st: "يقلي في المقلاة." },
    { w: "UDDA", t: "فردي/غريب", s: "Udda tal.", st: "عدد فردي." },
    { w: "VAL", t: "خيار/حوت", s: "Ett svårt val.", st: "خيار صعب." },
    { w: "TAL", t: "خطاب/عدد", s: "Hålla tal.", st: "يلقي خطاباً." },
    { w: "HALL", t: "صالة", s: "En stor hall.", st: "صالة كبيرة." },
    { w: "ARV", t: "إرث", s: "Ett stort arv.", st: "إرث كبير." },
    { w: "RAM", t: "إطار", s: "Inom ramen.", st: "داخل الإطار." },
    { w: "LACK", t: "طلاء", s: "Svart lack.", st: "طلاء أسود." },
    { w: "FIL", t: "مبرد/ملف", s: "En fil.", st: "مبرد (أو ملف)." },
    { w: "RER", t: "يحل/يفك", s: "Det rer sig.", st: "سوف يحل (الأمر سيترتب)." },
    { w: "LASS", t: "حمل", s: "Ett lass ved.", st: "حمل من الحطب." },
    { w: "MIL", t: "ميل", s: "En svensk mil.", st: "ميل سويدي (10 كم)." },
    { w: "SYR", t: "يخيط", s: "Hon syr en klänning.", st: "هي تخيط فستاناً." },
    { w: "BROR", t: "أخ", s: "Min bror.", st: "أخي." },
    { w: "RODER", t: "دفة", s: "Sitta vid rodret.", st: "يجلس عند الدفة." },
    { w: "ROTE", t: "فصيلة", s: "En rote.", st: "فصيلة." },
    { w: "FAR", t: "أب", s: "Far och son.", st: "أب وابن." },
    { w: "SIN", t: "الخاص به", s: "I sin tid.", st: "في وقته." },
    { w: "RAN", t: "سرقة (قديم)", s: "Rån och ran.", st: "سرقة (تعبير قديم)." },
    { w: "FRU", t: "زوجة", s: "Min fru.", st: "زوجتي." },
    { w: "KOST", t: "غذاء", s: "Kostcirkeln.", st: "دائرة الغذاء." },
    { w: "ROST", t: "صدأ", s: "Rost på bilen.", st: "صدأ على السيارة." },
    { w: "MIG", t: "أنا (مفعول)", s: "Ge mig.", st: "أعطني." },
    { w: "KÄL", t: "وتد (لهجة)", s: "En käl.", st: "وتد." },
    { w: "VATT", t: "واط", s: "40 vatt.", st: "40 واط." },
    { w: "MÖ", t: "عذراء (قديم)", s: "En vän mö.", st: "عذراء جميلة (تعبير قديم)." },
    { w: "SOCK", t: "جورب", s: "En röd sock.", st: "جورب أحمر." },
    { w: "LET", t: "بحث (ماضي)", s: "Han let efter nyckeln.", st: "بحث عن المفتاح (لهجة/قديم)." },
    { w: "FEL", t: "خطأ", s: "Det blev fel.", st: "حدث خطأ." },
    { w: "LEN", t: "ناعم", s: "Len som sammet.", st: "ناعم كالمخمل." },
    { w: "MÄN", t: "رجال", s: "Starka män.", st: "رجال أقوياء." },
    { w: "MUS", t: "فأر", s: "En liten mus.", st: "فأر صغير." },
    { w: "US", t: "الولايات المتحدة (عامية)", s: "Resa till US.", st: "السفر إلى أمريكا." },
    { w: "TOR", t: "إله الرعد", s: "Guden Tor.", st: "الإله ثور." },
    { w: "KOR", t: "أبقار", s: "Korna betar.", st: "الأبقار ترعى." },
    { w: "OCK", t: "أيضاً (قديم)", s: "Ack och ock.", st: "آه وأيضاً (تعبير قديم)." },
    // --- NEW ADDITIONS (Deep Sweep) ---
    { w: "OR", t: "عثة", s: "Or i träet.", st: "عثة في الخشب." },
    { w: "TÅ", t: "إصبع قدم", s: "Gå på tå.", st: "يمشي على رؤوس أصابعه." },
    { w: "ÖN", t: "الجزيرة", s: "Ingen man är en ö.", st: "لا يوجد إنسان جزيرة (الإنسان اجتماعي بطبعه)." },
    { w: "BI", t: "نحلة", s: "Flitig som ett bi.", st: "مجتهد كالنحلة." },
    { w: "SLÅ", t: "يضرب", s: "Slå huvudet på spiken.", st: "يضرب المسمار على رأسه (يصيب كبد الحقيقة)." },
    { w: "ÅR", t: "سنة", s: "År ut och år in.", st: "عاماً بعد عام (بشكل مستمر)." },
    { w: "OM", t: "إذا/حول", s: "Om och om igen.", st: "مراراً وتكراراً." },
    { w: "AV", t: "من/عن", s: "Av och till.", st: "من حين لآخر." },
    { w: "KAL", t: "أصلع/عاري", s: "En kal fläck.", st: "بقعة صلعاء." },
    { w: "SKA", t: "سوف", s: "Det ska böjas i tid.", st: "يجب تقويمه مبكراً (التعليم في الصغر)." },
    { w: "RAT", t: "عجلة قيادة (عامية)", s: "Hålla i ratten.", st: "يمسك بعجلة القيادة." },
    { w: "AR", t: "آر (وحدة مساحة)", s: "Ett ar mark.", st: "آر واحد من الأرض." },
    { w: "STIL", t: "أسلوب", s: "Stil och fason.", st: "أناقة ولباقة." },
    { w: "LITA", t: "يثق", s: "Lita blint.", st: "يثق ثقة عمياء." },
    { w: "ILA", t: "يسرع/يؤلم", s: "Ila av ilska.", st: "يغلي من الغضب." },
    { w: "TÄTA", t: "يسد/يكثف", s: "Täta leden.", st: "رص الصفوف (توحيد الجهود)." },
    { w: "GEL", t: "جل", s: "Hårgel.", st: "جل للشعر." },
    { w: "PEKA", t: "يشير", s: "Peka med hela handen.", st: "يشير بيده كاملة (يعطي أوامر واضحة وحازمة)." },
    { w: "RIA", t: "بيت تجفيف", s: "Torka i en ria.", st: "يجفف في بيت التجفيف." },
    { w: "DIA", t: "يرضع", s: "Lammet diar.", st: "الحمل يرضع." },
    { w: "ROA", t: "يسلي", s: "Roa sig kungligt.", st: "يستمتع بوقت ملكي (يستمتع للغاية)." },
    { w: "AIR", t: "هواء/مظهر", s: "En air av mystik.", st: "هالة من الغموض." },
    { w: "JE", t: "أنا (فرنسي/مستعار)", s: "Je ne sais quoi.", st: "شيء لا أعرف ما هو (جاذبية غامضة)." }
];

// Root words for random generation (Chapters 3+) - Filter for length >= 5 to ensure good puzzles
const WC_ROOT_WORDS = WC_DICTIONARY.filter(item => item.w.length >= 5).map(item => item.w);

console.log(`Word Connect Data Loaded: ${Object.keys(WC_PREDEFINED_LEVELS).length} levels, ${WC_DICTIONARY.length} dictionary words.`);
