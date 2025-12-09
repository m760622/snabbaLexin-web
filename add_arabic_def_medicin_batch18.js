/**
 * Add Arabic definitions for Medicin terms - Batch 18
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

// Arabic definitions for Medicin terms - Batch 18
const arabicDefinitions = {
    "Pannloben": "الفص الجبهي",
    "Parkinsons sjukdom": "مرض باركنسون (الشلل الرعاش)",
    "Passiv immunisering": "تمنيع سلبي",
    "Passiv rökning": "تدخين سلبي",
    "Patient - förtroendenämnd": "لجنة ثقة المرضى (للتظلمات)",
    "Patientavgift": "رسوم المريض",
    "Patientjournal": "سجل المريض الطبي",
    "PBU - psykiatrisk barn och ungdomsvård": "الطب النفسي للأطفال والمراهقين (BUP)",
    "Pensla ( liniment på huden )": "يدهن (بفرشاة/مسح سائل)",
    "Peritonealdialys": "غسيل كلى بريتوني",
    "Perkussion": "قرع (فحص بالطرق بالأصابع)",
    "Perniciös anemi": "فقر الدم الخبيث (نقص B12)",
    "Peroralt, genom munnen": "عن طريق الفم",
    "Personlighetsförändring": "تغير الشخصية",
    "Personlighetsstörning": "اضطراب الشخصية",
    "PET": "تصوير مقطعي بالانبعاث البوزيتروني (PET)",
    "Petit mal": "نوبة صرع صغرى (غيبة)",
    "PH - värde": "قيمة الرقم الهيدروجيني (pH)",
    "Pigment": "صبغة (ملونة)",
    "Pigment": "صبغيات (مكرر)",
    "Pipande och väsande andningsljud": "صوت صفير وأزيز تنفسي",
    "Pipig, flämtande andning": "تنفس صادي (صفيري) لاهث",
    "Pirrning": "تنميل (وخز خفيف)",
    "Piskmask": "دودة سوطية",
    "Placering": "تموضع (أو إيداع)",
    "Plattor": "صفائح (أو ألواح للعظام)",
    "Plötslig spädbarnsdöd –SIDS": "متلازمة موت الرضيع المفاجئ (SIDS)",
    "Pneumokocker": "مكورات رئوية",
    "Pneumokockinfektion": "عدوى المكورات الرئوية",
    "Polio": "شلل الأطفال",
    "Pollen": "حبوب اللقاح",
    "Pollen": "لقاح (مكرر)",
    "Positronemission tomografi PET": "تصوير PET",
    "Postoperativt": "ما بعد الجراحة",
    "Preventivmedel": "وسيلة منع حمل",
    "Pricktest": "اختبار وخز الجلد (للحساسية)",
    "Primär infektion, Primärinfektion": "عدوى أولية",
    "Primärurin": "بول أولي (رشاحة كلوية)",
    "Primärvård": "رعاية صحية أولية",
    "Profylaktiskt syfte": "غرض وقائي",
    "Progesteron": "بروجسترون",
    "Prognos": "تكهن (مآل المرض)",
    "Prognoser": "تكهنات",
    "Progressiva glasögon": "نظارات متدرجة (عدسات تقدمية)",
    "Propp": "سدادة (جلطة)",
    "Prostatacancer": "سرطان البروستاتا",
    "Prostataförstoring": "تضخم البروستاتا",
    "Prostatakörteln": "البروستاتا (غدة)",
    "Proteslossning": "تخلخل البدلة (المفصل الصناعي)",
    "Protozoer": "أوالي (بروتوزوا)",
    "Psoriasis": "صدفية",
    "Psykiatrisk rehabilitering": "تأهيل نفسي",
    "Psykisk ( trötthet )": "نفسي (تعب ذهني/نفسي)",
    "Psykiska funktionshinder": "إعاقات نفسية",
    "Psykokirurgi": "جراحة نفسية",
    "Psykosomatiskt symtom": "عَرَض نفسي جسدي",
    "Psykoterapeut": "معالج نفسي",
    "Puder": "بودرة",
    "Pulpan": "لب السن (العصب)",
    "Puls": "نبض",
    "Puls och blodtryck": "نبض وضغط دم",
    "Pulsen": "النبض",
    "Pulver": "مسحوق",
    "Pumpa ut blodet": "يضخ الدم",
    "Pung": "كيس الصفن",
    "Pupill": "حدقة العين (بؤبؤ)",
    "Pälsdjur": "حيوانات ذات فراء",
    "Radioaktiv strålning": "إشعاع نووي (نشاط إشعاعي)",
    "Radiojodbehandling": "علاج باليود المشع",
    "Rasslande ljud": "صوت حشرجة (كركرة)",
    "Reagenssticka": "شريط فحص (مثل فحص البول/السكر)",
    "Recept": "وصفة طبية",
    "Receptfritt läkemedel": "دواء بدون وصفة",
    "Recessiv": "متنحي (صفة وراثية)",
    "Referenspris": "سعر مرجعي",
    "Reflexer": "منعكسات (ردود فعل)",
    "Reglera": "ينظم",
    "Rehabilitering": "إعادة تأهيل",
    "Rektalt, via ändtarmen": "شرجياً",
    "Rektoskopi": "تنظير المستقيم",
    "Reposition": "رد (إعادة العظم/الفتق لمكانه)",
    "Reseförsäkring": "تأمين سفر",
    "Resistensbestämning": "تحديد المقاومة (للمضادات)",
    "Resistenta bakterier": "بكتيريا مقاومة",
    "Resoribletter": "أقراص تحت اللسان",
    "Respirator": "جهاز تنفس اصطناعي",
    "Rethosta": "سعال مهيج (جاف)",
    "Retinopati lins": "اعتلال الشبكية (lins هنا خطأ محتمل في المصدر, Lins=عدسة)",
    "Revben": "ضلع",
    "RhD - faktor": "عامل ريسوس (Rh)",
    "Rikliga": "غزيرة",
    "Rikliga blödningar": "نزيف غزير",
    "Ringmuskler": "عضلات حلقية (مصرات)",
    "Riskgrupp": "مجموعة خطر",
    "Riskgrupper": "مجموعات معرضة للخطر",
    "Rodnande": "متورد (يحمر جلده)",
    "Rosfeber": "حمرة (Erysipelas)",
    "RS - virus": "فيروس RS (المخلوي التنفسي)",
    "Rumpa": "مؤخرة (أرداف)",
    "Rutinprov": "فحص روتيني"
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
