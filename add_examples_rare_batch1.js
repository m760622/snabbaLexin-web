/**
 * ADD EXAMPLES - RARE WORDS BATCH 1
 * Focus on useful but rare verbs
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

const examples = {
    // ==========================================
    // USEFUL RARE VERBS
    // ==========================================
    "Administrerar|Verb": { exSwe: "Hon administrerar företaget.", exArb: "تدير الشركة." },
    "Adopterar|Verb": { exSwe: "De adopterade ett barn.", exArb: "تبنوا طفلاً." },
    "Ammar|Verb": { exSwe: "Modern ammar sitt barn.", exArb: "الأم ترضع طفلها." },
    "Analyserar|Verb": { exSwe: "Vi analyserar data.", exArb: "نحلل البيانات." },
    "Anfaller|Verb": { exSwe: "Hundarna anfaller inkräktaren.", exArb: "الكلاب تهاجم الدخيل." },
    "Ankrar|Verb": { exSwe: "Båten ankrar vid hamnen.", exArb: "ترسو السفينة عند الميناء." },
    "Anställer|Verb": { exSwe: "Företaget anställer nya medarbetare.", exArb: "الشركة توظف موظفين جدد." },
    "Antyder|Verb": { exSwe: "Han antyder att han ska sluta.", exArb: "يلمح أنه سيستقيل." },
    "Avskedar|Verb": { exSwe: "Chefen avskedar arbetaren.", exArb: "المدير يفصل العامل." },
    "Avslöjar|Verb": { exSwe: "Tidningen avslöjar sanningen.", exArb: "الجريدة تكشف الحقيقة." },
    "Avundas|Verb": { exSwe: "Han avundas hennes framgång.", exArb: "يحسدها على نجاحها." },
    "Bearbetar|Verb": { exSwe: "Maskinen bearbetar metallen.", exArb: "الآلة تعالج المعدن." },
    "Bedömer|Verb": { exSwe: "Domaren bedömer tävlingen.", exArb: "الحكم يقيّم المسابقة." },
    "Befordrar|Verb": { exSwe: "Chefen befordrade henne.", exArb: "المدير رقّاها." },
    "Befinner sig|Verb": { exSwe: "Han befinner sig i Stockholm.", exArb: "هو موجود في ستوكهولم." },
    "Befriar|Verb": { exSwe: "Armén befriade staden.", exArb: "الجيش حرر المدينة." },
    "Begär|Verb": { exSwe: "Hon begär en förklaring.", exArb: "تطلب تفسيراً." },
    "Begråter|Verb": { exSwe: "De begråter förlusten.", exArb: "يحزنون على الخسارة." },
    "Bemannar|Verb": { exSwe: "De bemannar stationen.", exArb: "يوفرون العاملين للمحطة." },
    "Bemöter|Verb": { exSwe: "Han bemöter kritiken.", exArb: "يواجه النقد." },
    "Berövar|Verb": { exSwe: "Tjuven berövade honom hans plånbok.", exArb: "اللص سلبه محفظته." },
    "Beställer|Verb": { exSwe: "Jag beställer mat online.", exArb: "أطلب الطعام عبر الإنترنت." },
    "Betraktar|Verb": { exSwe: "Hon betraktar månen.", exArb: "تتأمل القمر." },
    "Beundrar|Verb": { exSwe: "Jag beundrar hennes mod.", exArb: "أُعجب بشجاعتها." },
    "Bevakar|Verb": { exSwe: "Vakten bevakar byggnaden.", exArb: "الحارس يراقب المبنى." },
    "Biktar sig|Verb": { exSwe: "Han biktar sig inför prästen.", exArb: "يعترف أمام القسيس." },
    "Blåser|Verb": { exSwe: "Vinden blåser starkt.", exArb: "الريح تهب بقوة." },
    "Blockerar|Verb": { exSwe: "Trafiken blockerar vägen.", exArb: "الازدحام يسد الطريق." },
    "Blomstrar|Verb": { exSwe: "Affärerna blomstrar.", exArb: "الأعمال تزدهر." },
    "Broderar|Verb": { exSwe: "Hon broderar en duk.", exArb: "تطرز مفرشاً." },
    "Brusar|Verb": { exSwe: "Havet brusar.", exArb: "البحر يهدر." },
    "Bugar|Verb": { exSwe: "Artisten bugar för publiken.", exArb: "الفنان ينحني للجمهور." },
    "Byter|Verb": { exSwe: "Jag byter jobb.", exArb: "أغيّر العمل." },
    "Debuterar|Verb": { exSwe: "Hon debuterade som skådespelare.", exArb: "ظهرت لأول مرة كممثلة." },
    "Demonstrerar|Verb": { exSwe: "Folket demonstrerar mot lagen.", exArb: "الشعب يتظاهر ضد القانون." },
    "Diariera|Verb": { exSwe: "Dokumentet måste diarieras.", exArb: "يجب تسجيل الوثيقة." },
    "Diktar|Verb": { exSwe: "Han diktar poesi.", exArb: "يكتب الشعر." },
    "Distribuerar|Verb": { exSwe: "Företaget distribuerar varor.", exArb: "الشركة توزع البضائع." },
    "Dokumenterar|Verb": { exSwe: "Vi dokumenterar processen.", exArb: "نوثّق العملية." },
    "Dominerar|Verb": { exSwe: "Han dominerar samtalet.", exArb: "يسيطر على الحوار." },
    "Donerar|Verb": { exSwe: "Han donerade pengar till välgörenhet.", exArb: "تبرع بالمال للجمعيات الخيرية." },
    "Drunknar|Verb": { exSwe: "Mannen drunknade i sjön.", exArb: "غرق الرجل في البحيرة." },
    "Dubblerar|Verb": { exSwe: "Vi dubblerar produktionen.", exArb: "نضاعف الإنتاج." },
    "Dyrkar|Verb": { exSwe: "De dyrkar solen.", exArb: "يعبدون الشمس." },
    "Efterfrågar|Verb": { exSwe: "Marknaden efterfrågar produkten.", exArb: "السوق يطلب المنتج." },
    "Emigrerar|Verb": { exSwe: "Familjen emigrerade till USA.", exArb: "هاجرت العائلة إلى أمريكا." },
    "Engagerar|Verb": { exSwe: "Hon engagerar sig i politiken.", exArb: "تنخرط في السياسة." },
    "Etablerar|Verb": { exSwe: "De etablerar ett nytt företag.", exArb: "يؤسسون شركة جديدة." },
    "Evakuerar|Verb": { exSwe: "Vi evakuerar byggnaden.", exArb: "نخلي المبنى." },
    "Experimenterar|Verb": { exSwe: "Forskarna experimenterar.", exArb: "الباحثون يجرون التجارب." },
    "Exploderar|Verb": { exSwe: "Bomben exploderade.", exArb: "انفجرت القنبلة." },
    "Exporterar|Verb": { exSwe: "Sverige exporterar bilar.", exArb: "السويد تصدر السيارات." },
    "Fabricerar|Verb": { exSwe: "Fabriken fabricerar möbler.", exArb: "المصنع يصنع الأثاث." },
    "Fascinerar|Verb": { exSwe: "Historien fascinerar mig.", exArb: "التاريخ يفتنني." },
    "Faxar|Verb": { exSwe: "Jag faxar dokumentet.", exArb: "أرسل الوثيقة بالفاكس." },
    "Filar|Verb": { exSwe: "Han filar på metallen.", exArb: "يبرد المعدن." },
    "Filmar|Verb": { exSwe: "De filmar en dokumentär.", exArb: "يصورون فيلماً وثائقياً." },
    "Finansierar|Verb": { exSwe: "Banken finansierar projektet.", exArb: "البنك يموّل المشروع." },
    "Fladdrar|Verb": { exSwe: "Flaggan fladdrar i vinden.", exArb: "العلم يرفرف في الريح." },
    "Flattar|Verb": { exSwe: "Jag flottar ner med floden.", exArb: "أنزل مع النهر على طوف." },
    "Flirtar|Verb": { exSwe: "Han flirtar med henne.", exArb: "يغازلها." },
    "Flyr|Verb": { exSwe: "De flyr från kriget.", exArb: "يفرون من الحرب." },
    "Flytta|Verb": { exSwe: "Vi flyttar till en ny lägenhet.", exArb: "ننتقل إلى شقة جديدة." },
    "Fokuserar|Verb": { exSwe: "Fokusera på arbetet.", exArb: "ركّز على العمل." },
    "Formulerar|Verb": { exSwe: "Han formulerar frågan.", exArb: "يصوغ السؤال." },
    "Forskar|Verb": { exSwe: "Hon forskar om cancer.", exArb: "تبحث عن السرطان." },
    "Fostrar|Verb": { exSwe: "De fostrar barnen väl.", exArb: "يربون الأطفال جيداً." },
    "Framställer|Verb": { exSwe: "Fabriken framställer plast.", exArb: "المصنع ينتج البلاستيك." },
    "Frustar|Verb": { exSwe: "Hästen frustar.", exArb: "الحصان ينفث." },
    "Fångar|Verb": { exSwe: "Polisen fångade tjuven.", exArb: "الشرطة ألقت القبض على اللص." },
    "Förbrukar|Verb": { exSwe: "Bilen förbrukar mycket bensin.", exArb: "السيارة تستهلك بنزيناً كثيراً." },
    "Fördröjer|Verb": { exSwe: "Regnet fördröjer resan.", exArb: "المطر يؤخر الرحلة." },
    "Förenklar|Verb": { exSwe: "Vi förenklar processen.", exArb: "نبسط العملية." },
    "Föreställer|Verb": { exSwe: "Jag kan inte föreställa mig det.", exArb: "لا أستطيع تخيل ذلك." },
    "Förfalskar|Verb": { exSwe: "Han förfalskar underskriften.", exArb: "يزوّر التوقيع." },
    "Förhandlar|Verb": { exSwe: "De förhandlar om pris.", exArb: "يتفاوضون على السعر." },
    "Förhör|Verb": { exSwe: "Polisen förhör vittnet.", exArb: "الشرطة تستجوب الشاهد." },
    "Förnyar|Verb": { exSwe: "Jag förnyar mitt pass.", exArb: "أجدد جواز سفري." },
    "Förorenar|Verb": { exSwe: "Fabriken förorenar luften.", exArb: "المصنع يلوث الهواء." },
    "Försvarar|Verb": { exSwe: "Armén försvarar landet.", exArb: "الجيش يدافع عن البلاد." },
    "Förvarar|Verb": { exSwe: "Vi förvarar mat i kylskåpet.", exArb: "نحفظ الطعام في الثلاجة." },
    "Förvandlar|Verb": { exSwe: "Trollkarlen förvandlar sig.", exArb: "الساحر يتحول." },
    "Gissar|Verb": { exSwe: "Jag gissar svaret.", exArb: "أخمن الإجابة." },
    "Gnuggar|Verb": { exSwe: "Han gnuggar ögonen.", exArb: "يفرك عينيه." },
    "Granskar|Verb": { exSwe: "Revisorn granskar räkenskaperna.", exArb: "المدقق يراجع الحسابات." },
    "Gripar|Verb": { exSwe: "Polisen griper brottslingen.", exArb: "الشرطة تعتقل المجرم." },
    "Grundar|Verb": { exSwe: "Han grundade företaget 1990.", exArb: "أسس الشركة عام 1990." },
    "Grälar|Verb": { exSwe: "De grälar om pengar.", exArb: "يتشاجرون على المال." },
    "Gömmer|Verb": { exSwe: "Barnet gömmer sig.", exArb: "الطفل يختبئ." },
    "Handikappras|Verb": { exSwe: "Han handikappades i olyckan.", exArb: "أصيب بإعاقة في الحادث." },
    "Hanterar|Verb": { exSwe: "Hon hanterar situationen väl.", exArb: "تتعامل مع الوضع جيداً." },
    "Hotar|Verb": { exSwe: "Han hotar henne.", exArb: "يهددها." },
    "Hyllar|Verb": { exSwe: "Folket hyllar hjälten.", exArb: "الشعب يحيي البطل." },
    "Häktar|Verb": { exSwe: "Polisen häktar misstänkta.", exArb: "الشرطة تحبس المشتبه بهم." },
    "Härstammar|Verb": { exSwe: "Han härstammar från Syrien.", exArb: "أصله من سوريا." },
    "Hävdar|Verb": { exSwe: "Hon hävdar sin oskuld.", exArb: "تصر على براءتها." },
    "Ignorerar|Verb": { exSwe: "Han ignorerar problemet.", exArb: "يتجاهل المشكلة." },
    "Imiterar|Verb": { exSwe: "Barnet imiterar föräldrarna.", exArb: "الطفل يقلد الوالدين." },
    "Immuniserar|Verb": { exSwe: "Vaccinet immuniserar kroppen.", exArb: "اللقاح يحصّن الجسم." },
    "Importerar|Verb": { exSwe: "Vi importerar olja.", exArb: "نستورد النفط." },
    "Imponerar|Verb": { exSwe: "Hans talang imponerar mig.", exArb: "موهبته تبهرني." },
    "Indikerar|Verb": { exSwe: "Symptomen indikerar sjukdom.", exArb: "الأعراض تشير إلى مرض." },
    "Infekterar|Verb": { exSwe: "Viruset infekterar celler.", exArb: "الفيروس يصيب الخلايا." },
    "Informerar|Verb": { exSwe: "Jag informerar dig om beslutet.", exArb: "أبلغك بالقرار." },
    "Inhyser|Verb": { exSwe: "Hotellet inhyser turister.", exArb: "الفندق يستضيف السياح." },
    "Injicerar|Verb": { exSwe: "Sjuksköterskan injicerar medicin.", exArb: "الممرضة تحقن الدواء." },
    "Inkluderar|Verb": { exSwe: "Priset inkluderar frukost.", exArb: "السعر يشمل الإفطار." },
    "Innoverar|Verb": { exSwe: "Företaget innoverar ständigt.", exArb: "الشركة تبتكر باستمرار." },
    "Inspekterar|Verb": { exSwe: "Chefen inspekterar fabriken.", exArb: "المدير يتفقد المصنع." },
    "Inspirerar|Verb": { exSwe: "Läraren inspirerar eleverna.", exArb: "المعلم يلهم الطلاب." },
    "Installerar|Verb": { exSwe: "Teknikern installerar programmet.", exArb: "التقني يثبت البرنامج." },
    "Instruerar|Verb": { exSwe: "Tränaren instruerar laget.", exArb: "المدرب يوجه الفريق." },
    "Integrerar|Verb": { exSwe: "De integrerar sig i samhället.", exArb: "يندمجون في المجتمع." },
    "Interagerar|Verb": { exSwe: "Barnen interagerar med varandra.", exArb: "الأطفال يتفاعلون مع بعضهم." },
    "Introducerar|Verb": { exSwe: "Vi introducerar en ny produkt.", exArb: "نقدم منتجاً جديداً." },
    "Investerar|Verb": { exSwe: "Han investerar i fastigheter.", exArb: "يستثمر في العقارات." },
    "Isolerar|Verb": { exSwe: "Vi isolerar huset.", exArb: "نعزل البيت." }
};

console.log('═══════════════════════════════════════════════════════════════');
console.log('     ADDING EXAMPLES - RARE WORDS BATCH 1 (Useful Rare Verbs)');
console.log('═══════════════════════════════════════════════════════════════\n');

let addedCount = 0;
let alreadyHasExample = 0;
let notFound = 0;

for (const [key, example] of Object.entries(examples)) {
    const [targetWord, targetType] = key.split('|');
    let found = false;

    for (let i = 0; i < dictionaryData.length; i++) {
        const entry = dictionaryData[i];
        const entryWord = entry[2];
        const entryType = entry[1];

        const wordMatch = entryWord && entryWord.toLowerCase() === targetWord.toLowerCase();
        const typeMatch = !targetType || targetType === '' || (entryType && entryType.includes(targetType));

        if (wordMatch && typeMatch) {
            found = true;

            if (entry[7] && entry[7].trim() !== '') {
                alreadyHasExample++;
            } else {
                dictionaryData[i][7] = example.exSwe;
                dictionaryData[i][8] = example.exArb;
                addedCount++;
                console.log(`✓ ${entryWord} (${entryType || 'N/A'})`);
            }
            break;
        }
    }

    if (!found) {
        console.log(`❌ Not found: ${targetWord} (${targetType || 'any'})`);
        notFound++;
    }
}

const newDataStr = 'const dictionaryData = ' + JSON.stringify(dictionaryData, null, 4) + ';';
fs.writeFileSync('./data.js', newDataStr);

console.log('\n═══════════════════════════════════════════════════════════════');
console.log(`✅ Examples added: ${addedCount}`);
console.log(`⚠️  Already had examples: ${alreadyHasExample}`);
console.log(`❌ Not found: ${notFound}`);
console.log(`📊 Total attempted: ${Object.keys(examples).length}`);
console.log('═══════════════════════════════════════════════════════════════');
