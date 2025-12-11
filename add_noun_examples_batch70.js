/**
 * Add examples to nouns - Batch 70 (100 nouns: Ståndpunkt to Svendom)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin026793": ["Ha en ståndpunkt.", "لديه وجهة نظر."],
    "Lexin026796": ["Hålla i en stång.", "يمسك بقضيب."],
    "Lexin026798": ["Hålla någon stången.", "يقاوم شخصاً."],
    "Lexin026810": ["Kunglig ståt.", "أبهة ملكية."],
    "Lexin026814": ["Städ användes.", "استُخدم السنديان."],
    "Lexin026821": ["Städerska städade.", "نظفت عاملة النظافة."],
    "Lexin026826": ["Ställa in i städskåp.", "يضع في خزانة معدات التنظيف."],
    "Lexin026827": ["Sätta cykeln i ställ.", "يضع الدراجة في الحامل."],
    "Lexin026831": ["Ett trevligt ställe.", "مكان لطيف."],
    "Lexin026849": ["Han var ställföreträdare.", "كان ممثلاً."],
    "Lexin026858": ["Bygga en ställning.", "يبني سقالة."],
    "Lexin026860": ["Det blev ställningskrig.", "أصبحت حرب استنزاف."],
    "Lexin026861": ["Göra ett ställningstagande.", "يتخذ قراراً."],
    "Lexin026864": ["Slitna stämband.", "حبال صوتية مجهدة."],
    "Lexin026866": ["Stämgaffel ljöd.", "رنت الشوكة الرنانة."],
    "Lexin026867": ["Vasst stämjärn.", "مسحاج حاد."],
    "Lexin026870": ["Sjunga en stämma.", "يغني طبقة صوتية."],
    "Lexin026871": ["Delta i en stämma.", "يشارك في اجتماع."],
    "Lexin026881": ["Skicka in en stämning.", "يرسل أمر بالمثول أمام المحكمة."],
    "Lexin026891": ["Betala stämpelskatt.", "يدفع ضريبة الطابع."],
    "Lexin026893": ["Stämpla i stämpelur.", "يختم في ساعة الدوام."],
    "Lexin026909": ["Högt stängsel.", "سياج عال."],
    "Lexin026913": ["Rostig stänkskärm.", "جناح سيارة صدئ."],
    "Lexin026915": ["Innehåller stärkelse.", "يحتوي على النشاء."],
    "Lexin026918": ["Båtens stäv.", "كوثر السفينة."],
    "Lexin026931": ["Bo i stödområde.", "يسكن في منطقة دعم حكومي."],
    "Lexin026934": ["Få stödundervisning.", "يتلقى تدريس تقوية."],
    "Lexin026935": ["Julstök.", "تحضيرات عيد الميلاد."],
    "Lexin026941": ["Ett stön hördes.", "سُمع تأوه."],
    "Lexin026944": ["Det gick i stöpet.", "فشل."], // Idiom
    "Lexin026946": ["Komma i sötpsleven.", "يتشكل من جديد."], // Idiom "stöpsleven"
    "Lexin026947": ["Sätta upp en stör.", "ينصب وتداً."],
    "Lexin026948": ["Fånga en stör.", "يصطاد سمكة الحفش."],
    "Lexin026953": ["Radio med störning.", "راديو فيه تشويش."],
    "Lexin026961": ["Ha störthjälm på sig.", "يرتدي خوذة واقية."],
    "Lexin026962": ["Åka störtlopp.", "يتزلج في سباق الانحدار."],
    "Lexin026964": ["Göra en stöt.", "يقوم باسطو."],
    "Lexin026973": ["Det blev en stötesten.", "أصبح عقبة."],
    "Lexin026974": ["Bucklig stötfångare.", "دعامية معوجة."],
    "Lexin026978": ["Sätta dit en stötta.", "يضع دعامة."],
    "Lexin026982": ["En gummistövel.", "جزمة مطاطية."],
    "Lexin026984": ["Satsens subjekt.", "فاعل الجملة."],
    "Lexin026989": ["Tillhöra en subkultur.", "ينتمي لثقافة مختلفة."],
    "Lexin027000": ["Böja ett substantiv.", "يصرف اسماً."],
    "Lexin027001": ["Ett bra substitut.", "بديل جيد."],
    "Lexin027005": ["Få subvention.", "يحصل على إعانة مالية."],
    "Lexin027010": ["Succession av kungar.", "تعاقب الملوك."],
    "Lexin027017": ["En sudd papper.", "حشوة ورق."],
    "Lexin027018": ["Använda sudd.", "يستخدم الممحاة."],
    "Lexin027019": ["Vara på sudd.", "يسهر ويلهو."],
    "Lexin027024": ["Ord med suffix.", "كلمة بلاحقة."],
    "Lexin027025": ["Sufflé sjönk ihop.", "هبط السوفليه."],
    "Lexin027026": ["Sufflör viskade.", "همس الملقن."],
    "Lexin027028": ["Ett sug i magen.", "شعور بالامتصاص في المعدة."], // Idiom-ish
    "Lexin027031": ["Vara sugen på mat.", "يشتهي الطعام."],
    "Lexin027035": ["Stor sugga.", "خنزيرة كبيرة."],
    "Lexin027037": ["Genom suggestion.", "عن طريق الإيحاء."],
    "Lexin027041": ["Dricka med sugrör.", "يشرب بالشاروقة."],
    "Lexin027044": ["Sliten sula.", "نعل مهترئ."],
    "Lexin027045": ["Behandlas med sulfa.", "يُعالج بالسلفا."],
    "Lexin027046": ["Häst och sulky.", "حصان وعربة الصلكية."],
    "Lexin027054": ["Summer lät.", "رن الطنان."],
    "Lexin027057": ["Kaffe med sump.", "قهوة مع تفل."],
    "Lexin027058": ["Fastna i en sump.", "يعلق في مستنقع."],
    "Lexin027060": ["Gå på sumpmark.", "يمشي على أرض سبخة."],
    "Lexin027062": ["Segla genom sundet.", "يبحر عبر المضيق."],
    "Lexin027064": ["Ta en sup.", "يأخذ رشفة كحول."],
    "Lexin027065": ["Äta supé.", "يتناول العشاء."],
    "Lexin027070": ["I superlativ.", "في صيغة التفضيل العليا."],
    "Lexin027071": ["Verbet i supinum.", "الفعل في اسم المفعول (supinum)."],
    "Lexin027073": ["En hängiven supporter.", "مشجع مخلص."],
    "Lexin027076": ["Han blev suput.", "أصبح مدمناً."],
    "Lexin027086": ["Vaxa surfingbräda.", "يشمع لوح التزلج."],
    "Lexin027090": ["Vilken surpuppa.", "يا له من حانق."],
    "Lexin027091": ["Ett svagt surr.", "أزيز خافت."],
    "Lexin027099": ["Äta surströmming.", "يأكل السردين المتخمر."],
    "Lexin027103": ["Det gjorde susen.", "كان هذا حاسماً / نجح الأمر."],
    "Lexin027112": ["En svada av ord.", "وابل من الكلام."],
    "Lexin027123": ["Ställa maten i svalen.", "يضع الطعام في خزانة الأطعمة."],
    "Lexin027124": ["Svala flög.", "تار السنونو."],
    "Lexin027126": ["Stå i svalen.", "يقف في الكوخ الأولي (المدخل)."],
    "Lexin027127": ["Ont i svalget.", "ألم في الحلق."],
    "Lexin027132": ["Gå i svalgången.", "يمشي في الرواق."],
    "Lexin027133": ["Söka svalka.", "يبحث عن البرودة اللطيفة."],
    "Lexin027135": ["Havets svall.", "جيشان البحر."],
    "Lexin027142": ["Bara massa svammel.", "مجرد هذيان."],
    "Lexin027144": ["Tvätta med svamp.", "يغسل بالإسفنج."],
    "Lexin027150": ["Hans svanesång.", "وداعه للحياة (عمله الأخير)."],
    "Lexin027151": ["Svank i ryggen.", "توس في الظهر."],
    "Lexin027152": ["Vifta på svansen.", "يهز ذنبه."],
    "Lexin027157": ["Förhöra svarande.", "يستجوب المدعى عليه."],
    "Lexin027162": ["Avge svaromål.", "يقدم دفاعاً."],
    "Lexin027164": ["Gå i svars för.", "يتحمل مسؤولية."],
    "Lexin027173": ["Krydda med svartpeppar.", "يتبل بالفلفل الأسود."],
    "Lexin027175": ["Drivas av svartsjuka.", "يدفعه الغيرة."],
    "Lexin027176": ["Lida av svartsyn.", "يعاني من التشاؤم."],
    "Lexin027178": ["Arbeta vid en svarv.", "يعمل على مخرطة."],
    "Lexin027180": ["Luktar svavel.", "رائحته كبريت."],
    "Lexin027183": ["Känna sveda.", "يشعر بحرقة."],
    "Lexin027191": ["Förlora sin svendom.", "يفقد عذريته (للرجل)."]
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

const backupPath = DATA_FILE + '.backup_nouns70_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Batch 70 completed!`);
