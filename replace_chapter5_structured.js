const fs = require('fs');

const generatorPath = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/generate_advanced_levels.js';
let content = fs.readFileSync(generatorPath, 'utf8');

const structuredChapter5 = [
    // Levels 1-3: 2 words, Length 3-4
    { main: "TAND", targets: ["TAND", "DNA"], data: { "TAND": { t: "سن", s: "Jag har ont i en tand.", st: "لدي ألم في سن." }, "DNA": { t: "حمض نووي", s: "DNA finns i alla celler.", st: "الحمض النووي موجود في كل الخلايا." } } },
    { main: "TARM", targets: ["TARM", "ARM"], data: { "TARM": { t: "أمعاء", s: "Tarmen är lång.", st: "الأمعاء طويلة." }, "ARM": { t: "ذراع", s: "Han bröt sin arm.", st: "كسر ذراعه." } } },
    { main: "PULS", targets: ["PULS", "LUS"], data: { "PULS": { t: "نبض", s: "Känn din puls.", st: "تحسس نبضك." }, "LUS": { t: "قملة", s: "En lus i håret.", st: "قملة في الشعر." } } },

    // Levels 4-6: 3 words, Length 4-5
    { main: "HÄLSA", targets: ["HÄLSA", "HÄL", "HALS"], data: { "HÄLSA": { t: "صحة", s: "Hälsa är viktigt.", st: "الصحة مهمة." }, "HÄL": { t: "كعب", s: "Jag har ont i hälen.", st: "لدي ألم في الكعب." }, "HALS": { t: "حلق / رقبة", s: "Hon har ett halsband runt halsen.", st: "لديها قلادة حول رقبتها." } } },
    { main: "KRAMP", targets: ["KRAMP", "KRAM", "KAM"], data: { "KRAMP": { t: "تشنج", s: "Jag fick kramp i benet.", st: "أصبت بتشنج في ساقي." }, "KRAM": { t: "عناق", s: "Ge mig en kram.", st: "اعطني عناقاً." }, "KAM": { t: "مشط", s: "Kamma håret med en kam.", st: "مشط شعرك بمشط." } } },
    { main: "FEBER", targets: ["FEBER", "BRE", "BER"], data: { "FEBER": { t: "حمى", s: "Barnet har hög feber.", st: "الطفل لديه حمى عالية." }, "BRE": { t: "يدهن", s: "Bre smör på brödet.", st: "ادهن الزبدة على الخبز." }, "BER": { t: "يصلي / يطلب", s: "Han ber till Gud.", st: "هو يصلي لله." } } },

    // Levels 7-9: 4 words, Length 5-6
    { main: "GRAVID", targets: ["GRAVID", "GRAV", "GAV", "VAD"], data: { "GRAVID": { t: "حامل", s: "Hon är gravid i femte månaden.", st: "هي حامل في الشهر الخامس." }, "GRAV": { t: "قبر", s: "Lägg blommor på graven.", st: "ضع الزهور على القبر." }, "GAV": { t: "أعطى", s: "Han gav mig en present.", st: "أعطاني هدية." }, "VAD": { t: "بطة الساق / ماذا", s: "Jag har ont i vaden.", st: "لدي ألم في بطة الساق." } } },
    { main: "HANDLED", targets: ["HANDLED", "HAND", "ANDE", "LED"], data: { "HANDLED": { t: "معصم", s: "Jag stukade handleden.", st: "لويت معصمي." }, "HAND": { t: "يد", s: "Tvätta händerna.", st: "اغسل يديك." }, "ANDE": { t: "روح", s: "Anden i flaskan.", st: "الجني في الزجاجة." }, "LED": { t: "مفصل / طرييق", s: "Jag har ont i en led.", st: "لدي ألم في مفصل." } } },
    { main: "RECEPT", targets: ["RECEPT", "PET", "MER", "ER"], data: { "RECEPT": { t: "وصفة طبية", s: "Läkaren skrev ett recept.", st: "كتب الطبيب وصفة طبية." }, "PET": { t: "نكز", s: "En lätt pet i sidan.", st: "نكزة خفيفة في الجانب." }, "MER": { t: "أكثر", s: "Jag vill ha mer mat.", st: "أريد المزيد من الطعام." }, "ER": { t: "أنتم / لكم", s: "Boken tillhör er.", st: "الكتاب ملك لكم." } } },

    // Level 10: 5 words, Length 4-7
    { main: "SJUKDOM", targets: ["SJUKDOM", "SJUK", "KOS", "MUS", "SUM"], data: { "SJUKDOM": { t: "مرض", s: "Cancer är en svår sjukdom.", st: "السرطان مرض صعب." }, "SJUK": { t: "مريض", s: "Jag är sjuk idag.", st: "أنا مريض اليوم." }, "KOS": { t: "رحيل", s: "Han drog sin kos.", st: "لقد رحل." }, "MUS": { t: "فأر", s: "Katten fångade en mus.", st: "أمسكت القطة فأراً." }, "SUM": { t: "مجموع", s: "En stor summa pengar.", st: "مبلغ كبير من المال." } } }
];

// Find the start and end of Chapter 5 in the file
const startMarker = "5: [ // Health";
const nextChapterMarker = "6: [ // Work";

const startIndex = content.indexOf(startMarker);
const nextChapterIndex = content.indexOf(nextChapterMarker);

if (startIndex !== -1 && nextChapterIndex !== -1) {
    // Construct new block
    let newBlock = "5: [ // Health\n";
    structuredChapter5.forEach(level => {
        newBlock += `        { main: "${level.main}", targets: ${JSON.stringify(level.targets)}, data: ${JSON.stringify(level.data)} },\n`;
    });
    newBlock += "    ],\n    "; // Add indentation for next chapter

    const before = content.substring(0, startIndex);
    const after = content.substring(nextChapterIndex);

    content = before + newBlock + after;

    fs.writeFileSync(generatorPath, content);
    console.log("Replaced Chapter 5 with STRUCTURED perfect body/health levels.");
} else {
    console.error("Could not find Chapter 5 block.");
}
