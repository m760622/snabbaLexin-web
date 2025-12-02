const fs = require('fs');

const generatorPath = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/generate_advanced_levels.js';
let content = fs.readFileSync(generatorPath, 'utf8');

// New Chapter 1 Data
// Selected based on thematic relevance and sub-word quality
const newChapter1 = [
    { main: "SKÅL", targets: ["SKÅL", "KÅL", "LÅS"], data: { "SKÅL": { t: "وعاء", s: "Häll soppan i en skål.", st: "صب الحساء في وعاء." }, "KÅL": { t: "ملفوف", s: "Kål är nyttigt och gott.", st: "الملفوف صحي ولذيذ." }, "LÅS": { t: "قفل", s: "Sätt ett lås på dörren.", st: "ضع قفلاً على الباب." } } },
    { main: "SILL", targets: ["SILL", "SIL"], data: { "SILL": { t: "رنجة", s: "Sill är en svensk klassiker.", st: "الرنجة هي طبق كلاسيكي سويدي." }, "SIL": { t: "مصفاة", s: "Häll pastan i en sil.", st: "صب المعكرونة في مصفاة." } } },
    { main: "BACON", targets: ["BACON"], data: { "BACON": { t: "لحم مقدد", s: "Ägg och bacon till frukost.", st: "بيض ولحم مقدد للفطور." } } }, // Only 1 word? Need at least 2 usually. Script said BACON, ABC. ABC is not great. Let's skip BACON or find another.
    // Let's use KORV instead.
    { main: "KORV", targets: ["KORV", "KOR", "ORK", "ROV"], data: { "KORV": { t: "سجق", s: "Jag vill ha korv med bröd.", st: "أريد سجقاً مع الخبز." }, "KOR": { t: "أبقار", s: "Korna betar på ängen.", st: "الأبقار ترعى في المرج." }, "ORK": { t: "طاقة", s: "Jag har ingen ork idag.", st: "ليس لدي طاقة اليوم." }, "ROV": { t: "فريسة", s: "Lejonet fångade sitt rov.", st: "اصطاد الأسد فريسته." } } },
    { main: "KAFFE", targets: ["KAFFE", "EKA"], data: { "KAFFE": { t: "قهوة", s: "En kopp kaffe, tack.", st: "فنجان قهوة، من فضلك." }, "EKA": { t: "قارب", s: "Vi rodde ut i en eka.", st: "جدفنا بقارب صغير." } } },
    { main: "KOPP", targets: ["KOPP", "OPP", "POP"], data: { "KOPP": { t: "فنجان", s: "Vill du ha en kopp te?", st: "هل تريد فنجان شاي؟" }, "OPP": { t: "فوق", s: "Opp och hoppa!", st: "انهض واقفز!" }, "POP": { t: "بوب", s: "Han gillar pop musik.", st: "هو يحب موسيقى البوب." } } },
    { main: "ÄPPLE", targets: ["ÄPPLE", "LÄPP"], data: { "ÄPPLE": { t: "تفاحة", s: "Ett äpple om dagen.", st: "تفاحة في اليوم." }, "LÄPP": { t: "شفة", s: "Han bet sig i läppen.", st: "عض شفته." } } },
    { main: "BANAN", targets: ["BANAN", "BANA", "BANN"], data: { "BANAN": { t: "موزة", s: "Apor gillar att äta bananer.", st: "القرود تحب أكل الموز." }, "BANA": { t: "مسار", s: "Följ din egen bana.", st: "اتبع مسارك الخاص." }, "BANN": { t: "حرمان", s: "Han lyste i bann.", st: "لقد حرم كنسياً." } } }, // BANN is obscure. Maybe skip? Or use just BANAN/BANA.
    { main: "VÅFFLA", targets: ["VÅFFLA", "VAL", "LAV"], data: { "VÅFFLA": { t: "وافل", s: "Vi äter våfflor med sylt.", st: "نأكل الوافل مع المربى." }, "VAL": { t: "خيار", s: "Du har ett val.", st: "لديك خيار." }, "LAV": { t: "أشنة", s: "Lavar växer på stenar.", st: "الأشنات تنمو على الصخور." } } },
    { main: "ANANAS", targets: ["ANANAS", "SANN", "SANNA"], data: { "ANANAS": { t: "أناناس", s: "Ananas är en tropisk frukt.", st: "الأناناس فاكهة استوائية." }, "SANN": { t: "حقيقي", s: "En sann historia.", st: "قصة حقيقية." }, "SANNA": { t: "حقيقية", s: "Sanna mina ord.", st: "صدق كلماتي." } } },
    { main: "LÄSK", targets: ["LÄSK", "SÄL", "SKÄL"], data: { "LÄSK": { t: "مشروب غازي", s: "Barnen dricker läsk på festen.", st: "الأطفال يشربون المشروبات الغازية في الحفلة." }, "SÄL": { t: "فقمة", s: "En säl simmade i havet.", st: "سبحت فقمة في البحر." }, "SKÄL": { t: "سبب", s: "Det finns inga skäl att oroa sig.", st: "لا توجد أسباب للقلق." } } },
    { main: "SMÖR", targets: ["SMÖR", "SÖM", "MÖR", "RÖS"], data: { "SMÖR": { t: "زبدة", s: "Bred smör på brödet.", st: "ادهن الزبدة على الخبز." }, "SÖM": { t: "درزة", s: "Sömmen gick upp på byxorna.", st: "انفكت درزة البنطال." }, "MÖR": { t: "طري", s: "Köttet var väldigt mört.", st: "كان اللحم طرياً جداً." }, "RÖS": { t: "رجم", s: "Ett gammalt rös.", st: "رجم قديم." } } }
];

