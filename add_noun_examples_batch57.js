/**
 * Add examples to nouns - Batch 57 (100 nouns: Rit to Rysare)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin022550": ["Riten utfördes.", "أُجري الطقس."],
    "Lexin022553": ["Ritaren ritade.", "رسم الرسام."],
    "Lexin022554": ["Ritkontoret arbetade.", "عمل مكتب الرسم."],
    "Lexin022557": ["Ritten gjordes.", "أُجريت الجولة على ظهر الحصان."],
    "Lexin022558": ["Ritualen följdes.", "اتُبع الطقس."],
    "Lexin022561": ["Rivalen kämpade.", "قاتل الخصم."],
    "Lexin022563": ["Rivalitet rådde.", "سادت المنافسة."],
    "Lexin022571": ["Rivning skedde.", "حدث الهدم."],
    "Lexin022577": ["Rivstart gjordes.", "أُجريت الانطلاقة السريعة."],
    "Lexin022582": ["Roboten avfyrades.", "أُطلقت القذيفة."],
    "Lexin022584": ["Rock spelades.", "شُغلت موسيقى الروك."],
    "Lexin022585": ["Rocken bars.", "ارتُدي البالطو."],
    "Lexin022586": ["Rodd tävlades.", "تُنوفس في التجديف."],
    "Lexin022588": ["Rodeln användes.", "استُخدم الرودل."],
    "Lexin022589": ["Rodret styrdes.", "وُجهت دفة المركب."],
    "Lexin022590": ["Rodnad syntes.", "ظهر الاحمرار."],
    "Lexin022595": ["Rojalism diskuterades.", "نوقشت المبادئ الملكية."],
    "Lexin022596": ["Rokoko studerades.", "دُرس الركوكو."],
    "Lexin022600": ["Rollen spelades.", "لُعب الدور."],
    "Lexin022602": ["Rom lades.", "وُضعت البطارخ."],
    "Lexin022603": ["Rom dracks.", "شُرب الروم."],
    "Lexin022604": ["Romen talade.", "تحدث الروما."],
    "Lexin022606": ["Romani talades.", "نُطقت الروماني."],
    "Lexin022607": ["Romans upplevdes.", "جُربت قصة الحب."],
    "Lexin022609": ["Romantik kändes.", "شُعر بالرومنطيقية."],
    "Lexin022610": ["Romantikern drömde.", "حلم الرومنطيقي."],
    "Lexin022612": ["Romaren stred.", "حارب الرومي."],
    "Lexin022613": ["Romben ritades.", "رُسم المعين."],
    "Lexin022620": ["Rondellen passerades.", "مُر بالصفيحة المستديرة."],
    "Lexin022622": ["Rop hördes.", "سُمع الصياح."],
    "Lexin022626": ["Ros gavs.", "أُعطي الثناء."],
    "Lexin022629": ["Rosenkransen användes.", "استُخدم إطار الورد."],
    "Lexin022634": ["Rosmarin användes.", "استُخدم حصى البان."],
    "Lexin022637": ["Rost bildades.", "تكون الصدأ."],
    "Lexin022640": ["Rostbiff serverades.", "قُدمت قطعة اللحم البقري المشوية."],
    "Lexin022653": ["Roteln arbetade.", "عملت الدائرة."],
    "Lexin022657": ["Rotfrukt skördades.", "حُصدت الخضروات الجذرية."],
    "Lexin022659": ["Rotfyllning gjordes.", "أُجري حشو جذر السن."],
    "Lexin022662": ["Rotmos serverades.", "قُدم بوريه الخضروات الجذرية."],
    "Lexin022663": ["Rotsak kokades.", "طُبخت الخضروات الجذرية."],
    "Lexin022665": ["Rotting användes.", "استُخدم الخيزران."],
    "Lexin022666": ["Rotvälska talades.", "تُحدث بالكلام البذيء."],
    "Lexin022667": ["Rouge användes.", "استُخدم الأحمر."],
    "Lexin022668": ["Roulett spelades.", "لُعب الروليت."],
    "Lexin022669": ["Router användes.", "استُخدم الكمبيوتر الشبكي."],
    "Lexin022670": ["Rov togs.", "أُخذ النهب."],
    "Lexin022671": ["Rova skördades.", "حُصد اللفت."],
    "Lexin022672": ["Rovan tickade.", "دقت ساعة الجيب."],
    "Lexin022673": ["Rovdjur jagade.", "طارد الحيوان المفترس."],
    "Lexin022674": ["Rovdrift förekom.", "حدث الاستغلال البشع للموارد الطبيعية."],
    "Lexin022675": ["Royalty betalades.", "دُفعت الجعالة."],
    "Lexin022680": ["Med rubb och stubb.", "بكل شيء."],
    "Lexin022687": ["Rucklet stod.", "وقفت البناية المتداعية."],
    "Lexin022688": ["Ruelse kändes.", "شُعر بتعذيب الضمير الشديد."],
    "Lexin022689": ["Ruffen användes.", "استُخدمت كابينة القارب."],
    "Lexin022690": ["Ruff förekom.", "حدثت الخشونة في اللعب."],
    "Lexin022695": ["Rugge syntes.", "ظهرت الأجمة."],
    "Lexin022707": ["Rullen användes.", "استُخدمت البكرة."],
    "Lexin022708": ["Rullgardinen drogs.", "سُحبت الستارة اللفافة."],
    "Lexin022709": ["Rullskidan användes.", "استُخدمت الزحافة ذات العجلات."],
    "Lexin022710": ["Rullskridskor bars.", "ارتُدي حذاء التزلج ذو العجلات."],
    "Lexin022711": ["Rullstolen användes.", "استُخدم الكرسي المتحرك."],
    "Lexin022712": ["Rulltrappan togs.", "أُخذ الدرج المتحرك."],
    "Lexin022713": ["Rulltårta serverades.", "قُدمت الكعكة المحشوة الملفوفة."],
    "Lexin022718": ["Rumba dansades.", "رُقصت الرمبا."],
    "Lexin022720": ["Rumpan syntes.", "ظهرت المؤخرة."],
    "Lexin022723": ["Rumsbeställning gjordes.", "أُجري حجز غرفة."],
    "Lexin022724": ["Katten är rumsren.", "القط منضبط."],
    "Lexin022725": ["Rumstemperatur uppnåddes.", "بُلغت درجة حرارة الغرفة."],
    "Lexin022727": ["Rumsvärme kändes.", "شُعر بالدفء المنزلي الداخلي."],
    "Lexin022728": ["Rumänen talade.", "تحدث الروماني."],
    "Lexin022730": ["Rumänska talades.", "نُطقت الرومانية."],
    "Lexin022731": ["Runan lästes.", "قُرئت الأبجدية الرونية."],
    "Lexin022740": ["Rundfråga gjordes.", "أُجري استقصاء الرأي."],
    "Lexin022744": ["Rundresa gjordes.", "أُجريت الجولة في مناطق متعددة."],
    "Lexin022745": ["Rundskrivelse skickades.", "أُرسلت الرسالة الدورية."],
    "Lexin022746": ["Rundsmörjning gjordes.", "أُجري تشحيم العربات."],
    "Lexin022747": ["Rundstycke åts.", "أُكلت قطعة الخبز المستديرة."],
    "Lexin022748": ["Rundtur gjordes.", "أُجريت الجولة السياحية."],
    "Lexin022749": ["Rundvandring gjordes.", "أُجري التجول على الأقدام."],
    "Lexin022757": ["Runstenen studerades.", "دُرس الحجر الروني."],
    "Lexin022764": ["Rusch skedde.", "حدث التسارع."],
    "Lexin022765": ["Rusdryck dracks.", "شُربت المشروبات الروحية."],
    "Lexin022774": ["Russen red.", "رُكب الحصان القصير المنكب."],
    "Lexin022779": ["Rustning skedde.", "حدث التجهيز."],
    "Lexin022780": ["Rustningen bars.", "ارتُدي العتاد الحربي."],
    "Lexin022781": ["Rutan markerades.", "عُلم المربع."],
    "Lexin022783": ["Ruter spelades.", "لُعب الديناري."],
    "Lexin022791": ["Rutschbanan användes.", "استُخدم المنزلق."],
    "Lexin022792": ["Rutten planerades.", "خُطط المسار."],
    "Lexin022797": ["Ryan lades.", "وُضعت السجادة ذات الوبر الطويل."],
    "Lexin022809": ["Ryggmärgen skadades.", "أُصيب نخاع العمود الفقري."],
    "Lexin022817": ["Ryggraden undersöktes.", "فُحص العمود الفقري."],
    "Lexin022819": ["Ryggskott drabbade.", "أصابت الخرزة."],
    "Lexin022822": ["Ryggstödet justerades.", "عُدل مسند الظهر."],
    "Lexin022824": ["Ryggtavlan syntes.", "ظهر شكل الظهر من الخلف."],
    "Lexin022834": ["Rymden mättes.", "قيس المحتوى."],
    "Lexin022837": ["Rymlingen greps.", "اعتُقل الهارب."],
    "Lexin022838": ["På rymmen.", "على الهروب."],
    "Lexin022846": ["Rysaren sågs.", "شوهد الفيلم المرعب."]
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

const backupPath = DATA_FILE + '.backup_nouns57_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Done! Added examples to ${updated} nouns. Total: 5700 nouns!`);
