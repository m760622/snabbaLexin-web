const fs = require('fs');

const generatorPath = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/generate_advanced_levels.js';
let content = fs.readFileSync(generatorPath, 'utf8');

const replacement = {
    // 8-4: MOTOR -> Replace ORT with MOT
    find: '{ main: "MOTOR", targets: ["MOTOR", "ORT", "ORM"], data: { "MOTOR": { t: "محرك", s: "Bilen har en stark motor.", st: "السيارة لها محرك قوي." }, "ORT": { t: "منطقة", s: "Vi bor på en liten ort.", st: "نعيش في منطقة صغيرة." }, "ORM": { t: "ثعبان", s: "Jag är rädd för ormar.", st: "أنا أخاف من الثعابين." } } }',
    replace: '{ main: "MOTOR", targets: ["MOTOR", "MOT", "ORM"], data: { "MOTOR": { t: "محرك", s: "Bilen har en stark motor.", st: "السيارة لها محرك قوي." }, "MOT": { t: "ضد", s: "Vi kämpar mot orättvisor.", st: "نحن نكافح ضد الظلم." }, "ORM": { t: "ثعبان", s: "Jag är rädd för ormar.", st: "أنا أخاف من الثعابين." } } }'
};

if (content.includes(replacement.find)) {
    content = content.replace(replacement.find, replacement.replace);
    fs.writeFileSync(generatorPath, content);
    console.log("Fixed duplicate ORT in 8-4 (replaced with MOT).");
} else {
    console.error("Could not find MOTOR block in 8-4.");
}
