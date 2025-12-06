/**
 * Add examples to top 100 priority words
 * Each example is a realistic Swedish sentence with Arabic translation
 */

const fs = require('fs');

// Examples for top 100 common words
// Format: { lexinId: { exSwe: "Swedish example", exArb: "Arabic translation" } }
const examples = {
    // === ADJECTIVES ===
    "Lexin008450": { // Frisk - معافى
        exSwe: "Barnet är friskt och kan gå till skolan idag.",
        exArb: "الطفل معافى ويمكنه الذهاب إلى المدرسة اليوم."
    },
    "Lexin008643": { // Full - سكران
        exSwe: "Han var full efter festen och kunde inte köra bil.",
        exArb: "كان سكراناً بعد الحفلة ولم يستطع قيادة السيارة."
    },
    "Lexin013174": { // Intressant - مشوق
        exSwe: "Boken var mycket intressant och jag kunde inte sluta läsa.",
        exArb: "كان الكتاب مشوقاً جداً ولم أستطع التوقف عن القراءة."
    },
    "Lexin023983": { // Sjuk - مريض
        exSwe: "Min dotter är sjuk och stannar hemma från skolan.",
        exArb: "ابنتي مريضة وستبقى في المنزل ولن تذهب إلى المدرسة."
    },
    "Lexin029464": { // Törstig - عطشان
        exSwe: "Jag är törstig efter joggningen, kan jag få ett glas vatten?",
        exArb: "أنا عطشان بعد الجري، هل يمكنني الحصول على كأس ماء؟"
    },
    "Lexin029093": { // Trött - متعب
        exSwe: "Jag är trött efter en lång arbetsdag.",
        exArb: "أنا متعب بعد يوم عمل طويل."
    },

    // === NOUNS - Buildings/Places ===
    "Lexin002999": { // Beslut - قرار
        exSwe: "Chefen fattade ett viktigt beslut om företagets framtid.",
        exArb: "اتخذ المدير قراراً مهماً بشأن مستقبل الشركة."
    },
    "Lexin004566": { // Butik - متجر
        exSwe: "Jag köpte en ny telefon i butiken på torget.",
        exArb: "اشتريت هاتفاً جديداً من المتجر في الساحة."
    },
    "Lexin006237": { // Dörr - باب
        exSwe: "Stäng dörren efter dig, det är kallt ute.",
        exArb: "أغلق الباب خلفك، الجو بارد في الخارج."
    },
    "Lexin007905": { // Flygplats - مطار
        exSwe: "Vi måste vara på flygplatsen två timmar innan avgång.",
        exArb: "يجب أن نكون في المطار قبل ساعتين من الإقلاع."
    },
    "Lexin008966": { // Fönster - شباك
        exSwe: "Kan du öppna fönstret? Det är varmt inne.",
        exArb: "هل يمكنك فتح الشباك؟ الجو حار في الداخل."
    },
    "Lexin011818": { // Hus - بيت
        exSwe: "Vi köpte ett nytt hus med tre sovrum.",
        exArb: "اشترينا بيتاً جديداً بثلاث غرف نوم."
    },
    "Lexin014390": { // Kollega - زميل
        exSwe: "Min kollega hjälpte mig med projektet.",
        exArb: "ساعدني زميلي في المشروع."
    },
    "Lexin015379": { // Kund - عميل
        exSwe: "Kunden var nöjd med vår service.",
        exArb: "كان العميل راضياً عن خدمتنا."
    },
    "Lexin017047": { // Lösning - حل
        exSwe: "Vi hittade äntligen en lösning på problemet.",
        exArb: "وجدنا أخيراً حلاً للمشكلة."
    },
    "Lexin021149": { // Pris - سعر
        exSwe: "Vad är priset på den här bilen?",
        exArb: "ما هو سعر هذه السيارة؟"
    },
    "Lexin022717": { // Rum - غرفة
        exSwe: "Mitt rum är på andra våningen.",
        exArb: "غرفتي في الطابق الثاني."
    },
    "Lexin031477": { // Väg - طريق
        exSwe: "Vägen till Stockholm tar ungefär fem timmar.",
        exArb: "الطريق إلى ستوكهولم يستغرق حوالي خمس ساعات."
    },

    // === PAST TENSE VERBS (Se. type) ===
    "Lexin003538": { // Blev - أصبح
        exSwe: "Han blev glad när han fick höra nyheten.",
        exArb: "أصبح سعيداً عندما سمع الخبر."
    },
    "Lexin005827": { // Drack - شرب
        exSwe: "Jag drack en kopp kaffe på morgonen.",
        exArb: "شربت فنجان قهوة في الصباح."
    },
    "Lexin007281": { // Fanns - وُجد
        exSwe: "Det fanns inga biljetter kvar till konserten.",
        exArb: "لم تكن هناك تذاكر متبقية للحفلة."
    },
    "Lexin007556": { // Fick - حصل
        exSwe: "Hon fick jobbet efter intervjun.",
        exArb: "حصلت على الوظيفة بعد المقابلة."
    },
    "Lexin007989": { // Flög - طار
        exSwe: "Fågeln flög upp i luften.",
        exArb: "طار الطائر في الهواء."
    },
    "Lexin009644": { // Förstod - فهم
        exSwe: "Jag förstod inte vad han menade.",
        exArb: "لم أفهم ما كان يعنيه."
    },
    "Lexin010082": { // Gav - أعطى
        exSwe: "Hon gav mig en present på min födelsedag.",
        exArb: "أعطتني هدية في عيد ميلادي."
    },
    "Lexin010248": { // Gick - ذهب
        exSwe: "Vi gick till parken efter middagen.",
        exArb: "ذهبنا إلى الحديقة بعد العشاء."
    },
    "Lexin010320": { // Gjorde - فعل
        exSwe: "Vad gjorde du i helgen?",
        exArb: "ماذا فعلت في عطلة نهاية الأسبوع؟"
    },
    "Lexin011035": { // Hade - كان لديه
        exSwe: "Jag hade en hund när jag var liten.",
        exArb: "كان لدي كلب عندما كنت صغيراً."
    },
    "Lexin012360": { // Höll - أمسك
        exSwe: "Han höll i ratten med båda händerna.",
        exArb: "أمسك بالمقود بكلتا يديه."
    },
    "Lexin014433": { // Kom - أتى
        exSwe: "Gästerna kom precis i tid till middagen.",
        exArb: "جاء الضيوف في الوقت المحدد للعشاء."
    },
    "Lexin015380": { // Kunde - استطاع
        exSwe: "Hon kunde prata tre språk flytande.",
        exArb: "استطاعت التحدث بثلاث لغات بطلاقة."
    },
    "Lexin015622": { // Kände - أحس
        exSwe: "Jag kände mig trött hela dagen.",
        exArb: "أحسست بالتعب طوال اليوم."
    },
    "Lexin015741": { // Körde - قاد
        exSwe: "Pappa körde oss till flygplatsen.",
        exArb: "قادنا أبي إلى المطار."
    },
    "Lexin015792": { // Lade - وضع
        exSwe: "Jag lade nycklarna på bordet.",
        exArb: "وضعت المفاتيح على الطاولة."
    },
    "Lexin016162": { // Levde - عاش
        exSwe: "Min farmor levde till hon var 95 år.",
        exArb: "عاشت جدتي حتى بلغت 95 عاماً."
    },
    "Lexin016707": { // Låg - انبطح/استلقى
        exSwe: "Katten låg på soffan hela dagen.",
        exArb: "استلقت القطة على الأريكة طوال اليوم."
    },
    "Lexin023244": { // Sade/Sa - قال
        exSwe: "Han sade att han skulle komma klockan fem.",
        exArb: "قال إنه سيأتي الساعة الخامسة."
    },
    "Lexin023532": { // Satt - جلس
        exSwe: "Vi satt på kaféet och pratade i timmar.",
        exArb: "جلسنا في المقهى وتحدثنا لساعات."
    },
    "Lexin024119": { // Sjöng - غنّى
        exSwe: "Hon sjöng en vacker sång på konserten.",
        exArb: "غنّت أغنية جميلة في الحفلة."
    },
    "Lexin024540": { // Skrev - كتب
        exSwe: "Jag skrev ett brev till min vän.",
        exArb: "كتبت رسالة إلى صديقي."
    },
    "Lexin025696": { // Sov - نام
        exSwe: "Barnet sov i åtta timmar.",
        exArb: "نام الطفل ثماني ساعات."
    },
    "Lexin025922": { // Sprang - ركض
        exSwe: "Han sprang fem kilometer varje morgon.",
        exArb: "ركض خمسة كيلومترات كل صباح."
    },
    "Lexin026370": { // Stod - وقف
        exSwe: "Hon stod vid busshållplatsen och väntade.",
        exArb: "وقفت عند محطة الحافلات وانتظرت."
    },
    "Lexin027479": { // Såg - رأى
        exSwe: "Jag såg en fin solnedgång igår.",
        exArb: "رأيت غروباً جميلاً أمس."
    },
    "Lexin027487": { // Sålde - باع
        exSwe: "Vi sålde vårt gamla hus förra året.",
        exArb: "بعنا منزلنا القديم العام الماضي."
    },
    "Lexin030670": { // Var - كان
        exSwe: "Det var kallt ute igår.",
        exArb: "كان الجو بارداً في الخارج أمس."
    },
    "Lexin031227": { // Visste - عرف
        exSwe: "Jag visste inte att du var svensk.",
        exArb: "لم أكن أعرف أنك سويدي."
    },
    "Lexin032005": { // Åt - أكل
        exSwe: "Vi åt middag tillsammans igår kväll.",
        exArb: "تناولنا العشاء معاً أمس مساءً."
    },

    // === COMMON NOUNS ===
    "Lexin001300": { // Arbete - عمل
        exSwe: "Han har ett bra arbete på ett stort företag.",
        exArb: "لديه عمل جيد في شركة كبيرة."
    },
    "Lexin002340": { // Bank - بنك
        exSwe: "Jag måste gå till banken för att ta ut pengar.",
        exArb: "يجب أن أذهب إلى البنك لسحب المال."
    },
    "Lexin003837": { // Bok - كتاب
        exSwe: "Jag läser en intressant bok om svensk historia.",
        exArb: "أقرأ كتاباً مشوقاً عن التاريخ السويدي."
    },
    "Lexin004187": { // Bror - شقيق
        exSwe: "Min bror är två år äldre än jag.",
        exArb: "أخي أكبر مني بسنتين."
    },
    "Lexin004651": { // Byxa - بنطلون
        exSwe: "Jag köpte ett par nya byxor på rean.",
        exArb: "اشتريت بنطلوناً جديداً في التخفيضات."
    },
    "Lexin005096": { // Dag - يوم
        exSwe: "Det var en lång dag på jobbet idag.",
        exArb: "كان يوماً طويلاً في العمل اليوم."
    },
    "Lexin005208": { // Dator - كمبيوتر
        exSwe: "Jag behöver en ny dator för mitt arbete.",
        exArb: "أحتاج كمبيوتر جديد لعملي."
    },
    "Lexin007231": { // Familj - عائلة
        exSwe: "Min familj kommer från Syrien.",
        exArb: "عائلتي من سوريا."
    },
    "Lexin007292": { // Far - والد
        exSwe: "Min far arbetar som läkare.",
        exArb: "والدي يعمل طبيباً."
    },
    "Lexin007831": { // Flicka - فتاة
        exSwe: "En liten flicka lekte i parken.",
        exArb: "فتاة صغيرة كانت تلعب في الحديقة."
    },
    "Lexin008528": { // Frukt - فاكهة
        exSwe: "Det är viktigt att äta frukt varje dag.",
        exArb: "من المهم تناول الفاكهة كل يوم."
    },
    "Lexin011368": { // Hem - منزل
        exSwe: "Jag går hem efter jobbet klockan fem.",
        exArb: "أذهب إلى المنزل بعد العمل الساعة الخامسة."
    },
    "Lexin013307": { // Jacka - معطف
        exSwe: "Ta på dig jackan, det är kallt ute.",
        exArb: "البس معطفك، الجو بارد في الخارج."
    },
    "Lexin014178": { // Kläder - ملابس
        exSwe: "Jag tvättar mina kläder varje vecka.",
        exArb: "أغسل ملابسي كل أسبوع."
    },
    "Lexin014954": { // Kort - بطاقة
        exSwe: "Kan jag betala med kort?",
        exArb: "هل يمكنني الدفع بالبطاقة؟"
    },
    "Lexin015510": { // Kvinna - امرأة
        exSwe: "En kvinna hjälpte mig att hitta vägen.",
        exArb: "ساعدتني امرأة في إيجاد الطريق."
    }
};

// Load dictionary
const dataContent = fs.readFileSync('./data.js', 'utf-8');
const match = dataContent.match(/(?:const|var|let)\s+dictionaryData\s*=\s*(\[[\s\S]*?\]);/);
let dictionaryData = eval(match[1]);

// Track changes
let changesCount = 0;

// Apply examples
for (const [lexinId, example] of Object.entries(examples)) {
    for (let i = 0; i < dictionaryData.length; i++) {
        if (dictionaryData[i][0] === lexinId) {
            // Add Swedish example (index 7) and Arabic example (index 8)
            if (!dictionaryData[i][7]) {
                dictionaryData[i][7] = example.exSwe;
                dictionaryData[i][8] = example.exArb;
                changesCount++;
                console.log(`✓ Added example: ${dictionaryData[i][2]}`);
            }
            break;
        }
    }
}

// Convert back to string format
const newDataStr = 'const dictionaryData = ' + JSON.stringify(dictionaryData, null, 4) + ';';

// Save
fs.writeFileSync('./data.js', newDataStr);

console.log(`\n✅ Added ${changesCount} examples to dictionary.`);
