/**
 * Add Arabic definitions for Bygg terms - Batch 11
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

// Arabic definitions for Bygg terms - Batch 11
const arabicDefinitions = {
    "Förordning": "لائحة تنظيمية (مرسوم)",
    "Förorenad luft": "هواء ملوث",
    "Förorening": "تلوث",
    "Föroreningar": "ملوثات",
    "Försening": "تأخير",
    "Förspänd betong": "خرسانة سابقة الإجهاد",
    "Förstudie": "دراسة أولية (جدوى)",
    "Förstärkt betong": "خرسانة مقواة",
    "Försumlig": "مهمل (مقصر)",
    "Försäkring": "تأمين",
    "Försäkringsskydd": "غطاء تأميني",
    "Försäljning": "مبيعات",
    "Försänkare": "ريشة توسيع (لإخفاء رأس البرغي/Zenker)",
    "Försörjningssystem": "نظام الإمداد (المرافق)",
    "Förtagning": "تشريك (وصلة لسان خشبية)",
    "Förvaltning": "إدارة (عقارات/ممتلكات)",
    "Förvaltningschef": "مدير العقارات (أو الإدارة)",
    "Förväntningar": "توقعات",
    "Gaffeltruck": "رافعة شوكية",
    "Garantibesiktning": "فحص الضمان (نهاية فترة الضمان)",
    "Garantiskötsel": "صيانة الضمان",
    "Gasolvärmare": "مدفأة غاز (LPG)",
    "Gatlykta": "مصباح شارع (عمود إنارة)",
    "Gatsten": "حجر رصف الشوارع",
    "Gatumark": "أرض الشارع (حرم الطريق)",
    "Generalentreprenad": "مقاولة عامة",
    "Generator": "مولد كهربائي",
    "Genomförande - Slutförande": "تنفيذ - إتمام",
    "Genomförandetid": "وقت التنفيذ",
    "Geometrisk ordning": "ترتيب هندسي",
    "Geoteknisk": "جيوتقني (متعلق بالتربة)",
    "Geotextil": "نسيج أرضي (جيوتكستايل)",
    "Geringslåda": "صندوق قطع الزوايا (Stupa)",
    "Geringssåg": "منشار قطع الزوايا",
    "Gift": "سم",
    "Giftigt": "سام",
    "Giltighetstid": "فترة الصلاحية",
    "Gipsskiva": "لوح جبس (جبسون بورد)",
    "Gipsskruv": "برغي جبس",
    "GIS ( Geografic information": "نظم المعلومات الجغرافية (GIS)",
    "Gjuta": "يصب (خرسانة/معدن)",
    "Gjutasfalt": "أسفلت مصبوب (ماستيك)",
    "Gjutfog": "فاصل صب",
    "Gjutning": "صب",
    "Gjutrör": "أنبوب صب (قمع)",
    "Gjutskägg": "زوائد الصب (رايش)",
    "Glans": "لمعان",
    "Glas": "زجاج",
    "Glasfiberremsa": "شريط ألياف زجاجية",
    "Glasfiberväv": "نسيج ألياف زجاجية",
    "Glasull": "صوف زجاجي",
    "Glättning": "تنعيم (تمليس الخرسانة)",
    "Godkänd": "معتمد (مقبول)",
    "Golv": "أرضية",
    "Golvavjämning": "تسوية الأرضية",
    "Golvlinje": "منسوب الأرضية (خط الأرضية)",
    "Golvlist": "نعلة (وزرة)",
    "Golvplattor": "بلاط أرضيات",
    "Golvvärme": "تدفئة أرضية",
    "Golvyta": "مساحة الأرضية",
    "Gradäng": "مدرج (مقاعد)",
    "Granit": "جرانيت",
    "Granitkeramik": "سيراميك جرانيتي (بورسلين)",
    "Grannyttrande": "رأي الجار (موافقة الجوار)",
    "Grovhet": "خشونة",
    "Grovplåt": "صاج سميك (ألواح)",
    "Grundbeläggning": "طبقة أساس (رصف)",
    "Grundläggning": "تأسيس (بناء الأساسات)",
    "Grundning": "دهان أساس (برايمر)",
    "Grundolja": "زيت أساس (للحماية)",
    "Grundvatten": "مياه جوفية",
    "Grundvattennivå": "منسوب المياه الجوفية",
    "Gruppchef": "رئيس مجموعة (فرقة عمل)",
    "Grus": "حصى",
    "Gränsmärke": "علامة حدودية",
    "Gränspunkt": "نقطة حدودية",
    "Grävarbete": "أعمال الحفر",
    "Grävmaskin": "حفارة",
    "Gummi": "مطاط",
    "Gångväg": "ممر مشاة",
    "Gård": "فناء (أو مزرعة/حوش)",
    "Halka": "انزلاق (جليد/سطح زلق)",
    "Halvsandwichvägg ( Enkel vägg )": "جدار نصف ساندويتش (جدار معزول جزئياً)",
    "Hammarband": "عارضة علوية (رابطة للجدار)",
    "Hammare": "مطرقة",
    "Hamn": "ميناء",
    "Hanbjälke": "عارضة رابطة (في السقف المائل - Collar beam)",
    "Handdukstork": "مجفف مناشف (رادياتير)",
    "Hiss": "مصعد",
    "Hjärtvägg": "جدار حامل رئيسي (وسطي)",
    "HLR - utbildning": "تدريب إنعاش قلبي رئوي (CPR)",
    "Huggen spik": "مسمار مقصوص (مربع)",
    "Huggmejsel": "إزميل قطع (للأحجار/المعادن)",
    "Hus": "منزل (بيت)",
    "Hushålls verksamhetsenergi": "طاقة تشغيل الأجهزة المنزلية",
    "Hushållsel": "كهرباء منزلية",
    "Hussvamp": "فطر العفن المنزلي (عفن الخشب الجاف)",
    "Huvudbyggnad": "مبنى رئيسي",
    "Huvudsäkring": "صمام أمان رئيسي (فيوز)",
    "Hydrauliska verktyg": "أدوات هيدروليكية"
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
