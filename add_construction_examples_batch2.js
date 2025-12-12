/**
 * Add examples to CONSTRUCTION terms - Batch 2 (100 terms: Angripen ved to Asfaltspridning)
 * Carefully matching IDs from construction_pending_batch.json
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin000891": ["Byta ut angripen ved i fasaden.", "استبدال الخشب المصاب (بالتلف) في الواجهة."],
    "Lexin000894": ["Röj undan angripet virke.", "إزالة الأخشاب المصابة (بالآفات)."],
    "Lexin000900": ["Bygga en ny angöringsgata till området.", "بناء شارع وصول جديد للمنطقة."],
    "Lexin000901": ["Parkera på angöringsplatsen nära entrén.", "الوقوف في مكان التحميل والتنزيل (angöringsplats) بالقرب من المدخل."],
    "Lexin000932": ["Balken fungerar som en ankarbjälke.", "العارضة تعمل كعارضة تثبيت (ankarbjälke)."],
    "Lexin000934": ["Fästa väggen med ankarjärn.", "تثبيت الجدار بقضبان التثبيت (ankarjärn)."],
    "Lexin000935": ["Skruva fast regeln med ankarskruv.", "ربط العارضة بمسامير التثبيت (ankarskruv)."],
    "Lexin000936": ["Kontrollera vajerns ankarslut.", "فحص نهاية التثبيت للكابل."],
    "Lexin000937": ["Använd ankarspik till balkskorna.", "استخدم مسامير التثبيت (المحززة) لأحذية العوارض."],
    "Lexin000938": ["Ladda ankarspikpistolen.", "تلقيم مسدس مسامير التثبيت."],
    "Lexin000954": ["Hissen gav en ankomstsignal.", "المصعد أعطى إشارة وصول."],
    "Lexin000965": ["En stor industriell anläggning.", "منشأة صناعية كبيرة."],
    "Lexin000966": ["Företaget utför anläggningsarbete.", "الشركة تقوم بأعمال الإنشاءات (البنية التحتية)."],
    "Lexin000967": ["Riskfyllt anläggningsarbete under jord.", "أعمال إنشاءات محفوفة بالمخاطر تحت الأرض."],
    "Lexin000969": ["Betala anläggningsavgift för vatten och avlopp.", "دفع رسوم التوصيل (الإنشاء) للمياه والصرف الصحي."],
    "Lexin000970": ["Tomten är taxerad som anläggningsfastighet.", "الأرض مصنفة كعقار صناعي (anläggningsfastighet)."],
    "Lexin000971": ["Arbeta som anläggningskonstruktör.", "العمل كمصمم إنشاءات (مدني)."],
    "Lexin000972": ["Ansöka om anläggningstillstånd.", "التقدم بطلب للحصول على تصريح إنشاء."],
    "Lexin000973": ["Köra grus på en tillfällig anläggningsväg.", "نقل الحصى على طريق إنشاء مؤقت."],
    "Lexin000974": ["Beräkna total anläggningsyta.", "حساب مساحة المنشأة الإجمالية."],
    "Lexin000980": ["Få en anmodan att åtgärda felet.", "تلقي طلب (أمر) لإصلاح الخل."],
    "Lexin000992": ["Anmälningstiden går ut på fredag.", "فترة التسجيل تنتهي يوم الجمعة."],
    "Lexin000997": ["Få en anmärkning vid slutbesiktningen.", "الحصول على ملاحظة (تسجيل عيب) في الفحص النهائي."],
    "Lexin001007": ["Bygga ett annex till huvudbyggnaden.", "بناء ملحق للمبنى الرئيسي."],
    "Lexin001009": ["Svara på en annons om markarbete.", "الرد على إعلان حول أعمال الأرض."],
    "Lexin001010": ["Annonsera ut uppdraget.", "الإعلان عن المهمة (المشروع)."],
    "Lexin001015": ["Banken föreslog ett annuitetslån.", "اقترح البنك قرض سنر (أقساط ثابتة)."],
    "Lexin001017": ["Koppla kabeln till anod.", "توصيل الكابل بالمصعد (القطب الموجب)."],
    "Lexin001038": ["Utföra anrikning av malmen.", "إجراء تخصيب (إثراء) الخام."],
    "Lexin001039": ["Tryck på knappen för anrop för nedfärd.", "اضغط على زر طلب النزول."],
    "Lexin001041": ["Rengör hissens anropsknapp.", "تنظيف زر طلب المصعد."],
    "Lexin001049": ["Ta sats från vägens ansats.", "الانطلاق من بداية (مدخل) الطريق."],
    "Lexin001050": ["Jämna till kanten med en ansatsfil.", "تسوية الحافة بمبرد."],
    "Lexin001060": ["Krav på ansiktsskärm vid slipning.", "شرط استخدام واقي الوجه عند الصنفرة (Jalx)."],
    "Lexin001063": ["Ansvara för anskaffning av material.", "التكفل بشراء (تادبير) المواد."],
    "Lexin001064": ["Kommunens anskaffning av ersättningsmark drog ut på tiden.", "شراء البلدية للأرض البديلة استغرق وقتاً طويلاً."],
    "Lexin001070": ["Ansluta röret till avloppsnätet.", "توصيل الأنبوب بشبكة الصرف الصحي."],
    "Lexin001073": ["Täta vid fönstrets anslutning mot väggen.", "إحكام الغلق عند اتصال النافذة بالجدار."],
    "Lexin001074": ["Montera ett nytt anslutningsdon.", "تركيب وحدة اتصال (فيش) جديدة."],
    "Lexin001075": ["Byta ut en trasig anslutningskabel.", "استبدال كابل توصيل تالف."],
    "Lexin001076": ["Dra trådarna i en anslutningskanal.", "سحب الأسلاك في قناة توصيل."],
    "Lexin001077": ["Skruva fast tåten i anslutningsklämman.", "تثبيت السلك في مشبك التوصيل."],
    "Lexin001078": ["Gräva ner anslutningsledningar till huvudledning.", "dfn خطوط التوصيل إلى الخط الرئيسي."],
    "Lexin001079": ["Kontrollera fläktens anslutningsmått.", "فحص مقاسات توصيل المروحة."],
    "Lexin001080": ["Koppla in elen på plinten (anslutningsplint).", "توصيل الكهرباء في لوحة التوصيل."],
    "Lexin001081": ["Rörets anslutningsriktning kan ändras.", "اتجاه توصيل الأنبوب يمكن تغييره."],
    "Lexin001082": ["Följa anslutningsschemat noga.", "اتباع مخطط التوصيل بدقة."],
    "Lexin001083": ["Utrustningen kräver rätt anslutningsspänning.", "المعدة تتطلب جهد التوصيل الصحيح."],
    "Lexin001084": ["Läs anslutningstabellen för rätt koppling.", "اقرأ جدول التوصيلات للربط الصحيح."],
    "Lexin001126": ["Tala med ansvarig arbetsledare.", "تحدث مع مشرف العمل المسؤول."],
    "Lexin001127": ["Göra en ansvarsbesiktning efter skadan.", "إجراء فحص مسؤولية بعد الضرر."],
    "Lexin001132": ["Tydlig ansvarsfördelning i kontraktet.", "توزيع واضح للمسؤوليات في العقد."],
    "Lexin001133": ["Entreprenören måste ha ansvarsförsäkring.", "المقاول يجب أن يكون لديه تأمين مسؤولية."],
    "Lexin001135": ["Detta ligger utanför mitt ansvarsområde.", "هذا يقع خارج نطاق مسؤوليتي."],
    "Lexin001138": ["Använda en ansättare för att nå spiken.", "استخدام أداة تثبيت (ansättare) للوصول إلى المسمار."],
    "Lexin001140": ["Korrekt ansättning av muttern.", "الشد (الإحكام) الصحيح للصامولة."],
    "Lexin001141": ["Läckaget berodde på ett ansättningsfel.", "التسرب كان بسبب خطأ i التركيب (الإحكام)."],
    "Lexin001158": ["Skicka ett antagningsbrev till firman.", "إرسال خطاب قبول للشركة."],
    "Lexin001171": ["Policy för anti-korruption.", "سياسة مكافحة الفساد."],
    "Lexin001202": ["Elda med antracit.", "التدفئة باستخدام الأنثراسيت (فحم حجري صلب)."],
    "Lexin001209": ["Förvara inte antändbart material här.", "لا تخزن مواد قابلة للاشتعال هنا."],
    "Lexin001211": ["Risk för självantändning (antändning).", "خطر الاشتعال الذاتي."],
    "Lexin001213": ["Kommunen ska anvisa mark för bygget.", "البلدية ستخصص (تعين) أرضاً للبناء."],
    "Lexin001214": ["Budgeten har inga anvisade medel för detta.", "الميزانية ليس بها أموال مخصصة لهذا."],
    "Lexin001220": ["Området är ett anvisningsområde för industri.", "المنطقة هي منطقة مخصصة للصناعة."],
    "Lexin001221": ["Ta hänsyn till slutanvändaren (användare).", "مراعاة المستخدم النهائي."],
    "Lexin001227": ["Huset fick användningsförbud pga rasrisk.", "المنزل حصل على منع استخدام بسبب خطر الانهيار."],
    "Lexin001228": ["Byggnadens användningsområde ändrades.", "مجال استخدام المبنى تغير."],
    "Lexin001261": ["Applicera limmet jämnt.", "ضع الغراء بالتساوي."],
    "Lexin001305": ["Göra en arbetsanalys för att öka effektiviteten.", "إجراء تحليل عمل لزيادة الكفاءة."],
    "Lexin001306": ["Han har en bra arbetsattityd.", "لديه موقف (attityd) جيد تجاه العمل."],
    "Lexin001315": ["Snickra vid en arbetsbänk.", "النجارة عند طاولة العمل."],
    "Lexin001430": ["Tomtens areal är 1000 kvm.", "مساحة الأرض هي 1000 متر مربع."],
    "Lexin001453": ["Mäta ritningen med en arkitektsskala.", "قياس الرسم بمقياس معماري."],
    "Lexin001461": ["Byta ut trasig armatur i taket.", "استبدال وحدة إنارة (armatur) مكسورة في السقف."],
    "Lexin001476": ["Bygga grunden i armerad betong.", "بناء الأساس من الخرسانة المسلحة."],
    "Lexin001479": ["Lägga in armering i formen.", "وضع التسليح في القالب."],
    "Lexin001480": ["Följa armeringsförteckningen.", "اتباع قائمة التسليح."],
    "Lexin001481": ["Binda ihop armeringsjärn.", "ربط قضبان التسليح."],
    "Lexin001482": ["Kapa järnet med ett armeringsklipp.", "قطع الحديد بمقص تسليح."],
    "Lexin001483": ["Lyfta ner en färdig armeringskorg.", "إنزال سلة تسليح جاهزة."],
    "Lexin001484": ["Lägga ut en armeringsmatta på golvet.", "فرش شبكة تسليح (matta) على الأرضية."],
    "Lexin001485": ["Förstärka putsen med armeringsnät.", "تقوية اللياسة بشبكة تسليح."],
    "Lexin001486": ["Läsa armeringsritningen.", "قراءة مخطط التسليح."],
    "Lexin001487": ["Kolla dimensionen i armeringsspecifikationen.", "التحقق من الأبعاد في مواصفات التسليح."],
    "Lexin001488": ["Beställa nytt armeringsstål.", "طلب فولاذ تسليح جديد."],
    "Lexin001489": ["En 12 mm armeringsstång.", "قضيب تسليح 12 مم."],
    "Lexin001493": ["Lyfta teglet med en armkran.", "رفع الطوب برافعة ذراعية."],
    "Lexin001495": ["Använd armskydd vid svetsning.", "استخدم واقي الذراع عند اللحام."],
    "Lexin001508": ["Vi arrenderar marken av kommunen.", "نحن نستأجر الأرض من البلدية."],
    "Lexin001579": ["Parkering på asfalterad yta.", "موقف سيارات على سطح مسفلت."],
    "Lexin001581": ["Förekomst av asfaltit i berget.", "وجود الأسفلتيت في الصخر."],
    "Lexin001582": ["Klistra pappen med asfaltklister.", "لصق الورق المقوى بغراء الأسفلت."],
    "Lexin001583": ["Stryka på asfaltlösning (primer).", "دهن محلول الأسفلت (برايمر)."],
    "Lexin001584": ["Fylla hålet med asfaltmassa.", "ملء الحفرة بكتلة الأسفلت."],
    "Lexin001585": ["Lägga ny asfaltpapp på taket.", "وضع ورق أسفلت (تول) جديد على السقف."],
    "Lexin001586": ["Dra ut massan med en asfaltraka.", "سحب الكتلة (الأسفلت) بمكشطة أسفلت."],
    "Lexin001587": ["Jobba som asfaltsarbetare.", "العمل كعامل أسفلت."],
    "Lexin001588": ["Asfaltsläggning pågår.", "رصف الأسفلت جارٍ."],
    "Lexin001589": ["Maskin för asfaltspridning.", "آلة لتوزيع الأسفلت."]
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

const backupPath = DATA_FILE + '.backup_construction2_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Construction Batch 2 completed!`);
