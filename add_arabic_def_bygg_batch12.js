/**
 * Add Arabic definitions for Bygg terms - Batch 12
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

// Arabic definitions for Bygg terms - Batch 12
const arabicDefinitions = {
    "Hyresgäster": "مستأجرون",
    "Hållbar energilösning": "حل طاقة مستدام",
    "Hållbar leverantörskedja": "سلسلة توريد مستدامة",
    "Hållbar utveckling": "تنمية مستدامة",
    "Hållbar värdekedja": "سلسلة قيمة مستدامة",
    "Hållbarhet": "استدامة",
    "Hållbarhetsavdelning": "قسم الاستدامة",
    "Hållbarhetskriterier": "معايير الاستدامة",
    "Hållbarhetsrapportering": "إعداد تقارير الاستدامة",
    "Hållbarhetsrisker": "مخاطر الاستدامة",
    "Hållbarhetsstrategi": "استراتيجية الاستدامة",
    "Hållbarhetstrender": "اتجاهات الاستدامة",
    "Hållbart Samhälle": "مجتمع مستدام",
    "Hållbart sätt": "طريقة مستدامة",
    "Hålsåg": "منشار ثقب (Hole saw)",
    "Håltagning": "تثقيب (عمل فتحات)",
    "Hårdbetong": "خرسانة صلدة (عالية المقاومة للاحتكاك)",
    "Hårdbetonggolv": "أرضية خرسانية صلدة",
    "Hårdboard": "لوح ليفي صلب (مازونيت)",
    "Hårdträ": "خشب صلب",
    "Hälsa": "صحة",
    "Hälsa - och säkerhetspolicy": "سياسة الصحة والسلامة",
    "Hälsa och säkerhet": "الصحة والسلامة",
    "Hälsofarligt": "خطر على الصحة",
    "Hängränna": "مزراب معلق (لتصريف المطر)",
    "Härdat glas": "زجاج مقسى (سيكوريت)",
    "Högtryckslaminat": "صفائح الضغط العالي (HPL)",
    "Höjd": "ارتفاع",
    "Höjdkurva": "خط الكنتور (منحنى الارتفاع)",
    "Höjning - Höjdriktning": "رفع - اتجاه الارتفاع",
    "Hörselskydd": "واقي سمع",
    "Icke - diskriminering": "عدم التمييز",
    "ID06 - Kort": "بطاقة ID06 (هوية قطاع البناء في السويد)",
    "Impregnerat virke": "خشب مشرب (معالج بالضغط)",
    "Impregnering": "تشريب (معالجة كيميائية للخشب)",
    "Inbyggd": "مدمج (مبني داخلياً)",
    "Infraservice": "خدمات البنية التحتية",
    "Infrastruktur": "بنية تحتية",
    "Injektering": "حقن (التربة/الخرسانة)",
    "Injekteringsbruk": "مونة الحقن",
    "Inkludering": "شمول (احتواء)",
    "Inköp": "مشتريات",
    "Inköpare": "مسؤول مشتريات",
    "Inläggning": "تركيب (رصف أرضيات)",
    "Inmätning": "مسح هندسي (قياس)",
    "Innervägg": "جدار داخلي (فاصل)",
    "Inomhustemperatur": "درجة الحرارة الداخلية",
    "Installationsledare": "مدير التركيبات",
    "Installationsmontör": "فني تركيبات",
    "Installationssamordnare": "منسق التركيبات",
    "Installatör": "فني تركيب (سباك/كهربائي)",
    "Instickskarm": "إطار إدخال (للتجديد)",
    "Integritet": "نزاهة (أو خصوصية)",
    "Interagerar": "يتفاعل",
    "Interiör": "تصميم داخلي",
    "Intressentdialoger": "حوارات أصحاب المصلحة",
    "Intressenter": "أصحاب المصلحة",
    "Isolerande handskar": "قفازات عازلة",
    "Isolerande handverktyg": "أدوات يدوية معزولة",
    "Isolerande hölje": "غلاف عازل",
    "Jordborrning": "حفر التربة (جس)",
    "Jordbruksvält": "محدلة زراعية",
    "Jordkabel": "كابل أرضي",
    "Jämställdhet": "مساواة (بين الجنسين)",
    "Järn": "حديد",
    "Järnväg": "سكة حديد",
    "K - märkt ( Kulturmärkt )": "محمي تراثياً (مبنى أثري)",
    "Kabelkanal": "قناة كابلات",
    "Kabelsax": "مقص كابلات",
    "Kablar": "كابلات",
    "Kaj": "رصيف الميناء",
    "Kakel": "بلاط سيراميك (للجدران)",
    "Kakelfix": "لاصق سيراميك",
    "Kalkborste": "فرشاة جير",
    "Kalkbruk": "ملاط جيري",
    "Kalkcementfärg": "طلاء جيري أسمنتي (KC)",
    "Kalkfärg": "طلاء جيري",
    "Kalkmålning": "دهان بالجير",
    "Kalksandsten": "طوب رملي جيري",
    "Kalksten": "حجر جيري",
    "Kalkyl": "تقدير تكلفة",
    "Kalkylering": "حساب التكلفة",
    "Kalkylingenjör": "مهندس تقدير تكلفة (تسعير)",
    "Kallasfalt": "أسفلت بارد",
    "Kallras": "تيار هوائي بارد هابط",
    "Kamspik": "مسمار مسنن (حلزوني)",
    "Kanalisation": "تمديدات قنوات (للكابلات)",
    "Kantförstyvning": "تقوية الحافة (تجسير)",
    "Kantsten": "حجر رصيف (كندرين)",
    "Karmskruv": "برغي تثبيت الإطار",
    "Karriär": "مسيرة مهنية",
    "Karta": "خريطة",
    "Katalog": "كتالوج",
    "Kemisk sammansättning": "تركيب كيميائي",
    "Keramik": "خزف (سيراميك)",
    "Keramiska plattor": "بلاط سيراميك",
    "Klammer": "مشبك (دبوس)",
    "Klammermaskin - Häftpistol": "دباسة (مسدس دبابيس)",
    "Klibbig beläggning": "طلاء لزج (طبقة لاصقة)"
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
