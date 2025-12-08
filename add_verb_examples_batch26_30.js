/**
 * دفعات 26-30: إضافة أمثلة للأفعال المتبقية (T-Z)
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
    // T-verbs
    "Taggar": { exSwe: "Hon taggar bilden på Instagram.", exArb: "تضع علامة على الصورة في انستغرام." },
    "Taipar": { exSwe: "Han taipar snabbt på tangentbordet.", exArb: "يكتب بسرعة على لوحة المفاتيح." },
    "Tallar": { exSwe: "Det tallar ut sig.", exArb: "الأمور تستقر." },
    "Tankar": { exSwe: "Han tankar bilen.", exArb: "يملأ وقود السيارة." },
    "Tastsar": { exSwe: "Katten tastsar fram.", exArb: "القطة تمشي بخفة." },
    "Tejpar": { exSwe: "Hon tejpar paketat.", exArb: "تلصق الطرد بالشريط." },
    "Testar": { exSwe: "De testar programmet.", exArb: "يختبرون البرنامج." },
    "Timrar": { exSwe: "De timrar en stuga.", exArb: "يبنون كوخاً من الخشب." },
    "Tinnar": { exSwe: "Frostiga nätter.", exArb: "الليالي الباردة جداً." },
    "Tjatar": { exSwe: "Barnet tjatar om godis.", exArb: "الطفل يلح على الحلوى." },
    "Tjurar": { exSwe: "Han tjurar efter förlusten.", exArb: "يتجهم بعد الخسارة." },
    "Tjuter": { exSwe: "Vargen tjuter.", exArb: "الذئب يعوي." },
    "Tjänar": { exSwe: "Han tjänar bra.", exArb: "يكسب جيداً." },
    "Tokar": { exSwe: "De tokar till det.", exArb: "يخربطون الأمور." },
    "Tolkar": { exSwe: "Hon tolkar samtalet.", exArb: "تترجم المحادثة." },
    "Toppar": { exSwe: "Hon toppar listan.", exArb: "تتصدر القائمة." },
    "Torkar": { exSwe: "Hon torkar tallrikarna.", exArb: "تجفف الصحون." },
    "Tornar": { exSwe: "Berget tornar sig i fjärran.", exArb: "الجبل يشمخ في البعيد." },
    "Trackar": { exSwe: "De trackar rena.", exArb: "ينظفون المسار." },
    "Trampar": { exSwe: "Han trampar på pedalerna.", exArb: "يدوس على الدواسات." },
    "Trappar": { exSwe: "De trappar upp konflikten.", exArb: "يصعدون النزاع." },
    "Traskar": { exSwe: "De traskar genom snön.", exArb: "يخوضون في الثلج." },
    "Trasslar": { exSwe: "Han trasslar in linan.", exArb: "يشبك الحبل." },
    "Trippar": { exSwe: "Hon trippar fram på höga klackar.", exArb: "تمشي بخطوات قصيرة على كعب عالٍ." },
    "Trotsar": { exSwe: "Han trotsar faran.", exArb: "يتحدى الخطر." },
    "Tryckar": { exSwe: "Han tryckar på knappen.", exArb: "يضغط على الزر." },
    "Tränar": { exSwe: "Hon tränar varje dag.", exArb: "تتدرب كل يوم." },
    "Tvingar": { exSwe: "De tvingar honom att betala.", exArb: "يجبرونه على الدفع." },
    "Tvärar": { exSwe: "Han tvärar vid korsningen.", exArb: "يتوقف فجأة عند التقاطع." },
    "Tyllar": { exSwe: "Barnen tyllar i gräset.", exArb: "الأطفال يتدحرجون على العشب." },
    "Tynar": { exSwe: "Blommorna tynar bort.", exArb: "الزهور تذبل." },
    "Tyngar": { exSwe: "Skulden tyngar honom.", exArb: "الدين يثقل عليه." },
    "Täcker": { exSwe: "Snön täcker marken.", exArb: "الثلج يغطي الأرض." },
    "Tänder": { exSwe: "Hon tänder ett ljus.", exArb: "تشعل شمعة." },
    "Tänker": { exSwe: "Jag tänker på dig.", exArb: "أفكر فيك." },
    "Töjer": { exSwe: "Hon töjer efter träningen.", exArb: "تتمدد بعد التمرين." },
    "Tömmer": { exSwe: "Han tömmer glaset.", exArb: "يفرغ الكأس." },

    // U-V verbs
    "Umgås": { exSwe: "De umgås ofta.", exArb: "يتواصلون كثيراً." },
    "Uppger": { exSwe: "Han uppger sitt namn.", exArb: "يذكر اسمه." },
    "Uppnår": { exSwe: "Hon uppnår sina mål.", exArb: "تحقق أهدافها." },
    "Upptar": { exSwe: "Jobbet upptar all tid.", exArb: "العمل يستغرق كل الوقت." },
    "Urholkar": { exSwe: "Vattnet urholkar stenen.", exArb: "الماء يحفر الصخر." },
    "Utarmar": { exSwe: "Kriget utarmar landet.", exArb: "الحرب تستنزف البلاد." },
    "Utbytar": { exSwe: "De utbytar erfarenheter.", exArb: "يتبادلون الخبرات." },
    "Utesluter": { exSwe: "De utesluter honom.", exArb: "يستبعدونه." },
    "Utgår": { exSwe: "Tåget utgår klockan nio.", exArb: "القطار ينطلق الساعة التاسعة." },
    "Utökar": { exSwe: "De utökar verksamheten.", exArb: "يوسعون العمل." },
    "Vaggar": { exSwe: "Mamma vaggar bebisen.", exArb: "الأم تهز الرضيع." },
    "Vandrar": { exSwe: "De vandrar i bergen.", exArb: "يتجولون في الجبال." },
    "Vankar": { exSwe: "Han vankar fram och tillbaka.", exArb: "يتمشى ذهاباً وإياباً." },
    "Vanstäljer": { exSwe: "Tatuering vanstäljer huden.", exArb: "الوشم يشوه البشرة." },
    "Varar": { exSwe: "Mötet varar i två timmar.", exArb: "الاجتماع يستمر ساعتين." },
    "Varnar": { exSwe: "Han varnar för faran.", exArb: "يحذر من الخطر." },
    "Vecklar": { exSwe: "Hon vecklar ut duken.", exArb: "تفتح القماش." },
    "Veknar": { exSwe: "Hans hjärta veknar.", exArb: "قلبه يلين." },
    "Viker": { exSwe: "Hon viker handduken.", exArb: "تطوي المنشفة." },
    "Vilar": { exSwe: "Han vilar efter maten.", exArb: "يستريح بعد الطعام." },
    "Vimlar": { exSwe: "Det vimlar av turister.", exArb: "يعج بالسياح." },
    "Vinner": { exSwe: "Laget vinner matchen.", exArb: "الفريق يفوز بالمباراة." },
    "Virar": { exSwe: "Hon virar halaren runt halsen.", exArb: "تلف الوشاح حول رقبتها." },
    "Virrar": { exSwe: "Han virrar bort sig.", exArb: "يتوه." },
    "Vispar": { exSwe: "Hon vispar grädden.", exArb: "تخفق الكريمة." },
    "Visslar": { exSwe: "Han visslar en melodi.", exArb: "يصفر لحناً." },
    "Vissnar": { exSwe: "Blommorna vissnar.", exArb: "الزهور تذبل." },
    "Vittnar": { exSwe: "Han vittnar i rätten.", exArb: "يشهد في المحكمة." },
    "Vräker": { exSwe: "De vräker hyresgästen.", exArb: "يطردون المستأجر." },
    "Vågar": { exSwe: "Hon vågar inte.", exArb: "لا تجرؤ." },
    "Vårdas": { exSwe: "Patienten vårdas på sjukhuset.", exArb: "المريض يُعالج في المستشفى." },

    // W-Z verbs
    "Walkar": { exSwe: "Hon walkar tyget.", exArb: "تقصر القماش." },
    "Wattrar": { exSwe: "Han wattrar jackan.", exArb: "يحشو السترة." },
    "Yrar": { exSwe: "Han yrar av feber.", exArb: "يهذي من الحمى." },
    "Yttar": { exSwe: "De yttar sig om saken.", exArb: "يعبرون عن رأيهم في الأمر." },
    "Zapprar": { exSwe: "Han zapprar mellan kanalerna.", exArb: "يغير القنوات بشكل متكرر." },
    "Zoomar": { exSwe: "Kameran zoomar in.", exArb: "الكاميرا تقرب." }
};

console.log('═══════════════════════════════════════════════════════════════');
console.log('     إضافة أمثلة للدفعة 26-30');
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
