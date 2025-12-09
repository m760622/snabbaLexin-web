/**
 * Add Arabic definitions for JuridikS terms - Batch 15
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

// Arabic definitions for JuridikS terms - Batch 15
const arabicDefinitions = {
    "Rättstolkning": "تفسير قضائي (للترجمة في المحاكم)",
    "Rättstvist": "نزاع قضائي",
    "Rättsutveckling": "تطور قانوني (من خلال السوابق القضائية)",
    "Rättsverkningar": "آثار قانونية",
    "Rättsvillfarelse": "جهل بالقانون (غلط في القانون)",
    "Rättsväsende": "السلطة القضائية (النظام القضائي)",
    "Sak konfiskation": "مصادرة عينية (للأشياء)",
    "Saken": "الموضوع (موضوع الدعوى)",
    "Sakkunnig": "خبير (فني أو مختص)",
    "Sakkunniged": "يمين الخبير",
    "Saklega": "إيجار المنقولات (تأجير الأشياء)",
    "Saklån": "إعارة (استعمال الشيء ورده بعينه)",
    "Sakprövningsförutsättning": "شرط قبول الدعوى (للنظر في موضوعها)",
    "Sakprövningsförutsättningarna": "شروط قبول الدعوى",
    "Sakrätt": "قانون الحقوق العينية (الملكية والرهن)",
    "Sakskada": "ضرر مادي (تلف الممتلكات)",
    "Sakägarjäv": "عدم صلاحية بسبب المصلحة الشخصية (وجود مصلحة في القضية)",
    "Samarbetsavtal": "اتفاقية تعاون",
    "Samarbetssamtal": "محادثات تعاون (للآباء المنفصلين حول الأطفال)",
    "Sambandsman": "ضابط اتصال",
    "Sambo": "شريك متعايش (بدون زواج)",
    "Samboavtal": "اتفاقية التعايش (تنظيم أموال الشريكين)",
    "Sambolagen": "قانون التعايش (Sambo)",
    "Sambruksförening": "جمعية زراعية تعاونية",
    "Sametinget": "البرلمان السامي (للشعب السامي)",
    "Samfällighetsförening": "جمعية الملاك المشتركين (لإدارة المرافق المشتركة)",
    "Samhällsgrupp": "فئة اجتماعية",
    "Samlevnadsfrågor": "قضايا التعايش المشترك",
    "Sammanhållen grundutbildning": "تعليم أساسي موحد",
    "Sammanlevnad i oskiftat bo": "العيش في تركة غير مقسمة (للشريك الباقي على قيد الحياة)",
    "Sammanläggning": "دمج (عقارات أو شركات)",
    "Sammanträden": "اجتماعات أو جلسات",
    "Samordnande ungdomsåklagare": "مدعي عام منسق لقضايا الأحداث",
    "Samordningsmöte": "اجتماع تنسيقي",
    "Samäganderätt": "ملكية مشتركة (مشاع)",
    "Sanktionsavgifter": "رسوم جزائية (غرامات إدارية)",
    "Sannolikhet": "احتمالية (درجة الإثبات)",
    "Schablonintäkt": "دخل تقديري (جزافي)",
    "Schengen": "شنغن",
    "Schengen visering": "تأشيرة شنغن",
    "Schengenavtal": "اتفاقية شنغن",
    "Sedvanerätt": "قانون عرفي",
    "Sedvänja": "عرف أو عادة",
    "Sekretess": "سرية (حماية المعلومات)",
    "Sekretessmål": "قضايا السرية",
    "Sen accept": "قبول متأخر (يعتبر إيجاباً جديداً)",
    "Servitut": "حق ارتفاق (حق استعمال لعقار جاره)",
    "Servitutrekvisit": "شروط حق الارتفاق",
    "Sexuella trakasserier": "تحرش جنسي",
    "Sexuellt ofredande": "اعتداء جنسي (تحرش)",
    "Sexuellt utnyttjande av barn": "استغلال الأطفال جنسياً",
    "Sexuellt utnyttjande av person i beroendeställning": "استغلال جنسي لشخص في حالة تبعية",
    "Sexuellt övergrepp mot barn": "اعتداء جنسي على طفل (اغتصاب قاصر)",
    "Signaturförfalskning": "تزوير التوقيع",
    "knivskurna": "مطعون بسكين", // Not really Juridik term but appeared in list
    "Simultantolkning": "ترجمة فورية متزامنة",
    "Sinnesförvirring": "اضطراب عقلي (مؤقت)",
    "SIS - Schengens informationssystem": "نظام معلومات شنغن (SIS)",
    "SIS - Statens institutionsstyrelse": "مصلحة الرعاية المؤسسية الوطنية (SIS)",
    "Självskadande handlingar": "أفعال إيذاء النفس",
    "Sjöfylleri": "قيادة مركبة بحرية تحت تأثير الكحول",
    "Skadeeffekt": "أثر ضار",
    "Skadegörelsebrott": "جريمة التخريب أو الإتلاف",
    "Skadeståndsansvar": "المسؤولية عن التعويض (المسؤولية التقصيرية)",
    "Skadeståndsersättning": "مبلغ التعويض",
    "Skadeståndsrätt": "قانون المسؤولية والتعويض",
    "Skadeståndsskyldig": "ملزم بالتعويض",
    "Skadeverkning": "أثر الضرر",
    "Skatteavdrag": "خصم ضريبي",
    "Skatteavdragsbrott": "جريمة استقطاع الضريبة (عدم دفع الضريبة المستقطعة)",
    "Skattebetalningsbrott": "جريمة التهرب من دفع الضريبة",
    "Skattebetalningslagen": "قانون دفع الضرائب",
    "Skattebrottsenheten SBE": "وحدة مكافحة الجرائم الضريبية (SBE)",
    "Skattebrottslagen ( SBL )": "قانون الجرائم الضريبية",
    "Skatteförseelse": "مخالفة ضريبية (بسيطة)",
    "Skattemål": "قضايا ضريبية",
    "Skattepliktig": "خاضع للضريبة",
    "Skattereduktion": "تخفيض ضريبي",
    "Skatterätt": "قانون الضرائب",
    "Skens skull ( för )": "صوري (لغرض التظاهر)",
    "Skevdelningsregeln": "قاعدة التوزيع غير المتساوي (في الطلاق لحماية الطرف الأضعف)",
    "Skiftesman": "مصفي التركة (يعينه المحكمة للتقسيم)",
    "Skiljeavtal": "اتفاق التحكيم",
    "Skiljedom": "حكم التحكيم",
    "Skiljeförfarande": "إجراءات التحكيم",
    "Skiljeklausul": "شرط التحكيم (في العقد)",
    "Skiljemän": "محكمون",
    "Skiljenämnd": "هيئة تحكيم",
    "Skilsmässor": "حالات الطلاق",
    "Skollagen": "قانون التعليم (المدارس)",
    "Skydd mot": "حماية من",
    "Skyddsgaranter": "ضامنو الحماية",
    "Skyddsintresse": "مصلحة محمية",
    "Skyddstillsyn": "المراقبة (عقوبة الحرية المشروطة)"
};

let updatedCount = 0;

dictionaryData.forEach((entry) => {
    const type = (entry[COL_TYPE] || '').trim();
    const word = entry[COL_SWE];
    const currentDef = entry[COL_ARB_DEF] || '';

    // Mapping for duplicate handling
    const definitionMap = {
        "Servitut": "حق ارتفاق (حق استعمال لعقار جاره)",
        "Skyddstillsyn": "المراقبة (عقوبة الحرية المشروطة)",
        "Skyddsintresse": "مصلحة محمية"
    };

    if (type === 'JuridikS.' && !currentDef.trim()) {
        if (arabicDefinitions[word]) {
            entry[COL_ARB_DEF] = arabicDefinitions[word];
            updatedCount++;
            console.log(`✅ ${word}`);
        } else if (definitionMap[word]) {
            entry[COL_ARB_DEF] = definitionMap[word];
            updatedCount++;
            console.log(`✅ ${word}`);
        }
    }
});

// Write back to data.js
const output = 'const dictionaryData = ' + JSON.stringify(dictionaryData, null, 2) + ';';
fs.writeFileSync('./data.js', output);

console.log(`\n📊 Uppdaterade ${updatedCount} ord.`);
console.log('✅ Ändringar sparade i data.js');
