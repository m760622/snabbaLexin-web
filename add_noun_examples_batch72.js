/**
 * Add examples to nouns - Batch 72 (100 nouns: Sårskorpa to Tandhygienist)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin027515": ["Sårskorpa föll av.", "سقطت قشرة الجرح."],
    "Lexin027517": ["God sås.", "صلصة لذيذة."],
    "Lexin027524": ["En säck potatis.", "كيس بطاطس."],
    "Lexin027527": ["Så säd.", "يزرع البذر."],
    "Lexin027528": ["Donera säd.", "يتبرع بالمني."],
    "Lexin027536": ["Gammal sägen.", "أسطورة قديمة."],
    "Lexin027558": ["Ta en säkerhetskopia.", "يأخذ نسخة أمان."],
    "Lexin027562": ["Fästa med säkerhetsnål.", "يثبت بدبوس كباس."],
    "Lexin027563": ["Arbeta hos säkerhetspolisen.", "يعمل في المخابرات."],
    "Lexin027565": ["Utgöra en säkerhetsrisk.", "يشكل خطراً على الأمن."],
    "Lexin027579": ["Byta säkring.", "يغير المصهر."],
    "Lexin027580": ["Säl simmade.", "سبحت الفقمة."],
    "Lexin027581": ["Gammal sälg.", "شجرة صفصاف ماعز قديمة."],
    "Lexin027592": ["Slutet sällskap.", "ناد مغلق."],
    "Lexin027595": ["Åka på sällskapsresa.", "يذهب في رحلة جماعية."],
    "Lexin027597": ["Spela sällskapsspel.", "يلعب لعبة تسلية."],
    "Lexin027599": ["Hög sälta.", "ملوحة عالية."],
    "Lexin027600": ["Leva i sämja.", "يعيش في تفاهم."],
    "Lexin027606": ["En sändning varor.", "إرسالية بضائع."],
    "Lexin027608": ["Det är sängdags.", "حان وقت النوم."],
    "Lexin027609": ["Ta en sängfösare.", "يشرب كأساً قبل النوم."],
    "Lexin027610": ["Städa sängkammaren.", "ينظف غرفة النوم."],
    "Lexin027611": ["Byta sängkläder.", "يغير بياضات السرير."],
    "Lexin027613": ["Han var sängvätare.", "كان متبولاً ليلاً."],
    "Lexin027614": ["Vackert sängöverkast.", "غظاء سرير جميل."],
    "Lexin027615": ["Bo i en sänka.", "يسكن في منخفض."],
    "Lexin027623": ["Kulturell särart.", "هوية ثقافية مميزة."],
    "Lexin027625": ["Införa särbeskattning.", "يطبق المحاسبة الضرائبية الخاصة."],
    "Lexin027629": ["Personliga särdrag.", "سمات شخصية مميزة."],
    "Lexin027631": ["Stå i en särklass.", "يكون الأفضل بلا منازع."],
    "Lexin027634": ["Han är en särling.", "هو شخص غريب الأطوار."],
    "Lexin027635": ["Lokal särprägel.", "طابع محلي مميز."],
    "Lexin027675": ["Gå i särskola.", "يذهب لمدرسة خاصة (لذوي الاحتياجات الخاصة)."],
    "Lexin027677": ["Ha en särställning.", "يتمتع بمركز خاص."],
    "Lexin027682": ["Boka ett säte.", "يحجز مقعداً."],
    "Lexin027683": ["Få smisk på sätet.", "يضرب على مؤخرته."],
    "Lexin027684": ["Gammalt säteri.", "عزبة قديمة."],
    "Lexin027703": ["Arbeta på sätteri.", "يعمل في شركة تنضيد."],
    "Lexin027704": ["Det blev en sättning i huset.", "حدث انخساف في أساس المنزل."],
    "Lexin027705": ["Bokens sättning.", "تنضيد الكتاب."],
    "Lexin027706": ["Vass säv.", "سمار حاد."],
    "Lexin027719": ["Tända sökarljus.", "يشعل الكشاف الضوئي اللفاف."],
    "Lexin027724": ["Använda en söktjänst.", "يستخدم خدمة بحث."],
    "Lexin027729": ["Vilken sölkorv!", "يا له من متلكئ!"],
    "Lexin027730": ["Sömmen sprack.", "انفتق الدرز."],
    "Lexin027731": ["Duktig sömmerska.", "خياطة ماهرة."],
    "Lexin027735": ["Vara sömngångare.", "يكون مسرنماً."],
    "Lexin027741": ["Ta sömntablett.", "يأخذ قرصاً منوماً."],
    "Lexin027742": ["Vakna, sömntuta!", "استيقظ يا محب النوم!"],
    "Lexin027744": ["Gå i söndagsskola.", "يذهب لمدرسة الأحد."],
    "Lexin027746": ["Radioaktivt sönderfall.", "تحلل إشعاعي."],
    "Lexin027752": ["Falla i en sörja.", "يسقط في الرداغ."],
    "Lexin027759": ["Leva sötebrödsdagar.", "يعيش أيام الشهد والعسل."],
    "Lexin027760": ["Fruktens sötma.", "حلاوة الفاكهة."],
    "Lexin027761": ["Min lilla sötnos.", "حبيبتي الصغيرة."],
    "Lexin027762": ["Äta sötsaker.", "يأكل الحلوى."],
    "Lexin027763": ["Fiska i sötvatten.", "يصطاد في مياه عذبة."],
    "Lexin027766": ["Åka T-bana.", "يركب الترامواي (المترو)."],
    "Lexin027767": ["En vit T-shirt.", "فانلة بيضاء."],
    "Lexin027779": ["Se tabell.", "انظر الجدول."],
    "Lexin027781": ["Tidning i tabloid.", "صحيفة بحجم التابلويد."],
    "Lexin027782": ["En tablå över tider.", "لائحة جداول بالأوقات."],
    "Lexin027783": ["Vacker tablå.", "مقطع جميل."],
    "Lexin027784": ["Det är tabu.", "هذا محظور."],
    "Lexin027785": ["Sitta på en taburett.", "يجلس على مقعد بلا ظهر."],
    "Lexin027787": ["Tacka med lamm.", "نعجة مع حمل."],
    "Lexin027788": ["En tacka guld.", "سبيكة ذهب."],
    "Lexin027794": ["Framföra tacksägelse.", "يقدم الشكر."],
    "Lexin027799": ["Ta nya tag.", "يقوم بمحاولة جديدة."], // Idiom
    "Lexin027804": ["Stoppning av tagel.", "حشوة من السبيب."],
    "Lexin027807": ["Rosens tagg.", "شوكة الوردة."],
    "Lexin027809": ["Stängsel av taggtråd.", "سياج من الأسلاك الشائكة."],
    "Lexin027811": ["Perfekt tajmning.", "توقيت مثالي."],
    "Lexin027827": ["Last på takräcket.", "حمل على قفص السيارة."],
    "Lexin027832": ["Visa takt.", "يظهر لباقة."],
    "Lexin027834": ["Hålla takten.", "يحافظ على الإيقاع."],
    "Lexin027844": ["Föra någons talan.", "يتحدث نيابة عن شخص."],
    "Lexin027846": ["Musikalisk talang.", "موهبة موسيقية."],
    "Lexin027850": ["Stå på talarlistan.", "يكون على لائحة الخطباء."],
    "Lexin027851": ["Gå upp i talarstolen.", "يصعد لمنصة الخطيب."],
    "Lexin027852": ["Lyssna på talbok.", "يستمع لكتاب مسموع."],
    "Lexin027853": ["Regeringens talesman.", "الناطق الرسمي باسم الحكومة."],
    "Lexin027854": ["Gammalt talesätt.", "مثل قديم."],
    "Lexin027856": ["Ljus av talg.", "شمعة من الودك."],
    "Lexin027858": ["Talgoxe sjöng.", "غنى القرقف الكبير."],
    "Lexin027859": ["Hissa med talja.", "يرفع بالرافعة الحبلية."],
    "Lexin027860": ["Pudra med talk.", "يضع بودرة التلك."],
    "Lexin027861": ["Svara i talkör.", "يجيبون بصوت واحد."],
    "Lexin027862": ["Hög tall.", "شجرة صنوبر عالية."],
    "Lexin027864": ["Riksdagens talman.", "رئيس البرلمان."],
    "Lexin027866": ["Spara talongen.", "يحتفظ بكعب الاستمارة."],
    "Lexin027867": ["Gå hos talpedagog.", "يذهب لأخصائي النطق."],
    "Lexin027869": ["Svenskt talspråk.", "اللغة السويدية المحكية."],
    "Lexin027871": ["Prenumerera på taltidning.", "يشترك في مجلة ناطقة."],
    "Lexin027873": ["Hänga kläder i tamburen.", "يعلق الملابس في ركن تعليق الملابس."],
    "Lexin027874": ["Spela tamburin.", "يعزف على الدف."],
    "Lexin027876": ["Använda tampong.", "تستخدم إصبعاً قطنياً (للدورة الشهرية)."],
    "Lexin027881": ["Nogrann tandborstning.", "تنظيف أسنان دقيق."],
    "Lexin027882": ["Cykla tandemcykel.", "يركب دراجة لشخصين."],
    "Lexin027886": ["Besöka tandhygienist.", "يزور أخصائي نظافة الأسنان."]
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

const backupPath = DATA_FILE + '.backup_nouns72_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Batch 72 completed!`);
