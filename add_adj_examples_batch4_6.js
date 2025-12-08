// Add examples to adjectives - Batch 4-6 (150-300)
const fs = require('fs');

const dataContent = fs.readFileSync('./data.js', 'utf-8');
const match = dataContent.match(/const dictionaryData = (\[[\s\S]*?\]);/);
let dictionaryData = eval(match[1]);

const COL_ID = 0;
const COL_EX_SWE = 7;
const COL_EX_ARB = 8;

const examples = {
    // Batch 4
    "Lexin003920": { swe: "Hon var dyr i drift.", arb: "كانت مكلفة في التشغيل." },
    "Lexin003935": { swe: "Det var en dyster dag.", arb: "كان يوماً كئيباً." },
    "Lexin003950": { swe: "Hjärtat slår dåligt.", arb: "القلب ينبض بشكل سيء." },
    "Lexin003975": { swe: "Han var dödssjuk.", arb: "كان في حالة احتضار." },
    "Lexin003990": { swe: "Museet var dödstygt.", arb: "كان المتحف مملاً جداً." },
    "Lexin004005": { swe: "Barnet var dövstum.", arb: "كان الطفل أصم وأبكم." },
    "Lexin004025": { swe: "Det var en egal behandling.", arb: "كانت معاملة متساوية." },
    "Lexin004035": { swe: "Vi har egen bil.", arb: "لدينا سيارة خاصة." },
    "Lexin004055": { swe: "Egyptiska pyramider.", arb: "الأهرامات المصرية." },
    "Lexin004068": { swe: "Hon var ekonomisk med pengarna.", arb: "كانت اقتصادية في المال." },
    "Lexin004082": { swe: "Glasan var elegant.", arb: "كان الكأس أنيقاً." },
    "Lexin004095": { swe: "Ledningen var elektrisk.", arb: "كان السلك كهربائياً." },
    "Lexin004110": { swe: "Han var elak mot barnen.", arb: "كان شريراً مع الأطفال." },
    "Lexin004125": { swe: "Hon var empatisk.", arb: "كانت متعاطفة." },
    "Lexin004140": { swe: "Utställningen var enastående.", arb: "كان المعرض استثنائياً." },
    "Lexin004155": { swe: "Det var en enformig uppgift.", arb: "كانت مهمة رتيبة." },
    "Lexin004170": { swe: "Svaret var enkel.", arb: "كان الجواب بسيطاً." },
    "Lexin004185": { swe: "Hon var ensam hemma.", arb: "كانت وحدها في البيت." },
    "Lexin004200": { swe: "Det var en enorm skillnad.", arb: "كان فرقاً ضخماً." },
    "Lexin004215": { swe: "Han var entusiastisk.", arb: "كان متحمساً." },
    // Batch 5
    "Lexin004230": { swe: "Hon var erfaren i yrket.", arb: "كانت خبيرة في المهنة." },
    "Lexin004245": { swe: "Det var en erotisk film.", arb: "كان فيلماً إثارياً." },
    "Lexin004260": { swe: "Han var estnisk medborgare.", arb: "كان مواطناً إستونياً." },
    "Lexin004275": { swe: "Maten var etiopisk.", arb: "كان الطعام إثيوبياً." },
    "Lexin004290": { swe: "Det var en etnisk konflikt.", arb: "كان صراعاً عرقياً." },
    "Lexin004305": { swe: "Unionen är europeisk.", arb: "الاتحاد أوروبي." },
    "Lexin004320": { swe: "Beviset var evident.", arb: "كان الدليل واضحاً." },
    "Lexin004335": { swe: "Klimatet var extremt.", arb: "كان المناخ قاسياً." },
    "Lexin004350": { swe: "Det var en faktisk händelse.", arb: "كان حدثاً حقيقياً." },
    "Lexin004365": { swe: "Han var falsk och lögnaktig.", arb: "كان زائفاً وكذاباً." },
    "Lexin004380": { swe: "Familjen var familjär med området.", arb: "كانت العائلة على دراية بالمنطقة." },
    "Lexin004395": { swe: "Känslan var fantastisk.", arb: "كان الشعور رائعاً." },
    "Lexin004410": { swe: "Räddsla var farlig.", arb: "كان الخوف خطيراً." },
    "Lexin004425": { swe: "Han var fascinerande att lyssna på.", arb: "كان ساحراً عند الاستماع إليه." },
    "Lexin004440": { swe: "Det var ett fasansfullt brott.", arb: "كانت جريمة مروعة." },
    "Lexin004455": { swe: "Kontrollen var fastställd.", arb: "كان الفحص محدداً." },
    "Lexin004470": { swe: "Mannen var fattig.", arb: "كان الرجل فقيراً." },
    "Lexin004485": { swe: "Hon var federalistisk.", arb: "كانت فيدرالية." },
    "Lexin004500": { swe: "Beslutet var fel.", arb: "كان القرار خاطئاً." },
    "Lexin004515": { swe: "Det var en feminin klänning.", arb: "كان فستاناً أنثوياً." },
    // Batch 6
    "Lexin004530": { swe: "Festen var festlig.", arb: "كانت الحفلة احتفالية." },
    "Lexin004545": { swe: "Hunden var fet och lat.", arb: "كان الكلب سميناً وكسولاً." },
    "Lexin004560": { swe: "Maten var filippinsk.", arb: "كان الطعام فلبينياً." },
    "Lexin004575": { swe: "Materialet var fint.", arb: "كانت المادة ناعمة." },
    "Lexin004590": { swe: "Han var finsk medborgare.", arb: "كان مواطناً فنلندياً." },
    "Lexin004605": { swe: "Beslutet var firmerat.", arb: "كان القرار موقعاً رسمياً." },
    "Lexin004620": { swe: "Jorden var fisförenad.", arb: "كانت الأرض متحدة." },
    "Lexin004635": { swe: "Vägen var fjärran.", arb: "كان الطريق بعيداً." },
    "Lexin004650": { swe: "Berget var flack.", arb: "كان الجبل منبسطاً." },
    "Lexin004665": { swe: "Barnet var flitig i skolan.", arb: "كان الطفل مجتهداً في المدرسة." },
    "Lexin004680": { swe: "Materialet var flexibelt.", arb: "كانت المادة مرنة." },
    "Lexin004695": { swe: "Flickan var flink.", arb: "كانت الفتاة ماهرة." },
    "Lexin004710": { swe: "Våren var så fin och blommig.", arb: "كان الربيع جميلاً ومزهراً." },
    "Lexin004725": { swe: "Han var flygrädd.", arb: "كان يخاف من الطيران." },
    "Lexin004740": { swe: "Ljuset var flytande.", arb: "كان الضوء سائلاً." },
    "Lexin004755": { swe: "Han gjorde en fläckfri presentation.", arb: "قدم عرضاً بلا عيوب." },
    "Lexin004770": { swe: "Städningen var fläckig.", arb: "كان التنظيف متفاوتاً." },
    "Lexin004785": { swe: "Flickan var föraktfull.", arb: "كانت الفتاة محتقرة." },
    "Lexin004800": { swe: "Beteendet var förargligt.", arb: "كان السلوك مزعجاً." },
    "Lexin004815": { swe: "Han var förbittrad över beslutet.", arb: "كان ساخطاً على القرار." }
};

let count = 0;
for (let i = 0; i < dictionaryData.length; i++) {
    const id = dictionaryData[i][COL_ID];
    if (examples[id] && (!dictionaryData[i][COL_EX_SWE] || dictionaryData[i][COL_EX_SWE].trim() === '')) {
        dictionaryData[i][COL_EX_SWE] = examples[id].swe;
        dictionaryData[i][COL_EX_ARB] = examples[id].arb;
        count++;
        console.log(`✓ ${dictionaryData[i][2]}`);
    }
}

const newContent = dataContent.replace(
    /const dictionaryData = \[[\s\S]*?\];/,
    'const dictionaryData = ' + JSON.stringify(dictionaryData, null, 4) + ';'
);
fs.writeFileSync('./data.js', newContent, 'utf-8');
console.log(`\n✅ Added examples to ${count} adjectives (Batch 4-6)`);
