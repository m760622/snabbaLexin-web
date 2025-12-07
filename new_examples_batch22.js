/**
 * NEW EXAMPLES - BATCH 22
 * Miscellaneous common words (50 examples)
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
    // TIME
    "Sekund|Substantiv": { exSwe: "Vänta en sekund.", exArb: "انتظر لحظة." },
    "Minut|Substantiv": { exSwe: "Det tar fem minuter.", exArb: "يستغرق خمس دقائق." },
    "Timme|Substantiv": { exSwe: "Mötet varar en timme.", exArb: "الاجتماع يستمر ساعة." },
    "Dag|Substantiv": { exSwe: "Vilken dag är det idag?", exArb: "أي يوم اليوم؟" },
    "År|Substantiv": { exSwe: "Han är tjugo år gammal.", exArb: "عمره عشرون سنة." },
    "Årstid|Substantiv": { exSwe: "Hösten är min favoritårstid.", exArb: "الخريف فصلي المفضل." },
    "Vår|Substantiv": { exSwe: "Blommorna blommar på våren.", exArb: "تتفتح الزهور في الربيع." },
    "Sommar|Substantiv": { exSwe: "Sommaren är varm.", exArb: "الصيف حار." },
    "Höst|Substantiv": { exSwe: "Löven faller på hösten.", exArb: "تسقط الأوراق في الخريف." },
    "Vinter|Substantiv": { exSwe: "Vintern är kall.", exArb: "الشتاء بارد." },
    // FAMILY
    "Familj|Substantiv": { exSwe: "Min familj bor i Sverige.", exArb: "عائلتي تسكن في السويد." },
    "Förälder|Substantiv": { exSwe: "Föräldrarna hämtar barnen.", exArb: "يأخذ الوالدان الأطفال." },
    "Barn|Substantiv": { exSwe: "Barnen leker utomhus.", exArb: "يلعب الأطفال في الخارج." },
    "Son|Substantiv": { exSwe: "Min son är fem år.", exArb: "ابني عمره خمس سنوات." },
    "Dotter|Substantiv": { exSwe: "Min dotter går i skolan.", exArb: "ابنتي تذهب للمدرسة." },
    "Bror|Substantiv": { exSwe: "Min bror är äldre än mig.", exArb: "أخي أكبر مني." },
    "Syster|Substantiv": { exSwe: "Min syster bor i Göteborg.", exArb: "أختي تسكن في يوتوبوري." },
    "Mormor|Substantiv": { exSwe: "Mormor bakar goda kakor.", exArb: "جدتي تخبز كعكاً لذيذاً." },
    "Morfar|Substantiv": { exSwe: "Morfar berättar historier.", exArb: "جدي يروي قصصاً." },
    "Kusin|Substantiv": { exSwe: "Min kusin bor i USA.", exArb: "ابن عمي يسكن في أمريكا." },
    // QUANTITIES
    "Antal|Substantiv": { exSwe: "Vad är antalet deltagare?", exArb: "ما عدد المشاركين؟" },
    "Mängd|Substantiv": { exSwe: "En stor mängd vatten.", exArb: "كمية كبيرة من الماء." },
    "Bit|Substantiv": { exSwe: "Ge mig en bit bröd.", exArb: "أعطني قطعة خبز." },
    "Del|Substantiv": { exSwe: "Det är en del av planen.", exArb: "هذا جزء من الخطة." },
    "Halv|": { exSwe: "En halv timme.", exArb: "نصف ساعة." },
    "Hel|": { exSwe: "Hela familjen kom.", exArb: "جاءت العائلة كلها." },
    "Första|": { exSwe: "Det är den första dagen.", exArb: "هذا اليوم الأول." },
    "Sista|": { exSwe: "Det är den sista chansen.", exArb: "هذه الفرصة الأخيرة." },
    // SOCIETY
    "Samhälle|Substantiv": { exSwe: "Vi lever i ett modernt samhälle.", exArb: "نعيش في مجتمع حديث." },
    "Regering|Substantiv": { exSwe: "Regeringen fattar beslut.", exArb: "تتخذ الحكومة قرارات." },
    "Lag|Substantiv": { exSwe: "Man måste följa lagen.", exArb: "يجب اتباع القانون." },
    "Rättighet|Substantiv": { exSwe: "Alla har rättigheter.", exArb: "للجميع حقوق." },
    "Skyldighet|Substantiv": { exSwe: "Vi har skyldigheter också.", exArb: "لدينا واجبات أيضاً." },
    "Val|Substantiv": { exSwe: "Det är val i september.", exArb: "الانتخابات في سبتمبر." },
    "Demokrati|Substantiv": { exSwe: "Sverige är en demokrati.", exArb: "السويد ديمقراطية." },
    // EMOTIONS
    "Kärlek|Substantiv": { exSwe: "Kärlek är viktigt.", exArb: "الحب مهم." },
    "Hat|Substantiv": { exSwe: "Hat leder ingenstans.", exArb: "الكراهية لا تؤدي لشيء." },
    "Glädje|Substantiv": { exSwe: "Barnen sprider glädje.", exArb: "ينشر الأطفال الفرح." },
    "Sorg|Substantiv": { exSwe: "Sorgen tar tid.", exArb: "الحزن يحتاج وقتاً." },
    "Hopp|Substantiv": { exSwe: "Ge aldrig upp hoppet.", exArb: "لا تتخلَ عن الأمل أبداً." },
    "Rädsla|Substantiv": { exSwe: "Rädsla hindrar oss.", exArb: "الخوف يعيقنا." },
    "Förtroende|Substantiv": { exSwe: "Förtroende måste byggas.", exArb: "الثقة يجب أن تُبنى." },
    "Respekt|Substantiv": { exSwe: "Visa respekt för andra.", exArb: "أظهر الاحترام للآخرين." },
    // MISC USEFUL
    "Problem|Substantiv": { exSwe: "Vi har ett problem.", exArb: "لدينا مشكلة." },
    "Lösning|Substantiv": { exSwe: "Vi hittade en lösning.", exArb: "وجدنا حلاً." },
    "Fråga|Substantiv": { exSwe: "Har du en fråga?", exArb: "هل لديك سؤال؟" },
    "Svar|Substantiv": { exSwe: "Jag vet svaret.", exArb: "أعرف الجواب." },
    "Orsak|Substantiv": { exSwe: "Vad är orsaken?", exArb: "ما السبب؟" },
    "Resultat|Substantiv": { exSwe: "Resultatet var bra.", exArb: "كانت النتيجة جيدة." }
};

console.log('═══════════════════════════════════════════════════════════════');
console.log('     ADDING EXAMPLES - NEW BATCH 22 (50 Miscellaneous Words)');
console.log('═══════════════════════════════════════════════════════════════\n');

let addedCount = 0, alreadyHasExample = 0, notFound = 0;

for (const [key, example] of Object.entries(examples)) {
    const [targetWord, targetType] = key.split('|');
    let found = false;
    for (let i = 0; i < dictionaryData.length; i++) {
        const entry = dictionaryData[i];
        const wordMatch = entry[2] && entry[2].toLowerCase() === targetWord.toLowerCase();
        const typeMatch = !targetType || (entry[1] && entry[1].includes(targetType));
        if (wordMatch && typeMatch) {
            found = true;
            if (entry[7] && entry[7].trim() !== '') { alreadyHasExample++; }
            else { dictionaryData[i][7] = example.exSwe; dictionaryData[i][8] = example.exArb; addedCount++; console.log(`✓ ${entry[2]}`); }
            break;
        }
    }
    if (!found) { console.log(`❌ Not found: ${targetWord}`); notFound++; }
}

fs.writeFileSync('./data.js', 'const dictionaryData = ' + JSON.stringify(dictionaryData, null, 4) + ';');
console.log(`\n✅ Added: ${addedCount} | ⚠️ Had: ${alreadyHasExample} | ❌ Not found: ${notFound}`);
