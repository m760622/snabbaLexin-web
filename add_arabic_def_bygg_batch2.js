/**
 * Add Arabic definitions for Bygg terms - Batch 2
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

// Arabic definitions for Bygg terms - Batch 2
const arabicDefinitions = {
    "Angripen ved": "خشب مصاب (بالتلف/الحشرات)",
    "Angripet virke": "خشب متضرر (مهاجم)",
    "Angöringsgata": "طريق الوصول (شارع الدخول)",
    "Angöringsplats": "مكان التوقف (لتحميل الركاب/البضائع)",
    "Ankarbjälke": "عارضة ربط (تثبيت)",
    "Ankarjärn": "سيخ تثبيت (خطاف)",
    "Ankarskruv": "براغي تثبيت (مرساة)",
    "Ankarslut": "نهاية التثبيت (المرساة)",
    "Ankarspik": "مسمار تثبيت (مسنن)",
    "Ankarspikpistol": "مسدس مسامير التثبيت",
    "Ankomstsignal": "إشارة الوصول (للمصعد)",
    "Anläggning": "منشأة (أو مرفق)",
    "Anläggningsarbete": "أعمال الإنشاءات (البنية التحتية)",
    "Anläggningsarbete under jord": "أعمال إنشائية تحت الأرض",
    "Anläggningsavgift": "رسوم التوصيل (الإنشاء)",
    "Anläggningsfastighet": "عقار المنشأة",
    "Anläggningskonstruktör": "مصمم منشآت (مدني)",
    "Anläggningstillstånd": "تصريح إنشاء",
    "Anläggningsväg": "طريق خدمة (للموقع)",
    "Anläggningsyta": "مساحة المنشأة",
    "Anmodan": "طلب رسمي (إشعار)",
    "Anmälningstid": "فترة التسجيل (الإخطار)",
    "Anmärkning": "ملاحظة (تنبيه بعيب)",
    "Annex": "ملحق (مبنى إضافي)",
    "Annons": "إعلان",
    "Annonsera": "يعلن",
    "Annuitetslån": "قرض سنوي (أقساط سنوية متساوية)",
    "Anod": "قطب موجب (أنود)",
    "Anrikning": "تخصيب (تركيز الخامات)",
    "Anrop för nedfärd": "استدعاء للنزول (المصعد)",
    "Anropsknapp": "زر الاستدعاء",
    "Ansats": "طوق (حافة بارزة في ماسورة/بداية)",
    "Ansatsfil": "مبرد كتف (مبرد مسطح الجوانب)",
    "Ansiktsskärm": "واقي الوجه",
    "Anskaffning": "شراء (توريد/حيازة)",
    "Anskaffning av ersättningsmark": "حيازة أرض بديلة",
    "Ansluta": "يوصل (يربط)",
    "Anslutning": "توصيلة (ربط/اتصال)",
    "Anslutningsdon": "موصل (جهاز توصيل)",
    "Anslutningskabel": "كابل توصيل",
    "Anslutningskanal": "قناة توصيل",
    "Anslutningsklämma": "مشبك توصيل (طرف توصيل)",
    "Anslutningsledningar till huvudledning": "خطوط التوصيل بالخط الرئيسي",
    "Anslutningsmått": "أبعاد التوصيل",
    "Anslutningsplint": "علبة التوصيل (لوحة أطراف)",
    "Anslutningsriktning": "اتجاه التوصيل",
    "Anslutningsschema": "مخطط التوصيل",
    "Anslutningsspänning": "جهد التوصيل (الفولتية)",
    "Anslutningstabell": "جدول التوصيلات",
    "Ansvarig arbetsledare": "مشرف العمل المسؤول",
    "Ansvarsbesiktning": "فحص المسؤولية (تفتيش)",
    "Ansvarsfördelning": "توزيع المسؤوليات",
    "Ansvarsförsäkring": "تأمين المسؤولية المدنية",
    "Ansvarsområde": "مجال المسؤولية",
    "Ansättare": "مُثبّت (أداة ضبط)",
    "Ansättning": "تثبيت (ضبط/شد)",
    "Ansättningsfel": "خطأ في التثبيت (المحاذاة)",
    "Antagningsbrev": "خطاب قبول",
    "Anti - korruption": "مكافحة الفساد",
    "Antracit": "أنثراسيت (فحم صلب)",
    "Antändbart material": "مادة قابلة للاشتعال",
    "Antändning": "اشتعال",
    "Anvisa": "يخصص (يوجه)",
    "Anvisade medel": "أموال مخصصة",
    "Anvisningsområde": "منطقة مخصصة (توجيهية)",
    "Användare": "مستخدم",
    "Användningsförbud": "حظر الاستخدام",
    "Användningsområde": "مجال الاستخدام",
    "Applicera": "يطبق (يضع طلاء/لاصق)",
    "Arbetsanalys": "تحليل العمل",
    "Arbetsattityd": "سلوك العمل (موقف)",
    "Arbetsbänk": "طاولة عمل (منضدة)",
    "Areal": "مساحة",
    "Arkitektsskala": "مقياس معماري",
    "Armatur": "وحدة إضاءة (أو صنبور - حسب السياق، غالباً إضاءة في البناء)",
    "Armerad betong": "خرسانة مسلحة",
    "Armering": "تسليح (تقوية)",
    "Armeringsförteckning": "قائمة التسليح (جدول حديد التسليح)",
    "Armeringsjärn": "حديد التسليح",
    "Armeringsklipp": "مقص حديد التسليح (قاطع)",
    "Armeringskorg": "قفص تسليح",
    "Armeringsmatta": "شبكة تسليح",
    "Armeringsnät": "شبكة حديد تسليح",
    "Armeringsritning": "رسم تسليح (مخطط)",
    "Armeringsspecifikation": "مواصفات التسليح",
    "Armeringsstål": "فولاذ التسليح",
    "Armeringsstång": "قضيب تسليح",
    "Armkran": "رافعة ذراعية",
    "Armskydd": "واقي الذراع",
    "Arrendera": "يستأجر (أرض زراعية/عقار)",
    "Asfalterad yta": "سطح مسفلت (معبد)",
    "Asfaltit": "أسفلتيت (أسفلت طبيعي صلب)",
    "Asfaltklister": "لاصق أسفلتي",
    "Asfaltlösning": "محاول أسفلتي",
    "Asfaltmassa": "كتلة أسفلتية (عجينة)",
    "Asfaltpapp": "ورق أسفلت (لباد)",
    "Asfaltraka": "مكشطة أسفلت (مجرفة تسوية)",
    "Asfaltsarbetare": "عامل رصف (أسفلت)",
    "Asfaltsläggning": "رصف الأسفلت",
    "Asfaltspridning": "فرش الأسفلت"
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
