
const fs = require('fs');

const dataFilePath = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/wordConnectData.js';
const fileContent = fs.readFileSync(dataFilePath, 'utf8');

const dictMatch = fileContent.match(/const WC_DICTIONARY = (\[[\s\S]*\])\s*;/);
let WC_DICTIONARY;
eval('WC_DICTIONARY = ' + dictMatch[1]);

const LEVEL_PLAN = [
    { main: "TRÄD", targets: ["TRÄD", "TRÄ"] },
    { main: "LÖVA", targets: ["LÖVA", "LÖV"] },
    { main: "MYRA", targets: ["MYRA", "MYR"] },
    { main: "ANDAS", targets: ["ANDAS", "SAND", "ANDA"] },
    { main: "REGNA", targets: ["REGNA", "REGN", "GRAN"] },
    { main: "ALVAR", targets: ["ALVAR", "LAVA", "VARA"] },
    { main: "GRENAR", targets: ["GRENAR", "RENAR", "GRANE", "ANGRE"] }, // Removed REGNA to fit 4 words limit
    { main: "STENAR", targets: ["STENAR", "RENAR", "RENSA", "ARTEN"] }, // Removed RASEN to fit 4 words limit
    { main: "GRODAN", targets: ["GRODAN", "GRODA", "DRAGON", "ORGAN"] },
    { main: "STJÄRNA", targets: ["STJÄRNA", "TJÄRN", "TÄRNA", "SÄRTA", "TJÄRA"] }
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
            // Manual data for missing words
            if (word === "MYR") levelObj.data[word] = { t: "مستنقع", s: "Vi gick över en myr.", st: "مشينا عبر مستنقع." };
            else if (word === "ALVAR") levelObj.data[word] = { t: "سهل ألڤار (سهل كلسي)", s: "Ölands alvar är unikt.", st: "سهل ألڤار في أولاند فريد من نوعه." };
            else if (word === "ARTEN") levelObj.data[word] = { t: "النوع (بيولوجي)", s: "Arten är fridlyst.", st: "النوع محمي." };
            else if (word === "GRODAN") levelObj.data[word] = { t: "الضفدع", s: "Grodan hoppade i vattnet.", st: "قفز الضفدع في الماء." };
            else if (word === "GRODA") levelObj.data[word] = { t: "ضفدع", s: "En grön groda.", st: "ضفدع أخضر." };
            else if (word === "DRAGON") levelObj.data[word] = { t: "طرخون (عشب)", s: "Dragon passar bra till kyckling.", st: "الطرخون يناسب الدجاج جيداً." };
            else if (word === "ORGAN") levelObj.data[word] = { t: "عضو (جسم/موسيقى)", s: "Hjärtat är ett viktigt organ.", st: "القلب عضو مهم." };
            else console.error(`Missing data for ${word}`);
        }
    });

    chapterData.push(levelObj);
});

console.log(JSON.stringify(chapterData, null, 4));
