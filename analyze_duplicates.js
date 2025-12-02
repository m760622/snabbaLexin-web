
const ADVANCED_THEMES = {
    1: [ // Food
        { main: "KOKA", targets: ["KOKA", "KOK"] },
        { main: "FIKA", targets: ["FIKA", "FIK"] },
        { main: "GRÖT", targets: ["GRÖT", "ÖRT"] },
        { main: "SMÖRA", targets: ["SMÖRA", "SMÖR", "MÖRA"] },
        { main: "RENSA", targets: ["RENSA", "RENS", "SENA"] },
        { main: "LISTA", targets: ["LISTA", "SILA", "SALT"] },
        { main: "SKÅLAR", targets: ["SKÅLAR", "SKÅLA", "KÅLAR", "SKÅRA"] },
        { main: "FISKAR", targets: ["FISKAR", "FISKA", "FRISK", "SIKAR"] },
        { main: "ROSTAR", targets: ["ROSTAR", "ROSTA", "OSTAR", "STORA"] },
        { main: "FRUKOST", targets: ["FRUKOST", "FROST", "KOST", "ROST", "STOR"] },
    ],
    2: [ // Nature
        { main: "SOLA", targets: ["SOLA", "SOL"] },
        { main: "TRÄD", targets: ["TRÄD", "TRÄ"] },
        { main: "LÖVA", targets: ["LÖVA", "LÖV"] },
        { main: "BÖLJA", targets: ["BÖLJA", "OLJA", "BÖLA"] },
        { main: "MYROR", targets: ["MYROR", "MYRA", "MORR"] },
        { main: "REGNA", targets: ["REGNA", "REGN", "GRAN"] },
        { main: "FISKAR", targets: ["FISKAR", "FISKA", "FRISK", "SIKAR"] },
        { main: "GRENAR", targets: ["GRENAR", "GRENA", "RENAR", "GRANE"] },
        { main: "SVALLA", targets: ["SVALLA", "SVALL", "VALLA", "SVALA"] },
        { main: "STJÄRNA", targets: ["STJÄRNA", "TJÄRN", "TÄRNA", "TJÄRA", "JÄRN"] },
    ],
    3: [ // Travel
        { main: "TÅGA", targets: ["TÅGA", "TÅG"] },
        { main: "BILA", targets: ["BILA", "BIL"] },
        { main: "RESA", targets: ["RESA", "RES"] },
        { main: "KÖRA", targets: ["KÖRA", "KÖR", "ÖKA"] },
        { main: "SPÅRA", targets: ["SPÅRA", "SPÅR", "PÅSAR"] },
        { main: "BOKAS", targets: ["BOKAS", "BOKA", "KOSA"] },
        { main: "SPÅREN", targets: ["SPÅREN", "RESAN", "PÅSEN", "RENAR"] },
        { main: "SEGLAR", targets: ["SEGLAR", "SEGLA", "LAGER", "SEGRA"] },
        { main: "LASTAR", targets: ["LASTAR", "LASTA", "SALAR", "ATLAS"] },
        { main: "UTFLYKT", targets: ["UTFLYKT", "FLYKT", "FLYTT", "LYFT", "TUFT"] },
    ],
    4: [ // Daily
        { main: "TAK", targets: ["TAK", "AKT"] },
        { main: "BORD", targets: ["BORD", "BOR"] },
        { main: "UGN", targets: ["UGN", "UNG"] },
        { main: "LAMPA", targets: ["LAMPA", "PALM", "LAMA"] },
        { main: "VASER", targets: ["VASER", "RESA", "SVAR"] },
        { main: "BADAR", targets: ["BADAR", "BADA", "RADA"] },
        { main: "GARDIN", targets: ["GARDIN", "GRIND", "RINGA", "DINGA"] },
        { main: "LAKAN", targets: ["LAKAN", "KANAL", "NALKA", "ALKAN"] },
        { main: "SKEDAR", targets: ["SKEDAR", "SKADE", "RAKAS", "KADES"] },
        { main: "BALKONG", targets: ["BALKONG", "NOBLA", "KLANG", "BALK", "GALA"] },
    ],
    5: [ // Health
        { main: "HALS", targets: ["HALS", "SAL"] },
        { main: "RYGG", targets: ["RYGG", "GRY"] },
        { main: "BLOD", targets: ["BLOD", "LOD"] },
        { main: "HÄLSA", targets: ["HÄLSA", "HALS", "LÄSA"] },
        { main: "LEVER", targets: ["LEVER", "ELEV", "LEVE"] },
        { main: "PANNA", targets: ["PANNA", "ANNA", "PANN"] },
        { main: "TÄNDER", targets: ["TÄNDER", "RÄNDE", "ÄNDER", "TÄNDE"] },
        { main: "HALSEN", targets: ["HALSEN", "SALEN", "SELAN", "HALSE"] },
        { main: "LÅRET", targets: ["LÅRET", "LÅTER", "TÅLER", "TRÅLE"] },
        { main: "ANSIKTE", targets: ["ANSIKTE", "INSEKT", "KISTA", "SIKTA", "SANKT"] },
    ],
    6: [ // School/Work
        { main: "ELEV", targets: ["ELEV", "LEV"] },
        { main: "PROV", targets: ["PROV", "ROP"] },
        { main: "LÄRA", targets: ["LÄRA", "LÄR"] },
        { main: "SKOLA", targets: ["SKOLA", "SKAL", "SOLA"] },
        { main: "SKRIV", targets: ["SKRIV", "RISK", "VIKS"] },
        { main: "TENTA", targets: ["TENTA", "TANT", "NATT"] },
        { main: "RASTER", targets: ["RASTER", "ARTER", "RETAS", "START"] },
        { main: "SKOLAN", targets: ["SKOLAN", "SKOLA", "LAKAN", "KANAL"] },
        { main: "RÄKNAR", targets: ["RÄKNAR", "RÄKNA", "KÄRRA", "ANKAR"] },
        { main: "STUDENT", targets: ["STUDENT", "STUND", "SUND", "TUNT", "TEST"] },
    ],
    7: [ // Shopping/Clothes
        { main: "KÖPA", targets: ["KÖPA", "KÖP"] },
        { main: "PRIS", targets: ["PRIS", "RIS"] },
        { main: "DYRA", targets: ["DYRA", "DYR"] },
        { main: "VAROR", targets: ["VAROR", "VARO", "RORA"] },
        { main: "VÄSKA", targets: ["VÄSKA", "VAKA", "VÄSA"] },
        { main: "LÄDER", targets: ["LÄDER", "LÄRD", "EDER"] },
        { main: "SKORNA", targets: ["SKORNA", "KORNA", "ORKAN", "NORSK"] },
        { main: "KLÄDER", targets: ["KLÄDER", "LÄDER", "KLÄDE", "ÄLDRE"] },
        { main: "KOSTAR", targets: ["KOSTAR", "KARTA", "ORSAK", "SKROT"] },
        { main: "SKJORTA", targets: ["SKJORTA", "KARTA", "SKROT", "SKOR", "KORT"] },
    ],
    8: [ // Transport
        { main: "TÅGA", targets: ["TÅGA", "TÅG"] },
        { main: "BILA", targets: ["BILA", "BIL"] },
        { main: "BUSS", targets: ["BUSS", "BUS"] },
        { main: "LASTA", targets: ["LASTA", "LAST", "SALA"] },
        { main: "KANOT", targets: ["KANOT", "TANK", "KANT"] },
        { main: "KÖRAS", targets: ["KÖRAS", "KÖRA", "ÖKAR"] },
        { main: "BUSSAR", targets: ["BUSSAR", "BRUSA", "SURRA", "BASAR"] },
        { main: "TRAFIK", targets: ["TRAFIK", "FRAKT", "KRAFT", "FIKAR"] },
        { main: "SEGLAR", targets: ["SEGLAR", "LAGER", "REGLA", "SEGRA"] },
        { main: "LASTBIL", targets: ["LASTBIL", "LAST", "BILA", "STALL", "LISTA"] },
    ],
    9: [ // Law
        { main: "DOM", targets: ["DOM", "MOD"] },
        { main: "RÄTT", targets: ["RÄTT", "TÄT"] },
        { main: "SPÅR", targets: ["SPÅR", "SÅR"] },
        { main: "BROTT", targets: ["BROTT", "BORT", "ROTT"] },
        { main: "LAGAR", targets: ["LAGAR", "GALA", "AGAR"] },
        { main: "HÄKTE", targets: ["HÄKTE", "ÄKTA", "HETA"] },
        { main: "DOMARE", targets: ["DOMARE", "MODER", "ORMAR", "RAMAR"] },
        { main: "ARREST", targets: ["ARREST", "RESTAR", "RASET", "ASTER"] },
        { main: "FÅNGAR", targets: ["FÅNGAR", "FÅNGA", "ÅNGAR", "NÅGRA"] },
        { main: "DOMSTOL", targets: ["DOMSTOL", "STOL", "SOLO", "STOD", "LOTS"] },
    ],
    10: [ // Religion
        { main: "TRO", targets: ["TRO", "ROT"] },
        { main: "BÖN", targets: ["BÖN", "ÖN"] },
        { main: "GUD", targets: ["GUD", "DUG"] },
        { main: "ANDE", targets: ["ANDE", "DAN", "NED"] },
        { main: "FRID", targets: ["FRID", "FRI", "RID"] },
        { main: "SJÄL", targets: ["SJÄL", "SÄL", "LÄS"] },
        { main: "PASTOR", targets: ["PASTOR", "SPORT", "ROPAR", "SOPAR"] },
        { main: "ÄNGLAR", targets: ["ÄNGLAR", "LÄNGA", "GRÄLA", "LÄGER"] },
        { main: "KYRKAN", targets: ["KYRKAN", "RYNKA", "RANKA", "YRKAR"] },
        { main: "KRISTUS", targets: ["KRISTUS", "TRISS", "KUST", "RISK", "SIST"] },
    ],
};

const wordCounts = {};
const wordLocations = {};

Object.keys(ADVANCED_THEMES).forEach(chapter => {
    const levels = ADVANCED_THEMES[chapter];
    levels.forEach(level => {
        level.targets.forEach(word => {
            if (!wordCounts[word]) {
                wordCounts[word] = 0;
                wordLocations[word] = [];
            }
            wordCounts[word]++;
            wordLocations[word].push(`Chapter ${chapter}`);
        });
    });
});

console.log("Duplicate Words:");
Object.keys(wordCounts).forEach(word => {
    if (wordCounts[word] > 1) {
        console.log(`${word}: ${wordLocations[word].join(", ")}`);
    }
});
