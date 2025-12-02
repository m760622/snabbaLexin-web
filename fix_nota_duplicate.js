const fs = require('fs');

const generatorPath = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/generate_advanced_levels.js';
let content = fs.readFileSync(generatorPath, 'utf8');

const replacement = {
    // 3-4: KANOT -> Replace NOTA with KANT
    find: '{ main: "KANOT", targets: ["KANOT", "NOTA", "TANK"], data: { "KANOT": { t: "زورق", s: "Vi paddlar kanot i ån.", st: "نحن نجدف بالزورق في النهر." }, "NOTA": { t: "فاتورة", s: "Kan jag få notan, tack?", st: "هل يمكنني الحصول على الفاتورة، من فضلك؟" }, "TANK": { t: "خزان", s: "Bilen har full tank.", st: "السيارة بها خزان ممتلئ." } } }',
    replace: '{ main: "KANOT", targets: ["KANOT", "KANT", "TANK"], data: { "KANOT": { t: "زورق", s: "Vi paddlar kanot i ån.", st: "نحن نجدف بالزورق في النهر." }, "KANT": { t: "حافة", s: "Han satt på kanten av sängen.", st: "جلس على حافة السرير." }, "TANK": { t: "خزان", s: "Bilen har full tank.", st: "السيارة بها خزان ممتلئ." } } }'
};

if (content.includes(replacement.find)) {
    content = content.replace(replacement.find, replacement.replace);
    fs.writeFileSync(generatorPath, content);
    console.log("Fixed duplicate NOTA in 3-4 (replaced with KANT).");
} else {
    console.error("Could not find KANOT block in 3-4.");
}
