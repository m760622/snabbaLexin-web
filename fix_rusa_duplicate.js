const fs = require('fs');

const generatorPath = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/generate_advanced_levels.js';
let content = fs.readFileSync(generatorPath, 'utf8');

const replacement = {
    // 2-8: RUSA -> RAK
    find: '{ main: "BUSKAR", targets: ["BUSKAR", "BRUKA", "SKURA", "RUSA"], data: { "BUSKAR": { t: "شجيرات", s: "Katten gömde sig i buskarna.", st: "اختبأت القطة بين الشجيرات." }, "BRUKA": { t: "يفلح", s: "Man måste bruka jorden för att skörda.", st: "يجب فلاحة الأرض للحصول على الحصاد." }, "SKURA": { t: "يفرك", s: "Jag måste skura golvet i köket.", st: "يجب أن أفرك أرضية المطبخ." }, "RUSA": { t: "يندفع", s: "Du behöver inte rusa iväg så fort.", st: "لا داعي للاندفاع والمغادرة بهذه السرعة." } } }',
    replace: '{ main: "BUSKAR", targets: ["BUSKAR", "BRUKA", "SKURA", "RAK"], data: { "BUSKAR": { t: "شجيرات", s: "Katten gömde sig i buskarna.", st: "اختبأت القطة بين الشجيرات." }, "BRUKA": { t: "يفلح", s: "Man måste bruka jorden för att skörda.", st: "يجب فلاحة الأرض للحصول على الحصاد." }, "SKURA": { t: "يفرك", s: "Jag måste skura golvet i köket.", st: "يجب أن أفرك أرضية المطبخ." }, "RAK": { t: "مستقيم", s: "En rak linje.", st: "خط مستقيم." } } }'
};

if (content.includes(replacement.find)) {
    content = content.replace(replacement.find, replacement.replace);
    fs.writeFileSync(generatorPath, content);
    console.log("Fixed final duplicate RUSA in 2-8.");
} else {
    console.error("Could not find RUSA block in 2-8.");
}
