/**
 * Add examples - Batch 9 (Automated approach)
 * This script finds common verbs without examples and adds them
 */

const fs = require('fs');

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

// Examples to add for common verbs and nouns - format: { swedishWord: { swe, arb } }
const examplesByWord = {
    // === COMMON VERBS THAT NEED EXAMPLES ===
    "Kämpar": {
        exSwe: "Hon kämpar för sina rättigheter.",
        exArb: "تكافح من أجل حقوقها."
    },
    "Leker": {
        exSwe: "Barnen leker i parken.",
        exArb: "يلعب الأطفال في الحديقة."
    },
    "Litar på": {
        exSwe: "Jag litar på min bästa vän.",
        exArb: "أثق بصديقي المقرب."
    },
    "Lovar": {
        exSwe: "Jag lovar att komma i tid.",
        exArb: "أعد بأن آتي في الموعد."
    },
    "Lämnar": {
        exSwe: "Hon lämnar huset klockan sju.",
        exArb: "تغادر المنزل الساعة السابعة."
    },
    "Lär": {
        exSwe: "Han lär sig svenska varje dag.",
        exArb: "يتعلم السويدية كل يوم."
    },
    "Minns": {
        exSwe: "Jag minns inte hans namn.",
        exArb: "لا أتذكر اسمه."
    },
    "Märker": {
        exSwe: "Jag märkte att det regnade.",
        exArb: "لاحظت أنها تمطر."
    },
    "Njuter": {
        exSwe: "Vi njuter av solen idag.",
        exArb: "نستمتع بالشمس اليوم."
    },
    "Ändrar": {
        exSwe: "Han ändrar sina planer ofta.",
        exArb: "يغير خططه كثيراً."
    },
    "Önskar": {
        exSwe: "Jag önskar dig lycka till!",
        exArb: "أتمنى لك التوفيق!"
    },
    "Öppnar": {
        exSwe: "Affären öppnar klockan nio.",
        exArb: "يفتح المتجر الساعة التاسعة."
    },
    "Packar": {
        exSwe: "Vi packar väskorna inför resan.",
        exArb: "نحزم الحقائب استعداداً للسفر."
    },
    "Passar": {
        exSwe: "Den här skjortan passar dig perfekt.",
        exArb: "هذا القميص يناسبك تماماً."
    },
    "Planterar": {
        exSwe: "Hon planterar blommor i trädgården.",
        exArb: "تزرع الزهور في الحديقة."
    },
    "Presenterar": {
        exSwe: "Låt mig presentera min familj.",
        exArb: "دعني أقدم عائلتي."
    },
    "Pratar": {
        exSwe: "Vi pratar svenska hemma.",
        exArb: "نتحدث السويدية في البيت."
    },
    "Rakar": {
        exSwe: "Han rakar sig varje morgon.",
        exArb: "يحلق ذقنه كل صباح."
    },
    "Regnar": {
        exSwe: "Det regnar ute, ta med paraply.",
        exArb: "إنها تمطر في الخارج، خذ مظلة."
    },
    "Repar sig": {
        exSwe: "Hon repar sig efter sjukdomen.",
        exArb: "تتعافى من المرض."
    },
    "Rider": {
        exSwe: "Min dotter rider på en häst.",
        exArb: "ابنتي تركب حصاناً."
    },
    "Ringer": {
        exSwe: "Jag ringer dig senare ikväll.",
        exArb: "سأتصل بك لاحقاً الليلة."
    },
    "Rodnar": {
        exSwe: "Han rodnar när han är generad.",
        exArb: "يحمر خجلاً عندما يشعر بالإحراج."
    },
    "Ropar": {
        exSwe: "Barnen ropar högt i lekparken.",
        exArb: "يصرخ الأطفال بصوت عالٍ في الملعب."
    },
    "Rör sig": {
        exSwe: "Katten rör sig tyst genom rummet.",
        exArb: "تتحرك القطة بهدوء عبر الغرفة."
    },
    "Saknar": {
        exSwe: "Jag saknar min familj så mycket.",
        exArb: "أفتقد عائلتي كثيراً."
    },
    "Samlar": {
        exSwe: "Han samlar frimärken som hobby.",
        exArb: "يجمع الطوابع كهواية."
    },
    "Sjunker": {
        exSwe: "Båten sjunker långsamt i havet.",
        exArb: "يغرق القارب ببطء في البحر."
    },
    "Skickar": {
        exSwe: "Jag skickar ett paket till min mamma.",
        exArb: "أرسل طرداً إلى أمي."
    },
    "Skiljer sig": {
        exSwe: "De skiljer sig efter tio års äktenskap.",
        exArb: "يتطلقان بعد عشر سنوات زواج."
    },
    "Skiner": {
        exSwe: "Solen skiner idag.",
        exArb: "تشرق الشمس اليوم."
    },
    "Skrattar": {
        exSwe: "Alla skrattar åt hans skämt.",
        exArb: "الجميع يضحكون على نكتته."
    },
    "Slänger": {
        exSwe: "Jag slänger sopor varje dag.",
        exArb: "أرمي القمامة كل يوم."
    },
    "Slutar": {
        exSwe: "Skolan slutar klockan tre.",
        exArb: "تنتهي المدرسة الساعة الثالثة."
    },
    "Smakar": {
        exSwe: "Maten smakar utmärkt!",
        exArb: "الطعام لذيذ جداً!"
    },
    "Snöar": {
        exSwe: "Det snöar ute, det är kallt.",
        exArb: "تتساقط الثلوج في الخارج، الجو بارد."
    },
    "Sparar": {
        exSwe: "Jag sparar pengar för en resa.",
        exArb: "أدخر المال لرحلة."
    },
    "Spelar": {
        exSwe: "Barnen spelar fotboll på skolgården.",
        exArb: "يلعب الأطفال كرة القدم في فناء المدرسة."
    },
    "Springer": {
        exSwe: "Han springer fem kilometer varje dag.",
        exArb: "يركض خمسة كيلومترات كل يوم."
    },
    "Skriker": {
        exSwe: "Bebisen skriker på natten.",
        exArb: "يصرخ الطفل في الليل."
    },
    "Skriver": {
        exSwe: "Hon skriver ett brev till sin vän.",
        exArb: "تكتب رسالة إلى صديقتها."
    },
    "Smälter": {
        exSwe: "Snön smälter när våren kommer.",
        exArb: "يذوب الثلج عندما يأتي الربيع."
    },
    "Stänger": {
        exSwe: "Butiken stänger klockan sex.",
        exArb: "يغلق المتجر الساعة السادسة."
    },
    "Städar": {
        exSwe: "Jag städar hemma varje lördag.",
        exArb: "أنظف البيت كل سبت."
    },
    "Svettas": {
        exSwe: "Han svettas mycket när han tränar.",
        exArb: "يتعرق كثيراً عندما يتدرب."
    },
    "Sväljer": {
        exSwe: "Hon sväljer tabletten med vatten.",
        exArb: "تبتلع الحبة مع الماء."
    },
    "Svarar": {
        exSwe: "Han svarar alltid på mina frågor.",
        exArb: "يجيب دائماً على أسئلتي."
    },
    "Tar emot": {
        exSwe: "Vi tar emot gäster ikväll.",
        exArb: "نستقبل ضيوفاً الليلة."
    },
    "Talar": {
        exSwe: "Han talar tre språk flytande.",
        exArb: "يتحدث ثلاث لغات بطلاقة."
    },
    "Tappar": {
        exSwe: "Jag tappade min telefon på golvet.",
        exArb: "أسقطت هاتفي على الأرض."
    },
    "Torkar": {
        exSwe: "Hon torkar disken efter middagen.",
        exArb: "تجفف الأطباق بعد العشاء."
    },
    "Tvekar": {
        exSwe: "Han tvekar inte att hjälpa sina vänner.",
        exArb: "لا يتردد في مساعدة أصدقائه."
    },
    "Tvingar": {
        exSwe: "Ingen tvingar dig att göra det.",
        exArb: "لا أحد يجبرك على فعل ذلك."
    },
    "Tycker": {
        exSwe: "Jag tycker att filmen var bra.",
        exArb: "أعتقد أن الفيلم كان جيداً."
    },
    "Tänker": {
        exSwe: "Jag tänker på dig varje dag.",
        exArb: "أفكر فيك كل يوم."
    },
    "Undrar": {
        exSwe: "Jag undrar vad klockan är.",
        exArb: "أتساءل كم الساعة."
    },
    "Upplevde": {
        exSwe: "Vi upplevde en fantastisk resa.",
        exArb: "عشنا رحلة رائعة."
    },
    "Väcker": {
        exSwe: "Jag väcker barnen klockan sju.",
        exArb: "أوقظ الأطفال الساعة السابعة."
    },
    "Vänder sig": {
        exSwe: "Hon vände sig om och tittade på mig.",
        exArb: "التفتت ونظرت إليّ."
    },
    "Växer": {
        exSwe: "Barnen växer så snabbt.",
        exArb: "ينمو الأطفال بسرعة."
    },
    "Åker": {
        exSwe: "Vi åker till stranden i sommar.",
        exArb: "سنذهب إلى الشاطئ في الصيف."
    },
    "Älskar": {
        exSwe: "Jag älskar min familj.",
        exArb: "أحب عائلتي."
    },
    "Ärver": {
        exSwe: "Han ärver huset efter sin farfar.",
        exArb: "يرث المنزل من جده."
    },
    "Översätter": {
        exSwe: "Hon översätter texter från svenska till arabiska.",
        exArb: "تترجم النصوص من السويدية إلى العربية."
    }
};

