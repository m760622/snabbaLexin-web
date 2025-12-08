/**
 * إضافة أمثلة للدفعة الرابعة من الأفعال الشائعة بدون أمثلة
 * Add examples for fourth batch of common verbs without examples
 */

const fs = require('fs');

// Load and parse dictionary
const dataContent = fs.readFileSync('./data.js', 'utf-8');
let dictionaryData;
try {
    dictionaryData = JSON.parse(dataContent.replace('const dictionaryData = ', '').replace(/;$/, ''));
} catch (e) {
    const match = dataContent.match(/(?:const|var|let)\s+dictionaryData\s*=\s*(\[[\s\S]*?\]);/);
    dictionaryData = eval(match[1]);
}

// أمثلة للدفعة الرابعة من الأفعال
const verbExamples = {
    // === الأفعال 1-25 ===
    "Lismar": {
        exSwe: "Han lismar för chefen.",
        exArb: "يتملق المدير."
    },
    "Ljuger": {
        exSwe: "Han ljuger för sina föräldrar.",
        exArb: "يكذب على والديه."
    },
    "Lotsar": {
        exSwe: "Kapten lotsar fartyget genom hamnen.",
        exArb: "القبطان يرشد السفينة عبر الميناء."
    },
    "Lottar": {
        exSwe: "De lottar ut priser på festen.",
        exArb: "يسحبون قرعة الجوائز في الحفلة."
    },
    "Lufsar": {
        exSwe: "Han lufsar hem efter festen.",
        exArb: "يمشي متثاقلاً إلى البيت بعد الحفلة."
    },
    "Luggar": {
        exSwe: "Systern luggar sin bror.",
        exArb: "الأخت تشد شعر أخيها."
    },
    "Lunkar": {
        exSwe: "De lunkar fram på stigen.",
        exArb: "يسيرون ببطء على الطريق."
    },
    "Lussar": {
        exSwe: "Barnen lussar på morgonen.",
        exArb: "الأطفال يحتفلون بعيد لوسيا في الصباح."
    },
    "Läspar": {
        exSwe: "Barnet läspar lite.",
        exArb: "الطفل يلثغ قليلاً."
    },
    "Magrar": {
        exSwe: "Han magrar efter dieten.",
        exArb: "ينحف بعد الحمية."
    },
    "Maskar": {
        exSwe: "Sluta maska och börja jobba!",
        exArb: "توقف عن التلكؤ وابدأ العمل!"
    },
    "Medlar": {
        exSwe: "FN medlar i konflikten.",
        exArb: "الأمم المتحدة تتوسط في النزاع."
    },
    "Mognar": {
        exSwe: "Äpplen mognar på hösten.",
        exArb: "التفاح ينضج في الخريف."
    },
    "Mojnar": {
        exSwe: "Vinden mojnar mot kvällen.",
        exArb: "الريح تهدأ في المساء."
    },
    "Myglar": {
        exSwe: "Han myglar med skatten.",
        exArb: "يتحايل على الضرائب."
    },
    "Myntar": {
        exSwe: "Centralbanken myntar nya mynt.",
        exArb: "البنك المركزي يصك عملات جديدة."
    },
    "Möglar": {
        exSwe: "Brödet möglar efter en vecka.",
        exArb: "الخبز يتعفن بعد أسبوع."
    },
    "Nallar": {
        exSwe: "Barnet nallar godis från skåpet.",
        exArb: "الطفل يسرق الحلوى من الخزانة."
    },
    "Namnar": {
        exSwe: "Hon namnar alla mapparna.",
        exArb: "تضع أسماء على كل الملفات."
    },
    "Nattar": {
        exSwe: "Mamma nattar barnen klockan åtta.",
        exArb: "الأم تنوم الأطفال الساعة الثامنة."
    },
    "Nojsar": {
        exSwe: "Killarna nojsar med varandra.",
        exArb: "الأولاد يمزحون مع بعض."
    },
    "Norpar": {
        exSwe: "Tjuven norpar plånböcker.",
        exArb: "اللص يسرق المحافظ."
    },
    "Nuddar": {
        exSwe: "Hon nuddar vid hans hand.",
        exArb: "تلمس يده."
    },
    "Nynnar": {
        exSwe: "Hon nynnar på en melodi.",
        exArb: "تدندن لحناً."
    },
    "Ockrar": {
        exSwe: "Långivaren ockrar på de fattiga.",
        exArb: "المقرض يأخذ فوائد ربوية من الفقراء."
    },

    // === الأفعال 26-50 ===
    "Pangar": {
        exSwe: "Han pangar bollen in i mål.",
        exArb: "يضرب الكرة بقوة في المرمى."
    },
    "Pinkar": {
        exSwe: "Hunden pinkar på stolpen.",
        exArb: "الكلب يتبول على العمود."
    },
    "Pippar": {
        exSwe: "Kycklingarna pippar.",
        exArb: "الصيصان تصوصو."
    },
    "Pissar": {
        exSwe: "Hunden pissar ute i trädgården.",
        exArb: "الكلب يتبول في الحديقة."
    },
    "Plåtar": {
        exSwe: "Fotografen plåtar bröllopet.",
        exArb: "المصور يصور حفل الزفاف."
    },
    "Plöjer": {
        exSwe: "Bonden plöjer åkern på våren.",
        exArb: "المزارع يحرث الحقل في الربيع."
    },
    "Prejar": {
        exSwe: "Polisen prejar bilen.",
        exArb: "الشرطة توقف السيارة."
    },
    "Prålar": {
        exSwe: "Hon prålar med sina smycken.",
        exArb: "تتباهى بمجوهراتها."
    },
    "Pulsar": {
        exSwe: "Pensionären pulsar hem med maten.",
        exArb: "المتقاعد يمشي متمهلاً إلى البيت بالطعام."
    },
    "Pussar": {
        exSwe: "Mamma pussar barnet godnatt.",
        exArb: "الأم تقبل الطفل ليلة سعيدة."
    },
    "Raggar": {
        exSwe: "Killarna raggar tjejer på festen.",
        exArb: "الشباب يلاحقون الفتيات في الحفلة."
    },
    "Raglar": {
        exSwe: "Han raglar hem efter festen.",
        exArb: "يترنح إلى البيت بعد الحفلة."
    },
    "Rammar": {
        exSwe: "Lastbilen rammar in i väggen.",
        exArb: "الشاحنة تصدم الجدار."
    },
    "Rappar": {
        exSwe: "Muraren rappar väggen.",
        exArb: "عامل البناء يملط الجدار."
    },
    "Rattar": {
        exSwe: "Hon rattar bilen skickligt.",
        exArb: "تقود السيارة بمهارة."
    },
    "Rimmar": {
        exSwe: "Hon rimmar laxen över natten.",
        exArb: "تملح السلمون طوال الليل."
    },
    "Rispar": {
        exSwe: "Katten rispar möblerna.",
        exArb: "القطة تخدش الأثاث."
    },
    "Roffar": {
        exSwe: "Han roffar åt sig allt.",
        exArb: "يستحوذ على كل شيء بجشع."
    },
    "Ruggar": {
        exSwe: "Fågeln ruggar på hösten.",
        exArb: "الطائر يبدل ريشه في الخريف."
    },
    "Rådgör": {
        exSwe: "Han rådgör med sin advokat.",
        exArb: "يتشاور مع محاميه."
    },
    "Räfsar": {
        exSwe: "Hon räfsar löven i trädgården.",
        exArb: "تجمع الأوراق في الحديقة."
    },
    "Sabbar": {
        exSwe: "Han sabbar allt han rör vid.",
        exArb: "يخرب كل شيء يلمسه."
    },
    "Sadlar": {
        exSwe: "Hon sadlar hästen innan ritten.",
        exArb: "تسرج الحصان قبل الركوب."
    },
    "Segnar": {
        exSwe: "Han segnar ner av trötthet.",
        exArb: "يسقط أرضاً من التعب."
    },
    "Segrar": {
        exSwe: "Laget segrar i finalen.",
        exArb: "الفريق ينتصر في النهائي."
    },

    // === الأفعال 51-75 ===
    "Simmar": {
        exSwe: "Barnen simmar i poolen.",
        exArb: "الأطفال يسبحون في المسبح."
    },
    "Singlar": {
        exSwe: "Han singlar slant för att bestämma.",
        exArb: "يقلب العملة ليقرر."
    },
    "Sjunger": {
        exSwe: "Hon sjunger vackert.",
        exArb: "تغني بجمال."
    },
    "Sjunker": {
        exSwe: "Båten sjunker långsamt.",
        exArb: "القارب يغرق ببطء."
    },
    "Skattar": {
        exSwe: "Alla skattar på sina inkomster.",
        exArb: "الجميع يدفع ضرائب على دخلهم."
    },
    "Skidar": {
        exSwe: "Vi skidar i fjällen.",
        exArb: "نتزلج في الجبال."
    },
    "Skiner": {
        exSwe: "Solen skiner idag.",
        exArb: "الشمس تشرق اليوم."
    },
    "Skittar": {
        exSwe: "Hunden skittar på gräsmattan.",
        exArb: "الكلب يتغوط على العشب."
    },
    "Skjuter": {
        exSwe: "Jägaren skjuter viltet.",
        exArb: "الصياد يطلق النار على الطريدة."
    },
    "Skottar": {
        exSwe: "Han skottar snö framför huset.",
        exArb: "يجرف الثلج أمام البيت."
    },
    "Skriker": {
        exSwe: "Bebisen skriker på natten.",
        exArb: "الرضيع يصرخ في الليل."
    },
    "Skruvar": {
        exSwe: "Han skruvar fast hyllan.",
        exArb: "يثبت الرف بالمسامير."
    },
    "Skryter": {
        exSwe: "Han skryter om sin nya bil.",
        exArb: "يتفاخر بسيارته الجديدة."
    },
    "Skräpar": {
        exSwe: "Sluta skräpa ner i naturen!",
        exArb: "توقف عن رمي القمامة في الطبيعة!"
    },
    "Skuldar": {
        exSwe: "Han skuldar mig pengar.",
        exArb: "هو مدين لي بالمال."
    },
    "Skuttar": {
        exSwe: "Barnen skuttar glatt.",
        exArb: "الأطفال يقفزون بسعادة."
    },
    "Skyller": {
        exSwe: "Han skyller på sin bror.",
        exArb: "يلقي اللوم على أخيه."
    },
    "Skyndar": {
        exSwe: "Hon skyndar till mötet.",
        exArb: "تسرع إلى الاجتماع."
    },
    "Skådar": {
        exSwe: "Vi skådar fåglar i parken.",
        exArb: "نراقب الطيور في الحديقة."
    },
    "Skäller": {
        exSwe: "Hunden skäller på främlingar.",
        exArb: "الكلب ينبح على الغرباء."
    },
    "Skänker": {
        exSwe: "Hon skänker pengar till välgörenhet.",
        exArb: "تتبرع بالمال للجمعيات الخيرية."
    },
    "Skärper": {
        exSwe: "Han skärper kniven.",
        exArb: "يسن السكين."
    },
    "Sladdar": {
        exSwe: "Bilen sladdar på isen.",
        exArb: "السيارة تنزلق على الجليد."
    },
    "Slaktar": {
        exSwe: "Bonden slaktar grisen.",
        exArb: "المزارع يذبح الخنزير."
    },
    "Slamrar": {
        exSwe: "Tallrikarna slamrar i diskhon.",
        exArb: "الصحون ترن في المجلى."
    },

    // === الأفعال 76-100 ===
    "Slankar": {
        exSwe: "Hon slankar sig inför sommaren.",
        exArb: "تتبع حمية قبل الصيف."
    },
    "Slarvar": {
        exSwe: "Han slarvar med läxorna.",
        exArb: "يهمل في واجباته."
    },
    "Slickar": {
        exSwe: "Hunden slickar sin ägare.",
        exArb: "الكلب يلعق صاحبه."
    },
    "Slinter": {
        exSwe: "Foten slinter på isen.",
        exArb: "القدم تنزلق على الجليد."
    },
    "Sliter": {
        exSwe: "Han sliter hårt på jobbet.",
        exArb: "يكدح بجد في العمل."
    },
    "Slipper": {
        exSwe: "Jag slipper jobba imorgon.",
        exArb: "لست مضطراً للعمل غداً."
    },
    "Slår": {
        exSwe: "Han slår spikar med hammaren.",
        exArb: "يضرب المسامير بالمطرقة."
    },
    "Smeker": {
        exSwe: "Hon smeker katten.",
        exArb: "تلاطف القطة."
    },
    "Smelar": {
        exSwe: "Smör smelar i värmen.",
        exArb: "الزبدة تذوب في الحرارة."
    },
    "Smider": {
        exSwe: "Smeden smider järn.",
        exArb: "الحداد يطرق الحديد."
    },
    "Smiter": {
        exSwe: "Tjuven smiter från platsen.",
        exArb: "اللص يهرب من المكان."
    },
    "Smular": {
        exSwe: "Kakan smular lätt.",
        exArb: "الكعكة تتفتت بسهولة."
    },
    "Smyger": {
        exSwe: "Katten smyger sig fram.",
        exArb: "القطة تتسلل."
    },
    "Smälter": {
        exSwe: "Snön smälter på våren.",
        exArb: "الثلج يذوب في الربيع."
    },
    "Snokar": {
        exSwe: "Han snokar i andras saker.",
        exArb: "يتلصص على أغراض الآخرين."
    },
    "Snorkar": {
        exSwe: "Han snorkar högt på natten.",
        exArb: "يشخر بصوت عالٍ في الليل."
    },
    "Snorar": {
        exSwe: "Bebisen snorar när hon är förkyld.",
        exArb: "أنف الرضيعة يسيل عندما تكون مصابة بالزكام."
    },
    "Snytar": {
        exSwe: "Han snytar sig i en näsduk.",
        exArb: "ينفث أنفه في منديل."
    },
    "Snålar": {
        exSwe: "Han snålar med pengarna.",
        exArb: "يبخل بالمال."
    },
    "Sockrar": {
        exSwe: "Hon sockrar kaffet.",
        exArb: "تضع السكر في القهوة."
    },
    "Sopar": {
        exSwe: "Han sopar golvet.",
        exArb: "يكنس الأرض."
    },
    "Sorlar": {
        exSwe: "Bäcken sorlar mellan stenarna.",
        exArb: "الجدول يخرخر بين الحجارة."
    },
    "Sorrar": {
        exSwe: "Insekterna sorrar runt lampan.",
        exArb: "الحشرات تطن حول المصباح."
    },
    "Sparar": {
        exSwe: "Hon sparar pengar varje månad.",
        exArb: "توفر المال كل شهر."
    },
    "Sparkar": {
        exSwe: "Han sparkar bollen.",
        exArb: "يركل الكرة."
    }
};

