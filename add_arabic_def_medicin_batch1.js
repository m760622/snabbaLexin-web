/**
 * Add Arabic definitions for Medicin terms - Batch 1
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

// Arabic definitions for Medicin terms - Batch 1
const arabicDefinitions = {
    "A - hepatit": "التهاب الكبد A (الوبائي)",
    "Abnorm rörlighet": "حركة غير طبيعية (للمفاصل)",
    "Abnorma reaktioner": "تفاعلات غير طبيعية",
    "ABO system": "نظام فصائل الدم ABO",
    "Abort": "إجهاض",
    "Abscess": "خُمّاج (دمل/خراج)",
    "Absorption": "امتصاص (للدواء أو الغذاء)",
    "ACE - hämmare": "مثبطات الإنزيم المحول للأنجيوتنسين (أدوية ضغط)",
    "Acetonlukt": "رائحة الأسيتون (في التنفس عند مرضى السكري)",
    "Adaptationsförmåga": "القدرة على التكيف",
    "Adaption": "تكيف",
    "ADD": "اضطراب نقص الانتباه (بدون فرط حركة)",
    "Addisons sjukdom": "مرض أديسون (قصور الغدة الكظرية)",
    "ADH - Antidiuretiskt hormon": "الهرمون المانع لإدرار البول (فاسوبريسين)",
    "ADHD": "اضطراب فرط الحركة ونقص الانتباه",
    "ADL - träning": "تدريب أنشطة الحياة اليومية (لذوي الاحتياجات)",
    "Adrenalin": "أدرينالين",
    "Afasi": "حبسة (فقدان القدرة على الكلام)",
    "Affektiva sjukdomar": "اضطرابات وجدانية (مزاجية)",
    "Afferenta nerver": "أعصاب واردة (حسية)",
    "Agglutination": "تلازن (تخثر الدم)",
    "Agranulocytos": "ندرة المحببات (نقص حاد في نوع من البيضاء)",
    "Aids, förvärvad immunbristsjukdom": "الإيدز (نقص المناعة المكتسبة)",
    "Aktiv immunisering": "تطعيم نشط (لقاح)",
    "Aktiv immunitet": "مناعة مكتسبة نشطة",
    "Aktiveras": "يتنشط",
    "Akut": "حاد (مرض)",
    "Akut bukfall": "حالة بطن حادة (تستدعي جراحة عاجلة)",
    "Akut glomerulonefrit": "التهاب كبيبات الكلى الحاد",
    "Akut luftrörskatarr, bronkit": "التهاب الشعب الهوائية الحاد (نزلة صدرية)",
    "Akut njursvikt": "فشل كلوي حاد",
    "Akut polyartrit": "التهاب مفاصل متعدد حاد",
    "Akut pyelonefrit": "التهاب حوض الكلية الحاد (التهاب كلى صديدي)",
    "Akut urinstopp": "احتباس بولي حاد",
    "Akuta infektionssjukdomar": "أمراض معدية حادة",
    "Akutmottagning": "قسم الطوارئ",
    "Akvedukten": "المسال الدماغي (قناة سيلفيوس)",
    "Albino": "أمهق (عدو الشمس)",
    "Albumin": "ألبومين (بروتين الدم)",
    "Aldosteron": "ألدوستيرون (هرمون)",
    "Alkoholkonsumtion": "استهلاك الكحول",
    "Alkoholpsykos": "ذهان كحولي",
    "Allergen": "مُحسِّس (مادة مسببة للحساسية)",
    "Allergiska symptom": "أعراض حساسية",
    "Allergitecken": "علامات الحساسية",
    "Allmän hälsotillstånd": "الحالة الصحية العامة",
    "Allmän sjukdomskänsla": "شعور عام بالمرض (توعك)",
    "Allmän svaghet": "ضعف عام",
    "Allmänbehandling": "علاج عام",
    "Allmänfarlig sjukdom": "مرض خطر على الصحة العامة (معدٍ)",
    "Allmäninfektion": "عدوى عامة (تسمم دموي)",
    "Allmänsymtom": "أعراض عامة",
    "Allmäntillståndet": "الحالة العامة",
    "Allmänverkan": "تأثير عام (للجسد كله)",
    "Allsidig kost": "نظام غذائي متوازن",
    "Allvarliga konsekvenser": "عواقب وخيمة (مضاعفات خطيرة)",
    "Alstra": "يولد (ينتج طاقة أو حرارة)",
    "Ambulans": "سيارة إسعاف",
    "Aminosyror": "أحماض أمينية",
    "Amning": "رضاعة طبيعية",
    "Amningen": "الرضاعة",
    "Amputation": "بتر",
    "Amylas": "أميلاز (إنزيم)",
    "Amöbadysenteri": "زحار أميبي (دوسنتاريا)",
    "Amöbor": "أميبا (طفيليات)",
    "Anafylaktisk chock": "صدمة تحسسية (تأق)",
    "Anala och orala samlag": "جماع شرجي وشفوي",
    "Analgetika": "مسكنات الألم",
    "Analys": "تحليل",
    "Analöppning": "فتحة الشرج",
    "Anatomi": "علم التشريح",
    "Anatomiska förändringar": "تغيرات تشريحية",
    "Andedräkten": "النَفَس (رائحة الفم)",
    "Andfådd": "لاهث (ضيق نفس عند الجهد)",
    "Andningen": "التنفس",
    "Andningsapparaten": "الجهاز التنفسي",
    "Andningsfrekvens": "معدل التنفس",
    "Andningsorgan": "أعضاء التنفس",
    "Andningssvårigheter": "صعوبات تنفسية",
    "Andnöd, dyspné": "ضيق التنفس (إعسار تنفسي)",
    "Andnöd ( Dypsne )": "ضيق تنفس",
    "Anemi": "فقر الدم (الأنيميا)",
    "Anfallsfrekvens": "تواتر النوبات (تكرار)",
    "Anfallsvis": "على شكل نوبات",
    "Anfallsvis smärta": "ألم نوبي (مغص متقطع)",
    "Angioencefalografi": "تصوير أوعية الدماغ",
    "Angiografi": "تصوير الأوعية الدموية (قسطرة تصويرية)",
    "Angreppskraft": "قدرة الهجوم (للميكروب - الفوعة)",
    "Angriper": "يهاجم (يغزو الجسم)",
    "Angränsande": "مجاور (للورم أو العضو)",
    "Anhopning": "تكدس (تجمع خلايا)",
    "Anlag": "استعداد وراثي (أو سمة جينية)",
    "Anlägga": "ينشئ (ناسوراً أو فتحة)",
    "Anmälningspliktiga sjukdomar": "أمراض واجبة التبليغ",
    "Ansamlas": "يتراكم (سوائل)",
    "Ansamlingar": "تجمعات (تراكمات)",
    "Ansiktsben": "عظام الوجه",
    "Ansiktsskelett": "هيكل الوجه",
    "Ansträngningsinkontinens": "سلس الإجهاد (عند الضحك أو العطس)",
    "Antal": "عدد"
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
