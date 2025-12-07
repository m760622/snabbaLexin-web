/**
 * ADD EXAMPLES - BATCH 8 (Correct Word Matching)
 * Focus on society, work, food items, and more descriptive words
 */

const fs = require('fs');

const dataContent = fs.readFileSync('./data.js', 'utf-8');
let dictionaryData;
try {
    dictionaryData = JSON.parse(dataContent.replace('const dictionaryData = ', '').replace(/;$/, ''));
} catch (e) {
    const match = dataContent.match(/(?:const|var|let)\s+dictionaryData\s*=\s*(\[[\s\S]*?\]);/);
    dictionaryData = eval(match[1]);
}

const examples = {
    // ==========================================
    // SOCIETY & GOVERNMENT
    // ==========================================
    "Samhälle|Substantiv": { exSwe: "Vi lever i ett modernt samhälle.", exArb: "نعيش في مجتمع حديث." },
    "Demokrati|Substantiv": { exSwe: "Sverige är en demokrati.", exArb: "السويد ديمقراطية." },
    "Lag|Substantiv": { exSwe: "Vi måste följa lagen.", exArb: "يجب أن نتبع القانون." },
    "Rättighet|Substantiv": { exSwe: "Alla har samma rättigheter.", exArb: "الجميع لهم نفس الحقوق." },
    "Plikt|Substantiv": { exSwe: "Det är din plikt.", exArb: "هذا واجبك." },
    "Frihet|Substantiv": { exSwe: "Frihet är viktigt.", exArb: "الحرية مهمة." },
    "Val|Substantiv": { exSwe: "Det är val i september.", exArb: "الانتخابات في سبتمبر." },
    "Regering|Substantiv": { exSwe: "Regeringen fattar beslut.", exArb: "الحكومة تتخذ القرارات." },
    "Riksdag|Substantiv": { exSwe: "Riksdagen stiftar lagar.", exArb: "البرلمان يسن القوانين." },
    "Minister|Substantiv": { exSwe: "Ministern höll ett tal.", exArb: "ألقى الوزير كلمة." },
    "Kommun|Substantiv": { exSwe: "Stockholm är Sveriges största kommun.", exArb: "ستوكهولم هي أكبر بلدية في السويد." },
    "Skatt|Substantiv": { exSwe: "Vi betalar skatt.", exArb: "ندفع الضرائب." },
    "Medborgare|Substantiv": { exSwe: "Jag är svensk medborgare.", exArb: "أنا مواطن سويدي." },
    "Invandrare|Substantiv": { exSwe: "Många invandrare bor i Sverige.", exArb: "يعيش كثير من المهاجرين في السويد." },
    "Flykting|Substantiv": { exSwe: "Flyktingen sökte asyl.", exArb: "طلب اللاجئ اللجوء." },

    // ==========================================
    // WORK & ECONOMY
    // ==========================================
    "Jobb|Substantiv": { exSwe: "Jag söker ett nytt jobb.", exArb: "أبحث عن عمل جديد." },
    "Arbete|Substantiv": { exSwe: "Arbetet är klart.", exArb: "العمل جاهز." },
    "Kontor|Substantiv": { exSwe: "Jag arbetar på ett kontor.", exArb: "أعمل في مكتب." },
    "Fabrik|Substantiv": { exSwe: "Fabriken tillverkar bilar.", exArb: "المصنع يصنع السيارات." },
    "Chef|Substantiv": { exSwe: "Min chef är snäll.", exArb: "مديري لطيف." },
    "Kollega|Substantiv": { exSwe: "Jag har trevliga kollegor.", exArb: "لدي زملاء لطفاء." },
    "Lön|Substantiv": { exSwe: "Lönen kommer den 25:e.", exArb: "الراتب يأتي في الـ25." },
    "Anställd|Substantiv": { exSwe: "Företaget har hundra anställda.", exArb: "الشركة لديها مائة موظف." },
    "Möte|Substantiv": { exSwe: "Vi har möte klockan två.", exArb: "لدينا اجتماع الساعة الثانية." },
    "Uppgift|Substantiv": { exSwe: "Jag har många uppgifter.", exArb: "لدي مهام كثيرة." },
    "Projekt|Substantiv": { exSwe: "Projektet är avslutat.", exArb: "المشروع انتهى." },
    "Företag|Substantiv": { exSwe: "Företaget växer.", exArb: "الشركة تنمو." },
    "Ekonomi|Substantiv": { exSwe: "Ekonomin är stark.", exArb: "الاقتصاد قوي." },
    "Bank|Substantiv": { exSwe: "Jag går till banken.", exArb: "أذهب إلى البنك." },
    "Konto|Substantiv": { exSwe: "Jag har ett bankkonto.", exArb: "لدي حساب بنكي." },

    // ==========================================
    // FOOD ITEMS (specific)
    // ==========================================
    "Bröd|Substantiv": { exSwe: "Vi köper nybakat bröd.", exArb: "نشتري خبزاً طازجاً." },
    "Smörgås|Substantiv": { exSwe: "Jag äter en smörgås till lunch.", exArb: "آكل ساندويتش للغداء." },
    "Korv|Substantiv": { exSwe: "Barnen gillar korv.", exArb: "الأطفال يحبون السجق." },
    "Kött|Substantiv": { exSwe: "Jag steker kött.", exArb: "أقلي اللحم." },
    "Fisk|Substantiv": { exSwe: "Lax är en typ av fisk.", exArb: "السلمون نوع من السمك." },
    "Kyckling|Substantiv": { exSwe: "Vi äter kyckling till middag.", exArb: "نأكل الدجاج للعشاء." },
    "Ris|Substantiv": { exSwe: "Jag kokar ris.", exArb: "أطبخ الأرز." },
    "Pasta|Substantiv": { exSwe: "Barnen älskar pasta.", exArb: "الأطفال يحبون المعكرونة." },
    "Pizza|Substantiv": { exSwe: "Vi beställer pizza.", exArb: "نطلب بيتزا." },
    "Soppa|Substantiv": { exSwe: "Soppan är varm.", exArb: "الحساء ساخن." },
    "Sallad|Substantiv": { exSwe: "Jag äter sallad varje dag.", exArb: "آكل السلطة كل يوم." },
    "Tomat|Substantiv": { exSwe: "Tomaten är röd.", exArb: "الطماطم حمراء." },
    "Gurka|Substantiv": { exSwe: "Gurkan är grön.", exArb: "الخيار أخضر." },
    "Lök|Substantiv": { exSwe: "Lök får mig att gråta.", exArb: "البصل يجعلني أبكي." },
    "Morot|Substantiv": { exSwe: "Moroten är orange.", exArb: "الجزر برتقالي." },
    "Äpple|Substantiv": { exSwe: "Jag äter ett äpple.", exArb: "آكل تفاحة." },
    "Apelsin|Substantiv": { exSwe: "Apelsinen är saftig.", exArb: "البرتقالة عصيرية." },
    "Banan|Substantiv": { exSwe: "Apan äter bananer.", exArb: "القرد يأكل الموز." },
    "Jordgubbe|Substantiv": { exSwe: "Jordgubbar är goda på sommaren.", exArb: "الفراولة لذيذة في الصيف." },
    "Druva|Substantiv": { exSwe: "Druvor är söta.", exArb: "العنب حلو." },
    "Citron|Substantiv": { exSwe: "Citronen är sur.", exArb: "الليمون حامض." },

    // ==========================================
    // MORE DESCRIPTIVE ADJECTIVES
    // ==========================================
    "Vacker|Adjektiv": { exSwe: "Blomman är vacker.", exArb: "الزهرة جميلة." },
    "Snygg|Adjektiv": { exSwe: "Han är snygg.", exArb: "هو وسيم." },
    "Söt|Adjektiv": { exSwe: "Bebisen är söt.", exArb: "الطفل لطيف." },
    "Gullig|Adjektiv": { exSwe: "Valpen är gullig.", exArb: "الجرو ظريف." },
    "Trevlig|Adjektiv": { exSwe: "Hon är mycket trevlig.", exArb: "هي لطيفة جداً." },
    "Snäll|Adjektiv": { exSwe: "Han är snäll mot alla.", exArb: "هو لطيف مع الجميع." },
    "Ärlig|Adjektiv": { exSwe: "Hon är alltid ärlig.", exArb: "هي صادقة دائماً." },
    "Lat|Adjektiv": { exSwe: "Han är lat idag.", exArb: "هو كسول اليوم." },
    "Flitig|Adjektiv": { exSwe: "Hon är en flitig student.", exArb: "هي طالبة مجتهدة." },
    "Noggrann|Adjektiv": { exSwe: "Han är noggrann med sitt arbete.", exArb: "هو دقيق في عمله." },
    "Försiktig|Adjektiv": { exSwe: "Var försiktig!", exArb: "كن حذراً!" },
    "Modig|Adjektiv": { exSwe: "Hon var modig.", exArb: "كانت شجاعة." },
    "Feg|Adjektiv": { exSwe: "Han var feg.", exArb: "كان جباناً." },
    "Nyfiken|Adjektiv": { exSwe: "Barnet är nyfiken.", exArb: "الطفل فضولي." },
    "Kunnig|Adjektiv": { exSwe: "Hon är kunnig i sitt ämne.", exArb: "هي خبيرة في مادتها." },
    "Erfaren|Adjektiv": { exSwe: "Han är en erfaren lärare.", exArb: "هو معلم ذو خبرة." },
    "Populär|Adjektiv": { exSwe: "Hon är populär bland eleverna.", exArb: "هي محبوبة بين الطلاب." },
    "Berömd|Adjektiv": { exSwe: "Artisten är berömd.", exArb: "الفنان مشهور." },
    "Vanlig|Adjektiv": { exSwe: "Det är en vanlig dag.", exArb: "هذا يوم عادي." },
    "Ovanlig|Adjektiv": { exSwe: "Det är ovanligt.", exArb: "هذا غير عادي." },
    "Modern|Adjektiv": { exSwe: "Byggnaden är modern.", exArb: "المبنى حديث." },
    "Klassisk|Adjektiv": { exSwe: "Jag gillar klassisk musik.", exArb: "أحب الموسيقى الكلاسيكية." },
    "Traditionell|Adjektiv": { exSwe: "Det är en traditionell rätt.", exArb: "هذا طبق تقليدي." },

    // ==========================================
    // MORE COMMON VERBS
    // ==========================================
    "Behöver|Verb": { exSwe: "Jag behöver hjälp.", exArb: "أحتاج مساعدة." },
    "Vill|Verb": { exSwe: "Jag vill gå hem.", exArb: "أريد أن أذهب للبيت." },
    "Kan|Verb": { exSwe: "Jag kan simma.", exArb: "أستطيع السباحة." },
    "Måste|Verb": { exSwe: "Jag måste gå nu.", exArb: "يجب أن أذهب الآن." },
    "Ska|Verb": { exSwe: "Jag ska resa imorgon.", exArb: "سأسافر غداً." },
    "Skulle|Verb": { exSwe: "Jag skulle vilja ha kaffe.", exArb: "أود أن أتناول قهوة." },
    "Får|Verb": { exSwe: "Får jag fråga?", exArb: "هل لي أن أسأل؟" },
    "Borde|Verb": { exSwe: "Du borde sova mer.", exArb: "يجب أن تنام أكثر." },
    "Verkar|Verb": { exSwe: "Han verkar trött.", exArb: "يبدو متعباً." },
    "Verkar|Verb": { exSwe: "Det verkar intressant.", exArb: "يبدو مثيراً للاهتمام." },
    "Klarar|Verb": { exSwe: "Jag klarar det.", exArb: "أستطيع فعلها." },
    "Orkar|Verb": { exSwe: "Jag orkar inte mer.", exArb: "لا أستطيع المزيد." },
    "Hinner|Verb": { exSwe: "Jag hinner inte.", exArb: "ليس لدي وقت." },
    "Fortsätter|Verb": { exSwe: "Vi fortsätter imorgon.", exArb: "نستمر غداً." },
    "Slutar|Verb": { exSwe: "Jag slutar klockan fem.", exArb: "أنهي الساعة الخامسة." },
    "Börjar|Verb": { exSwe: "Filmen börjar snart.", exArb: "الفيلم يبدأ قريباً." },
    "Passar|Verb": { exSwe: "Den här tröjan passar mig.", exArb: "هذه السترة تناسبني." },
    "Beror|Verb": { exSwe: "Det beror på vädret.", exArb: "يعتمد على الطقس." },
    "Händer|Verb": { exSwe: "Vad händer?", exArb: "ماذا يحدث؟" },
    "Finns|Verb": { exSwe: "Det finns mat i kylskåpet.", exArb: "يوجد طعام في الثلاجة." }
};

