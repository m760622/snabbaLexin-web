/**
 * Add examples to nouns - Batch 26 (100 nouns: Herrekipering to Hylsa)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin011479": ["Herrekiperingen hade kostymrea.", "كان عند محل ملابس الرجال تخفيضات."],
    "Lexin011480": ["Herrgården var vacker.", "كانت العزبة جميلة."],
    "Lexin011482": ["Hertigen närvarade.", "حضر الدوق."],
    "Lexin011493": ["Han var mitt i hetluften.", "كان في مركز الأحداث."],
    "Lexin011505": ["Hibiskusen blommade.", "أزهرت الخبيزة."],
    "Lexin011506": ["Hickan slutade inte.", "لم يتوقف الفواق."],
    "Lexin011510": ["Himlakroppen observerades.", "رُصد الجرم السماوي."],
    "Lexin011512": ["Himmelen lovades.", "وُعد بالجنة."],
    "Lexin011513": ["Hinden sprang genom skogen.", "ركضت الأيلة في الغابة."],
    "Lexin011516": ["Hindersprövningen genomfördes.", "أُجري بحث عوائق الزواج."],
    "Lexin011523": ["Hindun bad i templet.", "صلى الهندوسي في المعبد."],
    "Lexin011524": ["Hinduismen har många gudar.", "للهندوسية آلهة كثيرة."],
    "Lexin011525": ["Hingsten galopperade.", "أحضر الحصان بالركض."],
    "Lexin011552": ["Hiten spelades på radion.", "عُزفت الأغنية الناجحة في الراديو."],
    "Lexin011557": ["Hittegodset förvarades.", "حُفظت المفقودات."],
    "Lexin011559": ["Hittelönen utbetalades.", "دُفعت المكافأة."],
    "Lexin011565": ["Hjorden betade.", "رعى القطيع."],
    "Lexin011566": ["Hjorten flydde.", "هرب الأيل."],
    "Lexin011567": ["Hjortronen plockades.", "قُطف فريز السحاب."],
    "Lexin011569": ["Hjälmen skyddade huvudet.", "حمت الخوذة الرأس."],
    "Lexin011571": ["Hjälpcentralen svarade.", "أجاب مركز المساعدة."],
    "Lexin011580": ["Hjälpmedelscentralen hjälpte.", "ساعد مركز الوسائل المساعدة."],
    "Lexin011582": ["Hjälpredan var snäll.", "كان المساعد لطيفاً."],
    "Lexin011584": ["Hjälpstationen var nära.", "كان مركز المساعدة قريباً."],
    "Lexin011585": ["Hjälptelefonen användes.", "استُخدم هاتف المساعدة."],
    "Lexin011586": ["Hjälten räddade barnet.", "أنقذ البطل الطفل."],
    "Lexin011599": ["Hjärndöden konstaterades.", "أُكد توقف فعاليات الدماغ."],
    "Lexin011604": ["Hjärninfarkten behandlades.", "عولجت الذبحة الدماغية."],
    "Lexin011608": ["Hjärnskakningen krävde vila.", "تطلب ارتجاج المخ راحة."],
    "Lexin011615": ["Hjärntvätten var effektiv.", "كان غسيل الدماغ فعالاً."],
    "Lexin011630": ["Hjärter är en färg.", "ورقة القلب لون."],
    "Lexin011636": ["Hjärtinfarkten var allvarlig.", "كانت الذبحة القلبية خطيرة."],
    "Lexin011659": ["Hjässan var kal.", "كان أعلى الرأس أصلع."],
    "Lexin011666": ["Hon fylldes med vatten.", "امتلأت حاوية الماء."],
    "Lexin011667": ["Hobbyn gav avkoppling.", "وفرت الهواية استرخاء."],
    "Lexin011669": ["Hojen var röd.", "كانت الدراجة حمراء."],
    "Lexin011672": ["Holken hängdes upp.", "عُلق صندوق العش."],
    "Lexin011673": ["Holländaren cyklade.", "قاد الهولندي الدراجة."],
    "Lexin011675": ["Holmen var obebodd.", "كانت الجزيرة الصغيرة غير مأهولة."],
    "Lexin011676": ["Hologrammet var imponerande.", "كانت الصورة الثلاثية الأبعاد مثيرة."],
    "Lexin011683": ["Honan vårdade ungarna.", "رعت أنثى الحيوان الصغار."],
    "Lexin011685": ["Honnörsordet upprepades.", "تكررت كلمة الشرف."],
    "Lexin011687": ["Honoraret betalades.", "دُفعت الشرفية."],
    "Lexin011689": ["Hopen samlades.", "تجمع الحشد."],
    "Lexin011701": ["Horan arresterades.", "اعتُقلت المومس."],
    "Lexin011704": ["Hormonet reglerade kroppen.", "نظم الهرمون الجسم."],
    "Lexin011714": ["Hornet var vässat.", "كان القرن مسنوناً."],
    "Lexin011715": ["Hornet spelades.", "عُزف البوق."],
    "Lexin011716": ["Hornet var hårt.", "كانت القرنية صلبة."],
    "Lexin011722": ["Horoskopet lästes.", "قُرئت بروج السماء."],
    "Lexin011736": ["Hotelsen var allvarlig.", "كان التهديد جدياً."],
    "Lexin011737": ["Hoven behövde skos.", "احتاج الحافر إلى حدوة."],
    "Lexin011738": ["Hovet var prunkande.", "كان البلاط الملكي فاخراً."],
    "Lexin011739": ["Hovmästaren hälsade välkommen.", "رحب رئيس الندل."],
    "Lexin011740": ["Hovrätten dömde.", "حكمت محكمة الاستئناف."],
    "Lexin011748": ["Hovtången användes.", "استُخدمت الكماشة."],
    "Lexin011752": ["Huden var mjuk.", "كان الجلد ناعماً."],
    "Lexin011773": ["Huggormen är giftig.", "الأفعى السامة سامة."],
    "Lexin011774": ["Hugskottet kom plötsligt.", "جاءت النزوة فجأة."],
    "Lexin011775": ["Han satt på huk.", "جلس القرفصاء."],
    "Lexin011778": ["Hullet var mjukt.", "كان السمن ناعماً."],
    "Lexin011780": ["Han hade inget hum om det.", "لم يكن لديه معرفة عنه."],
    "Lexin011786": ["Humlan surrade.", "طنت النحلة الطنانة."],
    "Lexin011787": ["Humlen användes i öl.", "استُخدم الجنجل في الجعة."],
    "Lexin011788": ["Hummern serverades.", "قُدم الكركند."],
    "Lexin011789": ["Humorn räddade dagen.", "أنقذ المرح اليوم."],
    "Lexin011796": ["Hundradelen beräknades.", "حُسب الجزء بالمائة."],
    "Lexin011797": ["Hundralappen sparades.", "حُفظت ورقة المائة كرونة."],
    "Lexin011815": ["Hurtsen var full.", "كانت الخزانة ممتلئة."],
    "Lexin011820": ["För husbehov odlade han.", "زرع لحاجته المنزلية."],
    "Lexin011822": ["Husbonden bestämde.", "قرر رب العائلة."],
    "Lexin011824": ["Husdjuret var kär.", "كان الحيوان الأليف عزيزاً."],
    "Lexin011826": ["Husgerådet var nyttigt.", "كانت الأدوات المنزلية مفيدة."],
    "Lexin011833": ["Hushållsassistenten blandade.", "خلطت آلة تحضير الطعام."],
    "Lexin011836": ["Hushållsmaskinen underlättade.", "سهلت آلة تحضير الطعام."],
    "Lexin011837": ["Hushållspappret tog slut.", "نفد ورق التمسيح."],
    "Lexin011840": ["Husmanskost är gott.", "الطعام السويدي اليومي لذيذ."],
    "Lexin011842": ["Husmodern lagade mat.", "طبخت ربة المنزل."],
    "Lexin011847": ["Hussen klappade hunden.", "داعب رب العائلة الكلب."],
    "Lexin011850": ["Hustrutillägget betalades.", "دُفعت علاوة الزوجة."],
    "Lexin011851": ["Husvagnen parkerades.", "رُكن الكرافان."],
    "Lexin011853": ["Håll hut!", "تصرف بأخلاق!"],
    "Lexin011856": ["Huven skyddade maskinen.", "حمى الغطاء الآلة."],
    "Lexin011857": ["Huvan var varm.", "كانت القلنسوة دافئة."],
    "Lexin011861": ["Huvudavtalet undertecknades.", "وُقعت الاتفاقية الرئيسية."],
    "Lexin011862": ["Huvudbonaden bars.", "ارتُدي غطاء الرأس."],
    "Lexin011864": ["Huvudbryt orsakades.", "سُببت الحيرة."],
    "Lexin011871": ["Huvudförhandlingen hölls.", "عُقدت جلسة المحكمة الرئيسية."],
    "Lexin011877": ["Huvudleden var trafikerad.", "كان الطريق الرئيسي مزدحماً."],
    "Lexin011879": ["Huvudmannen beslutade.", "قرر المسؤول الرئيسي."],
    "Lexin011882": ["Huvudparten togs.", "أُخذ الجزء الرئيسي."],
    "Lexin011896": ["Hyacinten doftade.", "فاحت رائحة الياقوتية."],
    "Lexin011898": ["Hybriden var stark.", "كان الهجين قوياً."],
    "Lexin011900": ["Hyddan var primitiv.", "كان الكوخ بدائياً."],
    "Lexin011904": ["Hyenan åt kadaver.", "أكل الضبع الجيفة."],
    "Lexin011905": ["Hyenan sökte sensationer.", "بحث السيء عن الإثارة."],
    "Lexin011906": ["Hyenan föraktades.", "احتُقر الضبع."],
    "Lexin011907": ["Hyfsen saknades.", "افتُقد الانضباط."],
    "Lexin011909": ["Hygget lämnades.", "تُرك تحريج الغابات."],
    "Lexin011917": ["Hylsan sattes på.", "وُضعت القلنسوة."]
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

const backupPath = DATA_FILE + '.backup_nouns26_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Done! Added examples to ${updated} nouns. Total: 2600 nouns!`);
