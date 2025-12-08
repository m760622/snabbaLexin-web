/**
 * دفعات 36-40: إضافة أمثلة للأفعال المركبة والمتخصصة
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
    // الأفعال المركبة (Compound verbs)
    "Avbetallar": { exSwe: "Han avbetallar lånet.", exArb: "يسدد القرض على دفعات." },
    "Avbrytar": { exSwe: "Hon avbryter samtalet.", exArb: "تقطع المحادثة." },
    "Avfyrar": { exSwe: "Soldaten avfyrar vapnet.", exArb: "الجندي يطلق السلاح." },
    "Avgrensar": { exSwe: "De avgränsar området.", exArb: "يحددون المنطقة." },
    "Avhandlar": { exSwe: "De avhandlar ämnet.", exArb: "يتناولون الموضوع." },
    "Avhåller": { exSwe: "Rädslan avhåller honom.", exArb: "الخوف يمنعه." },
    "Avkortar": { exSwe: "De avkortar arbetstiden.", exArb: "يقصرون وقت العمل." },
    "Avlägsnar": { exSwe: "Läkaren avlägsnar tumören.", exArb: "الطبيب يستأصل الورم." },
    "Avlönar": { exSwe: "Företaget avlönar sina anställda.", exArb: "الشركة تدفع رواتب موظفيها." },
    "Avnjuter": { exSwe: "De avnjuter middagen.", exArb: "يستمتعون بالعشاء." },
    "Avpolleterar": { exSwe: "Han avpolleteras från jobbet.", exArb: "يُفصل من العمل." },
    "Avreagerar": { exSwe: "Han avreagerar sig på gym.", exArb: "يفرغ ضغوطه في النادي." },
    "Avskaffar": { exSwe: "De avskaffar lagen.", exArb: "يلغون القانون." },
    "Avskedar": { exSwe: "Chefen avskedar arbetaren.", exArb: "المدير يفصل العامل." },
    "Avslöjar": { exSwe: "Journalisten avslöjar sanningen.", exArb: "الصحفي يكشف الحقيقة." },
    "Avstår": { exSwe: "Han avstår från alkohol.", exArb: "يمتنع عن الكحول." },
    "Avtalar": { exSwe: "De avtalar om priset.", exArb: "يتفقون على السعر." },
    "Avundas": { exSwe: "Han avundas framgången.", exArb: "يحسد على النجاح." },
    "Avvaktar": { exSwe: "De avvaktar beslutet.", exArb: "ينتظرون القرار." },
    "Avvecklar": { exSwe: "De avvecklar företaget.", exArb: "يصفون الشركة." },
    "Avväger": { exSwe: "Han avväger alternativen.", exArb: "يوازن بين الخيارات." },

    // Förför-verbs
    "Förankrar": { exSwe: "De förankrar förslaget.", exArb: "يرسخون الاقتراح." },
    "Föranleddar": { exSwe: "Händelsen föranleder en undersökning.", exArb: "الحادث يستدعي تحقيقاً." },
    "Förbereder": { exSwe: "Hon förbereder middagen.", exArb: "تعد العشاء." },
    "Förbjudar": { exSwe: "Lagen förbjuder rökning.", exArb: "القانون يحظر التدخين." },
    "Förbryllar": { exSwe: "Frågan förbryllar honom.", exArb: "السؤال يحيره." },
    "Fördomar": { exSwe: "Samhället fördömer brottet.", exArb: "المجتمع يدين الجريمة." },
    "Fördröjer": { exSwe: "Reparationen fördröjer projektet.", exArb: "الإصلاح يؤخر المشروع." },
    "Förebygger": { exSwe: "Vaccinet förebyggar sjukdomen.", exArb: "اللقاح يقي من المرض." },
    "Föredrar": { exSwe: "Jag föredrar kaffe.", exArb: "أفضل القهوة." },
    "Förenar": { exSwe: "Musik förenar folk.", exArb: "الموسيقى توحد الناس." },
    "Föreslar": { exSwe: "Han föreslår en lösning.", exArb: "يقترح حلاً." },
    "Föreslår": { exSwe: "Jag föreslår att vi väntar.", exArb: "أقترح أن ننتظر." },
    "Föreställer": { exSwe: "Jag föreställer mig en ljus framtid.", exArb: "أتخيل مستقبلاً مشرقاً." },
    "Förfalskar": { exSwe: "Brottslingen förfalskar dokument.", exArb: "المجرم يزور الوثائق." },
    "Förfogar": { exSwe: "Han förfogar över stora resurser.", exArb: "يتصرف بموارد كبيرة." },
    "Förhandlar": { exSwe: "De förhandlar om lönen.", exArb: "يتفاوضون على الراتب." },
    "Förhindrar": { exSwe: "Polisen förhindrar brottet.", exArb: "الشرطة تمنع الجريمة." },
    "Förhöjer": { exSwe: "Kryddorna förhöjer smaken.", exArb: "التوابل تعزز الطعم." },
    "Förhör": { exSwe: "Polisen förhör misstänkta.", exArb: "الشرطة تستجوب المشتبه بهم." },
    "Förklarar": { exSwe: "Läraren förklarar regeln.", exArb: "المعلم يشرح القاعدة." },
    "Förknippar": { exSwe: "Jag förknippar sommaren med sol.", exArb: "أربط الصيف بالشمس." },
    "Förkrossar": { exSwe: "Nyheten förkrossar honom.", exArb: "الخبر يحطمه." },
    "Förlitar": { exSwe: "Han förlitar sig på vänner.", exArb: "يعتمد على الأصدقاء." },
    "Förlorar": { exSwe: "Laget förlorar matchen.", exArb: "الفريق يخسر المباراة." },
    "Förminskar": { exSwe: "Medicinen förminskar smärtan.", exArb: "الدواء يخفف الألم." },
    "Förmår": { exSwe: "Han förmår inte stiga upp.", exArb: "لا يستطيع النهوض." },
    "Förnyar": { exSwe: "De förnyar kontraktet.", exArb: "يجددون العقد." },
    "Förordar": { exSwe: "Han förordar försiktighet.", exArb: "ينادي بالحذر." },
    "Förpackar": { exSwe: "Fabriken förpackar produkterna.", exArb: "المصنع يغلف المنتجات." },
    "Förser": { exSwe: "Affären förser oss med varor.", exArb: "المتجر يزودنا بالبضائع." },
    "Förskjuter": { exSwe: "De förskjuter mötet.", exArb: "يؤجلون الاجتماع." },
    "Förskönar": { exSwe: "Blommor förskönar trädgården.", exArb: "الزهور تجمل الحديقة." },
    "Förslavar": { exSwe: "Drogen förslavar honom.", exArb: "المخدر يستعبده." },
    "Förstör": { exSwe: "Stormen förstör husen.", exArb: "العاصفة تدمر البيوت." },
    "Försvarar": { exSwe: "Advokaten försvarar klienten.", exArb: "المحامي يدافع عن الموكل." },
    "Försvinner": { exSwe: "Solen försvinner bakom molnen.", exArb: "الشمس تختفي خلف الغيوم." },
    "Försvårar": { exSwe: "Regnet försvårar arbetet.", exArb: "المطر يصعب العمل." },
    "Förtärar": { exSwe: "De förtär en måltid.", exArb: "يتناولون وجبة." },
    "Förutser": { exSwe: "Analytikern förutser utvecklingen.", exArb: "المحلل يتوقع التطور." },
    "Förvandlar": { exSwe: "Trollkarlen förvandlar vatten till vin.", exArb: "الساحر يحول الماء لنبيذ." },
    "Förvarar": { exSwe: "Hon förvarar smyckena säkert.", exArb: "تحفظ المجوهرات بأمان." },
    "Förverkligar": { exSwe: "Han förverkligar sina drömmar.", exArb: "يحقق أحلامه." },
    "Förvirrar": { exSwe: "Instruktionerna förvirrar mig.", exArb: "التعليمات تربكني." },
    "Förädlas": { exSwe: "Produkten förädlas i fabriken.", exArb: "المنتج يُكرر في المصنع." },
    "Förändras": { exSwe: "Världen förändras snabbt.", exArb: "العالم يتغير بسرعة." },
    "Förökar": { exSwe: "Kaniner förökar sig snabbt.", exArb: "الأرانب تتكاثر بسرعة." }
};

console.log('═══════════════════════════════════════════════════════════════');
console.log('     إضافة أمثلة للدفعة 36-40');
console.log('═══════════════════════════════════════════════════════════════\n');

let addedCount = 0, alreadyHasExample = 0, notFound = 0;
for (const [targetWord, example] of Object.entries(verbExamples)) {
    let found = false;
    for (let i = 0; i < dictionaryData.length; i++) {
        const entry = dictionaryData[i];
        if (entry[2] && entry[2].toLowerCase() === targetWord.toLowerCase() && entry[1] && entry[1].includes('Verb')) {
            found = true;
            if (entry[7] && entry[7].trim() !== '') { alreadyHasExample++; }
            else { dictionaryData[i][7] = example.exSwe; dictionaryData[i][8] = example.exArb; addedCount++; console.log(`✅ ${entry[2]}`); }
            break;
        }
    }
    if (!found) notFound++;
}
fs.writeFileSync('./data.js', 'const dictionaryData = ' + JSON.stringify(dictionaryData, null, 4) + ';');
console.log(`\n✅ المضافة: ${addedCount} | ⚠️ موجودة: ${alreadyHasExample} | ❌ غير موجودة: ${notFound}`);
