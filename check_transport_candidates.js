
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
    // Words from other chapters currently in use (to be replaced, but avoid for now)
    "TÅGA", "BILA", "BUSS", "LASTA", "KANOT", "KÖRAS", "BUSSAR", "TRAFIK", "SEGLAR", "LASTBIL", // Ch 8
    "DOM", "RÄTT", "SPÅR", "BROTT", "LAGAR", "HÄKTE", "DOMARE", "ARREST", "FÅNGAR", "DOMSTOL", // Ch 9
    "TRO", "BÖN", "GUD", "ANDE", "FRID", "SJÄL", "PASTOR", "ÄNGLAR", "KYRKAN", "KRISTUS" // Ch 10
];

const CANDIDATES = [
    "CYKEL", "MOTOR", "BROMS", "TUNNEL", "BENSIN", "DIESEL", "REGLER", "SKYLT", "FÄRJA", "KAJAK",
    "VÄGAR", "GATOR", "RESAN", "ÅKERI", "FÖRARE", "PILOT", "BAGAGE", "FORDON", "TRAFIK", "VÄGEN",
    "BÅTEN", "BILEN", "TÅGET", "BUSSEN", "HJULET", "RATTEN", "VÄXEL", "GASEN", "SÄTET", "LÅSET",
    "DÖRREN", "TAKET", "RESOR", "ÅKER", "KÖRDE", "CYKLA", "GÅR", "SPRANG", "FLÖG", "SEGLA",
    "RODDE", "STANN", "PARK", "TANKA", "LADDA", "STIG", "SPÅR", "RÄLS", "HAMN", "BRO",
    "KORS", "ROND", "LJUS", "REGE", "KORT", "PASS", "TULL", "GRÄNS", "NORR", "SÖDER",
    "ÖSTER", "VÄST", "HÖGER", "VÄNST", "RAKT", "FRAM", "BAK", "UPP", "NER", "SNABB",
    "LÅNG", "SÄKER", "FARA", "OLYCK", "KROCK", "OLJA", "VATT", "LUFT", "MILJÖ", "AVGAS",
    "BÖTER", "MACK", "RAST", "HOTEL", "VANDR", "CAMP", "TÄLT", "VAGN"
];

console.log("Checking Transport candidates...");

CANDIDATES.forEach(mainWord => {
    const entry = WC_DICTIONARY.find(e => e.w === mainWord);
    if (!entry) return;
    if (FORBIDDEN_WORDS.includes(mainWord)) return;
    // if (!checkSentenceQuality(entry, mainWord)) return; // Relax quality check for candidates to see potential

    const wheelLetters = mainWord.split('');
    const targets = WC_DICTIONARY.filter(e => {
        if (FORBIDDEN_WORDS.includes(e.w)) return false;
        if (!canFormWord(e.w, wheelLetters)) return false;
        // if (!checkSentenceQuality(e, e.w)) return false; // Relax quality check for targets too
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
