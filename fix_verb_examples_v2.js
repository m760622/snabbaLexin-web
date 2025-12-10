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
    // Handling complexity of data.js if manual parsing fails
    // But since we are writing back, we assume the prefix/suffix method works for standard node run
    console.error("Could not parse data.js structure.");
    process.exit(1);
}

const COL_ID = 0;
const COL_SWE = 2;
const COL_EX = 6;
const COL_EX_ARB = 7;

// Word-based updates map (Correct methodology)
const updates = {
    "Bedöma": {
        swe: "Det är svårt att bedöma hur lång tid projektet kommer att ta.",
        arb: "من الصعب تقدير المدة التي سيستغرقها المشروع."
    },
    "Skärp dig": {
        swe: "Skärp dig och sluta klaga på småsaker!",
        arb: "تصرّف بجدية وكف عن التذمر من صغائر الأمور!"
    },
    "Anstå": {
        swe: "Vi får låta beslutet anstå till nästa möte.",
        arb: "علينا تأجيل القرار إلى الاجتماع القادم."
    },
    "Bero": {
        swe: "Allt kommer att bero på vädret om vi kan åka eller inte.",
        arb: "كل شيء سيعتمد على الطقس فيما إذا كنا سنستطيع الذهاب أم لا."
    },
    "Lär": {
        swe: "Det lär bli regn imorgon enligt prognosen.",
        arb: "من المرجح أن تمطر غداً وفقاً للأرصاد الجوية."
    },
    "Må": {
        swe: "Hur mår du idag efter gårdagens operation?",
        arb: "كيف تشعر اليوم بعد عملية الأمس؟"
    },
    "Månde": {
        swe: "Vad månde bliva av denna märkliga situation?",
        arb: "يا ترى ما الذي سيؤول إليه هذا الوضع الغريب؟"
    },
    "Omsätter": {
        swe: "Företaget omsätter miljontals kronor varje år.",
        arb: "تبلغ مبيعات الشركة الملايين من الكرونات كل عام."
    },
    "Påskina": {
        swe: "Han lät påskina att han visste mer än han sa.",
        arb: "ألمح إلى أنه يعرف أكثر مما قاله."
    },
    "Sanna": {
        swe: "Sanna mina ord, du kommer att ångra detta beslut.",
        arb: "صدق كلامي، ستندم على هذا القرار."
    },
    "Strandar": {
        swe: "Förhandlingarna strandade på grund av oenighet om lönen.",
        arb: "تعثرت المفاوضات بسبب الخلاف حول الراتب."
    },
    "Tillgå": {
        swe: "Det finns inga andra resurser att tillgå för närvarande.",
        arb: "لا توجد أي موارد أخرى متاحة للاستخدام حالياً."
    },
    "Vare": {
        swe: "Tack vare din hjälp kunde vi lösa problemet snabbt.",
        arb: "بفضل مساعدتك تمكنا من حل المشكلة بسرعة."
    },
    "Vart": { // Assuming "blev" context based on "Det vart tyst"
        swe: "Det vart tyst i rummet när chefen kom in.",
        arb: "ساد الصمت في الغرفة عندما دخل المدير."
    }
};

// IDs that were incorrectly updated in the previous step
const dirtyIDs = [
    "Lexin016752", "Lexin018318", "Lexin018320", "Lexin001157", "Lexin031538",
    "Lexin019553", "Lexin028216", "Lexin002591", "Lexin021759", "Lexin023471",
    "Lexin024849", "Lexin026526", "Lexin031553", "Lexin002930"
];

let modifiedCount = 0;
let resetCount = 0;

dictionaryData.forEach(entry => {
    const id = entry[COL_ID];
    const word = entry[COL_SWE] ? entry[COL_SWE].trim() : "";

    // 1. Update correctly by matching Word
    if (updates[word]) {
        console.log(`Updating [${id}] ${word}...`);
        entry[COL_EX] = updates[word].swe;
        entry[COL_EX_ARB] = updates[word].arb;
        modifiedCount++;
    }
    // 2. Revert incorrectly updated IDs (unless they happen to match the word above)
    else if (dirtyIDs.includes(id)) {
        console.log(`Resetting [${id}] ${word} (Reverting previous error)...`);
        // Reverting to empty/default is better than keeping the wrong example.
        // I don't have the original backup, but most of these were "Short" or "Missing" anyway.
        // So clearing them is safe or setting to word.
        entry[COL_EX] = "";
        entry[COL_EX_ARB] = "";
        resetCount++;
    }
});

// Write back
const newContent = prefix + JSON.stringify(dictionaryData, null, 2) + suffix;
fs.writeFileSync('./data.js', newContent, 'utf-8');

console.log(`\n✅ Enhanced ${modifiedCount} Verb examples.`);
console.log(`↺ Reset ${resetCount} incorrectly modified entries.`);
