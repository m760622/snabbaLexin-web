/**
 * Add Arabic definitions for MedicinMN terms - Batch 2
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

// Arabic definitions for MedicinMN terms - Batch 2
const arabicDefinitions = {
    "Simulera": "يحاكي (يتظاهر بالمرض)",
    "Självinsikt": "بصيرة ذاتية (وعي بالذات)",
    "Självskada beteende": "سلوك إيذاء الذات",
    "Självskadande beteende": "سلوك إيذاء الذات",
    "Självtillit": "ثقة بالنفس",
    "Skeptiker": "متشكك",
    "Skuldbelägga": "يلقي اللوم",
    "Skuldbeläggande": "إلقاء اللوم",
    "Somatiska komplikationer": "مضاعفات جسدية",
    "Sorg": "حزن",
    "Stimulering": "تحفيز",
    "Studiepbehovroblem": "مشاكل دراسية",
    "Störning": "اضطراب",
    "Suicidriskbedömning": "تقييم خطر الانتحار",
    "Suicidtankar": "أفكار انتحارية",
    "Syndrom": "متلازمة",
    "Sömntabletter": "حبوب منومة",
    "Tankemönster": "أنماط التفكير",
    "Tillfredsställda behov": "احتياجات مشبعة",
    "Trauma": "صدمة",
    "Triggar igång": "يحفز (يشعل)",
    "Tvångsmässigtvivel": "شك قهري",
    "Underjag": "الهو (في التحليل النفسي)",
    "Undvikande beteende": "سلوك اجتنابي",
    "Uppskattad": "مقدَّر",
    "Utfryst": "منبوذ اجتماعياً",
    "Utlösare": "محفز (مثير)",
    "Utåtagerande": "سلوك جامح (تفريغ انفعالي)",
    "Vanföreställningar": "أوهام (ضلالات)",
    "Visceral smärta": "ألم حشوي",
    "Värdelös": "عديم القيمة",
    "Ängslan": "قلق (توجس)",
    "Ätstörningar": "اضطرابات الأكل",
    "Ömt": "مؤلم (عند اللمس)",
    "Överdriva": "يبالغ",
    "Överrepresenterad": "ممثل بشكل مفرط",
    "Allmänläkare": "طبيب عام",
    "Anabola steroider": "ستيرويدات بنائية",
    "Anvisningsläkare": "طبيب موجه",
    "Asystoli, Hjärtstillestånd": "توقف الانقباض (توقف القلب)",
    "Avdelningsläkare": "طبيب القسم",
    "Avslappnings - Vilofas - Diastole": "مرحلة الاسترخاء (الانبساط)",
    "Bisköldkörtlar - Glandulae parathyreoideae": "الغدد جارات الدرقية",
    "Blefarospasm": "تشنج الجفن",
    "blev strålad": "تعرض للإشعاع",
    "bokföringsfirma": "شركة محاسبة",
    "Bypass": "مجازة (قصور/تحويلة)",
    "Calmettevaccinering": "تطعيم الكالميت (ضد السل)",
    "Cancerframkallande": "مسرطن",
    "Candidainfektioner": "عدوى المبيضات (فطريات)",
    "CVK - central venkateter": "قسطرة وريدية مركزية (CVK)",
    "Desinfektion": "تطهير",
    "dietisten": "أخصائي التغذية",
    "dämpar sköldkörtelns hormonproduktion": "يكبح إنتاج هرمونات الغدة الدرقية",
    "Ejektionsfraktion": "الكسر القذفي",
    "ekokardiografin": "تخطيط صدى القلب (إيكو)",
    "Endogena orsaker": "أسباب داخلية المنشأ",
    "Endokardium": "شغاف القلب",
    "farmakologisk": "دوائي (فارماكولوجي)",
    "fleromättade fetter": "دهون متعددة غير مشبعة",
    "Framfall": "هبوط (تدلي)",
    "fått klartecken": "حصل على موافقة طبية (ضوء أخضر)",
    "havandeskapsförgiftning": "تسمم الحمل",
    "Hemofilus influensa": "المستدمية النزلية",
    "Herpes simplex": "هربس بسيط",
    "Hjärtfladder": "رفرفة قلبية",
    "hypertoni": "ارتفاع ضغط الدم",
    "hypokondri": "توهم المرض (وسواس مرضي)",
    "Höghöjdslungödem": "وذمة رئوية بسبب الارتفاعات",
    "högvarv": "أقصى نشاط (دوران عالي)",
    "Invärtesläkare": "طبيب أمراض باطنية",
    "Kolangit - Gallgångsinflammation": "التهاب الأقنية الصفراوية",
    "Kransärtär": "شريان تاجي",
    "Kroniska infektionssjukdomar": "أمراض معدية مزمنة",
    "kroppens värmeproduktion": "إنتاج الجسم للحرارة",
    "Läkarundersökning": "فحص طبي",
    "Maginfluensa": "أنفلونزا المعدة (التهاب معدي معوي)",
    "malignitet": "خباثة (ورم خبيث)",
    "Mjuk schanker": "قرحة لينة (مرض زهري كاذب)",
    "Mjukdelsinfektioner": "التهابات الأنسجة الرخوة",
    "Moderskapsintyg": "شهادة أمومة",
    "Mycoplasma genitalium": "ميكوبلازما تناسلية",
    "Myelinskida": "غمد المايلين",
    "Mödragymnastik": "تمارين الأمومة (للحوامل)",
    "Narkosläkare": "طبيب تخدير",
    "nitroglycerintablett": "قرص نيتروجليسرين",
    "njurartären": "الشريان الكلوي",
    "njurundersökning": "فحص الكلى",
    "okomplicerad hjärtinfarkt": "نوبة قلبية غير معقدة",
    "Otitis media": "التهاب الأذن الوسطى",
    "PCI - Percutaneous Coronary Intervention": "تدخل تاجي عبر الجلد (قسطرة)",
    "Plasma": "بلازما",
    "Polio virus": "فيروس شلل الأطفال",
    "Primär hypertoni": "ارتفاع ضغط الدم الأولي",
    "Primära tumörer": "أورام أولية",
    "Privatpraktiserande läkare": "طبيب ممارس خاص",
    "påverkar ämnesomsättningen": "يؤثر على الأيض",
    "radioaktiva jodtabletter": "أقراص اليود المشع",
    "Radioaktivt jod": "يود مشع",
    "reglerar produktionen": "ينظم الإنتاج"
};

let updatedCount = 0;

dictionaryData.forEach((entry) => {
    const type = (entry[COL_TYPE] || '').trim();
    const word = entry[COL_SWE];
    const currentDef = entry[COL_ARB_DEF] || '';

    // Using mapping to handle duplicates in list
    if (type === 'MedicinMN.' && !currentDef.trim() && arabicDefinitions[word]) {
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
