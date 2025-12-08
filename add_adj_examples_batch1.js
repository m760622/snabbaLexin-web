// Add examples to adjectives - Batch 1 (50 adjectives)
const fs = require('fs');

// Read and parse data.js
const dataContent = fs.readFileSync('./data.js', 'utf-8');
const match = dataContent.match(/const dictionaryData = (\[[\s\S]*?\]);/);
if (!match) {
    console.error('Could not parse data.js');
    process.exit(1);
}

let dictionaryData;
try {
    dictionaryData = eval(match[1]);
} catch (e) {
    console.error('Error parsing data:', e.message);
    process.exit(1);
}

// Column indices
const COL_ID = 0;
const COL_EX_SWE = 7;
const COL_EX_ARB = 8;

// Examples to add
const examples = {
    "Lexin023983": { swe: "Han är sjuk och måste stanna hemma.", arb: "هو مريض ويجب أن يبقى في البيت." },
    "Lexin008643": { swe: "Glaset är fullt av vatten.", arb: "الكأس مملوء بالماء." },
    "Lexin028698": { swe: "Brödet är torrt och gammalt.", arb: "الخبز جاف وقديم." },
    "Lexin024234": { swe: "Kniven är skarp och farlig.", arb: "السكين حاد وخطير." },
    "Lexin023126": { swe: "Hon har röda skor.", arb: "لديها أحذية حمراء." },
    "Lexin000133": { swe: "Hon är à jour med de senaste nyheterna.", arb: "هي مطلعة على آخر الأخبار." },
    "Lexin000294": { swe: "Bilen har en aerodynamisk design.", arb: "السيارة لها تصميم ديناميكي هوائي." },
    "Lexin000299": { swe: "Hans tal var affekterat och konstlat.", arb: "كان كلامه متكلفاً ومصطنعاً." },
    "Lexin000412": { swe: "Rummet har bra akustik.", arb: "الغرفة لها صوتيات جيدة." },
    "Lexin000440": { swe: "Han talar albanska flytande.", arb: "هو يتكلم الألبانية بطلاقة." },
    "Lexin000450": { swe: "Vakten var alert och uppmärksam.", arb: "كان الحارس يقظاً ومنتبهاً." },
    "Lexin000462": { swe: "Han känner sig alienerad från samhället.", arb: "يشعر بالاغتراب عن المجتمع." },
    "Lexin000488": { swe: "Butiken säljer allehanda varor.", arb: "المتجر يبيع بضائع متنوعة." },
    "Lexin000493": { swe: "Företaget har en allenarådande ställning.", arb: "الشركة لها مكانة مهيمنة." },
    "Lexin000520": { swe: "De allierade länderna samarbetar.", arb: "الدول المتحالفة تتعاون." },
    "Lexin000561": { swe: "Denna princip är allmängiltig.", arb: "هذا المبدأ صالح بشكل عام." },
    "Lexin000603": { swe: "Han är en allround-spelare.", arb: "هو لاعب متعدد المواهب." },
    "Lexin000608": { swe: "Marknaden erbjuder allsköns produkter.", arb: "السوق يوفر منتجات من كل نوع." },
    "Lexin000697": { swe: "Hon lyssnar på amerikansk musik.", arb: "هي تستمع للموسيقى الأمريكية." },
    "Lexin000715": { swe: "Hans beteende var amoraliskt.", arb: "كان سلوكه غير أخلاقي." },
    "Lexin000723": { swe: "Han fick ampel tid att förbereda sig.", arb: "حصل على وقت وافر للتحضير." },
    "Lexin000739": { swe: "Anabola steroider är förbjudna i sport.", arb: "المنشطات البنائية محظورة في الرياضة." },
    "Lexin000813": { swe: "Han var andfådd efter löpningen.", arb: "كان لاهثاً بعد الجري." },
    "Lexin000840": { swe: "Modet är androgynt denna säsong.", arb: "الموضة ثنائية الجنس هذا الموسم." },
    "Lexin000895": { swe: "Det angränsande rummet är ledigt.", arb: "الغرفة المجاورة شاغرة." },
    "Lexin000927": { swe: "Han var aningslös om faran.", arb: "كان غافلاً عن الخطر." },
    "Lexin000998": { swe: "Det var en anmärkningsvärd prestation.", arb: "كان إنجازاً ملفتاً للنظر." },
    "Lexin001031": { swe: "Barn är anpassliga till nya situationer.", arb: "الأطفال قابلون للتكيف مع المواقف الجديدة." },
    "Lexin001066": { swe: "Byggnaden var gammal och anskrämlig.", arb: "كان المبنى قديماً وقبيحاً." },
    "Lexin001121": { swe: "Kommentaren var anstötlig och olämplig.", arb: "كان التعليق مسيئاً وغير لائق." },
    "Lexin001134": { swe: "Det var ansvarslöst att köra så fort.", arb: "كان تصرفاً غير مسؤول القيادة بهذه السرعة." },
    "Lexin001198": { swe: "Sjuksköterskan använde en antiseptisk lösning.", arb: "استخدمت الممرضة محلولاً مطهراً." },
    "Lexin001237": { swe: "Hon har en apart klädstil.", arb: "لديها أسلوب ملابس فريد." },
    "Lexin001240": { swe: "Han blev apatisk efter förlusten.", arb: "أصبح فاتر الشعور بعد الخسارة." },
    "Lexin001246": { swe: "Filmen hade ett apokalyptiskt tema.", arb: "كان للفيلم موضوع عن نهاية العالم." },
    "Lexin001400": { swe: "Han är arbetsskygg och undviker jobb.", arb: "هو يتهرب من العمل ويتجنبه." },
    "Lexin001435": { swe: "Hon blir argsint när hon är hungrig.", arb: "تصبح سريعة الغضب عندما تكون جائعة." },
    "Lexin001443": { swe: "Palatset har en aristokratisk atmosfär.", arb: "القصر له جو أرستقراطي." },
    "Lexin001474": { swe: "Hon lagar armenisk mat åt familjen.", arb: "هي تطبخ طعاماً أرمنياً للعائلة." },
    "Lexin001542": { swe: "Föreställningen var mycket artistisk.", arb: "كان العرض فنياً جداً." },
    "Lexin001605": { swe: "Hans asociala beteende oroar familjen.", arb: "سلوكه اللااجتماعي يقلق العائلة." },
    "Lexin001630": { swe: "Museet ställer ut assyrisk konst.", arb: "المتحف يعرض الفن الآشوري." },
    "Lexin001633": { swe: "Han har ett astigmatiskt öga.", arb: "لديه عين استجماتية." },
    "Lexin001653": { swe: "Det var ett atavistiskt beteende.", arb: "كان سلوكاً موروثاً من الأجداد." },
    "Lexin001707": { swe: "Hon är en mycket attraktiv person.", arb: "هي شخص جذاب جداً." },
    "Lexin001739": { swe: "Regionen är politiskt autonom.", arb: "المنطقة مستقلة سياسياً." },
    "Lexin001789": { swe: "Den avdankade kungen lever i exil.", arb: "الملك المخلوع يعيش في المنفى." },
    "Lexin001852": { swe: "Inträdet är avgiftsfritt för barn.", arb: "الدخول مجاني للأطفال." },
    "Lexin001886": { swe: "Hon lever ett avhållsamt liv.", arb: "هي تعيش حياة متعففة." },
    "Lexin001889": { swe: "Hans aviga försök misslyckades totalt.", arb: "محاولته الخرقاء فشلت تماماً." }
};

// Update entries
let count = 0;
for (let i = 0; i < dictionaryData.length; i++) {
    const id = dictionaryData[i][COL_ID];
    if (examples[id]) {
        // Only update if example is empty
        if (!dictionaryData[i][COL_EX_SWE] || dictionaryData[i][COL_EX_SWE].trim() === '') {
            dictionaryData[i][COL_EX_SWE] = examples[id].swe;
            dictionaryData[i][COL_EX_ARB] = examples[id].arb;
            count++;
            console.log(`✓ Added example for: ${dictionaryData[i][2]} (${id})`);
        }
    }
}

// Write back to data.js
const newContent = dataContent.replace(
    /const dictionaryData = \[[\s\S]*?\];/,
    'const dictionaryData = ' + JSON.stringify(dictionaryData, null, 4) + ';'
);

fs.writeFileSync('./data.js', newContent, 'utf-8');
console.log(`\n✅ Added examples to ${count} adjectives (Batch 1)`);
