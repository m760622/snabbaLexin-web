/**
 * Add Arabic definitions for JuridikTB terms - Final Batch
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

// Arabic definitions for JuridikTB terms - Final Batch
const arabicDefinitions = {
    "Vapenlicens": "رخصة حيازة سلاح",
    "Varsel": "إشعار مسبق (بإجراء)",
    "Varumärkesförfalskning": "تقليد العلامات التجارية",
    "Varusmuggling": "تهريب البضائع",
    "Verkan": "أثر أو مفعول",
    "Verkställa dom": "ينفذ الحكم",
    "Verkställighetshinder": "مانع من التنفيذ (عقبة تنفيذية)",
    "Villkor": "شرط",
    "Villkorlig frigivning": "إفراج مشروط",
    "Vilseleda": "يضلل (يغرر)",
    "Vinna laga kraft": "يكتسب الدرجة القطعية (يصبح باتاً)",
    "Vinning": "مكسب (غير مشروع)",
    "Vitesföreläggande": "أمر بغرامة تهديدية (لإجبار على فعل)",
    "Vittnesed": "يمين الشاهد",
    "Vittnesförhör": "استماع للشهود",
    "Vittnesjäv": "عدم أهلية الشاهد (للتحيز أو القرابة)",
    "Vräkning": "إخلاء (قسري من المسكن)",
    "Våld i nära relationer": "عنف في العلاقات المقربة (عنف أسري)",
    "Våld mot tjänsteman": "اعتداء على موظف عام",
    "Vållande": "تسبب (أو المتسبب)",
    "Vållande till annans död": "التسبب في وفاة آخر (قتل خطأ)",
    "Vårdnad av barn": "حضانة الأطفال",
    "Vårdslöshet": "إهمال",
    "Väcka åtal": "يرفع الدعوى (يوجه الاتهام)",
    "Vägledande dom": "حكم سابقة قضائية (Prejudikat)",
    "Välgrundad fruktan": "خوف مبرر (أساس للجوء)",
    "Väpnad konflikt": "نزاع مسلح",
    "Värdepapper": "أوراق مالية",
    "Yrka": "يطالب (في المحكمة)",
    "Yrkande grunder": "أسباب المطالبة",
    "Yttre gräns ( migration )": "حدود خارجية (للاتحاد الأوروبي)",
    "Åberopa": "يستند إلى (يحتج بـ)",
    "Åberopa som vittne": "يستشهد به (يطلبه كشاهد)",
    "Åklagarmyndigheten": "هيئة الادعاء العام",
    "Ångerrätt": "حق العدول (عن الشراء)",
    "Åtagande": "التزام",
    "Åtalet ogillas": "رد الدعوى (براءة)",
    "Åtalet är styrkt": "التهمة ثابتة",
    "Åtalspreskription": "سقوط الدعوى بالتقادم",
    "Åtalsunderlåtelse": "صرف النظر عن الدعوى (عدم الملاحقة)",
    "Återbetalning": "سداد (إرجاع المال)",
    "Återfalla i brottslighet": "يعود للجريمة (عود)",
    "Återförvisning": "إعادة القضية (لمحكمة أدنى)",
    "Återkallelse": "سحب (الدعوى أو الطلب)",
    "Åtgärd": "إجراء",
    "Äktenskapshinder": "موانع الزواج",
    "Ändring av talan": "تعديل الدعوى",
    "Ärekränkning": "تشهير (قدح وذم)",
    "Ärendet avskrivs": "حفظ القضية (شطبها)",
    "Ömsesidig": "متبادل",
    "Överenskommelse": "اتفاق",
    "Överförmyndare": "كبير الأوصياء (مشرف على الأوصياء)",
    "Övergrepp i rättssak": "اعتداء في قضية قانونية (تدخل في سير العدالة)",
    "Överklaga": "يستأنف (يطعن في الحكم)",
    "Överklagandeinlaga": "لائحة الاستئناف",
    "Överlåtelse": "تنازل أو نقل ملكية",
    "Överlåtelse av fastighet": "نقل ملكية عقار",
    "Övertrassera": "سحب على المكشوف",
    "Överträdelse": "مخالفة أو خرق"
};

let updatedCount = 0;

dictionaryData.forEach((entry) => {
    const type = (entry[COL_TYPE] || '').trim();
    const word = entry[COL_SWE];
    const currentDef = entry[COL_ARB_DEF] || '';

    // Using mapping to handle duplicates in list
    if (type === 'JuridikTB.' && !currentDef.trim() && arabicDefinitions[word]) {
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
