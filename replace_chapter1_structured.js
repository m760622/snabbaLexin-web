const fs = require('fs');

const generatorPath = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/generate_advanced_levels.js';
let content = fs.readFileSync(generatorPath, 'utf8');

const structuredChapter1 = [
    // Levels 1-3: 2 words, Length 3-4
    { main: "SKÅL", targets: ["SKÅL", "KÅL"], data: { "SKÅL": { t: "وعاء", s: "Häll soppan i en skål.", st: "صب الحساء في وعاء." }, "KÅL": { t: "ملفوف", s: "Kål är nyttigt.", st: "الملفوف صحي." } } },
    { main: "FISK", targets: ["FISK", "SIK"], data: { "FISK": { t: "سمك", s: "Vi äter fisk.", st: "نحن نأكل السمك." }, "SIK": { t: "سمك السيك", s: "Sik är en god matfisk.", st: "السيك سمكة صالحة للأكل ولذيذة." } } },
    { main: "GRÖT", targets: ["GRÖT", "ÖRT"], data: { "GRÖT": { t: "عصيدة", s: "Jag äter gröt till frukost.", st: "آكل العصيدة للفطور." }, "ÖRT": { t: "عشبة", s: "Timjan är en doftande ört.", st: "الزعتر عشبة فواحة." } } },

    // Levels 4-6: 3 words, Length 4-5
    { main: "MJÖLK", targets: ["MJÖLK", "MJÖL", "LÖK"], data: { "MJÖLK": { t: "حليب", s: "Jag dricker ett glas mjölk.", st: "أشرب كوباً من الحليب." }, "MJÖL": { t: "طحين", s: "Vi behöver mjöl för att baka.", st: "نحتاج الطحين للخبز." }, "LÖK": { t: "بصل", s: "Hacka lök till såsen.", "st": "افرم البصل للصلصة." } } },
    { main: "TORSK", targets: ["TORSK", "OST", "KOR"], data: { "TORSK": { t: "سمك القد", s: "Torsk är en vit fisk.", st: "القد سمكة بيضاء." }, "OST": { t: "جبن", s: "Jag älskar ost.", st: "أنا أحب الجبن." }, "KOR": { t: "أبقار", s: "Korna betar på ängen.", st: "الأبقار ترعى في المرج." } } },
    { main: "BÄREN", targets: ["BÄREN", "BÄR", "BEN"], data: { "BÄREN": { t: "التوت", s: "Bären är mogna nu.", st: "التوت ناضج الآن." }, "BÄR": { t: "توت", s: "Skogen är full av bär.", st: "الغابة مليئة بالتوت." }, "BEN": { t: "عظم", s: "Hunden gnager på ett ben.", st: "الكلب يقضم عظماً." } } },

    // Levels 7-9: 4 words, Length 5-6
    { main: "PASTA", targets: ["PASTA", "FAT", "ASP", "TAS"], data: { "PASTA": { t: "معكرونة", s: "Vi äter pasta idag.", st: "نأكل المعكرونة اليوم." }, "FAT": { t: "طبق", s: "Lägg maten på ett fat.", st: "ضع الطعام على طبق." }, "ASP": { t: "حور رجراج", s: "Löven på en asp darrar.", st: "أوراق الحور الرجراج ترتجف." }, "TAS": { t: "يؤخذ", s: "Provet tas på morgonen.", st: "تؤخذ العينة في الصباح." } } },
    { main: "ÄRTOR", targets: ["ÄRTOR", "ÄRT", "RÖR", "ÖRA"], data: { "ÄRTOR": { t: "بازلاء", s: "Gröna ärtor.", st: "بازلاء خضراء." }, "ÄRT": { t: "بازلاء", s: "Prinsessan på ärten.", st: "الأميرة وحبة البازلاء." }, "RÖR": { t: "أنبوب", s: "Vattnet rinner i rör.", st: "الماء يجري في الأنابيب." }, "ÖRA": { t: "أذن", s: "Jag har ont i mitt öra.", st: "أذني تؤلمني." } } },
    { main: "KAKOR", targets: ["KAKOR", "KAKA", "KOK", "RO"], data: { "KAKOR": { t: "كعك", s: "Mormor bakar goda kakor.", st: "الجدة تخبز كعكاً لذيذاً." }, "KAKA": { t: "كعكة", s: "Vill du ha en kaka?", st: "هل تريد كعكة؟" }, "KOK": { t: "غليان", s: "Vattnet är i kok.", st: "الماء يغلي." }, "RO": { t: "هدوء", s: "Jag vill ha lugn och ro.", st: "أريد الهدوء والسكينة." } } },

    // Level 10: 5 words, Length 4-7
    { main: "KÖTTFÄRS", targets: ["KÖTTFÄRS", "KÖTT", "FÄRS", "FÄRSK", "SÖT"], data: { "KÖTTFÄRS": { t: "لحم مفروم", s: "Vi gör biffar av köttfärs.", st: "نصنع شرائح اللحم من اللحم المفروم." }, "KÖTT": { t: "لحم", s: "Jag äter inte kött.", st: "أنا لا آكل اللحم." }, "FÄRS": { t: "مفروم", s: "Stek färsen i pannan.", st: "اقلِ المفروم في المقلاة." }, "FÄRSK": { t: "طازج", s: "Färsk fisk är bäst.", st: "السمك الطازج هو الأفضل." }, "SÖT": { t: "حلو", s: "Kakan är väldigt söt.", st: "الكعكة حلوة جداً." } } }
];

// Find the start and end of Chapter 1 in the file
const startMarker = "1: [ // Food";
const nextChapterMarker = "2: [ // Nature";

const startIndex = content.indexOf(startMarker);
const nextChapterIndex = content.indexOf(nextChapterMarker);

if (startIndex !== -1 && nextChapterIndex !== -1) {
    // Construct new block
    let newBlock = "1: [ // Food\n";
    structuredChapter1.forEach(level => {
        newBlock += `        { main: "${level.main}", targets: ${JSON.stringify(level.targets)}, data: ${JSON.stringify(level.data)} },\n`;
    });
    newBlock += "    ],\n    "; // Add indentation for next chapter

    const before = content.substring(0, startIndex);
    const after = content.substring(nextChapterIndex);

    content = before + newBlock + after;

    fs.writeFileSync(generatorPath, content);
    console.log("Replaced Chapter 1 with STRUCTURED perfect food levels.");
} else {
    console.error("Could not find Chapter 1 block.");
}
