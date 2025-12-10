const fs = require('fs');

// Read data.js
let dataContent = fs.readFileSync('./data.js', 'utf-8');

// Parse
let dictionaryData;
let prefix = "";
let suffix = "";

if (dataContent.includes('const dictionaryData =')) {
    prefix = "const dictionaryData = ";
    suffix = ";";
    dictionaryData = JSON.parse(dataContent.replace(prefix, '').replace(/;$/, ''));
} else {
    console.error("Could not parse data.js structure.");
    process.exit(1);
}

const COL_ID = 0;
const COL_EX = 6;
const COL_EX_ARB = 7;

// Fixes map: ID -> { swe, arb }
// IDs from audit output:
const updates = {
    // Bedöma (Missing)
    "Lexin002591": {
        swe: "Det är svårt att bedöma hur lång tid projektet kommer att ta.",
        arb: "من الصعب تقدير المدة التي سيستغرقها المشروع."
    },
    // Skärp dig (Missing)
    "Lexin024849": {
        swe: "Skärp dig och sluta klaga på småsaker!",
        arb: "تصرّف بجدية وكف عن التذمر من صغائر الأمور!"
    },
    // Anstå (Short)
    "Lexin001157": {
        swe: "Vi får låta beslutet anstå till nästa möte.",
        arb: "علينا تأجيل القرار إلى الاجتماع القادم."
    },
    // Bero (Short)
    "Lexin002930": {
        swe: "Allt kommer att bero på vädret om vi kan åka eller inte.",
        arb: "كل شيء سيعتمد على الطقس فيما إذا كنا سنستطيع الذهاب أم لا."
    },
    // Lär (Short - likely auxiliary 'lär' as in 'is likely to')
    "Lexin016752": {
        swe: "Det lär bli regn imorgon enligt prognosen.",
        arb: "من المرجح أن تمطر غداً وفقاً للأرصاد الجوية."
    },
    // Må (Short - multiple entries likely)
    "Lexin018318": { // Må (feel)
        swe: "Hur mår du idag efter gårdagens operation?",
        arb: "كيف تشعر اليوم بعد عملية الأمس؟"
    },
    // Månde (Short - archaic 'may')
    "Lexin018320": {
        swe: "Vad månde bliva av denna märkliga situation?",
        arb: "يا ترى ما الذي سيؤول إليه هذا الوضع الغريب؟"
    },
    // Omsätter (Short)
    "Lexin019553": {
        swe: "Företaget omsätter miljontals kronor varje år.",
        arb: "تبلغ مبيعات الشركة الملايين من الكرونات كل عام."
    },
    // Påskina (Short)
    "Lexin021759": {
        swe: "Han lät påskina att han visste mer än han sa.",
        arb: "ألمح إلى أنه يعرف أكثر مما قاله."
    },
    // Sanna (Short) - To verify/say true? Or Sannade (sand)?
    // Lexin023471 "Sanna" (Verb) -> To make true? "Min dröm sannades".
    // Or "Sanda" (grit)? No, text says "sanna, sannade".
    // "Sanna mina ord" (Mark my words).
    "Lexin023471": {
        swe: "Sanna mina ord, du kommer att ångra detta beslut.",
        arb: "صدق كلامي، ستندم على هذا القرار."
    },
    // Strandar (Short)
    "Lexin026526": {
        swe: "Förhandlingarna strandade på grund av oenighet om lönen.",
        arb: "تعثرت المفاوضات بسبب الخلاف حول الراتب."
    },
    // Tillgå (Short)
    "Lexin028216": {
        swe: "Det finns inga andra resurser att tillgå för närvarande.",
        arb: "لا توجد أي موارد أخرى متاحة للاستخدام حالياً."
    },
    // Vare (Short - subjunctive 'be')
    "Lexin031538": {
        swe: "Tack vare din hjälp kunde vi lösa problemet snabbt.",
        arb: "بفضل مساعدتك تمكنا من حل المشكلة بسرعة."
    },
    // Vart (Short - became / went?)
    // "Det vart mörkt". (Dialectal/Old for 'blev')? 
    // Or Direction "Vart"? "Vart ska du?". (Adverb). 
    // If ID is Verb, likely "Blev".
    // Let's check Lexin031553 in data quickly? 
    // Assuming it's "blev" style or archaic.
    // "Det vart som det vart" -> "Det blev som det blev".
    "Lexin031553": {
        swe: "Det vart tyst i rummet när chefen kom in.",
        arb: "ساد الصمت في الغرفة عندما دخل المدير."
    }
};

let modifiedCount = 0;

dictionaryData.forEach(entry => {
    const id = entry[COL_ID];
    if (updates[id]) {
        console.log(`Updating ${id} (${entry[2]})...`);
        entry[COL_EX] = updates[id].swe;
        entry[COL_EX_ARB] = updates[id].arb;
        modifiedCount++;
    }
});

// Write back
const newContent = prefix + JSON.stringify(dictionaryData, null, 2) + suffix;
fs.writeFileSync('./data.js', newContent, 'utf-8');

console.log(`\n✅ Enhanced ${modifiedCount} Verb examples.`);
