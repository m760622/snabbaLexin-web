
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

const CANDIDATES = [
    "TURIST", "HOTELL", "BAGAGE", "SOMMAR", "STRAND", "SÖDER", "NORR", "VÄSTER", "ÖSTER",
    "FLYG", "FLYGA", "FLYGER", "FARTYG", "BÅTAR", "SKOGAR", "VÄGAR", "RESOR", "KUSTEN",
    "HAVET", "SOLEN", "BADET", "RUMMET", "SÄNGEN", "MATEN", "VILAN", "GUIDE", "VISUM",
    "PACKA", "UTFLYKT", "RESA", "PASS", "LAND", "BERG", "BOKAS", "SPÅRA", "ASTER",
    "FÄRDEN", "LÄNDER", "MATROS"
];

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
    "ÄLDRE", "LÄRDE", "OSTAR", "ROSTA", "STORA" // Specific conflicts found
];

console.log("Checking candidates...");

CANDIDATES.forEach(mainWord => {
    const entry = WC_DICTIONARY.find(e => e.w === mainWord);
    if (!entry) {
        console.log(`${mainWord}: Not in dictionary`);
        return;
    }
    if (!checkSentenceQuality(entry, mainWord)) {
        console.log(`${mainWord}: Poor sentence quality`);
        return;
    }

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
