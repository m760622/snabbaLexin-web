/**
 * Add examples - Batch 2 (100 more words)
 */

const fs = require('fs');

const examples = {
    // === MORE NOUNS ===
    "Lexin015901": { // Lampa - مصباح
        exSwe: "Kan du tända lampan? Det är mörkt här.",
        exArb: "هل يمكنك إضاءة المصباح؟ الجو مظلم هنا."
    },
    "Lexin015906": { // Land - أرض
        exSwe: "Sverige är ett vackert land i Skandinavien.",
        exArb: "السويد بلد جميل في الدول الاسكندنافية."
    },
    "Lexin016165": { // Lever - كبد
        exSwe: "Levern är ett viktigt organ i kroppen.",
        exArb: "الكبد عضو مهم في الجسم."
    },
    "Lexin016336": { // Liv - حياة
        exSwe: "Livet i Stockholm är spännande men dyrt.",
        exArb: "الحياة في ستوكهولم مثيرة لكنها غالية."
    },
    "Lexin016919": { // Lärare - معلم
        exSwe: "Min lärare i svenska är mycket tålmodig.",
        exArb: "معلمي في اللغة السويدية صبور جداً."
    },
    "Lexin017045": { // Lösning - حل
        exSwe: "Det finns alltid en lösning på varje problem.",
        exArb: "هناك دائماً حل لكل مشكلة."
    },
    "Lexin017169": { // Man - رجل
        exSwe: "En ung man frågade om vägen till stationen.",
        exArb: "سأل رجل شاب عن الطريق إلى المحطة."
    },
    "Lexin017786": { // Minut - دقيقة
        exSwe: "Vänta en minut, jag kommer strax.",
        exArb: "انتظر دقيقة، سآتي حالاً."
    },
    "Lexin017887": { // Mjölk - حليب
        exSwe: "Jag dricker ett glas mjölk varje morgon.",
        exArb: "أشرب كأس حليب كل صباح."
    },
    "Lexin018013": { // Morgon - صباح
        exSwe: "Jag vaknar tidigt på morgonen varje dag.",
        exArb: "أستيقظ مبكراً في الصباح كل يوم."
    },
    "Lexin018493": { // Mössa - قبعة
        exSwe: "På vintern bär jag alltid en varm mössa.",
        exArb: "في الشتاء أرتدي دائماً قبعة دافئة."
    },
    "Lexin020179": { // Papper - ورق
        exSwe: "Kan du ge mig ett papper och en penna?",
        exArb: "هل يمكنك إعطائي ورقة وقلم؟"
    },
    "Lexin020387": { // Penna - قلم
        exSwe: "Jag glömde min penna hemma.",
        exArb: "نسيت قلمي في المنزل."
    },
    "Lexin020843": { // Polis - شرطة
        exSwe: "Polisen kom snabbt till platsen.",
        exArb: "جاءت الشرطة بسرعة إلى المكان."
    },
    "Lexin024035": { // Sjuksköterska - ممرضة
        exSwe: "Sjuksköterskan mätte min temperatur.",
        exArb: "قاست الممرضة درجة حرارتي."
    },
    "Lexin024407": { // Skjorta - قميص
        exSwe: "Han bar en vit skjorta till intervjun.",
        exArb: "ارتدى قميصاً أبيض للمقابلة."
    },
    "Lexin024420": { // Sko - حذاء
        exSwe: "Jag behöver köpa nya skor till vintern.",
        exArb: "أحتاج لشراء أحذية جديدة للشتاء."
    },
    "Lexin024443": { // Skola - مدرسة
        exSwe: "Barnen går till skolan klockan åtta.",
        exArb: "يذهب الأطفال إلى المدرسة الساعة الثامنة."
    },
    "Lexin025496": { // Snö - ثلج
        exSwe: "Det snöar idag och marken är vit.",
        exArb: "تثلج اليوم والأرض بيضاء."
    },
    "Lexin025590": { // Soffa - صوفا
        exSwe: "Vi sitter i soffan och tittar på TV.",
        exArb: "نجلس على الصوفا ونشاهد التلفزيون."
    },
    "Lexin026380": { // Stol - كرسي
        exSwe: "Sätt dig på stolen och vänta här.",
        exArb: "اجلس على الكرسي وانتظر هنا."
    },
    "Lexin027195": { // Svensk - سويدي
        exSwe: "Min granne är svensk och pratar bra arabiska.",
        exArb: "جاري سويدي ويتحدث العربية جيداً."
    },
    "Lexin027458": { // Syster - أخت
        exSwe: "Min syster bor i Göteborg med sin familj.",
        exArb: "أختي تعيش في يوتوبوري مع عائلتها."
    },
    "Lexin030781": { // Vatten - ماء
        exSwe: "Det är viktigt att dricka mycket vatten.",
        exArb: "من المهم شرب الكثير من الماء."
    },
    "Lexin031154": { // Vinter - شتاء
        exSwe: "Vintern i Sverige är lång och kall.",
        exArb: "الشتاء في السويد طويل وبارد."
    },
    "Lexin031405": { // Vår - ربيع
        exSwe: "På våren blommar träden och det blir varmare.",
        exArb: "في الربيع تزهر الأشجار ويصبح الجو أدفأ."
    },
    "Lexin031464": { // Väder - جو
        exSwe: "Hur är vädret idag? Ska det regna?",
        exArb: "كيف الجو اليوم؟ هل ستمطر؟"
    },

    // === COMMON VERBS (Present tense) ===
    "Lexin005069": { // Cyklar - يقود دراجة
        exSwe: "Jag cyklar till jobbet varje dag.",
        exArb: "أركب الدراجة إلى العمل كل يوم."
    },
    "Lexin005825": { // Dricker - يشرب
        exSwe: "Hon dricker kaffe på morgonen.",
        exArb: "تشرب القهوة في الصباح."
    },
    "Lexin005990": { // Duschar - يستحم
        exSwe: "Jag duschar varje morgon innan jobbet.",
        exArb: "أستحم كل صباح قبل العمل."
    },
    "Lexin007980": { // Flyger - يطير
        exSwe: "Fågeln flyger högt över träden.",
        exArb: "يطير الطائر عالياً فوق الأشجار."
    },
    "Lexin008017": { // Frågar - يسأل
        exSwe: "Hon frågar alltid om hon inte förstår.",
        exArb: "تسأل دائماً إذا لم تفهم."
    },
    "Lexin008249": { // Förstår - يفهم
        exSwe: "Jag förstår inte det här ordet.",
        exArb: "لا أفهم هذه الكلمة."
    },
    "Lexin010078": { // Ger - يعطي
        exSwe: "Mamma ger mig pengar varje vecka.",
        exArb: "تعطيني أمي مالاً كل أسبوع."
    },
    "Lexin010245": { // Går - يذهب
        exSwe: "Jag går till affären för att köpa mat.",
        exArb: "أذهب إلى المتجر لشراء الطعام."
    },
    "Lexin010318": { // Gör - يفعل
        exSwe: "Vad gör du på helgen?",
        exArb: "ماذا تفعل في عطلة نهاية الأسبوع؟"
    },
    "Lexin010918": { // Går - يمشي
        exSwe: "Vi går en promenad i parken.",
        exArb: "نمشي في الحديقة."
    },
    "Lexin011370": { // Handlar - يتسوق
        exSwe: "Jag handlar mat på ICA varje lördag.",
        exArb: "أتسوق الطعام من ICA كل سبت."
    },
    "Lexin011793": { // Hjälper - يساعد
        exSwe: "Hon hjälper sin mamma med matlagningen.",
        exArb: "تساعد أمها في الطبخ."
    },
    "Lexin011868": { // Hoppas - يأمل
        exSwe: "Jag hoppas att du mår bra.",
        exArb: "آمل أن تكون بخير."
    },
    "Lexin012254": { // Hör - يسمع
        exSwe: "Jag hör musik medan jag jobbar.",
        exArb: "أسمع الموسيقى أثناء العمل."
    },
    "Lexin014427": { // Kommer - يأتي
        exSwe: "Han kommer till Sverige nästa månad.",
        exArb: "سيأتي إلى السويد الشهر القادم."
    },
    "Lexin014935": { // Kostar - يكلف
        exSwe: "Hur mycket kostar den här jackan?",
        exArb: "كم يكلف هذا المعطف؟"
    },
    "Lexin015361": { // Kör - يقود
        exSwe: "Min pappa kör taxi på kvällarna.",
        exArb: "يقود أبي سيارة أجرة في المساء."
    },
    "Lexin016024": { // Leker - يلعب
        exSwe: "Barnen leker på lekplatsen.",
        exArb: "يلعب الأطفال في الملعب."
    },
    "Lexin016128": { // Lever - يعيش
        exSwe: "Hon lever ensam i en lägenhet i centrum.",
        exArb: "تعيش وحدها في شقة في المركز."
    },
    "Lexin016758": { // Lyssnar - يستمع
        exSwe: "Jag lyssnar på radio när jag kör.",
        exArb: "أستمع إلى الراديو عندما أقود."
    },
    "Lexin016859": { // Läser - يقرأ
        exSwe: "Han läser tidningen varje morgon.",
        exArb: "يقرأ الجريدة كل صباح."
    },
    "Lexin017506": { // Menar - يعني
        exSwe: "Vad menar du med det?",
        exArb: "ماذا تعني بذلك؟"
    },
    "Lexin017916": { // Möter - يقابل
        exSwe: "Jag möter min vän på kaféet klockan tre.",
        exArb: "أقابل صديقي في المقهى الساعة الثالثة."
    },
    "Lexin020759": { // Pratar - يتحدث
        exSwe: "Hon pratar svenska och arabiska flytande.",
        exArb: "تتحدث السويدية والعربية بطلاقة."
    },
    "Lexin023139": { // Ringer - يتصل
        exSwe: "Jag ringer dig ikväll efter middagen.",
        exArb: "سأتصل بك الليلة بعد العشاء."
    },
    "Lexin024019": { // Sjunger - يغني
        exSwe: "Barnet sjunger en sång för sin mamma.",
        exArb: "يغني الطفل أغنية لأمه."
    },
    "Lexin024533": { // Skriver - يكتب
        exSwe: "Jag skriver ett mejl till min chef.",
        exArb: "أكتب بريداً إلكترونياً لمديري."
    },
    "Lexin025694": { // Sover - ينام
        exSwe: "Bebisen sover åtta timmar per natt.",
        exArb: "ينام الرضيع ثماني ساعات في الليلة."
    },
    "Lexin025806": { // Spelar - يلعب
        exSwe: "Mitt barn spelar fotboll varje lördag.",
        exArb: "يلعب طفلي كرة القدم كل سبت."
    },
    "Lexin025920": { // Springer - يركض
        exSwe: "Hon springer fem kilometer varje morgon.",
        exArb: "تركض خمسة كيلومترات كل صباح."
    },
    "Lexin026059": { // Stannar - يبقى
        exSwe: "Vi stannar hemma ikväll och tittar på film.",
        exArb: "نبقى في المنزل الليلة ونشاهد فيلماً."
    },
    "Lexin026367": { // Står - يقف
        exSwe: "Han står vid busshållplatsen och väntar.",
        exArb: "يقف عند محطة الحافلات وينتظر."
    },
    "Lexin027203": { // Svär - يحلف
        exSwe: "Jag svär att det är sant!",
        exArb: "أقسم أن هذا صحيح!"
    },
    "Lexin027469": { // Säljer - يبيع
        exSwe: "Han säljer bilar i en butik i Malmö.",
        exArb: "يبيع السيارات في متجر في مالمو."
    },
    "Lexin027617": { // Säger - يقول
        exSwe: "Vad säger du? Jag hör inte.",
        exArb: "ماذا تقول؟ لا أسمعك."
    },
    "Lexin027779": { // Talar - يتكلم
        exSwe: "Hon talar fem språk flytande.",
        exArb: "تتكلم خمس لغات بطلاقة."
    },
    "Lexin027937": { // Tar - يأخذ
        exSwe: "Ta din jacka, det är kallt ute.",
        exArb: "خذ معطفك، الجو بارد في الخارج."
    },
    "Lexin028095": { // Tittade - ينظر
        exSwe: "Hon tittar på nyheterna varje kväll.",
        exArb: "تشاهد الأخبار كل مساء."
    },
    "Lexin028393": { // Tror - يعتقد
        exSwe: "Jag tror att det blir fint väder imorgon.",
        exArb: "أعتقد أن الطقس سيكون جميلاً غداً."
    },
    "Lexin028483": { // Träffar - يلتقي
        exSwe: "Jag träffar mina vänner på lördagar.",
        exArb: "ألتقي بأصدقائي يوم السبت."
    },
    "Lexin028562": { // Tvättar - يغسل
        exSwe: "Jag tvättar bilen varje söndag.",
        exArb: "أغسل السيارة كل يوم أحد."
    },
    "Lexin028653": { // Tycker - يعتقد/يحب
        exSwe: "Jag tycker att det här är en bra idé.",
        exArb: "أعتقد أن هذه فكرة جيدة."
    },
    "Lexin028866": { // Använder - يستخدم
        exSwe: "Jag använder datorn varje dag.",
        exArb: "أستخدم الكمبيوتر كل يوم."
    },
    "Lexin029720": { // Vaknar - يستيقظ
        exSwe: "Jag vaknar klockan sex varje morgon.",
        exArb: "أستيقظ الساعة السادسة كل صباح."
    },
    "Lexin030558": { // Väljer - يختار
        exSwe: "Välj den bok du vill läsa.",
        exArb: "اختر الكتاب الذي تريد قراءته."
    },
    "Lexin030636": { // Väntar - ينتظر
        exSwe: "Jag väntar på bussen vid hållplatsen.",
        exArb: "أنتظر الحافلة عند المحطة."
    },
    "Lexin031104": { // Vet - يعرف
        exSwe: "Jag vet inte var hon bor.",
        exArb: "لا أعرف أين تسكن."
    },
    "Lexin031191": { // Visar - يُظهر
        exSwe: "Kan du visa mig vägen till stationen?",
        exArb: "هل يمكنك أن تريني الطريق إلى المحطة؟"
    },
    "Lexin032003": { // Äter - يأكل
        exSwe: "Vi äter middag klockan sex varje dag.",
        exArb: "نتناول العشاء الساعة السادسة كل يوم."
    },
    "Lexin032210": { // Öppnar - يفتح
        exSwe: "Butiken öppnar klockan nio på morgonen.",
        exArb: "يفتح المتجر الساعة التاسعة صباحاً."
    },
    "Lexin032240": { // Övar - يتدرب
        exSwe: "Han övar piano varje dag i en timme.",
        exArb: "يتدرب على البيانو كل يوم لمدة ساعة."
    },

    // === MORE ADJECTIVES ===
    "Lexin003969": { // Borta - بعيد
        exSwe: "Han är borta på semester i två veckor.",
        exArb: "هو بعيد في إجازة لمدة أسبوعين."
    },
    "Lexin004411": { // Bra - جيد
        exSwe: "Det var en bra film, jag gillade den.",
        exArb: "كان فيلماً جيداً، أحببته."
    },
    "Lexin005168": { // Dålig - سيء
        exSwe: "Jag mår dåligt idag, jag stannar hemma.",
        exArb: "أشعر بسوء اليوم، سأبقى في المنزل."
    },
    "Lexin006652": { // Enkel - بسيط
        exSwe: "Receptet är enkelt att följa.",
        exArb: "الوصفة بسيطة للتطبيق."
    },
    "Lexin008672": { // Färdig - جاهز
        exSwe: "Maten är färdig, kom och ät!",
        exArb: "الطعام جاهز، تعال وكل!"
    },
    "Lexin010036": { // Gammal - قديم/كبير
        exSwe: "Min farfar är åttio år gammal.",
        exArb: "جدي عمره ثمانون سنة."
    },
    "Lexin010318": { // Glad - سعيد
        exSwe: "Jag blir glad när solen skiner.",
        exArb: "أصبح سعيداً عندما تشرق الشمس."
    },
    "Lexin011710": { // Hungrig - جائع
        exSwe: "Jag är hungrig, ska vi äta lunch?",
        exArb: "أنا جائع، هل نتناول الغداء؟"
    },
    "Lexin012491": { // Hård - صلب
        exSwe: "Brödet är hårt, det är gammalt.",
        exArb: "الخبز صلب، إنه قديم."
    },
    "Lexin013483": { // Kall - بارد
        exSwe: "Vattnet är för kallt att simma i.",
        exArb: "الماء بارد جداً للسباحة."
    },
    "Lexin014949": { // Kort - قصير
        exSwe: "Vägen är kort, bara fem minuter.",
        exArb: "الطريق قصير، خمس دقائق فقط."
    },
    "Lexin015803": { // Lång - طويل
        exSwe: "Han är lång och har mörkt hår.",
        exArb: "هو طويل وله شعر داكن."
    },
    "Lexin016170": { // Liten - صغير
        exSwe: "Jag bor i en liten lägenhet.",
        exArb: "أسكن في شقة صغيرة."
    },
    "Lexin018779": { // Nöjd - راضٍ
        exSwe: "Jag är nöjd med mitt nya jobb.",
        exArb: "أنا راضٍ عن عملي الجديد."
    },
    "Lexin022157": { // Ren - نظيف
        exSwe: "Rummet är rent och städat.",
        exArb: "الغرفة نظيفة ومرتبة."
    },
    "Lexin023986": { // Snabb - سريع
        exSwe: "Bilen är snabb och bekväm.",
        exArb: "السيارة سريعة ومريحة."
    },
    "Lexin026433": { // Stor - كبير
        exSwe: "Vi bor i ett stort hus med trädgård.",
        exArb: "نسكن في بيت كبير مع حديقة."
    },
    "Lexin027128": { // Svår - صعب
        exSwe: "Provet var svårt men jag klarade det.",
        exArb: "كان الامتحان صعباً لكنني اجتزته."
    },
    "Lexin028701": { // Vacker - جميل
        exSwe: "Stockholm är en vacker stad.",
        exArb: "ستوكهولم مدينة جميلة."
    },
    "Lexin030751": { // Varm - دافئ
        exSwe: "Sommaren är varm och solig i Sverige.",
        exArb: "الصيف دافئ ومشمس في السويد."
    },
    "Lexin031051": { // Viktig - مهم
        exSwe: "Det är viktigt att lära sig svenska.",
        exArb: "من المهم تعلم اللغة السويدية."
    },
    "Lexin032173": { // Öppen - مفتوح
        exSwe: "Affären är öppen till klockan nio.",
        exArb: "المتجر مفتوح حتى الساعة التاسعة."
    }
};

// Load dictionary
const dataContent = fs.readFileSync('./data.js', 'utf-8');
let dictionaryData;

// Try to parse
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

console.log(`\n✅ Batch 2: Added ${changesCount} examples. Total now: ${64 + changesCount}`);
