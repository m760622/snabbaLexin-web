// Add examples to adjectives - Batch 2 (51-100)
const fs = require('fs');

const dataContent = fs.readFileSync('./data.js', 'utf-8');
const match = dataContent.match(/const dictionaryData = (\[[\s\S]*?\]);/);
let dictionaryData = eval(match[1]);

const COL_ID = 0;
const COL_EX_SWE = 7;
const COL_EX_ARB = 8;

const examples = {
    "Lexin001939": { swe: "Bordet har en avlång form.", arb: "الطاولة لها شكل مستطيل." },
    "Lexin001960": { swe: "Han såg avmagrad ut efter sjukdomen.", arb: "بدا هزيلاً بعد المرض." },
    "Lexin001988": { swe: "Det var ett avsiktligt misstag.", arb: "كان خطأً متعمداً." },
    "Lexin002015": { swe: "Hans beteende var avskyvärt.", arb: "كان سلوكه بغيضاً." },
    "Lexin002082": { swe: "Lönen betalas avtalsenligt.", arb: "يُدفع الراتب وفقاً للاتفاقية." },
    "Lexin002218": { swe: "Han var bakfull efter festen.", arb: "كان يعاني من صداع الكحول بعد الحفلة." },
    "Lexin002228": { swe: "Han är lite bakom i skolan.", arb: "هو متأخر قليلاً في المدرسة." },
    "Lexin002233": { swe: "Den bakre dörren är låst.", arb: "الباب الخلفي مغلق." },
    "Lexin002262": { swe: "Han hade skjortan bakvänd.", arb: "كان يرتدي القميص بالمقلوب." },
    "Lexin002300": { swe: "De baltiska länderna är Estonia, Lettland och Litauen.", arb: "الدول البلطيقية هي إستونيا ولاتفيا وليتوانيا." },
    "Lexin002307": { swe: "Filmen var tråkig och banal.", arb: "كان الفيلم مملاً ومبتذلاً." },
    "Lexin002370": { swe: "Det var en barbarisk handling.", arb: "كان عملاً همجياً." },
    "Lexin002375": { swe: "Han gick ut barhuvad i kylan.", arb: "خرج حاسر الرأس في البرد." },
    "Lexin002382": { swe: "Hon var barmhärtig mot de fattiga.", arb: "كانت رحيمة بالفقراء." },
    "Lexin002434": { swe: "Kyrkan har barock arkitektur.", arb: "الكنيسة لها عمارة باروكية." },
    "Lexin002445": { swe: "Chefen var barsk och sträng.", arb: "كان المدير صارماً وعابساً." },
    "Lexin002446": { swe: "Efter resan var han helt barskrapad.", arb: "بعد الرحلة كان مفلساً تماماً." },
    "Lexin002468": { swe: "De talar det baskiska språket.", arb: "هم يتحدثون اللغة الباسكية." },
    "Lexin002511": { swe: "Området har varit bebott i tusentals år.", arb: "كانت المنطقة مأهولة منذ آلاف السنين." },
    "Lexin002528": { swe: "Hon stod med bedjande ögon.", arb: "وقفت بعيون متوسلة." },
    "Lexin002538": { swe: "Han var bedrövad över nyheten.", arb: "كان حزيناً بسبب الخبر." },
    "Lexin002604": { swe: "Publiken var begeistrad av konserten.", arb: "كان الجمهور متحمساً للحفل." },
    "Lexin002622": { swe: "Texten var begriplig för alla.", arb: "كان النص مفهوماً للجميع." },
    "Lexin002635": { swe: "Hon är en begåvad musiker.", arb: "هي موسيقية موهوبة." },
    "Lexin002660": { swe: "Han var behjälplig med flytten.", arb: "كان مفيداً في الانتقال." },
    "Lexin002661": { swe: "Projektet är behjärtansvärt.", arb: "المشروع جدير بالدعم." },
    "Lexin002674": { swe: "Verktyget var behändigt att använda.", arb: "كانت الأداة سهلة الاستخدام." },
    "Lexin002688": { swe: "Hon köpte en beige kappa.", arb: "اشترت معطفاً بيج اللون." },
    "Lexin002696": { swe: "Situationen var beklagansvärd.", arb: "كان الوضع مثيراً للأسف." },
    "Lexin002698": { swe: "Det var ett beklagligt misstag.", arb: "كان خطأً مؤسفاً." },
    "Lexin002727": { swe: "Han var belastad med skulder.", arb: "كان مثقلاً بالديون." },
    "Lexin002747": { swe: "Hon äter belgisk choklad.", arb: "هي تأكل شوكولاتة بلجيكية." },
    "Lexin002777": { swe: "Han är en beläst person.", arb: "هو شخص مثقف." },
    "Lexin002863": { swe: "Hon är en berest kvinna.", arb: "هي امرأة كثيرة السفر." },
    "Lexin002871": { swe: "Det är bergis att han kommer.", arb: "من المؤكد أنه سيأتي." },
    "Lexin002891": { swe: "Jag är bergsäker på att jag har rätt.", arb: "أنا متأكد تماماً أنني على حق." },
    "Lexin002910": { swe: "Det var berått tal.", arb: "كان حديثاً مقصوداً." },
    "Lexin002912": { swe: "Han är beräknande i affärer.", arb: "هو حسّاب في الأعمال." },
    "Lexin002972": { swe: "Han är en beskedlig man.", arb: "هو رجل هادئ وطيب." },
    "Lexin002988": { swe: "Hon var beskäftig och nyfiken.", arb: "كانت فضولية ومتطفلة." },
    "Lexin003015": { swe: "Pengarna var besparade för resan.", arb: "كانت الأموال مدخرة للرحلة." },
    "Lexin003075": { swe: "Kvaliteten på produkten är beständig.", arb: "جودة المنتج ثابتة." },
    "Lexin003077": { swe: "Skjortan var besudlad med olja.", arb: "كان القميص ملطخاً بالزيت." },
    "Lexin003078": { swe: "Familjen är besutten.", arb: "العائلة ثرية." },
    "Lexin003089": { swe: "Det var ett besvärligt problem.", arb: "كانت مشكلة صعبة." },
    "Lexin003103": { swe: "Hans argument var besynnerligt.", arb: "كانت حجته غريبة." },
    "Lexin003126": { swe: "Hon var betagen av utsikten.", arb: "كانت مفتونة بالمنظر." },
    "Lexin003142": { swe: "Situationen är betryggande nu.", arb: "الوضع مطمئن الآن." },
    "Lexin003157": { swe: "Priset var betungande för familjen.", arb: "كان السعر مرهقاً للعائلة." },
    "Lexin003163": { swe: "Han gjorde en betydande insats.", arb: "قدم مساهمة كبيرة." }
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
console.log(`\n✅ Added examples to ${count} adjectives (Batch 2)`);
