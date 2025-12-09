/**
 * Add Arabic definitions for MigrationTB terms - Batch 4 (Final 88)
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

// Arabic definitions for MigrationTB terms - Final batch
const arabicDefinitions = {
    "Särskilt pass": "جواز سفر خاص لمهام رسمية",
    "Särskilt uppdrag": "مهمة محددة موكلة لشخص",
    "Särskilt ömmande omständigheter": "ظروف إنسانية استثنائية تستدعي الإقامة",
    "Säsongsarbetare": "عامل يعمل خلال مواسم محددة فقط",
    "Tandmogenhetsbedömning": "فحص أسنان لتقدير عمر الشخص",
    "Teckna avtal": "توقيع عقد أو اتفاقية رسمية",
    "Territorialprincipen ( jus soli )": "مبدأ اكتساب الجنسية بمكان الولادة",
    "Terrorismbekämpning": "جهود مكافحة الأعمال الإرهابية",
    "Terroristbrottslagen": "قانون يجرم الأعمال الإرهابية",
    "Tidsbegränsat uppehållstillstånd ( TUT )": "تصريح إقامة لفترة محددة",
    "Tillfälliga gränskontroller": "فحص مؤقت على الحدود",
    "Tillfälliga identitetskontroller": "تحقق مؤقت من الهويات",
    "Tillräckliga medel": "موارد مالية كافية للإعالة",
    "Tillstånd för bosättning": "إذن للإقامة الدائمة",
    "Tillståndsärenden": "قضايا تتعلق بطلبات التصاريح",
    "Tillsyn": "رقابة وإشراف من جهة مختصة",
    "Tjänsteman": "موظف في القطاع الحكومي",
    "Tjänstepass": "جواز سفر للموظفين الحكوميين",
    "Transitvisum": "تأشيرة للعبور عبر بلد",
    "Transportmedel": "وسيلة لنقل الأشخاص أو البضائع",
    "Transportörer": "شركات أو أشخاص ينقلون الركاب",
    "Tullverket": "هيئة الجمارك السويدية",
    "Tur och retur": "تذكرة ذهاب وعودة",
    "Tvingande hänsyn": "اعتبارات ملزمة يجب مراعاتها",
    "Tvångsprostitution": "إجبار شخص على ممارسة الدعارة",
    "Undantag från kravet att inneha arbetstillstånd ( AT- UND )": "إعفاء من شرط الحصول على تصريح عمل",
    "Underentrepenör": "مقاول يعمل تحت مقاول آخر",
    "Underhållsstöd": "مساعدة مالية للنفقة",
    "Underställas, remitteras": "إحالة قضية لجهة أخرى",
    "Universell jurisdiktion": "صلاحية محاكمة جرائم دولية",
    "Uppdragsgivare": "الجهة التي تكلف بمهمة",
    "Uppehållskort": "بطاقة تثبت حق الإقامة",
    "Uppehållstillstånd efter tillfälligt skydd": "إقامة بعد انتهاء الحماية المؤقتة",
    "Uppgiftsskyldi ghet, additionsplikt": "واجب تقديم المعلومات للسلطات",
    "Upphävande av beslut": "إلغاء قرار سابق",
    "Uppskjuten invandringsprövning": "تأجيل البت في طلب الهجرة",
    "Utbyte av brott": "المكاسب الناتجة عن جريمة",
    "Utfärdande": "إصدار وثيقة أو قرار رسمي",
    "Utlandsmyndighet": "سفارة أو قنصلية سويدية بالخارج",
    "Utlämnas": "تسليم شخص لدولة أخرى",
    "Utlännings- och medborgarskapsärenden": "قضايا الأجانب والجنسية",
    "Utlänningslagen ( UtlL )": "القانون المنظم لشؤون الأجانب",
    "Utomordentliga förhållanden": "ظروف استثنائية غير عادية",
    "Utstationerade arbetstagare": "عمال مُعارون للعمل مؤقتاً",
    "Utvandring": "مغادرة البلاد للإقامة بالخارج",
    "Utvidgat gärningsmannaskap": "توسيع المسؤولية الجنائية للمشاركين",
    "Utvisning": "إخراج شخص من البلاد قسراً",
    "Utvisning på grund av befarad brottslighet": "ترحيل بسبب توقع ارتكاب جرائم",
    "Utvisning på grund av rikets säkerhet": "ترحيل لأسباب أمن الدولة",
    "Utökat försörjningskrav": "شرط إعالة أكثر صرامة",
    "Validering": "تقييم واعتماد مؤهلات أجنبية",
    "ekvalera": "معادلة شهادات دراسية أجنبية",
    "Vandelsvillkor": "شرط حسن السيرة والسلوك",
    "Vanligt pass": "جواز سفر عادي للمواطنين",
    "Varaktigt nedsatt hälsotillstånd": "حالة صحية متدهورة بشكل دائم",
    "Verkställighet av beslut": "تنفيذ قرار رسمي",
    "Vernepliktig": "شخص ملزم بالخدمة العسكرية",
    "Vidarebosättning": "نقل لاجئين لدولة ثالثة",
    "Vilseledande uppgifter": "معلومات مضللة وغير صحيحة",
    "Visum": "تأشيرة دخول لبلد أجنبي",
    "Visumansökan": "طلب للحصول على تأشيرة",
    "Visumfri": "إعفاء من شرط الحصول على تأشيرة",
    "Visumkod": "قواعد الاتحاد الأوروبي للتأشيرات",
    "Vuxenutbildning": "تعليم مخصص للبالغين",
    "Våld mot tjänsteman": "الاعتداء على موظف أثناء عمله",
    "Yrkesförberedande program": "برنامج ثانوي للإعداد المهني",
    "Yttrande": "رأي أو تعليق رسمي",
    "Åldersbedömning": "تقييم عمر شخص بفحوصات",
    "Återkallelse": "سحب قرار أو تصريح سابق",
    "Återresa": "العودة بعد زيارة بلد آخر",
    "Återreseförbud": "منع من العودة لفترة محددة",
    "Återtagandeavtal": "اتفاق لإعادة أشخاص لبلدهم",
    "Återvändandebeslut": "قرار بوجوب مغادرة البلاد",
    "Åtgärder": "إجراءات وتدابير رسمية",
    "Ödesdigert trauma": "صدمة نفسية خطيرة",
    "Ömmande omständigheter": "ظروف إنسانية تستدعي المراعاة",
    "Ömsesidighet": "المعاملة بالمثل بين الدول",
    "Överenskommelse": "اتفاق بين طرفين أو أكثر",
    "Överförmyndarnämnden": "لجنة الرقابة على الأوصياء",
    "Överklaga": "الطعن في قرار أمام جهة أعلى",
    "Överklagande": "طعن رسمي في قرار",
    "Överlämnande av utlänning": "تسليم أجنبي لدولة أخرى",
    "Överprövning": "مراجعة قرار من جهة أعلى",
    "Övervakad resa": "رحلة تحت إشراف السلطات"
};

let updatedCount = 0;

dictionaryData.forEach((entry) => {
    const type = (entry[COL_TYPE] || '').trim();
    const word = entry[COL_SWE];
    const currentDef = entry[COL_ARB_DEF] || '';

    if (type === 'MigrationTB.' && !currentDef.trim() && arabicDefinitions[word]) {
        entry[COL_ARB_DEF] = arabicDefinitions[word];
        updatedCount++;
        console.log(`✅ ${word}`);
    }
});

// Write back to data.js
const output = 'const dictionaryData = ' + JSON.stringify(dictionaryData, null, 2) + ';';
fs.writeFileSync('./data.js', output);

console.log(`\n📊 تم تحديث ${updatedCount} كلمة`);
console.log('✅ تم حفظ التغييرات في data.js');
