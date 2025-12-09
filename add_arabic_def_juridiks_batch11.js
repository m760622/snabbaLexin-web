/**
 * Add Arabic definitions for JuridikS terms - Batch 11
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

// Arabic definitions for JuridikS terms - Batch 11
const arabicDefinitions = {
    "Medborgarvittne": "شاهد مدني (مراقب لعمل الشرطة)",
    "Meddelsam": "المتواطئ (في الجريمة)",
    "Medhjälp": "مساعدة الجاني (التواطؤ)",
    "Medhörning": "سماع أقوال الشهود عبر الهاتف/الفيديو",
    "Medhörningsrum": "غرفة الاستماع (للمراقبة)",
    "Mellanfolklig organisation": "منظمة دولية (حكومية)",
    "Mellanfolklig organisation t.ex. FN": "منظمة دولية مثل الأمم المتحدة",
    "Mervärdesskatt moms": "ضريبة القيمة المضافة (Moms)",
    "Migrationsdomstolar": "محاكم الهجرة",
    "Migrationsverket": "مصلحة الهجرة السويدية",
    "Migrationsöverdomstolen": "محكمة الهجرة العليا",
    "Militärgrad": "رتبة عسكرية",
    "Miljöbalken": "قانون البيئة (مدونة القوانين البيئية)",
    "Miljödomstol": "محكمة البيئة",
    "Miljöfarlig kemikaliehantering": "التعامل الخطر مع المواد الكيميائية",
    "Miljöförstörelse": "تدمير البيئة",
    "Miljökatastrof": "كارثة بيئية",
    "Miljömål": "قضايا بيئية",
    "Miljömärkning": "العلامة البيئية (للمنتجات الصديقة للبيئة)",
    "Miljörätt": "قانون البيئة",
    "Minister": "وزير",
    "Missbruk av urkund och missbruk av handling": "إساءة استخدام الوثائق والمستندات",
    "Misskötsamhet": "سوء السلوك (في العمل أو إدارة الأملاك)",
    "Missnöjesanmälan": "إعلان عدم الرضا عن الحكم (خطوة قبل الاستئناف في السابق)",
    "Moderskap": "الأمومة",
    "Moderskapspresumtion": "قرينة الأمومة (الأم هي التي ولدت)",
    "Morbror": "الخال (أخو الأم)",
    "Morföräldrar": "الجد والجدة (من جهة الأم)",
    "Moster": "الخالة (أخت الأم)",
    "Motförhör": "استجواب مضاد (للشهود من قبل الخصم)",
    "Mottagningsbevis": "إيصال استلام",
    "Mottagningsenhet": "وحدة استقبال (اللاجئين)",
    "Mullvad": "جاسوس مزروع (داخل منظمة)",
    "Myndigheten för familjerätt och föräldraskapsstöd MFoF": "هيئة قانون الأسرة ودعم الوالدين (MFoF)",
    "Myndigheter": "السلطات الحكومية",
    "Mål enligt socialtjänstlagen": "قضايا الخدمات الاجتماعية",
    "Målsägandebrott": "جرائم الشكوى (لا تحرك إلا بشكوى المتضرر)",
    "Målsägare": "المجني عليه (المدعي بالحق الشخصي)",
    "Målvakt": "شخص واجهة (يتحمل المسؤولية القانونية صورياً)",
    "Mäklararvode": "عمولة السمسرة أو الوساطة",
    "Mängdmål": "قضايا روتينية كثيرة العدد (مثل المخالفات المرورية)",
    "Människohandel": "الاتجار بالبشر",
    "Människorov": "اختطاف (خطف الأشخاص)",
    "Märkesförfalskning": "تقليد العلامات التجارية",
    "N.N.": "فلان (اسم مجهول أو افتراضي)",
    "Narkotikastrafflagen ( NSL )": "قانون العقوبات المخدرات",
    "Nationalitet": "الجنسية",
    "Nationella insatsstyrkan": "قوة التدخل الوطنية (الشرطة الخاصة)",
    "Nationellt lägenhetsregister": "سجل الشقق الوطني",
    "Naturminne": "آثار طبيعية محمية",
    "Naturreservat": "محمية طبيعية",
    "Naturvårdsverket": "مصلحة حماية البيئة",
    "Nedskräpning och nedskräpningsförseelse": "رمي النفايات (مخالفة بيئية)",
    "Negativ rättskraft": "قوة الشيء المقضي به (يمنع إعادة المحاكمة)",
    "Neutral": "محايد (دولة أو شخص)",
    "NOA - Nationella operativa avdelningen": "إدارة العمليات الوطنية (بالشرطة)",
    "Normalgrad": "درجة عادية (ليست مشددة أو مخففة للجريمة)",
    "Notarie": "موثق (كاتب عدل) أو كاتب محكمة",
    "Nulla poena sine lege": "لا عقوبة إلا بنص",
    "Nullum crimen sine lege": "لا جريمة إلا بنص",
    "Nybildning": "تكوين جديد (عقار أو شركة)",
    "Nyttjanderättsinnehavaren": "صاحب حق الانتفاع",
    "Nämndemän": "قضاة محلفون (ممثلون سياسيون للشعب)",
    "Näringsfrihet": "حرية التجارة وممارسة الأعمال",
    "Närpolis": "شرطة الأحياء (الشرطة المجتمعية)",
    "Nöd testamente": "وصية الضرورة (تكتب في ظروف استثنائية)",
    "Nödställd": "في حالة استغاثة أو خطر",
    "Oaktsamhet": "إهمال أو تقصير",
    "Obebyggda tomter": "أراضٍ غير مبنية (خالية)",
    "Obehörig befattning med hemlig uppgift": "التعامل غير المصرح به مع معلومات سرية",
    "Objektbeskrivning": "وصف العقار المعروض للبيع",
    "Objektiva rekvisit": "الأركان المادية للجريمة",
    "Obligationsrätt": "قانون الالتزامات",
    "Ockerpantning": "رهن ربوي (استغلال حاجة الفرد)",
    "Ockupation": "احتلال (أرض أو عقار)",
    "Offentlig biträde": "مساعد قانوني عام (تعينه الدولة)",
    "Offentlig grupptalan": "دعوى جماعية عامة (ترفعها هيئة حكومية)",
    "Offentlig rätt": "القانون العام",
    "Offentlig upphandling": "مشتريات حكومية (مناقصات عامة)",
    "Offentliga försvarare": "مدافع عام (محامي تعينه المحكمة)",
    "Offentlighets och sekretesslagen": "قانون العلنية والسرية",
    "Offentlighetsprincipen": "مبدأ علنية الوثائق (حق الوصول للمعلومات)",
    "Offentligrättsliga associationer": "كيانات القانون العام (كالبلديات)",
    "Offentligt ackord": "صلح وقائي (لتسوية الديون)",
    "Offentligt ackord ( tvångsackord )": "تسوية ديون جبرية (تحت إشراف المحكمة)",
    "Offert": "عرض سعر (إيجاب)",
    "Officialprincipen": "مبدأ الرسمية (واجب السلطة في التحقيق وكشف الحقيقة)",
    "Officialservitut": "حق ارتفاق إداري (تفرضه السلطة)",
    "Ofri grund": "أرض مستأجرة (المبنى ملك والأرض إيجار)",
    "Ofrigrund": "أرض الغير (بناء على أرض مستأجرة)",
    "Ogilla talan": "رد الدعوى (رفض طلبات المدعي)",
    "Ogiltighetsgrunder": "أسباب البطلان",
    "Ohörsamhet": "عصيان",
    "Ohörsamhet mot ordningsmakt": "عصيان أوامر السلطة العامة (الشرطة)",
    "Oklarhetsregeln": "قاعدة الغموض (يفسر الشك لصالح الطرف الأضعف)",
    "Okynne": "عبث أو شغب"
};

let updatedCount = 0;

dictionaryData.forEach((entry) => {
    const type = (entry[COL_TYPE] || '').trim();
    const word = entry[COL_SWE];
    const currentDef = entry[COL_ARB_DEF] || '';

    // Using mapping to handle duplicates in list
    if (type === 'JuridikS.' && !currentDef.trim() && arabicDefinitions[word]) {
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
