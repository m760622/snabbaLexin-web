/**
 * Add Arabic definitions for JuridikS terms - Batch 19
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

// Arabic definitions for JuridikS terms - Batch 19
const arabicDefinitions = {
    "Valrätt": "حق الاختيار (للقانون الواجب التطبيق)",
    "Valutalagen": "قانون العملة والصرف",
    "Vandelsprövning": "فحص السيرة والسلوك (للحصول على ترخيص)",
    "Vanlig handräckning": "إجراء تنفيذي عادي (لاستعادة حيازة أو تحصيل دين)",
    "Vanvård av djur": "إهمال رعاية الحيوان (سوء معاملة)",
    "Varumärkesintrång": "انتهاك العلامة التجارية",
    "Vedergällningsteorier": "نظريات القصاص (العقوبة كانتقام)",
    "Vederlag": "مقابل (عوض مالي أو عيني)",
    "Vederlagsregel": "قاعدة التعويض (في تقسيم الممتلكات)",
    "Vederlagsreglerna": "قواعد التعويض",
    "Vederlägger": "يفند أو يدحض (دليلاً أو حجة)",
    "Verksamhetstid": "مدة النشاط",
    "Verkställande direktör VD": "المدرير التنفيذي (CEO)",
    "Verkställighetsbeslut": "قرار التنفيذ",
    "Verkställighetsstadiet": "مرحلة التنفيذ (تنفيذ الحكم)",
    "Vett och vilja": "إرادة ووعي (كامل القوى العقلية)",
    "Vett och Vilja": "بكامل الوعي والإرادة",
    "Vid vite": "تحت طائلة الغرامة التهديدية",
    "Videoinspelade förhör": "استجوابات مسجلة بالفيديو",
    "Videokonferens": "مؤتمر فيديو (للمحاكمة عن بعد)",
    "Vidvite": "غرامة تهديدية (لتنفيذ أمر)",
    "Vigsel": "عقد القران (الزواج)",
    "Vigselförrättare": "مأذون (مدني أو ديني لإجراء الزواج)",
    "Villkor i testamente": "شرط في الوصية",
    "Villkor vid gåva": "شرط مقترن بالهبة",
    "Villkor vid testamente": "شروط الوصية",
    "Vinst": "ربح",
    "Vinstsyfte": "غرض الربح (تجاري)",
    "Viseringskrav": "شرط التأشيرة (الفيزا)",
    "Viseringstid": "مدة صلاحية التأشيرة",
    "Viskningstolkning": "ترجمة همسية",
    "Vistas legalt": "يقيم بصورة قانونية",
    "Vistelseort": "مكان الإقامة الحالية",
    "Vittna": "يشهد (يدلي بشهادة)",
    "Vittnesattest": "شهادة خطية للشاهد",
    "Våld eller hot mot tjänsteman": "الاعتداء أو التهديد لموظف عام",
    "Våldsamt motstånd": "مقاومة عنيفة (للاعتقال)",
    "Våldsamt upplopp": "شغب عنيف",
    "Våldsskildring": "تصوير العنف (جريمة إذا كانت غير قانونية)",
    "Våldtäkt": "اغتصاب",
    "Våldtäkt mot barn": "اغتصاب طفل",
    "Vålla": "يتسبب في (ضرر أو حادث)",
    "Vållande till - ex. annans död": "التسبب في (مثل موت آخر)",
    "Vållande till kroppsskada eller sjukdom": "التسبب في أذى جسدي أو مرض (عن إهمال)",
    "Vållande till miljöförstörelse": "التسبب في تدمير البيئة",
    "Vård av missbrukare": "رعاية المدمنين (قسرياً أو طوعاً)",
    "Vård inom socialtjänsten": "الرعاية ضمن الخدمات الاجتماعية",
    "Vårdlös finansiering av mutbrott": "التمويل المتهور للرشوة",
    "Vårdnad": "حضانة (ولاية قانونية على الطفل)",
    "Vårdnadshavare": "ولي الأمر (صاحب حق الحضانة)",
    "Vårdslöhet med narkotika": "إهمال في التعامل مع المخدرات",
    "Vårdslös skatteredovisning": "إقرار ضريبي متهور (غير دقيق)",
    "Vårdslös skatteuppgift": "بيان ضريبي غير دقيق عن إهمال",
    "Vårdslöshet ( culpa )": "إهمال (Culpa)",
    "Vårdslöshet i trafiken": "التهور في القيادة (إهمال مروري)",
    "Vårdslöshet med gift eller smittämnen": "إهمال في التعامل مع السموم أو المواد المعدية",
    "Vårdslöshet med gift och smittämne": "التعامل المتهور مع السموم والعدوى",
    "Vårdslöshet med hemlig uppgift": "إفشاء أسرار عن غير قصد (إهمال)",
    "Vårdslöshet mot borgenär": "الإهمال تجاه الدائنين (تبديد الأموال)",
    "Vårdvistelse": "فترة الإقامة للعلاج",
    "Väpnat hot": "تهديد بالسلاح",
    "Väpnat hot mot laglig ordning": "تهديد مسلح للنظام القانوني",
    "Värde konfiskation": "مصادرة القيمة (بدل الشيء)",
    "Värdekonfiskation": "مصادرة القيمة",
    "Värja ( sig )": "يدافع عن نفسه",
    "Växelvis boende": "سكن متنقل (بالتتناوب بين الوالدين)",
    "Yppandeförbud": "حظر النشر أو الإفشاء (السرية)",
    "Yrkespraxis": "ممارسة مهنية (عرف مهني)",
    "Yttersta vilja": "الوصية الأخيرة",
    "Yttrandefrihetsbrott": "جرائم حرية التعبير (مثل التحريض)",
    "Åhörare": "جمهور (في المحكمة)",
    "Åklagarbrott": "خطأ إملائي - ربما جريمة يرتكبها المدعي العام أو ضد المدعي العام. ولكن السياق يقترح Åklagarbeslut? Or crimes processed by prosecutor. Skipping ambiguous term.",
    // Safe translation if it appears
    "Åklagarbrott": "جريمة تتعلق بالادعاء العام (مبهم)",
    "Åklagardistrikt": "دائرة النيابة العامة",
    "Åklagarkammare": "مكتب المدعي العام (غرفة النيابة)",
    "Åklagarväsendet": "سلك النيابة العامة",
    "Åliggande": "واجب أو مسؤولية",
    "Ålägger": "يأمر أو يلزم",
    "Återbetalningsskyldig": "ملزم برد المبلغ (السداد)",
    "Återförsäljaravtal": "عقد وكيل توزيع (موزع معتمد)",
    "Återkalla": "يسحب (اعترافاً) أو يلغي (توكيلاً)",
    "Återkallelse av tillstånd": "سحب الترخيص أو التصريح",
    "Återreseförbud": "منع العودة (للبلد)",
    "Återställande av försutten tid": "إعادة المهلة (قبول الطعن بعد فوات الأوان لعذر)",
    "Återtransport": "إعادة النقل (الترحيل)",
    "Återvinning": "استرداد (الأموال في الإفلاس) أو تدوير",
    "Återvinning vid konkurs": "استرداد الأموال للتفليسة (إبطال تصرفات المدين)",
    "Ägarhypotek": "رهن الملكية (سند رهن يحتفظ به المالك)",
    "Ägarlägenhetsfastighet": "عقار شقق التمليك",
    "Äggdonation": "تبرع بالبويضات",
    "Äkta underlåtenhet": "امتناع صرف (جريمة بالامتناع)",
    "Äktenskapsbalken": "قانون الزواج",
    "Äktenskapscertifikat": "وثيقة زواج",
    "Äktenskapsförord": "اتفاق مالي بين الزوجين (فصل الأموال)",
    "Äktenskapsregister": "سجل الزواج"
};

let updatedCount = 0;

dictionaryData.forEach((entry) => {
    const type = (entry[COL_TYPE] || '').trim();
    const word = entry[COL_SWE];
    const currentDef = entry[COL_ARB_DEF] || '';

    // Use map to avoid duplicates via object literal
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
