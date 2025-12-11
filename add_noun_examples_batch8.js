/**
 * Add examples to nouns - Batch 8 (100 nouns: Blodsband to Bosniska)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin003653": ["Blodsbanden höll familjen samman.", "حافظت روابط القرابة على تماسك العائلة."],
    "Lexin003662": ["Blodsugaren utnyttjade de fattiga.", "استغل الطفيلي الفقراء."],
    "Lexin003663": ["Kriget ledde till stor blodsutgjutelse.", "أدت الحرب إلى سيلان دماء كثيرة."],
    "Lexin003666": ["Blodtransfusionen räddade hans liv.", "أنقذ نقل الدم حياته."],
    "Lexin003678": ["Blodvitet var litet.", "كان الجرح النازف صغيراً."],
    "Lexin003682": ["Rosen stod i full blom.", "كانت الوردة في كامل إزهارها."],
    "Lexin003683": ["Blomkål är nyttig grönsak.", "القرنبيط خضار مفيد."],
    "Lexin003688": ["Hon fick ett blommogram på födelsedagen.", "تلقت تلغراف زهور في عيد ميلادها."],
    "Lexin003689": ["Blomster prydde bordet.", "زينت الزهور الطاولة."],
    "Lexin003692": ["Blondinen hade ljust hår.", "كانت الشقراء فاتحة الشعر."],
    "Lexin003693": ["Blosset lyste upp mörkret.", "أضاء المشعل الظلام."],
    "Lexin003694": ["Han tog ett djupt bloss.", "أخذ نفساً عميقاً من السيجارة."],
    "Lexin003696": ["Vikingarna höll blot för gudarna.", "أقام الفايكنج قرابين للآلهة."],
    "Lexin003702": ["Blottaren greps av polisen.", "ألقت الشرطة القبض على المستعرض."],
    "Lexin003704": ["Bluesen kom från afroamerikansk kultur.", "جاء البلوز من الثقافة الأفريقية الأمريكية."],
    "Lexin003705": ["Det var bara en bluff.", "كان ذلك مجرد خداع."],
    "Lexin003707": ["Han fick inte en blund sömn.", "لم يغمض له جفن."],
    "Lexin003709": ["Han begick en allvarlig blunder.", "ارتكب خطأً فادحاً."],
    "Lexin003710": ["Blusen var gjord av siden.", "كانت البلوزة مصنوعة من الحرير."],
    "Lexin003711": ["Bly är en tung metall.", "الرصاص معدن ثقيل."],
    "Lexin003713": ["Blyerts används i pennor.", "يُستخدم الغرافيت في الأقلام."],
    "Lexin003715": ["Blygden är den yttre delen.", "الشفر هو الجزء الخارجي."],
    "Lexin003722": ["Hon kände blygsel inför publiken.", "شعرت بالخجل أمام الجمهور."],
    "Lexin003726": ["Blådåren hoppade från klippan.", "قفز المتهور من الصخرة."],
    "Lexin003728": ["Blåklinten växer i fält.", "ينمو القنطريون في الحقول."],
    "Lexin003735": ["Urinblåsan samlar urin.", "تجمع المثانة البول."],
    "Lexin003736": ["Blåsaren spelade trumpet.", "عزف النافخ البوق."],
    "Lexin003742": ["Blåsippan blommar på våren.", "يزهر الشُقار الكبدي في الربيع."],
    "Lexin003743": ["Blåskatarren orsakade smärta.", "سبب التهاب المثانة ألماً."],
    "Lexin003749": ["Det var en riktig blåsning.", "كانت غشّاً حقيقياً."],
    "Lexin003751": ["Blåsten böjde träden.", "ثنت العاصفة الأشجار."],
    "Lexin003752": ["Blåstället skyddade mot smuts.", "وفر رداء العمل حماية من الأوساخ."],
    "Lexin003754": ["Vi stannade inne på grund av blåsvädret.", "بقينا في الداخل بسبب الجو العاصف."],
    "Lexin003755": ["Han fick en blåtira i slagsmålet.", "أصيب بكدمة حول عينه في الشجار."],
    "Lexin003758": ["Bläcket i pennan tog slut.", "نفد المداد في القلم."],
    "Lexin003759": ["Bläckfisken sprider bläck för att fly.", "ينشر الأخطبوط الحبر للهروب."],
    "Lexin003766": ["Lyckan var ett bländverk.", "كانت السعادة وهماً."],
    "Lexin003770": ["Blödarsjukan är ärftlig.", "الناعورية مرض وراثي."],
    "Lexin003781": ["Tvätten måste ligga i blöt.", "يجب أن ينقع الغسيل."],
    "Lexin003782": ["Blötan gjorde gatorna hala.", "جعل المطر الشوارع زلقة."],
    "Lexin003783": ["Blötdjuren lever i havet.", "تعيش الحيوانات المائية في البحر."],
    "Lexin003788": ["Fågeln byggde ett bo.", "بنى الطائر عشاً."],
    "Lexin003789": ["Boet efter den avlidne inventerades.", "تم جرد ممتلكات المتوفى."],
    "Lexin003791": ["Boaormen kväver sina offer.", "يخنق البُواء ضحاياه."],
    "Lexin003793": ["Du behöver ett boardingcard för att gå ombord.", "تحتاج بطاقة ركوب للصعود."],
    "Lexin003795": ["Bobinen med garn tog slut.", "نفدت بكرة الخيط."],
    "Lexin003796": ["Bocken ledde flocken.", "قاد التيس القطيع."],
    "Lexin003797": ["Bocken höll upp bordet.", "دعم المسند الخشبي الطاولة."],
    "Lexin003806": ["Verktygen förvaras i boden.", "تُحفظ الأدوات في السقفية."],
    "Lexin003811": ["Bodybuilding kräver disciplin.", "تتطلب كمال الأجسام انضباطاً."],
    "Lexin003812": ["Boendet i lägenhet kan vara dyrt.", "قد يكون السكن في شقة مكلفاً."],
    "Lexin003819": ["Klockans boett var av guld.", "كانت علبة الساعة من الذهب."],
    "Lexin003821": ["Bofinken sjöng i trädet.", "غنى الحسون في الشجرة."],
    "Lexin003823": ["Hästens bog var stark.", "كان كتف الحصان قوياً."],
    "Lexin003824": ["Båtens bog skar genom vågorna.", "شق مقدم القارب الأمواج."],
    "Lexin003828": ["Bohaget flyttades till det nya huset.", "نُقل المتاع إلى المنزل الجديد."],
    "Lexin003830": ["Bohemen levde ett fritt liv.", "عاش البوهيمي حياة حرة."],
    "Lexin003832": ["Bojen markerade farleden.", "حددت العوامة الممر البحري."],
    "Lexin003833": ["Fången bar bojor på fötterna.", "حمل السجين قيوداً في قدميه."],
    "Lexin003834": ["Bojkotten påverkade företaget.", "أثرت المقاطعة على الشركة."],
    "Lexin003837": ["Boken var spännande.", "كان الكتاب مشوقاً."],
    "Lexin003838": ["Hon skrev i sin bok.", "كتبت في دفترها."],
    "Lexin003841": ["Bokbussen kom till byn varje vecka.", "جاءت المكتبة السيارة للقرية كل أسبوع."],
    "Lexin003850": ["Bokhandeln säljer böcker och tidningar.", "تبيع المكتبة كتباً ومجلات."],
    "Lexin003858": ["Bokstavstro kan vara problematisk.", "قد يكون الإيمان الحرفي مشكلة."],
    "Lexin003859": ["Bokstödet höll böckerna upprätt.", "أبقى مسند الكتب الكتب منتصبة."],
    "Lexin003869": ["Pengarna spenderades på boliner.", "أُنفقت الأموال بلا رقابة."],
    "Lexin003870": ["Barnen lekte med bollen.", "لعب الأطفال بالكرة."],
    "Lexin003872": ["Han har ett bra bollsinne.", "لديه موهبة جيدة في الكرة."],
    "Lexin003874": ["Bolmörten är giftig.", "البنج نبات سام."],
    "Lexin003875": ["Bolsjevikerna tog makten 1917.", "استولى البلاشفة على السلطة عام 1917."],
    "Lexin003876": ["Bolstret var fyllt med fjädrar.", "كان اللحاف محشواً بالريش."],
    "Lexin003877": ["Bommen hindrade trafiken.", "منع القضيب حركة المرور."],
    "Lexin003883": ["Bombmattan förstörde staden.", "دمرت حصيرة القنابل المدينة."],
    "Lexin003891": ["Bonaden hängde på väggen.", "علقت اللوحة القماشية على الحائط."],
    "Lexin003894": ["Bonden rörde sig framåt.", "تحرك البيدق للأمام."],
    "Lexin003895": ["Bondfångaren lurade turisten.", "خدع النصاب السائح."],
    "Lexin003896": ["Bondgården hade kor och grisar.", "كان في المزرعة أبقار وخنازير."],
    "Lexin003898": ["Han tog bondpermission.", "أخذ إجازة غير مصرح بها."],
    "Lexin003900": ["De flyttade till bondvischan.", "انتقلوا إلى الريف."],
    "Lexin003904": ["Bootsen var bekväma.", "كانت الجزمة مريحة."],
    "Lexin003909": ["Bordellen stängdes av polisen.", "أغلقت الشرطة بيت الدعارة."],
    "Lexin003914": ["Borgen var byggd på en kulle.", "بُنيت القلعة على تلة."],
    "Lexin003916": ["Borgaren röstade på högerpartiet.", "صوت البرجوازي للحزب اليميني."],
    "Lexin003917": ["Borgaren drev handel i staden.", "مارس الإقطاعي التجارة في المدينة."],
    "Lexin003918": ["Borgarrådet ledde mötet.", "أدار مستشار البلدية الاجتماع."],
    "Lexin003923": ["Borgenären krävde betalning.", "طالب الدائن بالدفع."],
    "Lexin003930": ["Borgmästaren invigde bron.", "افتتح رئيس البلدية الجسر."],
    "Lexin003938": ["Borriggen borrade efter olja.", "حفر برج الحفر بحثاً عن النفط."],
    "Lexin003940": ["Borrningen pågick i månader.", "استمر الحفر شهوراً."],
    "Lexin003941": ["Borrplattformen stod i havet.", "وقفت منصة الحفر في البحر."],
    "Lexin003942": ["Borrtornet syntes på långt håll.", "ظهر برج الحفر من بعيد."],
    "Lexin003945": ["Borsten rengjorde skorna.", "نظفت الفرشاة الأحذية."],
    "Lexin003960": ["Bortovaron varade i en vecka.", "استمر الغياب أسبوعاً."],
    "Lexin003970": ["Boskapen betade på ängen.", "رعت الماشية في المرج."],
    "Lexin003971": ["Boskiftet fördelades rättvist.", "وُزع تقسيم الملكية بعدالة."],
    "Lexin003972": ["Boskillnaden skedde vid skilsmässan.", "تم توزيع الممتلكات عند الطلاق."],
    "Lexin003974": ["Bosniern berättade om kriget.", "روى البوسني عن الحرب."],
    "Lexin003976": ["Bosniska talas i Bosnien.", "يُتحدث البوسنية في البوسنة."],
    "Lexin003977": ["Bosniskan arbetade som tolk.", "عملت البوسنية كمترجمة."]
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

const backupPath = DATA_FILE + '.backup_nouns8_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Done! Added examples to ${updated} nouns.`);
