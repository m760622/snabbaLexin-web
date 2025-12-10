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
const COL_TYPE = 1;
const COL_ARB_DEF = 4;

// Manual Fixes Map: ID -> Correct Arabic Definition
const fixes = {
    "Lexin001617": "اسم يشير إلى وظيفة", // Assistent
    "Lexin001807": "طريق عريض", // Aveny
    "Lexin003352": "جزء من جهاز إلكتروني", // Bildrör
    "Lexin003361": "وثيقة دخول", // Biljett
    "Lexin003628": "نوع من الكلاب", // Blodhund
    "Lexin004016": "علم دراسة النباتات", // Botanik
    "Lexin004760": "مصطلح لغوي", // Böjning
    "Lexin005677": "كائن حي", // Djur
    "Lexin005930": "مبنى زجاجي للزراعة", // Drivhus
    "Lexin006773": "رسوم أو مكان الدخول", // Entré
    "Lexin007364": "سلوك أو شكل", // Fason
    "Lexin007550": "مادة خيطية الشكل", // Fiber
    "Lexin007747": "تضاريس جبلية أو قشرة سمك", // Fjäll
    "Lexin008323": "مظهر أو انطباع", // Framtoning
    "Lexin010172": "حدث هام أو نجاح مفاجئ", // Genombrott
    "Lexin010988": "ظهور فني موقت", // Gästspel
    "Lexin012168": "طعام صحي ومفيد", // Hälsokost
    "Lexin013423": "مشروب من الفاكهة", // Juice
    "Lexin013613": "فوضى واضطراب", // Kalabalik
    "Lexin013878": "مذهب مسيحي", // Katolicism
    "Lexin014121": "تكوين صخري مرتفع", // Klippa
    "Lexin014391": "هيئة تعليمية", // Kollegium
    "Lexin014415": "قطعة أرض صغيرة للزراعة", // Kolonilott
    "Lexin014670": "اجتماع وزاري رسمي", // Konselj
    "Lexin016613": "مبنى صغير في الحديقة", // Lusthus
    "Lexin018495": "لقاء بين أشخاص", // Möte
    "Lexin019137": "منطقة خصبة في الصحراء", // Oas
    "Lexin019257": "عملية إنتاج نباتي", // Odling
    "Lexin019538": "ممثل قانوني للمواطنين", // Ombudsman
    "Lexin019830": "جزء من الجسم أو مؤسسة", // Organ
    "Lexin020179": "مادة للكتابة والطباعة", // Papper
    "Lexin020729": "اجتماع كامل الأعضاء", // Plenarsammanträde
    "Lexin020730": "اجتماع عام", // Plenum
    "Lexin022462": "اجتماع وطني عام", // Riksstämma
    "Lexin023150": "مادة تحرق لتعطي رائحة عطرة", // Rökelse
    "Lexin023304": "طبق من الخضروات المختلطة", // Sallad (The Meal)
    "Lexin023412": "تجمع لأشخاص", // Sammankomst
    "Lexin023789": "فترة انعقاد أو جلسة", // Session
    "Lexin023835": "عرض ترفيهي", // Show
    "Lexin024802": "شعر ينمو على الوجه", // Skägg
    "Lexin025147": "منطقة أرضية منبسطة", // Slätt
    "Lexin001272": "فاكهة", // Aprikos (Let's make fruits 'Fruit' instead of Plant/Tree if possible? No, keep them as plant/tree is acceptable, but user wanted correction. 'Plant or Tree' is generic. I will only fix non-plants for now based on strict mismatch.)
};

let modifiedCount = 0;

dictionaryData.forEach(entry => {
    const id = entry[COL_ID];

    // Only fix if it currently HAS the wrong definition
    if (entry[COL_ARB_DEF] === "نبات أو شجرة" && fixes[id]) {
        console.log(`Fixing ${id} (${entry[2]}): "${fixes[id]}"`);
        entry[COL_ARB_DEF] = fixes[id];
        modifiedCount++;
    }
});

// Write back
const newContent = prefix + JSON.stringify(dictionaryData, null, 2) + suffix;
fs.writeFileSync('./data.js', newContent, 'utf-8');

console.log(`\n✅ Fixed ${modifiedCount} plant errors.`);
