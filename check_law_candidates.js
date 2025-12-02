
const fs = require('fs');

const dataFilePath = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/wordConnectData.js';
const fileContent = fs.readFileSync(dataFilePath, 'utf8');

const dictMatch = fileContent.match(/const WC_DICTIONARY = (\[[\s\S]*\])\s*;/);
let WC_DICTIONARY;
eval('WC_DICTIONARY = ' + dictMatch[1]);

function canFormWord(word, letters) {
    const wordChars = word.split('');
    const letterCounts = {};
    letters.forEach(l => letterCounts[l] = (letterCounts[l] || 0) + 1);
    for (const char of wordChars) {
        if (!letterCounts[char]) return false;
        letterCounts[char]--;
    }
    return true;
}

const FORBIDDEN_WORDS = [
    // Chapter 3 (Finalized)
    "RESA", "PASS", "BERG", "BOKAS", "SPÅRA", "ASTER", "FÄRDEN", "VÄDRET", "PENGAR", "UTFLYKT",
    // Chapter 1 (Finalized)
    "SKÅL", "SAFT", "KNIV", "KAKOR", "SKALA", "BAKAR", "FISKAR", "ROSTAR", "SKÅLAR", "FRUKOST",
    "KÅL", "FAT", "VIN", "KOKA", "KORA", "KALAS", "SALA", "BAKA", "BARA", "FISKA", "FRISK", "SIKAR",
    "OSTAR", "ROSTA", "STORA", "KÅLAR", "SKÅLA", "SKÅRA", "FRUKT", "KOST", "ROST", "KORT",
    // Chapter 2 (Finalized)
    "TRÄD", "LÖVA", "MYRA", "ANDAS", "REGNA", "ALVAR", "GRENAR", "STENAR", "GRODAN", "STJÄRNA",
    "TRÄ", "LÖV", "MYR", "SAND", "ANDA", "REGN", "GRAN", "LAVA", "VARA", "RENAR", "GRANE", "ANGRE",
    "RENSA", "ARTEN", "GRODA", "DRAGON", "ORGAN", "TJÄRN", "TÄRNA", "SÄRTA", "TJÄRA",
    // Chapter 4 (Finalized)
    "BORD", "STOL", "DÖRR", "SKOLA", "LAMPA", "KARTA", "SKRIVA", "KLÄDER", "BORSTA", "STATION",
    "BOR", "SOL", "DÖR", "KOLA", "SKAL", "LAMA", "PALM", "AKTA", "RATA", "ARKIV", "SKIVA", "VIRKA",
    "LÄDER", "KLÄDE", "LÄRDE", "BORST", "NATT", "SATT", "STAT", "TANT",
    // Chapter 5 (Finalized)
    "TAND", "SMAK", "BLOD", "STARK", "SPORT", "TRÄNA", "GRAVID", "SKÖTER", "HÄLSAN", "PLÅSTER",
    "AND", "ASK", "BOD", "KAST", "KRAS", "STOR", "SORT", "NÄRA", "ÄRTA", "VIDGAR", "DRIVA", "VIDGA",
    "SÖKER", "KÖRET", "RÖKTE", "HÄLSA", "NÄSA", "LÄSA", "LÅTER", "LÅSER", "PEST", "PÅSE",
    // Chapter 6 (Finalized)
    "PROV", "ELEV", "LÄRA", "AVTAL", "MATTE", "RÄKNA", "SJUNGA", "IDROTT", "MATSAL", "SVENSKA",
    "ROP", "LEV", "LÄR", "TAVLA", "TALA", "TEAM", "TEMA", "RÄKA", "SJUNG", "GUNGA", "LUGNA",
    "TROTT", "TORRT", "RIDIT", "SAMLA", "SMALT", "ATLAS", "SVENSK", "VÄSKA", "VAKEN", "SVEK",
    // Chapter 7 (Finalized)
    "KÖPA", "PRIS", "DYRA", "SÄLJA", "VÄSKA", "PLAST", "KLÄDER", "SKORNA", "KOSTAR", "SKJORTA",
    "KÖP", "RIS", "DYR", "SÄLJ", "SJÄL", "VÄSA", "VAKA", "LAST", "SALT", "LÄRDE", "KLÄDE",
    "KORNA", "NORSK", "ORKAN", "ROSTA", "STORA", "KORTA", "SKROT", "KARTA",
    // Chapter 8 (Finalized)
    "GATA", "HAMN", "KÖRA", "KANOT", "KÄRRA", "ÖSTER", "SÖDER", "BÖTER", "REGLER", "LASTBIL",
    "TAG", "HAN", "ÖKAR", "NATO", "TANK", "ÄRRA", "KARR", "REST", "RÖST", "RÖD", "ÖDE", "ÖRE",
    "BER", "BÖR", "TRE", "REGEL", "GER", "LER", "LISTA", "TILLS", "BILA", "LISA",
    // Chapter 9 (Finalized)
    "DOM", "RÄTT", "SPÅR", "BROTT", "LAGAR", "HÄKTE", "DOMARE", "ARREST", "FÅNGAR", "DOMSTOL",
    // Chapter 10 (Finalized)
    "TRO", "BÖN", "GUD", "ANDE", "FRID", "SJÄL", "PASTOR", "ÄNGLAR", "KYRKAN", "KRISTUS"
];

