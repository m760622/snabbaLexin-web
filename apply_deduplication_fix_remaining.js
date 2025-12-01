const fs = require('fs');

const generatorPath = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/generate_advanced_levels.js';
let content = fs.readFileSync(generatorPath, 'utf8');

const replacements = [
    {
        // 1-2: ROT -> OST
        // Current content has "Kärleken är roten..."
        find: '{ main: "ROT", targets: ["ROT", "TRO"], data: { "ROT": { t: "جذر", s: "Kärleken är roten till allt gott.", st: "الحب هو جذر كل خير." }, "TRO": { t: "إيمان", s: "Tro kan försätta berg.", st: "الإيمان يمكنه نقل الجبال." } } }',
        replace: '{ main: "OST", targets: ["OST", "SO"], data: { "OST": { t: "جبن", s: "Jag älskar ost.", st: "أنا أحب الجبن." }, "SO": { t: "خنزيرة", s: "En so med kultingar.", st: "خنزيرة مع خنازير صغيرة." } } }'
    },
    {
        // 5-10: MOS -> KOS, DOM -> JOD
        // Current content has "Jag vill ha korv med mos."
        find: '{ main: "SJUKDOM", targets: ["SJUKDOM", "SJUK", "DOM", "MJUK", "MOS"], data: { "SJUKDOM": { t: "مرض", s: "Han lider av en sällsynt sjukdom.", st: "هو يعاني من مرض نادر." }, "SJUK": { t: "مريض", s: "Jag är tyvärr sjuk idag.", st: "للأسف أنا مريض اليوم." }, "DOM": { t: "حكم", s: "Domaren avkunnade en hård dom.", st: "أصدر القاضي حكماً قاسياً." }, "MJUK": { t: "ناعم", s: "Kudden är väldigt mjuk och skön.", st: "الوسادة ناعمة ومريحة جداً." }, "MOS": { t: "هريس", s: "Jag vill ha korv med mos.", st: "أريد سجقاً مع الهريس." } } }',
        replace: '{ main: "SJUKDOM", targets: ["SJUKDOM", "SJUK", "JOD", "MJUK", "KOS"], data: { "SJUKDOM": { t: "مرض", s: "Han lider av en sällsynt sjukdom.", st: "هو يعاني من مرض نادر." }, "SJUK": { t: "مريض", s: "Jag är tyvärr sjuk idag.", st: "للأسف أنا مريض اليوم." }, "JOD": { t: "يود", s: "Jod används i sår.", st: "يستخدم اليود في الجروح." }, "MJUK": { t: "ناعم", s: "Kudden är väldigt mjuk och skön.", st: "الوسادة ناعمة ومريحة جداً." }, "KOS": { t: "رحيل", s: "Han drog sin kos.", st: "لقد رحل." } } }'
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
console.log(`Applied ${updatedCount} remaining deduplication fixes.`);
