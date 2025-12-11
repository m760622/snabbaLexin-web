/**
 * Add examples to nouns - Batch 36 (100 nouns: Kotte to Krök)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin015008": ["Kotten föll.", "سقط كوز الصنوبر."],
    "Lexin015009": ["Kotteriet möttes.", "اجتمعت الزمرة."],
    "Lexin015012": ["Kovan saknades.", "افتُقدت النقود."],
    "Lexin015014": ["Krabaten lekte.", "لعب الطفل الشقي."],
    "Lexin015015": ["Krabban fångades.", "صيد سرطان البحر."],
    "Lexin015016": ["Krafset slängdes.", "رُميت النفاية."],
    "Lexin015027": ["Kraftledningen reparerades.", "رُمم الحبل الكهربائي."],
    "Lexin015029": ["Kraftstationen producerade.", "أنتجت محطة الطاقة."],
    "Lexin015030": ["Kraftuttrycket användes.", "استُخدمت الكلمات الجارحة."],
    "Lexin015031": ["Kraftverket byggdes.", "بُنيت منشأة الطاقة الكهربائية."],
    "Lexin015032": ["Kragen var styv.", "كانت القبة صلبة."],
    "Lexin015033": ["Kraken behövde hjälp.", "احتاج المسكين للمساعدة."],
    "Lexin015038": ["Krampen smärtade.", "آلم التشنج."],
    "Lexin015044": ["Kramset kastades.", "رُميت الأشياء الصغيرة التافهة."],
    "Lexin015045": ["Kramsnön formades.", "شُكل الثلج الطري."],
    "Lexin015046": ["Kranen öppnades.", "فُتح الصنبور."],
    "Lexin015047": ["Kranen lyfte.", "رفعت الرافعة."],
    "Lexin015049": ["Kraniet undersöktes.", "فُحصت الجمجمة."],
    "Lexin015050": ["Kransen lades.", "وُضع الإكليل."],
    "Lexin015055": ["Vasen gick i kras.", "تحطمت المزهرية."],
    "Lexin015056": ["Kraschen skedde.", "حدث الاصطدام."],
    "Lexin015060": ["Krassen växte.", "نما الرشاد."],
    "Lexin015065": ["Kravallerna skedde.", "حدث الشغب."],
    "Lexin015075": ["Kreaturen betade.", "رعت الحيوانات."],
    "Lexin015077": ["Krediten noterades.", "دُون حساب الدائن."],
    "Lexin015085": ["Kreditköpet registrerades.", "سُجل الشراء بالتسليف."],
    "Lexin015088": ["Kreditupplysningen begärdes.", "طُلبت معلومات عن الوضع الاقتصادي."],
    "Lexin015091": ["Krematoriet användes.", "استُخدمت محرقة الموتى."],
    "Lexin015093": ["Kremeringen skedde.", "تم حرق الموتى."],
    "Lexin015096": ["Kreti och pleti kom.", "جاء أي شخص."],
    "Lexin015097": ["Kretsen ritades.", "رُسمت الدورة."],
    "Lexin015099": ["Kretsen kopplades.", "وُصلت الدارة."],
    "Lexin015101": ["Kretsloppet fortsatte.", "استمر المدار."],
    "Lexin015105": ["Krigaren stred.", "حارب المحارب."],
    "Lexin015106": ["Krigföringen förändrades.", "تغيرت المحاربة."],
    "Lexin015110": ["Krigsmakten försvarade.", "دافعت القوات المسلحة."],
    "Lexin015114": ["Kriminaliteten ökade.", "زاد الإجرام."],
    "Lexin015120": ["Kriminalvården hjälpte.", "ساعد إصلاح المجرمين."],
    "Lexin015135": ["Krimskramsen slängdes.", "رُميت الأشياء التافهة."],
    "Lexin015140": ["Kringlan bakades.", "خُبزت لفافة الكعك."],
    "Lexin015147": ["Kristallen glänste.", "لمع الكريستال."],
    "Lexin015148": ["Kristallkronan hängdes.", "عُلقت ثريا الكريستال."],
    "Lexin015150": ["Kristendomen praktiseras.", "تُمارس المسيحية."],
    "Lexin015154": ["Kritan användes.", "استُخدم الطباشير."],
    "Lexin015155": ["Kriteriet uppfylldes.", "استُوفي المعيار."],
    "Lexin015158": ["Kritikern recenserade.", "راجع الناقد."],
    "Lexin015163": ["Kroaten reste hem.", "عاد الكرواتي للوطن."],
    "Lexin015166": ["Kroatiska talas.", "تُتحدث الكرواتية."],
    "Lexin015167": ["Kroatiskan anlände.", "وصلت الكرواتية."],
    "Lexin015168": ["Krocken skedde.", "حدث الاصطدام."],
    "Lexin015173": ["Han satte krokben.", "عثّره."],
    "Lexin015177": ["Krokodilen simmade.", "سبح التمساح."],
    "Lexin015178": ["Krokodiltårarna rann.", "جرت دموع التماسيح."],
    "Lexin015179": ["Krokusen blommade.", "أزهر الزعفران."],
    "Lexin015180": ["Krom används i stål.", "يُستخدم الكروم في الفولاذ."],
    "Lexin015181": ["Kromosomen studerades.", "دُرس الكروموسوم الصبغي."],
    "Lexin015184": ["Kronan bars.", "ارتُدي التاج."],
    "Lexin015185": ["Kronan var grön.", "كانت القمة خضراء."],
    "Lexin015199": ["Kronofogden krävde.", "طالب الجابي الحكومي."],
    "Lexin015205": ["Kronprinsen besökte.", "زار ولي العهد."],
    "Lexin015206": ["Kronärtskockan kokades.", "طُبخت الخرشوفة."],
    "Lexin015208": ["Kroppen undersöktes.", "فُحص البدن."],
    "Lexin015211": ["Kroppkakan åts.", "أُكلت الكروب كاكا."],
    "Lexin015213": ["Kroppsbyggaren tränade.", "تدرب لاعب كمال الأجسام."],
    "Lexin015222": ["Kroppsspråket tolkades.", "فُسرت حركات الجسد التعبيرية."],
    "Lexin015226": ["Kroppsvisitationen gjordes.", "أُجري التفتيش الجسدي."],
    "Lexin015234": ["Krucifixet hängdes.", "عُلق المسيح المصلوب."],
    "Lexin015235": ["Krukan planterades.", "زُرع الأصيص."],
    "Lexin015236": ["Krukväxten vattnades.", "سُقي النبات المنزلي."],
    "Lexin015239": ["Krumbukten syntes.", "ظهرت المراوغة."],
    "Lexin015240": ["Krumeluren ritades.", "رُسم الرسم العابث."],
    "Lexin015241": ["Krumeluren överraskade.", "فاجأ الشخص الأصيل."],
    "Lexin015243": ["Kruppen behandlades.", "عولج سعال الخناق."],
    "Lexin015244": ["Kruset fylldes.", "امتلأ القدر الفخاري."],
    "Lexin015248": ["Krusbäret plockades.", "قُطف الكشمش الشائك."],
    "Lexin015249": ["Krusidulen ritades.", "رُسمت الكشكشة."],
    "Lexin015251": ["Krustaden fylldes.", "مُلئ الكروستاد."],
    "Lexin015252": ["Krutet exploderade.", "انفجر البارود."],
    "Lexin015253": ["Krut­durken hotade.", "هدد الوضع المتفجر."],
    "Lexin015258": ["Kryckan användes.", "استُخدم العكاز."],
    "Lexin015260": ["Kryddan tillsattes.", "أُضيف التابل."],
    "Lexin015265": ["Krymplingen behövde hjälp.", "احتاج المقعد للمساعدة."],
    "Lexin015266": ["Krypet kröp.", "زحفت الحشرة."],
    "Lexin015270": ["Kryphålet hittades.", "وُجد المهرب."],
    "Lexin015271": ["Krypinet var mysigt.", "كانت الحجيرة مريحة."],
    "Lexin015273": ["Krysset sattes.", "وُضع التقاطع."],
    "Lexin015276": ["Kryssaren patrullerade.", "قام الطراد بدورية."],
    "Lexin015277": ["Kryssningen startade.", "بدأت الرحلة الطويلة في البحر."],
    "Lexin015281": ["Kråkan kraxade.", "نعق الغراب."],
    "Lexin015282": ["Kråkfötterna var oläsbara.", "كان الخط الرديء غير مقروء."],
    "Lexin015285": ["Krånglet åtgärdades.", "أُصلح الخلل."],
    "Lexin015290": ["Kräftan behandlades.", "عولج داء السرطان."],
    "Lexin015291": ["Kräftgången fortsatte.", "استمر التراجع."],
    "Lexin015292": ["Kräftskivan hölls.", "أُقيم حفل أكل سرطان النهر."],
    "Lexin015293": ["Kräket behövde hjälp.", "احتاج الحقير للمساعدة."],
    "Lexin015298": ["Krämen applicerades.", "وُضع المرهم."],
    "Lexin015300": ["Krämpan behandlades.", "عولج المرض العارض."],
    "Lexin015312": ["Kräppen syddes.", "خُيط القماش الرقيق."],
    "Lexin015316": ["Krögaren välkomnade.", "رحب صاحب المطعم."],
    "Lexin015317": ["Kröken var skarp.", "كان المنعطف حاداً."]
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

const backupPath = DATA_FILE + '.backup_nouns36_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Done! Added examples to ${updated} nouns. Total: 3600 nouns!`);
