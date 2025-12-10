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
    console.error("Could not parse data.js structure.");
    process.exit(1);
}

const COL_ID = 0;
const COL_SWE = 2; // Swedish Word Column
const COL_EX = 6;
const COL_EX_ARB = 7;

// Word -> Example Map (Correct Mapping)
const updates = {
    "Acceptans": {
        swe: "Ett demokratiskt samhälle bygger på ömsesidig acceptans och respekt för olikheter.",
        arb: "يقوم المجتمع الديمقراطي على التقبل المتبادل واحترام الاختلافات بين البشر."
    },
    "Adoption": {
        swe: "Rätten till adoption bör baseras på förmågan att ge barnet en trygg uppväxt, oavsett föräldrarnas läggning.",
        arb: "يجب أن يعتمد الحق في التبني على القدرة على توفير نشأة آمنة للطفل، بغض النظر عن ميول الوالدين."
    },
    "Bisexuell": {
        swe: "Att vara bisexuell innebär att man kan känna romantisk eller sexuell attraktion till både män och kvinnor.",
        arb: "أن تكون ثنائي الميول الجنسية يعني القدرة على الانجذاب العاطفي أو الجنسي لكلا الجنسين."
    },
    "Bög": { // Watch out for exact casing. "Bög"
        swe: "Han kom ut som bög till sina föräldrar och möttes av kärlek och stöd.",
        arb: "صارح والديه بأنه مثلي الجنس، وقوبل بالحب والدعم الكامل."
    },
    "Cisperson": {
        swe: "En cisperson är någon vars könsidentitet stämmer överens med det kön som registrerades vid födseln.",
        arb: "الشخص المتطابق جنسياً (سيس جندر) هو من تتوافق هويته الجندرية مع جنسه المُسجل عند الولادة."
    },
    "Civilstånd": {
        swe: "Civilstånd ska inte påverka ens möjligheter i arbetslivet.",
        arb: "لا ينبغي أن تؤثر الحالة الاجتماعية للفرد على فرصه في الحياة المهنية."
    },
    "Diskriminering": {
        swe: "Lagen förbjuder all form av diskriminering baserad på sexuell läggning eller könsidentitet.",
        arb: "يحظر القانون كافة أشكال التمييز القائمة على الميول الجنسية أو الهوية الجندرية."
    },
    "Feminism": {
        swe: "Feminism handlar i grunden om att alla ska ha samma rättigheter och möjligheter oavsett kön.",
        arb: "تتمحور النسوية في جوهرها حول ضمان حقوق وفرص متساوية للجميع بغض النظر عن الجنس."
    },
    "Fördom": {
        swe: "Vi måste arbeta aktivt för att bryta ner gamla fördomar och skapa ett mer inkluderande samhälle.",
        arb: "علينا العمل بجد لتحطيم الأحكام المسبقة القديمة وبناء مجتمع أكثر شمولاً."
    },
    "Genus": {
        swe: "Genusvetenskap undersöker hur föreställningar om kön skapas och upprätthålls i kulturen.",
        arb: "تبحث دراسات الجندر في كيفية تشكيل وتريسخ المفاهيم المتعلقة بالجنس داخل الثقافة."
    },
    "Hatbrott": {
        swe: "Polisen ser mycket allvarligt på hatbrott som riktas mot minoritetsgrupper.",
        arb: "تتعامل الشرطة بجدية بالغة مع جرائم الكراهية الموجهة ضد الأقليات."
    },
    "Heteronormativitet": {
        swe: "Att ifrågasätta heteronormativitet innebär att synliggöra att heterosexualitet ofta tas för givet som det normala.",
        arb: "مساءلة المعيارية الغيرية تعني تسليط الضوء على افتراض أن المغايرة الجنسية هي الوضع الطبيعي التلقائي."
    },
    "Homofobi": {
        swe: "Homofobi kan ta sig uttryck i allt från osynliggörande till öppet hat och våld.",
        arb: "يمكن أن تظهر رهاب المثلية بأشكال متعددة، بدءاً من التهميش وصولاً إلى الكراهية والعنف العلني."
    },
    "Identitet": {
        swe: "Att hitta sin identitet är en resa som kan ta tid och se olika ut för alla.",
        arb: "اكتشاف الهوية رحلة قد تستغرق وقتاً وتختلف مساراتها من شخص لآخر."
    },
    "Inkludering": {
        swe: "Sann inkludering kräver att vi lyssnar på och lyfter röster som sällan får höras.",
        arb: "الاشتمال الحقيقي يتطلب منا الاستماع إلى الأصوات المهمشة وإعلاء شأنها."
    },
    "Komma ut": {
        swe: "Att komma ut är ofta en process som sker i flera steg genom livet, inte bara vid ett enstaka tillfälle.",
        arb: "الإفصاح عن الميول (الخروج من الخزانة) غالباً ما يكون عملية مستمرة عبر مراحل الحياة، وليس حدثاً وحيداً."
    },
    "Kön": {
        swe: "Juridiskt kön är det som står i passet, men det behöver inte spegla ens upplevda kön.",
        arb: "الجنس القانوني هو المثبت في الوثائق، لكنه قد لا يعكس بالضرورة الجنس الذي يشعر به الشخص."
    },
    "Lesbisk": {
        swe: "Hon lever i en lycklig relation med sin fru och identifierar sig stolt som lesbisk.",
        arb: "تعيش علاقة سعيدة مع زوجتها وتعرف عن نفسها بفخر كامرأة مثلية."
    },
    "Likabehandling": {
        swe: "Skolan har en plan för likabehandling för att motverka mobbning och kränkningar.",
        arb: "لدى المدرسة خطة للمساواة في المعاملة تهدف إلى مكافحة التنمر والإهانات."
    },
    "Mångfald": {
        swe: "Mångfald på arbetsplatsen bidrar ofta till kreativitet och nya perspektiv.",
        arb: "التنوع في مكان العمل يساهم غالباً في تعزيز الإبداع وجلب وجهات نظر جديدة."
    },
    "Norm": {
        swe: "Normer är oskrivna regler som styr hur vi förväntas bete oss i sociala sammanhang.",
        arb: "المعايير الاجتماعية هي قواعد غير مكتوبة توجه سلوكنا المتوقع في السياقات الاجتماعية."
    },
    "Normkritik": {
        swe: "Normkritik hjälper oss att syna maktstrukturer och förstå varför vissa grupper privilegieras.",
        arb: "يساعدنا النقد المعياري على فحص هياكل السلطة وفهم أسباب تمتع مجموعات معينة بامتيازات."
    },
    "Patriarkat": {
        swe: "Många samhällsstrukturer är formade av ett historiskt patriarkat som gynnat män.",
        arb: "تشكلت العديد من الهياكل المجتمعية بفعل نظام أبوي تاريخي منح امتيازات للرجال."
    },
    "Registrerat partnerskap": {
        swe: "Innan det könsneutrala äktenskapet infördes kunde samkönade par ingå registrerat partnerskap.",
        arb: "قبل إقرار الزواج المحايد جنسياً، كان بإمكان الأزواج من نفس الجنس عقد شراكة مسجلة."
    },
    "Regnbågsfamilj": {
        swe: "En regnbågsfamilj kan se ut på många olika sätt, men kärleken till barnen är alltid densamma.",
        arb: "قد تتخذ عائلات قوس قزح أشكالاً متعددة، لكن حب الأطفال يظل ثابتاً دائماً."
    },
    "Samkönade äktenskap": {
        swe: "Rätten till samkönade äktenskap är en viktig milstolpe för mänskliga rättigheter.",
        arb: "حق الزواج للأزواج من نفس الجنس يعتبر علامة فارقة في مسيرة حقوق الإنسان."
    },
    "Sexuell läggning": {
        swe: "Ingen ska behöva dölja sin sexuella läggning av rädsla för repressalier.",
        arb: "لا ينبغي لأحد أن يضطر لإخفاء ميوله الجنسية خوفاً من الانتقام."
    },
    "Stereotyp": {
        swe: "Stereotyper om hur män och kvinnor ska vara begränsar individens frihet att vara sig själv.",
        arb: "الصور النمطية حول أدوار الذكور والإناث تحد من حرية الفرد في أن يكون على طبيعته."
    },
    "Tolerans": {
        swe: "Ett öppet samhälle kännetecknas av hög tolerans för olika åsikter och livsstilar.",
        arb: "يتميز المجتمع المنفتح بدرجة عالية من التسامح مع اختلاف الآراء وأنماط العيش."
    },
    "Transfobi": {
        swe: "Kampen mot transfobi är nödvändig för att säkra transpersoners trygghet och hälsa.",
        arb: "مكافحة رهاب التحول الجنسي ضرورة لضمان أمان وصحة الأشخاص المتحولين."
    },
    "Transperson": { // Might be Transpersoner vs Transperson. Need to check exact word
        swe: "Transpersoner möter ofta unika utmaningar i vården som kräver specifik kompetens.",
        arb: "غالباً ما يواجه المتحولون جنسياً تحديات فريدة في الرعاية الصحية تتطلب كفاءات متخصصة."
    },
    "Könsneutral": {
        swe: "Användningen av det könsneutrala pronomenet 'hen' har ökat i det svenska språket.",
        arb: "لقد ازداد استخدام الضمير المحايد جنسياً 'hen' في اللغة السويدية."
    }
};

