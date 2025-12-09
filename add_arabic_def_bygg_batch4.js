/**
 * Add Arabic definitions for Bygg terms - Batch 4
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

// Arabic definitions for Bygg terms - Batch 4
const arabicDefinitions = {
    "Befintlig byggnad": "مبنى قائم",
    "Befintlig markanvändning": "استخدام الأرض الحالي",
    "Befintlig tjänst": "خدمة قائمة",
    "Befolkningstäthet": "الكثافة السكانية",
    "Befuktning": "ترطيب (إضافة الرطوبة للهواء)",
    "Begränsa": "يحد (يقيد)",
    "Begränsad anbudsinfordran": "مناقصة محدودة (دعوة محصورة)",
    "Behovsutredning": "تحليل الاحتياجات (دراسة)",
    "Belastningsgrad": "درجة التحميل (نسبة الحمل)",
    "Belastningsnivå": "مستوى الحمل",
    "Belastningstyp": "نوع الحمل",
    "Belastningsvariationer": "تفاوتات الحمل",
    "Belastningsvärden": "قيم الحمل",
    "Belysning": "إضاءة (إنارة)",
    "Belysningsplaner": "مخططات الإضاءة",
    "Belåningsvärde": "قيمة الرهن (القيمة المعتمدة للقرض)",
    "Beläggning": "تغطية (طلاء/رصف)",
    "Beläggning": "إشغال (مكرر - قد يعني occupancy حسب السياق)", // Mapping handles duplicates
    "Bemanningsföretag": "شركة توظيف (توريد عمالة)",
    "Benchmark": "نقطة مرجعية (علامة مساحة/Benchmark)",
    "Beredskapsarbete": "عمل الطوارئ (الإغاثة)",
    "Beredskapsplan": "خطة طوارئ",
    "Beredskapsåtgärd": "إجراء احترازي (تأهبي)",
    "Berg": "صخر (جبل)",
    "Bergborr": "مثقاب صخري",
    "Bergborrmaskin": "آلة حفر الصخور",
    "Bergklass": "فئة الصخور (تصنيف)",
    "Bergklassificering": "تصنيف الصخور",
    "Bergkross": "كسارة صخور",
    "Bergmassa": "كتلة صخرية",
    "Bergmaterial": "مواد صخرية",
    "Bergnivå": "منسوب الصخر",
    "Bergrensning": "تنظيف الصخور (إزالة القطع السائبة)",
    "Bergschakt": "بئر (منجم/عمود راسي)",
    "Bergschaktning": "حفر الصخور",
    "Bergsektion": "قطاع صخري",
    "Bergskott": "تفجير الصخور",
    "Bergsprängning": "نسف الصخور",
    "Bergspänning": "إجهاد الصخر",
    "Bergtryck": "ضغط الصخر",
    "Berguttag": "استخراج الصخور",
    "Bergvärme": "حرارة جوفية (من الصخر)",
    "Beräkningstryck": "ضغط التصميم (الحسابي)",
    "Besiktningsman": "مفتش (فاحص معتمد)",
    "Besiktningsplan": "خطة التفتيش",
    "Besiktningsprotokoll": "محضر التفتيش",
    "Beskrivning": "وصف (مواصفات)",
    "Beskrivningar": "أوصاف (مواصفات)",
    "Beslut": "قرار",
    "Beslutanderätt": "سلطة اتخاذ القرار",
    "Beslutsfattare": "صانع القرار",
    "Bestyrka": "يوثق (يصدق على صحة)",
    "Beställare": "صاحب العمل (العميل/طالب المشروع)",
    "Beställning": "طلب (أمر شراء/عمل)",
    "Beställningsarbete": "عمل حسب الطلب",
    "Besöksparkering": "موقف زوار",
    "Betalningsplan": "خطة الدفع (جدول الدفعات)",
    "Betong": "خرسانة (باطون)",
    "Betongare": "عامل خرسانة",
    "Betongbeläggning": "رصف خرساني (طبقة)",
    "Betongbil": "شاحنة خرسانة (خلاطة)",
    "Betongblandare": "خلاطة خرسانة",
    "Betongbro": "جسر خرساني",
    "Betonggjutform": "قالب صب الخرسانة",
    "Betonggjutning": "صب الخرسانة",
    "Betongglättare": "مروحة تنعيم الخرسانة (هليكوبتر)",
    "Betongkonstruktion": "منشأة خرسانية (هيكل)",
    "Betongkvalitet": "جودة الخرسانة (رتبة)",
    "Betongmassa": "خليط الخرسانة",
    "Betongpannor": "باطون (بلاط سطح خرساني)",
    "Betongplatta": "بلاطة خرسانية",
    "Betongprovning": "اختبار الخرسانة",
    "Betongpump": "مضخة خرسانة",
    "Betongrör": "أنبوب خرساني",
    "Betongsats": "دفع خرسانة (خلطة)",
    "Betongskikt": "طبقة خرسانية",
    "Betongskivor": "ألواح خرسانية",
    "Betongspruta": "قاذف خرسانة (للتوركيت)",
    "Betongstation": "محطة خرسانة مركزية",
    "Betongsten": "طوب خرساني (بلوك)",
    "Betongsåg": "منشار خرسانة",
    "Betongtemperatur": "درجة حرارة الخرسانة",
    "Betongtransport": "نقل الخرسانة",
    "Betsad": "مصبوغ (خشب معالج بالصبغة)",
    "Bevarandeområde": "منطقة محمية (للحفاظ على التراث)",
    "BFS ( Boverkets författnings - samling )": "BFS (مجموعة لوائح مصلحة الإسكان)",
    "BIA ( biarea )": "مساحة ثانوية (غير سكنية رئيسية)",
    "Bilaga": "ملحق (مرفق)",
    "Bilningshammare": "مطرقة تكسير (دريل)",
    "Biltrafik": "حركة مرور السيارات",
    "Bindare": "رابط (حجر ربط في البناء)",
    "Bindemedel": "مادة رابطة (أسمنت/غراء)",
    "Bindning": "تلاصق (شك/ربط)",
    "Bindningstid": "وقت الشك (التصلب)",
    "Biobränsle": "وقود حيوي",
    "Biogas": "غاز حيوي",
    "Biologisk mångfald": "تنوع بيولوجي",
    "Bits": "رؤوس مفكات (لقم)",
    "Bitumen": "بيتومين (قار)",
    "Bitumenbundet grus": "حصى بيتوميني (مخلوط)"
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
