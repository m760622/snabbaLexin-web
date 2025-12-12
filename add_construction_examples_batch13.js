/**
 * Add examples to CONSTRUCTION terms - Batch 13 (100 terms: Konstruktionselement to Lägeskontroll)
 * Carefully matching IDs from construction_pending_batch.json
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin014714": ["Tillverka förtillverkade konstruktionselement.", "تصنيع عناصر هيكلية مسبقة الصنع."],
    "Lexin014715": ["Konstruktionsledaren ansvarar för beräkningarna.", "مدير التصميم الإنشائي مسؤول عن الحسابات."],
    "Lexin014716": ["Följa instruktionerna på konstruktionsritningen.", "اتباع التعليمات الموجودة في الرسم الإنشائي."],
    "Lexin014719": ["Diskutera lösningen med en konstruktör.", "مناقشة الحل مع مصمم إنشائي."],
    "Lexin014726": ["Anlita en konsult för brandskyddet.", "توظيف استشاري للحماية من الحرائق."],
    "Lexin014727": ["Erbjuda fri konsultation.", "تقديم استشارة مجانية."],
    "Lexin014730": ["Ett stort tekniskt konsultföretag.", "شركة استشارات هندسية كبيرة."],
    "Lexin014731": ["Ett långt och komplicerat konsultuppdrag.", "مهمة استشارية طويلة ومعقدة."],
    "Lexin014793": ["Ha kontinuerlig övervakning av processen.", "توفير مراقبة مستمرة للعملية."],
    "Lexin014810": ["Skriva kontrakt med beställaren.", "توقيع عقد مع العميل."],
    "Lexin014811": ["Detta ingår i kontraktsarbetet.", "هذا مشمول في أعمال العقد."],
    "Lexin014812": ["Öka kontraktsbeloppet på grund av tillägg.", "زيادة مبلغ العقد بسبب الإضافات."],
    "Lexin014814": ["Kontraktsdatum är satt till den första maj.", "تاريخ العقد محدد في الأول من مايو."],
    "Lexin014827": ["Vi måste utse en kontrollansvarig (KA).", "يجب علينا تعيين مسؤول تحكم (مراقب جودة/أنظمة)."],
    "Lexin014831": ["Utföra regelbundna kontroller.", "إجراء فحوصات منتظمة."],
    "Lexin014832": ["Kontrollera att måtten stämmer.", "التحقق من أن الأبعاد صحيحة."],
    "Lexin014837": ["Följa den fastställda kontrollplanen.", "اتباع خطة الرقابة المقررة."],
    "Lexin014970": ["Sätta in en kortling mellan reglarna.", "وضع قطعة خشبية (kortling) بين العوارض."],
    "Lexin014995": ["Göra en första kostnadsbedömning.", "إجراء تقدير أولي للتكلفة."],
    "Lexin014997": ["Ha en strikt kostnadsstyrning i projektet.", "تطبيق رقابة صارمة على التكاليف في المشروع."],
    "Lexin015022": ["Beräkna vilka krafter som påverkar taket.", "حساب القوى المؤثرة على السقف."],
    "Lexin015048": ["Lyfta väggarna med kran.", "رفع الجدران بالرافعة."],
    "Lexin015068": ["Hålla sig inom givna kravgränser.", "البقاء ضمن حدود المتطلبات المعطاة."],
    "Lexin015144": ["Uppdatera proceduren för krisplanering och hantering.", "تحديث إجراءات التخطيط وإدارة الأزمات."],
    "Lexin015172": ["Skruva upp krokar i taket.", "تثبيت خطافات في السقف."],
    "Lexin015231": ["Krossa betongen till fyllnadsmassa.", "سحق الخرسانة لاستخدامها كمادة ردم."],
    "Lexin015233": ["Köra stenen i en krossare.", "تشغيل الحجارة في كسارة."],
    "Lexin015269": ["Huset är byggt på krypgrund.", "المنزل مبني على أساس زحف (مفرغ)."],
    "Lexin015373": ["Dra ledningarna i en kulvert.", "سحب الخطوط في نفق خدمات (kulvert)."],
    "Lexin015379": ["Alltid sätta kunden i fokus.", "دالئماً وضع العميل في بؤرة الاهتمام."],
    "Lexin015382": ["Ringa till kundserviceavdelningen.", "الاتصال بقسم خدمة العملاء."],
    "Lexin015464": ["Ha en hög kvalitetsambition.", "امتلاك طموح عالٍ للجودة."],
    "Lexin015465": ["Jobbet är bra gjord kvalitetsmässigt.", "العمل منجز بشكل جيد من حيث الجودة."],
    "Lexin015466": ["Kvalitetssäkra hela processen.", "ضمان جودة العملية بأكملها."],
    "Lexin015494": ["Sätta en kvartsstav i hörnet.", "وضع ربع دائرة (kvartsstav) في الزاوية."],
    "Lexin015555": ["Installera kyl och frys i köket.", "تركيب ثلاجة ومجمدة في المطبخ."],
    "Lexin015613": ["Förvara verktygen i källaren.", "تخزين الأدوات في القبو."],
    "Lexin015616": ["Titta på ritningen över källarplan.", "النظر في رسم طابق القبو."],
    "Lexin015663": ["Kontrollera trycket i expansionskärlet.", "فحص الضغط في خزان التمدد."],
    "Lexin015695": ["Undvika köldbryggor i konstruktionen.", "تجنب الجسور الحرارية في الهيكل."],
    "Lexin015740": ["Bredda körbanan för mer trafik.", "توسيع مسار القيادة لمزيد من الحركة."],
    "Lexin015742": ["Byta körfält på motorvägen.", "تغيير المسار على الطريق السريع."],
    "Lexin015778": ["Stryka golvet med lack.", "دهن الأرضية بالورنيش."],
    "Lexin015781": ["Klä in hyllorna med lackboard.", "تغليف الرفوف بألواح اللأكيه."],
    "Lexin015798": ["Följa gällande lag.", "اتباع القانون الساري."],
    "Lexin015829": ["Ta upp frågan på nästa lagbasmöte.", "طرح السؤال في اجتماع رؤساء العمال القادم."],
    "Lexin015841": ["Vi har materialet på lager.", "لدينا المواد في المستودع."],
    "Lexin015896": ["Balkar av limmat lamellträ.", "عوارض من الخشب الرقائقي المصفح."],
    "Lexin015897": ["Lägga in laminat i sovrummet.", "تركيب لامينيت في غرفة النوم."],
    "Lexin015898": ["Klippa golvet med en laminatskärare.", "قص الأرضية بمقص لامينيت."],
    "Lexin015919": ["Forma landskapet runt huset.", "تشكيل الطبيعة (المناظر) حول المنزل."],
    "Lexin015952": ["Lantmätaren sätter ut gränserna.", "المساح يحدد الحدود."],
    "Lexin015975": ["Installera larm i villan.", "تركيب إنذار في الفيلا."],
    "Lexin015979": ["Koppla in detektorn på larmlistan.", "توصيل الكاشف بعارضة التوصيل للإنذار."],
    "Lexin015980": ["Dra fram larmtråd till fönstret.", "سحب سلك الإنذار إلى النافذة."],
    "Lexin015990": ["Mäta avståndet med laser.", "قياس المسافة بالليزر."],
    "Lexin015997": ["Beräkna max tillåten last.", "حساب الحمل الأقصى المسموح به."],
    "Lexin016002": ["Köra ut grus med lastmaskiner.", "نقل الحصى بآلات التحميل (Jcb)."],
    "Lexin016003": ["Göra ett lasttest på lyftkranen.", "إجراء اختبار حمل للرافعة."],
    "Lexin016004": ["Dimensionera för laständring.", "التصميم لتغير الحمل."],
    "Lexin016005": ["Måla staketet med lasyr.", "طلاء السياج بطلاء شفاف (Lasyr)."],
    "Lexin016012": ["Handskar av latex.", "قفازات من اللاتكس."],
    "Lexin016013": ["Täta fönstret med latexfog.", "عزل النافذة بمعجون لاتكس."],
    "Lexin016014": ["Måla väggarna med latexfärg.", "طلاء الجدران بطلاء لاتكس."],
    "Lexin016037": ["Mura grunden med lecablock.", "بناء الأساس بكتل الليكا (Leca)."],
    "Lexin016072": ["Ta ledighet över julen.", "أخذ إجازة خلال عيد الميلاد."],
    "Lexin016080": ["Markera ledningssträckor på ritningen.", "تحديد مسارات الخطوط على الرسم."],
    "Lexin016090": ["Hålla i ledstången i trappan.", "الإمساك بالدرابزين في السلم."],
    "Lexin016149": ["Marken består av lera.", "الأرض تتكون من طين."],
    "Lexin016151": ["Krossad lerskiffer som fyllning.", "طين صفحي مسحوق كردم."],
    "Lexin016170": ["Vi kräver hög leveranssäkerhet.", "نحن نطلب موثوقية توريد عالية."],
    "Lexin016171": ["Det är lång leveranstid på fönstren.", "وقت التوصيل طويل للنوافذ."],
    "Lexin016174": ["Göra en leverantörsutvärdering årligen.", "إجراء تقييم للموردين سنوياً."],
    "Lexin016276": ["Blanda kalkbruk med lime (osläckt kalk).", "خلط مونة الجير مع جير (أكسيد الكالسيوم)."], // Context here is likely lime as in material, though Lexin def was vague.
    "Lexin016280": ["Takstolar av limträ.", "جمالونات سقف من الخشب اللamine (Glulam)."],
    "Lexin016305": ["Lägga in en linoleummatta i köket.", "فرش سجادة مشمع (لينوليوم) في المطبخ."],
    "Lexin016306": ["Olja in tröskeln med linolja.", "تزييت العتبة بزيت بذر الكتان."],
    "Lexin016377": ["Dämpa ljudet från grannen.", "تخفيف الصوت من الجار."],
    "Lexin016382": ["Förbättra ljudisoleringen i väggen.", "تحسين عزل الصوت في الجدار."],
    "Lexin016385": ["Sätta upp ljudreducerande plattor i taket.", "تركيب ألواح مخففة للصوت في السقف."],
    "Lexin016399": ["Analysera ljusförhållanden i rummet.", "تحليل ظروف الإضاءة في الغرفة."],
    "Lexin016427": ["Sätta upp lockpanel på fasaden.", "تركيب ألواح تغطية (lockpanel) على الواجهة."],
    "Lexin016433": ["Lägenheten har ingång från loftgång.", "الشقة لها مدخل من ممر خارجي (loftgång)."],
    "Lexin016441": ["Planera logistik för materialet.", "تخطيط اللوجستيات للمواد."],
    "Lexin016442": ["Vår logistikansvarig sköter transporterna.", "مسؤول اللوجستيات لدينا يدير النقل."],
    "Lexin016458": ["Ta hänsyn till lokala krav.", "مراعاة المتطلبات المحلية."],
    "Lexin016486": ["Lossning av godset sker på baksidan.", "تفريغ البضائع يتم في الخلف."],
    "Lexin016537": ["Starta luftkompressorn.", "تشغيل ضاغط الهواء."],
    "Lexin016550": ["Värma huset med luftvärmepump.", "تدفئة المنزل بمضخة حرارية هوائية."],
    "Lexin016575": ["Lägga lumppapp under parketten.", "وضع ورق مقوى (lumppapp) تحت الباركيه."],
    "Lexin016660": ["Det var ett tungt lyft.", "كان رفعاً ثقيلاً."],
    "Lexin016665": ["Beställa en lyftkran till bygget.", "طلب رافعة للموقع."],
    "Lexin016666": ["Planera en säker lyftoperation.", "تخطيط عملية رفع آمنة."],
    "Lexin016667": ["Kontrollera alla lyftredskap.", "فحص جميع معدات الرفع."],
    "Lexin016737": ["Planera för långsiktiga behov.", "التخطيط للاحتياجات طويلة الأمد."],
    "Lexin016765": ["Byta lås i dörren.", "تغيير القفل في الباب."],
    "Lexin016767": ["Montera låskistan i dörrbladet.", "تركيب علبة القفل في ضلفة الباب."],
    "Lexin016790": ["Husets läge är perfekt.", "موقع المنزل مثالي."],
    "Lexin016792": ["Renovera en lägenhet.", "تجديد شقة."],
    "Lexin016797": ["Beställa lägeskontroll från kommunen.", "طلب فحص الموقع من البلدية."]
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

const backupPath = DATA_FILE + '.backup_construction13_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Construction Batch 13 completed!`);
