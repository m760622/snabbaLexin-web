/**
 * Add Arabic definitions for Medicin terms - Batch 21
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

// Arabic definitions for Medicin terms - Batch 21
const arabicDefinitions = {
    "Synfältsbortfall": "فقدان المجال البصري (عمى جزئي)",
    "Synnedsättning": "ضعف البصر",
    "Syntetisk": "اصطناعي (تركيبي)",
    "Syra - basbalansen": "التوازن الحمضي القاعدي",
    "Syraneutraliserande läkemedel": "مضادات الحموضة",
    "Syresatt blod": "دم مؤكسج (مشبع بالأكسجين)",
    "Syresättning": "أكسجة (إشباع بالأكسجين)",
    "Syretillförsel": "إمداد بالأكسجين",
    "Syreupptagningsförmåga": "قدرة استيعاب الأكسجين",
    "Systole": "انقباض القلب (Systole)",
    "Systoliska blodtrycket": "ضغط الدم الانقباضي",
    "Sårinfektion": "عدوى الجرح",
    "Såromläggning": "تغيير ضماد الجرح",
    "Sårskorpor": "قشور الجروح (جلطات جافة)",
    "Sädescell": "حيوان منوي",
    "Sädescellerna, spermier": "الحيوانات المنوية",
    "Sädesledaren": "الأسهر (القناة الناقلة للمني)",
    "Sädesuttömning": "قذف (المني)",
    "Sängläge": "راحة في السرير (رقود)",
    "Sänkt medvetandegrad": "انخفاض مستوى الوعي",
    "Särskilda boendeformer": "مساكن خاصة (ذوي احتياجات/مسنين)",
    "Särskilt tandvårdsstöd ( STB )": "دعم خاص لطب الأسنان (STB)",
    "Särskilt uppdrag": "مهمة خاصة (تكليف)",
    "Sätesbjudning": "ولادة مقعدية",
    "Sätesmuskeln": "عضلة الأرداف (الألويّة)",
    "Sömnapné": "انقطاع النفس النومي",
    "Talg och svettkörtlar": "غدد دهنية وعرقية",
    "Tandhygienist": "أخصائي صحة أسنان",
    "Tandköttet": "اللتة",
    "Tandmogenhetsbedömning": "تقدير نضج الأسنان (العمر السني)",
    "Tandröta": "تسوس الأسنان",
    "Tandvårdsbidrag": "إعانة طب الأسنان",
    "Tappa bort vätskan, laparocentes": "بزل البطن (سحب السوائل)",
    "Tappar andan": "ينقطع نفسه (يختنق)",
    "Tarmar - Tarmarna": "أمعاء",
    "Tarmludd, villi": "زغابات معوية",
    "Tarmslemhinnan": "بطانة الأمعاء",
    "Tarmvred, ileus": "لتواء الأمعاء (انسداد)",
    "Tarmvred, ileus": "انسداد معوي (مكرر)",
    "Teckna avtal": "يبرم اتفاقية",
    "Testikel, testis": "خصية",
    "Testiklar": "خصيتين",
    "Testosteron": "تستوستيرون",
    "Tillbakabildas": "يضمر (يتراجع نموه)",
    "Tillsynsmyndighet": "سلطة رقابية",
    "Tilltagande smärta": "ألم متزايد",
    "Tillväxt": "نمو",
    "Tillväxthormoner": "هرمونات النمو",
    "Tinningsloben": "الفص الصدغي",
    "Tinnitus": "طنين الأذن",
    "Titthålskirurgi": "جراحة المنظار (ثقب المفتاح)",
    "Titthålsundersökning, artroskopi": "تنظير المفصل",
    "Tjocktarmen, colon": "القولون (الأمعاء الغليظة)",
    "Tjocktarmscancer": "سرطان القولون",
    "Tolvfingertarmen": "الاثنا عشر",
    "Torakoskopi": "تنظير الصدر",
    "Torkat in": "جف (تيبس)",
    "Torrhosta": "سعال جاف",
    "Transkutan elektrisk nervstimulering TENS": "تحفيز العصب الكهربائي عبر الجلد (TENS)",
    "Transplantation": "زراعة أعضاء",
    "Traumatiska skador": "إصابات رضحية (صدمات)",
    "Tremor": "رعاش",
    "Tremånaders kolik": "مغص الرضع (ثلاثة أشهر)",
    "Trycksår": "قرحة الفراش (قرحة الضغط)",
    "Tränga in": "يخترق (ينفذ)",
    "Tränga ut": "يزيح (يطرد)",
    "Tränger ut": "يبرز (يخرج)",
    "Trängningsinkontinens": "سلس إلحاحي (تبول لا إرادي مع رغبة ملحة)",
    "Tuggtablett": "قرص للمضغ",
    "Tummen": "الإبهام",
    "Tungan": "اللسان",
    "Tunntarmen, ileum": "الأمعاء الدقيقة",
    "Tvångssyndrom": "الوسواس القهري (OCD)",
    "Tvärfraktur": "كسر مستعرض",
    "Tvärstrimmig": "مخطط (عضلات)",
    "Tyngdkänsla": "شعور بالثقل",
    "Typ - diabetes": "السكري من النوع (1 أو 2)",
    "Täta trängningar": "رغبة متكررة (للتبول)",
    "Täta urinträngningar": "إلحاح بولي متكرر",
    "Tömningsbehovet": "حاجة للإفراغ (التبول/التبرز)",
    "Ulcerös kolit": "التهاب القولون التقرحي",
    "Ultraljud": "موجات فوق صوتية (ألتراساوند)",
    "Ultraljudsundersökning": "فحص بالموجات فوق الصوتية",
    "Ultraviolett strålning": "أشعة فوق بنفسجية",
    "Umami": "أومامي (الطعم الخامس)",
    "Underhud": "تحت الجلد (النسيج تحت الجلدي)",
    "Underhudsfettet": "الدهون تحت الجلد",
    "Underkäken": "الفك السفلي",
    "Undernäring": "سوء تغذية",
    "Ungdomsmottagning": "عيادة الشباب",
    "Ungdomsmottagning": "عيادة الشباب (مكرر)",
    "UppflödesmätningPEF": "قياس تدفق الزفير (PEF)",
    "Uppkördhet": "انتفاخ (تخمة)",
    "Uppkördhet": "انتفاخ البطن (مكرر)",
    "Upprätthålla balansen": "يحافظ على التوازن",
    "Upprätthålla kroppens balans": "الحفاظ على توازن الجسم",
    "Urin": "بول",
    "Urinblåsa": "مثانة",
    "Urinblåsan": "المثانة",
    "Urindrivande läkemedel, diuretika": "مدرات البول"
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
