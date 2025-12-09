/**
 * Add Arabic definitions for Bygg terms - Batch 3
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

// Arabic definitions for Bygg terms - Batch 3
const arabicDefinitions = {
    "Asfaltsskärare": "قاطع الأسفلت",
    "Asfaltverk": "مصنع أسفلت (خلاطة)",
    "Askåtervinning": "استعادة الرماد (إعادة تدوير)",
    "Atrium": "فناء داخلي (ردهة)",
    "Avbitartång": "كماشة قطع (زرادية)",
    "Avbrott": "انقطاع (توقف)",
    "Avbrottstid": "وقت التوقف (مدة العطل)",
    "Avdelning": "قسم",
    "Avdelningschef": "رئيس قسم",
    "Avdragen betong": "خرسانة مسواة (ممسوحة بالقاعدة)",
    "Avdragen yta": "سطح مسوّى",
    "Avdragning": "تسوية (سطح الخرسانة)",
    "Avdunstning": "تبخر",
    "Avfall": "نفايات",
    "Avfallsanläggning": "منشأة معالجة النفايات",
    "Avfallsbehållare": "حاوية نفايات",
    "Avfallshantering": "إدارة النفايات",
    "Avfallsnedkast": "أنبوب رمي النفايات (مجرى)",
    "Avfallsrum": "غرفة النفايات",
    "Avfallsutrymme": "مكان تجميع النفايات",
    "Avfallsverk": "محطة معالجة النفايات",
    "Avfart": "مخرج (من طريق سريع)",
    "Avfettning": "إزالة الشحوم",
    "Avflagning": "تقشر (الطلاء/السطح)",
    "Avgiven energi": "الطاقة المنبعثة",
    "Avgiven värme": "الحرارة المنبعثة",
    "Avhärdare": "مزيل عسر الماء",
    "Avisning": "إزالة الجليد",
    "Avjämna": "يسوي (يعدل السطح)",
    "Avjämnad betong": "خرسانة ملساء (مسواة)",
    "Avjämnad yta": "سطح مستوٍ",
    "Avjämnare": "أداة تسوية",
    "Avjämning": "تسوية (تمليس)",
    "Avkastningsvärde": "القيمة العائدة (الربحية)",
    "Avlasta": "يخفف الحمل (يفرغ)",
    "Avleda": "يصرف (يحول مسار الماء/الكهرباء)",
    "Avlopp": "صرف صحي (مجاري)",
    "Avloppsledning": "أنبوب صرف صحي",
    "Avloppsnät": "شبكة الصرف الصحي",
    "Avloppspump": "مضخة صرف صحي",
    "Avloppsränna": "قناة صرف (مزراب)",
    "Avloppsvatten": "مياه الصرف الصحي",
    "Avläsning": "قراءة (عداد/قياس)",
    "Avsats": "بسطة (درج/حافة)",
    "Avskiljande skikt": "طبقة فاصلة",
    "Avskiljare": "فاصل (جهاز فصل)",
    "Avskärande dike": "خندق قاطع (لتصريف المياه)",
    "Avsmalning": "تضييق (استدقاق)",
    "Avsnitt": "قطاع (قسم/مقطع طريق)",
    "Avståndsmätning": "قياس المسافة",
    "Avställningsplats": "منطقة تخزين مؤقت (أو ركن)",
    "Avsvalningsperiod": "فترة التبريد",
    "Avtalsbestämmelser": "شروط العقد",
    "Avtalsform": "صيغة العقد",
    "Avtalstid": "مدة العقد",
    "Avtryck": "أثر (طبعة)",
    "Avvägningsritning": "مخطط التسوية (المناسيب)",
    "Avväxling": "توزيع الأحمال (كمرة نقل حمل)",
    "Avväxlingsbeslag": "تجهيزات نقل الأحمال",
    "Axel": "محور (عمود دوران/كتف)",
    "Axellast": "حمل المحور",
    "Axeltryck": "ضغط المحور",
    "Axiell Belastning": "حمل محوري",
    "Backventil": "صمام عدم رجوع (رداد)",
    "Badkar": "حوض استحمام (بانيو)",
    "Badrum": "حمام",
    "Bakgård": "فناء خلفي",
    "Balansering": "موازنة",
    "Balansräkning": "ميزانية عمومية",
    "Balk": "عارضة (كمرة/جسر)",
    "Balkbro": "جسر ذو عوارض",
    "Balkong": "شرفة (بلكونة)",
    "Balkongplatta": "بلاطة الشرفة",
    "Ballast": "حصى (ركام/وزن توازن)",
    "Ballastspridare": "آلة فرش الحصى",
    "Balustrad": "درابزين (سور شرفة)",
    "Bandjärn": "شريط حديدي (طوق)",
    "Bandlastare": "جرافة مجنزرة (Loader)",
    "Bandsåg": "منشار شريطي",
    "Bandvåg": "ميزان سير ناقل",
    "Bankfyllning": "ردم (تعلية ترابية)",
    "Bankhöjd": "ارتفاع الردم",
    "Bankning": "دك (طرق)",
    "Bankpåle": "وتد ردم (أساس)",
    "Bankpålning": "دق الأوتاد في الردم",
    "Barnsäker": "آمن للأطفال",
    "Barometerhöjdmätare": "مقياس ارتفاع بارومتري",
    "Barriärer": "حواجز",
    "Baslast": "الحمل الأساسي",
    "Basning": "تبخير (الخشب لثنيه)",
    "Basram": "إطار القاعدة",
    "Bastu": "ساونا",
    "BBR ( Boverkets byggregler )": "قواعد البناء السويدية (BBR)",
    "BDT - vatten ( Bad - Disk - Tvätt )": "المياه الرمادية (استحمام، غسيل، جلي)",
    "Bearbetningsmån": "هامش التشغيل (سماحة)",
    "Bebygga": "يبني (يعمر أرضاً)",
    "Bebyggd Tomt": "أرض مبنية (معمورة)",
    "Bebyggelse": "عمران (مباني/مستوطنة)",
    "Bebyggelsemiljö": "بيئة عمرانية",
    "Beck": "زفت (قار)"
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
