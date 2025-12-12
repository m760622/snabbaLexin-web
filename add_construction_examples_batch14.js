/**
 * Add examples to CONSTRUCTION terms - Batch 14 (100 terms: Läkt to Parallelltak)
 * Carefully matching IDs from construction_pending_batch.json
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin016860": ["Spika läkt på taket.", "تسمير العوارض الخشبية (Läkt) على السقف."],
    "Lexin016882": ["Mäta brädans längd.", "قياس طول اللوح."],
    "Lexin016962": ["Bygga väggar av lättbetong.", "بناء جدران من الخرسانة الخفيفة."],
    "Lexin016991": ["Få ut sin lön varje månad.", "الحصول على الراتب كل شهر."],
    "Lexin017001": ["Beräkna projektets lönekostnad.", "حساب تكلفة الرواتب للمشروع."],
    "Lexin017005": ["Lämna in tiderapporten som löneunderlag.", "تقديم تقرير الوقت كأساس للراتب."],
    "Lexin017013": ["Projektet var mycket lönsamt.", "المشروع كان مربحاً جداً."],
    "Lexin017044": ["Kontrollera färgens löslighet i vatten.", "التحقق من قابلية ذوبان الطلاء في الماء."],
    "Lexin017047": ["Hitta en teknisk lösning.", "إيجاد حل تقني."],
    "Lexin017118": ["Lägga ut makadam under grunden.", "فرش المكدام (حصى الطريق) تحت الأساس."],
    "Lexin017204": ["Lägga nytt tak på ett mansardtak.", "وضع سقف جديد على سقف منحدر (mansard)."],
    "Lexin017250": ["Ansöka om marklov för att fylla ut tomten.", "التقدم بطلب تصريح أراضي لردم الأرض."],
    "Lexin017253": ["Arbeta på marknads- och försäljningsavdelningen.", "العمل في قسم التسويق والمبيعات."],
    "Lexin017264": ["Följa markplaneringsritningen.", "اتباع رسم تخطيط الموقع."],
    "Lexin017265": ["Isolera grunden med markskiva.", "عزل الأساس بألواح أرضية."],
    "Lexin017267": ["Budgetera för dyra markåtgärder.", "وضع ميزانية لأعمال الأرض المكلفة."],
    "Lexin017270": ["Golv av äkta marmor.", "أرضية من الرخام الحقيقي."],
    "Lexin017301": ["Göra en noggrann maskering innan målning.", "عمل تغطية (maskering) دقيقة قبل الطلاء."],
    "Lexin017309": ["Ta fram en maskinplan för bygget.", "إعداد خطة الآليات للبناء."],
    "Lexin017318": ["Sätta upp masonit på väggen.", "تثبيت المازونيت على الجدار."],
    "Lexin017331": ["Dörren är av massiv ek.", "الباب من خشب البلوط الصلب."],
    "Lexin017332": ["Huset är byggt med massivväggar.", "المنزل مبني بجدران مصمتة (غير مجوفة)."],
    "Lexin017361": ["Lägga på ett lager matjord.", "وضع طبقة من التربة الزراعية."],
    "Lexin017392": ["Bygga skåp av MDF-board.", "بناء خزائن من ألواح MDF."],
    "Lexin017408": ["Vi har duktiga medarbetare.", "لدينا موظفون ماهرون."],
    "Lexin017616": ["Förseningen innebar en stor merkostnad.", "التأخير سبب تكلفة إضافية كبيرة."],
    "Lexin017702": ["Kontakta vår miljöansvarig.", "اتصل بالمسؤول البيئي لدينا."],
    "Lexin017703": ["Identifiera viktiga miljöaspekter.", "تحديد الجوانب البيئية المهمة."],
    "Lexin017704": ["Rapportera till miljöavdelningen.", "تقديم تقرير لقسم البيئة."],
    "Lexin017710": ["Utsläppet utgör en miljöfara.", "الانبعاث يشكل خطراً بيئياً."],
    "Lexin017712": ["Sanera efter en miljöförgiftning.", "التطهير بعد تلوث بيئي."],
    "Lexin017716": ["Ställa hårda miljökrav på leverantörerna.", "وضع متطلبات بيئية صارمة على الموردين."],
    "Lexin017718": ["Följa gällande miljölagstiftning.", "اتباع التشريعات البيئية السارية."],
    "Lexin017722": ["Upprätta en miljöplan för projektet.", "إنشاء خطة بيئية للمشروع."],
    "Lexin017723": ["Läs företagets miljöpolicy.", "اقرأ سياسة الشركة البيئية."],
    "Lexin017724": ["Beräkna byggnadens miljöpåverkan.", "حساب الأثر البيئي للمبنى."],
    "Lexin017726": ["Se miljövinster med återvinning.", "رؤية فوائد بيئية مع إعادة التدوير."],
    "Lexin017727": ["Skydda områdets miljövärden.", "حماية القيم البيئية (الطبيعية) للمنطقة."],
    "Lexin017750": ["Isolera väggarna med mineralull.", "عزل الجدران بالصوف المعدني."],
    "Lexin017848": ["Jag misstänker fuktskada.", "أشتبه بوجود ضرر رطوبة."],
    "Lexin017926": ["Modernisera värmesystemet.", "تحديث نظام التدفئة."],
    "Lexin017985": ["Hus byggda på monteringsband.", "منازل مبنية على خط تجميع."],
    "Lexin017987": ["Vi behöver en elektriker och en montör.", "نحتاج كهربائي وفني تركيب."],
    "Lexin018017": ["Samling klockan sju för morgonmöte.", "التجمع الساعة السابعة للاجتماع الصباحي."],
    "Lexin018031": ["Sätta mosaik i badrummet.", "تركيب فسيفساء في الحمام."],
    "Lexin018064": ["Byta motor i fläkten.", "تغيير محرك المروحة."],
    "Lexin018073": ["Bygga en bullervall mot motorvägen.", "بناء حاجز ضوضاء تجاه الطريق السريع."],
    "Lexin018190": ["Bygga en mur mot gatan.", "بناء سور تجاه الشارع."],
    "Lexin018193": ["Arbeta som murare.", "العمل كبناء (murare)."],
    "Lexin018194": ["Stapla murblock på pallen.", "تكديس كتل البناء على البليت."],
    "Lexin018196": ["Blanda till murbruk.", "خلط المونة."],
    "Lexin018197": ["Bära murbruk i en murbrukshink.", "حمل المونة في سطل."],
    "Lexin018201": ["Dra ut bruket med en murslev.", "فرد المونة بمسطرين."],
    "Lexin018202": ["Mura skorstenen med mursten.", "بناء المدخنة بطوب البناء."],
    "Lexin018204": ["Kontrollera fogarna i murverket.", "فحص الفواصل في البناء (الحائط المبني)."],
    "Lexin018243": ["Följa lagar om mutlagstiftning.", "اتباع قوانين مكافحة الرشوة."],
    "Lexin018307": ["Nå målet att bli klar i tid.", "تحقيق هدف الانتهاء في الوقت المحدد."],
    "Lexin018313": ["Ringa efter en målare.", "الاتصال بدهان."],
    "Lexin018370": ["Krav på hög måttnoggrannhet vid montering.", "متطلب دقة أبعاد عالية عند التركيب."],
    "Lexin018372": ["Mäta upp rummet med en måttstock.", "قياس الغرفة بمتر (طاري)."],
    "Lexin018384": ["Göra en mängdning av materialet.", "إجراء حصر كميات للمواد."],
    "Lexin018407": ["Överskrid inte kranens märklast.", "لا تتجاوز الحمل المقنن للرافعة."],
    "Lexin018410": ["Fästa tråden med en märla.", "تثبيت السلك بدبوس (märla)."],
    "Lexin018424": ["Mäta fönstrets bredd.", "قياس عرض النافذة."],
    "Lexin018427": ["Installera ett nytt mätarskåp.", "تركيب خزانة عدادات جديدة."],
    "Lexin018432": ["Mätningsingenjören sätter ut punkterna.", "مهندس المساحة يحدد النقاط."],
    "Lexin018455": ["Sanera badrummet från mögel.", "تطهير الحمام من العفن."],
    "Lexin018457": ["Huset har en omfattande mögelskada.", "المنزل به ضرر عفن واسع النطاق."],
    "Lexin018520": ["Naja fast armeringen.", "ربط حديد التسليح."],
    "Lexin018521": ["Använda najtråd och tång.", "استخدام سلك تربيط وكماشة."],
    "Lexin018620": ["Fasad av natursten.", "واجهة من الحجر الطبيعي."],
    "Lexin018632": ["Hjälp att navigera rätt i regelverket.", "المساعدة في التوجيه الصحيح في اللوائح."],
    "Lexin018636": ["Välja färg enligt NCS-systemet.", "اختيار اللون حسب نظام NCS."],
    "Lexin018758": ["Fästa plåten med nitpistol.", "تثبيت الصفيحة بمسدس برشام."],
    "Lexin018763": ["Kontrollera golvets nivå.", "فحص منسوب الأرضية."],
    "Lexin018822": ["Arbeta för normalisation av standarden.", "العمل لتوحيد المعايير."],
    "Lexin018829": ["Klara av normprestationen.", "تحقيق معدل الأداء القياسي."],
    "Lexin018872": ["Fästa pappen med nubb.", "تثبيت الورق المقوى بمسامير قصيرة (nubb)."],
    "Lexin018904": ["Detta är en nybyggnad, inte renovering.", "هذا بناء جديد، وليس تجديد."],
    "Lexin018905": ["Beställa en nybyggnadskarta hos kommunen.", "طلب خريطة بناء جديد من البلدية."],
    "Lexin018912": ["Samla in nyckeldata för projektet.", "جمع البيانات الرئيسية للمشروع."],
    "Lexin018914": ["Följa upp ekonomiska nyckeltal.", "متابعة المؤشرات الاقتصادية الرئيسية."],
    "Lexin019096": ["Ha en plan för nödläge.", "امتلاك خطة لحالات الطوارئ."],
    "Lexin019155": ["Köpa en obebyggd tomt.", "شراء أرض فضاء (غير مبنية)."],
    "Lexin019318": ["Göra en offertvärdering.", "إجراء تقييم للعروض."],
    "Lexin019465": ["Måla snickerier med oljefärg.", "طلاء النجارة بطلاء زيتي."],
    "Lexin019466": ["Använda oljehärdad board som underlagsteckning.", "استخدام لوح مقوى بالزيت كغطاء تحت السقف."],
    "Lexin019498": ["Förhindra olyckor på arbetsplatsen.", "منع الحوادث في مكان العمل."],
    "Lexin019620": ["Kolla områdesbestämmelserna innan du bygger.", "تحقق من لوائح المنطقة قبل البناء."],
    "Lexin019621": ["Se områdesplanen för detaljer.", "انظر مخطط المنطقة للتفاصيل."],
    "Lexin019728": ["Planera den operativa verksamheten.", "تخطيط الأنشطة التشغيلية."],
    "Lexin019751": ["Projektet drivs som OPS (Offentlig Privat Samverkan).", "يدار المشروع كشراكة بين القطاعين العام والخاص."],
    "Lexin019863": ["Rätta till oriktig information.", "تصحيح معلومات خاطئة."],
    "Lexin020078": ["Kolla efter P-märkning på produkten.", "ابحث عن علامة P (الجودة) على المنتج."],
    "Lexin020095": ["Byta packning i kranen.", "تغيير الحشية (الجلدة) في الصنبور."],
    "Lexin020139": ["Sätta upp liggande panel.", "تركيب ألواح (تكسية) أفقية."],
    "Lexin020152": ["Installera en ny panna i källaren.", "تركيب غلاية (مرجل) جديدة في القبو."],
    "Lexin020163": ["Ta ut nya pantbrev i huset.", "استخراج سندات رهن عقاري جديدة للمنزل."],
    "Lexin020189": ["Spika takpapp med pappspik.", "تسمير ورق السقف بمسامير ورق السقف."],
    "Lexin020208": ["Konstruera ett parallelltak med luftning.", "تصميم سقف موازٍ مع تهوية."]
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

const backupPath = DATA_FILE + '.backup_construction14_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Construction Batch 14 completed!`);