// We need exactly 10 levels.
// Let's pick: SKÅL, SILL, KORV, KAFFE, KOPP, ÄPPLE, BANAN, VÅFFLA, ANANAS, SMÖR.
// Dropping LÄSK (SÄL/SKÄL are not food).
// Dropping BACON (too few words).

const finalChapter1 = [
    { main: "SKÅL", targets: ["SKÅL", "KÅL", "LÅS"], data: { "SKÅL": { t: "وعاء", s: "Häll soppan i en skål.", st: "صب الحساء في وعاء." }, "KÅL": { t: "ملفوف", s: "Kål är nyttigt och gott.", st: "الملفوف صحي ولذيذ." }, "LÅS": { t: "قفل", s: "Sätt ett lås på dörren.", st: "ضع قفلاً على الباب." } } },
    { main: "SILL", targets: ["SILL", "SIL"], data: { "SILL": { t: "رنجة", s: "Sill är en svensk klassiker.", st: "الرنجة هي طبق كلاسيكي سويدي." }, "SIL": { t: "مصفاة", s: "Häll pastan i en sil.", st: "صب المعكرونة في مصفاة." } } },
    { main: "KORV", targets: ["KORV", "KOR", "ORK", "ROV"], data: { "KORV": { t: "سجق", s: "Jag vill ha korv med bröd.", st: "أريد سجقاً مع الخبز." }, "KOR": { t: "أبقار", s: "Korna betar på ängen.", st: "الأبقار ترعى في المرج." }, "ORK": { t: "طاقة", s: "Jag har ingen ork idag.", st: "ليس لدي طاقة اليوم." }, "ROV": { t: "فريسة", s: "Lejonet fångade sitt rov.", st: "اصطاد الأسد فريسته." } } },
    { main: "KAFFE", targets: ["KAFFE", "EKA"], data: { "KAFFE": { t: "قهوة", s: "En kopp kaffe, tack.", st: "فنجان قهوة، من فضلك." }, "EKA": { t: "قارب", s: "Vi rodde ut i en eka.", st: "جدفنا بقارب صغير." } } },
    { main: "KOPP", targets: ["KOPP", "OPP", "POP"], data: { "KOPP": { t: "فنجان", s: "Vill du ha en kopp te?", st: "هل تريد فنجان شاي؟" }, "OPP": { t: "فوق", s: "Opp och hoppa!", st: "انهض واقفز!" }, "POP": { t: "بوب", s: "Han gillar pop musik.", st: "هو يحب موسيقى البوب." } } },
    { main: "ÄPPLE", targets: ["ÄPPLE", "LÄPP"], data: { "ÄPPLE": { t: "تفاحة", s: "Ett äpple om dagen.", st: "تفاحة في اليوم." }, "LÄPP": { t: "شفة", s: "Han bet sig i läppen.", st: "عض شفته." } } },
    { main: "BANAN", targets: ["BANAN", "BANA", "BANN"], data: { "BANAN": { t: "موزة", s: "Apor gillar att äta bananer.", st: "القرود تحب أكل الموز." }, "BANA": { t: "مسار", s: "Följ din egen bana.", st: "اتبع مسارك الخاص." }, "BANN": { t: "حرمان", s: "Han lyste i bann.", st: "لقد حرم كنسياً." } } },
    { main: "VÅFFLA", targets: ["VÅFFLA", "VAL", "LAV"], data: { "VÅFFLA": { t: "وافل", s: "Vi äter våfflor med sylt.", st: "نأكل الوافل مع المربى." }, "VAL": { t: "خيار", s: "Du har ett val.", st: "لديك خيار." }, "LAV": { t: "أشنة", s: "Lavar växer på stenar.", st: "الأشنات تنمو على الصخور." } } },
    { main: "ANANAS", targets: ["ANANAS", "SANN", "SANNA"], data: { "ANANAS": { t: "أناناس", s: "Ananas är en tropisk frukt.", st: "الأناناس فاكهة استوائية." }, "SANN": { t: "حقيقي", s: "En sann historia.", st: "قصة حقيقية." }, "SANNA": { t: "حقيقية", s: "Sanna mina ord.", st: "صدق كلماتي." } } },
    { main: "SMÖR", targets: ["SMÖR", "SÖM", "MÖR", "RÖS"], data: { "SMÖR": { t: "زبدة", s: "Bred smör på brödet.", st: "ادهن الزبدة على الخبز." }, "SÖM": { t: "درزة", s: "Sömmen gick upp på byxorna.", st: "انفكت درزة البنطال." }, "MÖR": { t: "طري", s: "Köttet var väldigt mört.", st: "كان اللحم طرياً جداً." }, "RÖS": { t: "رجم", s: "Ett gammalt rös.", st: "رجم قديم." } } }
];