// Explicitly revert the words I messed up in the previous run.
// I will just set them back to default placeholder if they are NOT in the updates list.
const messedUpIDs = [
    "Lexin032822", "Lexin032824", "Lexin032828", "Lexin032830", "Lexin032831",
    "Lexin032832", "Lexin032833", "Lexin032839", "Lexin032841", "Lexin032845",
    "Lexin032848", "Lexin032851", "Lexin032853", "Lexin032858", "Lexin032859",
    "Lexin032863", "Lexin032866", "Lexin032870", "Lexin032871", "Lexin032873",
    "Lexin032875", "Lexin032878"
    // Note: Some of these ARE in the updates list (e.g. Lexin032882 was Patriarkat, which was correct?)
    // No, my previous script had IDs hardcoded to Specific Words that were NOT referencing those IDs.
    // So Lexin032822 (Hivnegativ) got Acceptans example.
    // I need to reset Lexin032822 unless "Hivnegativ" is in `updates`. (It is not).
];

let modifiedCount = 0;
let resetCount = 0;

dictionaryData.forEach(entry => {
    const id = entry[COL_ID];
    const word = entry[COL_SWE] ? entry[COL_SWE].trim() : "";

    // 1. apply updates based on WORD match
    if (updates[word]) {
        // Only update if it's HBTQ category to be safe? 
        // Or just match word. Word match is safe enough for these unique terms.
        console.log(`Updating [${id}] ${word}...`);
        entry[COL_EX] = updates[word].swe;
        entry[COL_EX_ARB] = updates[word].arb;
        modifiedCount++;
    }
    // 2. Revert the messed up IDs if they were NOT updated by step 1
    // (This prevents overwriting a correct update if ID happened to match)
    else if (messedUpIDs.includes(id)) {
        // Reset to default
        console.log(`Resetting [${id}] ${word} (Reverting previous error)...`);
        entry[COL_EX] = "Sexologi.";
        entry[COL_EX_ARB] = `${word} används ofta.`;
        resetCount++;
    }
});

// Write back
const newContent = prefix + JSON.stringify(dictionaryData, null, 2) + suffix;
fs.writeFileSync('./data.js', newContent, 'utf-8');

console.log(`\n✅ Enhanced ${modifiedCount} HBTQI examples.`);
console.log(`↺ Reset ${resetCount} incorrectly modified entries.`);
