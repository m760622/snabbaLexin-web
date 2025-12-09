/**
 * Add Arabic definitions for Medicin terms - Batch 2
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

// Arabic definitions for Medicin terms - Batch 2
const arabicDefinitions = {
    "Anti virala medel": "مضادات الفيروسات",
    "Antibiotika": "مضادات حيوية",
    "Antibiotikabehandling": "علاج بالمضادات الحيوية",
    "Antibiotiska ämnen": "مواد مضادة للبكتيريا (حيوية)",
    "Antidepressiva": "مضادات الاكتئاب",
    "Antidepressiva medel": "أدوية مضادة للاكتئاب",
    "Antidiuretiskt hormon, ADH": "هرمون مانع لإدرار البول (ADH)",
    "Antigen": "مستضد (أنتيجين)",
    "Antihistamin, antihistaminer": "مضاد الهيستامين (للحساسية)",
    "Antihormonbehandling": "علاج مضاد للهرمونات",
    "Antiinflammatoriskt läkemedel NSAID": "دواء مضاد للالتهاب (NSAID - غير ستيرويدي)",
    "Antikropp": "جسم مضاد (ضد)",
    "Antikroppar": "أجسام مضادة",
    "Antioxidant": "مضاد للأكسدة",
    "Antiviralt läkemedel interferon": "دواء مضاد للفيروسات (إنترفيرون)",
    "Anus": "شرج",
    "Aorta": "شريان أورطي (الأبهر)",
    "Aortabågen": "قوس الأبهر",
    "Apoplexi": "سكتة دماغية (نزيف دماغي)",
    "Apotek": "صيدلية",
    "Apparat": "جهاز أو آلة",
    "Appendicit ( Appendix, vermiformis )": "التهاب الزائدة الدودية",
    "Appliceras på huden": "يوضع على الجلد (تطبيق موضعي)",
    "Aptit": "شهية",
    "Araknoidea": "الشبكة العنكبوتية (الغشاء العنكبوتي للدماغ)",
    "Arbets - EKG": "تخطيط القلب بالمجهود (أثناء التمرين)",
    "Arbets - sammandragnings fas - systole": "انقباض القلب (مرحلة الضخ)",
    "Arbetsoförmåga": "عجز عن العمل",
    "Arm artär": "الشريان العضدي",
    "Armbågsbensartär": "الشريان الزندي",
    "Armbågsled": "مفصل الكوع",
    "Armbågsleden": "مفصل المرفق",
    "Armhåla": "إبط",
    "Armhålorna": "الإبطين",
    "Armveck, armvecken": "ثنية الذراع (المرفق من الداخل)",
    "Arteriellt blod": "دم شرياني (مؤكسج)",
    "Arterioler": "شرايين صغيرة (شُرينات)",
    "Arterioskleros": "تصلب الشرايين",
    "Arteriovenös fistel, AV - fistel": "ناسور شرياني وريدي (AV-fistula للغسيل الكلوي)",
    "Artfrämmande": "غريب عن النوع (حيواني)",
    "Arthritis deformans": "التهاب المفاصل المشوه (فصال عظمي)",
    "Artrit": "التهاب المفاصل",
    "Arvsanlag": "صفات وراثية",
    "Arvsmassa a": "جينوم (المادة الوراثية)",
    "Arytmi - oregelbunden hjärtrytm": "عدم انتظام ضربات القلب",
    "Associationscentra": "مراكز الترابط (في الدماغ)",
    "Associationsförmåga": "القدرة على الربط (الذهني)",
    "Astmaanfall": "نوبة ربو",
    "Atlas": "الأطلس (الفقرة العنقية الأولى)",
    "Atopisk allergi": "حساسية تاتبيه (إكزيمائية)",
    "Atrioventrikulärknuten": "العقدة الأذينية البطينية (AV node)",
    "Atrofi": "ضمور",
    "Audiometer": "مقياس السمع",
    "Aura": "نسمة (إنذار قبل النوبة في الصرع أو الشقيقة)",
    "Auskultation": "تسمع (فحص بالسماعة الطبية)",
    "Autoimmunitet": "مناعة ذاتية",
    "Autonoma funktioner": "وظائف لا إرادية",
    "Autonoma ganglier": "عقد عصبية ذاتية",
    "Autonoma nervsystemet": "الجهاز العصبي الذاتي (اللاإرادي)",
    "Avbildas": "يُصور تشخيصياً (بالأشعة)",
    "Avbitningständer": "قواطع (أسنان القضم)",
    "Avdunsta": "يتبخر (تعرق)",
    "Avfallsprodukter": "فضلات (نواتج الأيض)",
    "Avfallsämnen": "مواد نفايات (سموم)",
    "Avflöde": "تصريف (تفق للخارج)",
    "Avföring, feces": "براز",
    "Avföringsprov": "تحليل براز",
    "Avger": "يطلق (غازات أو حرارة)",
    "Avges": "يفرز أو ينبعث",
    "Avgiftningscentral": "مركز علاج الإدمان (التخلص من السموم)",
    "Avgiftningsprogram": "برنامج إزالة السموم",
    "Avgår": "يتفرع (شريان) أو ينفصل",
    "Avgörande roll": "دور حاسم",
    "Avhjälpas": "يُعالج أو يتم إصلاحه",
    "Avkorta": "يقصر (مدة العلاج)",
    "Avlägsnande": "إزالة أو استئصال",
    "Avlägsnas": "يتم إزالته",
    "Avlämnande": "تسليم (الدواء) أو تفريغ (الأكسجين للأنسجة)",
    "Avmagring": "هزال (نحافة شديدة)",
    "Avskiljes - Avskiljning": "يفصل - عزل",
    "Avslappningsträning": "تمارين استرخاء",
    "Avsmalnande": "متضيق (مستدق)",
    "Avspeglar sig": "ينعكس (ألم مرتد)",
    "Avstå": "يمتنع (عن التدخين/الكحول)",
    "Avstötning": "رفض (الجسد للعضو المزروع)",
    "Avstötning av organ": "رفض الأعضاء",
    "Avsöndrar - Avsöndring": "يفرز - إفراز",
    "Avtagande": "متناقص",
    "Avtar": "يخف (الألم)",
    "Axelled": "مفصل الكتف",
    "Axon": "محور عصبي",
    "Axonbunter": "حزم عصبية (محاور)",
    "Axonet": "المحور العصبي",
    "B - hepatit": "التهاب الكبد B",
    "B1 - vitamin": "فيتامين B1 (ثيامين)",
    "B12 - vitamin": "فيتامين B12",
    "Bakre gombågar": "الأقواس الحنكية الخلفية",
    "Bakre hornen": "القرون الخلفية (للنخاع الشوكي)",
    "Bakre ögonkammaren": "الغرفة الخلفية للعين",
    "Bakre övre": "خلفي علوي"
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
