/**
 * ADD MISSING WORDS TO DICTIONARY
 * These are words that were "not found" during example adding
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

// List of missing words collected from all batches
const missingWords = [
    // Common everyday words
    {
        swe: "Busschaufför", arb: "سائق الحافلة", type: "Substantiv", gender: "en",
        forms: "busschaufför, busschauffören, busschaufförer",
        exSwe: "Busschauffören kör bussen.", exArb: "سائق الحافلة يقود الحافلة."
    },

    {
        swe: "Brandman", arb: "رجل إطفاء", type: "Substantiv", gender: "en",
        forms: "brandman, brandmannen, brandmän",
        exSwe: "Brandmannen släcker elden.", exArb: "رجل الإطفاء يُطفئ النار."
    },

    {
        swe: "Brandbil", arb: "سيارة إطفاء", type: "Substantiv", gender: "en",
        forms: "brandbil, brandbilen, brandbilar",
        exSwe: "Brandbilen har sirener.", exArb: "سيارة الإطفاء لديها صفارات."
    },

    {
        swe: "Polisbil", arb: "سيارة شرطة", type: "Substantiv", gender: "en",
        forms: "polisbil, polisbilen, polisbilar",
        exSwe: "Polisbilen patrullerar.", exArb: "سيارة الشرطة تقوم بدورية."
    },

    {
        swe: "Vårdcentral", arb: "مركز صحي", type: "Substantiv", gender: "en",
        forms: "vårdcentral, vårdcentralen, vårdcentraler",
        exSwe: "Boka tid på vårdcentralen.", exArb: "احجز موعداً في المركز الصحي."
    },

    {
        swe: "Supermarket", arb: "سوبرماركت", type: "Substantiv", gender: "en",
        forms: "supermarket, supermarketen, supermarketer",
        exSwe: "Vi köper mat i supermarketen.", exArb: "نشتري الطعام من السوبرماركت."
    },

    {
        swe: "Magont", arb: "ألم بطن", type: "Substantiv", gender: "ett",
        forms: "magont, magontet",
        exSwe: "Han har magont.", exArb: "لديه ألم في البطن."
    },

    {
        swe: "Blodtryck", arb: "ضغط دم", type: "Substantiv", gender: "ett",
        forms: "blodtryck, blodtrycket",
        exSwe: "Mitt blodtryck är normalt.", exArb: "ضغط دمي طبيعي."
    },

    {
        swe: "E-post", arb: "بريد إلكتروني", type: "Substantiv", gender: "en",
        forms: "e-post, e-posten",
        exSwe: "Skicka ett e-postmeddelande.", exArb: "أرسل بريداً إلكترونياً."
    },

    {
        swe: "Hemsida", arb: "موقع إلكتروني", type: "Substantiv", gender: "en",
        forms: "hemsida, hemsidan, hemsidor",
        exSwe: "Besök vår hemsida.", exArb: "زُر موقعنا الإلكتروني."
    },

    {
        swe: "Tangentbord", arb: "لوحة مفاتيح", type: "Substantiv", gender: "ett",
        forms: "tangentbord, tangentbordet, tangentbord",
        exSwe: "Jag skriver på tangentbordet.", exArb: "أكتب على لوحة المفاتيح."
    },

    {
        swe: "Simning", arb: "سباحة", type: "Substantiv", gender: "en",
        forms: "simning, simningen",
        exSwe: "Simning är bra träning.", exArb: "السباحة تمرين جيد."
    },

    {
        swe: "Tågstation", arb: "محطة قطار", type: "Substantiv", gender: "en",
        forms: "tågstation, tågstationen, tågstationer",
        exSwe: "Vi möts på tågstationen.", exArb: "نتقابل في محطة القطار."
    },

    {
        swe: "Busstation", arb: "محطة حافلات", type: "Substantiv", gender: "en",
        forms: "busstation, busstationen, busstationer",
        exSwe: "Busstationen är nära.", exArb: "محطة الحافلات قريبة."
    },

    {
        swe: "Parkeringsplats", arb: "موقف سيارات", type: "Substantiv", gender: "en",
        forms: "parkeringsplats, parkeringsplatsen, parkeringsplatser",
        exSwe: "Jag hittade en parkeringsplats.", exArb: "وجدت موقفاً للسيارة."
    },

    {
        swe: "Tankstation", arb: "محطة وقود", type: "Substantiv", gender: "en",
        forms: "tankstation, tankstationen, tankstationer",
        exSwe: "Vi stannar vid tankstationen.", exArb: "نتوقف عند محطة الوقود."
    },

    {
        swe: "Bebis", arb: "رضيع", type: "Substantiv", gender: "en",
        forms: "bebis, bebisen, bebisar",
        exSwe: "Bebisen sover.", exArb: "الرضيع نائم."
    },

    {
        swe: "Vuxen", arb: "بالغ", type: "Substantiv", gender: "en",
        forms: "vuxen, vuxna",
        exSwe: "Vuxna arbetar.", exArb: "البالغون يعملون."
    },

    {
        swe: "Strumpor", arb: "جوارب", type: "Substantiv", gender: "en",
        forms: "strumpa, strumpan, strumpor",
        exSwe: "Jag köpte nya strumpor.", exArb: "اشتريت جوارب جديدة."
    },

    {
        swe: "Tofflor", arb: "شباشب", type: "Substantiv", gender: "en",
        forms: "toffla, tofflan, tofflor",
        exSwe: "Jag har tofflor hemma.", exArb: "لدي شباشب في البيت."
    },

    {
        swe: "Sandaler", arb: "صنادل", type: "Substantiv", gender: "en",
        forms: "sandal, sandalen, sandaler",
        exSwe: "Jag bär sandaler på sommaren.", exArb: "أرتدي الصنادل في الصيف."
    },

    {
        swe: "Nödutgång", arb: "مخرج طوارئ", type: "Substantiv", gender: "en",
        forms: "nödutgång, nödutgången, nödutgångar",
        exSwe: "Nödutgången är där.", exArb: "مخرج الطوارئ هناك."
    },

    {
        swe: "Häftapparat", arb: "دباسة", type: "Substantiv", gender: "en",
        forms: "häftapparat, häftapparaten, häftapparater",
        exSwe: "Lägg tillbaka häftapparaten.", exArb: "أعد الدباسة إلى مكانها."
    },

    {
        swe: "Anteckningsbok", arb: "دفتر ملاحظات", type: "Substantiv", gender: "en",
        forms: "anteckningsbok, anteckningsboken, anteckningsböcker",
        exSwe: "Jag skriver i min anteckningsbok.", exArb: "أكتب في دفتر ملاحظاتي."
    },

    {
        swe: "Vattenkanna", arb: "إبريق ماء", type: "Substantiv", gender: "en",
        forms: "vattenkanna, vattenkannan, vattenkannor",
        exSwe: "Fyll vattenkannan.", exArb: "املأ إبريق الماء."
    },

    {
        swe: "Hostmedicin", arb: "دواء سعال", type: "Substantiv", gender: "en",
        forms: "hostmedicin, hostmedicinen",
        exSwe: "Ta hostmedicin.", exArb: "تناول دواء السعال."
    },

    {
        swe: "Värktablett", arb: "مسكن", type: "Substantiv", gender: "en",
        forms: "värktablett, värktabletten, värktabletter",
        exSwe: "Ta en värktablett.", exArb: "تناول مسكناً."
    },

    {
        swe: "Gungstol", arb: "كرسي هزاز", type: "Substantiv", gender: "en",
        forms: "gungstol, gungstolen, gungstolar",
        exSwe: "Farfar sitter i gungstolen.", exArb: "جدي يجلس في الكرسي الهزاز."
    },

    {
        swe: "Översvämning", arb: "فيضان", type: "Substantiv", gender: "en",
        forms: "översvämning, översvämningen, översvämningar",
        exSwe: "Översvämningen förstörde huset.", exArb: "الفيضان دمر البيت."
    },

    {
        swe: "Kex", arb: "بسكويت", type: "Substantiv", gender: "ett",
        forms: "kex, kexet, kex",
        exSwe: "Ta ett kex.", exArb: "خذ بسكويتة."
    },

    {
        swe: "Nötter", arb: "مكسرات", type: "Substantiv", gender: "en",
        forms: "nöt, nöten, nötter",
        exSwe: "Jag äter nötter.", exArb: "آكل المكسرات."
    },

    {
        swe: "Öl", arb: "بيرة", type: "Substantiv", gender: "en",
        forms: "öl, ölen, öl",
        exSwe: "Han dricker öl.", exArb: "يشرب البيرة."
    },

    {
        swe: "Kryddor", arb: "توابل", type: "Substantiv", gender: "en",
        forms: "krydda, kryddan, kryddor",
        exSwe: "Tillsätt kryddor.", exArb: "أضف التوابل."
    },

    {
        swe: "Skidåkning", arb: "تزلج", type: "Substantiv", gender: "en",
        forms: "skidåkning, skidåkningen",
        exSwe: "Skidåkning är kul.", exArb: "التزلج ممتع."
    },

    {
        swe: "Yoga", arb: "يوغا", type: "Substantiv", gender: "en",
        forms: "yoga, yogan",
        exSwe: "Yoga är avslappnande.", exArb: "اليوغا مريحة."
    },

    {
        swe: "Bakning", arb: "خَبز", type: "Substantiv", gender: "en",
        forms: "bakning, bakningen",
        exSwe: "Jag älskar bakning.", exArb: "أحب الخَبْز."
    },

    {
        swe: "Böter", arb: "غرامة", type: "Substantiv", gender: "en",
        forms: "böter, böterna",
        exSwe: "Han fick böter.", exArb: "حصل على غرامة."
    },

    {
        swe: "Agenda", arb: "جدول أعمال", type: "Substantiv", gender: "en",
        forms: "agenda, agendan, agendor",
        exSwe: "Vad står på agendan idag?", exArb: "ما الذي في جدول الأعمال اليوم؟"
    },

    {
        swe: "Algoritm", arb: "خوارزمية", type: "Substantiv", gender: "en",
        forms: "algoritm, algoritmen, algoritmer",
        exSwe: "Datorn använder algoritmer.", exArb: "الكمبيوتر يستخدم الخوارزميات."
    },

    {
        swe: "Ambition", arb: "طموح", type: "Substantiv", gender: "en",
        forms: "ambition, ambitionen, ambitioner",
        exSwe: "Han har stor ambition.", exArb: "لديه طموح كبير."
    }
];

console.log('═══════════════════════════════════════════════════════════════');
console.log('     ADDING MISSING WORDS TO DICTIONARY');
console.log('═══════════════════════════════════════════════════════════════\n');

let addedCount = 0;
let alreadyExists = 0;
let nextId = 100000;

for (const word of missingWords) {
    // Check if word already exists
    const exists = dictionaryData.some(entry =>
        entry[2] && entry[2].toLowerCase() === word.swe.toLowerCase()
    );

    if (exists) {
        alreadyExists++;
        console.log(`⚠️  Already exists: ${word.swe}`);
    } else {
        const newEntry = [
            'ADDED' + nextId++,
            word.type + '.',
            word.swe,
            word.arb,
            word.forms,
            '',
            '',
            word.exSwe,
            word.exArb,
            '',
            '',
            '',
            '',
            word.gender,
            ''
        ];
        dictionaryData.push(newEntry);
        addedCount++;
        console.log(`✓ Added: ${word.swe} (${word.arb})`);
    }
}

const newDataStr = 'const dictionaryData = ' + JSON.stringify(dictionaryData, null, 4) + ';';
fs.writeFileSync('./data.js', newDataStr);

console.log('\n═══════════════════════════════════════════════════════════════');
console.log(`✅ Words added: ${addedCount}`);
console.log(`⚠️  Already existed: ${alreadyExists}`);
console.log(`📊 Total attempted: ${missingWords.length}`);
console.log(`📚 New dictionary size: ${dictionaryData.length} entries`);
console.log('═══════════════════════════════════════════════════════════════');
