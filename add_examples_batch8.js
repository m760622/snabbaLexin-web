/**
 * Add examples - Batch 8 (Practical everyday verbs and nouns)
 * Focus: Useful verbs and nouns for beginners/intermediate learners
 * Target: 70+ new examples
 */

const fs = require('fs');

const examples = {
    // === USEFUL EVERYDAY VERBS ===

    // Administrerar - يدير (administrate)
    "Lexin000271": {
        exSwe: "Han administrerar företagets ekonomi.",
        exArb: "هو يدير اقتصاد الشركة."
    },

    // Adopterar - يتبنى (adopt)
    "Lexin000273": {
        exSwe: "De vill adoptera ett barn från utlandet.",
        exArb: "يريدون تبني طفل من الخارج."
    },

    // Ammar - تُرضع (breastfeed)
    "Lexin000705": {
        exSwe: "Mamman ammar sitt barn flera gånger om dagen.",
        exArb: "الأم ترضع طفلها عدة مرات في اليوم."
    },

    // Amorterar - يُقسّط (pay off installments)
    "Lexin000716": {
        exSwe: "Vi amorterar på vårt bolån varje månad.",
        exArb: "نسدد أقساط قرضنا العقاري كل شهر."
    },

    // Analyserar - يحلل (analyze)
    "Lexin000753": {
        exSwe: "Läkaren analyserar blodprovet.",
        exArb: "يحلل الطبيب عينة الدم."
    },

    // Bakar - يخبز (bake)
    "Lexin002211": {
        exSwe: "Min mormor bakar bröd varje helg.",
        exArb: "جدتي تخبز الخبز كل عطلة نهاية أسبوع."
    },

    // Backar - يتراجع (reverse/back up)
    "Lexin002172": {
        exSwe: "Föraren backade bilen försiktigt in i garaget.",
        exArb: "أرجع السائق السيارة بحذر إلى المرآب."
    },

    // Balanserar - يوازن (balance)
    "Lexin002261": {
        exSwe: "Hon balanserar arbete och familjeliv.",
        exArb: "هي توازن بين العمل والحياة العائلية."
    },

    // Behöver - يحتاج (need)
    "Lexin002618": {
        exSwe: "Jag behöver hjälp med läxan.",
        exArb: "أحتاج مساعدة في الواجب."
    },

    // Behandlar - يعالج (treat/handle)
    "Lexin002703": {
        exSwe: "Läkaren behandlar patientens förkylning.",
        exArb: "يعالج الطبيب نزلة برد المريض."
    },

    // Bekantar sig - يتعرف (get acquainted)
    "Lexin002744": {
        exSwe: "Hon bekantade sig med grannarna.",
        exArb: "تعرفت على الجيران."
    },

    // Beräknar - يحسب (calculate)
    "Lexin002861": {
        exSwe: "Ekonomen beräknar företagets vinst.",
        exArb: "يحسب المحاسب أرباح الشركة."
    },

    // Berättar - يروي (tell/narrate)
    "Lexin002895": {
        exSwe: "Farfar berättar sagor för barnen.",
        exArb: "يروي الجد قصصاً للأطفال."
    },

    // Beskriver - يصف (describe)
    "Lexin002925": {
        exSwe: "Vittnet beskrev olyckan för polisen.",
        exArb: "وصف الشاهد الحادث للشرطة."
    },

    // Bestämmer - يقرر (decide)
    "Lexin002996": {
        exSwe: "Chefen bestämmer vilka som får ledigt.",
        exArb: "يقرر المدير من يحصل على إجازة."
    },

    // Beställer - يطلب (order)
    "Lexin003024": {
        exSwe: "Vi beställde pizza till middag.",
        exArb: "طلبنا بيتزا للعشاء."
    },

    // Beundrar - يُعجب بـ (admire)
    "Lexin003079": {
        exSwe: "Jag beundrar din styrka och mod.",
        exArb: "أُعجب بقوتك وشجاعتك."
    },

    // Blandar - يخلط (mix)
    "Lexin003541": {
        exSwe: "Hon blandar mjöl och vatten för degen.",
        exArb: "تخلط الطحين والماء للعجينة."
    },

    // Blinkar - يومض/يغمز (blink)
    "Lexin003561": {
        exSwe: "Bilen blinkar till höger innan den svänger.",
        exArb: "السيارة تومض يميناً قبل أن تنعطف."
    },

    // Borstar - يفرشي (brush)
    "Lexin003904": {
        exSwe: "Barnen borstar tänderna före läggdags.",
        exArb: "يفرشي الأطفال أسنانهم قبل النوم."
    },

    // Brinner - يحترق (burn)
    "Lexin004155": {
        exSwe: "Ljuset brinner på bordet.",
        exArb: "الشمعة تحترق على الطاولة."
    },

    // Bryr sig om - يهتم بـ (care about)
    "Lexin004271": {
        exSwe: "Hon bryr sig om sina vänner.",
        exArb: "هي تهتم بأصدقائها."
    },

    // Byter - يستبدل (exchange/swap)
    "Lexin004640": {
        exSwe: "Jag behöver byta däck på bilen.",
        exArb: "أحتاج إلى استبدال إطارات السيارة."
    },

    // Använder - يستخدم (use)
    "Lexin001247": {
        exSwe: "Hon använder sin telefon för att lära sig svenska.",
        exArb: "تستخدم هاتفها لتعلم السويدية."
    },

    // Arbetar - يعمل
    "Lexin001268": {
        exSwe: "Pappa arbetar på en fabrik.",
        exArb: "أبي يعمل في مصنع."
    },

    // Avgår - يغادر (depart)
    "Lexin001768": {
        exSwe: "Tåget avgår klockan sex på morgonen.",
        exArb: "يغادر القطار الساعة السادسة صباحاً."
    },

    // Diskar - يغسل الصحون (wash dishes)
    "Lexin005541": {
        exSwe: "Han diskar efter middagen.",
        exArb: "يغسل الصحون بعد العشاء."
    },

    // Duschar - يستحم (shower)
    "Lexin006018": {
        exSwe: "Jag duschar varje morgon.",
        exArb: "أستحم كل صباح."
    },

    // Erbjuder - يعرض/يقدم (offer)
    "Lexin006765": {
        exSwe: "Företaget erbjuder gratis leverans.",
        exArb: "تقدم الشركة توصيلاً مجانياً."
    },

    // Erkänner - يعترف (admit/recognize)
    "Lexin006833": {
        exSwe: "Han erkände sitt misstag.",
        exArb: "اعترف بخطئه."
    },

    // Fastnar - يعلق (get stuck)
    "Lexin007376": {
        exSwe: "Bilen fastnade i snön.",
        exArb: "علقت السيارة في الثلج."
    },

    // Fryser - يتجمد (freeze)
    "Lexin008599": {
        exSwe: "Jag fryser när det är kallt ute.",
        exArb: "أشعر بالبرد عندما يكون الجو بارداً."
    },

    // Förklarar - يشرح (explain)
    "Lexin009210": {
        exSwe: "Läraren förklarar grammatiken för eleverna.",
        exArb: "يشرح المعلم القواعد للطلاب."
    },

    // Försvinner - يختفي (disappear)
    "Lexin009619": {
        exSwe: "Solen försvinner bakom molnen.",
        exArb: "تختفي الشمس خلف الغيوم."
    },

    // Förväntar - يتوقع (expect)
    "Lexin009900": {
        exSwe: "Vi förväntar oss besked imorgon.",
        exArb: "نتوقع الرد غداً."
    },

    // Gissar - يخمن (guess)
    "Lexin010304": {
        exSwe: "Kan du gissa vad det är för present?",
        exArb: "هل يمكنك تخمين ما هي الهدية؟"
    },

    // Glömmer - ينسى (forget)
    "Lexin010368": {
        exSwe: "Glöm inte att ta med jackan!",
        exArb: "لا تنسَ أن تأخذ السترة!"
    },

    // Gratulerar - يهنئ (congratulate)
    "Lexin010597": {
        exSwe: "Vi gratulerar dig på födelsedagen!",
        exArb: "نهنئك بعيد ميلادك!"
    },

    // Gråter - يبكي (cry)
    "Lexin010673": {
        exSwe: "Bebisen gråter när hon är hungrig.",
        exArb: "يبكي الطفل عندما يكون جائعاً."
    },

    // Handlar - يتسوق (shop)
    "Lexin011125": {
        exSwe: "Jag handlar mat i affären på vägen hem.",
        exArb: "أتسوق الطعام من المتجر في الطريق للبيت."
    },

    // Hatar - يكره (hate)
    "Lexin011206": {
        exSwe: "Han hatar att stå tidigt på morgonen.",
        exArb: "هو يكره الاستيقاظ مبكراً في الصباح."
    },

    // Hinner - يلحق/يتسنى له (have time to)
    "Lexin011616": {
        exSwe: "Jag hinner inte äta frukost innan jobbet.",
        exArb: "لا يتسنى لي تناول الفطور قبل العمل."
    },

    // Hittar - يجد (find)
    "Lexin011665": {
        exSwe: "Jag hittade mina nycklar i fickan.",
        exArb: "وجدت مفاتيحي في الجيب."
    },

    // Hoppar - يقفز (jump)
    "Lexin011782": {
        exSwe: "Barnen hoppar hopprep på skolgården.",
        exArb: "يقفز الأطفال على الحبل في فناء المدرسة."
    },

    // Hostar - يسعل (cough)
    "Lexin011792": {
        exSwe: "Han hostar mycket på grund av förkylningen.",
        exArb: "يسعل كثيراً بسبب نزلة البرد."
    },

    // Hugger - يقطع (chop)
    "Lexin011808": {
        exSwe: "Farfar hugger ved till brasan.",
        exArb: "يقطع الجد الحطب للمدفأة."
    },

    // Hälsar - يحيي (greet)
    "Lexin012207": {
        exSwe: "Hon hälsar på sina grannar varje morgon.",
        exArb: "تحيي جيرانها كل صباح."
    },

    // Häller - يصب (pour)
    "Lexin012216": {
        exSwe: "Han häller kaffe i koppen.",
        exArb: "يصب القهوة في الفنجان."
    },

    // Hänger - يُعلق (hang)
    "Lexin012294": {
        exSwe: "Häng jackan på kroken.",
        exArb: "علق السترة على الخطاف."
    },

    // Hämtar - يجلب (fetch)
    "Lexin012331": {
        exSwe: "Jag hämtar barnen från skolan klockan tre.",
        exArb: "أجلب الأطفال من المدرسة الساعة الثالثة."
    },

    // Förlorar - يخسر (lose)
    "Lexin009309": {
        exSwe: "Vårt lag förlorade matchen med 2-3.",
        exArb: "خسر فريقنا المباراة 2-3."
    },

    // Försöker - يحاول (try)
    "Lexin009770": {
        exSwe: "Jag försöker lära mig ett nytt språk.",
        exArb: "أحاول تعلم لغة جديدة."
    },

    // Gillar - يحب (like)
    "Lexin010268": {
        exSwe: "Jag gillar att läsa böcker på kvällen.",
        exArb: "أحب قراءة الكتب في المساء."
    },

    // === PRACTICAL NOUNS ===

    // Affär - متجر (store)
    "Lexin000288": {
        exSwe: "Det finns en affär runt hörnet.",
        exArb: "يوجد متجر عند الزاوية."
    },

    // Bröd - خبز (bread)
    "Lexin004189": {
        exSwe: "Vi köper färskt bröd varje dag.",
        exArb: "نشتري خبزاً طازجاً كل يوم."
    },

    // Cykel - دراجة (bicycle)
    "Lexin005040": {
        exSwe: "Jag cyklar till jobbet på min cykel.",
        exArb: "أركب دراجتي إلى العمل."
    },

    // Dricka - مشروب (drink - noun)
    "Lexin005826": {
        exSwe: "Vad vill du ha för dricka?",
        exArb: "ماذا تريد أن تشرب؟"
    },

    // Förening - جمعية (association)
    "Lexin009060": {
        exSwe: "Han är medlem i en idrottsförening.",
        exArb: "هو عضو في جمعية رياضية."
    },

    // Granne - جار (neighbor)
    "Lexin010576": {
        exSwe: "Min granne är mycket snäll och hjälpsam.",
        exArb: "جاري لطيف ومفيد جداً."
    },

    // Kaffe - قهوة (coffee)
    "Lexin013581": {
        exSwe: "Jag dricker en kopp kaffe varje morgon.",
        exArb: "أشرب فنجان قهوة كل صباح."
    },

    // Lunch - غداء (lunch)
    "Lexin016667": {
        exSwe: "Vi äter lunch klockan tolv.",
        exArb: "نتناول الغداء الساعة الثانية عشرة."
    },

    // Lägenhet - شقة (apartment)
    "Lexin016838": {
        exSwe: "Vi bor i en trerumslägenhet i centrum.",
        exArb: "نسكن في شقة من ثلاث غرف في المركز."
    },

    // Natt - ليل (night)
    "Lexin018578": {
        exSwe: "Jag sov bra i natt.",
        exArb: "نمت جيداً الليلة الماضية."
    },

    // Paraply - مظلة (umbrella)
    "Lexin020196": {
        exSwe: "Ta med ett paraply, det kan regna.",
        exArb: "خذ مظلة، قد تمطر."
    },

    // Rest - بقية (rest/remainder)
    "Lexin022274": {
        exSwe: "Spara resten av maten till imorgon.",
        exArb: "احفظ بقية الطعام إلى الغد."
    },

    // Svar - جواب (answer)
    "Lexin026955": {
        exSwe: "Jag väntar på ditt svar.",
        exArb: "أنتظر جوابك."
    },

    // Tåg - قطار (train)
    "Lexin029221": {
        exSwe: "Tåget till Göteborg avgår klockan nio.",
        exArb: "يغادر القطار إلى يوتيبوري الساعة التاسعة."
    },

    // Vecka - أسبوع (week)
    "Lexin030793": {
        exSwe: "Jag reser till Spanien nästa vecka.",
        exArb: "سأسافر إلى إسبانيا الأسبوع القادم."
    },

    // Ålder - عمر (age)
    "Lexin031980": {
        exSwe: "Min ålder är tjugofem år.",
        exArb: "عمري خمسة وعشرون عاماً."
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
let alreadyHasExample = 0;
let notFound = 0;

for (const [lexinId, example] of Object.entries(examples)) {
    let found = false;
    for (let i = 0; i < dictionaryData.length; i++) {
        if (dictionaryData[i][0] === lexinId) {
            found = true;
            if (dictionaryData[i][7] && dictionaryData[i][7].trim() !== '') {
                console.log(`⚠️  ${dictionaryData[i][2]} (${lexinId}) already has example, skipping`);
                alreadyHasExample++;
            } else {
                dictionaryData[i][7] = example.exSwe;
                dictionaryData[i][8] = example.exArb;
                changesCount++;
                console.log(`✓ ${dictionaryData[i][2]} - ${dictionaryData[i][3]}`);
            }
            break;
        }
    }
    if (!found) {
        console.log(`❌ ID not found: ${lexinId}`);
        notFound++;
    }
}

const newDataStr = 'const dictionaryData = ' + JSON.stringify(dictionaryData, null, 4) + ';';
fs.writeFileSync('./data.js', newDataStr);

console.log(`\n========================================`);
console.log(`✅ Examples added: ${changesCount}`);
console.log(`⚠️  Already had examples: ${alreadyHasExample}`);
console.log(`❌ Not found: ${notFound}`);
console.log(`📊 Total in batch 8: ${Object.keys(examples).length}`);
console.log(`📊 CUMULATIVE TOTAL: 382 + ${changesCount} = ${382 + changesCount} examples`);
console.log(`========================================`);
