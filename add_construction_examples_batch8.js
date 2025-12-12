/**
 * Add examples to CONSTRUCTION terms - Batch 8 (100 terms: Energiprestanda to Fin ballast)
 * Carefully matching IDs from construction_pending_batch.json
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin006673": ["Mäta byggnadens energiprestanda.", "قياس كفاءة (أداء) الطاقة للمبنى."],
    "Lexin006675": ["Odla energiskog på marken.", "زراعة غابة طاقة في الأرض."],
    "Lexin006677": ["Anläggning för energiutvinning ur sopor.", "منشأة لاستخراج الطاقة من القمامة."],
    "Lexin006693": ["Byta ut gamla englasfönster mot isolerglas.", "استبدال نوافذ الزجاج الفردي القديمة بزجاج عازل."],
    "Lexin006700": ["Prata med enhetschefen för drift.", "التحدث مع رئيس وحدة التشغيل."],
    "Lexin006731": ["Vi bor i ett praktiskt enplanshus.", "نحن نعيش في منزل عملي من طابق واحد."],
    "Lexin006752": ["Huset har en enskild VA-anläggning.", "المنزل لديه نظام مياه وصرف صحي خاص."],
    "Lexin006754": ["Ansvara för underhåll av enskild väg.", "مسؤول عن صيانة طريق خاص."],
    "Lexin006758": ["Installera en trekammarbrunn för enskilt avlopp.", "تركيب خزان بثلاث غرف للصرف الصحي الخاص."],
    "Lexin006774": ["Ingången ligger på entréplan.", "المدخل يقع في طابق المدخل."],
    "Lexin006777": ["Lämna jobbet på entreprenad.", "طرح العمل كمقاولة."],
    "Lexin006778": ["Välja rätt entreprenadform.", "اختيار شكل المقاولة المناسب."],
    "Lexin006779": ["Jobba som entreprenadingenjör.", "العمل كمهندس مقاولات."],
    "Lexin006780": ["Den totala entreprenadsumman blev hög.", "مبلغ المقاولة الإجمالي أصبح مرتفعاً."],
    "Lexin006781": ["Förlängd entreprenadtid p.g.a. regn.", "وقت المقاولة ممدد بسبب المطر."],
    "Lexin006783": ["Anlita en lokal entreprenör.", "توظيف مقاول محلي."],
    "Lexin006789": ["Välta asfalten med en envalsvält.", "رص الأسفلت بمدحلة ذات أسطوانة واحدة."],
    "Lexin006826": ["Lägga ett slitstarkt epoxygolv i garaget.", "tarkib أرضية إيبوكسي مقاومة للتآكل في المرآب."],
    "Lexin006841": ["Systematisk erfarenhetsåterföring efter projektet.", "إعادة (استفادة من) الخبرات بشكل منهجي بعد المشروع."],
    "Lexin006861": ["Skydda stranden mot erosion.", "حماية الشاطئ من التآكل (التعرية)."],
    "Lexin006862": ["Lägga ut sten som erosionsskydd.", "وضع الحجارة كحماية من التآكل."],
    "Lexin006872": ["Rikta ett ersättningsanspråk mot leverantören.", "توجيه مطالبة بالتعويض ضد المورد."],
    "Lexin006874": ["Beställa en ersättningsdel till maskinen.", "طلب قطعة غيار للآلة."],
    "Lexin006912": ["Sanera fasaden från eternit.", "تطهير الواجهة من الإترنيت (الأسبستوس)."],
    "Lexin006913": ["Ta ner gamla eternitplattor försiktigt.", "إزالة ألواح الإترنيت القديمة بحذر."],
    "Lexin006955": ["Dimensionera stålet enligt Eurokod.", "تصميم أبعاد الفولاذ وفقاً للكود الأوروبي (Eurokod)."],
    "Lexin007036": ["Fästa stålbalken med expanderbult.", "تثبيت العارضة الفولاذية ببرغي توسع (expanderbult)."],
    "Lexin007037": ["Dra åt expanderskruven ordentligt.", "شد برغي التوسع بإحكام."],
    "Lexin007039": ["Byta expansionskärl i pannan.", "تغيير خزان التمدد في المرجل."],
    "Lexin007057": ["Planera för exploatering av området.", "التخطيط لاستغلال (تطوير) المنطقة."],
    "Lexin007058": ["Skriva under ett exploateringsavtal.", "توقيع اتفاقية تطوير عقاري."],
    "Lexin007059": ["Beräkna exploateringskostnaden per tomt.", "حساب تكلفة التطوير (الاستغلال) لكل قطعة أرض."],
    "Lexin007060": ["Detta är ett nytt exploateringsområde.", "هذه منطقة تطوير جديدة."],
    "Lexin007064": ["Säkerhetsavstånd vid explosion.", "مسافة الأمان عند الانفجار."],
    "Lexin007066": ["Hantera explosivt material varsamt.", "التعامل مع المواد المتفجرة بحذر."],
    "Lexin007088": ["Måla husets exteriör.", "طلاء السطح الخارجي للمنزل."],
    "Lexin007110": ["Huset ventileras med F-ventilation.", "المنزل يُهوى بتهوية ميكانيكية للعادم (F-ventilation)."],
    "Lexin007120": ["Jobba på fabrik.", "العمل في مصنع."],
    "Lexin007123": ["Beställa fabriksbetong till grunden.", "طلب خرسانة جاهزة للأساس."],
    "Lexin007124": ["En nedlagd fabriksbyggnad.", "مبنى مصنع مهجور."],
    "Lexin007125": ["Elementen görs genom fabrikstillverkning.", "العناصر تُصنع عن طريق التصنيع المصنعي."],
    "Lexin007128": ["Byggnaden har moderna faciliteter.", "المبنى به مرافق حديثة."],
    "Lexin007146": ["Prata med din fackliga representant om lönen.", "تحدث مع ممثلك النقابي بخصوص الراتب."],
    "Lexin007152": ["Takstolen är byggd som ett fackverk.", "جملون السقف مبني كـ (fackverk) هيكل شبكي."],
    "Lexin007153": ["Bron är en fackverkskonstruktion.", "الجسر عبارة عن هيكل شبكي."],
    "Lexin007172": ["Läs produktens faktablad.", "اقرأ ورقة حقائق المنتج."],
    "Lexin007187": ["Skicka en faktura på jobbet.", "إرسال فاتورة بالعمل."],
    "Lexin007188": ["Vi har elektronisk fakturering.", "لدينا فوترة إلكترونية."],
    "Lexin007204": ["Utnyttja älvens fallhöjd.", "استغلال ارتفاع سقوط النهر."],
    "Lexin007207": ["Montera fallskydd vid takkanten.", "تركيب حماية من السقوط عند حافة السقف."],
    "Lexin007208": ["Använd alltid fallskyddsutrustning på taket.", "استخدم دائماً معدات الحماية من السقوط على السقف."],
    "Lexin007212": ["Falsa plåten för hand.", "طي (لصق) الصفيحة يدوياً."],
    "Lexin007226": ["Mäta dörrens falsmått.", "قياس أبعاد الـ (fals) الحافة المتراكبة للباب."],
    "Lexin007227": ["Takläggning med dubbel falsning.", "تسقيف بطي مزدوج (فالز)."],
    "Lexin007228": ["Använda ett speciellt falsningsverktyg.", "استخدام أداة طي خاصة."],
    "Lexin007229": ["Lägga taket med falstakpanna.", "تسقيف باستخدام قرميد الفالز."],
    "Lexin007268": ["Luckorna är av ekfanér.", "الأبواب (الخزائن) من قشرة البلوط."],
    "Lexin007269": ["Laga kanten med en fanerremsa.", "إصلاح الحافة بشريط قشرة."],
    "Lexin007296": ["Varna för fara.", "التحذير من الخطر."],
    "Lexin007298": ["Arbetet innebär fara för hälsa och säkerhet.", "العمل ينطوي على خطر على الصحة والسلامة."],
    "Lexin007312": ["Skylt om farlig spänning.", "لافتة حول جهد كهربائي خطير."],
    "Lexin007313": ["Hantera farligt avfall korrekt.", "التعامل مع النفايات الخطرة بشكل صحيح."],
    "Lexin007314": ["Transport av farligt gods.", "نقل البضائع الخطرة."],
    "Lexin007315": ["Avbryt arbetet vid farligt tillstånd.", "أوقف العمل في حالة الوضع الخطير."],
    "Lexin007341": ["Mura fasaden med rött fasad tegel.", "بناء الواجهة بطوب واجهة أحمر."],
    "Lexin007342": ["Välja en underhållsfri fasadbeklädnad.", "اختيار كسوة واجهة لا تحتاج صيانة."],
    "Lexin007343": ["Montera tunga fasadelement.", "تركيب عناصر واجهة ثقيلة."],
    "Lexin007344": ["Byggnaden är klädd i fasadglas.", "المبنى مكسو بزجاج الواجهات."],
    "Lexin007345": ["Arbeta från en fasadhiss.", "العمل من مصعد الواجهة (سقالة معلقة)."],
    "Lexin007346": ["Byta ut skadad fasadplåt.", "استبدال صفيحة واجهة تالفة."],
    "Lexin007347": ["Studera fasadritningen.", "دراسة رسم الواجهة."],
    "Lexin007348": ["Foga om gammalt fasadtegel.", "إعادة تكحيل طوب الواجهة القديم."],
    "Lexin007360": ["Sätta faskantsten längs trottoaren.", "وضع حجر حافة مشطوف (faskantsten) على طول الرصيف."],
    "Lexin007362": ["Köra röret i en fasningsmaskin.", "تشغيل الأنبوب في آلة الشطب (fasningsmaskin)."],
    "Lexin007370": ["Bränna fast avfall.", "حرق النفايات الصلبة."],
    "Lexin007371": ["Betala ett fast belopp varje månad.", "دفع مبلغ ثابت كل شهر."],
    "Lexin007372": ["Grundläggning på fast berg.", "التأسيس على صخر ثابت."],
    "Lexin007374": ["Vi fick fast pris på jobbet.", "حصلنا على سعر ثابت للعمل."],
    "Lexin007375": ["Utgå från en fast punkt vid mätning.", "الانطلاق من نقطة ثابتة عند القياس."],
    "Lexin007376": ["Montera ett fast skydd över maskinen.", "تركيب واقي ثابت فوق الآلة."],
    "Lexin007377": ["Balken vilar på ett fast stöd.", "العارضة ترتكز على دعامة ثابتة."],
    "Lexin007403": ["Ring fastighetsskötaren om felet.", "اتصل بمسؤول العمارة (الناطور) بخصوص العطل."],
    "Lexin007404": ["Företaget sköter fastighetsskötsel.", "الشركة تتولى صيانة العقارات."],
    "Lexin007477": ["En felaktig koppling orsakade läckan.", "توصيلة خاطئة سببت التسرب."],
    "Lexin007480": ["Använda felfritt virke till snickeriet.", "استخدام خشب خالي من العيوب للنجارة."],
    "Lexin007481": ["Panelen visar felindikering.", "اللوحة تظهر إشارة خطأ."],
    "Lexin007482": ["Starta fellokalisering i nätet.", "بدء تحديد موقع الخطأ في الشبكة."],
    "Lexin007483": ["Utreda vilken felmekanism som gäller.", "التحقيق في آلية الخطأ (سبب الكسر) السائدة."],
    "Lexin007485": ["Systemet är helt felsäkert.", "النظام آمن تماماً ضد الأخطاء."],
    "Lexin007486": ["Felsökning pågår.", "البحث عن الأخطاء جارٍ."],
    "Lexin007487": ["Räkna med lång felsökningstid.", "توقع وقت طويل للبحث عن الخطأ."],
    "Lexin007488": ["Systemet har hög feltolerans.", "النظام لديه تحمل عالي للأخطاء."],
    "Lexin007538": ["Diska fettfiltret i köksfläkten.", "غسل فلتر الدهون في مروحة المطبخ."],
    "Lexin007551": ["Lägga ut fiberduk under gruset.", "فرش قماش الألياف (جيوتكستايل) تحت الحصى."],
    "Lexin007552": ["Hyvla i fiberriktningen.", "السحج (KashT) في اتجاه الألياف."],
    "Lexin007611": ["Byta filter i ventilationen.", "تغيير المرشح (الفلتر) في التهوية."],
    "Lexin007612": ["Rengöra filterduken.", "تنظيف قماش الفلتر."],
    "Lexin007613": ["Inspektera filterkammaren.", "فحص غرفة الفلاتر."],
    "Lexin007617": ["Filtrering av dricksvatten.", "تنقية مياه الشرب."],
    "Lexin007628": ["Blandningen behöver mer fin ballast.", "الخليط يحتاج المزيد من الركام الناعم (الرمل)."]
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

const backupPath = DATA_FILE + '.backup_construction8_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Construction Batch 8 completed!`);
