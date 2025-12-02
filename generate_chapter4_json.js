
const fs = require('fs');

const dataFilePath = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/wordConnectData.js';
const fileContent = fs.readFileSync(dataFilePath, 'utf8');

const dictMatch = fileContent.match(/const WC_DICTIONARY = (\[[\s\S]*\])\s*;/);
let WC_DICTIONARY;
eval('WC_DICTIONARY = ' + dictMatch[1]);

const LEVEL_PLAN = [
    { main: "BORD", targets: ["BORD", "BOR"] },
    { main: "STOL", targets: ["STOL", "SOL"] },
    { main: "DÖRR", targets: ["DÖRR", "DÖR"] },
    { main: "SKOLA", targets: ["SKOLA", "KOLA", "SKAL"] },
    { main: "LAMPA", targets: ["LAMPA", "LAMA", "PALM"] },
    { main: "KARTA", targets: ["KARTA", "AKTA", "RATA"] },
    { main: "SKRIVA", targets: ["SKRIVA", "ARKIV", "SKIVA", "VIRKA"] },
    { main: "KLÄDER", targets: ["KLÄDER", "LÄDER", "KLÄDE", "LÄRDE"] },
    { main: "BORSTA", targets: ["BORSTA", "BORST", "ROSTA", "STORA"] },
    { main: "STATION", targets: ["STATION", "NATT", "SATT", "STAT", "TANT"] }
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
            if (word === "BORST") levelObj.data[word] = { t: "شعيرات (فرشاة)", s: "Borsten på penseln är hårda.", st: "شعيرات الفرشاة قاسية." };
            else if (word === "KLÄDE") levelObj.data[word] = { t: "قماش / جوخ", s: "Ett fint kläde.", st: "قماش فاخر." };
            else if (word === "LÄRDE") levelObj.data[word] = { t: "علم (الماضي)", s: "Han lärde mig simma.", st: "علمني السباحة." };
            else if (word === "SKAL") levelObj.data[word] = { t: "قشرة", s: "Äpplet har rött skal.", st: "التفاحة لها قشرة حمراء." };
            else if (word === "RATA") levelObj.data[word] = { t: "يرفض", s: "Han ratade förslaget.", st: "رفض الاقتراح." };
            else if (word === "STAT") levelObj.data[word] = { t: "دولة", s: "Sverige är en stat.", st: "السويد دولة." };
            else if (word === "TANT") levelObj.data[word] = { t: "سيدة / عمة/خالة", s: "En snäll tant gav mig godis.", st: "سيدة لطيفة أعطتني حلوى." };
            else if (word === "DÖR") levelObj.data[word] = { t: "يموت", s: "Blomman dör utan vatten.", st: "الزهرة تموت بدون ماء." };
            else if (word === "BORSTA") levelObj.data[word] = { t: "يفرش / ينظف بالفرشاة", s: "Kom ihåg att borsta tänderna.", st: "تذكر أن تفرش أسنانك." };
            else console.error(`Missing data for ${word}`);
        }
    });

    chapterData.push(levelObj);
});

console.log(JSON.stringify(chapterData, null, 4));
