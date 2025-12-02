
const fs = require('fs');

const dataFilePath = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/wordConnectData.js';
const fileContent = fs.readFileSync(dataFilePath, 'utf8');

const dictMatch = fileContent.match(/const WC_DICTIONARY = (\[[\s\S]*\])\s*;/);
let WC_DICTIONARY;
eval('WC_DICTIONARY = ' + dictMatch[1]);

const LEVEL_PLAN = [
    { main: "TAND", targets: ["TAND", "AND"] },
    { main: "SMAK", targets: ["SMAK", "ASK"] },
    { main: "BLOD", targets: ["BLOD", "BOD"] },
    { main: "STARK", targets: ["STARK", "KAST", "KRAS"] },
    { main: "SPORT", targets: ["SPORT", "STOR", "SORT"] },
    { main: "TRÄNA", targets: ["TRÄNA", "NÄRA", "ÄRTA"] },
    { main: "GRAVID", targets: ["GRAVID", "VIDGAR", "DRIVA", "VIDGA"] },
    { main: "SKÖTER", targets: ["SKÖTER", "SÖKER", "KÖRET", "RÖKTE"] },
    { main: "HÄLSAN", targets: ["HÄLSAN", "HÄLSA", "NÄSA", "LÄSA"] },
    { main: "PLÅSTER", targets: ["PLÅSTER", "LÅTER", "LÅSER", "PEST", "PÅSE"] }
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
            if (word === "KRAS") levelObj.data[word] = { t: "تحطم", s: "Vasen gick i kras.", st: "تحطمت المزهرية." };
            else if (word === "VIDGAR") levelObj.data[word] = { t: "يوسع", s: "Han vidgar sina vyer.", st: "يوسع آفاقه." };
            else if (word === "VIDGA") levelObj.data[word] = { t: "يوسع", s: "Vi måste vidga vägen.", st: "يجب أن نوسع الطريق." };
            else if (word === "KÖRET") levelObj.data[word] = { t: "القيادة / العمل الشاق", s: "Det var fullt upp med köret.", st: "كان هناك الكثير من العمل الشاق." };
            else if (word === "RÖKTE") levelObj.data[word] = { t: "دخن (الماضي)", s: "Han rökte en cigarr.", st: "دخن سيجاراً." };
            else if (word === "HÄLSAN") levelObj.data[word] = { t: "الصحة", s: "Hälsan är det viktigaste vi har.", st: "الصحة هي أهم ما نملك." };
            else if (word === "PEST") levelObj.data[word] = { t: "طاعون", s: "Pesten var en hemsk sjukdom.", st: "الطاعون كان مرضاً فظيعاً." };
            else if (word === "PÅSE") levelObj.data[word] = { t: "كيس", s: "Jag bär maten i en påse.", st: "أحمل الطعام في كيس." };
            else if (word === "ASK") levelObj.data[word] = { t: "علبة صغيرة / شجرة الدردار", s: "En ask tändstickor.", st: "علبة كبريت." };
            else if (word === "BOD") levelObj.data[word] = { t: "كوخ / مخزن", s: "Vi har en bod på gården.", st: "لدينا كوخ في الفناء." };
            else if (word === "PLÅSTER") levelObj.data[word] = { t: "لاصق جروح", s: "Sätt ett plåster på såret.", st: "ضع لاصق جروح على الجرح." };
            else if (word === "LÅSER") levelObj.data[word] = { t: "يقفل", s: "Han låser dörren.", st: "هو يقفل الباب." };
            else if (word === "SORT") levelObj.data[word] = { t: "نوع", s: "Vilken sort vill du ha?", st: "أي نوع تريد؟" };
            else if (word === "TRÄNA") levelObj.data[word] = { t: "يتدرب", s: "Jag ska träna på gymmet.", st: "سأتدرب في الصالة الرياضية." };
            else if (word === "NÄRA") levelObj.data[word] = { t: "قريب", s: "Vi bor nära skolan.", st: "نسكن قريباً من المدرسة." };
            else if (word === "SKÖTER") levelObj.data[word] = { t: "يعتني بـ", s: "Hon sköter sina blommor.", st: "هي تعتني بزهورها." };
            else if (word === "SÖKER") levelObj.data[word] = { t: "يبحث", s: "Han söker nytt jobb.", st: "هو يبحث عن عمل جديد." };
            else if (word === "NÄSA") levelObj.data[word] = { t: "أنف", s: "Han har en stor näsa.", st: "لديه أنف كبير." };
            else console.error(`Missing data for ${word}`);
        }
    });

    chapterData.push(levelObj);
});

console.log(JSON.stringify(chapterData, null, 4));
