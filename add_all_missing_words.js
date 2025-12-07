/**
 * ADD ALL REMAINING MISSING WORDS TO DICTIONARY
 * Complete list of words that were "not found" during all example adding sessions
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

// Complete list of all missing words from all batches
const missingWords = [
    // Time adverbs - missed
    {
        swe: "Idag", arb: "اليوم", type: "Adverb", gender: "",
        forms: "idag",
        exSwe: "Idag är det soligt.", exArb: "اليوم الجو مشمس."
    },

    {
        swe: "Imorgon", arb: "غداً", type: "Adverb", gender: "",
        forms: "imorgon",
        exSwe: "Imorgon åker jag till Malmö.", exArb: "غداً سأذهب إلى مالمو."
    },

    // Reflexive verbs - missed (compound forms)
    {
        swe: "Klär sig", arb: "يرتدي ملابسه", type: "Verb", gender: "",
        forms: "klär sig, klädde sig, klätt sig",
        exSwe: "Han klär sig snabbt.", exArb: "يلبس بسرعة."
    },

    {
        swe: "Tvättar sig", arb: "يغتسل", type: "Verb", gender: "",
        forms: "tvättar sig, tvättade sig, tvättat sig",
        exSwe: "Jag tvättar mig varje morgon.", exArb: "أغسل نفسي كل صباح."
    },

    {
        swe: "Rakar sig", arb: "يحلق ذقنه", type: "Verb", gender: "",
        forms: "rakar sig, rakade sig, rakat sig",
        exSwe: "Han rakar sig varje dag.", exArb: "يحلق ذقنه كل يوم."
    },

    {
        swe: "Sminkar sig", arb: "تضع مكياجها", type: "Verb", gender: "",
        forms: "sminkar sig, sminkade sig, sminkat sig",
        exSwe: "Hon sminkar sig.", exArb: "تضع مكياجها."
    },

    {
        swe: "Biktar sig", arb: "يعترف", type: "Verb", gender: "",
        forms: "biktar sig, biktade sig, biktat sig",
        exSwe: "Han biktar sig inför prästen.", exArb: "يعترف أمام القسيس."
    },

    {
        swe: "Snyter sig", arb: "ينظف أنفه", type: "Verb", gender: "",
        forms: "snyter sig, snöt sig, snutit sig",
        exSwe: "Jag snyter mig.", exArb: "أنظف أنفي."
    },

    {
        swe: "Kommer ihåg", arb: "يتذكر", type: "Verb", gender: "",
        forms: "kommer ihåg, kom ihåg, kommit ihåg",
        exSwe: "Jag kommer ihåg dig.", exArb: "أتذكرك."
    },

    {
        swe: "Ber om ursäkt", arb: "يعتذر", type: "Verb", gender: "",
        forms: "ber om ursäkt, bad om ursäkt, bett om ursäkt",
        exSwe: "Jag ber om ursäkt.", exArb: "أعتذر."
    },

    // Compound verbs - missed
    {
        swe: "Lagar mat", arb: "يطبخ", type: "Verb", gender: "",
        forms: "lagar mat, lagade mat, lagat mat",
        exSwe: "Mamma lagar mat.", exArb: "ماما تطبخ الطعام."
    },

    {
        swe: "Packar upp", arb: "يفتح الأمتعة", type: "Verb", gender: "",
        forms: "packar upp, packade upp, packat upp",
        exSwe: "Vi packar upp presenterna.", exArb: "نفتح الهدايا."
    },

    {
        swe: "Beror på", arb: "يعتمد على", type: "Verb", gender: "",
        forms: "beror på, berodde på, berott på",
        exSwe: "Det beror på.", exArb: "هذا يعتمد."
    },

    // Sports & Hobbies - missed
    {
        swe: "Skridskoåkning", arb: "تزلج على الجليد", type: "Substantiv", gender: "en",
        forms: "skridskoåkning, skridskoåkningen",
        exSwe: "Skridskoåkning är roligt.", exArb: "التزلج على الجليد ممتع."
    },

    {
        swe: "Ridning", arb: "ركوب الخيل", type: "Substantiv", gender: "en",
        forms: "ridning, ridningen",
        exSwe: "Hon gillar ridning.", exArb: "تحب ركوب الخيل."
    },

    {
        swe: "Cykling", arb: "ركوب الدراجة", type: "Substantiv", gender: "en",
        forms: "cykling, cyklingen",
        exSwe: "Cykling är bra motion.", exArb: "ركوب الدراجة رياضة جيدة."
    },

    {
        swe: "Gympa", arb: "جمباز", type: "Substantiv", gender: "en",
        forms: "gympa, gympan",
        exSwe: "Jag går på gympa.", exArb: "أذهب للجمباز."
    },

    {
        swe: "Trädgårdsarbete", arb: "عمل الحديقة", type: "Substantiv", gender: "ett",
        forms: "trädgårdsarbete, trädgårdsarbetet",
        exSwe: "Jag gillar trädgårdsarbete.", exArb: "أحب العمل في الحديقة."
    },

    // Vehicle parts - missed
    {
        swe: "Bagageutrymme", arb: "صندوق السيارة", type: "Substantiv", gender: "ett",
        forms: "bagageutrymme, bagageutrymmet",
        exSwe: "Väskan ligger i bagageutrymmet.", exArb: "الحقيبة في صندوق السيارة."
    },

    // Emotions - missed
    {
        swe: "Överraskad", arb: "مفاجأ", type: "Adjektiv", gender: "",
        forms: "överraskad, överraskat, överraskade",
        exSwe: "Jag blev överraskad.", exArb: "فوجئت."
    },

    {
        swe: "Fundersam", arb: "متأمل", type: "Adjektiv", gender: "",
        forms: "fundersam, fundersamt, fundersamma",
        exSwe: "Hon är fundersam.", exArb: "هي متأملة."
    },

    {
        swe: "Avslappnad", arb: "مسترخي", type: "Adjektiv", gender: "",
        forms: "avslappnad, avslappnat, avslappnade",
        exSwe: "Jag känner mig avslappnad.", exArb: "أشعر بالاسترخاء."
    },

    {
        swe: "Inspirerad", arb: "ملهم", type: "Adjektiv", gender: "",
        forms: "inspirerad, inspirerat, inspirerade",
        exSwe: "Jag är inspirerad.", exArb: "أنا ملهم."
    },

    {
        swe: "Förväntansfull", arb: "متحمس", type: "Adjektiv", gender: "",
        forms: "förväntansfull, förväntansfullt, förväntansfulla",
        exSwe: "Barnen är förväntansfulla.", exArb: "الأطفال متحمسون."
    },

    {
        swe: "Besvärad", arb: "منزعج", type: "Adjektiv", gender: "",
        forms: "besvärad, besvarat, besvärade",
        exSwe: "Han ser besvärad ut.", exArb: "يبدو منزعجاً."
    },

    // More adjectives - missed
    {
        swe: "Alkoholhaltig", arb: "كحولي", type: "Adjektiv", gender: "",
        forms: "alkoholhaltig, alkoholhaltigt, alkoholhaltiga",
        exSwe: "Drycken är alkoholhaltig.", exArb: "المشروب كحولي."
    },

    {
        swe: "Anatomisk", arb: "تشريحي", type: "Adjektiv", gender: "",
        forms: "anatomisk, anatomiskt, anatomiska",
        exSwe: "Detta är en anatomisk modell.", exArb: "هذا نموذج تشريحي."
    },

    {
        swe: "Arabisk", arb: "عربي", type: "Adjektiv", gender: "",
        forms: "arabisk, arabiskt, arabiska",
        exSwe: "Han talar arabiska.", exArb: "يتحدث العربية."
    },

    {
        swe: "Astronomisk", arb: "فلكي", type: "Adjektiv", gender: "",
        forms: "astronomisk, astronomiskt, astronomiska",
        exSwe: "Priset är astronomiskt.", exArb: "السعر فلكي (مرتفع جداً)."
    },

    {
        swe: "Atletisk", arb: "رياضي", type: "Adjektiv", gender: "",
        forms: "atletisk, atletiskt, atletiska",
        exSwe: "Han har en atletisk kropp.", exArb: "لديه جسم رياضي."
    },

    // More verbs missed
    {
        swe: "Bugar", arb: "ينحني", type: "Verb", gender: "",
        forms: "bugar, bugade, bugat",
        exSwe: "Artisten bugar för publiken.", exArb: "الفنان ينحني للجمهور."
    },

    {
        swe: "Faxar", arb: "يرسل فاكس", type: "Verb", gender: "",
        forms: "faxar, faxade, faxat",
        exSwe: "Jag faxar dokumentet.", exArb: "أرسل الوثيقة بالفاكس."
    },

    {
        swe: "Flirtar", arb: "يغازل", type: "Verb", gender: "",
        forms: "flirtar, flirtade, flirtat",
        exSwe: "Han flirtar med henne.", exArb: "يغازلها."
    },

    {
        swe: "Fokuserar", arb: "يركز", type: "Verb", gender: "",
        forms: "fokuserar, fokuserade, fokuserat",
        exSwe: "Fokusera på arbetet.", exArb: "ركّز على العمل."
    },

    {
        swe: "Gripar", arb: "يمسك / يعتقل", type: "Verb", gender: "",
        forms: "gripar, grep, gripit",
        exSwe: "Polisen griper brottslingen.", exArb: "الشرطة تعتقل المجرم."
    },

    {
        swe: "Kollapsar", arb: "ينهار", type: "Verb", gender: "",
        forms: "kollapsar, kollapsade, kollapsat",
        exSwe: "Byggnaden kollapsade.", exArb: "انهار المبنى."
    },

    {
        swe: "Moppar", arb: "يمسح الأرضية", type: "Verb", gender: "",
        forms: "moppar, moppade, moppat",
        exSwe: "Hon moppar golvet.", exArb: "تمسح الأرضية."
    },

    {
        swe: "Dekorerar", arb: "يزين", type: "Verb", gender: "",
        forms: "dekorerar, dekorerade, dekorerat",
        exSwe: "Vi dekorerar till jul.", exArb: "نزين للعيد."
    },

    {
        swe: "Panikerar", arb: "يصاب بالذعر", type: "Verb", gender: "",
        forms: "panikerar, panikerade, panikerat",
        exSwe: "Panikera inte!", exArb: "لا تصب بالذعر!"
    },

    {
        swe: "Avbokar", arb: "يلغي الحجز", type: "Verb", gender: "",
        forms: "avbokar, avbokade, avbokat",
        exSwe: "Jag avbokar mötet.", exArb: "ألغي الاجتماع."
    },

    // Rare verbs missed
    {
        swe: "Kamuflerar", arb: "يتمويه", type: "Verb", gender: "",
        forms: "kamuflerar, kamuflerade, kamuflerat",
        exSwe: "Soldaten kamuflerar sig.", exArb: "الجندي يتمويه."
    },

    {
        swe: "Klonar", arb: "يستنسخ", type: "Verb", gender: "",
        forms: "klonar, klonade, klonat",
        exSwe: "Forskarna klonar djur.", exArb: "الباحثون يستنسخون الحيوانات."
    },

    {
        swe: "Lanserar", arb: "يطلق", type: "Verb", gender: "",
        forms: "lanserar, lanserade, lanserat",
        exSwe: "Företaget lanserar en ny produkt.", exArb: "الشركة تطلق منتجاً جديداً."
    },

    {
        swe: "Maximerar", arb: "يعظّم", type: "Verb", gender: "",
        forms: "maximerar, maximerade, maximerat",
        exSwe: "Vi maximerar vinsten.", exArb: "نعظّم الأرباح."
    },

    {
        swe: "Minimerar", arb: "يقلل", type: "Verb", gender: "",
        forms: "minimerar, minimerade, minimerat",
        exSwe: "Vi minimerar kostnaderna.", exArb: "نقلل التكاليف."
    },

    {
        swe: "Kommunicerar", arb: "يتواصل", type: "Verb", gender: "",
        forms: "kommunicerar, kommunicerade, kommunicerat",
        exSwe: "Vi kommunicerar via telefon.", exArb: "نتواصل عبر الهاتف."
    },

    {
        swe: "Konkurrerar", arb: "يتنافس", type: "Verb", gender: "",
        forms: "konkurrerar, konkurrerade, konkurrerat",
        exSwe: "Företagen konkurrerar.", exArb: "الشركات تتنافس."
    },

    {
        swe: "Konsumerar", arb: "يستهلك", type: "Verb", gender: "",
        forms: "konsumerar, konsumerade, konsumerat",
        exSwe: "Vi konsumerar för mycket.", exArb: "نستهلك كثيراً."
    }
];

console.log('═══════════════════════════════════════════════════════════════');
console.log('     ADDING ALL REMAINING MISSING WORDS');
console.log('═══════════════════════════════════════════════════════════════\n');

let addedCount = 0;
let alreadyExists = 0;
let nextId = 200000;

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
