// ============================================
// WORD CONNECT - 100 STATIC LEVELS
// 10 Chapters × 10 Stages
// ============================================

const WC_PREDEFINED_LEVELS = {
    // ===========================================
    // CHAPTER 1: Mat & Dryck (Food & Drink) 🍎
    // ===========================================
    "1-1": { letters: ["M", "A", "T"], words: ["MAT", "TA"], validWords: ["MAT", "TA"] },
    "1-2": { letters: ["T", "E"], words: ["TE"], validWords: ["TE"] },
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
    "2-3": { letters: ["I", "S"], words: ["IS", "SI"], validWords: ["IS", "SI"] },
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
    "5-5": { letters: ["F", "R", "U", "K", "O", "S", "T"], words: ["FRUKOST", "OST", "KOST", "ROST", "KORT", "ROT", "KO"], validWords: ["FRUKOST"، "OST", "KOST", "ROST", "KORT", "ROT", "KO"] },
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
