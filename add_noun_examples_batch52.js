/**
 * Add examples to nouns - Batch 52 (100 nouns: Playboy to Pratstund)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin020728": ["Playboyen levde lyxigt.", "عاش البلاي بوي برفاهية."],
    "Lexin020729": ["Plenarsammanträdet hölls.", "عُقد الاجتماع المكتمل النصاب."],
    "Lexin020730": ["Plenum samlades.", "تجمعت الجلسة المكتملة."],
    "Lexin020737": ["Plingen hördes.", "سُمعت الرنة."],
    "Lexin020739": ["Pliten patrullerade.", "دار حارس السجن."],
    "Lexin020742": ["Plogen drogs.", "جُر المحراث."],
    "Lexin020744": ["Plojet skrattade åt.", "ضُحك على المزاح."],
    "Lexin020745": ["Plomben sattes.", "وُضعت حشوة الضرس."],
    "Lexin020746": ["Plomben förseglades.", "خُتم التشميع."],
    "Lexin020747": ["Plommon åts.", "أُكل الخوخ."],
    "Lexin020753": ["Pluggen sattes.", "وُضعت السدادة."],
    "Lexin020754": ["Plugget fortsatte.", "استمرت الدراسة المجتهدة."],
    "Lexin020757": ["Plugghästen studerade.", "درس التلميذ المجتهد."],
    "Lexin020762": ["Pluntan drogs fram.", "أُخرجت قارورة الجيب."],
    "Lexin020763": ["Plural användes.", "استُخدم الجمع."],
    "Lexin020764": ["Pluralism diskuterades.", "نوقشت التعددية."],
    "Lexin020771": ["Plutonen marscherade.", "سارت الفصيلة."],
    "Lexin020772": ["Plutonium är farligt.", "البلوتونيوم خطير."],
    "Lexin020773": ["Plymen bars.", "ارتُديت ريشة النعام."],
    "Lexin020774": ["Plysch är mjukt.", "المخمل ناعم."],
    "Lexin020778": ["Plågoanden straffades.", "عوقب المعذب."],
    "Lexin020780": ["Plånet tändes.", "أُشعل رأس عود الكبريت."],
    "Lexin020784": ["Plåten böjdes.", "ثُنيت الصفيحة."],
    "Lexin020785": ["Plåten hettades.", "سُخن الصاج."],
    "Lexin020789": ["Plåtslagaren arbetade.", "عمل المصفح."],
    "Lexin020790": ["Pläden lades.", "وُضعت البطانية."],
    "Lexin020810": ["En pocket köptes.", "اشتُري كتاب جيب."],
    "Lexin020811": ["Pocketboken lästes.", "قُرئ كتاب الجيب."],
    "Lexin020812": ["Podiet användes.", "استُخدمت المنصة."],
    "Lexin020813": ["Poemet lästes.", "قُرئت القصيدة."],
    "Lexin020814": ["Poesi skrevs.", "كُتب الشعر."],
    "Lexin020815": ["Poeten skrev.", "كتب الشاعر."],
    "Lexin020817": ["Pojken lekte.", "لعب الولد."],
    "Lexin020818": ["Pojkstrecket skrattades åt.", "ضُحك على الشقاوة."],
    "Lexin020819": ["Pojkvaskern sprang.", "ركض الولد الصغير."],
    "Lexin020820": ["Pojkvännen ringde.", "اتصل الصديق."],
    "Lexin020821": ["Pokalen delades ut.", "وُزع الكأس."],
    "Lexin020822": ["Poker spelades.", "لُعب البوكر."],
    "Lexin020823": ["Polen nåddes.", "بُلغ القطب."],
    "Lexin020824": ["Polerna var motsatta.", "كان القطبان متقابلان."],
    "Lexin020826": ["Polacken talade.", "تحدث البولوني."],
    "Lexin020828": ["Polaren hjälpte.", "ساعد الزميل."],
    "Lexin020837": ["Polikliniken besöktes.", "زُيرت العيادة الخارجية."],
    "Lexin020838": ["Polio bekämpades.", "كوفح شلل الأطفال."],
    "Lexin020843": ["Polisen grep.", "اعتقل البوليس."],
    "Lexin020855": ["Polismästaren kommenderade.", "أمر رئيس البوليس."],
    "Lexin020858": ["Polisongen rakades.", "حُلقت السوالف."],
    "Lexin020866": ["Politikern talade.", "تحدث السياسي."],
    "Lexin020867": ["Politikerföraktet växte.", "زاد احتقار رجال السياسة."],
    "Lexin020874": ["Politruken beslutade.", "قرر البيروقراطي السياسي."],
    "Lexin020875": ["Polityr användes.", "استُخدمت مادة التلميع."],
    "Lexin020876": ["Polka dansades.", "رُقصت البولكا."],
    "Lexin020877": ["Polkagrisen åts.", "أُكل البولكا جريس."],
    "Lexin020878": ["Pollen spreds.", "انتشر غبار الطلع."],
    "Lexin020883": ["Polotröjan bars.", "ارتُديت الكنزة ذات القبة الضيقة."],
    "Lexin020885": ["Polska talades.", "نُطقت البولونية."],
    "Lexin020886": ["Polska dansades.", "رُقصت البولسكا."],
    "Lexin020888": ["Polyglotten översatte.", "ترجم كثير اللغات."],
    "Lexin020891": ["Pomeransen åts.", "أُكل النارنج."],
    "Lexin020896": ["Ponken sprang.", "ركض الصبي."],
    "Lexin020897": ["Ponnyn red.", "ركب على الفرس القزم."],
    "Lexin020898": ["Pop spelades.", "شُغلت الموسيقى الحديثة."],
    "Lexin020899": ["Popcorn åts.", "أُكل الفشار."],
    "Lexin020903": ["Populism kritiserades.", "انتُقدت سياسة تبسيط المبادئ."],
    "Lexin020906": ["Porer syntes.", "ظهرت المسام."],
    "Lexin020908": ["Pormasken togs bort.", "أُزيل الانسداد الدهني في الجلد."],
    "Lexin020909": ["Pornografi förbjöds.", "حُرمت الإباحية."],
    "Lexin020911": ["Porr är förbjudet.", "الإباحية محرمة."],
    "Lexin020917": ["Portföljen bars.", "حُملت حقيبة الوثائق."],
    "Lexin020918": ["Portieren hjälpte.", "ساعد موظف الاستقبال."],
    "Lexin020922": ["Portmonnän öppnades.", "فُتحت محفظة النقود."],
    "Lexin020923": ["Porto betalades.", "دُفع رسم البريد."],
    "Lexin020925": ["Portugisen talade.", "تحدث البرتغالي."],
    "Lexin020927": ["Portvakten vaktade.", "حرس البواب."],
    "Lexin020928": ["Portvin dracks.", "شُرب النبيذ الحلو."],
    "Lexin020931": ["Posen intogs.", "اتُخذ الوضع المتكلف."],
    "Lexin020937": ["Positiv användes.", "استُخدم الموجب."],
    "Lexin020938": ["Positivet spelades.", "عُزف الأورغ الميكانيكي."],
    "Lexin020942": ["Post kom.", "جاء البريد."],
    "Lexin020944": ["Posten noterades.", "لوحظت الحصة."],
    "Lexin020945": ["Posten reparerades.", "أُصلحت القائمة."],
    "Lexin020949": ["Postadressen skrevs.", "كُتب العنوان البريدي."],
    "Lexin020951": ["Postboxen öppnades.", "فُتح صندوق البريد."],
    "Lexin020953": ["Posteringen bevakades.", "رُوقب مركز الحراسة."],
    "Lexin020956": ["Postgången fungerade.", "عمل توصيل البريد."],
    "Lexin020957": ["Postnumret angavs.", "ذُكر الرقم البريدي."],
    "Lexin020958": ["Postnummerkatalogen lästes.", "قُرئ كاتالوج الأرقام البريدية."],
    "Lexin020959": ["Postogrammet skickades.", "أُرسلت رسالة التهنئة البريدية."],
    "Lexin020961": ["Postorder beställdes.", "طُلب البيع عن طريق البريد."],
    "Lexin020962": ["Postorderföretaget sålde.", "باعت شركة البيع عن طريق البريد."],
    "Lexin020963": ["Poströstning gjordes.", "أُجري التصويت البريدي."],
    "Lexin020964": ["Postskriptum skrevs.", "كُتبت حاشية للرسالة."],
    "Lexin020966": ["Postverket levererade.", "وصلت مصلحة البريد."],
    "Lexin020977": ["Poängår räknades.", "حُسبت سنوات نقاط التقاعد."],
    "Lexin020983": ["Prakt syntes.", "ظهرت الروعة."],
    "Lexin020986": ["Praktiken öppnades.", "فُتح النشاط المهني."],
    "Lexin020988": ["Praktikanten lärde sig.", "تعلم المتمرن."],
    "Lexin021004": ["Prassel hördes.", "سُمع الحفيف."],
    "Lexin021009": ["Pratkvarnen pratade.", "تحدث الشخص الثرثار."],
    "Lexin021013": ["Pratstunden hölls.", "أُقيمت المحادثة."]
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

const backupPath = DATA_FILE + '.backup_nouns52_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Done! Added examples to ${updated} nouns. Total: 5200 nouns!`);
