/**
 * NEW EXAMPLES - BATCH 16
 * Daily life & home words (50 examples)
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
    // HOME & FURNITURE
    "Gardin|Substantiv": { exSwe: "Dra för gardinen.", exArb: "اسحب الستارة." },
    "Matta|Substantiv": { exSwe: "Mattan är mjuk.", exArb: "السجادة ناعمة." },
    "Spegel|Substantiv": { exSwe: "Hon tittar i spegeln.", exArb: "تنظر في المرآة." },
    "Lampa|Substantiv": { exSwe: "Tänd lampan.", exArb: "أشعل المصباح." },
    "Kylskåp|Substantiv": { exSwe: "Mjölken står i kylskåpet.", exArb: "الحليب في الثلاجة." },
    "Spis|Substantiv": { exSwe: "Stäng av spisen.", exArb: "أطفئ الموقد." },
    "Ugn|Substantiv": { exSwe: "Sätt in brödet i ugnen.", exArb: "ضع الخبز في الفرن." },
    "Diskmaskin|Substantiv": { exSwe: "Diskmaskinen är trasig.", exArb: "غسالة الصحون معطلة." },
    "Tvättmaskin|Substantiv": { exSwe: "Kläderna är i tvättmaskinen.", exArb: "الملابس في الغسالة." },
    "Dammsugare|Substantiv": { exSwe: "Jag städar med dammsugaren.", exArb: "أنظف بالمكنسة الكهربائية." },
    // KITCHEN
    "Tallrik|Substantiv": { exSwe: "Sätt tallrikarna på bordet.", exArb: "ضع الأطباق على الطاولة." },
    "Glas|Substantiv": { exSwe: "Fyll glaset med vatten.", exArb: "املأ الكوب بالماء." },
    "Gaffel|Substantiv": { exSwe: "Ge mig en gaffel.", exArb: "أعطني شوكة." },
    "Sked|Substantiv": { exSwe: "Jag behöver en sked.", exArb: "أحتاج ملعقة." },
    "Kastrull|Substantiv": { exSwe: "Koka vattnet i kastrullen.", exArb: "اغلِ الماء في القدر." },
    "Stekpanna|Substantiv": { exSwe: "Stek äggen i stekpannan.", exArb: "اقلِ البيض في المقلاة." },
    "Skål|Substantiv": { exSwe: "Lägg frukten i skålen.", exArb: "ضع الفاكهة في الوعاء." },
    "Kanna|Substantiv": { exSwe: "Fyll vattenkanna.", exArb: "املأ إبريق الماء." },
    "Bricka|Substantiv": { exSwe: "Bär maten på brickan.", exArb: "احمل الطعام على الصينية." },
    "Handduk|Substantiv": { exSwe: "Handduken är våt.", exArb: "المنشفة مبللة." },
    // ROOMS & SPACES
    "Balkong|Substantiv": { exSwe: "Vi sitter på balkongen.", exArb: "نجلس على الشرفة." },
    "Källare|Substantiv": { exSwe: "Cyklarna är i källaren.", exArb: "الدراجات في القبو." },
    "Vind|Substantiv": { exSwe: "Det gamla finns på vinden.", exArb: "الأشياء القديمة في العلية." },
    "Entré|Substantiv": { exSwe: "Häng jackan i entrén.", exArb: "علق السترة في المدخل." },
    "Korridor|Substantiv": { exSwe: "Klassrummet är i korridoren.", exArb: "الفصل في الممر." },
    // DAILY ROUTINES
    "Morgon|Substantiv": { exSwe: "Jag vaknar tidigt på morgonen.", exArb: "أستيقظ باكراً في الصباح." },
    "Kväll|Substantiv": { exSwe: "Vi äter middag på kvällen.", exArb: "نتناول العشاء في المساء." },
    "Natt|Substantiv": { exSwe: "God natt, sov gott!", exArb: "تصبح على خير!" },
    "Vecka|Substantiv": { exSwe: "Det finns sju dagar i en vecka.", exArb: "يوجد سبعة أيام في الأسبوع." },
    "Månad|Substantiv": { exSwe: "Januari är årets första månad.", exArb: "يناير هو الشهر الأول من السنة." },
    // MORE DAILY
    "Frukost|Substantiv": { exSwe: "Jag äter frukost klockan åtta.", exArb: "أتناول الفطور الساعة الثامنة." },
    "Lunch|Substantiv": { exSwe: "Lunchen serveras klockan tolv.", exArb: "يُقدَّم الغداء الساعة الثانية عشرة." },
    "Middag|Substantiv": { exSwe: "Middagen är klar.", exArb: "العشاء جاهز." },
    "Mellanmål|Substantiv": { exSwe: "Barnen äter mellanmål.", exArb: "يأكل الأطفال وجبة خفيفة." },
    "Dusch|Substantiv": { exSwe: "Jag tar en dusch varje morgon.", exArb: "آخذ دوشاً كل صباح." },
    "Bad|Substantiv": { exSwe: "Barnen tar ett bad.", exArb: "الأطفال يستحمون." },
    "Sömn|Substantiv": { exSwe: "Sömn är viktigt för hälsan.", exArb: "النوم مهم للصحة." },
    "Vila|Substantiv": { exSwe: "Jag behöver vila.", exArb: "أحتاج للراحة." },
    // HOUSEHOLD ACTIVITIES
    "Städning|Substantiv": { exSwe: "Städningen tar lång tid.", exArb: "التنظيف يستغرق وقتاً طويلاً." },
    "Tvätt|Substantiv": { exSwe: "Tvätten är klar.", exArb: "الغسيل جاهز." },
    "Disk|Substantiv": { exSwe: "Jag tar disken idag.", exArb: "سأغسل الصحون اليوم." },
    "Matlagning|Substantiv": { exSwe: "Matlagning är min hobby.", exArb: "الطبخ هوايتي." },
    // SHOPPING
    "Affär|Substantiv": { exSwe: "Affären stänger klockan nio.", exArb: "يغلق المتجر الساعة التاسعة." },
    "Kundvagn|Substantiv": { exSwe: "Ta en kundvagn vid ingången.", exArb: "خذ عربة تسوق عند المدخل." },
    "Kassan|Substantiv": { exSwe: "Betala i kassan.", exArb: "ادفع في الكاشير." },
    "Kvitto|Substantiv": { exSwe: "Spara kvittot.", exArb: "احتفظ بالفاتورة." },
    "Påse|Substantiv": { exSwe: "Jag behöver en påse.", exArb: "أحتاج كيساً." },
    "Rea|Substantiv": { exSwe: "Det är rea på kläder.", exArb: "هناك تخفيضات على الملابس." },
    "Pris|Substantiv": { exSwe: "Vad är priset?", exArb: "ما هو السعر؟" },
    "Rabatt|Substantiv": { exSwe: "Jag fick rabatt.", exArb: "حصلت على خصم." }
};

console.log('═══════════════════════════════════════════════════════════════');
console.log('     ADDING EXAMPLES - NEW BATCH 16 (50 Daily Life Words)');
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
