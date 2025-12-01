const fs = require('fs');

// Configuration
const LEXIN_PATH = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/Lexin20210201.csv';
const OUTPUT_PATH = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/new_level_data.json';

// Level Structure Rules
const LEVEL_RULES = [
    { count: 3, words: 2, minLen: 3, maxLen: 4 }, // Levels 1-3
    { count: 3, words: 3, minLen: 4, maxLen: 5 }, // Levels 4-6
    { count: 3, words: 4, minLen: 4, maxLen: 6 }, // Levels 7-9 (Relaxed minLen from 5 to 4)
    { count: 1, words: 5, minLen: 3, maxLen: 7 }  // Level 10 (Relaxed minLen from 4 to 3)
];

// Manual sentences for specific words (Inlined)
const MANUAL_SENTENCES = {
    "HAV": { s: "Fiskar simmar i havet.", t: "تسبح الأسماك في البحر." },
    "GOLV": { s: "Mattan ligger på golvet.", t: "السجادة ممدودة على الأرضية." },
    "LOKAL": { s: "Vi hyr en lokal till festen.", t: "نستأجر مكاناً للحفلة." },
    "VINKEL": { s: "Solen skiner i en annan vinkel.", t: "تسطع الشمس بزاوية أخرى." },
    "IGEN": { s: "Kom gärna tillbaka igen!", t: "أهلاً بك مجدداً!" },
    "BAKLÄXA": { s: "Han fick bakläxa på provet.", t: "رسب في الاختبار وعليه إعادته." },
    "AGG": { s: "Han hyser agg mot mig.", t: "إنه يحمل ضغينة ضدي." },
    "RAGG": { s: "Hunden ryste ragg.", t: "انتصب شعر الكلب." },
    "VID": { s: "Huset ligger vid sjön.", t: "يقع المنزل عند البحيرة." },
    "BITSK": { s: "Hunden var bitsk och arg.", t: "كان الكلب شرساً وغاضباً." },
    "DÄRFÖR": { s: "Jag är sjuk, därför stannar jag.", t: "أنا مريض، لذلك سأبقى." },
    "SLUTEN": { s: "Sällskapet var slutet.", t: "كانت المجموعة مغلقة." },
    "UNS": { s: "Inte ett uns sanning.", t: "ولا ذرة من الحقيقة." },
    "SANNA": { s: "Mina drömmar blev sanna.", t: "أصبحت أحلامي حقيقة." },
    "FISKAR": { s: "He fiskar i sjön.", t: "هو يصطاد في البحيرة." },
    "REST": { s: "Vi åt upp resten av maten.", t: "أكلنا بقية الطعام." },
    "OTAL": { s: "Ett otal gånger.", t: "مرات لا تحصى." },
    "STORM": { s: "Stormen fällde många träd.", t: "أسقطت العاصفة أشجاراً كثيرة." },
    "FAST": { s: "Han satt fast i trafiken.", t: "علق في الازدحام المروري." },
    "NIT": { s: "Det var en nit.", t: "كانت ورقة خاسرة." },
    "PIL": { s: "Han sköt en pil.", t: "أطلق سهماً." },
    "RÖN": { s: "Nya rön om hälsa.", t: "اكتشافات جديدة حول الصحة." },
    "SNÄV": { s: "Kjolen är för snäv.", t: "التنورة ضيقة جداً." },
    "BLODIG": { s: "Biffen var blodig.", t: "شريحة اللحم كانت نيئة." },
    "BILD": { s: "En fin bild på familjen.", t: "صورة جميلة للعائلة." },
    "LIVS": { s: "Det är en livs levande älg.", t: "إنه лось حي يرزق." },
    "SKIT": { s: "Det var bara skit.", t: "كان مجرد هراء." },
    "VECKA": { s: "Vi ses nästa vecka.", t: "نلتقي الأسبوع القادم." },
    "ANING": { s: "Jag har ingen aning.", t: "ليس لدي أي فكرة." },
    "MATT": { s: "Färgen är matt.", t: "اللون باهت." },
    "FIL": { s: "Jag äter fil till frukost.", t: "آكل اللبن الرائب للإفطار." },
    "SUR": { s: "Citronen är sur.", t: "الليمون حامض." },
    "RUS": { s: "Han sov ruset av sig.", t: "نام ليزول عنه السكر." },
    "SUCK": { s: "Hon drog en djup suck.", t: "تنهدت بعمق." },
    "LAX": { s: "Lax är nyttig mat.", t: "السلمون طعام صحي." },
    "RUIN": { s: "Huset är en ruin.", t: "المنزل عبارة عن حطام." },
    "TOK": { s: "Det gick på tok.", t: "سارت الأمور بشكل خاطئ." },
    "SMAL": { s: "Vägen är smal.", t: "الطريق ضيق." },
    "GÅR": { s: "Tiden går fort.", t: "الوقت يمضي بسرعة." },
    "AKT": { s: "Ta dig i akt!", t: "احذر!" },
    "KRAS": { s: "Vasen gick i kras.", t: "تحطمت المزهرية." },
    "RING": { s: "Hon bär en guldring.", t: "هي ترتدي خاتماً ذهبياً." },
    "ÅLIGGER": { s: "Det åligger dig att svara.", t: "يقع على عاتقك الرد." },
    "RIS": { s: "Vi äter ris och kyckling.", t: "نأكل الأرز والدجاج." },
    "LÄN": { s: "Vi bor i Skåne län.", t: "نسكن في محافظة سكونه." },
    "LÄNK": { s: "Klicka på länken.", t: "اضغط على الرابط." },
    "KAN": { s: "Jag kan simma.", t: "أستطيع السباحة." },
    "STILLA": { s: "Havet ligger stilla.", t: "البحر هادئ." },
    "SILL": { s: "Sill är gott.", t: "الرنجة لذيذة." },
    "VIT": { s: "Snön är vit.", t: "الثلج أبيض." },
    "ANTAL": { s: "Ett stort antal fåglar.", t: "عدد كبير من الطيور." },
    "OND": { s: "Han har ont i magen.", t: "لديه ألم في البطن." },
    "ORDNAR": { s: "Jag ordnar festen.", t: "أنا أنظم الحفلة." },
    "NORDLIG": { s: "Vinden är nordlig.", t: "الرياح شمالية." },
    "PORT": { s: "Öppna porten!", t: "افتح البوابة!" },
    "ROT": { s: "Trädet har en djup rot.", t: "للشجرة جذر عميق." },
    "STATY": { s: "En staty av kungen.", t: "تمثال للملك." },
    "VARS": { s: "En man vars bil är röd.", t: "رجل سيارته حمراء." },
    "MOT": { s: "Vi går mot stranden.", t: "نحن ذاهبون نحو الشاطئ." },
    "ROS": { s: "En röd ros doftar gott.", t: "الوردة الحمراء تفوح منها رائحة طيبة." },
    "PLASK": { s: "Det hördes ett plask.", t: "سُمع صوت طرطشة." },
    "OFTAST": { s: "Jag cyklar oftast.", t: "أركب الدراجة غالباً." },
    "SLITEN": { s: "Soffan är sliten.", t: "الأريكة مهترئة." },
    "SKAPLIG": { s: "Vädret är skapligt.", t: "الطقس مقبول." },
    "GAP": { s: "Dörren står på gap.", t: "الباب مفتوح قليلاً." },
    "KIND": { s: "Hon fick en kyss på kinden.", t: "حصلت على قبلة على الخد." },
    "BLOD": { s: "Blodet rinner.", t: "الدم يسيل." },
    "TÄT": { s: "Skogen är tät.", t: "الغابة كثيفة." },
    "VERK": { s: "Det är ett konstverk.", t: "إنه عمل فني." },
    "VIRKE": { s: "Vi behöver virke till huset.", t: "نحتاج خشباً للمنزل." },
    "FLIT": { s: "Han studerar med flit.", t: "هو يدرس بجد." },
    "CIRKUS": { s: "Vi gick på cirkus.", t: "ذهبنا إلى السيرك." },
    "NÄST": { s: "Du är näst på tur.", t: "أنت التالي في الدور." },
    "SÖT": { s: "Kakan är söt.", t: "الكعكة حلوة." },
    "NERE": { s: "Katten är där nere.", t: "القطة هناك في الأسفل." },
    "REGN": { s: "Regnet öser ner.", t: "المطر ينهمر." },
    "MÅTTA": { s: "Allt med måtta.", t: "كل شيء باعتدال." },
    "ANNARS": { s: "Kom nu, annars blir vi sena.", t: "تعال الآن، وإلا سنتأخر." },
    "MAL": { s: "Kvarnen mal säden.", t: "الطاحونة تطحن الحبوب." },
    "RAD": { s: "Stå i en rad.", t: "قف في صف." },
    "KUL": { s: "Det var en kul fest.", t: "كانت حفلة ممتعة." },
    "SVAR": { s: "Jag vill ha ett svar.", t: "أريد جواباً." },
    "PASTOR": { s: "Pastorn talade i kyrkan.", t: "تحدث القس في الكنيسة." },
    "RAGGARE": { s: "Raggare kör gamla bilar.", t: "يقود الـ Raggare سيارات قديمة." },
    "ÄTER": { s: "Han äter ett äpple.", t: "هو يأكل تفاحة." },
    "STÅR": { s: "Bilen står på gatan.", t: "السيارة واقفة في الشارع." },
    "LOTTA": { s: "Lotta är en lottakår.", t: "لوتا هي مجندة متطوعة." },
    "KARL": { s: "Han är en stilig karl.", t: "إنه رجل وسيم." },
    "VERS": { s: "Läs en vers ur boken.", t: "اقرأ بيتاً من الكتاب." },
    "ARG": { s: "Var inte arg på mig.", t: "لا تغضب مني." },
    "KRUS": { s: "Inget krus, tack.", t: "بدون مجاملات، شكراً." },
    "SKUR": { s: "En skur av regn.", t: "زخّة مطر." },
    "RUNA": { s: "En gammal runa på stenen.", t: "حرف رونية قديم على الحجر." },
    "MASKIN": { s: "Maskinen är trasig.", t: "الآلة معطلة." },
    "SKIDA": { s: "Vi åker skidor i fjällen.", t: "نتزلج في الجبال." },
    "SIDA": { s: "Vänd sida i boken.", t: "اقلب الصفحة في الكتاب." },
    "RUND": { s: "Bollen är rund.", t: "الكرة مستديرة." },
    "SOTARE": { s: "Sotaren rensar skorstenen.", t: "منظف المداخن ينظف المدخنة." },
    "VÄNSTER": { s: "Ta till vänster här.", t: "انعطف يساراً هنا." },
    "TORR": { s: "Marken är torr.", t: "الأرض جافة." },
    "DIMMA": { s: "Dimman ligger tät.", t: "الضباب كثيف." },
    "DOMARE": { s: "Domaren blåste i visslan.", t: "نفخ الحكم في الصافرة." },
    "DROPPE": { s: "En droppe vatten.", t: "قطرة ماء." },
    "ENERGI": { s: "Solenergi är bra.", t: "الطاقة الشمسية جيدة." },
    "FACKLA": { s: "Han bar en fackla.", t: "حمل شعلة." },
    "DEBATT": { s: "En livlig debatt.", t: "نقاش حيوي." },
    "CHOCK": { s: "Han fick en chock.", t: "أصيب بصدمة." },
    "BÄRARE": { s: "En bärare av virus.", t: "حامل للفيروس." },
    "DISTANS": { s: "Håll distans.", t: "حافظ على المسافة." },
    "TRAFIK": { s: "Mycket trafik idag.", t: "حركة مرور كثيفة اليوم." },
    "GATA": { s: "Gatan är lång.", t: "الشارع طويل." },
    "TORG": { s: "Vi möts på torget.", t: "نلتقي في الساحة." },
    "STAD": { s: "En stor stad.", t: "مدينة كبيرة." },
    "FÅGEL": { s: "Fågeln flyger högt.", t: "الطائر يطير عالياً." },
    "HÄST": { s: "Hästen springer fort.", t: "الحصان يركض بسرعة." },
    "HUND": { s: "Hunden skäller.", t: "الكلب ينبح." },
    "KATT": { s: "Katten jamar.", t: "القطة تموء." },
    "MATTA": { s: "En mjuk matta.", t: "سجادة ناعمة." },
    "MÖBEL": { s: "En fin möbel.", t: "قطعة أثاث جميلة." },
    "FÖNSTER": { s: "Öppna fönstret.", t: "افتح النافذة." },
    "DÖRR": { s: "Stäng dörren.", t: "أغلق الباب." }
};

