/**
 * Add Arabic definitions for Bygg terms - Batch 1
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

// Arabic definitions for Bygg terms - Batch 1
const arabicDefinitions = {
    "á pris": "السعر الفردي (سعر الوحدة)",
    "AA - glas": "زجاج AA (نوع من الزجاج العازل)",
    "AB ( allmänna bestämmelser )": "أحكام عامة (AB - في عقود البناء)",
    "Absolut positionsbestämning": "تحديد الموقع المطلق",
    "Absorbator": "ماص (جهاز امتصاص)",
    "Absorbent": "مادة ماصة",
    "Absorbera": "يمتص",
    "Absorptans": "معامل الامتصاص (القدرة على الامتصاص)",
    "Absorptionsarea": "مساحة الامتصاص (المساحة المكافئة للامتصاص)",
    "Absorptionsdämpning": "توهين بالامتصاص",
    "Absorptionsfaktor": "عامل الامتصاص",
    "Absorptionsfilter": "مرشح امتصاص",
    "Absorptionsförmåga": "قدرة الامتصاص",
    "Acklimatisering": "تأقلم (تكيف)",
    "Ackordsarbete": "عمل بالقطعة (بالإنتاج)",
    "Ackordslön": "أجر بالقطعة",
    "Ackreditering": "اعتماد (ترخيص رسمي للجودة)",
    "Ackumulator": "مراكم (مدخرة/بطارية)",
    "Administration": "إدارة",
    "Administrativa arbetsuppgifter": "مهام إدارية",
    "Affärsetik": "أخلاقيات العمل (التجارة)",
    "Affärsidé": "فكرة العمل (مشروع)",
    "Affärsmetoder": "أساليب العمل (التجارة)",
    "Affärsområde": "مجال الأعمال",
    "Affärsplan": "خطة عمل",
    "Affärsstrategi": "استراتيجية العمل",
    "Agera etiskt": "التصرف بأخلاقية",
    "Aggregat": "وحدة (مجموعة آلات/ركام)",
    "Aktiv förankring": "تثبيت فعال (مرساة نشطة)",
    "Aktiv redundans": "تكرار نشط (احتياطي فعال)",
    "Aktivitet": "نشاط",
    "Aktivt kol": "فحم منشط",
    "Akustik": "صوتيات (علم الصوت)",
    "Akustikplatta": "لوح صوتي (عازل للصوت)",
    "Akut underhåll": "صيانة طارئة",
    "Akvedukt": "قناة مائية (جسر مائي)",
    "Alarmsystem": "نظام إنذار",
    "Alkov": "مقصورة (كوة للنوم)",
    "Alkydfärg": "طلاء ألكيدي (زيتي)",
    "Allé": "شارع مشجر (ممشى)",
    "Allergen": "مسبب للحساسية",
    "Allmän egendom": "ملكية عامة",
    "Allmän kostnad": "تكلفة عامة",
    "Allmän plats": "مكان عام",
    "Allmän ventilation": "تهوية عامة",
    "Allmänna avtalsbestämmelser": "الشروط العامة للعقد",
    "Allmänna ordningsregler": "قواعد النظام العام",
    "Allmänna råd": "نصائح عامة (توجيهات)",
    "Allmänning": "أرض مشاع (عامة)",
    "Allmännyttig": "ذو نفع عام (مؤسسة سكنية عامة)",
    "Allmänt kvalitetskrav": "متطلبات الجودة العامة",
    "Allmänt vatten": "مياه عامة",
    "Allrum": "غرفة معيشة (غرفة عائلية)",
    "Alluvial avlagring": "رواسب طميية (غرينية)",
    "Alluvialjord": "تربة طميية",
    "Allvarlig risk": "خطر جسيم",
    "Altan": "شرفة (تراس)",
    "Alternativt energi": "طاقة بديلة",
    "Alternerande hålsättning": "تثقيب متبادل (متناوب)",
    "Altimeter": "مقياس الارتفاع",
    "Altitud": "ارتفاع (عن سطح البحر)",
    "Aluminatcement": "إسمنت ألوميناتي",
    "Aluminatklinker": "كلنكر ألوميناتي",
    "Aluminering": "طلاء بالألومنيوم (ألومنة)",
    "Aluminiumfolie": "رقائق الألومنيوم",
    "Aluminiumplåt": "صفيحة ألومنيوم",
    "Aluminiumsulfat": "كبريتات الألومنيوم",
    "Alunskiffer": "طفل شبّي (صخر زيتي)",
    "AMA ( Allmän material och arbete )": "AMA (المواصفات العامة للمواد والعمل)",
    "AMA ( Allmän material och beskrivning )": "AMA (المواصفات العامة للمواد والوصف)", // Contextual fix if listed differently elsewhere
    "Amin": "أمين (مركب كيميائي)",
    "Ammoniak": "أمونيا",
    "Amorteringsfritt lån": "قرض بدون تسديد أصل الدين (فقط فوائد لفترة)",
    "Amorteringslån": "قرض استهلاكي (يُسدد أصله ودوريًا)",
    "AMP Arbetsmiljöplan": "خطة بيئة العمل (AMP)",
    "Analysera": "يحلل",
    "Analytisk dimensionering": "تصميم تحليلي (حساب الأبعاد تحليلياً)",
    "Anbudsansökan": "طلب مناقصة (تقديم عرض)",
    "Anbudsavtal": "اتفاقية مناقصة",
    "Anbudsbegäran": "دعوة للمناقصة (طلب عروض)",
    "Anbudsbrev": "خطاب العرض (المناقصة)",
    "Anbudsformulär": "نموذج المناقصة",
    "Anbudsförfarande": "إجراءات المناقصة",
    "Anbudsförfrågan": "استفسار المناقصة (طلب عروض)",
    "Anbudsgaranti": "ضمان العطاء (تأمين أولي)",
    "Anbudsgranskning": "فحص العطاءات",
    "Anbudshandling": "وثيقة المناقصة",
    "Anbudskalkyl": "حساب تكلفة العطاء",
    "Anbudskartell": "كارتل مناقصات (تواطؤ)",
    "Anbudssumma": "مبلغ العطاء",
    "Anbudstext": "نص العطاء",
    "Anbudstid": "فترة المناقصة (صلاحية العرض)",
    "Anbudstävlan": "مسابقة مناقصة",
    "Anbudsunderlag": "مستندات المناقصة (الأساس)",
    "Anbudsvärdering": "تقييم العطاءات",
    "Anbudsöppning": "فتح المظاريف (العطاءات)",
    "Andel": "حصة (نصيب)",
    "Andelsboende": "سكن مشترك (ملكية حصص)",
    "Andelslägenhet": "شقة تمليك بنظام الحصص",
    "Andningsskydd": "قناع تنفس (حماية للجهاز التنفسي)",
    "Anemometer": "مقياس سرعة الرياح (أنيومومتر)"
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
