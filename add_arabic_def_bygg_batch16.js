/**
 * Add Arabic definitions for Bygg terms - Batch 16
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

// Arabic definitions for Bygg terms - Batch 16
const arabicDefinitions = {
    "Projektutveckling": "تطوير المشاريع",
    "Protokoll": "محضر (اجتماع/فحص)",
    "Psykosocial": "نفسي اجتماعي",
    "Purr": "تذكير (تنبيه)",
    "Puts": "قصارة (لياسة)",
    "Putsad vägg": "جدار مقصور (مليس)",
    "PVC": "بي في سي (بلاستيك)",
    "Pågående": "جاري (قيد التنفيذ)",
    "Pågående arbeten": "أعمال جارية",
    "Pålning": "دق الخوازيق (Piling)",
    "Pålverk": "هيكل خوازيق",
    "Påverkan på samhället": "تأثير مجتمعي",
    "Radhus": "منزل متصل (تاون هاوس)",
    "Radiator": "مُشعاع (رادياتير/شوفاج)",
    "Radon": "غاز الرادون",
    "Ram": "إطار",
    "Ramp": "منحدر",
    "Ramverk": "إطار عمل (هيكل)",
    "Rappning": "طرطشة (طبقة تحضيرية للقصارة)",
    "Rapportering": "إعداد التقارير",
    "Rating": "تصنيف (تقييم)",
    "Regel": "عارضة خشبية (Stud) أو قاعدة",
    "Regelbundet": "بانتظام",
    "Region": "منطقة (إقليم)",
    "Regionchef": "مدير إقليمي",
    "Regionekonom": "المحاسب الإقليمي",
    "Reglar": "عوارض خشبية (قوائم للجدران/الأرضيات)",
    "Rekommendationsförslag": "مقترح توصية",
    "Relationshandling": "رسومات كما نُفذ (As-built drawings)",
    "Renovera": "يجدد (يرمم)",
    "Reparation": "إصلاح",
    "Reparationsbruk": "مونة الإصلاح",
    "Reparationskostnad": "تكلفة الإصلاح",
    "Representant": "ممثل",
    "Resekostnader": "تكاليف السفر",
    "Reservfond": "صندوق احتياطي",
    "Resistiv belastning": "حمل مقاوم (كهربائي)",
    "Resistor": "مقاومة كهربائية",
    "Respekt": "احترام",
    "Resurshushållning": "حسن استغلال الموارد",
    "Rikta": "يقوّم (يعدل الاستقامة)",
    "Riktmärke": "علامة مرجعية (منسوب)",
    "Ritning": "رسم هندسي (مخطط)",
    "Rivning": "هدم",
    "Rivningsföreläggande": "أمر الهدم",
    "Rivningslov": "رخصة هدم",
    "Rivningsplan": "خطة الهدم",
    "Roller": "بكرة دهان (رول) أو دور",
    "Rondell": "دوار (صينية) أو قرص جلخ",
    "Rum": "غرفة",
    "Rund pelare": "عمود دائري",
    "Rundvirke": "خشب مستدير (غير منشور)",
    "Rundvirkeshyvel": "مسحاج للخشب المستدير",
    "Rå tomtmark": "أرض خام",
    "Råolja": "نفط خام",
    "Råspont": "ألواح خشبية لسان ومجرى (خشنة - للسقف/الأرضية)",
    "Räfflad trådspik": "مسمار محزز (مضلع)",
    "Ränta": "فائدة",
    "Rökning": "تدخين",
    "Rör": "أنبوب (ماسورة)",
    "Rörartiklar": "لوازم الأنابيب (قطع سباكة)",
    "Rördiameter": "قطر الأنبوب",
    "Rörelse": "حركة",
    "Rörelsefog": "فاصل حركة (تمدد)",
    "Rörlig Ränta": "فائدة متغيرة",
    "Rörligkostnad": "تكلفة متغيرة",
    "Rörmokare": "سباك (سمكري)",
    "Röta": "عفن (تسوس الخشب)",
    "Sadeltak": "سقف جملوني (سنامي)",
    "Sakägare": "صاحب الشأن (المتضرر/الجار المعني)",
    "Sandfilter": "مرشح رملي",
    "Sandwichvägg ( dubbel vägg )": "جدار ساندويتش (جدار مزدوج الطبقات)",
    "Sanering": "تطهير (إزالة الملوثات)",
    "Schaktning": "حفر (تجريف التربة)",
    "Schellackering": "طلاء بالشيلاك (صمغ اللك)",
    "Sektionsritning": "مخطط قطاع (رسم مقطعي)",
    "Semester": "إجازة",
    "Senior projektledare": "مدير مشروع أول",
    "Servicetekniker": "فني صيانة",
    "Servisledning": "خط خدمة (توصيل للمبنى)",
    "Singel": "حصى (زلط)",
    "Sinnesfrid": "راحة البال",
    "Situationsplan": "مخطط الموقع العام",
    "Självdrag": "تهوية طبيعية (سحب ذاتي)",
    "Skadefria": "خالي من الأضرار",
    "Skadligt": "ضار",
    "Skala": "مقياس رسم",
    "Skiftnyckel": "مفتاح قابل للتعديل (إنجليزي)",
    "Skikt": "طبقة",
    "Skikttjocklek": "سمك الطبقة",
    "Skiljevägg": "قاطع (جدار فاصل)",
    "Skorsten": "مدخنة",
    "Skorstenskrage": "طوق المدخنة (لمنع التسرب)",
    "Skottkärra": "عربة يد (براويطة)",
    "Skruvdragare": "مفك آلي (دريل براغي)",
    "Skruvmejsel": "مفك براغي (يدوي)",
    "Skyddsföreskrifter": "لوائح السلامة (تعليمات الوقاية)",
    "Skyddsglasögon": "نظارات واقية",
    "Skyddshandskar": "قفازات واقية",
    "Skyddshjälm": "خوذة واقية"
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