// Theme Definitions
const THEMES = {
    1: { name: "Food", keywords: ["mat", "äta", "dryck", "smak", "koka", "steka", "restaurang", "kök", "frukt", "grönsak", "bröd", "vatten", "kaffe", "te", "lunch", "middag", "frukost", "hungrig", "mätt", "recept", "skål", "tallrik", "glas", "kopp", "äpple", "banan", "bär", "kaka", "tårta", "glass", "ost", "smör", "mjölk", "kött", "fisk", "kyckling", "krydda", "salt", "socker", "peppar", "طعام", "أكل", "شرب", "مطبخ", "فاكهة", "خضار", "خبز", "ماء", "قهوة", "شاي", "غداء", "عشاء", "فطور", "جوع", "شبع", "وصفة", "صحن", "كأس", "كوب", "تفاح", "موز", "توت", "كعك", "جبن", "زبدة", "حليب", "لحم", "سمك", "دجاج", "بهار", "ملح", "سكر", "فلفل", "وجبة", "مطعم", "طهي", "طبخ"] },
    2: { name: "Nature", keywords: ["natur", "träd", "skog", "blomma", "växt", "djur", "hav", "sjö", "vatten", "berg", "sten", "himmel", "sol", "måne", "stjärna", "moln", "regn", "snö", "vind", "väder", "årstid", "vinter", "vår", "sommar", "höst", "park", "gräs", "mark", "jord", "eld", "luft", "ö", "strand", "flod", "طبيعة", "شجرة", "غابة", "زهرة", "نبات", "حيوان", "بحر", "بحيرة", "ماء", "جبل", "حجر", "سماء", "شمس", "قمر", "نجم", "غيمة", "مطر", "ثلج", "ريح", "طقس", "فصل", "شتاء", "ربيع", "صيف", "خريف", "حديقة", "عشب", "أرض", "نار", "هواء", "جزيرة", "شاطئ", "نهر"] },
    3: { name: "Travel", keywords: ["resa", "åka", "bil", "buss", "tåg", "flyg", "båt", "cykel", "trafik", "väg", "gata", "karta", "pass", "biljett", "hotell", "semester", "turist", "besök", "utflykt", "bagage", "väska", "station", "flygplats", "hamn", "land", "stad", "värld", "karta", "norr", "söder", "öster", "väster", "سفر", "رحلة", "سيارة", "باص", "قطار", "طائرة", "قارب", "دراجة", "مرور", "طريق", "شارع", "خريطة", "جواز", "تذكرة", "فندق", "عطلة", "سائح", "زيارة", "نزهة", "حقيبة", "محطة", "مطار", "ميناء", "بلد", "مدينة", "عالم", "شمال", "جنوب", "شرق", "غرب"] },
    4: { name: "Daily Life", keywords: ["vardag", "jobb", "arbete", "skola", "hem", "fritid", "tid", "klocka", "dag", "natt", "morgon", "kväll", "vecka", "månad", "år", "pengar", "handla", "butik", "städa", "tvätta", "laga", "sova", "vakna", "äta", "dricka", "prata", "lyssna", "titta", "läsa", "skriva", "leka", "spela", "vän", "hjälp", "يوم", "عمل", "شغل", "مدرسة", "بيت", "وقت", "ساعة", "نهار", "ليل", "صباح", "مساء", "أسبوع", "شهر", "سنة", "مال", "تسوق", "دكان", "تنظيف", "غسيل", "نوم", "استيقاظ", "أكل", "شرب", "كلام", "استماع", "نظر", "قراءة", "كتابة", "لعب", "صديق", "مساعدة"] },
    5: { name: "Body", keywords: ["kropp", "huvud", "hår", "öga", "öra", "näsa", "mun", "tand", "hals", "arm", "hand", "finger", "mage", "rygg", "ben", "fot", "tå", "hjärta", "blod", "sjuk", "frisk", "ont", "medicin", "läkare", "sjukhus", "hälsa", "stark", "svag", "trött", "pigg", "sova", "vila", "springa", "gå", "جسم", "رأس", "شعر", "عين", "أذن", "أنف", "فم", "سن", "رقبة", "ذراع", "يد", "إصبع", "بطن", "ظهر", "رجل", "قدم", "قلب", "دم", "مريض", "صحي", "ألم", "دواء", "طبيب", "مستشفى", "صحة", "قوي", "ضعيف", "تعب", "نوم", "راحة", "ركض", "مشى"] },
    6: { name: "Clothes", keywords: ["kläder", "klä", "tröja", "byxa", "kjol", "klänning", "jacka", "kappa", "rock", "sko", "strumpa", "mössa", "vante", "halsduk", "slips", "skjorta", "blus", "kavaj", "kostym", "tyg", "sy", "knapp", "ficka", "storlek", "färg", "röd", "blå", "gul", "grön", "svart", "vit", "tvätta", "mode", "ملابس", "لبس", "قميص", "بنطلون", "تنورة", "فستان", "جاكيت", "معطف", "حذاء", "جورب", "قبعة", "قفاز", "وشاح", "ربطة", "بدلة", "قماش", "خياطة", "زر", "جيب", "مقاس", "لون", "أحمر", "أزرق", "أصفر", "أخضر", "أسود", "أبيض", "غسيل", "موضة"] },
    7: { name: "Family", keywords: ["familj", "släkt", "mamma", "pappa", "förälder", "barn", "son", "dotter", "bror", "syster", "syskon", "farfar", "farmor", "morfar", "mormor", "kusin", "man", "fru", "make", "maka", "gift", "bröllop", "skilja", "sambo", "pojke", "flicka", "kille", "tjej", "vän", "kompis", "granne", "namn", "heta", "kalla", "عائلة", "أقارب", "أم", "أب", "والد", "طفل", "ابن", "ابنة", "أخ", "أخت", "جد", "جدة", "عم", "خال", "زوج", "زوجة", "زواج", "طلاق", "ولد", "بنت", "صديق", "جار", "اسم"] },
    8: { name: "House & Home", keywords: ["hus", "hem", "lägenhet", "villa", "rum", "kök", "badrum", "sovrum", "vardagsrum", "hall", "fönster", "dörr", "golv", "tak", "vägg", "möbel", "bord", "stol", "soffa", "säng", "lampa", "matta", "gardin", "skåp", "hylla", "nyckel", "lås", "bo", "bygga", "måla", "trädgård", "balkong", "garage", "بيت", "منزل", "شقة", "غرفة", "مطبخ", "حمام", "صالة", "نافذة", "شباك", "باب", "أرضية", "سقف", "جدار", "أثاث", "طاولة", "كرسي", "كنبة", "سرير", "مصباح", "سجادة", "ستارة", "خزانة", "رف", "مفتاح", "قفل", "سكن", "بناء", "دهان", "حديقة", "شرفة", "كراج"] },
    9: { name: "City & Traffic", keywords: ["stad", "by", "samhälle", "centrum", "torg", "gata", "väg", "trafik", "bil", "buss", "tåg", "cykel", "bro", "tunnel", "hus", "byggnad", "park", "affär", "bank", "post", "skola", "sjukhus", "polis", "brandkår", "kyrka", "bibliotek", "bio", "restaurang", "café", "karta", "plats", "stanna", "köra", "gå", "مدينة", "قرية", "مجتمع", "مركز", "ساحة", "شارع", "طريق", "مرور", "سيارة", "باص", "قطار", "دراجة", "جسر", "نفق", "بناء", "حديقة", "محل", "بنك", "بريد", "مدرسة", "مستشفى", "شرطة", "إطفاء", "كنيسة", "مكتبة", "سينما", "مطعم", "مقهى", "خريطة", "مكان", "توقف", "قيادة", "مشي"] },
    10: { name: "Animals", keywords: ["djur", "hund", "katt", "häst", "ko", "gris", "får", "get", "höna", "tupp", "fågel", "fisk", "orm", "spindel", "fluga", "mygga", "bi", "fjäril", "varg", "björn", "älg", "rådjur", "räv", "hare", "mus", "råtta", "svans", "päls", "vinge", "bo", "jaga", "tam", "vild", "حيوان", "كلب", "قط", "حصان", "بقرة", "خنزير", "خروف", "ماعز", "دجاجة", "ديك", "طير", "سمك", "أفعى", "عنكبوت", "ذابة", "بعوضة", "نحلة", "فراشة", "ذئب", "دب", "غزال", "ثعلب", "أرنب", "فأر", "جرذ", "ذيل", "فرو", "جناح", "عش", "صيد", "أليف", "وحشي"] }
};

