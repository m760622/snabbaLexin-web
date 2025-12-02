const fs = require('fs');

const generatorPath = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/generate_advanced_levels.js';
let content = fs.readFileSync(generatorPath, 'utf8');

const replacements = [
    {
        // 2-2: SAND -> Replace with STEN
        find: '{ main: "SAND", targets: ["SAND", "AND"], data: { "SAND": { t: "رمل", s: "Barnen leker i sanden.", st: "الأطفال يلعبون في الرمل." }, "AND": { t: "بطة", s: "En and simmar i dammen.", st: "بطة تسبح في البركة." } } }',
        replace: '{ main: "STEN", targets: ["STEN", "LEN"], data: { "STEN": { t: "حجر", s: "En stor sten låg på vägen.", st: "كان هناك حجر كبير على الطريق." }, "LEN": { t: "ناعم", s: "Katten har len päls.", st: "القطة لديها فراء ناعم." } } }'
    },
    {
        // 2-9: PLANET -> Replace TAL with EL
        find: '{ main: "PLANET", targets: ["PLANET", "PLAN", "LEN", "TAL"], data: { "PLANET": { t: "كوكب", s: "Jorden är en planet.", st: "الأرض كوكب." }, "PLAN": { t: "طائرة / خطة", s: "Vi har en plan.", st: "لدينا خطة." }, "LEN": { t: "ناعم", s: "Katten har len päls.", st: "القطة لديها فراء ناعم." }, "TAL": { t: "خطاب / عدد", s: "Han höll ett tal.", st: "ألقى خطاباً." } } }',
        replace: '{ main: "PLANET", targets: ["PLANET", "PLAN", "LEN", "EL"], data: { "PLANET": { t: "كوكب", s: "Jorden är en planet.", st: "الأرض كوكب." }, "PLAN": { t: "طائرة / خطة", s: "Vi har en plan.", st: "لدينا خطة." }, "LEN": { t: "ناعم", s: "Katten har len päls.", st: "القطة لديها فراء ناعم." }, "EL": { t: "كهرباء", s: "Vi behöver el till lampan.", st: "نحتاج الكهرباء للمصباح." } } }'
    },
    {
        // 2-5: RENAR -> Replace REN with REA
        find: '{ main: "RENAR", targets: ["RENAR", "REN", "ENAR"], data: { "RENAR": { t: "حيوانات الرنة", s: "Renar lever i norr.", st: "تعيش الرنة في الشمال." }, "REN": { t: "رنة / نظيف", s: "En stor ren.", st: "رنة كبيرة." }, "ENAR": { t: "أشجار العرعر", s: "Det växer enar på backen.", st: "تنمو أشجار العرعر على التل." } } }',
        replace: '{ main: "RENAR", targets: ["RENAR", "REA", "ENAR"], data: { "RENAR": { t: "حيوانات الرنة", s: "Renar lever i norr.", st: "تعيش الرنة في الشمال." }, "REA": { t: "تخفيضات", s: "Det är rea på kläder.", st: "هناك تخفيضات على الملابس." }, "ENAR": { t: "أشجار العرعر", s: "Det växer enar på backen.", st: "تنمو أشجار العرعر على التل." } } }'
    }
];

// Wait, STEN -> STEN, LEN?
// STEN: S, T, E, N.
// LEN: L, E, N.
// STEN does not contain L.
// STEN -> STEN, EN.
// LEN is in PLANET (2-9).
// So I cannot use LEN in STEN.
// STEN -> STEN, SEN (Late).
// "Kom inte för sent."
// STEN -> STEN, TEN (Tin).
// "En burk av ten."
// STEN -> STEN, EN.
// "En" is 2 letters. Minimum 3?
// User rule: "Condition Length: must be more than 2 letters (3 letters or more)."
// So EN is invalid.
// STEN -> STEN, SEN.
// SEN (Late).
// Let's use SEN.

replacements[0].replace = '{ main: "STEN", targets: ["STEN", "SEN"], data: { "STEN": { t: "حجر", s: "En stor sten låg på vägen.", st: "كان هناك حجر كبير على الطريق." }, "SEN": { t: "متأخر", s: "Han kom för sent.", st: "جاء متأخراً." } } }';

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
    console.log("Fixed duplicates in Chapter 2.");
}
