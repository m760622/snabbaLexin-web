const fs = require('fs');

const generatorPath = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/generate_advanced_levels.js';
let content = fs.readFileSync(generatorPath, 'utf8');

const structuredChapter6 = [
    // Levels 1-3: 2 words, Length 3-4
    { main: "LÄRA", targets: ["LÄRA", "LÄR"], data: { "LÄRA": { t: "تعلم", s: "Att lära är att leva.", st: "التعلم هو الحياة." }, "LÄR": { t: "يعلم", s: "Han lär sig svenska.", st: "هو يتعلم السويدية." } } },
    { main: "LÖGN", targets: ["LÖGN", "LÖN"], data: { "LÖGN": { t: "كذبة", s: "Det var en lögn.", st: "كانت تلك كذبة." }, "LÖN": { t: "راتب", s: "Jag har fått min lön.", st: "لقد استلمت راتبي." } } },
    { main: "TEST", targets: ["TEST", "SET"], data: { "TEST": { t: "اختبار", s: "Vi har ett test idag.", st: "لدينا اختبار اليوم." }, "SET": { t: "مجموعة", s: "Ett set med verktyg.", st: "مجموعة أدوات." } } },

    // Levels 4-6: 3 words, Length 4-5
    { main: "TEAM", targets: ["TEAM", "MAT", "TAM"], data: { "TEAM": { t: "فريق", s: "Vi är ett bra team.", st: "نحن فريق جيد." }, "MAT": { t: "طعام", s: "Maten är klar.", st: "الطعام جاهز." }, "TAM": { t: "أليف", s: "En tam fågel.", st: "طائر أليف." } } },
    { main: "SKRIV", targets: ["SKRIV", "RIV", "VIK"], data: { "SKRIV": { t: "اكتب", s: "Skriv ditt namn här.", st: "اكتب اسمك هنا." }, "RIV": { t: "مزق", s: "Riv inte sönder pappret.", st: "لا تمزق الورقة." }, "VIK": { t: "طوى", s: "Vik pappret på mitten.", st: "اطو الورقة من المنتصف." } } },
    { main: "BERÖM", targets: ["BERÖM", "BÖR", "MÖR"], data: { "BERÖM": { t: "مدح", s: "Hon fick beröm för sitt arbete.", st: "تلقت المديح على عملها." }, "BÖR": { t: "ينبغي", s: "Du bör gå nu.", st: "ينبغي عليك الذهاب الآن." }, "MÖR": { t: "طري", s: "Köttet är mört.", st: "اللحم طري." } } },

    // Levels 7-9: 4 words, Length 5-6
    { main: "KONTOR", targets: ["KONTOR", "KORT", "TOK", "ORT"], data: { "KONTOR": { t: "مكتب", s: "Jag jobbar på kontor.", st: "أعمل في مكتب." }, "KORT": { t: "قصير / بطاقة", s: "Ett kort möte.", st: "اجتماع قصير." }, "TOK": { t: "مجنون / أحمق", s: "Han är en riktig tok.", st: "إنه أحمق حقاً." }, "ORT": { t: "منطقة / مكان", s: "En liten ort på landet.", st: "منطقة صغيرة في الريف." } } },
    { main: "BLOCK", targets: ["BLOCK", "BOK", "KOCK", "LOK"], data: { "BLOCK": { t: "دفتر / كتلة", s: "Skriv i ditt block.", st: "اكتب في دفترك." }, "BOK": { t: "كتاب", s: "Jag läser en bok.", st: "أقرأ كتاباً." }, "KOCK": { t: "طباخ", s: "Han är en duktig kock.", st: "هو طباخ ماهر." }, "LOK": { t: "قاطرة", s: "Tåget dras av ett lok.", st: "القطار تسحبه قاطرة." } } },
    { main: "STUDIE", targets: ["STUDIE", "TID", "UT", "IDÉ"], data: { "STUDIE": { t: "دراسة", s: "En ny studie visar detta.", st: "تظهر دراسة جديدة هذا." }, "TID": { t: "وقت", s: "Vad är det för tid?", st: "كم الوقت؟" }, "UT": { t: "خارج", s: "Gå ut och lek.", st: "اخرج والعب." }, "IDÉ": { t: "فكرة", s: "Jag har en bra idé.", st: "لدي فكرة جيدة." } } },

    // Level 10: 5 words, Length 4-7
    { main: "VERKTYG", targets: ["VERKTYG", "VERK", "YRKE", "TYP", "TYG"], data: { "VERKTYG": { t: "أداة", s: "Hammaren är ett verktyg.", st: "المطرقة أداة." }, "VERK": { t: "عمل / مصنع", s: "Ett stort verk.", st: "عمل كبير." }, "YRKE": { t: "مهنة", s: "Vad har du för yrke?", st: "ما هي مهنتك؟" }, "TYP": { t: "نوع", s: "Vilken typ av bil har du?", st: "ما نوع السيارة التي لديك؟" }, "TYG": { t: "قماش", s: "Klänningen är sydd av fint tyg.", st: "الفستان مخيط من قماش فاخر." } } }
];

// Find the start and end of Chapter 6 in the file
const startMarker = "6: [ // School/Work";
const nextChapterMarker = "7: [ // Education";

const startIndex = content.indexOf(startMarker);
const nextChapterIndex = content.indexOf(nextChapterMarker);

if (startIndex !== -1 && nextChapterIndex !== -1) {
    // Construct new block
    let newBlock = "6: [ // School/Work\n";
    structuredChapter6.forEach(level => {
        newBlock += `        { main: "${level.main}", targets: ${JSON.stringify(level.targets)}, data: ${JSON.stringify(level.data)} },\n`;
    });
    newBlock += "    ],\n    "; // Add indentation for next chapter

    const before = content.substring(0, startIndex);
    const after = content.substring(nextChapterIndex);

    content = before + newBlock + after;

    fs.writeFileSync(generatorPath, content);
    console.log("Replaced Chapter 6 with STRUCTURED perfect school/work levels.");
} else {
    console.error("Could not find Chapter 6 block.");
}
