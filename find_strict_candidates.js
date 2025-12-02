
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

function checkSentenceQuality(entry, word) {
    if (!entry || !entry.s || !entry.t) return false;
    if (entry.s.split(' ').length < 4) return false;
    const cleanSentence = entry.s.toLowerCase().replace(/[.,!?]/g, '');
    return cleanSentence.split(' ').includes(word.toLowerCase());
}

const FORBIDDEN_WORDS = [
    "KARTA", "ARREST", "FISKAR", "TÅGA", "BILA", "LASTAR", "SEGLAR", "KÖRA",
    "LISTA", "SOLA", "RENAR", "LAKAN", "KANAL", "GALA", "HALS", "ELEV", "SKOLA", "RISK", "LÄDER", "SKROT", "LAST",
    "KOKA", "FIKA", "GRÖT", "SMÖRA", "RENSA", "SKÅLAR", "ROSTAR", "FRUKOST",
    "TRÄD", "LÖVA", "BÖLJA", "MYROR", "REGNA", "GRENAR", "SVALLA", "STJÄRNA",
    "TAK", "BORD", "UGN", "LAMPA", "VASER", "BADAR", "GARDIN", "SKEDAR", "BALKONG",
    "RYGG", "BLOD", "HÄLSA", "LEVER", "PANNA", "TÄNDER", "HALSEN", "LÅRET", "ANSIKTE",
    "PROV", "LÄRA", "SKRIV", "TENTA", "RASTER", "SKOLAN", "RÄKNAR", "STUDENT",
    "KÖPA", "PRIS", "DYRA", "VAROR", "VÄSKA", "SKORNA", "KLÄDER", "KOSTAR", "SKJORTA",
    "BUSS", "KANOT", "KÖRAS", "BUSSAR", "TRAFIK", "LASTBIL",
    "DOM", "RÄTT", "SPÅR", "BROTT", "LAGAR", "HÄKTE", "DOMARE", "FÅNGAR", "DOMSTOL",
    "TRO", "BÖN", "GUD", "ANDE", "FRID", "SJÄL", "PASTOR", "ÄNGLAR", "KYRKAN", "KRISTUS",
    "ÄLDRE", "LÄRDE", "OSTAR", "ROSTA", "STORA"
];

console.log("Searching for Level 8/9 candidates (4 words, 5-6 letters)...");

const candidates = [];

for (const entry of WC_DICTIONARY) {
    const mainWord = entry.w;
    if (mainWord.length !== 6) continue;
    if (FORBIDDEN_WORDS.includes(mainWord)) continue;
    if (!checkSentenceQuality(entry, mainWord)) continue;

    const wheelLetters = mainWord.split('');
    const targets = WC_DICTIONARY.filter(e => {
        if (e.w.length < 5 || e.w.length > 6) return false;
        if (FORBIDDEN_WORDS.includes(e.w)) return false;
        if (!canFormWord(e.w, wheelLetters)) return false;
        if (!checkSentenceQuality(e, e.w)) return false;
        return true;
    });

    if (targets.length >= 4) {
        candidates.push({
            main: mainWord,
            targets: targets.map(t => t.w)
        });
    }
}

