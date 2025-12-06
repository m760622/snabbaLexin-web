/**
 * Add examples - Batch 3 (100 more words)
 * Focus: More verbs, time expressions, prepositions, everyday words
 */

const fs = require('fs');

const examples = {
    // === MORE COMMON VERBS ===
    "Lexin002107": { // Badar - يستحم
        exSwe: "Barnen badar i havet på sommaren.",
        exArb: "يستحم الأطفال في البحر في الصيف."
    },
    "Lexin002567": { // Behöver - يحتاج
        exSwe: "Jag behöver hjälp med läxan.",
        exArb: "أحتاج مساعدة في الواجب."
    },
    "Lexin002718": { // Berättar - يروي
        exSwe: "Mormor berättar alltid roliga historier.",
        exArb: "جدتي تروي دائماً قصصاً مضحكة."
    },
    "Lexin002859": { // Besöker - يزور
        exSwe: "Vi besöker våra släktingar varje helg.",
        exArb: "نزور أقاربنا كل عطلة نهاية أسبوع."
    },
    "Lexin002960": { // Betalar - يدفع
        exSwe: "Jag betalar hyran den första varje månad.",
        exArb: "أدفع الإيجار في الأول من كل شهر."
    },
    "Lexin003114": { // Beställer - يطلب
        exSwe: "Jag beställer mat från restaurangen.",
        exArb: "أطلب الطعام من المطعم."
    },
    "Lexin003546": { // Blir - يصبح
        exSwe: "Det blir mörkt tidigt på vintern.",
        exArb: "يصبح الجو مظلماً مبكراً في الشتاء."
    },
    "Lexin004028": { // Bor - يسكن
        exSwe: "Jag bor i en lägenhet i centrum.",
        exArb: "أسكن في شقة في وسط المدينة."
    },
    "Lexin004177": { // Brinner - يحترق
        exSwe: "Huset brinner! Ring brandkåren!",
        exArb: "المنزل يحترق! اتصل بالإطفاء!"
    },
    "Lexin004292": { // Bryter - يكسر
        exSwe: "Var försiktig så du inte bryter glaset.",
        exArb: "كن حذراً حتى لا تكسر الزجاج."
    },
    "Lexin004619": { // Bygger - يبني
        exSwe: "De bygger ett nytt sjukhus i stan.",
        exArb: "يبنون مستشفى جديداً في المدينة."
    },
    "Lexin004697": { // Byter - يبدل
        exSwe: "Jag byter kläder innan middagen.",
        exArb: "أبدل ملابسي قبل العشاء."
    },
    "Lexin004772": { // Börjar - يبدأ
        exSwe: "Skolan börjar klockan åtta.",
        exArb: "تبدأ المدرسة الساعة الثامنة."
    },
    "Lexin005253": { // Dansar - يرقص
        exSwe: "Hon dansar salsa varje lördag.",
        exArb: "ترقص السالسا كل يوم سبت."
    },
    "Lexin005340": { // Delar - يقسم
        exSwe: "Vi delar på notan efter middagen.",
        exArb: "نقسم الفاتورة بعد العشاء."
    },
    "Lexin005477": { // Diskuterar - يناقش
        exSwe: "Vi diskuterar politik vid middagsbordet.",
        exArb: "نناقش السياسة على طاولة العشاء."
    },
    "Lexin005623": { // Drar - يسحب
        exSwe: "Dra i dörren för att öppna den.",
        exArb: "اسحب الباب لفتحه."
    },
    "Lexin005735": { // Drömmer - يحلم
        exSwe: "Jag drömmer om att resa till Japan.",
        exArb: "أحلم بالسفر إلى اليابان."
    },
    "Lexin006118": { // Dör - يموت
        exSwe: "Blommorna dör om du inte vattnar dem.",
        exArb: "الزهور تموت إذا لم تسقها."
    },
    "Lexin007472": { // Faller - يسقط
        exSwe: "Löven faller från träden på hösten.",
        exArb: "تسقط الأوراق من الأشجار في الخريف."
    },
    "Lexin007560": { // Fikar - يتناول فيكا
        exSwe: "Vi fikar tillsammans på jobbet klockan tre.",
        exArb: "نتناول القهوة معاً في العمل الساعة الثالثة."
    },
    "Lexin007614": { // Finner - يجد
        exSwe: "Jag finner det svårt att förstå grammatiken.",
        exArb: "أجد صعوبة في فهم القواعد."
    },
    "Lexin007704": { // Fixar - يصلح
        exSwe: "Pappa fixar cykeln som är trasig.",
        exArb: "أبي يصلح الدراجة المكسورة."
    },
    "Lexin007764": { // Flyttar - ينتقل
        exSwe: "Vi flyttar till ett nytt hus nästa månad.",
        exArb: "ننتقل إلى بيت جديد الشهر القادم."
    },
    "Lexin008114": { // Följer - يتبع
        exSwe: "Följ instruktionerna noggrant.",
        exArb: "اتبع التعليمات بدقة."
    },
    "Lexin008331": { // Förklarar - يشرح
        exSwe: "Läraren förklarar grammatiken tydligt.",
        exArb: "المعلم يشرح القواعد بوضوح."
    },
    "Lexin008619": { // Föreslår - يقترح
        exSwe: "Jag föreslår att vi tar en paus.",
        exArb: "أقترح أن نأخذ استراحة."
    },
    "Lexin010377": { // Glömmer - ينسى
        exSwe: "Jag glömmer alltid var jag lägger nycklarna.",
        exArb: "أنسى دائماً أين أضع المفاتيح."
    },
    "Lexin010634": { // Gråter - يبكي
        exSwe: "Bebisen gråter när hon är hungrig.",
        exArb: "يبكي الرضيع عندما يكون جائعاً."
    },
    "Lexin010834": { // Gungar - يتأرجح
        exSwe: "Barnen gungar på lekplatsen.",
        exArb: "يتأرجح الأطفال في الملعب."
    },

    // === TIME & NUMBERS ===
    "Lexin027934": { // Timme - ساعة
        exSwe: "Mötet varar i en timme.",
        exArb: "يستمر الاجتماع لمدة ساعة."
    },
    "Lexin030555": { // Vecka - أسبوع
        exSwe: "Jag tränar tre gånger i veckan.",
        exArb: "أتدرب ثلاث مرات في الأسبوع."
    },
    "Lexin017729": { // Månad - شهر
        exSwe: "Vi har bott här i sex månader.",
        exArb: "سكنا هنا منذ ستة أشهر."
    },
    "Lexin032064": { // År - سنة
        exSwe: "Jag har studerat svenska i två år.",
        exArb: "درست السويدية لمدة سنتين."
    },
    "Lexin010037": { // Gång - مرة
        exSwe: "Jag har varit i Paris en gång.",
        exArb: "زرت باريس مرة واحدة."
    },

    // === FOOD & DRINK ===
    "Lexin004185": { // Bröd - خبز
        exSwe: "Jag köper färskt bröd varje morgon.",
        exArb: "أشتري خبزاً طازجاً كل صباح."
    },
    "Lexin013476": { // Kaffe - قهوة
        exSwe: "Svenskar dricker mycket kaffe.",
        exArb: "السويديون يشربون الكثير من القهوة."
    },
    "Lexin027814": { // Te - شاي
        exSwe: "Vill du ha te eller kaffe?",
        exArb: "هل تريد شاياً أم قهوة؟"
    },
    "Lexin017389": { // Mat - طعام
        exSwe: "Maten i Sverige är annorlunda.",
        exArb: "الطعام في السويد مختلف."
    },
    "Lexin021417": { // Restaurang - مطعم
        exSwe: "Vi åt på en italiensk restaurang igår.",
        exArb: "أكلنا في مطعم إيطالي أمس."
    },
    "Lexin007878": { // Fisk - سمك
        exSwe: "Jag äter fisk två gånger i veckan.",
        exArb: "آكل السمك مرتين في الأسبوع."
    },
    "Lexin015553": { // Kyckling - دجاج
        exSwe: "Vi grillar kyckling på sommaren.",
        exArb: "نشوي الدجاج في الصيف."
    },
    "Lexin021570": { // Ris - أرز
        exSwe: "Jag lagar ris till middagen.",
        exArb: "أطبخ الأرز للعشاء."
    },
    "Lexin010735": { // Grönsaker - خضروات
        exSwe: "Det är viktigt att äta grönsaker.",
        exArb: "من المهم تناول الخضروات."
    },
    "Lexin025603": { // Socker - سكر
        exSwe: "Vill du ha socker i kaffet?",
        exArb: "هل تريد سكراً في القهوة؟"
    },
    "Lexin023421": { // Salt - ملح
        exSwe: "Maten behöver mer salt.",
        exArb: "الطعام يحتاج المزيد من الملح."
    },

    // === BODY PARTS ===
    "Lexin011699": { // Huvud - رأس
        exSwe: "Jag har ont i huvudet idag.",
        exArb: "رأسي يؤلمني اليوم."
    },
    "Lexin011375": { // Hand - يد
        exSwe: "Tvätta händerna innan du äter.",
        exArb: "اغسل يديك قبل الأكل."
    },
    "Lexin008062": { // Fot - قدم
        exSwe: "Jag har skadat min fot.",
        exArb: "جرحت قدمي."
    },
    "Lexin032071": { // Öga - عين
        exSwe: "Hon har vackra blå ögon.",
        exArb: "لديها عيون زرقاء جميلة."
    },
    "Lexin032243": { // Öra - أذن
        exSwe: "Jag har ont i örat.",
        exArb: "أذني تؤلمني."
    },
    "Lexin018583": { // Mun - فم
        exSwe: "Öppna munnen och säg A.",
        exArb: "افتح فمك وقل آ."
    },
    "Lexin018575": { // Mage - معدة
        exSwe: "Jag har ont i magen.",
        exArb: "معدتي تؤلمني."
    },
    "Lexin022692": { // Rygg - ظهر
        exSwe: "Han har problem med ryggen.",
        exArb: "لديه مشاكل في ظهره."
    },
    "Lexin011282": { // Hals - رقبة/حلق
        exSwe: "Jag har ont i halsen.",
        exArb: "حلقي يؤلمني."
    },
    "Lexin011189": { // Hår - شعر
        exSwe: "Hon har långt svart hår.",
        exArb: "لديها شعر أسود طويل."
    },

    // === TRANSPORT ===
    "Lexin004080": { // Buss - حافلة
        exSwe: "Jag tar bussen till jobbet.",
        exArb: "آخذ الحافلة إلى العمل."
    },
    "Lexin029044": { // Tåg - قطار
        exSwe: "Tåget till Malmö avgår klockan nio.",
        exArb: "القطار إلى مالمو يغادر الساعة التاسعة."
    },
    "Lexin007852": { // Flyg - طيران
        exSwe: "Flyget är försenat med två timmar.",
        exArb: "تأخرت الرحلة بساعتين."
    },
    "Lexin027665": { // Taxi - تاكسي
        exSwe: "Vi tar en taxi till flygplatsen.",
        exArb: "نأخذ تاكسي إلى المطار."
    },
    "Lexin028415": { // Tunnelbana - مترو
        exSwe: "Tunnelbanan är snabbaste sättet att resa i Stockholm.",
        exArb: "المترو هو أسرع وسيلة للسفر في ستوكهولم."
    },

    // === EMOTIONS ===
    "Lexin010301": { // Glad - سعيد
        exSwe: "Jag är glad att träffa dig!",
        exArb: "أنا سعيد بلقائك!"
    },
    "Lexin016061": { // Ledsen - حزين
        exSwe: "Jag är ledsen för att jag kom sent.",
        exArb: "أنا آسف لأنني تأخرت."
    },
    "Lexin001426": { // Arg - غاضب
        exSwe: "Han blev arg när han hörde nyheten.",
        exArb: "غضب عندما سمع الخبر."
    },
    "Lexin022009": { // Rädd - خائف
        exSwe: "Barnet är rädd för mörkret.",
        exArb: "الطفل خائف من الظلام."
    },
    "Lexin008155": { // Förälskad - عاشق
        exSwe: "Han är förälskad i sin klasskamrat.",
        exArb: "هو عاشق في زميلته في الصف."
    },
    "Lexin006779": { // Ensam - وحيد
        exSwe: "Hon känner sig ensam i den nya staden.",
        exArb: "تشعر بالوحدة في المدينة الجديدة."
    },
    "Lexin026522": { // Stressad - متوتر
        exSwe: "Jag är stressad inför provet.",
        exArb: "أنا متوتر قبل الامتحان."
    },
    "Lexin016721": { // Lugn - هادئ
        exSwe: "Var lugn, allt kommer att bli bra.",
        exArb: "كن هادئاً، كل شيء سيكون على ما يرام."
    },

    // === WEATHER ===
    "Lexin025597": { // Sol - شمس
        exSwe: "Solen skiner idag, det är fint väder.",
        exArb: "الشمس تشرق اليوم، الطقس جميل."
    },
    "Lexin022115": { // Regn - مطر
        exSwe: "Det regnar mycket i Sverige på hösten.",
        exArb: "تمطر كثيراً في السويد في الخريف."
    },
    "Lexin031110": { // Vind - ريح
        exSwe: "Det blåser stark vind idag.",
        exArb: "تهب رياح قوية اليوم."
    },
    "Lexin017867": { // Moln - غيوم
        exSwe: "Det är molnigt idag men inget regn.",
        exArb: "الجو غائم اليوم لكن بدون مطر."
    },

    // === COLORS ===
    "Lexin022604": { // Röd - أحمر
        exSwe: "Hon har en röd klänning.",
        exArb: "لديها فستان أحمر."
    },
    "Lexin003608": { // Blå - أزرق
        exSwe: "Himlen är blå idag.",
        exArb: "السماء زرقاء اليوم."
    },
    "Lexin010756": { // Grön - أخضر
        exSwe: "Gräset är grönt på sommaren.",
        exArb: "العشب أخضر في الصيف."
    },
    "Lexin010694": { // Gul - أصفر
        exSwe: "Solen är gul och varm.",
        exArb: "الشمس صفراء ودافئة."
    },
    "Lexin031212": { // Vit - أبيض
        exSwe: "Snön är vit och fin.",
        exArb: "الثلج أبيض وجميل."
    },
    "Lexin026943": { // Svart - أسود
        exSwe: "Han har svart hår och mörka ögon.",
        exArb: "لديه شعر أسود وعيون داكنة."
    },

    // === PLACES ===
    "Lexin023569": { // Sjukhus - مستشفى
        exSwe: "Min mamma arbetar på sjukhuset.",
        exArb: "أمي تعمل في المستشفى."
    },
    "Lexin001269": { // Apotek - صيدلية
        exSwe: "Jag köper medicin på apoteket.",
        exArb: "أشتري الدواء من الصيدلية."
    },
    "Lexin003329": { // Bibliotek - مكتبة
        exSwe: "Jag lånar böcker på biblioteket.",
        exArb: "أستعير الكتب من المكتبة."
    },
    "Lexin020535": { // Park - حديقة
        exSwe: "Vi går på promenad i parken.",
        exArb: "نتمشى في الحديقة."
    },
    "Lexin026044": { // Stad - مدينة
        exSwe: "Stockholm är Sveriges största stad.",
        exArb: "ستوكهولم هي أكبر مدينة في السويد."
    },
    "Lexin003734": { // By - قرية
        exSwe: "Jag växte upp i en liten by.",
        exArb: "كبرت في قرية صغيرة."
    },
    "Lexin015937": { // Land - بلد
        exSwe: "Vilket land kommer du från?",
        exArb: "من أي بلد أنت؟"
    },
    "Lexin027979": { // Torg - ساحة
        exSwe: "Vi träffas på torget klockan tre.",
        exArb: "نلتقي في الساحة الساعة الثالثة."
    }
};

// Load and parse
const dataContent = fs.readFileSync('./data.js', 'utf-8');
let dictionaryData;
try {
    const parsed = JSON.parse(dataContent.replace('const dictionaryData = ', '').replace(/;$/, ''));
    dictionaryData = parsed;
} catch (e) {
    const match = dataContent.match(/(?:const|var|let)\s+dictionaryData\s*=\s*(\[[\s\S]*?\]);/);
    dictionaryData = eval(match[1]);
}

let changesCount = 0;

for (const [lexinId, example] of Object.entries(examples)) {
    for (let i = 0; i < dictionaryData.length; i++) {
        if (dictionaryData[i][0] === lexinId && !dictionaryData[i][7]) {
            dictionaryData[i][7] = example.exSwe;
            dictionaryData[i][8] = example.exArb;
            changesCount++;
            console.log(`✓ ${dictionaryData[i][2]}`);
            break;
        }
    }
}

const newDataStr = 'const dictionaryData = ' + JSON.stringify(dictionaryData, null, 4) + ';';
fs.writeFileSync('./data.js', newDataStr);

console.log(`\n✅ Batch 3: Added ${changesCount} examples. Total: ~${141 + changesCount}`);
