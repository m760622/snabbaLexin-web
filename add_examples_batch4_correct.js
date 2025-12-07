/**
 * ADD EXAMPLES - BATCH 4 (Correct Word Matching)
 * Focus on common nouns that need examples
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
    // HOUSEHOLD ITEMS
    // ==========================================
    "Bord|Substantiv": { exSwe: "Vi äter middag vid bordet.", exArb: "نتناول العشاء على الطاولة." },
    "Stol|Substantiv": { exSwe: "Sitt på stolen.", exArb: "اجلس على الكرسي." },
    "Säng|Substantiv": { exSwe: "Jag sover i sängen.", exArb: "أنام في السرير." },
    "Soffa|Substantiv": { exSwe: "Vi sitter i soffan och tittar på TV.", exArb: "نجلس على الأريكة ونشاهد التلفاز." },
    "Lampa|Substantiv": { exSwe: "Tänd lampan, det är mörkt.", exArb: "أشعل المصباح، الجو مظلم." },
    "Spegel|Substantiv": { exSwe: "Hon tittar i spegeln.", exArb: "تنظر في المرآة." },
    "Gardin|Substantiv": { exSwe: "Dra för gardinerna.", exArb: "أسدل الستائر." },
    "Matta|Substantiv": { exSwe: "Mattan är mjuk.", exArb: "السجادة ناعمة." },
    "Kudde|Substantiv": { exSwe: "Jag sover med två kuddar.", exArb: "أنام بوسادتين." },
    "Täcke|Substantiv": { exSwe: "Täcket håller mig varm.", exArb: "اللحاف يبقيني دافئاً." },
    "Lakan|Substantiv": { exSwe: "Jag byter lakan varje vecka.", exArb: "أغير الشراشف كل أسبوع." },
    "Handduk|Substantiv": { exSwe: "Ta en ren handduk.", exArb: "خذ منشفة نظيفة." },
    "Tvål|Substantiv": { exSwe: "Tvätta händerna med tvål.", exArb: "اغسل يديك بالصابون." },
    "Tandborste|Substantiv": { exSwe: "Jag borstar tänderna med min tandborste.", exArb: "أفرش أسناني بفرشاة أسناني." },
    "Tandkräm|Substantiv": { exSwe: "Tandkrämen är slut.", exArb: "نفد معجون الأسنان." },
    "Kam|Substantiv": { exSwe: "Jag kammar håret.", exArb: "أمشط شعري." },
    "Sax|Substantiv": { exSwe: "Kan jag låna saxen?", exArb: "هل يمكنني استعارة المقص؟" },
    "Nål|Substantiv": { exSwe: "Jag behöver en nål och tråd.", exArb: "أحتاج إبرة وخيط." },
    "Knapp|Substantiv": { exSwe: "Knappen föll av.", exArb: "سقط الزر." },
    "Nyckel|Substantiv": { exSwe: "Jag tappade mina nycklar.", exArb: "أضعت مفاتيحي." },
    "Lås|Substantiv": { exSwe: "Låset är trasigt.", exArb: "القفل معطل." },
    "Klocka|Substantiv": { exSwe: "Vad visar klockan?", exArb: "كم الساعة؟" },
    "Väckarklocka|Substantiv": { exSwe: "Väckarklockan ringer klockan sju.", exArb: "تدق ساعة المنبه الساعة السابعة." },
    "Telefon|Substantiv": { exSwe: "Min telefon är laddad.", exArb: "هاتفي مشحون." },
    "Fjärrkontroll|Substantiv": { exSwe: "Var är fjärrkontrollen?", exArb: "أين جهاز التحكم؟" },

    // ==========================================
    // KITCHEN ITEMS
    // ==========================================
    "Kniv|Substantiv": { exSwe: "Skär brödet med kniven.", exArb: "اقطع الخبز بالسكين." },
    "Gaffel|Substantiv": { exSwe: "Jag äter med gaffel.", exArb: "آكل بالشوكة." },
    "Sked|Substantiv": { exSwe: "Ta en sked soppa.", exArb: "خذ ملعقة من الحساء." },
    "Tallrik|Substantiv": { exSwe: "Lägg maten på tallriken.", exArb: "ضع الطعام على الطبق." },
    "Skål|Substantiv": { exSwe: "Häll mjölk i skålen.", exArb: "اسكب الحليب في الوعاء." },
    "Kopp|Substantiv": { exSwe: "Jag dricker kaffe ur koppen.", exArb: "أشرب القهوة من الفنجان." },
    "Glas|Substantiv": { exSwe: "Fyll glaset med vatten.", exArb: "املأ الكوب بالماء." },
    "Flaska|Substantiv": { exSwe: "Vattenflaskan är tom.", exArb: "زجاجة الماء فارغة." },
    "Burk|Substantiv": { exSwe: "Öppna burken.", exArb: "افتح العلبة." },
    "Kastrull|Substantiv": { exSwe: "Koka vatten i kastrullen.", exArb: "اغلِ الماء في القدر." },
    "Stekpanna|Substantiv": { exSwe: "Stek äggen i stekpannan.", exArb: "اقلِ البيض في المقلاة." },
    "Ugn|Substantiv": { exSwe: "Sätt in kakan i ugnen.", exArb: "ضع الكعكة في الفرن." },
    "Mikrovågsugn|Substantiv": { exSwe: "Värm maten i mikrovågsugnen.", exArb: "سخّن الطعام في الميكروويف." },
    "Kylskåp|Substantiv": { exSwe: "Mjölken står i kylskåpet.", exArb: "الحليب في الثلاجة." },
    "Frys|Substantiv": { exSwe: "Glassen ligger i frysen.", exArb: "الآيس كريم في الفريزر." },
    "Diskmaskin|Substantiv": { exSwe: "Sätt igång diskmaskinen.", exArb: "شغّل غسالة الصحون." },
    "Tvättmaskin|Substantiv": { exSwe: "Kläderna är i tvättmaskinen.", exArb: "الملابس في الغسالة." },
    "Dammsugare|Substantiv": { exSwe: "Jag dammsuger med dammsugaren.", exArb: "أكنس بالمكنسة الكهربائية." },

    // ==========================================
    // ROOMS
    // ==========================================
    "Rum|Substantiv": { exSwe: "Lägenheten har tre rum.", exArb: "الشقة فيها ثلاث غرف." },
    "Kök|Substantiv": { exSwe: "Mamma lagar mat i köket.", exArb: "ماما تطبخ في المطبخ." },
    "Badrum|Substantiv": { exSwe: "Jag duschar i badrummet.", exArb: "أستحم في الحمام." },
    "Sovrum|Substantiv": { exSwe: "Jag sover i sovrummet.", exArb: "أنام في غرفة النوم." },
    "Vardagsrum|Substantiv": { exSwe: "Vi tittar på TV i vardagsrummet.", exArb: "نشاهد التلفاز في غرفة المعيشة." },
    "Hall|Substantiv": { exSwe: "Skorna står i hallen.", exArb: "الأحذية في الردهة." },
    "Balkong|Substantiv": { exSwe: "Vi sitter på balkongen.", exArb: "نجلس على الشرفة." },
    "Garage|Substantiv": { exSwe: "Bilen står i garaget.", exArb: "السيارة في المرآب." },
    "Källare|Substantiv": { exSwe: "Vi förvarar saker i källaren.", exArb: "نخزن الأشياء في القبو." },
    "Vind|Substantiv": { exSwe: "Det finns gamla saker på vinden.", exArb: "توجد أشياء قديمة في العلية." },
    "Trappa|Substantiv": { exSwe: "Gå upp för trappan.", exArb: "اصعد الدرج." },
    "Hiss|Substantiv": { exSwe: "Vi tar hissen till tredje våningen.", exArb: "نأخذ المصعد إلى الطابق الثالث." },
    "Dörr|Substantiv": { exSwe: "Stäng dörren efter dig.", exArb: "أغلق الباب خلفك." },
    "Fönster|Substantiv": { exSwe: "Öppna fönstret för frisk luft.", exArb: "افتح النافذة للهواء النقي." },
    "Vägg|Substantiv": { exSwe: "Tavlan hänger på väggen.", exArb: "اللوحة معلقة على الحائط." },
    "Golv|Substantiv": { exSwe: "Golvet är rent.", exArb: "الأرضية نظيفة." },
    "Tak|Substantiv": { exSwe: "Lampan hänger i taket.", exArb: "المصباح معلق في السقف." },

    // ==========================================
    // NATURE
    // ==========================================
    "Sol|Substantiv": { exSwe: "Solen skiner idag.", exArb: "الشمس مشرقة اليوم." },
    "Måne|Substantiv": { exSwe: "Månen lyser på natten.", exArb: "القمر يضيء في الليل." },
    "Stjärna|Substantiv": { exSwe: "Stjärnorna lyser på himlen.", exArb: "النجوم تلمع في السماء." },
    "Himmel|Substantiv": { exSwe: "Himlen är blå.", exArb: "السماء زرقاء." },
    "Moln|Substantiv": { exSwe: "Det är moln på himlen.", exArb: "هناك غيوم في السماء." },
    "Regn|Substantiv": { exSwe: "Det regnar ute.", exArb: "تمطر في الخارج." },
    "Snö|Substantiv": { exSwe: "Snön är vit.", exArb: "الثلج أبيض." },
    "Is|Substantiv": { exSwe: "Vattnet har blivit is.", exArb: "تحول الماء إلى جليد." },
    "Vind|Substantiv": { exSwe: "Vinden blåser starkt.", exArb: "الريح تهب بقوة." },
    "Storm|Substantiv": { exSwe: "Det kommer en storm ikväll.", exArb: "ستأتي عاصفة الليلة." },
    "Åska|Substantiv": { exSwe: "Jag hör åskan.", exArb: "أسمع الرعد." },
    "Blixt|Substantiv": { exSwe: "Blixten lyser upp himlen.", exArb: "البرق يضيء السماء." },
    "Regnbåge|Substantiv": { exSwe: "Det syns en regnbåge efter regnet.", exArb: "يظهر قوس قزح بعد المطر." },
    "Träd|Substantiv": { exSwe: "Trädet har gröna löv.", exArb: "الشجرة لها أوراق خضراء." },
    "Löv|Substantiv": { exSwe: "Löven faller på hösten.", exArb: "تتساقط الأوراق في الخريف." },
    "Blomma|Substantiv": { exSwe: "Blommorna är vackra.", exArb: "الزهور جميلة." },
    "Gräs|Substantiv": { exSwe: "Gräset är grönt.", exArb: "العشب أخضر." },
    "Buske|Substantiv": { exSwe: "Busken växer i trädgården.", exArb: "الشجيرة تنمو في الحديقة." },
    "Sten|Substantiv": { exSwe: "Jag hittade en sten.", exArb: "وجدت حجراً." },
    "Sand|Substantiv": { exSwe: "Barnen leker i sanden.", exArb: "يلعب الأطفال في الرمال." },
    "Jord|Substantiv": { exSwe: "Plantera fröet i jorden.", exArb: "ازرع البذرة في التربة." },

    // ==========================================
    // ANIMALS
    // ==========================================
    "Hund|Substantiv": { exSwe: "Hunden skäller.", exArb: "الكلب ينبح." },
    "Katt|Substantiv": { exSwe: "Katten jamar.", exArb: "القطة تموء." },
    "Häst|Substantiv": { exSwe: "Hästen springer fort.", exArb: "الحصان يركض بسرعة." },
    "Ko|Substantiv": { exSwe: "Kon ger mjölk.", exArb: "البقرة تعطي الحليب." },
    "Gris|Substantiv": { exSwe: "Grisen bor på gården.", exArb: "الخنزير يعيش في المزرعة." },
    "Höna|Substantiv": { exSwe: "Hönan lägger ägg.", exArb: "الدجاجة تبيض." },
    "Tupp|Substantiv": { exSwe: "Tuppen gal på morgonen.", exArb: "الديك يصيح في الصباح." },
    "Anka|Substantiv": { exSwe: "Ankan simmar i dammen.", exArb: "البطة تسبح في البركة." },
    "Fågel|Substantiv": { exSwe: "Fågeln flyger i himlen.", exArb: "الطائر يطير في السماء." },
    "Fisk|Substantiv": { exSwe: "Fisken simmar i vattnet.", exArb: "السمكة تسبح في الماء." },
    "Björn|Substantiv": { exSwe: "Björnen sover på vintern.", exArb: "الدب ينام في الشتاء." },
    "Varg|Substantiv": { exSwe: "Vargen ylar på natten.", exArb: "الذئب يعوي في الليل." },
    "Räv|Substantiv": { exSwe: "Räven är smart.", exArb: "الثعلب ذكي." },
    "Hare|Substantiv": { exSwe: "Haren hoppar snabbt.", exArb: "الأرنب يقفز بسرعة." },
    "Mus|Substantiv": { exSwe: "Musen är liten.", exArb: "الفأر صغير." },
    "Orm|Substantiv": { exSwe: "Ormen kryper på marken.", exArb: "الأفعى تزحف على الأرض." },
    "Groda|Substantiv": { exSwe: "Grodan hoppar.", exArb: "الضفدع يقفز." },
    "Fjäril|Substantiv": { exSwe: "Fjärilen flyger från blomma till blomma.", exArb: "الفراشة تطير من زهرة إلى زهرة." },
    "Bi|Substantiv": { exSwe: "Biet samlar nektar.", exArb: "النحلة تجمع الرحيق." },
    "Myra|Substantiv": { exSwe: "Myran är flitig.", exArb: "النملة مجتهدة." },
    "Spindel|Substantiv": { exSwe: "Spindeln spinner nät.", exArb: "العنكبوت ينسج شبكة." },

    // ==========================================
    // MORE COMMON VERBS
    // ==========================================
    "Springer|Verb": { exSwe: "Han springer varje morgon.", exArb: "يركض كل صباح." },
    "Hoppar|Verb": { exSwe: "Barnet hoppar av glädje.", exArb: "يقفز الطفل من الفرح." },
    "Klättrar|Verb": { exSwe: "Pojken klättrar i trädet.", exArb: "يتسلق الولد الشجرة." },
    "Dansar|Verb": { exSwe: "Hon dansar vackert.", exArb: "ترقص بشكل جميل." },
    "Sjunger|Verb": { exSwe: "Han sjunger en sång.", exArb: "يغني أغنية." },
    "Spelar|Verb": { exSwe: "Barnen spelar fotboll.", exArb: "يلعب الأطفال كرة القدم." },
    "Leker|Verb": { exSwe: "Barnen leker i parken.", exArb: "يلعب الأطفال في الحديقة." },
    "Ritar|Verb": { exSwe: "Hon ritar en bild.", exArb: "ترسم صورة." },
    "Målar|Verb": { exSwe: "Han målar en tavla.", exArb: "يرسم لوحة." },
    "Skriver|Verb": { exSwe: "Jag skriver ett brev.", exArb: "أكتب رسالة." },
    "Läser|Verb": { exSwe: "Hon läser en bok.", exArb: "تقرأ كتاباً." },
    "Lyssnar|Verb": { exSwe: "Jag lyssnar på musik.", exArb: "أستمع إلى الموسيقى." },
    "Tittar|Verb": { exSwe: "Vi tittar på en film.", exArb: "نشاهد فيلماً." },
    "Hör|Verb": { exSwe: "Jag hör musik.", exArb: "أسمع موسيقى." },
    "Ser|Verb": { exSwe: "Jag ser en fågel.", exArb: "أرى طائراً." },
    "Luktar|Verb": { exSwe: "Blommorna luktar gott.", exArb: "الزهور رائحتها جميلة." },
    "Smakar|Verb": { exSwe: "Kakan smakar gott.", exArb: "الكعكة طعمها لذيذ." },
    "Rör|Verb": { exSwe: "Rör inte vid det!", exArb: "لا تلمس ذلك!" },
    "Ger|Verb": { exSwe: "Jag ger dig en present.", exArb: "أعطيك هدية." },
    "Tar|Verb": { exSwe: "Ta en kaka.", exArb: "خذ كعكة." },
    "Köper|Verb": { exSwe: "Jag köper mat i affären.", exArb: "أشتري الطعام من المتجر." },
    "Säljer|Verb": { exSwe: "Han säljer grönsaker.", exArb: "يبيع الخضروات." },
    "Betalar|Verb": { exSwe: "Jag betalar med kort.", exArb: "أدفع بالبطاقة." },
    "Hjälper|Verb": { exSwe: "Kan du hjälpa mig?", exArb: "هل يمكنك مساعدتي؟" },
    "Försöker|Verb": { exSwe: "Jag försöker lära mig svenska.", exArb: "أحاول تعلم السويدية." },
    "Lär sig|Verb": { exSwe: "Hon lär sig snabbt.", exArb: "تتعلم بسرعة." },
    "Glömmer|Verb": { exSwe: "Jag glömmer aldrig dig.", exArb: "لن أنساك أبداً." },
    "Minns|Verb": { exSwe: "Jag minns min barndom.", exArb: "أتذكر طفولتي." },
    "Tycker om|Verb": { exSwe: "Jag tycker om glass.", exArb: "أحب الآيس كريم." },
    "Älskar|Verb": { exSwe: "Jag älskar min familj.", exArb: "أحب عائلتي." },
    "Hatar|Verb": { exSwe: "Han hatar att vänta.", exArb: "يكره الانتظار." },
    "Skrattar|Verb": { exSwe: "Vi skrattar tillsammans.", exArb: "نضحك معاً." },
    "Gråter|Verb": { exSwe: "Bebisen gråter.", exArb: "الطفل يبكي." },
    "Ler|Verb": { exSwe: "Hon ler mot mig.", exArb: "تبتسم لي." },
    "Pratar|Verb": { exSwe: "Vi pratar svenska.", exArb: "نتحدث السويدية." },
    "Säger|Verb": { exSwe: "Vad säger du?", exArb: "ماذا تقول؟" },
    "Frågar|Verb": { exSwe: "Jag frågar dig en sak.", exArb: "أسألك شيئاً." },
    "Svarar|Verb": { exSwe: "Han svarar på frågan.", exArb: "يجيب على السؤال." }
};

console.log('═══════════════════════════════════════════════════════════════');
console.log('     ADDING EXAMPLES - BATCH 4 (Nouns & Verbs)');
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
