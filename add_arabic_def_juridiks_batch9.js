/**
 * Add Arabic definitions for JuridikS terms - Batch 9
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

// Arabic definitions for JuridikS terms - Batch 9
const arabicDefinitions = {
    "Komplementär": "شريك ضامن (مسؤول شخصياً وتضامنياً في شركة التوصية)",
    "Kompletterande utredning": "تحقيق تكميلي (لإضافة تفاصيل ناقصة)",
    "Koncentrationsprincipen": "مبدأ تركيز المحاكمة (إجراء الجلسات دون تقطع)",
    "Konceptionstid": "وقت الحمل (تاريخ الإخصاب المقدر)",
    "Konferenstolkar": "مترجمو المؤتمرات",
    "Konferenstolkning": "الترجمة الفورية للمؤتمرات",
    "Konkludent handlande": "تصرف ضمني (تعبير غير صريح عن الإرادة بقبول العقد)",
    "Konkurrensavgift": "غرامة المنافسة (عقوبة إدارية لمخالفة قواعد المنافسة)",
    "Konkurrensbegränsning": "تقييد المنافسة (احتكار)",
    "Konkurrensverket": "هيئة المنافسة السويدية",
    "Konkurrensverket KKV": "هيئة المنافسة (KKV)",
    "Konkurs - Konkursbo": "الإفلاس والكتلة المالية للتفليسة",
    "Konkursbeslut": "قرار إشهار الإفلاس",
    "Konkursbo": "التفليسة (أموال المدين المفلس)",
    "Konkursbouppteckning": "جرد أموال التفليسة",
    "Konkursförfarande": "إجراءات الإفلاس",
    "Konkursförvaltare": "مدير التفليسة (وكيل الإفلاس)",
    "Konkurslagen": "قانون الإفلاس",
    "Konsensualavtal": "عقد رضائي (ينعقد بمجرد الإيجاب والقبول)",
    "Konstitutionsutskottet": "لجنة الدستور في البرلمان",
    "Konstitutionsutskottet KU": "لجنة الدستور (KU)",
    "Konsultuppdrag": "عقد استشارات",
    "Konsulära tjänstemän": "موظفو القنصليات",
    "Konsument": "مستهلك",
    "Konsument - skydd, vägledning": "حماية وتوجيه المستهلك",
    "Konsument köp ( lagen )": "قانون شراء المستهلك",
    "Konsumentavtal": "عقد استهلاكي (بين تاجر ومستهلك)",
    "Konsumentförhållande": "علاقة استهلاكية",
    "Konsumentförsäkring": "تأمين المستهلكين",
    "Konsumentkredit ( lagen )": "قانون الائتمان الاستهلاكي",
    "Konsumentköplagen": "قانون مبيعات المستهلكين",
    "Konsumentköplagen KKL": "قانون مبيعات المستهلكين (KKL)",
    "Konsumentombudsmannen": "أمين مظالم المستهلك (KO)",
    "Konsumentsekreterare": "مستشار شؤون المستهلك (لدى البلدية)",
    "Konsumenttjänstlagen KTjL": "قانون خدمات المستهلكين",
    "Konsumentverket": "مصلحة شؤون المستهلك",
    "Kontakt med barn i sexuellt syfte": "استمالة الأطفال لأغراض جنسية (Grooming)",
    "Kontaktmän": "جهات اتصال أو أشخاص اتصال",
    "Kontantköp": "شراء نقدي (فوري)",
    "Kontantpris": "سعر النقد",
    "Kontradiktions principen": "مبدأ المواجهة (حق الرد والدفاع)",
    "Kontradiktionsprincipen": "مبدأ المواجهة بين الخصوم",
    "Kontraktsbrott": "خلل بالعقد أو خرق للاتفاق",
    "Kontraktsvård": "علاج تعاقدي (عقوبة بديلة للمدمنين تتضمن خطة علاج)",
    "Kontraspionage": "مكافحة التجسس",
    "Konventioner": "اتفاقيات أو معاهدات دولية",
    "Kooperativ": "تعاونية",
    "Kooperativ hyresrätt": "حق إيجار تعاوني (شكل سكن مختلط)",
    "Kooperativ hyresrättsförening": "جمعية الإيجار التعاوني",
    "Kostnads yrkande": "المطالبة بمصاريف الدعوى",
    "Kostnadsyrkanden": "مطالبات بالمصاريف القانونية",
    "Kravmyndighet": "الجهة الحكومية المطالبة بالدين (مثل صندوق الطلبة)",
    "Kreditbelopp": "مبلغ الائتمان أو القرض",
    "Kreditfordran": "مطالبة ائتمانية (دين)",
    "Kreditgivare": "الدائن (المقرض)",
    "Kreditkostnad": "تكلفة الائتمان (الفوائد والرسوم)",
    "Kreditprövning": "فحص الملاءة الائتمانية (القدرة على السداد)",
    "Kreditupplysningslagen KuL": "قانون المعلومات الائتمانية",
    "Krigsanstiftan": "التحريض على شن الحرب",
    "Krigsfara": "خطر اندلاع الحرب",
    "Krigsförbrytelse": "جريمة حرب",
    "Krigsvägrare": "رافض لأداء الخدمة العسكرية (لأسباب ضميرية)",
    "Kriminalpolis": "الشرطة الجنائية (المباحث)",
    "Kriminalpolisiär": "متعلق بالعمل الشرطي الجنائي",
    "Kriminalpolitik": "السياسة الجنائية (استراتيجية الدولة لمكافحة الجريمة)",
    "Kriminaltekniskt laboratorium": "المختبر الجنائي (Forensic Lab)",
    "Kriminalvårdare": "حارس سجن (موظف إصلاحية)",
    "Kriminalvården": "مصلحة السجون والمراقبة",
    "Kriminalvården KV": "مصلحة السجون (KV)",
    "Kriminalvårdsanstalt": "سجن أو مؤسسة إصلاحية",
    "Kriminalvårdsinspektör": "مفتش سجون",
    "Kriminalvårdsnämnden": "لجنة المراقبة (تشرف على العقوبات)",
    "Kriminalvårdsstyrelsen": "إدارة السجون (سابقاً)",
    "Kronofogdemyndigheten KFM": "مصلحة الجباية والتنفيذ (تحصيل الديون)",
    "Kroppsbesiktning": "فحص أو تفتيش جسدي داخلي (أخذ عينات)",
    "Kroppslig bestraffning": "عقوبة جسدية",
    "Kroppsstraff": "عقوبة بدنية",
    "Kroppsvisitation": "تفتيش جسدي خارجي (للملابس)",
    "Kränkande fotografering": "تصوير المسيء للخصوصية (جريمة)",
    "Kränkningar": "انتهاكات للحقوق أو إهانات",
    "Kränkningsersättning": "تعويض عن انتهاك الكرامة والحرمة الشخصية",
    "Kulturreservat": "محمية ثقافية (منطقة تراثية)",
    "Kungörelse": "إعلان رسمي عام",
    "Kurirer": "سعاة (نقل المخدرات)",
    "Kustbevakning": "خفر السواحل",
    "Kustbevakningen": "خفر السواحل",
    "Kvalifikationstid": "فترة الانتظار المؤهلة (لاستحقاق إعانة)",
    "Kvinnofridskränkning": "الانتهاك الجسيم لحرمة المرأة (العنف المنزلي)",
    "Kvitton": "إيصالات دفع",
    "Kvotdelningsprincipen": "مبدأ توزيع الحصص (في الملكية)",
    "Kvotflykting": "لاجئ ضمن نظام الحصص (إعادة التوطين)",
    "Kärande": "المدعي (رافع الدعوى)",
    "Käromålet": "لائحة الدعوى (الادعاء)",
    "Könsöverskridande identitet eller uttryck": "الهوية أو التعبير المتجاوز للجنس (العبور الجنسي)",
    "Köp": "عملية شراء أو بيع",
    "Köp av sexuell handling av barn": "شراء خدمات جنسية من طفل"
};

let updatedCount = 0;

dictionaryData.forEach((entry) => {
    const type = (entry[COL_TYPE] || '').trim();
    const word = entry[COL_SWE];
    const currentDef = entry[COL_ARB_DEF] || '';

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
