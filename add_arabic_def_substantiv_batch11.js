/**
 * Add Arabic definitions for Substantiv words - Batch 11 (Final remaining 61)
 */

const fs = require('fs');

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
const COL_ARB_DEF = 5;

// Arabic definitions - Final remaining
const arabicDefinitions = {
    "Vredesmod": "حالة غضب شديد",
    "Vrångstrupe": "دخول الطعام في مجرى التنفس الخاطئ",
    "Våglängd": "طول موجة، توافق في الآراء",
    "Väga": "الاتباع والسير في طريق",
    "Vägnar": "نيابة عن شخص آخر",
    "Väldigt": "بشكل كبير جداً",
    "Välfärdsstat": "دولة الرفاهية التي توفر الخدمات الاجتماعية",
    "Värdefull": "ثمين وقيّم",
    "Värdefullt": "شيء له قيمة عالية",
    "Värdighet": "كرامة وهيبة",
    "Värmepump": "مضخة حرارية للتدفئة",
    "Väsen": "كيان أو طبيعة، ضجة",
    "Växt": "نبات، نمو وتطور",
    "Ylle": "صوف الخروف",
    "Yrke": "مهنة وحرفة",
    "Yrkesarbetande": "شخص يعمل بمهنة",
    "Yrkesutbildning": "تعليم مهني وتدريب",
    "Åka": "الذهاب بوسيلة نقل",
    "Åldrande": "التقدم في السن",
    "Ångra": "الندم على فعل ما",
    "Årsinkomst": "الدخل السنوي",
    "Årsskifte": "نهاية السنة وبداية الجديدة",
    "Åsidosätt": "التجاهل والإهمال",
    "Återanvändning": "إعادة استخدام",
    "Återbetalning": "سداد أو إرجاع المال",
    "Återgång": "عودة إلى حالة سابقة",
    "Återhämta": "استعادة القوة والتعافي",
    "Återvinning": "إعادة تدوير المواد",
    "Äktenskap": "زواج",
    "Äldreomsorg": "رعاية المسنين",
    "Ändamål": "غرض وهدف",
    "Ängslan": "قلق وخوف",
    "Äntligen": "أخيراً، بعد طول انتظار",
    "Öde": "مصير، مكان مهجور",
    "Ödmjukhet": "التواضع",
    "Öga": "العين",
    "Ögat": "العين المجردة",
    "Ögonblick": "لحظة قصيرة",
    "Ögonblicklig": "فوري وآني",
    "Ökning": "زيادة ونمو",
    "Önska": "التمني والرغبة",
    "Öppen": "مفتوح، صريح",
    "Öppna": "الانفتاح",
    "Öra": "الأذن",
    "Örat": "الأذن نفسها",
    "Öresund": "مضيق أوريسوند بين السويد والدنمارك",
    "Örhänge": "قرط الأذن",
    "Övergång": "عبور، انتقال",
    "Övergångsboende": "سكن مؤقت انتقالي",
    "Övergrepp": "اعتداء أو تعدٍّ",
    "Överhuvudtaget": "على الإطلاق، بشكل عام",
    "Överläkare": "طبيب رئيسي أو استشاري",
    "Övermorgon": "بعد غد",
    "Överraskning": "مفاجأة",
    "Överskott": "فائض مالي",
    "Översättning": "ترجمة من لغة لأخرى",
    "Övervakning": "مراقبة ورصد",
    "Övervikt": "زيادة في الوزن",
    "Övning": "تمرين وممارسة",
    "Vägbeskrivning": "توجيهات الطريق",
    "Vägkorsning": "تقاطع طرق"
};

let updatedCount = 0;

dictionaryData.forEach((entry) => {
    const type = (entry[COL_TYPE] || '').trim();
    const word = entry[COL_SWE];
    const currentDef = entry[COL_ARB_DEF] || '';

    if (type === 'Substantiv.' && !currentDef.trim() && arabicDefinitions[word]) {
        entry[COL_ARB_DEF] = arabicDefinitions[word];
        updatedCount++;
        console.log(`✅ ${word}`);
    }
});

// Write back to data.js
const output = 'const dictionaryData = ' + JSON.stringify(dictionaryData, null, 2) + ';';
fs.writeFileSync('./data.js', output);

console.log(`\n📊 تم تحديث ${updatedCount} كلمة`);
console.log('✅ تم حفظ التغييرات في data.js');