const CANDIDATES = [
    "LAG", "RÄTT", "DOM", "STRAFF", "BROTT", "POLIS", "TJUV", "FÄNGELSE", "ADVOKAT", "DOMARE",
    "ÅKLAGARE", "VITTNE", "BEVIS", "SPÅR", "MÖRDARE", "MORD", "STÖLD", "RÅN", "VÅLD", "HOT",
    "HÄKTE", "ARREST", "CELL", "BOJOR", "PISTOL", "VAPEN", "KNIV", "SKOTT", "BLOD", "OFFER",
    "SKULD", "OSKULD", "FRI", "DÖMD", "FÅNGE", "VAKT", "LARM", "SIREN", "BLÅLJUS", "BÖTER",
    "RÄTTEGÅNG", "FÖRHÖR", "ANMÄLAN", "RAPPORT", "BESLUT", "AVTAL", "KONTRAKT", "REGLER", "STADGAR", "PARAGRAF",
    "JURIST", "BYRÅ", "DOMSTOL", "TINGSRÄTT", "HOVRÄTT", "HÖGSTA", "DOMEN", "LAGEN", "RÄTTEN", "FEL",
    "SANNING", "LÖGN", "LJUGER", "ERKÄNNER", "NEKAR", "DÖDAR", "STJÄL", "LURAR", "FUSKAR", "SLÅSS",
    "BRÅKAR", "SKRIKER", "HOTAR", "RÄDD", "TRYGG", "SÄKER", "FARLIG", "ELAK", "OND", "GOD",
    "RÄTTVISA", "ORÄTTVISA", "MAKT", "STAT", "REGERING", "RIKSDAG", "KOMMUN", "MYNDIGHET", "POLISEN", "TULLEN",
    "KRONOFOGDEN", "SKATTEVERKET", "FÖRSÄKRINGSKASSAN", "MIGRATIONSVERKET", "ARBETSFÖRMEDLINGEN", "SOCIALTJÄNSTEN", "SJUKVÅRDEN", "SKOLAN", "KYRKAN", "FÖRSVARET"
];

console.log("Checking Law candidates...");

CANDIDATES.forEach(mainWord => {
    const entry = WC_DICTIONARY.find(e => e.w === mainWord);
    if (!entry) return;
    if (FORBIDDEN_WORDS.includes(mainWord)) return;

    const wheelLetters = mainWord.split('');
    const targets = WC_DICTIONARY.filter(e => {
        if (FORBIDDEN_WORDS.includes(e.w)) return false;
        if (!canFormWord(e.w, wheelLetters)) return false;
        return true;
    });

    // Group by length
    const byLength = {};
    targets.forEach(t => {
        const len = t.w.length;
        if (!byLength[len]) byLength[len] = [];
        byLength[len].push(t.w);
    });

    console.log(`\n${mainWord} (${mainWord.length}):`);
    Object.keys(byLength).sort().forEach(len => {
        console.log(`  Len ${len}: ${byLength[len].join(', ')}`);
    });
});
