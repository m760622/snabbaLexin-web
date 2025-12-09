/**
 * Add Arabic definitions for JuridikS terms - Batch 17
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

// Arabic definitions for JuridikS terms - Batch 17
const arabicDefinitions = {
    "Sveriges advokatsamfund": "نقابة المحامين السويدية",
    "Sveriges exportråd": "مجلس الصادرات السويدي",
    "Svikande av försvarsplikt": "التخلف عن واجب الدفاع (الهروب من الخدمة)",
    "Svindleri": "نصب واحتيال (مالي)",
    "Svågerlag": "مصاهرة (علاقة القرابة بالزواج)",
    "Syskonbarn": "أبناء الأخ أو الأخت",
    "Säkerhetsavdelning": "قسم الأمن (في الشرطة أو المؤسسات)",
    "Säkerhetsfaktor": "عامل الأمان",
    "Säkerhetsföreskrifter": "تعليمات السلامة والأمن",
    "Säkerhetsgaranti": "ضمان أمني",
    "Säkerhetsklasser": "تصنيفات أمنية (للسجون أو المعلومات)",
    "Säkerhetskultur": "ثقافة الأمن والسلامة",
    "Säkerhetsmeddelande": "رسالة تحذير أمنية",
    "Säkerhetsnormer": "معايير السلامة",
    "Säkerhetsrådgivare": "مستشار أمني",
    "Säkerhetssal": "قاعة محكمة أمنية (محصنة)",
    "Säkerhetsskydd": "حماية أمنية (للمعلومات والمرافق)",
    "Säkerhetsstopp": "توقف للسلامة (إجراء احترازي)",
    "Säkerhetssystem": "نظام أمني",
    "Säkerhetsvarning": "إنذار أمني",
    "Särboende ( särbor )": "أزواج يعيشون في سكنين منفصلين",
    "Särskild boutredningsman": "مصفي تركة خاص (تعينه المحكمة)",
    "Särskild förmånsrätt": "امتياز خاص (أولوية في استيفاء الدين من أصل معين)",
    "Särskild förordnad vårdnadshavare": "وصي خاص (يعين للطفل عند غياب الوالدين)",
    "Särskild rättsverkan": "أثر قانوني خاص (لحكم أو قرار)",
    "Särskild utskrivning": "إفراج خاص (من الرعاية النفسية)",
    "Särskild åklagare": "مدعي عام خاص (لقضايا الشرطة والقضاء)",
    "Särskild åtalsprövning": "فحص خاص لرفع الدعوى (تطلب إذن)",
    "Särskilda ( extraordinära ) rättsmedel": "طرق الطعن غير العادية (التماس إعادة النظر)",
    "Särskilda rättsmedel": "طرق طعن غير عادية",
    "Särskilda säkerhetskontroller": "تفتيش أمني خاص",
    "Särskilda ungdomshem": "مراكز رعاية الشباب الخاصة (Sis-hem)",
    "Särskilt förordnad vårdnadshavare": "وصي معين خصيصاً",
    "Sökande": "مقدم الطلب",
    "Tagande av muta": "قبول الرشوة (المرتشي)",
    "Tagande av olovlig väg": "اجتياز طريق غير مسموح (تعدي)",
    "Tagande av utländskt understöd": "تلقي دعم أجنبي (لغرض سياسي محظور)",
    "Talsvårigheter": "صعوبات في النطق",
    "Taxeringsenhet": "وحدة التقييم الضريبي (للعقار)",
    "Teckenspråkstolk": "مترجم لغة إشارة",
    "Teckenspråkstolkar": "مترجمو لغة إشارة",
    "Tekniska råd": "مستشارون فنيون (قضاة في محكمة الأراضي)",
    "Teleavlyssning": "تنصت هاتفي",
    "Telefonförhör": "استجواب عبر الهاتف",
    "Teleologisk tolkning": "تفسير غائي (حسب الهدف من القانون)",
    "Teleövervakning": "مراقبة الاتصالات (بيانات الاتصال)",
    "Terrorism": "إرهاب",
    "Terroristbrott": "جريمة إرهابية",
    "Testamente": "وصية",
    "Testamentstagare": "الموصى له",
    "Testator": "الموصي (كاتب الوصية)",
    "Tids delat boende": "سكن بنظام الوقت المشترك (Timeshare)",
    "Tidsdelat boende": "سكن الوقت المشترك",
    "Tillerkänts": "مُنح أو قُضي له (بحق أو تعويض)",
    "Tillflyktsland": "بلد الملجأ",
    "Tillgrepp av fortskaffningsmedel": "سرقة مركبة (لاستخدامها مؤقتاً)",
    "Tillgångar": "أصول أو ممتلكات",
    "Tillgångsundersökning": "تحقيق في الأصول المالية (للحجز)",
    "Tillkänna - Tillkännager": "يُعلن أو يُشعر",
    "Tillräckliga medel": "موارد مالية كافية",
    "Tillräckliga skäl": "أسباب كافية",
    "Tillståndsenhet": "وحدة التصاريح",
    "Tillsynsbeslut": "قرار رقابي",
    "Tilltalad": "المتهم (في قضية جنائية)",
    "Tillträdesdag": "يوم استلام العقار (نقل الحيازة)",
    "Tillträdesförbud": "أمر منع الدخول (للملاعب أو المحلات)",
    "Tingsrätt": "المحكمة الابتدائية",
    "Tingsrätter TR": "المحاكم الابتدائية",
    "Tjänande fastighet": "العقار الخادم (المتحمل لحق الارتفاق)",
    "Tjänsteställe": "مكان العمل الرسمي",
    "Tolk": "مترجم شفوي",
    "Tolkanläggning": "جهاز أو نظام للترجمة",
    "Tolked": "قسم الترجمة",
    "Tolktaxa": "أجرة المترجم",
    "Tolkuppdrag": "مهمة ترجمة",
    "Tomträtt": "حق انتفاع بالأرض (استئجار طويل الأمد من البلدية)",
    "Tomträttsavgäld": "رسوم حق الانتفاع بالأرض",
    "Tomträttshavaren": "صاحب حق الانتفاع بالأرض",
    "Torped": "قاتل مأجور أو محصل ديون بالعنف",
    "Tradera": "يسلم (الشيء المباع)",
    "Tradition": "تسليم الحيازة (شرط لنقل الملكية للمنقولات)",
    "Trafikbrottslagen": "قانون الجرائم المرورية",
    "Trakt": "منطقة أو بدل سفر (بدل يومي)",
    "Transitenheten": "وحدة الترانزيت (للاجئين)",
    "Transporttjänst": "خدمة النقل",
    "Transportör": "ناقل (شركة نقل)",
    "Tredimensionell fastighetsbildning": "تشكيل عقاري ثلاثي الأبعاد (شقق تمليك)",
    "Tredje arvsklassen": "الطبقة الثالثة من الورثة (الأعمام والعمات)",
    "Tro och heder": "بشرف وأمانة",
    "Trolöshet vid förhandling med främmande makt": "خيانة الأمانة في التفاوض مع دولة أجنبية",
    "Tryckfrihetsbrott": "جريمة مطبوعات (حرية الصحافة)",
    "Trångmål": "ضائقة أو مأزق",
    "Tull": "جمارك",
    "Tulldatasystem": "نظام البيانات الجمركي",
    "Tullexpedition": "مكتب جمركي"
};

let updatedCount = 0;

dictionaryData.forEach((entry) => {
    const type = (entry[COL_TYPE] || '').trim();
    const word = entry[COL_SWE];
    const currentDef = entry[COL_ARB_DEF] || '';

    // Mapping for duplicate handling
    const definitionMap = {
        "Taxeringsenhet": "وحدة التقييم الضريبي (للعقار)",
        "Tidsdelat boende": "سكن الوقت المشترك",
        "Testator": "الموصي",
        "Tillgångsundersökning": "تحقيق الأصول"
    };

    if (type === 'JuridikS.' && !currentDef.trim()) {
        if (arabicDefinitions[word]) {
            entry[COL_ARB_DEF] = arabicDefinitions[word];
            updatedCount++;
            console.log(`✅ ${word}`);
        } else if (definitionMap[word]) {
            entry[COL_ARB_DEF] = definitionMap[word];
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
