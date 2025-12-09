/**
 * Add Arabic definitions for Medicin terms - Batch 6
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

// Arabic definitions for Medicin terms - Batch 6
const arabicDefinitions = {
    "Cirkulationsorgan": "أعضاء الدورة الدموية",
    "Cirkulationsrubbningar": "اضطرابات الدورة الدموية",
    "Cirkulationssjukdomar": "أمراض الدورة الدموية",
    "Cirkulationssystemet": "الجهاز الدوري",
    "CNS, centrala nervsystemet": "الجهاز العصبي المركزي (CNS)",
    "Cochleaimplantat": "غرسة القوقعة (زراعة قوقعة)",
    "Coliter": "التهابات القولون",
    "Colon": "القولون",
    "Corium": "الأدمة (طبقة الجلد الوسطى)",
    "Cortisol": "كورتيزول (هرمون)",
    "Cp - barn": "طفل مصاب بالشلل الدماغي",
    "Cp, cerebral pares": "الشلل الدماغي (CP)",
    "Crohns sjukdom": "مرض كرون (التهاب أمعاء مزمن)",
    "Crohns sjukdom, Morbus": "داء كرون",
    "Cushings syndrom": "متلازمة كوشينغ (فرط الكورتيزول)",
    "Cystit - Blåskatarr": "التهاب المثانة (Cystitis)",
    "Cystnjure": "كلية متكيسة",
    "Cystor": "أكياس (خراجات)",
    "Cystoskop - Cystoskopi": "منظار المثانة - تنظير المثانة",
    "Cystoskopi": "تنظير المثانة",
    "Cytologi": "علم الخلية (فحص الخلايا)",
    "Cytologisk undersökning": "فحص خلوي (سيتولوجي)",
    "Cytoplasma": "سايتوبلازم (هيولى الخلية)",
    "Cytostatika": "أدوية سرطانية (مثبطات الخلايا)",
    "Cytostatika": "علاج كيماوي (مكرر)",
    "Cytostatikabehandling, cellgiftsbehandling": "علاج بالكيماوي (مثبطات الخلايا)",
    "D - vitamin": "فيتامين D",
    "DAMP": "اضطراب نقص الانتباه والتحكم الحركي والإدراك",
    "Datortomografi, CT": "أشعة مقطعية (CT scan)",
    "De inre skikten": "الطبقات الداخلية",
    "Defekationsbehov": "الحاجة للتغوط",
    "Defibrillator": "جهاز مزيل الرجفان (الصدمة الكهربائية)",
    "Deformerad - Deformering": "مشوه - تشوه",
    "Deformiteter": "تشوهات",
    "Degenerativ disksjukdom": "مرض القرص التنكسي (تآكل الديسك)",
    "Delsymtom": "عَرَض جزئي",
    "Dendrit - dendriter": "زائدة شجرية (تفرعات عصبية)",
    "Depotplåster": "لاصفة جلدية (ممتدة المفعول)",
    "Depressioner": "اكتئاب (حالات اكتئاب)",
    "Depressiv neuros": "عصاب اكتئابي",
    "Depåfett": "دهون مخزنة",
    "Dermatit": "التهاب الجلد",
    "Dermatologi": "طب الأمراض الجلدية",
    "Destruktion": "تدمير (تخريب الأنسجة)",
    "Det centrala nervsystemet CNS": "الجهاز العصبي المركزي",
    "Det metabola syndromet": "متلازمة التمثيل الغذائي (الأيض)",
    "Det perifera nervsystemet PNS": "الجهاز العصبي المحيطي",
    "Detaljseende": "الرؤية التفصيلية (الحدة البصرية)",
    "Diabetes insipidus": "بوال تافه (سكري كاذب - نقص ADH)",
    "Diabetes mellitus - Sockersjuka": "السكري (البول السكري)",
    "Diabeteskoma": "غيبوبة سكرية",
    "Diabetessår": "قرحة السكري (قدم سكرية)",
    "Diafragma ( mellangärdet )": "الحجاب الحاجز",
    "Dialys": "غسيل كلى (ديلزة)",
    "Diarré": "إسهال",
    "Diastole": "انبساط (مرحلة راحة القلب)",
    "Diastoliskt blodtrycket": "ضغط الدم الانبساطي (السفلي)",
    "Diencefalon": "الدماغ البيني (Diencephalon)",
    "Differentiering": "تمايز (تخصص الخلايا)",
    "Differentieringsgrad": "درجة التمايز",
    "Diffus": "غير واضح (منتشر)",
    "Disk": "قرص (غضروفي)",
    "Diskbråck": "انزلاق غضروفي (ديسك)",
    "Distortion": "التواء (جزع المفصل)",
    "Distriktssköterska": "ممرضة الحي (ممرضة رعاية أولية)",
    "Divertiklar ( Galla )": "رتوج (جيوب في الأمعاء) *ملاحظة: Galla هنا قد تكون خطأ في المصدر، الرتوج تصيب القولون غالباً*",
    "Djup": "عميق",
    "Djupgående förändringar": "تغيرات عميقة",
    "Djurhår": "وبر الحيوانات (مسبب للحساسية)",
    "Djursjukhus": "مستشفى بيطري",
    "DNA": "حمض نووي (DNA)",
    "DNA - molekyler": "جزيئات DNA",
    "DNA, deoxiribonukleinsyra": "DNA (الحمض النووي الريبوزي منقوص الأكسجين)",
    "Dominant": "سائد (صفة وراثية سائدة)",
    "Domning": "تنميل (خدر)",
    "Donation": "تبرع (بأعضاء أو دم)",
    "Donationskort": "بطاقة التبرع بالأعضاء",
    "Donationsregistret": "سجل التبرع بالأعضاء",
    "Donator": "متبرع",
    "Doningar": "أدوات",
    "Dopamin": "دوبامين (ناقل عصبي)",
    "Dopingpreparat": "منشطات (محظورة رياضياً)",
    "Dopning": "تعاطي المنشطات",
    "Dottercell": "خلية ابنة (ناتجة عن الانقسام)",
    "Dottertumör, metasats": "ورم ثانوي (نقيلة - Metastasis)",
    "Dottertumörer = Dottersvulst": "أورام ثانوية",
    "Drabba": "يصيب (المرض)",
    "Dricksvatten": "مياه الشرب",
    "Dropp": "محلول وريدي (مغذّي)",
    "Droppsmitta": "عدوى بالرذاذ",
    "Dryckesvaror": "مشروبات",
    "Drypa": "يقطر",
    "Dubbelinsjuknande": "انتكاسة (إصابة مزدوجة بنفس العدوى)",
    "Dubbelseende": "رؤية مزدوجة (زغللة)",
    "Dubbelsidig": "ثنائي الجانب",
    "Dubbelväggig": "مزدوج الجدار",
    "Dublinärende": "قضية دبلن (لجوء)",
    "Duodenum ( tolvfingertarmen )": "الإثنا عشر",
    "Dura mater": "الأم الجافية (غشاء الدماغ)",
    "Dvärgväxt": "قزامة"
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
