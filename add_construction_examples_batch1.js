/**
 * Add examples to CONSTRUCTION terms - Batch 1 (100 terms: á pris to Anemometer)
 * Carefully matching IDs from construction_pending_batch.json
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin000137": ["Virket kostar 50 kr á pris.", "سعر الخشب 50 كرون للقطعة."],
    "Lexin000138": ["Fönstren har dubbla AA-glas.", "النوافذ تحتوي على زجاج AA مزدوج."],
    "Lexin000140": ["Vi följer AB 04 i kontraktet.", "نحن نتبع اللائحة AB 04 في العقد."],
    "Lexin000169": ["GPS ger en absolut positionsbestämning.", "نظام الـ GPS يعطي تحديداً مطلقاً للموقع."],
    "Lexin000174": ["Solfångaren fungerar som en absorbator.", "المجمع الشمسي يعمل كماص (للحرارة)."],
    "Lexin000175": ["Mineralull är en bra absorbent av ljud.", "الصوف المعدني هو مادة ماصة جيدة للصوت."],
    "Lexin000176": ["Materialet kan absorbera fukt.", "المادة يمكن أن تمتص الرطوبة."],
    "Lexin000179": ["Ytans absorptans påverkar värmen.", "قضرة السطح على الامتصاص تؤثر على الحرارة."],
    "Lexin000181": ["Rummet har en stor absorptionsarea.", "الغرفة لديه مساحة امتصاص كبيرة."],
    "Lexin000182": ["Väggen ger bra absorptionsdämpning.", "الجدار يوفر تخميداً جيداً بالامتصاص."],
    "Lexin000183": ["Beräkna materialets absorptionsfaktor.", "حساب عامل الامتصاص للمادة."],
    "Lexin000184": ["Använd ett absorptionsfilter.", "استخدم مرشح امتصاص."],
    "Lexin000185": ["Betong har låg absorptionsförmåga.", "الخرسانة لديها قدرة امتصاص منخفضة."],
    "Lexin000217": ["Golvet behöver acklimatisering innan läggning.", "الأرضية تحتاج إلى تأقلم (مع حرارة الغرفة) قبل التركيب."],
    "Lexin000225": ["Målarna utförde ackordsarbete.", "الرسامون قاموا بعمل بالقطعة (نظام المقاولة)."],
    "Lexin000226": ["Få betalt via ackordslön.", "الحصول على الراتب بنظام القطعة."],
    "Lexin000228": ["Företaget har fått ackreditering.", "حصلت الشركة على الاعتماد."],
    "Lexin000229": ["Värmepannan är kopplad till en ackumulator.", "المرجل متصل بخزان (مجمع) حراري."],
    "Lexin000266": ["Administration av byggprojektet.", "إدارة مشروع البناء."],
    "Lexin000269": ["Han sköter administrativa arbetsuppgifter på bygget.", "هو يتولى المهام الإدارية في موقع البناء."],
    "Lexin000313": ["Viktigt med god affärsetik.", "من المهم وجود أخلاقيات عمل جيدة."],
    "Lexin000314": ["Företagets affärsidé är att bygga hållbart.", "فكرة عمل الشركة هي البناء المستدام."],
    "Lexin000317": ["Vi accepterar inte oärliga affärsmetoder.", "نحن لا نقبل أساليب العمل غير الشريفة."],
    "Lexin000318": ["Vårt affärsområde är markanläggning.", "مجال عملنا هو إنشاءات الأرض."],
    "Lexin000319": ["Skriva en affärsplan för firman.", "كتابة خطة عمل للشركة."],
    "Lexin000320": ["Ändra affärsstrategi.", "تغيير استراتيجية العمل."],
    "Lexin000333": ["Företaget måste agera etiskt.", "يجب على الشركة أن تتصرف بشكل أخلاقي."],
    "Lexin000339": ["Betongen blandas med aggregat.", "يخلط الأسمنت مع الركام (الحصى والرمل)."],
    "Lexin000386": ["Använda aktiv förankring i berget.", "استخدام مرساة نشطة في الصخر."],
    "Lexin000389": ["Systemet har aktiv redundans för säkerhet.", "النظام لديه تكرار نشط (احتياطي) للأمان."],
    "Lexin000395": ["Full aktivitet på byggarbetsplatsen.", "نشاط كامل في موقع البناء."],
    "Lexin000399": ["Filtret innehåller aktivt kol.", "الفلتر يحتوي على كربون نشط."],
    "Lexin000410": ["Akustiken i hallen är dålig.", "الصوتيات (الصدى) في القاعة سيئة."],
    "Lexin000411": ["Sätta upp akustikplattor i taket.", "تركيب ألواح صوتية في السقف."],
    "Lexin000422": ["Hissen kräver akut underhåll.", "المصعد يحتاج صيانة طارئة."],
    "Lexin000431": ["Vattnet leds via en akvedukt.", "يتم نقل الماء عبر قناة مائية (جسر مائي)."],
    "Lexin000437": ["Installera ett nytt alarmsystem.", "تركيب نظام إنذار جديد."],
    "Lexin000477": ["Sovrummet har en säng-alkov.", "غرفة النوم بها كوة للسرير."],
    "Lexin000478": ["Måla fönstren med alkydfärg.", "طلاء النوافذ بطلاء الألكيد."],
    "Lexin000486": ["Huset ligger vid en vacker allé.", "المنزل يقع عند طريق مشجر جميل."],
    "Lexin000496": ["Testa materialet för allergen.", "فحص المادة بحثاً عن مسببات الحساسية."],
    "Lexin000529": ["Parken är allmän egendom.", "الحديقة هي ملكية عامة."],
    "Lexin000535": ["Räkna in allmän kostnad i offerten.", "احتساب التكلفة العامة في العرض."],
    "Lexin000539": ["Det är förbjudet att bygga på allmän plats.", "يمنع البناء في الأماكن العامة."],
    "Lexin000549": ["Byggnaden har god allmän ventilation.", "المبنى يتمتع بتهوية عامة جيدة."],
    "Lexin000571": ["Projektet följer allmänna avtalsbestämmelser.", "المشروع يتبع الأحكام العامة للعقود."],
    "Lexin000579": ["Följ byggarbetsplatsens allmänna ordningsregler.", "اتبع قواعد النظام العامة لموقع البناء."],
    "Lexin000586": ["Enligt Boverkets allmänna råd.", "وفقاً للنصائح العامة لمجلس الإسكان."],
    "Lexin000589": ["Marken är en allmänning.", "الأرض هي مشاع (ملكية مشتركة)."],
    "Lexin000592": ["Ett allmännyttig bostadsbolag.", "شركة إسكان ذات نفع عام."],
    "Lexin000596": ["Uppfylla allmänt kvalitetskrav.", "تلبية متطلبات الجودة العامة."],
    "Lexin000598": ["Bryggan ligger vid allmänt vatten.", "الرصيف يقع في مياه عامة."],
    "Lexin000604": ["Familjen samlades i husets allrum.", "اجتمعت العائلة في غرفة المعيشة (الصالة)."],
    "Lexin000633": ["Grundläggning på alluvial avlagring.", "التأسيس على رواسب غرينية."],
    "Lexin000634": ["Odla på bördig alluvialjord.", "الزراعة في تربة غرينية خصبة."],
    "Lexin000640": ["Arbetet innebär en allvarlig risk.", "العمل ينطوي على مخاطر جسيمة."],
    "Lexin000654": ["Bygga en altan med trall.", "بناء شرفة (فناء) بألواح خشبية."],
    "Lexin000664": ["Huset värms med alternativt energi.", "يتم تدفئة المنزل بطاقة بديلة."],
    "Lexin000666": ["Använd alternerande hålsättning för styrka.", "استخدم تثقيباً متناوباً للقوة."],
    "Lexin000668": ["Mät höjden med en altimeter.", "قس الارتفاع بمقياس الارتفاع."],
    "Lexin000669": ["Byggplatsens altitud är 100 meter.", "ارتفاع موقع البناء هو 100 متر."],
    "Lexin000672": ["Gjuta med snabbhärdande aluminatcement.", "الصب باستخدام أسمنت الألومينات سريع التصلب."],
    "Lexin000673": ["Krossad aluminatklinker.", "كلنكر ألومينات مطحون."],
    "Lexin000674": ["Skydda stålet genom aluminering.", "حماية الفولاذ عن طريق الطلاء بالألمنيوم."],
    "Lexin000676": ["Svepa in rören i aluminiumfolie.", "تغليف الأنابيب ورق الألمنيوم."],
    "Lexin000677": ["Taket är täckt med aluminiumplåt.", "السقف مغطى بصفائح الألمنيوم."],
    "Lexin000678": ["Tillsätta aluminiumsulfat i vattnet.", "إضافة كبريتات الألمنيوم إلى الماء."],
    "Lexin000679": ["Bygga på mark med alunskiffer.", "البناء عى أرض تحتوي على صخر نضuch (alunskiffer)."],
    "Lexin000681": ["Följa anvisningarna i AMA.", "اتباع التعليمات في AMA (المرجع العام للمواد والعمل)."],
    "Lexin000701": ["Epoxi innehåller ofta amin.", "الإيبوكسي يحتوي غالباً على الأمين."],
    "Lexin000706": ["Kylsystemet använder ammoniak.", "نظام التبريد يستخدم الأمونيا."],
    "Lexin000719": ["Ta ett amorteringsfritt lån under bygget.", "أخذ قرض بدون سداد أصل الدين أثناء البناء."],
    "Lexin000720": ["Betala av huset med ett amorteringslån.", "سداد ثمن المنزل بقرض مع أقساط."],
    "Lexin000722": ["Varje bygge måste ha en AMP.", "كل موقع بناء يجب أن يكون لديه خطة بيئة عمل (AMP)."],
    "Lexin000752": ["Analysera markproverna.", "تحليل عينات التربة."],
    "Lexin000754": ["Göra en analytisk dimensionering av balken.", "إجراء تحديد أبعاد تحليلي للعارضة."],
    "Lexin000774": ["Lämna in en anbudsansökan i tid.", "تقديم طلب المناقصة في الوقت المحدد."],
    "Lexin000775": ["Skriva under ett anbudsavtal.", "توقيع اتفاقية المناقصة."],
    "Lexin000776": ["Skicka ut en anbudsbegäran till firmor.", "إرسال طلب عروض أسعار للشركات."],
    "Lexin000777": ["Bifoga ett anbudsbrev.", "إرفاق خطاب عرض."],
    "Lexin000778": ["Fylla i anbudsformuläret korrekt.", "ملء استمارة المناقصة بشكل صحيح."],
    "Lexin000779": ["Ett öppet anbudsförfarande.", "إجراء مناقصة مفتوح."],
    "Lexin000780": ["Svara på en anbudsförfrågan.", "الرد على استفسار المناقصة."],
    "Lexin000781": ["Banken utfärdade en anbudsgaranti.", "أصدر البنك ضمان مناقصة."],
    "Lexin000783": ["Vi är klara med anbudsgranskningen.", "انتهينا من مراجعة العروض."],
    "Lexin000784": ["Alla anbudshandlingar måste vara med.", "جميع وثائق المناقصة يجب أن تكون موجودة."],
    "Lexin000785": ["Göra en noggrann anbudskalkyl.", "إجراء حساب دقيق للمناقصة."],
    "Lexin000786": ["Företagen bildade en olaglig anbudskartell.", "شكلت الشركات كارتل مناقصات غير قانوني."],
    "Lexin000787": ["Den totala anbudssumman.", "مجموع مبلغ العرض."],
    "Lexin000788": ["Läsa den finstilta anbudstexten.", "قراءة نص العرض المكتوب بخط صغير."],
    "Lexin000789": ["Anbudstiden går ut imorgon.", "فترة العرض تنتهي غداً."],
    "Lexin000790": ["Vinnaren i anbudstävlan.", "الفائز في مسابقة العطاءات."],
    "Lexin000791": ["Ta fram ett tydligt anbudsunderlag.", "إعداد وثائق مناقصة واضحة."],
    "Lexin000792": ["Göra en objektiv anbudsvärdering.", "إجراء تقييم موضوعي للعروض."],
    "Lexin000793": ["Vara med vid anbudsöppningen.", "الحضور عند فتح مظاريف العطاءات."],
    "Lexin000805": ["Betala sin andel av kostnaden.", "دفع حصته من التكلفة."],
    "Lexin000807": ["Investera i andelsboende.", "الاستثمار في السكن التشاركي."],
    "Lexin000809": ["Köpa en vecka i en andelslägenhet.", "شراء أسبوع في شقة بنظام المشاركة بالوقت."],
    "Lexin000825": ["Använd dammfilter eller andningsskydd.", "استخدم فلتر الغبار أو واقي التنفس."],
    "Lexin000846": ["Mäta vinden med en anemometer.", "قياس الرياح بمقياس شدة الريح."]
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

const backupPath = DATA_FILE + '.backup_construction1_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Construction Batch 1 completed!`);
