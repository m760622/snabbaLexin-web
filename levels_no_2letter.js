// ============================================
// WORD CONNECT - 100 STATIC LEVELS (NO 2-LETTER WORDS)
// 10 Chapters × 10 Stages
// All words are 3+ letters
// ============================================

const WC_PREDEFINED_LEVELS = {
    // ===========================================
    // CHAPTER 1: Mat & Dryck (Food & Drink) 🍎
    // ===========================================
    "1-1": { letters: ["M", "A", "T"], words: ["MAT"], validWords: ["MAT"] },
    "1-2": { letters: ["T", "E", "N"], words: ["TEN"], validWords: ["TEN"] },
    "1-3": { letters: ["O", "S", "T"], words: ["OST"], validWords: ["OST"] },
    "1-4": { letters: ["B", "Ä", "R"], words: ["BÄR"], validWords: ["BÄR"] },
    "1-5": { letters: ["K", "O", "R", "V"], words: ["KORV"], validWords: ["KORV"] },
    "1-6": { letters: ["F", "I", "S", "K"], words: ["FISK"], validWords: ["FISK"] },
    "1-7": { letters: ["K", "Ö", "T", "T"], words: ["KÖTT"], validWords: ["KÖTT"] },
    "1-8": { letters: ["B", "R", "Ö", "D"], words: ["BRÖD"], validWords: ["BRÖD"] },
    "1-9": { letters: ["K", "A", "K", "A"], words: ["KAKA", "AKA"], validWords: ["KAKA", "AKA"] },
    "1-10": { letters: ["S", "O", "P", "P", "A"], words: ["SOPPA", "PASS"], validWords: ["SOPPA", "PASS"] },

    // ===========================================
    // CHAPTER 2: Naturen (Nature) 🌲
    // ===========================================
    "2-1": { letters: ["S", "O", "L"], words: ["SOL"], validWords: ["SOL"] },
    "2-2": { letters: ["S", "N", "Ö"], words: ["SNÖ"], validWords: ["SNÖ"] },
    "2-3": { letters: ["V", "I", "S"], words: ["VIS"], validWords: ["VIS"] },
    "2-4": { letters: ["E", "L", "D"], words: ["ELD", "DEL"], validWords: ["ELD", "DEL"] },
    "2-5": { letters: ["T", "R", "Ä", "D"], words: ["TRÄD", "DÄR"], validWords: ["TRÄD", "DÄR"] },
    "2-6": { letters: ["S", "T", "E", "N"], words: ["STEN", "SEN", "TEN"], validWords: ["STEN", "SEN", "TEN"] },
    "2-7": { letters: ["G", "R", "Ä", "S"], words: ["GRÄS", "SÄR"], validWords: ["GRÄS", "SÄR"] },
    "2-8": { letters: ["R", "E", "G", "N"], words: ["REGN", "NER", "GER"], validWords: ["REGN", "NER", "GER"] },
    "2-9": { letters: ["S", "K", "O", "G"], words: ["SKOG"], validWords: ["SKOG"] },
    "2-10": { letters: ["B", "L", "O", "M", "M", "A"], words: ["BLOMMA", "LAMM", "MAL"], validWords: ["BLOMMA", "LAMM", "MAL"] },

    // ===========================================
    // CHAPTER 3: Resor (Travel) ✈️
    // ===========================================
    "3-1": { letters: ["T", "Å", "G"], words: ["TÅG"], validWords: ["TÅG"] },
    "3-2": { letters: ["B", "I", "L"], words: ["BIL", "BLI"], validWords: ["BIL", "BLI"] },
    "3-3": { letters: ["B", "Å", "T"], words: ["BÅT"], validWords: ["BÅT"] },
    "3-4": { letters: ["B", "U", "S", "S"], words: ["BUSS"], validWords: ["BUSS"] },
    "3-5": { letters: ["R", "E", "S", "A"], words: ["RESA", "SER", "REA"], validWords: ["RESA", "SER", "REA"] },
    "3-6": { letters: ["S", "T", "A", "D"], words: ["STAD", "DAS"], validWords: ["STAD", "DAS"] },
    "3-7": { letters: ["L", "A", "N", "D"], words: ["LAND", "DAL", "DAN", "AND"], validWords: ["LAND", "DAL", "DAN", "AND"] },
    "3-8": { letters: ["K", "A", "R", "T", "A"], words: ["KARTA", "RAK", "ART", "TAR"], validWords: ["KARTA", "RAK", "ART", "TAR"] },
    "3-9": { letters: ["P", "A", "S", "S"], words: ["PASS"], validWords: ["PASS"] },
    "3-10": { letters: ["F", "L", "Y", "G"], words: ["FLYG", "FLY", "LYG"], validWords: ["FLYG", "FLY", "LYG"] },

    // ===========================================
    // CHAPTER 4: Vardag (Daily Life) 🏠
    // ===========================================
    "4-1": { letters: ["H", "E", "M"], words: ["HEM"], validWords: ["HEM"] },
    "4-2": { letters: ["R", "U", "M"], words: ["RUM"], validWords: ["RUM"] },
    "4-3": { letters: ["H", "U", "S"], words: ["HUS"], validWords: ["HUS"] },
    "4-4": { letters: ["B", "O", "K"], words: ["BOK"], validWords: ["BOK"] },
    "4-5": { letters: ["S", "Ä", "N", "G"], words: ["SÄNG"], validWords: ["SÄNG"] },
    "4-6": { letters: ["D", "Ö", "R", "R"], words: ["DÖRR", "RÖR"], validWords: ["DÖRR", "RÖR"] },
    "4-7": { letters: ["J", "O", "B", "B"], words: ["JOBB"], validWords: ["JOBB"] },
    "4-8": { letters: ["S", "K", "O", "L", "A"], words: ["SKOLA", "SKAL", "SOL", "SAL", "SKO"], validWords: ["SKOLA", "SKAL", "SOL", "SAL", "SKO"] },
    "4-9": { letters: ["L", "A", "M", "P", "A"], words: ["LAMPA", "PALM", "MAL"], validWords: ["LAMPA", "PALM", "MAL"] },
    "4-10": { letters: ["N", "Y", "C", "K", "E", "L"], words: ["NYCKEL", "KYL", "LEK"], validWords: ["NYCKEL", "KYL", "LEK"] },

    // ===========================================
    // CHAPTER 5: Mat & Dryck (Advanced) 🍎
    // ===========================================
    "5-1": { letters: ["K", "A", "F", "F", "E"], words: ["KAFFE"], validWords: ["KAFFE"] },
    "5-2": { letters: ["M", "J", "Ö", "L", "K"], words: ["MJÖLK"], validWords: ["MJÖLK"] },
    "5-3": { letters: ["S", "O", "C", "K", "E", "R"], words: ["SOCKER", "ROS"], validWords: ["SOCKER", "ROS"] },
    "5-4": { letters: ["P", "E", "P", "P", "A", "R"], words: ["PEPPAR", "PAR", "RAP"], validWords: ["PEPPAR", "PAR", "RAP"] },
    "5-5": { letters: ["F", "R", "U", "K", "O", "S", "T"], words: ["FRUKOST", "OST", "KOST", "ROST", "KORT", "ROT"], validWords: ["FRUKOST", "OST", "KOST", "ROST", "KORT", "ROT"] },
    "5-6": { letters: ["M", "I", "D", "D", "A", "G"], words: ["MIDDAG", "DAG", "IDAG", "MIG", "DIG"], validWords: ["MIDDAG", "DAG", "IDAG", "MIG", "DIG"] },
    "5-7": { letters: ["V", "A", "T", "T", "E", "N"], words: ["VATTEN", "VATT", "TEN", "ATT", "VET"], validWords: ["VATTEN", "VATT", "TEN", "ATT", "VET"] },
    "5-8": { letters: ["S", "A", "L", "T", "E", "T"], words: ["SALTET", "SALT", "TAL"], validWords: ["SALTET", "SALT", "TAL"] },
    "5-9": { letters: ["L", "Ö", "K", "A", "R"], words: ["LÖKAR", "LÖK", "KÄR", "LÄR"], validWords: ["LÖKAR", "LÖK", "KÄR", "LÄR"] },
    "5-10": { letters: ["G", "R", "Ö", "N", "S", "A", "K"], words: ["GRÖNSAK", "GRÖN", "SAK", "KAN", "SKA"], validWords: ["GRÖNSAK", "GRÖN", "SAK", "KAN", "SKA"] },

    // ===========================================
    // CHAPTER 6: Naturen (Advanced) 🌲
    // ===========================================
    "6-1": { letters: ["S", "O", "M", "M", "A", "R"], words: ["SOMMAR", "SOM", "MOR", "ROM", "ROS"], validWords: ["SOMMAR", "SOM", "MOR", "ROM", "ROS"] },
    "6-2": { letters: ["V", "I", "N", "T", "E", "R"], words: ["VINTER", "VIN", "REN", "TRE"], validWords: ["VINTER", "VIN", "REN", "TRE"] },
    "6-3": { letters: ["H", "Ö", "S", "T", "E", "N"], words: ["HÖSTEN", "HÖST", "SEN", "TEN"], validWords: ["HÖSTEN", "HÖST", "SEN", "TEN"] },
    "6-4": { letters: ["V", "Å", "R", "E", "N"], words: ["VÅREN", "VÅR", "REN"], validWords: ["VÅREN", "VÅR", "REN"] },
    "6-5": { letters: ["H", "I", "M", "M", "E", "L"], words: ["HIMMEL", "HEM", "MIL", "HEL"], validWords: ["HIMMEL", "HEM", "MIL", "HEL"] },
    "6-6": { letters: ["S", "T", "J", "Ä", "R", "N", "A"], words: ["STJÄRNA", "TÄR", "NÄR"], validWords: ["STJÄRNA", "TÄR", "NÄR"] },
    "6-7": { letters: ["B", "E", "R", "G", "E", "T"], words: ["BERGET", "BERG", "GER", "BET"], validWords: ["BERGET", "BERG", "GER", "BET"] },
    "6-8": { letters: ["F", "L", "O", "D", "E", "N"], words: ["FLODEN", "FLOD", "DEN", "DEL"], validWords: ["FLODEN", "FLOD", "DEN", "DEL"] },
    "6-9": { letters: ["D", "J", "U", "R", "E", "N"], words: ["DJUREN", "DJUR", "REN"], validWords: ["DJUREN", "DJUR", "REN"] },
    "6-10": { letters: ["N", "A", "T", "U", "R"], words: ["NATUR", "TUR", "TUN"], validWords: ["NATUR", "TUR", "TUN"] },

    // ===========================================
    // CHAPTER 7: Resor (Advanced) ✈️
    // ===========================================
    "7-1": { letters: ["H", "O", "T", "E", "L", "L"], words: ["HOTELL", "HOT", "HEL"], validWords: ["HOTELL", "HOT", "HEL"] },
    "7-2": { letters: ["V", "Ä", "S", "K", "A"], words: ["VÄSKA", "VÄK", "SAK", "SKA"], validWords: ["VÄSKA", "VÄK", "SAK", "SKA"] },
    "7-3": { letters: ["B", "I", "L", "J", "E", "T", "T"], words: ["BILJETT", "BIL", "ETT"], validWords: ["BILJETT", "BIL", "ETT"] },
    "7-4": { letters: ["T", "U", "R", "I", "S", "T"], words: ["TURIST", "TUR", "RIS"], validWords: ["TURIST", "TUR", "RIS"] },
    "7-5": { letters: ["S", "E", "M", "E", "S", "T", "E", "R"], words: ["SEMESTER", "MEST", "MER", "SER", "TRE"], validWords: ["SEMESTER", "MEST", "MER", "SER", "TRE"] },
    "7-6": { letters: ["S", "T", "R", "A", "N", "D"], words: ["STRAND", "RAND", "AND", "DAN", "RAD"], validWords: ["STRAND", "RAND", "AND", "DAN", "RAD"] },
    "7-7": { letters: ["U", "T", "L", "A", "N", "D"], words: ["UTLAND", "LAND", "TUL", "DAL", "AND"], validWords: ["UTLAND", "LAND", "TUL", "DAL", "AND"] },
    "7-8": { letters: ["F", "L", "Y", "G", "P", "L", "A", "N"], words: ["FLYGPLAN", "FLYG", "PLAN", "LAN"], validWords: ["FLYGPLAN", "FLYG", "PLAN", "LAN"] },
    "7-9": { letters: ["K", "A", "M", "E", "R", "A"], words: ["KAMERA", "MER", "RAM", "ARA", "KAR"], validWords: ["KAMERA", "MER", "RAM", "ARA", "KAR"] },
    "7-10": { letters: ["Ä", "V", "E", "N", "T", "Y", "R"], words: ["ÄVENTYR", "TYR", "VEN"], validWords: ["ÄVENTYR", "TYR", "VEN"] },

    // ===========================================
    // CHAPTER 8: Vardag (Advanced) 🏠
    // ===========================================
    "8-1": { letters: ["T", "E", "L", "E", "F", "O", "N"], words: ["TELEFON", "TELE", "FEL", "TON"], validWords: ["TELEFON", "TELE", "FEL", "TON"] },
    "8-2": { letters: ["D", "A", "T", "O", "R", "N"], words: ["DATORN", "DATOR", "ROT", "TON", "RAD"], validWords: ["DATORN", "DATOR", "ROT", "TON", "RAD"] },
    "8-3": { letters: ["F", "Ö", "N", "S", "T", "E", "R"], words: ["FÖNSTER", "STEN", "FEST", "REN", "SER"], validWords: ["FÖNSTER", "STEN", "FEST", "REN", "SER"] },
    "8-4": { letters: ["S", "P", "E", "G", "E", "L"], words: ["SPEGEL", "SPEL", "SEG", "GEL"], validWords: ["SPEGEL", "SPEL", "SEG", "GEL"] },
    "8-5": { letters: ["G", "A", "R", "D", "E", "R", "O", "B"], words: ["GARDEROB", "GARD", "ROB", "BOR", "BRA"], validWords: ["GARDEROB", "GARD", "ROB", "BOR", "BRA"] },
    "8-6": { letters: ["K", "Ö", "K", "E", "T"], words: ["KÖKET", "KÖK"], validWords: ["KÖKET", "KÖK"] },
    "8-7": { letters: ["S", "O", "V", "R", "U", "M"], words: ["SOVRUM", "RUM", "SOV", "MOR", "ROM"], validWords: ["SOVRUM", "RUM", "SOV", "MOR", "ROM"] },
    "8-8": { letters: ["B", "A", "D", "R", "U", "M"], words: ["BADRUM", "RUM", "BAD", "BAR", "DUM"], validWords: ["BADRUM", "RUM", "BAD", "BAR", "DUM"] },
    "8-9": { letters: ["T", "R", "Ä", "D", "G", "Å", "R", "D"], words: ["TRÄDGÅRD", "GÅRD", "TRÄD", "DÄR"], validWords: ["TRÄDGÅRD", "GÅRD", "TRÄD", "DÄR"] },
    "8-10": { letters: ["F", "A", "M", "I", "L", "J", "E", "N"], words: ["FAMILJEN", "FAMILJ", "MIL", "FIL", "LEN"], validWords: ["FAMILJEN", "FAMILJ", "MIL", "FIL", "LEN"] },

    // ===========================================
    // CHAPTER 9: Familj (Family) 👨‍👩‍👧‍👦
    // ===========================================
    "9-1": { letters: ["F", "A", "R"], words: ["FAR"], validWords: ["FAR"] },
    "9-2": { letters: ["M", "O", "R"], words: ["MOR", "ROM"], validWords: ["MOR", "ROM"] },
    "9-3": { letters: ["B", "R", "O", "R"], words: ["BROR"], validWords: ["BROR"] },
    "9-4": { letters: ["S", "Y", "S", "T", "E", "R"], words: ["SYSTER", "SER", "TYR"], validWords: ["SYSTER", "SER", "TYR"] },
    "9-5": { letters: ["F", "A", "M", "I", "L", "J"], words: ["FAMILJ", "FIL", "MIL"], validWords: ["FAMILJ", "FIL", "MIL"] },
    "9-6": { letters: ["M", "O", "R", "F", "A", "R"], words: ["MORFAR", "FAR", "MOR", "ROM"], validWords: ["MORFAR", "FAR", "MOR", "ROM"] },
    "9-7": { letters: ["F", "A", "R", "M", "O", "R"], words: ["FARMOR", "FAR", "MOR", "ROM"], validWords: ["FARMOR", "FAR", "MOR", "ROM"] },
    "9-8": { letters: ["K", "U", "S", "I", "N"], words: ["KUSIN", "SIN"], validWords: ["KUSIN", "SIN"] },
    "9-9": { letters: ["D", "O", "T", "T", "E", "R"], words: ["DOTTER", "ROTE", "REDO"], validWords: ["DOTTER", "ROTE", "REDO"] },
    "9-10": { letters: ["B", "R", "O", "D", "E", "R"], words: ["BRODER", "RODER", "BORD", "BRO"], validWords: ["BRODER", "RODER", "BORD", "BRO"] },

    // ===========================================
    // CHAPTER 10: Skola (School) 📚
    // ===========================================
    "10-1": { letters: ["E", "L", "E", "V"], words: ["ELEV", "LEV"], validWords: ["ELEV", "LEV"] },
    "10-2": { letters: ["L", "Ä", "R", "A", "R", "E"], words: ["LÄRARE", "LÄRA", "LÄR"], validWords: ["LÄRARE", "LÄRA", "LÄR"] },
    "10-3": { letters: ["S", "K", "O", "L", "A", "N"], words: ["SKOLAN", "SKOLA", "SOL", "SKO"], validWords: ["SKOLAN", "SKOLA", "SOL", "SKO"] },
    "10-4": { letters: ["K", "L", "A", "S", "S"], words: ["KLASS", "LASS"], validWords: ["KLASS", "LASS"] },
    "10-5": { letters: ["P", "E", "N", "N", "A"], words: ["PENNA", "PEN"], validWords: ["PENNA", "PEN"] },
    "10-6": { letters: ["R", "A", "D", "E", "R", "G", "U", "M", "M", "I"], words: ["RADERGUMMI", "GUMMI", "GUDAR", "RADER"], validWords: ["RADERGUMMI", "GUMMI", "GUDAR", "RADER"] },
    "10-7": { letters: ["S", "U", "D", "D"], words: ["SUDD", "DUS"], validWords: ["SUDD", "DUS"] },
    "10-8": { letters: ["L", "I", "N", "J", "A", "L"], words: ["LINJAL", "LINA", "LAN"], validWords: ["LINJAL", "LINA", "LAN"] },
    "10-9": { letters: ["L", "Ä", "X", "A"], words: ["LÄXA", "LÄX"], validWords: ["LÄXA", "LÄX"] },
    "10-10": { letters: ["P", "R", "O", "V"], words: ["PROV"], validWords: ["PROV"] }
};
