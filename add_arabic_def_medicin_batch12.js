/**
 * Add Arabic definitions for Medicin terms - Batch 12
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

// Arabic definitions for Medicin terms - Batch 12
const arabicDefinitions = {
    "Hepatit C": "التهاب الكبد C",
    "Hereditet": "وراثة (استعداد وراثي)",
    "Hernia ( bråck )": "فتق",
    "Herpes": "هربس (حلأ)",
    "Herpesinfektionen": "عدوى الهربس",
    "Herpesvirus": "فيروس الهربس",
    "Heshet": "بحة (خشونة الصوت)",
    "Hib - infektion": "عدوى المستدمية النزلية ب (Hib)",
    "Hinna": "غشاء",
    "Hinnbåggångar": "قنوات هلالية غشائية",
    "Hinnklädd": "مبطن بغشاء",
    "Hinnlabyrint": "تيه غشائي (في الأذن)",
    "Hinnsnäckan": "القوقعة الغشائية",
    "Hinnsäckar": "أكياس غشائية",
    "Histamin": "هيستامين",
    "Histologi": "علم الأنسجة",
    "Hivtest": "فحص HIV (الإيدز)",
    "Hjälporgan": "أعضاء مساعدة (ملحقة)",
    "Hjärn - och ryggmärgsvätska": "سائل دماغي شوكي",
    "Hjärna": "دماغ",
    "Hjärnan": "الدماغ",
    "Hjärnbalken": "الجسم الثفني (Corpus callosum)",
    "Hjärnbalken": "الجسم الثفني (مكرر)",
    "Hjärnbark": "قشرة الدماغ",
    "Hjärnbarken": "القشرة الدماغية",
    "Hjärnbihang": "غدة نخامية (تسمية قديمة)",
    "Hjärnbryggan": "جسر الدماغ (Pons)",
    "Hjärnhemisfärer": "نصفا كرة المخ",
    "Hjärnhinna": "سحايا الدماغ (غشاء الدماغ)",
    "Hjärnhinna": "سحايا (مكرر)",
    "Hjärninfarkt": "احتشاء دماغي (جلطة)",
    "Hjärnlob": "فص دماغي",
    "Hjärnnerver": "أعصاب قحفية (دماغية)",
    "Hjärnskålen": "القحف (الجمجمة المحيطة بالدماغ)",
    "Hjärnskålsskelett": "هيكل القحف",
    "Hjärnstam": "جذع الدماغ",
    "Hjärnstammen": "جذع الدماغ",
    "Hjärntumör": "ورم دماغي",
    "Hjärnventrikel": "بطين دماغي",
    "Hjärnvindlingar": "تلافيف المخ",
    "Hjärt - eko, ekokardiografi": "إيكو القلب (تخطيط صدى القلب)",
    "Hjärt - kärlsjukdom": "مرض القلب والأوعية الدموية",
    "Hjärt - kärlsjukdomar": "أمراض القلب والأوعية الدموية",
    "Hjärt - lungräddning": "إنعاش قلبي رئوي (HLR/CPR)",
    "Hjärtarytmier": "اضطرابات نظم القلب",
    "Hjärtat": "القلب",
    "Hjärtbas": "قاعدة القلب",
    "Hjärtcykeln": "الدورة القلبية",
    "Hjärtfel": "قصور القلب (أو عيب قلبي)",
    "Hjärtfrekvensen": "معدل ضربات القلب",
    "Hjärtkateterisering": "قسطرة قلبية",
    "Hjärtljuden": "أصوات القلب",
    "Hjärtmuskel": "عضلة القلب",
    "Hjärtmuskulaturen": "عضلات القلب",
    "Hjärtrubbningar": "اضطرابات قلبية",
    "Hjärtrytmen": "إيقاع القلب (النظم)",
    "Hjärtsammandragning": "انقباض القلب",
    "Hjärtskiljeväggen": "حاجز القلب",
    "Hjärtslag": "نبض القلب",
    "Hjärtspets": "قمة القلب",
    "Hjärtsvikt - Hjärtinsufficiens": "فشل القلب (قصور القلب)",
    "Hjärtsäck - pericardium": "تأمو القلب (الغشاء المفروز)",
    "Hjärtsäcken": "شغاف القلب (الكيس المحيط)",
    "Hjärttoner": "نغمات القلب",
    "Hjärtverksamhet": "نشاط القلب",
    "Hjässa": "قمة الرأس (الهامة)",
    "Hjässben": "عظم جداري",
    "Hjässbenet": "العظم الجداري",
    "Hjässloben": "الفص الجداري",
    "Hopkopplade": "مرتبطة (متصلة)",
    "Hormon": "هرمون",
    "Hormonbehandling": "علاج هرموني",
    "Hormonbehandling": "علاج هرموني (مكرر)",
    "Hormonella rubbningar": "اضطرابات هرمونية",
    "Hormonella systemet": "الجهاز الهرموني (الصم)",
    "Hormonella åkommor": "أمراض هرمونية",
    "Hormoner": "هرمونات",
    "Hormonrubbningar": "اختلالات هرمونية",
    "Hornhinnan, Kornea": "القرنية",
    "Hornlager": "طبقة متقرنة",
    "Hornplattor": "صفائح قرنية",
    "Horntrådar": "خيوط كيراتينية",
    "Hornämnesinlagring": "ترسب الكيراتين",
    "Hosta ( Rethosta ), ( Torr hosta )": "سعال (جاف/تحسسي)",
    "Hosta och heshet": "سعال وبحة",
    "Hostanfall": "نوبة سعال",
    "Hostattacker": "نوبات سعال",
    "Hostdämpande": "مضاد للسعال (مهدئ)",
    "HSL": "قانون الرعاية الصحية والطبية (HSL)",
    "Hudförändring": "تغير جلدي (آفة جلدية)",
    "Hudkörtlar": "غدد جلدية",
    "Hudparasiter": "طفيليات الجلد",
    "Hudrodnad": "احمرار الجلد",
    "Hudsjukdom": "مرض جلدي",
    "Hudtumör": "ورم جلدي",
    "Hudutslag": "طفح جلدي",
    "Hudutslag": "طفح جلدي (مكرر)",
    "Hudveck": "ثنيات الجلد",
    "Hugg": "طعنة (ألم واخز)",
    "Hugg i sidan": "نغزة في الجانب (وخز)"
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