// Manual sentences for specific words (if Lexin examples are insufficient)
// (Moved to top)

function parseLexin() {
    console.log("Parsing Lexin data...");
    const content = fs.readFileSync(LEXIN_PATH, 'utf8');
    const lines = content.split('\n');

    let fullPool = new Set();
    let highQualityPool = [];
    let themedPools = {};
    for (let i = 1; i <= 10; i++) themedPools[i] = [];

    // Track used words to avoid duplicates in pools
    const seenWords = new Set();

    for (let line of lines) {
        const parts = line.split(';');
        if (parts.length < 6) continue;

        // Clean word
        let word = parts[2] ? parts[2].trim().split(',')[0].trim() : "";
        word = word.replace(/[^a-zA-ZåäöÅÄÖ]/g, '').toUpperCase();

        if (word.length < 3 || seenWords.has(word)) continue;
        seenWords.add(word);

        // Debug SILL and TRAFIK
        if (word === 'SILL' || word === 'TRAFIK') {
            console.log(`DEBUG: Processing ${word}`);
            console.log(`DEBUG: Char codes:`, word.split('').map(c => c.charCodeAt(0)));
            console.log(`DEBUG: In Manual?`, Object.keys(MANUAL_SENTENCES).includes(word));
            console.log(`DEBUG: Manual Entry:`, MANUAL_SENTENCES[word]);
        }

        // Add to full pool
        fullPool.add(word);

        // Get Sentence & Translation
        let sentence = "";
        let translation = "";

        // 1. Check Manual Sentences First
        if (MANUAL_SENTENCES[word]) {
            sentence = MANUAL_SENTENCES[word].s;
            translation = MANUAL_SENTENCES[word].t;
        } else {
            // 2. Parse Lexin Examples (Scan columns 6+)
            let candidates = [];

            for (let i = 6; i < parts.length; i++) {
                const cell = parts[i] ? parts[i].trim() : "";
                if (!cell || /[\u0600-\u06FF]/.test(cell)) continue; // Skip empty or Arabic cells

                // Check if cell contains the word (whole word match OR common suffixes)
                const suffixes = "(?:en|et|ar|er|na|a|s|an|on|or|erna|arna|t|de|r|te|dd|tt)?";
                const regex = new RegExp(`(?<![A-ZÅÄÖ])${word}${suffixes}(?![A-ZÅÄÖ])`, 'i');

                if (!regex.test(cell)) continue;

                // Check word count >= 3 (Relaxed from 4 to allow short sentences)
                const wc = cell.split(/\s+/).filter(w => w.length > 0).length;
                if (wc < 3) continue;

                // Look for translation in next columns
                let trans = "";
                if (i + 1 < parts.length && /[\u0600-\u06FF]/.test(parts[i + 1])) trans = parts[i + 1].trim();
                else if (i + 2 < parts.length && /[\u0600-\u06FF]/.test(parts[i + 2])) trans = parts[i + 2].trim();

                if (trans) {
                    candidates.push({ s: cell, t: trans, len: wc });
                }
            }

            // Prioritize Shortest Valid Sentence
            if (candidates.length > 0) {
                // Sort by length ASCENDING (shortest first)
                candidates.sort((a, b) => a.len - b.len);

                // Pick the best one
                sentence = candidates[0].s;
                translation = candidates[0].t;
            }
        }

        // Must have a sentence to be High Quality
        if (sentence && translation) {
            // STRICT FILTER: Reject if sentence > 6 words (unless it's manual)
            // Note: Manual sentences are trusted to be short.
            // If it came from Lexin, check length.
            if (!MANUAL_SENTENCES[word]) {
                const len = sentence.split(/\s+/).filter(w => w.length > 0).length;
                if (len > 6) continue;
            }

            // Get Word Translation from Lexin (parts[3])
            const wordTranslation = parts[3] ? parts[3].trim() : "";

            const entry = { w: word, t: wordTranslation, s: sentence, st: translation, text: line.toLowerCase() };
            highQualityPool.push(entry);

            // Theme Tagging (Check full line for context)
            for (let ch = 1; ch <= 10; ch++) {
                const theme = THEMES[ch];
                let isMatch = false;
                for (let k of theme.keywords) {
                    // Check Arabic keywords (simple includes)
                    if (/[\u0600-\u06FF]/.test(k)) {
                        if (line.includes(k)) isMatch = true;
                    } else {
                        // Check Swedish keywords (regex)
                        const suffixes = "(?:en|et|ar|er|na|a|s|an|on|or|erna|arna|t|de|r|te|dd|tt)?";
                        const regex = new RegExp(`\\b${k}${suffixes}\\b`, 'i');
                        if (regex.test(line)) isMatch = true;
                    }
                    if (isMatch) break;
                }
                if (isMatch) {
                    themedPools[ch].push(entry);
                }
            }
        }

        // Add to valid words list (even if no sentence, for connectivity checks)
        // fullPool.add(word); // Already added above
    }

    console.log(`Parsed ${highQualityPool.length} high-quality words.`);
    return { fullPool, highQualityPool, themedPools };
}

