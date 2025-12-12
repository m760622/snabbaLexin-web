/**
 * Add examples to OTHERS (Samhälle) terms - Batch 9 (Final 74 terms: Utbildningsbevis to Överskott)
 * Carefully matching IDs from others_pending_batch.json
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin030141": ["Du får ett utbildningsbevis efter kursen.", "ستحصل على شهادة تدريب بعد الدورة."],
    "Lexin030143": ["Utbildningsdepartementet ansvarar för skolan.", "وزارة التعليم مسؤولة عن المدرسة."],
    "Lexin030144": ["Skriva på ett utbildningskontrakt för lärlingsplats.", "توقيع عقد تدريب لمكان التلمذة المهنية."],
    "Lexin030146": ["Det svenska utbildningssystemet är avgiftsfritt.", "نظام التعليم السويدي مجاني."],
    "Lexin030228": ["Redovisa utgående moms vid försäljning.", "الإقرار بضريبة القيمة المضافة الصادرة (المحصلة) عند البيع."],
    "Lexin030339": ["Göra en utredningsanmälan till Försäkringskassan.", "تقديم بلاغ تحقيق (Utredningsanmälan) إلى صندوق التأمين."],
    "Lexin030345": ["Utrikesdepartementet (UD) sköter utrikespolitiken.", "وزارة الخارجية (UD) تدير السياسة الخارجية."],
    "Lexin030382": ["Riksdagen har 15 utskott.", "البرلمان لديه 15 لجنة."],
    "Lexin030383": ["Utskottsbetänkanden ligger till grund för beslut.", "تقارير اللجان تشكل أساس القرارات."],
    "Lexin030462": ["Få en utvecklingsanställning via Samhall.", "الحصول على توظيف تطوير عبر Samhall."],
    "Lexin030473": ["Ansöka om utvidgad tillfällig föräldrapenning.", "طلب نقدية الوالدين المؤقتة الموسعة."],
    "Lexin030575": ["Göra en validering av utländska betyg.", "إجراء معادلة (تصديق/تقييم) للدرجات الأجنبية."],
    "Lexin030583": ["Vallagen styr hur valet går till.", "قانون الانتخابات يحكم كيفية إجراء الانتخابات."],
    "Lexin030686": ["Uppsägning på grund av varaktig arbetsbrist.", "الفصل بسبب نقص العمل الدائم."],
    "Lexin030739": ["Sätt ut en varningstriangel vid olycka.", "ضع مثلث تحذير عند وقوع حادث."],
    "Lexin030827": ["Alla har rätt till 36 timmars veckovila.", "الجميع لديهم الحق في 36 ساعة راحة أسبوعية."],
    "Lexin030840": ["Vederlagsreglerna vid bodelning.", "قواعد التعويض (Vederlag) عند تقسيم الممتلكات."],
    "Lexin030898": ["Hasch kan påverka din verklighetsuppfattning.", "الحشيش يمكن أن يؤثر على إدراك الشخص للواقع."],
    "Lexin030916": ["Regeringen har den verkställande makten.", "الحكومة تمتلك السلطة التنفيذية."],
    "Lexin030940": ["En bil äldre än 30 år är ett veteranfordon.", "السيارة الأقدم من 30 عاماً هي مركبة قديمة (تراثية)."],
    "Lexin030965": ["Hon valdes till vice ordförande.", "انتخبت نائبة للرئيس."],
    "Lexin030966": ["Riksdagen har tre vice talmän.", "البرلمان لديه ثلاثة نواب للرئيس."],
    "Lexin030987": ["Gå vidareutbildningar för att höja kompetensen.", "الالتحاق بدورات تدريبية متقدمة لرفع الكفاءة."],
    "Lexin031028": ["Följa Svenska kyrkans vigselordning.", "اتباع نظام الزواج في الكنيسة السويدية."],
    "Lexin031029": ["Prästen måste ha vigseltillstånd.", "يجب أن يكون لدى الكاهن تصريح زواج (حق عقد القران)."],
    "Lexin031053": ["Det utbröt vilda strejker på fabriken.", "اندلعت إضرابات غير قانونية (وحشية) في المصنع."],
    "Lexin031087": ["Goda grannar i området med villor.", "جيران طيبون في منطقة الفيلات."],
    "Lexin031156": ["Du måste ha vinterdäck på vintern.", "يجب أن يكون لديك إطارات شتوية في الشتاء."],
    "Lexin031161": ["Kör försiktigt, det är vinterväglag.", "قد بحذر، الطريق في حالة شتوية (زلق)."],
    "Lexin031232": ["Vistelsekommunen ansvarar för akut hjälp.", "بلدية الإقامة (المؤقتة) مسؤولة عن المساعدة العاجلة."],
    "Lexin031265": ["Två vittnen såg olyckan.", "شاهدان رأيا الحادث."],
    "Lexin031410": ["Vara hemma för vård av barn (VAB).", "البقاء في المنزل لرعاية الطفل (VAB)."],
    "Lexin031418": ["Få vårdbidrag för barn med funktionsnedsättning.", "الحصول على منحة رعاية لطفل ذي إعاقة."],
    "Lexin031422": ["Boka tid på vårdcentralen.", "حجز موعد في المركز الصحي."],
    "Lexin031428": ["Dömdes för vårdlöst bidragsbrott.", "أدين بجريمة احتيال في المساعدات عن إهمال."],
    "Lexin031436": ["Begära vårdnadsöverflytt till familjehemmet.", "طلب نقل الحضانة إلى الأسرة الحاضنة."],
    "Lexin031453": ["Vårterminen slutar i juni.", "الفصل الدراسي الربيعي ينتهي في يونيو."],
    "Lexin031495": ["Följ vägmärkena.", "اتبع إشارات المرور."],
    "Lexin031534": ["Skänka pengar till välgörenhet.", "التبرع بالمال للأعمال الخيرية."],
    "Lexin031613": ["Spara pengar i värdepappersfonder.", "ادخار المال في صناديق استثمار الأوراق المالية."],
    "Lexin031742": ["Barnet har växelvis boende hos föräldrarna.", "الطفل لديه سكن متناوب عند الوالدين."],
    "Lexin031808": ["Yrkesfrihet innebär rätt att välja jobb.", "حرية المهنة تعني الحق في اختيار العمل."],
    "Lexin031809": ["Krav på yrkesförarkompetens (YKB).", "متطلبات كفاءة السائق المهني (YKB)."],
    "Lexin031810": ["Gå en yrkesförarutbildning för lastbil.", "الالتحاق بتدريب سائق مهني للشاحنات."],
    "Lexin031813": ["Unga kan få yrkesintroduktionsanställningar (YA).", "يمكن للشباب الحصول على وظائف مقدمة مهنية (YA)."],
    "Lexin031814": ["Göra en yrkeskompetensbedömning.", "إجراء تقييم للكفاءة المهنية."],
    "Lexin031815": ["Du måste förnya ditt yrkeskompetensbevis (YKB).", "يجب عليك تجديد شهادة الكفاءة المهنية (YKB) الخاصة بك."],
    "Lexin031821": ["Välja ett yrkesprogram på gymnasiet.", "اختيار برنامج مهني في المدرسة الثانوية."],
    "Lexin031853": ["Tjänstemän har yttrande- och meddelarfrihet.", "الموظفون لديهم حرية التعبير وحرية الإبلاغ (عن المخالفات)."],
    "Lexin031856": ["Grundlagen YGL skyddar yttrandefriheten.", "القانون الأساسي YGL يحمي حرية التعبير."],
    "Lexin031937": ["Arbetsgivaren betalar ålderspensionsavgift.", "يدفع صاحب العمل رسوم معاش الشيخوخة."],
    "Lexin031940": ["Uppfylla åldersvillkoret för pension.", "استيفاء شرط السن للمعاش."],
    "Lexin031977": ["Femårsregeln kallas ibland årsregeln.", "تسمى قاعدة الخمس سنوات أحياناً قاعدة السنوات."], // Contextual adaptation
    "Lexin031978": ["Betala årsavgift till föreningen.", "دفع الرسوم السنوية للجمعية."],
    "Lexin031984": ["Företag måste lämna in årsredovisningar.", "يجب على الشركات تقديم تقارير سنوية."],
    "Lexin031994": ["Åsiktsregistrering är förbjudet i grundlagen.", "تسجيل الآراء (السياسية) محظور في الدستور."],
    "Lexin032069": ["Återinsjuknanderegeln gäller inom 5 dagar.", "قاعدة تكرار المرض تسري خلال 5 أيام."],
    "Lexin032089": ["Söka återställningsbidrag för att ta bort anpassning.", "طلب منحة إعادة (الهيئة الأصلية) لإزالة التكييف (في المنزل)."],
    "Lexin032149": ["Sälja varan med ägarförbehåll (kreditköp).", "بيع السلعة مع الاحتفاظ بالملكية (حتى السداد)."],
    "Lexin032151": ["Köpa en ägarlägenhet (ovanligt i Sverige).", "شراء شقة تمليك (نموذج غير شائع في السويد)."],
    "Lexin032182": ["Reglerna står i Äktenskapsbalken (ÄktB).", "القواعد موجودة في قانون الزواج (ÄktB)."],
    "Lexin032184": ["Ingå äktenskap.", "عقد الزواج."],
    "Lexin032193": ["Äktenskapsregistret förs av Skatteverket.", "يُحتفظ بسجل الزواج من قبل مصلحة الضرائب."],
    "Lexin032199": ["Mormor flyttade till ett äldreboende.", "انتقلت الجدة إلى دار رعاية المسنين."],
    "Lexin032200": ["Äldreförsörjningsstöd för fattigpensionärer.", "دعم إعالة المسنين للمتقاعدين الفقراء."],
    "Lexin032228": ["Hon är ämneslärare i matte och NO.", "هي معلمة مادة في الرياضيات والعلوم."],
    "Lexin032232": ["Följa ämnesplanerna i undervisningen.", "اتباع خطط المواد الدراسية في التدريس."],
    "Lexin032262": ["Änkepension finns kvar i vissa fall.", "معاش الأرملة لا يزال موجوداً في بعض الحالات."],
    "Lexin032310": ["Arv regleras i Ärvdabalken (ÄB).", "ينظم الميراث في قانون الميراث (ÄB)."],
    "Lexin032408": ["Ungdomsgården har öppen fritidsverksamhet.", "مركز الشباب لديه أنشطة ترفيهية مفتوحة."],
    "Lexin032413": ["Öppen vård betyder att du inte blir inlagd.", "الرعاية المفتوحة تعني أنك لا تُحتجز (تنام) في المستشفى."],
    "Lexin032552": ["Överhoppningsbar tid i arbetslöshetsförsäkringen (studier).", "وقت قابل للتجاوز في تأمين البطالة (الدراسة)."],
    "Lexin032634": ["Få tillbaka överskjutande skatt.", "استرداد الضريبة الزائدة."],
    "Lexin032636": ["Föreningen gjorde ett överskott.", "حققت الجمعية فائضاً."]
};

let content = fs.readFileSync(DATA_FILE, 'utf8');
const match = content.match(/const\s+dictionaryData\s*=\s*(\[[\s\S]*\]);/);
if (!match) { console.error('Error'); process.exit(1); }

let data = eval(match[1]);
console.log(`Loaded ${data.length} entries`);

let updated = 0;
for (let i = 0; i < data.length; i++) {
    if (examples[data[i][0]]) {
        data[i][7] = examples[data[i][0]][0];
        data[i][8] = examples[data[i][0]][1];
        updated++;
    }
}

console.log(`\n📊 Updated ${updated} entries\n`);

const backupPath = DATA_FILE + '.backup_others9_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Others Batch 9 (Final) completed!`);
