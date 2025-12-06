/**
 * ADD EXAMPLES - CORRECT VERSION
 * 
 * This script adds examples using SWEDISH WORD MATCHING instead of Lexin IDs
 * to avoid the mismatch issues that occurred with the previous approach.
 * 
 * Strategy:
 * 1. Match by Swedish word (case-insensitive)
 * 2. Match by word type (Verb, Substantiv, Adjektiv, etc.)
 * 3. Only add if no example exists
 * 4. Log everything for verification
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

// Examples organized by Swedish word and type
// Format: { "word|type": { exSwe, exArb } }
// Type can be: "Verb", "Substantiv", "Adjektiv", "Adverb", or "" for any
const examples = {
    // ==========================================
    // COMMON ADJECTIVES
    // ==========================================
    "Bra|Adjektiv": {
        exSwe: "Maten är mycket bra här.",
        exArb: "الطعام جيد جداً هنا."
    },
    "Stor|Adjektiv": {
        exSwe: "Vi bor i ett stort hus med trädgård.",
        exArb: "نسكن في منزل كبير مع حديقة."
    },
    "Liten|Adjektiv": {
        exSwe: "Jag bor i en liten lägenhet.",
        exArb: "أسكن في شقة صغيرة."
    },
    "Ny|Adjektiv": {
        exSwe: "Jag köpte en ny bil förra veckan.",
        exArb: "اشتريت سيارة جديدة الأسبوع الماضي."
    },
    "Gammal|Adjektiv": {
        exSwe: "Min farfar är åttio år gammal.",
        exArb: "جدي عمره ثمانون سنة."
    },
    "Ung|Adjektiv": {
        exSwe: "Hon är för ung att köra bil.",
        exArb: "هي صغيرة جداً لقيادة السيارة."
    },
    "Vacker|Adjektiv": {
        exSwe: "Stockholm är en vacker stad.",
        exArb: "ستوكهولم مدينة جميلة."
    },
    "Snäll|Adjektiv": {
        exSwe: "Min granne är mycket snäll och hjälpsam.",
        exArb: "جاري لطيف ومفيد جداً."
    },
    "Arg|Adjektiv": {
        exSwe: "Mamma blev arg när jag kom hem sent.",
        exArb: "غضبت أمي عندما عدت متأخراً."
    },
    "Glad|Adjektiv": {
        exSwe: "Jag är glad att träffa dig!",
        exArb: "أنا سعيد بلقائك!"
    },
    "Ledsen|Adjektiv": {
        exSwe: "Jag är ledsen för det som hände.",
        exArb: "أنا آسف على ما حدث."
    },
    "Hungrig|Adjektiv": {
        exSwe: "Jag är hungrig, kan vi äta nu?",
        exArb: "أنا جائع، هل يمكننا الأكل الآن؟"
    },
    "Kall|Adjektiv": {
        exSwe: "Det är kallt ute idag.",
        exArb: "الجو بارد في الخارج اليوم."
    },
    "Varm|Adjektiv": {
        exSwe: "Sommaren i Sverige kan vara mycket varm.",
        exArb: "الصيف في السويد يمكن أن يكون حاراً جداً."
    },
    "Långsam|Adjektiv": {
        exSwe: "Bussen är långsam, jag tar tåget istället.",
        exArb: "الحافلة بطيئة، سآخذ القطار بدلاً."
    },
    "Snabb|Adjektiv": {
        exSwe: "Han springer snabbt.",
        exArb: "هو يركض بسرعة."
    },
    "Dyr|Adjektiv": {
        exSwe: "Den här jackan är för dyr.",
        exArb: "هذه السترة غالية جداً."
    },
    "Billig|Adjektiv": {
        exSwe: "Mataffären har billiga grönsaker.",
        exArb: "متجر الطعام لديه خضروات رخيصة."
    },
    "Svår|Adjektiv": {
        exSwe: "Svenska grammatik är svår att lära sig.",
        exArb: "قواعد اللغة السويدية صعبة التعلم."
    },
    "Lätt|Adjektiv": {
        exSwe: "Den här boken är lätt att läsa.",
        exArb: "هذا الكتاب سهل القراءة."
    },
    "Stressad|Adjektiv": {
        exSwe: "Jag är stressad inför provet.",
        exArb: "أنا متوتر قبل الامتحان."
    },
    "Trött|Adjektiv": {
        exSwe: "Jag är så trött efter jobbet.",
        exArb: "أنا متعب جداً بعد العمل."
    },
    "Sjuk|Adjektiv": {
        exSwe: "Min son är sjuk och kan inte gå till skolan.",
        exArb: "ابني مريض ولا يستطيع الذهاب للمدرسة."
    },
    "Frisk|Adjektiv": {
        exSwe: "Han är frisk igen efter förkylningen.",
        exArb: "هو بصحة جيدة مرة أخرى بعد الزكام."
    },
    "Hårt|Adjektiv": {
        exSwe: "Brödet är hårt, det är gammalt.",
        exArb: "الخبز يابس، إنه قديم."
    },
    "Mjuk|Adjektiv": {
        exSwe: "Soffan är mycket mjuk och bekväm.",
        exArb: "الأريكة ناعمة ومريحة جداً."
    },
    "Försenad|Adjektiv": {
        exSwe: "Flyget är försenat med två timmar.",
        exArb: "الطائرة متأخرة ساعتين."
    },

    // ==========================================
    // COMMON VERBS
    // ==========================================
    "Älskar|Verb": {
        exSwe: "Jag älskar min familj.",
        exArb: "أحب عائلتي."
    },
    "Gillar|Verb": {
        exSwe: "Jag gillar att läsa böcker.",
        exArb: "أحب قراءة الكتب."
    },
    "Hatar|Verb": {
        exSwe: "Han hatar att stiga upp tidigt.",
        exArb: "يكره الاستيقاظ مبكراً."
    },
    "Arbetar|Verb": {
        exSwe: "Jag arbetar på ett företag i stan.",
        exArb: "أعمل في شركة في المدينة."
    },
    "Studerar|Verb": {
        exSwe: "Hon studerar svenska på universitetet.",
        exArb: "تدرس السويدية في الجامعة."
    },
    "Bor|Verb": {
        exSwe: "Vi bor i en lägenhet i centrum.",
        exArb: "نسكن في شقة في الوسط."
    },
    "Äter|Verb": {
        exSwe: "Vi äter middag klockan sex.",
        exArb: "نتناول العشاء الساعة السادسة."
    },
    "Dricker|Verb": {
        exSwe: "Jag dricker kaffe varje morgon.",
        exArb: "أشرب القهوة كل صباح."
    },
    "Sover|Verb": {
        exSwe: "Barnen sover tidigt på vardagar.",
        exArb: "ينام الأطفال مبكراً في أيام الأسبوع."
    },
    "Vaknar|Verb": {
        exSwe: "Jag vaknar klockan sju varje dag.",
        exArb: "أستيقظ الساعة السابعة كل يوم."
    },
    "Går|Verb": {
        exSwe: "Jag går till jobbet varje dag.",
        exArb: "أذهب إلى العمل كل يوم."
    },
    "Springer|Verb": {
        exSwe: "Han springer fem kilometer varje morgon.",
        exArb: "يركض خمسة كيلومترات كل صباح."
    },
    "Simmar|Verb": {
        exSwe: "Hon simmar i havet på sommaren.",
        exArb: "تسبح في البحر في الصيف."
    },
    "Cyklar|Verb": {
        exSwe: "Jag cyklar till skolan.",
        exArb: "أركب الدراجة إلى المدرسة."
    },
    "Kör|Verb": {
        exSwe: "Han kör bil till jobbet.",
        exArb: "يقود السيارة إلى العمل."
    },
    "Flyger|Verb": {
        exSwe: "Vi flyger till Spanien i sommar.",
        exArb: "سنسافر بالطائرة إلى إسبانيا في الصيف."
    },
    "Läser|Verb": {
        exSwe: "Hon läser en bok varje vecka.",
        exArb: "تقرأ كتاباً كل أسبوع."
    },
    "Skriver|Verb": {
        exSwe: "Jag skriver ett brev till min vän.",
        exArb: "أكتب رسالة لصديقي."
    },
    "Talar|Verb": {
        exSwe: "Han talar tre språk flytande.",
        exArb: "يتحدث ثلاث لغات بطلاقة."
    },
    "Lyssnar|Verb": {
        exSwe: "Jag lyssnar på musik när jag städar.",
        exArb: "أستمع للموسيقى عندما أنظف."
    },
    "Tittar|Verb": {
        exSwe: "Vi tittar på TV på kvällen.",
        exArb: "نشاهد التلفاز في المساء."
    },
    "Köper|Verb": {
        exSwe: "Jag köper mat i affären.",
        exArb: "أشتري الطعام من المتجر."
    },
    "Säljer|Verb": {
        exSwe: "De säljer sina gamla möbler.",
        exArb: "يبيعون أثاثهم القديم."
    },
    "Betalar|Verb": {
        exSwe: "Kan jag betala med kort?",
        exArb: "هل يمكنني الدفع بالبطاقة؟"
    },
    "Hjälper|Verb": {
        exSwe: "Hon hjälper sin mamma med matlagningen.",
        exArb: "تساعد أمها في الطبخ."
    },
    "Behöver|Verb": {
        exSwe: "Jag behöver din hjälp.",
        exArb: "أحتاج مساعدتك."
    },
    "Vill|Verb": {
        exSwe: "Jag vill lära mig svenska.",
        exArb: "أريد تعلم السويدية."
    },
    "Kan|Verb": {
        exSwe: "Hon kan spela piano.",
        exArb: "تستطيع العزف على البيانو."
    },
    "Måste|Verb": {
        exSwe: "Jag måste gå nu.",
        exArb: "يجب أن أذهب الآن."
    },
    "Ska|Verb": {
        exSwe: "Vi ska resa till Thailand nästa år.",
        exArb: "سنسافر إلى تايلاند العام القادم."
    },
    "Börjar|Verb": {
        exSwe: "Skolan börjar klockan åtta.",
        exArb: "تبدأ المدرسة الساعة الثامنة."
    },
    "Slutar|Verb": {
        exSwe: "Jobbet slutar klockan fem.",
        exArb: "ينتهي العمل الساعة الخامسة."
    },
    "Ringer|Verb": {
        exSwe: "Jag ringer dig senare.",
        exArb: "سأتصل بك لاحقاً."
    },
    "Skickar|Verb": {
        exSwe: "Hon skickar ett meddelande till mig.",
        exArb: "ترسل لي رسالة."
    },
    "Tar|Verb": {
        exSwe: "Jag tar bussen till jobbet.",
        exArb: "آخذ الحافلة إلى العمل."
    },
    "Ger|Verb": {
        exSwe: "Mamma ger mig pengar varje vecka.",
        exArb: "أمي تعطيني مالاً كل أسبوع."
    },
    "Säger|Verb": {
        exSwe: "Läraren säger att vi har prov imorgon.",
        exArb: "المعلم يقول أن لدينا امتحان غداً."
    },
    "Tänker|Verb": {
        exSwe: "Jag tänker på dig ofta.",
        exArb: "أفكر فيك كثيراً."
    },
    "Tycker|Verb": {
        exSwe: "Jag tycker att filmen var bra.",
        exArb: "أعتقد أن الفيلم كان جيداً."
    },
    "Gråter|Verb": {
        exSwe: "Bebisen gråter när hon är trött.",
        exArb: "يبكي الطفل عندما يكون متعباً."
    },
    "Skrattar|Verb": {
        exSwe: "Alla skrattar när han berättar vitsar.",
        exArb: "الجميع يضحكون عندما يروي نكتاً."
    },
    "Ler|Verb": {
        exSwe: "Hon ler alltid när hon ser mig.",
        exArb: "تبتسم دائماً عندما تراني."
    },
    "Lagar|Verb": {
        exSwe: "Pappa lagar mat idag.",
        exArb: "أبي يطبخ اليوم."
    },
    "Städar|Verb": {
        exSwe: "Vi städar hemma varje lördag.",
        exArb: "ننظف البيت كل سبت."
    },
    "Tvättar|Verb": {
        exSwe: "Jag tvättar kläder två gånger i veckan.",
        exArb: "أغسل الملابس مرتين في الأسبوع."
    },
    "Diskar|Verb": {
        exSwe: "Han diskar efter middagen.",
        exArb: "يغسل الصحون بعد العشاء."
    },
    "Duschar|Verb": {
        exSwe: "Jag duschar varje morgon.",
        exArb: "أستحم كل صباح."
    },
    "Badar|Verb": {
        exSwe: "Barnen badar i sjön på sommaren.",
        exArb: "يستحم الأطفال في البحيرة في الصيف."
    },
    "Borstar|Verb": {
        exSwe: "Barnen borstar tänderna före läggdags.",
        exArb: "يفرشي الأطفال أسنانهم قبل النوم."
    },
    "Klär|Verb": {
        exSwe: "Hon klär sig snyggt varje dag.",
        exArb: "ترتدي ملابس أنيقة كل يوم."
    },
    "Bakar|Verb": {
        exSwe: "Mormor bakar bröd varje helg.",
        exArb: "جدتي تخبز الخبز كل عطلة."
    },
    "Träffar|Verb": {
        exSwe: "Jag träffar mina vänner på lördagar.",
        exArb: "أقابل أصدقائي يوم السبت."
    },
    "Besöker|Verb": {
        exSwe: "Vi besöker våra släktingar varje helg.",
        exArb: "نزور أقاربنا كل عطلة."
    },
    "Bråkar|Verb": {
        exSwe: "Barnen bråkar om leksaker ibland.",
        exArb: "يتشاجر الأطفال على الألعاب أحياناً."
    },
    "Pratar|Verb": {
        exSwe: "Hon pratar i telefon länge.",
        exArb: "تتحدث في الهاتف طويلاً."
    },
    "Lär sig|Verb": {
        exSwe: "Han lär sig svenska på SFI.",
        exArb: "يتعلم السويدية في SFI."
    },
    "Försöker|Verb": {
        exSwe: "Jag försöker att förstå.",
        exArb: "أحاول أن أفهم."
    },
    "Glömmer|Verb": {
        exSwe: "Jag glömmer alltid mina nycklar.",
        exArb: "أنسى دائماً مفاتيحي."
    },
    "Hittar|Verb": {
        exSwe: "Jag hittar inte min telefon.",
        exArb: "لا أجد هاتفي."
    },

    // ==========================================
    // COMMON NOUNS - FAMILY
    // ==========================================
    "Mamma|Substantiv": {
        exSwe: "Mamma, var är mina skor?",
        exArb: "ماما، أين حذائي؟"
    },
    "Pappa|Substantiv": {
        exSwe: "Pappa arbetar på ett kontor.",
        exArb: "أبي يعمل في مكتب."
    },
    "Mor|Substantiv": {
        exSwe: "Min mor lagar alltid god mat.",
        exArb: "أمي تطبخ دائماً طعاماً لذيذاً."
    },
    "Far|Substantiv": {
        exSwe: "Min far är lärare.",
        exArb: "أبي معلم."
    },
    "Bror|Substantiv": {
        exSwe: "Min bror är äldre än mig.",
        exArb: "أخي أكبر مني."
    },
    "Syster|Substantiv": {
        exSwe: "Min syster bor i Göteborg.",
        exArb: "أختي تسكن في يوتيبوري."
    },
    "Farfar|Substantiv": {
        exSwe: "Farfar berättar alltid roliga historier.",
        exArb: "جدي (أبو أبي) يحكي دائماً قصصاً مضحكة."
    },
    "Farmor|Substantiv": {
        exSwe: "Farmor bakar de bästa kakorna.",
        exArb: "جدتي (أم أبي) تخبز أفضل الكعك."
    },
    "Morfar|Substantiv": {
        exSwe: "Morfar bor i södra Sverige.",
        exArb: "جدي (أبو أمي) يسكن في جنوب السويد."
    },
    "Mormor|Substantiv": {
        exSwe: "Mormor lärde mig att sticka.",
        exArb: "جدتي (أم أمي) علمتني الحياكة."
    },
    "Son|Substantiv": {
        exSwe: "Min son går i första klass.",
        exArb: "ابني في الصف الأول."
    },
    "Dotter|Substantiv": {
        exSwe: "Min dotter studerar medicin.",
        exArb: "ابنتي تدرس الطب."
    },
    "Barn|Substantiv": {
        exSwe: "Barnen leker i parken.",
        exArb: "يلعب الأطفال في الحديقة."
    },
    "Pojke|Substantiv": {
        exSwe: "Pojken spelar fotboll.",
        exArb: "الولد يلعب كرة القدم."
    },
    "Flicka|Substantiv": {
        exSwe: "Flickan går i skolan.",
        exArb: "الفتاة تذهب للمدرسة."
    },
    "Man|Substantiv": {
        exSwe: "Mannen vid busshållplatsen är min granne.",
        exArb: "الرجل عند موقف الحافلات جاري."
    },
    "Kvinna|Substantiv": {
        exSwe: "Kvinnan arbetar som läkare.",
        exArb: "المرأة تعمل كطبيبة."
    },
    "Familj|Substantiv": {
        exSwe: "Min familj kommer från Syrien.",
        exArb: "عائلتي من سوريا."
    },
    "Farbror|Substantiv": {
        exSwe: "Min farbror bor i Malmö.",
        exArb: "عمي يسكن في مالمو."
    },
    "Faster|Substantiv": {
        exSwe: "Faster kommer på besök imorgon.",
        exArb: "عمتي ستزورنا غداً."
    },
    "Morbror|Substantiv": {
        exSwe: "Morbror har tre barn.",
        exArb: "خالي لديه ثلاثة أطفال."
    },
    "Moster|Substantiv": {
        exSwe: "Moster bor nära oss.",
        exArb: "خالتي تسكن قريباً منا."
    },
    "Kusin|Substantiv": {
        exSwe: "Min kusin och jag är lika gamla.",
        exArb: "ابن عمي وأنا بنفس العمر."
    },

    // ==========================================
    // COMMON NOUNS - PLACES & THINGS
    // ==========================================
    "Hus|Substantiv": {
        exSwe: "Vi bor i ett rött hus.",
        exArb: "نسكن في منزل أحمر."
    },
    "Lägenhet|Substantiv": {
        exSwe: "Denna lägenhet har tre rum.",
        exArb: "هذه الشقة بها ثلاث غرف."
    },
    "Skola|Substantiv": {
        exSwe: "Barnen går till skolan varje dag.",
        exArb: "يذهب الأطفال إلى المدرسة كل يوم."
    },
    "Arbete|Substantiv": {
        exSwe: "Jag ska börja mitt nya arbete på måndag.",
        exArb: "سأبدأ عملي الجديد يوم الإثنين."
    },
    "Affär|Substantiv": {
        exSwe: "Det finns en mataffär nära mitt hus.",
        exArb: "يوجد متجر طعام قريب من بيتي."
    },
    "Restaurang|Substantiv": {
        exSwe: "Vi äter på restaurang ibland.",
        exArb: "نأكل في المطعم أحياناً."
    },
    "Sjukhus|Substantiv": {
        exSwe: "Min mamma arbetar på sjukhuset.",
        exArb: "أمي تعمل في المستشفى."
    },
    "Bank|Substantiv": {
        exSwe: "Jag måste gå till banken idag.",
        exArb: "يجب أن أذهب إلى البنك اليوم."
    },
    "Apotek|Substantiv": {
        exSwe: "Jag köper medicin på apoteket.",
        exArb: "أشتري الدواء من الصيدلية."
    },
    "Bibliotek|Substantiv": {
        exSwe: "Hon lånar böcker på biblioteket.",
        exArb: "تستعير الكتب من المكتبة."
    },
    "Station|Substantiv": {
        exSwe: "Tåget avgår från centralstationen.",
        exArb: "يغادر القطار من المحطة المركزية."
    },
    "Flygplats|Substantiv": {
        exSwe: "Vi måste vara på flygplatsen två timmar innan.",
        exArb: "يجب أن نكون في المطار قبل ساعتين."
    },
    "Bil|Substantiv": {
        exSwe: "Vår bil är gammal men fungerar bra.",
        exArb: "سيارتنا قديمة لكنها تعمل جيداً."
    },
    "Buss|Substantiv": {
        exSwe: "Bussen kommer var tionde minut.",
        exArb: "تأتي الحافلة كل عشر دقائق."
    },
    "Tåg|Substantiv": {
        exSwe: "Tåget till Göteborg avgår klockan nio.",
        exArb: "يغادر القطار إلى يوتيبوري الساعة التاسعة."
    },
    "Cykel|Substantiv": {
        exSwe: "Min cykel är trasig.",
        exArb: "دراجتي مكسورة."
    },
    "Telefon|Substantiv": {
        exSwe: "Min telefon har inget batteri.",
        exArb: "هاتفي لا يوجد به بطارية."
    },
    "Dator|Substantiv": {
        exSwe: "Jag jobbar på datorn varje dag.",
        exArb: "أعمل على الكمبيوتر كل يوم."
    },
    "Bok|Substantiv": {
        exSwe: "Jag läser en intressant bok just nu.",
        exArb: "أقرأ كتاباً مثيراً للاهتمام الآن."
    },
    "Mat|Substantiv": {
        exSwe: "Maten var mycket god.",
        exArb: "كان الطعام لذيذاً جداً."
    },
    "Vatten|Substantiv": {
        exSwe: "Det är viktigt att dricka vatten.",
        exArb: "من المهم شرب الماء."
    },
    "Kaffe|Substantiv": {
        exSwe: "Jag dricker kaffe varje morgon.",
        exArb: "أشرب القهوة كل صباح."
    },
    "Bröd|Substantiv": {
        exSwe: "Vi köper färskt bröd från bageriet.",
        exArb: "نشتري خبزاً طازجاً من المخبز."
    },
    "Mjölk|Substantiv": {
        exSwe: "Mjölken är slut, vi måste köpa mer.",
        exArb: "انتهى الحليب، يجب أن نشتري المزيد."
    },
    "Pengar|Substantiv": {
        exSwe: "Jag har inga pengar.",
        exArb: "ليس لدي مال."
    },
    "Tid|Substantiv": {
        exSwe: "Jag har inte tid nu.",
        exArb: "ليس لدي وقت الآن."
    },
    "Dag|Substantiv": {
        exSwe: "Ha en bra dag!",
        exArb: "أتمنى لك يوماً سعيداً!"
    },
    "Vecka|Substantiv": {
        exSwe: "Vi reser nästa vecka.",
        exArb: "نسافر الأسبوع القادم."
    },
    "År|Substantiv": {
        exSwe: "Jag har bott i Sverige i tre år.",
        exArb: "سكنت في السويد ثلاث سنوات."
    },
    "Väder|Substantiv": {
        exSwe: "Vädret är fint idag.",
        exArb: "الطقس جميل اليوم."
    },
    "Vinter|Substantiv": {
        exSwe: "Vintern i Sverige är kall.",
        exArb: "الشتاء في السويد بارد."
    },
    "Sommar|Substantiv": {
        exSwe: "På sommaren är det ljust ute hela natten.",
        exArb: "في الصيف يكون الضوء موجوداً طوال الليل."
    },

    // ==========================================
    // COMMON ADVERBS & PREPOSITIONS
    // ==========================================
    "Här|Adverb": {
        exSwe: "Kom hit, stå här.",
        exArb: "تعال هنا، قف هنا."
    },
    "Där|Adverb": {
        exSwe: "Han bor där borta.",
        exArb: "يسكن هناك."
    },
    "Nu|Adverb": {
        exSwe: "Jag måste gå nu.",
        exArb: "يجب أن أذهب الآن."
    },
    "Snart|Adverb": {
        exSwe: "Vi ses snart!",
        exArb: "نراك قريباً!"
    },
    "Redan|Adverb": {
        exSwe: "Jag har redan ätit.",
        exArb: "أكلت بالفعل."
    },
    "Alltid|Adverb": {
        exSwe: "Hon är alltid glad.",
        exArb: "هي دائماً سعيدة."
    },
    "Aldrig|Adverb": {
        exSwe: "Jag har aldrig varit i Japan.",
        exArb: "لم أذهب أبداً إلى اليابان."
    },
    "Ibland|Adverb": {
        exSwe: "Ibland regnar det i Sverige.",
        exArb: "أحياناً تمطر في السويد."
    },
    "Ofta|Adverb": {
        exSwe: "Vi träffas ofta.",
        exArb: "نلتقي كثيراً."
    },
    "Sällan|Adverb": {
        exSwe: "Han kommer sällan hit.",
        exArb: "نادراً ما يأتي إلى هنا."
    },
    "Hemma|Adverb": {
        exSwe: "Jag är hemma nu.",
        exArb: "أنا في البيت الآن."
    },
    "Ute|Adverb": {
        exSwe: "Det är kallt ute.",
        exArb: "الجو بارد في الخارج."
    },
    "Inne|Adverb": {
        exSwe: "Det är varmt inne.",
        exArb: "الجو دافئ في الداخل."
    },
    "Tillsammans|Adverb": {
        exSwe: "Vi jobbar tillsammans.",
        exArb: "نعمل معاً."
    },
    "Kanske|Adverb": {
        exSwe: "Kanske kommer jag imorgon.",
        exArb: "ربما آتي غداً."
    }
};

console.log('═══════════════════════════════════════════════════════════════');
console.log('     ADDING EXAMPLES WITH CORRECT WORD MATCHING');
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

        // Match word (case-insensitive) and type (if specified)
        const wordMatch = entryWord && entryWord.toLowerCase() === targetWord.toLowerCase();
        const typeMatch = !targetType || (entryType && entryType.includes(targetType));

        if (wordMatch && typeMatch) {
            found = true;

            // Check if already has example
            if (entry[7] && entry[7].trim() !== '') {
                // Skip - already has example
                alreadyHasExample++;
            } else {
                // Add example
                dictionaryData[i][7] = example.exSwe;
                dictionaryData[i][8] = example.exArb;
                addedCount++;
                console.log(`✓ ${entryWord} (${entryType})`);
            }
            break; // Only add to first matching entry
        }
    }

    if (!found) {
        console.log(`❌ Not found: ${targetWord} (${targetType})`);
        notFound++;
    }
}

// Save updated data
const newDataStr = 'const dictionaryData = ' + JSON.stringify(dictionaryData, null, 4) + ';';
fs.writeFileSync('./data.js', newDataStr);

console.log('\n═══════════════════════════════════════════════════════════════');
console.log(`✅ Examples added: ${addedCount}`);
console.log(`⚠️  Already had examples: ${alreadyHasExample}`);
console.log(`❌ Not found: ${notFound}`);
console.log(`📊 Total attempted: ${Object.keys(examples).length}`);
console.log('═══════════════════════════════════════════════════════════════');
