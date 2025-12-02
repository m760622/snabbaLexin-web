
const fs = require('fs');

const dataFilePath = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/wordConnectData.js';
const fileContent = fs.readFileSync(dataFilePath, 'utf8');

const dictMatch = fileContent.match(/const WC_DICTIONARY = (\[[\s\S]*\])\s*;/);
let WC_DICTIONARY;
eval('WC_DICTIONARY = ' + dictMatch[1]);

const LEVEL_PLAN = [
    { main: "LAG", targets: ["LAG", "GAL"] },
    { main: "DOM", targets: ["DOM", "MOD"] },
    { main: "LÖGN", targets: ["LÖGN", "LÖN"] },
    { main: "VAKT", targets: ["VAKT", "AKT", "TAK"] },
    { main: "MAKT", targets: ["MAKT", "MAT", "TAK"] },
    { main: "SKULD", targets: ["SKULD", "GULD", "SLUT"] },
    { main: "BROTT", targets: ["BROTT", "BORT", "TORR", "ORT"] },
    { main: "STRAFF", targets: ["STRAFF", "FAST", "RAST", "FART"] },
    { main: "FÅNGAR", targets: ["FÅNGAR", "FÅNGA", "ÅNGAR", "FANA"] },
    { main: "ADVOKAT", targets: ["ADVOKAT", "VAKT", "VAKA", "AKT", "TAK"] }
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
            if (word === "GAL") levelObj.data[word] = { t: "يصيح (الديك) / مجنون", s: "Tuppen gol tidigt.", st: "صاح الديك مبكراً." };
            else if (word === "MOD") levelObj.data[word] = { t: "شجاعة", s: "Han visade stort mod.", st: "أظهر شجاعة كبيرة." };
            else if (word === "LÖN") levelObj.data[word] = { t: "راتب", s: "Jag får min lön den 25:e.", st: "أحصل على راتبي في الخامس والعشرين." };
            else if (word === "AKT") levelObj.data[word] = { t: "ملف / فصل (مسرح)", s: "En akt i pjäsen.", st: "فصل في المسرحية." };
            else if (word === "TAK") levelObj.data[word] = { t: "سقف", s: "Taket läcker.", st: "السقف يسرب الماء." };
            else if (word === "MAT") levelObj.data[word] = { t: "طعام", s: "Maten är klar.", st: "الطعام جاهز." };
            else if (word === "GULD") levelObj.data[word] = { t: "ذهب", s: "Ringen är av guld.", st: "الخاتم من الذهب." };
            else if (word === "SLUT") levelObj.data[word] = { t: "نهاية / انتهى", s: "Filmen är slut.", st: "الفيلم انتهى." };
            else if (word === "BORT") levelObj.data[word] = { t: "بعيداً", s: "Han gick bort.", st: "لقد ذهب بعيداً (أو توفي)." };
            else if (word === "TORR") levelObj.data[word] = { t: "جاف", s: "Marken är torr.", st: "الأرض جافة." };
            else if (word === "ORT") levelObj.data[word] = { t: "منطقة / مكان", s: "En liten ort på landet.", st: "منطقة صغيرة في الريف." };
            else if (word === "FAST") levelObj.data[word] = { t: "ثابت / عالق / رغم أن", s: "Han satt fast i trafiken.", st: "كان عالقاً في الزحام." };
            else if (word === "RAST") levelObj.data[word] = { t: "استراحة", s: "Vi har rast nu.", st: "لدينا استراحة الآن." };
            else if (word === "FART") levelObj.data[word] = { t: "سرعة", s: "Bilen körde i hög fart.", st: "السيارة سارت بسرعة عالية." };
            else if (word === "FÅNGA") levelObj.data[word] = { t: "يمسك / يصطاد", s: "Katten försökte fånga en mus.", st: "حاولت القطة اصطياد فأر." };
            else if (word === "ÅNGAR") levelObj.data[word] = { t: "يتبخر / يندم (نادر)", s: "Maten ångar.", st: "الطعام يتصاعد منه البخار." };
            else if (word === "FANA") levelObj.data[word] = { t: "راية / علم", s: "De bar en fana i tåget.", st: "حملوا راية في الموكب." };
            else if (word === "VAKA") levelObj.data[word] = { t: "يسهر / يراقب", s: "Hon ska vaka vid sjuksängen.", st: "ستسهر بجانب سرير المريض." };
            else if (word === "SKULD") levelObj.data[word] = { t: "دين / ذنب", s: "Han har en stor skuld.", st: "لديه دين كبير." };
            else console.error(`Missing data for ${word}`);
        }
    });

    chapterData.push(levelObj);
});

console.log(JSON.stringify(chapterData, null, 4));
