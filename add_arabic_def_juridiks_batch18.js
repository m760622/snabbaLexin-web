/**
 * Add Arabic definitions for JuridikS terms - Batch 18
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

// Arabic definitions for JuridikS terms - Batch 18
const arabicDefinitions = {
    "Tullklarering": "تخليص جمركي",
    "Tullmyndighet": "سلطة الجمارك",
    "Tullmyndigheten": "مصلحة الجمارك (السلطة)",
    "Tulltjänsteman": "موظف جمارك",
    "Tullverket": "مصلحة الجمارك",
    "TUT Tidsbegränsat uppehållstillstånd": "تصريح إقامة مؤقت (TUT)",
    "Tvegifte": "تعدد الأزواج/الزوجات (الجمع بين زوجين)",
    "Tvegifte ( bigami )": "الجمع بين زوجين (Bigami)",
    "Tvegifte och olagligt ingående av äktenskap": "جريمة تعدد الأزواج وعقد الزواج غير القانوني",
    "Tvist ( Tvistemål )": "نزاع (قضية مدنية)",
    "Två parts, mål": "قضايا بين طرفين (مدنية)",
    "Tvåinstansjäv": "عدم صلاحية القاضي لسبق نظر الدعوى في درجة أدنى",
    "Tvång": "إكراه أو قسر",
    "Tvångsarbete": "عمل قسري (سخرة)",
    "Tvångsskifte": "قسمة جبرية (للتركة بواسطة مصفي)",
    "Tvåpartsprocess": "إجراءات بين خصمين (مدعي ومدعى عليه)",
    "Tystnadsplikt": "واجب كتمان الأسرار (السرية المهنية)",
    "Umgänge": "حق الرؤية والزيارة (للأطفال)",
    "Umgängesrätt": "حق التواصل مع الطفل (للوالد غير الحاضن)",
    "Undandra sig lagföring eller straff": "الهروب من العدالة أو تنفيذ العقوبة",
    "Undantag": "استثناء",
    "Undantag från krav på uppehållstillstånd": "إعفاء من شرط تصريح الإقامة",
    "Underhandsackord ( frivilligt )": "صلح ودي مع الدائنين (خارج المحكمة)",
    "Underhåll": "نفقة (إعالة)",
    "Underlåtelse att avvärja allmänfara": "الامتناع عن دفع خطر عام (جريمة سلبية)",
    "Underlåtenhet": "امتناع أو تقصير (عن فعل واجب)",
    "Underlåtenhet ( att avvärja allmän fara )": "التقاعس عن درء خطر عام",
    "Underlåtenhet att avvärja rättsfel": "السكوت عن خطأ قانوني (في الملكية)",
    "Underställning": "عرض الحكم على محكمة أعلى للتصديق (إجراء تلقائي)",
    "Undersökningsledare": "قائد التحقيق الأولي (شرطي أو مدعي عام)",
    "Undersökningsplikt": "واجب الفحص (للمشتري قبل الشراء)",
    "Undertecknat": "موقع (عليه توقيع)",
    "Undertryckande av information": "كتمان المعلومات",
    "Undertryckande av urkund": "إتلاف أو إخفاء مستند (جريمة)",
    "Underåriga": "قاصرون (دون 18 سنة)",
    "Ungbo ( ungdoms boende )": "سكن شبابي",
    "Ungdomsfängelse": "سجن للأحداث (سابقاً)",
    "Ungdomskontrakt": "عقد رعاية المراهق (عقوبة بديلة)",
    "Ungdomstjänst": "خدمة المجتمع للأحداث (عقوبة)",
    "Universell testamentstagare": "موصى له بحصة شائعة (بجزء من التركة)",
    "Uppbörd": "جباية (الضرائب)",
    "Uppbördslagen": "قانون جباية الضرائب (سابقاً)",
    "Uppdrag": "مهمة أو تكليف",
    "Uppdragsavtal": "عقد وكالة (أداء مهمة)",
    "Uppdragsgivare": "الموكل (صاحب العمل)",
    "Uppenbart": "واضح أو جلي (بشكل لا يقبل الشك)",
    "Uppföljningsrapport": "تقرير متابعة",
    "Upphandlingsmyndigheten": "هيئة المشتريات العامة",
    "Upphovsrättsintrång": "انتهاك حقوق الملكية الفكرية",
    "Upplåta": "يمنح حق انتفاع (يؤجر أو يعير)",
    "Upplåta": "يمنح حق الاستخدام",
    "Upplåtelsetiden": "مدة حق الانتفاع",
    "Upplösa": "يحل (شركة أو عقد) أو يفسخ",
    "Uppror": "تمرد أو عصيان مسلح",
    "Uppror": "تمرد",
    "Uppror": "عصيان مسلح",
    "Uppsikt": "رقابة أو إشراف",
    "Uppskovsbelopp": "مبلغ الضريبة المؤجل (عند بيع وشراء سكن)",
    "Uppsåt": "قصد جنائي (نية)",
    "Uppsåt ( dolus )": "القصد الجنائي (Dolus)",
    "Uppviglare": "محرض (على الشغب أو العصيان)",
    "Uppvigling": "تحريض على العصيان (ضد السلطة)",
    "Urkundsförfalskning": "تزوير المحررات والمستندات",
    "Utan obligo": "دون أدنى مسؤولية (شرط عدم الضمان)",
    "Utbildningsnämnd": "لجنة التعليم (في البلدية)",
    "Utbyte": "تبادل أو مقايضة",
    "Utdelningsförslag": "مقترح توزيع الأرباح (أو أموال التفليسة)",
    "Utdelningsförslag": "مقترح التوزيع",
    "Utdelningsprocent": "نسبة التوزيع (للغرماء في الإفلاس)",
    "Utdelningsprocent": "نسبة الحصة",
    "Utevarodom": "حكم غيابي (لعدم حضور الخصم)",
    "Utlämning": "تسليم المجرمين (لدولة أخرى)",
    "Utlämning": "تسليم مطلوبين",
    "Utlämningsärende": "قضية تسليم مجرمين",
    "Utlännings och medborgarskapsmål": "قضايا الأجانب والجنسية",
    "Utlänningskontroll": "مراقبة الأجانب",
    "Utlänningsnämnden": "لجنة شؤون الأجانب (سابقاً)",
    "Utmätning": "حجز تنفيذي (على الأموال لاستيفاء دين)",
    "Utmätning": "حجز تنفيذي",
    "Utmätningsfri egendom": "أموال لا يجوز حجزها (للمعيشة الضرورية)",
    "Utnyttjande av barn för sexuell posering": "استغلال الأطفال في التصوير الجنسي",
    "Utreda brott": "يحقق في جريمة",
    "Utredningsarbete": "عمل التحقيق",
    "Utresa": "مغادرة البلاد",
    "Utrikesdepartementet": "وزارة الخارجية",
    "Utskrivningsprövning": "فحص قرار الإفراج (من الرعاية القسرية)",
    "Utslag i summarisk process": "قرار في القضايا المستعجلة (أمر أداء من الجباية)",
    "Utslussningsåtgärder": "تدابير إعادة الدمج (للسجناء قبل الإفراج)",
    "Utsökningsrätt": "قانون التنفيذ الجبري",
    "Utsökningsrätt": "قانون التنفيذ",
    "Utvandring": "هجرة للخارج",
    "Utveckla sin talan": "توضيح وشرح الدعوى (تقديم التفاصيل)",
    "Utvecklingscentrum": "مركز تطوير (للنيابة العامة)",
    "Utverka": "يستحصل على (قرار أو إذن)",
    "Utvisning": "إبعاد أو طرد (للأجانب)",
    "Utvisning": "ترحيل",
    "Utvisningsärenden": "قضايا الترحيل",
    "Va ( vatten och avlopp ), mål": "قضايا المياه والصرف الصحي",
    "Vad": "استئناف (مصطلح قديم)",
    "Vallning": "معاينة مسرح الجريمة مع المتهم (تمثيل الجريمة)"
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
