const fs = require('fs');

const generatorPath = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/generate_advanced_levels.js';
let content = fs.readFileSync(generatorPath, 'utf8');

const replacement = {
    // 4-8: TALANG -> Replace LAGA with TALA
    find: '{ main: "TALANG", targets: ["TALANG", "ALTAN", "LAGA", "GATA"], data: { "TALANG": { t: "موهبة", s: "Han har stor talang.", st: "لديه موهبة كبيرة." }, "ALTAN": { t: "شرفة", s: "Vi sitter på altanen.", st: "نجلس في الشرفة." }, "LAGA": { t: "يطبخ / يصلح", s: "Vi ska laga mat.", st: "سنطبخ الطعام." }, "GATA": { t: "شارع", s: "Vi bor på samma gata.", st: "نسكن في نفس الشارع." } } }',
    replace: '{ main: "TALANG", targets: ["TALANG", "ALTAN", "TALA", "GATA"], data: { "TALANG": { t: "موهبة", s: "Han har stor talang.", st: "لديه موهبة كبيرة." }, "ALTAN": { t: "شرفة", s: "Vi sitter på altanen.", st: "نجلس في الشرفة." }, "TALA": { t: "يتحدث", s: "Han kan tala svenska.", st: "هو يستطيع التحدث بالسويدية." }, "GATA": { t: "شارع", s: "Vi bor på samma gata.", st: "نسكن في نفس الشارع." } } }'
};

if (content.includes(replacement.find)) {
    content = content.replace(replacement.find, replacement.replace);
    fs.writeFileSync(generatorPath, content);
    console.log("Fixed duplicate LAGA in 4-8 (replaced with TALA).");
} else {
    console.error("Could not find TALANG block in 4-8.");
}
