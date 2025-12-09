/**
 * Add Arabic definitions for Medicin terms - Batch 4
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

// Arabic definitions for Medicin terms - Batch 4
const arabicDefinitions = {
    "Binjure": "غدة كظرية",
    "Binjurebarken": "قشرة الكظر",
    "Binjuremärgen": "نخاع الكظر",
    "Biobank": "بنك حيوي (للعينات)",
    "Biokemi": "كيمياء حيوية",
    "Biologi": "بيولوجيا (علم الأحياء)",
    "Bisköldkörtelhormon": "هرمون الغدة الجار درقية (PTH)",
    "Bisköldkörteln": "الغدة الجار درقية",
    "Bisköldkörtlarna": "الغدد الجار درقية",
    "Bistick": "لسعة نحل",
    "Bitestiklar": "بربخ (أجزاء الخصية)",
    "Björk": "شجر البتولا (مسبب للحساسية)",
    "Blandad nerv": "عصب مختلط (حسي حركي)",
    "Blandsvulster": "أورام مختلطة",
    "Blefarit": "التهاب الجفن",
    "Blekhet": "شحوب",
    "Blinda fläcken": "النقطة العمياء (في العين)",
    "Blindhet": "عمى",
    "Blindheten": "العمى",
    "Blindtarm - Blindtarmen ( Caecum )": "الأعور (بداية الأمعاء الغليظة)",
    "Blindtarmsinflammation, appendicit": "التهاب الزائدة الدودية",
    "Blixt smärtor": "آلام خاطفة (كالبرق)",
    "Blockera": "يحجب أو يغلق",
    "Blod": "دم",
    "Blod i avföring": "دم في البراز",
    "Blod proppar, tromboser": "جلطات دموية (خثرات)",
    "Blodansamling": "تجمع دموي",
    "Blodbana": "مجرى الدم",
    "BlodBlandad": "ممزوج بالدم",
    "BlodBlandad kräkning": "قيء مدمى",
    "Blodbrist": "فقر الدم",
    "Blodbrist, anemi": "فقر الدم (أنيميا)",
    "Blodcancer": "سرطان الدم",
    "Blodcancer, leukemi": "سرطان الدم (لوكيميا)",
    "Blodcentral": "بنك الدم",
    "Blodcirkulation": "دورة دموية",
    "Blodflöde": "تدفق الدم (تروية)",
    "Blodförlust": "فقدان الدم",
    "Blodgenomströmning": "سريان الدم (التروية الدموية)",
    "Blodgrupper": "فصائل الدم",
    "Blodgruppsbestämning": "تحديد فصيلة الدم",
    "Blodkropp": "كرية دم",
    "Blodkroppar": "كريات الدم",
    "Blodkäralsrik": "غني بالأوعية الدموية",
    "Blodkärlen": "الأوعية الدموية",
    "Blodkärlsförändringar, angiopati": "تغيرات وعائية (اعتلال الأوعية الدقيقة)",
    "Blodkärlsnystan - Glomeruli": "كبيبات كلوية (شبكة شعيرات)",
    "Blodkärlssystem": "جهاز الدوران (الأوعية الدموية)",
    "Blodplasma": "بلازما الدم",
    "Blodplättar ( trombocyter )": "صفائح دموية",
    "Blodplättarna, trombocyterna": "الصفائح الدموية",
    "Blodprov": "فحص دم",
    "Blodprovtagning": "سحب عينة دم",
    "Blodsockerhalt": "مستوى السكر في الدم",
    "Blodsockernivån": "مستوى السكر بالدم",
    "Blodsockervärden": "قيم سكر الدم",
    "Blodstockning": "احتقان دموي",
    "Blodströmmen": "مجرى الدم (التيار)",
    "Blodsänkan - SR": "سرعة الترسيب (SR)",
    "Blodtillförsel": "إمداد دموي",
    "Blodtransfusion": "نقل الدم",
    "Blodtryck": "ضغط الدم",
    "Blodtrycket": "ضغط الدم",
    "Blodtrycksfall": "هبوط ضغط الدم",
    "Blodtrycksförhöjning - Hypertoni": "ارتفاع ضغط الدم",
    "Blodtrycksstegringar": "ارتفاعات في ضغط الدم",
    "Blodtryckssänkande läkemedel": "أدوية خافضة للضغط",
    "Blodvolym": "حجم الدم",
    "Blodådror": "أوردة (عروق)",
    "Blodöverföring": "نقل دم",
    "Blotryck": "ضغط الدم (خطأ إملائي شائع)",
    "Blottade": "مكشوفة (معرضة)",
    "Blygdbenen": "عظام العانة",
    "Blygdbensfog": "ارتفاق العانة (الوصل المفاصل)",
    "Blåmärke - Blåmärken, hematom": "كدمات، ورم دموي",
    "Blåsbälg": "منفاخ (تشبيه للرئة)",
    "Blåshalskörtel": "غدة البروستاتا",
    "Blåshalskörteln, prostata": "البروستاتا",
    "Blåskatarr - Cystit": "التهاب المثانة",
    "Blåsliknande": "حويصلي (يشبه الفقاعة)",
    "Blåsljud": "لغط القلب (صوت نفخ)",
    "Blåsljud på hjärtat": "نفخة قلبية",
    "Blåsor, knottror": "بثور، طفح حبيبي",
    "Blåstömning": "تفريغ المثانة (تبول)",
    "Bländaren": "الحدقة (القزحية التي تتحكم بالضوء)",
    "Blödarsjuka": "الهيموفيليا (ناعور)",
    "Blödning": "نزيف",
    "Blödningsbenägenhet": "الميل للنزف (سيولة)",
    "Blödningskälla": "مصدر النزيف",
    "Blödningsrisk": "خطر النزيف",
    "BMI - värde, Body Mass Index": "مؤشر كتلة الجسم (BMI)",
    "Boldkärlsrik": "غني بالأوعية الدموية (خطأ إملائي Blod-)",
    "Bomullspinne": "ماسحة قطنية (نكاشه)",
    "Borrelia": "بوريليا (داء لايم)",
    "Bortfall": "فقدان (وظيفة)",
    "Bortfallssymtom": "أعراض العجز (النقص العصبي)",
    "Bowmans kapsel": "محفظة بومان (في الكلية)",
    "Bradykardi": "بطء القلب",
    "BRIS ( barnens rätt i samhället )": "منظمة BRIS (حقوق الطفل في المجتمع)",
    "Brist": "نقص (أو تمزق)"
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
