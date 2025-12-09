/**
 * Add Arabic definitions for Medicin terms - Batch 8
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

// Arabic definitions for Medicin terms - Batch 8
const arabicDefinitions = {
    "Exokrina körtlar": "غدد إفرازية خارجية (غير صماء)",
    "Expiration ( inandning )": "زفير *ملاحظة: inandning شهيق، expiration زفير*",
    "Extern otit": "التهاب الأذن الخارجية",
    "Extraslag - Kontraktion": "ضربة قلب إضافية (انقباض مبكر)",
    "Extrauterin graviditet": "حمل خارج الرحم",
    "Extremiteter": "أطراف",
    "Fagocytos": "بلعمة (التهام الخلايا)",
    "Falang": "سُلامية (عظمة الإصبع)",
    "Falsk krupp": "الخانوق الكاذب (التهاب الحنجرة)",
    "Falska kindtänder": "ضواحك (أسنان طاحنة صغيرة)",
    "Fantomsmärta": "ألم وهمي (في طرف مبتور)",
    "Farmakologi": "علم الأدوية",
    "Farmakon": "دواء (مادة دوائية)",
    "Faryngit": "التهاب البلعوم",
    "FASS": "FASS (المرجع الدوائي السويدي)",
    "Fastna": "يعلق (ينحشر)",
    "Fastställa diagnos": "يحدد التشخيص (يشخص)",
    "Fastvuxen": "ملتصق (ملتحم)",
    "Fauna": "حيوانات (لمنطقة معينة)",
    "Feberanfall": "نوبة حمى",
    "Feberfrossa": "رعشة الحمى (قشعريرة)",
    "Femoralbråck": "فتق فخذي",
    "Femte sjukan": "المرض الخامس (عدوى فيروسية)",
    "Fertil ålder": "سن الخصوبة",
    "Fertila perioden": "فترة الخصوبة",
    "Fettceller": "خلايا دهنية",
    "Fetter": "دهون",
    "Fetthaltig": "دهني",
    "Fettkapsel - Fettkapseln": "محفظة دهنية",
    "Fettknöl": "كتلة دهنية (ورم شحمي)",
    "Fettkropp": "جسم دهني",
    "Fettliknande": "شبيبة بالدهن",
    "Fettsyra": "حمض دهني",
    "Fettsyror": "أحماض دهنية",
    "Fettväv": "نسيج دهني",
    "Fibrer": "ألياف",
    "Fibrinogen": "فيبرينوجين (بروتين التخثر)",
    "Fickbildningen": "تشكل الجيوب",
    "Fickklaffar": "صمامات جيبية (نصف قمرية)",
    "Filtration": "ترشيح",
    "Filtrationsförmåga": "قدرة الترشيح",
    "Fimosis": "الشبم (تضيق القلفة)",
    "Finfördela": "يفتت (يجزئ بدقة)",
    "Fingerblomma": "بصمة الإصبع (أطراف الأصابع)",
    "Fingrar": "أصابع اليد",
    "Finnar": "حب الشباب (بثور)",
    "Fixation": "تثبيت (نفسي أو جراحي)",
    "Fjädrande": "مرن (نابض)",
    "Fjälla": "يتقشر (الجلد)",
    "Fjällande - Fjällning": "متقشر - تقشر",
    "Fjällande hudutslag": "طفح جلدي متقشر",
    "Fjällning": "تقشر الجلد",
    "Fjärde ventrikeln": "البطين الرابع (في الدماغ)",
    "Fjärrseende": "بعد النظر",
    "Flagellater, trichomonas vaginalis": "سوطيات (تريكوموناس مهبلية)",
    "Flagnar": "يتقشر (عن الجلد المحروق مثلاً)",
    "Flercelliga organismer": "كائنات متعددة الخلايا",
    "Fleromättat fett": "دهن متعدد غير مشبع",
    "Flimmerhår": "أهداب (شعيرات مبطنة)",
    "Flimmerhår ( Cilier )": "أهداب",
    "Flora": "نبيت (بكتيريا طبيعية)",
    "Flugor": "ذباب",
    "Flytande läkemedel": "دواء سائل",
    "Flytande vävnad": "نسيج سائل (كالدم)",
    "Flytande vävnader": "أنسجة سائلة",
    "Flyter": "يسيل (أو يطفو)",
    "Flytningar": "إفرازات مهبلية",
    "Fläckvis": "على شكل بقع (متقطع)",
    "Flödeshinder, obstruktion": "انسداد التدفق",
    "Fnasig": "خشن (متشقق وجاف)",
    "Fnasig hud": "جلد خشن ومتقشر",
    "Fogar": "مفاصل (وصلات عظمية)",
    "Fogar": "فواصل (مكرر)",
    "Foglossning": "ارتخاء الحوض (أثناء الحمل)",
    "Folkhälsa": "الصحة العامة",
    "Folkhälsoproblem": "مشكلة صحة عامة",
    "Folktandvård": "خدمة طب الأسنان العامة",
    "Follikelstimulerande hormon, FSH": "الهرمون المنشط للحويصلة (FSH)",
    "Folliklar": "جريبات (بصيلات)",
    "Forcerad utandningsvolym, FEV": "حجم الزفير القسري (FEV)",
    "Fordra": "يتطلب (يستلزم)",
    "Formad bindväv": "نسيج ضام مُشكَّل",
    "Formförändringar": "تغيرات شكلية (تشوهات)",
    "Forslas": "يُنقل",
    "Fortleda impulser": "ينقل إشارات (عصبية)",
    "Fortleder": "ينقل (يوصل)",
    "Fortlever": "يبقى حياً (يستمر)",
    "Fortlöper": "يستمر (يسري)",
    "Fortplantar sig": "يتكاثر",
    "Fortplantning": "تكاثر",
    "Fortplantningen": "التكاثر",
    "Fortplantningsapparat": "الجهاز التناسلي",
    "Fortplantningsförmåga": "القدرة التناسلية (الخصوبة)",
    "Fortskridande": "مترقٍ (مرض متفاقم Progredierande)",
    "Fosfat": "فوسفات",
    "Fosfor": "فوسفور",
    "Foster": "جنين (Fetus - بعد الأسبوع 8)",
    "Foster": "جنين (مكرر)",
    "Fosterblodet": "دم الجنين",
    "Fosterdiagnostik": "تشخيص ما قبل الولادة (فحص الجنين)"
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
