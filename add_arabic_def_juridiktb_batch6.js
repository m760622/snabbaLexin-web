/**
 * Add Arabic definitions for JuridikTB terms - Batch 6
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

// Arabic definitions for JuridikTB terms - Batch 6
const arabicDefinitions = {
    "Lagfaren domare": "قاضٍ قانوني (خريج حقوق)",
    "Lagföring": "ملاحقة قضائية",
    "Laglott": "حصة إرثية قانونية (نصف التركة للأبناء)",
    "Laglydig": "مطيع للقانون",
    "Lagrummet": "نص القانون (المادة القانونية)",
    "Lagstiftaren": "المشرع",
    "Lagstiftning": "تشريع (قوانين)",
    "Lagändring": "تعديل قانوني",
    "Lagöverträdelse": "مخالفة القانون (خرق القانون)",
    "Legalitetsprincipen": "مبدأ الشرعية (لا جريمة ولا عقوبة إلا بنص)",
    "Legat": "وصية بمال معين",
    "Legitimation": "إثبات هوية (بطاقة هوية) أو ترخيص مهني",
    "Legitimera sig": "يثبت هويته",
    "Lekman": "شخص عادي (غير مختص/قاضي محلف)",
    "Leva på existensminimum": "العيش على الحد الأدنى للمعيشة",
    "Likartad brottslighet": "إجرام مماثل",
    "LPT - Lag om psykiatrisk tvångsvård": "قانون الرعاية النفسية القسرية (LPT)",
    "LUL - Lag om särskild bestraffning av unga lagöverträdare": "قانون العقوبات الخاصة للأحداث (LUL)",
    "LVM - Lag om vård av missbrukare i vissa fall": "قانون رعاية المدمنين في حالات معينة (LVM)",
    "LVU - Lag med särskilda bestämmelser om vård av unga": "قانون رعاية الأحداث القسرية (LVU)",
    "Lägga ned åtal": "يحفظ الدعوى (يسقط التهمة)",
    "Lönegaranti": "ضمان الأجور (عند إفلاس رب العمل)",
    "Lös egendom": "منقولات (أموال منقولة)",
    "Maktmissbruk": "إساءة استعمال السلطة",
    "Mannamån mot borgenär": "محاباة دائن (تفضيل دائن على آخر)",
    "Med berått mod": "مع سبق الإصرار والترصد",
    "Medborgarskap": "جنسية",
    "Meddela dom": "يصدر حكماً",
    "Medge": "يقر أو يوافق",
    "Medgivande": "إقرار أو موافقة",
    "Medhjälp till brott": "مساعدة في الجريمة (تواطؤ)",
    "Medla": "يتوسط (للصلح)",
    "Medling ( med anledning av brott )": "وساطة جنائية (بين الجاني والضحية)",
    "Medvållande": "مساهمة في الخطأ (أو الضرر)",
    "Migrationsmål": "قضايا الهجرة",
    "Miljöbrott": "جريمة بيئية",
    "Miljölagen": "قانون البيئة",
    "Minderårig": "قاصر (دون السن القانوني)",
    "Missbruk av urkund": "إساءة استخدام وثيقة",
    "Missnöjeförklaring": "إعلان عدم الرضا عن الحكم (للاستئناف)",
    "Misstankeregister": "سجل المشتبه بهم",
    "Mordbrand": "حريق عمد",
    "Motpart": "خصم (الطرف الآخر)",
    "Muntlig förberedelse": "جلسة تحضيرية شفوية",
    "Muntlighetsprincipen": "مبدأ الشفوية (في المحاكمة)",
    "Muta - bestickning": "رشوة",
    "Mutbrott": "جريمة الرشوة",
    "Myndighetsmissbruk": "تعسف في استعمال السلطة",
    "Myndighetsutövning": "ممارسة السلطة العامة",
    "Myteri - lydnadsbrott": "تمرد - عصيان الأوامر العسكرية",
    "Mål om mindre värden": "قضايا القيم الصغيرة (فتات)",
    "Målsman": "ولي أمر (للطلاب)",
    "Målsägande": "المجني عليه (المدعي)",
    "Målsägandebiträde": "محامي المجني عليه (مساعد قانوني)",
    "Mönstring, Mönstringen": "تجنيد إجباري (الفحص الطبي للعسكرية)",
    "Mötesfrihet": "حرية الاجتماع",
    "Narkotikabrott": "جريمة مخدرات",
    "Naturalisation ( migration )": "تجنيس (اكتساب الجنسية)",
    "Nedsatt arbetsförmåga": "قدرة عمل منخفضة",
    "Nedsättning": "تخفيض (للعقوبة أو القيمة)",
    "Neka ( Han nekar till brottet men han förnekar att han har begått brottet )": "ينكر (ينكر التهمة وينفي ارتكابها)",
    "Normalgrad": "درجة عادية (للجرم)",
    "Normerade böter": "غرامات مقننة (محددة)",
    "Notarius publicus": "كاتب عدل عام (موثق)",
    "Nyttjanderätt": "حق الانتفاع",
    "Nåd": "عفو (رحمة)",
    "Nämndeman": "قاضٍ محلف (ممثل الشعب)",
    "Näringsförbud": "منع من ممارسة التجارة (للمفلس الاحتيالي)",
    "Näringsförbudslagen": "قانون الحظر التجاري",
    "Näringsidkare": "تاجر أو صاحب عمل",
    "Näringsverksamhet": "نشاط تجاري",
    "Närstående släkting": "قريب مباشر",
    "Nödsituation": "حالة طوارئ",
    "Nödtestamente": "وصية طارئة",
    "Nödvärn": "دفاع شرعي (عن النفس)",
    "Nöjdförklaring": "إعلان الرضا بالحكم (التنازل عن الاستئناف)",
    "Obducera": "يشرّح (الجثة)",
    "Obestånd": "إعسار (عجز مالي)",
    "Obligatorisk": "إلزامي (إجباري)",
    "Ockerpant": "رهن استغلالي (ربوي)",
    "Offentlig försvarare": "محامي عام (تعينه المحكمة)",
    "Offentlig plats": "مكان عام",
    "Offentliggöra": "ينشر (يعلن للعموم)",
    "Ofreda ( sexuellt )": "يتحرش (جنسياً)",
    "Ofredande": "إزعاج أو تحرش",
    "Ogiltighet": "بطلان",
    "Olaga diskriminering": "تمييز غير قانوني",
    "Olaga intrång": "تعدي غير قانوني (دخول مكان محظور)",
    "Olaga tvång": "إكراه غير قانوني",
    "Olovlig körning": "قيادة غير قانونية (بلا رخصة)",
    "Olovligt brukande": "استخدام غير مصرح به",
    "Ombud": "وكيل أو ممثل",
    "Omedelbar verkställighet": "نفاذ معجل (تنفيذ فوري)",
    "Omhäktning": "تمديد الحبس الاحتياطي",
    "Omhändertagande": "سحب رعاية (للأطفال) أو احتجاز (للشخص)",
    "Ompröva beslut": "يعيد النظر في القرار",
    "Omprövning av beslut": "مراجعة القرار",
    "Omständigheter": "ظروف أو ملابسات",
    "Omyndig": "قاصر (فاقد الأهلية)",
    "Ordningsbot": "غرامة فورية (مخالفة ضبطية)"
};

let updatedCount = 0;

dictionaryData.forEach((entry) => {
    const type = (entry[COL_TYPE] || '').trim();
    const word = entry[COL_SWE];
    const currentDef = entry[COL_ARB_DEF] || '';

    // Using mapping to handle duplicates in list
    if (type === 'JuridikTB.' && !currentDef.trim() && arabicDefinitions[word]) {
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
