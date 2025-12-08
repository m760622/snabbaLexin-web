/**
 * دفعة 12-15: إضافة المزيد من الأمثلة للأفعال المتبقية
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
    // M-P verbs
    "Manglar": { exSwe: "Hon manglar tvätten.", exArb: "تمكوي الغسيل." },
    "Mankar": { exSwe: "Han mankar på motorerna.", exArb: "يعبث في المحركات." },
    "Mappar": { exSwe: "Forskaren mappar området.", exArb: "الباحث يرسم خريطة المنطقة." },
    "Markar": { exSwe: "Han markar sidan.", exArb: "يعلم الصفحة." },
    "Matar": { exSwe: "Hon matar fåglarna.", exArb: "تطعم الطيور." },
    "Milar": { exSwe: "De milar kol i skogen.", exArb: "يحرقون الفحم في الغابة." },
    "Minkar": { exSwe: "Pengarna minkar.", exArb: "المال يتناقص." },
    "Mordar": { exSwe: "Han mordar sina offer.", exArb: "يقتل ضحاياه." },
    "Mottar": { exSwe: "Han mottar priset.", exArb: "يتسلم الجائزة." },
    "Måttar": { exSwe: "Han måttar ett slag.", exArb: "يوجه ضربة." },
    "Mönstrar": { exSwe: "Han mönstrar på fartyget.", exArb: "يلتحق بطاقم السفينة." },
    "Nackar": { exSwe: "Slaktaren nackar djuret.", exArb: "الجزار يذبح الحيوان." },
    "Naggar": { exSwe: "Rosten naggar metallen.", exArb: "الصدأ ينخر المعدن." },
    "Navigerar": { exSwe: "Kapten navigerar fartyget.", exArb: "القبطان يبحر بالسفينة." },
    "Näbbar": { exSwe: "Fåglarna näbbar varandra.", exArb: "الطيور تنقر بعضها." },
    "Nötter": { exSwe: "Ekorren nötter nötter.", exArb: "السنجاب يجمع الجوز." },
    "Offrar": { exSwe: "De offrar ett djur.", exArb: "يضحون بحيوان." },
    "Orkar": { exSwe: "Jag orkar inte mer.", exArb: "لم أعد أتحمل." },
    "Paddlar": { exSwe: "De paddlar kanoten.", exArb: "يجدفون بالكانو." },
    "Paltar": { exSwe: "Han paltar i snön.", exArb: "يدوس في الثلج." },
    "Parar": { exSwe: "Djuren parar sig på våren.", exArb: "الحيوانات تتزاوج في الربيع." },
    "Parkerar": { exSwe: "Hon parkerar bilen.", exArb: "تركن السيارة." },
    "Patar": { exSwe: "Han patar i elden.", exArb: "يقلب في النار." },
    "Peppar": { exSwe: "Tränaren pepprar laget.", exArb: "المدرب يحفز الفريق." },
    "Pettar": { exSwe: "Han pettar bort smutsen.", exArb: "ينزع الوسخ." },
    "Piffa": { exSwe: "Hon piffar upp rummet.", exArb: "تزين الغرفة." },
    "Pinnar": { exSwe: "De pinnar efter matchen.", exArb: "يعدون الأهداف بعد المباراة." },
    "Pipar": { exSwe: "Fågeln pipar i trädet.", exArb: "الطائر يغرد في الشجرة." },
    "Planar": { exSwe: "Snickaren planar brädan.", exArb: "النجار يسوي اللوح." },
    "Plaskar": { exSwe: "Barnen plaskar i vattnet.", exArb: "الأطفال يتراشقون بالماء." },

    // P-R verbs
    "Plattar": { exSwe: "Hon plattar till degen.", exArb: "تفرد العجين." },
    "Plockar": { exSwe: "De plockar bär i skogen.", exArb: "يجمعون التوت في الغابة." },
    "Plottar": { exSwe: "Han plottar ut kurvan.", exArb: "يرسم المنحنى." },
    "Pluggar": { exSwe: "Hon pluggar till provet.", exArb: "تذاكر للامتحان." },
    "Plumsar": { exSwe: "Hunden plumsar i vattnet.", exArb: "الكلب يقفز في الماء." },
    "Poängar": { exSwe: "Hon poängar ut problemen.", exArb: "تشير إلى المشاكل." },
    "Pratar": { exSwe: "De pratar hela dagen.", exArb: "يتحدثون طوال اليوم." },
    "Pressar": { exSwe: "Han pressar citronen.", exArb: "يعصر الليمون." },
    "Prisar": { exSwe: "Butiken prisar varorna.", exArb: "المتجر يسعر البضائع." },
    "Provar": { exSwe: "Hon provar klänningen.", exArb: "تجرب الفستان." },
    "Prutar": { exSwe: "Han prutar på priset.", exArb: "يفاوض على السعر." },
    "Prylar": { exSwe: "Han prylar sina barn.", exArb: "يضرب أولاده." },
    "Puffar": { exSwe: "Hon puffar honom framåt.", exArb: "تدفعه للأمام." },
    "Pumpar": { exSwe: "Han pumpar däcken.", exArb: "ينفخ الإطارات." },
    "Putsar": { exSwe: "Han putsar fönstren.", exArb: "ينظف النوافذ." },
    "Pyntar": { exSwe: "De pyntar granen.", exArb: "يزينون شجرة الميلاد." },
    "Racklar": { exSwe: "Han racklar hem full.", exArb: "يترنح إلى البيت ثملاً." },
    "Raddar": { exSwe: "Hon raddar upp böckerna.", exArb: "ترتب الكتب في صف." },
    "Rakar": { exSwe: "Han rakar skägget.", exArb: "يحلق ذقنه." },
    "Ramlar": { exSwe: "Barnet ramlar på isen.", exArb: "الطفل يسقط على الجليد." },
    "Ranglar": { exSwe: "Han ranglar hem efter festen.", exArb: "يترنح إلى البيت بعد الحفلة." },
    "Rankar": { exSwe: "De rankar spelarna.", exArb: "يصنفون اللاعبين." },
    "Rapar": { exSwe: "Han rapar högt.", exArb: "يتجشأ بصوت عالٍ." },
    "Ratar": { exSwe: "Hon ratar erbjudandet.", exArb: "ترفض العرض." },
    "Reagerar": { exSwe: "Han reagerar snabbt.", exArb: "يتفاعل بسرعة." },
    "Redar": { exSwe: "Han redar ut problemet.", exArb: "يحل المشكلة." },
    "Regerar": { exSwe: "Kungen regerar landet.", exArb: "الملك يحكم البلاد." },
    "Regnar": { exSwe: "Det regnar ute.", exArb: "تمطر في الخارج." },
    "Repar": { exSwe: "Laget repar sig efter förlusten.", exArb: "الفريق يتعافى بعد الخسارة." },
    "Retar": { exSwe: "Han retar sin syster.", exArb: "يستفز أخته." },

    // R-S verbs
    "Rivar": { exSwe: "De rivar det gamla huset.", exArb: "يهدمون البيت القديم." },
    "Rockar": { exSwe: "Bandet rockar på scenen.", exArb: "الفرقة تعزف موسيقى روك على المسرح." },
    "Ropar": { exSwe: "Han ropar på hjälp.", exArb: "يصرخ طلباً للمساعدة." },
    "Rotar": { exSwe: "Grisen rotar i marken.", exArb: "الخنزير ينقب في الأرض." },
    "Rullar": { exSwe: "Bollen rullar på gräset.", exArb: "الكرة تتدحرج على العشب." },
    "Rundar": { exSwe: "Bilen rundar hörnet.", exArb: "السيارة تدور حول الزاوية." },
    "Rusar": { exSwe: "Han rusar ut.", exArb: "يندفع للخارج." },
    "Ruskar": { exSwe: "Hunden ruskar på sig.", exArb: "الكلب ينفض جسمه." },
    "Ruvar": { exSwe: "Hönan ruvar på äggen.", exArb: "الدجاجة ترقد على البيض." },
    "Ryckar": { exSwe: "Han ryckar upp dörren.", exArb: "يفتح الباب بقوة." },
    "Ryker": { exSwe: "Det ryker från skorstenen.", exArb: "الدخان يتصاعد من المدخنة." },
    "Rymmer": { exSwe: "Fången rymmer från fängelset.", exArb: "السجين يهرب من السجن." },
    "Rynkar": { exSwe: "Hon rynkar pannan.", exArb: "تقطب جبينها." },
    "Räcker": { exSwe: "Pengarna räcker inte.", exArb: "المال لا يكفي." },
    "Rännar": { exSwe: "Vattnet rännar nedför berget.", exArb: "الماء يجري من الجبل." },
    "Rättar": { exSwe: "Läraren rättar proven.", exArb: "المعلم يصحح الامتحانات." },
    "Rökar": { exSwe: "Han rökar fisk.", exArb: "يدخن السمك." },
    "Rör": { exSwe: "Rör inte mina saker!", exArb: "لا تلمس أغراضي!" },
    "Röstar": { exSwe: "Folket röstar i valet.", exArb: "الشعب يصوت في الانتخابات." },
    "Saltar": { exSwe: "Hon saltar maten.", exArb: "تملح الطعام." }
};

console.log('═══════════════════════════════════════════════════════════════');
console.log('     إضافة أمثلة للدفعة 12-15');
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
