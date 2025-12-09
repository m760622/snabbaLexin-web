/**
 * Add Arabic definitions for MigrationTB terms - Batch 2
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

// Arabic definitions for MigrationTB terms - Batch 2
const arabicDefinitions = {
    "Frivilligorganisationer": "منظمات تعتمد على المتطوعين",
    "Födelseattest": "وثيقة رسمية تثبت تاريخ ومكان الولادة",
    "Föra talan": "رفع دعوى قضائية أمام المحكمة",
    "Förenklad delgivning": "طريقة مبسطة لإبلاغ شخص بقرار رسمي",
    "Förestående brott": "جريمة على وشك الحدوث",
    "Förfoga över": "حق التصرف في شيء ما",
    "Förlossningsvård": "الرعاية الطبية أثناء الولادة",
    "Förlust av svenskt medborgarskap": "فقدان الجنسية السويدية لأسباب قانونية",
    "Förläggning": "مكان إقامة جماعي لطالبي اللجوء",
    "Förmyndare": "شخص مسؤول قانونياً عن قاصر",
    "Förmögenhet": "مجمل الأصول المالية والممتلكات",
    "Förnödenheter": "الحاجات الأساسية للحياة",
    "Förordning": "قرار تنظيمي صادر عن الحكومة",
    "Förpliktas": "إلزام قانوني بفعل شيء",
    "Försatt ur stridbart skick": "عدم القدرة على القتال بسبب إصابة",
    "Försummelse": "التقصير في أداء واجب",
    "Försvarsmakt, Försvarsmakten": "القوات المسلحة السويدية",
    "Försändelse": "طرد أو رسالة مُرسلة",
    "Försörjningskrav": "شرط القدرة على إعالة النفس والأسرة",
    "Förvaltningsprocess": "إجراءات قضائية أمام محكمة إدارية",
    "Förvar": "احتجاز إداري لشخص تمهيداً لترحيله",
    "Förvarstagen": "شخص محتجز إدارياً",
    "Förverkande": "مصادرة ممتلكات بقرار قضائي",
    "Gemensam europeisk referensram för språk ( GERS )": "معيار أوروبي موحد لتقييم مستوى اللغة",
    "Generaldirektör": "أعلى منصب إداري في هيئة حكومية",
    "Generalkonsulat": "مكتب دبلوماسي يقدم خدمات القنصلية",
    "Genomsnittslön": "متوسط الأجور في قطاع معين",
    "Giltighetstid": "الفترة التي تظل فيها الوثيقة صالحة",
    "Gisslan": "شخص محتجز للضغط على جهة أخرى",
    "Grov människosmuggling": "تهريب بشر بظروف مشددة",
    "Grovt olaga tvång": "إكراه غير قانوني شديد",
    "Grovt organiserande av människosmuggling": "تنظيم عمليات تهريب بشر واسعة",
    "Gränsövergångare": "شخص يعبر الحدود بين دولتين",
    "Gränsövergångsstället": "نقطة رسمية لعبور الحدود",
    "Gästforskare": "باحث يزور مؤسسة علمية مؤقتاً",
    "Gäststuderande": "طالب يدرس في جامعة أجنبية مؤقتاً",
    "Handläggande myndighet": "الجهة الرسمية المختصة بمعالجة طلب",
    "Handläggare": "موظف يعالج الطلبات والقضايا",
    "Heder och samvete": "قسم بالشرف والضمير",
    "Hemlandspass": "جواز سفر صادر من بلد الشخص الأصلي",
    "Hemlig avlyssning av elektronisk kommunikation": "تنصت سري على المكالمات والرسائل",
    "Hemlig övervakning av elektronisk kommunikation": "مراقبة سرية للاتصالات الإلكترونية",
    "Hemvisttid": "مدة الإقامة في مكان معين",
    "Hittebarn": "طفل مجهول الوالدين",
    "Hjälpmedel vid brott": "أدوات مستخدمة في ارتكاب جريمة",
    "Honorärkonsul": "قنصل فخري غير دبلوماسي محترف",
    "Honorärkonsulat": "مكتب قنصل فخري",
    "Hushållsgemenskap": "أشخاص يعيشون معاً ويتشاركون النفقات",
    "Hämtas av Polismyndigheten": "يُحضر قسراً من قبل الشرطة",
    "Hänsynslösa former": "تصرفات قاسية وغير إنسانية",
    "Härstamningsprincipen ( jus sanguinis )": "مبدأ اكتساب الجنسية بالنسب",
    "Högkvalificerad tjänst": "وظيفة تتطلب مؤهلات عالية",
    "Incheckning": "إجراء تسجيل الوصول",
    "Indrivning": "تحصيل ديون بالقوة القانونية",
    "Injaga skräck": "إثارة الخوف والرعب",
    "Inskränkningar": "قيود وتحديدات على الحقوق",
    "Insynsråd": "مجلس استشاري للرقابة",
    "Intagna": "أشخاص محتجزون في سجن أو مركز",
    "Integration": "عملية اندماج المهاجرين في المجتمع",
    "Internationellt utbyte": "تبادل ثقافي أو أكاديمي دولي",
    "Internflykting": "شخص نازح داخل بلده",
    "Internrevisionen": "فحص داخلي للحسابات والإجراءات",
    "Invandring": "انتقال أشخاص للعيش في بلد آخر",
    "Justitiedepartementet": "وزارة العدل السويدية",
    "Kapning": "اختطاف طائرة أو سفينة",
    "Karriärkonsul": "قنصل محترف تابع للسلك الدبلوماسي",
    "Kodex om Schengengränserna": "قواعد عبور حدود منطقة شنغن",
    "Kommunal vuxenutbildning": "تعليم البالغين الذي تموله البلدية",
    "Kontroll- och tvångsåtgärder": "إجراءات رقابة وإجبار قانونية",
    "Kontrollskyldighet": "واجب التحقق والفحص",
    "Kort besök i Sverige": "إقامة قصيرة في السويد لا تتجاوز 90 يوماً",
    "Kost och logi": "الطعام والسكن",
    "Kostnadsansvar": "المسؤولية عن تحمل التكاليف",
    "Krigsfara": "خطر اندلاع حرب",
    "Krigsfånge": "جندي محتجز في الحرب",
    "Krigsförbrytelse": "انتهاك جسيم للقانون الدولي الإنساني",
    "Kundtjänst": "خدمة العملاء والزبائن",
    "Kustbevakningen": "جهاز حراسة السواحل السويدي",
    "Kvarstad": "حجز مؤقت على ممتلكات بأمر قضائي",
    "Kvittera": "التوقيع على إيصال استلام",
    "Kvotflyktingar": "لاجئون يُختارون ضمن حصة سنوية",
    "Lag om mottagande av asylsökande m.fl. ( LMA )": "قانون استقبال طالبي اللجوء",
    "Lagen om den europeiska konventionen angående skydd för de mänskliga rättigheterna och de grundläggande friheterna": "قانون الاتفاقية الأوروبية لحقوق الإنسان",
    "Lasergraverat pass": "جواز سفر محفور بالليزر للأمان",
    "Ledamöter": "أعضاء في مجلس أو لجنة",
    "Legitimationshandling": "بطاقة أو وثيقة تثبت الهوية",
    "Lingvist": "متخصص في علم اللغة",
    "Livsfara": "خطر يهدد الحياة",
    "Luftfartyg": "طائرة أو أي مركبة جوية",
    "Lönespecifikationer": "تفاصيل مكونات الراتب",
    "Lönetröskel": "الحد الأدنى للراتب المطلوب للتأشيرة",
    "Medborgarskap": "صفة المواطن القانونية في دولة",
    "Medborgarskapsceremoni": "احتفال رسمي بمنح الجنسية",
    "Medborgarskapsförklaring": "قرار بمنح الجنسية السويدية",
    "Medborgarskapslagen": "القانون المنظم للجنسية",
    "Medicinsk åldersbedömning": "فحص طبي لتحديد عمر الشخص",
    "Medvetet förtigit omständigheter av betydelse": "إخفاء معلومات مهمة عمداً",
    "Medvetet lämnat oriktiga uppgifter": "تقديم معلومات كاذبة عمداً",
    "Mellanstatlig organisation": "منظمة دولية بين الحكومات",
    "Migrationsdomstolar": "محاكم متخصصة في قضايا الهجرة"
};

let updatedCount = 0;

dictionaryData.forEach((entry) => {
    const type = (entry[COL_TYPE] || '').trim();
    const word = entry[COL_SWE];
    const currentDef = entry[COL_ARB_DEF] || '';

    if (type === 'MigrationTB.' && !currentDef.trim() && arabicDefinitions[word]) {
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
