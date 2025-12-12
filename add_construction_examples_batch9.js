/**
 * Add examples to CONSTRUCTION terms - Batch 9 (100 terms: Finansiering to Fritt utrymme)
 * Carefully matching IDs from construction_pending_batch.json
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin007633": ["Vi måste säkra finansiering för etapp 2.", "يجب أن نؤمن التمويل للمرحلة الثانية."],
    "Lexin007634": ["Presentera en hållbar finansieringsplan.", "تقديم خطة تمويل مستدامة."],
    "Lexin007654": ["Strö fingrus på gången.", "نثر حصى ناعم على الممشى."],
    "Lexin007655": ["Möbeln har en finhyvlad yta.", "قطعة الأثاث لها سطح مسحوج (Hyvlad) ناعم."],
    "Lexin007659": ["Marken består av finjord.", "الأرض تتكون من تربة ناعمة."],
    "Lexin007669": ["Grunda med ett lager finmakadam.", "التأسيس بطبقة من المكدام الناعم."],
    "Lexin007681": ["Finputsa väggen innan målning.", "تنعيم الجدار (بالمعجون) قبل الطلاء."],
    "Lexin007686": ["Finslipa parketten.", "صقل (تنعيم) الباركيه."],
    "Lexin007687": ["En finslipad bänkskiva av sten.", "سطح عمل حجري مصقول."],
    "Lexin007689": ["Utföra finslipning av betonggolvet.", "إجراء صقل نهائي للأرضية الخرسانية."],
    "Lexin007691": ["Anlita en duktig finsnickare.", "توظيف نجار ديكور (أثاث) ماهر."],
    "Lexin007692": ["Finspackla skarvarna.", "تنعيم الوصلات بالمعجون."],
    "Lexin007708": ["Lägga fiskbensmönstrad stensättning på torget.", "رصف الساحة بالحجر بنمط عظم السمكة."],
    "Lexin007728": ["Fixering av rören med klammer.", "تثبيت الأنابيب بالمشابك."],
    "Lexin007729": ["Utgå från en känd fixpunkt.", "الانطلاق من نقطة مرجعية معلومة."],
    "Lexin007746": ["Stolens fjädring är trasig.", "نوابض الكرسي مكسورة."],
    "Lexin007762": ["Kranen har fjärrstyrning.", "الرافعة تعمل بالتحكم عن بعد."],
    "Lexin007765": ["Huset är anslutet till fjärrvärme.", "المنزل متصل بالتدفئة المركزية (عن بعد)."],
    "Lexin007791": ["En öppen flamma kan vara farlig.", "اللهب المكشوف قد يكون خطيراً."],
    "Lexin007794": ["Vätskan har låg flampunkt.", "السائل له نقطة وميض منخفضة."],
    "Lexin007796": ["Använda flamsäker textil.", "استخدام نسيج مقاوم للهب."],
    "Lexin007808": ["Montera flatkabel under mattan.", "تركيب كابل مسطح تحت السجادة."],
    "Lexin007815": ["Bygga ett nytt flerbostadshus.", "بناء مبنى سكني (شقق) جديد."],
    "Lexin007819": ["Bo i ett flerfamiljshus.", "العيش في مبنى متعدد العائلات."],
    "Lexin007829": ["Vi har flexibel arbetstid på bygget.", "لدينا أوقات عمل مرنة في الموقع."],
    "Lexin007850": ["Köra grenarna i en flisare.", "تشغيل الأغصان في آلة التقطيع (flisare)."],
    "Lexin007859": ["Förstärka flodbädden.", "تدعيم قاع النهر."],
    "Lexin007892": ["Ta en flygbild över området.", "التقاط صورة جوية للمنطقة."],
    "Lexin007898": ["Arbeta på ett militärt flygfält.", "العمل في مطار عسكري."],
    "Lexin007899": ["Landningsbanan på flygfältet.", "مدرج الهبوط في المطار."],
    "Lexin007905": ["Utbygnad av flygplatsen.", "توسيع المطار."],
    "Lexin007930": ["Hantera flytande avfall.", "التعامل مع النفايات السائلة."],
    "Lexin007931": ["Stryka på flytande bitumen.", "دهن بيتومين سائل."],
    "Lexin007932": ["Bygga en flytande bro.", "بناء جسر عائم."],
    "Lexin007933": ["Lägga in ett flytande golv.", "tarkib أرضية عائمة."],
    "Lexin007937": ["Reparera fartyget i en flytdocka.", "إصلاح السفينة في حوض عائم."],
    "Lexin007943": ["Jämna av med flytspackel.", "التسوية بمعجون سائل (flytspackel)."],
    "Lexin007944": ["Flytta väggen en halvmeter.", "نقل الجدار نصف متر."],
    "Lexin007963": ["Ta bort en fläck från tapeten.", "إزالة بقعة من ورق الجدران."],
    "Lexin007970": ["Installera en kraftig fläkt.", "تركيب مروحة قوية."],
    "Lexin007971": ["Serva husets fläktcentral.", "صيانة وحدة التهوية المركزية للمنزل."],
    "Lexin007972": ["Rengöra spisens fläktkåpa.", "تنظيف غطاء مروحة الموقد."],
    "Lexin007974": ["Det bullrar från fläktrummet.", "يوجد ضجيج من غرفة المراوح."],
    "Lexin007977": ["Svetsa fast en fläns på röret.", "لحام شفة (فلنجة) على الأنبوب."],
    "Lexin007985": ["Mäta vattnets flöde i röret.", "قياس تدفق المياه في الأنبوب."],
    "Lexin007987": ["Analysera butikens flödesplan.", "تحليل مخطط التدفق (الحركة) للمتجر."],
    "Lexin007988": ["Rita ett flödesschema för processen.", "رسم مخطط انسيابي للعملية."],
    "Lexin008010": ["Montera foder runt dörren.", "تركيب إطار (برواز) حول الباب."],
    "Lexin008014": ["Rengöra fogarna i badrummet.", "تنظيف الفواصل (الروبات) في الحمام."],
    "Lexin008015": ["Foga kaklet med vit fogmassa.", "تكحيل البلاط بروبة بيضاء."],
    "Lexin008021": ["Blanda till fogbruk.", "خلط مونة التكحيل."],
    "Lexin008023": ["Sätta en foglist över skarven.", "وضع شريط تغطية فوق الفاصل."],
    "Lexin008026": ["Täta fönstret med fogmassa.", "سد النافذة بمعجون سيليكون (fogmassa)."],
    "Lexin008027": ["Kontrollera fogmåttet.", "التحقق من عرض الفاصل."],
    "Lexin008028": ["Påbörja fogning av teglet.", "البدء بتكحيل الطوب."],
    "Lexin008029": ["Använda en elektrisk fogningsmaskin.", "استخدام آلة تكحيل كهربائية."],
    "Lexin008030": ["Såga regeln med en fogsvans.", "نشر العارضة بمنشار يدوي."],
    "Lexin008072": ["Tapetsera en fondtapet i rummet.", "لصق ورق جدران مميز (fondtapet) في الغرفة."],
    "Lexin008076": ["System med forcerad ventilation.", "نظام بتهوية قسرية (ميكانيكية)."],
    "Lexin008079": ["Parkera fordonet utanför.", "ركن المركبة في الخارج."],
    "Lexin008081": ["Kontrollera max fordonsbredd.", "التحقق من أقصى عرض للمركبة."],
    "Lexin008082": ["Installera en fordonsdetektor i gatan.", "تركيب كاشف مركبات في الشارع."],
    "Lexin008085": ["Stanna vid röd fordonssignal.", "التوقف عند إشارة المرور الحمراء."],
    "Lexin008100": ["Forma betongen medan den är våt.", "تشكيل الخرسانة وهي رطبة."],
    "Lexin008110": ["Plåten har bra formbarhet.", "الصفيحة لديها قابلية تشكيل جيدة."],
    "Lexin008119": ["Ansvara för husets formgivning.", "مسؤول عن تصميم شكل المنزل."],
    "Lexin008120": ["Använda formgjutning för detaljerna.", "استخدام الصب في القوالب للتفاصيل."],
    "Lexin008124": ["Spika formen med formplywood.", "تسمير القالب بخشب البليود."],
    "Lexin008126": ["Beställa ett formstycke till röret.", "طلب قطعة تشكيل للأنبوب."],
    "Lexin008127": ["Mura valvet med formtegel.", "بناء القبو بطوب مُشَكَّل."],
    "Lexin008131": ["Riva formverket efter gjutning.", "هدم القوالب (الشدة) بعد الصب."],
    "Lexin008141": ["Satsa på forskning och utveckling (FoU).", "الاستثمار في البحث والتطوير."],
    "Lexin008157": ["Utföra fortlöpande kontroll av bygget.", "إجراء فحص مستمر للبناء."],
    "Lexin008182": ["Fasa ut fossila bränslen.", "التخلص التدريجي من الوقود الأحفوري."],
    "Lexin008183": ["Målet är fossilfri produktion.", "الهدف هو إنتاج خالي من الوقود الأحفوري."],
    "Lexin008218": ["Varna fotgängare för arbetet.", "تحذير المشاة من العمل."],
    "Lexin008233": ["Måla fotpanelen vit.", "طلاء إزار الحائط (الوزرة) بالأبيض."],
    "Lexin008234": ["Montera fotplåt under takpannorna.", "تركيب صفيحة الحافة تحت القرميد."],
    "Lexin008237": ["Rensa löv ur fotrännan.", "تنظيف الأوراق من المزراب."],
    "Lexin008253": ["Välja rätt fraktion på gruset.", "اختيار حجم الحبيبات (fraktion) المناسب للحصى."],
    "Lexin008255": ["Skriva under fraktsedeln.", "التوقيع على بوليصة الشحن."],
    "Lexin008290": ["Begränsad framkomlighet på vägen.", "إمكانية مرور محدودة على الطريق."],
    "Lexin008364": ["Mäta vibrationernas frekvens.", "قياس تردد الاهتزازات."],
    "Lexin008372": ["Dörren måste ha 90 cm fri bredd.", "الباب يجب أن يكون له عرض صافي 90 سم."],
    "Lexin008376": ["Se till att det är fri sikt i korsningen.", "تأكد من وجود رؤية واضحة في التقاطع."],
    "Lexin008377": ["Balken har 5 meters fri spännvidd.", "العارضة لها مسافة حرة (بين الركائز) 5 أمتار."],
    "Lexin008388": ["En fribärande trappa.", "درج قائم بذاته (بدون دعامات وسطية)."],
    "Lexin008389": ["Konstruera en fribärande balk (konsol).", "تصميم عارضة كابولية (fribärande)."],
    "Lexin008400": ["Bygga en friggebod på tomten.", "بناء كوخ حديقة (friggebod) في الأرض."],
    "Lexin008426": ["Minska friktionen i lagret.", "تقليل الاحتكاك في المحمل."],
    "Lexin008427": ["Friktion mellan däck och väg.", "الاحتكاك بين الإطار والطريق."],
    "Lexin008435": ["Trottoar med frilagd ballast.", "رصيف بخرسانة مغسولة (حصى ظاهر)."],
    "Lexin008436": ["Ytan ska vara frilagd yta.", "السطح يجب أن يكون مكشوفاً."],
    "Lexin008438": ["Köpa ett friliggande hus.", "شراء منزل مستقل."],
    "Lexin008442": ["Promenera i ett friluftsområde.", "المشي في منطقة استجمام."],
    "Lexin008447": ["Utföra frischakt för ledningen.", "إجراء حفر مفتوح (bezun stötter) لخط الأنابيب."],
    "Lexin008457": ["Avtalet har en klausul om friskrivning.", "العقد يحتوي على شرط إخلاء مسؤولية."],
    "Lexin008470": ["Gjuta pelaren i en fristående form.", "صب العمود في قالب مستقل."],
    "Lexin008489": ["Lämna 20 mm fritt avstånd.", "اترك مسافة حرة 20 مم."],
    "Lexin008490": ["Det finns inget fritt utrymme kvar.", "لم يتبق أي مساحة خالية."]
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

const backupPath = DATA_FILE + '.backup_construction9_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Construction Batch 9 completed!`);
