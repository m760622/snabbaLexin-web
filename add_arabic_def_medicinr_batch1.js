/**
 * Add Arabic definitions for MedicinR terms - Batch 1
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

// Arabic definitions for MedicinR terms - Batch 1
const arabicDefinitions = {
    "4, 2 - 6 mmol/l": "4، 2 - 6 مليمول/لتر",
    "Acetonlukt ur munnen": "رائحة الأسيتون من الفم",
    "Acetonlukt vid utandning, andningssvårigheter": "رائحة الأسيتون عند الزفير، صعوبات في التنفس",
    "Ackommodation": "تكيّف (العين)",
    "Albumin": "ألبومين (زلال)",
    "Allvarliga manier": "هوس شديد (نوبات هوسية خطيرة)",
    "Alternativmedicin, Fringe medicine, Alternative medicine": "الطب البديل",
    "Aminosyror": "أحماض أمينية",
    "Angina pectoris, Kärlkramp": "الذبحة الصدرية (خناق الصدر)",
    "Angiopati, Blodkärlsförändringar": "اعتلال الأوعية الدموية",
    "Antalet insjuknande": "عدد الإصابات (معدل المراضة)",
    "Aptit förlust, minskad aptit": "فقدان الشهية",
    "Armbågsben, ulna": "الزند (عظم الساعد)",
    "Artificiell insemination": "تلقيح اصطناعي",
    "Artroskop": "منظار المفصل",
    "Artroskopi": "تنظير المفصل",
    "Artärer": "شرايين",
    "Astigmatism": "لابؤرية (انحراف البصر)",
    "Astmamedicinen": "دواء الربو",
    "Asymtomatisk latent infektion": "عدوى كامنة بدون أعراض",
    "Ateroskleros, Åderförkalkning": "تصلب الشرايين",
    "Atopiskt eksem": "إكزيما تأتبية (وراثية)",
    "Att föra in små instrument i leden": "إدخال أدوات صغيرة في المفصل",
    "Att stabilisera knät.": "تثبيت الركبة",
    "Att sy ihop en andra gång": "خياطة مرة ثانية (إعادة الخياطة)",
    "Autoimmun reaktion": "تفاعل مناعي ذاتي",
    "Avhyvling": "كشط (تسوية السطح)",
    "Avlasta knät": "تخفيف الحمل عن الركبة",
    "Avlägsna": "إزالة (استئصال)",
    "Bakre korsband": "الرباط الصليبي الخلفي",
    "Bakteriedödande spritlösning": "محلول كحولي قاتل للبكتيريا",
    "Bakterien ligger vilande": "البكتيريا كامنة (خاملة)",
    "Bakterieodling av kroppsvätskor": "مزرعة بكتيرية لسوائل الجسم",
    "Baljväxter ( tex ärtor, linser, bönor )": "بقوليات (مثل البازلاء، العدس، الفاصولياء)",
    "Barnlöshet - barnlösheten": "عقم - العقم (عدم الإنجاب)",
    "BCG vaccin": "لقاح السل (BCG)",
    "Bedövningen har släppt": "زال مفعول التخدير",
    "Benknaster, krepitation": "فرقعة العظام (خشخشة)",
    "Benröta, Osteomyelit, Osteomyelitis": "التهاب العظم والنقي (تسوس العظام)",
    "Biceps, tvehövdad överarmsmuskel": "العضلة ذات الرأسين (Biceps)",
    "Bildar en ( grop )": "يشكل (حفرة/نقر)",
    "Bildas vätska i såren": "تشكل سوائل في الجروح (نز)",
    "Bilharzia, Snäckfeber, Snigelsjuka, schistosomiasis": "بلهارسيا (داء المنشقات)",
    "Bindvävshinna": "غشاء نسيج ضام",
    "Blir mjuk och glatt": "يصبح ناعماً وأملس",
    "Blir sövd med narkos": "يخدر كلياً (تخدير عام)",
    "Blodfetter, Triglycerider, LDL": "دهون الدم (ثلاثية، كوليسترول ضار)",
    "Blodigt slem": "بلغم مدمى (مخاط به دم)",
    "Blodkärl": "أوعية دموية",
    "Blodkärl i njurens glomeruli": "أوعية دموية في كبيبات الكلى",
    "Blodkärl i ögats näthinna": "أوعية شبكية العين الدموية",
    "Blodsockerfall": "هبوط سكر الدم",
    "Blodutgjutning ( blödning )": "نزيف (انسكاب دموي)",
    "Blygdben, Os pubis": "عظم العانة",
    "Blygdbensfogen, symfysen": "الارتفاق العاني",
    "Borttagna bitarna spolas ut ur leden": "غسل القطع المزالة من المفصل",
    "Breda ryggmuskeln": "العضلة الظهرية العريضة",
    "Broskbitar": "قطع غضروفية",
    "Broskskivor, diskar": "أقراص غضروفية (ديسكات)",
    "Brukande av falsk urkund": "استخدام وثيقة مزورة (مصطلح قانوني طبي)",
    "Bruttonorm": "معيار إجمالي (Bruttonorm)",
    "Bröstbarn": "رضيع (طفل يرضع)",
    "Bröstbenet, sterum": "عظم القص",
    "Bröstkotor, Vertebrae thoracicae": "فقرات صدرية",
    "Bröstkotor 12, Vertebrae thoracicae": "الفقرات الصدرية الاثنا عشر",
    "Bröstmjölk": "حليب الأم",
    "Bukspottkörtel": "البنكرياس",
    "Bulemi": "نهام عصبي (بوليميا)",
    "Bäckenet, femur": "الحوض، الفخذ (ملاحظة: Femur هو الفخذ، Bäcken هو الحوض)",
    "Bär": "توت (فواكه برية)",
    "Bärsele": "حمالة أطفال",
    "Böjarmuskler": "عضلات قابضة (مثنية)",
    "Celiaki ( blodprov för gluten allergi )": "الداء الزلاقي (تحليل حساسية الغلوتين)",
    "CRT - Pacemaker, Biventrikulär pacing": "ناظمة قلبية لإعادة التزامن (CRT)",
    "Darrning": "رجفة (ارتعاش)",
    "Debut": "بداية (ظهور المرض)",
    "Debuterar i tonåren": "يبدأ في سن المراهقة",
    "Deformiteter på tårna ( hudskador, skador små blodkärl )": "تشوهات في أصابع القدم (تقرحات، تلف الأوعية الصغيرة)",
    "Degenerativ": "تنكسي (تدهوري)",
    "Diabeteskoma, Coma diabeticum": "غيبوبة سكري",
    "Diabetessår": "قرحة السكري",
    "Diastolisk hypotoni": "هبوط الضغط الانبساطي",
    "Diastoliskt blodtrycket ( Undertrycket )": "ضغط الدم الانبساطي (الضغط السفلي)",
    "Disk, discus": "قرص (بين الفقرات)",
    "Domningar": "تنميل (خدر)",
    "Droppinfektion": "عدوى بالرذاذ",
    "Duscha med förbandet kvar": "الاستحمام دون إزالة الضماد",
    "Dåliga levern": "الكبد المصاب (السيء)",
    "Dämpar ljud ( ljuddämpare )": "يخفف الصوت (كاتم صوت)",
    "Elefentsjuka, elefantiasis, elephantiasis": "داء الفيل",
    "Elevation. högläge": "رفع (وضعية مرتفعة)",
    "Ellipsoidled": "مفصل بيضوي (لقمي)",
    "EMDR - Desensibilisering": "إزالة التحسس (EMDR - علاج نفسي)",
    "EMDR - Eye Movement Desensitization & Reprocessing": "إزالة التحسس وإعادة المعالجة بحركة العين (EMDR)",
    "Endokrinologen": "أخصائي الغدد الصماء",
    "Endokrinologiska avdelningen": "قسم الغدد الصماء",
    "Energin blir": "تصبح الطاقة",
    "Enkelomättat fett": "دهن أحادي غير مشبع",
    "Epikutantest, Epikutan prov": "اختبار الرقعة الجلدية (للحساسية)",
    "Ett hetsigt humör": "م مزاج حاد (سريع الغضب)"
};

let updatedCount = 0;

dictionaryData.forEach((entry) => {
    const type = (entry[COL_TYPE] || '').trim();
    const word = entry[COL_SWE];
    const currentDef = entry[COL_ARB_DEF] || '';

    // Using mapping to handle duplicates in list
    if (type === 'MedicinR.' && !currentDef.trim() && arabicDefinitions[word]) {
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
