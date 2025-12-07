/**
 * NEW EXAMPLES - BATCH 13
 * Common verbs and everyday words (50 examples)
 */

const fs = require('fs');

// Load and parse dictionary
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
    // COMMON VERBS - A
    // ==========================================
    "Administrerar|Verb": {
        exSwe: "Hon administrerar företagets ekonomi.",
        exArb: "تدير اقتصاد الشركة."
    },
    "Adopterar|Verb": {
        exSwe: "Familjen adopterade ett barn från Kina.",
        exArb: "تبنت العائلة طفلاً من الصين."
    },
    "Analyserar|Verb": {
        exSwe: "Forskaren analyserar resultaten.",
        exArb: "يحلل الباحث النتائج."
    },
    "Anfaller|Verb": {
        exSwe: "Lejonet anfaller sitt byte.",
        exArb: "يهاجم الأسد فريسته."
    },
    "Anmärker|Verb": {
        exSwe: "Läraren anmärker på elevens beteende.",
        exArb: "يشير المعلم إلى سلوك الطالب."
    },
    // ==========================================
    // COMMON VERBS - B
    // ==========================================
    "Balanserar|Verb": {
        exSwe: "Hon balanserar på ett ben.",
        exArb: "توازن على قدم واحدة."
    },
    "Bedriver|Verb": {
        exSwe: "Han bedriver sin egen verksamhet.",
        exArb: "يدير عمله الخاص."
    },
    "Befinner sig|Verb": {
        exSwe: "Var befinner du dig just nu?",
        exArb: "أين تتواجد الآن؟"
    },
    "Befriar|Verb": {
        exSwe: "Soldaterna befriade fångarna.",
        exArb: "حرر الجنود السجناء."
    },
    "Behandlar|Verb": {
        exSwe: "Läkaren behandlar patienten.",
        exArb: "يعالج الطبيب المريض."
    },
    "Beordrar|Verb": {
        exSwe: "Chefen beordrade alla att stanna kvar.",
        exArb: "أمر المدير الجميع بالبقاء."
    },
    "Beställer|Verb": {
        exSwe: "Jag beställer mat online.",
        exArb: "أطلب الطعام عبر الإنترنت."
    },
    "Betonar|Verb": {
        exSwe: "Han betonar vikten av utbildning.",
        exArb: "يؤكد على أهمية التعليم."
    },
    "Beundrar|Verb": {
        exSwe: "Jag beundrar hennes mod.",
        exArb: "أعجب بشجاعتها."
    },
    "Blandar|Verb": {
        exSwe: "Kocken blandar ingredienserna.",
        exArb: "يخلط الطاهي المكونات."
    },
    // ==========================================
    // COMMON VERBS - C, D
    // ==========================================
    "Cyklar|Verb": {
        exSwe: "Barnen cyklar till skolan.",
        exArb: "يركب الأطفال الدراجة إلى المدرسة."
    },
    "Debatterar|Verb": {
        exSwe: "Politikerna debatterade i TV.",
        exArb: "تناظر السياسيون في التلفاز."
    },
    "Dekorerar|Verb": {
        exSwe: "Vi dekorerar huset till jul.",
        exArb: "نزين البيت لعيد الميلاد."
    },
    "Demonstrerar|Verb": {
        exSwe: "Folk demonstrerar för fred.",
        exArb: "يتظاهر الناس من أجل السلام."
    },
    "Diskuterar|Verb": {
        exSwe: "Vi diskuterar problemet tillsammans.",
        exArb: "نناقش المشكلة معاً."
    },
    // ==========================================
    // COMMON VERBS - E, F
    // ==========================================
    "Utvecklar|Verb": {
        exSwe: "Företaget utvecklar nya produkter.",
        exArb: "تطور الشركة منتجات جديدة."
    },
    "Experimenterar|Verb": {
        exSwe: "Forskarna experimenterar med nya metoder.",
        exArb: "يجرب الباحثون طرقاً جديدة."
    },
    "Exporterar|Verb": {
        exSwe: "Sverige exporterar bilar till hela världen.",
        exArb: "تصدر السويد السيارات للعالم كله."
    },
    "Fascinerar|Verb": {
        exSwe: "Rymden fascinerar mig.",
        exArb: "الفضاء يفتنني."
    },
    "Finansierar|Verb": {
        exSwe: "Banken finansierar projektet.",
        exArb: "يمول البنك المشروع."
    },
    "Fokuserar|Verb": {
        exSwe: "Fokusera på uppgiften!",
        exArb: "ركز على المهمة!"
    },
    "Formulerar|Verb": {
        exSwe: "Hon formulerar sina tankar tydligt.",
        exArb: "تصيغ أفكارها بوضوح."
    },
    "Fotograferar|Verb": {
        exSwe: "Turisten fotograferar slottet.",
        exArb: "يصور السائح القلعة."
    },
    "Fryser|Verb": {
        exSwe: "Vattnet fryser till is på vintern.",
        exArb: "يتجمد الماء ويصبح جليداً في الشتاء."
    },
    "Fyller|Verb": {
        exSwe: "Jag fyller år imorgon.",
        exArb: "عيد ميلادي غداً."
    },
    // ==========================================
    // COMMON VERBS - G, H
    // ==========================================
    "Garanterar|Verb": {
        exSwe: "Vi garanterar kvaliteten.",
        exArb: "نضمن الجودة."
    },
    "Gratulerar|Verb": {
        exSwe: "Jag gratulerar dig till examen!",
        exArb: "مبروك على التخرج!"
    },
    "Grillar|Verb": {
        exSwe: "Vi grillar på sommaren.",
        exArb: "نشوي في الصيف."
    },
    "Hälsar|Verb": {
        exSwe: "Han hälsar på sina vänner.",
        exArb: "يسلم على أصدقائه."
    },
    "Hänger|Verb": {
        exSwe: "Tavlan hänger på väggen.",
        exArb: "اللوحة معلقة على الجدار."
    },
    "Härmar|Verb": {
        exSwe: "Barnet härmar sina föräldrar.",
        exArb: "يقلد الطفل والديه."
    },
    // ==========================================
    // COMMON VERBS - I, J, K
    // ==========================================
    "Ignorerar|Verb": {
        exSwe: "Ignorera inte hennes råd.",
        exArb: "لا تتجاهل نصيحتها."
    },
    "Imponerar|Verb": {
        exSwe: "Hennes kunskap imponerar på mig.",
        exArb: "معرفتها تثير إعجابي."
    },
    "Importerar|Verb": {
        exSwe: "Vi importerar kaffe från Brasilien.",
        exArb: "نستورد القهوة من البرازيل."
    },
    "Informerar|Verb": {
        exSwe: "Vi informerar er om förändringarna.",
        exArb: "نبلغكم بالتغييرات."
    },
    "Inspirerar|Verb": {
        exSwe: "Hans historia inspirerar många.",
        exArb: "قصته تلهم الكثيرين."
    },
    "Intervjuar|Verb": {
        exSwe: "Journalisten intervjuar ministern.",
        exArb: "يقابل الصحفي الوزير."
    },
    "Investerar|Verb": {
        exSwe: "Han investerar pengar i aktier.",
        exArb: "يستثمر المال في الأسهم."
    },
    "Joggar|Verb": {
        exSwe: "Jag joggar varje morgon.",
        exArb: "أركض كل صباح."
    },
    "Klagar|Verb": {
        exSwe: "Sluta klaga och börja arbeta!",
        exArb: "توقف عن الشكوى وابدأ العمل!"
    },
    "Klappar|Verb": {
        exSwe: "Barnet klappar hunden.",
        exArb: "يربت الطفل على الكلب."
    },
    "Kopierar|Verb": {
        exSwe: "Kan du kopiera dokumentet?",
        exArb: "هل يمكنك نسخ المستند؟"
    },
    "Korrigerar|Verb": {
        exSwe: "Läraren korrigerar proven.",
        exArb: "يصحح المعلم الاختبارات."
    },
    "Kräver|Verb": {
        exSwe: "Jobbet kräver erfarenhet.",
        exArb: "يتطلب العمل خبرة."
    }
};

console.log('═══════════════════════════════════════════════════════════════');
console.log('     ADDING EXAMPLES - NEW BATCH 13 (50 Common Verbs)');
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
