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
    "1-1": {"letters":["M","O","S"],"words":["MOS","SOM"],"validWords":["MOS","SOM"]},
    "1-2": {"letters":["R","O","T"],"words":["ROT","TRO"],"validWords":["ROT","TRO"]},
    "1-3": {"letters":["K","A","K","A"],"words":["KAKA","AKA"],"validWords":["KAKA","AKA"]},
    "1-4": {"letters":["T","S","A","L","I"],"words":["LISTA","SILA","STIL"],"validWords":["LISTA","SILA","STIL"]},
    "1-5": {"letters":["K","E","A","T","S"],"words":["STEKA","KAST","ASK"],"validWords":["STEKA","KAST","ASK"]},
    "1-6": {"letters":["T","M","N","E","A"],"words":["MATEN","TEAM","META"],"validWords":["MATEN","TEAM","META"]},
    "1-7": {"letters":["A","A","F","L","S","K"],"words":["FLASKA","FALSK","SKALA","KALAS"],"validWords":["FLASKA","FALSK","SKALA","KALAS"]},
    "1-8": {"letters":["A","D","S","L","A","L"],"words":["SALLAD","ALLAS","LADA","DALA"],"validWords":["SALLAD","ALLAS","LADA","DALA"]},
    "1-9": {"letters":["R","S","K","E","A","D"],"words":["SKEDAR","DERAS","KADER","SKADE"],"validWords":["SKEDAR","DERAS","KADER","SKADE"]},
    "1-10": {"letters":["K","R","S","T","F","O","U"],"words":["FRUKOST","FROST","KUST","KORT","STOR"],"validWords":["FRUKOST","FROST","KUST","KORT","STOR"]},
    // ===========================================
    // CHAPTER 2
    // ===========================================
    "2-1": {"letters":["S","O","L"],"words":["SOL","LOS"],"validWords":["SOL","LOS"]},
    "2-2": {"letters":["H","A","V"],"words":["HAV","AV"],"validWords":["HAV","AV"]},
    "2-3": {"letters":["D","T","R","Ä"],"words":["TRÄD","TRÄ"],"validWords":["TRÄD","TRÄ"]},
    "2-4": {"letters":["T","S","N","R","A","E"],"words":["STENAR","ENAR","RESA"],"validWords":["STENAR","ENAR","RESA"]},
    "2-5": {"letters":["L","A","A","R","D"],"words":["DALAR","DALA","LADA"],"validWords":["DALAR","DALA","LADA"]},
    "2-6": {"letters":["O","L","N","E","D","F"],"words":["FLODEN","FLOD","ODEN"],"validWords":["FLODEN","FLOD","ODEN"]},
    "2-7": {"letters":["S","Ä","N","R","A","T","J"],"words":["STJÄRNA","TJÄRNA","RÄNTA","TÄRNA"],"validWords":["STJÄRNA","TJÄRNA","RÄNTA","TÄRNA"]},
    "2-8": {"letters":["R","S","U","A","K","B"],"words":["BUSKAR","BRUKA","SKURA","RUSA"],"validWords":["BUSKAR","BRUKA","SKURA","RUSA"]},
    "2-9": {"letters":["V","Ä","R","D","E","T"],"words":["VÄRDET","VÄRDE","TRÄDE","VÄDRET"],"validWords":["VÄRDET","VÄRDE","TRÄDE","VÄDRET"]},
    "2-10": {"letters":["N","N","U","A","R","E","T"],"words":["NATUREN","NATUR","RUNT","TUNA","RUTA"],"validWords":["NATUREN","NATUR","RUNT","TUNA","RUTA"]},
    // ===========================================
    // CHAPTER 3
    // ===========================================
    "3-1": {"letters":["R","E","S","A"],"words":["RESA","RES"],"validWords":["RESA","RES"]},
    "3-2": {"letters":["T","A","A","G"],"words":["GATA","TAG"],"validWords":["GATA","TAG"]},
    "3-3": {"letters":["B","R","O"],"words":["BRO","BOR"],"validWords":["BRO","BOR"]},
    "3-4": {"letters":["R","A","E","N","S"],"words":["RESAN","RESA","SENA"],"validWords":["RESAN","RESA","SENA"]},
    "3-5": {"letters":["P","L","S","A","T"],"words":["PLATS","LAST","STAL"],"validWords":["PLATS","LAST","STAL"]},
    "3-6": {"letters":["Ö","T","R","S","E"],"words":["ÖSTER","RÖST","REST"],"validWords":["ÖSTER","RÖST","REST"]},
    "3-7": {"letters":["L","G","E","R","S","A"],"words":["SEGLAR","SEGLA","LAGER","SEGRA"],"validWords":["SEGLAR","SEGLA","LAGER","SEGRA"]},
    "3-8": {"letters":["R","U","S","S","B","A"],"words":["BUSSAR","RUSA","BRAS","BARS"],"validWords":["BUSSAR","RUSA","BRAS","BARS"]},
    "3-9": {"letters":["D","R","E","Ä","F","N"],"words":["FÄRDEN","FÄRDE","ÄNDER","NÄRDE"],"validWords":["FÄRDEN","FÄRDE","ÄNDER","NÄRDE"]},
    "3-10": {"letters":["Ä","V","E","N","D","L","R"],"words":["VÄRLDEN","VÄRDE","LÄRDE","VÄRLD"],"validWords":["VÄRLDEN","VÄRDE","LÄRDE","VÄRLD"]},
    // ===========================================
    // CHAPTER 4
    // ===========================================
    "4-1": {"letters":["M","U","R"],"words":["RUM","MUR"],"validWords":["RUM","MUR"]},
    "4-2": {"letters":["S","H","U"],"words":["HUS"],"validWords":["HUS"]},
    "4-3": {"letters":["K","A","T"],"words":["TAK","AKT"],"validWords":["TAK","AKT"]},
    "4-4": {"letters":["O","T","L","S"],"words":["STOL","LOTS","SOL"],"validWords":["STOL","LOTS","SOL"]},
    "4-5": {"letters":["D","B","O","R"],"words":["BORD","ORD","BOR"],"validWords":["BORD","ORD","BOR"]},
    "4-6": {"letters":["N","Ä","G","S"],"words":["SÄNG","ÄNG"],"validWords":["SÄNG","ÄNG"]},
    "4-7": {"letters":["Ö","D","R","R","A","R"],"words":["DÖRRAR","DÖRR","RÖRA","RÖDA"],"validWords":["DÖRRAR","DÖRR","RÖRA","RÖDA"]},
    "4-8": {"letters":["M","A","N","A","T","T"],"words":["MATTAN","MATTA","MANAT","TANT"],"validWords":["MATTAN","MATTA","MANAT","TANT"]},
    "4-9": {"letters":["N","S","O","F","A","F"],"words":["SOFFAN","SOFFA","FANS"],"validWords":["SOFFAN","SOFFA","FANS"]},
    "4-10": {"letters":["A","D","R","G","N","I"],"words":["GARDIN","DRAG","RING","GRAD","GRAN"],"validWords":["GARDIN","DRAG","RING","GRAD","GRAN"]},
    // ===========================================
    // CHAPTER 5
    // ===========================================
    "5-1": {"letters":["T","Å","R"],"words":["TÅR","RÅT"],"validWords":["TÅR","RÅT"]},
    "5-2": {"letters":["L","H","S","A"],"words":["HALS","SAL"],"validWords":["HALS","SAL"]},
    "5-3": {"letters":["Ö","A","G"],"words":["ÖGA"],"validWords":["ÖGA"]},
    "5-4": {"letters":["P","U","L","S"],"words":["PULS","SLUP","PLUS"],"validWords":["PULS","SLUP","PLUS"]},
    "5-5": {"letters":["S","I","R","F","K"],"words":["FRISK","RISK","SKRI"],"validWords":["FRISK","RISK","SKRI"]},
    "5-6": {"letters":["V","E","E","L","R"],"words":["LEVER","ELEV","REV"],"validWords":["LEVER","ELEV","REV"]},
    "5-7": {"letters":["Ä","M","T","R","S","A"],"words":["SMÄRTA","SMÄRT","SÄRTA","MÄTAR"],"validWords":["SMÄRTA","SMÄRT","SÄRTA","MÄTAR"]},
    "5-8": {"letters":["A","N","D","A","S"],"words":["ANDAS","SAND","DANS","ANDA"],"validWords":["ANDAS","SAND","DANS","ANDA"]},
    "5-9": {"letters":["A","K","R","S","T","Y"],"words":["STYRKA","YRKA","KRYA","TYSK"],"validWords":["STYRKA","YRKA","KRYA","TYSK"]},
    "5-10": {"letters":["M","O","D","K","U","J","S"],"words":["SJUKDOM","SJUK","DOM","MJUK","MOS"],"validWords":["SJUKDOM","SJUK","DOM","MJUK","MOS"]},
    // ===========================================
    // CHAPTER 6
    // ===========================================
    "6-1": {"letters":["L","Ö","N"],"words":["LÖN","ÖN"],"validWords":["LÖN","ÖN"]},
    "6-2": {"letters":["C","H","E","F"],"words":["CHEF","FE"],"validWords":["CHEF","FE"]},
    "6-3": {"letters":["E","K","R","Y"],"words":["YRKE","RYK"],"validWords":["YRKE","RYK"]},
    "6-4": {"letters":["A","T","V","A","L"],"words":["AVTAL","VALT","LAVA"],"validWords":["AVTAL","VALT","LAVA"]},
    "6-5": {"letters":["P","L","T","K","I"],"words":["PLIKT","PILT","LIKT"],"validWords":["PLIKT","PILT","LIKT"]},
    "6-6": {"letters":["A","G","G","Y","B"],"words":["BYGGA","BYGG","GABY"],"validWords":["BYGGA","BYGG","GABY"]},
    "6-7": {"letters":["R","O","T","N","O","K"],"words":["KONTOR","KORT","ORO","ROT"],"validWords":["KONTOR","KORT","ORO","ROT"]},
    "6-8": {"letters":["L","O","L","K","A"],"words":["LOKAL","KOLA","KALL"],"validWords":["LOKAL","KOLA","KALL"]},
    "6-9": {"letters":["K","I","R","R","A","E"],"words":["RIKARE","RIKA","KARR","REKA"],"validWords":["RIKARE","RIKA","KARR","REKA"]},
    "6-10": {"letters":["P","S","E","O","I","N","N"],"words":["PENSION","SPION","PION","SNIP","SION"],"validWords":["PENSION","SPION","PION","SNIP","SION"]},
    // ===========================================
    // CHAPTER 7
    // ===========================================
    "7-1": {"letters":["V","P","R","O"],"words":["PROV","ROV"],"validWords":["PROV","ROV"]},
    "7-2": {"letters":["K","U","R","S"],"words":["KURS","SUR"],"validWords":["KURS","SUR"]},
    "7-3": {"letters":["R","T","S","A"],"words":["RAST","RAS"],"validWords":["RAST","RAS"]},
    "7-4": {"letters":["S","K","O","L","A"],"words":["SKOLA","SKAL","KOLA"],"validWords":["SKOLA","SKAL","KOLA"]},
    "7-5": {"letters":["L","T","A","A","V"],"words":["TAVLA","TALA","LAVA"],"validWords":["TAVLA","TALA","LAVA"]},
    "7-6": {"letters":["R","K","T","A","A"],"words":["KARTA","RAKA","ARTA"],"validWords":["KARTA","RAKA","ARTA"]},
    "7-7": {"letters":["T","E","R","N","I","M"],"words":["TERMIN","TIMER","RITEN","INTER"],"validWords":["TERMIN","TIMER","RITEN","INTER"]},
    "7-8": {"letters":["N","P","O","E","R","N"],"words":["PENNOR","ROPEN","REP","REN"],"validWords":["PENNOR","ROPEN","REP","REN"]},
    "7-9": {"letters":["A","V","I","R","K","S"],"words":["SKRIVA","SKIVA","VIRKA","ARKIV"],"validWords":["SKRIVA","SKIVA","VIRKA","ARKIV"]},
    "7-10": {"letters":["S","N","D","E","T","T","U"],"words":["STUDENT","STUND","DUNST","STUT","SUNT"],"validWords":["STUDENT","STUND","DUNST","STUT","SUNT"]},
    // ===========================================
    // CHAPTER 8
    // ===========================================
    "8-1": {"letters":["V","A","N","G"],"words":["VAGN","VAN"],"validWords":["VAGN","VAN"]},
    "8-2": {"letters":["A","R","Å"],"words":["ÅRA","RÅA"],"validWords":["ÅRA","RÅA"]},
    "8-3": {"letters":["T","S","A","L"],"words":["LAST","SAL"],"validWords":["LAST","SAL"]},
    "8-4": {"letters":["M","O","T","O","R"],"words":["MOTOR","ROM","ORM"],"validWords":["MOTOR","ROM","ORM"]},
    "8-5": {"letters":["V","A","R","Ä","G"],"words":["VÄGAR","GRAV","VARG"],"validWords":["VÄGAR","GRAV","VARG"]},
    "8-6": {"letters":["I","B","A","R","L"],"words":["BILAR","BILA","LIRA"],"validWords":["BILAR","BILA","LIRA"]},
    "8-7": {"letters":["A","F","K","T","I","R"],"words":["TRAFIK","KRAFT","FRAKT","FIKA"],"validWords":["TRAFIK","KRAFT","FRAKT","FIKA"]},
    "8-8": {"letters":["I","L","B","I","S","T"],"words":["BILIST","LIST","SLIT","STIL"],"validWords":["BILIST","LIST","SLIT","STIL"]},
    "8-9": {"letters":["V","A","A","G","N","R"],"words":["VAGNAR","VARG","GRAV","VANA"],"validWords":["VAGNAR","VARG","GRAV","VANA"]},
    "8-10": {"letters":["S","T","O","T","A","I","N"],"words":["STATION","STAT","STAN","NOTA","TONA"],"validWords":["STATION","STAT","STAN","NOTA","TONA"]},
    // ===========================================
    // CHAPTER 9
    // ===========================================
    "9-1": {"letters":["A","L","G"],"words":["LAG","GAL"],"validWords":["LAG","GAL"]},
    "9-2": {"letters":["M","O","D"],"words":["DOM","MOD"],"validWords":["DOM","MOD"]},
    "9-3": {"letters":["R","T","T","Ä"],"words":["RÄTT","TÄT"],"validWords":["RÄTT","TÄT"]},
    "9-4": {"letters":["B","T","R","T","O"],"words":["BROTT","BORT","BOTT"],"validWords":["BROTT","BORT","BOTT"]},
    "9-5": {"letters":["P","O","S","I","L"],"words":["POLIS","SILO","SOL"],"validWords":["POLIS","SILO","SOL"]},
    "9-6": {"letters":["L","A","G","R","A"],"words":["LAGAR","LAGA","GALA"],"validWords":["LAGAR","LAGA","GALA"]},
    "9-7": {"letters":["O","E","R","A","D","M"],"words":["DOMARE","DOMAR","DAMER","MODE"],"validWords":["DOMARE","DOMAR","DAMER","MODE"]},
    "9-8": {"letters":["L","R","E","R","G","E"],"words":["REGLER","REGEL","LEGER","GER"],"validWords":["REGLER","REGEL","LEGER","GER"]},
    "9-9": {"letters":["R","T","F","F","A","S"],"words":["STRAFF","STAFF","FART","SAFT"],"validWords":["STRAFF","STAFF","FART","SAFT"]},
    "9-10": {"letters":["A","R","V","E","T"],"words":["ARVET","ARV","VAR","RET"],"validWords":["ARVET","ARV","VAR","RET"]},
    // ===========================================
    // CHAPTER 10
    // ===========================================
    "10-1": {"letters":["O","T","R"],"words":["TRO","ROT"],"validWords":["TRO","ROT"]},
    "10-2": {"letters":["D","R","I","F"],"words":["FRID","FRI"],"validWords":["FRID","FRI"]},
    "10-3": {"letters":["F","D","R","E"],"words":["FRED","RED"],"validWords":["FRED","RED"]},
    "10-4": {"letters":["H","L","A","L","A"],"words":["ALLAH","HALL","ALLA"],"validWords":["ALLAH","HALL","ALLA"]},
    "10-5": {"letters":["I","M","S","L","A"],"words":["ISLAM","SILA","MILA"],"validWords":["ISLAM","SILA","MILA"]},
    "10-6": {"letters":["Z","A","A","T","K"],"words":["ZAKAT","KATA","AKTA"],"validWords":["ZAKAT","KATA","AKTA"]},
    "10-7": {"letters":["S","O","É","N","K","M"],"words":["MOSKÉN","MOSKÉ","SON","SKO"],"validWords":["MOSKÉN","MOSKÉ","SON","SKO"]},
    "10-8": {"letters":["O","K","A","R","N"],"words":["KORNA","KORA","ARK","KAN"],"validWords":["KORNA","KORA","ARK","KAN"]},
    "10-9": {"letters":["E","I","H","G","T","L"],"words":["HELIGT","HELIG","HELT","LITE"],"validWords":["HELIGT","HELIG","HELT","LITE"]},
    "10-10": {"letters":["T","E","F","O","R","P"],"words":["PROFET","POET","PORT","FORT","REP"],"validWords":["PROFET","POET","PORT","FORT","REP"]},
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
        "t": "فصل",
        "s": "Första akten.",
        "st": "الفصل الأول."
    },
    {
        "w": "AKTA",
        "t": "يحذر",
        "s": "Akta dig.",
        "st": "احذر."
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
        "w": "ÄLGA",
        "t": "يمشي بخطوات واسعة",
        "s": "Han älgade fram i skogen.",
        "st": "يمشي بسرعة."
    },
    {
        "w": "ALLA",
        "t": "الجميع",
        "s": "Alla.",
        "st": "الجميع."
    },
    {
        "w": "ALLAH",
        "t": "الله",
        "s": "Allah.",
        "st": "الله."
    },
    {
        "w": "ALLAS",
        "t": "للجميع",
        "s": "Det är allas ansvar.",
        "st": "إنها مسؤولية الجميع."
    },
    {
        "w": "ÄLV",
        "t": "نهر",
        "s": "Göta älv Kalix älv",
        "st": "نهر يوتا نهر كاليكس"
    },
    {
        "w": "ÄLVA",
        "t": "جنية/نهر",
        "s": "Älvorna dansar i dimman.",
        "st": "الجنية ترقص."
    },
    {
        "w": "AMS",
        "t": "مجلس سوق العمل",
        "s": "AMS - bidrag",
        "st": "منحة مجلس سوق العمل"
    },
    {
        "w": "ANDA",
        "t": "روح",
        "s": "I anda.",
        "st": "بروح."
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
        "s": "Andas in.",
        "st": "تنفس."
    },
    {
        "w": "ANDE",
        "t": "روح",
        "s": "den helige Ande ond ande",
        "st": "الروح القدس روح شرير"
    },
    {
        "w": "ÄNDER",
        "t": "بط",
        "s": "Mata änder.",
        "st": "إطعام البط."
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
        "s": "På en äng.",
        "st": "في مرج."
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
        "w": "ÄNKA",
        "t": "أرملة",
        "s": "Hon är änka.",
        "st": "هي أرملة."
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
        "s": "En åra.",
        "st": "مجاديف."
    },
    {
        "w": "ARG",
        "t": "غاضب",
        "s": "Var inte arg på mig.",
        "st": "لا تغضب مني."
    },
    {
        "w": "ARK",
        "t": "سفينة / ورقة",
        "s": "Noaks ark.",
        "st": "سفينة نوح."
    },
    {
        "w": "ARKIV",
        "t": "أرشيف",
        "s": "Arkiv.",
        "st": "أرشيف."
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
        "w": "ÄRT",
        "t": "بازلاء",
        "s": "Ärtsoppa är gott.",
        "st": "حساء البازلاء."
    },
    {
        "w": "ARTA",
        "t": "تتطور",
        "s": "Det artar sig.",
        "st": "الأمور تتطور."
    },
    {
        "w": "ÄRTA",
        "t": "بازلاء",
        "s": "En ärta.",
        "st": "بازلاء."
    },
    {
        "w": "ARV",
        "t": "إرث",
        "s": "Arv.",
        "st": "إرث."
    },
    {
        "w": "ARVET",
        "t": "الإرث",
        "s": "Arvet.",
        "st": "الإرث."
    },
    {
        "w": "AS",
        "t": "جيفة",
        "s": "Det luktar as.",
        "st": "رائحة كريهة."
    },
    {
        "w": "ASK",
        "t": "علبة",
        "s": "En ask.",
        "st": "علبة."
    },
    {
        "w": "ÅSKA",
        "t": "رعد",
        "s": "Åskan går.",
        "st": "الرعد والبرق."
    },
    {
        "w": "ÅSNA",
        "t": "حمار",
        "s": "Åsnan är envis.",
        "st": "الحمار عنيد."
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
        "w": "ATP",
        "t": "التقاعد الإضافي العام",
        "s": "ATP - poäng",
        "st": "اسم"
    },
    {
        "w": "ATT",
        "t": "ليد",
        "s": "att .: Katarina Wall",
        "st": "ليد: كاتارينا فال"
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
        "s": "Ett avtal.",
        "st": "اتفاقية."
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
        "w": "BAR",
        "t": "عارٍ",
        "s": "sova under bar himmel",
        "st": "نام تحت السماء المكشوفة"
    },
    {
        "w": "BÄR",
        "t": "توت",
        "s": "Plocka bär i skogen.",
        "st": "قطف التوت في الغابة."
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
        "s": "Han bars ut.",
        "st": "حُمل للخارج."
    },
    {
        "w": "BASAR",
        "t": "بازار",
        "s": "På en basar.",
        "st": "في بازار."
    },
    {
        "w": "BEN",
        "t": "رِجْل",
        "s": "sträcka på benen",
        "st": "مَدَّ ساقيه"
    },
    {
        "w": "BENIG",
        "t": "نحيل",
        "s": "mager och benig",
        "st": "نحيل وهزيل"
    },
    {
        "w": "BERG",
        "t": "جبل",
        "s": "Berget är högt att bestiga.",
        "st": "الجبل عالٍ."
    },
    {
        "w": "BERGET",
        "t": "الجبل",
        "s": "Berget är högt.",
        "st": "الجبل عالٍ."
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
        "w": "BIL",
        "t": "سيارة",
        "s": "Bilen behöver bensin.",
        "st": "السيارة تحتاج إلى بنزين."
    },
    {
        "w": "BILA",
        "t": "فأس",
        "s": "En bila.",
        "st": "فأس."
    },
    {
        "w": "BILAR",
        "t": "سيارات",
        "s": "Bilar.",
        "st": "سيارات."
    },
    {
        "w": "BILD",
        "t": "درس الرسم",
        "s": "En fin bild på familjen.",
        "st": "صورة جميلة للعائلة."
    },
    {
        "w": "BILIST",
        "t": "سائق",
        "s": "En bilist.",
        "st": "سائق."
    },
    {
        "w": "BILJETT",
        "t": "تذكرة",
        "s": "Jag har köpt en biljett.",
        "st": "اشتريت تذكرة."
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
        "w": "BOK",
        "t": "كتاب",
        "s": "Läs en bok för att lära.",
        "st": "اقرأ كتاباً لتتعلم."
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
        "s": "Vi bor.",
        "st": "نحن نسكن."
    },
    {
        "w": "BORD",
        "t": "طاولة",
        "s": "På bordet.",
        "st": "على الطاولة."
    },
    {
        "w": "BORT",
        "t": "بعيداً",
        "s": "Gå bort.",
        "st": "اذهب بعيداً."
    },
    {
        "w": "BOTT",
        "t": "سكن",
        "s": "Har bott.",
        "st": "سكن."
    },
    {
        "w": "BRAS",
        "t": "نار",
        "s": "En bras.",
        "st": "نار (موقد)."
    },
    {
        "w": "BRO",
        "t": "جسر",
        "s": "Över en bro.",
        "st": "فوق جسر."
    },
    {
        "w": "BRÖD",
        "t": "خبز",
        "s": "Färskt bröd doftar gott.",
        "st": "الخبز الطازج رائحته زكية."
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
        "s": "Ett brott.",
        "st": "جريمة."
    },
    {
        "w": "BRUKA",
        "t": "يفلح",
        "s": "Bruka jorden.",
        "st": "فلاحة الأرض."
    },
    {
        "w": "BRUSA",
        "t": "يفور",
        "s": "Havet brusa.",
        "st": "البحر يهيج."
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
        "s": "I buskarna.",
        "st": "في الشجيرات."
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
        "s": "Bussarna går.",
        "st": "الحافلات تسير."
    },
    {
        "w": "BYGG",
        "t": "بناء",
        "s": "Bygg.",
        "st": "بناء."
    },
    {
        "w": "BYGGA",
        "t": "يبني",
        "s": "Bygga hus.",
        "st": "بناء منزل."
    },
    {
        "w": "CHEF",
        "t": "مدير",
        "s": "Min chef.",
        "st": "مديري."
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
        "t": "نهار",
        "s": "natt och dag",
        "st": "ليلاً نهاراً"
    },
    {
        "w": "DALA",
        "t": "يهبط",
        "s": "Solen dala.",
        "st": "الشمس تغيب."
    },
    {
        "w": "DALAR",
        "t": "وديان",
        "s": "Berg och dal.",
        "st": "جبال ووديان."
    },
    {
        "w": "DAMER",
        "t": "سيدات",
        "s": "Damer.",
        "st": "سيدات."
    },
    {
        "w": "DANS",
        "t": "رقص",
        "s": "En dans.",
        "st": "رقصة."
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
        "s": "en del av semestern motorns delar",
        "st": "جزء من الإجازة أجزاء المحرك"
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
        "s": "Det är deras.",
        "st": "إنه لهم."
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
        "t": "ك",
        "s": "är det här din bok?",
        "st": "هل هذا كتابك؟"
    },
    {
        "w": "DIREKT",
        "t": "مباشر",
        "s": "direkt demokrati direkta ledningar",
        "st": "ديموقراطية مباشرة خطوط مباشرة"
    },
    {
        "w": "DJUREN",
        "t": "الحيوانات",
        "s": "Djuren lever i skogen.",
        "st": "الحيوانات في الغابة."
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
        "s": "En dom.",
        "st": "حكم."
    },
    {
        "w": "DOMAR",
        "t": "أحكام",
        "s": "Domar.",
        "st": "أحكام."
    },
    {
        "w": "DOMARE",
        "t": "قاضي",
        "s": "En domare.",
        "st": "قاضي."
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
        "s": "Stäng dörren.",
        "st": "أغلق الباب."
    },
    {
        "w": "DÖRRAR",
        "t": "أبواب",
        "s": "Öppna dörrar.",
        "st": "أبواب مفتوحة."
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
        "s": "Ett drag.",
        "st": "سحبة."
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
        "w": "DUNST",
        "t": "بخار",
        "s": "En dunst.",
        "st": "بخار."
    },
    {
        "w": "EK",
        "t": "شجرة بلوط",
        "s": "Eken är ett starkt träd.",
        "st": "شجرة البلوط قوية."
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
        "s": "Elen har gått.",
        "st": "الكهرباء مقطوعة."
    },
    {
        "w": "ELEV",
        "t": "تلميذ",
        "s": "En elev.",
        "st": "تلميذ."
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
        "t": "أحدهما",
        "s": "varken det ena eller det andra",
        "st": "لاهذا ولا ذاك"
    },
    {
        "w": "ENAR",
        "t": "عرعر",
        "s": "Enar är gröna.",
        "st": "أشجار العرعر خضراء."
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
        "w": "ETT",
        "t": "واحد",
        "s": "Nummer ett.",
        "st": "رقم واحد."
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
        "s": "Det låter falsk.",
        "st": "يبدو صوته نشازاً."
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
        "s": "Många fans.",
        "st": "معجبين كثر."
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
        "s": "en färd genom öknen",
        "st": "رحلة عبر الصحراء"
    },
    {
        "w": "FÄRDE",
        "t": "خطر",
        "s": "Fara å färde.",
        "st": "خطر محدق."
    },
    {
        "w": "FÄRDEN",
        "t": "الرحلة",
        "s": "Färden mot norr.",
        "st": "الرحلة نحو الشمال."
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
        "w": "FART",
        "t": "سرعة",
        "s": "Fart.",
        "st": "سرعة."
    },
    {
        "w": "FAS",
        "t": "مرحلة",
        "s": "arbetets sista fas har påbörjats",
        "st": "بدأ العمل في المرحلة الأخيرة من المشروع"
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
        "t": "صلب, قاسٍ",
        "s": "Han satt fast i trafiken.",
        "st": "علق في الازدحام المروري."
    },
    {
        "w": "FASTA",
        "t": "صيام",
        "s": "Vi fastar under Ramadan.",
        "st": "نحن نصوم في رمضان."
    },
    {
        "w": "FE",
        "t": "جنية",
        "s": "En fe.",
        "st": "جنية."
    },
    {
        "w": "FIKA",
        "t": "استراحة قهوة",
        "s": "En fika.",
        "st": "استراحة قهوة."
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
        "s": "Fisk simmar i vattnet.",
        "st": "السمك يسبح في الماء."
    },
    {
        "w": "FISKAR",
        "t": "يصيد السمك",
        "s": "He fiskar i sjön.",
        "st": "هو يصطاد في البحيرة."
    },
    {
        "w": "FLASKA",
        "t": "زجاجة",
        "s": "En flaska vatten.",
        "st": "زجاجة ماء."
    },
    {
        "w": "FLOD",
        "t": "فيضان",
        "s": "Ebb och flod.",
        "st": "المد والجزر."
    },
    {
        "w": "FLODEN",
        "t": "النهر",
        "s": "Floden rinner.",
        "st": "النهر يجري."
    },
    {
        "w": "FLYG",
        "t": "طائرة",
        "s": "Flyget lyfter mot solen.",
        "st": "الطائرة تقلع نحو الشمس."
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
        "s": "Öppna fönstret.",
        "st": "افتح النافذة."
    },
    {
        "w": "FÖR",
        "t": "جداًً",
        "s": "för gammal för snål",
        "st": "هَرِم جداًً بخيل جداًً"
    },
    {
        "w": "FÖRE",
        "t": "قبل",
        "s": "före månadens utgång före intervjun",
        "st": "قبل انتهاء الشهر قبل المقابلة"
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
        "s": "Gå fort.",
        "st": "امشِ بسرعة."
    },
    {
        "w": "FRAKT",
        "t": "شحن",
        "s": "Frakt.",
        "st": "شحن."
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
        "s": "Fred.",
        "st": "سلام."
    },
    {
        "w": "FRI",
        "t": "حر",
        "s": "Fri.",
        "st": "حر."
    },
    {
        "w": "FRID",
        "t": "سلام",
        "s": "Frid.",
        "st": "سلام."
    },
    {
        "w": "FRISK",
        "t": "صحي",
        "s": "Frisk luft.",
        "st": "هواء نقي."
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
        "w": "GÅ",
        "t": "يمشي",
        "s": "Att gå hem.",
        "st": "يمشي ببطء."
    },
    {
        "w": "GABY",
        "t": "غابي",
        "s": "Gaby.",
        "st": "غابي."
    },
    {
        "w": "GAL",
        "t": "يصيح",
        "s": "Tuppen gal.",
        "st": "الديك يصيح."
    },
    {
        "w": "GALA",
        "t": "حفل",
        "s": "En gala.",
        "st": "حفل."
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
        "s": "Dra för gardinen.",
        "st": "أسدل الستارة."
    },
    {
        "w": "GAS",
        "t": "دعاسة البنزين",
        "s": "giftiga gaser elda med gas",
        "st": "غازات سامة أشعل بالغاز"
    },
    {
        "w": "GATA",
        "t": "شارع",
        "s": "Gå över gatan.",
        "st": "اعبر الشارع."
    },
    {
        "w": "GELET",
        "t": "الجيل",
        "s": "Gelet.",
        "st": "الجيل."
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
        "s": "Ger.",
        "st": "يعطي."
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
        "w": "GRAD",
        "t": "درجة",
        "s": "En grad.",
        "st": "درجة واحدة."
    },
    {
        "w": "GRAN",
        "t": "تنوب",
        "s": "En gran.",
        "st": "شجرة تنوب."
    },
    {
        "w": "GRAV",
        "t": "قبر",
        "s": "Grav.",
        "st": "قبر."
    },
    {
        "w": "GRAVID",
        "t": "حامِل",
        "s": "en gravid kvinna",
        "st": "امرأة حامل"
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
        "s": "Gröt är nyttig frukost.",
        "st": "العصيدة فطور صحي."
    },
    {
        "w": "GUL",
        "t": "أصفر",
        "s": "solen lyser gul gul lök",
        "st": "شُعاع الشمس أَصفر بصل"
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
        "w": "HALL",
        "t": "قاعة",
        "s": "En hall.",
        "st": "قاعة."
    },
    {
        "w": "HALS",
        "t": "حلق",
        "s": "Ont i halsen.",
        "st": "ألم في الحلق."
    },
    {
        "w": "HÄLSA",
        "t": "صحة",
        "s": "Hälsa är viktigare än pengar.",
        "st": "الصحة أهم من المال."
    },
    {
        "w": "HÅN",
        "t": "ازْدِراء",
        "s": "det känns som ett hån",
        "st": "أشعر كـأنه ازدراء من طرفك"
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
        "s": "De sju haven.",
        "st": "البحار السبعة."
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
        "w": "HELIG",
        "t": "مقدس",
        "s": "Helig.",
        "st": "مقدس."
    },
    {
        "w": "HELIGT",
        "t": "مقدس",
        "s": "Heligt.",
        "st": "مقدس."
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
        "s": "Helt.",
        "st": "تماماً."
    },
    {
        "w": "HEM",
        "t": "منزل",
        "s": "Borta bra men hemma bäst.",
        "st": "لا مكان مثل المنزل."
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
        "s": "Rött hus.",
        "st": "بيت أحمر."
    },
    {
        "w": "IDE",
        "t": "مَرْبَض",
        "s": "gå i ide",
        "st": "يرقد في البيات الشتوي"
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
        "s": "Inter.",
        "st": "إنتر."
    },
    {
        "w": "IS",
        "t": "جليد",
        "s": "Halka på is.",
        "st": "الجليد بارد."
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
        "s": "Islam.",
        "st": "الإسلام."
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
        "w": "JU",
        "t": "كما تعلم",
        "s": "Du vet ju det.",
        "st": "أنت تعلم ذلك."
    },
    {
        "w": "KADER",
        "t": "كادر",
        "s": "En kader.",
        "st": "كادر."
    },
    {
        "w": "KAFFE",
        "t": "قهوة",
        "s": "Jag dricker kaffe varje morgon.",
        "st": "أشرب القهوة كل صباح."
    },
    {
        "w": "KAKA",
        "t": "كعكة",
        "s": "Vi bakar en kaka.",
        "st": "نحن نخبز كعكة."
    },
    {
        "w": "KAL",
        "t": "أجرد",
        "s": "kala grenar kala klippor",
        "st": "أغصان عارية صخور جرداء"
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
        "s": "Kall.",
        "st": "بارد."
    },
    {
        "w": "KALOTT",
        "t": "قلنسوة ضيقة",
        "s": "bildligt något som liknar en kalott",
        "st": "تقال مجازاً عن شيء يشابه القلنسوة"
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
        "s": "Jag kan.",
        "st": "أنا أستطيع."
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
        "s": "Karr.",
        "st": "مستنقع."
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
        "s": "En karta.",
        "st": "خريطة."
    },
    {
        "w": "KAST",
        "t": "رمية",
        "s": "Ett kast.",
        "st": "رمية."
    },
    {
        "w": "KATA",
        "t": "كاتا",
        "s": "Kata (karate).",
        "st": "كاتا (كاراتيه)."
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
        "w": "KO",
        "t": "بقرة",
        "s": "En brun ko.",
        "st": "بقرة بنية."
    },
    {
        "w": "KOCK",
        "t": "طباخ",
        "s": "Kocken lagar god mat.",
        "st": "الطباخ يطبخ طعاماً لذيذاً."
    },
    {
        "w": "KÖKET",
        "t": "المطبخ",
        "s": "Vi lagar mat i köket.",
        "st": "نطبخ في المطبخ."
    },
    {
        "w": "KOLA",
        "t": "توفي",
        "s": "En kola.",
        "st": "توفي."
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
        "s": "På kontor.",
        "st": "في مكتب."
    },
    {
        "w": "KÖR",
        "t": "استمرار",
        "s": "i ett kör ( oavbrutet )",
        "st": "باستمرار"
    },
    {
        "w": "KORA",
        "t": "يختار",
        "s": "Kora en vinnare.",
        "st": "اختيار فائز."
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
        "s": "Korna betar.",
        "st": "الأبقار ترعى."
    },
    {
        "w": "KORT",
        "t": "قصير",
        "s": "Kort.",
        "st": "قصير."
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
        "st": "شوي السجق."
    },
    {
        "w": "KOSTAR",
        "t": "يكلـّف",
        "s": "vad kostar äpplena?",
        "st": "كم سعر التفاح؟"
    },
    {
        "w": "KRAFT",
        "t": "قوة",
        "s": "Kraft.",
        "st": "قوة."
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
        "s": "Krya på dig.",
        "st": "بالشفاء."
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
        "s": "En kurs.",
        "st": "دورة."
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
        "w": "LADA",
        "t": "حظيرة",
        "s": "Hästen i en lada.",
        "st": "الحصان في الحظيرة."
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
        "s": "En lag.",
        "st": "قانون."
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
        "s": "Laga mat.",
        "st": "يطبخ."
    },
    {
        "w": "LAGAR",
        "t": "قوانين",
        "s": "Lagar.",
        "st": "قوانين."
    },
    {
        "w": "LAGER",
        "t": "مخزون",
        "s": "På lager.",
        "st": "في المخزون."
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
        "t": "بلد",
        "s": "Ett land.",
        "st": "بلد."
    },
    {
        "w": "LÅNG",
        "t": "طويل",
        "s": "två meter lång",
        "st": "طوله متران"
    },
    {
        "w": "LÄR",
        "t": "يُدّعى أن",
        "s": "hon lär vara miljonär",
        "st": "يُقال إنها مليونيرة"
    },
    {
        "w": "LÄRA",
        "t": "تعلم",
        "s": "Man lär sig något nytt varje dag.",
        "st": "المرء يتعلم شيئاً جديداً كل يوم."
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
        "s": "De lärde.",
        "st": "العلماء."
    },
    {
        "w": "LÅS",
        "t": "قفل",
        "s": "Ett hänglås.",
        "st": "القفل قوي."
    },
    {
        "w": "LAST",
        "t": "حمل",
        "s": "En last.",
        "st": "حمل."
    },
    {
        "w": "LAVA",
        "t": "حمم",
        "s": "Lava.",
        "st": "حمم."
    },
    {
        "w": "LÄXA",
        "t": "واجب منزلي",
        "s": "Gör din läxa efter skolan.",
        "st": "قم بواجبك بعد المدرسة."
    },
    {
        "w": "LE",
        "t": "يبتسم",
        "s": "Hon ler mot mig.",
        "st": "هي تبتسم دائماً."
    },
    {
        "w": "LED",
        "t": "مُتْعَب",
        "s": "jag är led på mitt jobb",
        "st": "سَئِمت عَمَلي"
    },
    {
        "w": "LEDD",
        "t": "اتّجاه",
        "s": "mattan passar bättre på andra ledden",
        "st": "تُناسِب السجادة بصورة أفضل في الإتّجاه الآخَر"
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
        "s": "Legering.",
        "st": "سبيكة."
    },
    {
        "w": "LEGIT",
        "t": "شرعي",
        "s": "Legit.",
        "st": "شرعي (عامية)."
    },
    {
        "w": "LEN",
        "t": "لَيّن",
        "s": "en matta av len ull",
        "st": "سجادة من الصوف الناعم"
    },
    {
        "w": "LEVER",
        "t": "كبد",
        "s": "Levern renar.",
        "st": "الكبد ينقي."
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
        "s": "Det är likt.",
        "st": "مشابه."
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
        "s": "Lira boll.",
        "st": "لعب الكرة."
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
        "s": "En list.",
        "st": "قائمة."
    },
    {
        "w": "LISTA",
        "t": "قائمة",
        "s": "Skriv en lista.",
        "st": "اكتب قائمة."
    },
    {
        "w": "LITE",
        "t": "قليل",
        "s": "Lite.",
        "st": "قليل."
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
        "w": "LOGI",
        "t": "مَسكن مُؤَقّت",
        "s": "kost och logi",
        "st": "طعام وسكن"
    },
    {
        "w": "LÖK",
        "t": "بصل",
        "s": "Hacka lök.",
        "st": "افرم البصل."
    },
    {
        "w": "LOKAL",
        "t": "محلي",
        "s": "Lokal.",
        "st": "محلي."
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
        "s": "Lönen.",
        "st": "الراتب."
    },
    {
        "w": "LOS",
        "t": "يفك",
        "s": "Kasta loss.",
        "st": "فك الحبال."
    },
    {
        "w": "LOTS",
        "t": "مرشد",
        "s": "En lots.",
        "st": "مرشد."
    },
    {
        "w": "LOTTA",
        "t": "جُندية مُتَطَوِّعة",
        "s": "Lotta är en lottakår.",
        "st": "لوتا هي مجندة متطوعة."
    },
    {
        "w": "LUGN",
        "t": "هادئ",
        "s": "lugn vilar sjön en lugn gata",
        "st": "ساد الهدوء على البحيرة شارع هادئ"
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
        "w": "LUTA",
        "t": "يميل",
        "s": "Luta dig.",
        "st": "استند."
    },
    {
        "w": "MAL",
        "t": "عِثّة",
        "s": "Kvarnen mal säden.",
        "st": "الطاحونة تطحن الحبوب."
    },
    {
        "w": "MANAT",
        "t": "حث",
        "s": "Han manat.",
        "st": "هو حث."
    },
    {
        "w": "MARK",
        "t": "أرض",
        "s": "Marken är täckt av snö.",
        "st": "الأرض مغطاة بالثلج."
    },
    {
        "w": "MAT",
        "t": "طعام",
        "s": "Mat är viktigt för hälsan.",
        "st": "الطعام مهم للصحة."
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
        "s": "En mätare.",
        "st": "عداد."
    },
    {
        "w": "MATEN",
        "t": "الطعام",
        "s": "Maten är klar.",
        "st": "الطعام جاهز."
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
        "s": "äta sig mätt mätt på framgångar",
        "st": "أكل حتى شبع شبع من الانتصارات"
    },
    {
        "w": "MATTA",
        "t": "سجادة",
        "s": "En matta.",
        "st": "سجادة."
    },
    {
        "w": "MATTAN",
        "t": "السجادة",
        "s": "På mattan.",
        "st": "على السجادة."
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
        "s": "Men.",
        "st": "لكن."
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
        "s": "En mila.",
        "st": "ميل (فحم)."
    },
    {
        "w": "MJÖLK",
        "t": "حليب",
        "s": "Barn behöver mjölk för att växa.",
        "st": "الأطفال يحتاجون الحليب للنمو."
    },
    {
        "w": "MJUK",
        "t": "ناعم",
        "s": "Mjuk.",
        "st": "ناعم."
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
        "s": "Ha mod.",
        "st": "كن شجاعاً."
    },
    {
        "w": "MODE",
        "t": "موضة",
        "s": "Mode.",
        "st": "موضة."
    },
    {
        "w": "MOLN",
        "t": "سحاب",
        "s": "Det finns vita moln på himlen.",
        "st": "يوجد سحاب أبيض في السماء."
    },
    {
        "w": "MOR",
        "t": "أم",
        "s": "mor och barn",
        "st": "أمي تطبخ الطعام."
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
        "s": "Mos.",
        "st": "هريس."
    },
    {
        "w": "MOSKÉ",
        "t": "مسجد",
        "s": "En moské.",
        "st": "مسجد."
    },
    {
        "w": "MOSKÉN",
        "t": "المسجد",
        "s": "Moskén.",
        "st": "المسجد."
    },
    {
        "w": "MOT",
        "t": "ضد",
        "s": "Vi går mot stranden.",
        "st": "نحن ذاهبون نحو الشاطئ."
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
        "s": "Motor.",
        "st": "محرك."
    },
    {
        "w": "MUR",
        "t": "جدار",
        "s": "En mur.",
        "st": "جدار."
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
        "w": "NATUR",
        "t": "طبيعة",
        "s": "Vacker natur.",
        "st": "طبيعة جميلة."
    },
    {
        "w": "NATUREN",
        "t": "الطبيعة",
        "s": "Skydda naturen.",
        "st": "احمِ الطبيعة."
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
        "t": "شمالاً",
        "s": "norr om Stockholm",
        "st": "في شمال ستوكهولم"
    },
    {
        "w": "NOTA",
        "t": "فاتورة",
        "s": "En nota.",
        "st": "فاتورة."
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
        "s": "Guden Oden.",
        "st": "الإله أودين."
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
        "s": "Ett öga.",
        "st": "عين."
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
        "s": "På ön.",
        "st": "في الجزيرة."
    },
    {
        "w": "OND",
        "t": "غاضب",
        "s": "Han har ont i magen.",
        "st": "لديه ألم في البطن."
    },
    {
        "w": "ÖRA",
        "t": "أذن",
        "s": "Jag hör med örat.",
        "st": "أسمع بأذني."
    },
    {
        "w": "ORD",
        "t": "كلمة",
        "s": "Ett ord.",
        "st": "كلمة."
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
        "w": "ORM",
        "t": "ثعبان",
        "s": "En orm.",
        "st": "ثعبان."
    },
    {
        "w": "ORMAR",
        "t": "ثعابين",
        "s": "Ormar.",
        "st": "ثعابين."
    },
    {
        "w": "ORO",
        "t": "قلق",
        "s": "Känna oro.",
        "st": "الشعور بالقلق."
    },
    {
        "w": "ORT",
        "t": "مكان",
        "s": "En ort.",
        "st": "مكان."
    },
    {
        "w": "ÖRT",
        "t": "عشب",
        "s": "Timjan är en ört.",
        "st": "أعشاب طبية."
    },
    {
        "w": "ORTEN",
        "t": "الحي",
        "s": "Från orten.",
        "st": "من الحي."
    },
    {
        "w": "OS",
        "t": "دخان/رائحة",
        "s": "Det osar mat.",
        "st": "رائحة طعام."
    },
    {
        "w": "OST",
        "t": "جبن",
        "s": "Jag älskar ost.",
        "st": "أنا أحب الجبن."
    },
    {
        "w": "ÖST",
        "t": "شرق",
        "s": "Solen går upp i öst.",
        "st": "الشمس تشرق من الشرق."
    },
    {
        "w": "ÖSTER",
        "t": "شرق",
        "s": "Solen i öster.",
        "st": "الشمس في الشرق."
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
        "w": "PAKET",
        "t": "طرد",
        "s": "Ett paket.",
        "st": "طرد."
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
        "w": "PENNA",
        "t": "قلم",
        "s": "Skriv med en penna.",
        "st": "اكتب بقلم."
    },
    {
        "w": "PENNOR",
        "t": "أقلام",
        "s": "Pennor.",
        "st": "أقلام."
    },
    {
        "w": "PENSION",
        "t": "تقاعد",
        "s": "Pension.",
        "st": "تقاعد."
    },
    {
        "w": "PEPPAR",
        "t": "فلفل",
        "s": "Peppar är starkt.",
        "st": "الفلفل حار."
    },
    {
        "w": "PILT",
        "t": "صبي",
        "s": "En pilt.",
        "st": "صبي."
    },
    {
        "w": "PION",
        "t": "فاوانيا",
        "s": "Pion.",
        "st": "فاوانيا."
    },
    {
        "w": "PLAN",
        "t": "خطة",
        "s": "Vi har en bra plan.",
        "st": "لدينا خطة جيدة."
    },
    {
        "w": "PLATS",
        "t": "مكان",
        "s": "Ta plats.",
        "st": "خذ مكاناً."
    },
    {
        "w": "PLIKT",
        "t": "واجب",
        "s": "Din plikt.",
        "st": "واجبك."
    },
    {
        "w": "PLUS",
        "t": "زائد",
        "s": "Ett plus.",
        "st": "زائد."
    },
    {
        "w": "POET",
        "t": "شاعر",
        "s": "En poet.",
        "st": "شاعر."
    },
    {
        "w": "POLIS",
        "t": "شرطة",
        "s": "Polisen.",
        "st": "الشرطة."
    },
    {
        "w": "PORT",
        "t": "بوابة",
        "s": "En port.",
        "st": "بوابة."
    },
    {
        "w": "POSERAR",
        "t": "يَتَّخذ وضعاً متكلفاً",
        "s": "hon poserar framför kameran",
        "st": "تَتَّخذ وضعاً أمام الكاميرا"
    },
    {
        "w": "PRAT",
        "t": "ثَرثرة",
        "s": "det är bara löst prat",
        "st": "هذه مجرد ثرثرة"
    },
    {
        "w": "PROFET",
        "t": "نبي",
        "s": "En profet.",
        "st": "نبي."
    },
    {
        "w": "PROV",
        "t": "اختبار",
        "s": "Ett prov.",
        "st": "اختبار."
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
        "s": "Känn pulsen.",
        "st": "تحسس النبض."
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
        "s": "Råa.",
        "st": "نيئة."
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
        "w": "RÅGAD",
        "t": "طافح",
        "s": "en rågad sked",
        "st": "ملعقة طافحة"
    },
    {
        "w": "RAK",
        "t": "مُستقيم",
        "s": "rak i ryggen stå rak",
        "st": "مستقيم الظهر وَقَف مُستَقيماً"
    },
    {
        "w": "RAKA",
        "t": "مستقيم",
        "s": "Raka vägen.",
        "st": "طريق مستقيم."
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
        "s": "Ränta på ränta.",
        "st": "فائدة مركبة."
    },
    {
        "w": "RAPP",
        "t": "سريع",
        "s": "ett rappt svar",
        "st": "إجابة سريعة"
    },
    {
        "w": "RAS",
        "t": "انهيار",
        "s": "Ett ras.",
        "st": "انهيار."
    },
    {
        "w": "RASAR",
        "t": "ينهار",
        "s": "Huset rasar.",
        "st": "المنزل ينهار."
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
        "s": "En rast.",
        "st": "استراحة."
    },
    {
        "w": "RÅT",
        "t": "نيء",
        "s": "Rått kött.",
        "st": "لحم نيء."
    },
    {
        "w": "RÄT",
        "t": "مستقيم",
        "s": "en rät linje",
        "st": "مستقيم خط"
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
        "s": "Ha rätt.",
        "st": "أن تكون محقاً."
    },
    {
        "w": "RECEPT",
        "t": "وصفة",
        "s": "Följ receptet noga.",
        "st": "اتبع الوصفة بدقة."
    },
    {
        "w": "RED",
        "t": "ركب",
        "s": "Han red.",
        "st": "هو ركب."
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
        "s": "En regel.",
        "st": "قاعدة."
    },
    {
        "w": "REGI",
        "t": "إخراج",
        "s": "regi och dekor",
        "st": "إخراج و ديكور"
    },
    {
        "w": "REGLER",
        "t": "قواعد",
        "s": "Regler.",
        "st": "قواعد."
    },
    {
        "w": "REGN",
        "t": "مَطَر",
        "s": "Regnet öser ner.",
        "st": "المطر ينهمر."
    },
    {
        "w": "REKA",
        "t": "يستطلع",
        "s": "Reka.",
        "st": "يستطلع."
    },
    {
        "w": "REN",
        "t": "نظيف",
        "s": "Ren.",
        "st": "نظيف."
    },
    {
        "w": "RENAR",
        "t": "رنة",
        "s": "Renar i norr.",
        "st": "الرنة في الشمال."
    },
    {
        "w": "REP",
        "t": "حبل",
        "s": "Ett rep.",
        "st": "حبل."
    },
    {
        "w": "REPA",
        "t": "خَدْش",
        "s": "en repa i lacken",
        "st": "خَدْش في الدهان"
    },
    {
        "w": "RES",
        "t": "سافر",
        "s": "Res dig upp.",
        "st": "انهض."
    },
    {
        "w": "RESA",
        "t": "سفر",
        "s": "Att resa är att leva.",
        "st": "السفر هو الحياة."
    },
    {
        "w": "RESAN",
        "t": "الرحلة",
        "s": "Resan var lång.",
        "st": "كانت الرحلة طويلة."
    },
    {
        "w": "REST",
        "t": "سافر",
        "s": "Vi har rest.",
        "st": "لقد سافرنا."
    },
    {
        "w": "RET",
        "t": "إغاظة",
        "s": "Ret.",
        "st": "إغاظة."
    },
    {
        "w": "RETAS",
        "t": "يُمازح",
        "s": "barnen retas med varandra",
        "st": "يتمازح الأطفال مع بعضهم الآخر"
    },
    {
        "w": "REV",
        "t": "شِعب",
        "s": "Ett rev.",
        "st": "شِعب (مرجانية)."
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
        "s": "Rika.",
        "st": "أغنياء."
    },
    {
        "w": "RIKARE",
        "t": "أغنى",
        "s": "Blev rikare.",
        "st": "أصبح أغنى."
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
        "s": "Guldring.",
        "st": "خاتم ذهب."
    },
    {
        "w": "RIS",
        "t": "أرُزّ",
        "s": "Vi äter ris och kyckling.",
        "st": "نأكل الأرز والدجاج."
    },
    {
        "w": "RISK",
        "t": "خطر",
        "s": "En risk.",
        "st": "خطر."
    },
    {
        "w": "RITEN",
        "t": "الطقس",
        "s": "Riten.",
        "st": "الطقس (الديني)."
    },
    {
        "w": "RO",
        "t": "هدوء",
        "s": "Jag behöver lugn och ro.",
        "st": "أحتاج بعض الهدوء."
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
        "s": "Röda rosor.",
        "st": "ورود حمراء."
    },
    {
        "w": "ROLL",
        "t": "دَوْر",
        "s": "spela rollen som Hamlet",
        "st": "أدّى دور هاملت"
    },
    {
        "w": "ROM",
        "t": "روم",
        "s": "Rom.",
        "st": "روم."
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
        "w": "ROPEN",
        "t": "الصرخات",
        "s": "Ropen.",
        "st": "الصرخات."
    },
    {
        "w": "RÖRA",
        "t": "فوضى",
        "s": "Vilken röra.",
        "st": "يا لها من فوضى."
    },
    {
        "w": "RÖRD",
        "t": "مُتَأثّر",
        "s": "alla var djupt rörda",
        "st": "تأثر الجميع بصورة كبيرة"
    },
    {
        "w": "ROS",
        "t": "ورد",
        "s": "En röd ros doftar gott.",
        "st": "الوردة الحمراء تفوح منها رائحة طيبة."
    },
    {
        "w": "ROSA",
        "t": "زهريّ",
        "s": "en rosa klänning",
        "st": "فستان زهري"
    },
    {
        "w": "RÖST",
        "t": "صوت",
        "s": "Vacker röst.",
        "st": "صوت جميل."
    },
    {
        "w": "ROT",
        "t": "جذر",
        "s": "En rot.",
        "st": "جذر."
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
        "s": "Ett rov.",
        "st": "فريسة."
    },
    {
        "w": "RUIN",
        "t": "أنقاض",
        "s": "Huset är en ruin.",
        "st": "المنزل عبارة عن حطام."
    },
    {
        "w": "RUM",
        "t": "غرفة",
        "s": "Mitt rum.",
        "st": "غرفتي."
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
        "s": "Jorden runt.",
        "st": "حول الأرض."
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
        "s": "Rusa iväg.",
        "st": "يندفع."
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
        "s": "En ruta.",
        "st": "مربع."
    },
    {
        "w": "RYK",
        "t": "دخن",
        "s": "Ryk.",
        "st": "دخن (أمر)."
    },
    {
        "w": "SÅ",
        "t": "هكذا/بذر",
        "s": "Gör så här.",
        "st": "افعلها هكذا."
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
        "s": "Saft.",
        "st": "عصير."
    },
    {
        "w": "SAK",
        "t": "شيء",
        "s": "var sak på sin plats",
        "st": "كل شيء في مكانه"
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
        "s": "En sal.",
        "st": "قاعة."
    },
    {
        "w": "SALLAD",
        "t": "سلطة",
        "s": "En fräsch sallad.",
        "st": "سلطة طازجة."
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
        "w": "SAMS",
        "t": "مُتَّفِق",
        "s": "barnen kan aldrig vara sams",
        "st": "لايتفق الأطفال أبداً"
    },
    {
        "w": "SAND",
        "t": "رمل",
        "s": "Sand.",
        "st": "رمل."
    },
    {
        "w": "SÄNG",
        "t": "سرير",
        "s": "Mjuk säng.",
        "st": "سرير ناعم."
    },
    {
        "w": "SÅR",
        "t": "جُرح, قُرْحَة, خَدْش",
        "s": "tiden läker alla sår",
        "st": "تلتئم كل الجروح مع الزمن"
    },
    {
        "w": "SÄRTA",
        "t": "بطة",
        "s": "En särta.",
        "st": "بطة."
    },
    {
        "w": "SÅS",
        "t": "صلصة",
        "s": "Sås till köttet.",
        "st": "صلصة للحم."
    },
    {
        "w": "SE",
        "t": "يرى",
        "s": "Jag kan se dig.",
        "st": "أنا أرى الطيور."
    },
    {
        "w": "SEGLA",
        "t": "إبحار",
        "s": "Att segla.",
        "st": "الإبحار."
    },
    {
        "w": "SEGLAR",
        "t": "يبحر",
        "s": "Han seglar.",
        "st": "هو يبحر."
    },
    {
        "w": "SEGRA",
        "t": "ينتصر",
        "s": "Att segra.",
        "st": "الانتصار."
    },
    {
        "w": "SEMESTER",
        "t": "إجازة",
        "s": "Vi är på semester.",
        "st": "نحن في إجازة."
    },
    {
        "w": "SENA",
        "t": "متأخرة",
        "s": "Sena kvällar.",
        "st": "أمسيات متأخرة."
    },
    {
        "w": "SENIG",
        "t": "وَتَريّ",
        "s": "mager och senig",
        "st": "نحيل ووتري"
    },
    {
        "w": "SI",
        "t": "انظر (قديم)",
        "s": "En ton.",
        "st": "انظر هناك."
    },
    {
        "w": "SIDA",
        "t": "سيدا",
        "s": "Vänd sida i boken.",
        "st": "اقلب الصفحة في الكتاب."
    },
    {
        "w": "SILA",
        "t": "يصفي",
        "s": "Sila.",
        "st": "يصفي."
    },
    {
        "w": "SILL",
        "t": "سمكة الرنكة",
        "s": "Sill är gott.",
        "st": "الرنجة لذيذة."
    },
    {
        "w": "SILO",
        "t": "صومعة",
        "s": "En silo.",
        "st": "صومعة."
    },
    {
        "w": "SION",
        "t": "صهيون",
        "s": "Sion.",
        "st": "صهيون."
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
        "w": "SJUK",
        "t": "مريض",
        "s": "Sjuk.",
        "st": "مريض."
    },
    {
        "w": "SJUKDOM",
        "t": "مرض",
        "s": "Sjukdom.",
        "st": "مرض."
    },
    {
        "w": "SKA",
        "t": "سوف, سـ, سيكون",
        "s": "huset ska rivas",
        "st": "سوف تُهْدَم البناية"
    },
    {
        "w": "SKADE",
        "t": "أذى",
        "s": "Till skade.",
        "st": "للأذى."
    },
    {
        "w": "SKAL",
        "t": "قشرة",
        "s": "Ett skal.",
        "st": "قشرة."
    },
    {
        "w": "SKALA",
        "t": "يقشر",
        "s": "Skala en banan.",
        "st": "قشر الموزة."
    },
    {
        "w": "SKARP",
        "t": "حادّ",
        "s": "skarp ammunition ( riktig ammunition )",
        "st": "ذخيرة حيّة"
    },
    {
        "w": "SKEDAR",
        "t": "ملاعق",
        "s": "Vi behöver skedar.",
        "st": "نحتاج ملاعق."
    },
    {
        "w": "SKEN",
        "t": "بريق",
        "s": "Ett sken.",
        "st": "بريق."
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
        "s": "En skiva.",
        "st": "شريحة."
    },
    {
        "w": "SKO",
        "t": "حذاء",
        "s": "En sko.",
        "st": "حذاء."
    },
    {
        "w": "SKOG",
        "t": "غابة",
        "s": "Vi promenerar i skogen.",
        "st": "نحن نتنزه في الغابة."
    },
    {
        "w": "SKOLA",
        "t": "مدرسة",
        "s": "Skolan.",
        "st": "المدرسة."
    },
    {
        "w": "SKOLAN",
        "t": "المدرسة",
        "s": "Skolan ligger nära.",
        "st": "المدرسة قريبة."
    },
    {
        "w": "SKÖR",
        "t": "رقيق",
        "s": "ett skört vinglas",
        "st": "كأس نبيذ رقيق"
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
        "s": "Ett skri.",
        "st": "صرخة."
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
        "w": "SKRIVA",
        "t": "يكتب",
        "s": "Att skriva.",
        "st": "الكتابة."
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
        "s": "Skura golvet.",
        "st": "فرك الأرضية."
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
        "s": "Slit och släp.",
        "st": "كدح وعناء."
    },
    {
        "w": "SLOTT",
        "t": "قلعة",
        "s": "Ett slott.",
        "st": "قلعة."
    },
    {
        "w": "SLUP",
        "t": "قارب",
        "s": "En slup.",
        "st": "قارب."
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
        "s": "Han är smärt.",
        "st": "هو نحيل."
    },
    {
        "w": "SMÄRTA",
        "t": "ألم",
        "s": "Stor smärta.",
        "st": "ألم كبير."
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
        "w": "SMULA",
        "t": "مقدار ضئيل",
        "s": "en smula ( lite ) hänsyn",
        "st": "مقدار ضئيل من الاعتبار"
    },
    {
        "w": "SNAR",
        "t": "قريب",
        "s": "inom en snar framtid",
        "st": "في المستقبل القريب"
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
        "s": "Snip.",
        "st": "قارب."
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
        "t": "أنثى الخنزير",
        "s": "En stor so.",
        "st": "أنثى الخنزير تسمى سو."
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
        "s": "En soffa.",
        "st": "أريكة."
    },
    {
        "w": "SOFFAN",
        "t": "الأريكة",
        "s": "I soffan.",
        "st": "في الأريكة."
    },
    {
        "w": "SOL",
        "t": "شمس",
        "s": "Sol.",
        "st": "شمس."
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
        "s": "En son.",
        "st": "ابن."
    },
    {
        "w": "SÖNDER",
        "t": "تالِف",
        "s": "bilen är sönder gå sönder",
        "st": "تَعَطَّلَت السيارة تَلِفَ"
    },
    {
        "w": "SÖT",
        "t": "حلو",
        "s": "Kakan är söt.",
        "st": "الكعكة حلوة."
    },
    {
        "w": "SOVRUM",
        "t": "غرفة نوم",
        "s": "Jag sover i sovrummet.",
        "st": "أنام في غرفة النوم."
    },
    {
        "w": "SPÅR",
        "t": "أثر / سكة",
        "s": "Följ spåret i snön.",
        "st": "اتبع الأثر في الثلج."
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
        "s": "Titta i spegeln.",
        "st": "انظر في المرآة."
    },
    {
        "w": "SPION",
        "t": "جاسوس",
        "s": "Spion.",
        "st": "جاسوس."
    },
    {
        "w": "SPOL",
        "t": "ملف",
        "s": "En spole.",
        "st": "ملف."
    },
    {
        "w": "STAFF",
        "t": "طاقم",
        "s": "Staff.",
        "st": "طاقم."
    },
    {
        "w": "STAL",
        "t": "سرق",
        "s": "Han stal cykeln.",
        "st": "سرق الدراجة."
    },
    {
        "w": "STAN",
        "t": "المدينة",
        "s": "I stan.",
        "st": "في المدينة."
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
        "s": "En stat.",
        "st": "دولة."
    },
    {
        "w": "STATION",
        "t": "محطة",
        "s": "Stationen.",
        "st": "المحطة."
    },
    {
        "w": "STEKA",
        "t": "يقلي",
        "s": "Vi ska steka.",
        "st": "سنقلي."
    },
    {
        "w": "STENAR",
        "t": "أحجار",
        "s": "Kasta inte stenar.",
        "st": "لا ترمِ الحجارة."
    },
    {
        "w": "STIL",
        "t": "أسلوب",
        "s": "Din stil.",
        "st": "أسلوبك."
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
        "w": "STÖD",
        "t": "مسند",
        "s": "ta stöd mot väggen",
        "st": "استند إلى الجدار"
    },
    {
        "w": "STOL",
        "t": "كرسي",
        "s": "En stol.",
        "st": "كرسي."
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
        "s": "En stor stark.",
        "st": "واحدة كبيرة."
    },
    {
        "w": "STORM",
        "t": "عاصفة",
        "s": "Stormen fällde många träd.",
        "st": "أسقطت العاصفة أشجاراً كثيرة."
    },
    {
        "w": "STORMAR",
        "t": "يَعْصِف",
        "s": "det stormar stormande känslor",
        "st": "تَعْصِف مشاعر عنيفة"
    },
    {
        "w": "STRAFF",
        "t": "عقاب",
        "s": "Ett straff.",
        "st": "عقاب."
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
        "s": "Vi leker på stranden.",
        "st": "نلعب على الشاطئ."
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
        "s": "En student.",
        "st": "طالب."
    },
    {
        "w": "STUND",
        "t": "لحظة",
        "s": "En stund.",
        "st": "لحظة."
    },
    {
        "w": "STUT",
        "t": "ثور صغير",
        "s": "En stut.",
        "st": "ثور صغير."
    },
    {
        "w": "STYRKA",
        "t": "قوة",
        "s": "Stor styrka.",
        "st": "قوة كبيرة."
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
        "w": "SUNT",
        "t": "صحي",
        "s": "Sunt liv.",
        "st": "حياة صحية."
    },
    {
        "w": "SUR",
        "t": "غاضب",
        "s": "Han är sur.",
        "st": "هو غاضب."
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
        "w": "SVAR",
        "t": "إجابة",
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
        "s": "Ta ett tag.",
        "st": "أمسك به."
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
        "s": "Taket läcker.",
        "st": "السقف يسرب."
    },
    {
        "w": "TALA",
        "t": "تحدث",
        "s": "Att tala.",
        "st": "التحدث."
    },
    {
        "w": "TAM",
        "t": "أليف",
        "s": "en tam fågel ett tamt anfall",
        "st": "طير داجن هجمة ضعيفة , هجوم ضعيف"
    },
    {
        "w": "TAND",
        "t": "سن",
        "s": "En tand.",
        "st": "سن."
    },
    {
        "w": "TANT",
        "t": "سيدة",
        "s": "En tant.",
        "st": "سيدة."
    },
    {
        "w": "TÅR",
        "t": "دموع",
        "s": "Tårarna rann.",
        "st": "انهمرت الدموع."
    },
    {
        "w": "TÄR",
        "t": "يستهلك",
        "s": "projekten tärde hårt på ekonomin",
        "st": "استهلك المشروع كثيراً من الموارد الاقتصادية"
    },
    {
        "w": "TÄRNA",
        "t": "وصيفة",
        "s": "Lucia tärna.",
        "st": "وصيفة لوسيا."
    },
    {
        "w": "TÄT",
        "t": "كثيف",
        "s": "Tät dimma.",
        "st": "ضباب كثيف."
    },
    {
        "w": "TAVLA",
        "t": "لوحة",
        "s": "En tavla.",
        "st": "لوحة."
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
        "w": "TERMIN",
        "t": "فصل دراسي",
        "s": "En termin.",
        "st": "فصل دراسي."
    },
    {
        "w": "TID",
        "t": "وقت",
        "s": "Tid.",
        "st": "وقت."
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
        "s": "En timer.",
        "st": "مؤقت."
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
        "s": "En liten tjärna.",
        "st": "بحيرة صغيرة."
    },
    {
        "w": "TOK",
        "t": "أبْلَه",
        "s": "Det gick på tok.",
        "st": "سارت الأمور بشكل خاطئ."
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
        "s": "Tona bort.",
        "st": "تتلاشى."
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
        "w": "TOTAL",
        "t": "شامل",
        "s": "en total förnyelse totalt sett",
        "st": "تجديد شامل بصورة إجمالية"
    },
    {
        "w": "TRÄ",
        "t": "يُدخل",
        "s": "Trä nålen.",
        "st": "أدخل الخيط في الإبرة."
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
        "s": "Ligga i träde.",
        "st": "متروكة بوراً."
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
        "s": "Trafik.",
        "st": "مرور."
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
        "s": "Min tro.",
        "st": "إيماني."
    },
    {
        "w": "TROLIG",
        "t": "مُحْتَمل",
        "s": "en trolig utveckling",
        "st": "تَطَوُّر مُحْتَمَل"
    },
    {
        "w": "TUNA",
        "t": "ساحة",
        "s": "Eskilstuna stad.",
        "st": "مدينة إسكيلستونا."
    },
    {
        "w": "TUR",
        "t": "رحلة",
        "s": "båten gör två turer om dagen",
        "st": "قام القارب برحلتين في اليوم"
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
        "w": "TYSK",
        "t": "ألماني",
        "s": "En tysk.",
        "st": "ألماني."
    },
    {
        "w": "UGN",
        "t": "فُرن",
        "s": "steka kött i ugnen",
        "st": "شوى اللحم بالفرن"
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
        "w": "UR",
        "t": "من/ساعة",
        "s": "Gå ur rummet.",
        "st": "أخرج من الغرفة."
    },
    {
        "w": "UT",
        "t": "خارج",
        "s": "Gå ut.",
        "st": "اذهب للخارج."
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
        "w": "VÄDRET",
        "t": "الطقس",
        "s": "Prata om vädret.",
        "st": "الحديث عن الطقس."
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
        "s": "Vägen är lång och krokig.",
        "st": "الطريق طويل ومتعرج."
    },
    {
        "w": "VÄGAR",
        "t": "طرق",
        "s": "Vägar.",
        "st": "طرق."
    },
    {
        "w": "VAGN",
        "t": "عربة",
        "s": "En vagn.",
        "st": "عربة."
    },
    {
        "w": "VAGNAR",
        "t": "عربات",
        "s": "Vagnar.",
        "st": "عربات."
    },
    {
        "w": "VAKT",
        "t": "حِراسة",
        "s": "även om platsen där man vaktar",
        "st": "تقال أيضاً عن المكان المحروس"
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
        "s": "Har valt.",
        "st": "اختار."
    },
    {
        "w": "VAN",
        "t": "معتاد",
        "s": "Han är van.",
        "st": "هو معتاد."
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
        "s": "En vana.",
        "st": "عادة."
    },
    {
        "w": "VAR",
        "t": "أين",
        "s": "Var?",
        "st": "أين؟"
    },
    {
        "w": "VÅR",
        "t": "لنا",
        "s": "vårt eget modersmål",
        "st": "لغتنا الأم"
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
        "s": "Ett värde.",
        "st": "قيمة."
    },
    {
        "w": "VÄRDET",
        "t": "القيمة",
        "s": "Värdet av allt.",
        "st": "قيمة كل شيء."
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
        "s": "Varg.",
        "st": "ذئب."
    },
    {
        "w": "VÄRLD",
        "t": "عالم",
        "s": "En värld.",
        "st": "عالم."
    },
    {
        "w": "VÄRLDEN",
        "t": "العالم",
        "s": "Hela världen.",
        "st": "العالم بأسره."
    },
    {
        "w": "VARS",
        "t": "مَن",
        "s": "En man vars bil är röd.",
        "st": "رجل سيارته حمراء."
    },
    {
        "w": "VÄRST",
        "t": "بصورة خاصّة",
        "s": "inte så värst ofta",
        "st": "ليس كثيراً بصورة خاصة"
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
        "s": "Packa din väska inför resan.",
        "st": "حزم حقيبتك قبل السفر."
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
        "w": "VERS",
        "t": "آية",
        "s": "Läs en vers ur boken.",
        "st": "اقرأ بيتاً من الكتاب."
    },
    {
        "w": "VID",
        "t": "عريض",
        "s": "Huset ligger vid sjön.",
        "st": "يقع المنزل عند البحيرة."
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
        "w": "VILD",
        "t": "بَريّ",
        "s": "vilda växter vilda djur",
        "st": "نباتات بريّة حيوانات برية ( وحشيّة )"
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
        "s": "Virka.",
        "st": "عمل الكروشيه."
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
        "s": "Yrka bifall.",
        "st": "المطالبة."
    },
    {
        "w": "YRKE",
        "t": "مهنة",
        "s": "Ditt yrke.",
        "st": "مهنتك."
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
        "s": "Zakat.",
        "st": "زكاة."
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
