const fs = require('fs');

const generatorPath = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/generate_advanced_levels.js';
let content = fs.readFileSync(generatorPath, 'utf8');

const replacements = [
    {
        // 4-1: VÄGG -> Remove VÄG
        find: '{ main: "VÄGG", targets: ["VÄGG", "VÄG", "ÄGG"], data: { "VÄGG": { t: "جدار", s: "Tavlan hänger på väggen.", st: "اللوحة معلقة على الجدار." }, "VÄG": { t: "طريق", s: "Vi kör på en smal väg.", st: "نقود في طريق ضيق." }, "ÄGG": { t: "بيض", s: "Hönan lägger ägg.", st: "الدجاجة تبيض." } } }',
        replace: '{ main: "VÄGG", targets: ["VÄGG", "ÄGG"], data: { "VÄGG": { t: "جدار", s: "Tavlan hänger på väggen.", st: "اللوحة معلقة على الجدار." }, "ÄGG": { t: "بيض", s: "Hönan lägger ägg.", st: "الدجاجة تبيض." } } }'
    },
    {
        // 4-8: TALANG -> Replace LAG with GAL
        find: '{ main: "TALANG", targets: ["TALANG", "ALTAN", "LAG", "GATA"], data: { "TALANG": { t: "موهبة", s: "Han har stor talang.", st: "لديه موهبة كبيرة." }, "ALTAN": { t: "شرفة", s: "Vi sitter på altanen.", st: "نجلس في الشرفة." }, "LAG": { t: "فريق / قانون", s: "Vårt lag vann matchen.", st: "فاز فريقنا بالمباراة." }, "GATA": { t: "شارع", s: "Vi bor på samma gata.", st: "نسكن في نفس الشارع." } } }',
        replace: '{ main: "TALANG", targets: ["TALANG", "ALTAN", "GAL", "GATA"], data: { "TALANG": { t: "موهبة", s: "Han har stor talang.", st: "لديه موهبة كبيرة." }, "ALTAN": { t: "شرفة", s: "Vi sitter på altanen.", st: "نجلس في الشرفة." }, "GAL": { t: "صاح", s: "Tuppen gal tidigt.", st: "صاح الديك مبكراً." }, "GATA": { t: "شارع", s: "Vi bor på samma gata.", st: "نسكن في نفس الشارع." } } }'
    },
    {
        // 4-6: TORKA -> Replace TRO with ARK
        find: '{ main: "TORKA", targets: ["TORKA", "TAK", "TRO"], data: { "TORKA": { t: "يجفف", s: "Häng tvätten på tork.", st: "علق الغسيل ليجف." }, "TAK": { t: "سقف", s: "Taket läcker.", st: "السقف يسرب." }, "TRO": { t: "يعتقد / إيمان", s: "Jag tror på dig.", st: "أنا أؤمن بك." } } }',
        replace: '{ main: "TORKA", targets: ["TORKA", "TAK", "ARK"], data: { "TORKA": { t: "يجفف", s: "Häng tvätten på tork.", st: "علق الغسيل ليجف." }, "TAK": { t: "سقف", s: "Taket läcker.", st: "السقف يسرب." }, "ARK": { t: "ورقة", s: "Ett ark papper.", st: "ورقة واحدة." } } }'
    }
];

let modified = false;
replacements.forEach(rep => {
    if (content.includes(rep.find)) {
        content = content.replace(rep.find, rep.replace);
        modified = true;
        console.log(`Applied fix for ${rep.find.substring(0, 20)}...`);
    } else {
        console.error(`Could not find block for ${rep.find.substring(0, 20)}...`);
    }
});

if (modified) {
    fs.writeFileSync(generatorPath, content);
    console.log("Fixed duplicates in Chapter 4.");
}