function generateLevels() {
    const { highQualityPool, fullPool, themedPools } = parseLexin();
    console.log(`Parsed ${highQualityPool.length} high-quality words.`);
    console.log(`Parsed ${fullPool.size} total valid words.`);

    const levels = {};
    const usedWords = new Set();
    const usedRoots = new Set(); // Track used root words to prevent duplicate levels
    const levelSignatures = new Set(); // Track unique level signatures (sorted words)
    const dictionary = [];

    // Helper to check if word can be formed from letters
    function canFormWord(target, sourceLetters) {
        const t = target.split('').sort();
        const s = sourceLetters.split('').sort();
        let i = 0, j = 0;
        while (i < t.length && j < s.length) {
            if (t[i] === s[j]) { i++; j++; }
            else { j++; }
        }
        return i === t.length;
    }

    for (let chapter = 1; chapter <= 10; chapter++) {
        for (let level = 1; level <= 10; level++) {
            const levelId = `${chapter}-${level}`;
            const rules = LEVEL_RULES[level <= 3 ? 0 : level <= 6 ? 1 : level <= 9 ? 2 : 3];

            let bestLevel = null;

            // Try to generate a valid level
            for (let attempt = 0; attempt < 2000; attempt++) {
                let candidates = [];

                // Strategy: Try themed words first, then fallback to general
                // Allow roots of length maxLen OR maxLen-1 (to ensure enough candidates)
                // But only if maxLen-1 >= minLen
                const minRootLen = Math.max(rules.minLen, rules.maxLen - 1);

                if (attempt < 100) {
                    candidates = themedPools[chapter].filter(w => w.w.length >= minRootLen && w.w.length <= rules.maxLen && !usedRoots.has(w.w));
                }

                // Fallback or if no themed words found
                if (candidates.length === 0) {
                    candidates = highQualityPool.filter(w => w.w.length >= minRootLen && w.w.length <= rules.maxLen && !usedRoots.has(w.w));
                }

                if (candidates.length === 0) continue;

                const rootObj = candidates[Math.floor(Math.random() * candidates.length)];
                const rootWord = rootObj.w;
                const letters = rootWord.split('').sort(() => Math.random() - 0.5); // Shuffle

                // Find all valid subwords from High Quality Pool (for targets)
                const validSubwords = highQualityPool.filter(w =>
                    w.w.length >= rules.minLen &&
                    w.w.length <= rules.maxLen &&
                    canFormWord(w.w, rootWord)
                );

                if (validSubwords.length < rules.words) continue;

                // Select words
                // Prioritize unused words
                validSubwords.sort((a, b) => {
                    const aUsed = usedWords.has(a.w) ? 1 : 0;
                    const bUsed = usedWords.has(b.w) ? 1 : 0;
                    return aUsed - bUsed;
                });

                // Try to pick a set that satisfies constraints
                const selected = [];
                const lengths = new Set();

                // ALWAYS add the root word first
                const rootEntry = validSubwords.find(w => w.w === rootWord);
                if (rootEntry) {
                    selected.push(rootEntry);
                    lengths.add(rootEntry.w.length);
                } else {
                    continue;
                }

                for (const w of validSubwords) {
                    if (selected.length >= rules.words) break;
                    if (selected.find(s => s.w === w.w)) continue;

                    selected.push(w);
                    lengths.add(w.w.length);
                }

                if (selected.length !== rules.words) continue;
                if (!lengths.has(rules.minLen) || !lengths.has(rules.maxLen)) continue;

                // Check for Duplicate Level Signature
                const signature = selected.map(w => w.w).sort().join(',');
                if (levelSignatures.has(signature)) continue;

                // Success!
                // Find ALL valid words (bonus words) from highQualityPool
                const allValidWords = [];
                const bonusEntries = [];

                for (const w of highQualityPool) {
                    if (w.w.length > 2 && canFormWord(w.w, rootWord)) {
                        allValidWords.push(w.w);
                        bonusEntries.push(w);
                    }
                }

                bestLevel = {
                    letters: letters,
                    words: selected.map(w => w.w),
                    validWords: allValidWords, // Includes targets + bonus
                    dictionaryEntries: bonusEntries, // Add ALL valid words to dictionary
                    rootWord: rootWord, // Store for tracking
                    signature: signature
                };
                break;
            }

            if (bestLevel) {
                levels[levelId] = {
                    letters: bestLevel.letters,
                    words: bestLevel.words,
                    validWords: bestLevel.validWords
                };

                // Track used root to prevent duplicates
                usedRoots.add(bestLevel.rootWord);
                levelSignatures.add(bestLevel.signature);

                bestLevel.dictionaryEntries.forEach(entry => {
                    usedWords.add(entry.w);
                    if (!dictionary.find(d => d.w === entry.w)) {
                        dictionary.push(entry);
                    }
                });
            } else {
                console.error(`Failed to generate level ${levelId}`);
            }
        }
    }

    return { levels, dictionary };
}

try {
    const result = generateLevels();

    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(result, null, 2));
    console.log(`Generated ${Object.keys(result.levels).length} levels.`);
    console.log(`Dictionary size: ${result.dictionary.length}`);

} catch (e) {
    console.error("Error:", e);
}
