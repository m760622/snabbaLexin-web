/**
 * Add examples to nouns - Batch 58 (100 nouns: Ryska to S-märke)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin022849": ["Ryska talades.", "نُطقت اللغة الروسية."],
    "Lexin022850": ["Ryskan talade.", "تحدثت الروسية."],
    "Lexin022854": ["Ryssen talade.", "تحدث الروسي."],
    "Lexin022860": ["Ryttaren red.", "ركب الفارس."],
    "Lexin022867": ["Råbiff serverades.", "قُدم البيف الني."],
    "Lexin022869": ["Rådet sammanträdde.", "اجتمع المجلس."],
    "Lexin022878": ["Rådgivaren hjälpte.", "ساعد المستشار."],
    "Lexin022879": ["Rådgivning gavs.", "أُعطيت الاستشارة."],
    "Lexin022884": ["Rådhuset besöktes.", "زُير مبنى الحاكم."],
    "Lexin022891": ["Rådmannen dömde.", "حكم مستشار المحكمة."],
    "Lexin022892": ["Rådslag hölls.", "أُقيم التداول."],
    "Lexin022895": ["Råg skördades.", "حُصد الجاودار."],
    "Lexin022897": ["Rågan var full.", "كانت الزيادة عن الحد."],
    "Lexin022899": ["Med råge mättes.", "قيس بعيار طافح."],
    "Lexin022900": ["Råken syntes.", "ظهرت القناة المفتوحة في بحر متجمد."],
    "Lexin022901": ["Råkan flög.", "طار غراب القيظ."],
    "Lexin022907": ["Råkost åts.", "أُكلت الخضروات النيئة."],
    "Lexin022908": ["Råkurr utbröt.", "اندلع الشجار العنيف."],
    "Lexin022911": ["Rån bakades.", "خُبزت رقائق البسكويت."],
    "Lexin022912": ["Rån begicks.", "ارتُكب السطو."],
    "Lexin022916": ["Rånaren greps.", "اعتُقل السارق."],
    "Lexin022917": ["Råolja pumpades.", "ضُخ النفط الخام."],
    "Lexin022923": ["Råris kokades.", "طُبخ الأرز غير المصقول."],
    "Lexin022925": ["Råskinnet straffades.", "عوقب الشخص الفظ."],
    "Lexin022927": ["Råttan jagades.", "طُورد الفأر."],
    "Lexin022928": ["Råvara bearbetades.", "عولجت المادة الخام."],
    "Lexin022934": ["Inom räckhåll.", "في متناول اليد."],
    "Lexin022936": ["Räd gjordes.", "أُجريت الغارة."],
    "Lexin022942": ["Räddningsplankan nåddes.", "وُصلت خشبة النجاة."],
    "Lexin022944": ["Rädisa åts.", "أُكلت الفجلة."],
    "Lexin022946": ["Räffla syntes.", "ظهر الأخدود."],
    "Lexin022949": ["Räfsan användes.", "استُخدمت المدمة."],
    "Lexin022952": ["Räka åts.", "أُكل القريدس."],
    "Lexin022960": ["Räkneord lärdes.", "تُعلم الرقم."],
    "Lexin022965": ["Rälsbussen åkte.", "سارت القطار الذي يشبه الباص."],
    "Lexin022967": ["Ränker avslöjades.", "اكتُشف الخداع."],
    "Lexin022969": ["Rännan flödade.", "جرى الأخدود."],
    "Lexin022970": ["Rännande hördes.", "سُمع الركض."],
    "Lexin022973": ["Rännstenen rensades.", "نُظف المجرى في حافة الرصيف."],
    "Lexin022974": ["Ränta betalades.", "دُفعت الفائدة المالية."],
    "Lexin022978": ["Räntabilitet uppnåddes.", "تحقق الربح."],
    "Lexin022980": ["Räntesatsen höjdes.", "رُفعت نسبة الفائدة المالية."],
    "Lexin022993": ["Rätt serverades.", "قُدمت الوجبة."],
    "Lexin022996": ["Rätten dömde.", "حكمت المحكمة."],
    "Lexin023001": ["I rätta inställdes.", "مثل أمام المحكمة."],
    "Lexin023002": ["Rätta gjordes.", "أُجري التصحيح."],
    "Lexin023004": ["Rättegång hölls.", "أُقيمت المحاكمة."],
    "Lexin023025": ["Rättesnöre gavs.", "أُعطي المثال."],
    "Lexin023036": ["Rättsfall prövades.", "حُكم في قضية شرعية."],
    "Lexin023046": ["Rättshjälp gavs.", "أُعطيت المساعدة القضائية."],
    "Lexin023050": ["Rättshjälpsavgift betalades.", "دُفع رسم المساعدة القضائية."],
    "Lexin023057": ["Rättshjälpsnämnden beslutade.", "قررت لجنة المساعدة القضائية."],
    "Lexin023064": ["Rättsskipning utövades.", "مورست العدالة."],
    "Lexin023068": ["Rättskrivning övades.", "تُمرن على علم الإملاء."],
    "Lexin023076": ["Rättsmedicin studerades.", "دُرس الطب الشرعي."],
    "Lexin023083": ["Rättspsykiatri tillämpades.", "طُبق الطب النفساني الشرعي."],
    "Lexin023095": ["Rättsröta avslöjades.", "اكتُشف الفساد القانوني."],
    "Lexin023096": ["Rättssalen fylldes.", "امتلأت قاعة المحكمة."],
    "Lexin023099": ["Rättsskydd gavs.", "أُعطيت الحماية القانونية."],
    "Lexin023103": ["Rättssäkerhet garanterades.", "ضُمن الأمان القانوني."],
    "Lexin023105": ["Rättstavning lärdes.", "تُعلمت التهجئة الصحيحة."],
    "Lexin023107": ["Rättstolk anlitades.", "استُعين بترجمان شفوي قانوني."],
    "Lexin023112": ["Rättsvetenskap studerades.", "دُرس علم القانون."],
    "Lexin023115": ["Rättsväsendet reformerades.", "أُصلحت السلطة القضائية."],
    "Lexin023123": ["Rävsaxen gillrade.", "نُصبت مصيدة الثعالب."],
    "Lexin023124": ["Rävspel förekom.", "حدثت المشاكسات."],
    "Lexin023132": ["Rödbeta kokades.", "طُبخ البنجر."],
    "Lexin023133": ["Röding fångades.", "صيد الشاد."],
    "Lexin023136": ["Rödsprit användes.", "استُخدم الكحول الممثل."],
    "Lexin023137": ["Rödspätta fångades.", "صيد البلاميس."],
    "Lexin023138": ["Rödvin dracks.", "شُرب النبيذ الأحمر."],
    "Lexin023146": ["Rökaren rökte.", "دخن المدخن."],
    "Lexin023149": ["Rökdykaren räddade.", "أنقذ إطفائي الإنقاذ."],
    "Lexin023150": ["Rökelse brändes.", "أُحرق البخور."],
    "Lexin023158": ["Rökridå lades.", "وُضع الستار الدخاني."],
    "Lexin023163": ["Rönnen växte.", "نمت شجرة غبيراء الحابلين."],
    "Lexin023164": ["Rönnbär plockades.", "قُطفت ثمار غبيراء الحابلين."],
    "Lexin023169": ["Rör lades.", "وُضعت الماسورة."],
    "Lexin023170": ["Rör växte.", "نما القصب."],
    "Lexin023171": ["Rör bars.", "ارتُدي حذاء التزلج."],
    "Lexin023178": ["Röra blandades.", "خُلط الخليط."],
    "Lexin023185": ["Rörelse skedde.", "حدثت الحركة."],
    "Lexin023188": ["Rörelsen växte.", "نمت الحركة الشعبية."],
    "Lexin023195": ["Rörlig pensionsålder gällde.", "سرى سن التقاعد المرن."],
    "Lexin023200": ["Rörmokaren reparerade.", "أصلح السمكري."],
    "Lexin023204": ["Röset syntes.", "ظهر كوم الحجارة."],
    "Lexin023210": ["Röstkortet visades.", "أُظهرت بطاقة التصويت."],
    "Lexin023211": ["Röstläget höjdes.", "رُفع مستوى الصوت."],
    "Lexin023212": ["Röstlängden kontrollerades.", "فُحصت لائحة المؤهلين للتصويت."],
    "Lexin023213": ["Röstning pågick.", "استمر التصويت."],
    "Lexin023214": ["Rösträtt gavs.", "أُعطي حق التصويت."],
    "Lexin023215": ["Röstsedeln lämnades.", "سُلمت بطاقة التصويت."],
    "Lexin023217": ["Röta spreds.", "انتشر التعفن."],
    "Lexin023219": ["Rötmånad rådde.", "ساد شهر العفن."],
    "Lexin023220": ["Rötmånad pågick.", "استمر شهر العفن."],
    "Lexin023223": ["Rötägget avslöjades.", "اكتُشف الحقير."],
    "Lexin023224": ["Röven syntes.", "ظهرت المؤخرة."],
    "Lexin023226": ["Rövaren flydde.", "هرب الحرامي."],
    "Lexin023227": ["Rövarhistoria berättades.", "رُويت القصة الخرافية."],
    "Lexin023228": ["S-märke sattes.", "وُضعت علامة أس."]
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

const backupPath = DATA_FILE + '.backup_nouns58_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Done! Added examples to ${updated} nouns. Total: 5800 nouns!`);
