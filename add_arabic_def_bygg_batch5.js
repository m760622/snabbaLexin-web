/**
 * Add Arabic definitions for Bygg terms - Batch 5
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

// Arabic definitions for Bygg terms - Batch 5
const arabicDefinitions = {
    "Bitumenemulsion": "مستحلب بيتوميني (قار سائل)",
    "Bituminös": "بيتوميني (قاري)",
    "Bjälke": "عارضة خشبية (جسر)",
    "Bjälklag": "سقف (أرضية الهيكل الإنشائي)",
    "Blanskrapning": "كشط حتى المعدن (إزالة الطلاء بالكامل)",
    "Blindprov": "عينة فارغة (اختبار مرجعي)",
    "Blixtledare": "مانعة الصواعق",
    "Blockchef": "رئيس قطاع (مشرف)",
    "Blockjord": "تربة صخرية (كتل صخرية)",
    "Bly": "رصاص (معدن)",
    "Blåbetong": "خرسانة زرقاء (حاوية للشبة المشعة)",
    "Blåslampa": "مصباح لحام (مشعل)",
    "Bländning": "وهج (بهر البصر)",
    "Bländskydd": "واقي من الوهج (مظلة)",
    "Blästring": "سفع (تنظيف بالرمل/الخردق)",
    "BOA ( boarea )": "مساحة المعيشة (السكنية)",
    "Board": "لوح (ألواح خشبية مضغوطة)",
    "Boardlamell": "شريحة لوح (خشب مصفح)",
    "Bockning": "ثني (حي اللي)",
    "Bockningsmaskin": "آلة ثني (طعاجة)",
    "Bockningsverktyg": "أداة ثني",
    "Bokföra": "يدون (يقيد في الدفاتر)",
    "Borra": "يحفر (يثقب)",
    "Borrhål": "ثقب (حفرة بئر)",
    "Borrmaskin": "مثقاب (دريل)",
    "Borste": "فرشاة",
    "Bostadshus": "مبنى سكني",
    "Bostadskvarter": "حي سكني",
    "Bostadsområde": "منطقة سكنية",
    "Bostadsstandard": "معيار السكن",
    "Bottenbalk": "عارضة أرضية (أساسية)",
    "Bottenplatta": "بلاطة الأساس (اللبشة)",
    "Bottenvåning": "طابق أرضي",
    "Boverkets byggregler": "لوائح البناء السويدية (BBR)",
    "Branddörr": "باب مقاوم للحريق",
    "Brandfarlig": "قابل للاشتعال",
    "Brandfilt": "بطانية حريق",
    "Brandförsäkring": "تأمين ضد الحريق",
    "Brandisolering": "عزل الحريق",
    "Brandmotstånd": "مقاومة الحريق",
    "Brandmotståndstid": "زمن مقاومة الحريق",
    "Brandmur": "جدار حريق (فاصل)",
    "Brandnormer": "معايير السلامة من الحريق",
    "Brandpost": "صنبور حريق",
    "Brandredskap": "معدات إطفاء",
    "Brandskyddsdokumentation": "وثائق الحماية من الحريق",
    "Brandskyddsfärg": "طلاء مقاوم للحريق",
    "Brandskyddsklass": "فئة الحماية من الحريق",
    "Brandsläckare": "طفاية حريق",
    "Brandsäker": "آمن من الحريق (مقاوم)",
    "Brandsäkerhet": "السلامة من الحرائق",
    "Brandtålighet": "تحمل الحريق",
    "Brandvarnare": "كاشف دخان (إنذار حريق)",
    "Brandventilation": "تهوية الحريق (تصريف الدخان)",
    "Bredd": "عرض",
    "Brinntid": "زمن الاحتراق",
    "Brobalk": "عارضة الجسر",
    "Brobana": "سطح الجسر (المسار)",
    "Brobyggnad": "بناء الجسور",
    "Broelement": "عنصر الجسر (إنشائي)",
    "Brofäste": "دعامة الجسر (طرفية)",
    "Bropelare": "عمود الجسر",
    "Broräcke": "درابزين الجسر",
    "Brovalv": "قوس الجسر",
    "Bruk": "ملاط (مونة)",
    "Bruksblandare": "خلاطة مونة",
    "Brunn": "بئر (أو بالوعة صرف)",
    "Brunnslock": "غطاء منهول (بالوعة)",
    "Bruttoarea": "المساحة الإجمالية (BTA)",
    "Bruttogolvyta": "مساحة الأرضية الإجمالية",
    "Bruttovikt": "الوزن الإجمالي",
    "Bruttovolym": "الحجم الإجمالي",
    "Brytning": "تعدين (أو انكسار الضوء/خط)",
    "Brådskande": "عاجل",
    "Bräckjärn": "عتلة (مخل)",
    "Bräda": "لوح خشب",
    "Brännbart avfall": "نفايات قابلة للحرق",
    "Brännsvetsning": "لحام بالغاز (الأكسجين)",
    "Bränntid": "وقت الحرق",
    "BSK ( Boverkets handbok om": "BSK (كتيب لوائح الصلب)", // Simplified
    "BTA ( Bruttoarea )": "المساحة الإجمالية (BTA)",
    "Bud": "عرض (في مزاد/مناقصة) أو رسول",
    "Budget": "ميزانية",
    "Budgivare": "مقدم عطاء (مزايد)",
    "Budgivning": "تقديم العطاءات (المزايدة)",
    "Bulkgods": "بضائع صب (سائبة)",
    "Bulktransport": "نقل البضائع السائبة",
    "Bulldozer": "جرافة (بلدوزر)",
    "Bulleremission": "انبعاث الضوضاء",
    "Bullerfortplantning": "انتشار الضوضاء",
    "Bullermätare": "مقياس الضوضاء",
    "Bullermätning": "قياس الضوضاء",
    "Bullernivå": "مستوى الضوضاء",
    "Bullernorm": "معيار الضوضاء",
    "Bullerskydd": "حماية من الضوضاء",
    "Bullerskärm": "حاجز ضوضاء (ساتر)",
    "Bult": "برغي (مسمار لولبي ضخم)",
    "Bultpistol": "مسدس تثبيت البراغي",
    "Burspråk": "نافذة بارزة (شرفة مغلقة)",
    "Busstation": "محطة حافلات"
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
