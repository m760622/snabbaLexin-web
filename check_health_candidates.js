
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
    // Words from other chapters currently in use (to be replaced, but avoid for now)
    "NACKE", "RYGG", "BLOD", "HÄLSA", "LEVER", "PANNA", "TÄNDER", "HALSEN", "LÅRET", "ANSIKTE", // Ch 5
    "ELEV", "PROV", "LÄRA", "KLASS", "SKRIV", "TENTA", "RASTER", "SKOLAN", "RÄKNAR", "STUDENT", // Ch 6
    "KÖPA", "PRIS", "DYRA", "VAROR", "VÄSKA", "SIDEN", "SKORNA", "KLÄDER", "KOSTAR", "SKJORTA", // Ch 7
    "TÅGA", "BILA", "BUSS", "LASTA", "KANOT", "KÖRAS", "BUSSAR", "TRAFIK", "SEGLAR", "LASTBIL", // Ch 8
    "DOM", "RÄTT", "SPÅR", "BROTT", "LAGAR", "HÄKTE", "DOMARE", "ARREST", "FÅNGAR", "DOMSTOL", // Ch 9
    "TRO", "BÖN", "GUD", "ANDE", "FRID", "SJÄL", "PASTOR", "ÄNGLAR", "KYRKAN", "KRISTUS" // Ch 10
];

const CANDIDATES = [
    "KROPP", "HUVUD", "HÄLSA", "SJUK", "FRISK", "LÄKARE", "SJUKSKÖTERSKA", "MEDICIN", "APOTEK", "SJUKHUS",
    "FEBER", "HOSTA", "SNUVA", "BLOD", "HJÄRTA", "LUNGA", "MAGE", "LEVER", "NJURE", "HJÄRNA",
    "SKELETT", "MUSKEL", "NERV", "ONT", "VÄRK", "SÅR", "SKADA", "BRYTA", "PLÅSTER", "BANDAGE",
    "OPERATION", "RÖNTGEN", "PROV", "TANDLÄKARE", "GLASÖGON", "HÖRAPPARAT", "RULLSTOL", "KRYCKA", "AMBULANS", "RÄDDA",
    "HJÄLPA", "SOVA", "VILA", "TRÄNA", "MOTIONERA", "STRESS", "ORO", "ÅNGEST", "DEPRESSION", "LYCKA",
    "GLÄDJE", "LEDSEN", "ARG", "RÄDD", "TRÖTT", "PIGG", "TJOCK", "SMAL", "LÅNG", "KORT",
    "UNG", "GAMMAL", "MAN", "KVINNA", "POJKE", "FLICKA", "GRAVID", "FÖDA", "DÖ", "LEVA",
    "LIV", "DÖD", "SJÄL", "ANDE", "KÄNSLA", "TANKE", "MINNE", "DRÖM", "SYN", "HÖRSEL",
    "LUKT", "KÄNSEL", "BALANS", "SMÄRTA", "LINDRA", "BOTA", "LÄKA", "VÅRDA", "SKÖTA", "BASTU",
    "MASSAGE", "SPA", "GYM", "SPORT", "NACKE", "RYGG", "PANNA", "TÄNDER", "HALSEN", "LÅRET", "ANSIKTE"
];

console.log("Checking Health candidates...");

CANDIDATES.forEach(mainWord => {
    const entry = WC_DICTIONARY.find(e => e.w === mainWord);
    if (!entry) return;
    if (FORBIDDEN_WORDS.includes(mainWord)) return;
    if (!checkSentenceQuality(entry, mainWord)) return;

    const wheelLetters = mainWord.split('');
    const targets = WC_DICTIONARY.filter(e => {
        if (FORBIDDEN_WORDS.includes(e.w)) return false;
        if (!canFormWord(e.w, wheelLetters)) return false;
        if (!checkSentenceQuality(e, e.w)) return false;
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
