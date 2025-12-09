/**
 * Add Arabic definitions for Medicin terms - Batch 14
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

// Arabic definitions for Medicin terms - Batch 14
const arabicDefinitions = {
    "Immunbehandling": "علاج مناعي",
    "Immunbrist": "نقص المناعة",
    "Immunglobuliner": "جلوبولينات مناعية",
    "Immunglobuliner, Ig": "جلوبولينات مناعية (Ig)",
    "Immunitet": "مناعة",
    "Immuniteten": "المناعة",
    "Immunologi": "علم المناعة",
    "Immunologisk reaktion": "تفاعل مناعي (استجابة مناعية)",
    "Immunoterapi": "علاج مناعي",
    "Immunreaktioner": "تفاعلات مناعية",
    "Immunterapi": "علاج مناعي",
    "Imperativa tömningar": "إلحاح التبرز (أو التبول القهري)",
    "Impetigo": "قوباء (مرض جلدي معدي)",
    "Impulsbildning": "توليد النبضات (العصبية)",
    "Impulser": "نبضات (أو إشارات/دوافع)",
    "Impulsöverledning": "توصيل النبضات (العصبية)",
    "Inandning": "شهيق",
    "Inandningsluften": "هواء الشهيق",
    "Indragen": "مسحوب للداخل (منكمش/غائر)",
    "Indroppning": "تقطير (وضع قطرات)",
    "Infektions lära": "طب الأمراض المعدية (علم العدوى)",
    "Infektionsklinik": "عيادة الأمراض المعدية",
    "Infektionskänslighet": "قابلية للإصابة بالعدوى",
    "Infektionssjukdomar": "أمراض معدية",
    "Infektionssjukvård": "رعاية الأمراض المعدية",
    "Infektionsämnen": "عوامل معدية (مسببات العدوى)",
    "Inflammation": "التهاب",
    "Inflammation av slemhinnan": "التهاب الغشاء المخاطي",
    "Inflammationsdämpande": "مضاد للالتهاب",
    "Inflammationshämmande": "مثبط للالتهاب",
    "Inflammatoriska förändringar": "تغيرات التهابية",
    "Inflammatoriska tarmsjukdomar": "أمراض الأمعاء الالتهابية (IBD)",
    "Infusion, införs som dropp": "تسريب وريدي (محلول)",
    "Införa": "يُدخل (أداة طبية)",
    "Införande": "إدخال (أو تطبيق)",
    "Inhalation": "استنشاق",
    "Inhalator": "جهاز استنشاق (بخاخ)",
    "Initiativlös": "فاقد للمبادرة (خامل)",
    "Injektioner": "حُقن",
    "Injektionsbehandling": "علاج بالحقن",
    "Inkilad fraktur": "كسر متداخل (انحشاري)",
    "Inkubationstid - inkubationstiden": "فترة الحضانة (للمرض)",
    "Inlagring": "ترسب (أو تخزين)",
    "Innanför": "في الداخل (خلف)",
    "Innerst": "الأعمق (في الداخل تماماً)",
    "Innervera": "يُعصِّب (يزود بالأعصاب)",
    "Innerörat": "الأذن الداخلية",
    "Inokulationshepatit": "التهاب الكبد بالحقن (HBV)",
    "Inom loppet av": "في غضون",
    "Inpräntning": "تطبُّع (غرس في الذهن)",
    "Inre analsfinkter": "المصرة الشرجية الداخلية",
    "Inre blödningar": "نزيف داخلي",
    "Inre fixation": "تثبيت داخلي (للكسور)",
    "Inre organ": "أعضاء داخلية",
    "Inre sekretoriska, endokrina körtlarna": "الغدد الصماء (الافراز الداخلي)",
    "Inriktas på": "يركز على (يوجه نحو)",
    "Insemination": "تلقيح صناعي",
    "Insjukna": "يمرض (يصاب بالمرض)",
    "Insomningssvårigheter": "صعوبات في النوم (أرق)",
    "Insulindos": "جرعة أنسولين",
    "Insulinkänning ( blodsockerfall )": "أعراض هبوط السكر (صدمة أنسولين خفيفة)",
    "Insulinpennor": "أقلام الأنسولين",
    "Insulinpump": "مضخة الأنسولين",
    "Insulinresistens": "مقاومة الأنسولين",
    "Insulinsprutor": "حقن أنسولين",
    "Intag": "تناول (طعام/دواء) أو إدخال (مستشفى)",
    "Integritet": "سلامة (جسدية/شخصية) أو خصوصية",
    "Intensiv smärta": "ألم شديد",
    "Internaktioner": "تفاعلات (دوائية)",
    "Intervallsmärta": "ألم متقطع (على فترات)",
    "Intimhygien": "نظافة شخصية (للمناطق الحساسة)",
    "Intorkning, dehydrering": "جفاف (تشفاف)",
    "Intracerebrala blödningar": "نزيف داخل المخ",
    "Intramuskulärt, injiceras i muskeln": "حقن عضلي (IM)",
    "Intravenös infusion": "تسريب وريدي",
    "Intravenös injektion": "حقنة وريدية (IV)",
    "Intravenöst": "وريدياً",
    "Intravenöst": "عن طريق الوريد (مكرر)",
    "Intravenöst, injiceras i en ven": "حقن في الوريد",
    "Intrinsic factor": "العامل الداخلي (لامتصاص B12)",
    "Isotopundersökning": "فحص بالنظائر المشعة",
    "Jourcentral": "مركز الطوارئ المناوبة",
    "Järnbrist": "نقص الحديد",
    "Kaffesumpsliknande kräkning": "قيء يشبه طحل القهوة (دم مهضوم)",
    "Kallsvett": "عرق بارد",
    // "Kammaren": "البطين (بالقلب) أو العيادة", - context dependent, usually ventricle in anatomy
    "Kammaren": "البطين (حجرة القلب)",
    "Kammarvattnet": "السائل المائي (في العين)",
    "Kanyl": "كانيولا (قنية/إبرة الوريد)",
    "Kapillärer": "شعيرات دموية",
    "Kapillärer": "شعيرات دموية (مكرر)",
    "Kapseln": "الكبسولة (المحفظة)",
    "Kateter": "قسطرة",
    "KBT - Kognitiv beteendeterapi": "العلاج السلوكي المعرفي (KBT)",
    "Kejsarsnitt": "عملية قيصرية",
    "Kikhostebakterien": "بكتيريا السعال الديكي",
    "Kikna": "يشرق (ينقطع النفس من الضحك/السعال)",
    "Kilbenet": "العظم الوتدي (في الجمجمة)",
    "Kippande andning": "تنفس لاهث (احتضاري)",
    "Kiropraktiker": "مقوم العظام (كايرو براكتيك)",
    "Kirurgisk behandling": "علاج جراحي"
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
