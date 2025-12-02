const fs = require('fs');

const generatorPath = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/generate_advanced_levels.js';
let content = fs.readFileSync(generatorPath, 'utf8');

const replacements = [
    {
        // 5-9: RECEPT -> Replace REP with PET
        find: '{ main: "RECEPT", targets: ["RECEPT", "REP", "MER", "ER"], data: { "RECEPT": { t: "وصفة طبية", s: "Läkaren skrev ett recept.", st: "كتب الطبيب وصفة طبية." }, "REP": { t: "حبل", s: "Ett långt rep.", st: "حبل طويل." }, "MER": { t: "أكثر", s: "Jag vill ha mer mat.", st: "أريد المزيد من الطعام." }, "ER": { t: "أنتم / لكم", s: "Boken tillhör er.", st: "الكتاب ملك لكم." } } }',
        replace: '{ main: "RECEPT", targets: ["RECEPT", "PET", "MER", "ER"], data: { "RECEPT": { t: "وصفة طبية", s: "Läkaren skrev ett recept.", st: "كتب الطبيب وصفة طبية." }, "PET": { t: "نكز", s: "En lätt pet i sidan.", st: "نكزة خفيفة في الجانب." }, "MER": { t: "أكثر", s: "Jag vill ha mer mat.", st: "أريد المزيد من الطعام." }, "ER": { t: "أنتم / لكم", s: "Boken tillhör er.", st: "الكتاب ملك لكم." } } }'
    },
    {
        // 5-10: SJUKDOM -> Replace DOM with KOS
        find: '{ main: "SJUKDOM", targets: ["SJUKDOM", "SJUK", "DOM", "MUS", "SUM"], data: { "SJUKDOM": { t: "مرض", s: "Cancer är en svår sjukdom.", st: "السرطان مرض صعب." }, "SJUK": { t: "مريض", s: "Jag är sjuk idag.", st: "أنا مريض اليوم." }, "DOM": { t: "حكم", s: "Domstolen avkunnade sin dom.", st: "أصدرت المحكمة حكمها." }, "MUS": { t: "فأر", s: "Katten fångade en mus.", st: "أمسكت القطة فأراً." }, "SUM": { t: "مجموع", s: "En stor summa pengar.", st: "مبلغ كبير من المال." } } }',
        replace: '{ main: "SJUKDOM", targets: ["SJUKDOM", "SJUK", "KOS", "MUS", "SUM"], data: { "SJUKDOM": { t: "مرض", s: "Cancer är en svår sjukdom.", st: "السرطان مرض صعب." }, "SJUK": { t: "مريض", s: "Jag är sjuk idag.", st: "أنا مريض اليوم." }, "KOS": { t: "رحيل", s: "Han drog sin kos.", st: "لقد رحل." }, "MUS": { t: "فأر", s: "Katten fångade en mus.", st: "أمسكت القطة فأراً." }, "SUM": { t: "مجموع", s: "En stor summa pengar.", st: "مبلغ كبير من المال." } } }'
    },
    {
        // 5-7: GRAVID -> Replace VAR with GAV
        find: '{ main: "GRAVID", targets: ["GRAVID", "GRAV", "VAR", "VAD"], data: { "GRAVID": { t: "حامل", s: "Hon är gravid i femte månaden.", st: "هي حامل في الشهر الخامس." }, "GRAV": { t: "قبر", s: "Lägg blommor på graven.", st: "ضع الزهور على القبر." }, "VAR": { t: "قيح", s: "Det kom var ur såret.", st: "خرج قيح من الجرح." }, "VAD": { t: "بطة الساق / ماذا", s: "Jag har ont i vaden.", st: "لدي ألم في بطة الساق." } } }',
        replace: '{ main: "GRAVID", targets: ["GRAVID", "GRAV", "GAV", "VAD"], data: { "GRAVID": { t: "حامل", s: "Hon är gravid i femte månaden.", st: "هي حامل في الشهر الخامس." }, "GRAV": { t: "قبر", s: "Lägg blommor på graven.", st: "ضع الزهور على القبر." }, "GAV": { t: "أعطى", s: "Han gav mig en present.", st: "أعطاني هدية." }, "VAD": { t: "بطة الساق / ماذا", s: "Jag har ont i vaden.", st: "لدي ألم في بطة الساق." } } }'
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
    console.log("Fixed duplicates in Chapter 5.");
}
