/**
 * Add examples to CONSTRUCTION terms - Batch 5 (100 terms: Bjälklag to Byggbransch)
 * Carefully matching IDs from construction_pending_batch.json
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin003486": ["Kontrollera bärigheten i husets bjälklag.", "فحص قدرة التحمل في سقف (أو أرضية) المنزل."],
    "Lexin003518": ["Blanskrapning av den gamla färgen.", "كشط الطلاء القديم حتى السطح."],
    "Lexin003581": ["Montera en blixtledare på taket.", "تركيب مانعة صواعق على السقف."],
    "Lexin003590": ["Samråd med din blockchef.", "التشاور مع رئيس القطاع (blockchef)."],
    "Lexin003596": ["Svårt att gräva i blockjord.", "صعوبة الحفر في تربة صخرية (ذات كتل كبيرة)."],
    "Lexin003712": ["Bly är giftigt och undviks numera.", "الرصاص سام ويتم تجنبه حالياً."],
    "Lexin003724": ["Huset är byggt av blåbetong.", "المنزل مبني من الخرسانة الزرقاء (التي تصدر الرادون)."],
    "Lexin003745": ["Värma röret med en blåslampa.", "تسخين الأنبوب بمصباح لحام."],
    "Lexin003764": ["Undvik bländning från solen.", "تجنب الإبهار (الزغللة) من الشمس."],
    "Lexin003765": ["Montera bländskydd i fönstren.", "تركيب واقيات من الإبهار في النوافذ."],
    "Lexin003769": ["Ta bort rost genom blästring.", "إزالة الصدأ عن طريق السفع بالرمل (blästring)."],
    "Lexin003790": ["Lägenhetens BOA är 75 kvm.", "مساحة المعيشة (BOA) للشقة هي 75 متر مربع."],
    "Lexin003792": ["Sätta upp board på väggen.", "تركيب ألواح (خشب مضغوط) على الجدار."],
    "Lexin003794": ["Dörren har en kärna av boardlamell.", "الباب له قلب من شرائح الألواح."],
    "Lexin003803": ["Bockning av armeringsjärn.", "ثني قضبان التسليح."],
    "Lexin003804": ["Ställa in bockningsmaskinen.", "ضبط آلة الثني."],
    "Lexin003805": ["Använda ett bockningsverktyg för rören.", "استخدام أداة ثني للأنابيب."],
    "Lexin003933": ["Vi måste borra i betongen.", "يجب أن نحفر في الخرسانة."],
    "Lexin003936": ["Fyll borrhålet med massa.", "املأ ثقب الحفر بالكتلة (المونة)."],
    "Lexin003939": ["Hämta en kraftig borrmaskin.", "أحضر مثقاباً قوياً."],
    "Lexin003946": ["Stryk på limmet med en borste.", "ادهن الغراء بفرشاة."],
    "Lexin003993": ["Bygga ett nytt bostadshus.", "بناء مبنى سكني جديد."],
    "Lexin003994": ["Ett lugnt bostadskvarter.", "حي سكني هادئ."],
    "Lexin003996": ["Planera ett nytt bostadsområde.", "تخطيط منطقة سكنية جديدة."],
    "Lexin004004": ["Höja lägenheternas bostadsstandard.", "رفع مستوى جودة السكن في الشقق."],
    "Lexin004022": ["Byta ut en rötskadad bottenbalk.", "استبدال عارضة سفلية تالفة (متعفنة)."],
    "Lexin004028": ["Affären ligger på bottenvåningen.", "المتجر يقع في الطابق الأرضي."],
    "Lexin004042": ["Bygget följer inte Boverkets byggregler.", "البناء لا يتبع لوائح البناء من Boverket."],
    "Lexin004061": ["Installera en godkänd branddörr.", "تركيب باب حريق معتمد."],
    "Lexin004063": ["Förvara inte brandfarligt material här.", "لا تخزن مواد قابلة للاشتعال هنا."],
    "Lexin004064": ["Släck elden med en brandfilt.", "أخمد النار ببطانية حريق."],
    "Lexin004066": ["Teckna en brandförsäkring för huset.", "توقيع تأمين حريق للمنزل."],
    "Lexin004070": ["Väggen har högt brandmotstånd.", "الجدار لديه مقاومة عالية للحريق."],
    "Lexin004071": ["Krav på 60 minuters brandmotståndstid.", "متطلبات بمقاومة حريق لمدة 60 دقيقة."],
    "Lexin004072": ["Bygga en brandmur mellan husen.", "بناء جدار حريق بين المنازل."],
    "Lexin004073": ["Följa gällande brandnormer.", "اتباع معايير الحريق السارية."],
    "Lexin004075": ["Koppla slangen till en brandpost.", "توصيل الخرطوم بصنبور حريق."],
    "Lexin004076": ["Kontrollera alla brandredskap.", "فحص جميع معدات الحريق."],
    "Lexin004078": ["Lämna in brandskyddsdokumentation.", "تقديم وثائق الحماية من الحريق."],
    "Lexin004079": ["Måla stålet med brandskyddsfärg.", "طلاء الفولاذ بطلاء مقاوم للحريق."],
    "Lexin004080": ["Dörren måste hålla rätt brandskyddsklass.", "الباب يجب أن يفي بفئة الحماية من الحريق الصحيحة."],
    "Lexin004081": ["Placera ut brandsläckare på varje våning.", "وضع طفايات حريق في كل طابق."],
    "Lexin004083": ["Öka byggnadens brandsäkerhet.", "زيادة سلامة المبنى ضد الحريق."],
    "Lexin004085": ["Testa materialets brandtålighet.", "اختبار مقاومة المادة للحريق."],
    "Lexin004087": ["Byta batteri i brandvarnaren.", "تغيير بطارية كاشف الدخان."],
    "Lexin004088": ["Installera luckor för brandventilation.", "تركيب فتحات لتهوية الحريق."],
    "Lexin004111": ["Mäta plankans bredd.", "قياس عرض اللوح."],
    "Lexin004137": ["Lampan har lång brinntid.", "المصباح لديه وقت تشغيل (احتراق) طويل."],
    "Lexin004158": ["Lyfta en tung brobalk på plats.", "رفع عارضة جسر ثقيلة إلى مكانها."],
    "Lexin004159": ["Asfaltera brobanan.", "سفلتة سطح الجسر."],
    "Lexin004160": ["Starta en ny brobyggnad över ån.", "بدء بناء جسر جديد فوق النهر."],
    "Lexin004166": ["Montera färdiga broelement.", "تركيب عناصر جسر جاهزة."],
    "Lexin004167": ["Gjuta ett stabilt brofäste.", "صب قاعدة جسر مستقرة."],
    "Lexin004186": ["Gjuta bropelare i vattnet.", "صب أعمدة الجسر في الماء."],
    "Lexin004190": ["Sätta upp broräcke för säkerhet.", "تركيب درابزين الجسر للأمان."],
    "Lexin004261": ["Ett gammalt brovalv av sten.", "قوس جسر قديم من الحجر."],
    "Lexin004268": ["Blanda nytt bruk till muren.", "خلط مونة جديدة للجدار."],
    "Lexin004274": ["Rengöra bruksblandaren efter jobbet.", "تنظيف خلاطة المونة بعد العمل."],
    "Lexin004284": ["Gräva en brunn för vatten.", "حفر بئر للماء."],
    "Lexin004286": ["Lyfta på det tunga brunnslocket.", "رفع غطاء البالوعة الثقيل."],
    "Lexin004302": ["Beräkna byggnadens bruttoarea.", "حساب المساحة الإجمالية للمبنى."],
    "Lexin004303": ["Total bruttogolvyta är 500 kvm.", "إجمالي مساحة الأرضية 500 متر مربع."],
    "Lexin004309": ["Lastbilens bruttovikt.", "الوزن الإجمالي للشاحنة."],
    "Lexin004310": ["Minska husets bruttovolym.", "تقليل الحجم الإجمالي للمنزل."],
    "Lexin004343": ["Brytning av malm i gruvan.", "استخراج الخام في المنجم."],
    "Lexin004370": ["Bänd loss spiken med ett bräckjärn.", "اخلع المسمار بعتلة (bräckjärn)."],
    "Lexin004374": ["Såga till en bräda.", "نشر وتجهيز لوح خشبي."],
    "Lexin004386": ["Sortera ut brännbart avfall.", "فرز النفايات القابلة للاحتراق."],
    "Lexin004397": ["Foga samman rör med brännsvetsning.", "لحام الأنابيب باللحام بالغاز."],
    "Lexin004398": ["Ljuset har en bränntid på 10 timmar.", "الشمعة لها وقت احتراق 10 ساعات."],
    "Lexin004438": ["Dimensionera enlig BSK.", "تحديد الأبعاد وفقاً لـ BSK (كتيب التراكيب الفولاذية)."],
    "Lexin004439": ["Ange BTA i ritningen.", "حدد المساحة الإجمالية (BTA) في الرسم."],
    "Lexin004450": ["Lämna ett bud på entreprenaden.", "تقديم عرض (سعر) للمقاولة."],
    "Lexin004453": ["Hålla projektets budget.", "الالتزام بميزانية المشروع."],
    "Lexin004454": ["Det fanns tre budgivare.", "كان هناك ثلاثة مقدمي عروض."],
    "Lexin004496": ["Lastning av bulkgods i hamnen.", "تحميل البضائع السائبة في الميناء."],
    "Lexin004498": ["Söka tillstånd för bulktransport.", "طلب تصريح نقل البضائع السائبة."],
    "Lexin004501": ["Schakta jorden med en bulldozer.", "jrf التربة بجرافة (بلدوزر)."],
    "Lexin004504": ["Minska maskinens bulleremission.", "تقليل انبعاث الضوضاء من الآلة."],
    "Lexin004505": ["Förhindra bullerfortplantning i stommen.", "منع انتشار الضوضاء في الهيكل."],
    "Lexin004507": ["Mäta ljudet med en bullermätare.", "قياس الصوت بمقياس الضوضاء."],
    "Lexin004508": ["Utföra en bullermätning vid vägen.", "إجراء قياس للضوضاء عند الطريق."],
    "Lexin004509": ["Sänka bullernivån på arbetsplatsen.", "خفض مستوى الضوضاء في مكان العمل."],
    "Lexin004510": ["Klara gällande bullernorm.", "استيفاء معيار الضوضاء الساري."],
    "Lexin004512": ["Använda hörselkåpor som bullerskydd.", "استخدام واقيات الأذن كحماية من الضوضاء."],
    "Lexin004513": ["Sätta upp en bullerskärm mot vägen.", "إقامة جدار عازل للصوت تجاه الطريق."],
    "Lexin004519": ["Dra åt bulten hårt.", "شد البرغي بقوة."],
    "Lexin004521": ["Fästa regeln med bultpistol.", "تثبيت العارضة بمسدس الدسر (bultpistol)."],
    "Lexin004546": ["Huset har ett vackert burspråk.", "المنزل به نافذة بارزة (burspråk) جميلة."],
    "Lexin004562": ["Bygga en ny busstation.", "بناء محطة حافلات جديدة."],
    "Lexin004563": ["Taket på bussterminalen läcker.", "سقف محطة الحافلات يسرب."],
    "Lexin004566": ["Inreda en butik i lokalen.", "تجهيز متجر في المحل."],
    "Lexin004567": ["Renovera en gammal butiksfasad.", "تجديد واجهة متجر قديمة."],
    "Lexin004577": ["Skicka in en bygganmälan.", "إرسال إخطار بناء."],
    "Lexin004578": ["Utbildad byggarbetare.", "عامل بناء مدرب."],
    "Lexin004579": ["Starta ett omfattande byggarbete.", "بدء عمل بناء واسع النطاق."],
    "Lexin004580": ["Säkerhet på byggarbetsplatsen.", "السلامة في موقع البناء."],
    "Lexin004581": ["Sortera allt byggavfall.", "فرز جميع مخلفات البناء."],
    "Lexin004582": ["Följa lokala byggbestämmelser.", "اتباع لوائح البناء المحلية."],
    "Lexin004583": ["Jobba inom byggbranschen.", "العمل في قطاع البناء."]
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

const backupPath = DATA_FILE + '.backup_construction5_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Construction Batch 5 completed!`);
