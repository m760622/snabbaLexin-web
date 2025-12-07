/**
 * ADD EXAMPLES - BATCH 2 (Correct Word Matching)
 * More everyday words for learners
 */

const fs = require('fs');

// Load and parse dictionary
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
    // MORE VERBS - DAILY ACTIVITIES
    // ==========================================
    "Ringar|Verb": {
        exSwe: "Jag ringer till dig ikväll.",
        exArb: "سأتصل بك الليلة."
    },
    "Svarar|Verb": {
        exSwe: "Han svarar alltid på mina frågor.",
        exArb: "يجيب دائماً على أسئلتي."
    },
    "Frågar|Verb": {
        exSwe: "Jag frågar läraren om jag inte förstår.",
        exArb: "أسأل المعلم إذا لم أفهم."
    },
    "Berättar|Verb": {
        exSwe: "Mormor berättar sagor för barnen.",
        exArb: "جدتي تحكي قصصاً للأطفال."
    },
    "Förklarar|Verb": {
        exSwe: "Läraren förklarar grammatiken tydligt.",
        exArb: "يشرح المعلم القواعد بوضوح."
    },
    "Förstår|Verb": {
        exSwe: "Jag förstår inte vad du menar.",
        exArb: "لا أفهم ما تعني."
    },
    "Känner|Verb": {
        exSwe: "Jag känner mig trött idag.",
        exArb: "أشعر بالتعب اليوم."
    },
    "Hoppas|Verb": {
        exSwe: "Jag hoppas att du mår bra.",
        exArb: "أتمنى أن تكون بخير."
    },
    "Tror|Verb": {
        exSwe: "Jag tror att det kommer regna imorgon.",
        exArb: "أعتقد أنها ستمطر غداً."
    },
    "Vet|Verb": {
        exSwe: "Jag vet inte vad jag ska göra.",
        exArb: "لا أعرف ماذا أفعل."
    },
    "Kommer ihåg|Verb": {
        exSwe: "Jag kommer ihåg ditt ansikte.",
        exArb: "أتذكر وجهك."
    },
    "Planerar|Verb": {
        exSwe: "Vi planerar en resa till Italien.",
        exArb: "نخطط لرحلة إلى إيطاليا."
    },
    "Bestämmer|Verb": {
        exSwe: "Vi bestämmer tillsammans.",
        exArb: "نقرر معاً."
    },
    "Väljer|Verb": {
        exSwe: "Du kan välja vilken du vill.",
        exArb: "يمكنك اختيار أي واحد تريد."
    },
    "Öppnar|Verb": {
        exSwe: "Kan du öppna fönstret?",
        exArb: "هل يمكنك فتح النافذة؟"
    },
    "Stänger|Verb": {
        exSwe: "Stäng dörren, det är kallt.",
        exArb: "أغلق الباب، الجو بارد."
    },
    "Sätter|Verb": {
        exSwe: "Hon sätter sig på stolen.",
        exArb: "تجلس على الكرسي."
    },
    "Ställer|Verb": {
        exSwe: "Jag ställer glaset på bordet.",
        exArb: "أضع الكوب على الطاولة."
    },
    "Lägger|Verb": {
        exSwe: "Lägg böckerna på hyllan.",
        exArb: "ضع الكتب على الرف."
    },
    "Håller|Verb": {
        exSwe: "Håll i handtaget.",
        exArb: "أمسك بالمقبض."
    },
    "Bär|Verb": {
        exSwe: "Han bär en tung väska.",
        exArb: "يحمل حقيبة ثقيلة."
    },
    "Kastar|Verb": {
        exSwe: "Kasta inte skräp på marken.",
        exArb: "لا ترمِ القمامة على الأرض."
    },
    "Hämtar|Verb": {
        exSwe: "Jag hämtar barnen från skolan.",
        exArb: "أجلب الأطفال من المدرسة."
    },
    "Lämnar|Verb": {
        exSwe: "Hon lämnar jobbet klockan fem.",
        exArb: "تغادر العمل الساعة الخامسة."
    },
    "Stannar|Verb": {
        exSwe: "Vi stannar hemma idag.",
        exArb: "نبقى في البيت اليوم."
    },
    "Väntar|Verb": {
        exSwe: "Vänta på mig, jag kommer snart.",
        exArb: "انتظرني، سآتي قريباً."
    },
    "Letar|Verb": {
        exSwe: "Jag letar efter mina nycklar.",
        exArb: "أبحث عن مفاتيحي."
    },
    "Söker|Verb": {
        exSwe: "Han söker jobb i Stockholm.",
        exArb: "يبحث عن عمل في ستوكهولم."
    },
    "Använder|Verb": {
        exSwe: "Jag använder telefonen varje dag.",
        exArb: "أستخدم الهاتف كل يوم."
    },
    "Sparar|Verb": {
        exSwe: "Vi sparar pengar för en ny bil.",
        exArb: "ندخر المال لسيارة جديدة."
    },
    "Handlar|Verb": {
        exSwe: "Jag handlar mat i affären.",
        exArb: "أتسوق الطعام من المتجر."
    },
    "Packar|Verb": {
        exSwe: "Vi packar väskorna inför resan.",
        exArb: "نحزم الحقائب للرحلة."
    },
    "Åker|Verb": {
        exSwe: "Vi åker till stranden på sommaren.",
        exArb: "نذهب إلى الشاطئ في الصيف."
    },
    "Reser|Verb": {
        exSwe: "Hon reser till Turkiet varje sommar.",
        exArb: "تسافر إلى تركيا كل صيف."
    },
    "Kommer|Verb": {
        exSwe: "Han kommer hem klockan sex.",
        exArb: "يعود للبيت الساعة السادسة."
    },
    "Flyttar|Verb": {
        exSwe: "Vi flyttar till en ny lägenhet.",
        exArb: "ننتقل إلى شقة جديدة."
    },
    "Byter|Verb": {
        exSwe: "Jag byter kläder efter träningen.",
        exArb: "أبدل ملابسي بعد التمرين."
    },
    "Reparerar|Verb": {
        exSwe: "Han reparerar bilar.",
        exArb: "يصلح السيارات."
    },
    "Målar|Verb": {
        exSwe: "Vi målar väggarna vita.",
        exArb: "نطلي الجدران باللون الأبيض."
    },
    "Bygger|Verb": {
        exSwe: "De bygger ett nytt hus.",
        exArb: "يبنون منزلاً جديداً."
    },

    // ==========================================
    // MORE NOUNS - BODY PARTS
    // ==========================================
    "Huvud|Substantiv": {
        exSwe: "Jag har ont i huvudet.",
        exArb: "رأسي يؤلمني."
    },
    "Öga|Substantiv": {
        exSwe: "Hon har blåa ögon.",
        exArb: "لديها عيون زرقاء."
    },
    "Öra|Substantiv": {
        exSwe: "Jag hör inte bra på höger öra.",
        exArb: "لا أسمع جيداً من الأذن اليمنى."
    },
    "Näsa|Substantiv": {
        exSwe: "Näsan är täppt, jag är förkyld.",
        exArb: "أنفي مسدود، أنا مزكوم."
    },
    "Mun|Substantiv": {
        exSwe: "Öppna munnen, säger tandläkaren.",
        exArb: "افتح فمك، يقول طبيب الأسنان."
    },
    "Tand|Substantiv": {
        exSwe: "Jag har ont i tanden.",
        exArb: "أسناني تؤلمني."
    },
    "Tunga|Substantiv": {
        exSwe: "Kaffet brände tungan.",
        exArb: "حرقت القهوة لساني."
    },
    "Hals|Substantiv": {
        exSwe: "Jag har ont i halsen.",
        exArb: "حلقي يؤلمني."
    },
    "Axel|Substantiv": {
        exSwe: "Han bar väskan på axeln.",
        exArb: "حمل الحقيبة على كتفه."
    },
    "Arm|Substantiv": {
        exSwe: "Jag bröt armen när jag var liten.",
        exArb: "كسرت ذراعي عندما كنت صغيراً."
    },
    "Hand|Substantiv": {
        exSwe: "Tvätta händerna före maten.",
        exArb: "اغسل يديك قبل الأكل."
    },
    "Finger|Substantiv": {
        exSwe: "Jag skar mig i fingret.",
        exArb: "جرحت إصبعي."
    },
    "Mage|Substantiv": {
        exSwe: "Jag har ont i magen.",
        exArb: "بطني تؤلمني."
    },
    "Rygg|Substantiv": {
        exSwe: "Han har ont i ryggen.",
        exArb: "ظهره يؤلمه."
    },
    "Ben|Substantiv": {
        exSwe: "Jag har ont i benen efter löpningen.",
        exArb: "ساقاي تؤلماني بعد الركض."
    },
    "Fot|Substantiv": {
        exSwe: "Jag går på fötterna.",
        exArb: "أمشي على قدمي."
    },
    "Knä|Substantiv": {
        exSwe: "Morfar har ont i knäna.",
        exArb: "ركبتا جدي تؤلمانه."
    },
    "Hjärta|Substantiv": {
        exSwe: "Hjärtat slår snabbare när man springer.",
        exArb: "القلب ينبض أسرع عند الركض."
    },
    "Blod|Substantiv": {
        exSwe: "Det kom blod från såret.",
        exArb: "خرج دم من الجرح."
    },
    "Hud|Substantiv": {
        exSwe: "Solen bränner huden.",
        exArb: "الشمس تحرق الجلد."
    },
    "Hår|Substantiv": {
        exSwe: "Hon har långt mörkt hår.",
        exArb: "لديها شعر طويل أسود."
    },

    // ==========================================
    // MORE NOUNS - FOOD & DRINK
    // ==========================================
    "Frukt|Substantiv": {
        exSwe: "Äpplen och apelsiner är frukter.",
        exArb: "التفاح والبرتقال فواكه."
    },
    "Grönsaker|Substantiv": {
        exSwe: "Det är viktigt att äta grönsaker.",
        exArb: "من المهم أكل الخضروات."
    },
    "Kött|Substantiv": {
        exSwe: "Vi äter kött tre gånger i veckan.",
        exArb: "نأكل اللحم ثلاث مرات في الأسبوع."
    },
    "Fisk|Substantiv": {
        exSwe: "Fisk är nyttigt att äta.",
        exArb: "السمك مفيد للأكل."
    },
    "Kyckling|Substantiv": {
        exSwe: "Vi lagar kyckling till middag.",
        exArb: "نطبخ الدجاج للعشاء."
    },
    "Ris|Substantiv": {
        exSwe: "Vi äter ris med kyckling.",
        exArb: "نأكل الأرز مع الدجاج."
    },
    "Potatis|Substantiv": {
        exSwe: "Svenskar älskar potatis.",
        exArb: "السويديون يحبون البطاطا."
    },
    "Ägg|Substantiv": {
        exSwe: "Jag äter ägg till frukost.",
        exArb: "آكل البيض على الفطور."
    },
    "Ost|Substantiv": {
        exSwe: "Jag vill ha ost på smörgåsen.",
        exArb: "أريد جبنة على الساندويتش."
    },
    "Smör|Substantiv": {
        exSwe: "Smör gör brödet godare.",
        exArb: "الزبدة تجعل الخبز ألذ."
    },
    "Socker|Substantiv": {
        exSwe: "Jag tar inte socker i kaffet.",
        exArb: "لا آخذ سكر في القهوة."
    },
    "Salt|Substantiv": {
        exSwe: "Soppan behöver mer salt.",
        exArb: "الحساء يحتاج المزيد من الملح."
    },
    "Soppa|Substantiv": {
        exSwe: "Mamma lagar god soppa.",
        exArb: "أمي تطبخ حساءً لذيذاً."
    },
    "Sallad|Substantiv": {
        exSwe: "Jag äter sallad varje dag.",
        exArb: "آكل السلطة كل يوم."
    },
    "Glass|Substantiv": {
        exSwe: "Barnen älskar glass på sommaren.",
        exArb: "الأطفال يحبون الآيس كريم في الصيف."
    },
    "Kaka|Substantiv": {
        exSwe: "Farmor bakar goda kakor.",
        exArb: "جدتي تخبز كعكاً لذيذاً."
    },
    "Te|Substantiv": {
        exSwe: "Jag dricker te på kvällen.",
        exArb: "أشرب الشاي في المساء."
    },
    "Juice|Substantiv": {
        exSwe: "Barnen dricker apelsinjuice.",
        exArb: "الأطفال يشربون عصير البرتقال."
    },

    // ==========================================
    // MORE NOUNS - CLOTHES
    // ==========================================
    "Tröja|Substantiv": {
        exSwe: "Ta på dig en varm tröja.",
        exArb: "ارتدِ سترة دافئة."
    },
    "Jacka|Substantiv": {
        exSwe: "Ta på dig jackan, det är kallt ute.",
        exArb: "ارتدِ السترة، الجو بارد في الخارج."
    },
    "Byxor|Substantiv": {
        exSwe: "Jag köpte nya byxor igår.",
        exArb: "اشتريت بنطلوناً جديداً البارحة."
    },
    "Kjol|Substantiv": {
        exSwe: "Hon har en röd kjol.",
        exArb: "لديها تنورة حمراء."
    },
    "Klänning|Substantiv": {
        exSwe: "Hon har en vacker klänning.",
        exArb: "لديها فستان جميل."
    },
    "Skjorta|Substantiv": {
        exSwe: "Han har en vit skjorta.",
        exArb: "لديه قميص أبيض."
    },
    "Sko|Substantiv": {
        exSwe: "Mina skor är för små.",
        exArb: "حذائي صغير جداً."
    },
    "Stövel|Substantiv": {
        exSwe: "Jag har vinterstövlar hemma.",
        exArb: "لدي جزمة شتوية في البيت."
    },
    "Mössa|Substantiv": {
        exSwe: "Ta på dig mössan, det är kallt.",
        exArb: "ارتدِ القبعة، الجو بارد."
    },
    "Handskar|Substantiv": {
        exSwe: "Jag behöver handskar på vintern.",
        exArb: "أحتاج قفازات في الشتاء."
    },
    "Halsduk|Substantiv": {
        exSwe: "Hon har en fin halsduk.",
        exArb: "لديها وشاح جميل."
    },
    "Väska|Substantiv": {
        exSwe: "Min väska är full med böcker.",
        exArb: "حقيبتي مليئة بالكتب."
    },
    "Glasögon|Substantiv": {
        exSwe: "Jag behöver glasögon för att läsa.",
        exArb: "أحتاج نظارات للقراءة."
    },

    // ==========================================
    // COLORS
    // ==========================================
    "Röd|Adjektiv": {
        exSwe: "Bilen är röd.",
        exArb: "السيارة حمراء."
    },
    "Blå|Adjektiv": {
        exSwe: "Himlen är blå idag.",
        exArb: "السماء زرقاء اليوم."
    },
    "Grön|Adjektiv": {
        exSwe: "Gräset är grönt på sommaren.",
        exArb: "العشب أخضر في الصيف."
    },
    "Gul|Adjektiv": {
        exSwe: "Solen är gul.",
        exArb: "الشمس صفراء."
    },
    "Vit|Adjektiv": {
        exSwe: "Snön är vit.",
        exArb: "الثلج أبيض."
    },
    "Svart|Adjektiv": {
        exSwe: "Katten är svart.",
        exArb: "القطة سوداء."
    },
    "Brun|Adjektiv": {
        exSwe: "Hunden har brun päls.",
        exArb: "الكلب له فرو بني."
    },
    "Grå|Adjektiv": {
        exSwe: "Himlen är grå idag.",
        exArb: "السماء رمادية اليوم."
    },
    "Rosa|Adjektiv": {
        exSwe: "Flickan har en rosa klänning.",
        exArb: "الفتاة لديها فستان وردي."
    },
    "Lila|Adjektiv": {
        exSwe: "Blommorna är lila.",
        exArb: "الزهور بنفسجية."
    },
    "Orange|Adjektiv": {
        exSwe: "Apelsinen är orange.",
        exArb: "البرتقالة برتقالية اللون."
    },

    // ==========================================
    // NUMBERS (as words)
    // ==========================================
    "Ett|": {
        exSwe: "Jag har ett barn.",
        exArb: "لدي طفل واحد."
    },
    "Två|": {
        exSwe: "Vi har två katter.",
        exArb: "لدينا قطتان."
    },
    "Tre|": {
        exSwe: "Det tar tre timmar att köra dit.",
        exArb: "يستغرق ثلاث ساعات للوصول."
    },
    "Fyra|": {
        exSwe: "Året har fyra årstider.",
        exArb: "السنة لها أربعة فصول."
    },
    "Fem|": {
        exSwe: "Jag arbetar fem dagar i veckan.",
        exArb: "أعمل خمسة أيام في الأسبوع."
    },
    "Sex|": {
        exSwe: "Butiken stänger klockan sex.",
        exArb: "يغلق المتجر الساعة السادسة."
    },
    "Sju|": {
        exSwe: "Veckan har sju dagar.",
        exArb: "الأسبوع فيه سبعة أيام."
    },
    "Åtta|": {
        exSwe: "Skolan börjar klockan åtta.",
        exArb: "تبدأ المدرسة الساعة الثامنة."
    },
    "Nio|": {
        exSwe: "Banken öppnar klockan nio.",
        exArb: "يفتح البنك الساعة التاسعة."
    },
    "Tio|": {
        exSwe: "Det kostar tio kronor.",
        exArb: "يكلف عشر كرونات."
    },
    "Hundra|": {
        exSwe: "Det var hundra personer på festen.",
        exArb: "كان هناك مائة شخص في الحفلة."
    },
    "Tusen|": {
        exSwe: "Boken kostar tusen kronor.",
        exArb: "يكلف الكتاب ألف كرونة."
    }
};

console.log('═══════════════════════════════════════════════════════════════');
console.log('     ADDING EXAMPLES - BATCH 2 (Correct Word Matching)');
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
