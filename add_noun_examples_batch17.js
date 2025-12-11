/**
 * Add examples to nouns - Batch 17 (100 nouns: Farm to Finska)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin007316": ["Farmen producerade spannmål.", "أنتجت المزرعة الحبوب."],
    "Lexin007317": ["Farmaceuten arbetade på apoteket.", "عمل الصيدلي في الصيدلية."],
    "Lexin007323": ["Farozonen markerades tydligt.", "حُددت منطقة الخطر بوضوح."],
    "Lexin007324": ["Farsen fick publiken att skratta.", "أضحكت المسرحية الهزلية الجمهور."],
    "Lexin007325": ["Farsan hämtade oss.", "أحضرنا الوالد."],
    "Lexin007326": ["Farsoten spred sig snabbt.", "انتشر الوباء بسرعة."],
    "Lexin007327": ["Farstun var liten.", "كانت الردهة صغيرة."],
    "Lexin007329": ["Farten gick mot norr.", "اتجهت الرحلة شمالاً."],
    "Lexin007332": ["Fartsyndaren fick böter.", "غُرّم متجاوز السرعة."],
    "Lexin007333": ["Fartyget lade till i hamnen.", "رست السفينة في الميناء."],
    "Lexin007349": ["Fasanen flög över fältet.", "طار التدرج فوق الحقل."],
    "Lexin007355": ["Fascismen bekämpades.", "حُوربت الفاشية."],
    "Lexin007356": ["Fascisten arresterades.", "اعتُقل الفاشي."],
    "Lexin007357": ["Fasetten reflekterade ljuset.", "عكس السطح المصقول الضوء."],
    "Lexin007378": ["Ha det i fasta.", "تذكر ذلك."],
    "Lexin007379": ["Fastan varade i 30 dagar.", "استمر الصيام 30 يوماً."],
    "Lexin007385": ["Fastigheten såldes.", "بيع العقار."],
    "Lexin007393": ["Fastighetsdomstolen avgjorde tvisten.", "حسمت المحكمة العقارية النزاع."],
    "Lexin007397": ["Fastighetsmäklaren visade huset.", "عرض سمسار العقارات البيت."],
    "Lexin007408": ["Fastlagen börjar snart.", "يبدأ الصوم الكبير قريباً."],
    "Lexin007409": ["Fastlagsbullen var god.", "كانت كعكة السملا لذيذة."],
    "Lexin007410": ["Fastlagssöndagen firades.", "احتُفل بالأحد السابق للصوم."],
    "Lexin007411": ["Fastlandet var vidsträckt.", "كانت اليابسة واسعة."],
    "Lexin007430": ["Fatet var fullt av mat.", "كان الطبق مليئاً بالطعام."],
    "Lexin007431": ["Fatet innehöll olja.", "احتوى البرميل على زيت."],
    "Lexin007434": ["Han fick fatt i bollen.", "لحق بالكرة."],
    "Lexin007440": ["Fattigdomen ökade.", "ازداد الفقر."],
    "Lexin007441": ["Fattiglappen behövde hjälp.", "احتاج الفقير للمساعدة."],
    "Lexin007443": ["Fattningen var säker.", "كانت المسكة آمنة."],
    "Lexin007444": ["Faunan var rik.", "كانت الحياة الحيوانية غنية."],
    "Lexin007451": ["Fen gav honom tre önskningar.", "منحته الجنية ثلاث أمنيات."],
    "Lexin007452": ["Featuren sändes på kvällen.", "بُث البرنامج الوثائقي مساءً."],
    "Lexin007459": ["Februari är kort.", "فبراير قصير."],
    "Lexin007461": ["Federationen bildades.", "تأسس الاتحاد الفدرالي."],
    "Lexin007462": ["Feedbacken var positiv.", "كانت الاستجابة إيجابية."],
    "Lexin007464": ["Fegheten hindrade honom.", "منعه الجبن."],
    "Lexin007490": ["Femdagarsveckan infördes.", "طُبق أسبوع الخمسة أيام."],
    "Lexin007491": ["Femdygnsprognosen lovade sol.", "وعدت نشرة الخمسة أيام بالشمس."],
    "Lexin007494": ["Feministen kämpade för jämlikhet.", "ناضلت المناصرة للمساواة."],
    "Lexin007495": ["Femkampen var spännande.", "كانت المباراة الخماسية مثيرة."],
    "Lexin007496": ["Femman vann loppet.", "فاز الخامس بالسباق."],
    "Lexin007497": ["Femman gällde förr.", "كانت الخمس كرونات سارية قديماً."],
    "Lexin007499": ["Femrummaren var rymlig.", "كانت الشقة ذات الخمس غرف واسعة."],
    "Lexin007504": ["Femtilappen var ny.", "كانت الخمسين كرونة جديدة."],
    "Lexin007507": ["Femtiöringen sparades.", "حُفظت الخمسون أوري."],
    "Lexin007510": ["Femöringen avskaffades.", "أُلغي قطعة الخمس أوريات."],
    "Lexin007511": ["Fenan hjälpte fisken simma.", "ساعدت الزعنفة السمكة على السباحة."],
    "Lexin007516": ["Feodalismen upphörde.", "انتهت الإقطاعية."],
    "Lexin007517": ["Ferien var avkopplande.", "كانت العطلة مريحة."],
    "Lexin007518": ["Feriehemmet tog emot barn.", "استقبلت عائلة العطلات الأطفال."],
    "Lexin007527": ["Festivalen lockade tusentals.", "جذب المهرجان الآلاف."],
    "Lexin007532": ["Fetknoppen växte på berget.", "نما السيدوم على الجبل."],
    "Lexin007533": ["Fetknoppen gick på diet.", "بدأ السمين نظاماً غذائياً."],
    "Lexin007534": ["Fetman ökade risken.", "زادت السمنة الخطر."],
    "Lexin007535": ["Fettet användes för matlagning.", "استُخدم الدهن للطبخ."],
    "Lexin007540": ["Fettisdagen firas med semlor.", "يُحتفل بثلاثاء المرافع بالسملا."],
    "Lexin007548": ["Fia spelas med tärningar.", "تُلعب الفيا بالنرد."],
    "Lexin007550": ["Fiber är bra för magen.", "الألياف جيدة للمعدة."],
    "Lexin007557": ["Fickan var tom.", "كان الجيب فارغاً."],
    "Lexin007558": ["Fickan i ryggsäcken var full.", "كانت الفجوة في الحقيبة مليئة."],
    "Lexin007560": ["Fickdatorn var praktisk.", "كان حاسوب الجيب عملياً."],
    "Lexin007562": ["Ficklampan lyste i mörkret.", "أضاء مصباح الجيب في الظلام."],
    "Lexin007563": ["Fickpengarna sparades.", "حُفظ مصروف الجيب."],
    "Lexin007565": ["Ficktjuven greps.", "قُبض على النشال."],
    "Lexin007566": ["Fienden attackerade.", "هاجم العدو."],
    "Lexin007568": ["Fifflet avslöjades.", "كُشف الخداع."],
    "Lexin007576": ["Fiket serverade kaffe.", "قدم المقهى القهوة."],
    "Lexin007577": ["Fikan var god.", "كانت القهوة لذيذة."],
    "Lexin007579": ["Fikonet var sött.", "كان التين حلواً."],
    "Lexin007580": ["Fikonspråket var svårt.", "كانت لغة الغمغمة صعبة."],
    "Lexin007581": ["Fiktionen var spännande.", "كان الخيال مشوقاً."],
    "Lexin007583": ["Fikusen stod i fönstret.", "وقفت شجرة المطاط في النافذة."],
    "Lexin007584": ["Fikusen gick på paraden.", "شارك الشاذ في الموكب."],
    "Lexin007587": ["Filen var smal.", "كان المسار ضيقاً."],
    "Lexin007589": ["Filen sparades på hårddisken.", "حُفظ الملف على القرص."],
    "Lexin007590": ["Filen var frisk.", "كان اللبن المخثر منعشاً."],
    "Lexin007594": ["Filén stektes.", "قُليت شريحة اللحم."],
    "Lexin007595": ["Filharmonikern spelade Mozart.", "عزف الفيلهارموني موتسارت."],
    "Lexin007596": ["Filialen öppnade i stan.", "فتح الفرع في المدينة."],
    "Lexin007599": ["Filmen var bra.", "كان الفيلم جيداً."],
    "Lexin007602": ["Filmatiseringen var trogen boken.", "كان الإخراج السينمائي وفياً للكتاب."],
    "Lexin007604": ["Filmjölken serverades kall.", "قُدم اللبن المخثر بارداً."],
    "Lexin007605": ["Filosofen tänkte djupt.", "فكر الفيلسوف عميقاً."],
    "Lexin007607": ["Filosofin studerades.", "دُرست الفلسفة."],
    "Lexin007609": ["Filten var varm.", "كانت البطانية دافئة."],
    "Lexin007610": ["Filtret renade vattnet.", "نقى الفلتر الماء."],
    "Lexin007619": ["Filuren skämtade.", "مزح الماكر."],
    "Lexin007621": ["Fimpen slängdes.", "رُميت عقب السيجارة."],
    "Lexin007636": ["Finansiären investerade.", "استثمر الممول."],
    "Lexin007649": ["Fingerborgen skyddade fingret.", "حمى الكشتبان الإصبع."],
    "Lexin007656": ["Finishen avgjorde tävlingen.", "حسمت نهاية السباق المسابقة."],
    "Lexin007657": ["Finishen på möbeln var slät.", "كان الصقل على الأثاث أملس."],
    "Lexin007660": ["Finkan var kall.", "كان السجن بارداً."],
    "Lexin007666": ["Finländaren talade finska.", "تحدث الفنلندي الفنلندية."],
    "Lexin007668": ["Finländskan flyttade till Sverige.", "انتقلت الفنلندية إلى السويد."],
    "Lexin007671": ["Finmekanikern reparerade uret.", "أصلح الميكانيكي الساعة."],
    "Lexin007674": ["Finnen försvann.", "اختفت البثرة."],
    "Lexin007675": ["Finnen spelade ishockey.", "لعب الفنلندي هوكي الجليد."],
    "Lexin007683": ["Finska talas i Finland.", "تُتحدث الفنلندية في فنلندا."],
    "Lexin007684": ["Finskan skrev en bok.", "كتبت الفنلندية كتاباً."]
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

const backupPath = DATA_FILE + '.backup_nouns17_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Done! Added examples to ${updated} nouns. Total: 1700 nouns!`);
