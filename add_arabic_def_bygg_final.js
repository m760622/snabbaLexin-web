/**
 * Add Arabic definitions for Bygg terms - Final Batch
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

// Arabic definitions for Bygg terms - Final Batch
const arabicDefinitions = {
    "Varmvattenpanna": "مرجل الماء الساخن (بويلر)",
    "Varningsskylt": "لافتة تحذير",
    "Varningstejp": "شريط تحذير",
    "Varsamhet": "توخي الحذر",
    "Varselkläder": "ملابس عالية الرؤية (ملابس السلامة)",
    "Vattenavrinning": "تصريف المياه",
    "Vattenkanal": "قناة مائية",
    "Vattenledningsnät": "شبكة مياه",
    "Vattenlås": "قفل مائي (كوع/سيفون)",
    "Vattenpass": "ميزان ماء (ميزان استواء)",
    "Vattenreningsanläggning": "محطة معالجة المياه",
    "Vattenreningsverk": "محطة تنقية المياه",
    "Vattentrumma": "عبارة تصريف (أنبوب تحت الطريق - Culvert)",
    "Vattenvolym": "حجم المياه",
    "VD ( Verkställande Direktör )": "المدير التنفيذي (CEO)",
    "Veckomöte": "اجتماع أسبوعي",
    "Ventilation": "تهوية",
    "Verklig kostnad": "تكلفة فعلية",
    "Verksamhet": "نشاط (عمل)",
    "Verksamhetsområde": "مجال العمل",
    "Verktygslåda": "صندوق أدوات",
    "Vibrationsplatta - Padda": "صفيحة دك اهتزازية (دكاكة)",
    "Vibrationsövervakning": "مراقبة الاهتزازات",
    "Vid vägkanten": "على جانب الطريق",
    "Vindavledare": "حاجز الرياح (في السقف لضمان التهوية)",
    "Vinkelränna": "مزراب الوادي (تقاطع السقفين)",
    "Vinkelslip": "جلاخة زاوية (صاروخ)",
    "Vinterplanering": "تخطيط شتوي",
    "Viskositet": "لزوجة",
    "VVS": "السباكة والتدفئة والتهوية (HVAC)",
    "Våning": "طابق",
    "Våningsplan": "مخطط الطابق",
    "Väderskyddat": "محمي من الطقس",
    "Väg": "طريق",
    "Vägg": "جدار",
    "Väggkonstruktion": "هيكل الجدار",
    "Väghyvel": "ممهدة طرق (غرايدر)",
    "Vägledning": "توجيه (إرشاد)",
    "Vägnät": "شبكة طرق",
    "Vägunderhåll": "صيانة الطرق",
    "Vägvält": "محدلة طرق",
    "Vält": "محدلة",
    "Värde": "قيمة",
    "Värmeisolering": "عزل حراري",
    "Värmematta": "حصيرة تدفئة (للأرضيات)",
    "Värmesystem": "نظام تدفئة",
    "Värmeväxlare": "مبادِل حراري",
    "Värmeväxling": "تبادل حراري",
    "Värmeåtervinning": "استرداد الحرارة",
    "Värna om livet": "حماية الحياة",
    "Vätska": "سائل",
    "Yrkesarbetare": "عامل مهني (حرفي)",
    "Yrkesbakgrund": "خلفية مهنية",
    "Ytbearbetning": "معالجة السطح (تشطيب)",
    "Ånggenerator": "مولد بخار",
    "Ångspärr": "حاجز بخار",
    "Återfylld": "مردوم (معاد تعبئته)",
    "Åtgärd": "إجراء",
    "Ädelträ": "خشب صلب ثمين (مثل البلوط/الماهوجني)",
    "Ärtsingel": "حصى ناعم (بحجم البازلاء)",
    "Ömsesidig": "متبادل",
    "Öronproppar": "سدادات أذن",
    "Övergångsperiod": "فترة انتقالية",
    "Översiktsplan": "مخطط هيكلي شامل",
    "Övertramp": "تجاوز (أو دعسة خاطئة)"
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
