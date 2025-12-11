/**
 * Add examples to nouns - Batch 64 (100 nouns: Skäll to Smaksak)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin024815": ["Skäll hördes.", "سُمع التأنيب."],
    "Lexin024819": ["Skällsord sades.", "قيلت الكلمة المهينة."],
    "Lexin024820": ["Skälm greps.", "اعتُقل المحتال."],
    "Lexin024826": ["Skämt sades.", "قيل المزاح."],
    "Lexin024829": ["Skänk användes.", "استُخدمت خزانة الأواني."],
    "Lexin024830": ["Skänk gavs.", "أُعطيت الهبة."],
    "Lexin024833": ["Skär syntes.", "ظهرت الجزيرة الصخرية."],
    "Lexin024837": ["Skära användes.", "استُخدم المنجل."],
    "Lexin024840": ["Skärbräda användes.", "استُخدمت المفرمة."],
    "Lexin024841": ["Skärgård besöktes.", "زُير الأرخبيل."],
    "Lexin024844": ["Skärmytsling förekom.", "حدث الاشتباك."],
    "Lexin024845": ["Skärning skedde.", "حدث التقاطع."],
    "Lexin024846": ["Skärp bars.", "ارتُدي الحزام."],
    "Lexin024853": ["Skärpning krävdes.", "احتُيج إلى جدية."],
    "Lexin024856": ["Skärseld upplevdes.", "جُرب الأعراف."],
    "Lexin024858": ["Skärtorsdag firades.", "احتُفل بخميس الغسل."],
    "Lexin024859": ["Skärva syntes.", "ظهرت الشظية."],
    "Lexin024860": ["Sköka dömdes.", "حُكم على العاهرة."],
    "Lexin024861": ["Sköld bars.", "حُمل الدرع."],
    "Lexin024865": ["Sköldpadda kröp.", "زحفت السلحفاة."],
    "Lexin024871": ["Skönlitteratur lästes.", "قُرئت الآثار الأدبية."],
    "Lexin024873": ["Skönstaxering gjordes.", "أُجريت الضريبة الاستنسابية."],
    "Lexin024877": ["Skördetröska användes.", "استُخدمت ماكينة الحصاد."],
    "Lexin024878": ["Skört syntes.", "ظهر ذنب الرداء."],
    "Lexin024880": ["Skötare arbetade.", "عمل القيم."],
    "Lexin024881": ["Sköte undersöktes.", "فُحص الفرج."],
    "Lexin024883": ["Sköterska hjälpte.", "ساعدت الممرضة."],
    "Lexin024889": ["Sladd drogs.", "سُحب الشريط الكهربائي."],
    "Lexin024892": ["Sladdbarn föddes.", "وُلد الطفل المرزوق."],
    "Lexin024893": ["Sladder spreds.", "انتشر الهذر."],
    "Lexin024896": ["Slaf hittades.", "وُجدت قمرة المنامة."],
    "Lexin024901": ["Slag viktes.", "طُويت الطية."],
    "Lexin024904": ["Slagbord användes.", "استُخدمت الطاولة التي تطوى."],
    "Lexin024905": ["Slagfält besöktes.", "زُير ميدان المعركة."],
    "Lexin024911": ["Slagkraft visades.", "أُظهرت الفعالية."],
    "Lexin024912": ["Slagnummer spelades.", "شُغل البند المفضل."],
    "Lexin024913": ["Slagord ropades.", "صُرخ الشعار."],
    "Lexin024914": ["Slagpåse drabbades.", "أُصيب العرضة للخبط."],
    "Lexin024916": ["Slagskämpe slogs.", "قاتل المشاكس."],
    "Lexin024919": ["Slagverk spelades.", "عُزفت آلات النقر."],
    "Lexin024921": ["Slakt skedde.", "حدث الذبح."],
    "Lexin024923": ["Slaktare slaktade.", "ذبح الجزار."],
    "Lexin024924": ["Slakteri besöktes.", "زُير المسلخ."],
    "Lexin024926": ["Slam låg.", "وُجد الوحل."],
    "Lexin024928": ["Slammer hördes.", "سُمعت الضجة."],
    "Lexin024929": ["Slampa dömdes.", "حُكم على الساقطة."],
    "Lexin024931": ["Slamsa syntes.", "ظهرت المزقة."],
    "Lexin024933": ["Slang talades.", "نُطقت العامية."],
    "Lexin024934": ["Slangbåge användes.", "استُخدمت الأنشوطة."],
    "Lexin024938": ["Slant gavs.", "أُعطيت قطعة النقد."],
    "Lexin024946": ["Slarver arbetade.", "عمل المهمل."],
    "Lexin024948": ["Slarvsylta åts.", "أُكلت السلارف سيلتا."],
    "Lexin024949": ["Slask slängdes.", "أُلقيت النفاية."],
    "Lexin024950": ["Slask föll.", "هطل الرداغ."],
    "Lexin024954": ["Slav befriades.", "حُرر العبد."],
    "Lexin024955": ["Slav talade.", "تحدث السلوفاكي."],
    "Lexin024960": ["Slejf bands.", "رُبط لسان الحذاء."],
    "Lexin024962": ["Slemhinna undersöktes.", "فُحص الغشاء المخاطي."],
    "Lexin024975": ["Slev användes.", "استُخدمت المغرفة."],
    "Lexin024978": ["Slida användes.", "استُخدم الغماد."],
    "Lexin024979": ["Slida undersöktes.", "فُحص المهبل."],
    "Lexin024983": ["Slinga syntes.", "ظهرت اللفافة."],
    "Lexin024985": ["Slinka dömdes.", "حُكم على الساقطة."],
    "Lexin024987": ["Gå på slint.", "فشل."],
    "Lexin024994": ["Slipover bars.", "ارتُديت الكنزة بدون أكمام."],
    "Lexin024998": ["Slipstvång gällde.", "سرى واجب ارتداء الكرافتة."],
    "Lexin025002": ["Slit-och-släng förekom.", "حدث الاستهلاك والقذف."],
    "Lexin025010": ["Slits skars.", "قُطع الشق الطولي."],
    "Lexin025021": ["Slott besöktes.", "زُير القصر."],
    "Lexin025022": ["Slovak talade.", "تحدث السلوفاكي."],
    "Lexin025024": ["Sloven talade.", "تحدث السلوفيني."],
    "Lexin025031": ["Slum revs.", "هُدم حي الفقراء."],
    "Lexin025032": ["Slummer njöts.", "تُمتع بالنوم الخفيف."],
    "Lexin025038": ["Slusk syntes.", "ظهر القذر."],
    "Lexin025039": ["Sluss användes.", "استُخدمت بوابة المياه."],
    "Lexin025065": ["Slutförvaring gjordes.", "أُجري التخزين النهائي."],
    "Lexin025069": ["Slutkläm gavs.", "أُعطيت النهاية."],
    "Lexin025071": ["Slutledning drogs.", "استُخلصت المحصلة النهائية."],
    "Lexin025073": ["Slutlig skatt betalades.", "دُفعت الضريبة النهائية."],
    "Lexin025085": ["Slutskattsedel skickades.", "أُرسل كشف الضريبة النهائية."],
    "Lexin025086": ["Slutspel spelades.", "لُعبت مباريات نهائي الدوري."],
    "Lexin025087": ["På sluttampen.", "في النهاية."],
    "Lexin025089": ["Sluttning syntes.", "ظهر الانحدار."],
    "Lexin025091": ["Slutvinjett visades.", "عُرض الرسم الختامي."],
    "Lexin025093": ["Slyna dömdes.", "حُكم على الفتاة الوقحة."],
    "Lexin025094": ["Slyngel straffades.", "عوقب الولد غير المؤدب."],
    "Lexin025096": ["Slån växte.", "نمت شجيرة برقوق السياج."],
    "Lexin025115": ["Slåtter skedde.", "حدث حصاد التبن."],
    "Lexin025117": ["Släde glider.", "تنزلق عربة الجليد."],
    "Lexin025118": ["Slägga användes.", "استُخدمت الإرزبة."],
    "Lexin025119": ["Släkt samlades.", "تجمعت القرابة."],
    "Lexin025131": ["Slänt syntes.", "ظهر المنحدر."],
    "Lexin025133": ["Släp drogs.", "سُحبت المقطورة."],
    "Lexin025147": ["Slätt syntes.", "ظهر السهل."],
    "Lexin025151": ["Slödder avvisades.", "طُردت الرعاع."],
    "Lexin025152": ["Slöfock sov.", "نام الإنسان الكسول."],
    "Lexin025154": ["Slöjd lärdes.", "تُعلم العمل اليدوي."],
    "Lexin025164": ["Inte ett smack.", "لا شيء."],
    "Lexin025172": ["Smaklök aktiverades.", "نُشطت بصيلات التذوق."],
    "Lexin025176": ["Det är en smaksak.", "يتعلق بالذوق."]
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

const backupPath = DATA_FILE + '.backup_nouns64_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Done! Added examples to ${updated} nouns. Total: 6400 nouns!`);
