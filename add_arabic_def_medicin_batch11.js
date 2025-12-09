/**
 * Add Arabic definitions for Medicin terms - Batch 11
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

// Arabic definitions for Medicin terms - Batch 11
const arabicDefinitions = {
    "Gliaceller": "خلايا دبقية (Glia)",
    "Globuliner": "جلوبولينات (بروتينات الدم)",
    "Glomerulonefrit": "التهاب كبيبات الكلى",
    "Glomerulus - i - Kapillärnystan": "الكبيبة (شبكة شعيرات دموية)",
    "Glukagon": "جلوكاجون (هرمون)",
    "Glukogen": "جليكوجين",
    "Glukos": "جلوكوز (سكر الدم)",
    "Glukos intag - Glukosuri": "تناول الجلوكوز - بيلة سكرية (سكر في البول)",
    "Glukosbelastningsprov": "اختبار تحمل الجلوكوز",
    "Gluten": "جلوتين",
    "Glykos": "سكر العنب (جلوكوز)",
    "Glänsande": "لامع",
    "Godartad, benign, tumör": "ورم حميد",
    "Godartad tumör": "ورم حميد",
    "Godartade, benigna": "حميدة",
    "Golgi - apparaten": "جهاز جولجي",
    "Gom": "الحنك (سقف الحلق)",
    "Gombågarna": "قوسا الحنك",
    "Gommandlar": "اللوزتان الحنكيتان",
    "Gommen": "الحنك",
    "Gommen": "حنك (مكرر)",
    "Gomspalta": "شق الحنك",
    "Gomspenen": "اللهاة",
    "Gonokockbakterier": "بكتيريا المكورات البنية",
    "Gonokocken": "المكورة البنية (مسببة للسيلان)",
    "Gonokocker": "مكورات بنية",
    "Gonorré": "السيلان",
    "Grand mal - anfall": "نوبة صرع كبرى",
    "Granulocyter": "خلايا محببة (كرات دم بيضاء)",
    "Granulocyter": "خلايا محببة (مكرر)",
    "Gravid - Graviditet": "حامل - حمل",
    "Graviditetstest": "اختبار الحمل",
    "Graviditetsvecka": "أسبوع الحمل",
    "Greensticksfraktur": "كسر الغصن النضير (شعر عظمي عند الأطفال)",
    "Grenar ut sig": "يتفرع",
    "Grov": "غليظ (خشن)",
    "Grovtarm": "الأمعاء الغليظة",
    "Grumlig": "عكر",
    "Grumlighet": "عتامة (عكر)",
    "Grumling av linsen": "عتامة عدسة العين (ساد/تراخوما)",
    "Grundfalang": "السلامية الأولي (القريبة)",
    "Grundorsak": "السبب الأساسي",
    "Grundprincip": "مبدأ أساسي",
    "Grundsjukdom": "مرض أساسي",
    "Grå substans": "المادة الرمادية",
    "Gråvita proppar": "سدادات رمادية بيضاء (قيح متجبن)",
    "Gul benmärg": "نخاع العظم الأصفر (الدهني)",
    "Gummibandsligering": "ربط شريطي (للبواسير)",
    "Gynekolog": "طبيب نسائية",
    "Gynekolog": "طبيب نساء (مكرر)",
    "Gynekologi": "طب النساء",
    "Gynekologi": "أمراض النساء (مكرر)",
    "Gynekologisk cellprovskontroll": "فحص مسحة عنق الرحم",
    "Gynekologisk undersökningsstol": "كرسي الفحص النسائي",
    "Gångsystem": "نظام القنوات",
    "Gånjärnsled": "مفصل رزي (كمفصل الباب)",
    "Går av": "ينكسر (أو ينقطع)",
    "Gåshud": "قشعريرة (جلد الإوزة)",
    "Gåstol": "مشاية (للأطفال أو المسنين)",
    "H - formad": "على شكل H",
    "Haemophilus influenzae": "المستدمية النزلية (بكتيريا)",
    "Hak och bandmask": "ديدان خطافية وشريطية",
    "Halsböld": "خُراج الحلق",
    "Halsens muskler": "عضلات العنق",
    "Halsfluss - Angina": "التهاب اللوزتين (خناق)",
    "Halsfluss, tonsillitis": "التهاب اللوزتين",
    "Halskotor": "فقرات عنقية",
    "Halskotor": "فقرات الرقبة (مكرر)",
    "Halsmandel, tonsill": "اللوزة",
    "Halsont": "ألم الحلق",
    "Halspulsådern": "الشريان السباتي",
    "Halvmånformig": "هلالي الشكل",
    "Hammaren": "المطرقة (عظمة في الأذن)",
    "Hamnar": "يصل إلى (ينتهي به المطاف)",
    "Hand": "يد",
    "Handflata": "راحة اليد",
    "Handlingsritual": "طقوس قهرية",
    "Handlov": "رسغ اليد",
    "Handloven": "الرسغ",
    "Handrot": "عظام الرسغ",
    "Hanens muskler": "عضلاته (خطأ إملائي Handens?) عضلات اليد",
    "Harmoni": "انسجام",
    "Harmynthet ( kluven läpp )": "الشفة الأرنبية (الشفة المشقوقة)",
    "Hassel": "بندق (مسبب للحساسية)",
    "Hastigt": "بسرعة (فجأة)",
    "Havre": "شوفان",
    "Helicobacter pylori": "الملوية البوابية (جرثومة المعدة)",
    "Hematologi": "علم الدم",
    "Hematom": "ورم دموي (تجمع دموي)",
    "Hematuri": "بيلة دموية (دم في البول)",
    "Hemodialys": "غسيل كلى دموي",
    "Hemofili": "ناعور (هيموفيليا)",
    "Hemoglobin": "هيموجلوبين",
    "Hemoglobin - HB": "خضاب الدم (HB)",
    "Hemolytiska streptokocker": "عقديات حالة للدم",
    "Hemorrojder": "بواسير",
    "Hemsjukvård": "رعاية صحية منزلية",
    "Hepatit": "التهاب الكبد",
    "Hepatit A, epidemisk gulsot": "التهاب الكبد A (اليرقان الوبائي)",
    "Hepatit B, inokulationshepatit, serumhepatit": "التهاب الكبد B"
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
