/**
 * Add examples to nouns - Batch 30 (100 nouns: Jordbrukare to Kameleont) - 3000 MILESTONE!
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin013378": ["Jordbrukaren odlade vete.", "زرع المزارع القمح."],
    "Lexin013383": ["Jordbävningen skakade staden.", "هز الزلزال المدينة."],
    "Lexin013385": ["Jordfästningen hölls i kyrkan.", "أُقيم الجناز في الكنيسة."],
    "Lexin013386": ["Jordgubben var röd.", "كانت الفراولة حمراء."],
    "Lexin013391": ["Jordskalvet mättes.", "قيست الهزة الأرضية."],
    "Lexin013392": ["Jordskredet blockerade vägen.", "سد الانزلاق الأرضي الطريق."],
    "Lexin013395": ["Joule är en enhet.", "الجول وحدة قياس."],
    "Lexin013396": ["Jouren var tung.", "كانت الخفارة ثقيلة."],
    "Lexin013403": ["Journalen uppdaterades.", "حُدث السجل."],
    "Lexin013404": ["Journalen sändes.", "بُثت الصحيفة."],
    "Lexin013410": ["Det är bara jox.", "هذا مجرد هراء."],
    "Lexin013416": ["Jubileet firades.", "احتُفل باليوبيل."],
    "Lexin013418": ["Juden bad i synagogan.", "صلى اليهودي في الكنيس."],
    "Lexin013421": ["Jugoslaven reste hem.", "عاد اليوغسلافي للوطن."],
    "Lexin013426": ["Julafton är den 24 december.", "ليلة عيد الميلاد في 24 ديسمبر."],
    "Lexin013427": ["Julbordet serverades.", "قُدم بوفيه عيد الميلاد."],
    "Lexin013429": ["Julgranen dekorerades.", "زُينت شجرة عيد الميلاد."],
    "Lexin013430": ["Julgransplundringen hölls.", "أُقيم حفل إخلاء الشجرة."],
    "Lexin013431": ["Juli är varm.", "يوليو حار."],
    "Lexin013432": ["Julklappen öppnades.", "فُتحت هدية عيد الميلاد."],
    "Lexin013433": ["Julkrubban visades.", "عُرض مهد المسيح."],
    "Lexin013434": ["Julottan hölls tidigt.", "أُقيم قداس عيد الميلاد مبكراً."],
    "Lexin013435": ["Julskinkan åts.", "أُكل فخذ خنزير عيد الميلاد."],
    "Lexin013437": ["Jumbon kom sist.", "جاء صاحب المرتبة الأخيرة أخيراً."],
    "Lexin013438": ["Jumbojeten var stor.", "كانت طائرة الجمبو النفاثة كبيرة."],
    "Lexin013439": ["Jumpan var rolig.", "كانت التمارين الرياضية ممتعة."],
    "Lexin013441": ["Jumpern var mjuk.", "كانت البلوزة ناعمة."],
    "Lexin013442": ["Jungfrun Maria äras.", "تُكرم مريم العذراء."],
    "Lexin013445": ["Juni är sommar.", "يونيو صيف."],
    "Lexin013446": ["Juniorn spelade bra.", "لعب الناشئ جيداً."],
    "Lexin013447": ["Juntan tog makten.", "استولت العصبة على السلطة."],
    "Lexin013449": ["Juridiken studerades.", "دُرس علم القانون."],
    "Lexin013459": ["Juristen gav råd.", "قدم الحقوقي نصيحة."],
    "Lexin013462": ["Juryn fann honom skyldig.", "وجدته هيئة المحلفين مذنباً."],
    "Lexin013470": ["Justeringsmannen granskade.", "دقق ضابط المحضر."],
    "Lexin013476": ["Justitiemordet fördömdes.", "أُدينت الجريمة بحق القانون."],
    "Lexin013479": ["Juvelen var dyrbar.", "كانت الجوهرة ثمينة."],
    "Lexin013480": ["Juveleraren sålde ringar.", "باع الجوهري الخواتم."],
    "Lexin013481": ["Juvret producerade mjölk.", "أنتج الضرع الحليب."],
    "Lexin013482": ["Jycken skällde.", "نبح الكلب."],
    "Lexin013483": ["Jägaren sköt.", "أطلق الصياد النار."],
    "Lexin013487": ["Jäktet var stressigt.", "كانت العجلة مرهقة."],
    "Lexin013497": ["Jämförpriset visades.", "أُظهر سعر المقارنة."],
    "Lexin013506": ["Jämmern hördes.", "سُمع الأنين."],
    "Lexin013513": ["Han klagar jämnan.", "يشتكي دائماً."],
    "Lexin013517": ["Med jämnmod tog han det.", "تقبل الأمر بقبول."],
    "Lexin013532": ["Jämten är stolt.", "اليمتلاندي فخور."],
    "Lexin013538": ["Jäntan sprang.", "ركضت الفتاة."],
    "Lexin013539": ["Järnet smältes.", "صُهر الحديد."],
    "Lexin013540": ["Järnet ordinerades.", "وُصف الحديد."],
    "Lexin013546": ["Järnhandeln sålde verktyg.", "باع متجر الخردوات الأدوات."],
    "Lexin013547": ["Järnnätterna kom.", "جاءت ليالي الصقيع."],
    "Lexin013550": ["Järnverket producerade stål.", "أنتج مصنع الحديد الفولاذ."],
    "Lexin013555": ["Jäsningen pågick.", "استمر التخمير."],
    "Lexin013556": ["Jästen användes.", "استُخدمت الخميرة."],
    "Lexin013557": ["Jätten var stor.", "كان العملاق ضخماً."],
    "Lexin013562": ["Jäv anmäldes.", "أُبلغ عن الانحياز."],
    "Lexin013571": ["K-pisten avfyrades.", "أُطلق المدفع الرشاش."],
    "Lexin013572": ["Kabarén var rolig.", "كان الاسكتش الغنائي ممتعاً."],
    "Lexin013574": ["Kabel-TV installerades.", "رُكب التلفزيون بالكابل."],
    "Lexin013577": ["Kabinen var trång.", "كانت القمرة ضيقة."],
    "Lexin013579": ["Kabinettet sammanträdde.", "اجتمعت الحكومة."],
    "Lexin013580": ["Kabinettssekreteraren rapporterade.", "قدم سكرتير الحكومة تقريراً."],
    "Lexin013583": ["Kackerlackan kröp.", "زحف الصرصار."],
    "Lexin013585": ["Kadavret ruttnade.", "تعفنت جثة الحيوان."],
    "Lexin013586": ["Kadaverdisciplinen krävdes.", "طُلب الانضباط التام."],
    "Lexin013593": ["Kaféet serverade kaffe.", "قدم المقهى القهوة."],
    "Lexin013596": ["Kaffebryggaren kokade.", "غلت ماكينة القهوة."],
    "Lexin013598": ["Kajen var lång.", "كان رصيف الميناء طويلاً."],
    "Lexin013600": ["Kajan flög.", "طار غراب الزرع."],
    "Lexin013601": ["Kajaken paddlades.", "جُدفت كنوه الكاجاك."],
    "Lexin013602": ["Kajutan var bekväm.", "كانت القمرة الصغيرة مريحة."],
    "Lexin013605": ["Kakan sparades.", "حُفظ الكوكي."],
    "Lexin013607": ["Kaklet sattes upp.", "رُكب الخزف الصيني."],
    "Lexin013610": ["Kaktusen växte.", "نما الصبار."],
    "Lexin013613": ["Kalabaliken uppstod.", "اندلع الشغب."],
    "Lexin013614": ["Kalaset hölls.", "أُقيم الحفل."],
    "Lexin013617": ["Kalasbyxan var varm.", "كان السروال الدافئ دافئاً."],
    "Lexin013618": ["Kalaskulan växte.", "نما الكرش."],
    "Lexin013624": ["Kalhygget syntes.", "ظهرت المنطقة المقطوعة."],
    "Lexin013625": ["Kalibern mättes.", "قيس العيار."],
    "Lexin013634": ["Kalkonen stektes.", "شُوي الديك الرومي."],
    "Lexin013637": ["Kalkylen gjordes.", "أُجري الحساب."],
    "Lexin013639": ["Kalkylatorn räknade.", "حسبت الآلة الحاسبة."],
    "Lexin013650": ["Kallbranden spred sig.", "انتشرت الغرغرينا."],
    "Lexin013651": ["Kallduschen väckte honom.", "أيقظه الدوش البارد."],
    "Lexin013653": ["Kallelsen kom.", "جاء النداء الداخلي."],
    "Lexin013659": ["Kallskuret serverades.", "قُدمت الشرائح الباردة."],
    "Lexin013660": ["Kallskänkan arbetade.", "عملت طباخة الوجبات الباردة."],
    "Lexin013661": ["Kallsupen togs.", "أُخذت شرقة الماء."],
    "Lexin013662": ["Kallsvetten kom.", "جاء عرق القلق."],
    "Lexin013668": ["Kalopsen åts.", "أُكل الكالوبس."],
    "Lexin013669": ["Kalorin beräknades.", "حُسب السعر الحراري."],
    "Lexin013670": ["Kalotten bars.", "ارتُديت القلنسوة الضيقة."],
    "Lexin013671": ["Kalsongerna tvättades.", "غُسل اللباس الداخلي."],
    "Lexin013672": ["Kalufsen var rufsig.", "كان الشعر المنكوش أشعثاً."],
    "Lexin013673": ["Kalven diade.", "رضع العجل."],
    "Lexin013675": ["Kammen var hög.", "كانت القمة عالية."],
    "Lexin013677": ["Kamelen vandrade.", "سار القرعوس."],
    "Lexin013678": ["Kameleonten bytte färg.", "غيرت الحرباء لونها."]
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

const backupPath = DATA_FILE + '.backup_nouns30_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`🎉🎉🎉 3000 MILESTONE! 3000 nouns now have examples! 🎉🎉🎉`);
