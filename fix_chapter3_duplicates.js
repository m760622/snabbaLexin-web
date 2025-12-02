const fs = require('fs');

const generatorPath = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/generate_advanced_levels.js';
let content = fs.readFileSync(generatorPath, 'utf8');

const replacements = [
    {
        // 3-4: SLOTT -> Replace with KANOT
        find: '{ main: "SLOTT", targets: ["SLOTT", "LOTS", "STOL"], data: { "SLOTT": { t: "قلعة", s: "Kungen bor i ett slott.", st: "يعيش الملك في قلعة." }, "LOTS": { t: "مرشد سفن", s: "Fartyget behövde en lots.", st: "احتاجت السفينة إلى مرشد." }, "STOL": { t: "كرسي", s: "Sitt på en stol.", st: "اجلس على كرسي." } } }',
        replace: '{ main: "KANOT", targets: ["KANOT", "NOTA", "TANK"], data: { "KANOT": { t: "زورق", s: "Vi paddlar kanot i ån.", st: "نحن نجدف بالزورق في النهر." }, "NOTA": { t: "فاتورة", s: "Kan jag få notan, tack?", st: "هل يمكنني الحصول على الفاتورة، من فضلك؟" }, "TANK": { t: "خزان", s: "Bilen har full tank.", st: "السيارة بها خزان ممتلئ." } } }'
    },
    {
        // 3-5: KARTA -> Replace with PLATS
        find: '{ main: "KARTA", targets: ["KARTA", "RATA", "ARAK"], data: { "KARTA": { t: "خريطة", s: "Vi tittade på en karta.", st: "نظرنا إلى الخريطة." }, "RATA": { t: "يرفض", s: "Man ska inte rata mat.", st: "لا ينبغي رفض الطعام." }, "ARAK": { t: "عرق", s: "Arak är en stark dryck.", st: "العرق مشروب قوي." } } }',
        replace: '{ main: "PLATS", targets: ["PLATS", "LAST", "STAL"], data: { "PLATS": { t: "مكان", s: "Var vänlig och ta plats i väntrummet.", st: "تفضل بالجلوس في غرفة الانتظار." }, "LAST": { t: "حمل", s: "Lastbilen hade en mycket tung last.", st: "كانت الشاحنة تحمل حمولة ثقيلة جداً." }, "STAL": { t: "سرق", s: "Tjuven stal cykeln mitt på dagen.", st: "سرق اللص الدراجة في وضح النهار." } } }'
    },
    {
        // 3-9: MATROS -> Replace STORM with ROSA
        find: '{ main: "MATROS", targets: ["MATROS", "STORM", "ROSTA", "RASAT"], data: { "MATROS": { t: "بحار", s: "Han arbetar som matros.", st: "يعمل كبحار." }, "STORM": { t: "عاصفة", s: "Båten gungade i stormen.", st: "تأرجح القارب في العاصفة." }, "ROSTA": { t: "يحمص / يصدأ", s: "Järn kan rosta.", st: "الحديد يمكن أن يصدأ." }, "RASAT": { t: "انهار", s: "Taket har rasat in.", st: "لقد انهار السقف." } } }',
        replace: '{ main: "MATROS", targets: ["MATROS", "ROSA", "ROSTA", "RASAT"], data: { "MATROS": { t: "بحار", s: "Han arbetar som matros.", st: "يعمل كبحار." }, "ROSA": { t: "وردي", s: "Hon gillar rosa kläder.", st: "هي تحب الملابس الوردية." }, "ROSTA": { t: "يحمص / يصدأ", s: "Järn kan rosta.", st: "الحديد يمكن أن يصدأ." }, "RASAT": { t: "انهار", s: "Taket har rasat in.", st: "لقد انهار السقف." } } }'
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
    console.log("Fixed duplicates in Chapter 3.");
}