// Construct the replacement string
const newChapterString = `1: ${JSON.stringify(finalChapter1, null, 4).replace(/"(\w+)":/g, '$1:')}`; // Remove quotes from keys to match style if needed, but JSON is fine.
// Actually, the file uses non-quoted keys for 'main', 'targets', 'data' but quoted for 'MOS' etc.
// Let's just use JSON.stringify and then fix the keys if we want to be perfect, or just leave them quoted. JS allows quoted keys.

// Find the start and end of Chapter 1 in the file
const startMarker = "1: [ // Food";
const endMarker = "],";
const startIndex = content.indexOf(startMarker);
const nextChapterIndex = content.indexOf("2: [ // Nature");

if (startIndex !== -1 && nextChapterIndex !== -1) {
    const chapter1Block = content.substring(startIndex, nextChapterIndex);
    // We want to replace everything from "1: [" up to the closing "]," before "2: ["
    // But my substring includes the start of 2.

    // Let's find the last "]," before "2: ["
    const endIndex = content.lastIndexOf("],", nextChapterIndex);

    // Construct new block
    // We need to format it nicely
    let newBlock = "1: [ // Food\n";
    finalChapter1.forEach(level => {
        newBlock += `        { main: "${level.main}", targets: ${JSON.stringify(level.targets)}, data: ${JSON.stringify(level.data)} },\n`;
    });
    newBlock += "    ],\n    "; // Add indentation for next chapter

    // Replace
    // We replace from `startIndex` to `nextChapterIndex` (exclusive of 2:)
    // Wait, `nextChapterIndex` starts at `2:`.
    // So we replace `content.substring(startIndex, nextChapterIndex)` with `newBlock`.
    // But `newBlock` ends with indentation.

    // Let's be precise.
    // The file has:
    // 1: [ ...
    //     ...
    // ],
    // 2: [ ...

    // My `newBlock` should generate exactly that structure.

    const originalBlock = content.substring(startIndex, nextChapterIndex);
    // Remove the trailing whitespace/newlines from originalBlock to match exactly where 2 starts?
    // Actually, simply replacing the range is safer.

    const before = content.substring(0, startIndex);
    const after = content.substring(nextChapterIndex);

    content = before + newBlock + after;

    fs.writeFileSync(generatorPath, content);
    console.log("Replaced Chapter 1 with better food words.");
} else {
    console.error("Could not find Chapter 1 block.");
}
