// ========================================
//  SWEDISH WORD CONNECT DATA
// ========================================

// --- THEMED WORLDS METADATA ---
const WC_THEMES = [
    {
        id: 'food',
        name: 'Mat & Dryck / الطعام والشراب',
        icon: '🍎',
        background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)',
        accent: '#e11d48'
    },
    {
        id: 'nature',
        name: 'Naturen / الطبيعة',
        icon: '🌲',
        background: 'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)',
        accent: '#059669'
    },
    {
        id: 'travel',
        name: 'Resor / السفر',
        icon: '✈️',
        background: 'linear-gradient(to top, #4481eb 0%, #04befe 100%)',
        accent: '#2563eb'
    },
    {
        id: 'daily',
        name: 'Vardag / الحياة اليومية',
        icon: '🏠',
        background: 'linear-gradient(to right, #fa709a 0%, #fee140 100%)',
        accent: '#d97706'
    },
    {
        id: 'health',
        name: 'Hälsa / الصحة',
        icon: '❤️',
        background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
        accent: '#ef4444'
    },
    {
        id: 'work',
        name: 'Arbete / العمل',
        icon: '💼',
        background: 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)',
        accent: '#2563eb'
    },
    {
        id: 'education',
        name: 'Utbildning / التعليم',
        icon: '🎓',
        background: 'linear-gradient(to top, #c471f5 0%, #fa71cd 100%)',
        accent: '#7c3aed'
    },
    {
        id: 'transport',
        name: 'Transport / المواصلات',
        icon: '🚌',
        background: 'linear-gradient(to right, #f6d365 0%, #fda085 100%)',
        accent: '#f59e0b'
    },
    {
        id: 'law',
        name: 'Lag & Rätt / القانون',
        icon: '⚖️',
        background: 'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)',
        accent: '#4b5563'
    },
    {
        id: 'islam',
        name: 'Islam / الإسلام',
        icon: '☪️',
        background: 'linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)',
        accent: '#10b981'
    }
];

// Helper to get theme for a chapter
function getThemeForChapter(chapter) {
    // Cycle through themes: 1->Food, 2->Nature, 3->Travel, 4->Daily, 5->Food...
    const index = (chapter - 1) % WC_THEMES.length;
    return WC_THEMES[index];
}

// ============================================
// WORD CONNECT - 100 STATIC LEVELS
// ============================================

const WC_PREDEFINED_LEVELS = {
    // ===========================================
    // CHAPTER 1
    // ===========================================
    "1-1": {"letters":["L","S","Å","K"],"words":["SKÅL","KÅL"],"validWords":["SKÅL","KÅL"]},
    "1-2": {"letters":["F","I","S","K"],"words":["FISK","SIK"],"validWords":["FISK","SIK"]},
    "1-3": {"letters":["Ö","R","G","T"],"words":["GRÖT","ÖRT"],"validWords":["GRÖT","ÖRT"]},
    "1-4": {"letters":["L","Ö","J","M","K"],"words":["MJÖLK","MJÖL","LÖK"],"validWords":["MJÖLK","MJÖL","LÖK"]},
    "1-5": {"letters":["T","O","R","S","K"],"words":["TORSK","OST","KOR"],"validWords":["TORSK","OST","KOR"]},
    "1-6": {"letters":["B","E","Ä","R","N"],"words":["BÄREN","BÄR","BEN"],"validWords":["BÄREN","BÄR","BEN"]},
    "1-7": {"letters":["S","A","F","T"],"words":["SAFT","FAT","FAST","FAS"],"validWords":["SAFT","FAT","FAST","FAS"]},
    "1-8": {"letters":["Ä","T","E","R"],"words":["ÄTER","ÄRT","TRÄ","TÄR"],"validWords":["ÄTER","ÄRT","TRÄ","TÄR"]},
    "1-9": {"letters":["K","O","R","A","K"],"words":["KAKOR","KAKA","KOK"],"validWords":["KAKOR","KAKA","KOK"]},
    "1-10": {"letters":["Ö","R","G","Å","M","S","S"],"words":["SMÖRGÅS","SMÖR","GRÖT","GÅS","RÅG"],"validWords":["SMÖRGÅS","SMÖR","GRÖT","GÅS","RÅG"]},
    // ===========================================
    // CHAPTER 2
    // ===========================================
    "2-1": {"letters":["S","Å","K","A"],"words":["ÅSKA","ASK"],"validWords":["ÅSKA","ASK"]},
    "2-2": {"letters":["B","E","G","R"],"words":["BERG","BER","GER"],"validWords":["BERG","BER","GER"]},
    "2-3": {"letters":["N","N","Ö","R"],"words":["RÖNN","ÖRN"],"validWords":["RÖNN","ÖRN"]},
    "2-4": {"letters":["S","V","L","A","A"],"words":["SVALA","SVAL","VAL"],"validWords":["SVALA","SVAL","VAL"]},
    "2-5": {"letters":["D","N","I","V"],"words":["VIND","VID","VIN","DIN"],"validWords":["VIND","VID","VIN","DIN"]},
    "2-6": {"letters":["M","Y","R","R","O"],"words":["MYROR","MYRA","ROM"],"validWords":["MYROR","MYRA","ROM"]},
    "2-7": {"letters":["H","V","A","Ö","L"],"words":["HALVÖ","HAV","LÖV","LAV"],"validWords":["HALVÖ","HAV","LÖV","LAV"]},
    "2-8": {"letters":["R","N","E","G"],"words":["REGN","REN","GREN","GEN"],"validWords":["REGN","REN","GREN","GEN"]},
    "2-9": {"letters":["G","O","K","S"],"words":["SKOG","SKO","KO","OS"],"validWords":["SKOG","SKO","KO","OS"]},
    "2-10": {"letters":["B","K","J","Ö","R"],"words":["BJÖRK","RÖK","BÖR","KÖR"],"validWords":["BJÖRK","RÖK","BÖR","KÖR"]},
    // ===========================================
    // CHAPTER 3
    // ===========================================
    "3-1": {"letters":["R","S","E","A"],"words":["RESA","SER"],"validWords":["RESA","SER"]},
    "3-2": {"letters":["B","I","L","A"],"words":["BILA","BIL"],"validWords":["BILA","BIL"]},
    "3-3": {"letters":["D","L","A","N"],"words":["LAND","DAL"],"validWords":["LAND","DAL"]},
    "3-4": {"letters":["N","A","K","T","O"],"words":["KANOT","TANK","KANT"],"validWords":["KANOT","TANK","KANT"]},
    "3-5": {"letters":["I","V","A","R","D"],"words":["DRIVA","VIDA","RIVA"],"validWords":["DRIVA","VIDA","RIVA"]},
    "3-6": {"letters":["K","S","G","O","S"],"words":["SKOGS","SKOG","KOGG"],"validWords":["SKOGS","SKOG","KOGG"]},
    "3-7": {"letters":["S","O","R","T","R","E"],"words":["SORTER","RESOR","ORTER","STORA"],"validWords":["SORTER","RESOR","ORTER","STORA"]},
    "3-8": {"letters":["R","S","E","G","L","A"],"words":["SEGLAR","REGLA","LAGER","ALGER"],"validWords":["SEGLAR","REGLA","LAGER","ALGER"]},
    "3-9": {"letters":["P","R","T","O","S","E"],"words":["POSTER","SPORT","ORTER","ROPET"],"validWords":["POSTER","SPORT","ORTER","ROPET"]},
    "3-10": {"letters":["N","K","A","S","E","T","P"],"words":["KAPTENS","KAPTEN","PAKET","SPETA","SKENA"],"validWords":["KAPTENS","KAPTEN","PAKET","SPETA","SKENA"]},
    // ===========================================
    // CHAPTER 4
    // ===========================================
    "4-1": {"letters":["V","Ä","G","G"],"words":["VÄGG","ÄGG"],"validWords":["VÄGG","ÄGG"]},
    "4-2": {"letters":["B","O","D","R"],"words":["BORD","ORD"],"validWords":["BORD","ORD"]},
    "4-3": {"letters":["K","V","L","Ä","L"],"words":["KVÄLL","VÄL","ÄLV"],"validWords":["KVÄLL","VÄL","ÄLV"]},
    "4-4": {"letters":["T","E","T","N","A"],"words":["TENTA","NATT","ETT"],"validWords":["TENTA","NATT","ETT"]},
    "4-5": {"letters":["G","E","N","O","M"],"words":["GENOM","GEM","MEN"],"validWords":["GENOM","GEM","MEN"]},
    "4-6": {"letters":["O","T","A","K","R"],"words":["TORKA","TAK","KAR"],"validWords":["TORKA","TAK","KAR"]},
    "4-7": {"letters":["N","R","G","D","I","A"],"words":["GARDIN","GRIND","DAG","RINGA"],"validWords":["GARDIN","GRIND","DAG","RINGA"]},
    "4-8": {"letters":["L","A","A","N","T"],"words":["ALTAN","GATA","TALANG","ANA"],"validWords":["ALTAN","GATA","TALANG","ANA"]},
    "4-9": {"letters":["S","G","P","E","E","L"],"words":["SPEGEL","SPEL","SE","SEG"],"validWords":["SPEGEL","SPEL","SE","SEG"]},
    "4-10": {"letters":["E","R","F","Ö","S","N","T"],"words":["FÖNSTER","FEST","FÖR","FÖRE","RÖST"],"validWords":["FÖNSTER","FEST","FÖR","FÖRE","RÖST"]},
    // ===========================================
    // CHAPTER 5
    // ===========================================
    "5-1": {"letters":["A","T","N","D"],"words":["TAND","DNA"],"validWords":["TAND","DNA"]},
    "5-2": {"letters":["R","M","A","T"],"words":["TARM","ARM"],"validWords":["TARM","ARM"]},
    "5-3": {"letters":["P","U","L","S"],"words":["PULS","LUS"],"validWords":["PULS","LUS"]},
    "5-4": {"letters":["H","Ä","A","L","S"],"words":["HÄLSA","HÄL","HALS"],"validWords":["HÄLSA","HÄL","HALS"]},
    "5-5": {"letters":["E","G","A","M"],"words":["MAGE","MAG","GEM"],"validWords":["MAGE","MAG","GEM"]},
    "5-6": {"letters":["E","B","R","E","F"],"words":["FEBER","BRE","BER"],"validWords":["FEBER","BRE","BER"]},
    "5-7": {"letters":["A","D","V","R","G","I"],"words":["GRAVID","GRAV","GAV","VAD"],"validWords":["GRAVID","GRAV","GAV","VAD"]},
    "5-8": {"letters":["A","D","L","H","N","D","E"],"words":["HANDLED","HAND","ANDE","LED"],"validWords":["HANDLED","HAND","ANDE","LED"]},
    "5-9": {"letters":["R","E","V","E","L"],"words":["LEVER","LEVE","REV"],"validWords":["LEVER","LEVE","REV"]},
    "5-10": {"letters":["K","U","J","S"],"words":["SJUK","SJU"],"validWords":["SJUK","SJU"]},
    // ===========================================
    // CHAPTER 6
    // ===========================================
    "6-1": {"letters":["L","Ä","R","A"],"words":["LÄRA","LÄR"],"validWords":["LÄRA","LÄR"]},
    "6-2": {"letters":["L","Ä","X","A"],"words":["LÄXA","LÄS","ÄXA"],"validWords":["LÄXA","LÄS","ÄXA"]},
    "6-3": {"letters":["E","S","T","T"],"words":["TEST","SET"],"validWords":["TEST","SET"]},
    "6-4": {"letters":["E","N","M","Ä"],"words":["ÄMNE","ÄMN","MEN"],"validWords":["ÄMNE","ÄMN","MEN"]},
    "6-5": {"letters":["I","V","S","R","K"],"words":["SKRIV","RIV","VIK"],"validWords":["SKRIV","RIV","VIK"]},
    "6-6": {"letters":["M","Ö","R","E","B"],"words":["BERÖM","BÖR","MÖR"],"validWords":["BERÖM","BÖR","MÖR"]},
    "6-7": {"letters":["K","O","O","N","R","T"],"words":["KONTOR","KORT","TOK","ORT"],"validWords":["KONTOR","KORT","TOK","ORT"]},
    "6-8": {"letters":["C","O","L","K","B"],"words":["BLOCK","BOK"],"validWords":["BLOCK","BOK"]},
    "6-9": {"letters":["D","U","I","T","S","E"],"words":["STUDIE","TID","UT","IDÉ"],"validWords":["STUDIE","TID","UT","IDÉ"]},
    "6-10": {"letters":["K","R","G","Y","E","T","V"],"words":["VERKTYG","VERK","YRKE","TYP","TYG"],"validWords":["VERKTYG","VERK","YRKE","TYP","TYG"]},
    // ===========================================
    // CHAPTER 7
    // ===========================================
    "7-1": {"letters":["S","I","R","P"],"words":["PRIS"],"validWords":["PRIS"]},
    "7-2": {"letters":["R","A","A","V"],"words":["VARA","VAR"],"validWords":["VARA","VAR"]},
    "7-3": {"letters":["E","D","O","M"],"words":["MODE","MED"],"validWords":["MODE","MED"]},
    "7-4": {"letters":["A","G","U","L","F"],"words":["FLUGA"],"validWords":["FLUGA"]},
    "7-5": {"letters":["M","Ä","R","E","K"],"words":["MÄRKE","ÄRM"],"validWords":["MÄRKE","ÄRM"]},
    "7-6": {"letters":["E","A","L","G","R"],"words":["LAGER","REA"],"validWords":["LAGER","REA"]},
    "7-7": {"letters":["A","K","R","O","S","T"],"words":["KOSTAR","KORT","SKOR","STOR"],"validWords":["KOSTAR","KORT","SKOR","STOR"]},
    "7-8": {"letters":["D","E","M","O","R","N"],"words":["MODERN","MODE","REN","MEN"],"validWords":["MODERN","MODE","REN","MEN"]},
    "7-9": {"letters":["O","R","E","A","G","N"],"words":["ORANGE","REA","REN","NOG"],"validWords":["ORANGE","REA","REN","NOG"]},
    "7-10": {"letters":["O","J","R","K","S","A","T"],"words":["SKJORTA","SKOR","STOR","KOSTAR","KORT"],"validWords":["SKJORTA","SKOR","STOR","KOSTAR","KORT"]},
    // ===========================================
    // CHAPTER 8
    // ===========================================
    "8-1": {"letters":["A","S","E","R"],"words":["RESA","REA"],"validWords":["RESA","REA"]},
    "8-2": {"letters":["G","A","V","N"],"words":["VAGN","VAN"],"validWords":["VAGN","VAN"]},
    "8-3": {"letters":["S","P","Å","R"],"words":["SPÅR","SÅR"],"validWords":["SPÅR","SÅR"]},
    "8-4": {"letters":["T","S","A","M"],"words":["MAST","MAT","SAM"],"validWords":["MAST","MAT","SAM"]},
    "8-5": {"letters":["N","M","A","H"],"words":["HAMN","HAN","MAN"],"validWords":["HAMN","HAN","MAN"]},
    "8-6": {"letters":["O","N","T","A","K"],"words":["KANOT","KANT","NOT"],"validWords":["KANOT","KANT","NOT"]},
    "8-7": {"letters":["O","O","T","R","M"],"words":["MOTOR","MOT","ORM","TOM"],"validWords":["MOTOR","MOT","ORM","TOM"]},
    "8-8": {"letters":["S","Ä","V","T","R","E"],"words":["VÄSTER","VÄST","VET","ÄRT"],"validWords":["VÄSTER","VÄST","VET","ÄRT"]},
    "8-9": {"letters":["O","S","A","M","R","T"],"words":["MATROS","MAT","MAST","MOT","MOR"],"validWords":["MATROS","MAT","MAST","MOT","MOR"]},
    "8-10": {"letters":["S","A","T","O","M","K","N"],"words":["ANKOMST","NOT","NATO","NOTA","AKT"],"validWords":["ANKOMST","NOT","NATO","NOTA","AKT"]},
    // ===========================================
    // CHAPTER 9
    // ===========================================
    "9-1": {"letters":["G","L","A"],"words":["LAG","ALG","GAL"],"validWords":["LAG","ALG","GAL"]},
    "9-2": {"letters":["M","O","D"],"words":["DOM","MOD"],"validWords":["DOM","MOD"]},
    "9-3": {"letters":["R","Ä","T","T"],"words":["RÄTT","TRÄ","ÄTT"],"validWords":["RÄTT","TRÄ","ÄTT"]},
    "9-4": {"letters":["T","R","B","O","T"],"words":["BROTT","BOT","BRO"],"validWords":["BROTT","BOT","BRO"]},
    "9-5": {"letters":["A","T","T","S"],"words":["STAT","SATT","ATT"],"validWords":["STAT","SATT","ATT"]},
    "9-6": {"letters":["L","A","A","G","R"],"words":["LAGAR","LAG","LAGA"],"validWords":["LAGAR","LAG","LAGA"]},
    "9-7": {"letters":["A","T","K","M"],"words":["MAKT","MAT","AKT","TAM"],"validWords":["MAKT","MAT","AKT","TAM"]},
    "9-8": {"letters":["D","R","A","O","E","M"],"words":["DOMARE","DOM","DOMAR","ORD"],"validWords":["DOMARE","DOM","DOMAR","ORD"]},
    "9-9": {"letters":["S","F","T","R","F","A"],"words":["STRAFF","STAFF","FAST","SAFT"],"validWords":["STRAFF","STAFF","FAST","SAFT"]},
    "9-10": {"letters":["A","R","V","E","T"],"words":["ARVET","ARV","VAR","ÄRTA"],"validWords":["ARVET","ARV","VAR","ÄRTA"]},
    // ===========================================
    // CHAPTER 10
    // ===========================================
    "10-1": {"letters":["O","R","T"],"words":["TRO","ROT","ORT"],"validWords":["TRO","ROT","ORT"]},
    "10-2": {"letters":["F","E","D","R"],"words":["FRED","RED"],"validWords":["FRED","RED"]},
    "10-3": {"letters":["I","F","D","R"],"words":["FRID","FRI"],"validWords":["FRID","FRI"]},
    "10-4": {"letters":["L","A","A","H","L"],"words":["ALLAH","HALL","ALLA"],"validWords":["ALLAH","HALL","ALLA"]},
    "10-5": {"letters":["T","R","O","N"],"words":["TRON","TRO","TORN","ROT"],"validWords":["TRON","TRO","TORN","ROT"]},
    "10-6": {"letters":["B","R","E","D","E"],"words":["BEDER","BED","BER","RED"],"validWords":["BEDER","BED","BER","RED"]},
    "10-7": {"letters":["M","A","L","S","I"],"words":["ISLAM","SAL","SAM","SIL"],"validWords":["ISLAM","SAL","SAM","SIL"]},
    "10-8": {"letters":["M","N","O","S","K","É"],"words":["MOSKÉN","MOSKÉ","SON","MEN"],"validWords":["MOSKÉN","MOSKÉ","SON","MEN"]},
    "10-9": {"letters":["E","M","A","N"],"words":["AMEN","MAN","MEN","ENA"],"validWords":["AMEN","MAN","MEN","ENA"]},
    "10-10": {"letters":["F","T","R","E","O","P"],"words":["PROFET","TRO","PRO","PORT"],"validWords":["PROFET","TRO","PRO","PORT"]},
};

