/**
 * Add examples to CONSTRUCTION terms - Batch 12 (100 terms: Högtryckslaminat to Konstruktionsberäkningar)
 * Carefully matching IDs from construction_pending_batch.json
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin012343": ["Bänkskiva i högtryckslaminat.", "سطح عمل من صفيحة (Laminat) عالية الضغط."],
    "Lexin012349": ["Arbeta på hög höjd.", "العمل على ارتفاع شاهق."],
    "Lexin012352": ["Höjdkurvorna visar att marken lutar.", "خطوط الكنتور (الارتفاع) تظهر أن الأرض مائلة."],
    "Lexin012355": ["Göra en höjning av marknivån.", "إجراء رفع لمستوى الأرض."],
    "Lexin012401": ["Använd alltid hörselskydd i bullrig miljö.", "استخدم دائماً واقيات السمع في البيئة الصاخبة."],
    "Lexin012455": ["Vi har en policy om icke-diskriminering.", "لدينا سياسة عدم التميز."],
    "Lexin012462": ["Visa ditt ID06-kort vid grinden.", "أظهر بطاقة ID06 عند البوابة."],
    "Lexin012598": ["Bygga altanen med impregnerat virke.", "بناء الشرفة بخشب معالج (impregnerat)."],
    "Lexin012599": ["Utföra impregnering av fasaden.", "إجراء تشريب (عزل) للواجهة."],
    "Lexin012641": ["Lägenheten har inbyggd förvaring.", "الشقة بها تخزين مدمج (في الحائط)."],
    "Lexin012750": ["Företaget arbetar med infraservice.", "الشركة تعمل في خدمات البنية التحتية."],
    "Lexin012752": ["Investera i ny infrastruktur.", "الاستثمار في بنية تحتية جديدة."],
    "Lexin012815": ["Täta sprickan med injektering.", "سد الشق بالحقن."],
    "Lexin012816": ["Blanda injekteringsbruk.", "خلط مونة الحقن."],
    "Lexin012855": ["Göra inköp av material.", "إجراء شراء للمواد."],
    "Lexin012856": ["Jobba som inköpare.", "العمل كمشتري."],
    "Lexin012874": ["Påbörja inläggning av mattan.", "البدء بتركيب السجادة."],
    "Lexin012877": ["Göra en noggrann inmätning av tomten.", "إجراء مسح دقيق للأرض."],
    "Lexin012909": ["Måla en innervägg.", "طلاء جدار داخلي."],
    "Lexin012924": ["Reglera husets inomhustemperatur.", "تنظيم درجة حرارة المنزل الداخلية."],
    "Lexin013015": ["Prata med vår installationsledare.", "تحدث مع قائد التركيبات لدينا."],
    "Lexin013016": ["Vi söker en installationsmontör.", "نحن نبحث عن فني تركيبات."],
    "Lexin013017": ["Boka möte med installationssamordnaren.", "حجز موعد مع منسق التركيبات."],
    "Lexin013018": ["Anlita en behörig installatör.", "توظيف فني تركيب معتمد."],
    "Lexin013025": ["Montera dörren med instickskarm.", "تركيب الباب بإطار (karm) إدخال (دون إزالة القديم)."],
    "Lexin013098": ["Skydda de anställdas integritet.", "حماية خصوصية الموظفين."],
    "Lexin013120": ["Måla husets interiör.", "طلاء داخل المنزل."],
    "Lexin013177": ["Ha löpande intressentdialoger.", "إجراء حوارات مستمرة مع أصحاب المصلحة."],
    "Lexin013178": ["Kalla intressenterna till möte.", "دعوة أصحاب المصلحة للاجتماع."],
    "Lexin013276": ["Använd isolerande handskar vid elarbete.", "استخدم قفازات عازلة عند العمل بالكهرباء."],
    "Lexin013277": ["Endast isolerande handverktyg får användas.", "يسمح فقط باستخدام أدوات يدوية عازلة."],
    "Lexin013278": ["Kabeln har ett isolerande hölje.", "الكابل له غلاف عازل."],
    "Lexin013375": ["Utföra jordborrning för bergvärme.", "إجراء حفر في الأرض للطاقة الجوفية."],
    "Lexin013382": ["Platta till jorden med en jordbruksvält.", "دك الأرض بمدحلة زراعية."],
    "Lexin013387": ["Gräva ner en jordkabel.", "دفن كابل أرضي."],
    "Lexin013524": ["Vi jobbar för jämställdhet på bygget.", "نحن نعمل من أجل المساواة في موقع البناء."],
    "Lexin013542": ["Smid järnet medan det är varmt.", "أطرق الحديد وهو ساخن."],
    "Lexin013552": ["Bygga en ny järnväg.", "بناء خط سكة حديد جديد."],
    "Lexin013570": ["Huset är K-märkt och får inte rivas.", "المنزل مصنف تراثياً ولا يجوز هدمه."],
    "Lexin013575": ["Dölja kablarna i en kabelkanal.", "إخفاء الكابلات في قناة كابلات."],
    "Lexin013576": ["Klippa kabeln med en kabelsax.", "قص الكابل بمقص كابلات."],
    "Lexin013582": ["Dra kablar i väggen.", "سحب الكابلات في الجدار."],
    "Lexin013599": ["Lägga till vid kajen.", "الرسو عند الرصيف."],
    "Lexin013608": ["Sätta vitt kakel i köket.", "تركيب بلاط أبيض في المطبخ."],
    "Lexin013609": ["Köpa kakelfix och fog.", "شراء لاصق بلاط وروبة."],
    "Lexin013628": ["Stryka väggen med kalkborste.", "دهن الجدار بفرشاة الجير."],
    "Lexin013629": ["Mura med kalkbruk.", "البناء بمونة الجير."],
    "Lexin013630": ["Putsa med kalkcementfärg.", "اللياسة بطلاء جير أسمنتي."],
    "Lexin013632": ["Måla fasaden med kalkfärg.", "طلاء الواجهة بطلاء الجير."],
    "Lexin013633": ["Gammaldags kalkmålning.", "طلاء بالجير على الطراز القديم."],
    "Lexin013635": ["Bygga väggen av kalksandsten.", "بناء الجدار من طوب الرمل الجيري."],
    "Lexin013636": ["Trappa av kalksten.", "سلم من الحجر الجيري."],
    "Lexin013638": ["Göra en kalkyl på jobbet.", "عمل تقدير تكلفة للعمل."],
    "Lexin013641": ["Noggrann kalkylering är viktigt.", "حساب التكلفة الدقيق مهم."],
    "Lexin013642": ["Vår kalkylingenjör räknar på anbudet.", "مهندس التقديرات لدينا يحسب لعطاء المناقصة."],
    "Lexin013648": ["Laga hålet i asfalten med kallasfalt.", "إصلاح الحفرة في الأسفلت بأسفلت بارد."],
    "Lexin013657": ["Täta fönstret för att slippa kallras.", "عزل النافذة لتجنب تيارات الهواء البارد."],
    "Lexin013705": ["Använda kamspik i regelverket.", "استخدام مسامير محززة (kamspik) في الهيكل."],
    "Lexin013706": ["Fästa beslagen med kamspik.", "تثبيت التجهيزات بمسامير محززة."],
    "Lexin013717": ["Förbereda kanalisation för fiber.", "تجهيز القنوات للألياف الضوئية."],
    "Lexin013743": ["Göra en kantförstyvning på plattan.", "عمل تقوية للحافة في البلاطة."],
    "Lexin013819": ["Skruva fast karmen med karmskruv.", "تثبيت الإطار ببراغي الإطار."],
    "Lexin013826": ["Göra karriär inom bygg.", "بناء مستقبل مهني (سيرة مهنية) في مجال البناء."],
    "Lexin013829": ["Titta på en karta över området.", "انظر إلى خريطة للمنطقة."],
    "Lexin013867": ["Beställa varor från en katalog.", "طلب بضائع من كتالوج."],
    "Lexin013913": ["Analysera betongens kemiska sammansättning.", "تحليل التركيب الكيميائي للخرسانة."],
    "Lexin013920": ["Måla keramik.", "طلاء السيراميك."],
    "Lexin013922": ["Lägga keramiska plattor i hallen.", "وضع بلاطات سيراميك في المدخل."],
    "Lexin014015": ["Fästa röret med klammer.", "تثبيت الأنبوب بمشبك."],
    "Lexin014017": ["Skjuta fast plasten med klammermaskin.", "تثبيت البلاستيك بمسدس دبابيس."],
    "Lexin014089": ["Ytan har en klibbig beläggning.", "السطح عليه طبقة لزجة."],
    "Lexin014097": ["Lägga golv med klicksystem.", "تركيب أرضية بنظام النقر (Click)."],
    "Lexin014106": ["Bygga hus som tål klimatförändring.", "بناء منازل تقاوم التغير المناخي."],
    "Lexin014107": ["Ta klimathotet på allvar.", "أخذ التهديد المناخي على محمل الجد."],
    "Lexin014108": ["Minska byggets klimatpåverkan.", "تقليل الأثر المناخي للبناء."],
    "Lexin014109": ["Täta husets klimatskärm.", "عزل غلاف المبنى (klimatskärm)."],
    "Lexin014110": ["Detta är en stor klimatutmaning.", "هذا تحدٍ مناخي كبير."],
    "Lexin014118": ["Lägga klinker i badrummet.", "تركيب بلاط (Klinker) في الحمام."],
    "Lexin014125": ["Klippa tråden med en klipptång (avbitartång).", "قطع السلك بكماشة قطع."],
    "Lexin014129": ["Stryka lim med klisterpensel.", "دهن الغراء بفرشاة لاصق."],
    "Lexin014210": ["Följa planen för KMA.", "اتباع خطة الجودة والبيئة وبيئة العمل (KMA)."],
    "Lexin014373": ["Minska fabrikens koldioxidutsläpp.", "تقليل انبعاثات ثاني أكسيد الكربون للمصنع."],
    "Lexin014385": ["Risk för kollaps av taket.", "خطر انهيار السقف."],
    "Lexin014390": ["Prata med en kollega.", "تحدث مع زميل."],
    "Lexin014405": ["Förhindra kollision mellan fordon.", "منع التصادم بين المركبات."],
    "Lexin014443": ["Installera komfortkyla i kontoret.", "تركيب تكييف للراحة في المكتب."],
    "Lexin014449": ["Bygga för kommande generationer.", "البناء للأجيال القادمة."],
    "Lexin014483": ["Tomten ligger på kommunal mark.", "الأرض تقع على أرض تابعة للبلدية."],
    "Lexin014505": ["Kontakta kommunikationsavdelningen.", "اتصل بقسم الاتصالات."],
    "Lexin014558": ["Byta ut en trasig komponent.", "استبدال مكون مكسور."],
    "Lexin014560": ["Trallen är gjord av komposit.", "أرضية الشرفة مصنوعة من مركب (komposit)."],
    "Lexin014566": ["Lägga en kompress på såret.", "وضع ضمادة على الجرح."],
    "Lexin014569": ["Köra med tryckluft från kompressor.", "التشغيل بهواء مضغوط من كمبروسر."],
    "Lexin014570": ["Slänga kartongerna i en komprimator.", "رمي الكراتين في ضاغطة نفايات."],
    "Lexin014576": ["Ställa ut en kon på vägen.", "وضع قمع مرور على الطريق."],
    "Lexin014591": ["Möte med vår koncernchef.", "اجتماع مع رئيس المجموعة."],
    "Lexin014595": ["Farliga kondensatorer i lampan.", "مكثفات خطرة في المصباح."],
    "Lexin014596": ["Torka källaren med en kondensavfuktare.", "تجميف القبو بمزيل رطوبة بالتكثيف."],
    "Lexin014647": ["Stärka företagets konkurrenskraft.", "تعزيز التنافسية للشركة."],
    "Lexin014713": ["Göra konstruktionsberäkningar för taket.", "إجراء حسابات إنشائية للسقف."]
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

const backupPath = DATA_FILE + '.backup_construction12_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Construction Batch 12 completed!`);
