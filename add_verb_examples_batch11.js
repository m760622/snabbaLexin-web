/**
 * دفعة 11: إضافة أمثلة للأفعال المتبقية
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
    "Grattar": { exSwe: "Vi grattar födelsedagsbarnet.", exArb: "نهنئ صاحب عيد الميلاد." },
    "Grunnar": { exSwe: "Han grunnar på problemet.", exArb: "يفكر في المشكلة." },
    "Grymtar": { exSwe: "Grisen grymtar i fållan.", exArb: "الخنزير ينخر في الحظيرة." },
    "Gödslar": { exSwe: "Bonden gödslar åkern.", exArb: "المزارع يسمد الحقل." },
    "Hånglar": { exSwe: "De hånglar på festen.", exArb: "يتعانقون ويقبلون في الحفلة." },
    "Indelar": { exSwe: "De indelar klassen i grupper.", exArb: "يقسمون الفصل إلى مجموعات." },
    "Inreder": { exSwe: "Hon inreder lägenheten.", exArb: "تؤثث الشقة." },
    "Jollrar": { exSwe: "Bebisen jollrar glatt.", exArb: "الرضيع يناغي بسعادة." },
    "Kacklar": { exSwe: "Hönorna kacklar i hönshuset.", exArb: "الدجاج يقرقر في القن." },
    "Kalasar": { exSwe: "Familjen kalasar på julmat.", exArb: "العائلة تتولم على طعام الميلاد." },
    "Kinesar": { exSwe: "Han kinesar efter maten.", exArb: "ينام قيلولة بعد الطعام." },
    "Klackar": { exSwe: "Skomakaren klackar skorna.", exArb: "صانع الأحذية يركب الكعب." },
    "Kladdar": { exSwe: "Barnet kladdar med färger.", exArb: "الطفل يخربش بالألوان." },
    "Klampar": { exSwe: "Han klampar in i rummet.", exArb: "يدخل الغرفة بتثاقل." },
    "Klickar": { exSwe: "Hon klickar på länken.", exArb: "تنقر على الرابط." },
    "Klinkar": { exSwe: "Han klinkar på gitarren.", exArb: "يعزف على الجيتار." },
    "Kluckar": { exSwe: "Vattnet kluckar i bäcken.", exArb: "الماء يخرخر في الجدول." },
    "Klänger": { exSwe: "Apan klänger i trädet.", exArb: "القرد يتسلق الشجرة." },
    "Knallar": { exSwe: "De knallar på stan.", exArb: "يتجولون في المدينة." },
    "Knaprar": { exSwe: "Ekorren knaprar på nöten.", exArb: "السنجاب يقضم الجوزة." },
    "Knockar": { exSwe: "Boxaren knockar motståndaren.", exArb: "الملاكم يضرب خصمه ضربة قاضية." },
    "Knorrar": { exSwe: "Han knorrar över priset.", exArb: "يتذمر من السعر." },
    "Knäcker": { exSwe: "Han knäcker nötter.", exArb: "يكسر الجوز." },
    "Knytar": { exSwe: "Hon knytar sin slips.", exArb: "تربط ربطة عنقها." },
    "Kodar": { exSwe: "Programmeraren kodar hela dagen.", exArb: "المبرمج يكتب الكود طوال اليوم." },
    "Kollar": { exSwe: "Jag kollar mejlen.", exArb: "أتفقد البريد الإلكتروني." },
    "Kommar": { exSwe: "Hon kommar texten.", exArb: "تضع الفواصل في النص." },
    "Kostar": { exSwe: "Boken kostar hundra kronor.", exArb: "الكتاب يكلف مائة كرونة." },
    "Kottar": { exSwe: "Kotten kottar sig på grenen.", exArb: "الصنوبر يعقد ثماره على الغصن." },
    "Krafsar": { exSwe: "Hunden krafsar på dörren.", exArb: "الكلب يخدش الباب." },
    "Kramar": { exSwe: "Hon kramar sitt barn.", exArb: "تعانق طفلها." },
    "Kranglar": { exSwe: "Datorn kranglar igen.", exArb: "الكمبيوتر يتعطل مرة أخرى." },
    "Kraschar": { exSwe: "Bilen kraschar in i väggen.", exArb: "السيارة تصطدم بالجدار." },
    "Krattar": { exSwe: "Hon krattar löven.", exArb: "تجمع الأوراق بالمشط." },
    "Kraxar": { exSwe: "Korpen kraxar i trädet.", exArb: "الغراب ينعق في الشجرة." },
    "Krisar": { exSwe: "Företaget krisar.", exArb: "الشركة في أزمة." },
    "Krokar": { exSwe: "Han krokar arm med henne.", exArb: "يشابك ذراعه بذراعها." },
    "Krullar": { exSwe: "Hon krullar håret.", exArb: "تجعد شعرها." },
    "Kryddar": { exSwe: "Han kryddar maten.", exArb: "يتبل الطعام." },
    "Kryper": { exSwe: "Bebisen kryper på golvet.", exArb: "الرضيع يزحف على الأرض." },
    "Krystar": { exSwe: "Hon krystar under förlossningen.", exArb: "تزحر أثناء الولادة." },
    "Krånglar": { exSwe: "Motorn krånglar.", exArb: "المحرك يتعطل." },
    "Kräver": { exSwe: "Jobbet kräver erfarenhet.", exArb: "العمل يتطلب خبرة." },
    "Kuddar": { exSwe: "Hon kuddar upp soffan.", exArb: "تنفش وسائد الأريكة." },
    "Kullar": { exSwe: "Barnen kullar i gräset.", exArb: "الأطفال يتدحرجون على العشب." },
    "Kuperar": { exSwe: "Veterinären kuperar svansen.", exArb: "الطبيب البيطري يقص الذيل." },
    "Kurar": { exSwe: "Katten kurar ihop sig.", exArb: "القطة تتكور." },
    "Kuttar": { exSwe: "Duvan kuttar på taket.", exArb: "الحمامة تهدل على السطح." },
    "Kvalar": { exSwe: "Laget kvalar till finalen.", exArb: "الفريق يتأهل للنهائي." },
    "Kväver": { exSwe: "Röken kväver honom.", exArb: "الدخان يخنقه." },

    // More verbs
    "Laddar": { exSwe: "Jag laddar telefonen.", exArb: "أشحن الهاتف." },
    "Lagar": { exSwe: "Hon lagar middag.", exArb: "تطبخ العشاء." },
    "Lammar": { exSwe: "Tackan lammar på våren.", exArb: "النعجة تلد في الربيع." },
    "Landar": { exSwe: "Flyget landar klockan tio.", exArb: "الطائرة تهبط الساعة العاشرة." },
    "Lappar": { exSwe: "Hon lappar byxorna.", exArb: "ترقع البنطال." },
    "Lasrar": { exSwe: "Läkaren lasrar bort fläcken.", exArb: "الطبيب يزيل البقعة بالليزر." },
    "Lever": { exSwe: "De lever ett lyckligt liv.", exArb: "يعيشون حياة سعيدة." },
    "Lidar": { exSwe: "Han lidar av allergi.", exArb: "يعاني من الحساسية." },
    "Lindar": { exSwe: "Hon lindar presenten.", exArb: "تلف الهدية." },
    "Lockar": { exSwe: "Erbjudandet lockar kunder.", exArb: "العرض يجذب الزبائن." },
    "Lossar": { exSwe: "Han lossar skruvarna.", exArb: "يفك البراغي." },
    "Luddar": { exSwe: "Tröjan luddar efter tvätten.", exArb: "القميص يتوبر بعد الغسيل." },
    "Luktar": { exSwe: "Blommorna luktar gott.", exArb: "الورود رائحتها زكية." },
    "Lurar": { exSwe: "Bedragaren lurar folk.", exArb: "المحتال يخدع الناس." },
    "Lydar": { exSwe: "Hunden lydar sin ägare.", exArb: "الكلب يطيع صاحبه." },
    "Lyckas": { exSwe: "Hon lyckas med allt.", exArb: "تنجح في كل شيء." },
    "Lämnar": { exSwe: "Hon lämnar rummet.", exArb: "تغادر الغرفة." },
    "Lär ut": { exSwe: "Läraren lär ut matematik.", exArb: "المعلم يدرس الرياضيات." },
    "Majar": { exSwe: "Det majar när det blir varmt.", exArb: "تذوب الأشياء عندما يصبح الجو حاراً." },
    "Mallar": { exSwe: "Han mallar rapporten.", exArb: "يستخدم قالباً للتقرير." }
};

console.log('═══════════════════════════════════════════════════════════════');
console.log('     إضافة أمثلة للدفعة 11');
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
