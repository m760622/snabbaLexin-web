/**
 * Add examples - Batch 7 (Targeting remaining common words)
 * Focus: Remaining common words that still need examples
 * Target: ~40 new examples for common words
 */

const fs = require('fs');

const examples = {
    // === REMAINING COMMON WORDS ===

    // Satt (adj) - متين وقصير (stocky)
    "Lexin023533": {
        exSwe: "Han är en satt man med kort hals.",
        exArb: "هو رجل متين وقصير ذو رقبة قصيرة."
    },

    // Vind (adj) - أحول (cross-eyed)
    "Lexin031109": {
        exSwe: "Läkaren upptäckte att barnet var lite vind.",
        exArb: "اكتشف الطبيب أن الطفل كان أحول قليلاً."
    },

    // Såg (Bygg.) - منشار (saw - tool)
    "Lexin027481": {
        exSwe: "Snickaren använde en såg för att klippa brädan.",
        exArb: "استخدم النجار منشاراً لقطع اللوح."
    },

    // Ny (Förled.) - حديثاً (newly)
    "Lexin018894": {
        exSwe: "Det nymålade huset såg fint ut.",
        exArb: "بدا المنزل المطلي حديثاً جميلاً."
    },

    // Beslut (JuridikS.) - قرار/حكم (legal decision)
    "Lexin002998": {
        exSwe: "Domstolen meddelade sitt beslut igår.",
        exArb: "أعلنت المحكمة قرارها أمس."
    },

    // SOL (Medicin.) - قانون الرعاية الاجتماعية
    "Lexin025595": {
        exSwe: "Enligt SOL har alla rätt till bistånd.",
        exArb: "وفقاً لقانون الرعاية الاجتماعية، للجميع الحق في المساعدة."
    },

    // Skola (Se.) - سوف (shall/will)
    "Lexin024441": {
        exSwe: "Den som spar han haver skola få.",
        exArb: "من يدخر سوف يحصل."
    },

    // Stänger (Se.) - قضبان (bars/rods)
    "Lexin026905": {
        exSwe: "Fönstret har järnstänger för säkerhet.",
        exArb: "النافذة بها قضبان حديدية للأمان."
    },

    // Bank (Substantiv.) - جرف (cliff/bank - geography)
    "Lexin002336": {
        exSwe: "Vi satt på banken vid havet och tittade på solnedgången.",
        exArb: "جلسنا على الجرف عند البحر وشاهدنا غروب الشمس."
    },

    // Bank (Substantiv.) - ضفة (riverbank)
    "Lexin002337": {
        exSwe: "Barnen lekte på flodens bank.",
        exArb: "لعب الأطفال على ضفة النهر."
    },

    // Bank (Substantiv.) - حاجز من الغيوم (cloud bank)
    "Lexin002338": {
        exSwe: "En bank av moln täckte horisonten.",
        exArb: "غطى حاجز من الغيوم الأفق."
    },

    // Bok (Substantiv.) - زان (beech tree)
    "Lexin003836": {
        exSwe: "I parken finns det gamla bokträd.",
        exArb: "يوجد في الحديقة أشجار زان قديمة."
    },

    // Bok (Substantiv.) - كراس/دفتر (notebook)
    "Lexin003838": {
        exSwe: "Jag skriver anteckningar i min bok.",
        exArb: "أكتب الملاحظات في دفتري."
    },

    // Familj (Substantiv.) - عائلة (family - second entry)
    "Lexin007232": {
        exSwe: "Familjen består av föräldrar och barn.",
        exArb: "تتكون العائلة من الوالدين والأطفال."
    },

    // Flygplats (Substantiv.) - مطار
    "Lexin007904": {
        exSwe: "Arlanda är den största flygplatsen i Sverige.",
        exArb: "أرلاندا هو أكبر مطار في السويد."
    },

    // Får (Substantiv.) - خروف (sheep)
    "Lexin008822": {
        exSwe: "Bonden har femtio får på sin gård.",
        exArb: "لدى المزارع خمسون خروفاً في مزرعته."
    },

    // Går (Substantiv.) - الأمس (yesterday - archaic)
    "Lexin010913": {
        exSwe: "I går var vädret mycket bättre.",
        exArb: "كان الطقس أفضل بكثير بالأمس."
    },

    // Hus (Substantiv.) - بيت (second entry)
    "Lexin011817": {
        exSwe: "Det röda huset ligger vid sjön.",
        exArb: "المنزل الأحمر يقع بجانب البحيرة."
    },

    // Kör (Substantiv.) - استمرار (sequence/run)
    "Lexin015734": {
        exSwe: "Vi hade tre vinster i kör.",
        exArb: "حققنا ثلاثة انتصارات متتالية."
    },

    // Kör (Substantiv.) - كورس (choir)
    "Lexin015735": {
        exSwe: "Hon sjunger i kyrkans kör varje söndag.",
        exArb: "تغني في جوقة الكنيسة كل أحد."
    },

    // Lösning (Substantiv.) - محلول (solution - chemistry)
    "Lexin017046": {
        exSwe: "Läkaren blandade en saltlösning för injektionen.",
        exArb: "خلط الطبيب محلولاً ملحياً للحقنة."
    },

    // Minut (Substantiv.) - مُفَرَّق (minute - retail)
    "Lexin017787": {
        exSwe: "Vi säljer varor i minut till privatpersoner.",
        exArb: "نبيع البضائع بالتجزئة للأفراد."
    },

    // Pris (Substantiv.) - قَبْصة (pinch - old meaning)
    "Lexin021146": {
        exSwe: "Hon tog en pris snus.",
        exArb: "أخذت قبصة من السعوط."
    },

    // Ren (Substantiv.) - الرّنة (reindeer)
    "Lexin022169": {
        exSwe: "I Norrland finns det många renar.",
        exArb: "يوجد الكثير من حيوان الرنة في شمال السويد."
    },

    // Ren (Substantiv.) - حافّة (edge/rim)
    "Lexin022170": {
        exSwe: "Kontrollera att locket sitter på renen.",
        exArb: "تأكد من أن الغطاء موضوع على الحافة."
    },

    // Rum (Substantiv.) - حدوث (occurrence/room - concept)
    "Lexin022714": {
        exSwe: "Sådana händelser äger rum varje dag.",
        exArb: "مثل هذه الأحداث تحدث كل يوم."
    },

    // Skrev (Substantiv.) - شقّ ما بين الساقين (crotch)
    "Lexin024541": {
        exSwe: "Byxorna är lite för trånga i skrevet.",
        exArb: "البنطلون ضيق قليلاً في منطقة العجان."
    },

    // Stod (Substantiv.) - تمثال (statue)
    "Lexin026371": {
        exSwe: "Det finns ett stod av Gustav II Adolf i Göteborg.",
        exArb: "يوجد تمثال لغوستاف الثاني أدولف في يوتيبوري."
    },

    // Stol (Substantiv.) - مقعد (seat - secondary meaning)
    "Lexin026381": {
        exSwe: "Ta en stol och sitt ner.",
        exArb: "خذ مقعداً واجلس."
    },

    // Sval (Substantiv.) - خزانة أطعمة (larder/pantry)
    "Lexin027123": {
        exSwe: "Vi förvarar mjölk och ost i svalen.",
        exArb: "نحتفظ بالحليب والجبن في خزانة الأطعمة."
    },

    // Syster (Substantiv.) - ممرضة (nurse)
    "Lexin027459": {
        exSwe: "Systern tog blodprov på patienten.",
        exArb: "أخذت الممرضة عينة دم من المريض."
    },

    // Såg (Substantiv.) - منشار (saw)
    "Lexin027480": {
        exSwe: "Jag köpte en elektrisk såg för att klippa ved.",
        exArb: "اشتريت منشاراً كهربائياً لقطع الحطب."
    },

    // Var (Substantiv.) - صديد (pus)
    "Lexin030674": {
        exSwe: "Läkaren rensade såret från var.",
        exArb: "نظف الطبيب الجرح من الصديد."
    },

    // Vind (Substantiv.) - عُلّيّة (attic)
    "Lexin031111": {
        exSwe: "Vi förvarar gamla saker på vinden.",
        exArb: "نحتفظ بالأشياء القديمة في العلية."
    },

    // Flyger (Verb.) - يطير
    "Lexin007896": {
        exSwe: "Fågeln flyger högt i skyn.",
        exArb: "يطير الطائر عالياً في السماء."
    },

    // Flyger (Verb.) - يسافر بالطائرة
    "Lexin007897": {
        exSwe: "Jag flyger till Paris nästa vecka.",
        exArb: "سأسافر بالطائرة إلى باريس الأسبوع القادم."
    },

    // Håller (Verb.) - يقف (stops at)
    "Lexin012026": {
        exSwe: "Bussen håller vid nästa hållplats.",
        exArb: "تقف الحافلة في المحطة التالية."
    },

    // Simmar (Verb.) - يسبح
    "Lexin023890": {
        exSwe: "Hon simmar i havet varje morgon.",
        exArb: "تسبح في البحر كل صباح."
    },

    // Sätter (Verb.) - يُنضّد (typesetting - specialized)
    "Lexin027692": {
        exSwe: "Tryckaren sätter texten före tryckning.",
        exArb: "ينضد الطابع النص قبل الطباعة."
    },

    // Träffar (Verb.) - يتوصل (reaches agreement)
    "Lexin029045": {
        exSwe: "Parterna träffar ett avtal idag.",
        exArb: "يتوصل الطرفان إلى اتفاق اليوم."
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
}

const newDataStr = 'const dictionaryData = ' + JSON.stringify(dictionaryData, null, 4) + ';';
fs.writeFileSync('./data.js', newDataStr);

console.log(`\n========================================`);
console.log(`✅ Examples added: ${changesCount}`);
console.log(`⚠️  Already had examples: ${alreadyHasExample}`);
console.log(`📊 Total in batch 7: ${Object.keys(examples).length}`);
console.log(`📊 CUMULATIVE TOTAL: 336 + 6 + ${changesCount} = ${342 + changesCount} examples`);
console.log(`========================================`);
