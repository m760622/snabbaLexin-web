/**
 * Add examples to nouns - Batch 12 (100 nouns: Cyklist to Devis)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin005070": ["Cyklisten cyklade fort.", "قاد راكب الدراجة بسرعة."],
    "Lexin005071": ["Cyklopögat skyddade ögonen under vatten.", "حمت نظارة الغطس العينين تحت الماء."],
    "Lexin005072": ["Cylindern i motorn fungerade bra.", "عملت الأسطوانة في المحرك بشكل جيد."],
    "Lexin005073": ["Cynikern ifrågasatte allt.", "شكك العياب في كل شيء."],
    "Lexin005075": ["Cynismen präglade hans syn på livet.", "طبعت الكلبية نظرته للحياة."],
    "Lexin005076": ["Cystan upptäcktes vid undersökningen.", "اكتُشف الورم أثناء الفحص."],
    "Lexin005088": ["D är den fjärde bokstaven.", "D هو الحرف الرابع."],
    "Lexin005093": ["Dadeln var söt och god.", "كان التمر حلواً ولذيذاً."],
    "Lexin005096": ["I våra dagar är tekniken viktig.", "في وقتنا هذا التكنولوجيا مهمة."],
    "Lexin005098": ["Dagbarnet lekte med andra barn.", "لعب طفل الحضانة مع أطفال آخرين."],
    "Lexin005099": ["Dagbarnvårdaren tog hand om fem barn.", "اعتنت المربية بخمسة أطفال."],
    "Lexin005100": ["Hon skrev i sin dagbok varje kväll.", "كتبت في مذكراتها كل مساء."],
    "Lexin005102": ["Dagbrottet producerade järnmalm.", "أنتج المقلع خام الحديد."],
    "Lexin005103": ["Dagbrytningen var effektiv.", "كان القلع السطحي فعالاً."],
    "Lexin005104": ["Dagcentralen erbjöd aktiviteter för äldre.", "قدم المركز النهاري أنشطة للمسنين."],
    "Lexin005105": ["Dagdrivaren lekte vid parken.", "تسكع العاطل في الحديقة."],
    "Lexin005107": ["Saken kom i dager.", "ظهر الأمر للنور."],
    "Lexin005112": ["Daggmasken grävde i jorden.", "حفر الخرطون في التراب."],
    "Lexin005113": ["Daghemmet tog emot barn.", "استقبلت الروضة الأطفال."],
    "Lexin005118": ["Dagjämningen inträffar i mars.", "يحدث الاعتدال في مارس."],
    "Lexin005121": ["Dagmamman hämtade barnen.", "أحضرت المربية الأطفال."],
    "Lexin005125": ["Dagsböterna uppgick till 1000 kronor.", "بلغت الغرامات اليومية 1000 كرون."],
    "Lexin005130": ["Dagsländan lever bara en dag.", "تعيش ذبابة النوار يوماً واحداً."],
    "Lexin005131": ["Dagsmejan smälte snön.", "أذاب الذوبان النهاري الثلج."],
    "Lexin005132": ["Dagspressen rapporterade nyheten.", "نقلت الصحافة اليومية الخبر."],
    "Lexin005134": ["Dagstidningen kom varje morgon.", "وصلت الصحيفة اليومية كل صباح."],
    "Lexin005135": ["Dagsverket tog åtta timmar.", "استغرق عمل اليوم ثماني ساعات."],
    "Lexin005144": ["Dalahästen är en svensk symbol.", "حصان دالرنا رمز سويدي."],
    "Lexin005147": ["Dallret syntes på ytan.", "ظهر الاهتزاز على السطح."],
    "Lexin005153": ["Dam spelas på schackbräde.", "تُلعب الداما على رقعة الشطرنج."],
    "Lexin005154": ["Damaskerna skyddade vristerna.", "حمت الداماسكر الكاحلين."],
    "Lexin005155": ["Damastduken var vacker.", "كان المفرش المطرز جميلاً."],
    "Lexin005156": ["Dambindan köptes på apoteket.", "اشتُري الحفاظ النسائي من الصيدلية."],
    "Lexin005157": ["Damfriseringen låg centralt.", "كان الكوافير وسط المدينة."],
    "Lexin005158": ["Damfrisören klippte hennes hår.", "قص الحلاق النسائي شعرها."],
    "Lexin005160": ["Dammet samlades på hyllan.", "تجمع الغبار على الرف."],
    "Lexin005172": ["Dammtrasan torkade bort smutsen.", "مسحت خرقة التنظيف الوسخ."],
    "Lexin005174": ["Damrummet var på andra våningen.", "كان تواليت السيدات في الطابق الثاني."],
    "Lexin005177": ["Han gick på dank hela dagen.", "تكاسل طوال اليوم."],
    "Lexin005178": ["Dansen var vacker.", "كان الرقص جميلاً."],
    "Lexin005180": ["Dansbanan var full på midsommar.", "كانت باحة الرقص مليئة في منتصف الصيف."],
    "Lexin005182": ["Dansken talade danska.", "تحدث الدانماركي الدانماركية."],
    "Lexin005183": ["Danska liknar svenska.", "الدانماركية تشبه السويدية."],
    "Lexin005184": ["Danskan arbetade i Malmö.", "عملت الدانماركية في مالمو."],
    "Lexin005185": ["Dansören uppträdde på scenen.", "أدى الراقص على المسرح."],
    "Lexin005192": ["Dart spelas med pilar.", "تُلعب الدارت بالسهام."],
    "Lexin005198": ["Databehandlingen gick snabbt.", "جرت معالجة البيانات بسرعة."],
    "Lexin005201": ["Datamaskinen löste uppgiften.", "حل الحاسوب المسألة."],
    "Lexin005203": ["Dataregistret uppdaterades.", "حُدّث سجل البيانات."],
    "Lexin005204": ["Dataskärmen visade felet.", "أظهرت شاشة الحاسوب الخطأ."],
    "Lexin005205": ["Dataterminalen kopplades till servern.", "اتصلت المحطة الطرفية بالخادم."],
    "Lexin005207": ["Vad är dato idag?", "ما هو التاريخ اليوم؟"],
    "Lexin005212": ["Datorutrustningen kostade 10 000 kronor.", "كلفت تجهيزات الكمبيوتر 10,000 كرون."],
    "Lexin005217": ["Davidsstjärnan är en judisk symbol.", "نجمة داوود رمز يهودي."],
    "Lexin005227": ["Debetsidan visade skulderna.", "أظهر جانب الدين الديون."],
    "Lexin005234": ["December är årets sista månad.", "ديسمبر آخر شهر في السنة."],
    "Lexin005235": ["Decenniet präglades av förändring.", "تميز العقد بالتغيير."],
    "Lexin005237": ["Decibel mäter ljudstyrka.", "الديسيبل يقيس شدة الصوت."],
    "Lexin005238": ["En deciliter är 100 milliliter.", "الديسيلتر مئة ملليلتر."],
    "Lexin005239": ["Decimalen stod efter kommat.", "الكسر العشري بعد الفاصلة."],
    "Lexin005240": ["En decimeter är tio centimeter.", "الديسيمتر عشرة سنتيمترات."],
    "Lexin005241": ["Deckaren utredde brottet.", "حقق المخبر في الجريمة."],
    "Lexin005242": ["Deckaren var spännande.", "كانت الرواية البوليسية مشوقة."],
    "Lexin005244": ["Dedikationen var rörande.", "كان الإهداء مؤثراً."],
    "Lexin005254": ["Definitionen förklarade begreppet.", "شرح التعريف المفهوم."],
    "Lexin005264": ["Degeln tålde hög temperatur.", "تحمل الإناء الحراري درجة حرارة عالية."],
    "Lexin005271": ["Dekalen klistrades på bilen.", "لُصقت اللوحة على السيارة."],
    "Lexin005273": ["Företaget var på dekis.", "كانت الشركة في انحطاط."],
    "Lexin005275": ["Deklarationen lämnades in i maj.", "قُدم التصريح في مايو."],
    "Lexin005277": ["Deklarationen visade varans innehåll.", "أظهر بيان المحتويات محتوى السلعة."],
    "Lexin005281": ["Deklinationen avgör böjningen.", "يحدد تصريف الأسماء الصيغة."],
    "Lexin005282": ["Dekodern öppnade kanalen.", "فتح جهاز فك التشفير القناة."],
    "Lexin005284": ["Dekorationen prydde salen.", "زينت الزينة القاعة."],
    "Lexin005285": ["Han fick en dekoration för mod.", "حصل على توسيم للشجاعة."],
    "Lexin005294": ["Delegaten röstade ja.", "صوت المندوب بنعم."],
    "Lexin005298": ["Delfinen simmade snabbt.", "سبح الدلفين بسرعة."],
    "Lexin005305": ["Delikatessen smakade underbart.", "كان الطعام اللذيذ رائعاً."],
    "Lexin005307": ["Delpensionen utbetalades.", "صُرف معاش التقاعد الجزئي."],
    "Lexin005312": ["Deltat bildades vid flodmynningen.", "تشكلت الدلتا عند مصب النهر."],
    "Lexin005313": ["Deltagandet var stort.", "كانت المشاركة كبيرة."],
    "Lexin005314": ["Hon visade deltagande.", "أظهرت تعاطفاً."],
    "Lexin005320": ["Deltidsarbete passar många.", "يناسب العمل الجزئي كثيرين."],
    "Lexin005321": ["Deltidsgruppen träffades på morgonen.", "التقت مجموعة الدوام الجزئي صباحاً."],
    "Lexin005326": ["Delägaren investerade i bolaget.", "استثمر الشريك في الشركة."],
    "Lexin005329": ["Demagogen talade till massan.", "خاطب الدهمائي الجماهير."],
    "Lexin005334": ["Demokraten trodde på folkmakt.", "آمن الديموقراطي بسلطة الشعب."],
    "Lexin005338": ["Demonen skrämde folket.", "أخاف الشيطان الناس."],
    "Lexin005339": ["Demonstranten bar en skylt.", "حمل المتظاهر لافتة."],
    "Lexin005353": ["Denim används i jeans.", "يُستخدم الدينيم في الجينز."],
    "Lexin005357": ["Deodoranten tog bort lukten.", "أزال مزيل الروائح الرائحة."],
    "Lexin005358": ["Departementet ansvarade för utbildning.", "كانت الوزارة مسؤولة عن التعليم."],
    "Lexin005378": ["Depån förvarade utrustning.", "خزّن المستودع المعدات."],
    "Lexin005390": ["Designen var modern.", "كان التصميم عصرياً."],
    "Lexin005396": ["Desinformationen spreds online.", "انتشرت المعلومات المضللة على الإنترنت."],
    "Lexin005398": ["Despoten styrde med järnhand.", "حكم الطاغية بيد من حديد."],
    "Lexin005408": ["Destillationen renade vattnet.", "نقى التقطير الماء."],
    "Lexin005412": ["Destinationen var Paris.", "كانت الوجهة باريس."],
    "Lexin005430": ["Detaljen var viktig.", "كان الجزء مهماً."],
    "Lexin005440": ["Detektiven löste fallet.", "حل المخبر القضية."],
    "Lexin005448": ["Devisen var frihet och jämlikhet.", "كان الشعار الحرية والمساواة."]
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

const backupPath = DATA_FILE + '.backup_nouns12_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Done! Added examples to ${updated} nouns. Total: 1200 nouns!`);
