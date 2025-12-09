/**
 * Add Arabic definitions for Medicin terms - Batch 22
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

// Arabic definitions for Medicin terms - Batch 22
const arabicDefinitions = {
    "Urinflöde": "تدفق البول",
    "Urinförgiftning, uremi": "تسمم بولي (يوريميا)",
    "Urinförgiftning, uremi": "تسمم بولي (يوريميا) (مكرر)",
    "Urininkontinens": "سلس البول",
    "Urininkontinens": "سلس البول (مكرر)",
    "Urinledarna": "الحالبان",
    "Urinläckage": "تسرب البول",
    "Urinodling": "مزرعة بول",
    "Urinodling": "مزرعة بول (مكرر)",
    "Urinorganen": "المسالك البولية (أعضاء)",
    "Urinorganen": "أعضاء الجهاز البولي (مكرر)",
    "Urinretention": "احتباس البول",
    "Urinrör - urinröret": "الإحليل (قناة مجرى البول)",
    "Urinröret": "الإحليل",
    "Urinträngning": "إلحاح بولي (رغبة ملحة)",
    "Urinträngningar": "إلحاحات بولية",
    "Urinvägarna": "المسالك البولية",
    "Urinämne": "يوريا (بولة)",
    "Urledvridningar, ledluxationer": "خلع المفاصل",
    "Urografi": "تصوير المسالك البولية",
    "Utandning": "زفير",
    "Utdrivningsskedet": "مرحلة الدفع (في الولادة)",
    "Utesluta": "يستبعد (التشخيص)",
    "Utmattning": "إرهاق (إنهاك)",
    "Utomkvedshavandeskap, extrauterin graviditet": "حمل خارج الرحم",
    "Utsöndring": "إفراز (إطراح)",
    "Utvecklingsländer": "دول نامية",
    "Utvecklingsstörning": "اضطراب في التطور (إعاقة نمائية)",
    "Utvidgning": "توسع (تمدد)",
    "UVI - Urinvägsinfektion": "التهاب المسالك البولية (UVI)",
    "Vaccin": "لقاح (تطعيم)",
    "Vaccination": "تطعيم",
    "Vaginalt, via vagina": "مهبلياً",
    "Vaginaltabletter": "تحاميل مهبلية (أقراص)",
    "Vagitorier": "تحاميل مهبلية",
    "Varansamlingar, abscesser tränger ut": "تجمعات صديدية (خراجات تنفجر)",
    "Vardagssysslor": "أنشطة يومية",
    "Vattenkastning": "تبول",
    "Vattenomsättningen": "توازن السوائل (دورة الماء)",
    "Vegetarisk kost": "نظام غذائي نباتي",
    "Venoler": "وريدات (أوردة دقيقة)",
    "Ventrikelflimmer": "رجفان بطيني",
    "Venösa återflödet": "العائد الوريدي",
    "Verkningstid": "مدة المفعول (أو وقت البدء)",
    "Viktförändringar": "تغيرات في الوزن",
    "Vinterkräksjukan": "إنفلونزا المعدة (فيروس القيء الشتوي/نوروفيروس)",
    "Virusinfektion": "عدوى فيروسية",
    "Vita blodkroppar": "كريات الدم البيضاء",
    "Vita blodkropparna, leukocyterna": "خلايا الدم البيضاء",
    "Vrickningar": "التواءات (تمزق أربطة)",
    "Vristen": "الكاحل (رسغ القدم)",
    "Vårdcentral": "مركز صحي (مستوصف)",
    "Vårdgivare": "مقدم الرعاية الصحية",
    "Väderlek": "طقس (أحوال جوية)",
    "Vägglus": "بق الفراش",
    "Väsande": "أزيزي (صوت صفير)",
    "Vätska": "سائل",
    "Vätskande sår": "جرح نازّ (يرشح)",
    "Vätskeansamling": "تجمع سوائل (وذمة)",
    "Vätskebalans": "توازن السوائل",
    "Vätskebrist": "جفاف (نقص سوائل)",
    "Vätskeersättningsmedel": "محلول تعويض السوائل",
    "Vätskefyllda blåsor, cystor": "بثور مملوءة بالسائل (أكياس)",
    "Vätskeintag": "تناول السوائل",
    "Vätskerum": "حيز السوائل (داخل الجسم)",
    "Vävnad": "نسيج",
    "Vävnadsprov": "خزعة (عينة نسيج)",
    "Vävnadsskador": "تلف الأنسجة",
    "Växtvärk": "آلام النمو (عند الأطفال)",
    "Ytterörat": "الأذن الخارجية",
    "Yttre fixation": "تثبيت خارجي (للكسور)",
    "Yttre hörselgången": "قناة الأذن الخارجية",
    "Åkomma": "علة (مرض بسيط)",
    "Åkommor": "علل (أمراض)",
    "Åksjukan": "دوار الحركة",
    "Åldersförändringar i hörselbenen, otoskleros": "تصلب عظيمات السمع (تصلب الركاب)",
    "Ålderssynthet": "قصو البصر الشيخوخي",
    "Ångest syndrom": "متلازمة القلق",
    "Ångestdämpande": "مضاد للقلق (مهدئ)",
    "Återabsorbera": "يعيد امتصاص",
    "Återabsorberas": "يُعاد امتصاصه",
    "Återförenas": "يلتئم (يتصل مرة أخرى)",
    "Återhämta sig": "يتعافى (يسترد عافيته)",
    "Återuppsugningen": "إعادة الامتصاص",
    "Äggcellen": "البويضة",
    "Äggledare": "قنوات فالوب (أنابيب الرحم)",
    "Äggledarinflammation": "التهاب قنوات فالوب",
    "Ägglossningen": "الإباضة",
    "Äggstock, ovarium": "المبيض",
    "Äggstockar": "مبايض",
    "Äggviteämne": "بروتين (زلال)",
    "Äggviteämnen, proteiner": "بروتينات",
    "Ändrade avföringsvanor": "تغير عادات التبرز",
    "Ändtarmen, rektum": "المستقيم",
    "Ändtarmsöppningen, anus": "فتحة الشرج",
    "Ärftlig faktor": "عامل وراثي",
    "Ärftlighet": "وراثة",
    "Ärrbildning": "تندب (تشكل ندبة)",
    "Ögondroppar": "قطرة عين",
    "Ögonhåla": "محجر العين (الحجاج)"
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
