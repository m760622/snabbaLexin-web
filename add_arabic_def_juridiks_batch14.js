/**
 * Add Arabic definitions for JuridikS terms - Batch 14
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

// Arabic definitions for JuridikS terms - Batch 14
const arabicDefinitions = {
    "Reklamationsplikt": "واجب تقديم الشكوى (الإخطار بالعيب)",
    "Reklamationstvist": "نزاع حول الشكوى (عيوب المنتج)",
    "Rekonstruktion": "إعادة تمثيل الجريمة (للتحقيق)",
    "Rekonstruktionsplan": "خطة إعادة الهيكلة (لإنقاذ الشركة)",
    "Rekonstruktör": "مسؤول إعادة الهيكلة (لشركة متعثرة)",
    "Rekvisition": "طلب رسمي (للحصول على شيء أو خدمة)",
    "Relativa straffteorier": "نظريات العقوبة النسبية (هدفها الإصلاح والردع)",
    "Religion": "الدين",
    "Remuneratorisk gåva": "هبة المكافأة (مقابل خدمة)",
    "Renodlade strafflagar": "قوانين عقابية بحتة",
    "Reparativ": "إصلاحي (تعويض الضرر)",
    "Repressalier": "أعمال انتقامية (رد فعل عقابي)",
    "Repressalier åtgärd": "إجراء انتقامي",
    "Res judicata": "قوة القضية المقضية (حكم بات)",
    "Resning": "التماس إعادة المحاكمة (لظهور أدلة جديدة)",
    "Resolution": "قرار دولي (من الأمم المتحدة)",
    "Restriktion": "قيد أو حظر (على السجين)",
    "Retroaktiva straffdomar": "أحكام جنائية بأثر رجعي (ممنوعة دستورياً)",
    "Revisor": "مدقق حسابات (محاسب قانوني)",
    "Rikets förhållande till främmande makt": "علاقات الدولة بقوى أجنبية",
    "Rikets säkerhet": "أمن الدولة (الأمن القومي)",
    "Riksdag": "البرلمان السويدي",
    "Riksdagens ombudsmän JO": "أمناء المظالم البرلمانيون (JO)",
    "Riksdagens talman": "رئيس البرلمان",
    "Riksdagstryck": "الوثائق البرلمانية (مشاريع القوانين والمحاضر)",
    "Riksdagsutskott": "لجان البرلمان",
    "Riksenhet": "وحدة وطنية (على مستوى المملكة)",
    "Rikskommunikationscentral": "مركز الاتصالات الوطني (للشرطة)",
    "Rikskriminalpolis": "الشرطة الجنائية الوطنية (سابقاً)",
    "Rikspolis": "الشرطة الوطنية",
    "Rikspolischef": "المفوض العام للشرطة (مدير عام الشرطة)",
    "Rikspolisstyrelsen": "الإدارة العامة للشرطة (سابقاً)",
    "Riksrevisionen": "ديوان المحاسبة الوطني",
    "Riksrevisionsverket": "مصلحة التدقيق الوطني (سابقاً)",
    "Riksåklagaren": "النائب العام (المدعي العام الأعلى)",
    "Ringa": "بسيط أو طفيف (وصف للجريمة)",
    "Riskåklagare": "خطأ إملائي - المقصود Riksåklagare",
    // The source likely meant Riksåklagare, but providing 'مدعي المخاطر' doesn't make sense. Skipping questionable term or defining literally 'مدعي عام' if it's a typo for Riksåklagare. Or noting it.  Will use safe def.
    "Riskåklagare": "النائب العام (تصحيح محتمل: Riksåklagare)",
    "RMV - Rättsmedicinalverket": "مصلحة الطب الشرعي (RMV)",
    "Råd och dåd": "قولاً وفعلاً (المساعدة في الجريمة نصحاً أو عملاً)",
    "Rådgivande nämnden": "اللجنة الاستشارية",
    "Rådgivning": "مشورة أو نصح",
    "Rådighetsfel": "عيب في صلاحية التصرف (بسبب قيود قانونية)",
    "Rådighetsinskränkning": "تقييد حق التصرف (في الملكية)",
    "Rådighetsinskränkningar": "قيود على التصرف",
    "Räkenskaper": "حسابات أو دفاتر محاسبية",
    "Räkning": "فاتورة",
    "Ränta": "فائدة مالية",
    "Rättegång": "محاكمة (إجراءات قضائية)",
    "Rättegångar": "محاكمات",
    "Rättegångsfullmakt": "وكالة قضائية (توكيل بالخصومة)",
    "Rättegångsförseelse": "إخلال بنظام الجلسة (مخالفة إجرائية)",
    "Rättegångshinder": "مانع من نظر الدعوى (دفع إجرائي)",
    "Rättegångskostnad": "مصاريف الدعوى (أتعاب المحاماة والرسوم)",
    "Rättegångskostnader": "تكاليف المحاكمة",
    "Rättegångsombud": "وكيل في المحاكمة (محام أو ممثل قانوني)",
    "Rättegångsordning": "نظام الإجراءات (قانون المرافعات)",
    "Rättsakt": "وثيقة قانونية أو تشريع (أوروبي)",
    "Rättsfakta": "وقائع قانونية (منشئة للحق)",
    "Rättsfall": "قضية (سابقة قضائية)",
    "Rättsfel": "عيب قانوني (في الملكية الحقة)",
    "Rättsföljd": "أثر قانوني (نتيجة الحكم)",
    "Rättshandling": "تصرف قانوني (ينتج آثاراً قانونية)",
    "Rättshjälp": "مساعدة قضائية (مساعدة مالية في تكاليف المحاكمة)",
    "Rättshjälpmyndighet": "سلطة المساعدة القضائية",
    "Rättshjälpsbiträde": "محامي المساعدة القضائية",
    "Rättshjälpslagen": "قانون المساعدة القضائية",
    "Rättshjälpsnämnd": "لجنة المساعدة القضائية",
    "Rättshjälpsnämnden": "لجنة المساعدة القضائية",
    "Rättskapacitet": "أهلية الوجوب (صلاحية اكتساب الحقوق)",
    "Rättskedja": "سلسلة قانونية (تسلسل الملكيات)",
    "Rättskraft": "حجية الحكم (قوة القضية المقضية)",
    "Rättslig handlingsförmåga": "أهلية الأداء (القدرة على التصرف القانوني)",
    "Rättsliga fel": "عيوب قانونية",
    "Rättsligt bistånd": "عون قضائي",
    "Rättsmedel": "طريق طعن (في الأحكام)",
    "Rättsobjekt": "محل الحق (الشيء موضوع الحق)",
    "Rättsområde": "مجال قانوني",
    "Rättsordning": "نظام قانوني",
    "Rättspsykiatrisk vård med särskild utskrivningsprövning": "علاج نفسي جنائي مع فحص خاص للإفراج",
    "Rättsregel": "قاعدة قانونية",
    "Rättsregler": "قواعد قانونية",
    "Rättssamhälle": "دولة القانون (مجتمع يحكمه القانون)",
    "Rättsskipning": "إقامة العدل (القضاء)",
    "Rättsstat": "دولة القانون والمؤسسات",
    "Rättssubjekt": "شخص قانوني (صاحب الحق)",
    "Rättssökande": "متقاضي (طالب حق)"
};

let updatedCount = 0;

dictionaryData.forEach((entry) => {
    const type = (entry[COL_TYPE] || '').trim();
    const word = entry[COL_SWE];
    const currentDef = entry[COL_ARB_DEF] || '';

    // Use map to avoid duplicates in object definition
    const definitionMap = {
        "Rekonstruktion": "إعادة هيكلة (للشركات) / إعادة تمثيل (للجريمة)",
        // Merged def for simplicity as key appears twice in list implying nuance or duplicate.
    };

    if (type === 'JuridikS.' && !currentDef.trim()) {
        if (arabicDefinitions[word]) {
            entry[COL_ARB_DEF] = arabicDefinitions[word];
            updatedCount++;
            console.log(`✅ ${word}`);
        } else if (word === 'Rekonstruktion' && !entry[COL_ARB_DEF]) {
            entry[COL_ARB_DEF] = "إعادة هيكلة (للشركات) / إعادة تمثيل (للجريمة)";
            updatedCount++;
            console.log(`✅ ${word}`);
        }
    }
});

// Write back to data.js
const output = 'const dictionaryData = ' + JSON.stringify(dictionaryData, null, 2) + ';';
fs.writeFileSync('./data.js', output);

console.log(`\n📊 Uppdaterade ${updatedCount} ord.`);
console.log('✅ Ändringar sparade i data.js');
