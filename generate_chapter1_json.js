
const fs = require('fs');

const dataFilePath = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/wordConnectData.js';
const fileContent = fs.readFileSync(dataFilePath, 'utf8');

const dictMatch = fileContent.match(/const WC_DICTIONARY = (\[[\s\S]*\])\s*;/);
let WC_DICTIONARY;
eval('WC_DICTIONARY = ' + dictMatch[1]);

const LEVEL_PLAN = [
    { main: "SKÅL", targets: ["SKÅL", "KÅL"] },
    { main: "SAFT", targets: ["SAFT", "FAT"] },
    { main: "KNIV", targets: ["KNIV", "VIN"] },
    { main: "KAKOR", targets: ["KAKOR", "KOKA", "KORA"] },
    { main: "SKALA", targets: ["SKALA", "KALAS", "SALA"] },
    { main: "BAKAR", targets: ["BAKAR", "BAKA", "BARA"] },
    { main: "FISKAR", targets: ["FISKAR", "FISKA", "FRISK", "SIKAR"] },
    { main: "ROSTAR", targets: ["ROSTAR", "OSTAR", "ROSTA", "STORA"] },
    { main: "SKÅLAR", targets: ["SKÅLAR", "KÅLAR", "SKÅLA", "SKÅRA"] }, // Removed SKRAL to fit 4 words limit
    { main: "FRUKOST", targets: ["FRUKOST", "FRUKT", "KOST", "ROST", "KORT"] }
];

const chapterData = [];

LEVEL_PLAN.forEach(level => {
    const levelObj = {
        main: level.main,
        targets: level.targets,
        data: {}
    };

    level.targets.forEach(word => {
        const entry = WC_DICTIONARY.find(e => e.w === word);
        if (entry) {
            levelObj.data[word] = {
                t: entry.t,
                s: entry.s,
                st: entry.st
            };
        } else {
            console.error(`Missing data for ${word}`);
        }
    });

    chapterData.push(levelObj);
});

console.log(JSON.stringify(chapterData, null, 4));
