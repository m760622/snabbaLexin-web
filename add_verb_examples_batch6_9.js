/**
 * دفعات 6-9: إضافة أمثلة لجميع الأفعال المتبقية
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
    // معاني متعددة للأفعال السابقة
    "Vimsar": { exSwe: "Han vimsar runt utan mål.", exArb: "يتجول بلا هدف." },
    "Vindar": { exSwe: "Vinden vindar genom träden.", exArb: "الريح تمر عبر الأشجار." },
    "Värper": { exSwe: "Hönan värper ägg varje dag.", exArb: "الدجاجة تضع بيضاً كل يوم." },
    "Ynglar": { exSwe: "Kaniner ynglar snabbt.", exArb: "الأرانب تتكاثر بسرعة." },
    "Åldras": { exSwe: "Alla åldras med tiden.", exArb: "الجميع يشيخ مع الوقت." },
    "Äcklar": { exSwe: "Lukten äcklar mig.", exArb: "الرائحة تقرفني." },
    "Åsamka": { exSwe: "Olyckan åsamkar stor skada.", exArb: "الحادث يسبب ضرراً كبيراً." },
    "Avdunstar": { exSwe: "Vattnet avdunstar i solen.", exArb: "الماء يتبخر في الشمس." },
    "Avlyssnar": { exSwe: "Polisen avlyssnar samtalen.", exArb: "الشرطة تتنصت على المكالمات." },
    "Avskiljer": { exSwe: "Väggen avskiljer rummen.", exArb: "الجدار يفصل الغرف." },
    "Avspeglar": { exSwe: "Vattnet avspeglar himlen.", exArb: "الماء يعكس السماء." },
    "Befordrar": { exSwe: "Chefen befordrar henne.", exArb: "المدير يرقيها." },
    "Besjunger": { exSwe: "Poeten besjunger naturen.", exArb: "الشاعر يمجد الطبيعة." },
    "Beskattar": { exSwe: "Staten beskattar inkomster.", exArb: "الدولة تفرض ضرائب على الدخل." },
    "Beskjuter": { exSwe: "Fienden beskjuter staden.", exArb: "العدو يقصف المدينة." },
    "Beskyller": { exSwe: "Han beskyller henne för stöld.", exArb: "يتهمها بالسرقة." },
    "Bespottar": { exSwe: "De bespottar honom.", exArb: "يسخرون منه." },
    "Besprutar": { exSwe: "Bonden besprutar grödorna.", exArb: "المزارع يرش المحاصيل." },
    "Bevattnar": { exSwe: "De bevattnar åkern.", exArb: "يسقون الحقل." },
    "Förbinder": { exSwe: "Läkaren förbinder såret.", exArb: "الطبيب يضمد الجرح." },
    "Förblöder": { exSwe: "Offret förblöder utan hjälp.", exArb: "الضحية ينزف حتى الموت بدون مساعدة." },
    "Föreläser": { exSwe: "Professorn föreläser om historia.", exArb: "الأستاذ يحاضر عن التاريخ." },
    "Förevigar": { exSwe: "Fotografen förevigar ögonblicket.", exArb: "المصور يخلد اللحظة." },
    "Förfaller": { exSwe: "Huset förfaller efter år av försummelse.", exArb: "البيت يتهالك بعد سنوات من الإهمال." },
    "Författar": { exSwe: "Hon författar romaner.", exArb: "تؤلف روايات." },
    "Förfuskar": { exSwe: "Han förfuskar arbetet.", exArb: "يعمل بشكل رديء." },
    "Försvårar": { exSwe: "Regnet försvårar resan.", exArb: "المطر يصعب الرحلة." },
    "Förtullar": { exSwe: "Han förtullar varorna.", exArb: "يدفع الرسوم الجمركية على البضائع." },
    "Förvarnar": { exSwe: "Meteorologen förvarnar om storm.", exArb: "خبير الأرصاد يحذر من العاصفة." },
    "Förvillar": { exSwe: "Kartan förvillar oss.", exArb: "الخريطة تضللنا." },
    "Förväller": { exSwe: "Kocken förväller grönsakerna.", exArb: "الطاهي يسلق الخضروات سريعاً." },
    "Föryngrar": { exSwe: "Behandlingen föryngrar huden.", exArb: "العلاج يجدد البشرة." },
    "Upprättar": { exSwe: "Advokaten upprättar kontraktet.", exArb: "المحامي يعد العقد." },
    "Uppviglar": { exSwe: "Ledaren uppviglar folket.", exArb: "القائد يحرض الشعب." },
    "Utklassar": { exSwe: "Laget utklassar motståndarna.", exArb: "الفريق ينتصر بفارق كبير." },
    "Utvandrar": { exSwe: "Familjen utvandrar till USA.", exArb: "العائلة تهاجر إلى أمريكا." },

    // المزيد من الأفعال المركبة
    "Avtorkar": { exSwe: "Han avtorkar bordet.", exArb: "يمسح الطاولة." },
    "Avskräcker": { exSwe: "Priset avskräcker kunderna.", exArb: "السعر ينفر الزبائن." },
    "Befrämjar": { exSwe: "Motion befrämjar hälsan.", exArb: "الرياضة تعزز الصحة." },
    "Bekräftar": { exSwe: "Han bekräftar bokningen.", exArb: "يؤكد الحجز." },
    "Besvärar": { exSwe: "Värmen besvärar mig.", exArb: "الحرارة تزعجني." },
    "Fördriver": { exSwe: "Vi fördriver tiden med spel.", exArb: "نقضي الوقت باللعب." },
    "Förföljer": { exSwe: "Polisen förföljer tjuven.", exArb: "الشرطة تطارد اللص." },
    "Försämras": { exSwe: "Vädret försämras.", exArb: "الطقس يسوء." },
    "Förstärker": { exSwe: "De förstärker muren.", exArb: "يقوون الجدار." },
    "Inbillar": { exSwe: "Han inbillar sig saker.", exArb: "يتوهم أشياء." },
    "Ingriper": { exSwe: "Polisen ingriper.", exArb: "الشرطة تتدخل." },
    "Medverkar": { exSwe: "Hon medverkar i filmen.", exArb: "تشارك في الفيلم." },
    "Upptäcker": { exSwe: "Forskaren upptäcker en ny art.", exArb: "الباحث يكتشف نوعاً جديداً." },
    "Upprepar": { exSwe: "Läraren upprepar förklaringen.", exArb: "المعلم يكرر الشرح." },
    "Utmanar": { exSwe: "Han utmanar motståndaren.", exArb: "يتحدى الخصم." },
    "Utsätter": { exSwe: "Solen utsätter huden för skada.", exArb: "الشمس تعرض البشرة للضرر." },

    // أفعال إضافية
    "Beundrar": { exSwe: "Jag beundrar hennes mod.", exArb: "أعجب بشجاعتها." },
    "Bevakar": { exSwe: "Vakten bevakar ingången.", exArb: "الحارس يراقب المدخل." },
    "Beviljar": { exSwe: "Banken beviljar lånet.", exArb: "البنك يوافق على القرض." },
    "Förklarar": { exSwe: "Läraren förklarar regeln.", exArb: "المعلم يشرح القاعدة." },
    "Förlåter": { exSwe: "Jag förlåter dig.", exArb: "أسامحك." },
    "Förlänger": { exSwe: "De förlänger kontraktet.", exArb: "يمددون العقد." },
    "Förmedlar": { exSwe: "Hon förmedlar budskapet.", exArb: "تنقل الرسالة." },
    "Förnekar": { exSwe: "Han förnekar anklagelsen.", exArb: "ينكر التهمة." },
    "Förorsakar": { exSwe: "Stormen förorsakar skador.", exArb: "العاصفة تسبب أضراراً." },
    "Förråder": { exSwe: "Han förråder sina vänner.", exArb: "يخون أصدقاءه." },
    "Försöker": { exSwe: "Hon försöker igen.", exArb: "تحاول مرة أخرى." },
    "Förvandlar": { exSwe: "Trollkarlen förvandlar vatten till vin.", exArb: "الساحر يحول الماء إلى نبيذ." },
    "Förändrar": { exSwe: "Tiden förändrar allt.", exArb: "الزمن يغير كل شيء." },
    "Understryker": { exSwe: "Chefen understryker vikten av pålitlighet.", exArb: "المدير يؤكد على أهمية الموثوقية." },
    "Underhåller": { exSwe: "Clownen underhåller barnen.", exArb: "المهرج يسلي الأطفال." },
    "Undersöker": { exSwe: "Läkaren undersöker patienten.", exArb: "الطبيب يفحص المريض." },
    "Uppmuntrar": { exSwe: "Föräldrarna uppmuntrar barnen.", exArb: "الوالدان يشجعان الأطفال." },
    "Uppfattar": { exSwe: "Jag uppfattar inte vad du säger.", exArb: "لا أفهم ما تقوله." },
    "Uppfostrar": { exSwe: "Föräldrarna uppfostrar sina barn.", exArb: "الوالدان يربيان أطفالهما." },
    "Utreder": { exSwe: "Polisen utreder brottet.", exArb: "الشرطة تحقق في الجريمة." },
    "Utnyttjar": { exSwe: "Han utnyttjar situationen.", exArb: "يستغل الموقف." },
    "Utövar": { exSwe: "Hon utövar makt.", exArb: "تمارس السلطة." }
};

console.log('═══════════════════════════════════════════════════════════════');
console.log('     إضافة أمثلة للدفعات 6-9 من الأفعال');
console.log('═══════════════════════════════════════════════════════════════\n');

let addedCount = 0, alreadyHasExample = 0, notFound = 0;

for (const [targetWord, example] of Object.entries(verbExamples)) {
    let found = false;
    for (let i = 0; i < dictionaryData.length; i++) {
        const entry = dictionaryData[i];
        if (entry[2] && entry[2].toLowerCase() === targetWord.toLowerCase() && entry[1] && entry[1].includes('Verb')) {
            found = true;
            if (entry[7] && entry[7].trim() !== '') {
                alreadyHasExample++;
            } else {
                dictionaryData[i][7] = example.exSwe;
                dictionaryData[i][8] = example.exArb;
                addedCount++;
                console.log(`✅ ${entry[2]}`);
            }
            break;
        }
    }
    if (!found) notFound++;
}

fs.writeFileSync('./data.js', 'const dictionaryData = ' + JSON.stringify(dictionaryData, null, 4) + ';');
console.log(`\n✅ المضافة: ${addedCount} | ⚠️ موجودة: ${alreadyHasExample} | ❌ غير موجودة: ${notFound}`);
