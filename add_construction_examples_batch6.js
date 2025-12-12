/**
 * Add examples to CONSTRUCTION terms - Batch 6 (100 terms: Byggfelsförsäkring to Detaljtidplan)
 * Carefully matching IDs from construction_pending_batch.json
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin004586": ["Teckna en byggfelsförsäkring för huset.", "التوقيع على تأمين عيوب البناء للمنزل."],
    "Lexin004587": ["Mäta mängden byggfukt i väggen.", "قياس كمية رطوبة البناء في الجدار."],
    "Lexin004588": ["Granska alla bygghandlingar.", "مراجعة جميع وثائق البناء."],
    "Lexin004589": ["Effektivisera bygghandlingsprocessen.", "تبسيط عملية إعداد وثائق البناء."],
    "Lexin004591": ["Åka upp med bygghissen.", "الصعود بمصعد البناء."],
    "Lexin004592": ["Han utbildar sig till byggingenjör.", "هو يدرس ليصبح مهندس مدني (بناء)."],
    "Lexin004593": ["Kommunen gör en byggkontroll.", "البلدية تجري فحص بناء."],
    "Lexin004594": ["Beräkna total byggkostnad.", "حساب إجمالي تكلفة البناء."],
    "Lexin004595": ["Resa en hög byggkran.", "نصب رافع بناء عالية."],
    "Lexin004597": ["Vi har fått bygglov.", "لقد حصلنا على رخصة بناء."],
    "Lexin004598": ["Lämna in en bygglovsansökan.", "تقديم طلب رخصة بناء."],
    "Lexin004599": ["Köpa dyrt byggmaterial.", "شراء مواد بناء باهظة."],
    "Lexin004600": ["Välja en säker byggmetod.", "اختيار طريقة بناء آمنة."],
    "Lexin004602": ["Anlita en erfaren byggmästare.", "تعيين مقاول بناء (معلم بناء) خبير."],
    "Lexin004604": ["Analysera byggnadens fastighetsenergi.", "تحليل طاقة تشغيل المبنى."],
    "Lexin004606": ["Spara alla byggnadsdokument.", "حفظ جميع وثائق المبنى."],
    "Lexin004609": ["Mäta byggnadshöjden.", "قياس ارتفاع المبنى."],
    "Lexin004610": ["Byggnadsinspektören underkände jobbet.", "مفتش المباني رفض العمل."],
    "Lexin004611": ["Anlita en byggnadskonstruktör.", "توظيف مصمم إنشائي."],
    "Lexin004612": ["Följa äldre byggnadsnorm.", "اتباع معايير البناء القديمة."],
    "Lexin004614": ["Beslut i byggnadsnämnden.", "قرار في لجنة البناء."],
    "Lexin004615": ["Klättra på byggnadsställningen.", "تسلق سقالة البناء."],
    "Lexin004616": ["Vilken byggnadstyp är det?", "ما هو نوع المبنى؟"],
    "Lexin004617": ["Ett imponerande byggnadsverk.", "منشأة بناء مثيرة للإعجاب."],
    "Lexin004621": ["Hela byggprocessen tog ett år.", "عملية البناء بأكملها استغرقت عاماً."],
    "Lexin004622": ["Följa gällande byggregler.", "اتباع لوائح البناء السارية."],
    "Lexin004623": ["Kolla om det finns byggrätt på tomten.", "التحقق مما إذا كان هناك حق بناء في الأرض."],
    "Lexin004624": ["Kalla till tekniskt byggsamråd.", "الدعوة لاجتماع تشاوري فني للبناء."],
    "Lexin004625": ["Byggstart är planerad till våren.", "بدء البناء مخطط له في الربيع."],
    "Lexin004626": ["Beställa en byggteknisk undersökning.", "طلب فحص تقني للمبنى."],
    "Lexin004627": ["Korta ner byggtiden.", "تقليص وقت البناء."],
    "Lexin004628": ["Ställa in en byggtork i rummet.", "وضع مجفف بناء في الغرفة."],
    "Lexin004660": ["Valvet har en fin båge.", "القبو له قوس جميل."],
    "Lexin004662": ["Såga röret med en bågfil.", "قص الأنبوب بمنشار حديد (bågfil)."],
    "Lexin004702": ["Bryt upp lådan med ett bändningsverktyg.", "اكسر الصندوق بأداة عتلة."],
    "Lexin004705": ["Montera en ny bänkskiva i köket.", "تركيب سطح عمل (bänkskiva) جديد في المطبخ."],
    "Lexin004711": ["Pelaren är ett bärande element.", "العمود هو عنصر حامل."],
    "Lexin004712": ["Kontrollera den bärande konstruktionen.", "فحص الهيكل الحامل."],
    "Lexin004722": ["Marken har dålig bärighet.", "الأرض ذات قدرة تحمل سيئة."],
    "Lexin004723": ["Bestämma vägens bärighetsklass.", "تحديد فئة تحمل الطريق."],
    "Lexin004727": ["Lägga ut bärlaget på vägen.", "فرش طبقة الأساس (bärlag) على الطريق."],
    "Lexin004728": ["Beställa ett lass bärlagergrus.", "طلب حمولة من حصى طبقة الأساس."],
    "Lexin004729": ["Montera bärlagselement.", "تركيب عناصر طبقة الأساس."],
    "Lexin004730": ["Bygga bärlagsform.", "بناء قالب طبقة الأساس."],
    "Lexin004731": ["Mäta bärlagshöjden.", "قياس ارتفاع (سمك) طبقة الأساس."],
    "Lexin004732": ["Bärlinan håller upp takstolarna.", "العارضة الرئيسية (bärlina) تحمل جمالونات السقف."],
    "Lexin004733": ["Spiaka fast bärläkten.", "تسمير عوارض التثبيت (bärläkt)."],
    "Lexin004739": ["Hela bärverket måste förstärkas.", "الهيكل الحامل بأكمله يحتاج تقوية."],
    "Lexin004757": ["Använd en böjfjäder till VP-röret.", "استخدام نابض ثني لأنبوب VP."],
    "Lexin004805": ["Rita huset i CAD.", "رسم المنزل باستخدام الـ CAD."],
    "Lexin004806": ["Skicka mig CAD-filen.", "أرسل لي ملف الـ CAD."],
    "Lexin004807": ["Titta på 3D CAD-modellen.", "انظر إلى نموذج CAD ثلاثي الأبعاد."],
    "Lexin004808": ["Installera ett nytt CAD-program.", "تثبيت برنامج CAD جديد."],
    "Lexin004809": ["Skriva ut en CAD-ritning i A1-format.", "طباعة رسم CAD بحجم A1."],
    "Lexin004834": ["Parkera bilen i carporten.", "ركن السيارة في مظلة السيارات (carport)."],
    "Lexin004850": ["Bygga väggar av cellbetong.", "بناء جدران من الخرسانة الخلوية."],
    "Lexin004866": ["Isolera grunden med cellplast.", "عزل الأساس بالبلاستيك الرغوي (الفلين)."],
    "Lexin004871": ["Spruta in cellulosafiber på vinden.", "رش ألياف السليلوز في العلية (للعزل)."],
    "Lexin004876": ["Mura med cementbruk.", "البناء بمونة الأسمنت."],
    "Lexin004877": ["Blanda cementpasta.", "خلط عجينة الأسمنت."],
    "Lexin004878": ["Tvätta bort cementslam från verktygen.", "غسل رواسب الأسمنت عن الأدوات."],
    "Lexin004879": ["Prima golvet med cementslamma.", "طلاء الأرضية بروبة الأسمنت (أساس)."],
    "Lexin004880": ["Sätta upp en cementspånskiva.", "تركيب لوح خشب أسمنتي."],
    "Lexin004881": ["Göra en cementstabilisering av jorden.", "إجراء تثبيت للتربة بالأسمنت."],
    "Lexin004882": ["Miljöpåverkan från cementtillverkning.", "الأثر البيئي لإنتاج الأسمنت."],
    "Lexin004883": ["Följa standarder från CEN.", "اتباع معايير اللجنة الأوروبية للتوحيد القياسي (CEN)."],
    "Lexin004893": ["Flytta väggen en centimeter.", "تحريك الجدار سنتيمتراً واحداً."],
    "Lexin004909": ["Reglarna sitter på centrumavstånd (CC) 600 mm.", "العوارض مثبتة على مسافة مركزية 600 مم."],
    "Lexin004918": ["Företaget har miljö-certifiering.", "الشركة حاصلة على شهادة بيئية."],
    "Lexin004976": ["Såga virket med en cirkelsåg.", "نشر الخشب بمنشار دائري."],
    "Lexin004981": ["Öka andelen cirkulationsluft.", "زيادة نسبة الهواء المعاد تدويره."],
    "Lexin005022": ["Minska byggets Co2-utsläpp.", "تقليل انبعاثات ثاني أكسيد الكربون للبناء."],
    "Lexin005066": ["Asfaltera cykelbanan.", "سفلتة مسار الدراجات."],
    "Lexin005067": ["Bygga ett låst cykelgarage.", "بناء مرآب دراجات مقفل."],
    "Lexin005068": ["Måla markeringar vid cykelöverfarten.", "طلاء العلامات عند معبر الدراجات."],
    "Lexin005139": ["Leda bort dagvatten från tomten.", "تصريف مياه الأمطار عن الأرض."],
    "Lexin005140": ["Rensa dagvattenbrunnen.", "تنظيف بالوعة مياه الأمطار."],
    "Lexin005143": ["Täta i takets dal.", "إحكام العزل في وادي السقف."],
    "Lexin005161": ["Skydda dig mot damm.", "احم نفسك من الغبار."],
    "Lexin005162": ["Bygga en damm för att samla vatten.", "بناء سد لتجميع المياه."],
    "Lexin005165": ["Byta dammfilter i maskinen.", "تغيير فلتر الغبار في الآلة."],
    "Lexin005166": ["Installera dammfiltrering.", "تثبيت نظام تنقية الغبار."],
    "Lexin005167": ["Mäta dammhalt i luften.", "قياس نسبة الغبار في الهواء."],
    "Lexin005171": ["Ytan är nu dammtorr.", "السطح الآن جاف من الغبار (لا يلصق الغبار)."],
    "Lexin005209": ["Koppla in nätverk för datorer.", "توصيل شبكة لأجهزة الكمبيوتر."],
    "Lexin005248": ["Hitta en defekt i materialet.", "العثور على عيب في المادة."],
    "Lexin005257": ["Mäta balkens deformation.", "قياس تشوه العارضة."],
    "Lexin005360": ["Avgift för deponering av avfall.", "رسوم إيداع النفايات."],
    "Lexin005361": ["Följa deponeringsplanen.", "اتباع خطة الردم."],
    "Lexin005362": ["Köra massorna till en deponi.", "نقل الكتل إلى مكب النفايات."],
    "Lexin005391": ["Husets design är modern.", "تصميم المنزل حديث."],
    "Lexin005392": ["Presentera ett nytt designkoncept.", "تقديم مفهوم تصميم جديد."],
    "Lexin005409": ["Använda destillerad asfalt.", "استخدام أسفلت مقطر."],
    "Lexin005410": ["Stryka med destillerad tjära.", "الدهن بقطران مقطر."],
    "Lexin005431": ["Rita en detalj av infästningen.", "رسم تفصيل للتثبيت."],
    "Lexin005433": ["Öka ritningens detaljeringsnivå.", "زيادة مستوى التفصيل في الرسم."],
    "Lexin005435": ["Lokal för detaljhandel.", "محل لبيع التجزئة."],
    "Lexin005436": ["Kolla vad detaljplanen säger.", "تحقق مما تقوله الخطة التفصيلية."],
    "Lexin005437": ["Titta på detaljritningen.", "انظر إلى الرسم التفصيلي."],
    "Lexin005439": ["Göra en detaljtidplan för veckan.", "عمل جدول زمني تفصيلي للأسبوع."]
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

const backupPath = DATA_FILE + '.backup_construction6_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Construction Batch 6 completed!`);
