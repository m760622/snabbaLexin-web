/**
 * Add examples to CONSTRUCTION terms - Batch 16 (100 terms: Resekostnader to Spjälor)
 * Carefully matching IDs from construction_pending_batch.json
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin022250": ["Traktamente täcker rese- kostnader.", "البدلات اليومية تغطي نفقات السفر."],
    "Lexin022267": ["Avsätta pengar i en reservfond.", "تخصيص أموال في صندوق احتياطي."],
    "Lexin022280": ["Elementet är en resistiv belastning.", "العنصر (المشعاع) هو حمل مقاوم."],
    "Lexin022281": ["Byta resistor i kretskortet.", "تغيير المقاوم في لوحة الدائرة."],
    "Lexin022305": ["Visa respekt för grannarna.", "إظهار الاحترام للجيران."],
    "Lexin022331": ["Vi jobbar med resurshushållning.", "نحن نعمل على ترشيد استهلاك الموارد."],
    "Lexin022470": ["Rikta väggen så den blir lodrät.", "تعديل استقامة الجدار ليصبح عمودياً."],
    "Lexin022479": ["Använda brunnen som riktmärke för höjden.", "استخدام البئر كنقطة مرجعية للارتفاع."],
    "Lexin022556": ["Läsa en ritning.", "قراءة رسم هندسي."],
    "Lexin022572": ["Påbörja rivning av skjulet.", "البدء بهدم السقيفة."],
    "Lexin022573": ["Få ett rivningsföreläggande från kommunen.", "تلقي أمر هدم من البلدية."],
    "Lexin022574": ["Söka rivningslov för garaget.", "طلب تصريح هدم للمرآب."],
    "Lexin022575": ["Ta fram en rivningsplan.", "إعداد خطة هدم."],
    "Lexin022601": ["Måla taket med en roller.", "طلاء السقف بأسطوانة (رول)."],
    "Lexin022621": ["Plantera blommor i en rondell.", "زراعة الزهور في دوار مروري."],
    "Lexin022717": ["Måla ett rum.", "طلاء غرفة."],
    "Lexin022735": ["Gjuta en rund pelare.", "صب عمود دائري."],
    "Lexin022750": ["Använda rundvirke till staketet.", "استخدام خشب مستدير (غير منشور) للسياج."],
    "Lexin022751": ["Hyvla med en rundvirkeshyvel.", "السحج بمسحاج للخشب المستدير."],
    "Lexin022865": ["Köpa rå tomtmark för exploatering.", "شراء أرض خام للتطوير."],
    "Lexin022918": ["Importera råolja.", "استيراد النفط الخام."],
    "Lexin022926": ["Spika råspont på taket.", "تسمير ألواح خشنة (Råspont) على السقف."],
    "Lexin022947": ["Fästa plankan med räfflad trådspik.", "تثبيت اللوح بمسمار سلكي محزز."],
    "Lexin022976": ["Betala ränta på lånet.", "دفع فائدة على القرض."],
    "Lexin023157": ["Rökning av ekparkett ger mörkare färg.", "تدخين باركيه البلوط يعطي لوناً أغمق."],
    "Lexin023176": ["Dra nya rör i badrummet.", "تمديد أنابيب جديدة في الحمام."],
    "Lexin023182": ["Köpa rörartiklar hos grossisten.", "شراء مواد السباكة (أنابيب ووصلات) من تاجر الجملة."],
    "Lexin023184": ["Mäta rördiametern.", "قياس قطر الأنبوب."],
    "Lexin023190": ["Det är rörelse i fogen.", "هناك حركة في الفاصل."],
    "Lexin023191": ["Lämna en rörelsefog i tegelfasaden.", "ترك فاصل تمدد (حركة) في واجهة الطوب."],
    "Lexin023196": ["Välja rörlig ränta på byggkreditivet.", "اختيار فائدة متغيرة لقرض البناء."],
    "Lexin023199": ["Detta är en rörlig kostnad.", "هذه تكلفة متغيرة."],
    "Lexin023201": ["Ringa en rörmokare för läckan.", "الاتصال بسباك للتسريب."],
    "Lexin023218": ["Laga röta i fönsterkarmen.", "إصلاح العفن في إطار النافذة."],
    "Lexin023247": ["Huset har ett sadeltak.", "المنزل له سقف جملوني (سقف مائل من جانبين)."],
    "Lexin023293": ["Informera berörda sakägare.", "إبلاغ أصحاب الحقوق المعنيين."],
    "Lexin023473": ["Rena vattnet i ett sandfilter.", "تنقية المياه في مرشح رملي."],
    "Lexin023479": ["Montera en sandwichvägg.", "تركيب جدار ساندويش (مركب)."],
    "Lexin023481": ["Göra en sanering av asbest.", "إجراء تطهير (إزالة) للأسبيستوس."],
    "Lexin023559": ["Påbörja schaktning för grunden.", "البدء بالحفر للأساس."],
    "Lexin023567": ["Stryka kvistarna med schellackering.", "دهن العقد (في الخشب) بالشيلاك."],
    "Lexin023663": ["Titta på sektionsritningen för höjder.", "انظر إلى رسم المقطع العرضي للارتفاعات."],
    "Lexin023681": ["Ta semester i juli.", "أخذ إجازة في يوليو."],
    "Lexin023710": ["Vår seniora projektledare har lång erfarenhet.", "مدير مشروعنا الأول لديه خبرة طويلة."],
    "Lexin023779": ["Gräva ner en servisledning för vatten.", "دفن خط خدمة (توصيلة) للمياه."],
    "Lexin023907": ["Kratta gången med singel.", "تمشيط الممشى المotg بالحصى (Singel)."],
    "Lexin023917": ["Känna sinnesfrid med bra larm.", "الشعور براحة البال مع إنذار جيد."],
    "Lexin023968": ["Rita in huset på situationsplanen.", "رسم المنزل على مخطط الموقع العام."],
    "Lexin024075": ["Ventilationen bygger på självdrag.", "التهوية تعتمد على السحب الطبيعي."],
    "Lexin024145": ["Målet är skadefria arbetsplatser.", "الهدف هو أماكن عمل خالية من الإصابات."],
    "Lexin024162": ["Ämnet är skadligt att andas in.", "المادة ضارة عند استنشاقها."],
    "Lexin024186": ["Ritningen är i skala 1:50.", "الرسم بمقياس 1:50."],
    "Lexin024344": ["Dra åt muttern med en skiftnyckel.", "شد الصامولة بمفتاح إنجليزي (متحرك)."],
    "Lexin024347": ["Lägga på ett tunt skikt spackel.", "وضع طبقة رقيقة من المعجون."],
    "Lexin024349": ["Mäta färgens skikttjocklek.", "قياس سماكة طبقة الطلاء."],
    "Lexin024372": ["Sätta upp en skiljevägg i rummet.", "إقامة جدار فاصل في الغرفة."],
    "Lexin024497": ["Mura en skorsten.", "بناء مدخنة."],
    "Lexin024499": ["Täta runt skorstenskragen.", "العزل حول طوق المدخنة."],
    "Lexin024513": ["Köra betong i en skottkärra.", "نقل الخرسانة في عربة يد."],
    "Lexin024606": ["Skruva trallen med skruvdragare.", "تثبيت الأرضية الخشبية بمفك براغي كهربائي."],
    "Lexin024608": ["Använda en liten skruvmejsel.", "استخدام مفك براغي صغير."],
    "Lexin024712": ["Följ noga alla skyddsföreskrifter.", "اتبع بدقة جميع تعليمات السلامة."],
    "Lexin024714": ["Ha alltid skyddsglasögon när du borrar.", "ارتد دائماً نظارات واقية عند الحفر."],
    "Lexin024715": ["Ta på dig skyddshandskar.", "ارتد قفازات واقية."],
    "Lexin024717": ["Skyddshjälm är obligatorisk på bygget.", "خوذة السلامة إلزامية في الموقع."],
    "Lexin024727": ["Täcka golvet med skyddsmaterial.", "تغطية الأرضية بمواد واقية."],
    "Lexin024730": ["Tala med fackets skyddsombud.", "تحدث مع ممثل السلامة في النقابة."],
    "Lexin024732": ["Göra en skyddsrond varje vecka.", "القيام بجولة تفتيش سلامة كل أسبوع."],
    "Lexin024735": ["Kontrollera husets skyddsrum.", "فحص ملجأ المنزل."],
    "Lexin024736": ["Krav på skyddsskor med stålhätta.", "متطلب أحذية سلامة بمقدمة فولاذية."],
    "Lexin024743": ["Hämta din skyddsutrustning.", "أحضر معدات الوقاية الخاصة بك."],
    "Lexin024748": ["Skotta grus med en skyffel.", "غرف الحصى بمجرفة (رفش)."],
    "Lexin024795": ["Risk för skållningsskador från kranen.", "خطر الإصابة بحروق (سلق) من الصنبور."],
    "Lexin024895": ["Golvet har god sladdresistens (halkskydd).", "الأرضية تتمتع بمقاومة انزلاق جيدة."],
    "Lexin024918": ["Spika i betongen med slagspik.", "التسمير في الخرسانة بمسامير الطرق (الفولاذية)."],
    "Lexin024927": ["Måla ladugården med slamfärg (Falu röd).", "طلاء الحظيرة بطلاء الطين (أحمر فالو)."],
    "Lexin024992": ["Slipa golvet med en stor slipmaskin.", "صقل الأرضية بآلة صقل كبيرة."],
    "Lexin025009": ["Lägga nytt slitlager asfalt på vägen.", "وضع طبقة تآكل (سطحية) جديدة من الأسفلت على الطريق."],
    "Lexin025047": ["Boka tid för slutbesiktning.", "حجز موعد للفحص النهائي."],
    "Lexin025048": ["Vi har fått slutbesked från kommunen.", "تلقينا شهادة الإشغال (الإذن النهائي) من البلدية."],
    "Lexin025049": ["Vänta på slutbeviset.", "انتظار الشهادة النهائية (مصطلح قديم)."],
    "Lexin025050": ["Ansöka om slutbesked (tidigare slutbevis).", "التقدم بطلب للحصول على إذن نهائي."],
    "Lexin025053": ["Installera en sluten tank för avloppet.", "تركيب خزان مغلق للصرف الصحي."],
    "Lexin025080": ["Leverera en felfri slutprodukt.", "تسليم منتج نهائي خالٍ من العيوب."],
    "Lexin025090": ["Bygga hus i en brant sluttning.", "بناء منزل في منحدر حاد."],
    "Lexin025275": ["Sätta dit en smyglist runt dörren.", "تثبيت شريط (smyglist) حول الباب."],
    "Lexin025398": ["Jobba som snickare.", "العمل كنجار."],
    "Lexin025440": ["Snubbla på en sladd.", "التعثر بسلك."],
    "Lexin025502": ["Montera snörasskydd på taket.", "تركيب مانع انزلاق الثلج على السقف."],
    "Lexin025578": ["Sätta kakel ovanför sockeln.", "تركيب البلاط فوق النعلة (sockeln)."],
    "Lexin025642": ["Anställa sommarjobbare för måleri.", "توظيف عمال صيفيين للطلاء."],
    "Lexin025683": ["Köra avfallet till ett sorteringsverk.", "نقل النفايات إلى محطة فرز."],
    "Lexin025707": ["Spackla igen hålen i väggen.", "معجنة الثقوب في الجدار."],
    "Lexin025841": ["Slå in spiken helt med en spikdrivare.", "إدخال المسمار بالكامل باستخدام طارد مسامير."],
    "Lexin025842": ["Spika panel med spikmaskin.", "تسمير الألواح بمسدس مسامير."],
    "Lexin025843": ["Fästa listen med spikplugg.", "تثبيت القائمة بمسمار وتد (Spikplugg)."],
    "Lexin025844": ["Shorna måste ha spiktrampskydd.", "الأحذية يجب أن تحتوي على حماية من ثقب المسامير."],
    "Lexin025849": ["Leda bort spillvatten till avloppet.", "تصريف المياه العادمة إلى المجاري."],
    "Lexin025880": ["Stänga spjället i skorstenen.", "إغلاق المخمد (الرفش) في المدخنة."],
    "Lexin025881": ["Måla spjälorna i staketet.", "طلاء قضبان السياج."]
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

const backupPath = DATA_FILE + '.backup_construction16_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Construction Batch 16 completed!`);
