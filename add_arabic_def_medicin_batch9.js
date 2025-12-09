/**
 * Add Arabic definitions for Medicin terms - Batch 9
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

// Arabic definitions for Medicin terms - Batch 9
const arabicDefinitions = {
    "Fosterhinnan": "الغشاء الجنيني",
    "Fosterhinnor": "أغشية جنينية",
    "Fosterskador": "تشوهات جنينية (أضرار بالجنين)",
    "Fostertid": "فترة الحمل (العمر الجنيني)",
    "Fosterutveckling": "تطور الجنين (نمو الجنين)",
    "Fosterutvecklingen": "التطور الجنيني",
    "Fostervatten": "سائل أمنيوسي (ماء الجنين)",
    "Fostervattensprov": "فحص السائل الأمنيوسي (بزل السلى)",
    "Fostervattnet": "السائل الأمنيوسي",
    "Fot": "قدم",
    "Fotens muskler": "عضلات القدم",
    "Fotled": "مفصل الكاحل",
    "Fotrot": "رسغ القدم (العقب)",
    "Fotrotsben": "عظام رسغ القدم",
    "Fotsula": "باطن القدم (أخمص)",
    "Fragmantation": "تفتت (تجزء)",
    "Framfött": "ولدت (أنجبت)",
    "Framifrån - bakåt": "من الأمام للخلف (AP - اتجاه الأشعة)",
    "Framkalla": "يسبب (يستحث)",
    "Framkallar": "يسبب",
    "Framskridet stadium": "مرحلة متقدمة (من المرض)",
    "Framtill": "في الأمام",
    "Framträdande": "بارز (وظاهر)",
    "Framtänder": "قواطع (الأسنان الأمامية)",
    "Framåt": "للأمام",
    "Frekvens": "تكرار (تردد أو معدل)",
    "Frigöras": "يتحرر (ينطلق)",
    "Frikort": "بطاقة الإعفاء (عند بلوغ سقف التكاليف)",
    "Friktion": "احتكاك",
    "Frisättningen": "إطلاق (تحرير الهرمون)",
    "Frontalloben": "الفص الجبهي",
    "Frontallobsdemens": "خرف الفص الجبهي",
    "Frossbrytning": "قشعريرة (ارتعاد من البرد/الحمى)",
    "Fruktad": "مخيف (مرض يهابه الناس)",
    "Fräknar": "نمش",
    "Främmande kroppar": "أجسام غريبة",
    "Främmande ämnen": "مواد غريبة",
    "Främre gombågar": "الأقواس الحنكية الأمامية",
    "Främre hornen ( de )": "القرون الأمامية (للنخاع - حركية)",
    "Främre nedre": "أمامي سفلي",
    "Främre ögonkammaren": "الغرفة الأمامية للعين",
    "Frätskador": "حروق كيميائية (تآكل)",
    "Frömjöl": "حبوب اللقاح (طلع)",
    "Fuktighet": "رطوبة",
    "Fullbordat": "مكتمل (تام)",
    "Fullgod": "كامل (جيد وكافٍ)",
    "Fullgånget": "مكتمل المدة (حمل تام)",
    "Funktionell ileus": "انسداد معوي وظيفي (شلك الأمعاء)",
    "Funktionella nervsjukdomar": "أمراض عصبية وظيفية (نفسية المنشأ غالباً)",
    "Funktionsbortfall": "فقدان الوظيفة",
    "Funktionsduglig": "وظيفي (شغال)",
    "Funktionsstörningar": "اضطرابات وظيفية",
    "Furunklar": "دمامل (فورنكل)",
    "Fysik": "فيزياء (أو بنية جسدية)",
    "Fysiologi": "علم وظائف الأعضاء (فسيولوجيا)",
    "Fysisk ( trötthet )": "جسدي (تعب بدني)",
    "Fysisk aktivitet": "نشاط بدني",
    "Fysisk träning": "تدريب بدني",
    "Fåordighet": "إقلال في الكلام (حبسة جزئية أو عرض نفسي)",
    "Fåra": "خدود (شقي - Sulcus)",
    "Fällas ned": "يترسب (أو يهبط)",
    "Färdiga antikroppar": "أجسام مضادة جاهزة",
    "Färdigutvecklad": "مكتمل النمو",
    "Färg": "لون",
    "Färgblindhet": "عمى الألوان",
    "Fästade vid": "مثبت بـ (متصل بـ)",
    "Fästingar": "قراد (حشرة)",
    "Födelsemärke": "وحمة (شامة ولادية)",
    "Födelseprocess": "عملية الولادة",
    "Föderskan": "الوالدة (المرأة التي تلد)",
    "Födointag": "تناول الطعام",
    "Födoämnen": "مواد غذائية",
    "Födoämnesallergi": "حاسية الطعام",
    "Födoämnesepidemier": "أوبئة غذائية (تسمم جماعي)",
    "Föra anlaget": "يحمل الصفة الوراثية",
    "Förband": "ضمادة",
    "Förbereda": "يحضر (يجهز)",
    "Förbindelse": "اتصال (وصلة)",
    "Förbränning": "حرق (أيض أو حرق حراري)",
    "Förbränningsprodukter": "نواج الاحتراق (الأيض)",
    "Fördjupning": "انخفاض (حفرة صغيرة)",
    "Fördröjd frakturläkning": "تأخر التئام الكسر",
    "Fördröjd verkan": "مفعول مؤجل (بطيء الظهور)",
    "Förebyggande": "وقائي",
    "Förebyggande behandling": "علاج وقائي",
    "Förebyggande hälsovård": "رعاية صحية وقائية",
    "Förebyggande syfte": "غرض وقائي",
    "Förenad": "مرتبط (متحد)",
    "Företrädesvis": "بشكل مفضل (غالباً في)",
    "Förgiftningar": "تسممات",
    "Förgiftningstillstånd": "حالة تسمم",
    "Förgrenar sig": "يتفرع",
    "Förhorning": "تقرن (تصلب الجلد)",
    "Förhållandet": "النسبة (أو العلاقة)",
    "Förhårdnad, skleros": "تصلب (Sclerosis)",
    "Förhårdnader": "ثفن (جلد ميت صلب)",
    "Förhöjda ( förändrade ) blodfetter": "ارتفاع دهون الدم",
    "Förhöjda kolestorolvärden": "قيم كوليسترول مرتفعة"
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
