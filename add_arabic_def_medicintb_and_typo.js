/**
 * Add Arabic definitions for MedicinTB and MedicinR (Typo) terms - Catch-all Batch
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

// Arabic definitions
const arabicDefinitions = {
    // MedicinTB
    "Abort": "إجهاض",
    "Abstinenssymtom": "أعراض الانسحاب",
    "Affektiva störningar": "اضطرابات عاطفية (وجدانية)",
    "Akutsjukvård": "رعاية طبية طارئة",
    "Allergi": "حساسية",
    "Alzheimers sjukdom": "مرض الزهايمر",
    "Andfåddhet": "ضيق التنفس (لهث)",
    "Autism": "توحد",
    "Avvikande ( olika, skiljaktig, atypisk, särskild, abnorm, bisarr )": "شاذ (غير طبيعي/منحرف)",
    "Bearbeta": "يعالج (نفسياً/ذهنياً)",
    "Behandlingsmetod": "طريقة العلاج",
    "Behandlingsplan": "خطة العلاج",
    "Behandlingsteam": "فريق العلاج",
    "Benbrott": "كسر العظم",
    "Bihåleinflammation, sinuit": "التهاب الجيوب الأنفية",
    "Bipolär sjukdom": "مرض ثنائي القطب",
    "Blodförgiftning": "تسمم الدم",
    "Blodförsörjning": "تروية دموية",
    "Blodgivare": "متبرع بالدم",
    "Blodpropp - tromb": "جلطة دموية",
    "Blodundersökning": "فحص دم",
    "Bukspottkörtel, pankreas": "بنكرياس",
    "Bygga upp": "يبني (يقوي الجسم)",
    "Cancersvulst": "ورم سرطاني",
    "Cellförändringar i livmoderhalsen": "تغيرات خلوية في عنق الرحم",
    "Cellprov": "مسحة عنق الرحم (فحص خلوي)",
    "Delegering": "تفويض",
    "Desensibilisering": "علاج إزالة التحسس",
    "Febernedsättande": "خافض للحرارة",
    "Fraktur": "كسر",
    "Funktionsnedsättning": "إعاقة (قصور وظيفي)",
    "Företagsläkare": "طبيب الشركة",
    "Förlamning": "شلل",
    "Förmak - Atrium": "أذين (القلب)",
    "Förmaksflimmer": "رجفان أذيني",
    "Förstoppning, opstipation": "إمساك",
    "Gallsten": "حصى المرارة",
    "Glömska": "نسيان",
    "Grå starr, katarakt": "مياه بيضاء (ساد)",
    "Halsbränna": "حرقة الفؤاد (حرقة المعدة)",
    "Halsmandlar, tonsillerna": "اللوزتان",
    "Hjärnblödning": "نزيف دماغي",
    "Hjärtförstoring": "تضخم القلب",
    "Hjärtinfarkt, Infarctus myocardi": "نوبة قلبية (احتشاء عضلة القلب)",
    "Höftled": "مفصل الورك",
    "Inspektion": "معاينة (فحص بصري)",
    "Insulinspruta": "حقنة أنسولين",
    "Kranskärl": "أوعية تاجية",
    "Kronisk infektion": "عدوى مزمنة",
    "Kronisk sjukdom": "مرض مزمن",
    "Kroppsskada": "إصابة جسدية",
    "Levra sig": "يتخثر (يتجلط)",
    "Libido": "رغبة جنسية (ليبيدو)",
    "Livshotande tillstånd": "حالة مهددة للحياة",
    "Luftrör, bronker": "قصبات هوائية",
    "Luftrörskatarr": "التهاب القصبات (نزلة شعبية)",
    "Luftrörsvidgande läkemedel": "دواء موسع للشعب الهوائية",
    "Lårbenshals, collum femoris": "عنق عظم الفخذ",
    "Läkarrond": "جولة الأطباء (مرور)",
    "Ländkota": "فقرة قطنية",
    "Migrän": "شقيقة (صداع نصفي)",
    "Myrkrypningar": "تنميل (إحساس دبيب النمل)",
    "Mäta barnets viktutveckling": "قياس نمو وزن الطفل",
    "Nedsatt hörsel": "ضعف السمع",
    "Njursten": "حصى الكلى",
    "Nysning": "عطس",
    "Omläggning av sår": "تضميد الجرح",
    "Ordination": "وصفة طبية (أمر علاجي)",
    "Personlig assistent": "مساعد شخصي",
    "Sendrag": "تشنج عضلي (شد عضلي)",
    "Stolpiller": "تحميلة (لبوس)",
    "Strålbehandling": "علاج إشعاعي",
    "Åderförkalkning, ateroskleros": "تصلب الشرايين",
    "Åldersbedömning": "تقدير العمر",
    "Leda till blindhet": "يؤدي إلى العمى",
    "Lindra smärta": "يخفف الألم",
    "Lönespecifikation": "كشف الراتب",
    "Behandla med dropp": "يعالج بالمحاليل الوريدية (المغذيات)",
    "Behöver hjälp i sin vardag": "يحتاج مساعدة في حياته اليومية",
    "Beror på": "يعتمد على (سببه)",
    "Dödförklarad": "مُعلن الوفاة",
    "Fläckvis håravfall": "تساقط شعر بقعي (ثعلبة)",
    "Förföljelse på grund av sexuell läggning": "اضطهاد بسبب الميول الجنسية",
    "Förskriva läkemedel": "يصف دواء",
    "Hantera stress": "التعامل مع التوتر",
    "Hjärtoperation": "عملية قلب",
    "Identifierar patienter": "يحدد هوية المرضى",
    "Järnbristanemi": "فقر دم بعوز الحديد",
    "Korsband sligament": "رباط صليبي",
    "Magsjuka": "التهاب معوي (نزل معوية)",
    "Matspjälkning": "هضم",
    "Ställa diagnos": "يشخص",
    "Sutur": "خياطة (قطبة)",
    "Utebliven menstruation": "انقطاع الطمث (تأخر الدورة)",
    "Vätskeförlust": "فقدان السوائل",

    // MedicinR (Typo)
    "Diuretika, Tiazide, ett urindrivande läkemedel": "مدرات البول، ثيازانيت، دواء مدر للبول",
    "ålderskrämpor": "أمراض الشيخوخة (متاعب كبر السن)"
};

let updatedCount = 0;

dictionaryData.forEach((entry) => {
    const type = (entry[COL_TYPE] || '').trim();
    const word = entry[COL_SWE];
    const currentDef = entry[COL_ARB_DEF] || '';

    // Check MedicinTB or MedicinR
    if ((type === 'MedicinTB.' || type === 'MedicinR') && !currentDef.trim() && arabicDefinitions[word]) {
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
