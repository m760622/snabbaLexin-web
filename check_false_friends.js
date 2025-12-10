const fs = require('fs');

// Read data.js
let dataContent = fs.readFileSync('./data.js', 'utf-8');

// Parse
let dictionaryData;
if (dataContent.includes('const dictionaryData =')) {
    dictionaryData = JSON.parse(dataContent.replace('const dictionaryData = ', '').replace(/;$/, ''));
} else {
    const match = dataContent.match(/(?:const|var|let)\s+dictionaryData\s*=\s*(\[[\s\S]*?\]);/);
    dictionaryData = eval(match[1]);
}

const FALSE_FRIENDS = [
    { word: "Eventuellt", expected: "ربما / محتمل", wrong: "في النهاية" },
    { word: "Aktuell", expected: "حالي", wrong: "حقيقي / واقعي" },
    { word: "Fabrik", expected: "مصنع", wrong: "قماش" },
    { word: "Semester", expected: "إجازة / عطلة", wrong: "فصل دراسي" },
    { word: "Gift", expected: "سم / متزوج", wrong: "هدية" },
    { word: "Vill", expected: "يريد", wrong: "سوف / مستقبل" },
    { word: "Fart", expected: "سرعة", wrong: "غازات" },
    { word: "Kock", expected: "طباخ", wrong: "ديك" },
    { word: "Barn", expected: "طفل", wrong: "إسطبل / مخزن" },
    { word: "Chef", expected: "مدير / رئيس", wrong: "طباخ" },
    { word: "Novell", expected: "قصة قصيرة", wrong: "رواية" },
    { word: "Recept", expected: "وصفة", wrong: "إيصال" },
    { word: "Smoking", expected: "بدلة سهرة", wrong: "تدخين" },
    { word: "Vrist", expected: "كاحل", wrong: "معصم" },
    { word: "Annons", expected: "إعلان", wrong: "يعلن" },
    { word: "Mod", expected: "شجاعة", wrong: "مود / مزاج" },
    { word: "Gymnasium", expected: "مدرسة ثانوية", wrong: "صالة رياضة" },
    { word: "Konkurs", expected: "إفلاس", wrong: "مسابقة" }, // Concours
    { word: "Lokal", expected: "قاعة / مكان", wrong: "محلي" }, // Can be local adj, but checking for noun confusion
    { word: "Sensibel", expected: "حساس", wrong: "عقلاني" } // Sensible vs Sensitive
];

console.log("Analyzing False Friends...\n");

FALSE_FRIENDS.forEach(item => {
    // Find all entries for this word
    const entries = dictionaryData.filter(e => e[2].toLowerCase() === item.word.toLowerCase());

    if (entries.length > 0) {
        console.log(`--- ${item.word} ---`);
        entries.forEach(e => {
            console.log(`[${e[1]}] ${e[3]} (${e[4] || ''})`);
        });
    } else {
        console.log(`--- ${item.word} --- (NOT FOUND)`);
    }
    console.log("");
});
