/**
 * Add Arabic definitions for Bygg terms - Batch 6
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

// Arabic definitions for Bygg terms - Batch 6
const arabicDefinitions = {
    "Bussterminal": "محطة حافلات مركزية",
    "Butik": "محل تجاري (متجر)",
    "Butiksfasad": "واجهة المحل",
    "Bygga": "يبني",
    "Bygganmälan": "إخطار البناء (يُقدم للبلدية)",
    "Byggarbetare": "عامل بناء",
    "Byggarbete": "عمل البناء (أشغال البناء)",
    "Byggarbetsplats": "موقع البناء",
    "Byggavfall": "مخلفات البناء",
    "Byggbestämmelser": "لوائح البناء",
    "Byggbransch": "قطاع البناء والتشييد",
    "Byggfelsförsäkring": "تأمين عيوب البناء",
    "Byggfukt": "رطوبة البناء (المتبقية عند الإنشاء)",
    "Bygghandlingar": "وثائق البناء",
    "Bygghandlingsprocess": "عملية إعداد وثائق البناء",
    "Byggherre": "مطور عقاري (الجهة المالكة للمشروع)",
    "Bygghiss": "مصعد إنشاءات (ونش)",
    "Byggingenjör": "مهندس مدني/معماري (مشرف)",
    "Byggkontroll": "مراقبة البناء",
    "Byggkostnad": "تكلفة البناء",
    "Byggkran": "رافعة بناء (ونش برجي)",
    "Bygglov": "رخصة بناء",
    "Bygglovsansökan": "طلب رخصة بناء",
    "Byggmaterial": "مواد بناء",
    "Byggmetod": "طريقة البناء",
    "Byggmästare": "مقاول بناء رئيسي",
    "Byggnadens fastighetsenergi": "طاقة المبنى العقارية",
    "Byggnadsdel": "جزء من المبنى",
    "Byggnadsdokument": "مستندات المبنى",
    "Byggnadshöjd": "ارتفاع المبنى",
    "Byggnadsinspektör": "مفتش مباني",
    "Byggnadskonstruktör": "مصمم إنشائي للمبنى",
    "Byggnadsnorm": "كود البناء (معايير)",
    "Byggnadsnämnden": "لجنة البناء (في البلدية)",
    "Byggnadsställning": "سقالة بناء",
    "Byggnadstyp": "نوع المبنى",
    "Byggnadsverk": "منشأة بنائية (صرح)",
    "Byggnorm": "معيار البناء",
    "Byggprocessen": "عملية البناء",
    "Byggregler": "قواعد البناء",
    "Byggrätt": "حق البناء (مساحة البناء المسموحة)",
    "Byggsamråd": "اجتماع تشاوري للبناء (مع البلدية)",
    "Byggstart": "بدء البناء",
    "Byggteknisk undersökning": "فحص تقني للبناء",
    "Byggtid": "فترة البناء",
    "Byggtork": "مجفف البناء (لإزالة الرطوبة)",
    "Båge": "قوس",
    "Bågfil - metallsåg": "منشار حديدي (منشار قوس)",
    "Bändningsverktyg": "أداة خلع (عتلة/أداة رفع)",
    "Bänkskiva": "سطح العمل (في المطبخ)",
    "Bärande element": "عنصر حامل",
    "Bärande konstruktion": "هيكل حامل",
    "Bärighet": "قدرة التحمل",
    "Bärighetsklass": "فئة التحمل",
    "Bäring": "اتجاه (زاوية بوصلة)",
    "Bärlag": "طبقة الأساس (تحت الرصف)",
    "Bärlagergrus": "حصى طبقة الأساس (Sub-base)",
    "Bärlagselement": "عنصر طبقة الأساس",
    "Bärlagsform": "شكل طبقة الأساس",
    "Bärlagshöjd": "سمك طبقة الأساس",
    "Bärlina": "عارضة رئيسية (كمرة حاملة)",
    "Bärläkt": "سدايب حاملة (للتثبيت)",
    "Bärverk": "هيكل إنشائي",
    "Böjfjäder": "نابض ثني (سوستة ثني الأنابيب)",
    "CAD": "تصميم بمساعدة الحاسوب (CAD)",
    "CAD - fil": "ملف CAD",
    "CAD - modell": "نموذج CAD",
    "CAD - program": "برنامج CAD",
    "CAD - ritning": "رسم CAD",
    "Carport": "مظلة سيارات (مرآب مفتوح)",
    "Cellbetong": "خرسانة خلوية",
    "Cellplast": "بلاستيك خلوي (فوم/ستيروبور)",
    "Cellulosafiber": "ألياف السليلوز",
    "Cementblandare": "خلاطة أسمنت",
    "Cementbruk": "ملاط أسمنتي",
    "Cementpasta": "عجينة أسمنتية",
    "Cementslam": "روبة أسمنتية (حمأة)",
    "Cementslamma": "روبة أسمنت",
    "Cementspånskiva": "لوح خشب أسمنتي",
    "Cementstabilisering": "تثبيت بالأسمنت",
    "Cementtillverkning": "صناعة الأسمنت",
    "CEN ( Comité Européen de": "CEN (اللجنة الأوروبية للتوحيد القياسي)", // Simplified name
    "Centimeter": "سنتيمتر",
    "Centrumavstånd ( CC )": "المسافة بين المركزين (CC)",
    "Certifiering": "إصدار الشهادات (المصادقة)",
    "Certifikat": "شهادة",
    "Cirkelsåg": "منشار دائري",
    "Cirkulationsluft": "هواء مدور (معاد تدويره)",
    "Co2 - utsläpp": "انبعاثات ثاني أكسيد الكربون",
    "Cykelbana": "مسار الدراجات",
    "Cykelgarage": "مرآب الدراجات",
    "Cykelöverfart": "معبر الدراجات",
    "Dagvatten": "مياه الأمطار (المصرفة)",
    "Dagvattenbrunn": "بالوعة مطر",
    "Dal": "وادي",
    "Damm": "سد (حاجز مائي)",
    "Damm": "غبار (مكرر)", // Correct mapping handles second meaning
    "Dammfilter": "مرشح غبار",
    "Dammfiltrering": "ترشيح الغبار",
    "Dammhalt": "نسبة الغبار (التركيز)"
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
