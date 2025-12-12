/**
 * Add examples to CONSTRUCTION terms - Batch 10 (100 terms: Friyta to Gatumark)
 * Carefully matching IDs from construction_pending_batch.json
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin008501": ["Anlägga en gräsmatta på friytan.", "إنشاء عشب على المساحة الحرة (أرض فضاء)."],
    "Lexin008511": ["Köra jord med en frontlastare.", "نقل التربة بجرافة أمامية (frontlastare)."],
    "Lexin008519": ["Teglet måste vara frostbeständigt.", "الطوب يجب أن يكون مقاوماً للصقيع."],
    "Lexin008520": ["Gräva ner till frostfritt djup.", "الحفر حتى العمق الخالي من الصقيع."], // Lexin008520 is Frostdjup, but example is similar
    "Lexin008521": ["Lägga rören på frostfritt djup.", "وضع الأنابيب على عمق لا يصله الصقيع."],
    "Lexin008522": ["Reparera en allvarlig frostskada på fasaden.", "إصلاح ضرر صقيع خطير في الواجهة."],
    "Lexin008562": ["Mäta flödet i frånluften.", "قياس التدفق في هواء العادم (frånluft)."],
    "Lexin008611": ["Vätskan är starkt frätande.", "السائل كاوٍ (آكل) جداً."],
    "Lexin008612": ["Skydda ögonen mot frätande ämnen.", "حماية العينين من المواد الكاوية."],
    "Lexin008626": ["Fukt i källaren.", "رطوبة في القبو."],
    "Lexin008628": ["Materialet har god fuktbeständighet.", "المادة لديها مقاومة جيدة للرطوبة."],
    "Lexin008629": ["Mäta virkets fukthalt.", "قياس محتوى الرطوبة في الخشب."],
    "Lexin008632": ["Lägga ett fuktisolerande lager.", "وضع طبقة عازلة للرطوبة."],
    "Lexin008633": ["Kontrollera betongens fuktkvot.", "فحص نسبة الرطوبة في الخرسانة."],
    "Lexin008634": ["Åtgärda fuktproblem i grunden.", "معالجة مشاكل الرطوبة في الأساس."],
    "Lexin008635": ["Sätta upp fuktskydd i badrummet.", "تركيب حماية من الرطوبة في الحمام."],
    "Lexin008636": ["Använda primer som fuktskydd.", "استخدام (primer) طلاء أساس كحماية من الرطوبة."],
    "Lexin008637": ["Fukttåliga skivor i våtutrymmet.", "ألواح مقاومة للرطوبة في المساحات الرطبة."],
    "Lexin008687": ["Grundlägga med fundablock.", "التأسيس باستخدام كتل الأساس (fundablock)."],
    "Lexin008689": ["Gjuta ett stabilt fundament.", "صب أساس ثابت."],
    "Lexin008693": ["Hålla utrustningen i fungerande skick.", "الحفاظ على المعدات في حالة عمل جيدة."],
    "Lexin008708": ["Det blev funktionsfel på hissen.", "حدث عطل وظيفي في المصعد."],
    "Lexin008711": ["Ställa höga funktionskrav på ventilationen.", "وضع متطلبات وظيفية عالية للتهوية."],
    "Lexin008715": ["Systemet har hög funktionssäkerhet.", "النظام يتمتع بموثوقية (أمان وظيفي) عالية."],
    "Lexin008716": ["Taket har lång funktionstid.", "السقف له عمر وظيفي طويل."],
    "Lexin008734": ["Golvtiljor av massiv furu.", "ألواح أرضية من الصنوبر الصلب."],
    "Lexin008736": ["Kläda väggen med furuplywood.", "تكسية الجدار ببليود الصنوبر."],
    "Lexin008737": ["Använda tryckimpregnerat furuvirke.", "استخدام خشب صنوبر معالج بالضغط."],
    "Lexin008749": ["Köra dit fyll för att höja tomten.", "نقل ردم (fyll) لرفع مستوى الأرض."],
    "Lexin008751": ["Fylla ut gropen med grus.", "ردم الحفرة بالحصى."],
    "Lexin008760": ["Använda sand som fyllnadsmaterial.", "استخدام الرمل كمادة ردم."],
    "Lexin008761": ["Markera ut fyllnadsområdet.", "تحديد منطقة الردم."],
    "Lexin008762": ["Plana ut fyllningsområdet.", "تسوية منطقة الردم."],
    "Lexin008775": ["Gjuta en fyrkantig pelare.", "صب عمود مربع."],
    "Lexin008788": ["Den fysiska arbetsmiljön.", "بيئة العمل المادية."],
    "Lexin008791": ["Minska den fysiska belastningen.", "تقليل الحمل البدني."],
    "Lexin008857": ["Göra fältprovning av jorden.", "إجراء اختبار ميداني للتربة."],
    "Lexin008858": ["Starta med en fältundersökning.", "البدء بمسح (تحقيق) ميداني."],
    "Lexin008874": ["Skydda den färdiga ytan.", "حماية السطح النهائي."],
    "Lexin008876": ["Leverans av färdigblandad betong.", "توصيل خرسانة جاهزة الخلط."],
    "Lexin008878": ["Besiktning vid färdigställande.", "فحص عند الإنجاز."],
    "Lexin008879": ["Färdigställande år är 2025.", "سنة الإنجاز هي 2025."],
    "Lexin008880": ["Kort färdigställandetid.", "وقت إنجاز قصير."],
    "Lexin008881": ["En färdigställd byggnad.", "مبنى منجز."],
    "Lexin008893": ["Putsa fasaden med färgad puts.", "لياسة الواجهة بملاط ملون."],
    "Lexin008899": ["Ange färgkoden för väggen.", "حدد كود اللون للجدار."],
    "Lexin008902": ["Måla upp ett färgprov.", "طلاء عينة لون."],
    "Lexin008903": ["Måla taket med färgspruta.", "طلاء السقف بمسدس رش."],
    "Lexin008954": ["Detta är ett följdkrav av ändringen.", "هذا متطلب ناتج عن التغيير."],
    "Lexin008966": ["Montera nya fönster.", "تركيب نوافذ جديدة."],
    "Lexin008967": ["Ställa blommor på fönsterbrädan.", "وضع الزهور على عتبة النافذة."],
    "Lexin008968": ["Måla fönsterbågen.", "طلاء إطار النافذة (الدرفة)."],
    "Lexin008969": ["Byta fönsterkitt.", "تغيير معجون النافذة."],
    "Lexin008999": ["Kranens förare var skicklig.", "سائق الرافعة كان ماهراً."],
    "Lexin009012": ["Hämta plåster i förbandslådan.", "جلب لاصق جروح من صندوق الإسعافات الأولية."],
    "Lexin009034": ["Vi ska ha förbesiktning imorgon.", "سنجري فحصاً أولياً غداً."],
    "Lexin009035": ["Notera anmärkningar i förbesiktningsprotokollet.", "تدوين الملاحظات في محضر الفحص الأولي."],
    "Lexin009043": ["Förstärka förbindelsepunkten.", "تقوية نقطة الاتصال."],
    "Lexin009044": ["Dra åt förbindelseskruven.", "شد برغي الوصل."],
    "Lexin009062": ["Beställa mer förbrukningsmaterial.", "طلب المزيد من المواد الاستهلاكية."],
    "Lexin009063": ["Detta räknas som en förbrukningsvara.", "هذه تعتبر سلعة استهلاكية."],
    "Lexin009070": ["Vädra ut förbränningsgaser.", "تهوية غازات الاحتراق."],
    "Lexin009076": ["Sätta upp en förbudsskylt.", "وضع لافتة منع."],
    "Lexin009079": ["Förbättra isoleringen i taket.", "تحسين العزل في السقف."],
    "Lexin009083": ["Föreslå en förbättringsåtgärd.", "اقتراح إجراء تحسين."],
    "Lexin009088": ["Göra en fördelning av kostnaderna.", "عمل توزيع للتكاليف."],
    "Lexin009162": ["Använda förenklad dimensionering för stugan.", "استخدام تصميم مبسط للكوخ."],
    "Lexin009168": ["Följa Boverkets föreskrift.", "اتباع لوائح Boverket."],
    "Lexin009198": ["Kontakta företagshälsovården.", "الاتصال بالصحة المهنية (طب العمل)."],
    "Lexin009199": ["Ett gott företagsklimat.", "مناخ عمل جيد في الشركة."],
    "Lexin009201": ["Vi har en stark företagskultur.", "لدينا ثقافة شركة قوية."],
    "Lexin009202": ["Många nöjda företagskunder.", "العديد من عملاء الشركات الراضين."],
    "Lexin009203": ["Visa din företagslegitimation (ID06).", "أظهر هوية الشركة الخاصة بك."],
    "Lexin009295": ["Förhandla om priset.", "التفاوض على السعر."],
    "Lexin009428": ["Kabeln ligger på 70 cm förläggningsdjup.", "الكابل يقع على عمق تمديد 70 سم."],
    "Lexin009459": ["Förminska ritningen till skala 1:100.", "تصغير الرسم إلى مقياس 1:100."],
    "Lexin009514": ["Regeringen utfärdade en ny förordning.", "أصدرت الحكومة مرسوماً جديداً."],
    "Lexin009522": ["Minska risken för förorening.", "تقليل خطر التلوث."],
    "Lexin009523": ["Sanera marken från föroreningar.", "تطهير الأرض من الملوثات."],
    "Lexin009571": ["Projektet fick en veckas försening.", "المشروع تأخر لمدة أسبوع."],
    "Lexin009626": ["Balkar av förspänd betong.", "عوارض من الخرسانة سابقة الإجهاد."],
    "Lexin009655": ["Göra en förstudie innan bygget.", "إجراء دراسة أولية قبل البناء."],
    "Lexin009668": ["Gjuta plattan i förstärkt betong.", "صب البلاطة بخرسانة مسلحة (مقواة)."],
    "Lexin009675": ["Han var försumlig med säkerheten.", "كان مهملاً في السلامة."],
    "Lexin009719": ["Teckna en försäkring.", "التوقيع على تأمين."],
    "Lexin009727": ["Ha ett fullgott försäkringsskydd.", "الحصول على تغطية تأمينية كافية."],
    "Lexin009731": ["Starta försäljning av lägenheterna.", "بدء بيع الشقق."],
    "Lexin009739": ["Använda en försänkare till skruvhålet.", "استخدام (riimer) مخروط التوسيع لثقب البرغي."],
    "Lexin009759": ["Bygga ut försörjningssystemet.", "توسيع شبكة الإمدادات (المرافق)."],
    "Lexin009760": ["Göra en förtagning i regeln.", "عمل نقر (förtagning) في العارضة."],
    "Lexin009848": ["Lämna fastigheten till förvaltning.", "تسليم العقار للإدارة."],
    "Lexin009850": ["Hon är förvaltningschef.", "هي مديرة الإدارة."],
    "Lexin009910": ["Ha höga förväntningar på resultatet.", "لديه توقعات عالية للنتيجة."],
    "Lexin009967": ["Lyfta pallen med gaffeltruck.", "رفع البليت برافعة شوكية."],
    "Lexin010041": ["Kalla till garantibesiktning efter två år.", "الدعوة لفحص الضمان بعد عامين."],
    "Lexin010044": ["Ingå avtal om garantiskötsel av parken.", "إبرام عقد صيانة الضمان للحديقة."],
    "Lexin010067": ["Värma tältet med en gasolvärmare.", "تدفئة الخيمة بمدفأة غاز."],
    "Lexin010078": ["Byta lampa i gatlyktan.", "تغيير المصباح في عمود الإنارة."],
    "Lexin010079": ["Sätta gatsten på torget.", "رصف الساحة بحجر الرصف."],
    "Lexin010081": ["Bygga på kommunens gatumark.", "البناء على أرض الشارع التابعة للبلدية."]
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

const backupPath = DATA_FILE + '.backup_construction10_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Construction Batch 10 completed!`);
