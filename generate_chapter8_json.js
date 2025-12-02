
const fs = require('fs');

const dataFilePath = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/wordConnectData.js';
const fileContent = fs.readFileSync(dataFilePath, 'utf8');

const dictMatch = fileContent.match(/const WC_DICTIONARY = (\[[\s\S]*\])\s*;/);
let WC_DICTIONARY;
eval('WC_DICTIONARY = ' + dictMatch[1]);

const LEVEL_PLAN = [
    { main: "GATA", targets: ["GATA", "TAG"] },
    { main: "HAMN", targets: ["HAMN", "HAN"] },
    { main: "KÖRA", targets: ["KÖRA", "ÖKAR"] },
    { main: "KANOT", targets: ["KANOT", "NATO", "TANK"] },
    { main: "KÄRRA", targets: ["KÄRRA", "ÄRRA", "KARR"] },
    { main: "ÖSTER", targets: ["ÖSTER", "REST", "RÖST"] },
    { main: "SÖDER", targets: ["SÖDER", "RÖD", "ÖDE", "ÖRE"] },
    { main: "BÖTER", targets: ["BÖTER", "BER", "BÖR", "TRE"] },
    { main: "REGLER", targets: ["REGLER", "REGEL", "GER", "LER"] },
    { main: "LASTBIL", targets: ["LASTBIL", "LISTA", "TILLS", "BILA", "LISA"] }
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
            if (word === "TAG") levelObj.data[word] = { t: "قبضة / خذ (أمر)", s: "Ta ett tag i repet.", st: "أمسك بالحبل." };
            else if (word === "HAN") levelObj.data[word] = { t: "هو", s: "Han är min bror.", st: "هو أخي." };
            else if (word === "ÖKAR") levelObj.data[word] = { t: "يزيد", s: "Farten ökar.", st: "السرعة تزداد." };
            else if (word === "NATO") levelObj.data[word] = { t: "الناتو", s: "Sverige är med i Nato.", st: "السويد عضو في الناتو." };
            else if (word === "TANK") levelObj.data[word] = { t: "خزان", s: "Tanken är full.", st: "الخزان ممتلئ." };
            else if (word === "ÄRRA") levelObj.data[word] = { t: "يترك ندبة (نادر)", s: "Såret kommer att ärra sig.", st: "الجرح سيترك ندبة." };
            else if (word === "KARR") levelObj.data[word] = { t: "مستنقع (نادر)", s: "Vi gick genom ett karr.", st: "مشينا عبر مستنقع." };
            else if (word === "REST") levelObj.data[word] = { t: "بقية / سافر (الماضي)", s: "Han har rest jorden runt.", st: "لقد سافر حول العالم." };
            else if (word === "RÖST") levelObj.data[word] = { t: "صوت", s: "Hon har en vacker röst.", st: "لديها صوت جميل." };
            else if (word === "RÖD") levelObj.data[word] = { t: "أحمر", s: "Bilen är röd.", st: "السيارة حمراء." };
            else if (word === "ÖDE") levelObj.data[word] = { t: "مصير / مهجور", s: "Ett öde hus.", st: "منزل مهجور." };
            else if (word === "ÖRE") levelObj.data[word] = { t: "أوره (عملة)", s: "Det kostar 50 öre.", st: "يكلف 50 أوره." };
            else if (word === "BER") levelObj.data[word] = { t: "يطلب / يصلي", s: "Jag ber om ursäkt.", st: "أعتذر (أطلب العذر)." };
            else if (word === "BÖR") levelObj.data[word] = { t: "ينبغي", s: "Du bör gå nu.", st: "ينبغي عليك الذهاب الآن." };
            else if (word === "TRE") levelObj.data[word] = { t: "ثلاثة", s: "Jag har tre bröder.", st: "لدي ثلاثة إخوة." };
            else if (word === "REGEL") levelObj.data[word] = { t: "قاعدة", s: "Det är en viktig regel.", st: "هذه قاعدة مهمة." };
            else if (word === "GER") levelObj.data[word] = { t: "يعطي", s: "Han ger mig en bok.", st: "هو يعطيني كتاباً." };
            else if (word === "LER") levelObj.data[word] = { t: "يبتسم", s: "Hon ler mot mig.", st: "هي تبتسم لي." };
            else if (word === "LISTA") levelObj.data[word] = { t: "قائمة", s: "Skriv en lista på vad vi behöver.", st: "اكتب قائمة بما نحتاجه." };
            else if (word === "TILLS") levelObj.data[word] = { t: "حتى", s: "Vänta tills jag kommer.", st: "انتظر حتى آتي." };
            else if (word === "LISA") levelObj.data[word] = { t: "ليزا (اسم)", s: "Lisa är snäll.", st: "ليزا لطيفة." };
            else console.error(`Missing data for ${word}`);
        }
    });

    chapterData.push(levelObj);
});

console.log(JSON.stringify(chapterData, null, 4));
