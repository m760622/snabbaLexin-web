/**
 * دفعة شاملة: إضافة أمثلة لجميع الأفعال المتبقية
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
    // الأفعال المركبة وذات المعاني الثانوية
    "Går på": { exSwe: "Festen går på hela natten.", exArb: "الحفلة تستمر طوال الليل." },
    "Drar åt": { exSwe: "Han drar åt skruven.", exArb: "يشد البرغي." },
    "Ger sig": { exSwe: "Han ger sig aldrig.", exArb: "لا يستسلم أبداً." },
    "Ger upp": { exSwe: "Jag ger upp!", exArb: "أستسلم!" },
    "Klär om": { exSwe: "Hon klär om sig efter jobbet.", exArb: "تبدل ملابسها بعد العمل." },
    "Knallar": { exSwe: "De knallar på stan.", exArb: "يتجولون في المدينة." },
    "Knäcker": { exSwe: "Han knäcker extra på helgerna.", exArb: "يعمل إضافياً في عطلة نهاية الأسبوع." },
    "Krafsar": { exSwe: "Hunden krafsar på dörren.", exArb: "الكلب يخدش الباب." },
    "Kränger": { exSwe: "Han kränger begagnade bilar.", exArb: "يبيع سيارات مستعملة." },
    "Pimplar": { exSwe: "De pimplar fisk genom isen.", exArb: "يصيدون السمك من خلال الجليد." },
    "Skattar": { exSwe: "Hon skattar hälften av lönen.", exArb: "تدفع نصف الراتب ضرائب." },
    "Skubbar": { exSwe: "Katten skubbar sig mot benet.", exArb: "القطة تحك نفسها بالساق." },
    "Slår in": { exSwe: "Hon slår in presenten.", exArb: "تغلف الهدية." },
    "Stammar": { exSwe: "Pojken stammar när han är nervös.", exArb: "الولد يتلعثم عندما يكون متوتراً." },
    "Står på": { exSwe: "Vad står på?", exArb: "ماذا يحدث؟" },
    "Trycker": { exSwe: "Förlaget trycker tusen exemplar.", exArb: "دار النشر تطبع ألف نسخة." },
    "Träffar": { exSwe: "Kulan träffar målet.", exArb: "الرصاصة تصيب الهدف." },
    "Tvinnar": { exSwe: "Hon tvinnar tråden.", exArb: "تجدل الخيط." },
    "Tvistar": { exSwe: "De tvistar om arvet.", exArb: "يتنازعون على الإرث." },
    "Tystnar": { exSwe: "Rummet tystnar.", exArb: "يصمت الغرفة." },

    // Verbs with Be- prefix
    "Beledsagar": { exSwe: "Han beledsagar gästerna.", exArb: "يرافق الضيوف." },
    "Bemyndigar": { exSwe: "Lagen bemyndigar polisen.", exArb: "القانون يخول الشرطة." },
    "Beriktigar": { exSwe: "Tidningen beriktigar felet.", exArb: "الصحيفة تصحح الخطأ." },
    "Bestraffar": { exSwe: "Lagen bestraffar brottet.", exArb: "القانون يعاقب على الجريمة." },

    // Verbs with För- prefix
    "Förglömmer": { exSwe: "Jag förglömmer aldrig.", exArb: "لن أنسى أبداً." },
    "Förgår sig": { exSwe: "Han förgår sig mot lagen.", exArb: "يخالف القانون." },
    "Förstummas": { exSwe: "Han förstummas av förskräckelse.", exArb: "يخرس من الرعب." },
    "Förtrycker": { exSwe: "Diktatorn förtrycker folket.", exArb: "الديكتاتور يضطهد الشعب." },

    // Verbs with Upp- prefix
    "Uppbringar": { exSwe: "Polisen uppbringar tjuven.", exArb: "الشرطة تقبض على اللص." },
    "Upptecknar": { exSwe: "Hon upptecknar sina minnen.", exArb: "تدون ذكرياتها." },

    // More compound verbs
    "Anknyter": { exSwe: "Berättelsen anknyter till verkligheten.", exArb: "القصة تتصل بالواقع." },
    "Anmärker": { exSwe: "Han anmärker på hennes arbete.", exArb: "يعلق على عملها." },
    "Anspelar": { exSwe: "Han anspelar på hennes förflutna.", exArb: "يلمح إلى ماضيها." },
    "Antänder": { exSwe: "De antänder elden.", exArb: "يشعلون النار." },
    "Armbågar": { exSwe: "Han armbågar sig fram.", exArb: "يشق طريقه بالمرفقين." },
    "Baktalar": { exSwe: "Hon baktalar sina kollegor.", exArb: "تغتاب زملاءها." },
    "Bilägger": { exSwe: "De bilägger tvisten.", exArb: "يسوون النزاع." },
    "Bladdrar": { exSwe: "Hon bladdrar i tidningen.", exArb: "تتصفح الجريدة." },
    "Blånekar": { exSwe: "Han blånekar trots bevisen.", exArb: "ينكر رغم الأدلة." },
    "Bokar om": { exSwe: "Hon bokar om resan.", exArb: "تغير حجز الرحلة." },
    "Bosparar": { exSwe: "De bosparar till en lägenhet.", exArb: "يدخرون لشراء شقة." },
    "Bryr sig": { exSwe: "Hon bryr sig om miljön.", exArb: "تهتم بالبيئة." },
    "Burar in": { exSwe: "Polisen burar in tjuven.", exArb: "الشرطة تحبس اللص." },
    "Drar sig": { exSwe: "Han drar sig för att fråga.", exArb: "يتردد في السؤال." },
    "Dras med": { exSwe: "Han dras med allergi.", exArb: "يعاني من الحساسية." },
    "Dribblar": { exSwe: "Spelaren dribblar bollen.", exArb: "اللاعب يراوغ بالكرة." },
    "Fnittrar": { exSwe: "Flickorna fnittrar.", exArb: "البنات يضحكن بخفوت." },
    "Ger igen": { exSwe: "Han ger igen för oförrätten.", exArb: "ينتقم لإهانته." },
    "Grubblar": { exSwe: "Hon grubblar över problemet.", exArb: "تتأمل في المشكلة." },
    "Hamstrar": { exSwe: "Folk hamstrar mat.", exArb: "الناس يخزنون الطعام." },
    "Idisslar": { exSwe: "Kon idisslar gräset.", exArb: "البقرة تجتر العشب." },
    "Idrottar": { exSwe: "Han idrottar varje dag.", exArb: "يمارس الرياضة كل يوم." },
    "Inkallar": { exSwe: "Armén inkallar reserven.", exArb: "الجيش يستدعي الاحتياط." },
    "Inlemmar": { exSwe: "De inlemmar företaget.", exArb: "يدمجون الشركة." },
    "Klandrar": { exSwe: "Chefen klandrar arbetarna.", exArb: "المدير ينتقد العمال." },
    "Klistrar": { exSwe: "Hon klistrar bilder i albumet.", exArb: "تلصق الصور في الألبوم." },
    "Klottrar": { exSwe: "Ungdomar klottrar på väggen.", exArb: "الشباب يخربشون على الجدار." },
    "Knypplar": { exSwe: "Hon knypplar spets.", exArb: "تجدل الدانتيل." },
    "Konstrar": { exSwe: "Datorn konstrar.", exArb: "الكمبيوتر يتعطل." },
    "Kringgår": { exSwe: "Han kringgår reglerna.", exArb: "يتحايل على القواعد." },
    "Kör över": { exSwe: "Bilen kör över hunden.", exArb: "السيارة تدهس الكلب." },
    "Lakar ur": { exSwe: "Regnet lakar ur jorden.", exArb: "المطر يغسل التربة." },
    "Ledsagar": { exSwe: "Hon ledsagar turister.", exArb: "ترافق السياح." },
    "Ligger i": { exSwe: "Han ligger i med studier.", exArb: "يجتهد في الدراسة." },
    "Lovordar": { exSwe: "Kritikern lovordar filmen.", exArb: "الناقد يمدح الفيلم." },
    "Munhuggs": { exSwe: "De munhuggs om politik.", exArb: "يتجادلون حول السياسة." },
    "Mönstrar": { exSwe: "Han mönstrar i armén.", exArb: "يلتحق بالجيش." },
    "Nagelfar": { exSwe: "Hon nagelfar rapporten.", exArb: "تدقق التقرير بعناية." },
    "Omfamnar": { exSwe: "Hon omfamnar sitt barn.", exArb: "تعانق طفلها." },
    "Omkommer": { exSwe: "Många omkommer i olyckan.", exArb: "كثيرون يموتون في الحادث." },
    "Renodlar": { exSwe: "De renodlar sin strategi.", exArb: "يركزون استراتيجيتهم." },
    "Samtalar": { exSwe: "De samtalar om framtiden.", exArb: "يتحدثون عن المستقبل." },
    "Schaktar": { exSwe: "De schaktar ur marken.", exArb: "يحفرون في الأرض." },
    "Skor sig": { exSwe: "Han skor sig på andras olycka.", exArb: "يستفيد من مصائب الآخرين." },
    "Skrubbar": { exSwe: "Hon skrubbar golvet.", exArb: "تفرك الأرض." },
    "Skrymmer": { exSwe: "Soffan skrymmer i rummet.", exArb: "الأريكة تأخذ حيزاً كبيراً في الغرفة." },
    "Skrävlar": { exSwe: "Han skrävlar om sin rikedom.", exArb: "يتفاخر بثروته." },
    "Skyldrar": { exSwe: "Soldaten skyldrar gevär.", exArb: "الجندي يحيي بالسلاح." },
    "Slår upp": { exSwe: "Hon slår upp ordet i ordboken.", exArb: "تبحث عن الكلمة في القاموس." },
    "Släntrar": { exSwe: "Han släntrar längs gatan.", exArb: "يتمشى ببطء في الشارع." },
    "Smickrar": { exSwe: "Han smickrar chefen.", exArb: "يتملق المدير." },
    "Snörvlar": { exSwe: "Barnet snörvlar av gråt.", exArb: "الطفل يخنخن من البكاء." },
    "Solbadar": { exSwe: "Hon solbadar på stranden.", exArb: "تتشمس على الشاطئ." },
    "Spacklar": { exSwe: "Han spacklar sprickan.", exArb: "يملأ الشق بالمعجون." },
    "Struttar": { exSwe: "Tuppen struttar på gården.", exArb: "الديك يختال في الفناء." }
};

console.log('═══════════════════════════════════════════════════════════════');
console.log('     إضافة أمثلة للدفعة الشاملة A');
console.log('═══════════════════════════════════════════════════════════════\n');

let addedCount = 0, alreadyHasExample = 0, notFound = 0;
for (const [targetWord, example] of Object.entries(verbExamples)) {
    let found = false;
    for (let i = 0; i < dictionaryData.length; i++) {
        const entry = dictionaryData[i];
        if (entry[2] && entry[2].toLowerCase() === targetWord.toLowerCase() && entry[1] && entry[1].includes('Verb')) {
            if (!entry[7] || entry[7].trim() === '') {
                found = true;
                dictionaryData[i][7] = example.exSwe;
                dictionaryData[i][8] = example.exArb;
                addedCount++;
                console.log(`✅ ${entry[2]}`);
                break;
            }
        }
    }
    if (!found) {
        let existsWithExample = false;
        for (let i = 0; i < dictionaryData.length; i++) {
            const entry = dictionaryData[i];
            if (entry[2] && entry[2].toLowerCase() === targetWord.toLowerCase() && entry[1] && entry[1].includes('Verb')) {
                if (entry[7] && entry[7].trim() !== '') { existsWithExample = true; alreadyHasExample++; break; }
            }
        }
        if (!existsWithExample) notFound++;
    }
}
fs.writeFileSync('./data.js', 'const dictionaryData = ' + JSON.stringify(dictionaryData, null, 4) + ';');
console.log(`\n✅ المضافة: ${addedCount} | ⚠️ موجودة: ${alreadyHasExample} | ❌ غير موجودة: ${notFound}`);
