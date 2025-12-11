/**
 * Add examples to nouns - Batch 47 (100 nouns: Naturvårdsområde to Nåd)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin018623": ["Naturvårdsområdet skyddades.", "حُميت المحمية الطبيعية."],
    "Lexin018626": ["Navet roterade.", "دار المحور."],
    "Lexin018627": ["Naveln syntes.", "ظهرت الصرة."],
    "Lexin018628": ["Navelskådaren funderade.", "فكر الأناني التفكير."],
    "Lexin018629": ["Navelsträngen klipptes.", "قُطع حبل المشيمة."],
    "Lexin018631": ["Navigatören styrde.", "قاد الملاح."],
    "Lexin018634": ["Nazism fördöms.", "تُدان النازية."],
    "Lexin018635": ["Nazisten greps.", "اعتُقل النازي."],
    "Lexin018637": ["Necessären packades.", "حُزمت حقيبة أدوات التجميل."],
    "Lexin018646": ["Nederbörd föll.", "سقط المطر."],
    "Lexin018647": ["Nederlaget drabbade.", "أصابت الهزيمة."],
    "Lexin018652": ["Nedgång skedde.", "حدث النزول."],
    "Lexin018657": ["Nedkomsten skedde.", "حدثت الولادة."],
    "Lexin018667": ["Nedrustning diskuterades.", "نوقش نزع السلاح."],
    "Lexin018668": ["Nedräkningen startade.", "بدأ العد التنازلي."],
    "Lexin018674": ["Nedskrivning gjordes.", "أُجري تخفيض القيمة."],
    "Lexin018686": ["Nedtrappning skedde.", "حدث التخفيف."],
    "Lexin018691": ["Negationen användes.", "استُخدم الإنكار."],
    "Lexin018694": ["Negativet framkallades.", "طُورت الصورة السلبية."],
    "Lexin018697": ["Negressen talade.", "تحدثت الزنجية."],
    "Lexin018699": ["Nejden besöktes.", "زُيرت الضاحية."],
    "Lexin018700": ["Nejlikan tillsattes.", "أُضيف كبش القرنفل."],
    "Lexin018701": ["Nejlikan blommade.", "أزهر القرنفل."],
    "Lexin018705": ["Nektarinen åts.", "أُكل الرحيقاني."],
    "Lexin018706": ["Neonljuset lyste.", "أضاء ضوء النيون."],
    "Lexin018715": ["Nervositeten ökade.", "زادت العصبية."],
    "Lexin018726": ["Neurosen behandlades.", "عولج العصاب."],
    "Lexin018732": ["Neutronbomben fördöms.", "تُدان القنبلة النيوترونية."],
    "Lexin018733": ["Neutrum användes.", "استُخدم المحير."],
    "Lexin018736": ["Nian skrevs.", "كُتبت التسعة."],
    "Lexin018738": ["Nicken gavs.", "أُعطيت الإيماءة."],
    "Lexin018744": ["Nidbilden visades.", "عُرض الكاريكاتور."],
    "Lexin018745": ["Nidingsdådet begicks.", "ارتُكب عمل العنف."],
    "Lexin018747": ["Nikotin är skadligt.", "النيكوتين ضار."],
    "Lexin018749": ["En niondel togs.", "أُخذ تسع."],
    "Lexin018750": ["Nischen byggdes.", "بُنيت المشكاة."],
    "Lexin018752": ["Nissen syntes.", "ظهر الجني."],
    "Lexin018753": ["Niten drogs.", "سُحبت الخسارة."],
    "Lexin018754": ["Niten sattes.", "وُضع مسمار البرشام."],
    "Lexin018757": ["Nitningen gjordes.", "أُجريت البرشمة."],
    "Lexin018769": ["Njuren undersöktes.", "فُحصت الكلية."],
    "Lexin018778": ["Njutning kändes.", "شُعر بالاستمتاع."],
    "Lexin018782": ["Nobelpriset delades ut.", "وُزعت جائزة نوبل."],
    "Lexin018783": ["Nocken syntes.", "ظهرت القمة."],
    "Lexin018784": ["Noden hittades.", "وُجدت نقطة التلاقي."],
    "Lexin018792": ["Nojs var roligt.", "كان المزاح ممتعاً."],
    "Lexin018795": ["Nollan skrevs.", "كُتب الصفر."],
    "Lexin018796": ["Nollan ignorerades.", "تُجوهل غير ذي الأهمية."],
    "Lexin018799": ["På nolltid!", "في لمح البصر!"],
    "Lexin018800": ["Nomaden vandrade.", "تجول البدوي."],
    "Lexin018801": ["Nomenklaturen lärdes.", "تُعلم نظام مجموعة الكلمات."],
    "Lexin018811": ["Nordan blåste.", "هبت رياح الشمال."],
    "Lexin018814": ["Nordisten forskade.", "بحث خبير لغات دول الشمال."],
    "Lexin018816": ["Nordpolen nåddes.", "بُلغ القطب الشمالي."],
    "Lexin018836": ["Norrmannen talade.", "تحدث النرويجي."],
    "Lexin018837": ["Norrskenet syntes.", "ظهر الشفق القطبي."],
    "Lexin018840": ["Norska talades.", "نُطقت النرويجية."],
    "Lexin018841": ["Norskan reste.", "سافرت النرويجية."],
    "Lexin018844": ["Noshörningen sprang.", "ركض وحيد القرن."],
    "Lexin018845": ["Nostalgin kändes.", "شُعر بالتوق إلى الماضي."],
    "Lexin018847": ["Noten lästes.", "قُرئت الحاشية."],
    "Lexin018850": ["Notan betalades.", "دُفعت الفاتورة."],
    "Lexin018853": ["Notarien skrev.", "كتب الكاتب."],
    "Lexin018855": ["Notarius publicus bevittnade.", "شهد كاتب العدل."],
    "Lexin018860": ["Noteringen kontrollerades.", "رُوجع السعر اليومي."],
    "Lexin018861": ["Notisen lästes.", "قُرئ الخبر القصير."],
    "Lexin018863": ["Nougat smakade gott.", "طعمت النوغة جيداً."],
    "Lexin018864": ["Novellen lästes.", "قُرئت القصة القصيرة."],
    "Lexin018865": ["November är kall.", "نوفمبر بارد."],
    "Lexin018866": ["Novisen lärde sig.", "تعلم قليل الخبرة."],
    "Lexin018871": ["Nubben slogs in.", "دُق المسمار الصغير."],
    "Lexin018873": ["Nubben dracks.", "شُرب السنابس."],
    "Lexin018874": ["Nuckan bodde ensam.", "سكنت العانس وحدها."],
    "Lexin018876": ["Nudisten badade.", "سبح العريي."],
    "Lexin018877": ["Nudlar åts.", "أُكلت معكرونة البيض."],
    "Lexin018884": ["Numret framfördes.", "قُدم الاستعراض."],
    "Lexin018885": ["Nummerlappen togs.", "أُخذت ورقة رقم الانتظار."],
    "Lexin018887": ["Nunan syntes.", "ظهر المحيا."],
    "Lexin018888": ["Nunnan bad.", "صلت الراهبة."],
    "Lexin018901": ["Nybyggaren byggde.", "بنى المستعمر."],
    "Lexin018902": ["Nybygget stod klart.", "اكتمل المبنى الحديث."],
    "Lexin018903": ["Nybyggnaden invigdes.", "افتُتح البناء الحديث."],
    "Lexin018906": ["Nybörjaren lärde sig.", "تعلم المبتدئ."],
    "Lexin018909": ["Nyckelbenet bröts.", "كُسر عظم الترقوة."],
    "Lexin018913": ["Nyckelpigan flög.", "طارت الدعسوقة."],
    "Lexin018921": ["Nyhetsbyrån rapporterade.", "أبلغت وكالة الأنباء."],
    "Lexin018923": ["Nykomlingen lärde sig.", "تعلم الوافد الجديد."],
    "Lexin018926": ["Nykterheten praktiserades.", "مورس الامتناع عن المسكرات."],
    "Lexin018927": ["Nykterhetsvården hjälpte.", "ساعدت رعاية المدمنين."],
    "Lexin018928": ["Nykteristen drack inte.", "لم يشرب الممتنع عن المسكرات."],
    "Lexin018931": ["Nyllet syntes.", "ظهر الوجه."],
    "Lexin018932": ["Nylon är hållbart.", "النايلون متين."],
    "Lexin018935": ["Nypan användes.", "استُخدمت اليد."],
    "Lexin018938": ["Nyponet plockades.", "قُطف ثمر الزعرور."],
    "Lexin018939": ["Jag fick nys om det.", "علمت به."],
    "Lexin018943": ["Nystanet lindades.", "لُفت كرة الخيوط."],
    "Lexin018948": ["Nyttjanderätten gavs.", "أُعطي حق الانتفاع."],
    "Lexin018953": ["Nyval hölls.", "أُقيمت الانتخابات الجديدة."],
    "Lexin018957": ["Nåd beviljades.", "مُنح العفو."],
    "Lexin018958": ["Nåd visades.", "أُظهرت الشفقة."]
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

const backupPath = DATA_FILE + '.backup_nouns47_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Done! Added examples to ${updated} nouns. Total: 4700 nouns!`);
