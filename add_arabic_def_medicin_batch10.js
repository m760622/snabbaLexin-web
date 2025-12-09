/**
 * Add Arabic definitions for Medicin terms - Batch 10
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

// Arabic definitions for Medicin terms - Batch 10
const arabicDefinitions = {
    "Förhöjt blodtryck": "ارتفاع ضغط الدم",
    "Förkylningshosta": "سعال البرد",
    "Förlamning av ansiktsnerven, Bells pares": "شلل العصب الوجهي (شال بيل)",
    "Förlamningar": "حالات الشلل",
    "Förlopp": "مسار (المرض)",
    "Förlossning": "ولادة",
    "Förlossningen": "الولادة",
    "Förlossningskanal": "قناة الولادة",
    "Förlossningsvärkar": "آلام الولادة (المخاض)",
    "Förlängda märgen": "النخاع المستطيل (Medulla oblongata)",
    "Förlöpa": "يسري (يمضي)",
    "Förmedlar": "ينقل (يتوسط)",
    "Förmåga": "قدرة",
    "Förnimmelser": "أحاسيس (إدراكات)",
    "Förnyas": "يتجدد",
    "Förorenade matvaror": "أطعمة ملوثة",
    "Förorenat": "ملوث",
    "Förorsaka - Ge upphov till": "يسبب - يؤدي إلى",
    "Förrädiska": "غادرة (خبيثة لا تظهر أعراضها)",
    "Förse": "يزود",
    "Försedda": "مزودة بـ",
    "Förskjuts": "يزاح (ينحرف)",
    "Förskrivet läkemedel": "دواء موصوف",
    "Förslappning": "ارتخاء (تراخي)",
    "Först och främst": "أولاً وقبل كل شيء",
    "Förstorade ögonbulber": "جحوظ العينين (تضخم المقلة)",
    "Förstoring": "تضخم",
    "Försvagning": "ضعف (وهن)",
    "Försvarsmekanismer": "آليات الدفاع (المناعية)",
    "Försämrad känsel, neuropati": "ضعف الإحساس (اعتلال عصبي)",
    "Försämring": "تدهور (سوء الحالة)",
    "Förtjockas": "يتشخن (يصبح سميكاً)",
    "Förträngning": "تضيق (انسداد جزئي)",
    "Förträngs": "يُكبت (نفسياً) أو يُضيق",
    "Förtvina": "يضمر",
    "Förtvining": "ضمور",
    "Förtviningstillstånd": "حالة ضمور",
    "Förvärkar": "آلام مخاض كاذبة (طلق كاذب)",
    "Förvärvad immunitet": "مناعة مكتسبة",
    "Föräldrautbildning": "تثقيف الوالدين (دورات للأباء)",
    "Föröka sig": "يتكاثر",
    "Galla": "عصارة صفراوية (مرارة)",
    "Gallan": "العصارة الصفراوية",
    "Gallbildning": "تشكل حصوات المرارة (أو تكون الصفراء)",
    "Gallblåsan": "المرارة (الحويصلة الصفراوية)",
    "Gallblåsegången": "القناة المرارية",
    "Gallblåseinflammation": "التهاب المرارة",
    "Gallfärgämnet": "صبغة الصفراء (بيليروبين)",
    "Gallgångar": "قنوات صفراوية",
    "Gallgångsinflammation - Kolangit": "التهاب القنوات الصفراوية",
    "Gallgångssjukdom": "مرض القنوات الصفراوية",
    "Gallkapillärer": "شعيرات صفراوية",
    "Gallstensanfall": "نوبة مرارة (مغص مراري)",
    "Gallstensoperation": "عملية حصى المرارة",
    "Gallvägarna": "الطرق الصفراوية",
    "Galna ko - sjukan, BSE": "مرض جنون البقر (BSE)",
    "Gammaglobulin": "جاماجلوبولين (بروتين مناعي)",
    "Ganglier": "عقد عصبية",
    "Gangrän": "غرغرينا (موات)",
    "Gasbildande": "مكون للغازات",
    "Gasbildning": "تكون غازات (نفخة)",
    "Gasbindan": "شاش طبي",
    "Gaser i magen": "غازات البطن",
    "Gasformiga ämnen": "مواد غازية",
    "Gastrit": "التهاب المعدة",
    "Gastroenterit": "التهاب المعدة والأمعاء (نزل معوية)",
    "Gastroenterologi": "طب الجهاز الهضمي",
    "Gastroskopi": "تنظير المعدة",
    "Gasutbyte": "تبادل الغازات",
    "Ge upphov till - Förorsaka": "يسبب - يُحدث",
    "Gel": "هلام (جل)",
    "Geléartad grundsubstans": "مادة أساسية هلامية",
    "Gemensamma gallgången": "القناة الصفراوية المشتركة",
    "Gen": "جين (مورثة)",
    "Genetik": "علم الوراثة",
    "Genitialherpes": "هربس تناسلي",
    "Genomborrning": "ثقب (انثقاب - Perforation)",
    "Genomgripande": "شامل (جذري)",
    "Genomgå": "يخضع لـ (عملية/فحص)",
    "Genomkorsa": "يجتاز (يعبر)",
    "Genomsläpper": "يسمح بمرور (نفاذ)",
    "Genomsnittsåldern": "متوسط العمر",
    "Genteknik": "هندسة وراثية",
    "Ger sig till känna": "يظهر (يبرز أعراضه)",
    "Ger upphov till": "ينشأ عنه (يسبب)",
    "Geriatri": "طب المسنين",
    "Getingstick": "لسعة دبور",
    "Gifter": "سموم",
    "Giftiga ämnen": "مواد سامة",
    "Giftinformationscentralen": "مركز معلومات السموم",
    "Giftstruma": "تسمم درقي (فرط نشاط الدرقية)",
    "Giftstruma - Hypertyreos": "تسمم درقي - فرط نشاط الدرقية",
    "Gipsbandage": "رباط جبس",
    "Gipsförband": "جبيرة جبسية",
    "Glandula thyreoidea - Sköldkörteln": "الغدة الدرقية",
    "Glandulae parathyreoideae": "الغدد الجار درقية",
    "Glaskroppen": "الخِلط الزجاجي (في العين)",
    "Glasögon": "نظارات",
    "Glatt muskulatur": "عضلات ملساء",
    "Glaukom": "زرق (جلوكوما - مياه زرقاء)"
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
