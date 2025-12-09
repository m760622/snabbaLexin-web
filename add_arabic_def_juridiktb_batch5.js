/**
 * Add Arabic definitions for JuridikTB terms - Batch 5
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

// Arabic definitions for JuridikTB terms - Batch 5
const arabicDefinitions = {
    "Hemmavarande barn": "أطفال مقيمون في المنزل",
    "Hemutredning": "تحقيق منزلي (زيارة تقييم)",
    "Hemvist": "موطن (محل الإقامة المعتاد)",
    "Hets mot folkgrupp": "التحريض ضد جماعة عرقية (خطاب الكراهية)",
    "Hittegods": "لقطة (مفقودات تم العثور عليها)",
    "Husrannsakan": "تفتيش المنزل",
    "Huvudförhandling": "جلسة المحاكمة الرئيسية",
    "Huvudkäromål": "دعوى أصلية (الطلب الرئيسي)",
    "Huvudman": "موكل (أو العميل لدى المحامي)",
    "Hyresrätt": "حق الإيجار (شقة إيجار)",
    "Häkta": "يحبس احتياطياً",
    "Häktad": "محبوس احتياطياً",
    "Häktning": "حبس احتياطي (على ذمة التحقيق)",
    "Häktningsbeslut": "قرار الحبس الاحتياطي",
    "Häktningsförhandling": "جلسة نظر الحبس الاحتياطي",
    "Häktningsskäl": "أسباب الحبس الاحتياطي",
    "Häleriförseelse": "جنحة التعامل بمسروقات (بسيطة)",
    "Hälsoundersökning": "فحص طبي",
    "Hänsynslöshet": "تهور أو قسوة (عدم اكتراث)",
    "Häva ett avtal": "يفسخ عقداً",
    "Högförräderi": "خيانة عظمى",
    "Höra ett vittne": "يسمع شاهداً (يأخذ أقواله)",
    "Höras under ed": "يُسمع تحت القسم",
    "I god tro": "بحسن نية",
    "Ideell förening": "جمعية نفع عام (غير ربحية)",
    "Ideellskada": "ضرر معنوي (ألم ومعاناة)",
    "Identitetskort": "بطاقة هوية",
    "Ifrågasätta": "يشكك أو يطعن في",
    "Ikraftträdande": "نفاذ (سريان مفعول القانون)",
    "Indicium": "قرينة (دليل غير مباشر)",
    "Indriva": "يجبي أو يحصل (ديناً)",
    "Infinna sig": "يمثل (يحضر أمام جهة)",
    "Informationssäkerhet": "أمن المعلومات",
    "Ingripa": "يتدخل (الشرطة)",
    "Inhibition": "وقف التنفيذ (المؤقت لقرار)",
    "Inkasso": "تحصيل الديون",
    "Inkomstbortfall": "فقدان الدخل (خسارة الكسب)",
    "Inkomstprövning": "فحص الدخل (لتحديد المعونة)",
    "Inlaga i rättegång": "مذكرة قضائية (لائحة)",
    "Innehavare": "حائز أو حامل (لسند)",
    "Innehavsperiod": "فترة الحيازة",
    "Inre väpnad konflikt": "نزاع مسلح داخلي (حرب أهلية)",
    "Inskrivningsmyndighet": "سلطة التسجيل العقاري",
    "Inskränkning": "تقييد",
    "Institution": "مؤسسة (إصلاحية أو رعاية)",
    "Inställelse": "مثول (حضور)",
    "Inställning": "موقف (من التهمة: إنكار أو اعتراف)",
    "Intagen ( i fängelse )": "نزيل (في السجن)",
    "Intensivövervakning": "مراقبة مكثفة (السوار الإلكتروني)",
    "Interimistiskt avgörande": "قرار مؤقت",
    "Interimistiskt förordnande": "أمر وقتي (مستعجل)",
    "Interimistiskt yrkande": "طلب وقتي",
    "Invandrarbyrå": "مكتب شؤون المهاجرين (سابقاً)",
    "Invändning": "دفع (اعتراض قانوني)",
    "Istadarätt": "حق التمثيل (في الميراث للأحفاد)",
    "Jourhavande": "مناوب",
    "Jouråklagare": "مدعي عام مناوب",
    "Juridisk person": "شخص معنوي (اعتباري)",
    "Juridisk rådgivning": "استشارة قانونية",
    "Jurisdiktionsområde": "نطاق الاختصاص القضائي",
    "Jämställdhet": "مساواة (بين الجنسين)",
    "Kallelse": "استدعاء (للمحكمة)",
    "Kallhyra": "إيجار بارد (بدون تدفئة وكهرباء)",
    "Kammarrätt": "محكمة الاستئناف الإدارية",
    "Kammaråklagare": "مدعي عام (في الغرفة)",
    "Kartläggning": "تتبع أو رصد (مسح شامل)",
    "Klander av bodelning": "الطعن في قسمة الممتلكات",
    "Klander av testamente": "الطعن في الوصية",
    "Klausul": "شرط أو بند (في عقد)",
    "Klient": "موكل (عميل)",
    "Kollusionsfara": "خطر التواطؤ (لطمس الأدلة)",
    "Konkurrenslagar": "قوانين المنافسة",
    "Konkursdomare": "قاضي التفليسة",
    "Konsumentkreditlagen ( KkrL )": "قانون الائتمان الاستهلاكي",
    "Konsumenttvist": "نزاع استهلاكي",
    "Kontaktförbud": "أمر عدم التعرض (منع الاتصال)",
    "Kontokortsbedrägeri": "احتيال ببطاقات الائتمان",
    "Kontraktsvård": "الرعاية التعاقدية (علاج الإدمان كبديل للسجن)",
    "Kontroll": "تفتيش أو رقابة",
    "Korruption": "فساد (رشوة)",
    "Korsförhör": "استجواب مضاد (للشاهد)",
    "Kreditköp": "شراء بالدين (بالائتمان)",
    "Kriminalvård i anstalt": "رعاية جنائية في السجن",
    "Kriminalvård i frihet": "رعاية جنائية خارج السجن (مراقبة)",
    "Kriminalvårdsmyndighet": "سلطة السجون والمراقبة",
    "Kronofogde": "مأمور التنفيذ (جابي الديون)",
    "Kvar i häkte": "باقٍ في الحبس",
    "Kvarbli i häkte": "يبقى قيد الحبس",
    "Kvarhållande": "احتجاز (مؤقت)",
    "Kvinnojour": "ملجأ النساء المعنفات",
    "Kvittning": "مقاصة (خصم دين من دين)",
    "Kvotering": "نظام الحصص (كوتا)",
    "Käromål": "دعوى المدعي (مطالبة)",
    "L§ sexuellt tvång och grovt sexuellt tvång": "المادة 1 § الإكراه الجنسي والإكراه الجنسي الجسيم", // Assuming 'L§' is typo for '1§' given listing patterns or similar chapter start
    "La § Människohandel": "المادة 1 أ § الاتجار بالبشر", // Typo La -> 1a
    "La § olovligt partnerskap": "المادة 1 أ § شراكة غير قانونية",
    "Lag om utlämning för brott": "قانون تسليم المجرمين",
    "Laga förfall": "عذر شرعي (مانع قانوني من الحضور)",
    "Laga kraft": "قوة القانون (الدرجة القطعية)",
    "Lagakraftvunnen dom": "حكم بات (قطعي)"
};

let updatedCount = 0;

dictionaryData.forEach((entry) => {
    const type = (entry[COL_TYPE] || '').trim();
    const word = entry[COL_SWE];
    const currentDef = entry[COL_ARB_DEF] || '';

    // Using mapping to handle duplicates in list
    if (type === 'JuridikTB.' && !currentDef.trim() && arabicDefinitions[word]) {
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
