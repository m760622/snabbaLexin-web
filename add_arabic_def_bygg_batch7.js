/**
 * Add Arabic definitions for Bygg terms - Batch 7
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

// Arabic definitions for Bygg terms - Batch 7
const arabicDefinitions = {
    "Dammtorr": "جاف للغبار (طلاء جاف لا يلتصق به الغبار)",
    "Datorer": "أجهزة الكمبيوتر",
    "Defekt": "عيب",
    "Deformation": "تشوه",
    "Densitet": "كثافة",
    "Deponering": "إيداع (دفن نفايات)",
    "Deponeringsplan": "خطة الدفن (للنفايات)",
    "Deponi": "مكب نفايات",
    "Design": "تصميم",
    "Designkoncept": "مفهوم التصميم",
    "Destillerad asfalt": "أسفلت مقطر (مكرر)",
    "Destillerad tjära": "قطران مقطر",
    "Detalj": "تفصيل (قطعة)",
    "Detaljeringsnivå": "مستوى التفصيل",
    "Detaljhandel": "تجارة التجزئة",
    "Detaljplan": "خطة تفصيلية (تنظيم مدني)",
    "Detaljritning": "رسم تفصيلي",
    "Detaljtidplan": "جدول زمني تفصيلي",
    "Detektorslinga": "حلقة استشعار (للمرور)",
    "Diabas": "دياباز (صخر بركاني)",
    "Diagonal schaktningsmaskin": "جرافة قطرية (مائلة)",
    "Diagram": "مخطط بياني",
    "Diamantborrmaskin": "مثقاب ماسي",
    "Diameter": "قطر",
    "Dilatationsfog - Rörelsefog": "فاصل تمدد",
    "Dimension": "بُعد (قياس/حجم)",
    "Dimensioneringsgrunder": "أسس التصميم (حساب الأبعاد)",
    "Dimensioneringskriterier": "معايير التصميم",
    "Dimensionstolerans": "تفاوت الأبعاد (سماحية)",
    "Direkta kostnader": "تكاليف مباشرة",
    "Direktör": "مدير عام",
    "Dirigera om": "يوجه (يحول المسار)",
    "Diskho": "حوض جلي (مجلى)",
    "Diskontering": "خصم (تخفيض القيمة الحالية)",
    "Distriktschef": "مدير المنطقة",
    "Distriktsekonom": "المحاسب الإقليمي (للمنطقة)",
    "Drag": "تيار هوائي (أو سحب/شد)",
    "Dragbalk": "عارضة شد",
    "Dragband": "شريط شد (ربط)",
    "Dragbelastning": "حمل الشد",
    "Dragfjäder": "نابض شد (أو سلك سحب أسلاك)",
    "Dragkraft": "قوة السحب (الشد)",
    "Dragspänning": "إجهاد الشد",
    "Dragstång": "قضيب شد",
    "Drift": "تشغيل (عمليات)",
    "Droger": "أدوية / مخدرات (مواد كيميائية)",
    "Droppbleck": "صفيحة تقطير (حماية من المطر)",
    "Dränering": "تصريف المياه (بزل)",
    "Dräneringsbrunn": "بئر تصريف",
    "Dräneringsrör": "أنبوب تصريف",
    "Dräneringssystem": "نظام تصريف",
    "Dräneringsvatten": "مياه الصرف (المبزولة)",
    "Dröjsmålsvite": "غرامة تأخير",
    "Dubbelhuvad spik": "مسمار مزدوج الرأس (للشدات المؤقتة)",
    "Duktilitet": "مطيليّة (قابلية السحب للأسلاك)",
    "Dumper": "شاحنة قلابة",
    "Dyckert": "مسمار بدون رأس (للتشطيب)",
    "Dymling": "وتد (دبوس خشبي/معدني)",
    "Döda laster": "أحمال ميتة (ثابتة)",
    "Dödvikt": "الوزن الميت (الذاتي)",
    "Dörr": "باب",
    "Dörrkarm": "إطار الباب (حلق)",
    "Dörrpost": "قائم الباب (عضادة)",
    "Dörröppning": "فتحة الباب",
    "E - ritning": "مخطط كهربائي (E-ritning)",
    "Efterbehandling": "معالجة لاحقة (تشطيب نهائي)",
    "Efterhärdning": "تصلب لاحق (إنضاج إضافي)",
    "Egendomsgräns": "حدود الملكية",
    "Egenkontroll": "رقابة ذاتية",
    "Egenskapskrav": "متطلبات الأداء (الخصائص)",
    "Egenspänning": "إجهاد متبقي (ذاتي)",
    "Ek": "بلوط (سنديان)",
    "Ekodukt": "جسر بيئي (ممر للحياة البرية)",
    "Ekonom": "خبير اقتصادي (محاسب)",
    "Ekonomibyggnad": "مبنى ملحق (للاستخدام الاقتصادي/الزراعي)",
    "Ekonomimöte": "اجتماع مالي",
    "Ekonomisk plan": "خطة اقتصادية (مالية)",
    "Ekonomiska aspekter": "الجوانب الاقتصادية",
    "Ekonomiska värden": "قيم اقتصادية",
    "Ekosystem": "نظام بيئي",
    "El": "كهرباء",
    "Elasticitetsmodul": "معامل المرونة",
    "Elavbrott": "انقطاع الكهرباء",
    "Eld": "نار (حريق)",
    "Eldfast material": "مادة مقاومة للحرارة (طوب حراري)",
    "Eldriven": "يعمل بالكهرباء",
    "Eldstad": "موقد (مدفأة)",
    "Elektriker": "كهربائي",
    "Elektrod": "قطب كهربائي (إلكترود)",
    "Element": "عنصر (وحدة بناء جاهزة/مشع حراري)",
    "Elementhus": "منزل جاهز (مسبق الصنع)",
    "Elförsörjning": "إمداد الطاقة (الكهرباء)",
    "Elförzinkad spik": "مسمار مجلفن كهربائياً",
    "Elinstallation": "تمديدات كهربائية",
    "Elkanal": "قناة كابلات كهربائية",
    "Elkopplare": "مفتاح كهربائي (قاطع)",
    "Elmätare": "عداد كهرباء",
    "Elmätarskåp": "صندوق عداد الكهرباء",
    "Elnät": "شبكة كهرباء"
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
