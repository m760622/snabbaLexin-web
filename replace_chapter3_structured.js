const fs = require('fs');

const generatorPath = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/generate_advanced_levels.js';
let content = fs.readFileSync(generatorPath, 'utf8');

const structuredChapter3 = [
    // Levels 1-3: 2 words, Length 3-4
    { main: "DURK", targets: ["DURK", "DUK"], data: { "DURK": { t: "أرضية القارب", s: "Vattnet skvalpade på durken.", st: "تناثر الماء على أرضية القارب." }, "DUK": { t: "مفرش", s: "En vit duk på bordet.", st: "مفرش أبيض على الطاولة." } } },
    { main: "KNIV", targets: ["KNIV", "VIN"], data: { "KNIV": { t: "سكين", s: "Skär brödet med en kniv.", st: "اقطع الخبز بالسكين." }, "VIN": { t: "نبيذ", s: "Ett glas rött vin.", st: "كأس من النبيذ الأحمر." } } },
    { main: "LAND", targets: ["LAND", "DAL"], data: { "LAND": { t: "أرض / بلد", s: "Sverige är ett vackert land.", st: "السويد بلد جميل." }, "DAL": { t: "وادي", s: "Huset ligger i en dal.", st: "يقع المنزل في وادي." } } },

    // Levels 4-6: 3 words, Length 4-5
    { main: "SLOTT", targets: ["SLOTT", "LOTS", "STOL"], data: { "SLOTT": { t: "قلعة", s: "Kungen bor i ett slott.", st: "يعيش الملك في قلعة." }, "LOTS": { t: "مرشد سفن", s: "Fartyget behövde en lots.", st: "احتاجت السفينة إلى مرشد." }, "STOL": { t: "كرسي", s: "Sitt på en stol.", st: "اجلس على كرسي." } } },
    { main: "KARTA", targets: ["KARTA", "RATA", "ARAK"], data: { "KARTA": { t: "خريطة", s: "Vi tittade på en karta.", st: "نظرنا إلى الخريطة." }, "RATA": { t: "يرفض", s: "Man ska inte rata mat.", st: "لا ينبغي رفض الطعام." }, "ARAK": { t: "عرق", s: "Arak är en stark dryck.", st: "العرق مشروب قوي." } } },
    { main: "VÄSKA", targets: ["VÄSKA", "VÄXA", "SKAV"], data: { "VÄSKA": { t: "حقيبة", s: "Jag packade min väska.", st: "حزمت حقيبتي." }, "VÄXA": { t: "ينمو", s: "Blommorna växa snabbt.", st: "الزهور تنمو بسرعة." }, "SKAV": { t: "جرح احتكاك", s: "Skorna gav mig skav.", st: "سببت لي الأحذية جرحاً." } } },

    // Levels 7-9: 4 words, Length 5-6
    { main: "VÄSTER", targets: ["VÄSTER", "VÄRST", "ÄRTER", "RESÄR"], data: { "VÄSTER": { t: "غرب", s: "Solen går ner i väster.", st: "تغرب الشمس في الغرب." }, "VÄRST": { t: "أسوأ", s: "Det var det värsta jag hört.", st: "هذا أسوأ ما سمعت." }, "ÄRTER": { t: "بازلاء", s: "Gröna ärter är gott.", st: "البازلاء الخضراء لذيذة." }, "RESÄR": { t: "مطاط", s: "Byxorna har resår i midjan.", st: "السراويل لها مطاط في الخصر." } } },
    { main: "PENGAR", targets: ["PENGAR", "REGNA", "REPAN", "ANGRE"], data: { "PENGAR": { t: "نقود", s: "Har du några pengar?", st: "هل لديك أي نقود؟" }, "REGNA": { t: "تمطر", s: "Det ska regna imorgon.", st: "ستمطر غداً." }, "REPAN": { t: "الخدش", s: "Repan i lacken var djup.", st: "الخدش في الطلاء كان عميقاً." }, "ANGRE": { t: "يندم", s: "Du kommer att angre dig.", st: "ستندم على ذلك." } } },
    { main: "MATROS", targets: ["MATROS", "STORM", "ROSTA", "RASAT"], data: { "MATROS": { t: "بحار", s: "Han arbetar som matros.", st: "يعمل كبحار." }, "STORM": { t: "عاصفة", s: "Båten gungade i stormen.", st: "تأرجح القارب في العاصفة." }, "ROSTA": { t: "يحمص / يصدأ", s: "Järn kan rosta.", st: "الحديد يمكن أن يصدأ." }, "RASAT": { t: "انهار", s: "Taket har rasat in.", st: "لقد انهار السقف." } } },

    // Level 10: 5 words, Length 4-7
    { main: "STEWARD", targets: ["STEWARD", "STAD", "REST", "RESA", "SVAR"], data: { "STEWARD": { t: "مضيف", s: "En steward serverade kaffe.", st: "قدم المضيف القهوة." }, "STAD": { t: "مدينة", s: "Stockholm är en stor stad.", st: "ستوكهولم مدينة كبيرة." }, "REST": { t: "سافر", s: "Vi har rest hela dagen.", st: "سافرنا طوال اليوم." }, "RESA": { t: "سفر", s: "En lång resa.", st: "رحلة طويلة." }, "SVAR": { t: "جواب", s: "Jag vill ha ett svar.", st: "أريد جواباً." } } }
];

// Find the start and end of Chapter 3 in the file
const startMarker = "3: [ // Travel";
const nextChapterMarker = "4: [ // Daily";

const startIndex = content.indexOf(startMarker);
const nextChapterIndex = content.indexOf(nextChapterMarker);

if (startIndex !== -1 && nextChapterIndex !== -1) {
    // Construct new block
    let newBlock = "3: [ // Travel\n";
    structuredChapter3.forEach(level => {
        newBlock += `        { main: "${level.main}", targets: ${JSON.stringify(level.targets)}, data: ${JSON.stringify(level.data)} },\n`;
    });
    newBlock += "    ],\n    "; // Add indentation for next chapter

    const before = content.substring(0, startIndex);
    const after = content.substring(nextChapterIndex);

    content = before + newBlock + after;

    fs.writeFileSync(generatorPath, content);
    console.log("Replaced Chapter 3 with STRUCTURED perfect travel levels.");
} else {
    console.error("Could not find Chapter 3 block.");
}
