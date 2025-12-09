/**
 * Add Arabic definitions for MedicinMR terms - Batch 1
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

// Arabic definitions for MedicinMR terms - Batch 1
const arabicDefinitions = {
    "Acetylsalicylsyra": "حمض أستيل ساليسيليك (أسبرين)",
    "Akut sjukvård": "رعاية صحية طارئة",
    "Allergen": "مُثير للحساسية (مستأرج)",
    "Allergi": "حساسية",
    "Allergiframkallande": "مسبب للحساسية",
    "Allergiframkallande ämne": "مادة مسببة للحساسية",
    "Allergisk astma": "ربو تحسسي",
    "Allergisk mot.": "لديه حساسيه تجاه", // Period in key
    "Allergisk reaktion": "رد فعل تحسسي",
    "Allergisk snuva": "زكام تحسسي (التهاب الأنف)",
    "Allergiska reaktioner": "تفاعلات تحسسية",
    "Allergiska sjukdomar": "أمراض الحساسية",
    "Allergiska symtom": "أعراض الحساسية",
    "Allergiskt kontakteksem": "إكزيما التماس التحسسية",
    "Allergitecken": "علامات الحساسية",
    "Allergiutredning": "تشخيص الحساسية (تحقيق طبي)",
    "Allt mellan himmel och jord": "كل شيء يخطر بالبال (تعبير مجازي)",
    "Allvarliga frakturer": "كسور خطيرة",
    "Anemi": "فقر دم (أنيميا)",
    "Ange symptomen i en tregradig skala:": "حدد الأعراض على مقياس من ثلاث درجات",
    "Antikropp": "جسم مضاد",
    "Använt glasögon": "استخدم نظارات",
    "Atopisk allergi": "حساسية تأتبية",
    "Atopisk eksem": "إكزيما تأتبية",
    "Att dränera": "للتصريف (بزل)",
    "Att lägga näsan i vädret": "أن يموت (تعبير مجازي: يرفع أنفه للسماء)",
    "Att spionera på oss som flytt": "للتجسس علينا نحن الذين هربنا (سياق سردي)",
    "Av ren självbevarelsedrift.": "بدافع غريزة البقاء البحتة",
    "Avläses resultatet": "تُقرأ النتيجة",
    "Badar i sötvatten": "يستحم في مياه عذبة",
    "Badklåda": "حكة السباحين (بلهارسيا الطيور)",
    "Bagateller": "تفاهات (أمور بسيطة)",
    "Barfota": "حافي القدمين",
    "Barnakuten": "طوارئ الأطفال",
    "Bedövande spruta": "حقنة مخدرة",
    "Bergsbestigningen": "تسلق الجبال",
    "Besvären": "المتاعب (الأعراض المرضية)",
    "Besvärlig": "صعب (مزعج/شاق)",
    "Bilden faller på näthinnan": "تسقط الصورة على الشبكية",
    "Bilder i genomskärning": "صور مقطعية",
    "Bindvävnad": "نسيج ضام",
    "Biståndsprojektet": "مشروع المساعدة (الإنمائية)",
    "Biverkningar": "أعراض جانبية",
    "Blod i urinen": "دم في البول",
    "Bosätta sig där": "يستقر هناك",
    "Botemedel": "علاج (دواء شاف)",
    "Buktar ut": "يبرز للخارج",
    "Böjveckseksem": "إكزيما الثنيات (باطن المرفق/الركبة)",
    "Clarityn": "كلاريتين (دواء حساسية)",
    "Darrar ( skälva, skaka ) av köld, rädsla, ilska": "يرتجف (يرتعد) من البرد، الخوف، الغضب",
    "Det är för tungt.": "إنه ثقيل جداً",
    "Detektivromaner": "روايات بوليسية",
    "Diarré": "إسهال",
    "Domningar": "تنميل",
    "Doser": "جرعات",
    "Du är fullt återställd": "شفيت تماماً",
    "Du är ingen duvunge längre": "لم تعد صغيراً (تعبير: لست فرخ حمام)",
    "Dygn": "يوم وليلة (24 ساعة)",
    "Egyptisk snigelsjuka": "داء البلهارسيا (المنشقات)",
    "Eksem, Eksemen": "إكزيما",
    "Eldsmärke": "وحمة دموية (بقعة نبيذية)",
    "Elefantsjuka": "داء الفيل",
    "Elgitarr": "جيتار كهربائي",
    "Emaljöga": "عين اصطناعية (زجاجية)",
    "Enligt hälso - och sjukvårdslagen": "بموجب قانون الرعاية الصحية",
    "Enligt vårdgarantin": "بموجب ضمان الرعاية (الحد الأقصى للانتظار)",
    "Ett sankt område": "منطقة مستنقعات (موحلة)",
    "Femte sjukan, smittsam hudrodnad": "المرض الخامس (الحمامى العدوائية)",
    "Filariafeber": "حمى الفيلاريا",
    "Filur": "ماكر (شخص خبيث/داهية - عامية)",
    "Flashback": "استرجاع ذكريات (ومضة من الماضي)",
    "Flashbacks ( psykologiskt fenomen av återupplevande )": "ذكريات انفعالية (استعادة تجارب صادمة)",
    "Flodblindhet": "عمى النهر",
    "Fläckar": "بقع",
    "Fotled, vrist, Tarsus": "الكاحل (مفصل القدم)",
    "Framkallats av": "نتج عن (سببه)",
    "Frukt": "فاكهة",
    "Fruktansvärd eksem": "إكزيما فظيعة",
    "Fy fan, vad läbbigt": "يا للقرف، هذا مقزز (تعبير عامي)",
    "Fy sjutton": "يا للهول (تعبير استياء مخفف)",
    "Få ett vredesutbrott": "يصاب نوبة غضب",
    "Fästa tejpremsor": "تثبيت شرائط لاصقة",
    "Fästad": "مثبت (مربوط)",
    "Födelsemärke, Leverfläck": "وحمة، شامة",
    "Födoämnesallergi": "حساسية الطعام",
    "Förfäder": "أسلاف (أجداد)",
    "Förintelse": "إبادة (دمار شامل)",
    "Förlorade ett öga vid ett huliganbråk": "فقد عيناً في شجار غوغائي",
    "Ge effekt": "يعطي مفعولاً",
    "Genomgå": "يخضع لـ (يمر بـ)",
    "Grönsallad": "سلطة خضراء",
    "Gud ske lov": "الحمد لله (الشكر لله)",
    "Gömd i ett buskage": "مختبئ في شجيرات",
    "Gör små sår": "يحدث جروحاً صغيرة",
    "Handled, Radiokarpalled": "معصم (رسغ اليد)",
    "Helt avtrubbade": "متبلد المشاعر تماماً",
    "Helt grumlig": "عكر تماماً",
    "Helt utmattad": "منهك تماماً",
    "Hemangiom, smultronmärke": "ورم وعائي دموي (وحمة فراولة)",
    "Hemsk": "فظيع (مخيف)"
};

let updatedCount = 0;

dictionaryData.forEach((entry) => {
    const type = (entry[COL_TYPE] || '').trim();
    const word = entry[COL_SWE];
    const currentDef = entry[COL_ARB_DEF] || '';

    // Using mapping to handle duplicates in list
    if (type === 'MedicinMR.' && !currentDef.trim() && arabicDefinitions[word]) {
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
