/**
 * Add examples to nouns - Batch 76 (100 nouns: Transport to Tum)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin028803": ["Allmän transport.", "نقل عام."],
    "Lexin028811": ["Klädd som transvestit.", "ملابس مثل مخنث."],
    "Lexin028812": ["Hänga i en trapets.", "يتعلق بأرجوحة الجمباز."],
    "Lexin028821": ["Torka med en trasa.", "يمسح بخرقة."],
    "Lexin028822": ["Han såg ut som en trashank.", "بدا وكأنه صعلوك."],
    "Lexin028827": ["Väva en trasmatta.", "ينسج سجادة قطع."],
    "Lexin028829": ["Reda ut trassel.", "يفك التشابك."],
    "Lexin028832": ["En sjungande trast.", "شحرور يغرد."],
    "Lexin028833": ["Hälla genom en tratt.", "يصب عبر قمع."],
    "Lexin028834": ["Uppleva ett trauma.", "يعيش صدمة."],
    "Lexin028837": ["Häst i trav.", "حصان يخب."],
    "Lexin028840": ["En snabb travare.", "فرس خبب سريع."],
    "Lexin028841": ["En trave böcker.", "كدسة كتب."],
    "Lexin028842": ["Lyfta med travers.", "يرفع بالرافعة العارضة."],
    "Lexin028843": ["Göra en travesti.", "يقلد بسخرية."],
    "Lexin028844": ["Gilla travsport.", "يحب رياضة سباق الخيل."],
    "Lexin028846": ["Bo i en trea.", "يسكن في شقة من ثلاث غرف."],
    "Lexin028851": ["Skada tredje man.", "يضر بطرف ثالث."],
    "Lexin028853": ["En tredjedel kvar.", "بقي الثلث."],
    "Lexin028854": ["Visa tredska.", "يظهر عناداً."],
    "Lexin028857": ["Cykla på trehjuling.", "يركب دراجة ثلاثية العجلات."],
    "Lexin028859": ["Klippa en trekant.", "يقص مثلثاً."],
    "Lexin028864": ["Snygg trench.", "معطف واق من المطر جميل."],
    "Lexin028865": ["Bära trenchcoat.", "يرتدي معطفاً طويلاً."],
    "Lexin028866": ["Följa en trend.", "يتبع صيحة (موضة)."],
    "Lexin028868": ["Köpa en trerummare.", "يشتري شقة ثلاث غرف."],
    "Lexin028875": ["Fiska med treudd.", "يصطاد برمح ثلاثي الشعب."],
    "Lexin028880": ["Likbent triangel.", "مثلث متساوي الساقين."],
    "Lexin028881": ["Tala från en tribun.", "يتحدث من منبر."],
    "Lexin028885": ["Lära sig ett trick.", "يتعلم حيلة."],
    "Lexin028888": ["Tröja i trikå.", "كنزة تريكو."],
    "Lexin028890": ["Skriva en trilogi.", "يكتب ثلاثية."],
    "Lexin028897": ["Spela i en trio.", "يعزف في فرقة ثلاثية."],
    "Lexin028898": ["Ta en tripp.", "يقوم برحلة قصيرة."],
    "Lexin028900": ["Dra i en trissa.", "يسحب بكرة."],
    "Lexin028903": ["Känna tristess.", "يشعر بالضجر."],
    "Lexin028904": ["En stor triumf.", "نصر كبير."],
    "Lexin028909": ["Skapa trivsel.", "يخلق جواً من الارتياح."],
    "Lexin028917": ["Visa trohet.", "يظهر إخلاصاً."],
    "Lexin028918": ["Styras av en trojka.", "يحكم من قبل ترويكا (ثلاثي)."],
    "Lexin028922": ["Ett fult troll.", "قزم قبيح."],
    "Lexin028926": ["En skicklig trollkarl.", "ساحر بارع."],
    "Lexin028927": ["Bryta trolovning.", "يفسخ خطوبة."],
    "Lexin028933": ["En kraftig tromb.", "إعصار قمعي قوي."],
    "Lexin028934": ["Få en tromb.", "يصاب بجلطة دموية."],
    "Lexin028935": ["Spela trombon.", "يعزف على الترومبون."],
    "Lexin028939": ["Svensk tronföljd.", "ولاية العهد السويدية."],
    "Lexin028945": ["Köpa en trosa.", "تشتري سروالاً تحتي."],
    "Lexin028946": ["Min trosbekännelse.", "عقيدتي."],
    "Lexin028948": ["Förtöja med tross.", "يربط بحبل غليظ."],
    "Lexin028949": ["Tillhöra ett trossamfund.", "ينتمي لطائفة دينية."],
    "Lexin028953": ["Visa trots.", "يبدي تحدياً."],
    "Lexin028956": ["Gå på trottoaren.", "يمشي على الرصيف."],
    "Lexin028961": ["Lyssna på en trubadur.", "يستمع لتربادور."],
    "Lexin028964": ["Köra truck.", "يقود رافعة شوكية."],
    "Lexin028965": ["Sjunga en trudelutt.", "يغني نغمة بسيطة."],
    "Lexin028967": ["Det är en truism.", "هذه بديهية."],
    "Lexin028968": ["Sitta med trumf.", "يملك ورقة رابحة."],
    "Lexin028969": ["Spräcka trumhinnan.", "يثقب طبلة الأذن."],
    "Lexin028972": ["Slå på trumma.", "يضرب على الطبل."],
    "Lexin028973": ["Rostig trumma.", "اسطوانة صدئة."],
    "Lexin028977": ["Blåsa i trumpet.", "ينفخ في البوق."],
    "Lexin028978": ["En ensam trumslagare.", "طبال وحيد."],
    "Lexin028979": ["Samla truppen.", "يجمع الفرقة."],
    "Lexin028981": ["En skriande trut.", "نورس يصرخ."],
    "Lexin028991": ["Jobba på tryckeri.", "يعمل في مطبعة."],
    "Lexin028992": ["Värna tryckfriheten.", "يحمي حرية الطباعة."],
    "Lexin028996": ["Drivas med tryckluft.", "يعمل بالهواء المضغوط."],
    "Lexin028998": ["Dela ut trycksaker.", "يوزع مطبوعات."],
    "Lexin029000": ["Dyra tryfflar.", "كمأ غالي الثمن."],
    "Lexin029001": ["Äta en tryffel.", "يأكل قطعة شوكولاتة."],
    "Lexin029007": ["Känna trygghet.", "يشعر بالأمان."],
    "Lexin029013": ["Grisens tryne.", "فطيسة الخنزير."],
    "Lexin029015": ["Nål och tråd.", "إبرة وخيط."],
    "Lexin029017": ["Tömma en trådrulle.", "يفرغ بكرة خيط."],
    "Lexin029018": ["Tråg med mat.", "وعاء طعام خشبي."],
    "Lexin029022": ["Var inte en tråkmåns.", "لا تكن مملاً."],
    "Lexin029023": ["Fiska med trål.", "يصطاد بالشبكة المقطورة."],
    "Lexin029024": ["Jobba på trålare.", "يعمل على سفينة صيد."],
    "Lexin029038": ["Duktig trädgårdsmästare.", "بستاني ماهر."],
    "Lexin029041": ["Det var en träff.", "كانت إصابة."],
    "Lexin029050": ["Leva som träl.", "يعيش كعبد."],
    "Lexin029054": ["Lyssna på tränaren.", "يستمع للمدرب."],
    "Lexin029064": ["Trängsel på bussen.", "زحام في الحافلة."],
    "Lexin029071": ["Farligt träsk.", "مستنقع خطير."],
    "Lexin029072": ["Gå i träskor.", "يمشي بقباقيب."],
    "Lexin029074": ["Få träsmak.", "يصاب بالملل (من الجلوس)."],
    "Lexin029076": ["Hamna i träta.", "يدخل في شجار."],
    "Lexin029083": ["Massans tröghet.", "قصور ذاتي (للكتلة)."],
    "Lexin029101": ["Rysslands tsar.", "قيصر روسيا."],
    "Lexin029106": ["Tub med kaviar.", "أنبوب كافيار."],
    "Lexin029107": ["Spela tuba.", "يعزف توبا."],
    "Lexin029110": ["Botad från tuberkulos.", "شفي من السل."],
    "Lexin029115": ["Han leker tuffing.", "يمثل دور القوي."],
    "Lexin029117": ["Ta en tugga.", "يأخذ قضمة."],
    "Lexin029121": ["Tugga tuggummi.", "يمضغ لبان."],
    "Lexin029122": ["Hålla i tukt.", "يبقيه تحت الانضباط."],
    "Lexin029127": ["Stoppad av tullare.", "أوقفه موظف جمارك."],
    "Lexin029136": ["En röd tulpan.", "زهرة توليب حمراء."],
    "Lexin029137": ["Två tum lång.", "طوله بوصتان."]
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

const backupPath = DATA_FILE + '.backup_nouns76_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Batch 76 completed!`);
