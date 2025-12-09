/**
 * Add Arabic translations for examples that are missing them
 */

const fs = require('fs');

// Read data.js
const dataContent = fs.readFileSync('./data.js', 'utf-8');
let dictionaryData;
try {
    dictionaryData = JSON.parse(dataContent.replace('const dictionaryData = ', '').replace(/;$/, ''));
} catch (e) {
    const match = dataContent.match(/(?:const|var|let)\s+dictionaryData\s*=\s*(\[[\s\S]*?\]);/);
    dictionaryData = eval(match[1]);
}

const COL_TYPE = 1;
const COL_SWE = 2;
const COL_ARB = 3;
const COL_EX = 7;
const COL_EX_ARB = 8;

// Arabic translations for the examples
const translations = {
    "ett brutalt mord": "جريمة قتل وحشية",
    "ministerns famösa uttalande om neutraliteten ledde till hans avgång": "تصريح الوزير الشهير عن الحياد أدى إلى استقالته",
    "flagranta brott mot mänskliga rättigheter flagranta brott mot mänskliga rättigheter flagranta brott mot mänskliga rättigheter flagranta brott mot mänskliga rättigheter flagranta brott mot mänskliga rättigheter flagranta brott mot mänskliga rättigheter": "انتهاكات صارخة لحقوق الإنسان",
    "ful som ett troll": "قبيح كالغول",
    "jag förstår inte hur en normalt funtad människa kan göra så": "لا أفهم كيف يمكن لإنسان طبيعي أن يفعل ذلك",
    "stanna kvar i Malmö": "ابقَ في مالمو",
    "på vägen kom två personer varav en var flintskallig": "جاء شخصان في الطريق أحدهما كان أصلع",
    "växla till SEK": "صرِّف إلى كرونة سويدية",
    "post|gymnasiala studier": "دراسات ما بعد الثانوية",
    "äsch , det gör inget!": "أوف، لا بأس!",
    "plocka blommor": "قطف الزهور",
    "en byst av Linné": "تمثال نصفي للينيه",
    "se figur 2!": "انظر الشكل 2!",
    "genom myndigheternas försummelse": "بسبب إهمال السلطات",
    "bilarna möttes i en tvär kurva": "التقت السيارتان في منعطف حاد",
    "mötet blev en stark manifestation mot rasism": "أصبح الاجتماع تظاهرة قوية ضد العنصرية",
    "hans cynism är bara en mask": "تهكمه مجرد قناع",
    "Migrationsverket är en statlig myndighet": "مصلحة الهجرة هي سلطة حكومية",
    "reservdelar till gamla bilar är dyra": "قطع الغيار للسيارات القديمة غالية",
    "sväva i rymden": "التحليق في الفضاء",
    "flera av eleverna i 9:an känner skoltrötthet": "كثير من طلاب الصف التاسع يشعرون بالملل من الدراسة",
    "webbadressen till Svenska datatermgruppens ingångssida är http: / / www .nada .kth .se / dataterm": "عنوان الموقع لصفحة مجموعة المصطلحات السويدية",
    "hon fimpar sin cigarett": "هي تُطفئ سيجارتها",
    "arbetet på en ny motorväg fortskrider": "العمل على طريق سريع جديد يستمر",
    "han frestades att köpa bilen": "أُغري بشراء السيارة",
    "en öppen debatt är att föredra framför nuvarande smussel": "النقاش المفتوح أفضل من التستر الحالي",
    "föredra ett ärende": "تقديم قضية",
    "klockan klämtar för dig": "الجرس يقرع لك",
    "utöva ett yrke utöva kontroll han utövar ett dåligt inflytande på sina kamrater": "ممارسة مهنة، ممارسة السيطرة، هو يمارس تأثيراً سيئاً على رفاقه"
};

let updatedCount = 0;

// Update entries with missing Arabic example translations
dictionaryData.forEach((entry, index) => {
    const example = entry[COL_EX] || '';
    const exampleArabic = entry[COL_EX_ARB] || '';

    if (example.trim() && !exampleArabic.trim()) {
        if (translations[example]) {
            entry[COL_EX_ARB] = translations[example];
            updatedCount++;
            console.log(`✅ Updated: ${entry[COL_SWE]} - ${example.substring(0, 40)}...`);
        } else {
            console.log(`⚠️ No translation for: ${entry[COL_SWE]} - ${example.substring(0, 40)}...`);
        }
    }
});

// Write back to data.js
const output = 'const dictionaryData = ' + JSON.stringify(dictionaryData, null, 2) + ';';
fs.writeFileSync('./data.js', output);

console.log(`\n📊 تم تحديث ${updatedCount} مثال`);
console.log('✅ تم حفظ التغييرات في data.js');
