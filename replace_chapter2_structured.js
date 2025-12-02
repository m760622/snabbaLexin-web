const fs = require('fs');

const generatorPath = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/generate_advanced_levels.js';
let content = fs.readFileSync(generatorPath, 'utf8');

const structuredChapter2 = [
    // Levels 1-3: 2 words, Length 3-4
    { main: "ÅSKA", targets: ["ÅSKA", "ASK"], data: { "ÅSKA": { t: "رعد", s: "Vi hörde åska.", st: "سمعنا الرعد." }, "ASK": { t: "شجرة الدردار / علبة", s: "En liten ask tändstickor.", st: "علبة كبريت صغيرة." } } },
    { main: "STEN", targets: ["STEN", "SEN"], data: { "STEN": { t: "حجر", s: "En stor sten låg på vägen.", st: "كان هناك حجر كبير على الطريق." }, "SEN": { t: "متأخر", s: "Han kom för sent.", st: "جاء متأخراً." } } },
    { main: "RÖNN", targets: ["RÖNN", "ÖRN"], data: { "RÖNN": { t: "شجرة الغبيراء", s: "Rönnens bär är röda.", st: "توت الغبيراء أحمر." }, "ÖRN": { t: "نسر", s: "Örnen flyger högt.", st: "النسر يطير عالياً." } } },

    // Levels 4-6: 3 words, Length 4-5
    { main: "SVALA", targets: ["SVALA", "SVAL", "VAL"], data: { "SVALA": { t: "سنونو", s: "En svala gör ingen sommar.", st: "سنونوة واحدة لا تصنع الصيف." }, "SVAL": { t: "بارد / منعش", s: "En sval vind blåser.", st: "تهب رياح منعشة." }, "VAL": { t: "حوت / خيار", s: "Vi såg en val i havet.", st: "رأينا حوتاً في البحر." } } },
    { main: "RENAR", targets: ["RENAR", "REA", "ENAR"], data: { "RENAR": { t: "حيوانات الرنة", s: "Renar lever i norr.", st: "تعيش الرنة في الشمال." }, "REA": { t: "تخفيضات", s: "Det är rea på kläder.", st: "هناك تخفيضات على الملابس." }, "ENAR": { t: "أشجار العرعر", s: "Det växer enar på backen.", st: "تنمو أشجار العرعر على التل." } } },
    { main: "MYROR", targets: ["MYROR", "MYRA", "ROM"], data: { "MYROR": { t: "نمل", s: "Myror är starka.", st: "النمل قوي." }, "MYRA": { t: "نملة", s: "En liten myra.", st: "نملة صغيرة." }, "ROM": { t: "بطرخ", s: "Fiskens rom.", st: "بطرخ السمك." } } },

    // Levels 7-9: 4 words, Length 5-6
    { main: "HALVÖ", targets: ["HALVÖ", "HAV", "LAV", "LÖV"], data: { "HALVÖ": { t: "شبه جزيرة", s: "Skåne är en halvö.", st: "سكونة هي شبه جزيرة." }, "HAV": { t: "بحر", s: "Havet är djupt.", st: "البحر عميق." }, "LAV": { t: "أشنة", s: "Lavar växer på stenar.", st: "تنمو الأشنات على الحجارة." }, "LÖV": { t: "ورقة شجر", s: "Löven faller på hösten.", st: "تتساقط الأوراق في الخريف." } } },
    { main: "HIMMEL", targets: ["HIMMEL", "HEM", "LIM", "HEL"], data: { "HIMMEL": { t: "سماء", s: "Himlen är blå.", st: "السماء زرقاء." }, "HEM": { t: "منزل", s: "Vi ska gå hem nu.", st: "سنذهب إلى المنزل الآن." }, "LIM": { t: "غراء", s: "Jag behöver lim.", st: "أحتاج إلى غراء." }, "HEL": { t: "كامل", s: "Jag vill ha en hel kaka.", st: "أريد كعكة كاملة." } } },
    { main: "PLANET", targets: ["PLANET", "PLAN", "LEN", "EL"], data: { "PLANET": { t: "كوكب", s: "Jorden är en planet.", st: "الأرض كوكب." }, "PLAN": { t: "طائرة / خطة", s: "Vi har en plan.", st: "لدينا خطة." }, "LEN": { t: "ناعم", s: "Katten har len päls.", st: "القطة لديها فراء ناعم." }, "EL": { t: "كهرباء", s: "Vi behöver el till lampan.", st: "نحتاج الكهرباء للمصباح." } } },

    // Level 10: 5 words, Length 4-7
    { main: "DJUNGEL", targets: ["DJUNGEL", "LUGN", "UNG", "UGN", "DEL"], data: { "DJUNGEL": { t: "أدغال", s: "Tigern bor i djungeln.", st: "يعيش النمر في الأدغال." }, "LUGN": { t: "هادئ", s: "Han är en lugn person.", st: "هو شخص هادئ." }, "UNG": { t: "شاب", s: "Han är ung och stark.", st: "هو شاب وقوي." }, "UGN": { t: "فرن", s: "Sätt in kakan i ugnen.", st: "ضع الكعكة في الفرن." }, "DEL": { t: "جزء", s: "En del av kakan.", st: "جزء من الكعكة." } } }
];

// Find the start and end of Chapter 2 in the file
const startMarker = "2: [ // Nature";
const nextChapterMarker = "3: [ // Travel";

const startIndex = content.indexOf(startMarker);
const nextChapterIndex = content.indexOf(nextChapterMarker);

if (startIndex !== -1 && nextChapterIndex !== -1) {
    // Construct new block
    let newBlock = "2: [ // Nature\n";
    structuredChapter2.forEach(level => {
        newBlock += `        { main: "${level.main}", targets: ${JSON.stringify(level.targets)}, data: ${JSON.stringify(level.data)} },\n`;
    });
    newBlock += "    ],\n    "; // Add indentation for next chapter

    const before = content.substring(0, startIndex);
    const after = content.substring(nextChapterIndex);

    content = before + newBlock + after;

    fs.writeFileSync(generatorPath, content);
    console.log("Replaced Chapter 2 with STRUCTURED perfect nature levels.");
} else {
    console.error("Could not find Chapter 2 block.");
}
