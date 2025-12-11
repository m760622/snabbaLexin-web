/**
 * Add examples to nouns - Batch 15 (100 nouns: E-postadress to Epilepsi)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin006256": ["E-postadressen behövdes för kontot.", "كان عنوان البريد الإلكتروني ضرورياً للحساب."],
    "Lexin006261": ["Ebben blottade havsbotten.", "كشف الجزر قاع البحر."],
    "Lexin006262": ["Eden var en förbannelse.", "كانت اللعنة شتيمة."],
    "Lexin006265": ["Eddan berättar om nordiska gudar.", "تروي الإدا عن الآلهة الإسكندنافية."],
    "Lexin006274": ["Effekterna packades i väskan.", "حُزمت الأمتعة في الحقيبة."],
    "Lexin006311": ["Efterhand lärde han sig språket.", "تعلم اللغة فيما بعد."],
    "Lexin006314": ["Efterhärmningen var perfekt.", "كان التقليد مثالياً."],
    "Lexin006315": ["Efterkrigstiden var svår.", "كانت فترة ما بعد الحرب صعبة."],
    "Lexin006316": ["Projektet var på efterkälken.", "كان المشروع متأخراً."],
    "Lexin006317": ["Efterlevande fick försäkringen.", "حصل الباقون على التأمين."],
    "Lexin006320": ["Efterlevandepensionen betalades ut.", "صُرف معاش الأرملة."],
    "Lexin006328": ["Eftermiddagen var lugn.", "كان بعد الظهر هادئاً."],
    "Lexin006331": ["Efterräkningen kom senare.", "جاءت المحاسبة لاحقاً."],
    "Lexin006332": ["Efterrätten var glass.", "كانت الحلوى آيس كريم."],
    "Lexin006336": ["Eftersläng är förbjudet.", "المزاحمة ممنوعة."],
    "Lexin006337": ["Eftersläntraren kom sist.", "جاء المتأخر أخيراً."],
    "Lexin006340": ["Eftersnacket pågick i timmar.", "استمر النقاش اللاحق ساعات."],
    "Lexin006353": ["Efterträdaren tog över ansvaret.", "تولى الخلف المسؤولية."],
    "Lexin006356": ["Eftervården var viktig.", "كانت رعاية ما بعد العملية مهمة."],
    "Lexin006365": ["Egenarten gjorde honom unik.", "جعله تميزه فريداً."],
    "Lexin006366": ["Egenavgiften betalades.", "دُفعت الرسوم الشخصية."],
    "Lexin006372": ["Egenheten var märklig.", "كانت الخصوصية غريبة."],
    "Lexin006381": ["Egennamn skrivs med stor bokstav.", "يُكتب الاسم بحرف كبير."],
    "Lexin006382": ["Egennyttan styrde hans val.", "وجهت الأنانية اختياراته."],
    "Lexin006385": ["Egenskapen var viktig.", "كانت الصفة مهمة."],
    "Lexin006395": ["Eggen på kniven var vass.", "كان نصل السكين حاداً."],
    "Lexin006398": ["Egnahemmen byggdes på 50-talet.", "بُنيت الفلل في الخمسينيات."],
    "Lexin006399": ["Egot kan vara starkt.", "يمكن أن تكون الأنا قوية."],
    "Lexin006401": ["Egoismen skadade relationen.", "أضرت الأنانية بالعلاقة."],
    "Lexin006402": ["Egoisten tänkte bara på sig själv.", "فكر الأناني في نفسه فقط."],
    "Lexin006404": ["Egotrippen var meningslös.", "كانت الأنانية بلا معنى."],
    "Lexin006406": ["Egyptiern berättade om pyramiderna.", "روى المصري عن الأهرامات."],
    "Lexin006411": ["Ejdern lever vid kusten.", "يعيش العيدر على الساحل."],
    "Lexin006413": ["Eken var 200 år gammal.", "كانت شجرة السنديان عمرها 200 سنة."],
    "Lexin006415": ["Ekan paddlades över sjön.", "جُدف الزورق عبر البحيرة."],
    "Lexin006417": ["Ekrarna i hjulet var slitna.", "كانت برامق العجلة متآكلة."],
    "Lexin006421": ["Ekipaget körde genom staden.", "مرت العربة في المدينة."],
    "Lexin006422": ["Ekiperingen sålde kostymer.", "باعت الكماليات البدلات."],
    "Lexin006437": ["Ekologin studerar naturen.", "يدرس علم البيئة الطبيعة."],
    "Lexin006438": ["Ekonomen analyserade budgeten.", "حلل الاقتصادي الميزانية."],
    "Lexin006441": ["Ekonomin var stram.", "كان التوفير صارماً."],
    "Lexin006443": ["Ekonomibiträdet diskade.", "غسل مساعد المطبخ الصحون."],
    "Lexin006445": ["Ekonomiklass var billigare.", "كانت الدرجة العادية أرخص."],
    "Lexin006464": ["Eksemet kliade.", "حك الأكزيما."],
    "Lexin006468": ["Ekvator delar jorden.", "يقسم خط الاستواء الأرض."],
    "Lexin006478": ["Elakingen retade andra.", "أغاظ الخبيث الآخرين."],
    "Lexin006491": ["Eldbegängelsebyrån ordnade kremeringen.", "رتب مكتب حرق الجثث الحرق."],
    "Lexin006497": ["Eldgivningen upphörde.", "توقف إطلاق النار."],
    "Lexin006498": ["Eldhavet förstörde skogen.", "دمر بحر النيران الغابة."],
    "Lexin006499": ["Eldningen startade på morgonen.", "بدأ الإحراق صباحاً."],
    "Lexin006501": ["Eldprovet var svårt.", "كان الامتحان عسيراً."],
    "Lexin006505": ["Eldstaden var varm.", "كان الموقد دافئاً."],
    "Lexin006508": ["Elefanten är enorm.", "الفيل ضخم."],
    "Lexin006511": ["Elegansen imponerade.", "أعجبت الأناقة."],
    "Lexin006513": ["Elektricitet driver lampan.", "تشغل الكهرباء المصباح."],
    "Lexin006524": ["Elektroner kretsar runt kärnan.", "تدور الإلكترونات حول النواة."],
    "Lexin006525": ["Elektroniken utvecklas snabbt.", "تتطور الإلكترونيات بسرعة."],
    "Lexin006526": ["Elektroniken i datorn var avancerad.", "كانت إلكترونيات الكمبيوتر متقدمة."],
    "Lexin006542": ["Elevrådet höll möte.", "عقد مجلس التلاميذ اجتماعاً."],
    "Lexin006544": ["Elfenben är värdefullt.", "العاج ثمين."],
    "Lexin006557": ["Ellipsen var oval.", "كان الشكل البيضاوي بيضوياً."],
    "Lexin006559": ["Elljuset tändes.", "أُضيء الضوء الكهربائي."],
    "Lexin006560": ["Elmätaren visade förbrukningen.", "أظهر عداد الكهرباء الاستهلاك."],
    "Lexin006565": ["Elstisen värmde stolen.", "سخن المقعد الكهربائي الكرسي."],
    "Lexin006569": ["Elva spelare bildar ett lag.", "يُشكل أحد عشر لاعباً فريقاً."],
    "Lexin006570": ["Elverket producerade ström.", "أنتج محطة الكهرباء التيار."],
    "Lexin006574": ["Emaljen skyddade tänderna.", "حمت المينا الأسنان."],
    "Lexin006579": ["Emballaget var miljövänligt.", "كان التغليف صديقاً للبيئة."],
    "Lexin006583": ["Embargot drabbade handel.", "أضر الحظر بالتجارة."],
    "Lexin006585": ["Embryot utvecklades.", "تطور الجنين."],
    "Lexin006596": ["Emigranten lämnade landet.", "غادر المهاجر البلاد."],
    "Lexin006597": ["Emigrationen ökade.", "ازدادت الهجرة."],
    "Lexin006600": ["Emissionen gav nytt kapital.", "أعطى الإصدار رأس مال جديداً."],
    "Lexin006611": ["Enen växte i trädgården.", "نمت شجرة العرعر في الحديقة."],
    "Lexin006622": ["Enaktaren spelades på teatern.", "عُرضت التمثيلية في المسرح."],
    "Lexin006630": ["Encyklopedin innehöll allt.", "احتوت الموسوعة على كل شيء."],
    "Lexin006652": ["Endräkten stärkte gruppen.", "قوى التناغم المجموعة."],
    "Lexin006666": ["Hon var ett energiknippe.", "كانت كتلة طاقة."],
    "Lexin006689": ["Engelska talas i många länder.", "تُتحدث الإنجليزية في بلدان كثيرة."],
    "Lexin006690": ["Engelskan flyttade till Sverige.", "انتقلت الإنجليزية إلى السويد."],
    "Lexin006691": ["Engelsmannen drack te.", "شرب الإنجليزي الشاي."],
    "Lexin006697": ["Enheten mätte volymen.", "قاست الوحدة الحجم."],
    "Lexin006718": ["Enklaven omgavs av annat land.", "أحاطت أرض أجنبية المنطقة."],
    "Lexin006719": ["Enkronan är ett silvermynt.", "الكرونة عملة فضية."],
    "Lexin006720": ["Enkäten besvarades av 100 personer.", "أجاب 100 شخص على الاستبيان."],
    "Lexin006722": ["I enlighet med reglerna.", "وفقاً للقواعد."],
    "Lexin006732": ["Vi pratade i enrum.", "تحدثنا على انفراد."],
    "Lexin006734": ["Det var hans ensak.", "كان ذلك شأنه الخاص."],
    "Lexin006738": ["Ensamheten var påfrestande.", "كانت الوحدة مرهقة."],
    "Lexin006742": ["Ensemblen spelade på teatern.", "أدت المجموعة الفنية في المسرح."],
    "Lexin006763": ["Enslingen bodde i skogen.", "سكن المنعزل في الغابة."],
    "Lexin006767": ["Enstöringen undvek folk.", "تجنب الناسك الناس."],
    "Lexin006775": ["Entreprenaden kostade miljoner.", "كلفت المقاولة ملايين."],
    "Lexin006782": ["Entreprenören byggde huset.", "بنى المقاول البيت."],
    "Lexin006785": ["Entusiasmen var smittande.", "كانت الحماسة معدية."],
    "Lexin006795": ["Envisheten ledde till framgång.", "أدى العناد للنجاح."],
    "Lexin006796": ["Envåldshärskaren styrde landet.", "حكم المستبد البلاد."],
    "Lexin006797": ["Enväldet upphörde.", "انتهى الاستبداد."],
    "Lexin006799": ["Enzymer hjälper matsmältningen.", "تساعد الأنزيمات الهضم."],
    "Lexin006814": ["Epilepsin kontrollerades med medicin.", "سُيطر على الصرع بالدواء."]
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

const backupPath = DATA_FILE + '.backup_nouns15_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`🎉 Milestone! Added examples to ${updated} nouns. Total: 1500 nouns!`);
