const fs = require('fs');

const generatorPath = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/generate_advanced_levels.js';
let content = fs.readFileSync(generatorPath, 'utf8');

const replacements = [
    {
        // 7-1: PROV -> targets: ["PROV", "ROV"] -> Change ROV to something else?
        // ROV is "prey". PROV is "test".
        // Subwords of PROV (P, R, O, V): ROV is the only 3-letter one?
        // POR (pore)? ROP (cry)?
        // Let's check ROP.
        // 7-1: { main: "PROV", targets: ["PROV", "ROV"] ... }
        // Replace with ROP.
        find: '{ main: "PROV", targets: ["PROV", "ROV"], data: { "PROV": { t: "اختبار", s: "Vi har ett svårt prov imorgon.", st: "لدينا اختبار صعب غداً." }, "ROV": { t: "فريسة", s: "Lejonet smög på sitt rov.", st: "تسلل الأسد نحو فريسته." } } }',
        replace: '{ main: "PROV", targets: ["PROV", "ROP"], data: { "PROV": { t: "اختبار", s: "Vi har ett svårt prov imorgon.", st: "لدينا اختبار صعب غداً." }, "ROP": { t: "صرخة", s: "Ett rop på hjälp.", st: "صرخة طلب للمساعدة." } } }'
    },
    {
        // 9-5: POLIS -> targets: ["POLIS", "SILO", "SIL"]
        // SIL is duplicate (used in 1-2 SILL).
        // Subwords of POLIS (P, O, L, I, S): SOL (sun), LOS (loose), LIS (wile/craft - rare), SIL (strainer), SILO.
        // SOL is used in 2-1.
        // LOS is used in 2-1.
        // SILO is used in 9-5.
        // Maybe SOLI (solo)? PILS (pilsner)?
        // Let's try SOL. But SOL is in 2-1.
        // If I use SOL here, it will be a duplicate with 2-1.
        // So I should avoid SOL.
        // What about LIS? "Med list och lämpe".
        // Or change the level 9-5 entirely?
        // POLIS is a good law word.
        // Maybe just remove SIL if possible? But need enough words.
        // POLIS, SILO... need 3rd word.
        // SOL? Duplicate.
        // LOS? Duplicate.
        // POS (pose)?
        // PIS (whip - archaic)?
        // LIS?
        // Let's use LIS.
        find: '{ main: "POLIS", targets: ["POLIS", "SILO", "SIL"], data: { "POLIS": { t: "شرطة", s: "Ring polisen om du ser något.", st: "اتصل بالشرطة إذا رأيت شيئاً." }, "SILO": { t: "صومعة", s: "Bonden lagrar säd i en silo.", st: "يخزن المزارع الحبوب في صومعة." }, "SIL": { t: "مصفاة", s: "Häll pastan i en sil.", st: "صب المعكرونة في مصفاة." } } }',
        replace: '{ main: "POLIS", targets: ["POLIS", "SILO", "LIS"], data: { "POLIS": { t: "شرطة", s: "Ring polisen om du ser något.", st: "اتصل بالشرطة إذا رأيت شيئاً." }, "SILO": { t: "صومعة", s: "Bonden lagrar säd i en silo.", st: "يخزن المزارع الحبوب في صومعة." }, "LIS": { t: "مكر", s: "Han använde list för att vinna.", st: "استخدم المكر ليفوز." } } }'
    }
];

let updatedCount = 0;

replacements.forEach(item => {
    if (content.includes(item.find)) {
        content = content.replace(item.find, item.replace);
        updatedCount++;
    } else {
        console.warn(`Could not find data block for replacement: ${item.find.substring(0, 50)}...`);
    }
});

fs.writeFileSync(generatorPath, content);
console.log(`Applied ${updatedCount} duplicate fixes.`);
