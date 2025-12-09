/**
 * Add Arabic definitions for Bygg terms - Batch 10
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

// Arabic definitions for Bygg terms - Batch 10
const arabicDefinitions = {
    "Fotränna": "قناة تصريف سفلية (مزراب سفلي)",
    "Fraktion": "جزء (تصنيف حجمي للحبيبات)",
    "Fraktsedel": "بوليصة شحن",
    "Framkomlighet": "إمكانية المرور (السالكية)",
    "Frekvens": "تردد",
    "Fri bredd": "عرض صافي (حر)",
    "Fri sikt": "رؤية حرة (مجال رؤية واضح)",
    "Fri spännvidd": "بحر صافي (مسافة حرة بين الركائز)",
    "Fribärande": "كابولي (حر الطرف/ظفري)",
    "Fribärande balk": "عارضة كابولية (ظفر)",
    "Friggebod": "كوخ حديقة (كوخ صغير معفى من الرخصة)",
    "Friktion": "احتكاك",
    "Frilagd ballast": "حصى مكشوف (خرسانة مغسولة السطح)",
    "Frilagd Yta": "سطح مكشوف",
    "Friliggande": "منفصل (مستقل - بناء)",
    "Friluftsområde": "منطقة ترفيهية مفتوحة",
    "Frischakt": "حفر مفتوح (بدون تدعيم رأسي)",
    "Friskrivning": "إخلاء مسؤولية",
    "Fristående form": "قالب مستقل (قائم بذاته)",
    "Fritt avstånd": "مسافة خلوص (تباعد حر)",
    "Fritt utrymme": "حيز حر (فراغ)",
    "Friyta": "مساحة مفتوحة (خالية)",
    "Frontlastare": "جرافة أمامية (لوادر)",
    "Frostbeständig": "مقاوم للصقيع (التجمد)",
    "Frostdjup": "عمق الصقيع (عمق تجمد التربة)",
    "Frostfritt djup": "عمق لا يصله الصقيع (تحت خط التجمد)",
    "Frostskada": "ضرر الصقيع",
    "Frånluft": "هواء العادم (مسحوب للخارج)",
    "Frätande": "آكل (كاوٍ)",
    "Frätande ämne": "مادة آكلة (كاوية)",
    "Fukt": "رطوبة",
    "Fuktbeständighet": "مقاومة الرطوبة",
    "Fukthalt": "محتوى الرطوبة",
    "Fuktisolerande lager": "طبقة عازلة للرطوبة",
    "Fuktkvot": "نسبة الرطوبة",
    "Fuktproblem": "مشاكل الرطوبة",
    "Fuktskydd": "حماية من الرطوبة",
    "Fukttåliga": "مقاوم للرطوبة",
    "Fundablock": "كتلة أساس (بلوك أساس)",
    "Fundament": "أساس (قاعدة)",
    "Fungerande skick": "حالة صالحة للعمل",
    "Fungicid": "مبيد فطري",
    "Funktionsfel": "خلل وظيفي",
    "Funktionskrav": "متطلبات وظيفية",
    "Funktionssäkerhet": "الموثوقية الوظيفية (الأمان)",
    "Funktionstid": "العمر التشغيلي (الوظيفي)",
    "Furu": "خشب الصنوبر",
    "Furuplywood": "خشب معاكس صنوبري (بليود)",
    "Furuvirke": "خشب الصنوبر",
    "Fyll": "ردم (حشو)",
    "Fylla": "يملأ (ردم)",
    "Fyllnadsmaterial": "مواد ردم (حشو)",
    "Fyllnadsområde": "منطقة ردم",
    "Fyllningsområde": "منطقة تعبئة (ردم)",
    "Fyrkantig pelare": "عمود مربع",
    "Fysisk": "فيزيائي (أو بدني)",
    "Fysisk belastning": "حمل بدني (إجهاد)",
    "Fältprovning": "اختبار حقل (في الموقع)",
    "Fältundersökning": "فحص ميداني",
    "Färdig yta": "سطح نهائي (مشطب)",
    "Färdigblandad betong": "خرسانة جاهزة الخلط",
    "Färdigställande": "إنجاز (إتمام)",
    "Färdigställande år": "سنة الإنجاز",
    "Färdigställandetid": "وقت الإنجاز",
    "Färdigställd": "مُنجز (مكتمل)",
    "Färgad puts": "قصارة ملونة",
    "Färgkod": "رمز اللون",
    "Färgprov": "عينة لون",
    "Färgspruta": "مسدس رش الطلاء",
    "Följdkrav": "متطلبات تابعة (لاحقة)",
    "Fönster": "نافذة (شباك)",
    "Fönsterbräda": "عتبة النافذة (الداخية)",
    "Fönsterbåge": "ضلفة النافذة (الإطار المتحرك)",
    "Fönsterkitt": "معجون النوافذ",
    "Förare": "سائق (مشغل معدات)",
    "Förbandslåda": "صندوق إسعافات أولية",
    "Förbesiktning": "فحص أولي (قبل التسليم)",
    "Förbesiktningsprotokoll": "محضر الفحص الأولي",
    "Förbindelsepunkt": "نقطة اتصال",
    "Förbindelseskruv": "برغي توصيل",
    "Förbrukningsmaterial": "مواد استهلاكية",
    "Förbrukningsvara": "سلعة استهلاكية",
    "Förbränningsgaser": "غازات الاحتراق",
    "Förbudsskylt": "لافتة منع (حظر)",
    "Förbättra": "يحسن",
    "Förbättringsåtgärd": "إجراء تحسيني",
    "Fördelning": "توزيع",
    "Förenklad dimensionering": "تصميم مبسط (حسابات تقريبية)",
    "Föreskrift": "لائحة (تعليمات ملزمة)",
    "Företagshälsovården": "الرعاية الصحية المهنية",
    "Företagsklimat": "مناخ العمل (بيئة الشركات)",
    "Företagskultur": "ثقافة الشركة",
    "Företagskunder": "عملاء تجاريون (شركات)",
    "Företagslegitimation": "هوية الشركة (بطاقة تعريف)",
    "Förhandla": "يفاوض",
    "Förläggningsdjup": "عمق الوضع (عمق التمديد للكابلات/الأنابيب)",
    "Förminska": "يصغر (يقلل)",
    "Förnybar energi": "طاقة متجددة"
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
