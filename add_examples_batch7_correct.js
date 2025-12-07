/**
 * ADD EXAMPLES - BATCH 7 (Correct Word Matching)
 * Focus on communication, entertainment, materials, and quantities
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
    // COMMUNICATION & TECHNOLOGY
    // ==========================================
    "Brev|Substantiv": { exSwe: "Jag skriver ett brev.", exArb: "أكتب رسالة." },
    "E-post|Substantiv": { exSwe: "Skicka ett e-postmeddelande.", exArb: "أرسل بريداً إلكترونياً." },
    "Meddelande|Substantiv": { exSwe: "Jag fick ett meddelande.", exArb: "تلقيت رسالة." },
    "Samtal|Substantiv": { exSwe: "Vi hade ett långt samtal.", exArb: "كان لدينا حديث طويل." },
    "Internet|Substantiv": { exSwe: "Jag söker på internet.", exArb: "أبحث على الإنترنت." },
    "Hemsida|Substantiv": { exSwe: "Besök vår hemsida.", exArb: "زُر موقعنا الإلكتروني." },
    "Lösenord|Substantiv": { exSwe: "Glöm inte ditt lösenord.", exArb: "لا تنسَ كلمة السر." },
    "Program|Substantiv": { exSwe: "Jag laddar ner ett program.", exArb: "أحمّل برنامجاً." },
    "Fil|Substantiv": { exSwe: "Spara filen.", exArb: "احفظ الملف." },
    "Skärm|Substantiv": { exSwe: "Skärmen är stor.", exArb: "الشاشة كبيرة." },
    "Tangentbord|Substantiv": { exSwe: "Jag skriver på tangentbordet.", exArb: "أكتب على لوحة المفاتيح." },
    "Mus|Substantiv": { exSwe: "Klicka med musen.", exArb: "انقر بالماوس." },
    "Skrivare|Substantiv": { exSwe: "Skriv ut med skrivaren.", exArb: "اطبع بالطابعة." },
    "Kamera|Substantiv": { exSwe: "Kameran tar bra bilder.", exArb: "الكاميرا تأخذ صوراً جيدة." },
    "Tidning|Substantiv": { exSwe: "Jag läser tidningen varje morgon.", exArb: "أقرأ الجريدة كل صباح." },
    "Nyhet|Substantiv": { exSwe: "Har du hört nyheten?", exArb: "هل سمعت الخبر؟" },
    "Radio|Substantiv": { exSwe: "Jag lyssnar på radio.", exArb: "أستمع إلى الراديو." },
    "Television|Substantiv": { exSwe: "Vi tittar på television.", exArb: "نشاهد التلفزيون." },

    // ==========================================
    // ENTERTAINMENT & CULTURE
    // ==========================================
    "Film|Substantiv": { exSwe: "Vi såg en bra film.", exArb: "شاهدنا فيلماً جيداً." },
    "Musik|Substantiv": { exSwe: "Jag älskar musik.", exArb: "أحب الموسيقى." },
    "Sång|Substantiv": { exSwe: "Hon sjunger en vacker sång.", exArb: "تغني أغنية جميلة." },
    "Konst|Substantiv": { exSwe: "Jag gillar modern konst.", exArb: "أحب الفن الحديث." },
    "Tavla|Substantiv": { exSwe: "Tavlan hänger på väggen.", exArb: "اللوحة معلقة على الحائط." },
    "Bok|Substantiv": { exSwe: "Jag läser en bok.", exArb: "أقرأ كتاباً." },
    "Roman|Substantiv": { exSwe: "Jag läser en spännande roman.", exArb: "أقرأ رواية مشوقة." },
    "Dikt|Substantiv": { exSwe: "Han skriver dikter.", exArb: "يكتب قصائد." },
    "Saga|Substantiv": { exSwe: "Mormor berättar sagor.", exArb: "جدتي تحكي حكايات." },
    "Spel|Substantiv": { exSwe: "Barnen spelar spel.", exArb: "يلعب الأطفال ألعاباً." },
    "Sport|Substantiv": { exSwe: "Jag gillar sport.", exArb: "أحب الرياضة." },
    "Fotboll|Substantiv": { exSwe: "Vi spelar fotboll.", exArb: "نلعب كرة القدم." },
    "Tennis|Substantiv": { exSwe: "Han spelar tennis.", exArb: "يلعب التنس." },
    "Simning|Substantiv": { exSwe: "Simning är bra träning.", exArb: "السباحة تمرين جيد." },
    "Promenad|Substantiv": { exSwe: "Vi tar en promenad.", exArb: "نأخذ نزهة." },
    "Semester|Substantiv": { exSwe: "Vi åker på semester i juli.", exArb: "نذهب في إجازة في يوليو." },
    "Fest|Substantiv": { exSwe: "Vi har fest ikväll.", exArb: "لدينا حفلة الليلة." },
    "Present|Substantiv": { exSwe: "Jag köpte en present.", exArb: "اشتريت هدية." },
    "Födelsedag|Substantiv": { exSwe: "Grattis på födelsedagen!", exArb: "عيد ميلاد سعيد!" },
    "Jul|Substantiv": { exSwe: "Vi firar jul i december.", exArb: "نحتفل بعيد الميلاد في ديسمبر." },
    "Påsk|Substantiv": { exSwe: "Påsken är på våren.", exArb: "عيد الفصح في الربيع." },

    // ==========================================
    // MATERIALS & SUBSTANCES
    // ==========================================
    "Vatten|Substantiv": { exSwe: "Vatten är nödvändigt.", exArb: "الماء ضروري." },
    "Luft|Substantiv": { exSwe: "Luften är ren här.", exArb: "الهواء نقي هنا." },
    "Eld|Substantiv": { exSwe: "Elden brinner.", exArb: "النار تشتعل." },
    "Trä|Substantiv": { exSwe: "Bordet är av trä.", exArb: "الطاولة من خشب." },
    "Metall|Substantiv": { exSwe: "Nyckeln är av metall.", exArb: "المفتاح من معدن." },
    "Plast|Substantiv": { exSwe: "Flaskan är av plast.", exArb: "الزجاجة من بلاستيك." },
    "Glas|Substantiv": { exSwe: "Fönstret är av glas.", exArb: "النافذة من زجاج." },
    "Papper|Substantiv": { exSwe: "Boken är av papper.", exArb: "الكتاب من ورق." },
    "Tyg|Substantiv": { exSwe: "Gardinen är av tyg.", exArb: "الستارة من قماش." },
    "Läder|Substantiv": { exSwe: "Väskan är av läder.", exArb: "الحقيبة من جلد." },
    "Ull|Substantiv": { exSwe: "Tröjan är av ull.", exArb: "السترة من صوف." },
    "Bomull|Substantiv": { exSwe: "Skjortan är av bomull.", exArb: "القميص من قطن." },
    "Guld|Substantiv": { exSwe: "Ringen är av guld.", exArb: "الخاتم من ذهب." },
    "Silver|Substantiv": { exSwe: "Halsbandet är av silver.", exArb: "القلادة من فضة." },

    // ==========================================
    // QUANTITIES & MEASUREMENTS
    // ==========================================
    "Antal|Substantiv": { exSwe: "Antalet elever är tjugo.", exArb: "عدد الطلاب عشرون." },
    "Mängd|Substantiv": { exSwe: "En stor mängd vatten.", exArb: "كمية كبيرة من الماء." },
    "Bit|Substantiv": { exSwe: "Ta en bit kaka.", exArb: "خذ قطعة كعك." },
    "Del|Substantiv": { exSwe: "En del av arbetet är klart.", exArb: "جزء من العمل جاهز." },
    "Hälften|Substantiv": { exSwe: "Jag åt hälften av kakan.", exArb: "أكلت نصف الكعكة." },
    "Meter|Substantiv": { exSwe: "Rummet är fem meter brett.", exArb: "الغرفة عرضها خمسة أمتار." },
    "Kilometer|Substantiv": { exSwe: "Det är tio kilometer till stan.", exArb: "المسافة عشرة كيلومترات إلى المدينة." },
    "Gram|Substantiv": { exSwe: "Jag behöver 200 gram smör.", exArb: "أحتاج 200 غرام زبدة." },
    "Kilo|Substantiv": { exSwe: "Jag köpte ett kilo äpplen.", exArb: "اشتريت كيلو تفاح." },
    "Liter|Substantiv": { exSwe: "Jag dricker två liter vatten.", exArb: "أشرب لترين من الماء." },
    "Grad|Substantiv": { exSwe: "Det är 20 grader ute.", exArb: "درجة الحرارة 20 درجة في الخارج." },
    "Procent|Substantiv": { exSwe: "Jag fick 80 procent på provet.", exArb: "حصلت على 80 بالمئة في الامتحان." },

    // ==========================================
    // MORE VERBS - ACTIONS
    // ==========================================
    "Bär|Verb": { exSwe: "Hon bär en tung väska.", exArb: "تحمل حقيبة ثقيلة." },
    "Drar|Verb": { exSwe: "Dra i dörren.", exArb: "اسحب الباب." },
    "Trycker|Verb": { exSwe: "Tryck på knappen.", exArb: "اضغط على الزر." },
    "Slår|Verb": { exSwe: "Slå inte!", exArb: "لا تضرب!" },
    "Kastar|Verb": { exSwe: "Han kastar bollen.", exArb: "يرمي الكرة." },
    "Fångar|Verb": { exSwe: "Pojken fångar bollen.", exArb: "الولد يمسك الكرة." },
    "Hittar|Verb": { exSwe: "Jag kan inte hitta mina nycklar.", exArb: "لا أستطيع أن أجد مفاتيحي." },
    "Tappar|Verb": { exSwe: "Jag tappade glaset.", exArb: "أسقطت الكوب." },
    "Bryter|Verb": { exSwe: "Han bröt benet.", exArb: "كسر ساقه." },
    "Lagrar|Verb": { exSwe: "Jag lagar maten.", exArb: "أطبخ الطعام." },
    "Fixar|Verb": { exSwe: "Han fixar bilen.", exArb: "يصلح السيارة." },
    "Ändrar|Verb": { exSwe: "Jag ändrar planen.", exArb: "أغيّر الخطة." },
    "Byter|Verb": { exSwe: "Jag byter kläder.", exArb: "أبدّل ملابسي." },
    "Räknar|Verb": { exSwe: "Räkna till tio.", exArb: "عُد إلى عشرة." },
    "Mäter|Verb": { exSwe: "Jag mäter rummet.", exArb: "أقيس الغرفة." },
    "Väger|Verb": { exSwe: "Väskan väger fem kilo.", exArb: "الحقيبة تزن خمسة كيلو." },
    "Blandar|Verb": { exSwe: "Blanda mjöl och vatten.", exArb: "اخلط الطحين والماء." },
    "Häller|Verb": { exSwe: "Häll vatten i glaset.", exArb: "اسكب الماء في الكوب." },
    "Fyller|Verb": { exSwe: "Fyll glaset.", exArb: "املأ الكوب." },
    "Tömmer|Verb": { exSwe: "Töm soporna.", exArb: "أفرغ القمامة." },
    "Öppnar|Verb": { exSwe: "Öppna dörren.", exArb: "افتح الباب." },
    "Stänger|Verb": { exSwe: "Stäng fönstret.", exArb: "أغلق النافذة." },
    "Låser|Verb": { exSwe: "Lås dörren.", exArb: "أقفل الباب." },
    "Tänder|Verb": { exSwe: "Tänd lampan.", exArb: "أشعل المصباح." },
    "Släcker|Verb": { exSwe: "Släck ljuset.", exArb: "أطفئ النور." }
};

console.log('═══════════════════════════════════════════════════════════════');
console.log('     ADDING EXAMPLES - BATCH 7 (Communication, Entertainment)');
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
