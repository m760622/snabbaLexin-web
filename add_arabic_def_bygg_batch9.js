/**
 * Add Arabic definitions for Bygg terms - Batch 9
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

// Arabic definitions for Bygg terms - Batch 9
const arabicDefinitions = {
    "Fast punkt": "نقطة ثابتة",
    "Fast skydd": "حماية ثابتة (واقي)",
    "Fast stöd": "دعامة ثابتة",
    "Fastighetsskötare": "عامل صيانة العقار (الناطور)",
    "Fastighetsskötsel": "صيانة العقارات",
    "Felaktig": "معيب (خاطئ)",
    "Felfritt virke": "خشب خالٍ من العيوب",
    "Felindikering": "مؤشر الخطأ (العطل)",
    "Fellokalisering": "تحديد موقع الخطأ",
    "Felmekanism": "آلية الفشل (الخلل)",
    "Felsäker": "آمن ضد الأعطال (Fail-safe)",
    "Felsökning": "استكشاف الأخطاء وإصلاحها",
    "Felsökningstid": "وقت استكشاف الخطأ",
    "Feltolerans": "تسامح الخطأ (الاحتمالية)",
    "Fettfilter": "مرشح دهون (في المطبخ)",
    "Fiberduk": "قماش غير منسوج (جيوتكستايل/Geotextile)",
    "Fiberriktning": "اتجاه الألياف",
    "Filter": "مرشح (فلتر)",
    "Filterduk": "قماش الترشيح",
    "Filterkammare": "غرفة الترشيح",
    "Filtrering": "ترشيح (تصفية)",
    "Fin ballast": "ركام ناعم (حصى ناعم)",
    "Finansiering": "تمويل",
    "Finansieringsplan": "خطة التمويل",
    "Fingrus": "حصى ناعم",
    "Finhyvlad yta": "سطح مسحوج ناعم (أملس)",
    "Finjord": "تربة ناعمة",
    "Finmakadam": "مكدام ناعم",
    "Finputsa": "يمسح ببراعة (تنعيم نهائي/قصارة ناعمة)",
    "Finslipa": "يجلخ (يصقل)",
    "Finslipad": "مصقول",
    "Finslipning": "صقل (تنعيم)",
    "Finsnickare": "نجار موبيليا (نجار دقيق)",
    "Finspackla": "معجنة ناعمة (تشطيب)",
    "Fiskbensmönstrad stensättning": "رصف بنمط عظم السمكة (متعرج)",
    "Fixering": "تثبيت",
    "Fixpunkt": "نقطة مرجعية ثابتة (معلم)",
    "Fjädring": "نوابض (تعليق/زنبرك)",
    "Fjärrstyrning": "تحكم عن بعد",
    "Fjärrvärme": "تدفئة مركزية للمناطق (تدفئة عن بعد)",
    "Flamma": "لهب",
    "Flampunkt": "نقطة الوميض",
    "Flamsäker": "مقاوم للهب",
    "Flatkabel": "كابل مسطح",
    "Flerbostadshus": "مبانٍ متعددة المساكن (عمارات)",
    "Flerfamiljshus": "منزل متعدد العائلات",
    "Flexibel arbetstid": "وقت عمل مرن",
    "Flisare": "آلة فرم الخشب (قطاعة)",
    "Flodbädd": "قاع النهر",
    "Flygbild": "صورة جوية",
    "Flygfält": "مهبط طائرات",
    "Flygfält": "مطار (حقل طيران - مكرر)",
    "Flygplats": "مطار",
    "Flytande avfall": "نفايات سائلة",
    "Flytande bitumen": "بيتومين سائل",
    "Flytande bro": "جسر عائم",
    "Flytande Golv": "أرضية عائمة",
    "Flytdocka": "حوض عائم",
    "Flytspackel": "معجون تسوية ذاتي (سائل)",
    "Flytta": "ينقل (ينتقل)",
    "Fläck": "بقعة",
    "Fläkt": "مروحة",
    "Fläktcentral": "مركز المراوح (غرفة الماكينات)",
    "Fläktkåpa": "غطاء المروحة (شفاط المطبخ)",
    "Fläktrum": "غرفة المراوح",
    "Fläns": "شفة (فلانشة)",
    "Flöde": "تدفق",
    "Flödesplan": "خطة التدفق",
    "Flödesschema": "مخطط التدفق",
    "Foder": "إطار خشبي (حول الباب/النافذة)",
    "Fog": "وصلة (فاصل/لحام)",
    "Foga": "يوصل (يجمع/يكحل)",
    "Fogbruk": "مونة الكحلة (للفواصل)",
    "Foglist": "شريط تغطية الفاصل",
    "Fogmassa": "معجون الفواصل (سيليكون/ماستيك)",
    "Fogmått": "قياس الفاصل",
    "Fogning": "تكحيل (ملء الفواصل)",
    "Fogningsmaskin": "آلة ملء الفواصل",
    "Fogsvans": "منشار يدوي (ذيل الثعلب)",
    "Fondtapet": "ورق جدران مميز (لجدار واحد)",
    "Forcerad ventilation": "تهوية قسرية",
    "Fordon": "مركبة",
    "Fordonsbredd": "عرض المركبة",
    "Fordonsdetektor": "كاشف المركبات",
    "Fordonssignal": "إشارة المرور",
    "Forma": "يشكل (يصيغ)",
    "Formbarhet": "قابلية التشكيل",
    "Formgivning": "تصميم (صياغة الشكل)",
    "Formgjutning": "صب في قوالب",
    "Formplywood": "خشب معاكس للقوالب (بليود)",
    "Formstycke": "قطعة مُشكَّلة (توصيلة)",
    "Formtegel": "طوب مُشكَّل (خاص)",
    "Formverk": "شدات خشبية (أعمال القوالب)",
    "Forskning och Utveckling": "البحث والتطوير (R&D)",
    "Fortlöpande kontroll": "فحص مستمر",
    "Fossila bränslen": "وقود أحفوري",
    "Fossilfri produktion": "إنتاج خالٍ من الوقود الأحفوري",
    "Fotgängare": "مشاة",
    "Fotpanel": "إزار (وزرة/نعلة الجدار)",
    "Fotplåt": "صاج سفلي (للسقف - مزاريب)"
};

let updatedCount = 0;

dictionaryData.forEach((entry) => {
    const type = (entry[COL_TYPE] || '').trim();
    const word = entry[COL_SWE];
    const currentDef = entry[COL_ARB_DEF] || '';

    // Using mapping to handle duplicates in list
    if (type === 'Bygg.' && !currentDef.trim() && arabicDefinitions[word]) {
        entry[COL_ARB_DEF] = arabicDefinitions[word];
        updatedCount++;
        console.log(`✅ ${word}`);
    }
});

// Write back to data.js
const output = 'const dictionaryData = ' + JSON.stringify(dictionaryData, null, 2) + ';';
fs.writeFileSync('./data.js', output);

console.log(`\n📊 Uppdaterade ${updatedCount} ord.`);
console.log('✅ Ändringar sparade i data.js');
