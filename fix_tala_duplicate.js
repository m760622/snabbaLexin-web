const fs = require('fs');

const generatorPath = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/generate_advanced_levels.js';
let content = fs.readFileSync(generatorPath, 'utf8');

const replacement = {
    // 4-8: TALANG -> Replace TALA with ANA
    find: '{ main: "TALANG", targets: ["TALANG", "ALTAN", "TALA", "GATA"], data: { "TALANG": { t: "موهبة", s: "Han har stor talang.", st: "لديه موهبة كبيرة." }, "ALTAN": { t: "شرفة", s: "Vi sitter på altanen.", st: "نجلس في الشرفة." }, "TALA": { t: "يتحدث", s: "Han kan tala svenska.", st: "هو يستطيع التحدث بالسويدية." }, "GATA": { t: "شارع", s: "Vi bor på samma gata.", st: "نسكن في نفس الشارع." } } }',
    replace: '{ main: "TALANG", targets: ["TALANG", "ALTAN", "ANA", "GATA"], data: { "TALANG": { t: "موهبة", s: "Han har stor talang.", st: "لديه موهبة كبيرة." }, "ALTAN": { t: "شرفة", s: "Vi sitter på altanen.", st: "نجلس في الشرفة." }, "ANA": { t: "يشك / يظن", s: "Jag anar oråd.", st: "أنا أشك في الأمر." }, "GATA": { t: "شارع", s: "Vi bor på samma gata.", st: "نسكن في نفس الشارع." } } }'
};

if (content.includes(replacement.find)) {
    content = content.replace(replacement.find, replacement.replace);
    fs.writeFileSync(generatorPath, content);
    console.log("Fixed duplicate TALA in 4-8 (replaced with ANA).");
} else {
    console.error("Could not find TALANG block in 4-8.");
}
