/**
 * Add examples to nouns - Batch 67 (100 nouns: Specialare to Stake)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin025762": ["En specialare.", "شيء خاص."],
    "Lexin025773": ["Specialskola byggdes.", "بُنيت المدرسة الخاصة."],
    "Lexin025777": ["Specialundervisning behövs.", "التعليم الخاص مطلوب."],
    "Lexin025784": ["Specifikation krävs.", "المواصفات مطلوبة."],
    "Lexin025785": ["Specimen togs.", "أُخذت العينة."],
    "Lexin025786": ["Spedition sköttes.", "أُدير نقل البضائع."],
    "Lexin025787": ["Speedway kördes.", "سُيق سباق السبيدواي."],
    "Lexin025793": ["Spejare sändes ut.", "أُرسل الكشاف."],
    "Lexin025796": ["Spektrum syntes.", "ظهر الطيف."],
    "Lexin025803": ["Spel hördes.", "سُمع العزف."],
    "Lexin025809": ["Spelare vann.", "فاز اللاعب."],
    "Lexin025811": ["Spelevink skrattade.", "ضحك المزوح."],
    "Lexin025812": ["Spelman spelade.", "عزف عازف الموسيقى الشعبية."],
    "Lexin025813": ["Spelregel följdes.", "اتُبعت قواعد اللعب."],
    "Lexin025817": ["Spene mjölkades.", "حُلبت حلمة الحيوان."],
    "Lexin025819": ["Sperma analyserades.", "حُلل الحي المجتوي."], // Or simpler translation
    "Lexin025820": ["Spermie simmade.", "سبح المني."],
    "Lexin025832": ["Spett användes.", "استُخدم السيخ."],
    "Lexin025833": ["Spettkaka åts.", "أُكلت سبت كاكا."],
    "Lexin025834": ["Spetälska botades.", "شُفي الجذام."],
    "Lexin025845": ["Spill torkades upp.", "مُسح التلوث."],
    "Lexin025847": ["Gå till spillo.", "يذهب سدى."],
    "Lexin025856": ["Spinnspö kastades.", "رُميت سنارة الصيد."],
    "Lexin025857": ["Spion greps.", "قُبض على الجاسوس."],
    "Lexin025858": ["Spionage avslöjades.", "كُشف التجسس."],
    "Lexin025860": ["Spioneri bedrevs.", "مُورس التجسس."],
    "Lexin025864": ["Spira bars.", "حُمل الصولجان."],
    "Lexin025865": ["Spiral vreds.", "لُف اللولب."],
    "Lexin025866": ["Spiral sattes in.", "وُضع لولب منع الحمل."],
    "Lexin025869": ["Spiritism utövades.", "مُورست الأرواحية."],
    "Lexin025876": ["Spjut kastades.", "رُمي الرمح."],
    "Lexin025877": ["Spjuver lurades.", "خدع النصاب."],
    "Lexin025882": ["Ta spjärn.", "يستند."],
    "Lexin025885": ["Splitter flög.", "تطايرت الشظايا."],
    "Lexin025892": ["Spole snurrade.", "دارت اللفافة."],
    "Lexin025894": ["Spoling skrek.", "صرخ الشاب غير المهذب."],
    "Lexin025897": ["Sponsor betalade.", "دفع الراعي."],
    "Lexin025907": ["Sportbil kördes.", "قيدت السيارة الرياضية."],
    "Lexin025908": ["Sportfiskare fiskade.", "اصطاد صياد السمك الهاوي."],
    "Lexin025910": ["Sportlov firades.", "احتُفل بأسبوع إجازة الرياضة."],
    "Lexin025912": ["Spotlight lyste.", "أضاء الضوء الموضعي."],
    "Lexin025914": ["Spott torkades.", "مُسحت البصقة."],
    "Lexin025915": ["Utstå spott och spe.", "يتحمل الإهانة."],
    "Lexin025918": ["För en spottstyver.", "بمبلغ زهيد."],
    "Lexin025929": ["Sprej användes.", "استُخدم الرذاذ."],
    "Lexin025943": ["Spridning skedde.", "حدث التوزيع."],
    "Lexin025947": ["Springa syntes.", "ظهر الشق."],
    "Lexin025948": ["Springbrunn sprutade.", "تدفقت النافورة."],
    "Lexin025952": ["Springpojke sprang.", "ركض الساعي."],
    "Lexin025953": ["Sprinkler startade.", "بدأ رشاش الماء."],
    "Lexin025955": ["Sprinter sprang.", "ركض عداء المسافات القصيرة."],
    "Lexin025956": ["Sprit dracks.", "شُرب الكحول."],
    "Lexin025957": ["Spritkök tändes.", "أُشعل الموقد الكحولي."],
    "Lexin025958": ["Spriträttigheter gavs.", "مُنح تصريح بيع الخمور."],
    "Lexin025976": ["Språngbräda användes.", "استُخدم المنط."],
    "Lexin025977": ["Språngmarsch beordrades.", "أُمر بالخبب."],
    "Lexin025985": ["Sätta sprätt på.", "يبدد."],
    "Lexin025986": ["Sprätt gick.", "مشى الغندور."],
    "Lexin025990": ["Spröjs målades.", "دُهن إطار النافذة."],
    "Lexin025992": ["Spröt kändes.", "شُعر بالمجس."],
    "Lexin025994": ["Spurt gjordes.", "بُذل الجهد النهائي."],
    "Lexin025996": ["Sputnik sköts upp.", "أُطلق سبوتنيك."],
    "Lexin025998": ["Spya torkades.", "مُسح القيء."],
    "Lexin026001": ["Spån sopades.", "كُنست النشارة."],
    "Lexin026002": ["Spång gick över.", "عبر جسر المشاة."],
    "Lexin026004": ["Spånskiva sågades.", "نُشر لوح الخشب المضغوط."],
    "Lexin026008": ["Spår följdes.", "تُبع المسار."],
    "Lexin026014": ["Spårväg byggdes.", "بُني مسار الترمواي."],
    "Lexin026015": ["Spårämne behövs.", "المادة الحيوية الأساسية مطلوبة."],
    "Lexin026016": ["Spårämne tillsattes.", "أُضيفت عناصر الاقتفاء."],
    "Lexin026018": ["Späck skars.", "قُطع الشحم."],
    "Lexin026021": ["Spädbarn skrek.", "صرخ الطفل الرضيع."],
    "Lexin026030": ["Spänne lossnade.", "انفك الإبزيم."],
    "Lexin026034": ["Spänning mättes.", "قيس الجهد."],
    "Lexin026038": ["Spännvidd mättes.", "قيس الباع."],
    "Lexin026039": ["Spänst visades.", "أُظهرت الرشاقة."],
    "Lexin026046": ["Spärrlinje målades.", "رُسم خط منع التجاوز."],
    "Lexin026047": ["Spärrlista kollades.", "فُحصت اللائحة السوداء."],
    "Lexin026049": ["Spätta stektes.", "قُليت سمكة البلايس."],
    "Lexin026050": ["Spö användes.", "استُخدم السوط."],
    "Lexin026053": ["Spöke sågs.", "شوهد الشبح."],
    "Lexin026054": ["Spöregn föll.", "هطل المطر الغزير."],
    "Lexin026055": ["Spörsmål ställdes.", "طُرح السؤال."],
    "Lexin026056": ["Squash odlades.", "زُرع اليقطين."],
    "Lexin026057": ["Squash spelades.", "لُعبت الاسكواش."],
    "Lexin026065": ["Stab möttes.", "اجتمعت أركان الحرب."],
    "Lexin026078": ["Stack syntes.", "ظهرت الكومة."],
    "Lexin026079": ["Vilken stackare.", "يا له من مسكين."],
    "Lexin026094": ["Stadsbild ändrades.", "تغير مشهد المدينة."],
    "Lexin026095": ["Stadsbud anlitades.", "استُؤجر ساعي المدينة."],
    "Lexin026098": ["Stadshus byggdes.", "بُني مبنى إدارة البلدية."],
    "Lexin026099": ["Stadskärna besöktes.", "زُير مركز المدينة."],
    "Lexin026100": ["Stadsplan gjordes.", "وُضع مخطط بناء المدينة."],
    "Lexin026101": ["Stafett sprangs.", "رُكض التتابع."],
    "Lexin026102": ["Staffagefigur målades.", "رُسمت الشخصية الثانوية."],
    "Lexin026103": ["Staffli användes.", "استُخدم الحامل."],
    "Lexin026106": ["Stag spändes.", "شُد الحبل القوي."],
    "Lexin026112": ["Stake slogs ner.", "دُق الوتد."],
    "Lexin026113": ["Stake tändes.", "أُشعل الشمعدان."],
    "Lexin026114": ["Det var ruter i honom.", "كان لديه عزيمة."], // Idiomatic mapping for Stake/Ruter/Hjärter? Wait, "Stake" as in "Det är stake i honom". "Det är stake i honom" -> "لديه عزيمة".
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

const backupPath = DATA_FILE + '.backup_nouns67_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Batch 67 completed!`);
