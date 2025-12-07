/**
 * ADD EXAMPLES - BATCH 5 (Correct Word Matching)
 * Focus on time, occupations, school, emotions, and more actions
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
    // TIME & CALENDAR
    // ==========================================
    "Dag|Substantiv": { exSwe: "Det är en fin dag idag.", exArb: "هذا يوم جميل اليوم." },
    "Kväll|Substantiv": { exSwe: "Vi ses i kväll.", exArb: "نتقابل الليلة." },
    "Morgon|Substantiv": { exSwe: "God morgon!", exArb: "صباح الخير!" },
    "Natt|Substantiv": { exSwe: "God natt!", exArb: "ليلة سعيدة!" },
    "Vecka|Substantiv": { exSwe: "Det är sju dagar i en vecka.", exArb: "في الأسبوع سبعة أيام." },
    "Månad|Substantiv": { exSwe: "Januari är årets första månad.", exArb: "يناير هو الشهر الأول في السنة." },
    "År|Substantiv": { exSwe: "Ett år har tolv månader.", exArb: "السنة فيها اثنا عشر شهراً." },
    "Timme|Substantiv": { exSwe: "Filmen är två timmar lång.", exArb: "مدة الفيلم ساعتان." },
    "Minut|Substantiv": { exSwe: "Vänta en minut.", exArb: "انتظر دقيقة." },
    "Sekund|Substantiv": { exSwe: "Det tar bara några sekunder.", exArb: "يستغرق بضع ثوانٍ فقط." },
    "Vår|Substantiv": { exSwe: "Blommorna blommar på våren.", exArb: "تتفتح الزهور في الربيع." },
    "Sommar|Substantiv": { exSwe: "På sommaren är det varmt.", exArb: "في الصيف الجو حار." },
    "Höst|Substantiv": { exSwe: "Löven faller på hösten.", exArb: "تتساقط الأوراق في الخريف." },
    "Måndag|Substantiv": { exSwe: "Måndag är veckans första dag.", exArb: "الإثنين هو اليوم الأول في الأسبوع." },
    "Tisdag|Substantiv": { exSwe: "Vi har möte på tisdag.", exArb: "لدينا اجتماع يوم الثلاثاء." },
    "Onsdag|Substantiv": { exSwe: "Onsdag är mitt i veckan.", exArb: "الأربعاء في منتصف الأسبوع." },
    "Torsdag|Substantiv": { exSwe: "Jag tränar på torsdag.", exArb: "أتدرب يوم الخميس." },
    "Fredag|Substantiv": { exSwe: "Fredag är sista arbetsdagen.", exArb: "الجمعة آخر يوم عمل." },
    "Lördag|Substantiv": { exSwe: "På lördag går vi på bio.", exArb: "يوم السبت سنذهب إلى السينما." },
    "Söndag|Substantiv": { exSwe: "Vi vilar på söndag.", exArb: "نستريح يوم الأحد." },
    "Igår|Adverb": { exSwe: "Igår regnade det.", exArb: "البارحة أمطرت." },
    "Idag|Adverb": { exSwe: "Idag är det soligt.", exArb: "اليوم الجو مشمس." },
    "Imorgon|Adverb": { exSwe: "Imorgon åker jag till Malmö.", exArb: "غداً سأذهب إلى مالمو." },
    "Nu|Adverb": { exSwe: "Jag är upptagen nu.", exArb: "أنا مشغول الآن." },
    "Snart|Adverb": { exSwe: "Vi kommer snart.", exArb: "سنأتي قريباً." },
    "Redan|Adverb": { exSwe: "Jag har redan ätit.", exArb: "لقد أكلت بالفعل." },
    "Fortfarande|Adverb": { exSwe: "Han sover fortfarande.", exArb: "لا يزال نائماً." },
    "Aldrig|Adverb": { exSwe: "Jag har aldrig varit i Paris.", exArb: "لم أذهب إلى باريس أبداً." },
    "Alltid|Adverb": { exSwe: "Hon är alltid glad.", exArb: "هي دائماً سعيدة." },
    "Ofta|Adverb": { exSwe: "Jag tränar ofta.", exArb: "أتدرب كثيراً." },
    "Ibland|Adverb": { exSwe: "Ibland regnar det.", exArb: "أحياناً تمطر." },
    "Sällan|Adverb": { exSwe: "Jag äter sällan kött.", exArb: "نادراً ما آكل اللحم." },

    // ==========================================
    // OCCUPATIONS
    // ==========================================
    "Lärare|Substantiv": { exSwe: "Läraren undervisar eleverna.", exArb: "المعلم يُدرّس الطلاب." },
    "Läkare|Substantiv": { exSwe: "Läkaren hjälper sjuka människor.", exArb: "الطبيب يساعد المرضى." },
    "Sjuksköterska|Substantiv": { exSwe: "Sjuksköterskan tar mitt blodtryck.", exArb: "تأخذ الممرضة ضغط دمي." },
    "Polis|Substantiv": { exSwe: "Polisen skyddar oss.", exArb: "الشرطي يحمينا." },
    "Brandman|Substantiv": { exSwe: "Brandmannen släcker elden.", exArb: "رجل الإطفاء يُطفئ النار." },
    "Ingenjör|Substantiv": { exSwe: "Ingenjören designar byggnader.", exArb: "المهندس يصمم المباني." },
    "Advokat|Substantiv": { exSwe: "Advokaten försvarar sin klient.", exArb: "المحامي يدافع عن موكله." },
    "Kock|Substantiv": { exSwe: "Kocken lagar god mat.", exArb: "الطاهي يطبخ طعاماً لذيذاً." },
    "Frisör|Substantiv": { exSwe: "Frisören klipper mitt hår.", exArb: "الحلاق يقص شعري." },
    "Författare|Substantiv": { exSwe: "Författaren skriver böcker.", exArb: "الكاتب يكتب كتباً." },
    "Journalist|Substantiv": { exSwe: "Journalisten skriver artiklar.", exArb: "الصحفي يكتب مقالات." },
    "Fotograf|Substantiv": { exSwe: "Fotografen tar vackra bilder.", exArb: "المصور يلتقط صوراً جميلة." },
    "Målare|Substantiv": { exSwe: "Målaren målar huset.", exArb: "الدهّان يطلي المنزل." },
    "Snickare|Substantiv": { exSwe: "Snickaren bygger möbler.", exArb: "النجار يصنع الأثاث." },
    "Elektriker|Substantiv": { exSwe: "Elektrikern fixar elen.", exArb: "الكهربائي يصلح الكهرباء." },
    "Bonde|Substantiv": { exSwe: "Bonden odlar grönsaker.", exArb: "المزارع يزرع الخضروات." },
    "Pilot|Substantiv": { exSwe: "Piloten flyger planet.", exArb: "الطيار يقود الطائرة." },
    "Busschaufför|Substantiv": { exSwe: "Busschauffören kör bussen.", exArb: "سائق الحافلة يقود الحافلة." },
    "Kassör|Substantiv": { exSwe: "Kassören tar betalt.", exArb: "أمين الصندوق يحصّل الدفع." },
    "Städare|Substantiv": { exSwe: "Städaren städar kontoret.", exArb: "عامل النظافة ينظف المكتب." },

    // ==========================================
    // SCHOOL & EDUCATION
    // ==========================================
    "Skola|Substantiv": { exSwe: "Barnen går i skolan.", exArb: "يذهب الأطفال إلى المدرسة." },
    "Universitet|Substantiv": { exSwe: "Hon studerar på universitetet.", exArb: "تدرس في الجامعة." },
    "Lektion|Substantiv": { exSwe: "Lektionen börjar klockan nio.", exArb: "يبدأ الدرس الساعة التاسعة." },
    "Prov|Substantiv": { exSwe: "Vi har prov imorgon.", exArb: "لدينا امتحان غداً." },
    "Läxa|Substantiv": { exSwe: "Jag gör min läxa.", exArb: "أعمل واجبي المنزلي." },
    "Penna|Substantiv": { exSwe: "Jag skriver med en penna.", exArb: "أكتب بالقلم." },
    "Papper|Substantiv": { exSwe: "Jag behöver ett papper.", exArb: "أحتاج ورقة." },
    "Suddgummi|Substantiv": { exSwe: "Kan jag låna ditt suddgummi?", exArb: "هل يمكنني استعارة ممحاتك؟" },
    "Linjal|Substantiv": { exSwe: "Jag mäter med linjalen.", exArb: "أقيس بالمسطرة." },
    "Väska|Substantiv": { exSwe: "Böckerna ligger i väskan.", exArb: "الكتب في الحقيبة." },
    "Elev|Substantiv": { exSwe: "Eleven räcker upp handen.", exArb: "يرفع التلميذ يده." },
    "Student|Substantiv": { exSwe: "Studenten läser till tentamen.", exArb: "يدرس الطالب للامتحان." },
    "Klass|Substantiv": { exSwe: "Det finns tjugo elever i klassen.", exArb: "يوجد عشرون تلميذاً في الفصل." },
    "Betyg|Substantiv": { exSwe: "Hon fick bra betyg.", exArb: "حصلت على درجات جيدة." },
    "Ämne|Substantiv": { exSwe: "Svenska är mitt favoritämne.", exArb: "السويدية مادتي المفضلة." },
    "Matematik|Substantiv": { exSwe: "Jag gillar matematik.", exArb: "أحب الرياضيات." },
    "Historia|Substantiv": { exSwe: "Vi läser om svensk historia.", exArb: "ندرس تاريخ السويد." },
    "Geografi|Substantiv": { exSwe: "Jag lär mig om länder i geografi.", exArb: "أتعلم عن الدول في الجغرافيا." },

    // ==========================================
    // EMOTIONS & FEELINGS
    // ==========================================
    "Glad|Adjektiv": { exSwe: "Jag är glad idag.", exArb: "أنا سعيد اليوم." },
    "Ledsen|Adjektiv": { exSwe: "Hon är ledsen för att hon förlorade.", exArb: "هي حزينة لأنها خسرت." },
    "Arg|Adjektiv": { exSwe: "Han blev arg på mig.", exArb: "غضب مني." },
    "Trött|Adjektiv": { exSwe: "Jag är trött efter jobbet.", exArb: "أنا متعب بعد العمل." },
    "Hungrig|Adjektiv": { exSwe: "Jag är hungrig, jag vill äta.", exArb: "أنا جائع، أريد أن آكل." },
    "Törstig|Adjektiv": { exSwe: "Jag är törstig, jag vill dricka.", exArb: "أنا عطشان، أريد أن أشرب." },
    "Sjuk|Adjektiv": { exSwe: "Jag är sjuk, jag har feber.", exArb: "أنا مريض، لدي حمى." },
    "Frisk|Adjektiv": { exSwe: "Nu är jag frisk igen.", exArb: "الآن تعافيت مرة أخرى." },
    "Lycklig|Adjektiv": { exSwe: "Hon lever ett lyckligt liv.", exArb: "تعيش حياة سعيدة." },
    "Orolig|Adjektiv": { exSwe: "Jag är orolig för provet.", exArb: "أنا قلق بشأن الامتحان." },
    "Nervös|Adjektiv": { exSwe: "Jag är nervös före presentationen.", exArb: "أنا متوتر قبل العرض." },
    "Lugn|Adjektiv": { exSwe: "Var lugn, allt ordnar sig.", exArb: "كن هادئاً، كل شيء سيكون على ما يرام." },
    "Förvånad|Adjektiv": { exSwe: "Jag blev förvånad över nyheten.", exArb: "فوجئت بالخبر." },
    "Besviken|Adjektiv": { exSwe: "Han är besviken på resultatet.", exArb: "هو محبط من النتيجة." },
    "Stolt|Adjektiv": { exSwe: "Jag är stolt över dig.", exArb: "أنا فخور بك." },
    "Generad|Adjektiv": { exSwe: "Hon blev generad när hon föll.", exArb: "شعرت بالإحراج عندما سقطت." },
    "Avundsjuk|Adjektiv": { exSwe: "Var inte avundsjuk på andra.", exArb: "لا تحسد الآخرين." },
    "Tacksam|Adjektiv": { exSwe: "Jag är tacksam för din hjälp.", exArb: "أنا ممتن لمساعدتك." },
    "Ensam|Adjektiv": { exSwe: "Hon känner sig ensam.", exArb: "تشعر بالوحدة." },
    "Uttråkad|Adjektiv": { exSwe: "Jag är uttråkad, det finns inget att göra.", exArb: "أنا ملل، لا يوجد شيء لفعله." },

    // ==========================================
    // MORE ADJECTIVES
    // ==========================================
    "Ny|Adjektiv": { exSwe: "Jag har en ny telefon.", exArb: "لدي هاتف جديد." },
    "Gammal|Adjektiv": { exSwe: "Huset är gammalt.", exArb: "البيت قديم." },
    "Ung|Adjektiv": { exSwe: "Hon är ung och energisk.", exArb: "هي شابة ومليئة بالحيوية." },
    "Stor|Adjektiv": { exSwe: "Elefanten är stor.", exArb: "الفيل كبير." },
    "Liten|Adjektiv": { exSwe: "Musen är liten.", exArb: "الفأر صغير." },
    "Lång|Adjektiv": { exSwe: "Giraffen är lång.", exArb: "الزرافة طويلة." },
    "Kort|Adjektiv": { exSwe: "Filmen var kort.", exArb: "كان الفيلم قصيراً." },
    "Tjock|Adjektiv": { exSwe: "Boken är tjock.", exArb: "الكتاب سميك." },
    "Tunn|Adjektiv": { exSwe: "Papperet är tunt.", exArb: "الورقة رقيقة." },
    "Snabb|Adjektiv": { exSwe: "Geparden är snabb.", exArb: "الفهد سريع." },
    "Långsam|Adjektiv": { exSwe: "Sköldpaddan är långsam.", exArb: "السلحفاة بطيئة." },
    "Varm|Adjektiv": { exSwe: "Kaffet är varmt.", exArb: "القهوة ساخنة." },
    "Kall|Adjektiv": { exSwe: "Vattnet är kallt.", exArb: "الماء بارد." },
    "Het|Adjektiv": { exSwe: "Solen är het.", exArb: "الشمس حارقة." },
    "Sval|Adjektiv": { exSwe: "Vinden är sval.", exArb: "النسيم معتدل البرودة." },
    "Mjuk|Adjektiv": { exSwe: "Kudden är mjuk.", exArb: "الوسادة ناعمة." },
    "Hård|Adjektiv": { exSwe: "Stenen är hård.", exArb: "الحجر صلب." },
    "Lätt|Adjektiv": { exSwe: "Fjädern är lätt.", exArb: "الريشة خفيفة." },
    "Tung|Adjektiv": { exSwe: "Väskan är tung.", exArb: "الحقيبة ثقيلة." },
    "Billig|Adjektiv": { exSwe: "Boken var billig.", exArb: "كان الكتاب رخيصاً." },
    "Dyr|Adjektiv": { exSwe: "Bilen är dyr.", exArb: "السيارة غالية." },
    "Fin|Adjektiv": { exSwe: "Du har en fin klänning.", exArb: "لديك فستان جميل." },
    "Ful|Adjektiv": { exSwe: "Monsterteckningar kan vara fula.", exArb: "رسومات الوحوش يمكن أن تكون قبيحة." },
    "Smart|Adjektiv": { exSwe: "Hon är mycket smart.", exArb: "هي ذكية جداً." },
    "Dum|Adjektiv": { exSwe: "Det var en dum idé.", exArb: "كانت فكرة غبية." },
    "Rolig|Adjektiv": { exSwe: "Filmen var rolig.", exArb: "كان الفيلم مضحكاً." },
    "Tråkig|Adjektiv": { exSwe: "Föreläsningen var tråkig.", exArb: "كانت المحاضرة مملة." },
    "Intressant|Adjektiv": { exSwe: "Boken är intressant.", exArb: "الكتاب مثير للاهتمام." },
    "Svår|Adjektiv": { exSwe: "Provet var svårt.", exArb: "كان الامتحان صعباً." },
    "Enkel|Adjektiv": { exSwe: "Receptet är enkelt.", exArb: "الوصفة سهلة." },
    "Viktig|Adjektiv": { exSwe: "Det är en viktig nyhet.", exArb: "هذا خبر مهم." },
    "Farlig|Adjektiv": { exSwe: "Ormar kan vara farliga.", exArb: "الأفاعي يمكن أن تكون خطيرة." },
    "Möjlig|Adjektiv": { exSwe: "Allt är möjligt.", exArb: "كل شيء ممكن." },
    "Omöjlig|Adjektiv": { exSwe: "Det är omöjligt att göra.", exArb: "من المستحيل فعل ذلك." },
    "Nödvändig|Adjektiv": { exSwe: "Vatten är nödvändigt för livet.", exArb: "الماء ضروري للحياة." }
};

console.log('═══════════════════════════════════════════════════════════════');
console.log('     ADDING EXAMPLES - BATCH 5 (Time, Jobs, School, Emotions)');
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
