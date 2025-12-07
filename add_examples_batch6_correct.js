/**
 * ADD EXAMPLES - BATCH 6 (Correct Word Matching)
 * Focus on transport, health, shopping, and prepositions
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
    // TRANSPORT
    // ==========================================
    "Bil|Substantiv": { exSwe: "Jag kör bil till jobbet.", exArb: "أقود السيارة إلى العمل." },
    "Buss|Substantiv": { exSwe: "Bussen kommer om fem minuter.", exArb: "ستأتي الحافلة خلال خمس دقائق." },
    "Tåg|Substantiv": { exSwe: "Vi åker tåg till Göteborg.", exArb: "نأخذ القطار إلى يوتيبوري." },
    "Flygplan|Substantiv": { exSwe: "Flygplanet landar klockan tre.", exArb: "ستهبط الطائرة الساعة الثالثة." },
    "Båt|Substantiv": { exSwe: "Vi åker båt till Finland.", exArb: "نسافر بالقارب إلى فنلندا." },
    "Spårvagn|Substantiv": { exSwe: "Spårvagnen går till centrum.", exArb: "الترام يذهب إلى وسط المدينة." },
    "Tunnelbana|Substantiv": { exSwe: "Ta tunnelbanan till nästa station.", exArb: "خذ المترو إلى المحطة التالية." },
    "Taxi|Substantiv": { exSwe: "Jag tar en taxi hem.", exArb: "سآخذ تاكسي إلى البيت." },
    "Motorcykel|Substantiv": { exSwe: "Han kör motorcykel.", exArb: "يقود دراجة نارية." },
    "Lastbil|Substantiv": { exSwe: "Lastbilen transporterar varor.", exArb: "الشاحنة تنقل البضائع." },
    "Ambulans|Substantiv": { exSwe: "Ambulansen kommer snabbt.", exArb: "الإسعاف يأتي بسرعة." },
    "Brandbil|Substantiv": { exSwe: "Brandbilen har sirener.", exArb: "سيارة الإطفاء لديها صفارات." },
    "Polisbil|Substantiv": { exSwe: "Polisbilen patrullerar.", exArb: "سيارة الشرطة تقوم بدورية." },
    "Helikopter|Substantiv": { exSwe: "Helikoptern flyger lågt.", exArb: "المروحية تطير على ارتفاع منخفض." },
    "Biljett|Substantiv": { exSwe: "Jag köpte en biljett till Stockholm.", exArb: "اشتريت تذكرة إلى ستوكهولم." },
    "Hållplats|Substantiv": { exSwe: "Busshållplatsen är runt hörnet.", exArb: "محطة الحافلة عند الزاوية." },
    "Avgång|Substantiv": { exSwe: "Avgången är klockan åtta.", exArb: "موعد المغادرة الساعة الثامنة." },
    "Ankomst|Substantiv": { exSwe: "Ankomsten är försenad.", exArb: "الوصول متأخر." },
    "Resa|Substantiv": { exSwe: "Vi planerar en resa till Spanien.", exArb: "نخطط لرحلة إلى إسبانيا." },
    "Väg|Substantiv": { exSwe: "Vägen till skolan är kort.", exArb: "الطريق إلى المدرسة قصير." },

    // ==========================================
    // HEALTH & BODY
    // ==========================================
    "Läkare|Substantiv": { exSwe: "Jag måste gå till läkaren.", exArb: "يجب أن أذهب إلى الطبيب." },
    "Sjukhus|Substantiv": { exSwe: "Han ligger på sjukhuset.", exArb: "هو راقد في المستشفى." },
    "Vårdcentral|Substantiv": { exSwe: "Boka tid på vårdcentralen.", exArb: "احجز موعداً في المركز الصحي." },
    "Medicin|Substantiv": { exSwe: "Tar du någon medicin?", exArb: "هل تتناول أي دواء؟" },
    "Recept|Substantiv": { exSwe: "Läkaren skrev ut ett recept.", exArb: "كتب الطبيب وصفة طبية." },
    "Tablett|Substantiv": { exSwe: "Ta en tablett två gånger om dagen.", exArb: "تناول حبة مرتين يومياً." },
    "Feber|Substantiv": { exSwe: "Jag har feber.", exArb: "لدي حمى." },
    "Förkylning|Substantiv": { exSwe: "Jag har en förkylning.", exArb: "أنا مصاب بالزكام." },
    "Huvudvärk|Substantiv": { exSwe: "Jag har huvudvärk.", exArb: "لدي صداع." },
    "Magont|Substantiv": { exSwe: "Han har magont.", exArb: "لديه ألم في البطن." },
    "Allergi|Substantiv": { exSwe: "Jag har allergi mot nötter.", exArb: "لدي حساسية من المكسرات." },
    "Tandläkare|Substantiv": { exSwe: "Jag går till tandläkaren.", exArb: "أذهب إلى طبيب الأسنان." },
    "Operation|Substantiv": { exSwe: "Han ska genomgå en operation.", exArb: "سيخضع لعملية جراحية." },
    "Blodtryck|Substantiv": { exSwe: "Mitt blodtryck är normalt.", exArb: "ضغط دمي طبيعي." },
    "Vikt|Substantiv": { exSwe: "Min vikt är 70 kilo.", exArb: "وزني 70 كيلو." },
    "Längd|Substantiv": { exSwe: "Min längd är 175 cm.", exArb: "طولي 175 سم." },

    // ==========================================
    // SHOPPING
    // ==========================================
    "Affär|Substantiv": { exSwe: "Jag handlar i affären.", exArb: "أتسوق في المتجر." },
    "Butik|Substantiv": { exSwe: "Klädbutiken stänger klockan sju.", exArb: "يغلق متجر الملابس الساعة السابعة." },
    "Supermarket|Substantiv": { exSwe: "Vi köper mat i supermarketen.", exArb: "نشتري الطعام من السوبرماركت." },
    "Pris|Substantiv": { exSwe: "Vad är priset?", exArb: "ما السعر؟" },
    "Rea|Substantiv": { exSwe: "Det är rea på kläder.", exArb: "هناك تخفيضات على الملابس." },
    "Rabatt|Substantiv": { exSwe: "Jag fick 20% rabatt.", exArb: "حصلت على خصم 20%." },
    "Kvitto|Substantiv": { exSwe: "Spara kvittot.", exArb: "احتفظ بالإيصال." },
    "Kassa|Substantiv": { exSwe: "Betala vid kassan.", exArb: "ادفع عند الصندوق." },
    "Kort|Substantiv": { exSwe: "Jag betalar med kort.", exArb: "أدفع بالبطاقة." },
    "Kontant|Adjektiv": { exSwe: "Jag betalar kontant.", exArb: "أدفع نقداً." },
    "Pengar|Substantiv": { exSwe: "Jag har inga pengar.", exArb: "ليس لدي مال." },
    "Plånbok|Substantiv": { exSwe: "Min plånbok är borta.", exArb: "محفظتي ضائعة." },
    "Påse|Substantiv": { exSwe: "Vill du ha en påse?", exArb: "هل تريد كيساً؟" },
    "Vagn|Substantiv": { exSwe: "Ta en kundvagn.", exArb: "خذ عربة تسوق." },
    "Korg|Substantiv": { exSwe: "Jag tar en korg.", exArb: "آخذ سلة." },

    // ==========================================
    // PREPOSITIONS & CONJUNCTIONS
    // ==========================================
    "I|Preposition": { exSwe: "Boken ligger i väskan.", exArb: "الكتاب في الحقيبة." },
    "På|Preposition": { exSwe: "Glaset står på bordet.", exArb: "الكوب على الطاولة." },
    "Under|Preposition": { exSwe: "Katten sover under sängen.", exArb: "القطة نائمة تحت السرير." },
    "Över|Preposition": { exSwe: "Fågeln flyger över huset.", exArb: "الطائر يطير فوق البيت." },
    "Bakom|Preposition": { exSwe: "Bilen står bakom huset.", exArb: "السيارة خلف البيت." },
    "Framför|Preposition": { exSwe: "Hon står framför dörren.", exArb: "تقف أمام الباب." },
    "Bredvid|Preposition": { exSwe: "Jag sitter bredvid dig.", exArb: "أجلس بجانبك." },
    "Mellan|Preposition": { exSwe: "Stolen är mellan bordet och väggen.", exArb: "الكرسي بين الطاولة والحائط." },
    "Mot|Preposition": { exSwe: "Han går mot skolan.", exArb: "يمشي نحو المدرسة." },
    "Från|Preposition": { exSwe: "Jag kommer från Sverige.", exArb: "أنا من السويد." },
    "Till|Preposition": { exSwe: "Vi åker till Stockholm.", exArb: "نذهب إلى ستوكهولم." },
    "Med|Preposition": { exSwe: "Jag åker med bussen.", exArb: "أذهب بالحافلة." },
    "Utan|Preposition": { exSwe: "Kaffe utan socker.", exArb: "قهوة بدون سكر." },
    "För|Preposition": { exSwe: "Presenten är för dig.", exArb: "الهدية لك." },
    "Om|Preposition": { exSwe: "Vi pratar om vädret.", exArb: "نتحدث عن الطقس." },
    "Hos|Preposition": { exSwe: "Jag bor hos min vän.", exArb: "أسكن عند صديقي." },
    "Genom|Preposition": { exSwe: "Vi går genom parken.", exArb: "نمشي عبر الحديقة." },
    "Längs|Preposition": { exSwe: "Vi promenerar längs stranden.", exArb: "نتمشى على طول الشاطئ." },
    "Och|Konjunktion": { exSwe: "Jag och du.", exArb: "أنا وأنت." },
    "Eller|Konjunktion": { exSwe: "Kaffe eller te?", exArb: "قهوة أم شاي؟" },
    "Men|Konjunktion": { exSwe: "Jag vill komma, men jag kan inte.", exArb: "أريد أن آتي، لكن لا أستطيع." },
    "Att|Konjunktion": { exSwe: "Jag hoppas att du mår bra.", exArb: "أتمنى أن تكون بخير." },
    "Om|Konjunktion": { exSwe: "Jag vet inte om han kommer.", exArb: "لا أدري إن كان سيأتي." },
    "När|Konjunktion": { exSwe: "Ring mig när du kommer.", exArb: "اتصل بي عندما تصل." },
    "Eftersom|Konjunktion": { exSwe: "Jag stannar hemma eftersom jag är sjuk.", exArb: "أبقى في البيت لأنني مريض." },
    "Därför|Adverb": { exSwe: "Jag är trött, därför går jag och lägger mig.", exArb: "أنا متعب، لذلك سأنام." },

    // ==========================================
    // MORE VERBS - DAILY LIFE
    // ==========================================
    "Vaknar|Verb": { exSwe: "Jag vaknar klockan sju.", exArb: "أستيقظ الساعة السابعة." },
    "Stiger upp|Verb": { exSwe: "Hon stiger upp tidigt.", exArb: "تستيقظ مبكراً." },
    "Klär sig|Verb": { exSwe: "Han klär sig snabbt.", exArb: "يلبس بسرعة." },
    "Tvättar sig|Verb": { exSwe: "Jag tvättar mig varje morgon.", exArb: "أغسل نفسي كل صباح." },
    "Borstar|Verb": { exSwe: "Jag borstar tänderna.", exArb: "أفرش أسناني." },
    "Kammar|Verb": { exSwe: "Hon kammar håret.", exArb: "تمشط شعرها." },
    "Rakar sig|Verb": { exSwe: "Han rakar sig varje dag.", exArb: "يحلق ذقنه كل يوم." },
    "Sminkar sig|Verb": { exSwe: "Hon sminkar sig.", exArb: "تضع مكياجها." },
    "Äter|Verb": { exSwe: "Vi äter frukost tillsammans.", exArb: "نتناول الفطور معاً." },
    "Dricker|Verb": { exSwe: "Jag dricker vatten.", exArb: "أشرب الماء." },
    "Lagar mat|Verb": { exSwe: "Mamma lagar mat.", exArb: "ماما تطبخ الطعام." },
    "Diskar|Verb": { exSwe: "Jag diskar efter middagen.", exArb: "أغسل الصحون بعد العشاء." },
    "Städar|Verb": { exSwe: "Vi städar huset på lördagar.", exArb: "ننظف البيت يوم السبت." },
    "Tvättar|Verb": { exSwe: "Jag tvättar kläderna.", exArb: "أغسل الملابس." },
    "Stryker|Verb": { exSwe: "Hon stryker skjortan.", exArb: "تكوي القميص." },
    "Handlar|Verb": { exSwe: "Vi handlar mat på fredag.", exArb: "نتسوق الطعام يوم الجمعة." },
    "Arbetar|Verb": { exSwe: "Han arbetar på ett kontor.", exArb: "يعمل في مكتب." },
    "Studerar|Verb": { exSwe: "Hon studerar medicin.", exArb: "تدرس الطب." },
    "Tränar|Verb": { exSwe: "Jag tränar på gymmet.", exArb: "أتدرب في صالة الرياضة." },
    "Vilar|Verb": { exSwe: "Jag vilar efter jobbet.", exArb: "أرتاح بعد العمل." },
    "Sover|Verb": { exSwe: "Bebisen sover.", exArb: "الطفل نائم." },
    "Drömmer|Verb": { exSwe: "Jag drömmer om resor.", exArb: "أحلم بالسفر." }
};

console.log('═══════════════════════════════════════════════════════════════');
console.log('     ADDING EXAMPLES - BATCH 6 (Transport, Health, Shopping)');
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
