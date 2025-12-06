/**
 * Add examples - Batch 6 (Continuing from batch 5)
 * Focus: Common adjectives, past tense verbs, nouns (places, things, family, clothing)
 * Target: ~85 new examples
 */

const fs = require('fs');

const examples = {
    // === ADJECTIVES ===
    "Lexin008450": { // Frisk - معافى (check if already has example first)
        exSwe: "Han är frisk igen efter sin förkylning.",
        exArb: "هو بصحة جيدة مرة أخرى بعد نزلة البرد."
    },
    "Lexin008643": { // Full - ممتلئ
        exSwe: "Bussen var full med passagerare.",
        exArb: "كان الباص ممتلئاً بالركاب."
    },
    "Lexin013174": { // Intressant - مثير للاهتمام
        exSwe: "Det var en mycket intressant föreläsning.",
        exArb: "كانت محاضرة شيقة للغاية."
    },
    "Lexin023983": { // Sjuk - مريض
        exSwe: "Min dotter är sjuk och kan inte gå till skolan idag.",
        exArb: "ابنتي مريضة ولا تستطيع الذهاب إلى المدرسة اليوم."
    },
    "Lexin029464": { // Törstig - عطشان
        exSwe: "Jag är törstig, kan jag få ett glas vatten?",
        exArb: "أنا عطشان، هل يمكنني الحصول على كوب ماء؟"
    },
    "Lexin029093": { // Trött - متعب
        exSwe: "Jag är så trött efter det långa mötet.",
        exArb: "أنا متعب جداً بعد الاجتماع الطويل."
    },
    "Lexin016956": { // Lätt - خفيف
        exSwe: "Väskan är lätt och enkel att bära.",
        exArb: "الحقيبة خفيفة وسهلة الحمل."
    },
    "Lexin030672": { // Var (adverb) - هناك/أين
        exSwe: "Var ligger biblioteket?",
        exArb: "أين يقع المكتبة؟"
    },

    // === PAST TENSE VERBS ===
    "Lexin003538": { // Blev - أصبح
        exSwe: "Hon blev glad när hon hörde nyheterna.",
        exArb: "أصبحت سعيدة عندما سمعت الأخبار."
    },
    "Lexin005827": { // Drack - شرب
        exSwe: "Han drack en kopp kaffe på morgonen.",
        exArb: "شرب فنجان قهوة في الصباح."
    },
    "Lexin007281": { // Fanns - وُجد
        exSwe: "Det fanns inga platser kvar på tåget.",
        exArb: "لم يكن هناك أماكن متبقية في القطار."
    },
    "Lexin007556": { // Fick - حصل
        exSwe: "Jag fick ett brev från min vän igår.",
        exArb: "حصلت على رسالة من صديقي أمس."
    },
    "Lexin007989": { // Flög - طار
        exSwe: "Fågeln flög högt över träden.",
        exArb: "طار الطائر عالياً فوق الأشجار."
    },
    "Lexin009644": { // Förstod - فهم
        exSwe: "Jag förstod inte vad han sa.",
        exArb: "لم أفهم ما قاله."
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
        exSwe: "Hon gjorde läxan innan hon lekte.",
        exArb: "أنجزت الواجب قبل أن تلعب."
    },
    "Lexin011035": { // Hade - كان لديه
        exSwe: "Vi hade en underbar semester i somras.",
        exArb: "كانت لدينا إجازة رائعة في الصيف الماضي."
    },
    "Lexin012360": { // Höll - أمسك
        exSwe: "Han höll sin dotter i handen.",
        exArb: "أمسك بيد ابنته."
    },
    "Lexin014433": { // Kom - أتى
        exSwe: "Hon kom hem sent igår kväll.",
        exArb: "عادت إلى البيت متأخرة البارحة."
    },
    "Lexin015380": { // Kunde - استطاع
        exSwe: "Han kunde inte komma till festen.",
        exArb: "لم يستطع الحضور إلى الحفلة."
    },
    "Lexin015622": { // Kände - أحس
        exSwe: "Jag kände mig glad efter träningen.",
        exArb: "شعرت بالسعادة بعد التمرين."
    },
    "Lexin015741": { // Körde - قاد
        exSwe: "Han körde bilen till jobbet.",
        exArb: "قاد السيارة إلى العمل."
    },
    "Lexin015792": { // Lade - وضع
        exSwe: "Hon lade nycklarna på bordet.",
        exArb: "وضعت المفاتيح على الطاولة."
    },
    "Lexin016162": { // Levde - عاش
        exSwe: "Farfar levde ett långt och lyckligt liv.",
        exArb: "عاش جدي حياة طويلة وسعيدة."
    },
    "Lexin016707": { // Låg - استلقى
        exSwe: "Katten låg och sov i solen.",
        exArb: "كانت القطة مستلقية تنام في الشمس."
    },
    "Lexin023244": { // Sade - قال
        exSwe: "Läraren sade att vi ska ha prov imorgon.",
        exArb: "قال المعلم أنه سيكون لدينا اختبار غداً."
    },
    "Lexin023532": { // Satt - جلس
        exSwe: "Vi satt och väntade på bussen i en timme.",
        exArb: "جلسنا ننتظر الحافلة لمدة ساعة."
    },
    "Lexin023534": { // Satte - وضع
        exSwe: "Hon satte blomman i vasen.",
        exArb: "وضعت الزهرة في المزهرية."
    },
    "Lexin024119": { // Sjöng - غنى
        exSwe: "Barnen sjöng en vacker sång på skolavslutningen.",
        exArb: "غنى الأطفال أغنية جميلة في حفل نهاية العام الدراسي."
    },
    "Lexin024540": { // Skrev - كتب
        exSwe: "Hon skrev ett långt brev till sin mormor.",
        exArb: "كتبت رسالة طويلة إلى جدتها."
    },
    "Lexin024663": { // Skulle - سوف/كان سيفعل
        exSwe: "Jag skulle ha kommit tidigare men bussen var sen.",
        exArb: "كان يجب أن آتي مبكراً لكن الحافلة تأخرت."
    },
    "Lexin025696": { // Sov - نام
        exSwe: "Bebisen sov hela natten.",
        exArb: "نام الطفل طوال الليل."
    },
    "Lexin025922": { // Sprang - ركض
        exSwe: "Han sprang snabbt för att hinna med tåget.",
        exArb: "ركض بسرعة ليلحق بالقطار."
    },
    "Lexin026370": { // Stod - وقف
        exSwe: "Hon stod vid busshållplatsen och väntade.",
        exArb: "وقفت في موقف الحافلات تنتظر."
    },
    "Lexin027479": { // Såg - رأى
        exSwe: "Jag såg en regnbåge på himlen igår.",
        exArb: "رأيت قوس قزح في السماء أمس."
    },
    "Lexin027487": { // Sålde - باع
        exSwe: "Han sålde sin gamla bil för att köpa en ny.",
        exArb: "باع سيارته القديمة ليشتري واحدة جديدة."
    },
    "Lexin030670": { // Var (verb) - كان
        exSwe: "Det var kallt ute igår.",
        exArb: "كان الجو بارداً في الخارج أمس."
    },
    "Lexin031227": { // Visste - عرف
        exSwe: "Jag visste inte att du hade en syster.",
        exArb: "لم أكن أعلم أن لديك أختاً."
    },
    "Lexin032005": { // Åt - أكل
        exSwe: "Vi åt middag tillsammans igår kväll.",
        exArb: "تناولنا العشاء معاً البارحة."
    },

    // === NOUNS (Places, Buildings) ===
    "Lexin002999": { // Beslut - قرار
        exSwe: "Regeringen tog ett viktigt beslut igår.",
        exArb: "اتخذت الحكومة قراراً مهماً أمس."
    },
    "Lexin004566": { // Butik - متجر
        exSwe: "Det finns en ny butik i centrum.",
        exArb: "يوجد متجر جديد في المركز."
    },
    "Lexin006237": { // Dörr - باب
        exSwe: "Stäng dörren, det är kallt ute.",
        exArb: "أغلق الباب، الجو بارد في الخارج."
    },
    "Lexin007905": { // Flygplats - مطار
        exSwe: "Vi måste vara på flygplatsen två timmar innan avgång.",
        exArb: "يجب أن نكون في المطار قبل ساعتين من الإقلاع."
    },
    "Lexin008966": { // Fönster - نافذة
        exSwe: "Öppna fönstret, det är varmt inne.",
        exArb: "افتح النافذة، الجو حار في الداخل."
    },
    "Lexin011818": { // Hus - بيت
        exSwe: "De köpte ett stort hus på landet.",
        exArb: "اشتروا منزلاً كبيراً في الريف."
    },
    "Lexin031477": { // Väg - طريق
        exSwe: "Vägen till skolan är kort.",
        exArb: "الطريق إلى المدرسة قصير."
    },
    "Lexin022717": { // Rum - غرفة
        exSwe: "Lägenheten har tre rum och kök.",
        exArb: "الشقة بها ثلاث غرف ومطبخ."
    },

    // === NOUNS (Things, Objects) ===
    "Lexin017047": { // Lösning - حل
        exSwe: "Vi hittade en bra lösning på problemet.",
        exArb: "وجدنا حلاً جيداً للمشكلة."
    },
    "Lexin021149": { // Pris - سعر
        exSwe: "Vad är priset på den här jackan?",
        exArb: "ما هو سعر هذه السترة؟"
    },
    "Lexin001300": { // Arbete - عمل
        exSwe: "Han har ett intressant arbete som ingenjör.",
        exArb: "لديه عمل مثير للاهتمام كمهندس."
    },
    "Lexin002340": { // Bank - بنك
        exSwe: "Jag måste gå till banken för att ta ut pengar.",
        exArb: "يجب أن أذهب إلى البنك لسحب المال."
    },
    "Lexin003837": { // Bok - كتاب
        exSwe: "Jag läser en intressant bok just nu.",
        exArb: "أقرأ كتاباً مثيراً للاهتمام الآن."
    },
    "Lexin005208": { // Dator - كمبيوتر
        exSwe: "Jag behöver en ny dator för mitt arbete.",
        exArb: "أحتاج إلى كمبيوتر جديد لعملي."
    },
    "Lexin020179": { // Papper - ورقة
        exSwe: "Kan du ge mig ett papper och en penna?",
        exArb: "هل يمكنك إعطائي ورقة وقلماً؟"
    },
    "Lexin020387": { // Penna - قلم
        exSwe: "Jag glömde min penna hemma.",
        exArb: "نسيت قلمي في البيت."
    },
    "Lexin014954": { // Kort - بطاقة
        exSwe: "Kan jag betala med kort?",
        exArb: "هل يمكنني الدفع بالبطاقة؟"
    },

    // === NOUNS (Family, People) ===
    "Lexin004187": { // Bror - أخ
        exSwe: "Min bror bor i Göteborg.",
        exArb: "أخي يعيش في يوتيبوري."
    },
    "Lexin007231": { // Familj - عائلة
        exSwe: "Min familj kommer från Syrien.",
        exArb: "عائلتي من سوريا."
    },
    "Lexin007292": { // Far - والد
        exSwe: "Min far arbetar som lärare.",
        exArb: "والدي يعمل كمعلم."
    },
    "Lexin027458": { // Syster - أخت
        exSwe: "Min syster är äldre än mig.",
        exArb: "أختي أكبر مني."
    },
    "Lexin017169": { // Man - رجل
        exSwe: "Mannen vid busshållplatsen är min granne.",
        exArb: "الرجل عند موقف الحافلات جاري."
    },
    "Lexin015510": { // Kvinna - امرأة
        exSwe: "Kvinnan som jobbar på biblioteket är mycket hjälpsam.",
        exArb: "المرأة التي تعمل في المكتبة مفيدة جداً."
    },
    "Lexin007831": { // Flicka - فتاة
        exSwe: "Den lilla flickan leker i parken.",
        exArb: "الفتاة الصغيرة تلعب في الحديقة."
    },
    "Lexin014389": { // Kollega - زميل
        exSwe: "Min kollega hjälpte mig med projektet.",
        exArb: "زميلي في العمل ساعدني في المشروع."
    },
    "Lexin015379": { // Kund - عميل
        exSwe: "Kunden ville byta sin produkt.",
        exArb: "أراد العميل استبدال منتجه."
    },

    // === NOUNS (Clothing) ===
    "Lexin004651": { // Byxa - بنطلون
        exSwe: "Jag köpte nya byxor igår.",
        exArb: "اشتريت سروالاً جديداً أمس."
    },
    "Lexin013307": { // Jacka - سترة
        exSwe: "Ta på dig jackan, det är kallt ute.",
        exArb: "ارتدِ السترة، الجو بارد في الخارج."
    },
    "Lexin014178": { // Kläder - ملابس
        exSwe: "Vi måste köpa nya kläder till barnen.",
        exArb: "يجب أن نشتري ملابس جديدة للأطفال."
    },
    "Lexin024407": { // Skjorta - قميص
        exSwe: "Han har en vit skjorta på sig.",
        exArb: "يرتدي قميصاً أبيض."
    },
    "Lexin024420": { // Sko - حذاء
        exSwe: "Jag behöver nya skor till vintern.",
        exArb: "أحتاج إلى أحذية جديدة للشتاء."
    },
    "Lexin018493": { // Mössa - قبعة
        exSwe: "Glöm inte mössan, det är kallt idag.",
        exArb: "لا تنسَ القبعة، الجو بارد اليوم."
    },

    // === NOUNS (Other Common) ===
    "Lexin024443": { // Skola - مدرسة
        exSwe: "Barnen går i skolan varje dag.",
        exArb: "يذهب الأطفال إلى المدرسة كل يوم."
    },
    "Lexin016919": { // Lärare - معلم
        exSwe: "Läraren förklarade lektionen tydligt.",
        exArb: "شرح المعلم الدرس بوضوح."
    },
    "Lexin020843": { // Polis - شرطة
        exSwe: "Polisen hjälpte mig att hitta vägen.",
        exArb: "ساعدني الشرطي على إيجاد الطريق."
    },
    "Lexin024035": { // Sjuksköterska - ممرضة
        exSwe: "Sjuksköterskan tog hand om patienterna.",
        exArb: "اعتنت الممرضة بالمرضى."
    },
    "Lexin017786": { // Minut - دقيقة
        exSwe: "Vänta en minut, jag kommer snart.",
        exArb: "انتظر دقيقة، سآتي قريباً."
    },
    "Lexin017887": { // Mjölk - حليب
        exSwe: "Vi behöver köpa mjölk från affären.",
        exArb: "نحتاج إلى شراء حليب من المتجر."
    },
    "Lexin008527": { // Frukt - فاكهة
        exSwe: "Äpplen och apelsiner är min favoritfrukt.",
        exArb: "التفاح والبرتقال هما فاكهتي المفضلة."
    },
    "Lexin025496": { // Snö - ثلج
        exSwe: "Det snöade hela natten och marken är vit.",
        exArb: "ثلجت طوال الليل والأرض بيضاء."
    },
    "Lexin031154": { // Vinter - شتاء
        exSwe: "Vintern i Sverige är lång och kall.",
        exArb: "الشتاء في السويد طويل وبارد."
    },
    "Lexin031405": { // Vår - ربيع
        exSwe: "På våren börjar blommorna blomma.",
        exArb: "في الربيع تبدأ الزهور بالتفتح."
    },
    "Lexin031464": { // Väder - طقس
        exSwe: "Vädret är fint idag.",
        exArb: "الطقس جميل اليوم."
    },
    "Lexin030781": { // Vatten - ماء
        exSwe: "Det är viktigt att dricka mycket vatten.",
        exArb: "من المهم شرب الكثير من الماء."
    },
    "Lexin025590": { // Soffa - صوفا
        exSwe: "Vi sitter och tittar på TV i soffan.",
        exArb: "نجلس ونشاهد التلفاز على الأريكة."
    },
    "Lexin026380": { // Stol - كرسي
        exSwe: "Det finns sex stolar runt bordet.",
        exArb: "يوجد ستة كراسي حول الطاولة."
    },
    "Lexin015901": { // Lampa - مصباح
        exSwe: "Tänd lampan, det är mörkt här.",
        exArb: "أضئ المصباح، إنه مظلم هنا."
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

for (const [lexinId, example] of Object.entries(examples)) {
    for (let i = 0; i < dictionaryData.length; i++) {
        if (dictionaryData[i][0] === lexinId) {
            // Check if already has an example (index 7 and 8)
            if (dictionaryData[i][7] && dictionaryData[i][7].trim() !== '') {
                console.log(`⚠️  ${dictionaryData[i][2]} already has example, skipping`);
                alreadyHasExample++;
            } else {
                dictionaryData[i][7] = example.exSwe;
                dictionaryData[i][8] = example.exArb;
                changesCount++;
                console.log(`✓ ${dictionaryData[i][2]}`);
            }
            break;
        }
    }
}

const newDataStr = 'const dictionaryData = ' + JSON.stringify(dictionaryData, null, 4) + ';';
fs.writeFileSync('./data.js', newDataStr);

console.log(`\n========================================`);
console.log(`✅ Examples added: ${changesCount}`);
console.log(`⚠️  Already had examples: ${alreadyHasExample}`);
console.log(`📊 Total in batch: ${Object.keys(examples).length}`);
console.log(`========================================`);
