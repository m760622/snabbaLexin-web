
const fs = require('fs');

const dataFilePath = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/wordConnectData.js';
const fileContent = fs.readFileSync(dataFilePath, 'utf8');

const dictMatch = fileContent.match(/const WC_DICTIONARY = (\[[\s\S]*\])\s*;/);
let WC_DICTIONARY;
eval('WC_DICTIONARY = ' + dictMatch[1]);

const LEVEL_PLAN = [
    { main: "PROV", targets: ["PROV", "ROP"] },
    { main: "ELEV", targets: ["ELEV", "LEV"] },
    { main: "LÄRA", targets: ["LÄRA", "LÄR"] },
    { main: "AVTAL", targets: ["AVTAL", "TAVLA", "TALA"] },
    { main: "MATTE", targets: ["MATTE", "TEAM", "TEMA"] },
    { main: "RÄKNA", targets: ["RÄKNA", "NÄRA", "RÄKA"] },
    { main: "SJUNGA", targets: ["SJUNGA", "SJUNG", "GUNGA", "LUGNA"] },
    { main: "IDROTT", targets: ["IDROTT", "TROTT", "TORRT", "RIDIT"] },
    { main: "MATSAL", targets: ["MATSAL", "SAMLA", "SMALT", "ATLAS"] },
    { main: "SVENSKA", targets: ["SVENSKA", "SVENSK", "VÄSKA", "VAKEN", "SVEK"] }
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
            if (word === "MATTE") levelObj.data[word] = { t: "رياضيات", s: "Vi har matte i skolan.", st: "لدينا رياضيات في المدرسة." };
            else if (word === "TEAM") levelObj.data[word] = { t: "فريق", s: "Vi jobbar i team.", st: "نعمل في فريق." };
            else if (word === "TEMA") levelObj.data[word] = { t: "موضوع", s: "Dagens tema är miljö.", st: "موضوع اليوم هو البيئة." };
            else if (word === "RÄKA") levelObj.data[word] = { t: "روبيان", s: "Jag åt en räka.", st: "أكلت روبيانة." };
            else if (word === "SJUNG") levelObj.data[word] = { t: "غنِّ (أمر)", s: "Sjung en sång för oss.", st: "غنِّ لنا أغنية." };
            else if (word === "GUNGA") levelObj.data[word] = { t: "أرجوحة / يتأرجح", s: "Barnen gungar i parken.", st: "الأطفال يتأرجحون في الحديقة." };
            else if (word === "LUGNA") levelObj.data[word] = { t: "يهدئ", s: "Försök att lugna ner dig.", st: "حاول أن تهدأ." };
            else if (word === "TROTT") levelObj.data[word] = { t: "اعتقد (الماضي)", s: "Jag hade trott det.", st: "كنت قد اعتقدت ذلك." };
            else if (word === "TORRT") levelObj.data[word] = { t: "جاف", s: "Gräset är torrt.", st: "العشب جاف." };
            else if (word === "RIDIT") levelObj.data[word] = { t: "ركب (الماضي)", s: "Hon har ridit i många år.", st: "لقد ركبت الخيل لسنوات عديدة." };
            else if (word === "SAMLA") levelObj.data[word] = { t: "يجمع", s: "Vi ska samla in pengar.", st: "سنجمع المال." };
            else if (word === "SMALT") levelObj.data[word] = { t: "ضيق / ذاب", s: "Ett smalt sund.", st: "مضيق ضيق." };
            else if (word === "ATLAS") levelObj.data[word] = { t: "أطلس", s: "Titta i din atlas.", st: "انظر في أطلسك." };
            else if (word === "SVENSK") levelObj.data[word] = { t: "سويدي", s: "Han är svensk medborgare.", st: "هو مواطن سويدي." };
            else if (word === "VAKEN") levelObj.data[word] = { t: "مستيقظ", s: "Är du vaken?", st: "هل أنت مستيقظ؟" };
            else if (word === "SVEK") levelObj.data[word] = { t: "خيانة", s: "Det var ett stort svek.", st: "كانت خيانة كبيرة." };
            else if (word === "SJUNGA") levelObj.data[word] = { t: "يغني", s: "Vi ska sjunga i kören.", st: "سنغني في الجوقة." };
            else if (word === "IDROTT") levelObj.data[word] = { t: "رياضة", s: "Idrott är mitt favoritämne.", st: "الرياضة هي مادتي المفضلة." };
            else if (word === "MATSAL") levelObj.data[word] = { t: "غرفة طعام / مقصف", s: "Vi äter i skolans matsal.", st: "نأكل في مقصف المدرسة." };
            else if (word === "SVENSKA") levelObj.data[word] = { t: "اللغة السويدية", s: "Jag lär mig svenska.", st: "أتعلم اللغة السويدية." };
            else console.error(`Missing data for ${word}`);
        }
    });

    chapterData.push(levelObj);
});

console.log(JSON.stringify(chapterData, null, 4));
