/**
 * Add Arabic definitions for JuridikS terms - Batch 8
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

// Arabic definitions for JuridikS terms - Batch 8
const arabicDefinitions = {
    "Indirekt uppsåt ( dolus indirectus )": "قصد غير مباشر (احتمالي)",
    "Indispositiv": "قواعد قانونية آمرة (لا يجوز الاتفاق على مخالفتها)",
    "Individual prevention": "الردع الخاص (إصلاح الجاني ومنعه من العود)",
    "Informationsplikt": "واجب تقديم المعلومات",
    "Inhibition": "وقف التنفيذ المؤقت (لحين البت في الطعن)",
    "Initialstadiet": "المرحلة الأولية",
    "Inkomstbasbelopp": "مبلغ أساس الدخل (يستخدم لحساب المعاشات)",
    "Innehavs tid": "فترة الحيازة أو الاحتفاظ",
    "Inpasseringskontroll": "مراقبة الدخول والتفتيش",
    "Inresa": "دخول البلاد",
    "Inresa visering": "تأشيرة دخول (فيزا)",
    "Inresekontrollen": "رقابة الحدود (نقاط الدخول)",
    "Insiktsuppsåt ( dolus indirectus )": "قصد اليقين (العلم بأن النتيجة ستحدث حتماً)",
    "Inskrivning": "تسجيل (عقاري أو قيد)",
    "Inskrivningsdomare": "قاضي السجل العقاري (مصطلح قديم)",
    "Inskrivningsförfarandet": "إجراءات التسجيل العقاري",
    "Inskrivningsväsende": "نظام التسجيل العقاري",
    "Inskrivningsärende": "معاملة تسجيل عقاري",
    "Insolvent": "معسر (عاجز عن سداد الديون)",
    "Instans": "درجة التقاضي (محكمة درجة أولى/ثانية)",
    "Intagna": "نزلاء السجن",
    "Inteckna": "يضع إشارة رهن عقاري",
    "Inteckning": "رهن عقاري مسجل",
    "Integrationsverket": "مصلحة الاندماج (ملغاة)",
    "Integritet": "الخصوصية والحرمة الشخصية",
    "Intensivövervakning med elektronisk kontroll IÖV": "المراقبة الإلكترونية المكثفة (السوار الإلكتروني)",
    "Interimistiskt": "إجراء مؤقت أو وقتي",
    "Interimistiskt beslut": "قرار مؤقت (قبل الحكم النهائي)",
    "Internationell kammare": "غرفة تحكيم دولية",
    "Internationell privaträtt": "القانون الدولي الخاص (تنازع القوانين)",
    "Internationell rätt": "القانون الدولي",
    "Internationella brottmålsdomstolen": "المحكمة الجنائية الدولية (ICC)",
    "Internationella flyktingorganisationen": "المنظمة الدولية للاجئين",
    "Internationella sanktioner": "عقوبات دولية (حظر اقتصادي)",
    "Interpellationer": "استجوابات برلمانية (للوزراء)",
    "Interpol": "الشرطة الجنائية الدولية (الإنتربول)",
    "Intressejäv": "تضارب مصالح (يمنع القاضي من النظر)",
    "Intrång i förvar": "انتهاك الوديعة أو الشيء المحفوظ",
    "Invandring": "الهجرة إلى الداخل",
    "Istadarätt = representationsrätt": "حق الحلول في الميراث (ميراث الأحفاد عن جدهم)",
    "IÖV, utsluss": "إفراج مشروط بالمراقبة الإلكترونية",
    "Jag N.N. lovar och försäkrar på heder och samvete, att jag efter bästa förstånd ska fullgöra det uppdrag, som lämnats mig, idag och i framtiden.": "قسم المترجم: أقسم بالله وأتعهد بشرفي أن أؤدي مهمتي بأمانة.",
    "Jag N.N. lovar och försäkrar på heder och samvete, att jag skall säga hela sanningen och intet förtiga, tillägga eller förändra.": "قسم الشاهد: أقسم أن أقول الحق كله ولا شيء غير الحق.",
    "Jakträtt": "حق الصيد البري",
    "Jakttid": "موسم الصيد المسموح",
    "Jobba dubbelt upp": "العمل بوظيفتين (عمل إضافي)",
    "Jordbruksarrende": "إيجار أرض زراعية",
    "Jordbruksfastighet": "عقار زراعي",
    "Jordägare": "مالك الأرض",
    "Jourdomstolar": "محاكم مناوبة (أيام العطل)",
    "Jova novit curia": "المحكمة تعرف القانون (مبدأ قانوني)",
    "Judiciell": "قضائي",
    "Juridik": "القانون (علم الحقوق)",
    "Juridisk doktrin": "الفقه القانوني",
    "Juridisk vårdnad": "الولاية القانونية على الطفل",
    "Juristdomare": "قاضي حقوقي (محترف)",
    "Justitiedepartementet": "وزارة العدل",
    "Justitiekanslern": "مستشار العدل (محامي الحكومة JK)",
    "Justitiekanslern JK": "مستشار العدل (JK)",
    "Justitieombudsmannen": "أمين المظالم البرلماني (JO)",
    "Jämkas": "يُعدل بالخفض (للشرط الجزائي أو التعويض)",
    "Jämkning av testamente": "تعديل الوصية (لحماية حصة الورثة الإلزامية)",
    "Jämställdhetsombudsmannen": "أمين مظالم المساواة (سابقاً)",
    "Kameraövervakning": "المراقبة بالكاميرات",
    "Kammarkollegiet KamK": "مصلحة الشؤون المالية والقانونية",
    "Kammarkollegiets tolkföreskrifter": "لوائح الترجمة لمصلحة الشؤون المالية",
    "Kammarrätt": "محكمة الاستئناف الإداري",
    "Kammarrätter KR": "محاكم الاستئناف الإداري",
    "Kapitalvinstskatt": "ضريبة الأرباح الرأسمالية (على الاستثمار)",
    "Kapning": "اختطاف (طائرة أو سفينة)",
    "Kapning av sjö - luftfartyg": "قرصنة بحرية أو جوية",
    "Kapning och sjö eller luftfartssabotage": "القرصنة وتخريب الملاحة",
    "Kartell": "كارتل (اتحاد احتكاري للشركات)",
    "Kemikalieregistreringsbrott": "جريمة مخالفة تسجيل المواد الكيميائية",
    "Klagan över domvilla": "الطعن لوجود خطأ إجرائي جسيم",
    "Klagande": "الطاعن أو المشتكي",
    "Klandertalan": "دعوى إبطال (لقرار أو وصية)",
    "Klandras": "يُطعن فيه أو يُعترض عليه",
    "Klienter": "عملاء أو موكلون",
    "Klyvning": "قسمة العقار",
    "Kognitiv intervjuteknik": "تقنية المقابلة الإدراكية (للشهود)",
    "Kommanditbolag": "شركة توصية بسيطة (فيها شريك ضامن وشريك موصي)",
    "Kommanditbolag KB": "شركة توصية بسيطة (KB)",
    "Kommanditdelägare": "شريك موصي (مسؤولية محدودة)",
    "Kommunal fastighetsavgift": "رسم عقاري للبلدية",
    "Kommunal förköpsrätt": "حق الشفعة للبلدية (في شراء العقارات)",
    "Kommunallagen": "قانون الإدارة المحلية (البلديات)",
    "Kommunalrätt": "قانون البلديات",
    "Kommunfullmäktige": "المجلس البلدي المنتخب",
    "Kommunicering": "حق الاطلاع والرد (تبادل اللوائح)",
    "Kommunplacering": "توزيع اللاجئين على البلديات",
    "Kommunstyrelse": "المجلس التنفيذي للبلدية",
    "Kompanjonavtal": "اتفاقية الشركاء",
    "Kompensation": "تعويض مالي",
    "Kompetens": "الاختصاص القضائي أو الكفاءة"
};

let updatedCount = 0;

dictionaryData.forEach((entry) => {
    const type = (entry[COL_TYPE] || '').trim();
    const word = entry[COL_SWE];
    const currentDef = entry[COL_ARB_DEF] || '';

    if (type === 'JuridikS.' && !currentDef.trim() && arabicDefinitions[word]) {
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
