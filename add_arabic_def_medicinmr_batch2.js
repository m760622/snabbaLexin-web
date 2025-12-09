/**
 * Add Arabic definitions for MedicinMR terms - Batch 2
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

// Arabic definitions for MedicinMR terms - Batch 2
const arabicDefinitions = {
    "Hemska mardrömmar": "كوابيس مروعة",
    "Histamin": "هيستامين",
    "Hjärnsubstans": "مادة الدماغ",
    "Hostdämpande medicin": "دواء مثبط للسعال",
    "Huden spricker": "تشقق الجلد",
    "Huliganbråk - ett huliganbråk": "شجار مثيري الشغب",
    "Hur yttrar sig den?": "كيف تظهر أعراضه؟",
    "Husläkare": "طبيب الأسرة",
    "Hydrokortisonsalva": "مرهم هيدروكورتيزون",
    "Hålla balansen": "الحفاظ على التوازن",
    "Håller mig på avstånd": "أبتعد (أحافظ على مسافة)",
    "Hållit ett föredrag om": "ألقى محاضرة عن",
    "Hårdhet": "صلابة",
    "Hårresande ( historia )": "مرعب (قصة تقشعر لها الأبدان)",
    "Hälsokosthandeln": "متجر الأغذية الصحية",
    "Hälsotallrik": "طبق صحي",
    "Höga toner": "نغمات عالية (طبقات صوتية)",
    "Hörselbenen": "عظيمات السمع",
    "Hörselsinnescellerna": "خلايا حسية سمعية",
    "Hösnuva": "حمى القش (التهاب الأنف التحسسي)",
    "Höstblåsor, Hand - fot - munsjuka": "مرض اليد والقدم والفم (بثور الخريف)",
    "I lymfknutor": "في العقد الليمفاوية",
    "I vaket tillstånd": "في حالة اليقظة",
    "Icke allergiskt kontakteksem": "أكزيما التماس غير التحسسية (تهييجية)",
    "Ilsken av mig": "سريع الغضب (غاضب بطبعي)",
    "Infekterar vävnader": "يصيب الأنسجة بالعدوى",
    "Infektionskliniken": "عيادة الأمراض المعدية",
    "Inflammation uppstår": "يحدث التهاب",
    "Ingredienserna": "المكونات",
    "Inhalator": "جهاز استنشاق (بخاخ)",
    "Insomningsproblem": "مشاكل في النوم (أرق)",
    "Invaderar där färskvattensniglar": "تغزو حيث توجد قواقع المياه العذبة",
    "Invalidiserande": "مُعجِز (مسبب للإعاقة)",
    "Invecklat system": "نظام معقد",
    "Inälvor": "أحشاء (أمعاء)",
    "Irriterar mig": "يزعجني",
    "Jourhavande läkare": "الطبيب المناوب",
    "Jättesvettigt": "متعرق جداً",
    "Kallsvettig": "تعرق بارد",
    "Kallus": "دشبذ (نسيج عظمي مرمم)",
    "Kallus utvecklas till benvävnad": "يتحول الدشبذ لنسيج عظمي",
    "Kammarvatten": "الخلط المائي (سائل العين)",
    "KBT": "العلاج السلوكي المعرفي (KBT)",
    "Kliar": "يحك",
    "Kläcks i sötvatten": "يفقس في المياه العذبة",
    "Knegar ( gå mödosamt )": "يكدح (يمشي بصعوبة)",
    "Knottror": "نتوءات (بثور صغيرة)",
    "Knutor": "عقد (كتل)",
    "Kombination av": "مزيج من",
    "Koncentrera mig på något": "أركز على شيء",
    "Konkava glas": "عدسات مقعرة",
    "Konsertviolinist": "عازف كمان محترف",
    "Konstaterade": "صرح (لاحظ/أثبت)",
    "Konstgjord lins inopererad": "عدسة اصطناعية مزروعة",
    "Kontakt eksem": "أكزيما التماس",
    "Kontinuerlig tinnitus": "طنين مستمر",
    "Konventionell behandling": "علاج تقليدي",
    "Konvexa glasögon": "نظارات بعدسات محدبة",
    "Kramper": "تشنجات",
    "Kravlar de ut": "يزحفون للخارج",
    "Krig": "حرب",
    "Krutröken": "دخان البارود",
    "Krypa upp genom fotsulorna": "تتسلل عبر باطن القدمين",
    "Kylbalsam": "بلمس مبرد (مرطب)",
    "Kängor": "أحذية (بوط)",
    "Känslor": "مشاعر",
    "Känsloutbrott": "نوبات عاطفية",
    "Kärleksfull": "محب (حنون)",
    "Kärnfysiker": "فيزيائي نووي",
    "Laboratoriet": "المختبر",
    "Landsmän": "مواطنون (أبناء البلد)",
    "Lapptest": "اختبار الرقعة (للحساسية)",
    "Larver": "يرقات",
    "Laserbehandling": "علاج بالليزر",
    "Led av depression": "عانى من الاكتئاب",
    "Lider av färgblindhet": "يعاني من عمى الألوان",
    "Lider av tinnitus…": "يعاني من الطنين",
    "Likartade symtom": "أعراض مشابهة",
    "Lindra besvären": "يخفف الأعراض (المتاعب)",
    "Livet ville något annat": "أراد القدر شيئاً آخر",
    "Livsmedel": "مواد غذائية",
    "Ljusstrålar samlas precis på…": "تتجمع أشعة الضوء تماماً على...",
    "Lokaliserade": "حدد موقع",
    "Luftrörsbesvär": "مشاكل الشعب الهوائية",
    "Luktar död och förintelse": "تفوح منه رائحة الموت والدمار",
    "Lungtuberkulos": "سل رئوي",
    "Lymfkärl": "أوعية ليمفاوية",
    "Lymfsystem - Lymfsystemet": "الجهاز الليمفاوي",
    "Långsynt": "بعيد النظر (مد بصر)",
    "Lägger sig under huden": "يستقر تحت الجلد",
    "Läkarbesök angående synproblem": "زيارة الطبيب لمشاكل الرؤية",
    "Läkare utan gränser": "أطباء بلا حدود",
    "Läkarintygsföreläggande": "أمر بتقديم شهادة طبية",
    "Läkemedelsallergier": "حساسية الأدوية",
    "Maculadegeneration": "تنكس بقعي",
    "Maggropen, epigastrium": "فم المعدة (المنطقة الشرسوفية)",
    "Makuladegeneration": "تنكس بقعي (ضمور البقعة الصفراء)",
    "Marinbiolog": "عالم أحياء بحرية",
    "Maskar": "ديدان",
    "Massa hjälpmedel": "الكثير من الوسائل المساعدة"
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
