/**
 * Add examples to nouns - Batch 29 (100 nouns: Insamling to Jordbruk)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin012959": ["Insamlingen gav pengar.", "جمع الجمع أموالاً."],
    "Lexin012962": ["Insatslägenheten köptes.", "اشتُريت شقة التمليك."],
    "Lexin012963": ["Insekten flög.", "طارت الحشرة."],
    "Lexin012967": ["Insidan var varm.", "كانت الجهة الداخلية دافئة."],
    "Lexin012970": ["Insinuationen kränkte.", "جرح التلميح."],
    "Lexin012974": ["Insjuknandedagen noterades.", "دُون يوم المرض."],
    "Lexin012976": ["Insjön var djup.", "كانت البحيرة عميقة."],
    "Lexin012978": ["Inskolningen underlättade.", "سهل التعود."],
    "Lexin012979": ["Inskriften var gammal.", "كان النقش قديماً."],
    "Lexin012985": ["Inskrivningen skedde.", "حدث التسجيل."],
    "Lexin013006": ["Inspektionen genomfördes.", "أُجري التدقيق."],
    "Lexin013009": ["Inspektören granskade.", "فحص المفتش."],
    "Lexin013010": ["Inspelningen slutfördes.", "اكتمل التسجيل."],
    "Lexin013011": ["Inspirationen kom.", "جاء الإلهام."],
    "Lexin013013": ["Installationen gjordes.", "أُجري التركيب."],
    "Lexin013014": ["Installationen firades.", "احتُفل بالتنصيب."],
    "Lexin013026": ["Instinkten ledde.", "قادت الغريزة."],
    "Lexin013027": ["Institutet forskade.", "بحث المعهد."],
    "Lexin013033": ["Instruktören visade.", "أظهر المرشد."],
    "Lexin013034": ["Instrumentet användes.", "استُخدمت الأداة."],
    "Lexin013035": ["Instrumentet spelades.", "عُزفت الآلة الموسيقية."],
    "Lexin013046": ["Insulinet injicerades.", "حُقن الإنسولين."],
    "Lexin013067": ["Insändaren publicerades.", "نُشرت رسالة القارئ."],
    "Lexin013068": ["Insättningen bekräftades.", "أُكد الإدخال."],
    "Lexin013071": ["Intagen frigavs.", "أُطلق سراح السجين."],
    "Lexin013075": ["Intagningen ordnades.", "رُتب الاستقبال."],
    "Lexin013076": ["Intagningspoängen räckte.", "كفت نقاط الدخول."],
    "Lexin013102": ["Intelligensen testades.", "اختُبر الذكاء."],
    "Lexin013104": ["Intendenten ansvarade.", "تحمل المسؤول المسؤولية."],
    "Lexin013124": ["Intermezzot inträffade.", "حدث الحدث المفاجئ."],
    "Lexin013126": ["Internen släpptes.", "أُطلق سراح السجين."],
    "Lexin013129": ["Internatet var stort.", "كانت المدرسة الداخلية كبيرة."],
    "Lexin013139": ["Interneringen avslutades.", "انتهى الاعتقال."],
    "Lexin013141": ["Internetadressen sparades.", "حُفظ عنوان الإنترنت."],
    "Lexin013142": ["Internetleverantören hjälpte.", "ساعد مورد خدمات الإنترنت."],
    "Lexin013144": ["Interpellationen ställdes.", "قُدم استجواب الوزير."],
    "Lexin013149": ["Intervallet var kort.", "كان الفاصل الموسيقي قصيراً."],
    "Lexin013164": ["Intonationen varierade.", "تفاوت الترنيم."],
    "Lexin013168": ["Intranätet var säkert.", "كانت الانترا نت آمنة."],
    "Lexin013182": ["Intrigen var spännande.", "كانت حبكة الحكاية مثيرة."],
    "Lexin013187": ["Introduktionen gavs.", "أُعطي التقديم."],
    "Lexin013188": ["Introduktionen lyckades.", "نجح التعريف."],
    "Lexin013197": ["Inträdesavgiften betalades.", "دُفع رسم الدخول."],
    "Lexin013199": ["Intuitionen stämde.", "صح الهاجس."],
    "Lexin013204": ["Inuit lever i norr.", "يعيش الإنويت في الشمال."],
    "Lexin013209": ["Invaliden fick hjälp.", "حصل المعوق على مساعدة."],
    "Lexin013212": ["Invaliditeten bekräftades.", "أُكدت الإعاقة."],
    "Lexin013215": ["Invandrarbyrån hjälpte.", "ساعد مكتب خدمات المهاجرين."],
    "Lexin013219": ["Invandringen ökade.", "زادت الهجرة."],
    "Lexin013221": ["Invasionen skedde.", "حدث الغزو."],
    "Lexin013224": ["Invektivet sårade.", "جرح القدح."],
    "Lexin013225": ["Inventarierna räknades.", "أُحصيت الموجودات."],
    "Lexin013234": ["Invigningen hölls.", "أُقيم حفل الافتتاح."],
    "Lexin013235": ["Inviten accepterades.", "قُبلت الدعوة."],
    "Lexin013236": ["Invånaren röstade.", "صوت المواطن."],
    "Lexin013245": ["Inälvorna undersöktes.", "فُحصت الأعضاء الداخلية."],
    "Lexin013248": ["Irakiern reste.", "سافر العراقي."],
    "Lexin013250": ["Iraniern anlände.", "وصل الإيراني."],
    "Lexin013251": ["Iranskan hälsade.", "سلمت الإيرانية."],
    "Lexin013253": ["Ironin märktes.", "لوحظت السخرية."],
    "Lexin013257": ["Irritationen växte.", "نما الغضب."],
    "Lexin013258": ["Irritationsmomentet avlägsnades.", "أُزيل مسبب الإزعاج."],
    "Lexin013264": ["Isberget flöt.", "طفا الجبل الجليدي."],
    "Lexin013265": ["Isbrytaren bröt is.", "كسرت كاسحة الجليد الجليد."],
    "Lexin013267": ["Ischias ger smärta.", "يسبب عرق النسا ألماً."],
    "Lexin013268": ["Isglassen smakade gott.", "طعمت المثلجات جيداً."],
    "Lexin013269": ["Ishallen var kall.", "كانت قاعة ألعاب الشتاء باردة."],
    "Lexin013272": ["Islam praktiseras.", "يُمارس الإسلام."],
    "Lexin013274": ["Islänningen reste hem.", "عاد الإيسلندي للوطن."],
    "Lexin013282": ["Isoleringen monterades.", "رُكبت المادة العازلة."],
    "Lexin013285": ["Israelen bodde i Tel Aviv.", "سكن الإسرائيلي في تل أبيب."],
    "Lexin013290": ["Isterbandet stektes.", "قُلي سجق إيسترباند."],
    "Lexin013293": ["Italienaren lagade pasta.", "طبخ الإيطالي المعكرونة."],
    "Lexin013297": ["Ivern var stor.", "كان الحماس كبيراً."],
    "Lexin013305": ["Jacken kopplades.", "وُصل القابص الكهربائي."],
    "Lexin013306": ["Jacket var djupt.", "كان الخدش عميقاً."],
    "Lexin013308": ["Jackpotten vanns.", "فُزي بالجائزة الكبرى."],
    "Lexin013309": ["Jade är värdefull.", "اليشم ثمين."],
    "Lexin013317": ["Jagaren patrullerade.", "قام الطراد بدورية."],
    "Lexin013322": ["Jakaranda är vackert.", "الجكرندة جميلة."],
    "Lexin013324": ["Jakten seglade.", "أبحر اليخت."],
    "Lexin013325": ["Jaktkortet krävdes.", "طُلبت بطاقة الصيد."],
    "Lexin013330": ["Jantelagen kritiseras.", "يُنتقد قانون جانتي."],
    "Lexin013331": ["Januari är kall.", "يناير بارد."],
    "Lexin013332": ["Japanen reste hem.", "عاد الياباني للوطن."],
    "Lexin013335": ["Jargongen var typisk.", "كانت الرطانة نموذجية."],
    "Lexin013336": ["Jasminen blommade.", "أزهر الياسمين."],
    "Lexin013339": ["Jazz spelades.", "عُزفت موسيقى الجاز."],
    "Lexin013340": ["Jeansen var blå.", "كان بنطلون الجينز أزرق."],
    "Lexin013341": ["Jeepen körde i terräng.", "قادت سيارة الجيب في الوعر."],
    "Lexin013342": ["Jeten flög snabbt.", "طارت النفاثة بسرعة."],
    "Lexin013343": ["Jetseten reste lyxigt.", "سافرت طبقة الأثرياء بفخامة."],
    "Lexin013345": ["Jippot väckte uppmärksamhet.", "أثارت البدعة الانتباه."],
    "Lexin013357": ["Jobbaren arbetade hårt.", "عمل العامل بجد."],
    "Lexin013358": ["Jobbarkompisen hjälpte.", "ساعد زميل العمل."],
    "Lexin013363": ["Jobsposten kom.", "جاء الخبر السيئ."],
    "Lexin013366": ["Jokern användes.", "استُخدم الجوكر."],
    "Lexin013367": ["Jollen seglade.", "أبحر الزورق الصغير."],
    "Lexin013368": ["Jollret var sött.", "كانت ملاغاة الطفل لطيفة."],
    "Lexin013377": ["Jordbruket producerade.", "أنتجت المزرعة."]
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

const backupPath = DATA_FILE + '.backup_nouns29_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Done! Added examples to ${updated} nouns. Total: 2900 nouns!`);