console.log('═══════════════════════════════════════════════════════════════');
console.log('     إضافة أمثلة للدفعة الرابعة من الأفعال');
console.log('     ADD EXAMPLES FOR FOURTH BATCH OF VERBS');
console.log('═══════════════════════════════════════════════════════════════\n');

let addedCount = 0;
let alreadyHasExample = 0;
let notFound = 0;
const notFoundList = [];

for (const [targetWord, example] of Object.entries(verbExamples)) {
    let found = false;

    for (let i = 0; i < dictionaryData.length; i++) {
        const entry = dictionaryData[i];
        const entryWord = entry[2];
        const entryType = entry[1];

        const wordMatch = entryWord && entryWord.toLowerCase() === targetWord.toLowerCase();
        const isVerb = entryType && entryType.includes('Verb');

        if (wordMatch && isVerb) {
            found = true;

            if (entry[7] && entry[7].trim() !== '') {
                alreadyHasExample++;
                console.log(`⚠️  ${entryWord} - لديه مثال بالفعل`);
            } else {
                dictionaryData[i][7] = example.exSwe;
                dictionaryData[i][8] = example.exArb;
                addedCount++;
                console.log(`✅ ${entryWord} - تمت إضافة المثال`);
            }
            break;
        }
    }

    if (!found) {
        console.log(`❌ لم يُعثر على: ${targetWord}`);
        notFoundList.push(targetWord);
        notFound++;
    }
}

// Save updated data
const newDataStr = 'const dictionaryData = ' + JSON.stringify(dictionaryData, null, 4) + ';';
fs.writeFileSync('./data.js', newDataStr);

console.log('\n═══════════════════════════════════════════════════════════════');
console.log(`✅ الأمثلة المضافة: ${addedCount}`);
console.log(`⚠️  لديها أمثلة مسبقاً: ${alreadyHasExample}`);
console.log(`❌ لم يُعثر عليها: ${notFound}`);
console.log(`📊 المجموع: ${Object.keys(verbExamples).length}`);
console.log('═══════════════════════════════════════════════════════════════');
