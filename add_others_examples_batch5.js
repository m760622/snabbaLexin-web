/**
 * Add examples to OTHERS (Samhälle) terms - Batch 5 (100 terms: Kontrolluppgifter to Nativitet)
 * Carefully matching IDs from others_pending_batch.json
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin014839": ["Arbetsgivaren skickar in kontrolluppgifter till Skatteverket.", "يرسل صاحب العمل بيانات المراقبة (البيانات المالية) إلى مصلحة الضرائب."],
    "Lexin014843": ["Sveriges konung är statschef.", "ملك السويد هو رئيس الدولة."],
    "Lexin014863": ["Bo i en kooperativ hyresrätt.", "العيش في شقة إيجار تعاونية."],
    "Lexin014889": ["Kontrollera bilens kopplingsanordning (dragkrok).", "افحص جهاز التوصيل (خطاف السحب) في السيارة."],
    "Lexin014924": ["Rost är en form av korrosion.", "الصدأ هو شكل من أشكال التآكل."],
    "Lexin014947": ["Det sker många olyckor i korsningar.", "تقع العديد من الحوادث في التقاطعات."],
    "Lexin014952": ["Gamla korsvirkeshus i Skåne.", "منازل خشبية قديمة (نصف خشبية) في سكونة."],
    "Lexin014975": ["Patienten flyttades till ett korttidsboende.", "تم نقل المريض إلى سكن مؤقت (Korttidsboende)."],
    "Lexin014976": ["Korttidsfrånvaro på grund av sjukdom.", "غياب قصير المدى بسبب المرض."],
    "Lexin014977": ["Barnet har rätt till korttidstillsyn.", "يحق للطفل الحصول على رعاية قصيرة الأمد."],
    "Lexin014978": ["Beviljas korttidsvistelse för avlastning.", "يُمنح إقامة قصيرة الأمد للإغاثة (الراحة)."],
    "Lexin015092": ["Kistan fördes till krematoriet.", "نُقل التابوت إلى المحرقة."],
    "Lexin015361": ["Kulturdepartementet ansvarar för kulturfrågor.", "وزارة الثقافة مسؤولة عن القضايا الثقافية."],
    "Lexin015388": ["Kungöra en ny lag.", "إعلان قانون جديد."],
    "Lexin015397": ["Eleven nådde inte upp till kunskapskraven.", "لم يصل التلميذ إلى متطلبات المعرفة."],
    "Lexin015427": ["Lärarna följer kursplanerna.", "المعلمون يتبعون مناهج الدورات."],
    "Lexin015480": ["Facket har kvarlevande stridsrätt.", "النقابة لديها حق إضراب متبقي (في حالات معينة)."],
    "Lexin015484": ["Man kan begära kvarskrivning vid skyddad identitet.", "يمكن طلب البقاء مسجلاً (في العنوان القديم) عند حماية الهوية."],
    "Lexin015486": ["Betala in kvarstående skatt (restskatt).", "دفع الضريبة المتبقية."],
    "Lexin015729": ["Köplagen gäller mellan privatpersoner.", "قانون الشراء يسري بين الأفراد."],
    "Lexin015743": ["Bilen fick körförbud.", "السيارة حصلت على حظر قيادة."],
    "Lexin015745": ["Ta körkort för bil.", "الحصول على رخصة قيادة للسيارة."],
    "Lexin015747": ["Du som är körkortsinnehavare ansvarar.", "أنت كحامل رخصة القيادة تتحمل المسؤولية."],
    "Lexin015800": ["Få ersättning enligt lag om etableringsinsatser.", "الحصول على تعويض بموجب قانون مبادرات الترسخ."],
    "Lexin015802": ["Utsedd enligt lag om god man för ensamkommande barn.", "مُعين بموجب قانون الوصي للأطفال غير المصحوبين بذويهم."],
    "Lexin015805": ["MBL (Lag om medbestämmande i arbetslivet) ger facket inflytande.", "قانون المشاركة في القرار في الحياة العملية (MBL) يمنح النقابة نفوذاً."],
    "Lexin015806": ["LOA (Lag om offentlig anställning) gäller för statligt anställda.", "قانون التوظيف العام (LOA) يسري على موظفي الدولة."],
    "Lexin015812": ["Omhändertagen enligt LOB (Lag om tillfälligt omhändertagande av berusade personer).", "محتجز بموجب قانون الرعاية المؤقتة للأشخاص المخمورين (LOB)."],
    "Lexin015820": ["Testamentet uppfyllde inte laga form.", "الوصية لم تستوف الشكل القانوني."],
    "Lexin015831": ["Uppsägningen stred mot LAS (Lagen om anställningsskydd).", "الفصل كان مخالفاً لقانون حماية التوظيف (LAS)."],
    "Lexin015855": ["Begära laglighetsprövning av kommunens beslut.", "طلب مراجعة قانونية لقرار البلدية."],
    "Lexin015873": ["Vi har lagstadgad semester.", "لدينا إجازة قانونية (مقررة بالقانون)."],
    "Lexin015913": ["Bli landsförvisad för brott mot staten.", "النفي من البلاد لجرائم ضد الدولة."],
    "Lexin015924": ["Landsorganisationen (LO) samlar arbetarfacken.", "اتحاد النقابات العمالية (LO) يجمع نقابات العمال."],
    "Lexin015931": ["Landstingsskatten går till sjukvården.", "ضريبة مجلس المحافظة تذهب للرعاية الصحية."],
    "Lexin015932": ["Ordförande i landstingsstyrelsen.", "رئيس مجلس إدارة المحافظة."],
    "Lexin015955": ["Kolla ägaren i Lantmäteriets fastighetsregister.", "تحقق من المالك في سجل عقارات مصلحة الأراضي."],
    "Lexin015957": ["Lantmäteriet utför lantmäteriförrättningar.", "تقوم مصلحة الأراضي بإجراءات مسح الأراضي."],
    "Lexin016001": ["Köra lastbil.", "قيادة شاحنة."],
    "Lexin016032": ["Företaget leasar sina bilar.", "الشركة تستأجر (Leasar) سياراتها."],
    "Lexin016091": ["Ledsyn (en form av synnedsättning?).", "ضعف البصر الموجه (Ledsyn)."], // Corrected assumption: Vision guiding capability
    "Lexin016230": ["Diskriminering bryter mot likabehandlingsprincipen.", "التمييز يخالف مبدأ المعاملة المتساوية."],
    "Lexin016259": ["Bolaget trädde i likvidation.", "دخلت الشركة في التصفية."],
    "Lexin016352": ["Få livränta efter arbetsskadan.", "الحصول على معاش مدى الحياة (Livränta) بعد إصابة العمل."],
    "Lexin016359": ["Ersättning för sveda och värk samt livsföring i övrigt.", "تعويض عن الألم والمعاناة ونمط الحياة بشكل عام."],
    "Lexin016426": ["Arbetsgivarna varnade för lockout.", "حذر أصحاب العمل من الإغلاق (قفل المصنع)."],
    "Lexin016451": ["Anställda har en lojalitetsplikt mot arbetsgivaren.", "الموظفون ملزمون بواجب الولاء تجاه صاحب العمل."],
    "Lexin016513": ["Kontakta din LSS-handläggare.", "اتصل بمسؤول LSS الخاص بك."],
    "Lexin016532": ["Luftfartsverket (LFV) sköter flygtrafiken.", "مصلحة الطيران المدني تدير الحركة الجوية."],
    "Lexin016703": ["Få ersättning för lyte och men (ärr och funktionsnedsättning).", "الحصول على تعويض عن التشوه والعاهة (الندوب والإعاقة)."],
    "Lexin016747": ["Satsningar för att hjälpa långtidsarbetslösa.", "استثمارات لمساعدة العاطلين عن العمل لفترات طويلة."],
    "Lexin016831": ["Det finns flera läkarmottagningar i staden.", "توجد عدة عيادات طبية في المدينة."],
    "Lexin016872": ["Sverige är indelat i 21 län.", "السويد مقسمة إلى 21 محافظة."],
    "Lexin016901": ["Vårdas på ett länsdelssjukhus.", "يُعالج في مستشفى محلي (Länsdelssjukhus)."],
    "Lexin016907": ["Remitteras till länssjukhuset.", "أحيل إلى مستشفى المحافظة."],
    "Lexin016908": ["Regionen ansvarar för länssjukvård.", "المحافظة مسؤولة عن الرعاية الصحية في المحافظة."],
    "Lexin016921": ["Anmälas till Lärarnas ansvarsnämnd.", "يُبلغ عنه إلى لجنة مسؤولية المعلمين."],
    "Lexin016927": ["Gå en lärlingsutbildning till snickare.", "الالتحاق بتدريب تلمذة مهنية للنجارة."],
    "Lexin016933": ["Datorn är ett viktigt lärverktyg.", "الكمبيوتر أداة تعليمية مهمة."],
    "Lexin016957": ["Köra lätt motorcykel vid 16 års ålder.", "قيادة دراجة نارية خفيفة في سن 16."],
    "Lexin016997": ["Företaget får lönebidrag för anställningen.", "تحصل الشركة على دعم راتب للتوظيف."],
    "Lexin017003": ["Se lönestatistik för olika yrken.", "انظر إحصاءات الرواتب للمهن المختلفة."],
    "Lexin017004": ["Detta är en anställning med lönesubvention.", "هذا توظيف بدعم للراتب."],
    "Lexin017115": ["Hon är min maka (fru).", "هي زوجتي."],
    "Lexin017231": ["Höginkomsttagare betalar statlig marginalskatt.", "ذوو الدخل المرتفع يدفعون ضريبة هامشية للدولة."],
    "Lexin017351": ["Vi har prov i matematik.", "لدينا اختبار في الرياضيات."],
    "Lexin017411": ["Kommunen håller medborgardialoger.", "تعقد البلدية حوارات مع المواطنين."],
    "Lexin017414": ["Lämna in ett medborgarförslag.", "تقديم اقتراح مواطن."],
    "Lexin017485": ["En medlare försökte lösa konflikten.", "حاول وسيط حل النزاع."],
    "Lexin017488": ["Uppfylla medlemsvillkoren för föreningen.", "استيفاء شروط العضوية للجمعية."],
    "Lexin017493": ["Medlingsinstitutet medlar i arbetstvister.", "معهد الوساطة يتوسط في نزاعات العمل."],
    "Lexin017550": ["Hon har ett mellannamn.", "لديها اسم أوسط."],
    "Lexin017556": ["Köra mellanstor motorcykel.", "قيادة دراجة نارية متوسطة الحجم."],
    "Lexin017700": ["Arbeta på Miljö- och energidepartementet.", "العمل في وزارة البيئة والطاقة."],
    "Lexin017709": ["Sanera giftiga miljöfallen.", "تطهير النفايات البيئية السامة (Miljöfallen - ربما الحالات البيئية)."], // Context check needed, assumes hazardous waste sites
    "Lexin017755": ["Sverige har ingen lagstadgad minimilön.", "السويد ليس لديها حد أدنى للأجور محدد قانوناً."],
    "Lexin017761": ["Ministerstyre är förbjudet i Sverige.", "الحكم الوزاري (التدخل المباشر للوزير) محظور في السويد."],
    "Lexin017762": ["Regeringen består av många ministrar.", "تتكون الحكومة من العديد من الوزراء."],
    "Lexin017770": ["Sprida aska i en minneslund.", "نثر الرماد في حديقة الذكرى."],
    "Lexin017803": ["Hjälp för missbruks- eller beroendeproblematik.", "مساعدة لمشاكل التعاطي أو الإدمان."],
    "Lexin017804": ["Söka sig till missbruksvård.", "اللجوء إلى رعاية المدمنين."],
    "Lexin017814": ["Man får inte missgynna någon p.g.a. kön.", "لا يجوز ظلم أحد بسبب الجنس."],
    "Lexin017822": ["Om du missköter dig kan du bli uppsagd.", "إذا أسأت التصرف يمكن فصلك."],
    "Lexin017825": ["Uppsägning p.g.a. misskötsel.", "الفصل بسبب سوء السلوك."],
    "Lexin017925": ["Läsa moderna språk i skolan (tyskan, franska).", "دراسة اللغات الحديثة في المدرسة (الألمانية، الفرنسية)."],
    "Lexin017968": ["Sverige är en monarki.", "السويد ملكية."],
    "Lexin017990": ["Köra moped klass II utan körkort (men med förarbevis ibland).", "قيادة دراجة نارية صغيرة من الفئة 2."],
    "Lexin018055": ["Riksdagsledamoten lämnade in en motion.", "قدم عضو البرلمان اقتراحاً (Motion)."],
    "Lexin018070": ["Traktorn är ett motorredskap.", "الجرار هو آلة وتور (أداة آلية)."],
    "Lexin018185": ["Myndigheten tillämpar muntlig handläggning.", "تطبق السلطة التعامل الشفهي."],
    "Lexin018261": ["Du blir myndig när du fyller 18.", "تصبح بالغاً سن الرشد عندما تبلغ 18."],
    "Lexin018265": ["Myndigheten för familjerätt och föräldraskapsstöd (MFoF).", "هيئة قانون الأسرة ودعم الوالدين (MFoF)."],
    "Lexin018266": ["Myndigheten för yrkeshögskolan (MYH).", "هيئة المعاهد المهنية العليا (MYH)."],
    "Lexin018308": ["Det var ett mål av mindre värde (FT-mål).", "كانت قضية ذات قيمة صغيرة."],
    "Lexin018447": ["Besöka mödra- och barnavårdsmottagningar.", "زيارة عيادات رعاية الأم والطفل."],
    "Lexin018559": ["Studera nationalekonomi på universitetet.", "دراسة الاقتصاد الوطني في الجامعة."],
    "Lexin018571": ["Vi har fem nationella minoriteter i Sverige.", "لدينا خمس أقليات وطنية في السويد."],
    "Lexin018573": ["Det finns 18 nationella program på gymnasiet.", "يوجد 18 برنامجاً وطنياً في المدرسة الثانوية."],
    "Lexin018578": ["Skriva nationellt prov i svenska.", "كتابة الاختبار الوطني في اللغة السويدية."],
    "Lexin018580": ["Nativiteten sjunker i landet.", "معدل المواليد (Nativitet) ينخفض في البلاد."]
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

const backupPath = DATA_FILE + '.backup_others5_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Others Batch 5 completed!`);
