const fs = require('fs');

const generatorPath = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/generate_advanced_levels.js';
let content = fs.readFileSync(generatorPath, 'utf8');

const perfectChapter2 = [
    { main: "SMULTRON", targets: ["SMULTRON", "SOL", "MUS", "MOLN"], data: { "SMULTRON": { t: "فراولة برية", s: "Smultron är sommarens bär.", st: "الفراولة البرية هي توت الصيف." }, "SOL": { t: "شمس", s: "Solen värmer skönt.", st: "الشمس تدفئ بشكل لطيف." }, "MUS": { t: "فأر", s: "En liten mus i gräset.", st: "فأر صغير في العشب." }, "MOLN": { t: "سحابة", s: "Ett vitt moln på himlen.", st: "سحابة بيضاء في السماء." } } },
    { main: "HALVÖ", targets: ["HALVÖ", "HAV", "LAV", "LÖV", "VAL"], data: { "HALVÖ": { t: "شبه جزيرة", s: "Vi bor på en halvö.", st: "نعيش i شبه جزيرة." }, "HAV": { t: "بحر", s: "Havet är djupt.", st: "البحر عميق." }, "LAV": { t: "أشنة", s: "Lavar växer på stenar.", st: "الأشنات تنمو على الصخور." }, "LÖV": { t: "ورقة شجر", s: "Löven faller på hösten.", st: "أوراق الشجر تتساقط في الخريف." }, "VAL": { t: "حوت", s: "En stor val i havet.", st: "حوت كبير في البحر." } } },
    { main: "HJORTRON", targets: ["HJORTRON", "HJORT", "ROT", "NORR"], data: { "HJORTRON": { t: "توت العليق", s: "Hjortron kallas skogens guld.", st: "يسمى توت العليق ذهب الغابة." }, "HJORT": { t: "أيل", s: "En hjort stod i skogsbrynet.", st: "وقف أيل عند حافة الغابة." }, "ROT": { t: "جذر", s: "Trädets rot är stark.", st: "جذر الشجرة قوي." }, "NORR": { t: "شمال", s: "Vi åker norr ut.", st: "نسافر نحو الشمال." } } },
    { main: "STORMIG", targets: ["STORMIG", "STORM", "STIG", "ORM"], data: { "STORMIG": { t: "عاصف", s: "Det var en stormig natt.", st: "كانت ليلة عاصفة." }, "STORM": { t: "عاصفة", s: "Stormen fällde många träd.", st: "أسقطت العاصفة العديد من الأشجار." }, "STIG": { t: "مسار", s: "En smal stig genom skogen.", st: "مسار ضيق عبر الغابة." }, "ORM": { t: "ثعبان", s: "Akta dig för ormen.", st: "احذر من الثعبان." } } },
    { main: "MAKRILL", targets: ["MAKRILL", "MARK", "MAL"], data: { "MAKRILL": { t: "إسقمري", s: "Rökt makrill är gott.", st: "الإسقمري المدخن لذيذ." }, "MARK": { t: "أرض", s: "Sitta på marken.", st: "الجلوس على الأرض." }, "MAL": { t: "سمك السلور", s: "Malen är en stor fisk.", st: "السلور سمكة كبيرة." } } },
    { main: "STENAR", targets: ["STENAR", "STEN", "ENAR", "REN"], data: { "STENAR": { t: "أحجار", s: "Kasta inte stenar.", st: "لا ترمِ الحجارة." }, "STEN": { t: "حجر", s: "En hård sten.", st: "حجر صلب." }, "ENAR": { t: "عرعر", s: "Enar doftar gott.", st: "العرعر له رائحة طيبة." }, "REN": { t: "رنة", s: "Renar har horn.", st: "الرنة لها قرون." } } },
    { main: "GLÄNTA", targets: ["GLÄNTA", "ÄLG", "ÄNG"], data: { "GLÄNTA": { t: "فسحة", s: "En solig glänta i skogen.", st: "فسحة مشمسة في الغابة." }, "ÄLG": { t: "موس", s: "Skogens konung är älgen.", st: "ملك الغابة هو الموس." }, "ÄNG": { t: "مرج", s: "Blommor på en äng.", st: "زهور في المرج." } } },
    { main: "STRAND", targets: ["STRAND", "SAND", "AND"], data: { "STRAND": { t: "شاطئ", s: "Vi badar vid stranden.", st: "نسبح عند الشاطئ." }, "SAND": { t: "رمل", s: "Vit sand mellan tårna.", st: "رمل أبيض بين أصابع القدم." }, "AND": { t: "بطة", s: "En and simmar i dammen.", st: "بطة تسبح في البركة." } } },
    { main: "BJÖRNBÄR", targets: ["BJÖRNBÄR", "BJÖRN", "ÖRN"], data: { "BJÖRNBÄR": { t: "توت العليق الأسود", s: "Svarta björnbär.", st: "توت عليق أسود." }, "BJÖRN": { t: "دب", s: "Björnen sover i idet.", st: "الدب ينام في السبات." }, "ÖRN": { t: "نسر", s: "Örnen flyger högt.", st: "النسر يطير عالياً." } } },
    { main: "SPINDEL", targets: ["SPINDEL", "LIND", "PIL", "IS"], data: { "SPINDEL": { t: "عنكبوت", s: "Spindeln väver sitt nät.", st: "العنكبوت ينسج شبكته." }, "LIND": { t: "زيزفون", s: "Ett gammalt lindträd.", st: "شجرة زيزفون قديمة." }, "PIL": { t: "صفصاف", s: "Pilen hänger över vattnet.", st: "الصفصاف يتدلى فوق الماء." }, "IS": { t: "جليد", s: "Isen ligger blank.", st: "الجليد يلمع." } } }
];

// Find the start and end of Chapter 2 in the file
const startMarker = "2: [ // Nature";
const nextChapterMarker = "3: [ // Travel";

const startIndex = content.indexOf(startMarker);
const nextChapterIndex = content.indexOf(nextChapterMarker);

if (startIndex !== -1 && nextChapterIndex !== -1) {
    // Construct new block
    let newBlock = "2: [ // Nature\n";
    perfectChapter2.forEach(level => {
        newBlock += `        { main: "${level.main}", targets: ${JSON.stringify(level.targets)}, data: ${JSON.stringify(level.data)} },\n`;
    });
    newBlock += "    ],\n    "; // Add indentation for next chapter

    const before = content.substring(0, startIndex);
    const after = content.substring(nextChapterIndex);

    content = before + newBlock + after;

    fs.writeFileSync(generatorPath, content);
    console.log("Replaced Chapter 2 with PERFECT nature levels.");
} else {
    console.error("Could not find Chapter 2 block.");
}