// Sort by relevance to Travel if possible, otherwise just list them
const TRAVEL_KEYWORDS = ["RESA", "TURIST", "GUIDE", "ÅKA", "BÅT", "FLYG", "TÅG", "BIL", "VÄG", "LAND", "STAD", "HAV", "SJÖ", "BERG", "SKOG", "NATUR", "VÄRLD", "KARTA", "PLAN", "PASS", "VISUM", "HOTELL", "RUM", "SÄNG", "MAT", "VILA", "SOL", "BAD", "STRAND", "SOMMAR", "VINTER", "VÅR", "HÖST", "VECKA", "DAG", "NATT", "TID", "KLOCKA", "MINUT", "TIMME", "PENGAR", "BANK", "KORT", "BILJETT", "PLATS", "SITS", "STOL", "BORD", "FÖNSTER", "DÖRR", "HUS", "HEM", "GATA", "TORG", "PARK", "BRO", "HAMN", "STATION", "FLYGLATS", "TERMINAL", "GATE", "BAGAGE", "VÄSKA", "RYGGSÄCK", "KOFFERT", "LAST", "PAKET", "BREV", "VYKORT", "TELEFON", "MOBIL", "KAMERA", "BILD", "FOTO", "FILM", "BOK", "TIDNING", "KARTA", "GUIDE", "SPRÅK", "ORD", "NAMN", "ADRESS", "NUMMER", "FOLK", "MÄNNISKA", "MAN", "KVINNA", "BARN", "VÄN", "FAMILJ", "GRUPP", "LEDARE", "CHAUFFÖR", "PILOT", "KAPTEN", "VÄRD", "GÄST", "KUND", "PERSONAL", "SERVICE", "HJÄLP", "INFO", "FRÅGA", "SVAR", "PRIS", "NOTA", "KVITTO", "PENGAR", "VALUTA", "VÄXLING", "KÖP", "SÄLJ", "MARKNAD", "AFFÄR", "BUTIK", "RESTAURANG", "CAFÉ", "BAR", "PUB", "KLUBB", "DISCO", "BIO", "TEATER", "MUSEUM", "KYRKA", "SLOTT", "RUIN", "MONUMENT", "STATY", "KONST", "HISTORIA", "KULTUR", "NATUR", "DJUR", "VÄXT", "BLOMMA", "TRÄD", "VATTEN", "LUFT", "ELD", "JORD", "STEN", "SAND", "GRÄS", "SNÖ", "IS", "REGN", "SOL", "VIND", "MOLN", "HIMMEL", "STJÄRNA", "MÅNE", "SOL", "DAG", "NATT", "MORGON", "KVÄLL", "MIDDAG", "LUNCH", "FRUKOST", "MAT", "DRYCK", "VATTEN", "ÖL", "VIN", "KAFFE", "TE", "MJÖLK", "JUICE", "LÄSK", "GLASS", "GODIS", "FRUKT", "GRÖNSAK", "KÖTT", "FISK", "FÅGEL", "BRÖD", "OST", "SMÖR", "ÄGG", "SALLAD", "SOPPA", "SÅS", "KRYDDA", "SALT", "PEPPAR", "SOCKER", "SÖT", "SUR", "SALT", "BESK", "VARM", "KALL", "LJUNMEN", "GOD", "ÄCKLIG", "BRA", "DÅLIG", "FIN", "FUL", "STOR", "LITEN", "LÅNG", "KORT", "HÖG", "LÅG", "TJOCK", "SMAL", "BRED", "TRÅNG", "NY", "GAMMAL", "UNG", "RIKTIG", "FEL", "SANT", "FALSKT", "LÄTT", "SVÅRT", "TUNGT", "HÅRT", "MJUKT", "VÅTT", "TORRT", "RENT", "SMUTSIGT", "HELT", "TRASIGT", "ÖPPET", "STÄNGT", "LEDIGT", "UPPTAGET", "GRATIS", "BILLIGT", "DYRT", "SNABBT", "LÅNGSAMT", "TIDIGT", "SENT", "NU", "SENARE", "FÖRR", "ALDRIG", "ALLTID", "OFTA", "SÄLLAN", "IBLAND", "KANSKE", "JA", "NEJ", "TACK", "VARSEGOD", "URSÄKTA", "FÖRLÅT", "HEJ", "ADJÖ", "GODDAG", "GODNATT", "SOV", "GOTT", "DRÖM", "SÖTT", "LYCKA", "TILL", "TREVLIG", "RESA"];

candidates.sort((a, b) => {
    const aScore = TRAVEL_KEYWORDS.includes(a.main) ? 1 : 0;
    const bScore = TRAVEL_KEYWORDS.includes(b.main) ? 1 : 0;
    return bScore - aScore;
});

console.log(JSON.stringify(candidates.slice(0, 20), null, 2));
