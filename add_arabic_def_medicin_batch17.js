/**
 * Add Arabic definitions for Medicin terms - Batch 17
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

// Arabic definitions for Medicin terms - Batch 17
const arabicDefinitions = {
    "Moderkakan": "المشيمة",
    "Molande smärta": "ألم كليل (خفيف ومستمر)",
    "Monocyterna": "الخلايا الوحيدة (نوع من خلايا الدم البيضاء)",
    "Morbus Crohn": "مرض كرون",
    "Motion": "تمرين (حركة بدنية)",
    "Motorisk nerv": "عصب حركي",
    "Motståndskraft": "مقاومة (مناعة/قوة تحمل)",
    "Multipel skleros": "التصلب المتعدد (اللويحي)",
    "Multipel skleros MS": "التصلب المتعدد (MS)",
    "Musarmbåge": "مرفق الفأرة (إصابة إجهاد متكرر)",
    "Muskelbristning": "تمزق عضلي",
    "Muskelcell": "خلية عضلية",
    "Muskelfiber": "ليف عضلي",
    "Muskelfibrer": "ألياف عضلية",
    "Muskelförtvining, muskelatrofi": "ضمور عضلي",
    "Muskelstelhet": "تصلب العضلات",
    "Muskelvävnad": "نسيج عضلي",
    "Mutationer": "طفرات (جينية)",
    "Mutera": "يتحور (يحدث طفرة)",
    "Mygga": "بعوضة",
    "Mynnar": "يصب (ينفتح في)",
    "Myom, muskelknuta": "ورم ليفي (في الرحم)",
    "Myxödem": "وذمة مخاطية (قصور درقي شديد)",
    "Måttlig": "معتدل",
    "Mättat fett": "دهنك مشبع",
    "Mödrahälsovård": "رعاية صحة الأمومة",
    "Mödravårdscentral": "مركز رعاية الأمومة (MVC)",
    "Mögel": "عفن (فطريات)",
    "Nackloben": "الفص القذالي (مؤخرة الرأس)",
    "Nackstelhet": "تصلب الرقبة",
    "Nagelbädden": "سرير الظفر (ما تحت الظفر)",
    "Naprapat": "معالج يدوي (نابراباث)",
    "Nasalt, genom näsan": "أنفياً (عن طريق الأنف)",
    "Naturläkemedel": "دواء طبيعي (عشبي)",
    "Navelsträngen": "الحبل السري",
    "Nedre extremiteternas muskler": "عضلات الأطراف السفلية",
    "Nedre magmunnen": "فتحة البواب (أسفل المعدة)",
    "Nefropati": "اعتلال كلوي",
    "Nervcell": "خلية عصبية (عصبون)",
    "Nervimpuls": "نبضة عصبية (إشارة)",
    "Nervsystemet": "الجهاز العصبي",
    "Nervvävnad": "نسيج عصبي",
    "Neurologisk funktionsnedsättning": "عجز عصبي (خلل وظيفي)",
    "Neurologisk undersökning": "فحص عصبي",
    "Neuropsykiatrisk störning": "اضطراب عصبي نفسي",
    "Nickelallergi": "حساسية النيكل",
    "Njurarna": "الكليتين",
    "Njurbarken": "قشرة الكلة",
    "Njurbäckenet": "حوض الكلية",
    "Njurkanal, tubuli": "نبيب كلوي (أنبوب)",
    "Njurstensanfall": "نوبة حصى الكلى (مغص كلوي)",
    "Njursvikt": "فشل كلوي",
    "Njurtröskel": "العتبة الكلوية",
    "Normalflora": "نبيت جرثومي طبيعي (فلورا طبيعية)",
    "Nyckelbenet": "عظم الترقوة",
    "Nyföddhetsperioden": "فترة حديثي الولادة",
    "Näring": "تغذية",
    "Näsblödning": "نزيف الأنف (رعاف)",
    "Näsdropp - Näsdroppar": "قطرة أنف",
    "Näshåla": "تجويف الأنف",
    "Nässkiljeväggen, septum nasi": "حاجز الأنف",
    "Nässpray": "بخاخ أنف",
    "Nästäppa": "انسداد الأنف (احتقان)",
    "Näthinneavlossning": "انفصال الشبكية",
    "Objektiva symtom": "أعراض موضوعية (علامات)",
    "Obstetrik, läran om förlossningen": "طب التوليد",
    "Ofrivillig barnlöshet": "عقم (عدم إنجاب لا إرادي)",
    "Oförmåga att känna igen, agnosi": "عمه (فقدان القدرة على التعرف - Agnosia)",
    "Oförmåga att utföra rörelser, apraxi": "تعذر الأداء (Apraxia)",
    "Ojämnhet": "عدم انتظام (خشونة سطح)",
    "Ollon": "حشفة (القضيب)",
    "Olustkänsla": "شعور بالضيق (عدم الارتياح)",
    "Olycksfall": "حادث",
    "Omättade fetter": "دهون غير مشبعة",
    "Omättat och fleromättat fett": "دهون غير مشبعة ومتعددة غير مشبعة",
    "Onormal blödning": "نزيف غير طبيعي",
    "Ont i lederna": "ألم المفاصل",
    "Operativt ingrepp": "تدخل جراحي",
    "Opereras bort": "يُستأصل جراحياً",
    "Orala droppar": "قطرات فموية",
    "Ordglömska, anomi": "نسيان الكلمات (حبسة اسمية)",
    "Oregelbunden livsföring": "نمط حياة غير منتظم",
    "Oregelbunden mens": "حيض غير منتظم",
    "Oregelbundna hjärtslagen": "ضربات قلب غير منتظمة",
    "Organ": "عضو",
    "Orkeslöshet": "خمول (وهن/نقص طاقة)",
    "Orsak": "سبب",
    "Ortopediska skor": "أحذية طبية (لتقويم العظام)",
    "Ortopediska stödförband, ortoser": "أجهزة تقويم العظام (دعامات)",
    "Ortosskena": "جبيرة تقويمية",
    "Oskyddat sex": "جنس غير محمي",
    "Outhärdlig smärta": "ألم لا يطاق",
    "Ovala fönstret": "النافذة البيضوية (في الأذن)",
    "Oxoplasmos": "داء المقوسات (Toxoplasmos - تصحيح الاسم الشائع توكسوبلازما)",
    "Pacemaker": "جهاز تنظيم ضربات القلب",
    "PAD": "تشخيص مرضي (PAD - فحص الأنسجة)",
    "Palpation": "جس (فحص باللمس)",
    "Pandemi": "جائحة",
    "Paniksyndrom": "اضطراب الهلع",
    "Pannbenet": "عظم الجبهة"
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