// --- CENTRALIZED DICTIONARY ---
const WC_DICTIONARY = [
    {
        "w": "ABER",
        "t": "عقبة",
        "s": "ett litet aber",
        "st": "عقبة بسيطة"
    },
    {
        "w": "ÅDER",
        "t": "عرق",
        "s": "Blodet rinner i ådrorna.",
        "st": "الدم في العروق."
    },
    {
        "w": "ÅDRA",
        "t": "نَزْعَة, مَيِّزَة, مَوهِبَة",
        "s": "hon har en poetisk ådra",
        "st": "لديها موهبة شعريّة"
    },
    {
        "w": "ADVOKAT",
        "t": "محامي",
        "s": "Advokaten försvarar sin klient.",
        "st": "المحامي يدافع عن موكله."
    },
    {
        "w": "ÄGA",
        "t": "يملك",
        "s": "Att äga.",
        "st": "الامتلاك."
    },
    {
        "w": "ÄGG",
        "t": "بيض",
        "s": "Hönan lägger ett ägg varje dag.",
        "st": "الدجاجة تبيض بيضة كل يوم."
    },
    {
        "w": "ÄGGA",
        "t": "يحرض",
        "s": "Han äggade upp stämningen.",
        "st": "يحرض على الشجار."
    },
    {
        "w": "AKA",
        "t": "تُعرف بـ",
        "s": "Hon är känd, aka stjärnan.",
        "st": "هي مشهورة، وتُعرف بالنجمة."
    },
    {
        "w": "AKT",
        "t": "وثيقة / احترام",
        "s": "Ta akt om varningen.",
        "st": "انتبه للتحذير."
    },
    {
        "w": "AKTA",
        "t": "يحذر",
        "s": "Akta dig för hunden!",
        "st": "احذر من الكلب!"
    },
    {
        "w": "ÅKTA",
        "t": "حقيقي",
        "s": "Det är äkta guld.",
        "st": "ذهب حقيقي."
    },
    {
        "w": "ÄKTA",
        "t": "حقيقي/زوجي",
        "s": "Det är äkta vara.",
        "st": "زوجان حقيقيان."
    },
    {
        "w": "AKUT",
        "t": "طارئ",
        "s": "akuta sjukdomar akuta problem akuta behov",
        "st": "أمراض طارئة مشكلات طارئة حاجة طارئة"
    },
    {
        "w": "AL",
        "t": "شجرة الحور",
        "s": "Alen växer vid vattnet.",
        "st": "شجرة الحور تنمو هنا."
    },
    {
        "w": "ÅLDRAS",
        "t": "يتقدم في العمر",
        "s": "Alla åldras.",
        "st": "الجميع يتقدم في العمر."
    },
    {
        "w": "ALG",
        "t": "طحالب",
        "s": "Det växer alger i sjön.",
        "st": "تنمو الطحالب في البحيرة."
    },
    {
        "w": "ÄLG",
        "t": "موس",
        "s": "Skogens konung är älgen.",
        "st": "ملك الغابة هو الموس."
    },
    {
        "w": "ÄLGA",
        "t": "يمشي بخطوات واسعة",
        "s": "Han älgade fram i skogen.",
        "st": "يمشي بسرعة."
    },
    {
        "w": "ALGER",
        "t": "طحالب",
        "s": "Det finns gröna alger i vattnet.",
        "st": "توجد طحالب خضراء في الماء."
    },
    {
        "w": "ALLA",
        "t": "الجميع",
        "s": "Alla människor är lika.",
        "st": "جميع الناس سواسية."
    },
    {
        "w": "ALLAH",
        "t": "الله",
        "s": "Det finns ingen gud utom Allah.",
        "st": "لا إله إلا الله."
    },
    {
        "w": "ALLAS",
        "t": "للجميع",
        "s": "Det är allas ansvar.",
        "st": "إنها مسؤولية الجميع."
    },
    {
        "w": "ALTAN",
        "t": "شرفة",
        "s": "Vi dricker kaffe på altanen.",
        "st": "نشرب القهوة في الشرفة."
    },
    {
        "w": "ÄLV",
        "t": "نهر",
        "s": "En bred älv rinner genom staden.",
        "st": "نهر عريض يجري عبر المدينة."
    },
    {
        "w": "ÄLVA",
        "t": "جنية/نهر",
        "s": "Älvorna dansar i dimman.",
        "st": "الجنية ترقص."
    },
    {
        "w": "AMEN",
        "t": "آمين",
        "s": "Vi säger amen efter bönen.",
        "st": "نقول آمين بعد الصلاة."
    },
    {
        "w": "ÄMN",
        "t": "مادة",
        "s": "Ett farligt ämne.",
        "st": "مادة خطرة."
    },
    {
        "w": "ÄMNE",
        "t": "مادة دراسية / موضوع",
        "s": "Matematik är mitt favoritämne.",
        "st": "الرياضيات هي مادتي المفضلة."
    },
    {
        "w": "AMS",
        "t": "مجلس سوق العمل",
        "s": "AMS - bidrag",
        "st": "منحة مجلس سوق العمل"
    },
    {
        "w": "ANA",
        "t": "يشك / يظن",
        "s": "Jag anar att något är fel.",
        "st": "أظن أن هناك خطأ ما."
    },
    {
        "w": "ANANAS",
        "t": "أناناس",
        "s": "Ananas är en tropisk frukt.",
        "st": "الأناناس فاكهة استوائية."
    },
    {
        "w": "AND",
        "t": "بطة",
        "s": "En and simmar i dammen.",
        "st": "بطة تسبح في البركة."
    },
    {
        "w": "ANDA",
        "t": "روح",
        "s": "Vi arbetar i god anda tillsammans.",
        "st": "نحن نعمل بروح طيبة معاً."
    },
    {
        "w": "ÄNDA",
        "t": "نهاية/مؤخرة",
        "s": "Slutet på vägen.",
        "st": "نهاية الطريق."
    },
    {
        "w": "ANDAS",
        "t": "يتنفس",
        "s": "Kom ihåg att andas in djupt.",
        "st": "تذكر أن تتنفس بعمق."
    },
    {
        "w": "ANDE",
        "t": "روح",
        "s": "Anden i flaskan.",
        "st": "الجني في الزجاجة."
    },
    {
        "w": "ÄNDER",
        "t": "بط",
        "s": "Barnen gillar att mata änder i parken.",
        "st": "يحب الأطفال إطعام البط في الحديقة."
    },
    {
        "w": "ANDRUM",
        "t": "فترة",
        "s": "ett ögonblicks andrum",
        "st": "لحظة"
    },
    {
        "w": "ÄNG",
        "t": "مرج",
        "s": "Vi hade picknick på en blommig äng.",
        "st": "قمنا بنزهة في مرج مليء بالزهور."
    },
    {
        "w": "ÅNGA",
        "t": "بخار",
        "s": "Vatten blir till ånga.",
        "st": "بخار الماء."
    },
    {
        "w": "ÄNGEL",
        "t": "ملاك",
        "s": "Du är en ängel.",
        "st": "أنت ملاك."
    },
    {
        "w": "ANGRE",
        "t": "يندم",
        "s": "Du kommer att angre dig.",
        "st": "ستندم على ذلك."
    },
    {
        "w": "ÄNKA",
        "t": "أرملة",
        "s": "Hon är änka.",
        "st": "هي أرملة."
    },
    {
        "w": "ANKOMST",
        "t": "وصول",
        "s": "Ankomst klockan tio.",
        "st": "الوصول في الساعة العاشرة."
    },
    {
        "w": "ANKOR",
        "t": "بط",
        "s": "Ankor.",
        "st": "بط."
    },
    {
        "w": "ANSTÅ",
        "t": "يؤجل, يؤخر",
        "s": "det får anstå tills vidare",
        "st": "أجل حتى إشعار آخر"
    },
    {
        "w": "ANSTÅR",
        "t": "يُلائم, يُليق, يناسب",
        "s": "som det anstår en ledare",
        "st": "بشكل يليق بقائد"
    },
    {
        "w": "APOTEK",
        "t": "صيدلية",
        "s": "Apoteket.",
        "st": "الصيدلية."
    },
    {
        "w": "ÄPPLE",
        "t": "تفاحة",
        "s": "Ett äpple om dagen.",
        "st": "تفاحة في اليوم."
    },
    {
        "w": "APRIKOS",
        "t": "مشمش",
        "s": "Torkad aprikos är godis.",
        "st": "المشمش المجفف مثل الحلوى."
    },
    {
        "w": "AR",
        "t": "آر (وحدة مساحة)",
        "s": "Tomten är på 10 ar.",
        "st": "مساحة الأرض."
    },
    {
        "w": "ÅR",
        "t": "سنة",
        "s": "Gott nytt år!",
        "st": "كل سنة وأنت بخير."
    },
    {
        "w": "ÄR",
        "t": "يكون",
        "s": "Jag är glad.",
        "st": "أنا سعيد."
    },
    {
        "w": "ÅRA",
        "t": "مجاديف",
        "s": "Vi tappade en åra i sjön.",
        "st": "أسقطنا مجدافاً في البحيرة."
    },
    {
        "w": "ARAK",
        "t": "عرق",
        "s": "Arak är en stark dryck.",
        "st": "العرق مشروب قوي."
    },
    {
        "w": "ARG",
        "t": "غاضب",
        "s": "Han var mycket arg på sin bror.",
        "st": "كان غاضباً جداً من أخيه."
    },
    {
        "w": "ARK",
        "t": "سفينة / ورقة",
        "s": "Noaks ark räddade djuren.",
        "st": "سفينة نوح أنقذت الحيوانات."
    },
    {
        "w": "ARKIV",
        "t": "أرشيف",
        "s": "Dokumenten finns i vårt arkiv.",
        "st": "الوثائق موجودة في أرشيفنا."
    },
    {
        "w": "ARM",
        "t": "ذراع",
        "s": "Han bröt sin arm.",
        "st": "كسر ذراعه."
    },
    {
        "w": "ÄRM",
        "t": "كم",
        "s": "Ärmen är för lång.",
        "st": "الكم طويل جداً."
    },
    {
        "w": "ÄRRA",
        "t": "ندبة",
        "s": "Han har ett ärra på kinden.",
        "st": "لديه ندبة."
    },
    {
        "w": "ÄRRIG",
        "t": "مندوب",
        "s": "Ärrig.",
        "st": "مندوب."
    },
    {
        "w": "ART",
        "t": "نوع",
        "s": "Detta är en sällsynt art.",
        "st": "هذا نوع نادر."
    },
    {
        "w": "ÄRT",
        "t": "بازلاء",
        "s": "Ärter är gröna.",
        "st": "البازلاء خضراء."
    },
    {
        "w": "ARTA",
        "t": "تتطور",
        "s": "Det verkar arta sig väl.",
        "st": "يبدو أن الأمور تتطور بشكل جيد."
    },
    {
        "w": "ÄRTA",
        "t": "يغيظ",
        "s": "Sluta ärta honom.",
        "st": "توقف عن إغاظته."
    },
    {
        "w": "ÄRTER",
        "t": "بازلاء",
        "s": "Gröna ärter är gott.",
        "st": "البازلاء الخضراء لذيذة."
    },
    {
        "w": "ÄRTOR",
        "t": "بازلاء",
        "s": "Gröna ärtor.",
        "st": "بازلاء خضراء."
    },
    {
        "w": "ARV",
        "t": "إرث",
        "s": "Hon fick ett stort arv.",
        "st": "حصلت على إرث كبير."
    },
    {
        "w": "ARVET",
        "t": "الإرث",
        "s": "Arvet fördelades enligt lagen.",
        "st": "تم توزيع الإرث حسب القانون."
    },
    {
        "w": "AS",
        "t": "جيفة",
        "s": "Det luktar as.",
        "st": "رائحة كريهة."
    },
    {
        "w": "ASK",
        "t": "شجرة الدردار / علبة",
        "s": "En liten ask tändstickor låg på bordet.",
        "st": "كانت هناك علبة كبريت صغيرة على الطاولة."
    },
    {
        "w": "ÅSKA",
        "t": "رعد",
        "s": "Vi hörde åska och såg blixtar.",
        "st": "سمعنا الرعد ورأينا البرق."
    },
    {
        "w": "ÅSNA",
        "t": "حمار",
        "s": "Åsnan är envis.",
        "st": "الحمار عنيد."
    },
    {
        "w": "ASP",
        "t": "حور رجراج",
        "s": "Löven på en asp darrar.",
        "st": "أوراق الحور الرجراج ترتجف."
    },
    {
        "w": "ASS",
        "t": "رسالة مُسجلة",
        "s": "rek och ass",
        "st": "مُسجل ومضمون"
    },
    {
        "w": "ÅT",
        "t": "أكل/تجاه",
        "s": "Han åt ett äpple.",
        "st": "أكل الطعام."
    },
    {
        "w": "ÄTA",
        "t": "يأكل",
        "s": "Vi ska äta middag nu.",
        "st": "نحن نأكل العشاء الآن."
    },
    {
        "w": "ÄTER",
        "t": "يأكل",
        "s": "Han äter en stor smörgås nu.",
        "st": "هو يأكل شطيرة كبيرة الآن."
    },
    {
        "w": "ATP",
        "t": "التقاعد الإضافي العام",
        "s": "ATP - poäng",
        "st": "اسم"
    },
    {
        "w": "ATT",
        "t": "أن",
        "s": "Det är svårt att förstå.",
        "st": "من الصعب أن نفهم."
    },
    {
        "w": "ÄTT",
        "t": "عائلة / سلالة",
        "s": "En gammal kunglig ätt.",
        "st": "سلالة ملكية قديمة."
    },
    {
        "w": "ÄTTA",
        "t": "سلالة/رقم ثمانية",
        "s": "Han tillhör en kunglig ätta.",
        "st": "من سلالة ملكية."
    },
    {
        "w": "AV",
        "t": "من / عن",
        "s": "En bok av mig.",
        "st": "كتاب من تأليفي."
    },
    {
        "w": "ÄVENTYR",
        "t": "مغامرة",
        "s": "Livet är ett äventyr.",
        "st": "الحياة مغامرة."
    },
    {
        "w": "AVOG",
        "t": "عدواني",
        "s": "en avog inställning till allt nytt",
        "st": "موقف عدواني تجاه كل جديد"
    },
    {
        "w": "AVTAL",
        "t": "اتفاقية",
        "s": "Vi skrev på ett avtal.",
        "st": "وقعنا اتفاقية."
    },
    {
        "w": "ÄXA",
        "t": "يذم / ينتقد",
        "s": "Ulla äxar sin rival.",
        "st": "أولا تنتقد منافستها."
    },
    {
        "w": "BADRUM",
        "t": "حمام",
        "s": "Jag tvättar mig i badrummet.",
        "st": "أغسل وجهي في الحمام."
    },
    {
        "w": "BAK",
        "t": "في الخلف",
        "s": "de satt längst bak i salen",
        "st": "جلسوا في آخر القاعة"
    },
    {
        "w": "BÅL",
        "t": "جذع",
        "s": "Han har en stark bål.",
        "st": "لديه جذع قوي."
    },
    {
        "w": "BANA",
        "t": "مسار",
        "s": "Följ din egen bana.",
        "st": "اتبع مسارك الخاص."
    },
    {
        "w": "BANAN",
        "t": "موزة",
        "s": "Apor gillar att äta bananer.",
        "st": "القرود تحب أكل الموز."
    },
    {
        "w": "BANN",
        "t": "حرمان",
        "s": "Han lyste i bann.",
        "st": "لقد حرم كنسياً."
    },
    {
        "w": "BAR",
        "t": "عارٍ",
        "s": "sova under bar himmel",
        "st": "نام تحت السماء المكشوفة"
    },
    {
        "w": "BÄR",
        "t": "توت",
        "s": "Skogen är full av blå bär.",
        "st": "الغابة مليئة بالتوت الأزرق."
    },
    {
        "w": "BÄREN",
        "t": "التوت",
        "s": "Alla bären är mogna och söta.",
        "st": "جميع التوت ناضج وحلو."
    },
    {
        "w": "BARN",
        "t": "طفل",
        "s": "bli med barn passa barn",
        "st": "حملت لاحظ طفلاً"
    },
    {
        "w": "BARS",
        "t": "حُمل",
        "s": "Han bars ut på bår efter olyckan.",
        "st": "حُمل على نقالة بعد الحادث."
    },
    {
        "w": "BASAR",
        "t": "بازار",
        "s": "På en basar.",
        "st": "في بازار."
    },
    {
        "w": "BÅT",
        "t": "قارب",
        "s": "Vi har en båt på havet.",
        "st": "لدينا قارب على البحر."
    },
    {
        "w": "BÅTAR",
        "t": "قوارب",
        "s": "Vi ser många båtar.",
        "st": "نرى العديد من القوارب."
    },
    {
        "w": "BED",
        "t": "صلاة",
        "s": "Bönen är en bed till Gud.",
        "st": "الصلاة دعاء إلى الله."
    },
    {
        "w": "BEDER",
        "t": "صلوات",
        "s": "Hon gör sina beder dagligen.",
        "st": "تؤدي صلواتها يومياً."
    },
    {
        "w": "BEN",
        "t": "عظم / ساق",
        "s": "Hunden gnager på ett stort ben.",
        "st": "الكلب يقضم عظماً كبيراً."
    },
    {
        "w": "BENIG",
        "t": "نحيل",
        "s": "mager och benig",
        "st": "نحيل وهزيل"
    },
    {
        "w": "BER",
        "t": "يصلي / يطلب",
        "s": "Han ber till Gud.",
        "st": "يصلي لله."
    },
    {
        "w": "BERG",
        "t": "جبل",
        "s": "Vi besteg ett högt berg.",
        "st": "تسلقنا جبلاً عالياً."
    },
    {
        "w": "BERGET",
        "t": "الجبل",
        "s": "Vi besteg det höga berget tillsammans.",
        "st": "تسلقنا الجبل العالي معاً."
    },
    {
        "w": "BERÖM",
        "t": "مدح",
        "s": "Hon fick beröm för sitt arbete.",
        "st": "تلقت المديح على عملها."
    },
    {
        "w": "BESK",
        "t": "مُرّ",
        "s": "besk smak beska kommentarer",
        "st": "مذاق مر تعليقات مريرة"
    },
    {
        "w": "BEVIS",
        "t": "دليل",
        "s": "Det finns bevis för brottet.",
        "st": "يوجد دليل على الجريمة."
    },
    {
        "w": "BIFF",
        "t": "شريحة لحم",
        "s": "En saftig biff.",
        "st": "شريحة لحم عصارية."
    },
    {
        "w": "BIL",
        "t": "سيارة",
        "s": "Min bil är parkerad utanför huset.",
        "st": "سيارتي متوقفة خارج المنزل."
    },
    {
        "w": "BILA",
        "t": "يسافر بالسيارة",
        "s": "Vi ska bila genom hela Europa.",
        "st": "سنسافر بالسيارة عبر أوروبا كلها."
    },
    {
        "w": "BILAR",
        "t": "سيارات",
        "s": "Det finns många bilar på vägen.",
        "st": "هناك العديد من السيارات على الطريق."
    },
    {
        "w": "BILD",
        "t": "صورة",
        "s": "En fin bild på väggen.",
        "st": "صورة جميلة على الحائط."
    },
    {
        "w": "BILIST",
        "t": "سائق",
        "s": "Varje bilist måste vara uppmärksam.",
        "st": "يجب على كل سائق أن يكون منتبهاً."
    },
    {
        "w": "BILJETT",
        "t": "تذكرة",
        "s": "Jag har köpt en biljett.",
        "st": "اشتريت تذكرة."
    },
    {
        "w": "BJÖRK",
        "t": "شجرة البتولا",
        "s": "Björken har en vit stam.",
        "st": "شجرة البتولا لها جذع أبيض."
    },
    {
        "w": "BJÖRN",
        "t": "دب",
        "s": "Björnen sover i idet.",
        "st": "الدب ينام في السبات."
    },
    {
        "w": "BJÖRNBÄR",
        "t": "توت العليق الأسود",
        "s": "Svarta björnbär.",
        "st": "توت عليق أسود."
    },
    {
        "w": "BLÅBÄR",
        "t": "توت أزرق",
        "s": "Vi plockar blåbär i skogen.",
        "st": "نقطف التوت الأزرق في الغابة."
    },
    {
        "w": "BLAD",
        "t": "ورقة شجر",
        "s": "Trädens blad faller på hösten.",
        "st": "ورقة الشجر خضراء."
    },
    {
        "w": "BLI",
        "t": "يصبح",
        "s": "Det kommer bli bra.",
        "st": "سأصبح طبيباً."
    },
    {
        "w": "BLOCK",
        "t": "دفتر / كتلة",
        "s": "Skriv i ditt block.",
        "st": "اكتب في دفترك."
    },
    {
        "w": "BLOD",
        "t": "دم",
        "s": "Blod ger liv åt kroppen.",
        "st": "الدم يعطي الحياة للجسم."
    },
    {
        "w": "BLODIG",
        "t": "دَمَوي",
        "s": "Biffen var blodig.",
        "st": "شريحة اللحم كانت نيئة."
    },
    {
        "w": "BOD",
        "t": "كوخ",
        "s": "Vi har en bod på gården.",
        "st": "لدينا كوخ في الفناء."
    },
    {
        "w": "BOK",
        "t": "كتاب",
        "s": "Jag läser en bok.",
        "st": "أقرأ كتاباً."
    },
    {
        "w": "BÖN",
        "t": "صلاة",
        "s": "Bönen ger ro i själen.",
        "st": "الصلاة تعطي راحة للنفس."
    },
    {
        "w": "BOR",
        "t": "يسكن",
        "s": "Vi bor i en lägenhet i stan.",
        "st": "نحن نسكن في شقة في المدينة."
    },
    {
        "w": "BÖR",
        "t": "ينبغي",
        "s": "Du bör gå nu.",
        "st": "ينبغي عليك الذهاب الآن."
    },
    {
        "w": "BORD",
        "t": "طاولة",
        "s": "Maten står färdig på bordet.",
        "st": "الطعام جاهز على الطاولة."
    },
    {
        "w": "BORT",
        "t": "بعيداً",
        "s": "Gå bort och kom aldrig tillbaka.",
        "st": "اذهب بعيداً ولا تعد أبداً."
    },
    {
        "w": "BOT",
        "t": "غرامة",
        "s": "Han fick böta tusen kronor.",
        "st": "غرّم بألف كرونة."
    },
    {
        "w": "BOTT",
        "t": "سكن",
        "s": "Jag har bott här i hela mitt liv.",
        "st": "لقد عشت هنا طوال حياتي."
    },
    {
        "w": "BRAS",
        "t": "نار",
        "s": "Vi tände en bras i öppna spisen.",
        "st": "أشعلنا ناراً في المدفأة."
    },
    {
        "w": "BRE",
        "t": "يدهن",
        "s": "Bre smör på brödet.",
        "st": "ادهن الزبدة على الخبز."
    },
    {
        "w": "BRO",
        "t": "جسر",
        "s": "En bro över floden.",
        "st": "جسر فوق النهر."
    },
    {
        "w": "BRÖD",
        "t": "خبز",
        "s": "Färskt bröd doftar gott.",
        "st": "الخبز الطازج له رائحة طيبة."
    },
    {
        "w": "BRODER",
        "t": "أخ (رسمي)",
        "s": "Han är min broder.",
        "st": "هو أخي."
    },
    {
        "w": "BROR",
        "t": "أخ",
        "s": "Min bror leker med mig.",
        "st": "أخي يلعب معي."
    },
    {
        "w": "BRÖST",
        "t": "صدر",
        "s": "mamman gav babyn bröstet",
        "st": "أرضعت الأم طفلها"
    },
    {
        "w": "BROTT",
        "t": "جريمة",
        "s": "Brott ska bestraffas.",
        "st": "الجريمة يجب معاقبتها."
    },
    {
        "w": "BRUKA",
        "t": "يفلح",
        "s": "Man måste bruka jorden för att skörda.",
        "st": "يجب فلاحة الأرض للحصول على الحصاد."
    },
    {
        "w": "BRUSA",
        "t": "يفور",
        "s": "Havet brusa.",
        "st": "البحر يهيج."
    },
    {
        "w": "BULLAR",
        "t": "كعك",
        "s": "Nygräddade bullar.",
        "st": "كعك طازج."
    },
    {
        "w": "BUR",
        "t": "قفص",
        "s": "Fågeln i sin bur.",
        "st": "الطائر في قفصه."
    },
    {
        "w": "BURAR",
        "t": "أقفاص",
        "s": "Fåglar i burar.",
        "st": "طيور في أقفاص."
    },
    {
        "w": "BUSKAR",
        "t": "شجيرات",
        "s": "Katten gömde sig i buskarna.",
        "st": "اختبأت القطة بين الشجيرات."
    },
    {
        "w": "BUSS",
        "t": "حافلة",
        "s": "Bussen är ett bra transportmedel.",
        "st": "الحافلة وسيلة نقل جيدة."
    },
    {
        "w": "BUSSAR",
        "t": "حافلات",
        "s": "Bussarna går ofta in till centrum.",
        "st": "تسير الحافلات غالباً إلى وسط المدينة."
    },
    {
        "w": "BYGG",
        "t": "بناء",
        "s": "Detta är ett stabilt bygg.",
        "st": "هذا بناء مستقر."
    },
    {
        "w": "BYGGA",
        "t": "يبني",
        "s": "Vi ska bygga ett nytt hus.",
        "st": "سنبني منزلاً جديداً."
    },
    {
        "w": "CHEF",
        "t": "مدير",
        "s": "Min chef är mycket förstående.",
        "st": "مديري متفهم جداً."
    },
    {
        "w": "CIRKUS",
        "t": "السيرك",
        "s": "Vi gick på cirkus.",
        "st": "ذهبنا إلى السيرك."
    },
    {
        "w": "CYKEL",
        "t": "دراجة",
        "s": "Det är nyttigt att cykla.",
        "st": "من المفيد ركوب الدراجة."
    },
    {
        "w": "DÅ",
        "t": "حينئذ",
        "s": "Jag var liten då.",
        "st": "كنت صغيراً حينها."
    },
    {
        "w": "DAG",
        "t": "يوم",
        "s": "Det är en vacker dag idag.",
        "st": "إنه يوم جميل اليوم."
    },
    {
        "w": "DAL",
        "t": "وادي",
        "s": "Huset ligger i en grön dal.",
        "st": "يقع المنزل في وادي أخضر."
    },
    {
        "w": "DALA",
        "t": "يهبط",
        "s": "Vi såg solen dala ner i havet.",
        "st": "رأينا الشمس تغرب في البحر."
    },
    {
        "w": "DALAR",
        "t": "وديان",
        "s": "Vi vandrade över berg och dal.",
        "st": "تجولنا عبر الجبال والوديان."
    },
    {
        "w": "DAMER",
        "t": "سيدات",
        "s": "Mina damer och herrar.",
        "st": "سيداتي وسادتي."
    },
    {
        "w": "DANS",
        "t": "رقص",
        "s": "Får jag lov till en dans?",
        "st": "هل تسمحين لي برقصة؟"
    },
    {
        "w": "DÄRFÖR",
        "t": "لأن",
        "s": "Jag är sjuk, därför stannar jag.",
        "st": "أنا مريض، لذلك سأبقى."
    },
    {
        "w": "DARR",
        "t": "اهتزاز",
        "s": "med darr på rösten",
        "st": "بصوت مهتزّ"
    },
    {
        "w": "DASK",
        "t": "صفعة",
        "s": "dask i stjärten",
        "st": "صفعة على الكِفل"
    },
    {
        "w": "DASS",
        "t": "بيت خلاء",
        "s": "gå på dass",
        "st": "ذهب إلى بيت الخلاء"
    },
    {
        "w": "DATOR",
        "t": "حاسوب",
        "s": "Jag arbetar vid min dator.",
        "st": "أعمل على حاسوبي."
    },
    {
        "w": "DATORN",
        "t": "الحاسوب",
        "s": "Datorn är ny.",
        "st": "الحاسوب جديد."
    },
    {
        "w": "DEL",
        "t": "جزء",
        "s": "En del av kakan.",
        "st": "جزء من الكعكة."
    },
    {
        "w": "DELAR",
        "t": "أجزاء",
        "s": "Delar.",
        "st": "أجزاء."
    },
    {
        "w": "DELTID",
        "t": "جزء من الوقت",
        "s": "arbeta på deltid",
        "st": "عمل عملاً جزئياً"
    },
    {
        "w": "DELVIS",
        "t": "جزئياً",
        "s": "svaret är bara delvis rätt",
        "st": "الإجابة صحيحة جزئياً فقط"
    },
    {
        "w": "DENAR",
        "t": "دينار",
        "s": "En denar.",
        "st": "دينار."
    },
    {
        "w": "DENNA",
        "t": "هذا, هذه",
        "s": "denna dag detta hus dessa böcker",
        "st": "هذا اليوم هذا البيت هذه الكتب"
    },
    {
        "w": "DERAS",
        "t": "لهم",
        "s": "Det är deras ansvar att lösa detta.",
        "st": "إنها مسؤوليتهم لحل هذا الأمر."
    },
    {
        "w": "DIGER",
        "t": "ضخم",
        "s": "en diger lunta",
        "st": "رزمة ضخمة من الأوراق"
    },
    {
        "w": "DIKE",
        "t": "خندق",
        "s": "köra i diket",
        "st": "ساق السيارة في الخندق"
    },
    {
        "w": "DIN",
        "t": "لك",
        "s": "Är detta din nya bil?",
        "st": "هل هذه سيارتك الجديدة؟"
    },
    {
        "w": "DIREKT",
        "t": "مباشر",
        "s": "direkt demokrati direkta ledningar",
        "st": "ديموقراطية مباشرة خطوط مباشرة"
    },
    {
        "w": "DJUNGEL",
        "t": "أدغال",
        "s": "Tigern bor i djungeln.",
        "st": "يعيش النمر في الأدغال."
    },
    {
        "w": "DJUREN",
        "t": "الحيوانات",
        "s": "Djuren lever i skogen.",
        "st": "الحيوانات في الغابة."
    },
    {
        "w": "DNA",
        "t": "حمض نووي",
        "s": "DNA finns i alla celler.",
        "st": "الحمض النووي موجود في كل الخلايا."
    },
    {
        "w": "DÖ",
        "t": "يموت",
        "s": "Blommor dör utan vatten.",
        "st": "الأزهار تموت بلا ماء."
    },
    {
        "w": "DOM",
        "t": "حكم",
        "s": "En rättvis dom.",
        "st": "حكم عادل."
    },
    {
        "w": "DOMAR",
        "t": "أحكام",
        "s": "Domarnas beslut är slutgiltiga.",
        "st": "قرارات القضاة نهائية."
    },
    {
        "w": "DOMARE",
        "t": "قاضي / حكم",
        "s": "Domaren är opartisk.",
        "st": "القاضي محايد."
    },
    {
        "w": "DOMS",
        "t": "حكم",
        "s": "Doms.",
        "st": "حكم."
    },
    {
        "w": "DOMSTOL",
        "t": "محكمة",
        "s": "En domstol.",
        "st": "محكمة."
    },
    {
        "w": "DOPP",
        "t": "غَطْس",
        "s": "ta ( sig ) ett dopp",
        "st": "غَطَس , سبح"
    },
    {
        "w": "DÖRR",
        "t": "باب",
        "s": "Stäng dörren, det drar kallt.",
        "st": "أغلق الباب، هناك تيار هواء بارد."
    },
    {
        "w": "DÖRRAR",
        "t": "أبواب",
        "s": "Vi håller alla dörrar öppna för dig.",
        "st": "نحن نبقي جميع الأبواب مفتوحة لك."
    },
    {
        "w": "DOTTER",
        "t": "ابنة",
        "s": "Hon är en smart dotter.",
        "st": "هي ابنة ذكية."
    },
    {
        "w": "DRAG",
        "t": "سحبة",
        "s": "Han gjorde ett smart drag i schack.",
        "st": "قام بحركة ذكية في الشطرنج."
    },
    {
        "w": "DRIVA",
        "t": "ينجرف / يدير",
        "s": "Vinden får båten att driva iväg.",
        "st": "الرياح تجعل القارب ينجرف بعيداً."
    },
    {
        "w": "DROPPAR",
        "t": "يُنَقّط",
        "s": "det droppar från taket",
        "st": "تساقطت القطرات من السقف"
    },
    {
        "w": "DUA",
        "t": "دعاء",
        "s": "Gör dua för dina nära.",
        "st": "ادعُ لأقاربك."
    },
    {
        "w": "DUK",
        "t": "مفرش",
        "s": "En vit duk på bordet.",
        "st": "مفرش أبيض على الطاولة."
    },
    {
        "w": "DUNST",
        "t": "بخار",
        "s": "En dunst av parfym kändes.",
        "st": "شوهدت سحابة من العطر."
    },
    {
        "w": "DURK",
        "t": "أرضية القارب",
        "s": "Vattnet skvalpade på durken.",
        "st": "تناثر الماء على أرضية القارب."
    },
    {
        "w": "EK",
        "t": "شجرة بلوط",
        "s": "Eken är ett starkt träd.",
        "st": "شجرة البلوط قوية."
    },
    {
        "w": "EKA",
        "t": "قارب",
        "s": "Vi rodde ut i en eka.",
        "st": "جدفنا بقارب صغير."
    },
    {
        "w": "EKAR",
        "t": "أصداء",
        "s": "Skogen ekar av rop.",
        "st": "الغابة تتردد فيها الأصداء."
    },
    {
        "w": "EL",
        "t": "كهرباء",
        "s": "Vi behöver el till lampan.",
        "st": "نحتاج الكهرباء للمصباح."
    },
    {
        "w": "ELEV",
        "t": "تلميذ",
        "s": "Han är en duktig elev i skolan.",
        "st": "إنه تلميذ مجتهد في المدرسة."
    },
    {
        "w": "ELIT",
        "t": "نُخبة",
        "s": "han tillhör eliten i svensk idrott",
        "st": "إنه من النخبة في مجال الرياضة في السويد"
    },
    {
        "w": "EN",
        "t": "واحد",
        "s": "En.",
        "st": "واحد."
    },
    {
        "w": "ENA",
        "t": "يوحد",
        "s": "Tron enar människor.",
        "st": "الإيمان يوحد الناس."
    },
    {
        "w": "ENAR",
        "t": "أشجار العرعر",
        "s": "Det växer enar på backen.",
        "st": "تنمو أشجار العرعر على التل."
    },
    {
        "w": "ENERGI",
        "t": "طاقة",
        "s": "Solenergi är bra.",
        "st": "الطاقة الشمسية جيدة."
    },
    {
        "w": "ENIG",
        "t": "مُجمِع",
        "s": "man var rörande enig om beslutet",
        "st": "كان الجميع متفقين حول القرار بصورة مؤثّرة"
    },
    {
        "w": "ENLIGT",
        "t": "حَسَب",
        "s": "enligt alla beräkningar",
        "st": "حَسَب جميع الحسابات"
    },
    {
        "w": "ER",
        "t": "أنتم / لكم",
        "s": "Boken tillhör er.",
        "st": "الكتاب ملك لكم."
    },
    {
        "w": "ETT",
        "t": "واحد",
        "s": "Jag har bara ett äpple kvar.",
        "st": "لدي تفاحة واحدة فقط متبقية."
    },
    {
        "w": "FÅ",
        "t": "قليل/يحصل",
        "s": "Jag fick en present.",
        "st": "حصلت على هدية."
    },
    {
        "w": "FALSK",
        "t": "زائف",
        "s": "Det där skrattet låter väldigt falskt.",
        "st": "تلك الضحكة تبدو مصطنعة جداً."
    },
    {
        "w": "FALUKORV",
        "t": "سجق فالو",
        "s": "Falukorv i ugn.",
        "st": "سجق فالو في الفرن."
    },
    {
        "w": "FAMILJ",
        "t": "عائلة",
        "s": "Jag älskar min familj.",
        "st": "أحب عائلتي."
    },
    {
        "w": "FAMILJEN",
        "t": "العائلة",
        "s": "Hela familjen är samlad.",
        "st": "العائلة مجتمعة."
    },
    {
        "w": "FANS",
        "t": "معجبين",
        "s": "Bandet har många hängivna fans.",
        "st": "الفرقة لديها العديد من المعجبين المخلصين."
    },
    {
        "w": "FAR",
        "t": "أب",
        "s": "Min far arbetar hårt.",
        "st": "أبي يعمل بجد."
    },
    {
        "w": "FÅR",
        "t": "خروف",
        "s": "svart får ( misslyckad person )",
        "st": "شخص فاشل"
    },
    {
        "w": "FÄRD",
        "t": "رحلة",
        "s": "Vi tar en färd till Oslo.",
        "st": "نأخذ رحلة إلى أوسلو."
    },
    {
        "w": "FÄRDE",
        "t": "خطر",
        "s": "Nu är det fara å färde.",
        "st": "الآن هناك خطر محدق."
    },
    {
        "w": "FÄRDEN",
        "t": "الرحلة",
        "s": "Färden mot norr var mycket kall.",
        "st": "كانت الرحلة نحو الشمال باردة جداً."
    },
    {
        "w": "FÄRJA",
        "t": "عبّارة",
        "s": "Vi tog färjan över havet.",
        "st": "أخذنا العبارة عبر البحر."
    },
    {
        "w": "FARMOR",
        "t": "جدة (أم الأب)",
        "s": "Farmor bakar bullar.",
        "st": "جدتي تخبز كعكاً."
    },
    {
        "w": "FÄRS",
        "t": "مفروم",
        "s": "Stek färsen i pannan.",
        "st": "اقلِ المفروم في المقلاة."
    },
    {
        "w": "FÄRSK",
        "t": "طازج",
        "s": "Färsk fisk är bäst.",
        "st": "السمك الطازج هو الأفضل."
    },
    {
        "w": "FART",
        "t": "سرعة",
        "s": "Det var full fart hela dagen.",
        "st": "كانت السرعة قصوى طوال اليوم."
    },
    {
        "w": "FARTYG",
        "t": "سفينة",
        "s": "Fartyget seglar på havet.",
        "st": "السفينة تبحر في البحر."
    },
    {
        "w": "FAS",
        "t": "مرحلة",
        "s": "Detta är projektets första fas.",
        "st": "هذه هي المرحلة الأولى للمشروع."
    },
    {
        "w": "FASA",
        "t": "رُعب, هَلَع",
        "s": "med avsky och fasa",
        "st": "ببغض و رُعب"
    },
    {
        "w": "FASAR",
        "t": "يخشى",
        "s": "Fasar för.",
        "st": "يخشى من."
    },
    {
        "w": "FAST",
        "t": "ثابت",
        "s": "En fast regel.",
        "st": "قاعدة ثابتة."
    },
    {
        "w": "FASTA",
        "t": "صيام",
        "s": "Vi fastar under Ramadan.",
        "st": "نحن نصوم في رمضان."
    },
    {
        "w": "FAT",
        "t": "طبق",
        "s": "Lägg maten på ett stort fat.",
        "st": "ضع الطعام على طبق كبير."
    },
    {
        "w": "FE",
        "t": "جنية",
        "s": "Som en god fe i sagan.",
        "st": "مثل جنية طيبة في الحكاية."
    },
    {
        "w": "FEBER",
        "t": "حمى",
        "s": "Barnet har hög feber.",
        "st": "الطفل لديه حمى عالية."
    },
    {
        "w": "FEST",
        "t": "حفلة",
        "s": "Vi ska ha fest på lördag.",
        "st": "سنقيم حفلة يوم السبت."
    },
    {
        "w": "FIK",
        "t": "مقهى",
        "s": "Vi träffas på ett fik.",
        "st": "نلتقي في مقهى."
    },
    {
        "w": "FIKA",
        "t": "استراحة قهوة",
        "s": "Ska vi ta en fika tillsammans?",
        "st": "هل نأخذ استراحة قهوة معاً؟"
    },
    {
        "w": "FIL",
        "t": "لبن",
        "s": "Jag tar en skål fil.",
        "st": "سآخذ وعاء من اللبن."
    },
    {
        "w": "FILMJÖLK",
        "t": "لبن رائب",
        "s": "Filmjölk med flingor.",
        "st": "لبن رائب مع رقائق الذرة."
    },
    {
        "w": "FIN",
        "t": "جميل",
        "s": "en fin bil en fin kostym",
        "st": "سيارة جميلة بدلة أنيقة"
    },
    {
        "w": "FISK",
        "t": "سمك",
        "s": "Vi äter färsk fisk till middag.",
        "st": "نأكل سمكاً طازجاً للعشاء."
    },
    {
        "w": "FISKAR",
        "t": "يصيد السمك",
        "s": "He fiskar i sjön.",
        "st": "هو يصطاد في البحيرة."
    },
    {
        "w": "FJÄRR",
        "t": "بعيد",
        "s": "Väster är fjärran.",
        "st": "الغرب بعيد."
    },
    {
        "w": "FLASKA",
        "t": "زجاجة",
        "s": "Kan jag få en flaska vatten?",
        "st": "هل يمكنني الحصول على زجاجة ماء؟"
    },
    {
        "w": "FLOD",
        "t": "فيضان",
        "s": "Tidvattnet växlar mellan ebb och flod.",
        "st": "المد والجزر يتبادلان الأدوار."
    },
    {
        "w": "FLODEN",
        "t": "النهر",
        "s": "Floden rinner stilla genom staden.",
        "st": "النهر يجري بهدوء عبر المدينة."
    },
    {
        "w": "FLUGA",
        "t": "ربطة عنق / ذبابة",
        "s": "Han hade en röd fluga på festen.",
        "st": "كان يرتدي ربطة عنق حمراء في الحفل."
    },
    {
        "w": "FLYG",
        "t": "طيران / رحلة جوية",
        "s": "Vi tar flyget till Paris.",
        "st": "نأخذ الرحلة الجوية إلى باريس."
    },
    {
        "w": "FLYGPLAN",
        "t": "طائرة",
        "s": "Flygplanet är stort.",
        "st": "الطائرة كبيرة."
    },
    {
        "w": "FÖNSTER",
        "t": "نافذة",
        "s": "Titta ut genom fönstret.",
        "st": "انظر من خلال النافذة."
    },
    {
        "w": "FÖR",
        "t": "لأجل / جداً",
        "s": "Det är alldeles för varmt här.",
        "st": "الجو حار جداً هنا."
    },
    {
        "w": "FÖRE",
        "t": "قبل",
        "s": "Kom gärna lite före klockan åtta.",
        "st": "تعال من فضلك قبل الساعة الثامنة بقليل."
    },
    {
        "w": "FÖRST",
        "t": "أوّل",
        "s": "komma först i en tävling",
        "st": "احتل المركز الأول في مسابقة"
    },
    {
        "w": "FORT",
        "t": "بسرعة",
        "s": "Tiden går så fort när man har roligt.",
        "st": "الوقت يمضي بسرعة عندما تستمتع."
    },
    {
        "w": "FRAKT",
        "t": "شحن",
        "s": "Vi betalar för frakt och emballage.",
        "st": "نحن ندفع تكاليف الشحن والتغليف."
    },
    {
        "w": "FRÄN",
        "t": "حادّ",
        "s": "frän kritik en frän lukt",
        "st": "نقد لاذع رائحة حادة"
    },
    {
        "w": "FRED",
        "t": "سلام",
        "s": "Vi vill ha fred på jorden.",
        "st": "نريد السلام على الأرض."
    },
    {
        "w": "FRI",
        "t": "حر",
        "s": "Tanken är fri.",
        "st": "الفكر حر."
    },
    {
        "w": "FRID",
        "t": "سلام / راحة",
        "s": "Vila i frid.",
        "st": "ارقد في سلام."
    },
    {
        "w": "FRISK",
        "t": "صحي",
        "s": "Det är skönt att andas frisk luft.",
        "st": "من الرائع تنفس الهواء النقي."
    },
    {
        "w": "FROST",
        "t": "صقيع",
        "s": "Det är frost ute.",
        "st": "يوجد صقيع في الخارج."
    },
    {
        "w": "FRUKOST",
        "t": "فطور",
        "s": "Frukost är viktig.",
        "st": "الفطور مهم."
    },
    {
        "w": "FRUKT",
        "t": "فاكهة",
        "s": "Ät mer frukt och grönt.",
        "st": "تناول المزيد من الفاكهة والخضروات."
    },
    {
        "w": "FUL",
        "t": "قبيح",
        "s": "Det var en ful fisk.",
        "st": "كانت سمكة قبيحة (تعبير مجازي عن شخص مشبوه)."
    },
    {
        "w": "GÅ",
        "t": "يمشي",
        "s": "Att gå hem.",
        "st": "يمشي ببطء."
    },
    {
        "w": "GABY",
        "t": "غابي",
        "s": "Gaby är ett namn på en person.",
        "st": "غابي هو اسم شخص."
    },
    {
        "w": "GAL",
        "t": "يصيح",
        "s": "Tuppen gal tidigt.",
        "st": "صاح الديك مبكراً."
    },
    {
        "w": "GALA",
        "t": "حفل",
        "s": "De gick på en fin gala.",
        "st": "ذهبوا إلى حفل راقٍ."
    },
    {
        "w": "GALLA",
        "t": "مرارة",
        "s": "Galla.",
        "st": "مرارة."
    },
    {
        "w": "GÅR",
        "t": "الأمس",
        "s": "Tiden går fort.",
        "st": "الوقت يمضي بسرعة."
    },
    {
        "w": "GARDEROB",
        "t": "خزانة ملابس",
        "s": "Mina kläder hänger i garderoben.",
        "st": "ملابسي في الخزانة."
    },
    {
        "w": "GARDIN",
        "t": "ستارة",
        "s": "Dra för gardinen för fönstret.",
        "st": "أغلق الستارة أمام النافذة."
    },
    {
        "w": "GARN",
        "t": "غزل",
        "s": "Katten lekte med ett nystan av garn.",
        "st": "لعبت القطة بكرة من الغزل."
    },
    {
        "w": "GAS",
        "t": "دعاسة البنزين",
        "s": "giftiga gaser elda med gas",
        "st": "غازات سامة أشعل بالغاز"
    },
    {
        "w": "GÅS",
        "t": "إوزة",
        "s": "En vit gås simmar i dammen.",
        "st": "إوزة بيضاء تسبح في البركة."
    },
    {
        "w": "GATA",
        "t": "شارع",
        "s": "Barnen leker på en lugn gata.",
        "st": "الأطفال يلعبون في شارع هادئ."
    },
    {
        "w": "GAV",
        "t": "أعطى",
        "s": "Han gav mig en present.",
        "st": "أعطاني هدية."
    },
    {
        "w": "GEL",
        "t": "جل",
        "s": "Han har gel i håret.",
        "st": "لديه جل في شعره."
    },
    {
        "w": "GELET",
        "t": "الجيل",
        "s": "Gelet.",
        "st": "الجيل."
    },
    {
        "w": "GEM",
        "t": "مشبك ورق",
        "s": "Fäst pappret med ett gem.",
        "st": "ثبت الورقة بمشبك."
    },
    {
        "w": "GEN",
        "t": "جين",
        "s": "Gener bestämmer vår ögonfärg.",
        "st": "الجينات تحدد لون عيوننا."
    },
    {
        "w": "GENOM",
        "t": "عبر / خلال",
        "s": "Vi gick en promenad genom skogen.",
        "st": "مشينا في نزهة عبر الغابة."
    },
    {
        "w": "GENRE",
        "t": "نوع",
        "s": "en ny genre inom måleriet",
        "st": "نوع جديد ضمن مجال الدهان"
    },
    {
        "w": "GENTIL",
        "t": "سخّي",
        "s": "ett gentilt erbjudande",
        "st": "عرض سخي"
    },
    {
        "w": "GENUIN",
        "t": "أصيل",
        "s": "en genuin göteborgare",
        "st": "من سكان يوتيبوري الأصليين"
    },
    {
        "w": "GER",
        "t": "يعطي",
        "s": "Solen ger oss ljus och värme.",
        "st": "الشمس تعطينا الضوء والدفء."
    },
    {
        "w": "GET",
        "t": "ماعز",
        "s": "En liten get bräkte i hagen.",
        "st": "ثغت ماعز صغيرة في المرعى."
    },
    {
        "w": "GLÄNTA",
        "t": "فسحة",
        "s": "En solig glänta i skogen.",
        "st": "فسحة مشمسة في الغابة."
    },
    {
        "w": "GLASS",
        "t": "آيس كريم",
        "s": "Glass är gott på sommaren.",
        "st": "الآيس كريم لذيذ في الصيف."
    },
    {
        "w": "GLOR",
        "t": "يُبَحلق",
        "s": "vad glor du på?",
        "st": "بماذا تبحلق؟"
    },
    {
        "w": "GÖR",
        "t": "يفعل",
        "s": "Vad gör du?",
        "st": "ماذا تفعل؟"
    },
    {
        "w": "GRAD",
        "t": "درجة",
        "s": "Det är bara en grad varmt ute.",
        "st": "درجة الحرارة درجة واحدة فقط في الخارج."
    },
    {
        "w": "GRAN",
        "t": "تنوب",
        "s": "Vi klär en gran till jul.",
        "st": "نزين شجرة التنوب لعيد الميلاد."
    },
    {
        "w": "GRAV",
        "t": "قبر",
        "s": "Lägg blommor på graven.",
        "st": "ضع الزهور على القبر."
    },
    {
        "w": "GRAVID",
        "t": "حامل",
        "s": "Hon är gravid i femte månaden.",
        "st": "هي حامل في الشهر الخامس."
    },
    {
        "w": "GREN",
        "t": "غصن",
        "s": "Fågeln sitter på en gren.",
        "st": "الطائر يجلس على غصن."
    },
    {
        "w": "GRIND",
        "t": "بوابة",
        "s": "Glöm inte att stänga grinden.",
        "st": "لا تنس إغلاق البوابة."
    },
    {
        "w": "GROLL",
        "t": "خُصومة",
        "s": "glömma gammalt groll",
        "st": "نَسِيَ الخصومة القديمة"
    },
    {
        "w": "GRÖNSAK",
        "t": "خضار",
        "s": "Ät dina grönsaker.",
        "st": "كل خضرواتك."
    },
    {
        "w": "GRÖT",
        "t": "عصيدة",
        "s": "Varm gröt är gott på morgonen.",
        "st": "العصيدة الساخنة لذيذة في الصباح."
    },
    {
        "w": "GUL",
        "t": "أصفر",
        "s": "Solen är gul.",
        "st": "الشمس صفراء."
    },
    {
        "w": "GYLF",
        "t": "خليج (قديمة)",
        "s": "Ett ord från fornnordiskan.",
        "st": "كلمة من الإسكندنافية القديمة."
    },
    {
        "w": "HA",
        "t": "يملك",
        "s": "Jag har en bok.",
        "st": "لدي كتاب."
    },
    {
        "w": "HAJJ",
        "t": "حج",
        "s": "Hajj är en resa till Mecka.",
        "st": "الحج رحلة إلى مكة."
    },
    {
        "w": "HÄL",
        "t": "كعب",
        "s": "Jag har ont i hälen.",
        "st": "لدي ألم في الكعب."
    },
    {
        "w": "HALL",
        "t": "قاعة",
        "s": "En stor hall.",
        "st": "قاعة كبيرة."
    },
    {
        "w": "HALS",
        "t": "حلق / رقبة",
        "s": "Hon har ett halsband runt halsen.",
        "st": "لديها قلادة حول رقبتها."
    },
    {
        "w": "HÄLSA",
        "t": "صحة",
        "s": "Hälsa är viktigt.",
        "st": "الصحة مهمة."
    },
    {
        "w": "HALVÖ",
        "t": "شبه جزيرة",
        "s": "Italien är en stor halvö.",
        "st": "إيطاليا شبه جزيرة كبيرة."
    },
    {
        "w": "HAMN",
        "t": "ميناء",
        "s": "Båten ligger i hamn.",
        "st": "القارب في الميناء."
    },
    {
        "w": "HAN",
        "t": "هو",
        "s": "Han reser ofta utomlands.",
        "st": "هو يسافر كثيراً للخارج."
    },
    {
        "w": "HÅN",
        "t": "ازْدِراء",
        "s": "det känns som ett hån",
        "st": "أشعر كـأنه ازدراء من طرفك"
    },
    {
        "w": "HAND",
        "t": "يد",
        "s": "Tvätta händerna.",
        "st": "اغسل يديك."
    },
    {
        "w": "HANDLED",
        "t": "معصم",
        "s": "Jag stukade handleden.",
        "st": "لويت معصمي."
    },
    {
        "w": "HÄR",
        "t": "هنا",
        "s": "Jag är här.",
        "st": "أنا هنا."
    },
    {
        "w": "HAV",
        "t": "بحر",
        "s": "Havet är djupt och blått.",
        "st": "البحر عميق وأزرق."
    },
    {
        "w": "HÅV",
        "t": "شبكة",
        "s": "Fånga med håv.",
        "st": "اصطياد بشبكة."
    },
    {
        "w": "HEJ",
        "t": "مرحباً",
        "s": "Hej på dig!",
        "st": "مرحباً بك!"
    },
    {
        "w": "HEL",
        "t": "كامل",
        "s": "Jag vill ha en hel kaka.",
        "st": "أريد كعكة كاملة."
    },
    {
        "w": "HELG",
        "t": "عطلة نهاية أسبوع",
        "s": "God helg!",
        "st": "عطلة سعيدة!"
    },
    {
        "w": "HELIG",
        "t": "مقدس",
        "s": "Koranen är en helig bok.",
        "st": "القرآن كتاب مقدس."
    },
    {
        "w": "HELIGT",
        "t": "مقدس",
        "s": "Detta är ett heligt rum.",
        "st": "هذه غرفة مقدسة."
    },
    {
        "w": "HELLÅNG",
        "t": "طويل",
        "s": "en hellång ärm en hellång klänning",
        "st": "كُمّ طويل فستان طويل"
    },
    {
        "w": "HELT",
        "t": "تماماً",
        "s": "Jag håller med dig helt och hållet.",
        "st": "أنا أتفق معك تماماً."
    },
    {
        "w": "HEM",
        "t": "منزل",
        "s": "Vi ska gå hem nu.",
        "st": "سنذهب إلى المنزل الآن."
    },
    {
        "w": "HIMMEL",
        "t": "سماء",
        "s": "Himlen är blå.",
        "st": "السماء زرقاء."
    },
    {
        "w": "HJÄRTA",
        "t": "قلب",
        "s": "Mitt hjärta.",
        "st": "قلبي."
    },
    {
        "w": "HJORT",
        "t": "أيل",
        "s": "En hjort stod i skogsbrynet.",
        "st": "وقف أيل عند حافة الغابة."
    },
    {
        "w": "HJORTRON",
        "t": "توت العليق",
        "s": "Hjortron kallas skogens guld.",
        "st": "يسمى توت العليق ذهب الغابة."
    },
    {
        "w": "HJUL",
        "t": "عجلة",
        "s": "Hjulet snurrar fort.",
        "st": "العجلة تدور بسرعة."
    },
    {
        "w": "HÖSTEN",
        "t": "الخريف",
        "s": "Löven faller på hösten.",
        "st": "أوراق الشجر تسقط في الخريف."
    },
    {
        "w": "HOTELL",
        "t": "فندق",
        "s": "Vi bor på ett fint hotell.",
        "st": "نحن نقيم في فندق جميل."
    },
    {
        "w": "HUS",
        "t": "بيت",
        "s": "Vi bor i ett litet rött hus.",
        "st": "نعيش في منزل أحمر صغير."
    },
    {
        "w": "IDE",
        "t": "مَرْبَض",
        "s": "gå i ide",
        "st": "يرقد في البيات الشتوي"
    },
    {
        "w": "IDÉ",
        "t": "فكرة",
        "s": "Jag har en bra idé.",
        "st": "لدي فكرة جيدة."
    },
    {
        "w": "IDEL",
        "t": "مَحْض",
        "s": "pjäsen möttes av idel lovord",
        "st": "قوبلت المسرحية باستحسان تام"
    },
    {
        "w": "IFRÅN",
        "t": "مِن",
        "s": "jag är långt ifrån nöjd",
        "st": "لست راضِياً أبداً"
    },
    {
        "w": "IGEN",
        "t": "ثانية",
        "s": "Kom gärna tillbaka igen!",
        "st": "أهلاً بك مجدداً!"
    },
    {
        "w": "IL",
        "t": "سرعة/عجلة",
        "s": "I full il.",
        "st": "في عجلة من أمره."
    },
    {
        "w": "IMAM",
        "t": "إمام",
        "s": "Imamen leder bönen.",
        "st": "الإمام يؤم الصلاة."
    },
    {
        "w": "IN",
        "t": "في/إلى الداخل",
        "s": "Gå in.",
        "st": "تعال إلى الداخل."
    },
    {
        "w": "INÅT",
        "t": "إلى الداخل",
        "s": "han bor någonstans inåt landet",
        "st": "إنه يسكن في مكان ما داخل البلاد"
    },
    {
        "w": "INNE",
        "t": "رائج",
        "s": "det är inne att cykla",
        "st": "ركوب الدراجة شائع حالياً"
    },
    {
        "w": "INRE",
        "t": "داخلي",
        "s": "de inre delarna av landet",
        "st": "الأجزاء الداخلية من البلاد"
    },
    {
        "w": "INTER",
        "t": "إنتر",
        "s": "Inter vann matchen igår.",
        "st": "فاز إنتر بالمباراة أمس."
    },
    {
        "w": "IS",
        "t": "جليد",
        "s": "Isen ligger blank.",
        "st": "الجليد يلمع."
    },
    {
        "w": "ISKALL",
        "t": "مُثَلِّج",
        "s": "iskall pilsner iskall beräkning",
        "st": "بيرة مثلجة تقييم بأعصاب باردة"
    },
    {
        "w": "ISLAM",
        "t": "إسلام",
        "s": "Islam betyder fred och underkastelse.",
        "st": "الإسلام يعني السلام والاستسلام."
    },
    {
        "w": "JA",
        "t": "نعم",
        "s": "Ja, det vill jag.",
        "st": "نعم، أريد."
    },
    {
        "w": "JO",
        "t": "بلى",
        "s": "Jo, det gjorde jag.",
        "st": "بلى، فعلت."
    },
    {
        "w": "JOBB",
        "t": "عمل",
        "s": "Jag trivs på mitt jobb.",
        "st": "أنا مرتاح في عملي."
    },
    {
        "w": "JOD",
        "t": "يود",
        "s": "Jod används i sår.",
        "st": "يستخدم اليود في الجروح."
    },
    {
        "w": "JU",
        "t": "كما تعلم",
        "s": "Du vet ju det.",
        "st": "أنت تعلم ذلك."
    },
    {
        "w": "JUL",
        "t": "عيد الميلاد",
        "s": "God jul!",
        "st": "عيد ميلاد مجيد!"
    },
    {
        "w": "KADER",
        "t": "كادر",
        "s": "En liten kader av lojala soldater.",
        "st": "كادر صغير من الجنود المخلصين."
    },
    {
        "w": "KAFFE",
        "t": "قهوة",
        "s": "En kopp kaffe, tack.",
        "st": "فنجان قهوة، من فضلك."
    },
    {
        "w": "KAKA",
        "t": "كعكة",
        "s": "Vill du ha en liten kaka?",
        "st": "هل تريد كعكة صغيرة؟"
    },
    {
        "w": "KAKOR",
        "t": "كعك",
        "s": "Vi bakar goda kakor till fikat.",
        "st": "نخبز كعكاً لذيذاً للاستراحة."
    },
    {
        "w": "KAL",
        "t": "أصلع",
        "s": "Han har en kal fläck på huvudet.",
        "st": "لديه بقعة صلعاء في رأسه."
    },
    {
        "w": "KÅL",
        "t": "ملفوف",
        "s": "Kål är en nyttig grönsak.",
        "st": "الملفوف خضار صحي."
    },
    {
        "w": "KALAS",
        "t": "حفلة",
        "s": "Vi ska på kalas.",
        "st": "سنذهب إلى حفلة."
    },
    {
        "w": "KALL",
        "t": "بارد",
        "s": "Vintern är mörk och kall.",
        "st": "الشتاء مظلم وبارد."
    },
    {
        "w": "KALOTT",
        "t": "قلنسوة ضيقة",
        "s": "bildligt något som liknar en kalott",
        "st": "تقال مجازاً عن شيء يشابه القلنسوة"
    },
    {
        "w": "KÅLROT",
        "t": "لفت سويدي",
        "s": "Rotmos görs på kålrot.",
        "st": "يصنع هريس الجذور من اللفت السويدي."
    },
    {
        "w": "KALV",
        "t": "عجل",
        "s": "Kalvkött är ljust.",
        "st": "لحم العجل فاتح اللون."
    },
    {
        "w": "KAM",
        "t": "مشط",
        "s": "Kamma håret med en kam.",
        "st": "مشط شعرك بمشط."
    },
    {
        "w": "KAMERA",
        "t": "كاميرا",
        "s": "Ta ett kort med kameran.",
        "st": "التقط صورة بالكاميرا."
    },
    {
        "w": "KAN",
        "t": "يستطيع",
        "s": "Kan du hjälpa mig med detta?",
        "st": "هل يمكنك مساعدتي في هذا؟"
    },
    {
        "w": "KANOT",
        "t": "زورق",
        "s": "Vi paddlar kanot på sjön.",
        "st": "نجدف بالزورق في البحيرة."
    },
    {
        "w": "KANT",
        "t": "حافة",
        "s": "Stå inte vid vägkanten.",
        "st": "لا تقف عند حافة الطريق."
    },
    {
        "w": "KANTRAR",
        "t": "ينقلب",
        "s": "båten kantrar vinden kantrade",
        "st": "ينقلب الزورق إنعكست الريح"
    },
    {
        "w": "KAP",
        "t": "غنيمة",
        "s": "göra ett gott kap",
        "st": "غنم شيئاً جيداً"
    },
    {
        "w": "KAPTEN",
        "t": "قبطان",
        "s": "Kapten styr båten säkert.",
        "st": "القبطان يقود القارب بأمان."
    },
    {
        "w": "KAPTENS",
        "t": "للقبطان (مضاف)",
        "s": "Detta är kaptens gamla hatt.",
        "st": "هذه قبعة القبطان القديمة."
    },
    {
        "w": "KAR",
        "t": "حوض",
        "s": "Ett stort kar fyllt med vatten.",
        "st": "حوض كبير مملوء بالماء."
    },
    {
        "w": "KARL",
        "t": "رَجُل",
        "s": "Han är en stilig karl.",
        "st": "إنه رجل وسيم."
    },
    {
        "w": "KÄRL",
        "t": "وعاء",
        "s": "Ett kärl.",
        "st": "وعاء."
    },
    {
        "w": "KARR",
        "t": "مستنقع",
        "s": "Växten trivs i fuktiga karr.",
        "st": "النبات ينمو في المستنقعات الرطبة."
    },
    {
        "w": "KÄRRA",
        "t": "عربة",
        "s": "En kärra.",
        "st": "عربة."
    },
    {
        "w": "KARTA",
        "t": "خريطة",
        "s": "Jag använder en karta.",
        "st": "أستخدم خريطة."
    },
    {
        "w": "KAST",
        "t": "رمية",
        "s": "Det var ett riktigt dåligt kast.",
        "st": "كانت تلك رمية سيئة حقاً."
    },
    {
        "w": "KATA",
        "t": "كاتا",
        "s": "Han tränar kata varje dag.",
        "st": "يتدرب على الكاتا كل يوم."
    },
    {
        "w": "KATT",
        "t": "قِطّ",
        "s": "Katten jamar.",
        "st": "القطة تموء."
    },
    {
        "w": "KIL",
        "t": "خازوق",
        "s": "slå i en kil",
        "st": "دَقَّ اسْفيناً"
    },
    {
        "w": "KIND",
        "t": "خَدّ",
        "s": "Hon fick en kyss på kinden.",
        "st": "حصلت على قبلة على الخد."
    },
    {
        "w": "KLAR",
        "t": "صافٍ",
        "s": "klara ögon klart vatten",
        "st": "عيون صافية ماء صاف"
    },
    {
        "w": "KLASS",
        "t": "فصل",
        "s": "Hela klassen åkte på utflykt.",
        "st": "فصلنا كبير."
    },
    {
        "w": "KNIV",
        "t": "سكين",
        "s": "Skär brödet med en kniv.",
        "st": "اقطع الخبز بالسكين."
    },
    {
        "w": "KO",
        "t": "بقرة",
        "s": "En ko betar på ängen.",
        "st": "بقرة ترعى في المرج."
    },
    {
        "w": "KOCK",
        "t": "طباخ",
        "s": "Han är en duktig kock.",
        "st": "هو طباخ ماهر."
    },
    {
        "w": "KOGG",
        "t": "سفينة تجارية قديمة",
        "s": "En kogg är ett gammalt fartyg.",
        "st": "الكوج هي سفينة قديمة."
    },
    {
        "w": "KOK",
        "t": "غليان",
        "s": "Vattnet har nått kokpunkten nu.",
        "st": "وصل الماء إلى نقطة الغليان الآن."
    },
    {
        "w": "KÖKET",
        "t": "المطبخ",
        "s": "Vi lagar mat i köket.",
        "st": "نطبخ في المطبخ."
    },
    {
        "w": "KÖL",
        "t": "عارضة",
        "s": "Båtens köl slog i botten.",
        "st": "اصطدمت عارضة القارب بالقاع."
    },
    {
        "w": "KOLA",
        "t": "توفي",
        "s": "Vill du ha en seg kola?",
        "st": "هل تريد قطعة توفي لزجة؟"
    },
    {
        "w": "KOLLEGA",
        "t": "زميل",
        "s": "Min kollega är hjälpsam.",
        "st": "زميلي متعاون."
    },
    {
        "w": "KONTOR",
        "t": "مكتب",
        "s": "Jag jobbar på kontor.",
        "st": "أعمل في مكتب."
    },
    {
        "w": "KOPP",
        "t": "فنجان",
        "s": "Vill du ha en kopp te?",
        "st": "هل تريد فنجان شاي؟"
    },
    {
        "w": "KOR",
        "t": "أبقار",
        "s": "Korna betar gräs på ängen.",
        "st": "الأبقار ترعى العشب في المرج."
    },
    {
        "w": "KÖR",
        "t": "يقود / جوقة",
        "s": "Han kör bilen mycket försiktigt.",
        "st": "هو يقود السيارة بحذر شديد."
    },
    {
        "w": "KORA",
        "t": "يختار",
        "s": "Vi ska kora en vinnare ikväll.",
        "st": "سنختار فائزاً الليلة."
    },
    {
        "w": "KORAN",
        "t": "قرآن",
        "s": "Koranen.",
        "st": "القرآن."
    },
    {
        "w": "KORNA",
        "t": "الأبقار",
        "s": "Korna betar lugnt på ängen.",
        "st": "الأبقار ترعى بهدوء في المرج."
    },
    {
        "w": "KORT",
        "t": "قصير",
        "s": "Livet är kort.",
        "st": "الحياة قصيرة."
    },
    {
        "w": "KORTA",
        "t": "فشل",
        "s": "komma till korta ( misslyckas )",
        "st": "فشل"
    },
    {
        "w": "KORV",
        "t": "سجق",
        "s": "Grilla korv.",
        "st": "اشوي السجق."
    },
    {
        "w": "KOS",
        "t": "متعة / مرح",
        "s": "Det är kos att leka.",
        "st": "من الممتع اللعب."
    },
    {
        "w": "KOSTAR",
        "t": "يكلف",
        "s": "Det kostar för mycket.",
        "st": "هذا يكلف كثيراً جداً."
    },
    {
        "w": "KÖTT",
        "t": "لحم",
        "s": "Jag äter inte kött.",
        "st": "أنا لا آكل اللحم."
    },
    {
        "w": "KÖTTFÄRS",
        "t": "لحم مفروم",
        "s": "Vi gör biffar av köttfärs.",
        "st": "نصنع شرائح اللحم من اللحم المفروم."
    },
    {
        "w": "KRAFT",
        "t": "قوة",
        "s": "Kunskap är makt och kraft.",
        "st": "المعرفة هي سلطة وقوة."
    },
    {
        "w": "KRAM",
        "t": "عناق",
        "s": "Ge mig en kram.",
        "st": "اعطني عناقاً."
    },
    {
        "w": "KRÄM",
        "t": "كريم",
        "s": "Smörj in huden med kräm.",
        "st": "ادهن الجلد بالكريم."
    },
    {
        "w": "KRAMP",
        "t": "تشنج",
        "s": "Jag fick kramp i benet.",
        "st": "أصبت بتشنج في ساقي."
    },
    {
        "w": "KRAS",
        "t": "تحطّم",
        "s": "Vasen gick i kras.",
        "st": "تحطمت المزهرية."
    },
    {
        "w": "KRASS",
        "t": "واقعي",
        "s": "den krassa verkligheten",
        "st": "واقع لا جدال عليه"
    },
    {
        "w": "KRAV",
        "t": "مطالبة",
        "s": "ställa krav på en bättre service",
        "st": "طالب بالحصول على خدمات أفضل"
    },
    {
        "w": "KREDIT",
        "t": "ائتمان",
        "s": "köpa på kredit bevilja långa krediter",
        "st": "اشترى بالتسليف منح ائتمانات طويلة الأجل"
    },
    {
        "w": "KRIS",
        "t": "أزمة",
        "s": "en ekonomisk kris människa i kris",
        "st": "أزمة اقتصادية إنسان في أزمة"
    },
    {
        "w": "KROPP",
        "t": "جسم",
        "s": "Träning är bra för kroppen.",
        "st": "الرياضة مفيدة للجسم."
    },
    {
        "w": "KROTON",
        "t": "كروتون",
        "s": "En växt.",
        "st": "نبات."
    },
    {
        "w": "KRUS",
        "t": "قدر فخاري",
        "s": "Inget krus, tack.",
        "st": "بدون مجاملات، شكراً."
    },
    {
        "w": "KRYA",
        "t": "يتعافى",
        "s": "Hoppas du kryar på dig snart.",
        "st": "آمل أن تتعافى قريباً."
    },
    {
        "w": "KUL",
        "t": "لطيف",
        "s": "Det var en kul fest.",
        "st": "كانت حفلة ممتعة."
    },
    {
        "w": "KURS",
        "t": "دورة",
        "s": "Jag går en kurs i svenska.",
        "st": "أنا أحضر دورة في اللغة السويدية."
    },
    {
        "w": "KUSIN",
        "t": "ابن عم/خال",
        "s": "Min kusin kommer på besök.",
        "st": "ابن عمي يزورنا."
    },
    {
        "w": "KUST",
        "t": "ساحل",
        "s": "Vi bor vid kusten.",
        "st": "نعيش عند الساحل."
    },
    {
        "w": "KVÄLL",
        "t": "مساء",
        "s": "Vi ses i kväll klockan åtta.",
        "st": "نلتقي هذا المساء في الساعة الثامنة."
    },
    {
        "w": "KVART",
        "t": "ربع",
        "s": "om en kvart ett kvarts kilo",
        "st": "بعد ربع ساعة ربع كيلوغرام"
    },
    {
        "w": "KYL",
        "t": "ثلاجة",
        "s": "I kylen.",
        "st": "في الثلاجة."
    },
    {
        "w": "KYST",
        "t": "ساحل",
        "s": "Kusten är vacker.",
        "st": "الساحل جميل."
    },
    {
        "w": "LADA",
        "t": "حظيرة",
        "s": "Hästen står inne i en lada.",
        "st": "الحصان يقف داخل الحظيرة."
    },
    {
        "w": "LADDA",
        "t": "يشحن",
        "s": "Ladda mobilen.",
        "st": "اشحن الهاتف."
    },
    {
        "w": "LAG",
        "t": "قانون",
        "s": "En ny lag antogs.",
        "st": "تم تبني قانون جديد."
    },
    {
        "w": "LÅG",
        "t": "مُنْخَفِض",
        "s": "ett lågt bord",
        "st": "طاولة منخفضة"
    },
    {
        "w": "LAGA",
        "t": "يصلح",
        "s": "Laga det som är trasigt.",
        "st": "أصلح ما كُسر."
    },
    {
        "w": "LAGAR",
        "t": "قوانين",
        "s": "Vi måste följa landets lagar.",
        "st": "يجب أن نتبع قوانين البلاد."
    },
    {
        "w": "LAGER",
        "t": "مخزون / طبقة",
        "s": "Varan finns i lager.",
        "st": "السلعة متوفرة في المخزون."
    },
    {
        "w": "LÄKARE",
        "t": "طبيب",
        "s": "Läkaren hjälper patienter.",
        "st": "الطبيب يساعد المرضى."
    },
    {
        "w": "LAM",
        "t": "مَشلول",
        "s": "ett lamt intresse",
        "st": "اهتمام ضعيف"
    },
    {
        "w": "LAMPA",
        "t": "مصباح",
        "s": "Tänd lampan när det blir mörkt.",
        "st": "أشعل المصباح عندما يحل الظلام."
    },
    {
        "w": "LÅN",
        "t": "قَرضْ",
        "s": "tack för lånet!",
        "st": "شكراً على الإعارة!"
    },
    {
        "w": "LAND",
        "t": "أرض / بلد",
        "s": "Sverige är ett vackert land.",
        "st": "السويد بلد جميل."
    },
    {
        "w": "LÄNDER",
        "t": "بلدان",
        "s": "Vi besökte många länder.",
        "st": "زرنا العديد من البلدان."
    },
    {
        "w": "LÅNG",
        "t": "طويل",
        "s": "två meter lång",
        "st": "طوله متران"
    },
    {
        "w": "LÄPP",
        "t": "شفة",
        "s": "Han bet sig i läppen.",
        "st": "عض شفته."
    },
    {
        "w": "LÅR",
        "t": "فخذ",
        "s": "Kycklinglår i ugn.",
        "st": "فخذ دجاج في الفرن."
    },
    {
        "w": "LÄR",
        "t": "يعلم",
        "s": "Han lär sig svenska.",
        "st": "هو يتعلم السويدية."
    },
    {
        "w": "LÄRA",
        "t": "تعلم",
        "s": "Att lära är att leva.",
        "st": "التعلم هو الحياة."
    },
    {
        "w": "LÄRARE",
        "t": "معلم",
        "s": "Läraren undervisar klassen.",
        "st": "المعلم يدرس الفصل."
    },
    {
        "w": "LÄRDE",
        "t": "علماء",
        "s": "De lärde tvistar om den saken.",
        "st": "العلماء يختلفون حول هذا الأمر."
    },
    {
        "w": "LÅS",
        "t": "قفل",
        "s": "Sätt ett lås på dörren.",
        "st": "ضع قفلاً على الباب."
    },
    {
        "w": "LÄS",
        "t": "اقرأ",
        "s": "Läs boken noga.",
        "st": "اقرأ الكتاب بعناية."
    },
    {
        "w": "LAST",
        "t": "حمل",
        "s": "Lastbilen hade en mycket tung last.",
        "st": "كانت الشاحنة تحمل حمولة ثقيلة جداً."
    },
    {
        "w": "LAV",
        "t": "أشنة",
        "s": "Lavar växer på gamla stenar.",
        "st": "تنمو الأشنات على الحجارة القديمة."
    },
    {
        "w": "LAVA",
        "t": "حمم",
        "s": "Vulkanen sprutade ut het lava.",
        "st": "قذف البركان حمماً ساخنة."
    },
    {
        "w": "LÄXA",
        "t": "واجب منزلي",
        "s": "Jag har mycket läxa idag.",
        "st": "لدي الكثير من الواجب المنزلي اليوم."
    },
    {
        "w": "LE",
        "t": "يبتسم",
        "s": "Hon ler mot mig.",
        "st": "هي تبتسم دائماً."
    },
    {
        "w": "LED",
        "t": "مفصل / طرييق",
        "s": "Jag har ont i en led.",
        "st": "لدي ألم في مفصل."
    },
    {
        "w": "LEDD",
        "t": "اتّجاه",
        "s": "mattan passar bättre på andra ledden",
        "st": "تُناسِب السجادة بصورة أفضل في الإتّجاه الآخَر"
    },
    {
        "w": "LEG",
        "t": "ابتسامة",
        "s": "Ett vänligt leende.",
        "st": "ابتسامة ودية."
    },
    {
        "w": "LEGAL",
        "t": "قانوني",
        "s": "Legal.",
        "st": "قانوني."
    },
    {
        "w": "LEGER",
        "t": "سبائك",
        "s": "Brons är en legering av koppar.",
        "st": "البرونز هو سبيكة من النحاس."
    },
    {
        "w": "LEGIT",
        "t": "شرعي",
        "s": "Legit.",
        "st": "شرعي (عامية)."
    },
    {
        "w": "LEN",
        "t": "ناعم",
        "s": "Katten har len päls.",
        "st": "القطة لديها فراء ناعم."
    },
    {
        "w": "LEVE",
        "t": "يعيش",
        "s": "Hon ska leva länge.",
        "st": "ستعيش طويلاً."
    },
    {
        "w": "LEVER",
        "t": "كبد",
        "s": "Levern är ett viktigt organ.",
        "st": "الكبد عضو مهم."
    },
    {
        "w": "LIA",
        "t": "ليانا",
        "s": "Tarzan svingar sig i en lia.",
        "st": "طرزان يتأرجح في ليانا."
    },
    {
        "w": "LIK",
        "t": "شَبيه",
        "s": "likt ( som )",
        "st": "مِثلْ , شِبهْ"
    },
    {
        "w": "LIKT",
        "t": "مشابه",
        "s": "Det är likt honom att göra så.",
        "st": "من عادته أن يفعل ذلك."
    },
    {
        "w": "LILA",
        "t": "أرجواني",
        "s": "Lila blommor.",
        "st": "زهور أرجوانية."
    },
    {
        "w": "LILJA",
        "t": "زنبق",
        "s": "En vit lilja.",
        "st": "زنبقة بيضاء."
    },
    {
        "w": "LIM",
        "t": "غراء",
        "s": "Jag behöver lim.",
        "st": "أحتاج إلى غراء."
    },
    {
        "w": "LIND",
        "t": "زيزفون",
        "s": "Ett gammalt lindträd.",
        "st": "شجرة زيزفون قديمة."
    },
    {
        "w": "LINJAL",
        "t": "مسطرة",
        "s": "Dra ett streck med linjalen.",
        "st": "ارسم خطاً بالمسطرة."
    },
    {
        "w": "LIRA",
        "t": "يعزف",
        "s": "Ska vi lira lite boll?",
        "st": "هل نلعب الكرة قليلاً؟"
    },
    {
        "w": "LIS",
        "t": "مكر",
        "s": "Han använde list för att vinna.",
        "st": "استخدم المكر ليفوز."
    },
    {
        "w": "LISA",
        "t": "تَخفيف",
        "s": "musiken är en lisa för själen",
        "st": "الموسيقى راحة للنفس"
    },
    {
        "w": "LIST",
        "t": "قائمة",
        "s": "Han använde list för att vinna.",
        "st": "استخدم المكر ليفوز."
    },
    {
        "w": "LISTA",
        "t": "قائمة",
        "s": "Jag måste skriva en lång lista.",
        "st": "يجب أن أكتب قائمة طويلة."
    },
    {
        "w": "LITE",
        "t": "قليل",
        "s": "Kan jag få lite mer kaffe?",
        "st": "هل يمكنني الحصول على المزيد من القهوة؟"
    },
    {
        "w": "LITER",
        "t": "ليتر",
        "s": "en liter mjölk",
        "st": "ليتر من الحليب"
    },
    {
        "w": "LIVS",
        "t": "حيّ",
        "s": "Det är en livs levande älg.",
        "st": "إنه лось حي يرزق."
    },
    {
        "w": "LJUS",
        "t": "ضوء / شمعة",
        "s": "Tänd ett ljus.",
        "st": "أشعل شمعة."
    },
    {
        "w": "LOGI",
        "t": "مَسكن مُؤَقّت",
        "s": "kost och logi",
        "st": "طعام وسكن"
    },
    {
        "w": "LÖGN",
        "t": "كذبة",
        "s": "Det var en lögn.",
        "st": "كانت تلك كذبة."
    },
    {
        "w": "LOK",
        "t": "قاطرة",
        "s": "Tåget dras av ett lok.",
        "st": "القطار تسحبه قاطرة."
    },
    {
        "w": "LÖK",
        "t": "بصل",
        "s": "Jag hackar lök till såsen.",
        "st": "أفرم البصل للصلصة."
    },
    {
        "w": "LOKAL",
        "t": "محلي",
        "s": "Vi hyrde en lokal för festen.",
        "st": "استأجرنا مكاناً للحفلة."
    },
    {
        "w": "LÖKAR",
        "t": "بصل (جمع)",
        "s": "Vi behöver lök till maten.",
        "st": "نحتاج بصل للطبخ."
    },
    {
        "w": "LÖN",
        "t": "راتب",
        "s": "Jag har fått min lön.",
        "st": "لقد استلمت راتبي."
    },
    {
        "w": "LOS",
        "t": "يفك",
        "s": "Vi måste kasta loss nu genast.",
        "st": "يجب أن نفك الحبال ونبحر فوراً."
    },
    {
        "w": "LOTS",
        "t": "مرشد",
        "s": "Fartyget behövde en lots för att komma in.",
        "st": "احتاجت السفينة إلى مرشد للدخول."
    },
    {
        "w": "LOTTA",
        "t": "جُندية مُتَطَوِّعة",
        "s": "Lotta är en lottakår.",
        "st": "لوتا هي مجندة متطوعة."
    },
    {
        "w": "LÖV",
        "t": "ورقة شجر",
        "s": "Gula löv faller från träden.",
        "st": "أوراق صفراء تتساقط من الأشجار."
    },
    {
        "w": "LUGN",
        "t": "هادئ",
        "s": "Han är en lugn person.",
        "st": "هو شخص هادئ."
    },
    {
        "w": "LUKT",
        "t": "شَمّ",
        "s": "lukt och smak",
        "st": "شَمّ وذَوْق"
    },
    {
        "w": "LUKTAR",
        "t": "تفوح منه رائحة",
        "s": "fisken luktar illa du luktar rök",
        "st": "تفوح رائحة كريهة من السمك تفوح منك رائحة الدخان"
    },
    {
        "w": "LUNCH",
        "t": "غداء",
        "s": "Vi äter lunch klockan tolv.",
        "st": "نحن نتناول الغداء الساعة الثانية عشرة."
    },
    {
        "w": "LUND",
        "t": "بستان",
        "s": "En lund.",
        "st": "بستان."
    },
    {
        "w": "LURA",
        "t": "يخدع",
        "s": "Du kan inte lura mig.",
        "st": "لا يمكنك خداعي."
    },
    {
        "w": "LUS",
        "t": "قملة",
        "s": "En lus i håret.",
        "st": "قملة في الشعر."
    },
    {
        "w": "LUTA",
        "t": "يميل",
        "s": "Luta dig.",
        "st": "استند."
    },
    {
        "w": "MAG",
        "t": "قدرة / معدة",
        "s": "Hon har en stark mag.",
        "st": "لديها معدة قوية."
    },
    {
        "w": "MAGE",
        "t": "معدة",
        "s": "Jag har ont i magen.",
        "st": "لدي ألم في معدتي."
    },
    {
        "w": "MAKRILL",
        "t": "إسقمري",
        "s": "Rökt makrill är gott.",
        "st": "الإسقمري المدخن لذيذ."
    },
    {
        "w": "MAKT",
        "t": "سلطة / قوة",
        "s": "Politiker har stor makt.",
        "st": "السياسيون لديهم سلطة كبيرة."
    },
    {
        "w": "MAL",
        "t": "سمك السلور",
        "s": "Malen är en stor fisk.",
        "st": "السلور سمكة كبيرة."
    },
    {
        "w": "MAN",
        "t": "شخص",
        "s": "Man ska vara god.",
        "st": "يجب على المرء أن يكون صالحاً."
    },
    {
        "w": "MANAT",
        "t": "حث",
        "s": "Han har manat till lugn och ro.",
        "st": "لقد دعا إلى الهدوء والسكينة."
    },
    {
        "w": "MARK",
        "t": "أرض",
        "s": "Sitta på marken.",
        "st": "الجلوس على الأرض."
    },
    {
        "w": "MÄRKE",
        "t": "ماركة / علامة",
        "s": "Det är ett känt märke.",
        "st": "إنها ماركة معروفة."
    },
    {
        "w": "MAST",
        "t": "صاري",
        "s": "Segelbåtens mast är stark.",
        "st": "صاري المركب الشراعي قوي."
    },
    {
        "w": "MAT",
        "t": "طعام",
        "s": "God mat på restaurangen.",
        "st": "طعام جيد في المطعم."
    },
    {
        "w": "MÄTA",
        "t": "يقيس",
        "s": "Mäta.",
        "st": "يقيس."
    },
    {
        "w": "MÄTAR",
        "t": "عداد",
        "s": "Vi måste läsa av elmätaren nu.",
        "st": "يجب أن نقرأ عداد الكهرباء الآن."
    },
    {
        "w": "MATEN",
        "t": "الطعام",
        "s": "Kom och ät, maten är klar!",
        "st": "تعالوا لتناول الطعام، الأكل جاهز!"
    },
    {
        "w": "MATRÄTT",
        "t": "طبق",
        "s": "Vilken är din favorit maträtt?",
        "st": "ما هو طبقك المفضل؟"
    },
    {
        "w": "MATROS",
        "t": "بحار",
        "s": "Han jobbar som matros på färjan.",
        "st": "يعمل كبحار على العبارة."
    },
    {
        "w": "MATT",
        "t": "ضعيف",
        "s": "Färgen är matt.",
        "st": "اللون باهت."
    },
    {
        "w": "MÄTT",
        "t": "شبعان",
        "s": "Jag är proppmätt.",
        "st": "أنا شبعان تماماً."
    },
    {
        "w": "MATTA",
        "t": "سجادة",
        "s": "Vi köpte en ny matta till vardagsrummet.",
        "st": "اشترينا سجادة جديدة لغرفة المعيشة."
    },
    {
        "w": "MATTAN",
        "t": "السجادة",
        "s": "Katten ligger och sover på mattan.",
        "st": "القطة نائمة على السجادة."
    },
    {
        "w": "MED",
        "t": "مع",
        "s": "Kom med mig.",
        "st": "تعال معي."
    },
    {
        "w": "MEDICIN",
        "t": "دواء",
        "s": "Ta din medicin i tid.",
        "st": "تناول دواءك في الوقت المحدد."
    },
    {
        "w": "MEN",
        "t": "لكن",
        "s": "Det är sant, men svårt.",
        "st": "هذا صحيح، لكنه صعب."
    },
    {
        "w": "MER",
        "t": "أكثر",
        "s": "Jag vill ha mer mat.",
        "st": "أريد المزيد من الطعام."
    },
    {
        "w": "MESON",
        "t": "ميزون",
        "s": "Meson.",
        "st": "ميزون (فيزياء)."
    },
    {
        "w": "META",
        "t": "يصطاد",
        "s": "Att meta fisk är roligt.",
        "st": "صيد السمك ممتع."
    },
    {
        "w": "MIDDAG",
        "t": "عشاء",
        "s": "Vad blir det till middag?",
        "st": "ماذا للعشاء؟"
    },
    {
        "w": "MILA",
        "t": "ميل",
        "s": "De vandrade en hel mila.",
        "st": "ساروا ميلاً كاملاً."
    },
    {
        "w": "MJÖL",
        "t": "طحين",
        "s": "Vi behöver mjöl för att baka bröd.",
        "st": "نحتاج الطحين لخبز الخبز."
    },
    {
        "w": "MJÖLK",
        "t": "حليب",
        "s": "Barnet dricker ett glas kall mjölk.",
        "st": "يشرب الطفل كوباً من الحليب البارد."
    },
    {
        "w": "MJUK",
        "t": "ناعم",
        "s": "Kudden är väldigt mjuk och skön.",
        "st": "الوسادة ناعمة ومريحة جداً."
    },
    {
        "w": "MÖ",
        "t": "عذراء (قديم)",
        "s": "En ung mö.",
        "st": "فتاة شابة."
    },
    {
        "w": "MOD",
        "t": "شجاعة",
        "s": "Det krävs mod för att tala sanning.",
        "st": "يتطلب الأمر شجاعة لقول الحقيقة."
    },
    {
        "w": "MODE",
        "t": "موضة",
        "s": "Mode växlar snabbt.",
        "st": "الموضة تتغير بسرعة."
    },
    {
        "w": "MODERN",
        "t": "حديث",
        "s": "Det är en modern byggnad.",
        "st": "إنه مبنى حديث."
    },
    {
        "w": "MOLN",
        "t": "سحابة",
        "s": "Ett vitt moln på himlen.",
        "st": "سحابة بيضاء في السماء."
    },
    {
        "w": "MOR",
        "t": "أم",
        "s": "Min mor älskar att resa.",
        "st": "أمي تحب السفر."
    },
    {
        "w": "MÖR",
        "t": "طري",
        "s": "Köttet är mört.",
        "st": "اللحم طري."
    },
    {
        "w": "MORFAR",
        "t": "جد (أب الأم)",
        "s": "Morfar berättar sagor.",
        "st": "جدي يحكي قصصاً."
    },
    {
        "w": "MOS",
        "t": "هريس",
        "s": "Jag vill ha korv med mos.",
        "st": "أريد سجقاً مع الهريس."
    },
    {
        "w": "MOSKÉ",
        "t": "مسجد",
        "s": "En vacker moské.",
        "st": "مسجد جميل."
    },
    {
        "w": "MOSKÉN",
        "t": "المسجد",
        "s": "Vi går till moskén på fredagar.",
        "st": "نذهب إلى المسجد أيام الجمعة."
    },
    {
        "w": "MOT",
        "t": "نحو / ضد",
        "s": "Båten seglar mot vinden.",
        "st": "يبحر القارب ضد الريح."
    },
    {
        "w": "MÖTE",
        "t": "اجتماع",
        "s": "Vi har ett viktigt möte.",
        "st": "لدينا اجتماع مهم."
    },
    {
        "w": "MOTOR",
        "t": "محرك",
        "s": "Bilens motor låter konstigt.",
        "st": "محرك السيارة يصدر صوتاً غريباً."
    },
    {
        "w": "MUR",
        "t": "جدار",
        "s": "De byggde en hög mur runt huset.",
        "st": "بنوا جداراً عالياً حول المنزل."
    },
    {
        "w": "MUS",
        "t": "فأر",
        "s": "Katten fångade en mus.",
        "st": "أمسكت القطة فأراً."
    },
    {
        "w": "MYRA",
        "t": "نملة",
        "s": "En liten myra bär ett stort blad.",
        "st": "نملة صغيرة تحمل ورقة كبيرة."
    },
    {
        "w": "MYROR",
        "t": "نمل",
        "s": "Myror är mycket starka insekter.",
        "st": "النمل حشرات قوية جداً."
    },
    {
        "w": "NÅ",
        "t": "يصل",
        "s": "Har du nått fram?",
        "st": "هل وصلت؟"
    },
    {
        "w": "NÅL",
        "t": "إبرة",
        "s": "nål och tråd",
        "st": "إبرة وخيط"
    },
    {
        "w": "NÄR",
        "t": "متى؟",
        "s": "när kommer tåget?",
        "st": "متى سيأتي القطار؟"
    },
    {
        "w": "NÄRDE",
        "t": "غذى",
        "s": "Han närde en dröm.",
        "st": "كان يغذي حلماً."
    },
    {
        "w": "NÄS",
        "t": "برزخ",
        "s": "Ett näs.",
        "st": "برزخ."
    },
    {
        "w": "NATO",
        "t": "الناتو",
        "s": "NATO är en försvarsallians.",
        "st": "الناتو تحالف دفاعي."
    },
    {
        "w": "NATT",
        "t": "ليل",
        "s": "Katten jagar möss på natten.",
        "st": "القط يطارد الفئران في الليل."
    },
    {
        "w": "NATUR",
        "t": "طبيعة",
        "s": "Sverige har en mycket vacker natur.",
        "st": "تتمتع السويد بطبيعة جميلة جداً."
    },
    {
        "w": "NATUREN",
        "t": "الطبيعة",
        "s": "Vi måste alla hjälpas åt att skydda naturen.",
        "st": "يجب أن نتعاون جميعاً لحماية الطبيعة."
    },
    {
        "w": "NAV",
        "t": "محور",
        "s": "Navet är hjulets viktigaste del.",
        "st": "المحور هو أهم جزء في العجلة."
    },
    {
        "w": "NEDAN",
        "t": "إلى الأسفل",
        "s": "bilden nedan till vänster",
        "st": "الصورة السُفليّة اليُسرى"
    },
    {
        "w": "NERE",
        "t": "مُكْتَئِب",
        "s": "Katten är där nere.",
        "st": "القطة هناك في الأسفل."
    },
    {
        "w": "NERVÖS",
        "t": "مُضطرب, عصبيّ",
        "s": "vara nervös inför en tävling",
        "st": "شعر بقلق قُبَيل المباراة"
    },
    {
        "w": "NI",
        "t": "أنتم",
        "s": "Kommer ni?",
        "st": "هل أنتم جاهزون؟"
    },
    {
        "w": "NIT",
        "t": "خسارة",
        "s": "Det var en nit.",
        "st": "كانت ورقة خاسرة."
    },
    {
        "w": "NÖD",
        "t": "ضَرُورَة, عَوَز - حاجة - محنة - كرب - خطر",
        "s": "en människa i nöd",
        "st": "إنسان في حالة العوز"
    },
    {
        "w": "NOG",
        "t": "ربما / كاف",
        "s": "Det är nog sant.",
        "st": "ربما يكون ذلك صحيحاً."
    },
    {
        "w": "NORD",
        "t": "شمال",
        "s": "vind mellan nord och nordost",
        "st": "الرياح ما بين شمالية وشمال شرقية"
    },
    {
        "w": "NORPA",
        "t": "يسرق",
        "s": "Norpa.",
        "st": "يسرق."
    },
    {
        "w": "NORR",
        "t": "شمال",
        "s": "Vi åker norr ut.",
        "st": "نسافر نحو الشمال."
    },
    {
        "w": "NOT",
        "t": "نوتة",
        "s": "Varje not i melodin.",
        "st": "كل نوتة في اللحن."
    },
    {
        "w": "NÖT",
        "t": "جوز",
        "s": "En hård nöt att knäcka.",
        "st": "جوزة صعبة الكسر."
    },
    {
        "w": "NOTA",
        "t": "فاتورة",
        "s": "Kan vi få notan, tack?",
        "st": "هل يمكننا الحصول على الفاتورة؟"
    },
    {
        "w": "NYCKEL",
        "t": "مفتاح",
        "s": "Jag tappade min nyckel.",
        "st": "أضعت مفتاحي."
    },
    {
        "w": "ÖDE",
        "t": "قدر/مهجور",
        "s": "en öde ö",
        "st": "هذا قدرك."
    },
    {
        "w": "ODEN",
        "t": "أودين",
        "s": "Oden var en mäktig gud i mytologin.",
        "st": "كان أودين إلهاً قوياً في الأساطير."
    },
    {
        "w": "OENIG",
        "t": "غَير مُتَّفِق",
        "s": "partierna är oeniga ifråga om kärnkraften",
        "st": "كان الطرفان غير مُتَّفِقين حول مسألة الطاقة الذرية"
    },
    {
        "w": "ÖGA",
        "t": "عين",
        "s": "Håll ett öga på barnen.",
        "st": "ابقِ عينك على الأطفال."
    },
    {
        "w": "OK",
        "t": "حسناً",
        "s": "Det är helt ok.",
        "st": "حسناً، سأفعل ذلك."
    },
    {
        "w": "ÖKNA",
        "t": "لقب",
        "s": "Ett roligt öknamn.",
        "st": "لقب مضحك."
    },
    {
        "w": "ÖL",
        "t": "بيرة",
        "s": "En kall öl.",
        "st": "بيرة باردة."
    },
    {
        "w": "OM",
        "t": "حول/إذا",
        "s": "Berätta om det.",
        "st": "أخبرني عن ذلك."
    },
    {
        "w": "ÖM",
        "t": "حساس/مؤلم",
        "s": "Min fot är öm.",
        "st": "قدمي تؤلمني."
    },
    {
        "w": "ÖN",
        "t": "الجزيرة",
        "s": "Vi åkte båt till en öde ö.",
        "st": "ذهبنا بالقارب إلى جزيرة مهجورة."
    },
    {
        "w": "OND",
        "t": "غاضب",
        "s": "Han har ont i magen.",
        "st": "لديه ألم في البطن."
    },
    {
        "w": "OPP",
        "t": "فوق",
        "s": "Opp och hoppa!",
        "st": "انهض واقفز!"
    },
    {
        "w": "ÖRA",
        "t": "أذن",
        "s": "Jag har ont i mitt öra.",
        "st": "أذني تؤلمني."
    },
    {
        "w": "ORANGE",
        "t": "برتقالي",
        "s": "Apelsinen är orange.",
        "st": "البرتقالة برتقالية."
    },
    {
        "w": "ORD",
        "t": "كلمة",
        "s": "Jag håller mitt ord.",
        "st": "أحافظ على كلمتي."
    },
    {
        "w": "ORDNAR",
        "t": "يُنَظِّم",
        "s": "Jag ordnar festen.",
        "st": "أنا أنظم الحفلة."
    },
    {
        "w": "ÖRE",
        "t": "أوره",
        "s": "det stämmer på öret",
        "st": "الحساب مضبوط بالأوره"
    },
    {
        "w": "ORK",
        "t": "طاقة",
        "s": "Jag har ingen ork.",
        "st": "ليس لدي طاقة."
    },
    {
        "w": "ORM",
        "t": "ثعبان",
        "s": "En orm korsade vägen.",
        "st": "ثعبان عبر الطريق."
    },
    {
        "w": "ORMAR",
        "t": "ثعابين",
        "s": "Ormar.",
        "st": "ثعابين."
    },
    {
        "w": "ÖRN",
        "t": "نسر",
        "s": "Örnen flyger högt över bergen.",
        "st": "النسر يطير عالياً فوق الجبال."
    },
    {
        "w": "ORO",
        "t": "قلق",
        "s": "Jag känner en viss oro för framtiden.",
        "st": "أشعر ببعض القلق تجاه المستقبل."
    },
    {
        "w": "ORT",
        "t": "مكان",
        "s": "En liten ort.",
        "st": "مكان صغير."
    },
    {
        "w": "ÖRT",
        "t": "عشبة",
        "s": "Timjan är en doftande ört.",
        "st": "الزعتر عشبة فواحة."
    },
    {
        "w": "ORTEN",
        "t": "الحي",
        "s": "Från orten.",
        "st": "من الحي."
    },
    {
        "w": "ORTER",
        "t": "أماكن",
        "s": "Vi besökte vackra orter.",
        "st": "زرنا أماكن جميلة."
    },
    {
        "w": "OS",
        "t": "دخان / رائحة كريهة",
        "s": "Det luktar os från köket.",
        "st": "تفوح رائحة دخان من المطبخ."
    },
    {
        "w": "OST",
        "t": "جبن",
        "s": "Jag älskar ost på mackan.",
        "st": "أحب الجبن على الشطيرة."
    },
    {
        "w": "ÖST",
        "t": "شرق",
        "s": "Solen går upp i öst.",
        "st": "الشمس تشرق من الشرق."
    },
    {
        "w": "OSTAR",
        "t": "أجبان",
        "s": "Vi provade många olika ostar.",
        "st": "جربنا العديد من الأجبان المختلفة."
    },
    {
        "w": "ÖSTER",
        "t": "شرق",
        "s": "Solen går alltid upp i öster.",
        "st": "الشمس تشرق دائماً من الشرق."
    },
    {
        "w": "ÖT",
        "t": "فوق الوقت (عامية)",
        "s": "Han jobbade övertid.",
        "st": "عمل إضافي."
    },
    {
        "w": "OTAKT",
        "t": "عدم انتظام",
        "s": "komma i otakt",
        "st": "حالة عدم انتظام"
    },
    {
        "w": "OTAL",
        "t": "لا يُحصى",
        "s": "Ett otal gånger.",
        "st": "مرات لا تحصى."
    },
    {
        "w": "OTUR",
        "t": "سوء حظ",
        "s": "han hade oturen att missa tåget",
        "st": "لسوء الحظ فاته القطار"
    },
    {
        "w": "ÖVRE",
        "t": "علوي",
        "s": "i övre delen av backen",
        "st": "في الجزء العلوي من الهضبة"
    },
    {
        "w": "PÅ",
        "t": "على",
        "s": "Det är skönt att ligga på soffan.",
        "st": "من الرائع الاستلقاء على الأريكة."
    },
    {
        "w": "PACKA",
        "t": "يحزم",
        "s": "Jag packar min väska.",
        "st": "أنا أحزم حقيبتي."
    },
    {
        "w": "PAKET",
        "t": "طرد / حزمة",
        "s": "Jag fick ett stort paket med posten.",
        "st": "تلقيت طرداً كبيراً بالبريد."
    },
    {
        "w": "PAR",
        "t": "زوجان",
        "s": "ett par skor ett äkta par",
        "st": "زوجا أحذية زوجان شرعيّان"
    },
    {
        "w": "PASS",
        "t": "جواز سفر",
        "s": "Glöm inte ditt pass.",
        "st": "لا تنس جواز سفرك."
    },
    {
        "w": "PASTA",
        "t": "معكرونة",
        "s": "Vi äter pasta idag.",
        "st": "نأكل المعكرونة اليوم."
    },
    {
        "w": "PASTOR",
        "t": "قِسّ",
        "s": "Pastorn talade i kyrkan.",
        "st": "تحدث القس في الكنيسة."
    },
    {
        "w": "PATOS",
        "t": "شعور, عاطفة",
        "s": "hennes politiska patos",
        "st": "مشاعرها السياسيّة"
    },
    {
        "w": "PENGAR",
        "t": "نقود",
        "s": "Har du några pengar?",
        "st": "هل لديك أي نقود؟"
    },
    {
        "w": "PENNA",
        "t": "قلم",
        "s": "Skriv med en penna.",
        "st": "اكتب بقلم."
    },
    {
        "w": "PENNOR",
        "t": "أقلام",
        "s": "Jag har många färgglada pennor.",
        "st": "لدي العديد من الأقلام الملونة."
    },
    {
        "w": "PENSION",
        "t": "تقاعد",
        "s": "Han gick i pension vid 65 års ålder.",
        "st": "تقاعد في سن الخامسة والستين."
    },
    {
        "w": "PEPPAR",
        "t": "فلفل",
        "s": "Peppar är starkt.",
        "st": "الفلفل حار."
    },
    {
        "w": "PER",
        "t": "اسم",
        "s": "Per är ett namn.",
        "st": "بير هو اسم."
    },
    {
        "w": "PET",
        "t": "نكز",
        "s": "En lätt pet i sidan.",
        "st": "نكزة خفيفة في الجانب."
    },
    {
        "w": "PIL",
        "t": "سهم",
        "s": "En pil pekar åt höger.",
        "st": "سهم يشير إلى اليمين."
    },
    {
        "w": "PILOT",
        "t": "طيار",
        "s": "Piloten flyger planet.",
        "st": "يقود الطيار الطائرة."
    },
    {
        "w": "PILT",
        "t": "صبي",
        "s": "En liten pilt lekte på gården.",
        "st": "صبي صغير كان يلعب في الفناء."
    },
    {
        "w": "PION",
        "t": "فاوانيا",
        "s": "En vacker pion blommar i trädgården.",
        "st": "زهرة فاوانيا جميلة تزهر في الحديقة."
    },
    {
        "w": "PLAN",
        "t": "طائرة / خطة",
        "s": "Vi har en plan.",
        "st": "لدينا خطة."
    },
    {
        "w": "PLANET",
        "t": "كوكب",
        "s": "Jorden är en planet.",
        "st": "الأرض كوكب."
    },
    {
        "w": "PLATS",
        "t": "مكان",
        "s": "Var vänlig och ta plats i väntrummet.",
        "st": "تفضل بالجلوس في غرفة الانتظار."
    },
    {
        "w": "PLIKT",
        "t": "واجب",
        "s": "Det är din plikt att hjälpa till.",
        "st": "إنه واجبك أن تساعد."
    },
    {
        "w": "PLUS",
        "t": "زائد",
        "s": "Det är ett stort plus i kanten.",
        "st": "هذه ميزة إضافية كبيرة."
    },
    {
        "w": "POET",
        "t": "شاعر",
        "s": "Han var en känd poet.",
        "st": "كان شاعراً مشهوراً."
    },
    {
        "w": "POL",
        "t": "قطب",
        "s": "Nordpolen är kall.",
        "st": "القطب الشمالي بارد."
    },
    {
        "w": "POLIS",
        "t": "شرطة",
        "s": "Ring polisen om du ser något.",
        "st": "اتصل بالشرطة إذا رأيت شيئاً."
    },
    {
        "w": "POP",
        "t": "بوب",
        "s": "Han gillar pop musik.",
        "st": "هو يحب موسيقى البوب."
    },
    {
        "w": "PORT",
        "t": "بوابة",
        "s": "Paradisets port.",
        "st": "بوابة الجنة."
    },
    {
        "w": "POSERAR",
        "t": "يَتَّخذ وضعاً متكلفاً",
        "s": "hon poserar framför kameran",
        "st": "تَتَّخذ وضعاً أمام الكاميرا"
    },
    {
        "w": "POSTER",
        "t": "ملصقات / بنود",
        "s": "Det hänger många poster på väggen.",
        "st": "هناك العديد من الملصقات معلقة على الجدار."
    },
    {
        "w": "PRAT",
        "t": "ثَرثرة",
        "s": "det är bara löst prat",
        "st": "هذه مجرد ثرثرة"
    },
    {
        "w": "PRIS",
        "t": "سعر",
        "s": "Vad är det för pris på tröjan?",
        "st": "ما هو سعر السترة؟"
    },
    {
        "w": "PRO",
        "t": "لصالح",
        "s": "Han är pro fred.",
        "st": "هو مؤيد للسلام."
    },
    {
        "w": "PROFET",
        "t": "نبي",
        "s": "Muhammed är Guds sista profet.",
        "st": "محمد هو خاتم أنبياء الله."
    },
    {
        "w": "PROV",
        "t": "اختبار",
        "s": "Vi har ett svårt prov imorgon.",
        "st": "لدينا اختبار صعب غداً."
    },
    {
        "w": "PROVA",
        "t": "يجرب",
        "s": "Prova.",
        "st": "يجرب."
    },
    {
        "w": "PULS",
        "t": "نبض",
        "s": "Känn din puls.",
        "st": "تحسس نبضك."
    },
    {
        "w": "RÅ",
        "t": "نيء",
        "s": "Köttet är rått.",
        "st": "لحم نيء."
    },
    {
        "w": "RÅA",
        "t": "نيئة",
        "s": "Grönsakerna är godast råa.",
        "st": "الخضروات ألذ وهي نيئة."
    },
    {
        "w": "RAD",
        "t": "مجموعة",
        "s": "Stå i en rad.",
        "st": "قف في صف."
    },
    {
        "w": "RADER",
        "t": "صفوف",
        "s": "Läs mellan raderna.",
        "st": "اقرأ ما بين السطور."
    },
    {
        "w": "RADERGUMMI",
        "t": "ممحاة",
        "s": "Jag använder radergummi.",
        "st": "أستخدم الممحاة."
    },
    {
        "w": "RAFSA",
        "t": "يجمع بسرعة",
        "s": "Rafsa ihop.",
        "st": "يجمع بسرعة."
    },
    {
        "w": "RÅG",
        "t": "جاودار",
        "s": "Detta bröd är bakat av råg.",
        "st": "هذا الخبز مخبوز من الجاودار."
    },
    {
        "w": "RÅGAD",
        "t": "طافح",
        "s": "en rågad sked",
        "st": "ملعقة طافحة"
    },
    {
        "w": "RAK",
        "t": "مستقيم",
        "s": "Rita en rak linje med linjalen.",
        "st": "ارسم خطاً مستقيماً بالمسطرة."
    },
    {
        "w": "RAKA",
        "t": "مستقيم",
        "s": "Gå raka vägen hem.",
        "st": "اذهب مباشرة إلى المنزل."
    },
    {
        "w": "RAKAR",
        "t": "يَحْلِق ذَقْنَه",
        "s": "han rakar sig bara varannan dag",
        "st": "يحلق ذقنه مرة كل يومين فقط"
    },
    {
        "w": "RÄLS",
        "t": "قضيب ( من قضبان السكة الحديدية )",
        "s": "tåget går på räls",
        "st": "يسير القطار على السكة الحديدية"
    },
    {
        "w": "RANKA",
        "t": "كرمة",
        "s": "En ranka.",
        "st": "كرمة."
    },
    {
        "w": "RÄNNA",
        "t": "مزراب",
        "s": "En ränna.",
        "st": "مزراب."
    },
    {
        "w": "RÄNTA",
        "t": "فائدة",
        "s": "Ränta på ränta ger stor effekt.",
        "st": "الفائدة المركبة تعطي تأثيراً كبيراً."
    },
    {
        "w": "RAPP",
        "t": "سريع",
        "s": "ett rappt svar",
        "st": "إجابة سريعة"
    },
    {
        "w": "RAPS",
        "t": "لفت",
        "s": "Gula fält av raps.",
        "st": "حقول صفراء من اللفت."
    },
    {
        "w": "RAS",
        "t": "انهيار",
        "s": "Det gick ett ras i bergen.",
        "st": "حدث انهيار في الجبال."
    },
    {
        "w": "RASAR",
        "t": "ينهار",
        "s": "Huset rasar.",
        "st": "المنزل ينهار."
    },
    {
        "w": "RASAT",
        "t": "انهار",
        "s": "Taket har rasat in.",
        "st": "لقد انهار السقف."
    },
    {
        "w": "RASK",
        "t": "سَريع",
        "s": "gå med raska steg",
        "st": "سار بخطىً سريعة"
    },
    {
        "w": "RAST",
        "t": "استراحة",
        "s": "Barnen leker ute på sin rast.",
        "st": "الأطفال يلعبون في الخارج خلال استراحتهم."
    },
    {
        "w": "RÅT",
        "t": "نيء",
        "s": "Man ska inte äta rått kött.",
        "st": "لا ينبغي أكل اللحم الني."
    },
    {
        "w": "RÄT",
        "t": "مستقيم",
        "s": "en rät linje",
        "st": "مستقيم خط"
    },
    {
        "w": "RATA",
        "t": "يرفض",
        "s": "Man ska inte rata mat.",
        "st": "لا ينبغي رفض الطعام."
    },
    {
        "w": "RATT",
        "t": "مِقْوَد",
        "s": "sitta vid ratten",
        "st": "جلس وراء عجلة القيادة"
    },
    {
        "w": "RÄTT",
        "t": "حق",
        "s": "Alla har rätt till rättvisa.",
        "st": "للجميع الحق في العدالة."
    },
    {
        "w": "RÄV",
        "t": "ثعلب",
        "s": "En röd räv i skogen.",
        "st": "ثعلب أحمر في الغابة."
    },
    {
        "w": "REA",
        "t": "تخفيضات",
        "s": "Det är stor rea i butiken.",
        "st": "هناك تخفيضات كبيرة في المتجر."
    },
    {
        "w": "RECEPT",
        "t": "وصفة طبية",
        "s": "Läkaren skrev ett recept.",
        "st": "كتب الطبيب وصفة طبية."
    },
    {
        "w": "RED",
        "t": "ركب",
        "s": "Profeten red en kamel.",
        "st": "ركب النبي جملاً."
    },
    {
        "w": "REDIG",
        "t": "جَلِيّ",
        "s": "ett redigt och klart resonemang",
        "st": "نقاش واضح وجليّ"
    },
    {
        "w": "REGEL",
        "t": "قاعدة",
        "s": "Ingen regel utan undantag.",
        "st": "لا توجد قاعدة بدون استثناء."
    },
    {
        "w": "REGI",
        "t": "إخراج",
        "s": "regi och dekor",
        "st": "إخراج و ديكور"
    },
    {
        "w": "REGLA",
        "t": "يغلق بمزلاج",
        "s": "Du måste regla dörren ordentligt.",
        "st": "يجب عليك إغلاق الباب بالمزلاج بإحكام."
    },
    {
        "w": "REGLER",
        "t": "قواعد",
        "s": "Det finns regler man måste följa.",
        "st": "هناك قواعد يجب اتباعها."
    },
    {
        "w": "REGN",
        "t": "مطر",
        "s": "Efter regn kommer solsken.",
        "st": "بعد المطر يأتي شروق الشمس."
    },
    {
        "w": "REGNA",
        "t": "تمطر",
        "s": "Det ska regna imorgon.",
        "st": "ستمطر غداً."
    },
    {
        "w": "REKA",
        "t": "يستطلع",
        "s": "Vi måste reka området först.",
        "st": "يجب أن نستطلع المنطقة أولاً."
    },
    {
        "w": "REN",
        "t": "نظيف",
        "s": "Vattnet är rent.",
        "st": "الماء نظيف."
    },
    {
        "w": "RENAR",
        "t": "حيوانات الرنة",
        "s": "Renar lever i norr.",
        "st": "تعيش الرنة في الشمال."
    },
    {
        "w": "REP",
        "t": "حبل",
        "s": "Ett rep är starkare än en tråd.",
        "st": "الحبل أقوى من الخيط."
    },
    {
        "w": "REPA",
        "t": "خَدْش",
        "s": "en repa i lacken",
        "st": "خَدْش في الدهان"
    },
    {
        "w": "REPAN",
        "t": "الخدش",
        "s": "Repan i lacken var djup.",
        "st": "الخدش في الطلاء كان عميقاً."
    },
    {
        "w": "RES",
        "t": "سافر",
        "s": "Res dig upp och kämpa vidare.",
        "st": "انهض وواصل الكفاح."
    },
    {
        "w": "RESA",
        "t": "سفر",
        "s": "Vi ska på en lång resa.",
        "st": "سنذهب في رحلة طويلة."
    },
    {
        "w": "RESAN",
        "t": "الرحلة",
        "s": "Resan var lång.",
        "st": "كانت الرحلة طويلة."
    },
    {
        "w": "RESÄR",
        "t": "مطاط",
        "s": "Byxorna har resår i midjan.",
        "st": "السراويل لها مطاط في الخصر."
    },
    {
        "w": "RESOR",
        "t": "رحلات",
        "s": "Mina resor har lärt mig mycket.",
        "st": "رحلاتي علمتني الكثير."
    },
    {
        "w": "REST",
        "t": "سافر",
        "s": "Vi har rest hela dagen.",
        "st": "سافرنا طوال اليوم."
    },
    {
        "w": "RET",
        "t": "إغاظة",
        "s": "Han gjorde det bara på ret.",
        "st": "فعل ذلك فقط للإغاظة."
    },
    {
        "w": "RETAS",
        "t": "يُمازح",
        "s": "barnen retas med varandra",
        "st": "يتمازح الأطفال مع بعضهم الآخر"
    },
    {
        "w": "REV",
        "t": "شقوق / صدع",
        "s": "Det blev en rev i kläd",
        "st": "حدث شق في الملابس."
    },
    {
        "w": "REVS",
        "t": "هُدم",
        "s": "Huset revs.",
        "st": "هُدم المنزل."
    },
    {
        "w": "RIK",
        "t": "ثَريّ",
        "s": "en rik kvinna",
        "st": "امرأة ثريّة"
    },
    {
        "w": "RIKA",
        "t": "أغنياء",
        "s": "De är rika på erfarenheter.",
        "st": "هم أغنياء بالتجارب."
    },
    {
        "w": "RIKARE",
        "t": "أغنى",
        "s": "De rika blir allt rikare.",
        "st": "الأغنياء يزدادون غنى."
    },
    {
        "w": "RIKE",
        "t": "دولة",
        "s": "fara land och rike runt",
        "st": "تَجَوَّل في أنحاء البلاد"
    },
    {
        "w": "RING",
        "t": "خاتم",
        "s": "Hon bär en vacker guldring på fingret.",
        "st": "ترتدي خاتماً ذهبياً جميلاً في إصبعها."
    },
    {
        "w": "RINGA",
        "t": "يتصل",
        "s": "Jag ska ringa dig senare ikväll.",
        "st": "سأتصل بك لاحقاً هذا المساء."
    },
    {
        "w": "RIS",
        "t": "أرز",
        "s": "Vi äter kyckling och ris.",
        "st": "نأكل الدجاج والأرز."
    },
    {
        "w": "RISK",
        "t": "خطر",
        "s": "Det finns alltid en risk med affärer.",
        "st": "هناك دائماً مخاطرة في الأعمال التجارية."
    },
    {
        "w": "RITEN",
        "t": "الطقس",
        "s": "Riten utfördes med stort allvar.",
        "st": "أقيمت الطقوس بجدية كبيرة."
    },
    {
        "w": "RIV",
        "t": "مزق",
        "s": "Riv inte sönder pappret.",
        "st": "لا تمزق الورقة."
    },
    {
        "w": "RIVA",
        "t": "يهدم / يمزق",
        "s": "De ska riva det gamla huset.",
        "st": "سيهدمون المنزل القديم."
    },
    {
        "w": "RO",
        "t": "هدوء",
        "s": "Jag vill ha lugn och ro.",
        "st": "أريد الهدوء والسكينة."
    },
    {
        "w": "RÖD",
        "t": "أحمر",
        "s": "röd tråd ( sammanhang )",
        "st": "خيط دليلي ( سياق الكلام )"
    },
    {
        "w": "RÖDA",
        "t": "حمر",
        "s": "Hon fick röda rosor på sin födelsedag.",
        "st": "حصلت على ورود حمراء في عيد ميلادها."
    },
    {
        "w": "RÖK",
        "t": "دخان",
        "s": "Ingen rök utan eld.",
        "st": "لا دخان بلا نار."
    },
    {
        "w": "ROLL",
        "t": "دَوْر",
        "s": "spela rollen som Hamlet",
        "st": "أدّى دور هاملت"
    },
    {
        "w": "ROM",
        "t": "بطرخ / روما",
        "s": "Alla vägar bär till Rom.",
        "st": "كل الطرق تؤدي إلى روما."
    },
    {
        "w": "RÖN",
        "t": "إكتشاف",
        "s": "Nya rön om hälsa.",
        "st": "اكتشافات جديدة حول الصحة."
    },
    {
        "w": "ROND",
        "t": "دَورة",
        "s": "läkaren gick ronden",
        "st": "قام الطبيب بجولة استطلاع"
    },
    {
        "w": "RÖNN",
        "t": "شجرة الغبيراء",
        "s": "Rönnens bär är röda på hösten.",
        "st": "توت الغبيراء أحمر في الخريف."
    },
    {
        "w": "ROP",
        "t": "صرخة",
        "s": "Ett rop på hjälp.",
        "st": "صرخة طلب للمساعدة."
    },
    {
        "w": "ROPEN",
        "t": "الصرخات",
        "s": "Ropen skallade över torget.",
        "st": "دوت الصرخات في الساحة."
    },
    {
        "w": "ROPET",
        "t": "النداء / الصرخة",
        "s": "Vi hörde ropet från skogen.",
        "st": "سمعنا النداء من الغابة."
    },
    {
        "w": "RÖR",
        "t": "أنبوب",
        "s": "Vattnet rinner i rör.",
        "st": "الماء يجري في الأنابيب."
    },
    {
        "w": "RÖRA",
        "t": "فوضى",
        "s": "Vilken röra du har ställt till med!",
        "st": "يا لها من فوضى تسببت بها!"
    },
    {
        "w": "RÖRD",
        "t": "مُتَأثّر",
        "s": "alla var djupt rörda",
        "st": "تأثر الجميع بصورة كبيرة"
    },
    {
        "w": "ROS",
        "t": "وردة",
        "s": "Ingen ros utan taggar.",
        "st": "لا وردة بدون أشواك."
    },
    {
        "w": "RÖS",
        "t": "رجم",
        "s": "Ett gammalt rös.",
        "st": "رجم قديم."
    },
    {
        "w": "ROSA",
        "t": "وردي",
        "s": "Hon gillar rosa kläder.",
        "st": "هي تحب الملابس الوردية."
    },
    {
        "w": "ROST",
        "t": "صدأ",
        "s": "Det finns mycket rost på den gamla bilen.",
        "st": "يوجد الكثير من الصدأ على السيارة القديمة."
    },
    {
        "w": "RÖST",
        "t": "صوت",
        "s": "Han talade med låg röst.",
        "st": "تحدث بصوت منخفض."
    },
    {
        "w": "ROSTA",
        "t": "يحمص / يصدأ",
        "s": "Järn kan rosta.",
        "st": "الحديد يمكن أن يصدأ."
    },
    {
        "w": "ROSTBIFF",
        "t": "روست بيف",
        "s": "Rostbiff med potatissallad.",
        "st": "روست بيف مع سلطة البطاطس."
    },
    {
        "w": "ROT",
        "t": "جذر",
        "s": "Trädet har djupa rötter.",
        "st": "للشجرة جذور عميقة."
    },
    {
        "w": "ROTOR",
        "t": "دوار",
        "s": "Rotor.",
        "st": "دوار."
    },
    {
        "w": "ROV",
        "t": "فريسة",
        "s": "Lejonet fångade sitt rov.",
        "st": "اصطاد الأسد فريسته."
    },
    {
        "w": "RUIN",
        "t": "أنقاض",
        "s": "Huset är en ruin.",
        "st": "المنزل عبارة عن حطام."
    },
    {
        "w": "RULLA",
        "t": "يدحرج",
        "s": "Rulla en boll.",
        "st": "دحرج كرة."
    },
    {
        "w": "RUM",
        "t": "غرفة",
        "s": "Detta är mitt eget lilla rum.",
        "st": "هذه غرفتي الصغيرة الخاصة."
    },
    {
        "w": "RUNA",
        "t": "الأبجدية الرونية",
        "s": "En gammal runa på stenen.",
        "st": "حرف رونية قديم على الحجر."
    },
    {
        "w": "RUND",
        "t": "مستدير",
        "s": "Bollen är rund.",
        "st": "الكرة مستديرة."
    },
    {
        "w": "RUNDA",
        "t": "جَوْلة",
        "s": "gå en runda",
        "st": "تَجَوّل الطبيب على المرضى , قام بِجَولة"
    },
    {
        "w": "RUNT",
        "t": "حول",
        "s": "Han seglade jorden runt ensam.",
        "st": "أبحر حول العالم بمفرده."
    },
    {
        "w": "RUS",
        "t": "نَشْوة",
        "s": "Han sov ruset av sig.",
        "st": "نام ليزول عنه السكر."
    },
    {
        "w": "RUSA",
        "t": "يندفع",
        "s": "Du behöver inte rusa iväg så fort.",
        "st": "لا داعي للاندفاع والمغادرة بهذه السرعة."
    },
    {
        "w": "RUSK",
        "t": "عاصفة",
        "s": "regn och rusk",
        "st": "مطر وعواصف"
    },
    {
        "w": "RUTA",
        "t": "مربع",
        "s": "Rita en ruta på papperet.",
        "st": "ارسم مربعاً على الورقة."
    },
    {
        "w": "RYK",
        "t": "دخن",
        "s": "Ryk ihop och sluta bråka!",
        "st": "تماسكوا وتوقفوا عن الشجار!"
    },
    {
        "w": "SÅ",
        "t": "يزرع",
        "s": "Man måste så ett frö för att skörda.",
        "st": "يجب أن تزرع بذرة لتحصد."
    },
    {
        "w": "SADLA",
        "t": "يسرج",
        "s": "Sadla hästen.",
        "st": "اسرج الحصان."
    },
    {
        "w": "SAFT",
        "t": "عصير",
        "s": "Färsk saft.",
        "st": "عصير طازج."
    },
    {
        "w": "SAK",
        "t": "شيء",
        "s": "Det är en annan sak.",
        "st": "هذا شيء آخر."
    },
    {
        "w": "SAKNAR",
        "t": "يفتقر",
        "s": "checken saknar täckning",
        "st": "يفتقر الشيك إلى تغطية نقدية"
    },
    {
        "w": "SAL",
        "t": "قاعة",
        "s": "En stor sal.",
        "st": "قاعة كبيرة."
    },
    {
        "w": "SALLAD",
        "t": "سلطة",
        "s": "Jag vill ha en fräsch sallad.",
        "st": "أريد سلطة طازجة."
    },
    {
        "w": "SALT",
        "t": "ملح",
        "s": "Salt ger smak.",
        "st": "الملح يعطي طعماً."
    },
    {
        "w": "SALTET",
        "t": "الملح",
        "s": "Var är saltet?",
        "st": "أين الملح؟"
    },
    {
        "w": "SALU",
        "t": "بَيع",
        "s": "till salu ( till försäljning )",
        "st": "للبيع"
    },
    {
        "w": "SAM",
        "t": "سوياً",
        "s": "Vi ber sam.",
        "st": "نصلي سوياً."
    },
    {
        "w": "SAMS",
        "t": "مُتَّفِق",
        "s": "barnen kan aldrig vara sams",
        "st": "لايتفق الأطفال أبداً"
    },
    {
        "w": "SAND",
        "t": "رمل",
        "s": "Stranden har vit och mjuk sand.",
        "st": "الشاطئ به رمال بيضاء وناعمة."
    },
    {
        "w": "SÄNG",
        "t": "سرير",
        "s": "Jag har en mycket mjuk och skön säng.",
        "st": "لدي سرير ناعم ومريح جداً."
    },
    {
        "w": "SANN",
        "t": "حقيقي",
        "s": "En sann historia.",
        "st": "قصة حقيقية."
    },
    {
        "w": "SANNA",
        "t": "حقيقية",
        "s": "Sanna mina ord.",
        "st": "صدق كلماتي."
    },
    {
        "w": "SÅR",
        "t": "جرح",
        "s": "Han fick ett sår på handen.",
        "st": "أصيب بجرح في يده."
    },
    {
        "w": "SÄRTA",
        "t": "بطة",
        "s": "En särta simmade i viken.",
        "st": "سبحت بطة في الخليج."
    },
    {
        "w": "SÅS",
        "t": "صلصة",
        "s": "Såsen är pricken över i.",
        "st": "الصلصة هي اللمسة الأخيرة."
    },
    {
        "w": "SÄTE",
        "t": "مقعد",
        "s": "Ta plats i ditt säte.",
        "st": "اجلس في مقعدك."
    },
    {
        "w": "SATT",
        "t": "جلس",
        "s": "Han satt ner.",
        "st": "جلس."
    },
    {
        "w": "SE",
        "t": "يرى",
        "s": "Kan du se vad som står där?",
        "st": "هل يمكنك رؤية ما هو مكتوب هناك؟"
    },
    {
        "w": "SEG",
        "t": "قاسي / لزج",
        "s": "Köttet var segt och svårtuggat.",
        "st": "كان اللحم قاسياً وصعب المضغ."
    },
    {
        "w": "SEGLA",
        "t": "إبحار",
        "s": "Att segla är en underbar frihetskänsla.",
        "st": "الإبحار يمنح شعوراً رائعاً بالحرية."
    },
    {
        "w": "SEGLAR",
        "t": "يبحر",
        "s": "Båten seglar över det blå havet.",
        "st": "القارب يبحر عبر البحر الأزرق."
    },
    {
        "w": "SEGRA",
        "t": "ينتصر",
        "s": "Det viktigaste är inte att segra.",
        "st": "الأهم ليس هو الانتصار."
    },
    {
        "w": "SEMESTER",
        "t": "إجازة",
        "s": "Vi är på semester.",
        "st": "نحن في إجازة."
    },
    {
        "w": "SEN",
        "t": "متأخر",
        "s": "Han kom för sent.",
        "st": "جاء متأخراً."
    },
    {
        "w": "SENA",
        "t": "متأخرة",
        "s": "Jag gillar sena kvällar på sommaren.",
        "st": "أحب الأمسيات المتأخرة في الصيف."
    },
    {
        "w": "SENIG",
        "t": "وَتَريّ",
        "s": "mager och senig",
        "st": "نحيل ووتري"
    },
    {
        "w": "SER",
        "t": "يرى",
        "s": "Jag ser en båt på havet.",
        "st": "أرى قارباً في البحر."
    },
    {
        "w": "SET",
        "t": "مجموعة",
        "s": "Ett set med verktyg.",
        "st": "مجموعة أدوات."
    },
    {
        "w": "SI",
        "t": "انظر (قديم)",
        "s": "En ton.",
        "st": "انظر هناك."
    },
    {
        "w": "SIA",
        "t": "يتنبأ",
        "s": "Ingen kan med säkerhet sia om framtiden.",
        "st": "لا أحد يستطيع التنبؤ بالمستقبل بيقين."
    },
    {
        "w": "SIDA",
        "t": "سيدا",
        "s": "Vänd sida i boken.",
        "st": "اقلب الصفحة في الكتاب."
    },
    {
        "w": "SIK",
        "t": "سمك السيك",
        "s": "Sik är en populär matfisk.",
        "st": "السيك سمكة طعام شائعة."
    },
    {
        "w": "SIL",
        "t": "مصفاة",
        "s": "Ett sil för att sila.",
        "st": "مصفاة للتصفية."
    },
    {
        "w": "SILA",
        "t": "يصفي",
        "s": "Sila mygg och svälja kameler.",
        "st": "يصفي البعوض ويبتلع الجمال (مثل)."
    },
    {
        "w": "SILL",
        "t": "رنجة",
        "s": "Inlagd sill till jul.",
        "st": "رنجة مخللة لعيد الميلاد."
    },
    {
        "w": "SILO",
        "t": "صومعة",
        "s": "Bonden lagrar säd i en silo.",
        "st": "يخزن المزارع الحبوب في صومعة."
    },
    {
        "w": "SION",
        "t": "صهيون",
        "s": "Sion är ett berg i Jerusalem.",
        "st": "صهيون هو جبل في القدس."
    },
    {
        "w": "SJÄL",
        "t": "روح",
        "s": "kropp och själ",
        "st": "الجسد والروح"
    },
    {
        "w": "SJÖFART",
        "t": "مِلاحة بحرية",
        "s": "den internationella sjöfarten",
        "st": "حركة الملاحة البحرية الدولية"
    },
    {
        "w": "SJU",
        "t": "سبعة",
        "s": "Klockan är sju.",
        "st": "الساعة السابعة."
    },
    {
        "w": "SJUK",
        "t": "مريض",
        "s": "Han är sjuk idag.",
        "st": "هو مريض اليوم."
    },
    {
        "w": "SJUKDOM",
        "t": "مرض",
        "s": "Cancer är en svår sjukdom.",
        "st": "السرطان مرض صعب."
    },
    {
        "w": "SKA",
        "t": "سوف",
        "s": "Jag ska gå hem.",
        "st": "سأذهب إلى المنزل."
    },
    {
        "w": "SKADE",
        "t": "أذى",
        "s": "Det var inte menat till skada.",
        "st": "لم يكن القصد إلحاق الأذى."
    },
    {
        "w": "SKAL",
        "t": "قشرة",
        "s": "Äpplet har ett rött skal.",
        "st": "التفاحة لها قشرة حمراء."
    },
    {
        "w": "SKÅL",
        "t": "وعاء",
        "s": "Jag häller soppan i en skål.",
        "st": "أصب الحساء في وعاء."
    },
    {
        "w": "SKALA",
        "t": "يقشر",
        "s": "Det är lätt att skala en banan.",
        "st": "من السهل تقشير الموزة."
    },
    {
        "w": "SKARP",
        "t": "حادّ",
        "s": "skarp ammunition ( riktig ammunition )",
        "st": "ذخيرة حيّة"
    },
    {
        "w": "SKAV",
        "t": "جرح احتكاك",
        "s": "Skorna gav mig skav.",
        "st": "سببت لي الأحذية جرحاً."
    },
    {
        "w": "SKEDAR",
        "t": "ملاعق",
        "s": "Vi behöver skedar för att äta soppa.",
        "st": "نحتاج إلى ملاعق لتناول الحساء."
    },
    {
        "w": "SKEN",
        "t": "بريق",
        "s": "Ett sken.",
        "st": "بريق."
    },
    {
        "w": "SKENA",
        "t": "سكة / قضيب",
        "s": "Tåget rullar på sin skena.",
        "st": "القطار يسير على سكته."
    },
    {
        "w": "SKENAR",
        "t": "يندفع هائجاً",
        "s": "hästen skenade tiden skenar iväg",
        "st": "اندفع الحصان هائجاً يمر الوقت بسرعة"
    },
    {
        "w": "SKENBAR",
        "t": "زائف",
        "s": "en skenbar förändring",
        "st": "تَغَيُّر زائف"
    },
    {
        "w": "SKIDA",
        "t": "زحّافة",
        "s": "Vi åker skidor i fjällen.",
        "st": "نتزلج في الجبال."
    },
    {
        "w": "SKIFT",
        "t": "وَرْدِية, مُناوَبة, نوبة عمل",
        "s": "arbeta ( i ) skift",
        "st": "عَمِلَ في وردية"
    },
    {
        "w": "SKIR",
        "t": "رقيق",
        "s": "vårens skira grönska skira moln",
        "st": "خَضار الربيع الرقيق غيوم رقيقة"
    },
    {
        "w": "SKIT",
        "t": "كثيراً",
        "s": "Det var bara skit.",
        "st": "كان مجرد هراء."
    },
    {
        "w": "SKIVA",
        "t": "شريحة",
        "s": "Vill du ha en skiva bröd?",
        "st": "هل تريد شريحة خبز؟"
    },
    {
        "w": "SKJORTA",
        "t": "قميص",
        "s": "Han stryker sin skjorta.",
        "st": "هو يكوي قميصه."
    },
    {
        "w": "SKO",
        "t": "حذاء",
        "s": "Jag har tappat min ena sko.",
        "st": "لقد فقدت فردة حذائي."
    },
    {
        "w": "SKOG",
        "t": "غابة",
        "s": "Det finns många träd i skogen.",
        "st": "يوجد الكثير من الأشجار في الغابة."
    },
    {
        "w": "SKOGS",
        "t": "غابة (مضاف)",
        "s": "Vi gick till skogs för att plocka bär.",
        "st": "ذهبنا إلى الغابة لقطف التوت."
    },
    {
        "w": "SKOLA",
        "t": "مدرسة",
        "s": "Skolan börjar klockan åtta.",
        "st": "المدرسة تبدأ في الساعة الثامنة."
    },
    {
        "w": "SKOLAN",
        "t": "المدرسة",
        "s": "Skolan ligger nära.",
        "st": "المدرسة قريبة."
    },
    {
        "w": "SKOR",
        "t": "أحذية",
        "s": "Ta av dig dina skor.",
        "st": "اخلع حذائك."
    },
    {
        "w": "SKÖR",
        "t": "رقيق",
        "s": "ett skört vinglas",
        "st": "كأس نبيذ رقيق"
    },
    {
        "w": "SKORPA",
        "t": "قسماط",
        "s": "Doppa en skorpa i kaffet.",
        "st": "غمس قطعة قسماط في القهوة."
    },
    {
        "w": "SKRAL",
        "t": "سيّئ",
        "s": "skrala kunskaper känna sig skral",
        "st": "معرفة رديئة شَعَرَ بسوء صحته"
    },
    {
        "w": "SKRI",
        "t": "صرخة",
        "s": "Ett gällt skri hördes i natten.",
        "st": "سُمعت صرخة مدوية في الليل."
    },
    {
        "w": "SKRIFT",
        "t": "كتابة",
        "s": "tal och skrift",
        "st": "الكلام والكتابة"
    },
    {
        "w": "SKRIK",
        "t": "صُراخ حادّ",
        "s": "ett gällt skrik",
        "st": "صراخ حاد"
    },
    {
        "w": "SKRIV",
        "t": "اكتب",
        "s": "Skriv ditt namn här.",
        "st": "اكتب اسمك هنا."
    },
    {
        "w": "SKRIVA",
        "t": "يكتب",
        "s": "Jag gillar att skriva brev.",
        "st": "أحب كتابة الرسائل."
    },
    {
        "w": "SKUR",
        "t": "وابل",
        "s": "En skur av regn.",
        "st": "زخّة مطر."
    },
    {
        "w": "SKURA",
        "t": "يفرك",
        "s": "Jag måste skura golvet i köket.",
        "st": "يجب أن أفرك أرضية المطبخ."
    },
    {
        "w": "SLAK",
        "t": "مرخيّ",
        "s": "seglen hängde slaka i stiltjen",
        "st": "أرخى الشراع عند توقف هبوب الرياح"
    },
    {
        "w": "SLÄT",
        "t": "مُسْتَوٍ, ناعم - أملس",
        "s": "en slät yta släta betyg",
        "st": "سطح مستو علامات على حافة النجاح"
    },
    {
        "w": "SLIT",
        "t": "كدح",
        "s": "Det var mycket slit och släp.",
        "st": "كان هناك الكثير من الكدح والعناء."
    },
    {
        "w": "SLOTT",
        "t": "قلعة",
        "s": "Kungen bor i ett slott.",
        "st": "يعيش الملك في قلعة."
    },
    {
        "w": "SLUP",
        "t": "قارب",
        "s": "Vi seglade med en gammal slup.",
        "st": "أبحرنا بقارب قديم."
    },
    {
        "w": "SLURK",
        "t": "رَشْفة",
        "s": "ta sig en slurk ur flaskan",
        "st": "أخذ رشفة من الزجاجة"
    },
    {
        "w": "SMAK",
        "t": "طعم",
        "s": "Matens smak var fantastisk.",
        "st": "طعم الطعام كان رائعاً."
    },
    {
        "w": "SMAL",
        "t": "ضيّق",
        "s": "Vägen är smal.",
        "st": "الطريق ضيق."
    },
    {
        "w": "SMÄRT",
        "t": "نحيل",
        "s": "Han är lång och smärt i kroppen.",
        "st": "هو طويل ونحيل الجسم."
    },
    {
        "w": "SMÄRTA",
        "t": "ألم",
        "s": "Hon kände en stor smärta i ryggen.",
        "st": "شعرت بألم كبير في ظهرها."
    },
    {
        "w": "SMASKIG",
        "t": "شَهيّ",
        "s": "en smaskig tårta",
        "st": "كعكة مشهية"
    },
    {
        "w": "SMISK",
        "t": "خَبْطَة",
        "s": "barnen fick smisk på fingrarna",
        "st": "تَعَرَّض الأطفال لخبطة على أصابعهم"
    },
    {
        "w": "SMÖR",
        "t": "زبدة",
        "s": "Bre lite smör på brödet.",
        "st": "ادهن القليل من الزبدة على الخبز."
    },
    {
        "w": "SMÖRGÅS",
        "t": "شطيرة",
        "s": "Jag vill ha en smörgås med ost.",
        "st": "أريد شطيرة بالجبن."
    },
    {
        "w": "SMULA",
        "t": "مقدار ضئيل",
        "s": "en smula ( lite ) hänsyn",
        "st": "مقدار ضئيل من الاعتبار"
    },
    {
        "w": "SMULTRON",
        "t": "فراولة برية",
        "s": "Smultron är sommarens bär.",
        "st": "الفراولة البرية هي توت الصيف."
    },
    {
        "w": "SNAR",
        "t": "قريب",
        "s": "Vi ses inom en snar framtid.",
        "st": "نراك في المستقبل القريب."
    },
    {
        "w": "SNÄV",
        "t": "ضيّق",
        "s": "Kjolen är för snäv.",
        "st": "التنورة ضيقة جداً."
    },
    {
        "w": "SNIP",
        "t": "قارب",
        "s": "En liten snip guppade på vågorna.",
        "st": "قارب صغير كان يتمايل على الأمواج."
    },
    {
        "w": "SNÖD",
        "t": "بَسيط",
        "s": "för snöd vinnings skull",
        "st": "من أجل ربح بسيط"
    },
    {
        "w": "SNÖRE",
        "t": "خَيْط",
        "s": "slå ett snöre om paketet",
        "st": "لَفَّ رباطاً على الطَّرد"
    },
    {
        "w": "SNOS",
        "t": "يُسرق",
        "s": "Cyklar snos.",
        "st": "تُسرق الدراجات."
    },
    {
        "w": "SO",
        "t": "خنزيرة",
        "s": "En so med kultingar.",
        "st": "خنزيرة مع خنازير صغيرة."
    },
    {
        "w": "SOCKER",
        "t": "سكر",
        "s": "Vill du ha socker i kaffet?",
        "st": "هل تريد سكر في القهوة؟"
    },
    {
        "w": "SÖDER",
        "t": "جنوباً",
        "s": "söder om Stockholm",
        "st": "جنوب ستوكهولم"
    },
    {
        "w": "SOFFA",
        "t": "أريكة",
        "s": "Detta är en mycket bekväm soffa.",
        "st": "هذه أريكة مريحة جداً."
    },
    {
        "w": "SOFFAN",
        "t": "الأريكة",
        "s": "Vi sitter och myser i soffan.",
        "st": "نجلس ونستمتع بالراحة على الأريكة."
    },
    {
        "w": "SOL",
        "t": "شمس",
        "s": "Solen värmer skönt.",
        "st": "الشمس تدفئ بشكل لطيف."
    },
    {
        "w": "SOLO",
        "t": "منفرد",
        "s": "Solo.",
        "st": "منفرد."
    },
    {
        "w": "SOLT",
        "t": "مسمر",
        "s": "Han blev solt.",
        "st": "اكتسب سمرة."
    },
    {
        "w": "SOM",
        "t": "مثل",
        "s": "Som man bäddar får man ligga.",
        "st": "كما تزرع تحصد."
    },
    {
        "w": "SÖM",
        "t": "درزة",
        "s": "Sömmen gick upp på byxorna.",
        "st": "انفكت درزة البنطال."
    },
    {
        "w": "SOMMAR",
        "t": "صيف",
        "s": "Sommaren är varm.",
        "st": "الصيف حار."
    },
    {
        "w": "SÖMN",
        "t": "نوم",
        "s": "God sömn ger energi.",
        "st": "النوم الجيد يعطي طاقة."
    },
    {
        "w": "SON",
        "t": "ابن",
        "s": "Profetens son.",
        "st": "ابن النبي."
    },
    {
        "w": "SÖNDER",
        "t": "تالِف",
        "s": "bilen är sönder gå sönder",
        "st": "تَعَطَّلَت السيارة تَلِفَ"
    },
    {
        "w": "SORTER",
        "t": "أنواع / أصناف",
        "s": "Det finns många sorter av äpplen.",
        "st": "هناك العديد من أصناف التفاح."
    },
    {
        "w": "SÖT",
        "t": "حلو",
        "s": "Kakan är väldigt söt.",
        "st": "الكعكة حلوة جداً."
    },
    {
        "w": "SOVRUM",
        "t": "غرفة نوم",
        "s": "Jag sover i sovrummet.",
        "st": "أنام في غرفة النوم."
    },
    {
        "w": "SPÅR",
        "t": "قضبان / آثار",
        "s": "Tåget stannar vid spår tre.",
        "st": "يتوقف القطار عند القضيب الثالث."
    },
    {
        "w": "SPARK",
        "t": "ركلة",
        "s": "hon gav katten en spark",
        "st": "ركَلَتْ القطة برجلها"
    },
    {
        "w": "SPE",
        "t": "إهانة",
        "s": "spott och spe",
        "st": "تحقير وإهانة"
    },
    {
        "w": "SPEGEL",
        "t": "مرآة",
        "s": "Hon tittade sig i spegeln.",
        "st": "نظرت إلى نفسها في المرآة."
    },
    {
        "w": "SPEL",
        "t": "لعبة",
        "s": "Detta är ett mycket roligt spel.",
        "st": "هذه لعبة ممتعة جداً."
    },
    {
        "w": "SPETA",
        "t": "شظية / عود",
        "s": "Hon fick en speta i fingret.",
        "st": "دخلت شظية في إصبعها."
    },
    {
        "w": "SPINDEL",
        "t": "عنكبوت",
        "s": "Spindeln väver sitt nät.",
        "st": "العنكبوت ينسج شبكته."
    },
    {
        "w": "SPION",
        "t": "جاسوس",
        "s": "Han anklagades för att vara spion.",
        "st": "اتُهم بأنه جاسوس."
    },
    {
        "w": "SPOL",
        "t": "ملف",
        "s": "En spole.",
        "st": "ملف."
    },
    {
        "w": "SPORT",
        "t": "رياضة",
        "s": "Fotboll är en populär sport.",
        "st": "كرة القدم رياضة شعبية."
    },
    {
        "w": "STAD",
        "t": "مدينة",
        "s": "Stockholm är en stor stad.",
        "st": "ستوكهولم مدينة كبيرة."
    },
    {
        "w": "STAFF",
        "t": "طاقم",
        "s": "En kompetent staff.",
        "st": "طاقم مؤهل."
    },
    {
        "w": "STAL",
        "t": "سرق",
        "s": "Tjuven stal cykeln mitt på dagen.",
        "st": "سرق اللص الدراجة في وضح النهار."
    },
    {
        "w": "STAN",
        "t": "المدينة",
        "s": "Vi ska åka in till stan.",
        "st": "سنذهب إلى المدينة."
    },
    {
        "w": "STÅR",
        "t": "يقف, ينهض, يقوم",
        "s": "Bilen står på gatan.",
        "st": "السيارة واقفة في الشارع."
    },
    {
        "w": "STARK",
        "t": "قويّ",
        "s": "starka armar stark regering stark kyla",
        "st": "أذرع قوية حكومة قوية برد قارس"
    },
    {
        "w": "STARR",
        "t": "مرض السّاد البصري",
        "s": "grå starr grön starr",
        "st": "الماء الأزرق ( يُسَبّب عتامة عدسة العين ) غْلُوكوما: الماء الأسود ( عِلّة في العين )"
    },
    {
        "w": "START",
        "t": "بداية",
        "s": "skolstart __ turnéstart __ startskott",
        "st": "بدء الدراسة __ بداية الجولة __ طلقة الانطلاق"
    },
    {
        "w": "STAT",
        "t": "دولة",
        "s": "Staten ska skydda sina medborgare.",
        "st": "يجب على الدولة حماية مواطنيها."
    },
    {
        "w": "STATION",
        "t": "محطة",
        "s": "Vi möts vid nästa station.",
        "st": "نلتقي في المحطة التالية."
    },
    {
        "w": "STEKA",
        "t": "يقلي",
        "s": "Vi ska steka köttbullar till middag.",
        "st": "سنقلي كرات اللحم للعشاء."
    },
    {
        "w": "STEN",
        "t": "حجر",
        "s": "En stor sten låg på vägen.",
        "st": "كان هناك حجر كبير على الطريق."
    },
    {
        "w": "STENAR",
        "t": "أحجار",
        "s": "Kasta inte stenar.",
        "st": "لا ترمِ الحجارة."
    },
    {
        "w": "STEWARD",
        "t": "مضيف",
        "s": "En steward serverade kaffe.",
        "st": "قدم المضيف القهوة."
    },
    {
        "w": "STIG",
        "t": "مسار",
        "s": "En smal stig genom skogen.",
        "st": "مسار ضيق عبر الغابة."
    },
    {
        "w": "STIL",
        "t": "أسلوب",
        "s": "Jag gillar verkligen din unika stil.",
        "st": "أنا معجب حقاً بأسلوبك الفريد."
    },
    {
        "w": "STJÄL",
        "t": "يَسْرُق",
        "s": "stjäla en cykel stjäla en idé",
        "st": "سَرَقَ درّاجة سَرَقَ فِكْرة"
    },
    {
        "w": "STJÄRNA",
        "t": "نجمة",
        "s": "Du är min stjärna.",
        "st": "أنت نجمتي."
    },
    {
        "w": "STO",
        "t": "وقف",
        "s": "Tåget sto vid stationen.",
        "st": "وقف القطار عند المحطة."
    },
    {
        "w": "STÖD",
        "t": "مسند",
        "s": "ta stöd mot väggen",
        "st": "استند إلى الجدار"
    },
    {
        "w": "STOL",
        "t": "كرسي",
        "s": "Dra fram en stol och sitt ner.",
        "st": "اسحب كرسياً واجلس."
    },
    {
        "w": "STOLD",
        "t": "سرقة",
        "s": "En stöld.",
        "st": "سرقة."
    },
    {
        "w": "STOR",
        "t": "كبير",
        "s": "En stor stark, tack.",
        "st": "واحدة كبيرة وقوية، من فضلك (بيرة)."
    },
    {
        "w": "STORA",
        "t": "كبيرة",
        "s": "De stora båtarna ligger i hamnen.",
        "st": "القوارب الكبيرة راسية في الميناء."
    },
    {
        "w": "STORM",
        "t": "عاصفة",
        "s": "En kraftig storm drog in.",
        "st": "هبت عاصفة قوية."
    },
    {
        "w": "STORMAR",
        "t": "يَعْصِف",
        "s": "det stormar stormande känslor",
        "st": "تَعْصِف مشاعر عنيفة"
    },
    {
        "w": "STORMIG",
        "t": "عاصف",
        "s": "Det var en stormig natt.",
        "st": "كانت ليلة عاصفة."
    },
    {
        "w": "STRAFF",
        "t": "عقاب",
        "s": "Straffet var rättvist.",
        "st": "كانت العقوبة عادلة."
    },
    {
        "w": "STRAM",
        "t": "ضَيِّق",
        "s": "en stram stil",
        "st": "طابع مُتَحَفِّظ"
    },
    {
        "w": "STRAND",
        "t": "شاطئ",
        "s": "Vi badar vid stranden.",
        "st": "نسبح عند الشاطئ."
    },
    {
        "w": "STRÄV",
        "t": "خَشِن",
        "s": "en sträv röst",
        "st": "صوت خشن , صوت غليظ"
    },
    {
        "w": "STRIKT",
        "t": "صارم",
        "s": "strikt tillämpning av reglerna strikt klädsel",
        "st": "تطبيق صارم للقواعد ملابس مُتَزمّتة"
    },
    {
        "w": "STUDENT",
        "t": "طالب",
        "s": "Han är student vid universitetet.",
        "st": "هو طالب في الجامعة."
    },
    {
        "w": "STUDIE",
        "t": "دراسة",
        "s": "En ny studie visar detta.",
        "st": "تظهر دراسة جديدة هذا."
    },
    {
        "w": "STUND",
        "t": "لحظة",
        "s": "Vänta en liten stund är du snäll.",
        "st": "انتظر لحظة من فضلك."
    },
    {
        "w": "STUT",
        "t": "ثور صغير",
        "s": "En ung stut betade på ängen.",
        "st": "ثور صغير كان يرعى في المرج."
    },
    {
        "w": "STYRKA",
        "t": "قوة",
        "s": "Han visade prov på stor styrka.",
        "st": "أظهر دليلاً على قوة كبيرة."
    },
    {
        "w": "SUCK",
        "t": "تَنَهُّد",
        "s": "Hon drog en djup suck.",
        "st": "تنهدت بعمق."
    },
    {
        "w": "SUDD",
        "t": "ممحاة (عامية)",
        "s": "Har du ett sudd?",
        "st": "هل لديك ممحاة؟"
    },
    {
        "w": "SUM",
        "t": "مجموع",
        "s": "En stor summa pengar.",
        "st": "مبلغ كبير من المال."
    },
    {
        "w": "SUNT",
        "t": "صحي",
        "s": "Det är sunt förnuft.",
        "st": "إنه المنطق السليم."
    },
    {
        "w": "SUR",
        "t": "غاضب",
        "s": "Varför är han så sur idag?",
        "st": "لماذا هو غاضب جداً اليوم؟"
    },
    {
        "w": "SURRA",
        "t": "يطن",
        "s": "Myggan surra.",
        "st": "البعوضة تطن."
    },
    {
        "w": "SUS",
        "t": "حفيف",
        "s": "Vindens sus.",
        "st": "حفيف الريح."
    },
    {
        "w": "SVAL",
        "t": "بارد / منعش",
        "s": "En sval vind blåser från havet.",
        "st": "تهب رياح منعشة من البحر."
    },
    {
        "w": "SVALA",
        "t": "سنونو",
        "s": "En svala gör ingen sommar, sägs det.",
        "st": "يقال إن سنونوة واحدة لا تصنع الصيف."
    },
    {
        "w": "SVAR",
        "t": "جواب",
        "s": "Jag vill ha ett svar.",
        "st": "أريد جواباً."
    },
    {
        "w": "SYSTER",
        "t": "أخت",
        "s": "Min syster läser en bok.",
        "st": "أختي تقرأ كتاباً."
    },
    {
        "w": "TÅ",
        "t": "إصبع قدم",
        "s": "Jag slog min tå.",
        "st": "إصبعي يؤلمني."
    },
    {
        "w": "TAG",
        "t": "قبضة",
        "s": "Ta ett tag i repet och dra.",
        "st": "أمسك بالحبل واسحب."
    },
    {
        "w": "TÅG",
        "t": "قطار",
        "s": "Tåget rullar på rälsen.",
        "st": "القطار يسير على السكة."
    },
    {
        "w": "TAK",
        "t": "سقف",
        "s": "Taket på huset behöver lagas.",
        "st": "سقف المنزل يحتاج إلى إصلاح."
    },
    {
        "w": "TAL",
        "t": "خطاب / عدد",
        "s": "Han höll ett bra tal.",
        "st": "ألقى خطاباً جيداً."
    },
    {
        "w": "TALA",
        "t": "تحدث",
        "s": "Tala är silver, tiga är guld.",
        "st": "الكلام من فضة والسكوت من ذهب."
    },
    {
        "w": "TALANG",
        "t": "موهبة",
        "s": "Hon har en stor musikalisk talang.",
        "st": "لديها موهبة موسيقية كبيرة."
    },
    {
        "w": "TAM",
        "t": "أليف",
        "s": "En tam katt.",
        "st": "قطة أليفة."
    },
    {
        "w": "TAND",
        "t": "سن",
        "s": "Jag har ont i en tand.",
        "st": "لدي ألم في سن."
    },
    {
        "w": "TANK",
        "t": "خزان",
        "s": "Bilen har en full tank bensin.",
        "st": "السيارة بها خزان وقود ممتلئ."
    },
    {
        "w": "TANT",
        "t": "سيدة",
        "s": "En snäll tant gav mig godis.",
        "st": "سيدة لطيفة أعطتني الحلوى."
    },
    {
        "w": "TAR",
        "t": "يأخذ",
        "s": "Det tar tid.",
        "st": "الأمر يستغرق وقتاً."
    },
    {
        "w": "TÅR",
        "t": "دموع",
        "s": "Tårarna rann nerför hennes kinder.",
        "st": "انهمرت الدموع على خديها."
    },
    {
        "w": "TÄR",
        "t": "يستهلك / يقطع",
        "s": "Oron tär på hans krafter.",
        "st": "القلق يستنزف قواه."
    },
    {
        "w": "TARM",
        "t": "أمعاء",
        "s": "Tarmen är lång.",
        "st": "الأمعاء طويلة."
    },
    {
        "w": "TÄRNA",
        "t": "وصيفة",
        "s": "Hon valdes till årets Lucia tärna.",
        "st": "تم اختيارها لتكون وصيفة لوسيا لهذا العام."
    },
    {
        "w": "TAS",
        "t": "يؤخذ",
        "s": "Provet tas på morgonen.",
        "st": "تؤخذ العينة في الصباح."
    },
    {
        "w": "TÄT",
        "t": "كثيف",
        "s": "Skogen var mörk och tät.",
        "st": "كانت الغابة مظلمة وكثيفة."
    },
    {
        "w": "TAVLA",
        "t": "لوحة",
        "s": "Läraren skriver på en tavla.",
        "st": "المعلم يكتب على السبورة."
    },
    {
        "w": "TE",
        "t": "شاي",
        "s": "Vill du ha te?",
        "st": "هل تريد شاي؟"
    },
    {
        "w": "TEAM",
        "t": "فريق",
        "s": "Vi är ett bra team.",
        "st": "نحن فريق جيد."
    },
    {
        "w": "TELEFON",
        "t": "هاتف",
        "s": "Telefonen ringer.",
        "st": "الهاتف يرن."
    },
    {
        "w": "TENTA",
        "t": "امتحان",
        "s": "Jag har en svår tenta imorgon.",
        "st": "لدي امتحان صعب غداً."
    },
    {
        "w": "TERMIN",
        "t": "فصل دراسي",
        "s": "Höstterminen är ganska lång.",
        "st": "فصل الخريف الدراسي طويل نوعاً ما."
    },
    {
        "w": "TEST",
        "t": "اختبار",
        "s": "Vi har ett test idag.",
        "st": "لدينا اختبار اليوم."
    },
    {
        "w": "TID",
        "t": "وقت",
        "s": "Vad är det för tid?",
        "st": "كم الوقت؟"
    },
    {
        "w": "TILL",
        "t": "مرة أخرى",
        "s": "ta en kaka till!",
        "st": "خذ كعكة ثانية!"
    },
    {
        "w": "TILLS",
        "t": "حتى",
        "s": "vänta här tills jag kommer",
        "st": "انتظر هنا حتى آتي"
    },
    {
        "w": "TIMER",
        "t": "مؤقت",
        "s": "Sätt en timer på tio minuter.",
        "st": "اضبط المؤقت على عشر دقائق."
    },
    {
        "w": "TIO",
        "t": "عشرة",
        "s": "Tio kronor.",
        "st": "عشر كرونات."
    },
    {
        "w": "TJÄRA",
        "t": "قطران",
        "s": "Svart tjära.",
        "st": "قطران أسود."
    },
    {
        "w": "TJÄRNA",
        "t": "بحيرة",
        "s": "Vi badade i en liten skogstjärna.",
        "st": "سبحنا في بحيرة غابة صغيرة."
    },
    {
        "w": "TOK",
        "t": "مجنون / أحمق",
        "s": "Han är en riktig tok.",
        "st": "إنه أحمق حقاً."
    },
    {
        "w": "TOM",
        "t": "فارغ",
        "s": "Tanken är nästan tom.",
        "st": "الخزان شبه فارغ."
    },
    {
        "w": "TOMT",
        "t": "فارغ",
        "s": "Det är tomt.",
        "st": "إنه فارغ."
    },
    {
        "w": "TON",
        "t": "نغمة",
        "s": "En ton.",
        "st": "نغمة."
    },
    {
        "w": "TONA",
        "t": "تتلاشى",
        "s": "Färgerna började tona bort.",
        "st": "بدأت الألوان تتلاشى."
    },
    {
        "w": "TOPPAR",
        "t": "يحتلّ مرتبة الصَدارة",
        "s": "boken toppar listan på bra barnböcker",
        "st": "يحتل الكتاب مرتبة الصدارة بين أفضل كتب الأطفال"
    },
    {
        "w": "TORG",
        "t": "ساحة",
        "s": "Vi möts på torget.",
        "st": "نلتقي في الساحة."
    },
    {
        "w": "TORKA",
        "t": "يجفف / جفاف",
        "s": "Häng tvätten på tork i solen.",
        "st": "علق الغسيل ليجف في الشمس."
    },
    {
        "w": "TORN",
        "t": "برج",
        "s": "Ett högt torn.",
        "st": "برج عالٍ."
    },
    {
        "w": "TORPE",
        "t": "كوخ",
        "s": "Ett torp.",
        "st": "كوخ."
    },
    {
        "w": "TORR",
        "t": "جاف",
        "s": "Torr.",
        "st": "جاف."
    },
    {
        "w": "TÖRS",
        "t": "يجرؤ",
        "s": "hon törs inte säga ifrån",
        "st": "لا تجرؤ على الرفض"
    },
    {
        "w": "TORSK",
        "t": "سمك القد",
        "s": "Torsk är en mycket god fisk.",
        "st": "القد سمكة لذيذة جداً."
    },
    {
        "w": "TOTAL",
        "t": "شامل",
        "s": "en total förnyelse totalt sett",
        "st": "تجديد شامل بصورة إجمالية"
    },
    {
        "w": "TRÄ",
        "t": "خشب",
        "s": "Ett hus av trä.",
        "st": "منزل من الخشب."
    },
    {
        "w": "TRÄD",
        "t": "شجرة",
        "s": "Ett träd i skogen.",
        "st": "شجرة في الغابة."
    },
    {
        "w": "TRÄDE",
        "t": "بور",
        "s": "Åkern fick ligga i träde ett år.",
        "st": "تُرك الحقل بوراً لمدة عام."
    },
    {
        "w": "TRÄDGÅRD",
        "t": "حديقة",
        "s": "Vi har en fin trädgård.",
        "st": "لدينا حديقة جميلة."
    },
    {
        "w": "TRAFIK",
        "t": "مرور",
        "s": "Det är mycket trafik idag.",
        "st": "حركة المرور كثيفة اليوم."
    },
    {
        "w": "TRE",
        "t": "ثلاثة",
        "s": "Ett, två, tre.",
        "st": "واحد، اثنان، ثلاثة."
    },
    {
        "w": "TRIST",
        "t": "مُحْزِن",
        "s": "ett trist bostadsområde en trist föreläsning",
        "st": "منطقة سكنية كئيبة مُحاضَرة مُضْجِرة"
    },
    {
        "w": "TRO",
        "t": "إيمان",
        "s": "Stark tro i Gud.",
        "st": "إيمان قوي بالله."
    },
    {
        "w": "TROLIG",
        "t": "مُحْتَمل",
        "s": "en trolig utveckling",
        "st": "تَطَوُّر مُحْتَمَل"
    },
    {
        "w": "TRON",
        "t": "الإيمان",
        "s": "Tron är stark.",
        "st": "الإيمان قوي."
    },
    {
        "w": "TUNA",
        "t": "ساحة",
        "s": "Eskilstuna är en fin gammal stad.",
        "st": "إسكيلستونا مدينة قديمة وجميلة."
    },
    {
        "w": "TUNNBRÖD",
        "t": "خبز رقيق",
        "s": "Tunnbröd med lax.",
        "st": "خبز رقيق مع السلمون."
    },
    {
        "w": "TUR",
        "t": "رحلة",
        "s": "båten gör två turer om dagen",
        "st": "قام القارب برحلتين في اليوم"
    },
    {
        "w": "TURER",
        "t": "جولات",
        "s": "Vi bokade flera turer.",
        "st": "حجزنا عدة جولات."
    },
    {
        "w": "TURIST",
        "t": "سائح",
        "s": "Många turister besöker staden.",
        "st": "سياح كثيرون يزورون المدينة."
    },
    {
        "w": "TVÄR",
        "t": "فجائيّ",
        "s": "en tvär inbromsning sur och tvär",
        "st": "فرملة فجائيّة غاضب وغير لَبِق"
    },
    {
        "w": "TVÄRS",
        "t": "عرضيّاً",
        "s": "tvärs över gatan",
        "st": "بِعَرض الشارع"
    },
    {
        "w": "TYG",
        "t": "قماش",
        "s": "Klänningen är sydd av fint tyg.",
        "st": "الفستان مخيط من قماش فاخر."
    },
    {
        "w": "TYP",
        "t": "نوع",
        "s": "Vilken typ av bil har du?",
        "st": "ما نوع السيارة التي لديك؟"
    },
    {
        "w": "TYSK",
        "t": "ألماني",
        "s": "Jag träffade en trevlig tysk turist.",
        "st": "التقيت بسائح ألماني لطيف."
    },
    {
        "w": "UGN",
        "t": "فرن",
        "s": "Sätt in kakan i ugnen.",
        "st": "ضع الكعكة في الفرن."
    },
    {
        "w": "UNDAN",
        "t": "جانباً",
        "s": "dra sig undan hålla sig undan",
        "st": "تحاشى الناس تحاشى الناس"
    },
    {
        "w": "UNDRAN",
        "t": "تَعَجُّب",
        "s": "hans agerande väckte undran",
        "st": "دَعَت تصرفاته إلى العَجَب"
    },
    {
        "w": "UNG",
        "t": "شاب",
        "s": "Han är ung och stark.",
        "st": "هو شاب وقوي."
    },
    {
        "w": "UR",
        "t": "من/ساعة",
        "s": "Gå ur rummet.",
        "st": "أخرج من الغرفة."
    },
    {
        "w": "UT",
        "t": "خارج",
        "s": "Gå ut och lek.",
        "st": "اخرج والعب."
    },
    {
        "w": "UTIFRÅN",
        "t": "من الخارج",
        "s": "skaffa folk utifrån",
        "st": "أحْضَرَ عُمّالاً من الخارج"
    },
    {
        "w": "UTKANT",
        "t": "طَرَف",
        "s": "i utkanten av staden",
        "st": "في طرف المدينة"
    },
    {
        "w": "UTLAND",
        "t": "خارج",
        "s": "I utlandet.",
        "st": "في الخارج."
    },
    {
        "w": "VÅ",
        "t": "نحن (لهجة)",
        "s": "Vå är här (dialekt).",
        "st": "نحن هنا."
    },
    {
        "w": "VAD",
        "t": "بطة الساق / ماذا",
        "s": "Jag har ont i vaden.",
        "st": "لدي ألم في بطة الساق."
    },
    {
        "w": "VÄDRET",
        "t": "الطقس",
        "s": "Alla gillar att prata om vädret.",
        "st": "الجميع يحب الحديث عن الطقس."
    },
    {
        "w": "VÅFFLA",
        "t": "وافل",
        "s": "Vi äter våfflor med sylt.",
        "st": "نأكل الوافل مع المربى."
    },
    {
        "w": "VAG",
        "t": "غير واضح",
        "s": "en vag känsla av obehag",
        "st": "إحساس غامض بعدم الارتياح"
    },
    {
        "w": "VÄG",
        "t": "طريق",
        "s": "Vi har en lång väg att vandra.",
        "st": "لدينا طريق طويل لنقطعه."
    },
    {
        "w": "VÄGAR",
        "t": "طرق",
        "s": "Herrens vägar äro outgrundliga.",
        "st": "طرق الرب لا يمكن سبر أغوارها."
    },
    {
        "w": "VÄGG",
        "t": "جدار",
        "s": "Tavlan hänger på den vita väggen.",
        "st": "اللوحة معلقة على الجدار الأبيض."
    },
    {
        "w": "VAGN",
        "t": "عربة",
        "s": "Tågets vagn är full.",
        "st": "عربة القطار ممتلئة."
    },
    {
        "w": "VAGNAR",
        "t": "عربات",
        "s": "Tåget har många vagnar.",
        "st": "القطار له العديد من العربات."
    },
    {
        "w": "VAKT",
        "t": "حِراسة",
        "s": "även om platsen där man vaktar",
        "st": "تقال أيضاً عن المكان المحروس"
    },
    {
        "w": "VAL",
        "t": "حوت / خيار",
        "s": "Vi såg en stor val i havet.",
        "st": "رأينا حوتاً كبيراً في البحر."
    },
    {
        "w": "VÄL",
        "t": "حسناً / جيداً",
        "s": "Det går väl bra för dig?",
        "st": "الأمور تسير جيداً معك، أليس كذلك؟"
    },
    {
        "w": "VÄLDIG",
        "t": "عظيم",
        "s": "ett väldigt fartyg en väldig påfrestning",
        "st": "سفينة ضخمة إجهاد كبير"
    },
    {
        "w": "VÄLDIGT",
        "t": "جدّ",
        "s": "väldigt glad väldigt svårt",
        "st": "سعيد جداً صعب جداً"
    },
    {
        "w": "VALT",
        "t": "مختار",
        "s": "Han har valt att sluta arbeta.",
        "st": "لقد اختار التوقف عن العمل."
    },
    {
        "w": "VAN",
        "t": "معتاد",
        "s": "Han är van vid resor.",
        "st": "هو معتاد على السفر."
    },
    {
        "w": "VÄN",
        "t": "لطيف",
        "s": "en vän varelse",
        "st": "مخلوق لطيف"
    },
    {
        "w": "VANA",
        "t": "عادة",
        "s": "Gammal vana sitter i.",
        "st": "العادات القديمة تموت بصعوبة."
    },
    {
        "w": "VAR",
        "t": "أين",
        "s": "Var är beviset?",
        "st": "أين الدليل؟"
    },
    {
        "w": "VÅR",
        "t": "لنا",
        "s": "vårt eget modersmål",
        "st": "لغتنا الأم"
    },
    {
        "w": "VARA",
        "t": "سلعة / يكون",
        "s": "Det är en bra vara.",
        "st": "إنها سلعة جيدة."
    },
    {
        "w": "VÅRAS",
        "t": "الربيع الفائت",
        "s": "i våras ( förra våren )",
        "st": "في الربيع الفائت"
    },
    {
        "w": "VÅRD",
        "t": "رعاية",
        "s": "Alla har rätt till vård.",
        "st": "الجميع لديهم الحق في الرعاية."
    },
    {
        "w": "VÄRDE",
        "t": "قيمة",
        "s": "Detta har ett stort sentimentalt värde.",
        "st": "هذا له قيمة عاطفية كبيرة."
    },
    {
        "w": "VÄRDET",
        "t": "القيمة",
        "s": "Värdet av allt vi äger är stort.",
        "st": "قيمة كل ما نملكه كبيرة."
    },
    {
        "w": "VÅREN",
        "t": "الربيع",
        "s": "Blommorna slår ut på våren.",
        "st": "الزهور تتفتح في الربيع."
    },
    {
        "w": "VARG",
        "t": "ذئب",
        "s": "Man ska inte ropa varg.",
        "st": "لا ينبغي الصراخ بوجود ذئب (كذباً)."
    },
    {
        "w": "VÄRLD",
        "t": "عالم",
        "s": "Vi lever i en föränderlig värld.",
        "st": "نحن نعيش في عالم متغير."
    },
    {
        "w": "VÄRLDEN",
        "t": "العالم",
        "s": "Han vill resa runt hela världen.",
        "st": "يريد السفر حول العالم بأسره."
    },
    {
        "w": "VARS",
        "t": "مَن",
        "s": "En man vars bil är röd.",
        "st": "رجل سيارته حمراء."
    },
    {
        "w": "VÄRST",
        "t": "أسوأ",
        "s": "Det var det värsta jag hört.",
        "st": "هذا أسوأ ما سمعت."
    },
    {
        "w": "VART",
        "t": "إلى أين",
        "s": "vart ska du åka?",
        "st": "إلى أين تسافر؟"
    },
    {
        "w": "VÄSKA",
        "t": "حقيبة",
        "s": "Jag packade min väska.",
        "st": "حزمت حقيبتي."
    },
    {
        "w": "VÄST",
        "t": "سترة",
        "s": "Han har en vit väst på sig.",
        "st": "يرتدي سترة بيضاء."
    },
    {
        "w": "VÄSTER",
        "t": "غرب",
        "s": "Vi färdas mot väster.",
        "st": "نسافر نحو الغرب."
    },
    {
        "w": "VÄSTRA",
        "t": "الغربي",
        "s": "den västra sidan av sjön",
        "st": "الجهة الغربية من البحيرة"
    },
    {
        "w": "VÄTA",
        "t": "بَلَل",
        "s": "tyget stöter bort väta",
        "st": "قماش صادّ للبلل"
    },
    {
        "w": "VATTEN",
        "t": "ماء",
        "s": "Drick mycket vatten.",
        "st": "اشرب الكثير من الماء."
    },
    {
        "w": "VÄXA",
        "t": "ينمو",
        "s": "Blommorna växa snabbt.",
        "st": "الزهور تنمو بسرعة."
    },
    {
        "w": "VERK",
        "t": "عمل / مصنع",
        "s": "Ett stort verk.",
        "st": "عمل كبير."
    },
    {
        "w": "VERKTYG",
        "t": "أداة",
        "s": "Hammaren är ett verktyg.",
        "st": "المطرقة أداة."
    },
    {
        "w": "VERS",
        "t": "آية",
        "s": "Läs en vers ur boken.",
        "st": "اقرأ بيتاً من الكتاب."
    },
    {
        "w": "VET",
        "t": "يعلم",
        "s": "Han vet vägen hem.",
        "st": "هو يعرف الطريق إلى المنزل."
    },
    {
        "w": "VID",
        "t": "واسع / عند",
        "s": "Huset ligger vid en vacker sjö.",
        "st": "يقع المنزل عند بحيرة جميلة."
    },
    {
        "w": "VIDA",
        "t": "واسع / عريض",
        "s": "De har rest över vida hav.",
        "st": "لقد سافروا عبر بحار واسعة."
    },
    {
        "w": "VIDGAR",
        "t": "يُوَسِّع",
        "s": "medicinen vidgar blodkärlen vidgat inflytande",
        "st": "يوسع الدواء الأوعية الدمويّة نفوذ ممتدّ , نفوذ واسع"
    },
    {
        "w": "VIG",
        "t": "مَرِن",
        "s": "ett vigt språng",
        "st": "قفزة رشيقة"
    },
    {
        "w": "VIK",
        "t": "طوى",
        "s": "Vik pappret på mitten.",
        "st": "اطو الورقة من المنتصف."
    },
    {
        "w": "VILD",
        "t": "بَريّ",
        "s": "vilda växter vilda djur",
        "st": "نباتات بريّة حيوانات برية ( وحشيّة )"
    },
    {
        "w": "VIN",
        "t": "نبيذ",
        "s": "Rött vin passar bra till kött.",
        "st": "النبيذ الأحمر يناسب اللحم جيداً."
    },
    {
        "w": "VIND",
        "t": "ريح",
        "s": "En stark vind blåser i träden.",
        "st": "رياح قوية تعصف بالأشجار."
    },
    {
        "w": "VINTER",
        "t": "شتاء",
        "s": "Vintern är kall.",
        "st": "الشتاء بارد."
    },
    {
        "w": "VIPS",
        "t": "طَرْفة عَيْن",
        "s": "vips , var han försvunnen",
        "st": "اختفى بطرفة عين"
    },
    {
        "w": "VIRKA",
        "t": "يكروشيه",
        "s": "Min mormor lärde mig virka.",
        "st": "جدتي علمتني الكروشيه."
    },
    {
        "w": "VIS",
        "t": "حكيم",
        "s": "vis av skadan",
        "st": "تَعَلَّم درساً من الحادث"
    },
    {
        "w": "VIT",
        "t": "أبيض",
        "s": "Snön är vit.",
        "st": "الثلج أبيض."
    },
    {
        "w": "VITTNE",
        "t": "شاهد",
        "s": "Vittnet såg vad som hände.",
        "st": "الشاهد رأى ما حدث."
    },
    {
        "w": "VRÅ",
        "t": "زاوية",
        "s": "leta igenom varenda vrå av huset",
        "st": "بَحَث في كل زوايا المنزل"
    },
    {
        "w": "YRA",
        "t": "هذيان/دوخة",
        "s": "Han yrar av feber.",
        "st": "يشعر بالدوخة."
    },
    {
        "w": "YRKA",
        "t": "يطالب",
        "s": "Åklagaren valde att yrka på fängelse.",
        "st": "اختار المدعي العام المطالبة بالسجن."
    },
    {
        "w": "YRKE",
        "t": "مهنة",
        "s": "Vad har du för yrke?",
        "st": "ما هي مهنتك؟"
    },
    {
        "w": "YTA",
        "t": "سطح",
        "s": "Vattnets yta.",
        "st": "سطح الماء."
    },
    {
        "w": "YXA",
        "t": "فأس",
        "s": "Hugg ved med yxan.",
        "st": "اقطع الخشب بالفأس."
    },
    {
        "w": "ZAKAT",
        "t": "زكاة",
        "s": "Zakat är en av islams pelare.",
        "st": "الزكاة هي أحد أركان الإسلام."
    },
    {
        "w": "ZON",
        "t": "منطقة",
        "s": "Det är en farlig zon.",
        "st": "منطقة خطر."
    },
    {
        "w": "ZOO",
        "t": "حديقة حيوان",
        "s": "Vi besökte ett zoo.",
        "st": "زرنا حديقة الحيوان."
    }
]
    ;
