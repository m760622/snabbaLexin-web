/**
 * Add Arabic definitions for MedicinMR terms - Final Batch
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

// Arabic definitions for MedicinMR terms - Final Batch
const arabicDefinitions = {
    "Tvina": "يذوي (يضمر)",
    "Tyna bort": "يتلاشى (يذبل ببطء)",
    "Tyst miljö": "بيئة هادئة",
    "Underlätta Din vardag": "تسهيل حياتك اليومية",
    "Undersökningsrummet": "غرفة الفحص",
    "Universitetsbetyg": "درجات جامعية",
    "Uppkördhetskänsla": "شعور بالانتفاخ (تخمة)",
    "Upplevt något mycket svårt": "عاش تجربة عصيبة جداً",
    "Uppskakad ( chockad, rädd ) efter olyckstillbudet": "مصدوم (مرتعب) بعد الحادث",
    "Uppskakande ( som gör en uppskakad ) händelse": "حدث صادم (مروع)",
    "Urskilja färger": "تمييز الألوان",
    "Utbuktning": "نتوء (انتفاخ)",
    "Utmattad, slutskörd, uttröttad": "منهك (مجهد تماماً)",
    "Utskickade av regimen": "مرسلون من النظام",
    "Utslag - utslagen": "طفح جلدي",
    "Utåtagerande, utagerande ( beter sig obehärskat med aggressivt språk och våldsamma handlingar": "سلوك عدواني (جامح)",
    "Vaknar av symptomen nattetid": "يستيقظ بسبب الأعراض ليلاً",
    "Vandra upp till levern": "يهاجر صعوداً إلى الكبد",
    "Vara så drastiskt": "يكون حاداً جداً (جذرياً)",
    "Varblåsor": "بثور قيحية",
    "Varit i kontakt med": "كان على اتصال بـ",
    "Vattenloppor, Hinnkräftor, Cladocera": "براغيث الماء",
    "Veterinärhögskolan": "كلية الطب البيطري",
    "Våldtäkt": "اغتصاب",
    "Vårtor, verruca, sycoma": "ثآليل",
    "Vätskande blåsor": "بثور نازة (تفرز سوائل)",
    "Vätskar sig": "ينز (يرشح سائل)",
    "Vätskefyllda blåsor": "بثور مملوءة بالسائل",
    "Vätskefyllda blåsor, cysta": "كيسات (حويصلات مملوءة بالسائل)",
    "Växte in i glaskroppen": "نما داخل الجسم الزجاجي",
    "Åldersförändringar": "تغيرات العمر (الشيخوخة)",
    "Återbesök": "زيارة مراجعة",
    "Ämnen": "مواد",
    "Ögats optiska system": "النظام البصري للعين",
    "Ögon är korta": "العيون قصيرة المحور (طول النظر)",
    "Ögonkirurgen": "جراح العيون",
    "Öppna frakturer": "كسور مفتوحة",
    "Öronsusningar": "طنين الأذن",
    "Öronvärken": "ألم الأذن"
};

let updatedCount = 0;

dictionaryData.forEach((entry) => {
    const type = (entry[COL_TYPE] || '').trim();
    const word = entry[COL_SWE];
    const currentDef = entry[COL_ARB_DEF] || '';

    // Using mapping to handle duplicates in list
    if (type === 'MedicinMR.' && !currentDef.trim() && arabicDefinitions[word]) {
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
