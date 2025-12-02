
const fs = require('fs');

const dataFilePath = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/wordConnectData.js';
const fileContent = fs.readFileSync(dataFilePath, 'utf8');

const dictMatch = fileContent.match(/const WC_DICTIONARY = (\[[\s\S]*\])\s*;/);
let WC_DICTIONARY;
eval('WC_DICTIONARY = ' + dictMatch[1]);

const LEVEL_PLAN = [
    { main: "KÖPA", targets: ["KÖPA", "KÖP"] },
    { main: "PRIS", targets: ["PRIS", "RIS"] },
    { main: "DYRA", targets: ["DYRA", "DYR"] },
    { main: "SÄLJA", targets: ["SÄLJA", "SÄLJ", "SJÄL"] },
    { main: "VÄSKA", targets: ["VÄSKA", "VÄSA", "VAKA"] },
    { main: "PLAST", targets: ["PLAST", "LAST", "SALT"] },
    { main: "KLÄDER", targets: ["KLÄDER", "LÄDER", "LÄRDE", "KLÄDE"] },
    { main: "SKORNA", targets: ["SKORNA", "KORNA", "NORSK", "ORKAN"] },
    { main: "KOSTAR", targets: ["KOSTAR", "ROSTA", "STORA", "KORTA"] },
    { main: "SKJORTA", targets: ["SKJORTA", "SKROT", "KARTA", "ROSTA", "STORA"] }
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
            if (word === "KÖP") levelObj.data[word] = { t: "شراء", s: "Det var ett bra köp.", st: "كانت صفقة شراء جيدة." };
            else if (word === "RIS") levelObj.data[word] = { t: "أرز / غصن", s: "Vi äter ris till maten.", st: "نأكل الأرز مع الطعام." };
            else if (word === "DYR") levelObj.data[word] = { t: "غالي", s: "Bilen var för dyr.", st: "السيارة كانت غالية جداً." };
            else if (word === "SÄLJ") levelObj.data[word] = { t: "بِع (أمر)", s: "Sälj bilen nu.", st: "بع السيارة الآن." };
            else if (word === "SJÄL") levelObj.data[word] = { t: "روح", s: "En sund själ i en sund kropp.", st: "عقل سليم في جسم سليم." };
            else if (word === "VÄSA") levelObj.data[word] = { t: "يفح / يهمس بغضب", s: "Ormen började väsa.", st: "بدأ الثعبان بالفحيح." };
            else if (word === "VAKA") levelObj.data[word] = { t: "يسهر / يراقب", s: "Sjuksköterskan ska vaka i natt.", st: "الممرضة ستسهر الليلة." };
            else if (word === "LAST") levelObj.data[word] = { t: "حمل / عبء", s: "Lasten var tung.", st: "الحمل كان ثقيلاً." };
            else if (word === "SALT") levelObj.data[word] = { t: "ملح", s: "Kan du skicka saltet?", st: "هل يمكنك تمرير الملح؟" };
            else if (word === "LÄRDE") levelObj.data[word] = { t: "علماء / تعلم (الماضي)", s: "De lärde tvistar om den saken.", st: "العلماء يختلفون حول هذا الأمر." };
            else if (word === "KLÄDE") levelObj.data[word] = { t: "قماش / جوخ", s: "Ett fint kläde till dräkten.", st: "قماش فاخر للزي." };
            else if (word === "KORNA") levelObj.data[word] = { t: "الأبقار", s: "Korna betar på ängen.", st: "الأبقار ترعى في المرج." };
            else if (word === "NORSK") levelObj.data[word] = { t: "نرويجي", s: "Han är norsk medborgare.", st: "هو مواطن نرويجي." };
            else if (word === "ORKAN") levelObj.data[word] = { t: "إعصار", s: "En orkan närmar sig kusten.", st: "إعصار يقترب من الساحل." };
            else if (word === "ROSTA") levelObj.data[word] = { t: "يحمص / يصدأ", s: "Kan du rosta brödet?", st: "هل يمكنك تحميص الخبز؟" };
            else if (word === "STORA") levelObj.data[word] = { t: "كبيرة", s: "De har stora planer.", st: "لديهم خطط كبيرة." };
            else if (word === "KORTA") levelObj.data[word] = { t: "قصيرة", s: "Dagarna är korta på vintern.", st: "الأيام قصيرة في الشتاء." };
            else if (word === "SKROT") levelObj.data[word] = { t: "خردة", s: "Bilen är bara skrot.", st: "السيارة مجرد خردة." };
            else if (word === "KARTA") levelObj.data[word] = { t: "خريطة", s: "Hitta vägen med en karta.", st: "جد الطريق باستخدام خريطة." };
            else if (word === "SÄLJA") levelObj.data[word] = { t: "يبيع", s: "Han ska sälja sitt hus.", st: "سيبيع منزله." };
            else if (word === "PLAST") levelObj.data[word] = { t: "بلاستيك", s: "Flaskan är gjord av plast.", st: "الزجاجة مصنوعة من البلاستيك." };
            else console.error(`Missing data for ${word}`);
        }
    });

    chapterData.push(levelObj);
});

console.log(JSON.stringify(chapterData, null, 4));
