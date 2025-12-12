/**
 * Add examples to CONSTRUCTION terms - Batch 17 (100 terms: Spontning to Trallolja)
 * Carefully matching IDs from construction_pending_batch.json
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin025901": ["Vi behöver utföra spontning för att stötta schaktet.", "نحتاج لإجراء تدعيم جوانب الحفر (spontning) لدعم الحفر."],
    "Lexin025934": ["Det finns en stor spricka i muren.", "يوجد صدع كبير في الجدار."],
    "Lexin025968": ["Måla fasaden med en sprutpistol.", "طلاء الواجهة بمسدس رش."],
    "Lexin025983": ["Utföra sprängning av berget.", "تنفيذ تفجير للصخر."],
    "Lexin025991": ["Fönster med spröjs.", "نوافذ ذات قضبان تقسيم (spröjs)."],
    "Lexin026003": ["Använda en spånhyvel.", "استخدام مسحاج (Spånhyvel) لتسوية السطح."],
    "Lexin026005": ["Bygga hyllor av spånskiva.", "بناء رفوف من ألواح حبيبية (Spånskiva)."],
    "Lexin026006": ["Skruva golvet med spånskiveskruv.", "تثبيت الأرضية ببراغي الألواح الحبيبية."],
    "Lexin026037": ["Beräkna spänningskraften i vajern.", "حساب قوة الشد في السلك."],
    "Lexin026070": ["Marken kräver stabilisering med kalkcement.", "التربة تتطلب تثبيت (stabilisering) بأسمنت الجير."],
    "Lexin026116": ["Bygga ett staket runt trädgården.", "بناء سياج حول الحديقة."],
    "Lexin026133": ["Huset håller hög standard.", "المنزل يتمتع بمستوى عالٍ."],
    "Lexin026158": ["Vi har fått startbesked från kommunen.", "تلقينا إشعار البدء من البلدية."],
    "Lexin026230": ["Lägga stegdämpningsfolie under parketten.", "وضع رقائق عازلة للصوت تحت الباركيه."],
    "Lexin026233": ["Krav på bra stegljudsdämpning i lägenheter.", "متطلب عزل جيد لضجيج الخطوات في الشقق."],
    "Lexin026251": ["Väggen är byggd av sten.", "الجدار مبني من الحجر."],
    "Lexin026256": ["Jobba som stenhuggare.", "العمل كنحات حجارة (أو قاطع حجارة)."],
    "Lexin026260": ["Elda med stenkol.", "الحرق بالفحم الحجري."],
    "Lexin026261": ["Arbeta med stenkonservering på kyrkan.", "العمل في ترميم الحجر في الكنيسة."],
    "Lexin026265": ["En stensättare lägger torget.", "مبلط (حجارة) يرصف الساحة."],
    "Lexin026267": ["Isolera vinden med stenull.", "عزل العلية بالصوف الصخري."],
    "Lexin026301": ["Såga ut hålet med en sticksåg.", "قص الثقب بمنشار منحنيات (Arcot)."],
    "Lexin026390": ["Huset har en stomme av trä.", "المنزل له هيكل من الخشب."],
    "Lexin026391": ["Välja stomsystem för hallen.", "اختيار نظام الهيكل للقاعة."],
    "Lexin026488": ["Tomten ligger inom strandskyddsområde.", "الأرض تقع ضمن منطقة حماية الشواطئ."],
    "Lexin026491": ["Ha en strategi för tillväxt.", "امتلاك استراتيجية للنمو."],
    "Lexin026493": ["Arbeta med strategisk verksamhetsutveckling.", "العمل على التطوير الاستراتيجي للأعمال."],
    "Lexin026494": ["Vårda strategiskt viktiga kunder.", "الاهتمام بالعملاء المهمين استراتيجياً."],
    "Lexin026558": ["Jobba på ett strukturerat sätt.", "العمل بطريقة منظمة (مهيكلة)."],
    "Lexin026626": ["Spika ströläkt på takpappen.", "تسمير دعامات التهوية (ströläkt) على ورق السقف."],
    "Lexin026629": ["Stäng av strömmen innan du borrar.", "اقطع التيار الكهربائي قبل الحفر."],
    "Lexin026712": ["Rensa löv ur stupröret.", "تنظيف أوراق الشجر من أنبوب التصريف (المزراب)."],
    "Lexin026737": ["Följa alla styrande dokument.", "اتباع جميع الوثائق التوجيهية."],
    "Lexin026743": ["Sitta i företagets styrelse.", "الجلوس في مجلس إدارة الشركة."],
    "Lexin026744": ["Ha styrelsemöte en gång i månaden.", "عقد اجتماع مجلس إدارة مرة في الشهر."],
    "Lexin026778": ["Balkar av rostfritt stål.", "عوارض من الفولاذ المقاوم للصدأ."],
    "Lexin026780": ["Jobba som stålarbetare.", "العمل كعامل حديد (فولاذ)."],
    "Lexin026781": ["Bygga en ny stålbro.", "بناء جسر فولاذي جديد."],
    "Lexin026782": ["Montera tunga stålkonstruktioner.", "تركيب هياكل فولاذية ثقيلة."],
    "Lexin026794": ["Vad är din ståndpunkt i frågan?", "ما هو موقفك من القضية؟"],
    "Lexin026868": ["Hugga ut gångjärnet med stämjärn.", "حفر مكان المفصلة بالإزميل."],
    "Lexin026889": ["Sätta upp stämp under valvet.", "وضع دعامات (Stämp) تحت القبو."],
    "Lexin026930": ["Bygga stödmurar mot slänten.", "بناء جدران استنادية ضد المنحدر."],
    "Lexin027048": ["Vad blir den totala summan?", "ما هو المجموع الكلي؟"],
    "Lexin027107": ["Vi bor i ett suterränghus.", "نسكن في منزل طابق تسوية (Suterräng)."],
    "Lexin027219": ["Vi söker en licensierad svetsare.", "نحن نبحث عن لحام مرخص."],
    "Lexin027220": ["Koppla in svetsmaskinen.", "توصيل آلة اللحام."],
    "Lexin027221": ["Använda svetsskärm för ögonen.", "استخدام قناع اللحام للعيون."],
    "Lexin027442": ["Skapa ökad sysselsättning.", "خلق فرص عمل متزايدة."], // Corrected definition manually based on context
    "Lexin027448": ["Välja rätt system för ventilation.", "اختيار النظام المناسب للتهوية."], // Corrected definition manually
    "Lexin027452": ["Mäta systemeffektivitet.", "قياس كفاءة النظام."], // Corrected definition manually
    "Lexin027455": ["Ta fram en systemhandling.", "إعداد وثيقة النظام (Systemhandling)."], // Corrected definition manually
    "Lexin027577": ["Tillämpa säkra arbetssätt på bygget.", "تطبيق طرق عمل آمنة في البناء."],
    "Lexin027582": ["Utbildning i säljarbete.", "تدريب في المبيعات."],
    "Lexin027814": ["Laga läckan i taket.", "إصلاح التسريب في السقف."],
    "Lexin027817": ["Byta ut en ruttet takbjälke.", "استبدال عارضة سقف متعفنة."],
    "Lexin027818": ["Taket har ett brant takfall.", "السقف له انحدار حاد."],
    "Lexin027819": ["Måla under takfoten.", "الطلاء تحت حافة السقف (Eaves)."],
    "Lexin027820": ["Sätta in ett takfönster för ljus.", "تركيب نافذة سقف للإضاءة."],
    "Lexin027821": ["Det är högt i takhöjd i vardagsrummet.", "السقف مرتفع في غرفة المعيشة."],
    "Lexin027822": ["Hålla taklag (taklagsfest) för gubbarna.", "إقامة حفل السقف للعمال."],
    "Lexin027823": ["Släppa in ljus genom takljus.", "إدخال الضوء عبر كوات السقف."],
    "Lexin027824": ["Påbörja takläggning nästa vecka.", "البدء بتركيب السقف الأسبوع القادم."],
    "Lexin027825": ["Mäta taknockhöjden.", "قياس ارتفاع قمة السقف."],
    "Lexin027826": ["Byta trasiga takpannor.", "تغيير بلاط السقف المكسور."],
    "Lexin027828": ["Rensa takrännan från löv.", "تنظيف مزاريب السقف من الأوراق."],
    "Lexin027829": ["Taksparrarna bär upp taket.", "العوارض الخشبية (Rafters) تحمل السقف."],
    "Lexin027830": ["Klättra upp på takstegen.", "التسلق على سلم السقف."],
    "Lexin027831": ["Resa takstolar med kran.", "رفع الجمالونات بالرافعة."],
    "Lexin027838": ["Välja papp som taktäckning.", "اختيار الورق المقوى كغطاء للسقف."],
    "Lexin027883": ["Packa asfalten med en tandemvält.", "دك الأسفلت بمدحلة ترادفية."],
    "Lexin027941": ["Sätta upp ny tapet i hallen.", "وضع ورق حائط جديد في المدخل."],
    "Lexin027942": ["Skära med tapetlinjal.", "القص بمسطرة ورق الحائط."],
    "Lexin027959": ["Ställa in temperaturen på tappvarmvatten.", "ضبط درجة حرارة الماء الساخن للصنبور."],
    "Lexin028046": ["Fasad av rött tegel.", "واجهة من الطوب الأحمر."],
    "Lexin028047": ["Riv en gammal tegelmur.", "هدم جدار طوب قديم."],
    "Lexin028049": ["En tegelsten väger mycket.", "طوبة واحدة تزن الكثير."],
    "Lexin028060": ["Kalla till tekniskt samråd.", "دعوة لاجتماع تشاوري تقني."],
    "Lexin028105": ["Bygga temporära konstruktioner för eventet.", "بناء منشآت مؤقتة للحدث."],
    "Lexin028118": ["Mäta vinklar med teodolit.", "قياس الزوايا بجهاز التيودوليت."],
    "Lexin028145": ["Sitta på terrassen och fika.", "الجلوس على الشرفة وتناول القهوة."],
    "Lexin028175": ["Utföra testning av materialet.", "إجراء اختبار للمادة."],
    "Lexin028177": ["Läsa rapporten från testutvärdering.", "قراءة التقرير من تقييم الاختبار."],
    "Lexin028237": ["Såga röret med en tigersåg.", "قص الأنبوب بمنشار ترددي (نمر)."],
    "Lexin028272": ["Rapportera ett tillbud.", "الإبلاغ عن حادث وشيك."],
    "Lexin028273": ["Göra en tillbyggnad på huset.", "عمل توسعة (إضافة) للمنزل."],
    "Lexin028308": ["Tillföra mer resurser till projektet.", "إضافة المزيد من الموارد للمشروع."],
    "Lexin028391": ["Du måste ha tillstånd för byggnaden.", "يجب أن يكون لديك تصريح للمبنى."],
    "Lexin028436": ["Starta tillverkning av fönster.", "بدء تصنيع النوافذ."],
    "Lexin028495": ["Köra bort jord med tippvagn.", "نقل التربة بعربة قلابة."],
    "Lexin028596": ["Installera en ny toalett.", "تركيب مرحاض جديد."],
    "Lexin028637": ["Köpa en tomt vid sjön.", "شراء قطعة أرض عند البحيرة."],
    "Lexin028667": ["Beställa en topografisk kartläggning.", "طلب مسح طبوغرافى."],
    "Lexin028693": ["Huset står på torpargrund.", "المنزل قائم على أساس قبو زحف (Torpargrund)."],
    "Lexin028716": ["Husets totalhöjd är 8 meter.", "الارتفاع الكلي للمنزل 8 أمتار."],
    "Lexin028739": ["Hindra trafikflödet vid vägarbetet.", "إعاقة تدفق حركة المرور عند أعمال الطريق."],
    "Lexin028745": ["Stanna vid rött trafikljus.", "التوقف عند الإشارة الحمراء."],
    "Lexin028749": ["Sätta upp en ny trafikskylt.", "تركيب لافتة مرور جديدة."],
    "Lexin028773": ["Bygga trall på baksidan.", "بناء سطح خشبي (Trall) في الخلف."],
    "Lexin028775": ["Olja in altanen med trallolja.", "دهن الشرفة بزيت الخشب."]
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

const backupPath = DATA_FILE + '.backup_construction17_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Construction Batch 17 completed!`);
