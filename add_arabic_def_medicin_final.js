/**
 * Add Arabic definitions for Medicin terms - Final Batch
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

// Arabic definitions for Medicin terms - Final Batch
const arabicDefinitions = {
    "Ögonsalva": "مرهم عين",
    "ÖLI - Övre luftvägsinfektion": "عدوى الجهاز التنفسي العلوي (ÖLI)",
    "Ömhet": "إيلام (ألم عند اللمس)",
    "Öppen fraktur": "كسر مفتوح (مركب)",
    "Öppen hälso och sjukvård": "الرعاية الصحية المفتوحة (الخارجية)",
    "Öppningsskedet": "مرحلة التوسع (في الولادة)",
    "Öroninflammation, otit": "التهاب الأذن",
    "Öronmusslan": "صيوان الأذن",
    "Öronspottkörtlar": "الغدد النكفية",
    "Örontrumpet": "قناة إستاكيوس",
    "Öronvax": "شمع الأذن (صملاخ)",
    "Östrogen": "إستروجين",
    "Överaktiv urinblåsa": "مثانة مفرطة النشاط",
    "Överarm": "العضد (الذراع العلوي)",
    "Överarmsbenet": "عظم العضد",
    "Övergångsåldern, klimakteriet": "سن اليأس (انقطاع الطمث)",
    "Överhud": "البشرة (الطبقة السطحية)",
    "Överhuden": "البشرة",
    "Överkäken": "الفك العلوي",
    "Överkänslighet för gluten, glutenintolerans": "حساسية الغلوتين (عدم تحمل)",
    "Överkänslighet för mjölksocker, laktosintolerans": "عدم تحمل اللاكتوز",
    "Övervik": "وزن زائد (سمنة)",
    "Övervätskning": "فرط السوائل (زيادة حجم السوائل)",
    "Övre extremiteternas muskler": "عضلات الأطراف العلوية",
    "Övre magmunnen": "الفؤاد (فتحة المعدة العلوية)"
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
