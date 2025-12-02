const fs = require('fs');

const generatorPath = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/generate_advanced_levels.js';
let content = fs.readFileSync(generatorPath, 'utf8');

const structuredChapter4 = [
    // Levels 1-3: 2 words, Length 3-4
    { main: "VÄGG", targets: ["VÄGG", "ÄGG"], data: { "VÄGG": { t: "جدار", s: "Tavlan hänger på väggen.", st: "اللوحة معلقة على الجدار." }, "ÄGG": { t: "بيض", s: "Hönan lägger ägg.", st: "الدجاجة تبيض." } } },
    { main: "BORD", targets: ["BORD", "BRO", "ORD"], data: { "BORD": { t: "طاولة", s: "Maten står på bordet.", st: "الطعام على الطاولة." }, "BRO": { t: "جسر", s: "Vi går över en bro.", st: "نعبر جسراً." }, "ORD": { t: "كلمة", s: "Ett ord kan betyda mycket.", st: "كلمة واحدة قد تعني الكثير." } } },
    { main: "LJUS", targets: ["LJUS", "JUL", "SJU"], data: { "LJUS": { t: "ضوء / شمعة", s: "Tänd ett ljus.", st: "أشعل شمعة." }, "JUL": { t: "عيد الميلاد", s: "God jul!", st: "عيد ميلاد مجيد!" }, "SJU": { t: "سبعة", s: "Veckan har sju dagar.", st: "الأسبوع فيه سبعة أيام." } } },

    // Levels 4-6: 3 words, Length 4-5
    { main: "TENTA", targets: ["TENTA", "ETT", "NATT"], data: { "TENTA": { t: "امتحان", s: "Jag har en tenta imorgon.", st: "لدي امتحان غداً." }, "ETT": { t: "واحد", s: "Jag har ett äpple.", st: "لدي تفاحة واحدة." }, "NATT": { t: "ليل", s: "God natt!", st: "تصبح على خير!" } } },
    { main: "GENOM", targets: ["GENOM", "GEM", "MEN"], data: { "GENOM": { t: "عبر / خلال", s: "Vi gick genom skogen.", st: "مشينا عبر الغابة." }, "GEM": { t: "مشبك ورق", s: "Håll ihop pappren med ett gem.", st: "امسك الأوراق بمشبك ورق." }, "MEN": { t: "لكن", s: "Jag vill, men kan inte.", st: "أريد، لكن لا أستطيع." } } },
    { main: "TORKA", targets: ["TORKA", "TAK", "KAR"], data: { "TORKA": { t: "يجفف", s: "Häng tvätten på tork.", st: "علق الغسيل ليجف." }, "TAK": { t: "سقف", s: "Taket läcker.", st: "السقف يسرب." }, "KAR": { t: "حوض", s: "Ett kar med vatten.", st: "حوض به ماء." } } },

    // Levels 7-9: 4 words, Length 5-6
    { main: "GARDIN", targets: ["GARDIN", "GRIND", "RINGA", "DAG"], data: { "GARDIN": { t: "ستارة", s: "Dra för gardinen.", st: "أغلق الستارة." }, "GRIND": { t: "بوابة", s: "Stäng grinden efter dig.", st: "أغلق البوابة خلفك." }, "RINGA": { t: "يتصل", s: "Jag ska ringa dig.", st: "سأتصل بك." }, "DAG": { t: "يوم", s: "En vacker dag.", st: "يوم جميل." } } },
    { main: "TALANG", targets: ["TALANG", "ALTAN", "ANA", "GATA"], data: { "TALANG": { t: "موهبة", s: "Han har stor talang.", st: "لديه موهبة كبيرة." }, "ALTAN": { t: "شرفة", s: "Vi sitter på altanen.", st: "نجلس في الشرفة." }, "ANA": { t: "يشك / يظن", s: "Jag anar oråd.", st: "أنا أشك في الأمر." }, "GATA": { t: "شارع", s: "Vi bor på samma gata.", st: "نسكن في نفس الشارع." } } },
    { main: "SPEGEL", targets: ["SPEGEL", "SPEL", "SE", "SEG"], data: { "SPEGEL": { t: "مرآة", s: "Titta dig i spegeln.", st: "انظر إلى نفسك في المرآة." }, "SPEL": { t: "لعبة", s: "Det är bara ett spel.", st: "إنها مجرد لعبة." }, "SE": { t: "يرى", s: "Jag kan se dig.", st: "أستطيع رؤيتك." }, "SEG": { t: "قاسي / لزج", s: "Köttet var segt.", st: "كان اللحم قاسياً." } } },

    // Level 10: 5 words, Length 4-7
    { main: "FÖNSTER", targets: ["FÖNSTER", "FÖR", "FÖRE", "FEST", "RÖST"], data: { "FÖNSTER": { t: "نافذة", s: "Öppna ett fönster.", st: "افتح نافذة." }, "FÖR": { t: "لأجل / جداً", s: "Det är för varmt.", st: "الجو حار جداً." }, "FÖRE": { t: "قبل", s: "Kom före klockan åtta.", st: "تعال قبل الساعة الثامنة." }, "FEST": { t: "حفلة", s: "Vi ska på fest.", st: "سنذهب إلى حفلة." }, "RÖST": { t: "صوت", s: "Hon har en fin röst.", st: "لديها صوت جميل." } } }
];

// Find the start and end of Chapter 4 in the file
const startMarker = "4: [ // Daily";
const nextChapterMarker = "5: [ // Health";

const startIndex = content.indexOf(startMarker);
const nextChapterIndex = content.indexOf(nextChapterMarker);

if (startIndex !== -1 && nextChapterIndex !== -1) {
    // Construct new block
    let newBlock = "4: [ // Daily\n";
    structuredChapter4.forEach(level => {
        newBlock += `        { main: "${level.main}", targets: ${JSON.stringify(level.targets)}, data: ${JSON.stringify(level.data)} },\n`;
    });
    newBlock += "    ],\n    "; // Add indentation for next chapter

    const before = content.substring(0, startIndex);
    const after = content.substring(nextChapterIndex);

    content = before + newBlock + after;

    fs.writeFileSync(generatorPath, content);
    console.log("Replaced Chapter 4 with STRUCTURED perfect daily/home levels.");
} else {
    console.error("Could not find Chapter 4 block.");
}
