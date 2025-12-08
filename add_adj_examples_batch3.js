// Add examples to adjectives - Batch 3 (100-150)
const fs = require('fs');

const dataContent = fs.readFileSync('./data.js', 'utf-8');
const match = dataContent.match(/const dictionaryData = (\[[\s\S]*?\]);/);
let dictionaryData = eval(match[1]);

const COL_ID = 0;
const COL_EX_SWE = 7;
const COL_EX_ARB = 8;

const examples = {
    "Lexin003175": { swe: "Han talade med betydelsefull ton.", arb: "تحدث بنبرة ذات مغزى." },
    "Lexin003193": { swe: "Hon var beundransvärd i sin styrka.", arb: "كانت جديرة بالإعجاب في قوتها." },
    "Lexin003219": { swe: "Han var bevandrad i historia.", arb: "كان خبيراً في التاريخ." },
    "Lexin003249": { swe: "Situationen var biig och otäck.", arb: "كان الوضع سيئاً ومقرفاً." },
    "Lexin003268": { swe: "Tåget var bildat och avgick i tid.", arb: "تشكل القطار وانطلق في الموعد." },
    "Lexin003274": { swe: "Han var bildskön.", arb: "كان وسيماً جداً." },
    "Lexin003283": { swe: "Det var ett billigt erbjudande.", arb: "كان عرضاً رخيصاً." },
    "Lexin003305": { swe: "Han blev bitter efter förlusten.", arb: "أصبح مريراً بعد الخسارة." },
    "Lexin003312": { swe: "Morgonen var bitig och kall.", arb: "كان الصباح قارساً وبارداً." },
    "Lexin003315": { swe: "Himlen var blå och klar.", arb: "كانت السماء زرقاء وصافية." },
    "Lexin003317": { swe: "Det var en blank yta.", arb: "كان سطحاً لامعاً." },
    "Lexin003324": { swe: "Han var blek av rädsla.", arb: "كان شاحباً من الخوف." },
    "Lexin003330": { swe: "Han var blind på ena ögat.", arb: "كان أعمى في عين واحدة." },
    "Lexin003345": { swe: "Det blev en blodig konflikt.", arb: "أصبح صراعاً دموياً." },
    "Lexin003349": { swe: "Blomstrande ekonomi i landet.", arb: "اقتصاد مزدهر في البلاد." },
    "Lexin003357": { swe: "Han var blond med blåa ögon.", arb: "كان أشقر بعيون زرقاء." },
    "Lexin003361": { swe: "Den blodsugande insekten bet honom.", arb: "لسعته الحشرة الماصة للدم." },
    "Lexin003374": { swe: "Barnet var blyg och tyst.", arb: "كان الطفل خجولاً وصامتاً." },
    "Lexin003380": { swe: "Det var ett blött väglag.", arb: "كان الطريق رطباً." },
    "Lexin003400": { swe: "Luften var bländande klar.", arb: "كان الهواء صافياً بشكل باهر." },
    "Lexin003422": { swe: "Han bodde borta hela sommaren.", arb: "سكن بعيداً طوال الصيف." },
    "Lexin003428": { swe: "Hon var bosatt i Stockholm.", arb: "كانت مقيمة في ستوكهولم." },
    "Lexin003443": { swe: "Huset var bosniskt.", arb: "كان البيت بوسنياً." },
    "Lexin003458": { swe: "Bottenärlig person.", arb: "شخص صادق جداً." },
    "Lexin003488": { swe: "Vägen är bred och rak.", arb: "الطريق عريض ومستقيم." },
    "Lexin003506": { swe: "Det var en briljant idé.", arb: "كانت فكرة رائعة." },
    "Lexin003521": { swe: "Britterna är brittiska medborgare.", arb: "البريطانيون مواطنون بريطانيون." },
    "Lexin003530": { swe: "Marken var brokig med löv.", arb: "كانت الأرض ملونة بالأوراق." },
    "Lexin003547": { swe: "Hans hår var brunt.", arb: "كان شعره بنياً." },
    "Lexin003555": { swe: "Han var brutal i sin kritik.", arb: "كان قاسياً في نقده." },
    "Lexin003571": { swe: "Skålen var bräcklig.", arb: "كانت الوعاء هشة." },
    "Lexin003594": { swe: "Han var bråkig hela kvällen.", arb: "كان مشاغباً طوال المساء." },
    "Lexin003606": { swe: "Brännande het sol.", arb: "شمس حارقة." },
    "Lexin003628": { swe: "Han var bukig och tjock.", arb: "كان بطنه كبيراً وسميناً." },
    "Lexin003632": { swe: "Han var bulgarisk medborgare.", arb: "كان مواطناً بلغارياً." },
    "Lexin003649": { swe: "Det var ett burdust uppträdande.", arb: "كان سلوكاً فظاً." },
    "Lexin003656": { swe: "Trafiken var bus ig.", arb: "كانت حركة المرور مشاكسة." },
    "Lexin003675": { swe: "Tavlan var byig med tunn färg.", arb: "كانت اللوحة متفاوتة بألوان خفيفة." },
    "Lexin003693": { swe: "Rummet var bättre än förra.", arb: "كانت الغرفة أفضل من السابقة." },
    "Lexin003701": { swe: "Människan är bärbar.", arb: "الإنسان قادر على التحمل." },
    "Lexin003725": { swe: "Han var böjlig som en gymnast.", arb: "كان مرناً كلاعب جمباز." },
    "Lexin003736": { swe: "Flickan var bördigt.", arb: "كانت الفتاة من عائلة نبيلة." },
    "Lexin003750": { swe: "Centraleuropeisk kultur.", arb: "ثقافة وسط أوروبية." },
    "Lexin003827": { swe: "Dammig väg på sommaren.", arb: "طريق مغبر في الصيف." },
    "Lexin003832": { swe: "Han hade ett danskt pass.", arb: "كان لديه جواز سفر دنماركي." },
    "Lexin003843": { swe: "Vattnet var djupt och mörkt.", arb: "كان الماء عميقاً ومظلماً." },
    "Lexin003857": { swe: "Det var en dominikansk restaurang.", arb: "كان مطعماً دومينيكياً." },
    "Lexin003876": { swe: "Hon var dräktig.", arb: "كانت حاملاً (للحيوانات)." },
    "Lexin003890": { swe: "Han var duktig i matte.", arb: "كان ماهراً في الرياضيات." },
    "Lexin003906": { swe: "Det var en dum idé.", arb: "كانت فكرة غبية." }
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
console.log(`\n✅ Added examples to ${count} adjectives (Batch 3)`);
