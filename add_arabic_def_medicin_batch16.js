/**
 * Add Arabic definitions for Medicin terms - Batch 16
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

// Arabic definitions for Medicin terms - Batch 16
const arabicDefinitions = {
    "Lilla kretsloppet": "الدورة الدموية الصغرى",
    "Lillhjärnan": "المخيخ",
    "Lindrande vård, palliativ vård": "رعاية تلطيفية (تخفيفية)",
    "Lingvist": "لغوي (أخصائي لغويات)",
    "Litotripsi": "تفتيت الحصى",
    "Livmodercancer": "سرطان الرحم",
    "Livmoderhals": "عنق الرحم",
    "Livmoderhalscancer": "سرطان عنق الرحم",
    "Livmoderslemhinnan": "بطانة الرحم",
    "Livmodertappen": "عنق الرحم (الجزء الظاهر)",
    "Livsstilsförändring ar": "تغييرات نمط الحياة",
    "Ljudvågor": "موجات صوتية",
    "Ljumsken": "الإربية (مغبن)",
    "Ljusbehandling": "علاج ضوئي",
    "Ljusbehandlingen": "العلاج الضوئي",
    "Lobektomi": "استئصال فص (رئوي)",
    "Logopedi = talvård": "علاج النطق (تخاطب)",
    "Loppor": "براغيث",
    "Lossna spontant": "ينفصل تلقائياً",
    "LSS": "قانون الدعم والخدمة (لذوي الاحتياجات الخاصة)",
    "Luftburen smitta": "عدوى تنتقل عبر الهواء",
    "Lufthunger": "جوع هوائي (ضيق نفس شديد)",
    "Luftrörsinfektion": "تهاب القصبات (عدوى تنفسية)",
    "Luftstrupe, trachea": "القصبة الهوائية",
    "Luftvägsinfektion sid": "عدوى الجهاز التنفسي",
    "Luktsinnet": "حاسة الشم",
    "Lumbalpunktion, LP": "بزل قطني (سحب سائل النخاع)",
    "Lunga": "رئة",
    "Lungartärerna": "الشرايين الرئوية",
    "Lungblåsa, alveol": "حيصلة هوائية (سنخ رئوي)",
    "Lungcancer": "سرطان الرئة",
    "Lungdäck, pleura": "غشاء الجنب (بلورا)",
    "Lungemboli": "جلطة رئوية (انسداد رئوي)",
    "Lungsjukdom": "مرض رئوي",
    "Lungödem": "وذمة رئوية (تجمع سوائل)",
    "Luteiniseringshormon, LH": "الهرمون اللوتيني (LH)",
    "Lymfkärlssystemet": "الجهاز اللمفاوي",
    "Lymfkörtlar": "عقد لمفاوية",
    "Lymfödem": "وذمة لمفاوية",
    "Långsynthet, översynthet": "طول النظر",
    "Lårbenet": "عظم الفخذ",
    "Läckage": "تسرب",
    "Läderhuden": "الأدمة (طبقة الجلد المتوسطة)",
    "Läkarordination": "وصفة طبية (أمر طبي)",
    "Läkemedel": "دواء",
    "Läkemedelsallergier": "حساسية دوائية",
    "Läkemedelsbehandlingen": "العلاج الدوائي",
    "Läkemedelsdosering": "جرعة الدواء",
    "Läkemedelsförsäkringen": "تأمين الأدوية",
    "Läkemedelsförteckningen": "قائمة الأدوية",
    "Läkemedelsverket": "مصلحة الأدوية",
    "Läker": "يشفي (يلتئم)",
    "Ländkotor": "فقرات قطنية",
    "Längdtillväxt": "نمو طولي",
    "Löss": "قمل",
    "Lövträd": "أشجار نفضية (مسببة للحساسية)",
    "Mag - tarmkanalen": "القناة الهضمية",
    "Magkatarr": "التهاب المعدة",
    "Magnetisk resonanstomografi": "تصوير بالرنين المغناطيسي",
    "Magnetkameraundersökning": "فحص الرنين المغناطيسي",
    "Magnetresonanstomografi MRT": "تصوير بالرنين المغناطيسي (MRI)",
    "Magsårsbakterien, Helicobacter pylori": "جرثومة المعدة",
    "Magsäcken, ventrikeln": "المعدة",
    "Makroparasiter": "طفيليات كبيرة (بالعين المجردة)",
    "Malaria": "ملاريا",
    "Mammografi": "تصوير الثدي (ماموجرام)",
    "Mammografiundersökning": "فحص الثدي بالأشعة",
    "Manliga könshormonet, testosteron": "هرمون الذكورة (تستوستيرون)",
    "Maskformigt bihang, appendix": "الزائدة الدودية",
    "Mastcellerna": "الخلايا البدينة",
    "Matspjälkningen": "هضم الطعام",
    "Matstrupen, espophagus": "المريء",
    "Medfödd missbildning": "تشوه خلقي",
    "Medicinsk åldersbedömning": "تقدير العمر الطبي",
    "Medicinska sjukvårdssymboler": "رموز الرعاية الطبية",
    "Medvetande": "وعي",
    "Medvetandegrad": "درجة الوعي",
    "Melanin": "ميلانين (صبغة الجلد)",
    "Mellanblödning": "نزيف بين الدورات",
    "Mellanfoten": "مشط القدم",
    "Mellanhanden": "مشط اليد",
    "Mellankotskivor, diskar": "أقراص بين فقرية (ديسكات)",
    "Mellanörat": "الأذن الوسطى",
    "Menstruationscykel": "دورة شهرية",
    "Menstruationsrubbningar": "اضطرابات حيضية",
    "Metabolism": "استقلاب (أيض)",
    "Metallsmak i munnen": "طعم معدني بالفم",
    "Mikroorganismer": "كائنات دقيقة",
    "Miljö och hälsoskyddsnämnden": "لجنة البيئة والصحة",
    "Mineraler": "معادن",
    "Minskad fertilitet": "خصوبة منخفضة",
    "Minutvolymen": "حجم الدم في الدقيقة (نتاج القلب)",
    "Missfärgad upphostning": "بلغم متغير اللون",
    "Mittstråleprov": "عينة بول من وسط التبول",
    "Mjuka hinnan": "الأم الحنون (غشاء الدماغ الرقيق)",
    "Mjäll ( eksem )": "قشرة الرأس",
    "Mjälten": "الطحال",
    "Mjälten, lien": "الطحال",
    "Mjölksyra": "حمض اللاكتيك (لبنيك)",
    "Mjölktänderna": "الأسنان اللبنية"
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
