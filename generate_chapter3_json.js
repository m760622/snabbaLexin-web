
const fs = require('fs');

const dataFilePath = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/wordConnectData.js';
const fileContent = fs.readFileSync(dataFilePath, 'utf8');

const dictMatch = fileContent.match(/const WC_DICTIONARY = (\[[\s\S]*\])\s*;/);
let WC_DICTIONARY;
eval('WC_DICTIONARY = ' + dictMatch[1]);

const LEVEL_PLAN = [
    { main: "RESA", targets: ["RESA", "RES"] },
    { main: "PASS", targets: ["PASS", "ASP"] },
    { main: "BERG", targets: ["BERG", "BER"] },
    { main: "BOKAS", targets: ["BOKAS", "BOKA", "KOSA"] },
    { main: "SPÅRA", targets: ["SPÅRA", "PÅSAR", "RAPS"] },
    { main: "ASTER", targets: ["ASTER", "RESA", "RAST"] },
    { main: "FÄRDEN", targets: ["FÄRDEN", "FÄRDE", "NÄRDE", "RÄNDE"] },
    { main: "VÄDRET", targets: ["VÄDRET", "VÄRDET", "VÄRDE", "TRÄDE"] },
    { main: "PENGAR", targets: ["PENGAR", "ANGRE", "GRANE", "REPAN"] },
    { main: "UTFLYKT", targets: ["UTFLYKT", "FLYKT", "FLYTT", "LYFT", "TUFT"] }
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
