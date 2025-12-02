
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
    // Words from other chapters currently in use (to be replaced, but avoid for now)
    "TAK", "BORD", "UGN", "LAMPA", "VASER", "BADAR", "GARDIN", "LAKAN", "SKEDAR", "BALKONG", // Ch 4
    "NACKE", "RYGG", "BLOD", "HÄLSA", "LEVER", "PANNA", "TÄNDER", "HALSEN", "LÅRET", "ANSIKTE", // Ch 5
    "ELEV", "PROV", "LÄRA", "KLASS", "SKRIV", "TENTA", "RASTER", "SKOLAN", "RÄKNAR", "STUDENT", // Ch 6
    "KÖPA", "PRIS", "DYRA", "VAROR", "VÄSKA", "SIDEN", "SKORNA", "KLÄDER", "KOSTAR", "SKJORTA", // Ch 7
    "TÅGA", "BILA", "BUSS", "LASTA", "KANOT", "KÖRAS", "BUSSAR", "TRAFIK", "SEGLAR", "LASTBIL", // Ch 8
    "DOM", "RÄTT", "SPÅR", "BROTT", "LAGAR", "HÄKTE", "DOMARE", "ARREST", "FÅNGAR", "DOMSTOL", // Ch 9
    "TRO", "BÖN", "GUD", "ANDE", "FRID", "SJÄL", "PASTOR", "ÄNGLAR", "KYRKAN", "KRISTUS" // Ch 10
];

const CANDIDATES = [
    "TRÄD", "LÖVA", "MYRA", "REGN", "SNÖ", "SOL", "MÅNE", "STEN", "GRÄS", "BLOMMA",
    "VINTER", "SOMMAR", "HÖSTEN", "VÅREN", "FLODER", "STIGAR", "SKOGAR", "VATTEN",
    "HIMMEL", "MOLNEN", "VINDAR", "STORM", "STRAND", "GROTTA", "VULKAN", "DJUNGEL",
    "SAVANN", "PLANET", "KLIMAT", "HAVET", "SOLEN", "MÅNEN", "JORDEN", "BERGET",
    "DALAR", "SJÖAR", "ÖARNA", "KUSTEN", "SANDEN", "VÅGOR", "FÅGLAR", "DJUREN",
    "VÄXTER", "SKOGEN", "MARKEN", "LUFTEN", "ELDEN", "ISEN", "DIMMA", "REGNA",
    "BLÅSA", "LYSA", "VÄXA", "LEVA", "DÖ", "FÖDAS", "ANDAS", "SIMMA", "FLYGA",
    "SPRINGA", "HOPPA", "KRYPA", "GÅ", "STÅ", "LIGGA", "SITTA", "HÖRA", "SE",
    "LUKTA", "KÄNNA", "SMAKA", "LJUD", "TYSTNAD", "DOFT", "STANK", "SMAK", "LJUS",
    "SKUGGA", "SOLSKEN", "MÅNSKEN", "STJÄRNHIMMEL", "NORRSKEN", "REGNBÅGE", "SOLNEDGÅNG",
    "SOLUPPGÅNG", "HORISONT", "UTSIKT", "LANDSKAP", "MYROR", "GRENAR", "SVALLA",
    "BÖLJA", "STJÄRNA", "TJÄRN", "TÄRNA", "SÄRTA", "TJÄRA", "JÄRN"
];

console.log("Checking Nature candidates...");

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
