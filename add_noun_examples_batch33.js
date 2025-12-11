/**
 * Add examples to nouns - Batch 33 (100 nouns: Kluring to Kolonilott)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin014161": ["Kluringen hittade lösningen.", "وجد المخادع الحل."],
    "Lexin014166": ["Klykan användes.", "استُخدمت الشوكة."],
    "Lexin014167": ["Klyschan upprepades.", "تكرر القول المبتذل."],
    "Lexin014170": ["Klådan irriterade.", "أزعج الحكاك."],
    "Lexin014174": ["Klåparen misslyckades.", "فشل الغشاش."],
    "Lexin014178": ["Kläderna tvättades.", "غُسلت الملابس."],
    "Lexin014179": ["Klädesplagget köptes.", "اشتُريت قطعة الثياب."],
    "Lexin014181": ["Klädnypan höll tvätten.", "أمسك ملقط الثياب الغسيل."],
    "Lexin014185": ["Klädstrecket hängdes upp.", "عُلق حبل الغسيل."],
    "Lexin014186": ["Han kom i kläm.", "وقع في حشر."],
    "Lexin014187": ["Få kläm på det!", "افهمها!"],
    "Lexin014188": ["Klämdagen arbetades in.", "عُوض يوم العطلة."],
    "Lexin014189": ["Klämman höll.", "أمسكت القامطة."],
    "Lexin014190": ["Klämman var svår.", "كان المأزق صعباً."],
    "Lexin014206": ["Klöven var delad.", "كان الحافر مقسوماً."],
    "Lexin014207": ["Klövern plockades.", "قُطف البرسيم."],
    "Lexin014208": ["Klöver är en kortfärg.", "السباتي لون ورق."],
    "Lexin014217": ["Knallen hördes.", "سُمع الانفجار."],
    "Lexin014226": ["Knapphålet syddes.", "خُيطت العروة."],
    "Lexin014228": ["Knappnålen stack.", "وخز الدبوس."],
    "Lexin014232": ["Knarket beslagtogs.", "صودرت المخدرات."],
    "Lexin014234": ["Knarkaren arresterades.", "اعتُقل الحشاش."],
    "Lexin014239": ["Knatten lekte.", "لعب الولد."],
    "Lexin014241": ["Kneget var tungt.", "كان العمل ثقيلاً."],
    "Lexin014244": ["Knegaren arbetade hårt.", "عمل الكادح بجد."],
    "Lexin014245": ["Knekten spelades.", "لُعب الأمير."],
    "Lexin014246": ["Knekten marscherade.", "سار الجندي."],
    "Lexin014248": ["Knepet fungerade.", "نجحت الحيلة."],
    "Lexin014251": ["Knipet väckte barnet.", "أيقظ المغص الطفل."],
    "Lexin014255": ["Knippan bands.", "رُبطت المجموعة."],
    "Lexin014264": ["Knockouten avgjorde.", "حسمت الضربة القاضية."],
    "Lexin014266": ["Knogen värkte.", "آلمت البرجمة."],
    "Lexin014267": ["Knopen knöts.", "رُبطت العقدة."],
    "Lexin014268": ["Knopen mättes.", "قيست العقدة البحرية."],
    "Lexin014269": ["Knoppen slog ut.", "تفتح البرعم."],
    "Lexin014270": ["Knoppen var rund.", "كانت الكعبرة مستديرة."],
    "Lexin014271": ["Knorren var krokig.", "كان الالتفاف ملتوياً."],
    "Lexin014273": ["Knotan undersöktes.", "فُحصت العقدة."],
    "Lexin014276": ["Knottet bet.", "لدغت الجرجسة."],
    "Lexin014280": ["Knuffen flyttade honom.", "حركته الدفعة."],
    "Lexin014285": ["Knuten knöts.", "رُبطت العقدة."],
    "Lexin014286": ["Knuten var skarp.", "كان الركن حاداً."],
    "Lexin014290": ["Knutten var stark.", "كان الرجل قوياً."],
    "Lexin014291": ["Knycken kom plötsligt.", "جاءت الشدة فجأة."],
    "Lexin014296": ["Inte ett knyst!", "ولا صوت!"],
    "Lexin014298": ["Knytet bars.", "حُملت الحزمة."],
    "Lexin014300": ["Knytkalaskset var roligt.", "كانت حفلة المشاركة ممتعة."],
    "Lexin014301": ["Knytnäven höjdes.", "رُفعت قبضة اليد."],
    "Lexin014307": ["Knäcken smakade gott.", "طعمت حلوى السيراب جيداً."],
    "Lexin014309": ["Knäckebrödet åts.", "أُكل الخبز المجفف."],
    "Lexin014315": ["Knäppen hördes.", "سُمعت الطرقة الخفيفة."],
    "Lexin014319": ["Knäskålen skadades.", "أُصيبت صابونة الركبة."],
    "Lexin014322": ["Knävecket stretchades.", "مُدد باطن الركبة."],
    "Lexin014324": ["Knölen kändes.", "شُعر بالنتوء."],
    "Lexin014325": ["Knölen var ohövlig.", "كان الجلف فظاً."],
    "Lexin014333": ["Koalitionen bildades.", "تشكل الائتلاف."],
    "Lexin014334": ["Kobben syntes.", "ظهرت الجزيرة."],
    "Lexin014337": ["Koden knäcktes.", "فُكّ الرمز."],
    "Lexin014339": ["Kodein lindrar smärta.", "يخفف الكودئين الألم."],
    "Lexin014340": ["Koffein stimulerar.", "ينشط الكافيين."],
    "Lexin014342": ["Kofferten packades.", "عُبئ صندوق الأمتعة."],
    "Lexin014343": ["Kofoten bröt upp dörren.", "فتحت العتلة الباب."],
    "Lexin014344": ["Koftan var varm.", "كانت الكنزة دافئة."],
    "Lexin014345": ["Kofångaren skadades.", "تضررت الدعامية."],
    "Lexin014347": ["Kohandeln kritiserades.", "انتُقدت التنازلات السياسية."],
    "Lexin014348": ["Kojen var bekväm.", "كان المهجع مريحاً."],
    "Lexin014349": ["Kojan byggdes.", "بُني الكوخ."],
    "Lexin014351": ["Kokainet beslagtogs.", "صودر الكوكائين."],
    "Lexin014354": ["Kokboken lästes.", "قُرئ كتاب طهو الطعام."],
    "Lexin014355": ["Kokerskan lagade mat.", "طبخت الطباخة."],
    "Lexin014357": ["Kokkärlet värmdes.", "سُخن القدر."],
    "Lexin014358": ["Kokongen öppnades.", "فُتح غلاف اليرقة."],
    "Lexin014359": ["Kokosflingorna ströddes.", "نُثرت رقائق جوز الهند."],
    "Lexin014360": ["Kokosnöten knäcktes.", "كُسرت جوزة الهند."],
    "Lexin014361": ["Kokpunkten nåddes.", "بُلغت نقطة الغليان."],
    "Lexin014362": ["Koks används som bränsle.", "يُستخدم فحم الكوك كوقود."],
    "Lexin014364": ["Kokvrån var liten.", "كان المطبخ الصغير صغيراً."],
    "Lexin014365": ["Kol är ett grundämne.", "الكربون عنصر."],
    "Lexin014366": ["Kolet eldades.", "أُحرق الفحم."],
    "Lexin014367": ["Kolet glödde.", "توهجت الكتلة المتفحمة."],
    "Lexin014369": ["Kolan smakade gott.", "طعمت التوفا جيداً."],
    "Lexin014372": ["Koldioxid påverkar klimatet.", "يؤثر ثاني أكسيد الكربون على المناخ."],
    "Lexin014375": ["Kolera är farligt.", "الكوليرا خطيرة."],
    "Lexin014377": ["Kolhydrat ger energi.", "يعطي الكربوهيدرات طاقة."],
    "Lexin014379": ["Koliken väckte barnet.", "أيقظ المغص الحاد الطفل."],
    "Lexin014382": ["Koljan stektes.", "شُوي الغادس الأسمر."],
    "Lexin014384": ["Kollapsen kom plötsligt.", "جاء الانهيار فجأة."],
    "Lexin014391": ["Kollegiet sammanträdde.", "اجتمع كادر المدرسين."],
    "Lexin014392": ["Kollegiet röstade.", "صوتت السلطة البرلمانية."],
    "Lexin014393": ["Kollekten samlades in.", "جُمعت النقود خلال القداس."],
    "Lexin014394": ["Kollektionen visades.", "عُرضت المجموعة."],
    "Lexin014396": ["Kollektivet bodde tillsammans.", "سكنت العائلة التعاونية معاً."],
    "Lexin014397": ["Kollektivanslutningen diskuterades.", "نوقش الارتباط الجماعي."],
    "Lexin014399": ["Kollektivavtalet undertecknades.", "وُقعت الاتفاقية الجماعية."],
    "Lexin014402": ["Kollit levererades.", "سُلم الطرد."],
    "Lexin014404": ["Kollisionen inträffade.", "حدث الاصطدام."],
    "Lexin014406": ["Kollot var roligt.", "كان المخيم الصيفي ممتعاً."],
    "Lexin014409": ["Kolon används i skrift.", "تُستخدم علامة الترقيم في الكتابة."],
    "Lexin014412": ["Kolonin öppnade.", "فتح المعسكر."],
    "Lexin014415": ["Kolonilotten odlades.", "زُرعت القطعة الزراعية."]
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

const backupPath = DATA_FILE + '.backup_nouns33_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Done! Added examples to ${updated} nouns. Total: 3300 nouns!`);
