const fs = require('fs');

const generatorPath = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/generate_advanced_levels.js';
let content = fs.readFileSync(generatorPath, 'utf8');

const replacements = [
    {
        // 4-8: TALANG -> Replace GAL with LAGA
        find: '{ main: "TALANG", targets: ["TALANG", "ALTAN", "GAL", "GATA"], data: { "TALANG": { t: "موهبة", s: "Han har stor talang.", st: "لديه موهبة كبيرة." }, "ALTAN": { t: "شرفة", s: "Vi sitter på altanen.", st: "نجلس في الشرفة." }, "GAL": { t: "صاح", s: "Tuppen gal tidigt.", st: "صاح الديك مبكراً." }, "GATA": { t: "شارع", s: "Vi bor på samma gata.", st: "نسكن في نفس الشارع." } } }',
        replace: '{ main: "TALANG", targets: ["TALANG", "ALTAN", "LAGA", "GATA"], data: { "TALANG": { t: "موهبة", s: "Han har stor talang.", st: "لديه موهبة كبيرة." }, "ALTAN": { t: "شرفة", s: "Vi sitter på altanen.", st: "نجلس في الشرفة." }, "LAGA": { t: "يطبخ / يصلح", s: "Vi ska laga mat.", st: "سنطبخ الطعام." }, "GATA": { t: "شارع", s: "Vi bor på samma gata.", st: "نسكن في نفس الشارع." } } }'
    },
    {
        // 4-6: TORKA -> Replace ARK with KAR
        find: '{ main: "TORKA", targets: ["TORKA", "TAK", "ARK"], data: { "TORKA": { t: "يجفف", s: "Häng tvätten på tork.", st: "علق الغسيل ليجف." }, "TAK": { t: "سقف", s: "Taket läcker.", st: "السقف يسرب." }, "ARK": { t: "ورقة", s: "Ett ark papper.", st: "ورقة واحدة." } } }',
        replace: '{ main: "TORKA", targets: ["TORKA", "TAK", "KAR"], data: { "TORKA": { t: "يجفف", s: "Häng tvätten på tork.", st: "علق الغسيل ليجف." }, "TAK": { t: "سقف", s: "Taket läcker.", st: "السقف يسرب." }, "KAR": { t: "حوض", s: "Ett kar med vatten.", st: "حوض به ماء." } } }'
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
    console.log("Fixed remaining duplicates in Chapter 4.");
}
