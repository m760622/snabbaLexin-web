/**
 * Add examples to nouns - Batch 48 (100 nouns: Nådastöt to Onani)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin018960": ["Nådastöten gavs.", "أُعطيت الطعنة القاضية."],
    "Lexin018974": ["Nålsögat syntes.", "ظهر سم الخياط."],
    "Lexin018984": ["Näbben var skarp.", "كان المنقار حاداً."],
    "Lexin018987": ["Näckrosen blommade.", "أزهر زنبق الماء."],
    "Lexin018988": ["Näktergalen sjöng.", "غنى العندليب."],
    "Lexin018992": ["Nämnden beslutade.", "قررت اللجنة."],
    "Lexin018993": ["Nämndemannen dömde.", "حكم المحلف."],
    "Lexin019013": ["Närbilden togs.", "التُقطت صورة المحيا."],
    "Lexin019016": ["Näring behövdes.", "احتُيج إلى الغذاء."],
    "Lexin019017": ["Näringen växte.", "نما النشاط التجاري."],
    "Lexin019023": ["Näringshjälp gavs.", "أُعطيت المساعدة التجارية."],
    "Lexin019025": ["Näringslivet utvecklades.", "تطور القطاع التجاري والصناعي."],
    "Lexin019026": ["Näringstillstånd krävdes.", "طُلب تصريح ممارسة نشاط تجاري."],
    "Lexin019046": ["Närvaro registrerades.", "سُجل الحضور."],
    "Lexin019047": ["Näset besöktes.", "زُير البرزخ."],
    "Lexin019052": ["Näsborren rensades.", "نُظفت فتحة الأنف."],
    "Lexin019053": ["Näsbränna gavs.", "أُعطي التوبيخ."],
    "Lexin019055": ["Näsduken användes.", "استُخدم المنديل."],
    "Lexin019059": ["Nässlan stack.", "لسع القراص."],
    "Lexin019065": ["Nästet byggdes.", "بُني العش."],
    "Lexin019069": ["Nätet användes.", "استُخدمت الشبكة."],
    "Lexin019073": ["Näthinnan undersöktes.", "فُحصت شبكية العين."],
    "Lexin019081": ["Nätvett krävs.", "يُطلب قواعد الإنترنت الخلقية."],
    "Lexin019086": ["Nödbromsen drogs.", "سُحبت الفرامل الاضطرارية."],
    "Lexin019088": ["I nödfall ring!", "في الحالات الاضطرارية اتصل!"],
    "Lexin019095": ["Nödläge rådde.", "ساد الوضع الاضطراري."],
    "Lexin019101": ["Nödsändaren aktiverades.", "فُعل مرسل إشارات طلب العون."],
    "Lexin019114": ["Nöjesfältet besöktes.", "زُيرت مدينة الملاهي."],
    "Lexin019115": ["Nöjeslivet var livligt.", "كانت الحياة الترفيهية نشطة."],
    "Lexin019119": ["Nöten knäcktes.", "كُسر اللوز."],
    "Lexin019122": ["Nötknäckaren användes.", "استُخدمت كسارة الجوز."],
    "Lexin019124": ["Nötskalet kastades.", "رُميت قشرة اللوز."],
    "Lexin019137": ["Oasen besöktes.", "زُيرت الواحة."],
    "Lexin019145": ["Ob-tillägget betalades.", "دُفع تعويض العمل في أوقات غير مريحة."],
    "Lexin019152": ["Obduktionen gjordes.", "أُجري التشريح."],
    "Lexin019173": ["Obelisken stod.", "وقفت المسلة."],
    "Lexin019184": ["Han var på obestånd.", "كان معسراً."],
    "Lexin019196": ["Objektet såldes.", "بيعت السلعة."],
    "Lexin019197": ["Objektet identifierades.", "حُدد المفعول به."],
    "Lexin019201": ["Objektivet byttes.", "بُدلت العدسة."],
    "Lexin019206": ["Oblaten delades ut.", "وُزعت القربانة."],
    "Lexin019208": ["Obligationen köptes.", "اشتُري السند."],
    "Lexin019225": ["Observatoriet besöktes.", "زُير المرصد."],
    "Lexin019226": ["Observatören noterade.", "لاحظ المراقب."],
    "Lexin019230": ["Obstruktion pågick.", "استمرت الإعاقة."],
    "Lexin019232": ["Obygden besöktes.", "زُيرت القفر."],
    "Lexin019240": ["Ocker är förbjudet.", "الربا الفاحش محرم."],
    "Lexin019248": ["Ockupanten greps.", "اعتُقل المحتل."],
    "Lexin019255": ["Odjuret dödades.", "قُتل الوحش."],
    "Lexin019257": ["Odlingen pågick.", "استمرت الزراعة."],
    "Lexin019262": ["Odulingen jobbade inte.", "لم يعمل الشخص غير الكفء."],
    "Lexin019263": ["Odågan var lat.", "كان الخامل كسولاً."],
    "Lexin019269": ["Oegentligheten avslöjades.", "اكتُشف الاحتيال."],
    "Lexin019302": ["Offentlighetsprincipen gäller.", "تسري قاعدة العلنية."],
    "Lexin019314": ["Offret gavs.", "أُعطيت التضحية."],
    "Lexin019319": ["Officeren kommenderade.", "أمر الضابط."],
    "Lexin019320": ["Officeraren talade.", "تحدث الضابط."],
    "Lexin019325": ["Offset användes.", "استُخدم التسلل."],
    "Lexin019327": ["Offside dömdes.", "حُكم التسلل."],
    "Lexin019328": ["Ofog begicks.", "ارتُكب الأذى."],
    "Lexin019392": ["Ohm mättes.", "قيس الأوم."],
    "Lexin019396": ["Ohyra bekämpades.", "كوفحت الهوام."],
    "Lexin019417": ["Oket lyftes.", "رُفع العبء."],
    "Lexin019429": ["Oktanvärdet mättes.", "قيست القيمة الأوكتينية."],
    "Lexin019430": ["Oktaven spelades.", "عُزف الثماني."],
    "Lexin019431": ["Oktober är kall.", "أكتوبر بارد."],
    "Lexin019437": ["Okvädingsord sades.", "قيلت الشتائم."],
    "Lexin019438": ["Okynne begicks.", "ارتُكب الأذى."],
    "Lexin019442": ["Det var i olag.", "كان معطلاً."],
    "Lexin019454": ["Olater visades.", "أُظهرت العادات السيئة."],
    "Lexin019461": ["Oliven åts.", "أُكل الزيتون."],
    "Lexin019464": ["Oljebältet spreds.", "انتشر الحزام الزيتي."],
    "Lexin019467": ["Oljeplattformen användes.", "استُخدمت المنصة البحرية."],
    "Lexin019468": ["Oljud störde.", "أزعجت الضوضاء."],
    "Lexin019469": ["Olle bars.", "ارتُدي البلوفر الصوفي."],
    "Lexin019470": ["Ollonet föll.", "سقط البلوط."],
    "Lexin019471": ["Ollonet undersöktes.", "فُحصت الحشفة."],
    "Lexin019501": ["Olycksbarnet drabbades.", "أُصيب النحس."],
    "Lexin019506": ["Olycksfågeln kraschade.", "تحطم سيء الطالع."],
    "Lexin019508": ["Olyckskorporen varnade.", "حذر المتشائم."],
    "Lexin019510": ["Olympiaden hölls.", "أُقيمت الأولمبياد."],
    "Lexin019533": ["Ombrytningen gjordes.", "أُجري التقسيم."],
    "Lexin019538": ["Ombudsmannen hjälpte.", "ساعد الممثل المنتدب."],
    "Lexin019540": ["Ombyggnaden pågick.", "استمر الترميم."],
    "Lexin019558": ["Omeletten stektes.", "قُليت العجة."],
    "Lexin019588": ["Omklädningsrummet användes.", "استُخدمت غرفة تغيير الملابس."],
    "Lexin019590": ["Omkostnaden betalades.", "دُفعت الكلفة."],
    "Lexin019598": ["Omkvädet sjöngs.", "غُنيت اللازمة."],
    "Lexin019599": ["Omkörningen gjordes.", "أُجري التخطي."],
    "Lexin019601": ["Omläggningen skedde.", "حدث التغيير."],
    "Lexin019602": ["Omläggningen gjordes.", "أُجري التضميد."],
    "Lexin019631": ["Omslaget designades.", "صُمم الغلاق."],
    "Lexin019633": ["Omsorg visades.", "أُظهرت الرعاية."],
    "Lexin019636": ["Omsorgsnämnden beslutade.", "قررت لجنة رعاية المتخلفين عقلياً."],
    "Lexin019638": ["Omspel krävdes.", "طُلبت المباراة الجديدة الحاسمة."],
    "Lexin019640": ["Omställningen pågick.", "استمر التكييف."],
    "Lexin019647": ["Utan omsvep talade han.", "تحدث بلا مواربة."],
    "Lexin019668": ["Omvårdnad gavs.", "أُعطيت الرعاية."],
    "Lexin019673": ["Omvänt snedstreck användes.", "استُخدمت علامة الفصل المعكوسة."],
    "Lexin019691": ["Onani är privat.", "الاستمناء خاص."]
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

const backupPath = DATA_FILE + '.backup_nouns48_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Done! Added examples to ${updated} nouns. Total: 4800 nouns!`);
