/**
 * دفعة شاملة D: إضافة أمثلة لجميع الأفعال المتبقية
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
    // أفعال متبقية من القائمة
    "Inlåter sig": { exSwe: "Han inlåter sig inte i diskussionen.", exArb: "لا يدخل في النقاش." },
    "Jobbar över": { exSwe: "Hon jobbar över ikväll.", exArb: "تعمل إضافياً الليلة." },
    "Klimpar sig": { exSwe: "Mjölet klimpar sig i vattnet.", exArb: "الطحين يتكتل في الماء." },
    "Kvickar sig": { exSwe: "Kvicka sig nu!", exArb: "أسرع الآن!" },
    "Känner igen": { exSwe: "Jag känner igen dig.", exArb: "أتعرف عليك." },
    "Ligger över": { exSwe: "Han ligger över hos vännen.", exArb: "يبيت عند صديقه." },
    "Misshandlar": { exSwe: "Han misshandlar sin fru.", exArb: "يضرب زوجته." },
    "Misströstar": { exSwe: "Han misströstar om framtiden.", exArb: "ييأس من المستقبل." },
    "Muntrar upp": { exSwe: "Musiken muntrar upp mig.", exArb: "الموسيقى تبهجني." },
    "Permanentar": { exSwe: "Frisören permanentar håret.", exArb: "الحلاق يثبت الشعر." },
    "Rappar till": { exSwe: "Han rappar till pojken.", exArb: "يضرب الولد." },
    "Sitter inne": { exSwe: "Han sitter inne för stöld.", exArb: "سجين بسبب السرقة." },
    "Skadskjuter": { exSwe: "Jägaren skadskjuter djuret.", exArb: "الصياد يجرح الحيوان." },
    "Skräddarsyr": { exSwe: "De skräddarsyr lösningen.", exArb: "يفصلون الحل حسب الطلب." },
    "Smäller upp": { exSwe: "De smäller upp ett hus.", exArb: "يبنون بيتاً بسرعة." },
    "Speglar sig": { exSwe: "Hon speglar sig i vattnet.", exArb: "تنظر في انعكاسها في الماء." },
    "Spricker ut": { exSwe: "Blommorna spricker ut på våren.", exArb: "الزهور تتفتح في الربيع." },
    "Språkas vid": { exSwe: "De språkas vid på balkongen.", exArb: "يتحدثون على الشرفة." },
    "Stegrar sig": { exSwe: "Hästen stegrar sig.", exArb: "الحصان يشب." },
    "Sticker upp": { exSwe: "Han sticker upp mot chefen.", exArb: "يتطاول على المدير." },
    "Sträckläser": { exSwe: "Hon sträckläser boken.", exArb: "تقرأ الكتاب دون انقطاع." },
    "Säger ifrån": { exSwe: "Hon säger ifrån när hon är arg.", exArb: "تحتج عندما تغضب." },
    "Tar med sig": { exSwe: "Han tar med sig barnen.", exArb: "يأخذ الأطفال معه." },
    "Tar sig för": { exSwe: "Vad tar han sig för?", exArb: "ماذا يفعل؟" },
    "Trappar upp": { exSwe: "De trappar upp konflikten.", exArb: "يصعدون النزاع." },
    "Tvärstannar": { exSwe: "Bilen tvärstannar.", exArb: "السيارة تتوقف فجأة." },
    "Undergräver": { exSwe: "Han undergräver auktoriteten.", exArb: "يقوض السلطة." },
    "Underhåller": { exSwe: "Han underhåller sina barn.", exArb: "ينفق على أطفاله." },
    "Värdesätter": { exSwe: "Jag värdesätter din hjälp.", exArb: "أقدر مساعدتك." },
    "Överbevisar": { exSwe: "Bevisen överbevisar honom.", exArb: "الأدلة تدينه." },
    "Övervintrar": { exSwe: "Fåglarna övervintrar i söder.", exArb: "الطيور تقضي الشتاء في الجنوب." },
    "Abdikerar": { exSwe: "Kungen abdikerar.", exArb: "الملك يتنازل عن العرش." },
    "Ambulerar": { exSwe: "Läkaren ambulerar mellan kliniker.", exArb: "الطبيب يتنقل بين العيادات." },
    "Amorterar": { exSwe: "De amorterar lånet.", exArb: "يسددون القرض على أقساط." },
    "Amputerar": { exSwe: "Läkaren amputerar benet.", exArb: "الطبيب يبتر الساق." },
    "Avreagerar sig": { exSwe: "Han avreagerar sig på gymmet.", exArb: "يفرغ طاقته في النادي." },
    "Delegerar": { exSwe: "Chefen delegerar uppgifter.", exArb: "المدير يفوض المهام." },
    "Dirigerar": { exSwe: "Han dirigerar orkestern.", exArb: "يقود الأوركسترا." },
    "Dividerar": { exSwe: "De dividerar om politiken.", exArb: "يتناقشون في السياسة." },
    "Fabulerar": { exSwe: "Barnet fabulerar fritt.", exArb: "الطفل يتخيل بحرية." },
    "Filtrerar": { exSwe: "Maskinen filtrerar vattnet.", exArb: "الآلة ترشح الماء." },
    "Flamberar": { exSwe: "Kocken flamberar desserten.", exArb: "الطاهي يشعل الحلوى بالكونياك." },
    "Föresätter sig": { exSwe: "Han föresätter sig att sluta röka.", exArb: "يقرر الإقلاع عن التدخين." },
    "Grupperar": { exSwe: "De grupperar eleverna.", exArb: "يقسمون التلاميذ إلى مجموعات." },
    "Initierar": { exSwe: "Hon initierar projektet.", exArb: "تبدأ المشروع." },
    "Invaderar": { exSwe: "Armén invaderar landet.", exArb: "الجيش يجتاح البلاد." },
    "Kastrerar": { exSwe: "Veterinären kastrerar katten.", exArb: "البيطري يخصي القط." },
    "Kvitterar": { exSwe: "Hon kvitterar paketet.", exArb: "توقع على استلام الطرد." },
    "Makulerar": { exSwe: "De makulerar dokumenten.", exArb: "يتلفون الوثائق." },
    "Mediterar": { exSwe: "Hon mediterar varje morgon.", exArb: "تتأمل كل صباح." },
    "Obducerar": { exSwe: "Läkaren obducerar kroppen.", exArb: "الطبيب يشرح الجثة." },
    "Redigerar": { exSwe: "Hon redigerar texten.", exArb: "تحرر النص." },
    "Residerar": { exSwe: "Ambassadören residerar i slottet.", exArb: "السفير يقيم في القصر." },
    "Retirerar": { exSwe: "Armén retirerar.", exArb: "الجيش يتراجع." },
    "Reviderar": { exSwe: "De reviderar budgeten.", exArb: "يراجعون الميزانية." },
    "Seminerar": { exSwe: "Bonden seminerar kon.", exArb: "المزارع يلقح البقرة صناعياً." },
    "Separerar": { exSwe: "Paret separerar.", exArb: "الزوجان ينفصلان." },
    "Spatserar": { exSwe: "De spatserar i parken.", exArb: "يتمشون في الحديقة." },
    "Spenderar": { exSwe: "Hon spenderar pengar.", exArb: "تنفق المال." },
    "Statuerar": { exSwe: "Straffet statuerar ett exempel.", exArb: "العقوبة تعطي عبرة." },
    "Vegeterar": { exSwe: "Han vegeterar bara.", exArb: "يعيش بلا هدف." },
    "Vidimerar": { exSwe: "Hon vidimerar kopian.", exArb: "توثق النسخة." },
    "Arbetar över": { exSwe: "Han arbetar över varje dag.", exArb: "يعمل إضافياً كل يوم." },
    "Basunerar ut": { exSwe: "Han basunerar ut nyheterna.", exArb: "يعلن الأخبار على الملأ." },
    "Dödförklarar": { exSwe: "Läkaren dödförklarar patienten.", exArb: "الطبيب يعلن وفاة المريض." },
    "Efterskänker": { exSwe: "Domaren efterskänker skulden.", exArb: "القاضي يسقط الدين." },
    "Eftersträvar": { exSwe: "Han eftersträvar perfektion.", exArb: "يسعى للكمال." },
    "Extraknäcker": { exSwe: "Hon extraknäcker på helgerna.", exArb: "تعمل إضافياً في عطلة نهاية الأسبوع." },
    "Ger sig till": { exSwe: "Han ger sig till att sjunga.", exArb: "يبدأ بالغناء." },
    "Gör sig till": { exSwe: "Hon gör sig till för chefen.", exArb: "تتملق المدير." },
    "Infinner sig": { exSwe: "Alla infinner sig i tid.", exArb: "الجميع يحضرون في الوقت." },
    "Klämmer till": { exSwe: "Han klämmer till med en kommentar.", exArb: "يلقي بتعليق." },
    "Konfronteras": { exSwe: "Hon konfronteras med fakta.", exArb: "تواجَه بالحقائق." },
    "Kännetecknar": { exSwe: "Noggrannhet kännetecknar hennes arbete.", exArb: "الدقة تميز عملها." },
    "Mellanlandar": { exSwe: "Planet mellanlandar i Dubai.", exArb: "الطائرة تتوقف في دبي." },
    "Nyktrar till": { exSwe: "Han nyktrar till efter festen.", exArb: "يصحو بعد الحفلة." },
    "Offentliggör": { exSwe: "De offentliggör resultaten.", exArb: "يعلنون النتائج." },
    "Omvänder sig": { exSwe: "Han omvänder sig till kristendomen.", exArb: "يتحول للمسيحية." },
    "Sackar efter": { exSwe: "Han sackar efter i loppet.", exArb: "يتخلف في السباق." },
    "Sammanträder": { exSwe: "Styrelsen sammanträder imorgon.", exArb: "مجلس الإدارة يجتمع غداً." },
    "Skämmer bort": { exSwe: "Mormor skämmer bort barnbarnen.", exArb: "الجدة تدلل أحفادها." },
    "Slår sig ner": { exSwe: "Han slår sig ner på bänken.", exArb: "يجلس على المقعد." },
    "Snärtar till": { exSwe: "Han snärtar till hästen.", exArb: "يضرب الحصان بالسوط." },
    "Säkerställer": { exSwe: "Vi säkerställer kvaliteten.", exArb: "نضمن الجودة." },
    "Sätter i sig": { exSwe: "Han sätter i sig maten.", exArb: "يلتهم الطعام." },
    "Sätter igång": { exSwe: "De sätter igång projektet.", exArb: "يبدؤون المشروع." }
};

console.log('═══════════════════════════════════════════════════════════════');
console.log('     إضافة أمثلة للدفعة الشاملة D');
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
