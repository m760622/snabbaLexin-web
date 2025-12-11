/**
 * Add examples to nouns - Batch 41 (100 nouns: Luftombyte to Lärka)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

const examples = {
    "Lexin016539": ["Luftombytet hjälpte.", "ساعد تغيير البيئة."],
    "Lexin016540": ["Luftröret undersöktes.", "فُحصت الشعب الهوائية."],
    "Lexin016547": ["Luftstrupen var fri.", "كانت القصبة الهوائية حرة."],
    "Lexin016551": ["Luftvärnet avfyrades.", "أُطلق الدفاع الجوي."],
    "Lexin016552": ["Luggen var lång.", "كانت الغرة طويلة."],
    "Lexin016557": ["Lugn rådde.", "ساد الهدوء."],
    "Lexin016572": ["Lumpen samlades.", "جُمعت الخرق."],
    "Lexin016577": ["Lunden var grön.", "كانت الأيكة خضراء."],
    "Lexin016585": ["Lunginflammation behandlades.", "عولج الالتهاب الرئوي."],
    "Lexin016588": ["Lungsäcken undersöktes.", "فُحص الغشاء البلوري."],
    "Lexin016594": ["Luntan lästes.", "قُرئت كومة الأوراق."],
    "Lexin016595": ["Luren spelades.", "عُزف النفير."],
    "Lexin016598": ["Han låg på lur.", "كان مترصداً."],
    "Lexin016601": ["Lurendrejaren lurade.", "احتال المحتال."],
    "Lexin016604": ["Lusen kröp.", "زحفت القملة."],
    "Lexin016607": ["Lussekatten åts.", "أُكلت كعكة لوسيا."],
    "Lexin016609": ["Lust kändes.", "شُعر بالرضا."],
    "Lexin016610": ["Lustan var stark.", "كانت الشهوة الجنسية قوية."],
    "Lexin016611": ["Lustgasen gavs.", "أُعطي الغاز المضحك."],
    "Lexin016612": ["Lustgården besöktes.", "زُيرت الجنة."],
    "Lexin016613": ["Lusthuset byggdes.", "بُني كوخ الحديقة."],
    "Lexin016615": ["Lustigkurren skämtade.", "مزح المهرج."],
    "Lexin016616": ["Lustspelet framfördes.", "قُدمت المسرحية الفكاهية."],
    "Lexin016617": ["Hon var i lut.", "كانت مستعدة."],
    "Lexin016618": ["Luten användes.", "استُخدم محلول القلي."],
    "Lexin016622": ["Lutfisken serverades.", "قُدم السمك المقدد."],
    "Lexin016623": ["Lutningen var brant.", "كان الميلان حاداً."],
    "Lexin016625": ["Luvan bars.", "ارتُديت القبعة."],
    "Lexin016636": ["Lyan hittades.", "وُجد عرين الأسد."],
    "Lexin016638": ["Lyckan kom.", "جاء النجاح."],
    "Lexin016645": ["Lyckokastet lyckades.", "نجحت الرمية المحظوظة."],
    "Lexin016649": ["Lyckträffen skedde.", "حدثت خبطة الحظ."],
    "Lexin016650": ["Lyckönskan gavs.", "أُعطيت التهنئة."],
    "Lexin016653": ["Lydelsen var klar.", "كان التعبير واضحاً."],
    "Lexin016657": ["Lydnaden visades.", "أُظهرت الطاعة."],
    "Lexin016664": ["Lyftkranen lyfte.", "رفعت الرافعة."],
    "Lexin016670": ["Lyktan lyste.", "أضاء المصباح."],
    "Lexin016671": ["Lyktstolpen stod.", "وقف عمود النور."],
    "Lexin016672": ["Lymfan cirkulerade.", "دارت اللنفا."],
    "Lexin016680": ["Lymmeln uppförde sig.", "تصرف الوغد."],
    "Lexin016682": ["Lynnet var bra.", "كان المزاج جيداً."],
    "Lexin016684": ["Lyran kastades.", "رُميت الرمية."],
    "Lexin016685": ["Lyran spelades.", "عُزفت كوكبة القيثارة."],
    "Lexin016686": ["Lyriken lästes.", "قُرئ الشعر."],
    "Lexin016694": ["Lysningen kungjordes.", "أُعلن الإعلان."],
    "Lexin016695": ["Lysröret lyste.", "أضاء أنبوب النيون."],
    "Lexin016697": ["Lyssnaren lyssnade.", "استمع المستمع."],
    "Lexin016699": ["Lystern var stark.", "كان اللمعان قوياً."],
    "Lexin016701": ["Lystring!", "تنبيه!"],
    "Lexin016702": ["Lytet fanns.", "وُجدت العاهة."],
    "Lexin016710": ["Lågan brann.", "اشتعل اللهب."],
    "Lexin016711": ["Låglöneyrket valdes.", "اختُيرت المهنة بالمرتب المنخفض."],
    "Lexin016714": ["Lågpris erbjöds.", "عُرض السعر المنخفض."],
    "Lexin016715": ["Lågskon bars.", "ارتُدي الحذاء بالكعب المنخفض."],
    "Lexin016716": ["Lågstadium gicks.", "دُرست المرحلة الابتدائية."],
    "Lexin016717": ["Lågtryck rådde.", "ساد الضغط المنخفض."],
    "Lexin016722": ["Lånekortet visades.", "أُظهرت بطاقة الاستعارة."],
    "Lexin016723": ["Låneköpet tecknades.", "وُقع الشراء بالدين."],
    "Lexin016727": ["Långfingret höjdes.", "رُفع الإصبع الوسطى."],
    "Lexin016728": ["Långfranskan åts.", "أُكل الرغيف الفرنساوي الطويل."],
    "Lexin016729": ["Långfredag firades.", "احتُفل بالجمعة الحزينة."],
    "Lexin016732": ["Långköraren fortsatte.", "استمر العرض المتكرر."],
    "Lexin016735": ["Långsidan mättes.", "قيست جهة الطول."],
    "Lexin016748": ["Långtidsvården gavs.", "أُعطيت الرعاية طويلة الأجل."],
    "Lexin016750": ["Långtradaren körde.", "قادت الشاحنة."],
    "Lexin016755": ["Låntagaren betalade.", "دفع المستدين."],
    "Lexin016756": ["Låren öppnades.", "فُتح الصندوق."],
    "Lexin016757": ["Låret skadades.", "أُصيب الفخذ."],
    "Lexin016758": ["Lårbenet bröts.", "كُسرت عظمة الفخذ."],
    "Lexin016770": ["Låten spelades.", "شُغلت الأغنية."],
    "Lexin016777": ["Lä fanns.", "وُجد الستر."],
    "Lexin016781": ["Läckan hittades.", "وُجد التسرب."],
    "Lexin016789": ["Läget var bra.", "كان الموضع جيداً."],
    "Lexin016794": ["Lägret byggdes.", "بُني المخيم."],
    "Lexin016796": ["Lägerskolan hölls.", "أُقيمت مدرسة المخيم."],
    "Lexin016819": ["Läggningen analyserades.", "حُللت النزعة."],
    "Lexin016827": ["Läkarintyget skrevs.", "كُتبت الشهادة الطبية."],
    "Lexin016841": ["Läkarvårdstaxan följdes.", "اتُبع رسم الرعاية الطبية."],
    "Lexin016842": ["Läkemedlet togs.", "أُخذ الدواء."],
    "Lexin016849": ["Läkemedelsförsäkringen gällde.", "سرى تأمين الأدوية."],
    "Lexin016853": ["Läkemedelskortet visades.", "أُظهرت بطاقة الأدوية."],
    "Lexin016855": ["Läkemedelsrabatten gavs.", "أُعطي تخفيض سعر الدواء."],
    "Lexin016861": ["Läktaren fylldes.", "امتلأ المدرج."],
    "Lexin016865": ["Lämningen hittades.", "وُجد التذكار."],
    "Lexin016878": ["Längan var lång.", "كان خط البيوت طويلاً."],
    "Lexin016880": ["Längden mättes.", "قيست القطعة الطويلة."],
    "Lexin016881": ["Längden skrevs.", "كُتبت اللائحة."],
    "Lexin016883": ["Längdhoppet utfördes.", "أُدي الوثب الطويل."],
    "Lexin016894": ["Längtan kändes.", "شُعر بالاشتياق."],
    "Lexin016896": ["Länken kopplades.", "وُصلت حلقة الوصل."],
    "Lexin016900": ["Länsarbetsnämnden beslutade.", "قررت لجنة سوق العمل."],
    "Lexin016904": ["Länsrätten dömde.", "حكمت محكمة المحافظة الإدارية."],
    "Lexin016909": ["Länsstyrelsen beslutade.", "قررت إدارة المحافظة."],
    "Lexin016912": ["Länstolen satt i.", "جُلس في الأريكة."],
    "Lexin016913": ["Läppen rörde sig.", "تحركت الشفة."],
    "Lexin016918": ["Läran studerades.", "دُرس المذهب."],
    "Lexin016920": ["Lärarinnan undervisade.", "درّست المعلمة."],
    "Lexin016923": ["Lärdomen spreds.", "نُشرت المعرفة."],
    "Lexin016924": ["Lärjungen lärde.", "تعلم التلميذ."],
    "Lexin016925": ["Lärkan sjöng.", "غنت القنبرة."]
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

const backupPath = DATA_FILE + '.backup_nouns41_' + Date.now();
fs.copyFileSync(DATA_FILE, backupPath);
console.log(`✅ Backup: ${path.basename(backupPath)}`);

fs.writeFileSync(DATA_FILE, `const dictionaryData = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log(`✅ Done! Added examples to ${updated} nouns. Total: 4100 nouns!`);
