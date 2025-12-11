/**
 * Add examples to nouns - Batch 45 (100 nouns: Moderat to Must)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin017919": ["Moderaten röstade.", "صوت مؤيد المحافظين."],
    "Lexin017921": ["Moderbolaget expanderade.", "توسعت الشركة الأم."],
    "Lexin017931": ["Modersmjölken gavs.", "أُعطي حليب الأم."],
    "Lexin017933": ["Modersmålet talades.", "نُطقت اللغة الأم."],
    "Lexin017934": ["Modersmålet lärdes.", "تُعلمت اللغة الأم."],
    "Lexin017935": ["Modersmålet studerades.", "دُرست اللغة الأم."],
    "Lexin017937": ["Modersmålseleven lärde.", "تعلم التلميذ الذي يتعلم اللغة الأم."],
    "Lexin017938": ["Modersmålsläraren undervisade.", "درّس مدرس اللغة الأم."],
    "Lexin017940": ["Modersmålsstöd gavs.", "أُعطي دعم اللغة الأم."],
    "Lexin017944": ["Modifikationen gjordes.", "أُجري التعديل."],
    "Lexin017952": ["Mojängen användes.", "استُخدمت الأداة."],
    "Lexin017958": ["Molekylen studerades.", "دُرس الجزيء."],
    "Lexin017964": ["På momangen!", "مباشرة!"],
    "Lexin017967": ["Monarkin regerade.", "حكمت المملكة."],
    "Lexin017970": ["Monitorn visade.", "عرضت الشاشة."],
    "Lexin017973": ["Monogami praktiserades.", "مورس الزواج الأحادي."],
    "Lexin017974": ["Monogrammet syddes.", "خُيط المونوغرام."],
    "Lexin017980": ["Monstret skrämde.", "أفزع الوحش."],
    "Lexin017981": ["Montaget gjordes.", "أُجري التركيب."],
    "Lexin017982": ["Montern visade.", "عُرض صندوق العرض."],
    "Lexin017986": ["Montören installerade.", "ركّب فني التركيبات."],
    "Lexin017988": ["Monumentet invigdes.", "افتُتح النصب التذكاري."],
    "Lexin017989": ["Mopeden kördes.", "قيدت الدراجة بمحرك."],
    "Lexin017991": ["Mopedisten körde.", "قاد سائق الدراجة بمحرك."],
    "Lexin017992": ["Mopsen skällde.", "نبح الكلب الصغير."],
    "Lexin017994": ["Moraklockan tickade.", "دقت ساعة مورا."],
    "Lexin017996": ["Moralen var hög.", "كان الخلق عالياً."],
    "Lexin017997": ["Moralen stärktes.", "تقوت المعنويات."],
    "Lexin018002": ["Moralkakan gavs.", "أُعطي التفسير الخلقي."],
    "Lexin018007": ["Mordet begicks.", "ارتُكب القتل العمد."],
    "Lexin018010": ["Morfin gavs.", "أُعطي المورفين."],
    "Lexin018011": ["Morföräldrarna besöktes.", "زُير الجدان."],
    "Lexin018016": ["Han kände morgonluft.", "شعر بمستقبل أفضل."],
    "Lexin018018": ["Morgonsamlingen hölls.", "أُقيم اللقاء الصباحي."],
    "Lexin018023": ["Morsan ringde.", "اتصلت الوالدة."],
    "Lexin018024": ["I morse såg jag.", "رأيت صباحاً."],
    "Lexin018025": ["Morsealfabetet användes.", "استُخدمت أحرف مورس."],
    "Lexin018027": ["Morteln användes.", "استُخدم الهاون."],
    "Lexin018029": ["Moset serverades.", "قُدم الهريس."],
    "Lexin018030": ["Mosaiken sattes.", "وُضعت الفسيفساء."],
    "Lexin018035": ["Mossan växte.", "نمت الأشنة."],
    "Lexin018036": ["Mossen besöktes.", "زُيرت الأرض السبخة."],
    "Lexin018046": ["Motbilden visades.", "عُرضت الصورة العكسية."],
    "Lexin018048": ["Motboken visades.", "أُظهر دفتر شراء الخمور."],
    "Lexin018049": ["Motellet bokades.", "حُجز النزل."],
    "Lexin018051": ["Motgiftet gavs.", "أُعطي الترياق."],
    "Lexin018052": ["Motgång drabbade.", "أصاب الفشل."],
    "Lexin018054": ["Motionen lämnades.", "قُدم الاقتراح."],
    "Lexin018066": ["Motorfordonet kördes.", "قيدت العربة."],
    "Lexin018067": ["Motorföraren körde.", "قاد سائق العربة."],
    "Lexin018071": ["Motortrafikleden trafikerades.", "سار الطريق العريض."],
    "Lexin018072": ["Motorvägen kördes.", "قيد الأوتوستراد."],
    "Lexin018074": ["Motparten talade.", "تحدث الند."],
    "Lexin018086": ["Motståndskraften stärktes.", "تقوت قوة المقاومة."],
    "Lexin018096": ["Motsägelsen fanns.", "وُجد تضارب الأقوال."],
    "Lexin018100": ["Mottet åt.", "أكلت الحشرة الضارة."],
    "Lexin018102": ["Mottagaren tog emot.", "تسلم المستقبل."],
    "Lexin018103": ["Mottagaren fungerade.", "عمل جهاز الاستقبال."],
    "Lexin018106": ["Mottagningsbeviset skickades.", "أُرسل إشعار الاستلام."],
    "Lexin018114": ["Motvilja kändes.", "شُعر بعدم الرغبة."],
    "Lexin018117": ["Motvind blåste.", "هبت الريح المعاكسة."],
    "Lexin018120": ["Moussen serverades.", "قُدمت الكريمة."],
    "Lexin018131": ["Muffinen bakades.", "خُبز الموفن."],
    "Lexin018132": ["Muggen fylldes.", "مُلئ الكوب."],
    "Lexin018133": ["Muggen användes.", "استُخدم المرحاض."],
    "Lexin018134": ["Muhammedanen bad.", "صلى المسلم."],
    "Lexin018135": ["Mulatten reste.", "سافر الخلاسي."],
    "Lexin018136": ["Mulen rörde sig.", "تحرك الخطم."],
    "Lexin018138": ["Mullen grävdes.", "حُفر المهاد."],
    "Lexin018141": ["Mullvaden grävde.", "حفر الخلند."],
    "Lexin018154": ["Multiple choice användes.", "استُخدم الاختيار المتعدد."],
    "Lexin018156": ["Multiplikation lärdes.", "تُعلمت عملية الضرب."],
    "Lexin018159": ["Mumien visades.", "عُرضت المومياء."],
    "Lexin018161": ["Mummlet hördes.", "سُمعت التمتمة."],
    "Lexin018166": ["Munderingen bars.", "ارتُدي اللباس العسكري."],
    "Lexin018167": ["Mungigan spelades.", "عُزفت المونجيجا."],
    "Lexin018168": ["Mungipan rörde sig.", "تحرك طرف الفم."],
    "Lexin018172": ["Munken bad.", "صلى الراهب."],
    "Lexin018173": ["Munken åts.", "أُكل المونك."],
    "Lexin018175": ["Munkorgen sattes på.", "وُضعت الكمامة المشبكة."],
    "Lexin018176": ["Munsbiten tuggades.", "مُضغت اللقمة."],
    "Lexin018177": ["Munskyddet bars.", "ارتُديت الكمامة."],
    "Lexin018178": ["Munspelet spelades.", "عُزفت الهرمونيكا."],
    "Lexin018179": ["Munstycket sattes.", "وُضعت الفوهة."],
    "Lexin018181": ["Muntergöken skämtade.", "مزح المضحك."],
    "Lexin018189": ["Muren byggdes.", "بُني السور."],
    "Lexin018192": ["Muraren murade.", "بنى البناء."],
    "Lexin018195": ["Murbruket blandades.", "خُلط الملاط."],
    "Lexin018198": ["Murgrönan växte.", "نما النبات المتسلق."],
    "Lexin018200": ["Murklan plockades.", "قُطفت الغوشنة."],
    "Lexin018203": ["Murveln skrev.", "كتب الصحفي."],
    "Lexin018209": ["Musikalen visades.", "عُرضت المسرحية الموسيقية."],
    "Lexin018212": ["Musikanten spelade.", "عزف الموسيقار."],
    "Lexin018213": ["Musikdirektören ledde.", "قاد قائد الفرقة الموسيقية."],
    "Lexin018214": ["Musikern spelade.", "عزف الموسيقي."],
    "Lexin018216": ["Muskeln rörde sig.", "تحركت العضلة."],
    "Lexin018227": ["Muskulaturen stärktes.", "تقوى النظام العضلي."],
    "Lexin018229": ["Muslimen bad.", "صلى المسلم."],
    "Lexin018230": ["Musslan åts.", "أُكل بلح البحر."],
    "Lexin018231": ["Musten dracks.", "شُرب شراب الفواكه المخمر."]
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

const backupPath = DATA_FILE + '.backup_nouns45_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Done! Added examples to ${updated} nouns. Total: 4500 nouns! 🎯`);