console.log('═══════════════════════════════════════════════════════════════');
console.log('     ADDING EXAMPLES - BATCH 8 (Society, Work, Food, Adjectives)');
console.log('═══════════════════════════════════════════════════════════════\n');

let addedCount = 0;
let alreadyHasExample = 0;
let notFound = 0;

for (const [key, example] of Object.entries(examples)) {
    const [targetWord, targetType] = key.split('|');
    let found = false;

    for (let i = 0; i < dictionaryData.length; i++) {
        const entry = dictionaryData[i];
        const entryWord = entry[2];
        const entryType = entry[1];

        const wordMatch = entryWord && entryWord.toLowerCase() === targetWord.toLowerCase();
        const typeMatch = !targetType || targetType === '' || (entryType && entryType.includes(targetType));

        if (wordMatch && typeMatch) {
            found = true;

            if (entry[7] && entry[7].trim() !== '') {
                alreadyHasExample++;
            } else {
                dictionaryData[i][7] = example.exSwe;
                dictionaryData[i][8] = example.exArb;
                addedCount++;
                console.log(`✓ ${entryWord} (${entryType || 'N/A'})`);
            }
            break;
        }
    }

    if (!found) {
        console.log(`❌ Not found: ${targetWord} (${targetType || 'any'})`);
        notFound++;
    }
}

const newDataStr = 'const dictionaryData = ' + JSON.stringify(dictionaryData, null, 4) + ';';
fs.writeFileSync('./data.js', newDataStr);

console.log('\n═══════════════════════════════════════════════════════════════');
console.log(`✅ Examples added: ${addedCount}`);
console.log(`⚠️  Already had examples: ${alreadyHasExample}`);
console.log(`❌ Not found: ${notFound}`);
console.log(`📊 Total attempted: ${Object.keys(examples).length}`);
console.log('═══════════════════════════════════════════════════════════════');
