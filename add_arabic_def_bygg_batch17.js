/**
 * Add Arabic definitions for Bygg terms - Batch 17
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

// Arabic definitions for Bygg terms - Batch 17
const arabicDefinitions = {
    "Skyddsmaterial": "مواد الحماية",
    "Skyddsombud": "مندوب السلامة",
    "Skyddsrond": "جولة تفتيش السلامة",
    "Skyddsrum": "ملجأ",
    "Skyddsskor": "أحذية السلامة",
    "Skyddsutrustning": "معدات الوقاية",
    "Skyffel": "مجرفة",
    "Skållningsskador": "حروق سمط (بسوائل ساخنة)",
    "Sladdresistens": "مقاومة الانزلاق (للطرق)",
    "Slagspik": "مسمار طرق (للخرسانة)",
    "Slamfärg": "طلاء طيني (تقليدي)",
    "Slipmaskin": "آلة صنفرة (جلاخة)",
    "Slitlager": "طبقة التآكل (السطحية)",
    "Slutbesiktning": "تفتيش نهائي (استلام)",
    "Slutbesked": "إشعار الإنجاز النهائي",
    "Slutbevis": "شهادة الإنجاز",
    "Slutbevis - Slutbesked": "شهادة الإنجاز الكامل",
    "Sluten tank": "خزان مغلق (للصرف الصحي)",
    "Slutprodukt": "منتج نهائي",
    "Sluttning": "منحدر",
    "Smyglist": "شريط تغطية (حول الفتحات)",
    "Snickare": "نجار",
    "Snubbla": "يتعثر",
    "Snörasskydd": "واقي انزلاق الثلج (على السقف)",
    "Sockel": "قاعدة (وزرة/نعلة)",
    "Sommarjobbare": "عامل صيفي",
    "Sorteringsverk": "محطة فرز (غربلة)",
    "Spackla": "يمعجن",
    "Spikdrivare": "سنبك (لتغطيس رأس المسمار)",
    "Spikmaskin - spikpistol": "مسدس مسامير",
    "Spikplugg": "وتد مسماري (دبوس)",
    "Spiktrampskydd": "حماية نعل الحذاء (من المسامير)",
    "Spillvatten": "مياه عادمة (صرف صحي)",
    "Spjäll": "مخمد (للتهوية/المدخنة)",
    "Spjälor": "قضبان (شرائح خشبية)",
    "Spontning": "تعشيق (لسان ومجرى)",
    "Spricka": "شق (صدع)",
    "Sprutpistol": "مسدس رش",
    "Sprängning": "تفجير",
    "Spröjs": "قضبان تقسيم النوافذ",
    "Spånhyvel": "مسحاج",
    "Spånskiva": "لوح خشب مضغوط (شيب بورد)",
    "Spånskiveskruv": "برغي ألواح الخشب المضغوط",
    "Spänningskraft": "قوة الشد (التوتر)",
    "Stabilisering": "تثبيت (استقرار)",
    "Staket": "سياج",
    "Standard": "معيار",
    "Startbesked": "إشعار البدء (تصريح المباشرة)",
    "Stegdämpningsfolie": "رقائق عزل صوت الخطوات",
    "Stegljudsdämpning": "عزل صوت الخطوات",
    "Sten": "حجر",
    "Stenhuggare": "نحات حجر (قاطع أحجار)",
    "Stenkol": "فحم حجري",
    "Stenkonservering": "ترميم الأحجار",
    "Stensättare": "رصاف الأحجار",
    "Stenull": "صوف صخري",
    "Sticksåg": "منشار منحنيات (Jigsaw)",
    "Stomme": "هيكل (جسم المبنى الخشن)",
    "Stomsystem": "نظام الهيكل الإنشائي",
    "Strandskyddsområde": "منطقة حماية الشواطئ",
    "Strategi": "استراتيجية",
    "Strategisk verksamhetsutveckling": "تطوير الأعمال الاستراتيجي",
    "Strategiskt viktiga kunder": "عملاء استراتيجيون",
    "Strukturerad": "منظم (مهيكل)",
    "Ströläkt": "سدايب تهوية (تحت القرميد)",
    "Ström": "تيار (كهربائي)",
    "Stuprör": "أنبوب تصريف مياه الأمطار",
    "Styrande dokument": "وثائق توجيهية (حاكمة)",
    "Styrelse": "مجلس إدارة",
    "Styrelsemöte": "اجتماع مجلس الإدارة",
    "Stål": "فولاذ (صلب)",
    "Stålarbetare": "حداد (عامل تركيبات فولاذية)",
    "Stålbro": "جسر فولاذي",
    "Stålkonstruktioner )": "هياكل فولاذية",
    "Ståndpunkt": "موقف (رأي)",
    "Stämjärn": "إزميل نجارة",
    "Stämp": "دعامة مؤقتة (جحش)",
    "Stödmurar": "جدران استنادية",
    "Summa": "مجموع",
    "Suterränghus": "منزل بطابق تسوية (على منحدر)",
    "Svetsare": "لحام",
    "Svetsmaskin": "آلة لحام",
    "Svetsskärm": "قناع اللحام",
    "Sysselsättning": "توظيف (عمالة)",
    "System )": "نظام",
    "Systemeffektivitet": "كفاءة النظام",
    "Systemhandling": "وثائق النظام (تصميم أولي)",
    "Såg": "منشار",
    "Säkra arbetssätt": "طرق عمل آمنة",
    "Säljarbete": "عمل المبيعات",
    "Tak": "سقف",
    "Takbjälke": "عارضة السقف",
    "Takfall": "ميل السقف",
    "Takfot": "إفريز السقف (الحافة)",
    "Takfönster": "نافذة سقفية",
    "Takhöjd": "ارتفاع السقف",
    "Taklag": "فريق السقف (أو طبقة التسقيف)",
    "Takljus": "منور سقف (سكاي لايت)",
    "Takläggning": "تسقيف (تركيب السقف)",
    "Taknockhöjd": "ارتفاع ذروة السقف (الجملون)"
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
