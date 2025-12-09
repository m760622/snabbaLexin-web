/**
 * Add Arabic definitions for Medicin terms - Batch 15
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

// Arabic definitions for Medicin terms - Batch 15
const arabicDefinitions = {
    "Klamydia": "كلاميديا (عدوى تناسلية)",
    "Kliande": "حاك (مسبب للحكة)",
    "Klimakterium": "سن اليأس (انقطاع الطمث)",
    "Klåda": "حكة",
    "Klädlus": "قمل الملابس (الجسم)",
    "Knipsmärta": "ألم عاصر (مغصي)",
    "Knäleden": "مفصل الركبة",
    "Knäveck, knävecken": "باطن الركبة (المأبض)",
    "Knöl i bröstet": "كتلة في الثدي",
    "Koagulerar": "يتخثر (يتجلط)",
    "Koksaltlösning": "محلول ملحي",
    "KOL, kronisk obstruktiv": "مرض الانسداد الرئوي المزمن (KOL)",
    "Koliksmärta": "ألم قولنجي (مغص)",
    "Kolon irritable, irritable bowel syndrome - IBS": "القولون العصبي (IBS)",
    "Koloskopi": "تنظير القولون",
    "Kolostomi": "فغر القولون (كيس خارجي)",
    "Kolposkopi": "تنظير المهبل (وعنق الرحم)",
    "Komma smygande": "يأتي خلسة (بشكل تدريجي خفي)",
    "Komplikation - Komplikationer": "مضاعفات",
    "Kompression": "ضغط (كبس)",
    "Kompressionsförband": "رباط ضاغط",
    "Konditionen": "اللياقة البدنية (أو الحالة)",
    "Kondylom, könsvårtor": "ثآليل تناسلية (ورم لقمي)",
    "Konservativ behandling": "علاج تحفظي (غير جراحي)",
    "Kontakteksem": "إكزيما تلامسية",
    "Kontaktsmitta": "عدوى بالتلامس",
    "Kontaktämnen": "مواد مُسببة باللمس",
    "Kontrahera": "ينقبض (يتقلص)",
    "Kontrastmedel": "مادة تباين (صبغة أشعة)",
    "Kontraströntgen": "أشعة ملونة (بالصبغة)",
    "Konvex, utåtbuktande": "محدب (بارز للخارج)",
    "Koordinationsförmåga": "قدرة التنسيق (الحركي)",
    "Koordinationsstörning": "خلل في التنسيق (ترنح)",
    "Korn": "شعير",
    "Korsbenet": "عظم العجز",
    "Kortison": "كورتيزون",
    "Kortisonbehandling": "علاج بالكورتيزون",
    "Kortisonkräm": "كريم كورتيزوني",
    "Kost och levnadsvanor": "نظام غذائي ونمط حياة",
    "Kostvanor": "عادات غذائية",
    "Kotkompression": "انضغاط الفقرات (كسر انضغاطي)",
    "Kotpelaren": "العمود الفقري",
    "Kramper i vaderna": "تشنجات في بطة الساق",
    "Kramplösande": "مضاد للتشنج (باسط للعضلات)",
    "Krisens förlopp": "مسار الأزمة",
    "Kriser": "أزمات",
    "Krisstöd": "دعم الأزمات",
    "Kristjänst": "خدمة الأزمات",
    "Kromosomer": "كروموسومات (صبغيات)",
    "Kronisk": "مزمن",
    "Kronisk ledgångsreumatism": "روماتيزم المفاصل المزمن (الروماتويدي)",
    "Kronisk njursvikt": "فشل كلوي مزمن",
    "Kronisk obstruktiv lungsjukdom": "مرض انسداد رئوي مزمن (KOL)",
    "Kronisk smärta": "ألم مزمن",
    "Kroppen immunförsvar": "جهاز مناعة الجسم",
    "Kroppscell": "خلية جسدية",
    "Kroppsceller": "خلايا جسدية",
    "Kroppspulsåder": "الشريان الأبهر (الأورطي)",
    "Kroppsvätskor": "سوائل الجسم",
    "Kroppsvävnad": "نسيج الجسم",
    "Kryckkäppar ( kryckor )": "عكازات",
    "Krystimpulserna": "دوافع الدفع (أثناء الولادة)",
    "Kräkning, kräkningar": "قيء",
    "Kräks": "يتقيأ",
    "Kräm": "كريم (مرهم)",
    "Krämpa, krämpor": "علة (وعكات صحية)",
    "Kutant, via huden": "عبر الجلد (جلدي)",
    "Kvalster": "عث الغبار",
    "Kvinnliga könshormoner": "هرمونات جنسية أنثوية",
    "Kvävningskänsla": "شعور بالاختناق",
    "Käkbenet": "عظم الفك",
    "Käke": "فك",
    "Känselbortfall": "فقدان الإحساس",
    "Känselsinnet": "حاسة اللمس",
    "Känslig tarm": "أمعاء حساسة (قولون عصبي)",
    "Köldskador": "إصابات البرد (عضة الصقيع)",
    "Könscell": "خلية جنسية (جاميت)",
    "Könsorgan": "أعضاء تناسلية",
    "Könssjukdom ( venerisk sjukdom )": "مرض منقول جنسياً (زهري)",
    "Körtelfeber": "حمى غدية (كثرة الوحيدات)",
    "Laboratorieundersökning": "فحص مخبري",
    "Laparoskopi": "تنظير البطن (جراحة بالمنظار)",
    "Lapptestet": "اختبار الرقعة (للحساسية)",
    "Larynx": "الحنجرة",
    "Lavemang": "حقنة شرجية",
    "Laxermedel": "ملين (مسهل)",
    "Leddjur": "مفصليات الأرجل",
    "Leder": "مفاصل",
    "Ledgångsreumatism": "روماتيزم المفاصل (RA)",
    "Ledhuvud": "رأس المفصل (رأس العظم)",
    "Ledpanna": "جوف المفصل (الحق)",
    "Legionellabakterien": "بكتيريا الفيلقية (Legionella)",
    "Leverbiopsi": "خزعة كبد",
    "Levercancer": "سرطان الكبد",
    "Leverkoma": "غيبوبة كبدية",
    "Levern": "الكبد",
    "Leversvikt": "فشل كبدي",
    "Levertransplantation": "زراعة كبد",
    "Levra": "يتجلط (الدم)",
    "Lex Maria": "قانون ليكس ماريا (الإبلاغ عن الأخطاء الطبية)"
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
