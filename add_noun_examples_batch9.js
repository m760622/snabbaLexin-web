/**
 * Add examples to nouns - Batch 9 (100 nouns: Boss to Brännboll)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin003979": ["Bossen bestämmer allt på firman.", "الرئيس يقرر كل شيء في الشركة."],
    "Lexin003983": ["Bostadsanpassningsbidraget hjälpte honom bygga om.", "ساعدته منحة تكييف المسكن على التجديد."],
    "Lexin003988": ["Bostadsdomstolen avgjorde tvisten.", "فصلت محكمة الإسكان في النزاع."],
    "Lexin003990": ["Bostadsförmedlingen hittade en lägenhet åt oss.", "وجد مكتب الإسكان لنا شقة."],
    "Lexin003995": ["Bostadslånet beviljades av banken.", "وافق البنك على قرض الإسكان."],
    "Lexin003998": ["Bostadsrättsföreningen höll årsmöte.", "عقد اتحاد مالكي الشقق اجتماعه السنوي."],
    "Lexin004001": ["Bostadsrättslägenheten kostade tre miljoner.", "كلفت شقة التمليك ثلاثة ملايين."],
    "Lexin004003": ["Bostadssparande ger fördelar.", "يعطي التوفير للسكن مزايا."],
    "Lexin004015": ["Han fick bot för fortkörning.", "حصل على غرامة للسرعة الزائدة."],
    "Lexin004016": ["Botanik studerar växter.", "يدرس علم النبات النباتات."],
    "Lexin004019": ["Finns det något botemedel mot förkylning?", "هل يوجد علاج للزكام؟"],
    "Lexin004021": ["Botten av sjön var sandig.", "كان قاع البحيرة رملياً."],
    "Lexin004023": ["Bottenlånet täcker 70% av köpet.", "يغطي القرض الأساسي 70% من الشراء."],
    "Lexin004026": ["Filmen var rena bottenskrapet.", "كان الفيلم حثالة تامة."],
    "Lexin004030": ["Boulevarden var full av butiker.", "كانت الجادة مليئة بالمتاجر."],
    "Lexin004032": ["Bouppteckningen gjordes efter dödsfallet.", "تم حصر التركة بعد الوفاة."],
    "Lexin004036": ["Boutredningen tog flera månader.", "استغرق تحقيق التركة عدة أشهر."],
    "Lexin004043": ["Bovete är glutenfritt.", "الحنطة السوداء خالية من الغلوتين."],
    "Lexin004044": ["Vi spelade bowling på lördagen.", "لعبنا البولينغ يوم السبت."],
    "Lexin004046": ["Sakerna förvarades i en box.", "حُفظت الأشياء في صندوق."],
    "Lexin004047": ["Boxaren vann matchen.", "فاز الملاكم بالمباراة."],
    "Lexin004049": ["Boxning kräver snabbhet och styrka.", "تتطلب الملاكمة سرعة وقوة."],
    "Lexin004052": ["Brackan förstod ingenting.", "لم يفهم الساذج شيئاً."],
    "Lexin004054": ["Räddningen var en stor bragd.", "كان الإنقاذ مأثرة عظيمة."],
    "Lexin004056": ["Braket väckte alla.", "أيقظ الضجيج الجميع."],
    "Lexin004058": ["Han köpte ett par nya brallor.", "اشترى زوجاً من السراويل الجديدة."],
    "Lexin004062": ["Talet var en riktig brandfackla.", "كان الخطاب تحدياً حقيقياً."],
    "Lexin004065": ["Brandförsvaret släckte elden snabbt.", "أخمد الدفاع ضد الحريق النار بسرعة."],
    "Lexin004074": ["Brandposten finns på hörnet.", "مأخذ الماء موجود على الزاوية."],
    "Lexin004084": ["Brandtalet inspirerade folket.", "ألهب الخطاب الرنان الشعب."],
    "Lexin004086": ["Brandvarnaren reagerade på röken.", "استجاب منذر المطافئ للدخان."],
    "Lexin004089": ["Brandväggen skyddar nätverket.", "يحمي الجدار الناري الشبكة."],
    "Lexin004094": ["De stod vid kanten av branten.", "وقفوا على حافة الهوة."],
    "Lexin004097": ["Han la till en brasklapp i kontraktet.", "أضاف تحفظاً في العقد."],
    "Lexin004098": ["Brassen gav orkestern kraft.", "أعطت آلات النفخ الأوركسترا قوة."],
    "Lexin004100": ["Vi åt lunch på brasseriet.", "تناولنا الغداء في المطعم الفرنسي."],
    "Lexin004102": ["Räddningen var en bravad.", "كان الإنقاذ مأثرة."],
    "Lexin004104": ["Pianisten spelade med stor bravur.", "عزف عازف البيانو بمهارة فائقة."],
    "Lexin004115": ["Lastbilen fick en bredsida.", "تلقت الشاحنة صفعة جانبية."],
    "Lexin004119": ["Brevlådan var full.", "كان صندوق البريد ممتلئاً."],
    "Lexin004122": ["Brickan satt under muttern.", "كانت الحلقة تحت الصامولة."],
    "Lexin004123": ["Bridge är ett populärt kortspel.", "البريدج لعبة ورق شائعة."],
    "Lexin004124": ["Brigaden marcherade mot fronten.", "سارت الكتيبة نحو الجبهة."],
    "Lexin004128": ["Diamantens briljans var fantastisk.", "كان بريق الماسة رائعاً."],
    "Lexin004130": ["Briljanten gnistrade i ljuset.", "تألقت الماسة في الضوء."],
    "Lexin004132": ["Han behövde nya brillor.", "احتاج نظارات جديدة."],
    "Lexin004133": ["Kyckling bringa är en läcker bit.", "صدر الدجاج قطعة لذيذة."],
    "Lexin004135": ["Bilen körde nerför brinken.", "قاد السائق السيارة على المنحدر."],
    "Lexin004150": ["Sjuksköterska är ett bristyrke.", "التمريض مهنة تنقصها الأيدي العاملة."],
    "Lexin004152": ["Han sov på en hård brits.", "نام على سرير خشبي صلب."],
    "Lexin004153": ["Britten talade med accent.", "تحدث البريطاني بلكنة."],
    "Lexin004155": ["Brittsommaren kom i oktober.", "جاءت الفترة الدافئة في أكتوبر."],
    "Lexin004168": ["Broilern gräddades i ugnen.", "شُوي الدجاج المسمن في الفرن."],
    "Lexin004171": ["Bromsen bet mig på armen.", "لدغتني النعرة على ذراعي."],
    "Lexin004179": ["Bronkiten orsakade hosta.", "سبب التهاب الشعب الهوائية السعال."],
    "Lexin004185": ["Bronsåldern kom efter stenåldern.", "جاء عصر البرونز بعد العصر الحجري."],
    "Lexin004188": ["Min brorsa bor i Göteborg.", "يسكن شقيقي في يوتبوري."],
    "Lexin004189": ["Brorsonen gick på universitetet.", "ذهب ابن الشقيق إلى الجامعة."],
    "Lexin004191": ["Broschen var av guld.", "كان المشبك من الذهب."],
    "Lexin004192": ["Broschyren beskrev resan.", "وصف الكاتالوج الرحلة."],
    "Lexin004194": ["Brosket i knäet var slitet.", "كان الغضروف في الركبة متآكلاً."],
    "Lexin004205": ["Stenbrottet ligger utanför staden.", "يقع المقلع خارج المدينة."],
    "Lexin004226": ["Brottaren vann guldmedalj.", "فاز المصارع بالميدالية الذهبية."],
    "Lexin004230": ["Brottning är en gammal sport.", "المصارعة رياضة قديمة."],
    "Lexin004231": ["Brottsbalken reglerar straff.", "ينظم قانون الجنايات العقوبات."],
    "Lexin004244": ["Brottsligheten har minskat.", "انخفض الإجرام."],
    "Lexin004246": ["Brottslingen dömdes till fängelse.", "حُكم على المجرم بالسجن."],
    "Lexin004259": ["Endast ett brottstycke återstod.", "بقيت شظية فقط."],
    "Lexin004262": ["Bruden bar vit klänning.", "ارتدت العروس فستاناً أبيض."],
    "Lexin004263": ["Brudgummen väntade vid altaret.", "انتظر العريس عند المذبح."],
    "Lexin004264": ["Brudtärnorna bar rosa klänningar.", "ارتدت إشبينات العروس فساتين وردية."],
    "Lexin004275": ["Bilens bruksvärde var högt.", "كانت قيمة استخدام السيارة عالية."],
    "Lexin004279": ["Bruna bönor är en traditionell rätt.", "الفاصوليا البنية طبق تقليدي."],
    "Lexin004280": ["Vi åt brunch på söndagen.", "تناولنا البرانش يوم الأحد."],
    "Lexin004281": ["Brunetten hade mörkt hår.", "كانت السمراء ذات شعر داكن."],
    "Lexin004282": ["Brunnen gav rent vatten.", "أعطت البئر ماءً نقياً."],
    "Lexin004290": ["Det hörs brus i radion.", "يُسمع تشويش في الراديو."],
    "Lexin004293": ["Brustabletten löste sig i vattnet.", "ذاب القرص الفوار في الماء."],
    "Lexin004301": ["Brutto var högre än netto.", "كان الإجمالي أعلى من الصافي."],
    "Lexin004304": ["Bruttolönen var 30 000 kronor.", "كان الراتب الإجمالي 30,000 كرون."],
    "Lexin004313": ["Brygden hade en stark smak.", "كان للمشروب المخمر طعم قوي."],
    "Lexin004314": ["Bryggan sträckte sig ut i sjön.", "امتد الرصيف في البحيرة."],
    "Lexin004315": ["Bryggan ersatte de saknade tänderna.", "عوض جسر الأسنان الأسنان المفقودة."],
    "Lexin004318": ["Bryggaren gjorde gott kaffe.", "صنعت القطارة قهوة لذيذة."],
    "Lexin004320": ["Bryggeriet producerar öl.", "ينتج مصنع الجعة البيرة."],
    "Lexin004322": ["Klippans bryn var skarp.", "كانت حافة الصخرة حادة."],
    "Lexin004323": ["Brynet slipade kniven.", "شحذ المشحذ السكين."],
    "Lexin004340": ["Brytningen av malm pågår.", "يجري استخراج الخام."],
    "Lexin004341": ["Hans brytning avslöjade ursprunget.", "كشفت لهجته أصله."],
    "Lexin004347": ["Bråcket opererades.", "أُجريت عملية للفتاق."],
    "Lexin004351": ["Bråddjupet var skrämmande.", "كان الجرف مخيفاً."],
    "Lexin004354": ["Det var stor brådska.", "كانت هناك عجلة كبيرة."],
    "Lexin004358": ["En tredjedel är ett bråk.", "الثلث كسر."],
    "Lexin004362": ["Bråkmakaren kastades ut.", "طُرد المشاغب."],
    "Lexin004364": ["Garaget var fullt av bråte.", "كان المرآب مليئاً بالنفايات."],
    "Lexin004369": ["Bräckjärnet öppnade dörren.", "فتحت العتلة الباب."],
    "Lexin004373": ["Brädan användes till golvet.", "استُخدم لوح الخشب للأرضية."],
    "Lexin004376": ["Brädet fanns på bordet.", "كان اللوح على الطاولة."],
    "Lexin004379": ["Jckans bräm var av päls.", "كانت حاشية السترة من الفرو."],
    "Lexin004387": ["Brännboll spelas på sommaren.", "تُلعب لعبة البيسبول السويدية صيفاً."]
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

const backupPath = DATA_FILE + '.backup_nouns9_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Done! Added examples to ${updated} nouns.`);
