/**
 * Add Arabic definitions for Bygg terms - Batch 13
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

// Arabic definitions for Bygg terms - Batch 13
const arabicDefinitions = {
    "Klicksystem": "نظام التشبيك بالنقر (للأرضيات)",
    "Klimatförändring": "تغير المناخ",
    "Klimathot": "تهديد مناخي",
    "Klimatpåverkan": "تأثير مناخي",
    "Klimatskärm": "غلاف المبنى الحراري (العزل)",
    "Klimatutmaning": "تحدي المناخ",
    "Klinker": "بلاط كلينكر (أرضيات صلب)",
    "Klipptång - Avbitartång": "كماشة قطع (زرادية)",
    "Klisterpensel": "فرشاة الغراء",
    "KMA ( Kvalitet - Miljö )": "KMA (الجودة، البيئة، وبيئة العمل)",
    "Koldioxidutsläpp": "انبعاثات ثاني أكسيد الكربون",
    "Kollaps": "انهيار",
    "Kollega": "زميل",
    "Kollision - Krock": "تصادم",
    "Komfortkyla": "تكييف مريح (تبريد)",
    "Kommande generationer": "الأجيال القادمة",
    "Kommunal mark": "أرض البلدية",
    "Kommunikationsavdelning": "قسم الاتصالات",
    "Komponent": "مكون",
    "Komposit": "مركب (مادة مركبة)",
    "Kompress": "ضمادة (أو كباسة طبية)",
    "Kompressor": "ضاغط (كمبريسور)",
    "Komprimator": "ضاغطة (للنفايات/التربة)",
    "Kon": "مخروط",
    "Koncernchef": "رئيس تنفيذي للمجموعة",
    "Kondensatorer": "مكثفات",
    "Kondensavfuktare": "مزيل رطوبة بالتكثيف",
    "Konkurrenskraft": "قدرة تنافسية",
    "Konstruktionsberäkningar": "حسابات إنشائية",
    "Konstruktionselement": "عنصر إنشائي",
    "Konstruktionsledare": "مدير التصميم الإنشائي",
    "Konstruktionsritning": "مخطط إنشائي",
    "Konstruktör": "مهندس تصميم (إنشائي)",
    "Konsult": "استشاري",
    "Konsultation": "استشارة",
    "Konsultföretag": "شركة استشارية",
    "Konsultuppdrag": "مهمة استشارية",
    "Kontinuerlig": "مستمر",
    "Kontrakt": "عقد",
    "Kontraktsarbete": "عمل بموجب عقد",
    "Kontraktsbelopp": "مبلغ العقد",
    "Kontraktsdatum": "تاريخ العقد",
    "Kontrollansvarig": "مسؤول الرقابة (مفتش معتمد)",
    "Kontroller": "ضوابط (تفتيش)",
    "Kontrollera": "يفحص (يتحقق)",
    "Kontrollplan": "خطة الرقابة",
    "Kortling": "عارضة عرضية (قطعة خشبية للتقوية - Nogging)",
    "Kostnadsbedömning": "تقدير التكلفة",
    "Kostnadsstyrning": "التحكم في التكلفة",
    "Krafter": "قوى",
    "Kran": "رافعة (أو صنبور)",
    "Kravgränser": "حدود المتطلبات",
    "Krisplanering och hantering": "تخطيط وإدارة الأزمات",
    "Krokar": "خطافات (شناكل)",
    "Krossa": "يسحق (يكسر)",
    "Krossare": "كسارة",
    "Krypgrund": "قبو زحف (فراغ تهوية أسفل المبنى - Crawl space)",
    "Kulvert": "عبارة (نفق خدمات)",
    "Kund": "عميل",
    "Kundserviceavdelning": "قسم خدمة العملاء",
    "Kvalitetsambition": "طموح الجودة",
    "Kvalitetsmässigt": "من حيث الجودة",
    "Kvalitetssäkra": "ضمان الجودة",
    "Kvartsstav": "قالب ربع دائري (Quarter round)",
    "Kyl": "تبريد",
    "Källare": "قبو (سرداب/تسوية)",
    "Källarplan": "طابق القبو (التسوية)",
    "Kärl": "وعاء",
    "Köldbrygga": "جسر حراري (منطقة تسريب)",
    "Körbana": "مسار القيادة (الطريق)",
    "Körfält": "مسرب (حارة مرورية)",
    "Lack": "طلاء اللك (ورنيش/لكر)",
    "Lackboard": "لوح مطلي (مازونيت)",
    "Lag": "قانون (أو فريق/طبقة)",
    "Lagbasmöte": "اجتماع رئيس الفريق",
    "Lager": "مخزن (أو محمل/طبقة)",
    "Lamellträ": "خشب صفائحي (لوح خشب رقائقي)",
    "Laminat": "صفائح (لامينيت)",
    "Laminatskärare": "قاطعة اللامينيت",
    "Landskap": "منظر طبيعي (تنسيق حدائق)",
    "Lantmätare": "مساح أراضي",
    "Larm": "إنذار",
    "Larmlista": "قائمة الإنذار (شريط توصيل)",
    "Larmtråd": "سلك إنذار",
    "Laser": "ليزر",
    "Last": "حمل (حمولة)",
    "Lastmaskiner": "آلات تحميل (جرافات)",
    "Lasttest": "اختبار التحميل",
    "Laständring": "تغير الحمل",
    "Lasyr": "طلاء شفاف (غليز)",
    "Latex": "لاتكس (مطاط)",
    "Latexfog": "معجون لاتكس",
    "Latexfärg": "دهان لاتكس",
    "Lecablock": "كتلة ليكا (طوب خفاف)",
    "Ledighet": "إجازة",
    "Ledningssträckor": "مسارات الأنابيب/الكابلات",
    "Ledstång": "درابزين (مقبض)",
    "Lera": "طين (صلصال)",
    "Lerskiffer": "طفل صفحي (صخر طيني)",
    "Leveranssäkerhet": "ضمان التوريد (موثوقية التسليم)"
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
