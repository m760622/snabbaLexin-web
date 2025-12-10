const fs = require('fs');

// Read data.js
let dataContent = fs.readFileSync('./data.js', 'utf-8');

// Parse
let dictionaryData;
let prefix = "";
let suffix = "";

if (dataContent.includes('const dictionaryData =')) {
    prefix = "const dictionaryData = ";
    suffix = ";";
    dictionaryData = JSON.parse(dataContent.replace(prefix, '').replace(/;$/, ''));
} else {
    process.exit(1);
}

const COL_SWE = 2;
const COL_EX = 6;
const COL_EX_ARB = 7;

const updates = {
    // --- Medicin Fixes ---
    "Bilirubin ( galfärgämnet )": { swe: "Bilirubin är ett gult ämne som bildas när röda blodkroppar bryts ner.", arb: "البيليروبين مادة صفراء تتشكل عند تكسر خلايا الدم الحمراء." },
    "Bindehinna": { swe: "Bindehinnan är den genomskinliga slemhinna som täcker ögats vita del.", arb: "الملتحمة هي الغشاء المخاطي الشفاف الذي يغطي بياض العين." },
    "Bindvävshinna": { swe: "Muskeln omsluts av en tunn bindvävshinna.", arb: "تُحاط العضلة بغشاء رقيق من النسيج الضام." },
    "Bisköldkörtlarna": { swe: "Bisköldkörtlarna reglerar kroppens kalkbalans.", arb: "تنظم الغدد الجار درقية توازن الكالسيوم في الجسم." },
    "Bitestiklar": { swe: "Spermierna mognar och lagras i bitestiklarna.", arb: "تنضج الحيوانات المنوية وتُخزن في البربخ." },
    "Blandad nerv": { swe: "En blandad nerv innehåller både sensoriska och motoriska nervtrådar.", arb: "يحتوي العصب المختلط على ألياف عصبية حسية وحركية معاً." },
    "BlodBlandad kräkning": { swe: "Blodblandad kräkning bör alltid undersökas av läkare.", arb: "يجب دائماً فحص القيء المصحوب بالدم من قبل الطبيب." },
    "Blodkropp": { swe: "Röda blodkroppar transporterar syre i kroppen.", arb: "تنقل خلايا الدم الحمراء الأكسجين في الجسم." },
    "Blodsockerhalt": { swe: "Det är viktigt för diabetiker att hålla en jämn blodsockerhalt.", arb: "من المهم لمرضى السكري الحفاظ على مستوى ثابت للسكر في الدم." },
    "Blåsor, knottror": { swe: "Utslagen visade sig som små blåsor eller knottror på huden.", arb: "ظهر الطفح الجلدي على شكل بثور صغيرة أو نتوءات على الجلد." },
    "Bomullspinne": { swe: "Använd en bomullspinne för att ta provet.", arb: "استخدم عود قطن لأخذ العينة." },
    "Borrelia": { swe: "Borrelia sprids via fästingbett.", arb: "ينتشر داء لايم (بوريليا) عن طريق لدغات القراد." },
    "BRIS ( barnens rätt i samhället )": { swe: "Barn kan ringa till BRIS om de behöver någon att prata med.", arb: "يمكن للأطفال الاتصال بمنظمة BRIS إذا كانوا بحاجة لشخص يتحدثون معه." },
    "Broskväv": { swe: "Broskväv är mjukare än benväv.", arb: "النسيج الغضروفي أكثر ليونة من النسيج العظمي." },
    "Bukhålan": { swe: "Många vitala organ ligger i bukhålan.", arb: "تقع العديد من الأعضاء الحيوية في تجويف البطن." },
    "Cellkärna": { swe: "Cellkärnan innehåller cellens arvsanlag.", arb: "تحتوي نواة الخلية على المادة الوراثية للخلية." },
    "Cholecystektomi": { swe: "Cholecystektomi är det medicinska namnet för bortopererande av gallblåsan.", arb: "استئصال المرارة هو المصطلح الطبي للعملية الجراحية لإزالة المرارة." },
    "Cirkulationsapparat": { swe: "Hjärtat är en central del av kroppens cirkulationsapparat.", arb: "القلب جزء مركزي في الجهاز الدوري للجسم." },
    "Corium": { swe: "Corium, eller läderhuden, ligger under överhuden.", arb: "الأدمة (Corium) تقع تحت البشرة." },
    "Cytostatika": { swe: "Cytostatika används ofta vid behandling av cancer.", arb: "تستخدم أدوية تثبيط الخلايا (الكيماوي) غالباً في علاج السرطان." },
    "Domning": { swe: "Hon kände en domning i armen efter fallet.", arb: "شعرت بخدر في ذراعها بعد السقوط." },
    "Donator": { swe: "Det råder brist på organ från donatorer.", arb: "هناك نقص في الأعضاء من المتبرعين." },

    // --- Se. (Irregular Verbs) Fixes ---
    "Gick": { swe: "Jag gick hem tidigt igår.", arb: "ذهبت إلى المنزل مبكراً البارحة." }, // Gå
    "Fick": { swe: "Hon fick en present av sin mormor.", arb: "حصلت على هدية من جدتها." }, // Få
    "Tog": { swe: "Han tog bussen till jobbet.", arb: "أخذ الحافلة إلى العمل." }, // Ta
    "Kom": { swe: "När kom du hem?", arb: "متى عدت إلى المنزل؟" }, // Komma
    "Blev": { swe: "Han blev glad över nyheten.", arb: "أصبح سعيداً بالخبر." }, // Bli
    "Var": { swe: "Var var du igår?", arb: "أين كنت البارحة؟" }, // Vara
    "Sade": { swe: "Hon sade att hon inte hade tid.", arb: "قالت إنه ليس لديها وقت." }, // Säga
    "Såg": { swe: "Jag såg en bra film i helgen.", arb: "شاهدت فيلماً جيداً في عطلة نهاية الأسبوع." }, // Se
    "Gav": { swe: "Han gav henne en blomma.", arb: "أعطاها زهرة." }, // Ge
    "Satt": { swe: "Vi satt och pratade i flera timmar.", arb: "جلسنا وتحدثنا لعدة ساعات." }, // Sitta
    "Låg": { swe: "Katten låg och sov i soffan.", arb: "كانت القطة مستلقية ونائمة على الأريكة." }, // Ligga
    "Stod": { swe: "Bilen stod parkerad utanför huset.", arb: "كانت السيارة متوقفة خارج المنزل." }, // Stå
    "Dog": { swe: "Många människor dog i kriget.", arb: "مات الكثير من الناس في الحرب." }, // Dö
    "Åt": { swe: "Vi åt middag klockan sex.", arb: "تناولنا العشاء في الساعة السادسة." }, // Äta
    "Hade": { swe: "Jag hade roligt på festen.", arb: "استمتعت بوقتي في الحفلة." }, // Ha (Past)
    "Har": { swe: "Jag har en hund och en katt.", arb: "لدي كلب وقطة." }, // Ha (Present - usually aux but good to have ex)
    "Höll": { swe: "Han höll ett tal på bröllopet.", arb: "ألقى خطاباً في حفل الزفاف." }, // Hålla
    "Gjorde": { swe: "Vad gjorde du igår?", arb: "ماذا فعلت البارحة؟" }, // Göra
    "Drack": { swe: "Han drack ett glas vatten.", arb: "شرب كوباً من الماء." }, // Dricka
    "Skrev": { swe: "Hon skrev ett brev till sin vän.", arb: "كتبت رسالة لصديقتها." }, // Skriva
    "Sov": { swe: "Barnet sov hela natten.", arb: "نام الطفل طوال الليل." }, // Sova
    "Bad": { swe: "Han bad om ursäkt.", arb: "طلب الاعتذار." }, // Be
    "Bjöd": { swe: "De bjöd oss på middag.", arb: "دعونا لتناول العشاء." } // Bjuda
};

let modifiedCount = 0;

dictionaryData.forEach(entry => {
    const word = entry[COL_SWE] ? entry[COL_SWE].trim() : "";

    // Check match
    if (updates[word]) {
        console.log(`Updating ${word}...`);
        entry[COL_EX] = updates[word].swe;
        entry[COL_EX_ARB] = updates[word].arb;
        modifiedCount++;
    }
});

// Write back
const newContent = prefix + JSON.stringify(dictionaryData, null, 2) + suffix;
fs.writeFileSync('./data.js', newContent, 'utf-8');

console.log(`\n✅ Fixed ${modifiedCount} Medicin & Verb Form examples.`);
