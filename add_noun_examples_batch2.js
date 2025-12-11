/**
 * Add examples to nouns - Batch 2 (100 nouns: Altruist to Aprikos)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin000670": ["Altruisten hjälper alltid andra före sig själv.", "الغيري يساعد الآخرين دائماً قبل نفسه."],
    "Lexin000675": ["Burkarna är gjorda av aluminium.", "العلب مصنوعة من الألومنيوم."],
    "Lexin000682": ["Tandläkaren använde amalgam för att fylla hålet.", "استخدم طبيب الأسنان الأملغم لحشو الثقب."],
    "Lexin000683": ["Hon var en riktig amason på slagfältet.", "كانت امرأة محاربة حقيقية في ساحة المعركة."],
    "Lexin000684": ["Han spelar fotboll som amatör.", "يلعب كرة القدم كهاوٍ."],
    "Lexin000686": ["Ambassadören representerar sitt land utomlands.", "يمثل السفير بلاده في الخارج."],
    "Lexin000687": ["Hennes ambition är att bli läkare.", "طموحها أن تصبح طبيبة."],
    "Lexin000694": ["Amerikanen berättade om livet i USA.", "روى الأمريكي عن الحياة في الولايات المتحدة."],
    "Lexin000695": ["Amerikanaren talade flytande svenska.", "تحدث الأمريكي السويدية بطلاقة."],
    "Lexin000696": ["Han körde en stor amerikanare från 1960-talet.", "قاد سيارة أمريكية كبيرة من الستينيات."],
    "Lexin000699": ["Konserten hölls i en vacker amfiteater.", "أقيمت الحفلة في مسرح مدرّج جميل."],
    "Lexin000700": ["AMI hjälper arbetssökande att hitta jobb.", "يساعد معهد سوق العمل الباحثين عن عمل."],
    "Lexin000704": ["Amiralen ledde flottan i striden.", "قاد الأميرال الأسطول في المعركة."],
    "Lexin000707": ["Soldaterna hade slut på ammunition.", "نفدت الذخيرة من الجنود."],
    "Lexin000711": ["Amning rekommenderas under barnets första år.", "يُنصح بالرضاعة خلال السنة الأولى للطفل."],
    "Lexin000714": ["Han sprang amok i affären.", "هاج وانتشر في المتجر بسُعار."],
    "Lexin000724": ["Ampeln med blommor hänger i fönstret.", "المعلّقة مع الزهور معلقة في النافذة."],
    "Lexin000725": ["Strömstyrkan mäts i ampere.", "تُقاس شدة التيار بالأمبير."],
    "Lexin000727": ["Sjuksköterskan öppnade en ampull med medicin.", "فتحت الممرضة أنبولة الدواء."],
    "Lexin000733": ["Han gick en kurs på AMU-center.", "التحق بدورة في مركز دراسات سوق العمل."],
    "Lexin000734": ["Hon bar en amulett för att skydda sig.", "حملت تعويذة لحماية نفسها."],
    "Lexin000742": ["Bilen i den historiska filmen var en anakronism.", "كانت السيارة في الفيلم التاريخي مفارقة تاريخية."],
    "Lexin000744": ["Analfabeten kunde inte fylla i blanketten.", "لم يستطع الأميّ ملء الاستمارة."],
    "Lexin000748": ["Det finns en analogi mellan de två fallen.", "هناك تناظر بين الحالتين."],
    "Lexin000755": ["Analöppningen är en del av matsmältningssystemet.", "فتحة الشرج جزء من الجهاز الهضمي."],
    "Lexin000759": ["Läkaren tog upp patientens anamnes.", "أخذ الطبيب التاريخ المرضي للمريض."],
    "Lexin000763": ["Landet föll i anarki efter revolutionen.", "سقطت البلاد في الفوضى بعد الثورة."],
    "Lexin000764": ["Anarkisten protesterade mot regeringen.", "احتج الفوضوي ضد الحكومة."],
    "Lexin000765": ["Anatomi är ett viktigt ämne för läkarstudenter.", "التشريح مادة مهمة لطلاب الطب."],
    "Lexin000794": ["Anden simmar i dammen.", "تسبح البطة في البركة."],
    "Lexin000797": ["Morgonandakten hålls klockan åtta.", "يُقام القداس الصباحي الساعة الثامنة."],
    "Lexin000798": ["Hon höll andan under vattnet.", "حبست أنفاسها تحت الماء."],
    "Lexin000808": ["De köpte en andelslägenhet tillsammans.", "اشتروا شقة حصص معاً."],
    "Lexin000811": ["Lagens andemening är att skydda arbetare.", "روح القانون هي حماية العمال."],
    "Lexin000816": ["Efter språngmarschen behövde han en andhämtning.", "بعد المشي السريع احتاج لاسترداد أنفاسه."],
    "Lexin000823": ["Luften går in i andningsorganen.", "يدخل الهواء إلى جهاز التنفس."],
    "Lexin000835": ["Jag köpte en soffa på andrahandsaffären.", "اشتريت أريكة من محل المستعمل."],
    "Lexin000836": ["Hon hyr en andrahandslägenhet i stan.", "تستأجر شقة من الباطن في المدينة."],
    "Lexin000842": ["Farfar berättade en rolig anekdot.", "روى الجد نادرة مضحكة."],
    "Lexin000844": ["Anemi kan orsaka trötthet.", "يمكن أن يسبب فقر الدم التعب."],
    "Lexin000847": ["Operationen utfördes under anestesi.", "أُجريت العملية تحت التخدير."],
    "Lexin000848": ["Anfadern bosatte sig i Sverige på 1700-talet.", "استقر الجد الأول في السويد في القرن الثامن عشر."],
    "Lexin000855": ["Kapitlet börjar med en vacker anfang.", "يبدأ الفصل بحرف استهلالي جميل."],
    "Lexin000863": ["Journalisten använde en anföring i artikeln.", "استخدم الصحفي اقتباساً في المقال."],
    "Lexin000865": ["Alla anförvantar var inbjudna till bröllopet.", "دُعي جميع الأقارب إلى حفل الزفاف."],
    "Lexin000903": ["En anhopning av människor väntade utanför.", "كان تجمع من الناس ينتظر بالخارج."],
    "Lexin000908": ["Anhållandet skedde tidigt på morgonen.", "حدث الاعتقال في الصباح الباكر."],
    "Lexin000913": ["Partiets anhängare fylld salen.", "ملأ مؤيدو الحزب القاعة."],
    "Lexin000928": ["Anis ger en stark lakritssmak.", "يعطي اليانسون نكهة عرقسوس قوية."],
    "Lexin000930": ["Nyheten visade sig vara en anka.", "تبين أن الخبر كان زائفاً."],
    "Lexin000933": ["Båten kastade ankaret i hamnen.", "ألقى القارب المرساة في الميناء."],
    "Lexin000939": ["Politiken har blivit en riktig ankdamm.", "أصبحت السياسة بركة ضفادع حقيقية."],
    "Lexin000940": ["Han skadade sin ankel under matchen.", "أصاب كاحله خلال المباراة."],
    "Lexin000948": ["Hon kom till Sverige som anknytningsfall.", "جاءت إلى السويد كحالة لم شمل."],
    "Lexin000960": ["Hans anlete uttryckte sorg.", "عبّر وجهه عن الحزن."],
    "Lexin001006": ["Gästerna bodde i hotellets annex.", "أقام الضيوف في ملحق الفندق."],
    "Lexin001021": ["Anoraken skyddade mot vinden.", "حمت السترة المقلنسة من الرياح."],
    "Lexin001025": ["Anorexi är en allvarlig ätstörning.", "فقدان الشهية المرضي اضطراب أكل خطير."],
    "Lexin001035": ["Anpassningsgruppen hjälper handikappade på arbetet.", "تساعد مجموعة التهيئة ذوي الإعاقة في العمل."],
    "Lexin001043": ["Kocken serverade en delikat anrättning.", "قدم الطباخ طبقاً شهياً."],
    "Lexin001045": ["En ansamling av moln bildades över bergen.", "تشكل تجمع من الغيوم فوق الجبال."],
    "Lexin001056": ["Hennes ansikte lyste av glädje.", "أشرق وجهها بالفرح."],
    "Lexin001058": ["Skådespelerskan gjorde en ansiktslyftning.", "أجرت الممثلة عملية تجميل للوجه."],
    "Lexin001061": ["Ansjovis är en populär topping på pizza.", "الأنشوفة إضافة شائعة على البيتزا."],
    "Lexin001099": ["Det blev en anstormning till rean.", "كان هناك تسابق كبير إلى التخفيضات."],
    "Lexin001115": ["Anställningsskyddet ger trygghet för arbetare.", "توفر حماية التوظيف الأمان للعمال."],
    "Lexin001116": ["Hon fick anställningsstöd för sin nya tjänst.", "حصلت على دعم التوظيف لوظيفتها الجديدة."],
    "Lexin001154": ["Mitt antagande var korrekt.", "كان افتراضي صحيحاً."],
    "Lexin001155": ["Antagandepoängen påverkar pensionen.", "تؤثر نقاط التخمين على المعاش."],
    "Lexin001159": ["Antagonisten i boken var en skurk.", "كان الغريم في الكتاب شريراً."],
    "Lexin001173": ["Läkaren ordinerade antibiotika mot infektionen.", "وصف الطبيب مضادات حيوية للعدوى."],
    "Lexin001182": ["Filmens huvudperson var en antihjälte.", "كانت الشخصية الرئيسية في الفيلم بطلاً غير تقليدي."],
    "Lexin001186": ["Antiken var en tid av stora filosofer.", "كانت العصور القديمة زمن الفلاسفة العظماء."],
    "Lexin001187": ["Slutet på filmen var en riktig antiklimax.", "كانت نهاية الفيلم هبوطاً مخيباً للآمال."],
    "Lexin001189": ["Kroppen producerar antikroppar mot virus.", "ينتج الجسم أجساماً مضادة ضد الفيروسات."],
    "Lexin001192": ["Jag köpte en gammal bok på antikvariatet.", "اشتريت كتاباً قديماً من متجر الكتب العتيقة."],
    "Lexin001194": ["Antikviteterna såldes på auktion.", "بيعت التحف الأثرية في مزاد."],
    "Lexin001197": ["Antisemiten spred hatiska budskap.", "نشر المعادي للسامية رسائل كراهية."],
    "Lexin001201": ["Antologin innehåller dikter från olika poeter.", "تحتوي المختارات الأدبية على قصائد من شعراء مختلفين."],
    "Lexin001203": ["Antropologi studerar mänskliga kulturer.", "يدرس علم الإنسان الثقافات البشرية."],
    "Lexin001208": ["Fienden var i antågande.", "كان العدو يقترب."],
    "Lexin001217": ["Följ anvisningarna på förpackningen.", "اتبع التعليمات على العبوة."],
    "Lexin001230": ["Aortan är kroppens största artär.", "الأبهر هو أكبر شريان في الجسم."],
    "Lexin001234": ["Apan klättrade i trädet.", "تسلق القرد الشجرة."],
    "Lexin001235": ["Prinsens apanage betalas av staten.", "تدفع الدولة إقطاعة الأمير."],
    "Lexin001238": ["Apartheid var ett system av rasism.", "كان الفصل العنصري نظام تمييز عرقي."],
    "Lexin001239": ["Han sjönk ner i apati efter förlusten.", "غرق في اللامبالاة بعد الخسارة."],
    "Lexin001243": ["Vi drack en aperitif före middagen.", "شربنا مشهياً قبل العشاء."],
    "Lexin001248": ["Aposteln predikade i hela regionen.", "بشّر الحواري في كل المنطقة."],
    "Lexin001249": ["Använd apostrof för att visa utelämning.", "استخدم الفاصلة العليا لإظهار الحذف."],
    "Lexin001254": ["Laboratoriets apparatur är modern.", "أدوات المختبر حديثة."],
    "Lexin001255": ["Ledaren gjorde en appell till folket.", "وجه القائد نداءً للشعب."],
    "Lexin001257": ["Han opererades för appendicit.", "أُجريت له عملية التهاب الزائدة الدودية."],
    "Lexin001259": ["Bokens appendix innehåller statistik.", "يحتوي ملحق الكتاب على إحصائيات."],
    "Lexin001260": ["Appendix sitter i början av tjocktarmen.", "تقع الزائدة الدودية في بداية الأمعاء الغليظة."],
    "Lexin001264": ["Applikationen av teorin var svår.", "كان تطبيق النظرية صعباً."],
    "Lexin001265": ["Kudden har vackra applikationer.", "الوسادة عليها زخارف جميلة."],
    "Lexin001266": ["Publiken brast ut i applåder.", "انفجر الجمهور بالتصفيق."],
    "Lexin001269": ["Hunden hämtade pinnen - bra apport!", "أحضر الكلب العصا - إحضار جيد!"],
    "Lexin001272": ["Aprikosen är en söt och saftig frukt.", "المشمش فاكهة حلوة وعصيرية."]
};

let content = fs.readFileSync(DATA_FILE, 'utf8');
const match = content.match(/const\s+dictionaryData\s*=\s*(\[[\s\S]*\]);/);
if (!match) { console.error('Could not find dictionaryData'); process.exit(1); }

let data = eval(match[1]);
console.log(`Loaded ${data.length} entries`);

const COL_ID = 0, COL_SWE_EXAMPLE = 7, COL_ARB_EXAMPLE = 8;
let updated = 0;

for (let i = 0; i < data.length; i++) {
    const id = data[i][COL_ID];
    if (examples[id]) {
        data[i][COL_SWE_EXAMPLE] = examples[id][0];
        data[i][COL_ARB_EXAMPLE] = examples[id][1];
        updated++;
    }
}

console.log(`\n📊 Updated ${updated} entries\n`);

const backupPath = DATA_FILE + '.backup_nouns2_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Done! Added examples to ${updated} nouns.`);
