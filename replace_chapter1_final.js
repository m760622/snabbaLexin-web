const fs = require('fs');

const generatorPath = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/generate_advanced_levels.js';
let content = fs.readFileSync(generatorPath, 'utf8');

const finalChapter1 = [
    { main: "MJÖLK", targets: ["MJÖLK", "MJÖL", "LÖK", "KÖL"], data: { "MJÖLK": { t: "حليب", s: "Jag dricker ett glas mjölk.", st: "أشرب كوباً من الحليب." }, "MJÖL": { t: "طحين", s: "Vi behöver mjöl för att baka.", st: "نحتاج الطحين للخبز." }, "LÖK": { t: "بصل", s: "Hacka lök till såsen.", st: "افرم البصل للصلصة." }, "KÖL": { t: "عارضة", s: "Båtens köl slog i botten.", st: "اصطدمت عارضة القارب بالقاع." } } },
    { main: "FISK", targets: ["FISK", "SIK", "FIK"], data: { "FISK": { t: "سمك", s: "Vi äter fisk en gång i veckan.", st: "نأكل السمك مرة في الأسبوع." }, "SIK": { t: "سمك السيك", s: "Sik är en god matfisk.", st: "السيك سمكة صالحة للأكل ولذيذة." }, "FIK": { t: "مقهى", s: "Vi träffas på ett fik.", st: "نلتقي في مقهى." } } },
    { main: "SKÅL", targets: ["SKÅL", "KÅL", "LÅS"], data: { "SKÅL": { t: "وعاء", s: "Häll soppan i en skål.", st: "صب الحساء في وعاء." }, "KÅL": { t: "ملفوف", s: "Kål är nyttigt och gott.", st: "الملفوف صحي ولذيذ." }, "LÅS": { t: "قفل", s: "Sätt ett lås på dörren.", st: "ضع قفلاً على الباب." } } },
    { main: "GRÖT", targets: ["GRÖT", "ÖRT", "GÖR"], data: { "GRÖT": { t: "عصيدة", s: "Jag äter gröt till frukost.", st: "آكل العصيدة للفطور." }, "ÖRT": { t: "عشبة", s: "Timjan är en doftande ört.", st: "الزعتر عشبة فواحة." }, "GÖR": { t: "يفعل", s: "Vad gör du?", st: "ماذا تفعل؟" } } },
    { main: "BLÅBÄR", targets: ["BLÅBÄR", "BÄR", "BÅL"], data: { "BLÅBÄR": { t: "توت أزرق", s: "Vi plockar blåbär i skogen.", st: "نقطف التوت الأزرق في الغابة." }, "BÄR": { t: "توت", s: "Skogen är full av bär.", st: "الغابة مليئة بالتوت." }, "BÅL": { t: "جذع", s: "Han har en stark bål.", st: "لديه جذع قوي." } } },
    { main: "KAKOR", targets: ["KAKOR", "KAKA", "KOK", "RAK"], data: { "KAKOR": { t: "كعك", s: "Mormor bakar goda kakor.", st: "الجدة تخبز كعكاً لذيذاً." }, "KAKA": { t: "كعكة", s: "Vill du ha en kaka?", st: "هل تريد كعكة؟" }, "KOK": { t: "غليان", s: "Vattnet är i kok.", st: "الماء يغلي." }, "RAK": { t: "مستقيم", s: "En rak väg.", st: "طريق مستقيم." } } },
    { main: "OSTAR", targets: ["OSTAR", "OST", "ROS", "RAS"], data: { "OSTAR": { t: "أجبان", s: "Vi provade många olika ostar.", st: "جربنا العديد من الأجبان المختلفة." }, "OST": { t: "جبن", s: "Jag älskar ost.", st: "أنا أحب الجبن." }, "ROS": { t: "وردة", s: "Ingen ros utan taggar.", st: "لا وردة بدون أشواك." }, "RAS": { t: "انهيار", s: "Rasrisk i bergen.", st: "خطر الانهيار في الجبال." } } },
    { main: "KORV", targets: ["KORV", "KOR", "ORK"], data: { "KORV": { t: "سجق", s: "Korv med bröd är gott.", st: "السجق مع الخبز لذيذ." }, "KOR": { t: "أبقار", s: "Korna betar.", st: "الأبقار ترعى." }, "ORK": { t: "طاقة", s: "Jag har ingen ork.", st: "ليس لدي طاقة." } } },
    { main: "SILL", targets: ["SILL", "SIL"], data: { "SILL": { t: "رنجة", s: "Inlagd sill till jul.", st: "رنجة مخللة لعيد الميلاد." }, "SIL": { t: "مصفاة", s: "Använd en sil.", st: "استخدم مصفاة." } } },
    { main: "BULLAR", targets: ["BULLAR", "RULLA", "BUR"], data: { "BULLAR": { t: "كعك", s: "Nygräddade bullar.", st: "كعك طازج." }, "RULLA": { t: "يدحرج", s: "Rulla en boll.", st: "دحرج كرة." }, "BUR": { t: "قفص", s: "Fågeln i sin bur.", st: "الطائر في قفصه." } } }
];

// Find the start and end of Chapter 1 in the file
const startMarker = "1: [ // Food";
const nextChapterMarker = "2: [ // Nature";

const startIndex = content.indexOf(startMarker);
const nextChapterIndex = content.indexOf(nextChapterMarker);

if (startIndex !== -1 && nextChapterIndex !== -1) {
    // Construct new block
    let newBlock = "1: [ // Food\n";
    finalChapter1.forEach(level => {
        newBlock += `        { main: "${level.main}", targets: ${JSON.stringify(level.targets)}, data: ${JSON.stringify(level.data)} },\n`;
    });
    newBlock += "    ],\n    "; // Add indentation for next chapter

    const before = content.substring(0, startIndex);
    const after = content.substring(nextChapterIndex);

    content = before + newBlock + after;

    fs.writeFileSync(generatorPath, content);
    console.log("Replaced Chapter 1 with FINAL pure food words.");
} else {
    console.error("Could not find Chapter 1 block.");
}
