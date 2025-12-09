/**
 * Add Arabic definitions for MedicinMN terms - Final Batch
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

// Arabic definitions for MedicinMN terms - Final Batch
const arabicDefinitions = {
    "Rektalsuspension": "معلق شرجي",
    "Sexuellt överförbar infektion": "عدوى منقولة جنسياً (STI)",
    "Situationen stabiliserats": "استقر الوضع",
    "Sjukanmäla sig": "يبلغ عن مرضه",
    "Sjukhusvård": "رعاية المستشفى (استشفاء)",
    "Sjukintyget": "الشهادة المرضية",
    "Sjukvårdsupplysning": "استعلامات الرعاية الصحية (1177)",
    "Skolläkare": "طبيب المدرسة",
    "Strupkatarr ( Laryngit )": "التهاب الحنجرة",
    "Stödstrumpa": "جوارب ضاغطة (داعمة)",
    "Syfilisbakterier": "بكتيريا الزهري",
    "Synkonsulent": "مستشار ضعف البصر",
    "syreproduktionen": "إنتاج الأكسجين",
    "Systemisk lupus erythematosus": "الذئبة الحمامية الجهازية (SLE)",
    "Sårbehandling vätska": "سائل تطهير الجروح",
    "TIA - transitorisk ischemisk attack": "نوبة نقص تروية عابرة (TIA)",
    "Trombos, Blodpropp": "تجلط (جلطة دموية)",
    "tyreostatika": "أدوية مضادة للدرقية",
    "Ureter - Urinledare": "الحالب",
    "Valva mitralis": "الصمام التاجي",
    "Vilo - EKG": "تخطيط قلب أثناء الراحة",
    "Värmedesinfektion": "تطهير حراري",
    "Yrkesmedicin": "طب مهني",
    "Åderbråck": "دوالي الأوردة",
    "åtskilliga": "العديد (عدة)",
    "åtskilliga gånger": "عدة مرات",
    "Öden": "أقدار (مصائر)",
    "ögonbotten": "قاع العين",
    "Överjaget, Överjag ( Super-Egon )": "الأنا العليا",
    "överproduktion av hormoner": "فرط إنتاج الهرمونات",
    "Stuporos melankoli": "ذهول سوداوي (اكتئابي)",
    "Bensodiazepiner": "بنزوديازيبينات",
    "Slemmig soppa": "حساء لزج",
    "Primär tuberkulos": "سل أولي",
    "Aktiv tuberkulos": "سل نشط",
    "Mikroskopiskundersökning": "فحص مجهري",
    "Frisk som en nötkärna": "سليم معافى (بصحة ممتازة)",
    "Spädbarnskolik": "مغص الرضع",
    "Spädbarnsvård": "رعاية الرضع",
    "Handlingsplan": "خطة عمل",
    "stav": "عصية (بكتيريا) أو عصوية (خلية عين)",
    "Hudlager:": "طبقات الجلد",
    "Endokrina organ": "أعضاء الغدد الصماء"
};

let updatedCount = 0;

dictionaryData.forEach((entry) => {
    const type = (entry[COL_TYPE] || '').trim();
    const word = entry[COL_SWE];
    const currentDef = entry[COL_ARB_DEF] || '';

    // Using mapping to handle duplicates in list
    if (type === 'MedicinMN.' && !currentDef.trim() && arabicDefinitions[word]) {
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
