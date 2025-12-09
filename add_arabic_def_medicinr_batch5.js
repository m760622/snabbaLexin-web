/**
 * Add Arabic definitions for MedicinR terms - Batch 5
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

// Arabic definitions for MedicinR terms - Batch 5
const arabicDefinitions = {
    "Strukturella problem": "مشاكل هيكلية",
    "Strålben, radius": "عظم الكعبرة (في الساعد)",
    "Sträckarmuskler": "عضلات باسطة",
    "Stukning": "التواء (وثء)",
    "Stämningsläget": "الحالة المزاجية",
    "Stärka muskulaturen": "تقوية العضلات",
    "Stötdämpare": "ممتص صدمات (مثل الغضروف)",
    "Stötvåg": "موجة تصادمية",
    "Subkutan injektion": "حقنة تحت الجلد",
    "Surauppstötningar": "تجشؤ حامضي (حموضة)",
    "Svansben, Os coccygis": "عظم العصعص",
    "Svikt": "فشل (أو قصور)",
    "Svinkoppor, impetigo": "القوباء (مرض جلدي معدي)",
    "Sy ihop menisken": "خياطة الغضروف الهلالي",
    "Symtom": "أعراض",
    "Synförändringar": "تغيرات في البصر",
    "Synnerven, Nervus opticus": "العصب البصري",
    "Synovialmembranet, stratum synoviale": "الغشاء الزليلي",
    "Systolisk hypotoni": "هبوط الضغط الانقباضي",
    "Systoliska blodtrycket ( övertrycket )": "ضغط الدم الانقباضي (الضغط العلوي)",
    "Såret rodnar": "يحمر الجرح (يصبح محتخقناً)",
    "Ta bort bitar av": "إزالة قطع من",
    "Ta upp insulin": "يمتص الأنسولين",
    "Takykardi": "تسرع القلب",
    "Tandlossning, Parodontit": "التهاب دواعم السن (تخلخل الأسنان)",
    "Tandröta": "تسوس الأسنان",
    "Tappar - Tapparna": "مخاريط (خلايا الشبكية)",
    "Tappkota ( axis )": "الفقرة المحورية (العنقية الثانية)",
    "Tas med Jämna mellanrum": "تؤخذ على فترات منتظمة",
    "Tejpning": "تثبيت بشريط لاصق طبي",
    "Tillfredställelse": "رضا (إشباع)",
    "Tillplattning": "تسطيح",
    "Tinningbenet": "العظم الصدغي",
    "Titthålsoperation": "عملية بالمنظار",
    "Tonaudoimetri": "قياس السمع بالنغمات النقية",
    "Trasiga delar tas bort": "تزال الأجزاء التالفة",
    "Trasiga menisken": "الغضروف الهلالي المتمزق",
    "Triceps, trehövdad överarmsmuskel": "العضلة ثلاثية الرؤوس (Triceps)",
    "Triglycerider, LDL ( Det onda kolesterolet )": "الدهون الثلاثية، LDL (الكوليسترول الضار)",
    "Tropiska sjukdomar, Tropical diseases": "أمراض مدارية",
    "Trötthet, sänkt medvetande grad, huvudvärk": "تعب، انخفاض مستوى الوعي، صداع",
    "Tuberkelbakterien": "عصية السل (البكتيريا)",
    "Tuberkulintest": "اختبار السل (توبركولين)",
    "Tumsugning": "مص الإبهام",
    "Typ 1 diabetes": "سكري من النوع الأول",
    "Typ 2 diabetes": "سكري من النوع الثاني",
    "Tåben, digit pedis": "سلاميات القدم (أصابع القدم)",
    "Tårbenet, Os lacrimale": "العظم الدمعي",
    "Täppt i näsan": "مسدود الأنف (مزكوم)",
    "Ulcerös proktit": "التهاب المستقيم التقرحي",
    "Underarm": "ساعد",
    "Underarm, antebrachium": "ساعد (Antebrachium)",
    "Underbenen - Underbenet, cruris": "الساق (أسفل الركبة)",
    "Underhudsfettet": "دهون تحت الجلد",
    "Underkäksben, Os mandibularis": "عظم الفك السفلي",
    "Undersökningar - undersökningarna": "فحوصات",
    "Undvika överbelastning": "تجنب الحمل الزائد (الإجهاد)",
    "Upphostning": "بصاق (ما يخرج مع السعال)",
    "Upphört": "توقف",
    "Upptagningsområde": "منطقة الامتصاص (أو منطقة الخدمة)",
    "Utesluta skador": "استبعاد الإصابات",
    "Utlöses vid rotation av knäleden": "يُثار عند دوران الركبة",
    "Utmattningssyndrom, Utbrändhet": "متلازمة الإرهاق المزمن (الاحتراق النفسي)",
    "Utomkvedshavandeskap, extrauterin graviditet": "حمل خارج الرحم",
    "Utrotad": "مستأصل (أو منقرض للمرض)",
    "Vadben, fibula": "عظم الشظية",
    "Vagt illamående, medvetandesänkning och medvetslöshet": "غثيان مبهم، انخفاض الوعي وفقدان الوعي",
    "Vanlig undersökning": "فحص اعتيادي",
    "Vaxpropp": "سدادة شمعية (في الأذن)",
    "Vener": "أوردة",
    "Vetekli": "نخالة القمح",
    "Viktförlust": "فقدان وزن",
    "Viktnedgång": "تناقص الوزن",
    "Vridled": "مفصل محوري (مداري)",
    "Vridning": "التواء (لي)",
    "Vridvåld": "قوة التواء (عنف لي)",
    "Vristens ben, Tarsus": "عظام الكاحل (الرسغ)",
    "Välmående": "رفاهية (صحة جيدة)",
    "Åderförfettning": "تصلب الشرايين (الدهني)",
    "Åderförkalkning, Asteroskleros ( i kransartärer )": "تصلب الشرايين (في الشرايين التاجية)",
    "Åderhinna, Koroidea": "المشيمة (في العين - الطبقة الوعائية)",
    "Återabsorberas": "يُعاد امتصاصه",
    "Återfår normal funktion": "يستعيد وظيفته الطبيعية",
    "Äggled": "مفصل بيضوي (Ellipsoid - تصحيح محتمل لـ Äggled)", // Assuming Äggled refers to Ellipsoidled based on context, literal egg-joint
    "Äggvita": "زلال (بروتين)",
    "Är försvagat": "ضعيف (مضعف)",
    "Ärftliga anlag": "سمات وراثية",
    "Ödem, oedema": "وذمة (توزم)",
    "Ögats ackommodation": "تكيّف العين",
    "Ögonbottenfotografering": "تصوير قاع العين",
    "Ögonhålan": "محجر العين",
    "Överarm, humerus": "عضد (ذراع علوي)",
    "Överarmsben, humerus": "عظم العضد",
    "Överdrivna Svängningar i Stämningsläget": "تقلبات مزاجية مفرطة",
    "Överkäksben, Os maxillaris": "عظم الفك العلوي",
    "Överlasta": "يحمل فوق طاقته",
    "Översynt, Långsynt": "بعيد النظر (طول النظر)",
    "Översynthet, Långsynthet": "طول النظر",
    "Övervikt": "زيادة الوزن",
    "Övervikt": "زيادة الوزن (مكرر)",
    "Övre och undre ögonlocket": "الجفن العلوي والسفلي",
    "Övre luftvägsinfektion ( ÖLI )": "عدوى الجهاز التنفسي العلوي"
};

let updatedCount = 0;

dictionaryData.forEach((entry) => {
    const type = (entry[COL_TYPE] || '').trim();
    const word = entry[COL_SWE];
    const currentDef = entry[COL_ARB_DEF] || '';

    // Using mapping to handle duplicates in list
    if (type === 'MedicinR.' && !currentDef.trim() && arabicDefinitions[word]) {
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
