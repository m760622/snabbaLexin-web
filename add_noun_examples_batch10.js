/**
 * Add examples to nouns - Batch 10 (100 nouns: Bränning to Börd)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin004392": ["Bränningen slog mot klipporna.", "ارتطمت الموجة بالصخور."],
    "Lexin004399": ["Brännvin är en stark sprit.", "الكحول المقطرة مشروب قوي."],
    "Lexin004402": ["Han stod i bräschen för förändring.", "وقف في صف الدفاع عن التغيير."],
    "Lexin004404": ["Hattens brätte skyddade mot solen.", "حمى طرف القبعة من الشمس."],
    "Lexin004406": ["Arbetet gav honom brödföda.", "أعطاه العمل طعامه اليومي."],
    "Lexin004407": ["Brödrakapet höll ihop.", "ظلت الأخوة متماسكة."],
    "Lexin004408": ["Brödrosten rostade brödet perfekt.", "حمّصت المحمصة الخبز بإتقان."],
    "Lexin004412": ["Bröstarvingarna delade arvet.", "قسم الورثة الشرعيون الميراث."],
    "Lexin004422": ["Bröstkorgen skyddar lungorna.", "يحمي القفص الصدري الرئتين."],
    "Lexin004434": ["Bröstsim är bra för ryggen.", "سباحة الصدر مفيدة للظهر."],
    "Lexin004441": ["Vi badade i bubbelpoolen.", "استحممنا في الجاكوزي."],
    "Lexin004442": ["Bubblorna steg till ytan.", "صعدت الفقاعات للسطح."],
    "Lexin004451": ["Buddism praktiseras i Asien.", "تُمارس البوذية في آسيا."],
    "Lexin004456": ["Budkavlen skickades från by till by.", "أرسلت عصا الإبدال من قرية لقرية."],
    "Lexin004457": ["Budo inkluderar karate och judo.", "يشمل البودو الكاراتيه والجودو."],
    "Lexin004458": ["Budskapet var tydligt.", "كانت الرسالة واضحة."],
    "Lexin004460": ["Bufferten dämpade stöten.", "خفف المصد الصدمة."],
    "Lexin004464": ["Buken var öm efter operationen.", "كان البطن مؤلماً بعد العملية."],
    "Lexin004477": ["Bukspottkörteln producerar insulin.", "ينتج البنكرياس الأنسولين."],
    "Lexin004480": ["Bukten var lugn och vacker.", "كان الخليج هادئاً وجميلاً."],
    "Lexin004481": ["Han fick bukt med problemet.", "سيطر على المشكلة."],
    "Lexin004491": ["Bulgaren talade sitt modersmål.", "تحدث البلغاري لغته الأم."],
    "Lexin004499": ["Bullan utfärdades av påven.", "صدر الأمر البابوي من البابا."],
    "Lexin004500": ["Bulldoggen är en stark hund.", "البلدغ كلب قوي."],
    "Lexin004502": ["Bullen var nybakad.", "كانت الكعكة طازجة."],
    "Lexin004506": ["Bullermattan störde invånarna.", "أزعجت منطقة الضجيج السكان."],
    "Lexin004514": ["Bulletinen rapporterade om läget.", "أبلغ البلاغ عن الوضع."],
    "Lexin004517": ["Bulnaden på huden var röd.", "كان الورم على الجلد أحمر."],
    "Lexin004518": ["Bulten höll ihop delarna.", "ربط القلاووظ الأجزاء."],
    "Lexin004522": ["Bulvanen undertecknade i hemlighet.", "وقّع الشخص الوهمي سراً."],
    "Lexin004525": ["Bumerangen kom tillbaka.", "عادت البوميرانغ."],
    "Lexin004526": ["Bumlingen låg vid stranden.", "استقر الجلمود على الشاطئ."],
    "Lexin004529": ["Bundsförvanten hjälpte i kriget.", "ساعد الحليف في الحرب."],
    "Lexin004530": ["Bungalowen hade ett rum.", "كان للبنغلو غرفة واحدة."],
    "Lexin004531": ["Bunken var full av frukt.", "كانت السلطانية مليئة بالفاكهة."],
    "Lexin004532": ["Bunkern skyddade mot bomber.", "وفر الملجأ حماية من القنابل."],
    "Lexin004534": ["Bunten med papper var tung.", "كانت حزمة الأوراق ثقيلة."],
    "Lexin004545": ["Burspråket gav utsikt över gatan.", "أعطت الشرفة إطلالة على الشارع."],
    "Lexin004547": ["Bus och lek hör ihop.", "الشغب واللعب يسيران معاً."],
    "Lexin004549": ["Busen störde de andra.", "أزعج المشاكس الآخرين."],
    "Lexin004550": ["Bushen var svår att ta sig genom.", "كان الحرج صعب الاختراق."],
    "Lexin004552": ["Business är hennes område.", "الأعمال مجالها."],
    "Lexin004554": ["Buskaget gömde kaninen.", "أخفت الشجيرات الأرنب."],
    "Lexin004556": ["Buskis är enkelt roligt.", "المسرح الكوميدي بسيط ومضحك."],
    "Lexin004571": ["En by slog mot ansiktet.", "ضربت ريح الوجه."],
    "Lexin004574": ["Bygeln på väskan gick sönder.", "انكسر خطاف الحقيبة."],
    "Lexin004584": ["Bygget pågick i ett år.", "استمر مشروع البناء سنة."],
    "Lexin004596": ["Bygglov krävs för tillbyggnad.", "يُطلب ترخيص البناء للتوسعة."],
    "Lexin004601": ["Byggmästaren övervakade arbetet.", "أشرف مقاول البناء على العمل."],
    "Lexin004608": ["Byggnadsförbud gäller i området.", "يسري منع البناء في المنطقة."],
    "Lexin004613": ["Byggnadsnämnden godkände planen.", "وافقت لجنة الإعمار على الخطة."],
    "Lexin004618": ["Byggnationen startade i april.", "بدأ البناء في أبريل."],
    "Lexin004631": ["Bylingen patrullerade gatan.", "جاب الشرطي الشارع."],
    "Lexin004633": ["Byltet innehöll kläder.", "احتوت الصرة على ملابس."],
    "Lexin004637": ["Byrackan var en trevlig hund.", "كان الكلب الهجين لطيفاً."],
    "Lexin004639": ["Byrån hanterade ärenden.", "تولى المكتب القضايا."],
    "Lexin004643": ["Hennes byst var vacker.", "كان صدرها جميلاً."],
    "Lexin004646": ["En byte består av 8 bitar.", "يتكون البايت من 8 بتات."],
    "Lexin004649": ["Bytesbalansen var positiv.", "كان الميزان التجاري إيجابياً."],
    "Lexin004650": ["Bytesrätten gäller i 30 dagar.", "يسري حق التبديل 30 يوماً."],
    "Lexin004651": ["Byxan var för lång.", "كان السروال طويلاً جداً."],
    "Lexin004656": ["Det var bara båg.", "كان مجرد غش."],
    "Lexin004661": ["Bågfilen sågar metall.", "يقطع منشار المعادن الحديد."],
    "Lexin004665": ["Bålen var muskulös.", "كان البدن عضلياً."],
    "Lexin004666": ["Bålen blandades på festen.", "خُلط مزيج المشروبات في الحفلة."],
    "Lexin004671": ["Bålverket skyddade staden.", "حمت المنشأة الدفاعية المدينة."],
    "Lexin004673": ["Det hördes ett bång.", "سُمع ضجيج."],
    "Lexin004675": ["Båren bar den skadade.", "حملت النقالة المصاب."],
    "Lexin004676": ["Bården prydde gardinen.", "زينت الحافة الستارة."],
    "Lexin004677": ["Bårhuset förvarade liken.", "حفظ مستودع الجثث الموتى."],
    "Lexin004679": ["Kon stod i sitt bås.", "وقفت البقرة في زريبتها."],
    "Lexin004681": ["Båtplatsen var intill bryggan.", "كان مرفأ القارب بجانب الرصيف."],
    "Lexin004682": ["Båtsmannen ledde besättningen.", "قاد عريف الملاحين الطاقم."],
    "Lexin004685": ["Bäckenet stöder ryggraden.", "يدعم الحوض العمود الفقري."],
    "Lexin004686": ["Bäckenet användes på sjukhuset.", "استُخدم الوعاء في المستشفى."],
    "Lexin004694": ["Bädden var mjuk och bekväm.", "كان السرير ناعماً ومريحاً."],
    "Lexin004696": ["Bägaren var fylld med vin.", "كانت الكأس مملوءة بالنبيذ."],
    "Lexin004698": ["Bälgen på kameran var trasig.", "كان الجزء الممتد للكاميرا تالفاً."],
    "Lexin004713": ["Bäraren bar kofferten.", "حمل الحامل الحقيبة."],
    "Lexin004714": ["Den bärbara datorn är lätt.", "الكمبيوتر المحمول خفيف."],
    "Lexin004718": ["Bärgningen av bilen tog en timme.", "استغرق سحب السيارة ساعة."],
    "Lexin004719": ["Bärgningsbilen kom snabbt.", "جاءت سيارة القطر بسرعة."],
    "Lexin004720": ["Brons bärighet testades.", "اختُبرت قدرة تحميل الجسر."],
    "Lexin004721": ["Projektets bärighet var osäker.", "كانت جدوى المشروع غير مؤكدة."],
    "Lexin004734": ["Bärnstenen var vacker.", "كان الكهرمان جميلاً."],
    "Lexin004736": ["Vi drack en bärs på puben.", "شربنا بيرة في الحانة."],
    "Lexin004741": ["Hon är min bästis.", "هي صديقتي الحميمة."],
    "Lexin004742": ["Boken blev en bästsäljare.", "أصبح الكتاب الأكثر مبيعاً."],
    "Lexin004745": ["Bättring kom efter medicinen.", "جاء التحسن بعد الدواء."],
    "Lexin004748": ["Bävern byggde en damm.", "بنى القندس سداً."],
    "Lexin004749": ["Böckling serveras till frukost.", "تُقدم الرنكة المدخنة للفطور."],
    "Lexin004750": ["Bödeln utförde domen.", "نفذ الجلاد الحكم."],
    "Lexin004754": ["Hans böjelse för musik var stark.", "كانت رغبته في الموسيقى قوية."],
    "Lexin004759": ["Böjningen på röret var skarp.", "كان انحناء الأنبوب حاداً."],
    "Lexin004760": ["Verbets böjning varierar.", "يتنوع تصريف الفعل."],
    "Lexin004766": ["Bölden måste öppnas.", "يجب فتح الدمل."],
    "Lexin004770": ["Bönan är en bra proteinkälla.", "الفاصوليا مصدر جيد للبروتين."],
    "Lexin004771": ["Bönan gick på promenad.", "ذهبت الفتاة في نزهة."],
    "Lexin004775": ["Bönhuset samlade troende.", "جمعت الكنيسة الصغيرة المؤمنين."],
    "Lexin004779": ["Hans börd var adlig.", "كان أصله نبيلاً."]
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

const backupPath = DATA_FILE + '.backup_nouns10_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Done! Added examples to ${updated} nouns. Total: 1000 nouns with examples!`);
