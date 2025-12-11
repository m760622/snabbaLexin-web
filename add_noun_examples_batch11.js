/**
 * Add examples to nouns - Batch 11 (100 nouns: Börda to Cykelbana)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin004780": ["Bördan var tung att bära.", "كان الحمل ثقيلاً."],
    "Lexin004785": ["Börsen var full av mynt.", "كانت المحفظة مليئة بالعملات."],
    "Lexin004788": ["Bössan var laddad.", "كانت البندقية محشوة."],
    "Lexin004789": ["Barnet sparade pengar i bössan.", "وفّر الطفل المال في الحصالة."],
    "Lexin004798": ["Bövel, vad jobbigt!", "يا للمصيبة، كم هذا متعب!"],
    "Lexin004799": ["C är tonen do.", "الحرف C هو نغمة دو."],
    "Lexin004801": ["Spanskan är mitt C-språk.", "الإسبانية لغتي الثالثة."],
    "Lexin004803": ["Cabrioleten kördes med fällt tak.", "قُيدت السيارة المكشوفة بسقف مطوي."],
    "Lexin004804": ["CAD används i arkitektur.", "يُستخدم الكاد في الهندسة المعمارية."],
    "Lexin004812": ["Cafeterian serverar lunch.", "يقدم المقهى الغداء."],
    "Lexin004816": ["Camparen sov i tält.", "نام المخيّم في الخيمة."],
    "Lexin004817": ["Camping är populärt på sommaren.", "التخييم شائع في الصيف."],
    "Lexin004818": ["Cancer kan behandlas med kemoterapi.", "يمكن علاج السرطان بالكيماوي."],
    "Lexin004829": ["Cannabis är olagligt i Sverige.", "القنب غير قانوني في السويد."],
    "Lexin004830": ["Kostnaden är 100 kronor per capita.", "التكلفة 100 كرون للفرد."],
    "Lexin004831": ["Cappuccinon var varm och god.", "كان الكابوتشينو ساخناً ولذيذاً."],
    "Lexin004833": ["Bilen stod under carporten.", "وقفت السيارة تحت السقيفة."],
    "Lexin004837": ["Cd-romskivan innehåller data.", "تحتوي أسطوانة الأقراص المضغوطة على بيانات."],
    "Lexin004838": ["Cd-romspelaren läste skivan.", "قرأ قارئ الأقراص الأسطوانة."],
    "Lexin004839": ["Cd-skivan spelade musik.", "شغّلت الأسطوانة الموسيقى."],
    "Lexin004840": ["Cd-spelaren var trasig.", "كان مشغل الأقراص تالفاً."],
    "Lexin004842": ["Celebriteten signerade autografer.", "وقّع المشهور التوقيعات."],
    "Lexin004846": ["Cellen är livets byggsten.", "الخلية لبنة الحياة."],
    "Lexin004847": ["Fången satt i sin cell.", "جلس السجين في زنزانته."],
    "Lexin004857": ["Cellgiftet bekämpade tumören.", "حارب سم الخلايا الورم."],
    "Lexin004859": ["Cellisten spelade vackert.", "عزف عازف التشيلو بجمال."],
    "Lexin004863": ["Cellon ger en djup ton.", "يعطي التشيلو نغمة عميقة."],
    "Lexin004864": ["Blommorna var inslagna i cellofan.", "كانت الزهور ملفوفة بالسيلوفان."],
    "Lexin004868": ["Cellstoff används i blöjor.", "يُستخدم السليولوز في الحفاضات."],
    "Lexin004869": ["Cellulosa finns i trä.", "يوجد السليلوز في الخشب."],
    "Lexin004873": ["Cement binder mursten.", "يربط الإسمنت الطوب."],
    "Lexin004884": ["Censuren förbjöd filmen.", "منعت الرقابة الفيلم."],
    "Lexin004886": ["Center är ett politiskt mittparti.", "الوسط حزب سياسي معتدل."],
    "Lexin004887": ["Centern spelade offensivt.", "لعب لاعب الوسط هجومياً."],
    "Lexin004888": ["Shoppingcentern var full av folk.", "كان المركز التجاري مزدحماً."],
    "Lexin004890": ["En centiliter är en hundradel av en liter.", "السنتيليتر جزء من مئة من اللتر."],
    "Lexin004891": ["Barnets storlek är 120 centilong.", "مقاس الطفل 120 سنتيلونغ."],
    "Lexin004892": ["En centimeter är tio millimeter.", "السنتيمتر عشرة ملليمترات."],
    "Lexin004904": ["Centralvärmen höll lägenheten varm.", "أبقت التدفئة المركزية الشقة دافئة."],
    "Lexin004905": ["Centrifugen snurrade snabbt.", "دارت النابذة بسرعة."],
    "Lexin004910": ["Ceratet hjälpte mot torra läppar.", "ساعد مرهم الشفاه ضد الجفاف."],
    "Lexin004916": ["Ceremonin var högtidlig.", "كانت المراسم رسمية."],
    "Lexin004922": ["Cesium är radioaktivt.", "السيزيوم مشع."],
    "Lexin004923": ["Champagnen poppades vid nyår.", "فُتحت الشمبانيا في رأس السنة."],
    "Lexin004924": ["Champinjoner steks i smör.", "يُقلى الفطر بالزبدة."],
    "Lexin004925": ["Championien vann tävlingen.", "فاز البطل بالمسابقة."],
    "Lexin004929": ["Chargé d'affaires ledde ambassaden.", "أدار القائم بالأعمال السفارة."],
    "Lexin004930": ["Charken säljer korv.", "يبيع المسلخ النقانق."],
    "Lexin004931": ["Charkuteriet hade färsk skinka.", "كان في المسلخ لحم طازج."],
    "Lexin004932": ["Charlatanen lurade kunderna.", "خدع المحتال الزبائن."],
    "Lexin004936": ["Chassit bar upp bilen.", "حملت الشاسيه السيارة."],
    "Lexin004939": ["Chauffören körde bussen.", "قاد السائق الحافلة."],
    "Lexin004940": ["Chauvinismen är extrem nationalism.", "الشوفينية قومية متطرفة."],
    "Lexin004941": ["Checken betalades på banken.", "سُدد الشيك في البنك."],
    "Lexin004947": ["Han satt i chefsstolen.", "جلس على كرسي المدير."],
    "Lexin004951": ["Chiffret var svårt att tyda.", "كانت الشيفرة صعبة الفك."],
    "Lexin004952": ["Chiffonjén hade många lådor.", "كان للطاولة أدراج كثيرة."],
    "Lexin004953": ["Chilenen talade spanska.", "تحدث الشيلي الإسبانية."],
    "Lexin004955": ["Framgången var bara en chimär.", "كان النجاح مجرد وهم."],
    "Lexin004957": ["Chipsen var krispiga.", "كانت الشيبس مقرمشة."],
    "Lexin004958": ["Chocken efter olyckan var stor.", "كانت الصدمة بعد الحادث كبيرة."],
    "Lexin004962": ["Choken startade den kalla motorn.", "شغّل الخانق المحرك البارد."],
    "Lexin004969": ["Cidern var gjord av äpplen.", "كان السيدر مصنوعاً من التفاح."],
    "Lexin004970": ["Cigaretten var skadlig för hälsan.", "كانت السيجارة ضارة بالصحة."],
    "Lexin004971": ["Cigarren var kubansk.", "كان السيجار كوبياً."],
    "Lexin004973": ["Cirkapriset var 200 kronor.", "كان السعر التقريبي 200 كرون."],
    "Lexin004974": ["Cirkeln var perfekt rund.", "كانت الدائرة مستديرة تماماً."],
    "Lexin004975": ["Studiecirkeln träffades varje vecka.", "التقت الحلقة الدراسية كل أسبوع."],
    "Lexin004978": ["Blodets cirkulation är viktig.", "دوران الدم مهم."],
    "Lexin004987": ["Cirkuläret skickades till alla.", "أُرسلت الرسالة الدورية للجميع."],
    "Lexin004989": ["Cisternen innehöll olja.", "احتوى الصهريج على النفط."],
    "Lexin004992": ["Citattecknen omgav texten.", "أحاطت علامات الاقتباس النص."],
    "Lexin004995": ["Citrusfrukter är rika på C-vitamin.", "الحمضيات غنية بفيتامين سي."],
    "Lexin004996": ["City var fullt av affärer.", "كان مركز المدينة مليئاً بالمتاجر."],
    "Lexin005000": ["Civilekonomen analyserade budgeten.", "حلل الاقتصادي الميزانية."],
    "Lexin005001": ["Civilförsvaret räddade liv.", "أنقذ الدفاع المدني أرواحاً."],
    "Lexin005002": ["Civilingenjören designade bron.", "صمم المهندس الجسر."],
    "Lexin005003": ["Civilisationen utvecklades långsamt.", "تطورت الحضارة ببطء."],
    "Lexin005016": ["Clipsen satt i öronen.", "كانت القامطة في الأذنين."],
    "Lexin005018": ["Clownen fick barnen att skratta.", "أضحك المهرج الأطفال."],
    "Lexin005024": ["Cockerspanieln var lekfull.", "كان الكوكر سبانيل مرحاً."],
    "Lexin005025": ["Cockpiten hade många instrument.", "احتوت قمرة القيادة على أدوات كثيرة."],
    "Lexin005026": ["Cocktailen var uppfriskande.", "كان الكوكتيل منعشاً."],
    "Lexin005028": ["Collaget bestod av tidningsbilder.", "تألفت الملصقة من صور مجلات."],
    "Lexin005030": ["Colleget låg i Cambridge.", "كانت الكلية في كامبريدج."],
    "Lexin005031": ["Collien var en intelligenta hund.", "كان الكولي كلباً ذكياً."],
    "Lexin005035": ["Containern transporterade gods.", "نقلت الحاوية البضائع."],
    "Lexin005036": ["Controllern granskade räkenskaperna.", "فحص المراقب الحسابات."],
    "Lexin005038": ["Copyright skyddar upphovsmannen.", "يحمي حق النشر المؤلف."],
    "Lexin005039": ["Copywritern skrev reklamtexter.", "كتب كاتب الإعلانات النصوص الدعائية."],
    "Lexin005041": ["Cornflakes äts med mjölk.", "يُؤكل الكورن فليكس مع الحليب."],
    "Lexin005044": ["Cowboyen red på hästen.", "ركب راعي البقر الحصان."],
    "Lexin005048": ["Crawl är ett snabbt simsätt.", "الكراول أسلوب سباحة سريع."],
    "Lexin005050": ["Mitt credo är att hjälpa andra.", "يقيني هو مساعدة الآخرين."],
    "Lexin005051": ["Crêpen var fylld med nutella.", "كانت الكريب محشوة بالنوتيلا."],
    "Lexin005054": ["Croissanten var nybakad.", "كانت الكرواسان طازجة."],
    "Lexin005059": ["Cupen vanns av favoriten.", "فاز المفضل بالكأس."],
    "Lexin005060": ["Curryn gav maten smak.", "أعطى الكاري الطعام نكهة."],
    "Lexin005064": ["Cykeln upprepar sig.", "تتكرر الدورة."],
    "Lexin005065": ["Cykelbanan var väl underhållen.", "كان مسار الدراجات محافظاً عليه."]
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

const backupPath = DATA_FILE + '.backup_nouns11_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Done! Added examples to ${updated} nouns. Total: 1100 nouns!`);
