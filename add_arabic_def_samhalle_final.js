/**
 * Add Arabic definitions for Samhälle (Society) terms - Final Batch (78 remaining)
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

// Arabic definitions for Samhälle terms - Final Batch
const arabicDefinitions = {
    "Uppsagd": "موظف تم إنهاء عقده",
    "Uppsägning på grund av arbetsbrist": "فصل بسبب نقص الحاجة للعمالة",
    "Uppsägning på grund av arbetstagarens personliga förhållanden": "فصل بسبب ظروف شخصية للموظف",
    "Urngrav": "قبر لوضع جرة رماد المتوفى",
    "Utbildningsbevis": "شهادة إتمام برنامج تعليمي",
    "Utbildningsdepartementet": "وزارة التعليم والبحث العلمي",
    "Utbildningskontrakt": "عقد لإكمال التعليم الثانوي",
    "Utbildningssystem": "هيكل ونظام التعليم في البلاد",
    "Utgående moms": "ضريبة القيمة المضافة على المبيعات",
    "Utredningsanmälan": "طلب إجراء تحقيق رسمي",
    "Utrikesdepartementet": "وزارة الخارجية السويدية",
    "Utskott": "لجنة برلمانية متخصصة",
    "Utskottsbetänkanden": "تقارير وتوصيات اللجان البرلمانية",
    "Utvecklingsanställning": "توظيف لتطوير مهارات الشباب",
    "Utvidgad tillfällig föräldrapenning": "تمديد تعويض الوالدين المؤقت",
    "Validering": "تقييم ومعادلة المؤهلات الأجنبية",
    "Vallagen": "القانون المنظم للانتخابات",
    "Varaktig arbetsbrist": "نقص مستمر في فرص العمل",
    "Varningstriangel": "مثلث تحذير يوضع عند الحوادث",
    "Veckovila": "راحة أسبوعية إجبارية للعمال",
    "Vederlagsreglerna": "قواعد التعويض عن الممتلكات",
    "Verklighetsuppfattning": "إدراك وفهم الواقع",
    "Verkställande makt": "السلطة المسؤولة عن تنفيذ القوانين",
    "Veteranfordon": "سيارات قديمة ذات قيمة تاريخية",
    "Vice ordförande": "نائب رئيس المجلس أو الجمعية",
    "Vice talmän": "نواب رئيس البرلمان",
    "Vidareutbildningar": "دورات لتطوير المهارات المهنية",
    "Vigselordning": "إجراءات ومراسم عقد الزواج",
    "Vigseltillstånd": "تصريح رسمي لعقد الزواج",
    "Vilda strejker": "إضرابات عفوية غير مخطط لها",
    "Villor": "منازل مستقلة لعائلة واحدة",
    "Vinterdäck": "إطارات سيارات مخصصة للشتاء",
    "Vinterväglag": "حالة الطرق في ظروف الشتاء",
    "Vistelsekommun": "البلدية التي يقيم فيها الشخص فعلياً",
    "Vittnen": "أشخاص يشهدون على حدث أو وثيقة",
    "Vård av barn VAB": "إجازة لرعاية طفل مريض",
    "Vårdbidrag": "مساعدة لرعاية طفل ذي إعاقة",
    "Vårdcentraler": "مراكز الرعاية الصحية الأولية",
    "Vårdlöst bidragsbrott": "احتيال بسيط للحصول على إعانات",
    "Vårdnadsöverflytt": "نقل حضانة طفل لشخص آخر",
    "Vårtermin": "الفصل الدراسي الربيعي",
    "Vägmärken": "لافتات وإشارات المرور",
    "Välgörenhet": "أعمال خيرية لمساعدة المحتاجين",
    "Värdepappersfonder": "صناديق استثمار في الأوراق المالية",
    "Växelvis boende": "إقامة الطفل بالتناوب بين والديه",
    "Yrkesfrihet": "حرية اختيار المهنة",
    "Yrkesförarkompetens": "الكفاءة المطلوبة للسائقين المحترفين",
    "Yrkesförarutbildning": "تدريب للحصول على رخصة سائق محترف",
    "Yrkesintroduktionsanställningar YA": "توظيف للتعريف بالمهنة للشباب",
    "Yrkeskompetensbedömning": "تقييم المهارات المهنية",
    "Yrkeskompetensbevis YKB": "شهادة كفاءة للسائقين المحترفين",
    "Yrkesprogram": "برنامج ثانوي للتدريب المهني",
    "Yttrande och meddelarfrihet för tjänstemän": "حرية الموظفين في التعبير والإبلاغ",
    "Yttrandefrihetsgrundlagen YGL": "القانون الأساسي لحرية التعبير",
    "Ålderspensionsavgift": "اشتراك التقاعد المتعلق بالسن",
    "Åldersvillkor": "شروط تتعلق بالعمر",
    "Års regeln": "قاعدة سن التقاعد",
    "Årsavgift": "رسم سنوي مستحق",
    "Årsredovisningar": "التقارير المالية السنوية",
    "Åsiktsregistrering": "تسجيل آراء الناس السياسية",
    "Återinsjuknanderegeln": "قاعدة العودة للمرض نفسه",
    "Återställningsbidrag": "منحة لإعادة المسكن لحالته الأصلية",
    "Ägarförbehåll": "شرط احتفاظ البائع بالملكية حتى السداد",
    "Ägarlägenheter": "شقق يملكها ساكنوها مباشرة",
    "ÄktB - Äktenskapsbalken": "مجموعة قوانين الزواج",
    "Äktenskap": "رباط قانوني بين شخصين",
    "Äktenskapsregister": "سجل رسمي لعقود الزواج",
    "Äldreboende": "مسكن خاص لكبار السن",
    "Äldreförsörjningsstöd": "دعم معيشي لكبار السن ذوي الدخل المنخفض",
    "Ämneslärare": "معلمون متخصصون في مواد معينة",
    "Ämnesplaner": "المناهج الدراسية للمواد",
    "Änkepension": "معاش للأرملة بعد وفاة زوجها",
    "Ärvdabalken ÄB": "مجموعة قوانين الميراث",
    "Öppen fritidsverksamhet": "أنشطة ترفيهية مفتوحة للجميع",
    "Öppen vård": "رعاية صحية دون إقامة في المستشفى",
    "Överhoppningsbar tid": "فترة يمكن تجاوزها في الحسابات",
    "Överskjutande skatt": "ضريبة مدفوعة زيادة تُسترد",
    "Överskott": "فائض في الميزانية أو الإنتاج"
};

let updatedCount = 0;

dictionaryData.forEach((entry) => {
    const type = (entry[COL_TYPE] || '').trim();
    const word = entry[COL_SWE];
    const currentDef = entry[COL_ARB_DEF] || '';

    if (type === 'Samhälle.' && !currentDef.trim() && arabicDefinitions[word]) {
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