let changesCount = 0;
let alreadyHasExample = 0;
let notFound = 0;

for (const [sweWord, example] of Object.entries(examplesByWord)) {
    let found = false;
    for (let i = 0; i < dictionaryData.length; i++) {
        // Check if the Swedish word matches (index 2) and it's a verb (index 1)
        if (dictionaryData[i][2] === sweWord && dictionaryData[i][1] && dictionaryData[i][1].includes('Verb')) {
            found = true;
            if (dictionaryData[i][7] && dictionaryData[i][7].trim() !== '') {
                console.log(`⚠️  ${sweWord} already has example, skipping`);
                alreadyHasExample++;
            } else {
                dictionaryData[i][7] = example.exSwe;
                dictionaryData[i][8] = example.exArb;
                changesCount++;
                console.log(`✓ ${sweWord} - ${dictionaryData[i][3]}`);
            }
            break; // Only add to first matching entry
        }
    }
    if (!found) {
        console.log(`❌ Not found: ${sweWord}`);
        notFound++;
    }
}

const newDataStr = 'const dictionaryData = ' + JSON.stringify(dictionaryData, null, 4) + ';';
fs.writeFileSync('./data.js', newDataStr);

console.log(`\n========================================`);
console.log(`✅ Examples added: ${changesCount}`);
console.log(`⚠️  Already had examples: ${alreadyHasExample}`);
console.log(`❌ Not found: ${notFound}`);
console.log(`📊 Total in batch 9: ${Object.keys(examplesByWord).length}`);
console.log(`📊 CUMULATIVE TOTAL: 426 + ${changesCount} = ${426 + changesCount} examples`);
console.log(`========================================`);
