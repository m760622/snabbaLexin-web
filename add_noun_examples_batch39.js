/**
 * Add examples to nouns - Batch 39 (100 nouns: Landshövding to Ligist)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin015914": ["Landshövdingen talade.", "تحدث المحافظ."],
    "Lexin015916": ["Landskampen spelades.", "لُعبت المباراة الدولية."],
    "Lexin015917": ["Landskapet besöktes.", "زُيرت المنطقة الجغرافية."],
    "Lexin015918": ["Landskapet var vackert.", "كان الريف جميلاً."],
    "Lexin015920": ["Landslaget vann.", "فاز الفريق الوطني."],
    "Lexin015921": ["Landsmannen hjälpte.", "ساعد المواطن."],
    "Lexin015925": ["Landsorten besöktes.", "زُيرت الأقاليم."],
    "Lexin015926": ["Landssorgen utlystes.", "أُعلن الحداد العام."],
    "Lexin015928": ["Landstinget sammanträdde.", "اجتمع التنظيم النيابي للمحافظة."],
    "Lexin015933": ["Landstingsvalet hölls.", "أُقيمت انتخابات التنظيم النيابي."],
    "Lexin015934": ["Landsvägen var lång.", "كان الطريق الريفي طويلاً."],
    "Lexin015939": ["Langaren greps.", "اعتُقل بائع الخمور والمخدرات."],
    "Lexin015940": ["De Langerhanska öarna producerar insulin.", "تنتج جزر خلايا البنكرياس الأنسولين."],
    "Lexin015942": ["Lansen kastades.", "رُمي الرمح."],
    "Lexin015945": ["Lantarbetaren arbetade.", "عمل المزارع."],
    "Lexin015946": ["Lantbrevbäraren delade ut.", "وزع ساعي بريد الأرياف."],
    "Lexin015947": ["Lantbruket utvecklades.", "تطورت الزراعة."],
    "Lexin015948": ["Lantbruket var stort.", "كانت العزبة كبيرة."],
    "Lexin015949": ["Lantbrukaren odlade.", "زرع المزارع."],
    "Lexin015951": ["Lantgården såldes.", "بيعت الحقل."],
    "Lexin015953": ["Lantmäteriet mätte.", "مسح مكتب المساحة."],
    "Lexin015962": ["Lappen sys på.", "خُيطت القطعة."],
    "Lexin015963": ["Lappen skrevs.", "كُتبت قطعة الورق."],
    "Lexin015964": ["Lappen bodde i norr.", "سكن اللابي في الشمال."],
    "Lexin015967": ["Lapplisan skrev boten.", "كتبت حارسة وقوف السيارات المخالفة."],
    "Lexin015968": ["Lappsjukan drabbade.", "أصاب الاكتئاب بسبب العزلة."],
    "Lexin015971": ["Lapskojs är gott.", "اللابسكويس لذيذة."],
    "Lexin015972": ["Lapsusen ursäktades.", "اعتُذر عن الزلة."],
    "Lexin015981": ["Larven kröp.", "زحفت اليرقة."],
    "Lexin015982": ["Det är bara larv!", "هذه مجرد حماقة!"],
    "Lexin015987": ["Lasagnen serverades.", "قُدمت اللاسانيا."],
    "Lexin015988": ["Lasarettet byggdes.", "بُني المستشفى."],
    "Lexin015989": ["Lasern användes.", "استُخدم جهاز الليزر."],
    "Lexin015992": ["Lasset kördes.", "نُقل الحمل."],
    "Lexin015994": ["Lasson kastades.", "رُمي الوهق."],
    "Lexin015995": ["Lasten lossades.", "فُرغ الحمل."],
    "Lexin015996": ["Lasten var svår.", "كانت النقيصة صعبة."],
    "Lexin016009": ["Laterna kritiserades.", "انتُقد المختال."],
    "Lexin016015": ["Lathunden vilade.", "استراح الكسول."],
    "Lexin016016": ["Lathunden användes.", "استُخدم مساعد الترجمة."],
    "Lexin016017": ["Latin studerades.", "دُرست اللغة اللاتينية."],
    "Lexin016018": ["Latmasken sov.", "نام المتواني."],
    "Lexin016019": ["Han la sig på latsidan.", "تخامل."],
    "Lexin016021": ["Lavan flöt.", "سالت الحمم البركانية."],
    "Lexin016022": ["Laven var varm.", "كان المقعد الثابت دافئاً."],
    "Lexin016023": ["Lavemanget gavs.", "أُعطيت الحقنة الشرجية."],
    "Lexin016025": ["Lavinen rasade.", "انهار التيهور."],
    "Lexin016027": ["Laxen fiskades.", "صيد السلمون."],
    "Lexin016028": ["Laxermedlet togs.", "أُخذ المسهل."],
    "Lexin016030": ["Layouten godkändes.", "وُفق على النموذج الطباعي."],
    "Lexin016033": ["Leasingen tecknades.", "وُقع عقد الاستئجار."],
    "Lexin016046": ["Ledan var stor.", "كان الضجر كبيراً."],
    "Lexin016048": ["Ledamoten röstade.", "صوت العضو."],
    "Lexin016053": ["Ledaren talade.", "تحدث القائد."],
    "Lexin016054": ["Ledaren lästes.", "قُرئت الافتتاحية."],
    "Lexin016055": ["Ledaren ledde strömmen.", "نقلت المادة الموصلة التيار."],
    "Lexin016070": ["Ledigheten beviljades.", "مُنحت الإجازة."],
    "Lexin016071": ["Ledigheten uppskattades.", "قُدرت الطبيعية."],
    "Lexin016075": ["Ledningen beslutade.", "قرر مجلس الإدارة."],
    "Lexin016076": ["Ledningen reparerades.", "رُمم الخط."],
    "Lexin016096": ["Legitimation krävdes.", "طُلبت بطاقة الهوية."],
    "Lexin016104": ["Legationen besöktes.", "زُيرت البعثة الدبلوماسية."],
    "Lexin016105": ["Legenden berättades.", "رُويت الأسطورة."],
    "Lexin016106": ["Legeringen användes.", "استُخدمت السبيكة."],
    "Lexin016116": ["Legosoldaten kämpade.", "قاتل الجندي المرتزق."],
    "Lexin016117": ["Han fick fri lejd.", "حصل على مسار آمن."],
    "Lexin016119": ["Lejonet röt.", "زأر الأسد."],
    "Lexin016120": ["Lejonparten togs.", "أُخذت أكبر حصة."],
    "Lexin016122": ["Leken pågick.", "استمر تناسل الأسماك."],
    "Lexin016123": ["Leken blandades.", "خُلطت ورق اللعب."],
    "Lexin016126": ["Lekis var roligt.", "كانت روضة الأطفال ممتعة."],
    "Lexin016127": ["Lekkamraten lekte.", "لعب صديق الطفولة."],
    "Lexin016128": ["Lekmannen deltog.", "شارك العلماني."],
    "Lexin016132": ["Lekoteket hjälpte.", "ساعد مركز ذوي الاحتياجات الخاصة."],
    "Lexin016133": ["Lekplatsen besöktes.", "زُير الملعب."],
    "Lexin016134": ["Leksaken bröts.", "كُسرت اللعبة."],
    "Lexin016135": ["Lekskolan öppnade.", "فتحت روضة الأطفال."],
    "Lexin016139": ["Lektorn undervisade.", "درّس المحاضر."],
    "Lexin016140": ["Lektyren var intressant.", "كانت المقروءات مثيرة."],
    "Lexin016141": ["Lemmen skadades.", "أُصيب الطرف."],
    "Lexin016146": ["Leoparden sprang.", "ركض الفهد."],
    "Lexin016148": ["Leran formades.", "شُكل الطين."],
    "Lexin016150": ["Lergodset brändes.", "حُرقت الفخاريات."],
    "Lexin016157": ["Letten reste hem.", "عاد اللاتفي للوطن."],
    "Lexin016164": ["Levebrödet säkrades.", "أُمن القوت."],
    "Lexin016172": ["Leverantören levererade.", "ورّد المورد."],
    "Lexin016182": ["Levnaden var lång.", "كانت الحياة طويلة."],
    "Lexin016191": ["Lexikonet användes.", "استُخدم القاموس."],
    "Lexin016192": ["Libanesen reste hem.", "عاد اللبناني للوطن."],
    "Lexin016196": ["Liberalismen diskuterades.", "نوقشت التحررية."],
    "Lexin016198": ["Libyern reste hem.", "عاد الليبي للوطن."],
    "Lexin016199": ["Licensen beviljades.", "مُنح الترخيص."],
    "Lexin016202": ["Lidelsen var stark.", "كانت العاطفة القوية قوية."],
    "Lexin016209": ["Lien skärptes.", "شُحذ المحش."],
    "Lexin016211": ["Liften gick.", "سار المصعد."],
    "Lexin016214": ["Ligan greps.", "اعتُقلت العصابة."],
    "Lexin016215": ["Ligan spelades.", "لُعب الدوري."],
    "Lexin016217": ["Ligget skedde.", "حدث الجماع."],
    "Lexin016223": ["Liggvagnen var bekväm.", "كانت عربة المنامة مريحة."],
    "Lexin016225": ["Ligisten greps.", "اعتُقل عضو العصابة."]
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

const backupPath = DATA_FILE + '.backup_nouns39_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Done! Added examples to ${updated} nouns. Total: 3900 nouns! ONE MORE to 4000! 🎯`);
