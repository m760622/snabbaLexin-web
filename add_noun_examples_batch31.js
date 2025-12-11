/**
 * Add examples to nouns - Batch 31 (100 nouns: Kamin to Kavaj)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin013681": ["Kaminen värmde rummet.", "أدفأت الدفاية الغرفة."],
    "Lexin013683": ["Kammaren var liten.", "كانت الحجرة صغيرة."],
    "Lexin013688": ["Kammarmusiken spelades.", "عُزفت الموسيقى الكلاسيكية."],
    "Lexin013689": ["Kammarrätten dömde.", "حكمت محكمة الاستئناف الإدارية."],
    "Lexin013696": ["Kamouflaget dolde soldaten.", "أخفى التمويه الجندي."],
    "Lexin013699": ["Kampanjen lyckades.", "نجحت الحملة."],
    "Lexin013701": ["Kamraten hjälpte.", "ساعد الزميل."],
    "Lexin013703": ["Kamratskapet var stark.", "كانت الزمالة قوية."],
    "Lexin013704": ["Kamrern ansvarade.", "تحمل مدير المحاسبة المسؤولية."],
    "Lexin013714": ["Kanadensaren paddlades.", "جُدفت الكنوه."],
    "Lexin013715": ["Kanadensaren reste hem.", "عاد الكندي للوطن."],
    "Lexin013720": ["Kanariefågeln sjöng.", "غنى الكناري."],
    "Lexin013722": ["Kandelabern lyste.", "أضاء الشمعدان."],
    "Lexin013723": ["Kandidaten valdes.", "انتُخب المرشح."],
    "Lexin013725": ["Kandidaturen anmäldes.", "أُعلن الترشيح."],
    "Lexin013727": ["Kanelen doftade.", "فاحت رائحة القرفة."],
    "Lexin013731": ["Kannibalen var farlig.", "كان آكل لحوم البشر خطيراً."],
    "Lexin013732": ["Kanonen avfyrades.", "أُطلق المدفع."],
    "Lexin013734": ["Kanoten paddlades.", "جُدفت الكنوه."],
    "Lexin013736": ["Kanslern beslutade.", "قرر المستشار."],
    "Lexin013737": ["Kansliet administrerade.", "أدارت الإدارة."],
    "Lexin013739": ["Kanslissvenskan var svår.", "كانت البيروقراطية السويدية صعبة."],
    "Lexin013742": ["Kantarellen plockades.", "قُطفت القوقعة الصفراء."],
    "Lexin013745": ["Kantinen serverade lunch.", "قدم المقصف الغداء."],
    "Lexin013746": ["Kantorn ledde kören.", "قاد قائد الجوقة الكورس."],
    "Lexin013749": ["Kanylen fördes in.", "أُدخلت القنية."],
    "Lexin013751": ["Kaoset spred sig.", "انتشرت الفوضى."],
    "Lexin013758": ["Kapellet var litet.", "كانت الكنيسة الصغيرة صغيرة."],
    "Lexin013759": ["Kapellet spelade.", "عزفت الجوقة."],
    "Lexin013762": ["Kapitalet investerades.", "استُثمر رأس المال."],
    "Lexin013765": ["Kapitalismen diskuterades.", "نوقشت الرأسمالية."],
    "Lexin013766": ["Kapitalisten ägde.", "امتلك الرأسمالي."],
    "Lexin013768": ["Kapitalvaran exporterades.", "صُدرت البضاعة الرأسمالية."],
    "Lexin013773": ["Kapningen misslyckades.", "فشل الاختطاف."],
    "Lexin013777": ["Han kom i kapp.", "لحق به."],
    "Lexin013779": ["Kapprummet var fullt.", "كانت غرفة المعاطف ممتلئة."],
    "Lexin013780": ["Kapprustningen eskalerade.", "تصاعد التسلح الحربي."],
    "Lexin013781": ["Kaprifolen doftade.", "فاحت رائحة صريمة الجدي."],
    "Lexin013782": ["Kapris används i matlagning.", "يُستخدم الكبر في الطبخ."],
    "Lexin013784": ["Kapseln svalde han.", "ابتلع الكبسولة."],
    "Lexin013786": ["Kapsylen öppnades.", "فُتحت السدادة."],
    "Lexin013787": ["Kaptenen styrde skeppet.", "قاد القبطان السفينة."],
    "Lexin013788": ["Kaptenen kommenderade.", "أمر الملازم."],
    "Lexin013790": ["Kapuschongen drogs upp.", "رُفعت القلنسوة."],
    "Lexin013791": ["Karet fylldes.", "امتلأ الحوض."],
    "Lexin013792": ["Karaffen stod på bordet.", "وقف الإبريق على الطاولة."],
    "Lexin013796": ["Karaktärsrollen spelades.", "مُثل دور الشخصية."],
    "Lexin013797": ["Karaktärsskådespelaren var duktig.", "كان ممثل الشخصيات ماهراً."],
    "Lexin013798": ["Karamellen smälte.", "ذابت الحلوى."],
    "Lexin013799": ["Karantänen hävdes.", "رُفع الحجر الصحي."],
    "Lexin013800": ["Karaten mättes.", "قيس القيراط."],
    "Lexin013801": ["Karate är populärt.", "الكراتيه شائعة."],
    "Lexin013802": ["Karavanen reste.", "سافرت القافلة."],
    "Lexin013803": ["Karbonpappret användes.", "استُخدم ورق الكربون."],
    "Lexin013804": ["Kardan kammade ullen.", "مشطت الممشطة الصوف."],
    "Lexin013805": ["Ge mig en karda!", "أعطني يداً!"],
    "Lexin013806": ["Kardanen överförde kraft.", "نقل الكردان القوة."],
    "Lexin013807": ["Kardemumman doftade.", "فاحت رائحة حب الهال."],
    "Lexin013808": ["Kardinalen utsågs.", "عُين الكاردينال."],
    "Lexin013811": ["Karenstiden gällde.", "سرت فترة الانتظار."],
    "Lexin013813": ["Karies behandlades.", "عولج تسوس الأسنان."],
    "Lexin013815": ["Karikatyren publicerades.", "نُشر الرسم الساخر."],
    "Lexin013816": ["Karisma hade han.", "كانت لديه جاذبية."],
    "Lexin013818": ["Karmen reparerades.", "رُمم الإطار."],
    "Lexin013820": ["Karnevalen firades.", "احتُفل بالكرنفال."],
    "Lexin013821": ["Karossen reparerades.", "رُمم هيكل السيارة."],
    "Lexin013822": ["Karosseriet målades.", "طُلي الهيكل المعدني."],
    "Lexin013823": ["Karotten fylldes.", "امتلأ الإناء."],
    "Lexin013824": ["Karrén stektes.", "شُوي عمود فقرات الخنزير."],
    "Lexin013825": ["Karriären utvecklades.", "تطور مجرى الحياة."],
    "Lexin013827": ["Karriäristen avancerade.", "تقدم الشخص الناجح مهنياً."],
    "Lexin013830": ["Kartellen bildades.", "تشكل التجمع."],
    "Lexin013836": ["Kartongen bars.", "حُمل الصندوق."],
    "Lexin013837": ["Kartoteket ordnades.", "رُتب سجل البطاقات."],
    "Lexin013838": ["Karusellen snurrade.", "دار الدوار."],
    "Lexin013840": ["Kasernen rymde soldater.", "استوعبت الثكنة الجنود."],
    "Lexin013841": ["Kasinot lockade.", "جذب الكازينو."],
    "Lexin013842": ["Kasperteatern roade barnen.", "أسعد مسرح العرائس الأطفال."],
    "Lexin013845": ["Kassan stängde.", "أغلقت الخزينة."],
    "Lexin013847": ["Kassarabatten gavs.", "أُعطي خصم الدفع النقدي."],
    "Lexin013848": ["Kassaskåpet låstes.", "أُقفلت الخزانة الفولاذية."],
    "Lexin013849": ["Kassen bars.", "حُمل الكيس."],
    "Lexin013851": ["Kassetten spelades.", "شُغل الشريط."],
    "Lexin013852": ["Kassettdäcket fungerade.", "عمل جهاز الأشرطة."],
    "Lexin013853": ["Kassettradion spelade.", "شغل جهاز الراديو مع المسجل."],
    "Lexin013855": ["Kassörskan räknade.", "عدت أمينة الصندوق."],
    "Lexin013859": ["Kastanjen rostades.", "حُمصت الكستناء."],
    "Lexin013865": ["Kastspöt kastades.", "رُميت صنارة الصيد."],
    "Lexin013866": ["Katalogen uppdaterades.", "حُدث الدليل."],
    "Lexin013868": ["Katalysatorn renar avgaser.", "ينقي الكتاليساتور العادم."],
    "Lexin013870": ["Katarren behandlades.", "عولج التهاب الغشاء المخاطي."],
    "Lexin013871": ["Katastrofen drabbade.", "ضربت الكارثة."],
    "Lexin013873": ["Katedern stod framme.", "وقف مكتب المدرس أماماً."],
    "Lexin013874": ["Katedralen besöktes.", "زُيرت الكتدرائية."],
    "Lexin013875": ["Kategorin valdes.", "اختُيرت الفئة."],
    "Lexin013878": ["Katolicismen praktiseras.", "تُمارس الكاثوليكية."],
    "Lexin013879": ["Katoliken bad.", "صلى الكاثوليكي."],
    "Lexin013882": ["Katten! Vad spelar det för roll?", "ما المبالاة! ما أهمية ذلك؟"],
    "Lexin013883": ["Kautschuken raderade.", "محت المحاية."],
    "Lexin013884": ["Kavajen passade.", "ناسب الجاكيت."]
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

const backupPath = DATA_FILE + '.backup_nouns31_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Done! Added examples to ${updated} nouns. Total: 3100 nouns!`);
