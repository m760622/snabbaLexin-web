
const fs = require('fs');

const dataFilePath = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/wordConnectData.js';
const fileContent = fs.readFileSync(dataFilePath, 'utf8');

const dictMatch = fileContent.match(/const WC_DICTIONARY = (\[[\s\S]*\])\s*;/);
let WC_DICTIONARY;
eval('WC_DICTIONARY = ' + dictMatch[1]);

const LEVEL_PLAN = [
    { main: "TRO", targets: ["TRO", "ROT"] },
    { main: "BÖN", targets: ["BÖN", "ÖN"] },
    { main: "LIV", targets: ["LIV", "VIL"] },
    { main: "ANDE", targets: ["ANDE", "DAN", "DEN"] },
    { main: "FRID", targets: ["FRID", "FRI", "RID"] },
    { main: "ISLAM", targets: ["ISLAM", "MILA", "SILA", "LIMA"] },
    { main: "PASTOR", targets: ["PASTOR", "ROSTA", "SPORT", "SOPAR"] },
    { main: "SYNDER", targets: ["SYNDER", "SYNER", "RYSER", "NEDRE"] },
    { main: "ANDLIG", targets: ["ANDLIG", "DINGLA", "GLIDA", "LANDA"] },
    { main: "APOSTEL", targets: ["APOSTEL", "STAPEL", "STOLPE", "ALPER", "POSTA"] }
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
            if (word === "ROT") levelObj.data[word] = { t: "جذر", s: "Trädets rot är djup.", st: "جذر الشجرة عميق." };
            else if (word === "ÖN") levelObj.data[word] = { t: "الجزيرة", s: "Vi åkte till ön med båt.", st: "ذهبنا إلى الجزيرة بالقارب." };
            else if (word === "VIL") levelObj.data[word] = { t: "يريد (عامية/قديم)", s: "Gör vad du vil.", st: "افعل ما تريد." };
            else if (word === "DAN") levelObj.data[word] = { t: "اليوم (عامية)", s: "Hela dan.", st: "طوال اليوم." };
            else if (word === "DEN") levelObj.data[word] = { t: "الـ / ذلك", s: "Den boken är bra.", st: "ذلك الكتاب جيد." };
            else if (word === "FRI") levelObj.data[word] = { t: "حر", s: "Jag är fri nu.", st: "أنا حر الآن." };
            else if (word === "RID") levelObj.data[word] = { t: "اركب (أمر)", s: "Rid försiktigt.", st: "اركب بحذر." };
            else if (word === "MILA") levelObj.data[word] = { t: "كومة فحم / ميل (عامية)", s: "En mila i skogen.", st: "كومة فحم في الغابة." };
            else if (word === "SILA") levelObj.data[word] = { t: "يصفي", s: "Sila såsen.", st: "صف الصلصة." };
            else if (word === "LIMA") levelObj.data[word] = { t: "ليما (مدينة)", s: "Lima är Perus huvudstad.", st: "ليما هي عاصمة بيرو." };
            else if (word === "ROSTA") levelObj.data[word] = { t: "يحمص / يصدأ", s: "Järnet rostar.", st: "الحديد يصدأ." };
            else if (word === "SPORT") levelObj.data[word] = { t: "رياضة", s: "Fotboll är en sport.", st: "كرة القدم رياضة." };
            else if (word === "SOPAR") levelObj.data[word] = { t: "يكنس", s: "Han sopar golvet.", st: "هو يكنس الأرض." };
            else if (word === "SYNER") levelObj.data[word] = { t: "رؤى", s: "Han hade syner.", st: "كانت لديه رؤى." };
            else if (word === "RYSER") levelObj.data[word] = { t: "يرتجف", s: "Jag ryser av kyla.", st: "أرتجف من البرد." };
            else if (word === "NEDRE") levelObj.data[word] = { t: "سفلي", s: "Nedre våningen.", st: "الطابق السفلي." };
            else if (word === "DINGLA") levelObj.data[word] = { t: "يتدلى", s: "Benen dingla från stolen.", st: "الساقان تتدليان من الكرسي." };
            else if (word === "GLIDA") levelObj.data[word] = { t: "ينزلق", s: "Bilen kan glida på isen.", st: "السيارة قد تنزلق على الجليد." };
            else if (word === "LANDA") levelObj.data[word] = { t: "يهبط", s: "Flygplanet ska landa.", st: "الطائرة ستهبط." };
            else if (word === "STAPEL") levelObj.data[word] = { t: "كومة / عمود", s: "En stapel med böcker.", st: "كومة من الكتب." };
            else if (word === "STOLPE") levelObj.data[word] = { t: "عمود", s: "Körde in i en stolpe.", st: "اصطدم بعمود." };
            else if (word === "ALPER") levelObj.data[word] = { t: "جبال الألب", s: "Vi åkte till Alperna.", st: "ذهبنا إلى جبال الألب." };
            else if (word === "POSTA") levelObj.data[word] = { t: "يرسل بالبريد", s: "Jag ska posta brevet.", st: "سأرسل الرسالة بالبريد." };
            else if (word === "APOSTEL") levelObj.data[word] = { t: "رسول (حواري)", s: "En av Jesus tolv apostlar.", st: "واحد من حواريي يسوع الاثني عشر." };
            else console.error(`Missing data for ${word}`);
        }
    });

    chapterData.push(levelObj);
});

console.log(JSON.stringify(chapterData, null, 4));
