/**
 * Add Arabic definitions for Medicin terms - Batch 13
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

// Arabic definitions for Medicin terms - Batch 13
const arabicDefinitions = {
    "Humant papillom virus HPV - virus": "فيروس الورم الحليمي البشري (HPV)",
    "Humörsvängning": "تقلب المزاج",
    "Hus - familjeläkare": "طبيب الأسرة (طبيب عام)",
    "Husdamm": "غبار المنزل",
    "Husmanskost": "طعام منزلي (تقليدي)",
    "Huvud": "رأس",
    "Huvudbronkerna": "القصبات الهوائية الرئيسية",
    "Huvudet, kraniet": "الجمجمة (الرأس/القحف)",
    "Huvudets muskler": "عضلات الرأس",
    "Huvudlus": "قمل الرأس",
    "Huvudroll": "دور رئيسي",
    "Huvudvärk - huvudvärken": "صداع - الصداع",
    "Huvudändan": "ناحية الرأس (الطرف العلوي)",
    "Hyalint brosk": "غضروف زجاجي (شفاف)",
    "Hygien": "نظافة صحية",
    "Hyperakusi": "احتداد السمع (حساسية مفرطة للأصوات)",
    "Hyperglukemi": "فرط سكر الدم (Hyperglykemi)",
    "Hypernefrom": "سرطان الكلى (ورم كلوي خلوي)",
    "Hyperventilation": "فرط التنفس",
    "Hypofyshormon": "هرمون الغدة النخامية",
    "Hypoglukemi": "هبوط سكر الدم (Hypoglykemi)",
    "Hyposensibilisering": "علاج إزالة التحسس (مناعي)",
    "Hypothalamus": "الوطاء (تحت المهاد)",
    "Hypotyreos": "قصور الغدة الدرقية",
    "Hypotyreos - Myxödem": "قصور الدرقية - وذمة مخاطية",
    "Hypoventilation": "قصور التهوية (نقص التنفس)",
    "Hysteri": "هستيريا",
    "Hyvlar bort": "يكشط (يزيل طبقة)",
    "Håligheter": "تجاويف",
    "Hålla borta": "يبعد (يقي من)",
    "Hållfasthet": "متانة (صلابة)",
    "Hållkänsla": "شعور بالنغز (ألم في الجنب أثناء الجري)",
    "Hålrum": "تجويف (فراغ)",
    "Hålvenerna": "الأوردة الجوفاء (Venae cavae)",
    "Hår": "شعر",
    "Hårbotten": "فروة الرأس",
    "Hård och knölig": "صلب ومتكتل",
    "Hårda gommen": "الحنك الصلب",
    "Hårda hinnan": "الأم الجافية (الطبقة الصلبة)",
    "Hårda hjärnhinnan": "الأم الجافية (غشاء الدماغ الصلب)",
    "Hårlöken": "بصلة الشعرة (الجذر)",
    "Hårresarmuskeln": "العضلة الناصبة للشعر",
    "Hårrot": "جذر الشعرة",
    "Hårroten": "جذر الشعرة",
    "Hårrörskärl": "شعيرات دموية",
    "Hårskaftet": "ساق الشعرة",
    "Hårsäckar": "بصيلات الشعر (جريبات)",
    "Hårsäcken": "بصيلة الشعر",
    "Häftigt": "شديد (عنيف)",
    "Hälbenet": "عظم الكعب",
    "Hälknölen": "حدبة الكعب",
    "Hälso och sjukvårdens ansvarsnämnd": "لجنة المسؤولية الطبية (HSAN)",
    "Hälsokontroll": "فحص طبي شامل",
    "Hämma": "يثبط (يكبح)",
    "Hängbröst": "ثدي مترهل",
    "Härbärgera": "يؤوي (يحتوي على)",
    "Härbärgerar": "يؤوي (يحمل)",
    "Härigenom": "من خلال هذا (بذلك)",
    "Härstammar från": "ينحدر من (أصله من)",
    "häva hindret": "يزيل العائق", // Lowercase normalized for robustness if needed, but keeping as is
    "Häva hindret": "يزيل العائق (يرفع المانع)",
    "Hävstänger": "روافع (عظام تعمل كروافع)",
    "Höft": "ورك",
    "Höftben": "عظم الورك",
    "Höftbenen": "عظام الورك",
    "Höftens muskler": "عضلات الورك",
    "Höftledsprotes": "مفصل ورك صناعي",
    "Höger lob": "الفص الأيمن",
    "Höggradig": "عالي الدرجة (شديد)",
    "Högkostnadskort": "بطاقة السقف الأعلى (للتكاليف الطبية)",
    "Högkostnadsskyddet": "حماية السقف الأعلى للتكاليف",
    "Högt blodtryck, hypertoni": "ارتفاع ضغط الدم",
    "Hörapparat": "سماعة طبية (للأذن)",
    "Hörapparat": "سماعة أذن (مكرر)",
    "Hörntänder": "أنياب",
    "Hörselben": "عظيمات السمع",
    "Hörselcentral": "مركز السمع (بالدماغ)",
    "Hörselcentrum": "مركز السمع",
    "Hörselgångsfurunkel": "دمل قناة الأذن",
    "Hörselnerven": "عصب السمع",
    "Hörselorgan": "عضو السمع",
    "Hörselsinne": "حاسة السمع",
    "Hörselsinneceller": "خلايا حسية سمعية",
    "Hörselskadad": "ضعيف السمع",
    "Hörselskador": "أضرار سمعية (إعاقة سمعية)",
    "Hörselsymtom": "أعراض سمعية",
    "I förbindelse med": "بالارتباط مع",
    "I höjd med": "بمحاذاة (عند مستوى)",
    "I medeltal": "في المتوسط",
    "I navelhöjd": "بمستوى السرة",
    "I samspel": "بتفاعل (بتضافر)",
    "Icke - allergiskt kontakteksem": "إكزيما تلامسية غير تحسسية (تهيجية)",
    "Ihålig nål": "إبرة مجوفة",
    "Ihåliga": "مجوفة",
    "Ihåliga organ": "أعضاء مجوفة",
    "Ihållande": "مستمر (دائم)",
    "Ihållande kräkningar": "قيء مستمر",
    "Ihållande smärtor": "آلام مستمرة",
    "Ileum ( krumtarm )": "الللفائفي (نهاية الأمعاء الدقيقة)",
    "Ileus": "انسداد معوي",
    "Illaluktande": "كريه الرائحة"
};

let updatedCount = 0;

dictionaryData.forEach((entry) => {
    const type = (entry[COL_TYPE] || '').trim();
    const word = entry[COL_SWE];
    const currentDef = entry[COL_ARB_DEF] || '';

    // Using mapping to handle duplicates in list
    if (type === 'Medicin.' && !currentDef.trim() && arabicDefinitions[word]) {
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
