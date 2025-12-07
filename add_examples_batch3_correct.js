/**
 * ADD EXAMPLES - BATCH 3 (Correct Word Matching)
 * More verbs, adjectives, and places
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
    // MORE COMMON VERBS
    // ==========================================
    "Hinner|Verb": {
        exSwe: "Jag hinner inte äta frukost.",
        exArb: "ليس لدي وقت لتناول الفطور."
    },
    "Orkar|Verb": {
        exSwe: "Jag orkar inte gå uppför trappan.",
        exArb: "لا أستطيع صعود الدرج."
    },
    "Brukar|Verb": {
        exSwe: "Jag brukar äta frukost klockan sju.",
        exArb: "عادة أتناول الفطور الساعة السابعة."
    },
    "Slutar|Verb": {
        exSwe: "Arbetet slutar klockan fem.",
        exArb: "ينتهي العمل الساعة الخامسة."
    },
    "Börjar|Verb": {
        exSwe: "Skolan börjar klockan åtta.",
        exArb: "تبدأ المدرسة الساعة الثامنة."
    },
    "Kostar|Verb": {
        exSwe: "Hur mycket kostar det?",
        exArb: "كم يكلف هذا؟"
    },
    "Räcker|Verb": {
        exSwe: "Pengarna räcker inte till hela månaden.",
        exArb: "المال لا يكفي لكل الشهر."
    },
    "Passar|Verb": {
        exSwe: "Den här skjortan passar dig bra.",
        exArb: "هذا القميص يناسبك جيداً."
    },
    "Lyckas|Verb": {
        exSwe: "Hon lyckades klara provet.",
        exArb: "نجحت في اجتياز الامتحان."
    },
    "Misslyckas|Verb": {
        exSwe: "Han misslyckades med att hitta jobb.",
        exArb: "فشل في إيجاد عمل."
    },
    "Saknar|Verb": {
        exSwe: "Jag saknar min familj.",
        exArb: "أفتقد عائلتي."
    },
    "Lovar|Verb": {
        exSwe: "Jag lovar att komma i tid.",
        exArb: "أعد بالحضور في الموعد."
    },
    "Tackar|Verb": {
        exSwe: "Jag tackar dig för hjälpen.",
        exArb: "أشكرك على المساعدة."
    },
    "Gratulerar|Verb": {
        exSwe: "Vi gratulerar dig på födelsedagen!",
        exArb: "نهنئك بعيد ميلادك!"
    },
    "Hälsar|Verb": {
        exSwe: "Hälsa din mamma från mig.",
        exArb: "سلم على أمك مني."
    },
    "Bjuder|Verb": {
        exSwe: "Jag bjuder dig på kaffe.",
        exArb: "أدعوك على فنجان قهوة."
    },
    "Lånar|Verb": {
        exSwe: "Kan jag låna din penna?",
        exArb: "هل يمكنني استعارة قلمك؟"
    },
    "Delar|Verb": {
        exSwe: "Vi delar rummet.",
        exArb: "نتشارك الغرفة."
    },
    "Blandar|Verb": {
        exSwe: "Hon blandar mjöl och vatten.",
        exArb: "تخلط الطحين والماء."
    },
    "Kokar|Verb": {
        exSwe: "Vattnet kokar.",
        exArb: "الماء يغلي."
    },
    "Steker|Verb": {
        exSwe: "Jag steker ägg till frukost.",
        exArb: "أقلي البيض للفطور."
    },
    "Värmer|Verb": {
        exSwe: "Jag värmer maten i mikron.",
        exArb: "أسخن الطعام في الميكروويف."
    },
    "Fryser|Verb": {
        exSwe: "Jag fryser, det är kallt här.",
        exArb: "أشعر بالبرد، الجو بارد هنا."
    },
    "Svettas|Verb": {
        exSwe: "Jag svettas när jag springer.",
        exArb: "أتعرق عندما أركض."
    },
    "Hostar|Verb": {
        exSwe: "Han hostar hela natten.",
        exArb: "يسعل طوال الليل."
    },
    "Nyser|Verb": {
        exSwe: "Jag nyser mycket på våren.",
        exArb: "أعطس كثيراً في الربيع."
    },
    "Blöder|Verb": {
        exSwe: "Fingret blöder, jag skar mig.",
        exArb: "إصبعي ينزف، جرحت نفسي."
    },
    "Växer|Verb": {
        exSwe: "Barnen växer så snabbt.",
        exArb: "ينمو الأطفال بسرعة."
    },
    "Dör|Verb": {
        exSwe: "Blommorna dör utan vatten.",
        exArb: "الزهور تموت بدون ماء."
    },
    "Föds|Verb": {
        exSwe: "Bebisen föds nästa månad.",
        exArb: "سيولد الطفل الشهر القادم."
    },

    // ==========================================
    // MORE ADJECTIVES
    // ==========================================
    "Rik|Adjektiv": {
        exSwe: "Han är rik och bor i ett stort hus.",
        exArb: "هو غني ويسكن في منزل كبير."
    },
    "Fattig|Adjektiv": {
        exSwe: "Familjen var fattig men lycklig.",
        exArb: "كانت العائلة فقيرة لكن سعيدة."
    },
    "Stark|Adjektiv": {
        exSwe: "Han är stark och kan bära tunga saker.",
        exArb: "هو قوي ويستطيع حمل أشياء ثقيلة."
    },
    "Svag|Adjektiv": {
        exSwe: "Hon känner sig svag efter sjukdomen.",
        exArb: "تشعر بالضعف بعد المرض."
    },
    "Modig|Adjektiv": {
        exSwe: "Firefighters är modiga människor.",
        exArb: "رجال الإطفاء أشخاص شجعان."
    },
    "Rädd|Adjektiv": {
        exSwe: "Barnet är rädd för mörkret.",
        exArb: "الطفل خائف من الظلام."
    },
    "Nöjd|Adjektiv": {
        exSwe: "Jag är nöjd med mitt jobb.",
        exArb: "أنا راضٍ عن عملي."
    },
    "Missnöjd|Adjektiv": {
        exSwe: "Kunden var missnöjd med servicen.",
        exArb: "كان العميل غير راضٍ عن الخدمة."
    },
    "Upptagen|Adjektiv": {
        exSwe: "Jag är upptagen nu, kan vi prata senare?",
        exArb: "أنا مشغول الآن، هل يمكننا التحدث لاحقاً؟"
    },
    "Ledig|Adjektiv": {
        exSwe: "Jag är ledig på fredag.",
        exArb: "أنا متفرغ يوم الجمعة."
    },
    "Sen|Adjektiv": {
        exSwe: "Förlåt att jag är sen.",
        exArb: "آسف على التأخير."
    },
    "Tidig|Adjektiv": {
        exSwe: "Jag vaknar alltid tidigt.",
        exArb: "أستيقظ دائماً مبكراً."
    },
    "Säker|Adjektiv": {
        exSwe: "Är du säker på det?",
        exArb: "هل أنت متأكد من ذلك؟"
    },
    "Osäker|Adjektiv": {
        exSwe: "Jag är osäker på vad jag ska göra.",
        exArb: "لست متأكداً ماذا أفعل."
    },
    "Ren|Adjektiv": {
        exSwe: "Lägenheten är ren och fin.",
        exArb: "الشقة نظيفة وجميلة."
    },
    "Smutsig|Adjektiv": {
        exSwe: "Kläderna är smutsiga, de behöver tvättas.",
        exArb: "الملابس متسخة، تحتاج للغسيل."
    },
    "Torr|Adjektiv": {
        exSwe: "Handduken är torr nu.",
        exArb: "المنشفة جافة الآن."
    },
    "Våt|Adjektiv": {
        exSwe: "Golvet är vått efter städningen.",
        exArb: "الأرضية مبللة بعد التنظيف."
    },
    "Full|Adjektiv": {
        exSwe: "Bussen är full, vi får vänta.",
        exArb: "الحافلة ممتلئة، يجب أن ننتظر."
    },
    "Tom|Adjektiv": {
        exSwe: "Kylen är tom, vi måste handla.",
        exArb: "الثلاجة فارغة، يجب أن نتسوق."
    },
    "Öppen|Adjektiv": {
        exSwe: "Fönstret är öppet.",
        exArb: "النافذة مفتوحة."
    },
    "Stängd|Adjektiv": {
        exSwe: "Affären är stängd på söndagar.",
        exArb: "المتجر مغلق يوم الأحد."
    },
    "Hög|Adjektiv": {
        exSwe: "Berget är mycket högt.",
        exArb: "الجبل عالٍ جداً."
    },
    "Låg|Adjektiv": {
        exSwe: "Bordet är för lågt för mig.",
        exArb: "الطاولة منخفضة جداً لي."
    },
    "Bred|Adjektiv": {
        exSwe: "Vägen är bred nog för två bilar.",
        exArb: "الطريق عريض بما يكفي لسيارتين."
    },
    "Smal|Adjektiv": {
        exSwe: "Gatan är för smal för lastbilar.",
        exArb: "الشارع ضيق جداً للشاحنات."
    },
    "Djup|Adjektiv": {
        exSwe: "Sjön är djup på mitten.",
        exArb: "البحيرة عميقة في الوسط."
    },
    "Grund|Adjektiv": {
        exSwe: "Vattnet är grunt vid stranden.",
        exArb: "الماء ضحل عند الشاطئ."
    },
    "Tung|Adjektiv": {
        exSwe: "Väskan är för tung att bära.",
        exArb: "الحقيبة ثقيلة جداً للحمل."
    },
    "Ljus|Adjektiv": {
        exSwe: "Rummet är ljust och fint.",
        exArb: "الغرفة مضيئة وجميلة."
    },
    "Mörk|Adjektiv": {
        exSwe: "Det är mörkt ute på kvällen.",
        exArb: "الجو مظلم في الخارج في المساء."
    },

    // ==========================================
    // MORE PLACES
    // ==========================================
    "Stad|Substantiv": {
        exSwe: "Stockholm är en vacker stad.",
        exArb: "ستوكهولم مدينة جميلة."
    },
    "By|Substantiv": {
        exSwe: "Morfar bor i en liten by.",
        exArb: "يسكن جدي في قرية صغيرة."
    },
    "Land|Substantiv": {
        exSwe: "Sverige är ett stort land.",
        exArb: "السويد بلد كبير."
    },
    "Skog|Substantiv": {
        exSwe: "Vi plockar svamp i skogen.",
        exArb: "نجمع الفطر في الغابة."
    },
    "Sjö|Substantiv": {
        exSwe: "Vi badar i sjön på sommaren.",
        exArb: "نسبح في البحيرة في الصيف."
    },
    "Hav|Substantiv": {
        exSwe: "Havet är blått och vackert.",
        exArb: "البحر أزرق وجميل."
    },
    "Strand|Substantiv": {
        exSwe: "Vi sitter på stranden och solar.",
        exArb: "نجلس على الشاطئ ونتشمس."
    },
    "Berg|Substantiv": {
        exSwe: "Vi klättrar upp på berget.",
        exArb: "نتسلق الجبل."
    },
    "Älv|Substantiv": {
        exSwe: "Älven rinner genom staden.",
        exArb: "يجري النهر عبر المدينة."
    },
    "Ö|Substantiv": {
        exSwe: "Gotland är en svensk ö.",
        exArb: "غوتلاند جزيرة سويدية."
    },
    "Park|Substantiv": {
        exSwe: "Vi promenerar i parken.",
        exArb: "نتمشى في الحديقة."
    },
    "Trädgård|Substantiv": {
        exSwe: "Hon odlar tomater i trädgården.",
        exArb: "تزرع الطماطم في الحديقة."
    },
    "Gata|Substantiv": {
        exSwe: "Vi bor på en lugn gata.",
        exArb: "نسكن في شارع هادئ."
    },
    "Väg|Substantiv": {
        exSwe: "Vägen till skolan är kort.",
        exArb: "الطريق إلى المدرسة قصير."
    },
    "Bro|Substantiv": {
        exSwe: "Vi går över bron.",
        exArb: "نمشي فوق الجسر."
    },
    "Torn|Substantiv": {
        exSwe: "Tornet är högt.",
        exArb: "البرج عالٍ."
    },
    "Kyrka|Substantiv": {
        exSwe: "Kyrkan är gammal och vacker.",
        exArb: "الكنيسة قديمة وجميلة."
    },
    "Moské|Substantiv": {
        exSwe: "Det finns en moské i staden.",
        exArb: "يوجد مسجد في المدينة."
    },
    "Museum|Substantiv": {
        exSwe: "Vi besöker museet imorgon.",
        exArb: "سنزور المتحف غداً."
    },
    "Teater|Substantiv": {
        exSwe: "Vi går på teater ikväll.",
        exArb: "سنذهب إلى المسرح الليلة."
    },
    "Bio|Substantiv": {
        exSwe: "Ska vi gå på bio?",
        exArb: "هل نذهب إلى السينما؟"
    },
    "Gym|Substantiv": {
        exSwe: "Jag tränar på gymmet tre gånger i veckan.",
        exArb: "أتدرب في صالة الرياضة ثلاث مرات في الأسبوع."
    },
    "Simhall|Substantiv": {
        exSwe: "Barnen simmar i simhallen.",
        exArb: "يسبح الأطفال في المسبح."
    },
    "Hotell|Substantiv": {
        exSwe: "Vi bor på hotell under resan.",
        exArb: "نسكن في الفندق أثناء الرحلة."
    },
    "Café|Substantiv": {
        exSwe: "Vi dricker kaffe på caféet.",
        exArb: "نشرب القهوة في المقهى."
    }
};

console.log('═══════════════════════════════════════════════════════════════');
console.log('     ADDING EXAMPLES - BATCH 3 (Correct Word Matching)');
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
