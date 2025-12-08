/**
 * دفعات 31-35: إضافة أمثلة للأفعال المتخصصة المتبقية
 */
const fs = require('fs');
const dataContent = fs.readFileSync('./data.js', 'utf-8');
let dictionaryData;
try {
    dictionaryData = JSON.parse(dataContent.replace('const dictionaryData = ', '').replace(/;$/, ''));
} catch (e) {
    const match = dataContent.match(/(?:const|var|let)\s+dictionaryData\s*=\s*(\[[\s\S]*?\]);/);
    dictionaryData = eval(match[1]);
}

const verbExamples = {
    // الأفعال ذات المعاني المتعددة والمتخصصة
    "Skräder": { exSwe: "Han skräder inte orden.", exArb: "لا يتردد في قول الحقيقة." },
    "Skubbar": { exSwe: "Hästen skubbar sig mot staketet.", exArb: "الحصان يحك نفسه بالسياج." },
    "Skuggar": { exSwe: "Träden skuggar trädgården.", exArb: "الأشجار تظلل الحديقة." },
    "Skumpar": { exSwe: "Han skumpar hem efter jobbet.", exArb: "يمشي متثاقلاً للبيت بعد العمل." },
    "Skvalar": { exSwe: "Regnet skvalar ner.", exArb: "المطر ينهمر بغزارة." },
    "Skymfar": { exSwe: "Han skymfar sina motståndare.", exArb: "يحقر خصومه." },
    "Skymmer": { exSwe: "Det skymmer tidigt på vintern.", exArb: "يحل الظلام مبكراً في الشتاء." },
    "Skållar": { exSwe: "Kocken skållar grönsakerna.", exArb: "الطاهي يسلق الخضروات." },
    "Skändar": { exSwe: "De skändar gravarna.", exArb: "ينتهكون حرمة المقابر." },
    "Slaskar": { exSwe: "Han slaskar ner golvet.", exArb: "يوسخ الأرض." },
    "Slumrar": { exSwe: "Hon slumrar i soffan.", exArb: "تغفو على الأريكة." },
    "Slöjdar": { exSwe: "Barnen slöjdar i skolan.", exArb: "الأطفال يعملون الأشغال اليدوية في المدرسة." },
    "Smiskar": { exSwe: "Han smiskar barnet.", exArb: "يضرب الطفل." },
    "Smäller": { exSwe: "Dörren smäller igen.", exArb: "الباب يغلق بقوة." },

    // أفعال إضافية من القائمة
    "Smörjar": { exSwe: "Han smörjar maskinen.", exArb: "يزيت الآلة." },
    "Sniffar": { exSwe: "Hunden sniffar runt.", exArb: "الكلب يشم في كل مكان." },
    "Snoppar": { exSwe: "Han snoppar grenarna.", exArb: "يقطع رؤوس الفروع." },
    "Snurrar": { exSwe: "Hjulet snurrar snabbt.", exArb: "العجلة تدور بسرعة." },
    "Snävar": { exSwe: "Han snävar på tröskeln.", exArb: "يتعثر على العتبة." },
    "Solar": { exSwe: "Hon solar vid poolen.", exArb: "تتمتع بالشمس عند المسبح." },
    "Somnar": { exSwe: "Barnet somnar snabbt.", exArb: "الطفل ينام بسرعة." },
    "Sotar": { exSwe: "Sotaren sotar skorstenen.", exArb: "منظف المداخن ينظف المدخنة." },
    "Sottar": { exSwe: "Katten sottar sig.", exArb: "القطة تتوسخ بالسخام." },
    "Sovrar": { exSwe: "Han sovrar informationen.", exArb: "يفرز المعلومات." },
    "Spedar": { exSwe: "Bonden spedar ut plantor.", exArb: "المزارع يفرق الشتلات." },
    "Spelar": { exSwe: "Han spelar fotboll.", exArb: "يلعب كرة القدم." },
    "Spickar": { exSwe: "Hon spickar köttet.", exArb: "تطعم اللحم بالتوابل." },
    "Spikar": { exSwe: "Han spikar brädan.", exArb: "يسمر اللوح." },
    "Spjärnar": { exSwe: "Han spjärnar emot.", exArb: "يقاوم بشدة." },
    "Sprider": { exSwe: "Vinden sprider fröna.", exArb: "الريح تنشر البذور." },
    "Sprittar": { exSwe: "Fisken sprittar i nätet.", exArb: "السمكة تتخبط في الشبكة." },
    "Spritter": { exSwe: "Gnistor spritter från elden.", exArb: "الشرر يتطاير من النار." },
    "Spräcker": { exSwe: "Isen spräcker stenarna.", exArb: "الجليد يشقق الحجارة." },
    "Spörjar": { exSwe: "Han spörjar efter nyheter.", exArb: "يستفسر عن الأخبار." },
    "Stagar": { exSwe: "De stagar upp hyllorna.", exArb: "يدعمون الأرفف." },
    "Stavar": { exSwe: "Barnet stavar ordet.", exArb: "الطفل يتهجى الكلمة." },
    "Stelnar": { exSwe: "Betongen stelnar.", exArb: "الخرسانة تتصلب." },
    "Sticker": { exSwe: "Biet sticker honom.", exArb: "النحلة تلسعه." },
    "Stiger": { exSwe: "Temperaturen stiger.", exArb: "درجة الحرارة ترتفع." },
    "Stillas": { exSwe: "Barnet stillas med nappen.", exArb: "الطفل يهدأ باللهاية." },
    "Stingar": { exSwe: "Myggan stingar.", exArb: "البعوضة تلسع." },
    "Stjälper": { exSwe: "De stjälper lasten.", exArb: "يفرغون الحمولة." },
    "Stolar": { exSwe: "Han stolar på sina vänner.", exArb: "يثق بأصدقائه." },
    "Stolpar": { exSwe: "Han stolpar in på kontoret.", exArb: "يدخل المكتب بتثاقل." },
    "Stolprar": { exSwe: "Han stolprar fram.", exArb: "يتقدم بخطوات متعثرة." },
    "Stoppar": { exSwe: "Hon stoppar strumporna.", exArb: "ترقع الجوارب." },
    "Stressar": { exSwe: "Deadline stressar honom.", exArb: "الموعد النهائي يوتره." },
    "Strömmar": { exSwe: "Vattnet strömmar fram.", exArb: "الماء يتدفق." },
    "Studsar": { exSwe: "Bollen studsar på marken.", exArb: "الكرة ترتد من الأرض." },
    "Stukar": { exSwe: "Han stukar foten.", exArb: "يلوي قدمه." },
    "Stular": { exSwe: "Tjuven stular pengar.", exArb: "اللص يسرق المال." },
    "Stumpar": { exSwe: "Han stumpar ut cigaretten.", exArb: "يطفئ السيجارة." },
    "Stundar": { exSwe: "Vintern stundar.", exArb: "الشتاء قادم." },
    "Stupar": { exSwe: "Soldaten stupar i strid.", exArb: "الجندي يسقط في المعركة." },
    "Styr": { exSwe: "Han styr båten.", exArb: "يقود القارب." },
    "Stånkar": { exSwe: "Han stånkar av ansträngning.", exArb: "يتأوه من الجهد." },
    "Stänker": { exSwe: "Bilar stänker vatten.", exArb: "السيارات ترش الماء." },
    "Stärker": { exSwe: "Träning stärker kroppen.", exArb: "التمرين يقوي الجسم." },
    "Stöder": { exSwe: "Hon stöder förslaget.", exArb: "تؤيد الاقتراح." },
    "Stönar": { exSwe: "Han stönar av smärta.", exArb: "يتأوه من الألم." },
    "Stöper": { exSwe: "De stöper ljus.", exArb: "يصبون الشموع." },
    "Stöter": { exSwe: "Han stöter på problem.", exArb: "يصادف مشاكل." },
    "Sullar": { exSwe: "Skomakaren sullar skorna.", exArb: "صانع الأحذية يضع النعل." },
    "Sumpar": { exSwe: "Han sumpar chansen.", exArb: "يضيع الفرصة." },
    "Supar": { exSwe: "Han supar för mycket.", exArb: "يشرب الكحول بكثرة." },
    "Svalkar": { exSwe: "Drickan svalkar.", exArb: "المشروب يبرد." },
    "Svalnar": { exSwe: "Maten svalnar.", exArb: "الطعام يبرد." },
    "Svampar": { exSwe: "De svampar i skogen.", exArb: "يجمعون الفطر في الغابة." },
    "Svarvar": { exSwe: "Han svarvar träet.", exArb: "يخرط الخشب." },
    "Svepar": { exSwe: "Han svepar in sig i filten.", exArb: "يلف نفسه بالبطانية." },
    "Svidder": { exSwe: "Såret svidder.", exArb: "الجرح يؤلم." },
    "Svikar": { exSwe: "Han svikar sina löften.", exArb: "يخلف وعوده." },
    "Svindlar": { exSwe: "Bedragaren svindlar folk.", exArb: "المحتال يغش الناس." },
    "Svirrar": { exSwe: "Flugan svirrar runt.", exArb: "الذبابة تدور حول." },
    "Svärmar": { exSwe: "Bin svärmar.", exArb: "النحل يتجمع." },
    "Svärtar": { exSwe: "Han svärtar ned motståndaren.", exArb: "يشوه سمعة خصمه." },
    "Syddar": { exSwe: "Hon syddar kläderna.", exArb: "تخيط الملابس." },
    "Syltar": { exSwe: "Mormor syltar jordgubbar.", exArb: "الجدة تصنع مربى الفراولة." },
    "Syntas": { exSwe: "Huset syntas bra från vägen.", exArb: "البيت يُرى جيداً من الطريق." },
    "Syrar": { exSwe: "Hon syrar äpplen.", exArb: "تخلل التفاح." },
    "Sysslar": { exSwe: "Han sysslar med datorer.", exArb: "يعمل في مجال الكمبيوتر." }
};

console.log('═══════════════════════════════════════════════════════════════');
console.log('     إضافة أمثلة للدفعة 31-35');
console.log('═══════════════════════════════════════════════════════════════\n');

let addedCount = 0, alreadyHasExample = 0, notFound = 0;
for (const [targetWord, example] of Object.entries(verbExamples)) {
    let found = false;
    for (let i = 0; i < dictionaryData.length; i++) {
        const entry = dictionaryData[i];
        if (entry[2] && entry[2].toLowerCase() === targetWord.toLowerCase() && entry[1] && entry[1].includes('Verb')) {
            found = true;
            if (entry[7] && entry[7].trim() !== '') { alreadyHasExample++; }
            else { dictionaryData[i][7] = example.exSwe; dictionaryData[i][8] = example.exArb; addedCount++; console.log(`✅ ${entry[2]}`); }
            break;
        }
    }
    if (!found) notFound++;
}
fs.writeFileSync('./data.js', 'const dictionaryData = ' + JSON.stringify(dictionaryData, null, 4) + ';');
console.log(`\n✅ المضافة: ${addedCount} | ⚠️ موجودة: ${alreadyHasExample} | ❌ غير موجودة: ${notFound}`);
