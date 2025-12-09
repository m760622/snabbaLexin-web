/**
 * Add Arabic definitions for JuridikS terms - Final Batch
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

// Arabic definitions for JuridikS terms - Final Batch
const arabicDefinitions = {
    "Äktenskapstvång": "الإكراه على الزواج (الزواج القسري)",
    "Ärendelagen": "قانون القضايا (غير المنازعات في المحاكم)",
    "Ärenden": "قضايا أو معاملات (إدارية أو قضائية)",
    "Ärvdabalken": "قانون الميراث (مدونة المواريث)",
    "Öppet ärende - avslutad ärende": "قضية مفتوحة - قضية مغلقة",
    "Öppna frågor": "أسئلة مفتوحة (تتطلب شرحاً)",
    "Överförmyndarnämnd": "لجنة الرعاية والوصاية (على القصر والمحجور عليهم)",
    "Överhypotek": "فائض الرهن (القيمة المتبقية بعد تغطية الدين)",
    "Överklagande": "استئناف (طعن في الحكم)",
    "Överklagandeskriften": "لائحة الاستئناف",
    "Överlägga": "يتداول (لإصدار الحكم)",
    "Överprövningsmål": "قضايا إعادة النظر (المراجعة القضائية)",
    "Överseende": "تسامح أو تغاضي",
    "Överträdelse av myndighets bud och hindrande av förrättning": "مخالفة أوامر السلطة وعرقلة الإجراءات",
    "Övervakning": "مراقبة (عقوبة أو إجراء)",
    "Övervakningsgaranter": "ضامنو المراقبة",
    "Övervakningsnämnd": "لجنة المراقبة (على السجناء والمفرج عنهم)",
    "Överåklagare": "رئيس نيابة (مدعي عام أعلى)"
};

let updatedCount = 0;

dictionaryData.forEach((entry) => {
    const type = (entry[COL_TYPE] || '').trim();
    const word = entry[COL_SWE];
    const currentDef = entry[COL_ARB_DEF] || '';

    // Mapping for duplicate handling
    const definitionMap = {
        "Övervakning": "مراقبة (عقوبة أو إجراء)"
    };

    if (type === 'JuridikS.' && !currentDef.trim()) {
        if (arabicDefinitions[word]) {
            entry[COL_ARB_DEF] = arabicDefinitions[word];
            updatedCount++;
            console.log(`✅ ${word}`);
        } else if (definitionMap[word]) {
            entry[COL_ARB_DEF] = definitionMap[word];
            updatedCount++;
            console.log(`✅ ${word}`);
        }
    }
});

// Write back to data.js
const output = 'const dictionaryData = ' + JSON.stringify(dictionaryData, null, 2) + ';';
fs.writeFileSync('./data.js', output);

console.log(`\n📊 Uppdaterade ${updatedCount} ord.`);
console.log('✅ Ändringar sparade i data.js');
