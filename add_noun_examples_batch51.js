/**
 * Add examples to nouns - Batch 51 (100 nouns: Perfektion to Platå)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin020448": ["Perfektion uppnåddes.", "بُلغ الكمال."],
    "Lexin020458": ["Periodiskt understöd gavs.", "أُعطي الدعم الدوري."],
    "Lexin020464": ["Permanent gjordes.", "عُمل تثبيت الشعر."],
    "Lexin020473": ["Permittering skedde.", "حدث التسريح المؤقت."],
    "Lexin020480": ["Perrongen var full.", "كان رصيف المحطة ممتلئاً."],
    "Lexin020482": ["Persedeln bars.", "ارتُدي التجهيز."],
    "Lexin020483": ["Persian är dyrbart.", "جلد خروف القركول ثمين."],
    "Lexin020484": ["Persiennen drogs.", "سُحبت الستارة الفينيسية."],
    "Lexin020485": ["Persikan åts.", "أُكل الخوخ."],
    "Lexin020486": ["Persiljan hackades.", "فُرم البقدونس."],
    "Lexin020488": ["Persiska talades.", "نُطقت الفارسية."],
    "Lexin020490": ["Personakten lästes.", "قُرئ الملف الشخصي."],
    "Lexin020497": ["Personalkategorin bestämdes.", "حُددت فئة الموظفين."],
    "Lexin020498": ["Personalomsättningen var hög.", "كانت حركة التوظيف عالية."],
    "Lexin020501": ["Personbeviset skrevs.", "كُتبت شهادة قيد النفوس."],
    "Lexin020502": ["Personbilen kördes.", "قيدت السيارة الخاصة."],
    "Lexin020504": ["Persondatorn användes.", "استُخدم الكمبيوتر الشخصي."],
    "Lexin020510": ["Persongalleriet var brett.", "كان أبطال الحكاية كثر."],
    "Lexin020511": ["Personkemin stämde.", "توافق التآلف الشخصي."],
    "Lexin020525": ["Personsökaren pep.", "صفر جهاز المناداة الشخصية."],
    "Lexin020526": ["Personundersökningen gjordes.", "أُجريت دراسة الوضع الشخصي."],
    "Lexin020535": ["Peruken sattes på.", "وُضعت الباروكة."],
    "Lexin020537": ["Pessaret användes.", "استُخدمت الفرزجة."],
    "Lexin020538": ["Pessimism rådde.", "ساد التشاؤم."],
    "Lexin020539": ["Pessimisten klagade.", "اشتكى المتشائم."],
    "Lexin020541": ["Pest drabbade.", "أصاب الطاعون."],
    "Lexin020547": ["Petita lämnades.", "قُدم طلب المخصصات."],
    "Lexin020548": ["Det var en petitess.", "كان شيئاً تافهاً."],
    "Lexin020552": ["Pianisten spelade.", "عزف عازف البيانو."],
    "Lexin020555": ["Med pick och pack.", "بالحوائج."],
    "Lexin020557": ["Picknick hölls.", "أُقيمت النزهة."],
    "Lexin020558": ["Pickupen spelade.", "شغل البيك أب."],
    "Lexin020560": ["På piedestal ställdes.", "وُضع على القاعدة."],
    "Lexin020561": ["Pietet visades.", "أُظهرت التقوى."],
    "Lexin020562": ["Det gav piff.", "أعطى نكهة."],
    "Lexin020563": ["Pigan arbetade.", "عملت الخادمة."],
    "Lexin020566": ["Piggen stack.", "وخزت الشوكة."],
    "Lexin020569": ["Piggvaren fångades.", "صيد سمك الترس."],
    "Lexin020570": ["Pigment fanns.", "وُجد الخضاب."],
    "Lexin020576": ["Piketen kom.", "جاء باص البوليس."],
    "Lexin020578": ["Pilen växte.", "نما الصفصاف."],
    "Lexin020579": ["Pilgrimen reste.", "سافر الحاج."],
    "Lexin020585": ["Pilsnern dracks.", "شُربت البيرة."],
    "Lexin020589": ["Pina kändes.", "شُعر بالعذاب."],
    "Lexin020592": ["Pincetten användes.", "استُخدم الملقط."],
    "Lexin020593": ["Pingis spelades.", "لُعب تنس الطاولة."],
    "Lexin020594": ["Pinglan ringde.", "رن الجرس الصغير."],
    "Lexin020595": ["Pinglan log.", "ابتسمت الفتاة المغرية."],
    "Lexin020597": ["Pingpong spelades.", "لُعب تنس الطاولة."],
    "Lexin020598": ["Pingst firades.", "احتُفل بعيد العنصرة."],
    "Lexin020599": ["Pingstkyrkan samlades.", "تجمعت كنيسة العنصرة."],
    "Lexin020600": ["Pingstliljan blommade.", "أزهر النرجس."],
    "Lexin020602": ["Pingstvännen bad.", "صلى الخمسيني."],
    "Lexin020604": ["Pinnen kastades.", "رُميت العصا."],
    "Lexin020607": ["Pionen blommade.", "أزهرت الفوانيا."],
    "Lexin020608": ["Pionjären ledde.", "قاد الرائد."],
    "Lexin020609": ["Pipet användes.", "استُخدم البزباز."],
    "Lexin020611": ["Pipan röktes.", "دُخن الغليون."],
    "Lexin020612": ["Pipan blåstes.", "نُفخت الصفارة."],
    "Lexin020615": ["Pipelinen byggdes.", "بُني خط الأنابيب."],
    "Lexin020619": ["Pippi flög.", "طار الطير."],
    "Lexin020620": ["Piren stod.", "وقف مصد الأمواج."],
    "Lexin020621": ["Piraten attackerade.", "هاجم القرصان."],
    "Lexin020623": ["Pirogen bakades.", "خُبز البيروغ."],
    "Lexin020627": ["Piskan smällde.", "فرقعت السوط."],
    "Lexin020630": ["Piss behövdes.", "احتُيج إلى البول."],
    "Lexin020632": ["Pissoaren användes.", "استُخدمت المبولة."],
    "Lexin020633": ["Pisten preparerades.", "حُضرت هضبة التزلج."],
    "Lexin020634": ["Pistasch smakade gott.", "طعم الفستق الحلبي جيداً."],
    "Lexin020636": ["Pitten syntes.", "ظهر القضيب."],
    "Lexin020640": ["Pizzerian besöktes.", "زُيرت البيتزريا."],
    "Lexin020644": ["Pjäsen framfördes.", "قُدمت المسرحية."],
    "Lexin020645": ["Pjäsen flyttades.", "نُقل الحجر."],
    "Lexin020646": ["Pjäsen avfyrades.", "أُطلقت القطعة الثقيلة."],
    "Lexin020647": ["Pjäxan bars.", "ارتُديت الجزمة."],
    "Lexin020649": ["Placeringen noterades.", "لوحظ المقام."],
    "Lexin020656": ["Plagget tvättades.", "غُسلت القطعة."],
    "Lexin020657": ["Plagiatet avslöjades.", "اكتُشف الانتحال."],
    "Lexin020661": ["Planen ritades.", "رُسم المخطط."],
    "Lexin020662": ["Planen användes.", "استُخدم الملعب."],
    "Lexin020664": ["Planet landade.", "هبطت الطائرة."],
    "Lexin020669": ["Planekonomi diskuterades.", "نوقش الاقتصاد المركزي."],
    "Lexin020677": ["Planket byggdes.", "بُني السياج الخشبي."],
    "Lexin020679": ["Plankan lades.", "وُضع اللوح الخشبي."],
    "Lexin020680": ["Plankton flyter.", "تطفو العوالق."],
    "Lexin020684": ["Planlösningen studerades.", "دُرس مخطط التصميم."],
    "Lexin020687": ["Planschen hängdes.", "عُلق الملصق."],
    "Lexin020689": ["Plantagen skördades.", "حُصدت المزرعة."],
    "Lexin020691": ["Planteringen gjordes.", "أُجريت المزرعة."],
    "Lexin020692": ["Plantskolan besöktes.", "زُير المشتل."],
    "Lexin020698": ["Plastfolien användes.", "استُخدمت الرقيقة البلاستيكية."],
    "Lexin020699": ["Plastik visades.", "أُظهرت الوقفة الرشيقة."],
    "Lexin020700": ["Plastikkirurgi gjordes.", "أُجريت الجراحة التجميلية."],
    "Lexin020707": ["Platsansökan skickades.", "أُرسل طلب الوظيفة."],
    "Lexin020710": ["Platsbiljetten bokades.", "حُجزت تذكرة حجز المكان."],
    "Lexin020712": ["Platsjournalen lästes.", "قُرئت لائحة الوظائف الشاغرة."],
    "Lexin020717": ["Plattan spelades.", "شُغلت الاسطوانة."],
    "Lexin020720": ["Plattformen stod.", "وقفت المنصة."],
    "Lexin020722": ["Plattityden sades.", "قيلت التفاهة."],
    "Lexin020726": ["Platån nåddes.", "بُلغ النجد."]
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

const backupPath = DATA_FILE + '.backup_nouns51_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Done! Added examples to ${updated} nouns. Total: 5100 nouns!`);
