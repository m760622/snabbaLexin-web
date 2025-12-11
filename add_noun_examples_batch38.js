/**
 * Add examples to nouns - Batch 38 (100 nouns: Kålrot to Landsbygd)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin015585": ["Kålroten kokades.", "طُبخ اللفت السويدي."],
    "Lexin015586": ["De är samma kålsupare.", "هم من نفس النمط."],
    "Lexin015588": ["Kåpan skyddade.", "حمى الغطاء الواقي."],
    "Lexin015589": ["Kåpan bars.", "ارتُدي الغطاء."],
    "Lexin015590": ["Kåren sammanträdde.", "اجتمع السلك."],
    "Lexin015591": ["En kåre blåste.", "هب نسيم."],
    "Lexin015592": ["Kåseriet lästes.", "قُرئ العمود الصحفي."],
    "Lexin015593": ["Kåsören skrev.", "كتب محرر العمود."],
    "Lexin015595": ["Kåtan byggdes.", "بُني كوخ اللابيين."],
    "Lexin015597": ["Käften var stor.", "كان الفك كبيراً."],
    "Lexin015599": ["Käglan slogs ner.", "أُسقطت القنينة الخشبية."],
    "Lexin015600": ["Käket var gott.", "كان الطعام جيداً."],
    "Lexin015603": ["Käken undersöktes.", "فُحص الفك."],
    "Lexin015609": ["Kälken åktes.", "انزلقت المزلجة."],
    "Lexin015615": ["Källarmästaren välkomnade.", "رحب مدير المطعم."],
    "Lexin015617": ["Källskatten drogs.", "خُصمت الضريبة على مصدر الدخل."],
    "Lexin015619": ["Kämpen stred.", "قاتل المناضل."],
    "Lexin015623": ["Kändisen syntes.", "ظهر الشخص المشهور."],
    "Lexin015624": ["Kängan togs på.", "ارتُديت الجزمة."],
    "Lexin015626": ["Kängurun hoppade.", "قفز الكنغر."],
    "Lexin015627": ["Jag får känn av det.", "أحس بذلك."],
    "Lexin015628": ["Kännaren visste.", "عرف الخبير."],
    "Lexin015635": ["Kännetecknet identifierades.", "حُددت العلامة الفارقة."],
    "Lexin015654": ["Käppen användes.", "استُخدمت العصا الغليظة."],
    "Lexin015655": ["Käpphästen lektes med.", "لُعب بالحصان الخشبي."],
    "Lexin015658": ["Käranden stämde.", "رفع المدعي دعوى."],
    "Lexin015660": ["Käringen var gammal.", "كانت العجوز الشمطاء كبيرة."],
    "Lexin015661": ["Kärlet fylldes.", "امتلأت الحاوية."],
    "Lexin015662": ["Kärlet undersöktes.", "فُحص الشريان."],
    "Lexin015667": ["Kärlkrampen behandlades.", "عولجت الذبحة الصدرية."],
    "Lexin015672": ["Kärnfamiljen bodde.", "سكنت العائلة الأصلية."],
    "Lexin015675": ["Kärnmjölken dracks.", "شُرب الحليب المقشد."],
    "Lexin015676": ["Käromålet framställdes.", "قُدم الادعاء."],
    "Lexin015679": ["Kärret var vått.", "كان الهور رطباً."],
    "Lexin015680": ["Kärran drogs.", "سُحبت العربة."],
    "Lexin015683": ["Kärven bands.", "رُبطت حزمة الحبوب."],
    "Lexin015684": ["Kättaren fördömdes.", "أُدين الكافر."],
    "Lexin015685": ["Kättingen rasslade.", "خشخشت السلسلة الغليظة."],
    "Lexin015686": ["Käxet åts.", "أُكلت كعكة البسكويت."],
    "Lexin015688": ["Kön var sist.", "كانت مؤخرة الفرقة آخراً."],
    "Lexin015691": ["Köket användes.", "استُخدم الموقد."],
    "Lexin015693": ["Kölen reparerades.", "رُممت رافدة القص."],
    "Lexin015694": ["Kölden kom.", "جاءت البرودة القاسية."],
    "Lexin015703": ["Könsorganet undersöktes.", "فُحص العضو الجنسي."],
    "Lexin015705": ["Könsrollen diskuterades.", "نوقش الدور الجنسي."],
    "Lexin015707": ["Könssjukdomen behandlades.", "عولج المرض الجنسي."],
    "Lexin015709": ["Könsumgänge skedde.", "حدثت المعاشرة الجنسية."],
    "Lexin015715": ["Köparen betalade.", "دفع المشتري."],
    "Lexin015720": ["Köpekontraktet skrevs.", "كُتب عقد الشراء."],
    "Lexin015724": ["Köpeskillingen betalades.", "دُفع ثمن الشراء."],
    "Lexin015727": ["Köpingen växte.", "نمت البلدة."],
    "Lexin015728": ["Köpkraften minskade.", "انخفضت قوة الشراء."],
    "Lexin015731": ["Köpmannen sålde.", "باع التاجر."],
    "Lexin015734": ["I en kör fortsatte de.", "استمروا بانتظام."],
    "Lexin015735": ["Kören sjöng.", "غنى الكورس."],
    "Lexin015739": ["Körbanan var bred.", "كان مضمار القيادة واسعاً."],
    "Lexin015748": ["Körkortstillståndet krävdes.", "طُلب تصريح تعلم السياقة."],
    "Lexin015751": ["Körsbäret plockades.", "قُطف الكرز."],
    "Lexin015752": ["Körskolan undervisade.", "علّمت مدرسة تعليم السياقة."],
    "Lexin015753": ["Körsnären sydde.", "خاط صانع الفراء."],
    "Lexin015755": ["Körteln svällde.", "انتفخت الغدة."],
    "Lexin015759": ["Köttbullarna stektes.", "قُليت الكفتة."],
    "Lexin015760": ["Köttfärsen användes.", "استُخدم اللحم المفروم."],
    "Lexin015765": ["Labbet besöktes.", "زُير المختبر."],
    "Lexin015766": ["Labben var stor.", "كانت كف الحيوان كبيرة."],
    "Lexin015767": ["Labben flög.", "طار الكركر."],
    "Lexin015769": ["Laboranten arbetade.", "عمل عامل المختبر."],
    "Lexin015770": ["Laborationen gjordes.", "أُجريت الاختبارات العلمية."],
    "Lexin015773": ["Laboratoriet utrustades.", "جُهز المختبر."],
    "Lexin015775": ["Labyrinten var svår.", "كانت المتاهة صعبة."],
    "Lexin015776": ["Lacken torkade.", "جف الطلاء."],
    "Lexin015777": ["Lacken smälte.", "ذابت مادة اللك."],
    "Lexin015783": ["Lacknaftan användes.", "استُخدم السائل المحلل."],
    "Lexin015784": ["Ladan fylldes.", "امتلأت الشونة."],
    "Lexin015793": ["Ladugården byggdes.", "بُنيت حظيرة البقر."],
    "Lexin015795": ["Laget vann.", "فاز الفريق."],
    "Lexin015796": ["Allt är i lag.", "كل شيء في وضع جيد."],
    "Lexin015797": ["Lagen användes.", "استُخدم المرق."],
    "Lexin015838": ["Lagret applicerades.", "طُبقت الطبقة."],
    "Lexin015839": ["Lagret byttes.", "بُدل المحمل."],
    "Lexin015840": ["Lagern växte.", "نما الغار."],
    "Lexin015842": ["Lagerbladet tillsattes.", "أُضيف ورق الغار."],
    "Lexin015843": ["Lagerkransen gavs.", "أُعطي إكليل الغار."],
    "Lexin015845": ["Lagfarten registrerades.", "سُجل تثبيت حق الملكية."],
    "Lexin015857": ["Laglotten delades.", "قُسمت الحصة القانونية."],
    "Lexin015862": ["Lagmannen dömde.", "حكم كبير القضاة."],
    "Lexin015864": ["Lagningen slutfördes.", "اكتمل التصليح."],
    "Lexin015871": ["Han blev till lags.", "أطاع."],
    "Lexin015877": ["Lagstiftningen ändrades.", "تغير التشريع."],
    "Lexin015884": ["Lagunen var vacker.", "كانت البحيرة المالحة جميلة."],
    "Lexin015891": ["Lakritsen smakade gott.", "طعم عرق السوس جيداً."],
    "Lexin015894": ["Lamén var blank.", "كان قماش اللاميه لامعاً."],
    "Lexin015895": ["Lamellen sattes.", "وُضعت الرقيقة."],
    "Lexin015899": ["Lammet betade.", "رعى الخروف."],
    "Lexin015900": ["Lammköttet stektes.", "شُوي لحم الضأن."],
    "Lexin015906": ["Landet odlades.", "زُرعت الأرض الزراعية."],
    "Lexin015908": ["Landgången lades ut.", "مُد المعبر."],
    "Lexin015909": ["Landgången åts.", "أُكلت السندويشة الطويلة."],
    "Lexin015910": ["Landkrabban ogillade båtar.", "كره الشخص الذي لا يحب البحر القوارب."],
    "Lexin015911": ["Landsbygden var lugn.", "كان الريف هادئاً."]
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

const backupPath = DATA_FILE + '.backup_nouns38_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Done! Added examples to ${updated} nouns. Total: 3800 nouns!`);
