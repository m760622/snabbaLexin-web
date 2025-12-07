/**
 * ADD EXAMPLES - RARE WORDS BATCH 2
 * Focus on useful rare nouns and adjectives
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
    // USEFUL RARE NOUNS
    // ==========================================
    "Abonnemang|Substantiv": { exSwe: "Jag har ett telefonabonnemang.", exArb: "لدي اشتراك هاتف." },
    "Abstinens|Substantiv": { exSwe: "Han lider av abstinens.", exArb: "يعاني من أعراض الانسحاب." },
    "Adamsäpple|Substantiv": { exSwe: "Adamsäpplet syns på halsen.", exArb: "تفاحة آدم تظهر في الرقبة." },
    "Addition|Substantiv": { exSwe: "Addition är en matematisk operation.", exArb: "الجمع عملية حسابية." },
    "Affisch|Substantiv": { exSwe: "Sätt upp affischen på väggen.", exArb: "علّق الملصق على الحائط." },
    "Agenda|Substantiv": { exSwe: "Vad står på agendan idag?", exArb: "ما الذي في جدول الأعمال اليوم؟" },
    "Aggression|Substantiv": { exSwe: "Aggression är inte lösningen.", exArb: "العدوان ليس الحل." },
    "Akademi|Substantiv": { exSwe: "Han studerar vid akademin.", exArb: "يدرس في الأكاديمية." },
    "Aktie|Substantiv": { exSwe: "Han köpte aktier i företaget.", exArb: "اشترى أسهماً في الشركة." },
    "Aktivist|Substantiv": { exSwe: "Aktivisten kämpar för rättvisa.", exArb: "الناشط يناضل من أجل العدالة." },
    "Algoritm|Substantiv": { exSwe: "Datorn använder algoritmer.", exArb: "الكمبيوتر يستخدم الخوارزميات." },
    "Alibi|Substantiv": { exSwe: "Han har ett alibi.", exArb: "لديه عذر غياب." },
    "Allians|Substantiv": { exSwe: "Länderna bildade en allians.", exArb: "الدول شكلت تحالفاً." },
    "Almanacka|Substantiv": { exSwe: "Skriv in mötet i almanackan.", exArb: "اكتب الاجتماع في المذكرة." },
    "Alternativ|Substantiv": { exSwe: "Finns det andra alternativ?", exArb: "هل توجد بدائل أخرى?" },
    "Altruism|Substantiv": { exSwe: "Altruism är osjälviskhet.", exArb: "الإيثار هو نكران الذات." },
    "Ambassador|Substantiv": { exSwe: "Ambassadören representerar landet.", exArb: "السفير يمثل البلد." },
    "Ambition|Substantiv": { exSwe: "Han har stor ambition.", exArb: "لديه طموح كبير." },
    "Ande|Substantiv": { exSwe: "Den onda anden.", exArb: "الروح الشريرة." },
    "Andel|Substantiv": { exSwe: "Min andel är 50%.", exArb: "حصتي 50%." },
    "Andning|Substantiv": { exSwe: "Kontrollera patientens andning.", exArb: "تحقق من تنفس المريض." },
    "Anfall|Substantiv": { exSwe: "Han fick ett hjärtanfall.", exArb: "أصيب بنوبة قلبية." },
    "Anklagelse|Substantiv": { exSwe: "Anklagelsen var falsk.", exArb: "التهمة كانت باطلة." },
    "Anledning|Substantiv": { exSwe: "Av vilken anledning?", exArb: "بأي سبب؟" },
    "Anlöpning|Substantiv": { exSwe: "Glaset har anlöpning.", exArb: "الزجاج به بخار متكثف." },
    "Anmälan|Substantiv": { exSwe: "Fyll i anmälan.", exArb: "املأ استمارة التسجيل." },
    "Anställning|Substantiv": { exSwe: "Han fick en anställning.", exArb: "حصل على وظيفة." },
    "Antenn|Substantiv": { exSwe: "TV-antennen är trasig.", exArb: "هوائي التلفزيون معطل." },
    "Antiseptika|Substantiv": { exSwe: "Använd antiseptika på såret.", exArb: "استخدم مطهراً على الجرح." },
    "Äventyr|Substantiv": { exSwe: "De gav sig ut på äventyr.", exArb: "انطلقوا في مغامرة." },
    "Apparat|Substantiv": { exSwe: "Sätt på apparaten.", exArb: "شغّل الجهاز." },
    "Aptit|Substantiv": { exSwe: "Jag har ingen aptit.", exArb: "ليس لدي شهية." },
    "Arbetsbelastning|Substantiv": { exSwe: "Arbetsbelastningen är hög.", exArb: "ضغط العمل عالٍ." },
    "Arbetsgivare|Substantiv": { exSwe: "Min arbetsgivare är snäll.", exArb: "صاحب عملي لطيف." },
    "Arkitekt|Substantiv": { exSwe: "Arkitekten ritade huset.", exArb: "المهندس المعماري صمم البيت." },
    "Armhåla|Substantiv": { exSwe: "Mät temperaturen i armhålan.", exArb: "قِس الحرارة في الإبط." },
    "Atmosfär|Substantiv": { exSwe: "Atmosfären är trevlig.", exArb: "الجو لطيف." },
    "Attraktion|Substantiv": { exSwe: "Parken har många attraktioner.", exArb: "الحديقة فيها معالم جذب كثيرة." },
    "Auktion|Substantiv": { exSwe: "Tavlan såldes på auktion.", exArb: "اللوحة بيعت في مزاد." },
    "Automatik|Substantiv": { exSwe: "Bilen har automatik.", exArb: "السيارة أوتوماتيك." },
    "Avbrott|Substantiv": { exSwe: "Det blev ett strömavbrott.", exArb: "حدث انقطاع في الكهرباء." },
    "Aversion|Substantiv": { exSwe: "Han har en aversion mot ormar.", exArb: "لديه نفور من الأفاعي." },
    "Avgrund|Substantiv": { exSwe: "Han föll ner i avgrunden.", exArb: "سقط في الهاوية." },
    "Avkastning|Substantiv": { exSwe: "Investeringens avkastning är god.", exArb: "عائد الاستثمار جيد." },
    "Avlopp|Substantiv": { exSwe: "Avloppet är igensatt.", exArb: "الصرف مسدود." },
    "Avsikt|Substantiv": { exSwe: "Vad var din avsikt?", exArb: "ما كان قصدك؟" },
    "Avslut|Substantiv": { exSwe: "Det var ett bra avslut.", exArb: "كانت نهاية جيدة." },
    "Avstängning|Substantiv": { exSwe: "Han fick en avstängning.", exArb: "حصل على إيقاف." },
    "Avtryck|Substantiv": { exSwe: "Han lämnade ett avtryck.", exArb: "ترك بصمة." },
    "Axel|Substantiv": { exSwe: "Jag har ont i axeln.", exArb: "يؤلمني كتفي." },

    // ==========================================
    // USEFUL RARE ADJECTIVES
    // ==========================================
    "Abnorm|Adjektiv": { exSwe: "Beteendet är abnormt.", exArb: "السلوك غير طبيعي." },
    "Abrupt|Adjektiv": { exSwe: "Han gjorde en abrupt förändring.", exArb: "أجرى تغييراً مفاجئاً." },
    "Abstrakt|Adjektiv": { exSwe: "Det är ett abstrakt koncept.", exArb: "هذا مفهوم تجريدي." },
    "Adekvat|Adjektiv": { exSwe: "Svaret var adekvat.", exArb: "الإجابة كانت ملائمة." },
    "Afrikansk|Adjektiv": { exSwe: "Afrikansk musik är rytmisk.", exArb: "الموسيقى الأفريقية إيقاعية." },
    "Aktsam|Adjektiv": { exSwe: "Var aktsam med glaset.", exArb: "كن حذراً مع الكوب." },
    "Alarmerande|Adjektiv": { exSwe: "Situationen är alarmerande.", exArb: "الوضع مقلق." },
    "Algerisk|Adjektiv": { exSwe: "Han lagar algerisk mat.", exArb: "يطبخ طعاماً جزائرياً." },
    "Alkoholhaltig|Adjektiv": { exSwe: "Drycken är alkoholhaltig.", exArb: "المشروب كحولي." },
    "Allmänbildad|Adjektiv": { exSwe: "Hon är välutbildad och allmänbildad.", exArb: "هي متعلمة ومثقفة." },
    "Allergisk|Adjektiv": { exSwe: "Jag är allergisk mot nötter.", exArb: "أنا حساس للمكسرات." },
    "Anagrammatisk|Adjektiv": { exSwe: "Det är ett anagrammatiskt ord.", exArb: "هذه كلمة جناسية." },
    "Analog|Adjektiv": { exSwe: "Klockan är analog.", exArb: "الساعة تناظرية." },
    "Anatomisk|Adjektiv": { exSwe: "Detta är en anatomisk modell.", exArb: "هذا نموذج تشريحي." },
    "Anonym|Adjektiv": { exSwe: "Brevet var anonymt.", exArb: "الرسالة كانت مجهولة." },
    "Ansvarig|Adjektiv": { exSwe: "Vem är ansvarig?", exArb: "من المسؤول؟" },
    "Antikverad|Adjektiv": { exSwe: "Systemet är antikverat.", exArb: "النظام قديم وعفا عليه الزمن." },
    "Arabisk|Adjektiv": { exSwe: "Han talar arabiska.", exArb: "يتحدث العربية." },
    "Argentinsk|Adjektiv": { exSwe: "Argentinskt nötkött är känt.", exArb: "لحم البقر الأرجنتيني مشهور." },
    "Aritmetisk|Adjektiv": { exSwe: "Det är en aritmetisk beräkning.", exArb: "هذه حسابية." },
    "Arkitektonisk|Adjektiv": { exSwe: "Byggnaden har arkitektoniskt värde.", exArb: "المبنى له قيمة معمارية." },
    "Artificiell|Adjektiv": { exSwe: "Artificiell intelligens.", exArb: "ذكاء اصطناعي." },
    "Asiatisk|Adjektiv": { exSwe: "Asiatisk mat är populär.", exArb: "الطعام الآسيوي شائع." },
    "Astronomisk|Adjektiv": { exSwe: "Priset är astronomiskt.", exArb: "السعر فلكي (مرتفع جداً)." },
    "Atletisk|Adjektiv": { exSwe: "Han har en atletisk kropp.", exArb: "لديه جسم رياضي." },
    "Australisk|Adjektiv": { exSwe: "Hon är australisk.", exArb: "هي أسترالية." },
    "Autentisk|Adjektiv": { exSwe: "Dokumentet är autentiskt.", exArb: "الوثيقة أصلية." },
    "Automatisk|Adjektiv": { exSwe: "Dörren är automatisk.", exArb: "الباب أوتوماتيكي." },
    "Avancerad|Adjektiv": { exSwe: "Det är en avancerad teknik.", exArb: "هذه تقنية متقدمة." },
    "Avlägsen|Adjektiv": { exSwe: "Byn ligger avlägset.", exArb: "القرية نائية." },

    // ==========================================
    // MORE USEFUL VERBS (Continuation)
    // ==========================================
    "Jonglerar|Verb": { exSwe: "Clownen jonglerar med bollar.", exArb: "المهرج يلعب بكرات." },
    "Jublar|Verb": { exSwe: "Publiken jublade.", exArb: "الجمهور هتف." },
    "Kamuflerar|Verb": { exSwe: "Soldaten kamuflerar sig.", exArb: "الجندي يتمويه." },
    "Kandiderar|Verb": { exSwe: "Hon kandiderar till posten.", exArb: "تترشح للمنصب." },
    "Kapitulerar|Verb": { exSwe: "Armén kapitulerade.", exArb: "الجيش استسلم." },
    "Karakteriserar|Verb": { exSwe: "Mod karakteriserar honom.", exArb: "الشجاعة تميزه." },
    "Katalogiserar|Verb": { exSwe: "Vi katalogiserar böckerna.", exArb: "نفهرس الكتب." },
    "Klamrar|Verb": { exSwe: "Barnet klamrar sig fast.", exArb: "الطفل يتشبث." },
    "Klamrar|Verb": { exSwe: "Barnet klamrar sig fast.", exArb: "الطفل يتشبث." },
    "Klipper|Verb": { exSwe: "Frisören klipper håret.", exArb: "الحلاق يقص الشعر." },
    "Klirrar|Verb": { exSwe: "Glasen klirrar.", exArb: "الأكواب تصدر رنيناً." },
    "Kliver|Verb": { exSwe: "Han kliver över staketet.", exArb: "يتجاوز السياج." },
    "Klonar|Verb": { exSwe: "Forskarna klonar djur.", exArb: "الباحثون يستنسخون الحيوانات." },
    "Knackar|Verb": { exSwe: "Han knackar på dörren.", exArb: "يطرق الباب." },
    "Knarrar|Verb": { exSwe: "Dörren knarrar.", exArb: "الباب يصرّ." },
    "Knycker|Verb": { exSwe: "Han knycker till sig väskan.", exArb: "يخطف الحقيبة." },
    "Koagulerar|Verb": { exSwe: "Blodet koagulerar.", exArb: "الدم يتخثر." },
    "Kollapsar|Verb": { exSwe: "Byggnaden kollapsade.", exArb: "انهار المبنى." },
    "Kombinerar|Verb": { exSwe: "Vi kombinerar de två metoderna.", exArb: "نجمع الطريقتين." },
    "Kommenderar|Verb": { exSwe: "Generalen kommenderar trupperna.", exArb: "الجنرال يقود القوات." },
    "Kommentererar|Verb": { exSwe: "Han kommenterar nyheten.", exArb: "يعلق على الخبر." },
    "Kommunicerar|Verb": { exSwe: "Vi kommunicerar via telefon.", exArb: "نتواصل عبر الهاتف." },
    "Kompenserar|Verb": { exSwe: "Företaget kompenserar kunden.", exArb: "الشركة تعوض الزبون." },
    "Komponerar|Verb": { exSwe: "Han komponerar musik.", exArb: "يؤلف الموسيقى." },
    "Kompromissar|Verb": { exSwe: "De kompromissar om priset.", exArb: "يتوصلون لحل وسط حول السعر." },
    "Koncentrerar|Verb": { exSwe: "Jag koncentrerar mig.", exArb: "أركز." },
    "Konfiskerar|Verb": { exSwe: "Polisen konfiskerar varorna.", exArb: "الشرطة تصادر البضائع." },
    "Konfronterar|Verb": { exSwe: "Hon konfronterar sin rädsla.", exArb: "تواجه خوفها." },
    "Konkurrerar|Verb": { exSwe: "Företagen konkurrerar.", exArb: "الشركات تتنافس." },
    "Konserverar|Verb": { exSwe: "Vi konserverar grönsaker.", exArb: "نحفظ الخضروات." },
    "Konsumerar|Verb": { exSwe: "Vi konsumerar för mycket.", exArb: "نستهلك كثيراً." }
};

console.log('═══════════════════════════════════════════════════════════════');
console.log('     ADDING EXAMPLES - RARE WORDS BATCH 2 (Nouns + Adjectives)');
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
