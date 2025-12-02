const fs = require('fs');

const generatorPath = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/generate_advanced_levels.js';
let content = fs.readFileSync(generatorPath, 'utf8');

const replacements = [
    {
        // 6-3: RAST -> Replace with TEST
        find: '{ main: "RAST", targets: ["RAST", "TAR"], data: { "RAST": { t: "استراحة", s: "Vi har rast nu.", st: "لدينا استراحة الآن." }, "TAR": { t: "يأخذ", s: "Det tar tid.", st: "الأمر يستغرق وقتاً." } } }',
        replace: '{ main: "TEST", targets: ["TEST", "SET"], data: { "TEST": { t: "اختبار", s: "Vi har ett test idag.", st: "لدينا اختبار اليوم." }, "SET": { t: "مجموعة", s: "Ett set med verktyg.", st: "مجموعة أدوات." } } }'
    },
    {
        // 6-4: SKOLA -> Replace with TEAM
        find: '{ main: "SKOLA", targets: ["SKOLA", "SKA", "SAK"], data: { "SKOLA": { t: "مدرسة", s: "Barnen går i skolan.", st: "يذهب الأطفال إلى المدرسة." }, "SKA": { t: "سوف", s: "Jag ska gå hem.", st: "سأذهب إلى المنزل." }, "SAK": { t: "شيء", s: "Det är en annan sak.", st: "هذا شيء آخر." } } }',
        replace: '{ main: "TEAM", targets: ["TEAM", "MAT", "TAM"], data: { "TEAM": { t: "فريق", s: "Vi är ett bra team.", st: "نحن فريق جيد." }, "MAT": { t: "طعام", s: "Maten är klar.", st: "الطعام جاهز." }, "TAM": { t: "أليف", s: "En tam fågel.", st: "طائر أليف." } } }'
    },
    {
        // 6-5: TAVLA -> Replace with SKRIV
        find: '{ main: "TAVLA", targets: ["TAVLA", "TAL", "AVTAL"], data: { "TAVLA": { t: "لوحة / سبورة", s: "Läraren skriver på tavlan.", st: "المعلم يكتب على السبورة." }, "TAL": { t: "خطاب / عدد", s: "Han höll ett bra tal.", st: "ألقى خطاباً جيداً." }, "AVTAL": { t: "اتفاقية", s: "Vi skrev på ett avtal.", st: "وقعنا اتفاقية." } } }',
        replace: '{ main: "SKRIV", targets: ["SKRIV", "RIV", "VIK"], data: { "SKRIV": { t: "اكتب", s: "Skriv ditt namn här.", st: "اكتب اسمك هنا." }, "RIV": { t: "مزق", s: "Riv inte sönder pappret.", st: "لا تمزق الورقة." }, "VIK": { t: "طوى", s: "Vik pappret på mitten.", st: "اطو الورقة من المنتصف." } } }'
    },
    {
        // 6-2: BILD -> Replace with LÖGN
        find: '{ main: "BILD", targets: ["BILD", "BIL"], data: { "BILD": { t: "صورة", s: "En fin bild på väggen.", st: "صورة جميلة على الحائط." }, "BIL": { t: "سيارة", s: "Jag kör en röd bil.", st: "أقود سيارة حمراء." } } }',
        replace: '{ main: "LÖGN", targets: ["LÖGN", "LÖN"], data: { "LÖGN": { t: "كذبة", s: "Det var en lögn.", st: "كانت تلك كذبة." }, "LÖN": { t: "راتب", s: "Jag har fått min lön.", st: "لقد استلمت راتبي." } } }'
    },
    {
        // 6-10: VERKTYG -> Replace GER with TYP
        find: '{ main: "VERKTYG", targets: ["VERKTYG", "VERK", "YRKE", "GER", "TYG"], data: { "VERKTYG": { t: "أداة", s: "Hammaren är ett verktyg.", st: "المطرقة أداة." }, "VERK": { t: "عمل / مصنع", s: "Ett stort verk.", st: "عمل كبير." }, "YRKE": { t: "مهنة", s: "Vad har du för yrke?", st: "ما هي مهنتك؟" }, "GER": { t: "يعطي", s: "Han ger mig boken.", st: "يعطيني الكتاب." }, "TYG": { t: "قماش", s: "Klänningen är sydd av fint tyg.", st: "الفستان مخيط من قماش فاخر." } } }',
        replace: '{ main: "VERKTYG", targets: ["VERKTYG", "VERK", "YRKE", "TYP", "TYG"], data: { "VERKTYG": { t: "أداة", s: "Hammaren är ett verktyg.", st: "المطرقة أداة." }, "VERK": { t: "عمل / مصنع", s: "Ett stort verk.", st: "عمل كبير." }, "YRKE": { t: "مهنة", s: "Vad har du för yrke?", st: "ما هي مهنتك؟" }, "TYP": { t: "نوع", s: "Vilken typ av bil har du?", st: "ما نوع السيارة التي لديك؟" }, "TYG": { t: "قماش", s: "Klänningen är sydd av fint tyg.", st: "الفستان مخيط من قماش فاخر." } } }'
    },
    {
        // 6-7: KONTOR -> Replace ROT with TOK
        find: '{ main: "KONTOR", targets: ["KONTOR", "KORT", "ROT", "ORT"], data: { "KONTOR": { t: "مكتب", s: "Jag jobbar på kontor.", st: "أعمل في مكتب." }, "KORT": { t: "قصير / بطاقة", s: "Ett kort möte.", st: "اجتماع قصير." }, "ROT": { t: "جذر", s: "Trädets rot är djup.", st: "جذر الشجرة عميق." }, "ORT": { t: "منطقة / مكان", s: "En liten ort på landet.", st: "منطقة صغيرة في الريف." } } }',
        replace: '{ main: "KONTOR", targets: ["KONTOR", "KORT", "TOK", "ORT"], data: { "KONTOR": { t: "مكتب", s: "Jag jobbar på kontor.", st: "أعمل في مكتب." }, "KORT": { t: "قصير / بطاقة", s: "Ett kort möte.", st: "اجتماع قصير." }, "TOK": { t: "مجنون / أحمق", s: "Han är en riktig tok.", st: "إنه أحمق حقاً." }, "ORT": { t: "منطقة / مكان", s: "En liten ort på landet.", st: "منطقة صغيرة في الريف." } } }'
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
    console.log("Fixed duplicates in Chapter 6.");
}
