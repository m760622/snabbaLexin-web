/**
 * Add examples to nouns - Batch 46 (100 nouns: Mustasch to Naturvård)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin018233": ["Mustaschen rakades.", "حُلق الشنب."],
    "Lexin018235": ["Mutan nekades.", "رُفضت الرشوة."],
    "Lexin018242": ["Mutkolven greps.", "اعتُقل المرتشي."],
    "Lexin018244": ["Muttern skruvades.", "بُرمت الصامولة."],
    "Lexin018250": ["Myglet avslöjades.", "اكتُشف الغش."],
    "Lexin018252": ["Mygg flög.", "طار البعوض."],
    "Lexin018253": ["Myggan stack.", "لسعت البعوضة."],
    "Lexin018256": ["Myllan grävdes.", "حُفر المهاد."],
    "Lexin018257": ["Myllret syntes.", "ظهر الحشد."],
    "Lexin018262": ["Myndighet uppnåddes.", "بُلغ الرشد."],
    "Lexin018272": ["Mynningen syntes.", "ظهرت الفوهة."],
    "Lexin018273": ["Myntet användes.", "استُخدمت العملة النقدية."],
    "Lexin018274": ["Myntan doftade.", "عطر النعناع."],
    "Lexin018278": ["Myren besöktes.", "زُير المستنقع."],
    "Lexin018285": ["Mysli åts.", "أُكل الميسلي."],
    "Lexin018286": ["Mysteriet löstes.", "حُل الحدث الغامض."],
    "Lexin018298": ["På måfå valdes.", "اختُير عشوائياً."],
    "Lexin018299": ["Mågen besökte.", "زار الصهر."],
    "Lexin018306": ["Mål talades.", "نُطقت اللغة."],
    "Lexin018321": ["Målningen gjordes.", "أُجريت اللوحة الفنية."],
    "Lexin018322": ["Målningen såldes.", "بيعت اللوحة."],
    "Lexin018323": ["Målsmannen skrev under.", "وقع ولي الأمر."],
    "Lexin018327": ["Målsäganden vittnade.", "شهد المجني عليه."],
    "Lexin018332": ["Målsättningen uppnåddes.", "بُلغ الهدف."],
    "Lexin018333": ["Måltavlan träffades.", "أُصيبت لوحة الهدف."],
    "Lexin018334": ["Måltiden serverades.", "قُدمت وجبة الطعام."],
    "Lexin018339": ["Månadslönen betalades.", "دُفع المرتب الشهري."],
    "Lexin018355": ["Måsen flög.", "طار النورس."],
    "Lexin018371": ["I viss måtto!", "إلى درجة ما!"],
    "Lexin018374": ["Mäklaren sålde.", "باع السمسار."],
    "Lexin018382": ["Mängden mättes.", "قيس العدد."],
    "Lexin018401": ["Märket klistrades.", "لُصقت العلامة."],
    "Lexin018411": ["Märren sprang.", "ركضت الفرس."],
    "Lexin018412": ["Mässan firades.", "احتُفل بالقداس."],
    "Lexin018413": ["Mässan besöktes.", "زُير المعرض."],
    "Lexin018414": ["Mässing är vackert.", "النحاس الأصفر جميل."],
    "Lexin018415": ["Mässingsinstrumentet spelades.", "عُزفت الأداة الموسيقية النحاسية."],
    "Lexin018416": ["Mässling behandlades.", "عولجت الحصبة."],
    "Lexin018421": ["Mästerverket visades.", "عُرض العمل الرائع."],
    "Lexin018423": ["I mät togs det.", "صودر."],
    "Lexin018426": ["Mätaren lästes.", "قُرئ العداد."],
    "Lexin018431": ["Mätningen gjordes.", "أُجري القياس."],
    "Lexin018437": ["Mättnad kändes.", "شُعر بالشبع."],
    "Lexin018438": ["Mön gifte sig.", "تزوجت البكر."],
    "Lexin018439": ["Möbeln köptes.", "اشتُري الأثاث."],
    "Lexin018440": ["Möblemanget såldes.", "بيعت المفروشات."],
    "Lexin018444": ["Möderne träffades.", "التقى أقارب الأم."],
    "Lexin018445": ["Mödomshinnan undersöktes.", "فُحص غشاء البكارة."],
    "Lexin018451": ["Mödraundervisning gavs.", "أُعطي تعليم الأمهات."],
    "Lexin018452": ["Mödravårdscentralen besöktes.", "زُير مركز رعاية الأمومة."],
    "Lexin018454": ["Mögel växte.", "نما العفن."],
    "Lexin018460": ["Möhippan hölls.", "أُقيمت حفلة صديقات العروس."],
    "Lexin018466": ["Mönstret syddes.", "خُيط النمط."],
    "Lexin018480": ["Mördaren greps.", "اعتُقل القاتل."],
    "Lexin018481": ["Mördegen bakades.", "خُبزت عجينة الزبدة."],
    "Lexin018486": ["Mörkhyad är beskrivande.", "أسمر البشرة وصفي."],
    "Lexin018491": ["Mörten fångades.", "صيد البرعان الأشقر."],
    "Lexin018507": ["Nacken smärtade.", "آلم العنق."],
    "Lexin018509": ["Nackspärr drabbade.", "أصاب الشد العضلي في الرقبة."],
    "Lexin018511": ["I ett nafs såg jag.", "في لمحة بصر رأيت."],
    "Lexin018513": ["Nageln klipptes.", "قُصّ الظفر."],
    "Lexin018525": ["Nallen kramades.", "عُونق الدب الصغير."],
    "Lexin018527": ["Namnet skrevs.", "كُتب الاسم."],
    "Lexin018529": ["Namnen träffades.", "التقى السميان."],
    "Lexin018530": ["Namninsamlingen pågick.", "استمر تجميع الأسماء."],
    "Lexin018533": ["Namnsdagen firades.", "احتُفل بيوم الاسم."],
    "Lexin018534": ["Namnteckningen skrevs.", "كُتب التوقيع."],
    "Lexin018535": ["Napalm användes.", "استُخدم النابالم."],
    "Lexin018536": ["Nappen gavs.", "أُعطيت المصاصة."],
    "Lexin018537": ["Nappen sattes på.", "وُضعت حلمة الرضاعة."],
    "Lexin018538": ["Napp ficks.", "حدثت عضة السنارة."],
    "Lexin018539": ["Nappa användes.", "استُخدمت الشمواه."],
    "Lexin018543": ["Narkomanen hjälptes.", "ساعد مدمن المخدرات."],
    "Lexin018544": ["Narkomani behandlades.", "عولج إدمان المخدرات."],
    "Lexin018545": ["Narkos gavs.", "أُعطي البنج."],
    "Lexin018547": ["Narkotika är olagligt.", "المخدرات غير قانونية."],
    "Lexin018552": ["Narren skämtade.", "مزح المهرج."],
    "Lexin018555": ["Nassen grymtade.", "تغرغر الخنزير."],
    "Lexin018560": ["Nationalförsamlingen röstade.", "صوت المجلس الوطني."],
    "Lexin018562": ["Nationalism diskuterades.", "نوقشت القومية."],
    "Lexin018564": ["Nationalisten kämpade.", "قاتل القومي."],
    "Lexin018567": ["Nationalparken besöktes.", "زُيرت المحمية الوطنية."],
    "Lexin018568": ["Nationalsången sjöngs.", "غُني النشيد القومي."],
    "Lexin018579": ["Nativiteten mättes.", "قيست نسبة الخصوبة."],
    "Lexin018585": ["Nattduksbordet stod.", "وقف الكومودينو."],
    "Lexin018587": ["Nattklubben besöktes.", "زُير الملهى الليلي."],
    "Lexin018588": ["I nattkröken kom de.", "جاءوا ليلاً."],
    "Lexin018591": ["Nattlinnet bars.", "ارتُدي قميص النوم النسائي."],
    "Lexin018592": ["Nattmanglingen pågick.", "استمرت المفاوضات الليلية."],
    "Lexin018593": ["Nattmössan sattes på.", "وُضعت قلنسوة النوم."],
    "Lexin018594": ["Nattskjortan bars.", "ارتُدي قميص النوم الرجالي."],
    "Lexin018595": ["Nattvarden firades.", "احتُفل بسر القربان المقدس."],
    "Lexin018600": ["Naturaförmån gavs.", "أُعطيت المزايا غير النقدية."],
    "Lexin018601": ["Naturalisation skedde.", "حدثت المحايدة."],
    "Lexin018603": ["Naturbarnet lekte.", "لعب الشخص العفوي."],
    "Lexin018606": ["Naturkatastrofen drabbade.", "أصابت الكارثة الطبيعية."],
    "Lexin018607": ["Naturkunskap lärdes.", "تُعلمت العلوم الطبيعية."],
    "Lexin018615": ["Naturmedel användes.", "استُخدمت الأعشاب الطبية."],
    "Lexin018621": ["Naturvetenskap studerades.", "دُرست العلوم الطبيعية."],
    "Lexin018622": ["Naturvård praktiserades.", "مورست رعاية الطبيعة."]
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

const backupPath = DATA_FILE + '.backup_nouns46_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Done! Added examples to ${updated} nouns. Total: 4600 nouns!`);
