const fs = require('fs');

const generatorPath = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/generate_advanced_levels.js';
let content = fs.readFileSync(generatorPath, 'utf8');

const replacement = {
    // 1-6: BÄREN -> Replace REN with BEN
    find: '{ main: "BÄREN", targets: ["BÄREN", "BÄR", "REN"], data: { "BÄREN": { t: "التوت", s: "Bären är mogna nu.", st: "التوت ناضج الآن." }, "BÄR": { t: "توت", s: "Skogen är full av bär.", st: "الغابة مليئة بالتوت." }, "REN": { t: "نظيف", s: "Luften är ren här.", st: "الهواء نظيف هنا." } } }',
    replace: '{ main: "BÄREN", targets: ["BÄREN", "BÄR", "BEN"], data: { "BÄREN": { t: "التوت", s: "Bären är mogna nu.", st: "التوت ناضج الآن." }, "BÄR": { t: "توت", s: "Skogen är full av bär.", st: "الغابة مليئة بالتوت." }, "BEN": { t: "عظم", s: "Hunden gnager på ett ben.", st: "الكلب يقضم عظماً." } } }'
};

if (content.includes(replacement.find)) {
    content = content.replace(replacement.find, replacement.replace);
    fs.writeFileSync(generatorPath, content);
    console.log("Fixed duplicate REN in 1-6 (replaced with BEN).");
} else {
    console.error("Could not find BÄREN block in 1-6.");
}
