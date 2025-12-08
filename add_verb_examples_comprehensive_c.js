/**
 * دفعة شاملة C: إضافة أمثلة لجميع الأفعال المتبقية
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
    // أفعال من القائمة الحالية
    "Kvackar": { exSwe: "Ankan kvackar vid dammen.", exArb: "البطة تصوت عند البركة." },
    "Skrubbar": { exSwe: "Han skrubbar bort smutsen.", exArb: "يكشط الوسخ." },
    "Girerar": { exSwe: "Han girerar checken.", exArb: "يجير الشيك." },
    "Kurerar": { exSwe: "Läkaren kurerar patienten.", exArb: "الطبيب يعالج المريض." },
    "Superar": { exSwe: "De superar på restaurangen.", exArb: "يتعشون في المطعم." },
    "Voterar": { exSwe: "De voterar om förslaget.", exArb: "يصوتون على الاقتراح." },
    "Anbefaller": { exSwe: "Läkaren anbefaller vila.", exArb: "الطبيب يوصي بالراحة." },
    "Apar efter": { exSwe: "Barnet apar efter sin storebror.", exArb: "الطفل يقلد أخاه الكبير." },
    "Arbetar in": { exSwe: "Bagaren arbetar in degen.", exArb: "الخباز يعجن العجين." },
    "Brevväxlar": { exSwe: "De brevväxlar sedan länge.", exArb: "يتراسلون منذ زمن طويل." },
    "Brusar upp": { exSwe: "Han brusar upp lätt.", exArb: "يغضب بسهولة." },
    "Bryter upp": { exSwe: "De bryter upp tidigt.", exArb: "يغادرون مبكراً." },
    "Brädseglar": { exSwe: "Han brädseglar på sommaren.", exArb: "يركب الألواح الشراعية في الصيف." },
    "Dagdrömmer": { exSwe: "Hon dagdrömmer på lektionen.", exArb: "تحلم يقظة في الدرس." },
    "Drar igång": { exSwe: "Han drar igång projektet.", exArb: "يبدأ المشروع." },
    "Entledigar": { exSwe: "Företaget entledigar arbetare.", exArb: "الشركة تفصل العمال." },
    "Framhåller": { exSwe: "Hon framhåller vikten av utbildning.", exArb: "تؤكد على أهمية التعليم." },
    "Framkallar": { exSwe: "Han framkallar fotografier.", exArb: "يظهر الصور." },
    "Färglägger": { exSwe: "Barnet färglägger ritningen.", exArb: "الطفل يلون الرسم." },
    "Följer upp": { exSwe: "Hon följer upp ärendet.", exArb: "تتابع القضية." },
    "Genskjuter": { exSwe: "Polisen genskjuter flyktingen.", exArb: "الشرطة تعترض الهارب." },
    "Ger sig av": { exSwe: "De ger sig av tidigt.", exArb: "يغادرون مبكراً." },
    "Ger sig på": { exSwe: "Rånaren ger sig på offret.", exArb: "اللص يهاجم الضحية." },
    "Gottar sig": { exSwe: "Hon gottar sig åt tårtan.", exArb: "تستمتع بالكعكة." },
    "Gruvar sig": { exSwe: "Han gruvar sig för provet.", exArb: "يخاف من الامتحان." },
    "Hajar till": { exSwe: "Hon hajar till av överraskningen.", exArb: "تنتفض من المفاجأة." },
    "Halshugger": { exSwe: "Bödeln halshugger fången.", exArb: "الجلاد يقطع رأس السجين." },
    "Hemställer": { exSwe: "Han hemställer om nåd.", exArb: "يلتمس العفو." },
    "Hänger sig": { exSwe: "Fången hänger sig i cellen.", exArb: "السجين يشنق نفسه في الزنزانة." },
    "Jordfäster": { exSwe: "Prästen jordfäster den döde.", exArb: "القسيس يدفن الميت." },
    "Kemtvättar": { exSwe: "Hon kemtvättar kavajen.", exArb: "تغسل السترة غسيلاً جافاً." },
    "Kilar fast": { exSwe: "Han kilar fast brädan.", exArb: "يثبت اللوح بالإسفين." },
    "Klarlägger": { exSwe: "Utredningen klarlägger fakta.", exArb: "التحقيق يوضح الحقائق." },
    "Knipsar av": { exSwe: "Hon knipsar av tråden.", exArb: "تقص الخيط." },
    "Kopplar av": { exSwe: "Han kopplar av efter jobbet.", exArb: "يسترخي بعد العمل." },
    "Korsfäster": { exSwe: "De korsfäster Jesus.", exArb: "يصلبون يسوع." },
    "Kråmar sig": { exSwe: "Tuppen kråmar sig.", exArb: "الديك يختال." },
    "Lagstiftar": { exSwe: "Riksdagen lagstiftar om skatter.", exArb: "البرلمان يشرع قوانين الضرائب." },
    "Lyckliggör": { exSwe: "Kärleken lyckliggör dem.", exArb: "الحب يسعدهم." },
    "Lämpar sig": { exSwe: "Platsen lämpar sig för picknick.", exArb: "المكان مناسب للنزهة." },
    "Mjuklandar": { exSwe: "Planet mjuklandar.", exArb: "الطائرة تهبط بسلاسة." },
    "Motarbetar": { exSwe: "Han motarbetar reformerna.", exArb: "يعارض الإصلاحات." },
    "Mörklägger": { exSwe: "Regeringen mörklägger skandalen.", exArb: "الحكومة تتستر على الفضيحة." },
    "Pantsätter": { exSwe: "Han pantsätter huset.", exArb: "يرهن البيت." },
    "Peppar upp": { exSwe: "Tränaren pepprar upp laget.", exArb: "المدرب يحفز الفريق." },
    "Planlägger": { exSwe: "De planlägger resan.", exArb: "يخططون للرحلة." },
    "Prästviger": { exSwe: "Biskopen prästviger kandidaten.", exArb: "المطران يرسم المرشح قساً." },
    "Skitar ner": { exSwe: "Hunden skitar ner gräsmattan.", exArb: "الكلب يوسخ العشب." },
    "Skriver ut": { exSwe: "Hon skriver ut dokumentet.", exArb: "تطبع المستند." },
    "Skärskådar": { exSwe: "Han skärskådar rapporten.", exArb: "يدقق في التقرير." },
    "Snabbar på": { exSwe: "Snabba på!", exArb: "أسرع!" },
    "Snoppar av": { exSwe: "Kritiken snoppar av honom.", exArb: "النقد يحبطه." },
    "Späker sig": { exSwe: "Munken späker sig.", exArb: "الراهب يمارس التقشف." },
    "Stakar sig": { exSwe: "Han stakar sig i talet.", exArb: "يتلعثم في الكلام." },
    "Storspelar": { exSwe: "Målvakten storspelar.", exArb: "الحارس يلعب ببراعة." },
    "Svartmålar": { exSwe: "Han svartmålar motståndaren.", exArb: "يشوه سمعة الخصم." },
    "Svänger om": { exSwe: "Han svänger om i åsikterna.", exArb: "يغير رأيه." },
    "Sätter upp": { exSwe: "De sätter upp en pjäs.", exArb: "يعرضون مسرحية." },
    "Tillgriper": { exSwe: "De tillgriper våld.", exArb: "يلجؤون للعنف." },
    "Underlåter": { exSwe: "Han underlåter att betala.", exArb: "يهمل الدفع." },
    "Vallfärdar": { exSwe: "Pilgrimer vallfärdar till Mekka.", exArb: "الحجاج يحجون إلى مكة." },
    "Vindsurfar": { exSwe: "Han vindsurfar på sommaren.", exArb: "يركب لوح الشراع في الصيف." },
    "Vräker sig": { exSwe: "Han vräker sig i soffan.", exArb: "يرمي بنفسه على الأريكة." },
    "Våldgästar": { exSwe: "Han våldgästar festen.", exArb: "يقتحم الحفلة." },
    "Överträder": { exSwe: "Han överträder lagen.", exArb: "يخالف القانون." },
    "Agiterar": { exSwe: "Han agiterar för en förändring.", exArb: "يحرض على التغيير." },
    "Beblandar sig": { exSwe: "Han beblandar sig i affären.", exArb: "يتدخل في القضية." },
    "Flanerar": { exSwe: "De flanerar på boulevarden.", exArb: "يتنزهون على الشارع." },
    "Friterar": { exSwe: "Hon friterar kycklingen.", exArb: "تقلي الدجاج." },
    "Justerar": { exSwe: "Han justerar inställningarna.", exArb: "يضبط الإعدادات." },
    "Kalkerar": { exSwe: "Barnet kalkerar bilden.", exArb: "الطفل ينسخ الصورة." },
    "Kasserar": { exSwe: "De kasserar gamla maskiner.", exArb: "يتخلصون من الآلات القديمة." },
    "Markerar": { exSwe: "Han markerar texten.", exArb: "يحدد النص." },
    "Monterar": { exSwe: "Han monterar hyllan.", exArb: "يركب الرف." },
    "Tatuerar": { exSwe: "Hon tatuerar sig.", exArb: "تضع وشماً." },
    "Torterar": { exSwe: "De torterar fångarna.", exArb: "يعذبون السجناء." },
    "Turnerar": { exSwe: "Bandet turnerar i Europa.", exArb: "الفرقة تجول في أوروبا." },
    "Urinerar": { exSwe: "Hunden urinerar på stolpen.", exArb: "الكلب يتبول على العمود." },
    "Vibrerar": { exSwe: "Telefonen vibrerar.", exArb: "الهاتف يهتز." },
    "Bättrar sig": { exSwe: "Han bättrar sig efter sjukdomen.", exArb: "يتحسن بعد المرض." },
    "Datummärker": { exSwe: "Hon datummärker brevet.", exArb: "تؤرخ الرسالة." },
    "Dänger till": { exSwe: "Han dänger till stolen.", exArb: "يضرب الكرسي بقوة." },
    "Efterträder": { exSwe: "Han efterträder chefen.", exArb: "يخلف المدير." },
    "Gallskriker": { exSwe: "Barnet gallskriker.", exArb: "الطفل يصرخ صراخاً حاداً." },
    "Ger med sig": { exSwe: "Han ger med sig till slut.", exArb: "يستسلم في النهاية." },
    "Gurglar sig": { exSwe: "Hon gurglar sig med vatten.", exArb: "تتغرغر بالماء." },
    "Handplockar": { exSwe: "Han handplockar bästa spelarna.", exArb: "يختار أفضل اللاعبين." },
    "Harklar sig": { exSwe: "Han harklar sig innan talet.", exArb: "ينحنح قبل الكلام." }
};

console.log('═══════════════════════════════════════════════════════════════');
console.log('     إضافة أمثلة للدفعة الشاملة C');
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
