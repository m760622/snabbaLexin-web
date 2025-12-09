/**
 * Add Arabic definitions for MedicinMN terms - Batch 1
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

// Arabic definitions for MedicinMN terms - Batch 1
const arabicDefinitions = {
    "Fotvårdsklinik": "عيادة العناية بالقدم",
    "Lägga sig i": "يتدخل في",
    "Camorra": "كامورا (منظمة إجرامية)",
    "Undersökningsrummet": "غرفة الفحص", // Duplicate from previous batch? Check list. It was number 5 in find list. Ok.
    "Undersköterska": "مساعد ممرض",
    "Allodyni": "ألم خيفي (فرط تحسس للمس الغي مؤلم)",
    "Amputationer": "عمليات بتر",
    "Anterograd minnesförlust": "فقدان الذاكرة التقدمي (للأحداث الجديدة)",
    "Apatiska": "خاملون (غير مبالين)",
    "Arbetsförmåga": "القدرة على العمل",
    "Atypiska symptom": "أعراض غير نمطية",
    "Avdomning": "خدر (تنميل)",
    "Avtrubbning": "تبلد الحس",
    "Bearbetningsfasen": "مرحلة المعالجة النفسية",
    "Behandlingsförlamad": "عاجز علاجياً (لا يستجيب للعلاج)",
    "Beteende symptom": "أعراض سلوكية",
    "Biomedicinsk definition": "تعريف طبي حيوي",
    "Bipolär störning": "اضطراب ثنائي القطب",
    "BMI, Body Mass Index": "مؤشر كتلة الجسم (BMI)",
    "Borderline Personlighetsstörning": "اضطراب الشخصية الحدية",
    "Bultande": "خافق (نابض - للألم)",
    "Delaktighet": "مشاركة",
    "Drömmer i vaket tillstånd": "يحلم وهو مستيقظ (أحلام اليقظة)",
    "Drömtillstånd": "حالة الحلم",
    "Dysfunktionella": "مختل وظيفياً",
    "Dysmnesi": "خلل الذاكرة",
    "Dystymi": "عسر المزاج (اكتئاب مزمن خفيف)",
    "Dåliga effekter": "آثار سيئة",
    "Ekonomisk stress": "ضغط مادي (اقتصادي)",
    "Emotionella faktorer": "عوامل عاطفية",
    "Fixering": "تثبيت (أو هوس)",
    "Fjärrminne": "ذاكرة بعيدة المدى",
    "Fobisk Personlighetsstörning": "اضطراب الشخصية الاجتنابي (الرهابي)",
    "Försvarsmekanism": "آلية دفاع",
    "Förväntad kroppsvikt": "وزن الجسم المتوقع",
    "GAD - generaliserat ångestsyndrom": "اضطراب القلق العام (GAD)",
    "GAF- skalan, global funktionsskala": "مقياس التقييم العالمي للأداء (GAF)",
    "Goda förutsättningar": "ظروف مواتية (شروط جيدة)",
    "Handlingskraft": "قوة الفعل (المبادرة)",
    "Hetsätande": "نهم الطعام (الأكل بشراهة)",
    "Hyperalgesi": "فرط التألم",
    "Hysteriker": "شخص هستيري",
    "Håll i": "أمسك بـ (واظب)",
    "Håll om": "عانق",
    "Håll tyst": "اصمت",
    "Håll ut": "ثابر (تحمل)",
    "Idiopatisk smärta": "ألم مجهول السبب",
    "Inlärningspsykologiska teorier": "نظريات علم النفس التعلمي",
    "Innovativ": "مبتكر",
    "Insomningstabletter": "حبوب منومة",
    "Isolering": "عزلة",
    "KBT - kognitiv beteende terapi": "العلاج السلوكي المعرفي (KBT)",
    "Kiropraktor": "معالج يدوي (كايرو براكتيك)",
    "Kognitiva störningar": "اضطرابات معرفية (إدراكية)",
    "Komplicerade Frakturer": "كسور مضاعفة",
    "Konstaterade": "لاحظ (أثبت)",
    "Kontroversiell": "مثير للجدل",
    "Kreativa": "مبدع",
    "Kroppsuppfattning": "صورة الجسد",
    "Kutym": "عرف (عادة)",
    "Likgiltiga": "غير مبالين",
    "Livlina": "طوق نجاة",
    "Livsgnistan": "شعلة الحياة (الرغبة في العيش)",
    "Låtsasvärld": "عالم وهمي",
    "Malign smärta": "ألم خبيث (مستعصٍ)",
    "Manipulativa": "متلاعب",
    "Maniska period": "فترة هوس",
    "Manodepressiv": "هوسي اكتئابي (ثنائي القطب)",
    "Misstolkar": "يسيء التفسير",
    "Mobbad": "متعرض للتنمر",
    "Naturliga reaktioner": "ردود فعل طبيعية",
    "Neurogen smärta": "ألم عصبي المنشأ",
    "Nociceptiv": "مستقبل للألم (ألم ناتج عن أذية نسيجية)",
    "Närminne": "ذاكرة قريبة المدى",
    "OCD - Obsessive-Compulsive Disorder / Tvångssyndrom": "الوسواس القهري (OCD)",
    "Ortorexi": "هوس الأكل الصحي (أرثوريكسيا)",
    "Paranoid Personlighetsstörning": "اضطراب الشخصية البارانويدي (الارتيابي)",
    "Passivitet": "سلبية",
    "Pedantisk": "مدقق (متحذلق)",
    "Penetrera": "يخترق",
    "Petrifiera nervceller": "تحجر الخلايا العصبية",
    "PGK - pip och gnäll kärring": "كثيرة الشكوى والتذمر (مصطلح عامي)",
    "Placeboeffekten": "تأثير الدواء الوهمي (بلاسيبو)",
    "Potentiella": "محتملة",
    "Praktiska göromål": "مهام عملية",
    "Projiceras": "يُسقط (نفسياً)",
    "Protester": "احتجاجات",
    "Psykodynamiska perspektivet": "المنظور الديناميكي النفسي",
    "Psykosociala situationer": "مواقف نفسية اجتماعية",
    "Psykosomatisk": "نفسي جسدي (سيكوسوماتي)",
    "Påtaglig": "واضح (ملموس)",
    "Rationella": "عقلاني",
    "Referens smärta": "ألم رجيع (منقول)",
    "Resonemang": "استدلال (منطق)",
    "Retrograd minnesförlust": "فقدان الذاكرة الرجعي (للماضي)",
    "Riskfaktorer": "عوامل الخطر",
    "Rättspsyk": "الطب النفسي الجنائي (الشرعي)",
    "Schixotyp Personlighetsstörning": "اضطراب الشخصية الفصامي النوع",
    "Schizofreni - personlighetsklyvning": "الفصام (انفصام الشخصية)",
    "Segregation": "فصل (عزل)",
    "Signal substans": "ناقل عصبي (مادة إشارية)"
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
