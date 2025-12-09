/**
 * Add Arabic definitions for Bygg terms - Batch 14
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

// Arabic definitions for Bygg terms - Batch 14
const arabicDefinitions = {
    "Leveranstid": "وقت التسليم",
    "Leverantörsutvärdering": "تقييم الموردين",
    "Lime": "جير (كلس)",
    "Limträ ( L - trä )": "خشب صفائحي لاصق (غلام)",
    "Linoleummatta": "سجادة لينوليوم (مشمع)",
    "Linolja": "زيت الكتان",
    "Ljud": "صوت",
    "Ljudisolering": "عزل الصوت",
    "Ljudreducerande": "مخفض للصوت",
    "Ljusförhållanden": "ظروف الإضاءة",
    "Lockpanel": "ألواح تكسية خشبية (مع غطاء للفواصل)",
    "Loftgång": "ممر خارجي (شرفة ممر)",
    "Logistik": "لوجستيات",
    "Logistikansvarig": "مسؤول اللوجستيات",
    "Lokala krav": "متطلبات محلية",
    "Lossning": "تفريغ الحمولة",
    "Luftkompressor": "ضاغط هواء",
    "Luftvärmepump": "مضخة حرارية هوائية",
    "Lumppapp": "ورق لباد (كرتون مقوى للأرضيات)",
    "Lyft": "رفع",
    "Lyftkran": "رافعة (كرين)",
    "Lyftoperation": "عملية رفع",
    "Lyftredskap": "معدات الرفع",
    "Långsiktiga behov": "احتياجات طويلة الأمد",
    "Lås": "قفل",
    "Låskista": "علبة القفل (الدفن)",
    "Läge": "موقع (وضع)",
    "Lägenhet": "شقة",
    "Lägeskontroll": "تثبيت الموقع (فحص)",
    "Läkt": "سدايب (عوارض خشبية للقرميد)",
    "Längd": "طول",
    "Lättbetong": "خرسانة خفيفة",
    "Lön": "راتب",
    "Lönekostnad": "تكلفة الأجور",
    "Löneunderlag": "أساس الراتب",
    "Lönsamt": "مربح",
    "Löslighet": "ذوبانية",
    "Lösning": "حل (أو محلول)",
    "Makadam": "حصى مكسر (مكدام)",
    "Mansardtak": "سقف مانسارد (مزدوج الميل)",
    "Marklov": "تصريح أعمال التربة (حفر/ردم)",
    "Marknads - och försäljnings - avdelning": "قسم التسويق والمبيعات",
    "Markplaneringsritning": "مخطط تنسيق الموقع",
    "Markskiva": "لوح عزل أرضي",
    "Markåtgärder": "أعمال الأرض (تحضير التربة)",
    "Marmor": "رخام",
    "Maskering": "تغطية (حماية)",
    "Maskinplan": "خطة الآلات",
    "Masonit": "مازونيت (خشب ليفي مضغوط)",
    "Massiv": "صليب (مسمط)",
    "Massivväggar": "جدران صلبة (كتلة واحدة)",
    "Matjord": "تربة سطحية (زراعية)",
    "MDF - board": "ألواح MDF",
    "Medarbetare": "موظف (زميل)",
    "Merkostnad": "تكلفة إضافية",
    "Miljöansvarig": "مسؤول البيئة",
    "Miljöaspekter": "جوانب بيئية",
    "Miljöavdelning": "قسم البيئة",
    "Miljöfara": "خطر بيئي",
    "Miljöförgiftning": "تلوث بيئي (تسمم)",
    "Miljökrav": "متطلبات بيئية",
    "Miljölagstiftning": "تشريعات بيئية",
    "Miljöplan": "خطة بيئية",
    "Miljöpolicy": "سياسة بيئية",
    "Miljöpåverkan": "تأثير بيئي",
    "Miljövinster": "مكاسب بيئية",
    "Miljövärden": "قيم بيئية",
    "Mineralull": "صوف معدني",
    "Misstänka": "يشتبه",
    "Modernisera": "يحدث (يجدد)",
    "Monteringsband": "شريط تثبيت (أو خط تجميع)",
    "Montör": "فني تركيب",
    "Morgonmöte": "اجتماع صباحي",
    "Mosaik": "فسيفساء",
    "Motor": "محرك",
    "Motorväg": "طريق سريع",
    "Mur": "جدار",
    "Murare": "بناء (طوبار)",
    "Murblock": "كتل بناء (طوب)",
    "Murbruk": "ملاط (مونة)",
    "Murbrukshink": "دلو المونة",
    "Murslev": "مسطرين (ملعقة بناء)",
    "Mursten": "طوب",
    "Murverk": "أعمال البناء (طوب)",
    "Mutlagstiftning": "قانون مكافحة الرشوة",
    "Mål": "هدف",
    "Målar": "يدهن (يصبغ)",
    "Mångfald": "تنوع",
    "Måttnoggrannhet": "دقة الأبعاد",
    "Måttstock": "مقياس (مسطرة)",
    "Mängdning": "حساب الكميات (حصر)",
    "Märklast": "حمل اسمي (مقنن)",
    "Märla": "مسمار خطافي (U-nail)",
    "Mäta": "يقيس",
    "Mätarskåp": "خزانة العدادات",
    "Mätningsingenjör": "مهندس مساحة",
    "Mögel": "عفن",
    "Mögelskada": "ضرر العفن",
    "Naja": "يربط بالسلك (يربط الحديد)",
    "Najtråd": "سلك تربيط"
};

let updatedCount = 0;

dictionaryData.forEach((entry) => {
    const type = (entry[COL_TYPE] || '').trim();
    const word = entry[COL_SWE];
    const currentDef = entry[COL_ARB_DEF] || '';

    // Using mapping to handle duplicates in list
    if (type === 'Bygg.' && !currentDef.trim() && arabicDefinitions[word]) {
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
