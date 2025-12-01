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
    "1-1": {"letters":["S","O","M"],"words":["MOS","SOM"],"validWords":["MOS","SOM"]},
    "1-2": {"letters":["O","S","T"],"words":["OST","SO"],"validWords":["OST","SO"]},
    "1-3": {"letters":["K","K","A","A"],"words":["KAKA","AKA"],"validWords":["KAKA","AKA"]},
    "1-4": {"letters":["L","I","S","T","A"],"words":["LISTA","SILA","STIL"],"validWords":["LISTA","SILA","STIL"]},
    "1-5": {"letters":["E","S","K","A","T"],"words":["STEKA","KAST","ASK"],"validWords":["STEKA","KAST","ASK"]},
    "1-6": {"letters":["M","E","A","T","N"],"words":["MATEN","TEAM","META"],"validWords":["MATEN","TEAM","META"]},
    "1-7": {"letters":["S","A","A","L","K","F"],"words":["FLASKA","FALSK","SKALA","KALAS"],"validWords":["FLASKA","FALSK","SKALA","KALAS"]},
    "1-8": {"letters":["L","L","U","R","A","B"],"words":["BULLAR","RULLA","LURA","BUR"],"validWords":["BULLAR","RULLA","LURA","BUR"]},
    "1-9": {"letters":["S","D","R","A","K","E"],"words":["SKEDAR","DERAS","KADER","SKADE"],"validWords":["SKEDAR","DERAS","KADER","SKADE"]},
    "1-10": {"letters":["F","R","S","O","T","U","K"],"words":["FRUKOST","FROST","KUST","ROST","STOR"],"validWords":["FRUKOST","FROST","KUST","ROST","STOR"]},
    // ===========================================
    // CHAPTER 2
    // ===========================================
    "2-1": {"letters":["L","O","S"],"words":["SOL","LOS"],"validWords":["SOL","LOS"]},
    "2-2": {"letters":["V","A","H"],"words":["HAV","AV"],"validWords":["HAV","AV"]},
    "2-3": {"letters":["D","Ä","R","T"],"words":["TRÄD","TRÄ"],"validWords":["TRÄD","TRÄ"]},
    "2-4": {"letters":["S","T","E","N","A","R"],"words":["STENAR","ENAR","RENAR"],"validWords":["STENAR","ENAR","RENAR"]},
    "2-5": {"letters":["D","A","L","A","R"],"words":["DALAR","DALA","LADA"],"validWords":["DALAR","DALA","LADA"]},
    "2-6": {"letters":["L","D","N","F","E","O"],"words":["FLODEN","FLOD","ODEN"],"validWords":["FLODEN","FLOD","ODEN"]},
    "2-7": {"letters":["N","R","A","Ä","J","T","S"],"words":["STJÄRNA","TJÄRNA","RÄNTA","TÄRNA"],"validWords":["STJÄRNA","TJÄRNA","RÄNTA","TÄRNA"]},
    "2-8": {"letters":["K","A","U","B","S","R"],"words":["BUSKAR","BRUKA","SKURA","RAK"],"validWords":["BUSKAR","BRUKA","SKURA","RAK"]},
    "2-9": {"letters":["G","R","E","B","E","T"],"words":["BERGET","BERG","GET"],"validWords":["BERGET","BERG","GET"]},
    "2-10": {"letters":["N","N","E","A","U","R","T"],"words":["NATUREN","NATUR","RUNT","TUNA","RUTA"],"validWords":["NATUREN","NATUR","RUNT","TUNA","RUTA"]},
    // ===========================================
    // CHAPTER 3
    // ===========================================
    "3-1": {"letters":["R","S","A","E"],"words":["RESA","RES"],"validWords":["RESA","RES"]},
    "3-2": {"letters":["G","A","T","A"],"words":["GATA","TAG"],"validWords":["GATA","TAG"]},
    "3-3": {"letters":["B","R","O"],"words":["BRO","BOR"],"validWords":["BRO","BOR"]},
    "3-4": {"letters":["R","E","S","A","N"],"words":["RESAN","SNAR","SENA"],"validWords":["RESAN","SNAR","SENA"]},
    "3-5": {"letters":["S","T","A","L","P"],"words":["PLATS","LAST","STAL"],"validWords":["PLATS","LAST","STAL"]},
    "3-6": {"letters":["E","Ö","S","R","T"],"words":["ÖSTER","RÖST","REST"],"validWords":["ÖSTER","RÖST","REST"]},
    "3-7": {"letters":["S","R","A","E","G","L"],"words":["SEGLAR","SEGLA","LAGER","SEGRA"],"validWords":["SEGLAR","SEGLA","LAGER","SEGRA"]},
    "3-8": {"letters":["A","B","U","S","S","R"],"words":["BUSSAR","RUSA","BRAS","BARS"],"validWords":["BUSSAR","RUSA","BRAS","BARS"]},
    "3-9": {"letters":["N","F","D","R","Ä","E"],"words":["FÄRDEN","FÄRDE","ÄNDER","NÄRDE"],"validWords":["FÄRDEN","FÄRDE","ÄNDER","NÄRDE"]},
    "3-10": {"letters":["V","E","Ä","R","N","L","D"],"words":["VÄRLDEN","LÄNDER","LÄRDE","VÄRLD"],"validWords":["VÄRLDEN","LÄNDER","LÄRDE","VÄRLD"]},
    // ===========================================
    // CHAPTER 4
    // ===========================================
    "4-1": {"letters":["R","U","M"],"words":["RUM","MUR"],"validWords":["RUM","MUR"]},
    "4-2": {"letters":["H","U","S"],"words":["HUS"],"validWords":["HUS"]},
    "4-3": {"letters":["K","A","T"],"words":["TAK","AKT"],"validWords":["TAK","AKT"]},
    "4-4": {"letters":["L","O","S","T"],"words":["STOL","LOTS","STO"],"validWords":["STOL","LOTS","STO"]},
    "4-5": {"letters":["D","R","O","B"],"words":["BORD","ORD","BOD"],"validWords":["BORD","ORD","BOD"]},
    "4-6": {"letters":["N","S","G","Ä"],"words":["SÄNG","ÄNG"],"validWords":["SÄNG","ÄNG"]},
    "4-7": {"letters":["D","R","Ö","R","A","R"],"words":["DÖRRAR","DÖRR","RÖRA","RÖDA"],"validWords":["DÖRRAR","DÖRR","RÖRA","RÖDA"]},
    "4-8": {"letters":["T","A","A","N","M","T"],"words":["MATTAN","MATTA","MANAT","TANT"],"validWords":["MATTAN","MATTA","MANAT","TANT"]},
    "4-9": {"letters":["N","S","O","F","A","F"],"words":["SOFFAN","SOFFA","FANS"],"validWords":["SOFFAN","SOFFA","FANS"]},
    "4-10": {"letters":["N","D","I","R","A","G"],"words":["GARDIN","DRAG","RING","GRAD","GRAN"],"validWords":["GARDIN","DRAG","RING","GRAD","GRAN"]},
    // ===========================================
    // CHAPTER 5
    // ===========================================
    "5-1": {"letters":["Å","T","R"],"words":["TÅR","RÅT"],"validWords":["TÅR","RÅT"]},
    "5-2": {"letters":["A","L","S","H"],"words":["HALS","SAL"],"validWords":["HALS","SAL"]},
    "5-3": {"letters":["Ö","G","A"],"words":["ÖGA"],"validWords":["ÖGA"]},
    "5-4": {"letters":["U","L","P","S"],"words":["PULS","SLUP","PLUS"],"validWords":["PULS","SLUP","PLUS"]},
    "5-5": {"letters":["F","S","I","R","K"],"words":["FRISK","RISK","SKRI"],"validWords":["FRISK","RISK","SKRI"]},
    "5-6": {"letters":["R","E","L","V","E"],"words":["LEVER","ELEV","REV"],"validWords":["LEVER","ELEV","REV"]},
    "5-7": {"letters":["S","M","Ä","R","A","T"],"words":["SMÄRTA","SMÄRT","SÄRTA","MÄTAR"],"validWords":["SMÄRTA","SMÄRT","SÄRTA","MÄTAR"]},
    "5-8": {"letters":["S","D","A","N","A"],"words":["ANDAS","SAND","DANS","ANDA"],"validWords":["ANDAS","SAND","DANS","ANDA"]},
    "5-9": {"letters":["R","S","T","Y","A","K"],"words":["STYRKA","YRKA","KRYA","TYSK"],"validWords":["STYRKA","YRKA","KRYA","TYSK"]},
    "5-10": {"letters":["S","J","M","O","U","K","D"],"words":["SJUKDOM","SJUK","JOD","MJUK","KOS"],"validWords":["SJUKDOM","SJUK","JOD","MJUK","KOS"]},
    // ===========================================
    // CHAPTER 6
    // ===========================================
    "6-1": {"letters":["L","Ö","N"],"words":["LÖN","ÖN"],"validWords":["LÖN","ÖN"]},
    "6-2": {"letters":["F","E","C","H"],"words":["CHEF","FE"],"validWords":["CHEF","FE"]},
    "6-3": {"letters":["Y","R","K","E"],"words":["YRKE","RYK"],"validWords":["YRKE","RYK"]},
    "6-4": {"letters":["A","V","L","T","A"],"words":["AVTAL","VALT","TAL"],"validWords":["AVTAL","VALT","TAL"]},
    "6-5": {"letters":["K","I","T","L","P"],"words":["PLIKT","PILT","LIKT"],"validWords":["PLIKT","PILT","LIKT"]},
    "6-6": {"letters":["G","B","A","Y","G"],"words":["BYGGA","BYGG","GABY"],"validWords":["BYGGA","BYGG","GABY"]},
    "6-7": {"letters":["R","K","O","O","N","T"],"words":["KONTOR","KORT","ORO","ORT"],"validWords":["KONTOR","KORT","ORO","ORT"]},
    "6-8": {"letters":["K","L","L","A","O"],"words":["LOKAL","KAL","KALL"],"validWords":["LOKAL","KAL","KALL"]},
    "6-9": {"letters":["R","I","K","A","R","E"],"words":["RIKARE","RIKA","KARR","REKA"],"validWords":["RIKARE","RIKA","KARR","REKA"]},
    "6-10": {"letters":["P","S","N","O","E","N","I"],"words":["PENSION","SPION","PION","SNIP","SION"],"validWords":["PENSION","SPION","PION","SNIP","SION"]},
    // ===========================================
    // CHAPTER 7
    // ===========================================
    "7-1": {"letters":["V","O","R","P"],"words":["PROV","ROV"],"validWords":["PROV","ROV"]},
    "7-2": {"letters":["S","R","U","K"],"words":["KURS","SUR"],"validWords":["KURS","SUR"]},
    "7-3": {"letters":["T","S","A","R"],"words":["RAST","RAS"],"validWords":["RAST","RAS"]},
    "7-4": {"letters":["A","L","O","K","S"],"words":["SKOLA","SKAL","KOLA"],"validWords":["SKOLA","SKAL","KOLA"]},
    "7-5": {"letters":["T","L","A","V","A"],"words":["TAVLA","TALA","LAVA"],"validWords":["TAVLA","TALA","LAVA"]},
    "7-6": {"letters":["A","K","R","A","T"],"words":["KARTA","RAKA","ARTA"],"validWords":["KARTA","RAKA","ARTA"]},
    "7-7": {"letters":["N","I","M","R","E","T"],"words":["TERMIN","TIMER","RITEN","INTER"],"validWords":["TERMIN","TIMER","RITEN","INTER"]},
    "7-8": {"letters":["N","R","N","E","P","O"],"words":["PENNOR","ROPEN","REP","REN"],"validWords":["PENNOR","ROPEN","REP","REN"]},
    "7-9": {"letters":["A","V","I","R","K","S"],"words":["SKRIVA","SKIVA","VIRKA","ARKIV"],"validWords":["SKRIVA","SKIVA","VIRKA","ARKIV"]},
    "7-10": {"letters":["T","U","T","N","S","D","E"],"words":["STUDENT","STUND","DUNST","STUT","SUNT"],"validWords":["STUDENT","STUND","DUNST","STUT","SUNT"]},
    // ===========================================
    // CHAPTER 8
    // ===========================================
    "8-1": {"letters":["V","N","A","G"],"words":["VAGN","VAN"],"validWords":["VAGN","VAN"]},
    "8-2": {"letters":["Å","R","A"],"words":["ÅRA","RÅA"],"validWords":["ÅRA","RÅA"]},
    "8-3": {"letters":["R","S","P","Å"],"words":["SPÅR","PÅ","SÅ"],"validWords":["SPÅR","PÅ","SÅ"]},
    "8-4": {"letters":["M","T","O","O","R"],"words":["MOTOR","ROM","ORM"],"validWords":["MOTOR","ROM","ORM"]},
    "8-5": {"letters":["A","V","Ä","R","G"],"words":["VÄGAR","ARG","VÄG"],"validWords":["VÄGAR","ARG","VÄG"]},
    "8-6": {"letters":["A","B","R","I","L"],"words":["BILAR","BILA","LIRA"],"validWords":["BILAR","BILA","LIRA"]},
    "8-7": {"letters":["R","F","A","T","I","K"],"words":["TRAFIK","KRAFT","FRAKT","FIKA"],"validWords":["TRAFIK","KRAFT","FRAKT","FIKA"]},
    "8-8": {"letters":["I","I","T","S","L","B"],"words":["BILIST","LIST","SLIT","BIL"],"validWords":["BILIST","LIST","SLIT","BIL"]},
    "8-9": {"letters":["V","A","A","G","N","R"],"words":["VAGNAR","NAV","GARN","VANA"],"validWords":["VAGNAR","NAV","GARN","VANA"]},
    "8-10": {"letters":["I","T","A","T","O","S","N"],"words":["STATION","STAT","STAN","NOTA","TONA"],"validWords":["STATION","STAT","STAN","NOTA","TONA"]},
    // ===========================================
    // CHAPTER 9
    // ===========================================
    "9-1": {"letters":["A","L","G"],"words":["LAG","GAL"],"validWords":["LAG","GAL"]},
    "9-2": {"letters":["D","M","O"],"words":["DOM","MOD"],"validWords":["DOM","MOD"]},
    "9-3": {"letters":["T","T","Ä","R"],"words":["RÄTT","TÄT"],"validWords":["RÄTT","TÄT"]},
    "9-4": {"letters":["T","T","O","R","B"],"words":["BROTT","BORT","BOTT"],"validWords":["BROTT","BORT","BOTT"]},
    "9-5": {"letters":["P","O","S","I","L"],"words":["POLIS","SILO","SIL"],"validWords":["POLIS","SILO","SIL"]},
    "9-6": {"letters":["A","L","G","A","R"],"words":["LAGAR","LAGA","GALA"],"validWords":["LAGAR","LAGA","GALA"]},
    "9-7": {"letters":["A","M","R","O","D","E"],"words":["DOMARE","DOMAR","DAMER","MODE"],"validWords":["DOMARE","DOMAR","DAMER","MODE"]},
    "9-8": {"letters":["R","L","G","R","E","E"],"words":["REGLER","REGEL","LEGER","GER"],"validWords":["REGLER","REGEL","LEGER","GER"]},
    "9-9": {"letters":["S","F","A","T","F","R"],"words":["STRAFF","STAFF","FART","SAFT"],"validWords":["STRAFF","STAFF","FART","SAFT"]},
    "9-10": {"letters":["V","T","A","E","R"],"words":["ARVET","ARV","VAR","RET"],"validWords":["ARVET","ARV","VAR","RET"]},
    // ===========================================
    // CHAPTER 10
    // ===========================================
    "10-1": {"letters":["T","R","O"],"words":["TRO","ROT"],"validWords":["TRO","ROT"]},
    "10-2": {"letters":["R","D","I","F"],"words":["FRID","FRI"],"validWords":["FRID","FRI"]},
    "10-3": {"letters":["F","R","E","D"],"words":["FRED","RED"],"validWords":["FRED","RED"]},
    "10-4": {"letters":["A","L","L","A","H"],"words":["ALLAH","HALL","ALLA"],"validWords":["ALLAH","HALL","ALLA"]},
    "10-5": {"letters":["A","I","S","L","M"],"words":["ISLAM","SIA","MILA"],"validWords":["ISLAM","SIA","MILA"]},
    "10-6": {"letters":["Z","A","K","A","T"],"words":["ZAKAT","KATA","AKTA"],"validWords":["ZAKAT","KATA","AKTA"]},
    "10-7": {"letters":["M","O","N","S","K","É"],"words":["MOSKÉN","MOSKÉ","SON","SKO"],"validWords":["MOSKÉN","MOSKÉ","SON","SKO"]},
    "10-8": {"letters":["O","K","N","A","R"],"words":["KORNA","KORA","ARK","KAN"],"validWords":["KORNA","KORA","ARK","KAN"]},
    "10-9": {"letters":["G","H","T","E","I","L"],"words":["HELIGT","HELIG","HELT","LITE"],"validWords":["HELIGT","HELIG","HELT","LITE"]},
    "10-10": {"letters":["P","E","R","O","T","F"],"words":["PROFET","POET","PORT","FORT","ROP"],"validWords":["PROFET","POET","PORT","FORT","ROP"]},
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
        "s": "Vi såg första akten av pjäsen.",
        "st": "شاهدنا الفصل الأول من المسرحية."
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
        "w": "ÄLGA",
        "t": "يمشي بخطوات واسعة",
        "s": "Han älgade fram i skogen.",
        "st": "يمشي بسرعة."
    },
    {
        "w": "ALLA",
        "t": "الجميع",
        "s": "Alla människor är födda fria.",
        "st": "يولد جميع الناس أحراراً."
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
        "s": "den helige Ande ond ande",
        "st": "الروح القدس روح شرير"
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
        "s": "Vi tappade en åra i sjön.",
        "st": "أسقطنا مجدافاً في البحيرة."
    },
    {
        "w": "ARG",
        "t": "غاضب",
        "s": "Han var arg.",
        "st": "كان غاضباً."
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
        "s": "Det verkar arta sig väl.",
        "st": "يبدو أن الأمور تتطور بشكل جيد."
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
        "s": "Miljön är ett arv till våra barn.",
        "st": "البيئة إرث لأطفالنا."
    },
    {
        "w": "ARVET",
        "t": "الإرث",
        "s": "Arvet fördelades mellan barnen.",
        "st": "تم توزيع الإرث بين الأبناء."
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
        "s": "Jag köpte en liten ask tändstickor.",
        "st": "اشتريت علبة صغيرة من أعواد الثقاب."
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
        "s": "Vi har skrivit på ett nytt avtal.",
        "st": "لقد وقعنا على اتفاقية جديدة."
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
        "s": "Ett högt berg.",
        "st": "جبل شاهق."
    },
    {
        "w": "BERGET",
        "t": "الجبل",
        "s": "Vi besteg berget.",
        "st": "تسلقنا الجبل."
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
        "s": "En snabb bil.",
        "st": "سيارة سريعة."
    },
    {
        "w": "BILA",
        "t": "فأس",
        "s": "Bödeln höjde sin bila.",
        "st": "رفع الجلاد فأسه."
    },
    {
        "w": "BILAR",
        "t": "سيارات",
        "s": "Det finns många bilar på vägen.",
        "st": "هناك العديد من السيارات على الطريق."
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
        "w": "BOD",
        "t": "كوخ",
        "s": "Vi har en bod på gården.",
        "st": "لدينا كوخ في الفناء."
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
        "s": "Vi bor i en lägenhet i stan.",
        "st": "نحن نسكن في شقة في المدينة."
    },
    {
        "w": "BORD",
        "t": "طاولة",
        "s": "Maten står framdukad på bordet.",
        "st": "الطعام موضوع على الطاولة."
    },
    {
        "w": "BORT",
        "t": "بعيداً",
        "s": "Gå bort och kom aldrig tillbaka.",
        "st": "اذهب بعيداً ولا تعد أبداً."
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
        "w": "BRO",
        "t": "جسر",
        "s": "Vi körde över en lång bro.",
        "st": "قدنا السيارة فوق جسر طويل."
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
        "s": "Brott lönar sig inte.",
        "st": "الجريمة لا تفيد."
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
        "s": "Vi bakar bullar.",
        "st": "نحن نخبز الكعك."
    },
    {
        "w": "BUR",
        "t": "قفص",
        "s": "Fågeln sitter i en bur.",
        "st": "الطائر في قفص."
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
        "t": "نهار",
        "s": "natt och dag",
        "st": "ليلاً نهاراً"
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
        "s": "Domaren avkunnade en hård dom.",
        "st": "أصدر القاضي حكماً قاسياً."
    },
    {
        "w": "DOMAR",
        "t": "أحكام",
        "s": "Guds domar är rättvisa.",
        "st": "أحكام الله عادلة."
    },
    {
        "w": "DOMARE",
        "t": "قاضي",
        "s": "Domaren blåste av matchen.",
        "st": "أطلق الحكم صافرة نهاية المباراة."
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
        "s": "En dunst av parfym kändes.",
        "st": "شوهدت سحابة من العطر."
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
        "t": "أحدهما",
        "s": "varken det ena eller det andra",
        "st": "لاهذا ولا ذاك"
    },
    {
        "w": "ENAR",
        "t": "عرعر",
        "s": "Dessa enar är gröna året om.",
        "st": "أشجار العرعر هذه خضراء طوال العام."
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
        "s": "Det där skrattet låter väldigt falskt.",
        "st": "تلك الضحكة تبدو مصطنعة جداً."
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
        "s": "en färd genom öknen",
        "st": "رحلة عبر الصحراء"
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
        "w": "FART",
        "t": "سرعة",
        "s": "Det var full fart hela dagen.",
        "st": "كانت السرعة قصوى طوال اليوم."
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
        "s": "Som en god fe i sagan.",
        "st": "مثل جنية طيبة في الحكاية."
    },
    {
        "w": "FIKA",
        "t": "استراحة قهوة",
        "s": "Ska vi ta en fika tillsammans?",
        "st": "هل نأخذ استراحة قهوة معاً؟"
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
        "t": "سلام",
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
        "s": "Frukost är dagens viktigaste måltid.",
        "st": "الفطور هو أهم وجبة في اليوم."
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
        "s": "Tuppen gal tidigt på morgonen.",
        "st": "يصيح الديك في الصباح الباكر."
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
        "s": "Kan du dra för gardinen är du snäll?",
        "st": "هل يمكنك إسدال الستارة من فضلك؟"
    },
    {
        "w": "GARN",
        "t": "غزل",
        "s": "Nystan av garn.",
        "st": "كرة من الغزل."
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
        "s": "Se dig för innan du går över gatan.",
        "st": "انتبه قبل عبور الشارع."
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
        "s": "Den som ger, han får.",
        "st": "من يعطي، يأخذ."
    },
    {
        "w": "GET",
        "t": "ماعز",
        "s": "En get bräkte.",
        "st": "ماعز ثغى."
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
        "s": "Han vände sig i sin grav.",
        "st": "تقلب في قبره (من الغضب)."
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
        "s": "Vi möttes i en stor hall.",
        "st": "التقينا في قاعة كبيرة."
    },
    {
        "w": "HALS",
        "t": "حلق",
        "s": "Jag har haft ont i halsen hela dagen.",
        "st": "كان حلقي يؤلمني طوال اليوم."
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
        "s": "Han har seglat på de sju haven.",
        "st": "لقد أبحر في البحار السبعة."
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
        "s": "Islam betyder underkastelse och fred.",
        "st": "الإسلام يعني الاستسلام والسلام."
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
        "w": "KADER",
        "t": "كادر",
        "s": "En liten kader av lojala soldater.",
        "st": "كادر صغير من الجنود المخلصين."
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
        "t": "أصلع",
        "s": "En kal fläck.",
        "st": "بقعة صلعاء."
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
        "s": "Vi behöver en karta för att hitta.",
        "st": "نحتاج إلى خريطة لنجد الطريق."
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
        "s": "Jag arbetar på ett stort kontor.",
        "st": "أعمل في مكتب كبير."
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
        "s": "Kan jag få betala med kort?",
        "st": "هل يمكنني الدفع بالبطاقة؟"
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
        "w": "KOS",
        "t": "رحيل",
        "s": "Han drog sin kos.",
        "st": "لقد رحل."
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
        "s": "Kunskap är makt och kraft.",
        "st": "المعرفة هي سلطة وقوة."
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
        "s": "Lagen är lika för alla.",
        "st": "القانون سواسية للجميع."
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
        "s": "Jag ska laga mat ikväll.",
        "st": "سأطبخ العشاء الليلة."
    },
    {
        "w": "LAGAR",
        "t": "قوانين",
        "s": "Vi måste följa landets lagar.",
        "st": "يجب أن نتبع قوانين البلاد."
    },
    {
        "w": "LAGER",
        "t": "مخزون",
        "s": "Vi har varan på lager just nu.",
        "st": "لدينا السلعة في المخزون حالياً."
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
        "s": "De lärde tvistar om den saken.",
        "st": "العلماء يختلفون حول هذا الأمر."
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
        "s": "Lastbilen hade en mycket tung last.",
        "st": "كانت الشاحنة تحمل حمولة ثقيلة جداً."
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
        "t": "لَيّن",
        "s": "en matta av len ull",
        "st": "سجادة من الصوف الناعم"
    },
    {
        "w": "LEVER",
        "t": "كبد",
        "s": "Levern renar blodet i kroppen.",
        "st": "الكبد ينقي الدم في الجسم."
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
        "s": "När får vi vår lön utbetald?",
        "st": "متى سيتم دفع رواتبنا؟"
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
        "w": "LURA",
        "t": "يخدع",
        "s": "Du kan inte lura mig.",
        "st": "لا يمكنك خداعي."
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
        "s": "Han har manat till lugn och ro.",
        "st": "لقد دعا إلى الهدوء والسكينة."
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
        "s": "De vandrade en hel mila.",
        "st": "ساروا ميلاً كاملاً."
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
        "s": "Hon följer alltid senaste mode.",
        "st": "هي تتبع دائماً أحدث صيحات الموضة."
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
        "s": "Jag vill ha korv med mos.",
        "st": "أريد سجقاً مع الهريس."
    },
    {
        "w": "MOSKÉ",
        "t": "مسجد",
        "s": "Det finns en vacker moské här.",
        "st": "يوجد مسجد جميل هنا."
    },
    {
        "w": "MOSKÉN",
        "t": "المسجد",
        "s": "Vi går till moskén på fredagar.",
        "st": "نذهب إلى المسجد أيام الجمعة."
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
        "s": "Bilen har en stark motor.",
        "st": "السيارة لها محرك قوي."
    },
    {
        "w": "MUR",
        "t": "جدار",
        "s": "De byggde en hög mur runt huset.",
        "st": "بنوا جداراً عالياً حول المنزل."
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
        "s": "Hjulets nav.",
        "st": "محور العجلة."
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
        "s": "Kan vi få in notan, tack?",
        "st": "هل يمكننا الحصول على الفاتورة، من فضلك؟"
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
        "w": "ÖRA",
        "t": "أذن",
        "s": "Jag hör med örat.",
        "st": "أسمع بأذني."
    },
    {
        "w": "ORD",
        "t": "كلمة",
        "s": "Ett ord kan säga mer än tusen bilder.",
        "st": "كلمة واحدة قد تقول أكثر من ألف صورة."
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
        "s": "Jag är rädd för ormar.",
        "st": "أنا أخاف من الثعابين."
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
        "s": "Jag känner en viss oro för framtiden.",
        "st": "أشعر ببعض القلق تجاه المستقبل."
    },
    {
        "w": "ORT",
        "t": "منطقة",
        "s": "En liten ort.",
        "st": "منطقة صغيرة."
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
        "s": "Ligg på soffan.",
        "st": "استلقِ على الأريكة."
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
        "t": "خطة",
        "s": "Vi har en bra plan.",
        "st": "لدينا خطة جيدة."
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
        "w": "POLIS",
        "t": "شرطة",
        "s": "Ring polisen om du ser något.",
        "st": "اتصل بالشرطة إذا رأيت شيئاً."
    },
    {
        "w": "PORT",
        "t": "بوابة",
        "s": "Han stod vid himmelens port.",
        "st": "وقف عند بوابة السماء."
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
        "s": "Läkaren bad mig att känna pulsen.",
        "st": "طلب مني الطبيب تحسس النبض."
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
        "w": "RÅGAD",
        "t": "طافح",
        "s": "en rågad sked",
        "st": "ملعقة طافحة"
    },
    {
        "w": "RAK",
        "t": "مستقيم",
        "s": "En rak linje.",
        "st": "خط مستقيم."
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
        "w": "RATT",
        "t": "مِقْوَد",
        "s": "sitta vid ratten",
        "st": "جلس وراء عجلة القيادة"
    },
    {
        "w": "RÄTT",
        "t": "حق",
        "s": "Gör det som är rätt.",
        "st": "افعل ما هو صواب."
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
        "s": "Han red på en vit häst.",
        "st": "ركب حصاناً أبيض."
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
        "w": "REGLER",
        "t": "قواعد",
        "s": "Det finns regler man måste följa.",
        "st": "هناك قواعد يجب اتباعها."
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
        "s": "Vi måste reka området först.",
        "st": "يجب أن نستطلع المنطقة أولاً."
    },
    {
        "w": "REN",
        "t": "نظيف",
        "s": "Luften är ren och klar här.",
        "st": "الهواء نقي وصافٍ هنا."
    },
    {
        "w": "RENAR",
        "t": "رنة",
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
        "w": "RES",
        "t": "سافر",
        "s": "Res dig upp och kämpa vidare.",
        "st": "انهض وواصل الكفاح."
    },
    {
        "w": "RESA",
        "t": "سفر",
        "s": "Att resa är att leva, sa han.",
        "st": "قال إن السفر هو الحياة."
    },
    {
        "w": "RESAN",
        "t": "الرحلة",
        "s": "Resan var lång och mycket tröttsam.",
        "st": "كانت الرحلة طويلة ومرهقة جداً."
    },
    {
        "w": "REST",
        "t": "سافر",
        "s": "Vi har rest över hela världen.",
        "st": "لقد سافرنا حول العالم بأسره."
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
        "t": "شِعب",
        "s": "Båten gick på ett undervattens rev.",
        "st": "اصطدم القارب بشِعب مرجاني تحت الماء."
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
        "w": "RIS",
        "t": "أرُزّ",
        "s": "Vi äter ris och kyckling.",
        "st": "نأكل الأرز والدجاج."
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
        "s": "Hon fick röda rosor på sin födelsedag.",
        "st": "حصلت على ورود حمراء في عيد ميلادها."
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
        "w": "ROST",
        "t": "صدأ",
        "s": "Rost på bilen.",
        "st": "صدأ على السيارة."
    },
    {
        "w": "RÖST",
        "t": "صوت",
        "s": "Hon har en otroligt vacker röst.",
        "st": "لديها صوت جميل بشكل لا يصدق."
    },
    {
        "w": "ROT",
        "t": "جذر",
        "s": "Kärleken är roten till allt gott.",
        "st": "الحب هو جذر كل خير."
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
        "s": "Lejonet smög på sitt rov.",
        "st": "تسلل الأسد نحو فريسته."
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
        "s": "Rulla köttbullarna.",
        "st": "دحرج كرات اللحم."
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
        "s": "Så ett frö.",
        "st": "ازرع بذرة."
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
        "s": "Barnen dricker saft och äter bullar.",
        "st": "الأطفال يشربون العصير ويأكلون الكعك."
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
        "s": "Patienten ligger på en stor sal.",
        "st": "المريض يرقد في قاعة كبيرة."
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
        "w": "SÅR",
        "t": "جُرح, قُرْحَة, خَدْش",
        "s": "tiden läker alla sår",
        "st": "تلتئم كل الجروح مع الزمن"
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
        "s": "Att segla är en underbar frihetskänsla.",
        "st": "الإبحار يمنح شعوراً رائعاً بالحرية."
    },
    {
        "w": "SEGLAR",
        "t": "يبحر",
        "s": "Han seglar sin båt varje sommar.",
        "st": "يبحر بقاربه كل صيف."
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
        "w": "SI",
        "t": "انظر (قديم)",
        "s": "En ton.",
        "st": "انظر هناك."
    },
    {
        "w": "SIA",
        "t": "يتنبأ",
        "s": "Sia om framtiden.",
        "st": "تنبأ بالمستقبل."
    },
    {
        "w": "SIDA",
        "t": "سيدا",
        "s": "Vänd sida i boken.",
        "st": "اقلب الصفحة في الكتاب."
    },
    {
        "w": "SIL",
        "t": "مصفاة",
        "s": "Häll pastan i en sil.",
        "st": "صب المعكرونة في مصفاة."
    },
    {
        "w": "SILA",
        "t": "يصفي",
        "s": "Sila mygg och svälja kameler.",
        "st": "يصفي البعوض ويبتلع الجمال (مثل)."
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
        "w": "SJUK",
        "t": "مريض",
        "s": "Jag är tyvärr sjuk idag.",
        "st": "للأسف أنا مريض اليوم."
    },
    {
        "w": "SJUKDOM",
        "t": "مرض",
        "s": "Han lider av en sällsynt sjukdom.",
        "st": "هو يعاني من مرض نادر."
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
        "w": "SKO",
        "t": "حذاء",
        "s": "Klämmer skon någonstans?",
        "st": "هل يضغط الحذاء في مكان ما؟ (هل هناك مشكلة؟)"
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
        "s": "Ett slott.",
        "st": "قلعة."
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
        "w": "SMULA",
        "t": "مقدار ضئيل",
        "s": "en smula ( lite ) hänsyn",
        "st": "مقدار ضئيل من الاعتبار"
    },
    {
        "w": "SNAR",
        "t": "قريب",
        "s": "En snar framtid.",
        "st": "مستقبل قريب."
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
        "s": "Solen skiner från en klarblå himmel.",
        "st": "الشمس تشرق من سماء زرقاء صافية."
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
        "s": "Han är sin fars son.",
        "st": "إنه ابن أبيه."
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
        "t": "آثار",
        "s": "Följ spåren.",
        "st": "اتبع الآثار."
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
        "w": "STAFF",
        "t": "طاقم",
        "s": "Hela vår staff är här.",
        "st": "طاقمنا بأكمله هنا."
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
        "s": "Staten ska tjäna folket.",
        "st": "يجب أن تخدم الدولة الشعب."
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
        "w": "STENAR",
        "t": "أحجار",
        "s": "Man ska inte kasta stenar i glashus.",
        "st": "لا ترمِ الناس بالحجارة وبيتك من زجاج."
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
        "t": "فرس",
        "s": "Ett sto med sitt föl.",
        "st": "فرس مع مهرها."
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
        "s": "Han beställde en stor stark öl.",
        "st": "طلب كأساً كبيراً من البيرة القوية."
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
        "s": "Han fick ett strängt straff.",
        "st": "تلقى عقاباً شديداً."
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
        "s": "Han är student vid universitetet.",
        "st": "هو طالب في الجامعة."
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
        "s": "Taket läcker när det regnar mycket.",
        "st": "السقف يسرب الماء عندما تمطر بغزارة."
    },
    {
        "w": "TAL",
        "t": "خطاب",
        "s": "Han höll ett tal.",
        "st": "ألقى خطاباً."
    },
    {
        "w": "TALA",
        "t": "تحدث",
        "s": "Tala är silver, tiga är guld.",
        "st": "الكلام من فضة والسكوت من ذهب."
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
        "s": "En snäll tant gav mig godis.",
        "st": "سيدة لطيفة أعطتني الحلوى."
    },
    {
        "w": "TÅR",
        "t": "دموع",
        "s": "Tårarna rann nerför hennes kinder.",
        "st": "انهمرت الدموع على خديها."
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
        "s": "Hon valdes till årets Lucia tärna.",
        "st": "تم اختيارها لتكون وصيفة لوسيا لهذا العام."
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
        "w": "TERMIN",
        "t": "فصل دراسي",
        "s": "Höstterminen är ganska lång.",
        "st": "فصل الخريف الدراسي طويل نوعاً ما."
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
        "s": "Sätt en timer på tio minuter.",
        "st": "اضبط المؤقت على عشر دقائق."
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
        "s": "Det är svårt att trä nålen.",
        "st": "من الصعب إدخال الخيط في الإبرة."
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
        "w": "TRIST",
        "t": "مُحْزِن",
        "s": "ett trist bostadsområde en trist föreläsning",
        "st": "منطقة سكنية كئيبة مُحاضَرة مُضْجِرة"
    },
    {
        "w": "TRO",
        "t": "إيمان",
        "s": "Tro kan försätta berg.",
        "st": "الإيمان يمكنه نقل الجبال."
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
        "s": "Eskilstuna är en fin gammal stad.",
        "st": "إسكيلستونا مدينة قديمة وجميلة."
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
        "s": "Jag träffade en trevlig tysk turist.",
        "st": "التقيت بسائح ألماني لطيف."
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
        "s": "Alla gillar att prata om vädret.",
        "st": "الجميع يحب الحديث عن الطقس."
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
        "s": "En lång väg.",
        "st": "طريق طويل."
    },
    {
        "w": "VÄGAR",
        "t": "طرق",
        "s": "Herrens vägar äro outgrundliga.",
        "st": "طرق الرب لا يمكن سبر أغوارها."
    },
    {
        "w": "VAGN",
        "t": "عربة",
        "s": "Hästen drog en tung vagn.",
        "st": "سحب الحصان عربة ثقيلة."
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
        "s": "Han är van vid hårt arbete.",
        "st": "هو معتاد على العمل الشاق."
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
        "s": "Var har du varit någonstans?",
        "st": "أين كنت؟"
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
