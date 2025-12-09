/**
 * Add Arabic definitions for Bygg terms - Batch 15
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

// Arabic definitions for Bygg terms - Batch 15
const arabicDefinitions = {
    "Natursten": "حجر طبيعي",
    "Navigera rätt": "التنقل بشكل صحيح (التوجيه)",
    "NCS ( Natural colour system )": "نظام الألوان الطبيعي (NCS)",
    "Nitpistol": "مسدس برشام",
    "Nivå": "مستوى (منسوب)",
    "Normalisation )": "تطبيع (توحيد المعايير)",
    "Normprestation": "أداء قياسي",
    "Nubb": "دبابيس تنجيد (مسامير قصيرة)",
    "Nybyggnad": "بناء جديد",
    "Nybyggnadskarta": "خريطة البناء الجديد (خريطة الموقع)",
    "Nyckeldata": "بيانات رئيسية",
    "Nyckeltal": "مؤشرات رئيسية",
    "Nödläge": "حالة طوارئ",
    "Obebyggd tomt": "أرض فضاء (غير مبنية)",
    "Offentligt uppköpserbjudande": "عرض شراء عام",
    "Offertvärdering": "تقييم العروض",
    "Oljefärg": "طلاء زيتي",
    "Oljehärdad board": "لوح مقوى بالزيت (مازونيت)",
    "Olycka": "حادث",
    "Områdesbestämmelser": "لوائح المنطقة",
    "Områdesplan": "مخطط المنطقة",
    "Opassande": "غير مناسب",
    "Operativ verksamhet": "أنشطة تشغيلية",
    "OPS ( Offentlig Privat Samverkan )": "شراكة بين القطاعين العام والخاص (PPP)",
    "Oriktig": "غير صحيح",
    "P - märkning ( kvalitetssäkring )": "علامة الجودة P (السويدية)",
    "Packning": "حشوة منع تسرب (أو رص)",
    "Panel": "ألواح تكسية (خشب جدران)",
    "Panna": "مرجل (بويلر) أو بلاطة سقف",
    "Pantbrev": "سند رهن عقاري",
    "Pappspik": "مسمار ورق الزفت (عريض الرأس)",
    "Parallelltak": "سقف موازي",
    "Parkett golv": "أرضية باركيه",
    "Partnering": "شراكة (عقد تعاون)",
    "Passivhus": "منزل سلبي (منخفض الطاقة)",
    "PBL - Plan och Bygglag": "قانون التخطيط والبناء (PBL)",
    "PDF - Plan och Byggförordning": "لائحة التخطيط والبناء (PDF)",
    "Pelare": "عمود",
    "Pellets": "كريات وقود (بيليت)",
    "Pensel": "فرشاة",
    "Performance Management ( PM )": "إدارة الأداء",
    "Perkolation": "تخلل (ترشيح المياه)",
    "Personalansvarig": "مسؤول شؤون الموظفين",
    "Personalavdelning": "قسم الموارد البشرية",
    "Personalchef": "مدير الموظفين",
    "Personalomsättning": "دوران الموظفين",
    "Personalpolicy": "سياسة الموظفين",
    "Personliga behov": "احتياجات شخصية",
    "Placering": "تموضع (تحديد المكان)",
    "Plan": "مسقط أفقي (أو خطة)",
    "Planavgift": "رسوم التخطيط",
    "Planerare": "مخطط",
    "Planering": "تخطيط",
    "Planeringsprogrammet": "برنامج التخطيط",
    "Planhyvla": "يسحج (مسح الخشب)",
    "Plank": "ألواح خشبية سميكة",
    "Planläggning": "تخطيط (عمراني)",
    "Planritning": "مسقط أفقي (رسم)",
    "Plast": "بلاستيك",
    "Platschef": "مدير الموقع",
    "Platsundersökning": "فحص الموقع",
    "Platt bärlag": "بلاطة مسطحة",
    "Platta på mark": "بلاطة على الأرض (أساس)",
    "Plattsättare": "مبلط",
    "Plushöjd": "منسوب موجب",
    "Plywood": "خشب معاكس (بليود)",
    "Plåt": "صاج (صفائح معدنية)",
    "Plåtregel": "قاطع معدني (للهياكل)",
    "Portlandcement": "أسمنت بورتلاندي",
    "Porös board": "لوح ليفي مسامي (سافت بورد)",
    "Praktikant": "متدرب",
    "Praktiska riktlinjer": "إرشادات عملية",
    "Prefab - byggnation": "بناء جاهز (مسبق الصنع)",
    "Prefabricerad": "مسبق الصنع",
    "Prestanda": "أداء",
    "Prickad mark": "أرض مقيدة (يمنع البناء عليها)",
    "Primärenergi": "طاقة أولية",
    "Primärkarta": "خريطة أساسية",
    "Pris": "سعر",
    "Prishöjning": "زيادة السعر",
    "Prissättning": "تسعير",
    "Prisuppgift": "عرض سعر (تقديري)",
    "Privatkunder": "عملاء أفراد",
    "Produktion": "إنتاج",
    "Produktionschef": "مدير الإنتاج",
    "Produktionsingenjör": "مهندس إنتاج",
    "Produktionskalkyl": "حساب تكلفة الإنتاج",
    "Produktionsledare": "مشرف إنتاج",
    "Produktionsstyrning": "إدارة الإنتاج",
    "Produktivitet": "إنتاجية",
    "Prognos": "توقع (تنبؤ)",
    "Projekt": "مشروع",
    "Projektbesök": "زيارة المشروع",
    "Projektchef": "مدير المشروع (تنفيذي)",
    "Projektera": "يصمم هندسياً",
    "Projektering": "تصميم هندسي (تخطيط)",
    "Projektingenjör": "مهندس مشروع",
    "Projektledare": "مدير مشروع",
    "Projektslut": "نهاية المشروع",
    "Projekttider": "مدة المشروع (جداولي)"
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
