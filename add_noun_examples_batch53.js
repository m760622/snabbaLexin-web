/**
 * Add examples to nouns - Batch 53 (100 nouns: Predikan to Psykofarmaka)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin021020": ["Predikan hölls.", "أُلقي الوعظ."],
    "Lexin021021": ["Predikanten talade.", "تحدث الواعظ."],
    "Lexin021023": ["Predikatet analyserades.", "حُلل الخبر."],
    "Lexin021024": ["Predikstolen användes.", "استُخدم منبر الوعظ."],
    "Lexin021027": ["Prefekten ledde.", "قاد المدير."],
    "Lexin021028": ["Preferens visades.", "أُظهر التفضيل."],
    "Lexin021029": ["Prefix identifierades.", "حُددت البادئة."],
    "Lexin021033": ["Prejudikatet följdes.", "اتُبعت السابقة القضائية."],
    "Lexin021042": ["Preliminärskatt betalades.", "دُفعت الضريبة الأولية."],
    "Lexin021044": ["Premien betalades.", "دُفع قسط التأمين."],
    "Lexin021045": ["Premien delades ut.", "وُزعت المكافأة."],
    "Lexin021046": ["Premieobligationen köptes.", "اشتُريت السندات الحكومية."],
    "Lexin021049": ["Premissen gällde.", "سرى الشرط."],
    "Lexin021050": ["Premium tankades.", "عُبئ بنزين سوبر."],
    "Lexin021051": ["Premium gavs.", "أُعطيت المكافأة."],
    "Lexin021054": ["Premiärministern talade.", "تحدث رئيس الوزراء."],
    "Lexin021056": ["Prenumeranten läste.", "قرأ المشترك."],
    "Lexin021061": ["Prepositionen användes.", "استُخدم حرف الجر."],
    "Lexin021062": ["Presenningen lades.", "وُضع القماش المشمع."],
    "Lexin021063": ["Presens användes.", "استُخدم المضارع."],
    "Lexin021067": ["Presidenten talade.", "تحدث الرئيس."],
    "Lexin021071": ["Preskription skedde.", "حدث إسقاط العقوبة."],
    "Lexin021079": ["Pressen användes.", "استُخدمت ماكينة الطباعة."],
    "Lexin021087": ["Pressreleasen publicerades.", "نُشر التصريح الصحفي."],
    "Lexin021088": ["Presstöd gavs.", "أُعطي دعم وسائل الإعلام."],
    "Lexin021095": ["Pretendenten krävde.", "طالب المطالب."],
    "Lexin021098": ["Preteritum användes.", "استُخدم الماضي."],
    "Lexin021102": ["Preventivmedel användes.", "استُخدمت وسائل منع الحمل."],
    "Lexin021104": ["Preventivmedelsrådgivning gavs.", "أُعطيت استشارات منع الحمل."],
    "Lexin021110": ["In i minsta pricka.", "في أدق التفاصيل."],
    "Lexin021120": ["Prillan stoppades under läppen.", "وُضعت قبصة السعوط تحت الشفة."],
    "Lexin021134": ["Primören skördades.", "حُصدت باكورة القطاف."],
    "Lexin021140": ["Prinskorv serverades.", "قُدم البرنس كورف."],
    "Lexin021141": ["Printern skrevs ut.", "طبعت الطابعة."],
    "Lexin021156": ["Pristagaren gratulerades.", "هُنئ الفائز."],
    "Lexin021168": ["Privatlivet skyddades.", "حُميت الحياة الشخصية."],
    "Lexin021174": ["Det är en privatsak.", "إنه موضوع شخصي."],
    "Lexin021178": ["Privilegium gavs.", "أُعطي الامتياز."],
    "Lexin021184": ["Problemställningen beskrevs.", "وُصفت صيغة المشكلة."],
    "Lexin021197": ["Processionen gick.", "سار الموكب."],
    "Lexin021206": ["Producenten producerade.", "أنتج المخرج."],
    "Lexin021209": ["Produkten beräknades.", "حُسب حاصل الضرب."],
    "Lexin021227": ["Profeten predikade.", "بشّر النبي."],
    "Lexin021229": ["Profetian uppfylldes.", "تحققت النبوءة."],
    "Lexin021233": ["Profit gjordes.", "تحقق الربح."],
    "Lexin021237": ["Profylax användes.", "استُخدم الإجراء الوقائي."],
    "Lexin021247": ["Programförklaringen lästes.", "قُرئ شرح برنامج التصرف."],
    "Lexin021249": ["Programmeraren kodade.", "برمج المبرمج."],
    "Lexin021254": ["Progressiv beskattning tillämpades.", "طُبقت الضريبة التصاعدية."],
    "Lexin021267": ["Projektilen avfyrades.", "أُطلقت القذيفة."],
    "Lexin021269": ["Projektion gjordes.", "أُجري انعكاس الصور."],
    "Lexin021270": ["Projektion skedde.", "حدثت الانعكاسات."],
    "Lexin021272": ["Projektorn användes.", "استُخدم جهاز العرض."],
    "Lexin021282": ["Proletären arbetade.", "عمل البروليتاري."],
    "Lexin021283": ["Prologen lästes.", "قُرئت المقدمة."],
    "Lexin021284": ["PM skrevs.", "كُتبت المذكرة."],
    "Lexin021287": ["Promillen mättes.", "قيس الجزء من الألف."],
    "Lexin021289": ["Promotion hölls.", "أُقيمت مراسيم منح شهادة الدكتوراه."],
    "Lexin021290": ["Promotorn arrangerade.", "نظم متعهد المباراة."],
    "Lexin021296": ["Pronomen användes.", "استُخدم الضمير."],
    "Lexin021299": ["Propellern snurrade.", "دارت المروحة الدافعة."],
    "Lexin021303": ["Proportionell beskattning gällde.", "سرت الضريبة التناسبية."],
    "Lexin021316": ["Prosa skrevs.", "كُتب النثر."],
    "Lexin021319": ["Prospektet delades ut.", "وُزع المطبوع الإعلاني."],
    "Lexin021321": ["Prosten predikade.", "وعظ الكاهن."],
    "Lexin021322": ["Prostatan undersöktes.", "فُحصت البروستاتا."],
    "Lexin021329": ["Protégén hjälptes.", "ساعد المحمي."],
    "Lexin021330": ["Protein behövs.", "يُحتاج إلى البروتين."],
    "Lexin021331": ["Protektionism kritiserades.", "انتُقدت الحمائية."],
    "Lexin021332": ["Protesen sattes på.", "وُضع الطرف الاصطناعي."],
    "Lexin021336": ["Protestanten bad.", "صلى البروتستانتي."],
    "Lexin021344": ["Prototypen testades.", "اختُبر النموذج الأولي."],
    "Lexin021353": ["Provhytten användes.", "استُخدمت حجرة تجربة الملابس."],
    "Lexin021354": ["Proviant packades.", "حُزمت المؤونة."],
    "Lexin021355": ["Provinsen besöktes.", "زُير الإقليم."],
    "Lexin021357": ["Provision betalades.", "دُفعت العمولة."],
    "Lexin021362": ["Provokation förekom.", "حدث الاستفزاز."],
    "Lexin021365": ["Provröret användes.", "استُخدم أنبوب الاختبار."],
    "Lexin021366": ["Provstopp avtalades.", "اتُفق على وقف تجارب الأسلحة الذرية."],
    "Lexin021370": ["Prutmån fanns.", "وُجد مجال المساومة."],
    "Lexin021378": ["Prydnad sattes.", "وُضعت الزينة."],
    "Lexin021379": ["Prygel gavs.", "أُعطي الضرب."],
    "Lexin021382": ["Pryo gjordes.", "أُجري التوجيه المهني العملي."],
    "Lexin021383": ["Prål syntes.", "ظهرت الزينة المفرطة."],
    "Lexin021385": ["Pråmen lastades.", "حُملت البرج."],
    "Lexin021386": ["Prånget passerades.", "مُر بالمضيق."],
    "Lexin021391": ["Pränt lästes.", "قُرئ المخطوط."],
    "Lexin021393": ["Prärien besöktes.", "زُيرت البرية."],
    "Lexin021394": ["Prästen predikade.", "وعظ القسيس."],
    "Lexin021395": ["Prästerskapet samlades.", "تجمعت مجموعة القساوسة."],
    "Lexin021396": ["Prästgården beboddes.", "سُكن مسكن الأبرشية."],
    "Lexin021397": ["Prästkragen blommade.", "أزهر الأقحوان."],
    "Lexin021415": ["Psalmen sjöngs.", "غُنيت الترنيمة."],
    "Lexin021418": ["Psoriasis behandlades.", "عولجت الصدفية."],
    "Lexin021422": ["Psyket studerades.", "دُرست النفس."],
    "Lexin021423": ["Psyken besöktes.", "زُيرت العيادة النفسانية."],
    "Lexin021424": ["Psykiatern hjälpte.", "ساعد الطبيب النفساني."],
    "Lexin021425": ["Psykiatri studerades.", "دُرس الطب النفساني."],
    "Lexin021442": ["Psykoanalys gjordes.", "أُجري التحليل النفساني."],
    "Lexin021443": ["Psykofarmaka gavs.", "أُعطي دواء نفسي."]
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

const backupPath = DATA_FILE + '.backup_nouns53_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Done! Added examples to ${updated} nouns. Total: 5300 nouns!`);
