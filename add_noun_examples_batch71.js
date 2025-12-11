/**
 * Add examples to nouns - Batch 71 (100 nouns: Svengelska to Såpbubbla)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin027192": ["Han pratar svengelska.", "يتحدث السويدية الإنجليزية."],
    "Lexin027193": ["Ordna en svensexa.", "ينظم حفل العريس."],
    "Lexin027195": ["En typisk svensk.", "سويدي نموذجي."],
    "Lexin027197": ["Studera svenska.", "يدرس اللغة السويدية."],
    "Lexin027198": ["Gift med en svenska.", "متزوج من سويدية."],
    "Lexin027204": ["Ett svep med armen.", "حركة لف بالذراع."],
    "Lexin027209": ["Svepning av liket.", "تكفين الجثة."],
    "Lexin027210": [" Vit svepning.", "قماش تكفين أبيض."],
    "Lexin027211": ["Bara ett svepskäl.", "مجرد حجة."],
    "Lexin027223": ["Lukta svett.", "رائحته عرق."],
    "Lexin027231": ["Svikt i steget.", "مرونة في الخطوة."],
    "Lexin027237": ["Kasta pärlor för svin.", "يلقي الجواهر أمام الخنازير."],
    "Lexin027240": ["Dömd för svindel.", "مدان بالاحتيال."],
    "Lexin027246": ["I full sving.", "في كامل الأرجحة / العمل جار على قدم وساق."], // Idiom
    "Lexin027250": ["Stort svinn.", "انخفاض كبير في الحجم."],
    "Lexin027251": ["Din svinpäls!", "أيها الخنزير!"],
    "Lexin027252": ["En svit av händelser.", "سلسلة أحداث."],
    "Lexin027254": ["Bo i en svit.", "يقيم في جناح."],
    "Lexin027256": ["Använda en svordom.", "يستخدم شتيمة."],
    "Lexin027261": ["Godartad svulst.", "ورم حميد."],
    "Lexin027269": ["Hälsa på sin svåger.", "يزور نسيبه."],
    "Lexin027271": ["Det råder svågerpolitik.", "تسود سياسة المحسوبية."],
    "Lexin027272": ["Stekt svål.", "شحم خنزير مقلي."],
    "Lexin027273": ["Dra åt svångremmen.", "يشد الحزام (يقتصد)."],
    "Lexin027281": ["Känna svårmod.", "يشعر بالكآبة."],
    "Lexin027283": ["Min svägerska.", "أخت زوجي/زوجتي."],
    "Lexin027299": ["Ta sig en svängom.", "يرقص."],
    "Lexin027303": ["Dra sitt svärd.", "يستل سيفه."],
    "Lexin027304": ["Kär svärdotter.", "زوجة ابن محبوبة."],
    "Lexin027305": ["Gammal svärfar.", "حمٌ عجوز."],
    "Lexin027306": ["Besöka svärföräldrar.", "يزور الحموين."],
    "Lexin027308": ["En svärm bin.", "سرب من النحل."],
    "Lexin027311": ["Snäll svärmor.", "حماة طيبة."],
    "Lexin027312": ["Inga svärord!", "بدون شتائم!"],
    "Lexin027313": ["Min svärson.", "زوج ابنتي."],
    "Lexin027314": ["Nattens svärta.", "سواد الليل."],
    "Lexin027318": ["Åka svävare.", "يركب الحوامة."],
    "Lexin027320": ["Köpa sybehör.", "يشتري أدوات الخياطة."],
    "Lexin027321": ["Vind från syd.", "رياح من الجنوب."],
    "Lexin027325": ["Han är sydlänning.", "هو جنوبي."],
    "Lexin027326": ["Ta på sig sydväst.", "يرتدي قبعة صادّة للمطر."],
    "Lexin027327": ["Smittas av syfilis.", "يصاب بمرض الزهري."],
    "Lexin027331": ["Syftning i texten.", "قصد في النص."],
    "Lexin027332": ["Vass syl.", "مخرز حاد."],
    "Lexin027334": ["Göra sylta.", "يصنع لحماً مقطعاً بالمرق الجامد."],
    "Lexin027335": ["Äta på en sylta.", "يأكل في مطعم متواضع."],
    "Lexin027337": ["Sy på symaskin.", "يخيط على ماكينة خياطة."],
    "Lexin027338": ["Leva i symbios.", "يعيش في تكافل."],
    "Lexin027344": ["Spela en symfoni.", "يعزف سيمفونية."],
    "Lexin027345": ["Dirigera en symfoniorkester.", "يقود أوركسترا سيمفونية."],
    "Lexin027350": ["Gå ut i sympatistrejk.", "يضرب تضامنياً."],
    "Lexin027351": ["Partiets sympatisör.", "مؤيد للحزب."],
    "Lexin027353": ["Hålla ett symposium.", "يعقد مؤتمراً علمياً."],
    "Lexin027362": ["Besöka en synagoga.", "يزور كنيساً."],
    "Lexin027367": ["Remitteras till syncentral.", "يُحال لعيادة أمراض ضعف البصر."],
    "Lexin027371": ["Det var synd.", "هذا مؤسف (حسرة)."],
    "Lexin027372": ["Bli syndabock.", "يصبح كبش فداء."],
    "Lexin027373": ["Han är syndikalist.", "هو نقابي."],
    "Lexin027374": ["Ett internationellt syndikat.", "نقة شركات دولية."],
    "Lexin027375": ["Ett sällsynt syndrom.", "متلازمة نادرة."],
    "Lexin027376": ["Se i syne.", "يتخيل."],
    "Lexin027378": ["Inom synfältet.", "داخل مجال الرؤية."],
    "Lexin027382": ["Utom synhåll.", "خارج مرمى البصر."],
    "Lexin027387": ["I synnerhet sommar.", "بصورة خاصة الصيف."],
    "Lexin027394": ["Kyrklig synod.", "مجمع كنسي."],
    "Lexin027396": ["Hitta en synonym.", "يجد مرادفاً."],
    "Lexin027401": ["Hjälp för synskadad.", "مساعدة للمصاب ببصره."],
    "Lexin027403": ["Testa synskärpa.", "يفحص حدة النظر."],
    "Lexin027404": ["Nytt synsätt.", "مفهوم جديد."],
    "Lexin027405": ["Spela på en synt.", "يعزف على السنثيسايزر."],
    "Lexin027406": ["Korrekt syntax.", "بناء جملة صحيح."],
    "Lexin027407": ["En kemisk syntes.", "تركيب كيميائي."],
    "Lexin027411": ["Köpa en synthesizer.", "يشتري سنثيسايزر."],
    "Lexin027413": ["Det var en synvilla.", "كان خداع بصر."],
    "Lexin027414": ["Ur min synvinkel.", "من وجهة نظري."],
    "Lexin027415": ["Trä en synål.", "يلضم إبرة خياطة."],
    "Lexin027417": ["Tala med syo-funktionär.", "يتحدث مع مسؤول التوجيه الدراسي."],
    "Lexin027421": ["Stark syra.", "حامض قوي."],
    "Lexin027424": ["Andas syre.", "يتنفس الأوكسجين."],
    "Lexin027426": ["Syren doftar.", "تفوح رائحة الليلك."],
    "Lexin027432": ["Han är syrier.", "هو سوري."],
    "Lexin027435": ["Min lilla syrra.", "أختي الصغيرة."],
    "Lexin027436": ["Syrsa spelar.", "يغني صرار الليل."],
    "Lexin027437": ["Mina syskon.", "إخوتي وأخواتي."],
    "Lexin027439": ["Arbeta med syskongrupp.", "يعمل مع مجموعة أطفال بأعمار مختلفة."],
    "Lexin027445": ["Min syssling.", "ابن عمي (من الدرجة الثانية)."],
    "Lexin027451": ["Gå till systembutik.", "يذهب لمحل بيع المشروبات الكحولية."],
    "Lexin027453": ["Duktig systemerare.", "مهندس أنظمة ماهر."],
    "Lexin027457": ["Jobba som systemman.", "يعمل كمهندس أنظمة."],
    "Lexin027459": ["Syster Anna.", "الممرضة آنا."], // Or "Min syster" -> "أختي". Context "sjuksköterska" -> "ممرضة".
    "Lexin027460": ["Fartygets systerfartyg.", "السفينة المماثلة للسفينة."],
    "Lexin027465": ["Starta en systuga.", "يبدأ كوخ خياطة."],
    "Lexin027475": ["Tidig sådd.", "بذر مبكر."],
    "Lexin027484": ["Sopa upp sågspån.", "يكنس نشارة الخشب."],
    "Lexin027485": ["Jobba på sågverk.", "يعمل في منجرة."],
    "Lexin027489": ["Hälla genom såll.", "يسكب عبر المنخل."],
    "Lexin027497": ["Känd sångare.", "مغن مشهور."],
    "Lexin027498": ["Operasångerska.", "مغنية أوبرا."],
    "Lexin027499": ["Sjunga i sångkör.", "يغني في الكورس."],
    "Lexin027502": ["Blåsa såpbubbla.", "ينفخ فقاعة صابون."]
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

const backupPath = DATA_FILE + '.backup_nouns71_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Batch 71 completed!`);
