const fs = require('fs');

const generatorPath = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/generate_advanced_levels.js';
let content = fs.readFileSync(generatorPath, 'utf8');

const replacement = {
    // 10-10: PROFET -> Replace ROP with TRE
    find: '{ main: "PROFET", targets: ["PROFET", "POET", "PORT", "FORT", "ROP"], data: { "PROFET": { t: "نبي", s: "Muhammed är Guds sista profet.", st: "محمد هو خاتم أنبياء الله." }, "POET": { t: "شاعر", s: "Han var en känd poet.", st: "كان شاعراً مشهوراً." }, "PORT": { t: "بوابة", s: "Han stod vid himmelens port.", st: "وقف عند بوابة السماء." }, "FORT": { t: "بسرعة", s: "Tiden går så fort när man har roligt.", st: "الوقت يمضي بسرعة عندما تستمتع." }, "ROP": { t: "صرخة", s: "Ett rop på hjälp.", st: "صرخة طلب للمساعدة." } } }',
    replace: '{ main: "PROFET", targets: ["PROFET", "POET", "PORT", "FORT", "TRE"], data: { "PROFET": { t: "نبي", s: "Muhammed är Guds sista profet.", st: "محمد هو خاتم أنبياء الله." }, "POET": { t: "شاعر", s: "Han var en känd poet.", st: "كان شاعراً مشهوراً." }, "PORT": { t: "بوابة", s: "Han stod vid himmelens port.", st: "وقف عند بوابة السماء." }, "FORT": { t: "بسرعة", s: "Tiden går så fort när man har roligt.", st: "الوقت يمضي بسرعة عندما تستمتع." }, "TRE": { t: "ثلاثة", s: "Ett, två, tre.", st: "واحد، اثنان، ثلاثة." } } }'
};

if (content.includes(replacement.find)) {
    content = content.replace(replacement.find, replacement.replace);
    fs.writeFileSync(generatorPath, content);
    console.log("Fixed duplicate ROP in 10-10 (replaced with TRE).");
} else {
    console.error("Could not find PROFET block in 10-10.");
}
