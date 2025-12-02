const fs = require('fs');

const generatorPath = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/generate_advanced_levels.js';
let content = fs.readFileSync(generatorPath, 'utf8');

const perfectChapter1 = [
    { main: "KÖTTFÄRS", targets: ["KÖTTFÄRS", "KÖTT", "FÄRS", "FÄRSK", "SÖT"], data: { "KÖTTFÄRS": { t: "لحم مفروم", s: "Vi gör biffar av köttfärs.", st: "نصنع شرائح اللحم من اللحم المفروم." }, "KÖTT": { t: "لحم", s: "Jag äter inte kött.", st: "أنا لا آكل اللحم." }, "FÄRS": { t: "مفروم", s: "Stek färsen i pannan.", st: "اقلِ المفروم في المقلاة." }, "FÄRSK": { t: "طازج", s: "Färsk fisk är bäst.", st: "السمك الطازج هو الأفضل." }, "SÖT": { t: "حلو", s: "Kakan är väldigt söt.", st: "الكعكة حلوة جداً." } } },
    { main: "FRUKOST", targets: ["FRUKOST", "FRUKT", "TORSK", "OST"], data: { "FRUKOST": { t: "فطور", s: "Frukost är viktig.", st: "الفطور مهم." }, "FRUKT": { t: "فاكهة", s: "Ät mer frukt och grönt.", st: "تناول المزيد من الفاكهة والخضروات." }, "TORSK": { t: "قد", s: "Torsk är en vit fisk.", st: "القد سمكة بيضاء." }, "OST": { t: "جبن", s: "En smörgås med ost.", st: "شطيرة بالجبن." } } },
    { main: "FILMJÖLK", targets: ["FILMJÖLK", "FIL", "MJÖL", "MJÖLK", "LÖK"], data: { "FILMJÖLK": { t: "لبن رائب", s: "Filmjölk med flingor.", st: "لبن رائب مع رقائق الذرة." }, "FIL": { t: "لبن", s: "Jag tar en skål fil.", st: "سآخذ وعاء من اللبن." }, "MJÖL": { t: "طحين", s: "Sikta mjölet.", st: "انخل الطحين." }, "MJÖLK": { t: "حليب", s: "Kall mjölk är gott.", st: "الحليب البارد لذيذ." }, "LÖK": { t: "بصل", s: "Gul lök är stark.", st: "البصل الأصفر قوي." } } },
    { main: "ROSTBIFF", targets: ["ROSTBIFF", "BIFF", "RIS"], data: { "ROSTBIFF": { t: "روست بيف", s: "Rostbiff med potatissallad.", st: "روست بيف مع سلطة البطاطس." }, "BIFF": { t: "شريحة لحم", s: "En saftig biff.", st: "شريحة لحم عصارية." }, "RIS": { t: "أرز", s: "Vi äter kyckling med ris.", st: "نأكل الدجاج مع الأرز." } } },
    { main: "FALUKORV", targets: ["FALUKORV", "KORV", "KALV", "KOR"], data: { "FALUKORV": { t: "سجق فالو", s: "Falukorv i ugn.", st: "سجق فالو في الفرن." }, "KORV": { t: "سجق", s: "Grilla korv.", st: "اشوي السجق." }, "KALV": { t: "عجل", s: "Kalvkött är ljust.", st: "لحم العجل فاتح اللون." }, "KOR": { t: "أبقار", s: "Korna idisslar.", st: "الأبقار تجتر." } } },
    { main: "KÅLROT", targets: ["KÅLROT", "KÅL", "LÅR"], data: { "KÅLROT": { t: "لفت سويدي", s: "Rotmos görs på kålrot.", st: "يصنع هريس الجذور من اللفت السويدي." }, "KÅL": { t: "ملفوف", s: "Kålsoppa är billigt.", st: "حساء الملفوف رخيص." }, "LÅR": { t: "فخذ", s: "Kycklinglår i ugn.", st: "فخذ دجاج في الفرن." } } },
    { main: "MATRÄTT", targets: ["MATRÄTT", "MAT", "MÄTT", "ÄRT"], data: { "MATRÄTT": { t: "طبق", s: "Vilken är din favorit maträtt?", st: "ما هو طبقك المفضل؟" }, "MAT": { t: "طعام", s: "Vi behöver mat för att leva.", st: "نحتاج للطعام لنعيش." }, "MÄTT": { t: "شبعان", s: "Jag är proppmätt.", st: "أنا شبعان تماماً." }, "ÄRT": { t: "بازلاء", s: "Prinsessan på ärten.", st: "الأميرة وحبة البازلاء." } } },
    { main: "SMÖRGÅS", targets: ["SMÖRGÅS", "SMÖR", "SÅS", "RÅG"], data: { "SMÖRGÅS": { t: "شطيرة", s: "En smörgås med skinka.", st: "شطيرة باللحم." }, "SMÖR": { t: "زبدة", s: "Smöret smälter i pannan.", st: "الزبدة تذوب في المقلاة." }, "SÅS": { t: "صلصة", s: "Såsen är pricken över i.", st: "الصلصة هي اللمسة الأخيرة." }, "RÅG": { t: "شيلم", s: "Bröd bakat på råg.", st: "خبز مخبوز من الشيلم." } } },
    { main: "TUNNBRÖD", targets: ["TUNNBRÖD", "BRÖD", "NÖT", "ÖRT"], data: { "TUNNBRÖD": { t: "خبز رقيق", s: "Tunnbröd med lax.", st: "خبز رقيق مع السلمون." }, "BRÖD": { t: "خبز", s: "Färskt bröd doftar gott.", st: "الخبز الطازج له رائحة طيبة." }, "NÖT": { t: "جوز", s: "En hård nöt att knäcka.", st: "جوزة صعبة الكسر." }, "ÖRT": { t: "عشبة", s: "Färska örter i maten.", st: "أعشاب طازجة في الطعام." } } },
    { main: "APRIKOS", targets: ["APRIKOS", "SKORPA", "RAPS", "SIK"], data: { "APRIKOS": { t: "مشمش", s: "Torkad aprikos är godis.", st: "المشمش المجفف مثل الحلوى." }, "SKORPA": { t: "قسماط", s: "Doppa en skorpa i kaffet.", st: "غمس قطعة قسماط في القهوة." }, "RAPS": { t: "لفت", s: "Gula fält av raps.", st: "حقول صفراء من اللفت." }, "SIK": { t: "سمك السيك", s: "Rökt sik är en delikatess.", st: "السيك المدخن طعام شهي." } } }
];

// Find the start and end of Chapter 1 in the file
const startMarker = "1: [ // Food";
const nextChapterMarker = "2: [ // Nature";

const startIndex = content.indexOf(startMarker);
const nextChapterIndex = content.indexOf(nextChapterMarker);

if (startIndex !== -1 && nextChapterIndex !== -1) {
    // Construct new block
    let newBlock = "1: [ // Food\n";
    perfectChapter1.forEach(level => {
        newBlock += `        { main: "${level.main}", targets: ${JSON.stringify(level.targets)}, data: ${JSON.stringify(level.data)} },\n`;
    });
    newBlock += "    ],\n    "; // Add indentation for next chapter

    const before = content.substring(0, startIndex);
    const after = content.substring(nextChapterIndex);

    content = before + newBlock + after;

    fs.writeFileSync(generatorPath, content);
    console.log("Replaced Chapter 1 with PERFECT food levels.");
} else {
    console.error("Could not find Chapter 1 block.");
}
