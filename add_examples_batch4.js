/**
 * Add examples - Batch 4 (100 more essential everyday words)
 */

const fs = require('fs');

const examples = {
    // === ESSENTIAL EVERYDAY VERBS ===
    "Lexin000448": { // Älskar - يحب
        exSwe: "Jag älskar min familj mer än allt annat.",
        exArb: "أحب عائلتي أكثر من أي شيء آخر."
    },
    "Lexin010264": { // Gillar - يعجب
        exSwe: "Jag gillar att läsa böcker på kvällen.",
        exArb: "يعجبني قراءة الكتب في المساء."
    },
    "Lexin011380": { // Hatar - يكره
        exSwe: "Jag hatar att vänta i långa köer.",
        exArb: "أكره الانتظار في طوابير طويلة."
    },
    "Lexin024091": { // Simmar - يسبح
        exSwe: "Hon simmar varje dag på sommaren.",
        exArb: "تسبح كل يوم في الصيف."
    },
    "Lexin016764": { // Lär sig - يتعلم
        exSwe: "Han lär sig svenska på SFI.",
        exArb: "يتعلم السويدية في SFI."
    },
    "Lexin020764": { // Pratar - يتكلم
        exSwe: "Min son pratar redan tre språk.",
        exArb: "ابني يتكلم ثلاث لغات بالفعل."
    },
    "Lexin024232": { // Skrattar - يضحك
        exSwe: "Barnen skrattar högt när de leker.",
        exArb: "يضحك الأطفال بصوت عالٍ عندما يلعبون."
    },
    "Lexin016105": { // Ler - يبتسم
        exSwe: "Hon ler alltid när hon ser mig.",
        exArb: "تبتسم دائماً عندما تراني."
    },
    "Lexin007606": { // Filmar - يصور
        exSwe: "Jag filmar barnens skolteatern.",
        exArb: "أصور مسرحية المدرسة للأطفال."
    },
    "Lexin028096": { // Tittar - ينظر
        exSwe: "Jag tittar på fotboll på TV.",
        exArb: "أشاهد كرة القدم على التلفزيون."
    },
    "Lexin024429": { // Sköljer - يشطف
        exSwe: "Glöm inte att skölja munnen efter tandborstningen.",
        exArb: "لا تنسَ شطف فمك بعد تنظيف الأسنان."
    },
    "Lexin004318": { // Bråkar - يتشاجر
        exSwe: "Barnen bråkar om leksaker ibland.",
        exArb: "يتشاجر الأطفال على الألعاب أحياناً."
    },
    "Lexin027340": { // Svara - يجيب
        exSwe: "Kan du svara på min fråga?",
        exArb: "هل يمكنك الإجابة على سؤالي؟"
    },
    "Lexin008254": { // Försöker - يحاول
        exSwe: "Jag försöker lära mig svenska grammatik.",
        exArb: "أحاول تعلم قواعد اللغة السويدية."
    },
    "Lexin017973": { // Målar - يرسم/يطلي
        exSwe: "Barnet målar en teckning till mamma.",
        exArb: "يرسم الطفل لوحة لأمه."
    },
    "Lexin023109": { // Reparerar - يصلح
        exSwe: "Mekanikern reparerar min bil.",
        exArb: "يصلح الميكانيكي سيارتي."
    },
    "Lexin026287": { // Stryker - يكوي
        exSwe: "Jag stryker mina skjortor på söndagar.",
        exArb: "أكوي قمصاني يوم الأحد."
    },
    "Lexin027009": { // Städar - ينظف
        exSwe: "Vi städar lägenheten varje lördag.",
        exArb: "ننظف الشقة كل يوم سبت."
    },
    "Lexin004970": { // Dammsugare - مكنسة كهربائية
        exSwe: "Jag dammsugerar golvet varje vecka.",
        exArb: "أنظف الأرضية بالمكنسة كل أسبوع."
    },
    "Lexin028295": { // Torkar - يمسح/يجفف
        exSwe: "Kan du torka av bordet efter maten?",
        exArb: "هل يمكنك مسح الطاولة بعد الأكل؟"
    },

    // === FAMILY ===
    "Lexin017907": { // Mor - أم
        exSwe: "Min mor lagar alltid god mat.",
        exArb: "أمي تطبخ دائماً طعاماً لذيذاً."
    },
    "Lexin017235": { // Mamma - ماما
        exSwe: "Mamma, jag är hungrig!",
        exArb: "ماما، أنا جائع!"
    },
    "Lexin020519": { // Pappa - بابا
        exSwe: "Pappa hjälper mig med läxorna.",
        exArb: "بابا يساعدني في الواجبات."
    },
    "Lexin007310": { // Farfar - جد (أب الأب)
        exSwe: "Min farfar är åttio år gammal.",
        exArb: "جدي (أبو أبي) عمره ثمانون سنة."
    },
    "Lexin007308": { // Farmor - جدة (أم الأب)
        exSwe: "Farmor bakar alltid kakor till oss.",
        exArb: "جدتي (أم أبي) تخبز دائماً الكعك لنا."
    },
    "Lexin017893": { // Morfar - جد (أب الأم)
        exSwe: "Morfar bor i södra Sverige.",
        exArb: "جدي (أبو أمي) يسكن في جنوب السويد."
    },
    "Lexin017895": { // Mormor - جدة (أم الأم)
        exSwe: "Mormor berättar alltid sagor för barnen.",
        exArb: "جدتي (أم أمي) تحكي دائماً قصصاً للأطفال."
    },
    "Lexin020665": { // Pojke - ولد
        exSwe: "Vi har två pojkar och en flicka.",
        exArb: "لدينا ولدان وبنت."
    },
    "Lexin002393": { // Barn - طفل
        exSwe: "Barnen leker på gården.",
        exArb: "يلعب الأطفال في الفناء."
    },
    "Lexin025067": { // Son - ابن
        exSwe: "Min son går i första klass.",
        exArb: "ابني في الصف الأول."
    },
    "Lexin005602": { // Dotter - ابنة
        exSwe: "Min dotter studerar medicin.",
        exArb: "ابنتي تدرس الطب."
    },
    "Lexin007098": { // Farbror - عم
        exSwe: "Min farbror bor i Malmö.",
        exArb: "عمي يسكن في مالمو."
    },
    "Lexin007351": { // Faster - عمة
        exSwe: "Faster kommer på besök imorgon.",
        exArb: "عمتي ستزورنا غداً."
    },
    "Lexin017890": { // Morbror - خال
        exSwe: "Morbror Sami har tre barn.",
        exArb: "خالي سامي لديه ثلاثة أطفال."
    },
    "Lexin017898": { // Moster - خالة
        exSwe: "Moster bor nära oss.",
        exArb: "خالتي تسكن قريباً منا."
    },
    "Lexin015420": { // Kusin - ابن عم/خال
        exSwe: "Min kusin och jag är lika gamla.",
        exArb: "ابن عمي وأنا بنفس العمر."
    },

    // === SCHOOL & WORK ===
    "Lexin024033": { // Sjukskrivning - إجازة مرضية
        exSwe: "Jag behöver en sjukskrivning från läkaren.",
        exArb: "أحتاج إجازة مرضية من الطبيب."
    },
    "Lexin023570": { // Skola - مدرسة
        exSwe: "Barnen börjar skolan klockan åtta.",
        exArb: "يبدأ الأطفال المدرسة الساعة الثامنة."
    },
    "Lexin016023": { // Lektion - درس
        exSwe: "Lektionen börjar om fem minuter.",
        exArb: "يبدأ الدرس بعد خمس دقائق."
    },
    "Lexin022870": { // Läxa - واجب
        exSwe: "Har du gjort dina läxor?",
        exArb: "هل أنجزت واجباتك؟"
    },
    "Lexin021240": { // Prov - امتحان
        exSwe: "Vi har ett prov i matematik imorgon.",
        exArb: "لدينا امتحان رياضيات غداً."
    },
    "Lexin003050": { // Betyg - درجة
        exSwe: "Jag fick bra betyg i alla ämnen.",
        exArb: "حصلت على درجات جيدة في جميع المواد."
    },
    "Lexin013117": { // Intervju - مقابلة
        exSwe: "Jag har en jobbintervju imorgon.",
        exArb: "لدي مقابلة عمل غداً."
    },
    "Lexin017024": { // Lön - راتب
        exSwe: "Lönen kommer den 25:e varje månad.",
        exArb: "الراتب يأتي في 25 من كل شهر."
    },
    "Lexin023579": { // Semester - إجازة
        exSwe: "Vi åker på semester till Spanien.",
        exArb: "نسافر في إجازة إلى إسبانيا."
    },
    "Lexin017615": { // Möte - اجتماع
        exSwe: "Jag har ett möte klockan tio.",
        exArb: "لدي اجتماع الساعة العاشرة."
    },
    "Lexin014544": { // Kontor - مكتب
        exSwe: "Jag arbetar på ett kontor i city.",
        exArb: "أعمل في مكتب في وسط المدينة."
    },

    // === HOUSING ===
    "Lexin016752": { // Lägenhet - شقة
        exSwe: "Vi letar efter en större lägenhet.",
        exArb: "نبحث عن شقة أكبر."
    },
    "Lexin012467": { // Hyra - إيجار
        exSwe: "Hyran är 8000 kronor i månaden.",
        exArb: "الإيجار 8000 كرونة في الشهر."
    },
    "Lexin027052": { // Hyresvärd - صاحب العقار
        exSwe: "Hyresvärden fixar trasig utrustning.",
        exArb: "صاحب العقار يصلح المعدات المكسورة."
    },
    "Lexin010593": { // Granne - جار
        exSwe: "Vår granne är mycket snäll.",
        exArb: "جارنا لطيف جداً."
    },
    "Lexin028299": { // Trappa - سلم
        exSwe: "Vi bor på tredje våningen utan hiss.",
        exArb: "نسكن في الطابق الثالث بدون مصعد."
    },
    "Lexin011752": { // Hiss - مصعد
        exSwe: "Hissen är trasig, vi måste ta trappan.",
        exArb: "المصعد معطل، يجب أن نأخذ السلم."
    },
    "Lexin010392": { // Golv - أرضية
        exSwe: "Vi har trägolv i vardagsrummet.",
        exArb: "لدينا أرضية خشبية في غرفة المعيشة."
    },
    "Lexin027781": { // Tak - سقف
        exSwe: "Det läcker vatten från taket.",
        exArb: "يتسرب الماء من السقف."
    },
    "Lexin030559": { // Vägg - جدار
        exSwe: "Vi målade väggarna vita.",
        exArb: "طلينا الجدران باللون الأبيض."
    },
    "Lexin028350": { // Trädgård - حديقة منزل
        exSwe: "Vi odlar grönsaker i trädgården.",
        exArb: "نزرع الخضروات في الحديقة."
    },
    "Lexin002231": { // Balkong - شرفة
        exSwe: "Vi har en stor balkong med utsikt.",
        exArb: "لدينا شرفة كبيرة مع إطلالة."
    },

    // === HEALTH ===
    "Lexin016680": { // Läkare - طبيب
        exSwe: "Jag måste träffa läkaren idag.",
        exArb: "يجب أن أقابل الطبيب اليوم."
    },
    "Lexin027798": { // Tandläkare - طبيب أسنان
        exSwe: "Jag går till tandläkaren två gånger om året.",
        exArb: "أذهب إلى طبيب الأسنان مرتين في السنة."
    },
    "Lexin017411": { // Medicin - دواء
        exSwe: "Ta medicinen tre gånger om dagen.",
        exArb: "خذ الدواء ثلاث مرات في اليوم."
    },
    "Lexin022089": { // Recept - وصفة طبية
        exSwe: "Läkaren skrev ut ett recept på antibiotika.",
        exArb: "كتب الطبيب وصفة طبية للمضادات الحيوية."
    },
    "Lexin007408": { // Feber - حمى
        exSwe: "Barnet har hög feber.",
        exArb: "لدى الطفل حمى عالية."
    },
    "Lexin012393": { // Hosta - سعال
        exSwe: "Hon har haft hosta i en vecka.",
        exArb: "عندها سعال منذ أسبوع."
    },
    "Lexin025501": { // Snuva - رشح
        exSwe: "Jag har snuva och ont i halsen.",
        exArb: "عندي رشح وألم في الحلق."
    },
    "Lexin029693": { // Värk - ألم
        exSwe: "Jag har huvudvärk idag.",
        exArb: "عندي صداع اليوم."
    },
    "Lexin025143": { // Smärta - ألم
        exSwe: "Hon har smärta i ryggen.",
        exArb: "لديها ألم في الظهر."
    },
    "Lexin000464": { // Allergi - حساسية
        exSwe: "Jag har allergi mot nötter.",
        exArb: "لدي حساسية من المكسرات."
    },

    // === DIRECTIONS ===
    "Lexin022040": { // Rakt fram - مباشرة للأمام
        exSwe: "Gå rakt fram och sväng höger.",
        exArb: "امشِ مباشرة للأمام ثم انعطف يميناً."
    },
    "Lexin012355": { // Höger - يمين
        exSwe: "Sväng till höger vid trafikljuset.",
        exArb: "انعطف يميناً عند إشارة المرور."
    },
    "Lexin030666": { // Vänster - يسار
        exSwe: "Banken ligger till vänster.",
        exArb: "البنك على اليسار."
    },
    "Lexin018418": { // Mitt emot - مقابل
        exSwe: "Apoteket ligger mitt emot stationen.",
        exArb: "الصيدلية مقابل المحطة."
    },
    "Lexin003938": { // Bredvid - بجانب
        exSwe: "Jag sitter bredvid dig.",
        exArb: "أجلس بجانبك."
    },
    "Lexin017551": { // Mellan - بين
        exSwe: "Butiken ligger mellan banken och posten.",
        exArb: "المتجر بين البنك ومكتب البريد."
    },
    "Lexin008959": { // Framför - أمام
        exSwe: "Bilen står framför huset.",
        exArb: "السيارة أمام البيت."
    },
    "Lexin002154": { // Bakom - خلف
        exSwe: "Parkeringen är bakom byggnaden.",
        exArb: "موقف السيارات خلف المبنى."
    },
    "Lexin030045": { // Under - تحت
        exSwe: "Katten gömmer sig under sängen.",
        exArb: "القطة تختبئ تحت السرير."
    },
    "Lexin032158": { // Över - فوق
        exSwe: "Lampan hänger över bordet.",
        exArb: "المصباح معلق فوق الطاولة."
    },
    "Lexin018341": { // Nära - قريب
        exSwe: "Affären ligger nära mitt hus.",
        exArb: "المتجر قريب من بيتي."
    },
    "Lexin015824": { // Långt bort - بعيد
        exSwe: "Stockholm ligger långt bort härifrån.",
        exArb: "ستوكهولم بعيدة من هنا."
    },

    // === SHOPPING ===
    "Lexin012313": { // Hylla - رف
        exSwe: "Mjölken står på översta hyllan.",
        exArb: "الحليب على الرف العلوي."
    },
    "Lexin013735": { // Kassa - صندوق/كاشير
        exSwe: "Det var lång kö till kassan.",
        exArb: "كان هناك طابور طويل عند الصندوق."
    },
    "Lexin015462": { // Kvitto - إيصال
        exSwe: "Spara kvittot för att kunna byta.",
        exArb: "احتفظ بالإيصال لتتمكن من الاستبدال."
    },
    "Lexin021887": { // Rea - تخفيضات
        exSwe: "Det är rea på kläder nu.",
        exArb: "هناك تخفيضات على الملابس الآن."
    },
    "Lexin021018": { // Rabatt - خصم
        exSwe: "Du får 20 procent rabatt.",
        exArb: "تحصل على خصم 20 بالمائة."
    },
    "Lexin007245": { // Färg - لون
        exSwe: "Vilken färg vill du ha?",
        exArb: "أي لون تريد؟"
    },
    "Lexin026407": { // Storlek - مقاس
        exSwe: "Vilken storlek har du?",
        exArb: "ما مقاسك؟"
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

console.log(`\n✅ Batch 4: Added ${changesCount} examples. Total: ~${203 + changesCount}`);
