/**
 * Add examples to CONSTRUCTION terms - Batch 11 (100 terms: Generalentreprenad to Härdat glas)
 * Carefully matching IDs from construction_pending_batch.json
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin010128": ["Upphandla projektet som generalentreprenad.", "طرح المشروع كمقاولة عامة."],
    "Lexin010146": ["Starta reservkraften med en generator.", "تشغيل الطاقة الاحتياطية بمولد كهربائي."],
    "Lexin010177": ["Ansvara för projektets genomförande.", "مسؤول عن تنفيذ المشروع."],
    "Lexin010178": ["Kort genomförandetid för bygget.", "وقت تنفيذ قصير للبناء."],
    "Lexin010216": ["Följa en strikt geometrisk ordning.", "اتباع نظام هندسي صارم."],
    "Lexin010217": ["Beställa en geoteknisk undersökning.", "طلب دراسة جيوتقنية (للتربة)."],
    "Lexin010218": ["Lägga geotextil under vägbanken.", "وضع جيوتكستايل تحت جسر الطريق."],
    "Lexin010233": ["Använda en geringslåda för listerna.", "استخدام صندوق التلسين (صندوق قطع الزوايا) للقوائم."],
    "Lexin010234": ["Kapa fodret med en geringssåg.", "قص الإطار بمنشار تلسين (منشار زوايا)."],
    "Lexin010254": ["Se upp för gift i gamla färger.", "احترس من السموم في الدهانات القديمة."],
    "Lexin010261": ["Materialet klassas som giftigt.", "المادة مصنفة على أنها سامة."],
    "Lexin010282": ["Bygglovets giltighetstid går ut snart.", "فترة صلاحية رخصة البناء ستنتهي قريباً."],
    "Lexin010292": ["Skruva upp en gipsskiva.", "تثبيت لوح جيبس (جبس بورد) بالبراغي."],
    "Lexin010293": ["Fästa gipset med gipsskruv.", "تثبيت الجبس ببراغي الجبس."],
    "Lexin010301": ["Använda GIS för att planera ledningarna.", "استخدام نظم المعلومات الجغرافية (GIS) لتخطيط الخطوط."],
    "Lexin010322": ["Gjuta plattan idag.", "صب البلاطة اليوم."],
    "Lexin010323": ["Lägga ut gjutasfalt på bron.", "فرش الأسفلت المصبوب على الجسر."],
    "Lexin010326": ["Täta vid gjutfogen.", "العزل عند فاصل الصب."],
    "Lexin010328": ["Planera för gjutning imorgon.", "التخطيط للصب غداً."],
    "Lexin010329": ["Sätta ner gjutrör för plintarna.", "وضع أنابيب الصب للأعمدة (القواعد)."],
    "Lexin010330": ["Slipa bort gjutskägg från betongen.", "جلخ (إزالة) زوائد الصب من الخرسانة."],
    "Lexin010341": ["Måla med hög glans i köket.", "الطلاء بلمعان عالي في المطبخ."],
    "Lexin010347": ["Sätta in nytt glas i fönstret.", "تركيب زجاج جديد في النافذة."],
    "Lexin010349": ["Spackla in glasfiberremsa i skarven.", "معجون شريط الألياف الزجاجية في الفاصل."],
    "Lexin010350": ["Sätta upp glasfiberväv på väggen.", "لصق نسيج الألياف الزجاجية على الحائط."],
    "Lexin010355": ["Isolera vinden med glasull.", "عزل العلية بالصوف الزجاجي."],
    "Lexin010415": ["Påbörja glättning av golvet.", "البدء بتمليس (تنعم) الأرضية."],
    "Lexin010476": ["Besiktningen blev godkänd.", "الفحص كان مقبولاً (تمت الموافقة عليه)."],
    "Lexin010497": ["Slipa om golvet.", "إعادة صقل الأرضية."],
    "Lexin010499": ["Beställa flytspackel för golvavjämning.", "طلب معجون سائل لتسوية الأرضية."],
    "Lexin010500": ["Markera var golvlinjen ska vara.", "تحديد أين يجب أن يكون خط (منسوب) الأرضية."],
    "Lexin010501": ["Spika fast golvlisten.", "تسمير إزار الأرضية (النعلة)."],
    "Lexin010502": ["Lägga nya golvplattor i hallen.", "وضع بلاط أرضيات جديد في المدخل."],
    "Lexin010503": ["Installera vattenburen golvvärme.", "تركيب تدفئة أرضية مائية."],
    "Lexin010504": ["Beräkna total golvyta.", "حساب مساحة الأرضية الإجمالية."],
    "Lexin010540": ["Bygga en gradäng i aulan.", "بناء مدرج في القاعة."],
    "Lexin010555": ["Trappsteg av granit.", "درجات سلم من الجرانيت."],
    "Lexin010556": ["Lägga golv av granitkeramik.", "تركيب أرضية من سيراميك الجرانيت."],
    "Lexin010562": ["Invänta grannyttrande.", "انتظار رأي الجيران."],
    "Lexin010674": ["Bestämma ytans grovhet.", "تحديد خشونة السطح."],
    "Lexin010677": ["Svetsa i 10 mm grovplåt.", "اللحام في صفيحة سميكة 10 مم."],
    "Lexin010699": ["Lägga en grundbeläggning av asfalt.", "وضع طبقة أساس من الأسفلت."],
    "Lexin010713": ["Göra en stabil grundläggning.", "عمل تأسيس (قواعد) ثابت."],
    "Lexin010716": ["Utföra grundning av väggen.", "تنفيذ دهان الأساس للجدار."],
    "Lexin010717": ["Stryka på grundolja först.", "دهن زيت الأساس أولاً."],
    "Lexin010728": ["Grundvattnet ligger högt här.", "المياه الجوفية مرتفعة هنا."],
    "Lexin010739": ["Prata med din gruppchef.", "تحدث مع رئيس مجموعتك."],
    "Lexin010748": ["Beställa ett lass grus.", "طلب حمولة حصى."],
    "Lexin010790": ["Hitta tomtens gränsmärke.", "العثور على علامة حدود الأرض."],
    "Lexin010791": ["Mäta in varje gränspunkt.", "قياس كل نقطة حدودية."],
    "Lexin010807": ["Påbörja grävarbetet på måndag.", "البدء بأعمال الحفر يوم الاثنين."],
    "Lexin010810": ["Köra en stor grävmaskin.", "قيادة حفارة كبيرة."],
    "Lexin010854": ["Tätningslist av gummi.", "شريط عزل من المطاط."],
    "Lexin010911": ["Asfaltera en gångväg.", "سفلتة ممر مشاة."],
    "Lexin010936": ["Leka på gården.", "اللعب في الفناء."],
    "Lexin011064": ["Varna för halka på ställningen.", "التحذير من الانزلاق على السقالة."],
    "Lexin011123": ["Bygga väggarna som halvsandwichvägg.", "بناء الجدران كجدران نصف ساندويش (معزولة من جهة)."],
    "Lexin011139": ["Spika fast hammarbandet.", "تسمير العارضة العلوية (hammarband)."],
    "Lexin011141": ["Slå i spiken med en hammare.", "طرق المسمار بالمطرقة."],
    "Lexin011144": ["Bygga en ny kaj i hamnen.", "بناء رصيف جديد في الميناء."],
    "Lexin011151": ["Kapa hanbjälken.", "قص العارضة الرابطة (hanbjälke)."],
    "Lexin011162": ["Montera en handdukstork i badrummet.", "تركيب مجفف مناشف في الحمام."],
    "Lexin011540": ["Ta hissen upp till taket.", "ركوب المصعد إلى السطح."],
    "Lexin011658": ["Väggen är en bärande hjärtvägg.", "الجدار هو جدار وسطي حامل."],
    "Lexin011665": ["Gå en HLR-utbildning.", "حضور دورة إنعاش قلبي رئوي."],
    "Lexin011769": ["Sätta upp panel med huggen spik för utseendet.", "تركيب ألواح بمسامير مطروقة (قديمة الطراز) للمظهر."],
    "Lexin011772": ["Använda huggmejsel för att ta bort kakel.", "استخدام إزميل لإزالة البلاط."],
    "Lexin011818": ["Köpa ett eget hus.", "شراء منزل خاص."],
    "Lexin011832": ["Mäta hushålls/verksamhetsenergi separat.", "قياس طاقة الأسرة/النشاط بشكل منفصل."],
    "Lexin011834": ["Förbrukning av hushållsel.", "استهلاك كهرباء المنزل."],
    "Lexin011848": ["Sanera huset från hussvamp.", "tathir المنزل من فطر العفن."],
    "Lexin011865": ["Renovera gårdens huvudbyggnad.", "تجديد المبنى الرئيسي للمزرعة."],
    "Lexin011887": ["Byta huvudsäkring i skåpet.", "تغيير المصهر الرئيسي في الخزانة."],
    "Lexin011902": ["Använda hydrauliska verktyg vid rivningen.", "استخدام أدوات هيدروليكية عند الهدم."],
    "Lexin011963": ["Informera alla hyresgäster.", "إبلاغ جميع المستأجرين."],
    "Lexin012010": ["Välja en hållbar energilösning.", "اختيار حل طاقة مستدام."],
    "Lexin012011": ["Krav på hållbar leverantörskedja.", "متطلبات لسلسلة توريد مستدامة."],
    "Lexin012012": ["Arbeta för hållbar utveckling.", "العمل من أجل التنمية المستدامة."],
    "Lexin012013": ["Skapa en hållbar värdekedja.", "خلق سلسلة قيمة مستدامة."],
    "Lexin012014": ["Tänka på materialets hållbarhet.", "التفكير في استدامة (متانة) المادة."],
    "Lexin012015": ["Kontakta företagets hållbarhetsavdelning.", "الاتصال بقسم الاستدامة في الشركة."],
    "Lexin012016": ["Uppfylla alla hållbarhetskriterier.", "تلبية جميع معايير الاستدامة."],
    "Lexin012017": ["Göra en årlig hållbarhetsrapportering.", "إعداد تقرير استدامة سنوي."],
    "Lexin012018": ["Analysera projektets hållbarhetsrisker.", "تحليل مخاطر الاستدامة للمشروع."],
    "Lexin012019": ["Ta fram en ny hållbarhetsstrategi.", "وضع استراتيجية استدامة جديدة."],
    "Lexin012020": ["Följa de senaste hållbarhetstrenderna.", "متابعة أحدث اتجاهات الاستدامة."],
    "Lexin012021": ["Bygga för ett hållbart samhälle.", "البناء لمجتمع مستدام."],
    "Lexin012022": ["Bygga på ett hållbart sätt.", "البناء بطريقة مستدامة."],
    "Lexin012050": ["Ta upp hål med en hålsåg.", "عمل فتحة (ثقب) بمنشار ثقوب."],
    "Lexin012051": ["Utföra håltagning i betongväggen.", "إجراء ثقب في الجدار الخرساني."],
    "Lexin012068": ["Gjuta golvet med hårdbetong.", "صب الأرضية بخرسانة صلبة."],
    "Lexin012069": ["Slipa ett hårdbetonggolv.", "صقل أرضية خرسانية صلبة."],
    "Lexin012070": ["Sätta upp hårdboard på väggen.", "تثبيت لوح خشب مضغوط صلب على الحائط."],
    "Lexin012081": ["Golv av exotiskt hårdträ.", "أرضية من خشب صلب استوائي."],
    "Lexin012153": ["Prioritera din hälsa.", "إعطاء الأولوية لصحتك."],
    "Lexin012154": ["Läs igenom vår hälsa- och säkerhetspolicy.", "اقرأ سياسة الصحة والسلامة الخاصة بنا."],
    "Lexin012155": ["Ansvarig för hälsa och säkerhet.", "مسؤول عن الصحة والسلامة."],
    "Lexin012164": ["Dammet är hälsofarligt.", "الغبار مضر بالصحة."],
    "Lexin012212": ["Rensa hängrännan från löv.", "تنظيف المزراب من الأوراق."],
    "Lexin012235": ["Glaset i dörren är härdat glas.", "الزجاج في الباب هو زجاج مقسى."]
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

const backupPath = DATA_FILE + '.backup_construction11_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Construction Batch 11 completed!`);
