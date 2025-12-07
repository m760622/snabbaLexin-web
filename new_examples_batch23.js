/**
 * NEW EXAMPLES - BATCH 23
 * More common verbs (50 examples)
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
    // MORE VERBS - L, M, N
    "Laddar|Verb": { exSwe: "Jag laddar telefonen.", exArb: "أشحن الهاتف." },
    "Landar|Verb": { exSwe: "Flygplanet landar snart.", exArb: "ستهبط الطائرة قريباً." },
    "Leder|Verb": { exSwe: "Hon leder mötet.", exArb: "تقود الاجتماع." },
    "Levererar|Verb": { exSwe: "Vi levererar varor hem.", exArb: "نوصل البضائع للمنزل." },
    "Listar|Verb": { exSwe: "Lista alla uppgifter.", exArb: "اكتب قائمة بكل المهام." },
    "Lockar|Verb": { exSwe: "Erbjudandet lockar kunder.", exArb: "العرض يجذب العملاء." },
    "Lovar|Verb": { exSwe: "Jag lovar att komma.", exArb: "أعدك أن آتي." },
    "Lyfter|Verb": { exSwe: "Han lyfter tunga vikter.", exArb: "يرفع أوزاناً ثقيلة." },
    "Lånar|Verb": { exSwe: "Kan jag låna din penna?", exArb: "هل يمكنني استعارة قلمك؟" },
    "Löser|Verb": { exSwe: "Vi löser problemet tillsammans.", exArb: "نحل المشكلة معاً." },
    "Markerar|Verb": { exSwe: "Markera det viktiga.", exArb: "ضع علامة على المهم." },
    "Matar|Verb": { exSwe: "Hon matar fåglarna.", exArb: "تطعم الطيور." },
    "Minskar|Verb": { exSwe: "Priset minskar.", exArb: "السعر يقل." },
    "Missar|Verb": { exSwe: "Jag missade bussen.", exArb: "فاتني الباص." },
    "Mixar|Verb": { exSwe: "Mixar ingredienserna.", exArb: "أخلط المكونات." },
    "Motiverar|Verb": { exSwe: "Hon motiverar sitt lag.", exArb: "تحفز فريقها." },
    "Möter|Verb": { exSwe: "Jag möter dig vid stationen.", exArb: "سأقابلك عند المحطة." },
    "Noterar|Verb": { exSwe: "Notera det i kalendern.", exArb: "دوّنه في التقويم." },
    "Når|Verb": { exSwe: "Vi når målet snart.", exArb: "سنصل للهدف قريباً." },
    // MORE VERBS - O, P
    "Observerar|Verb": { exSwe: "Forskaren observerar djuren.", exArb: "الباحث يراقب الحيوانات." },
    "Oroar|Verb": { exSwe: "Nyheten oroar mig.", exArb: "يقلقني الخبر." },
    "Organiserar|Verb": { exSwe: "Hon organiserar evenemanget.", exArb: "تنظم الحدث." },
    "Parkerar|Verb": { exSwe: "Parkera bilen här.", exArb: "أوقف السيارة هنا." },
    "Passerar|Verb": { exSwe: "Vi passerar bron.", exArb: "نمر عبر الجسر." },
    "Pausar|Verb": { exSwe: "Pausa videon.", exArb: "أوقف الفيديو مؤقتاً." },
    "Pekar|Verb": { exSwe: "Han pekar på kartan.", exArb: "يشير على الخريطة." },
    "Planterar|Verb": { exSwe: "Vi planterar blommor.", exArb: "نزرع الزهور." },
    "Plockar|Verb": { exSwe: "Barnen plockar bär.", exArb: "يقطف الأطفال التوت." },
    "Pressar|Verb": { exSwe: "Pressa citronen.", exArb: "اعصر الليمون." },
    "Producerar|Verb": { exSwe: "Fabriken producerar bilar.", exArb: "ينتج المصنع سيارات." },
    "Publicerar|Verb": { exSwe: "Hon publicerar en bok.", exArb: "تنشر كتاباً." },
    // MORE VERBS - R, S
    "Rakar|Verb": { exSwe: "Han rakar sig varje morgon.", exArb: "يحلق ذقنه كل صباح." },
    "Reagerar|Verb": { exSwe: "Hur reagerade han?", exArb: "كيف كان رد فعله؟" },
    "Recylar|Verb": { exSwe: "Vi återvinner plast.", exArb: "نعيد تدوير البلاستيك." },
    "Registrerar|Verb": { exSwe: "Registrera dig på hemsidan.", exArb: "سجّل في الموقع." },
    "Renoverar|Verb": { exSwe: "De renoverar köket.", exArb: "يجددون المطبخ." },
    "Representerar|Verb": { exSwe: "Hon representerar företaget.", exArb: "تمثل الشركة." },
    "Respekterar|Verb": { exSwe: "Jag respekterar din åsikt.", exArb: "أحترم رأيك." },
    "Ritar|Verb": { exSwe: "Barnet ritar en blomma.", exArb: "يرسم الطفل زهرة." },
    "Rullar|Verb": { exSwe: "Bollen rullar.", exArb: "الكرة تتدحرج." },
    "Rör|Verb": { exSwe: "Rör inte det!", exArb: "لا تلمس ذلك!" },
    "Saknar|Verb": { exSwe: "Jag saknar dig.", exArb: "أفتقدك." },
    "Samarbetar|Verb": { exSwe: "Vi samarbetar med andra.", exArb: "نتعاون مع الآخرين." },
    "Samlar|Verb": { exSwe: "Han samlar frimärken.", exArb: "يجمع الطوابع." },
    "Separerar|Verb": { exSwe: "Separera avfallet.", exArb: "افصل النفايات." },
    "Skickar|Verb": { exSwe: "Jag skickar ett paket.", exArb: "أرسل طرداً." },
    "Skiner|Verb": { exSwe: "Solen skiner idag.", exArb: "الشمس تشرق اليوم." },
    "Skrattar|Verb": { exSwe: "Vi skrattar tillsammans.", exArb: "نضحك معاً." },
    "Slutar|Verb": { exSwe: "Skolan slutar klockan tre.", exArb: "تنتهي المدرسة الساعة الثالثة." }
};

console.log('═══════════════════════════════════════════════════════════════');
console.log('     ADDING EXAMPLES - NEW BATCH 23 (50 More Verbs)');
console.log('═══════════════════════════════════════════════════════════════\n');

let addedCount = 0, alreadyHasExample = 0, notFound = 0;

for (const [key, example] of Object.entries(examples)) {
    const [targetWord, targetType] = key.split('|');
    let found = false;
    for (let i = 0; i < dictionaryData.length; i++) {
        const entry = dictionaryData[i];
        const wordMatch = entry[2] && entry[2].toLowerCase() === targetWord.toLowerCase();
        const typeMatch = !targetType || (entry[1] && entry[1].includes(targetType));
        if (wordMatch && typeMatch) {
            found = true;
            if (entry[7] && entry[7].trim() !== '') { alreadyHasExample++; }
            else { dictionaryData[i][7] = example.exSwe; dictionaryData[i][8] = example.exArb; addedCount++; console.log(`✓ ${entry[2]}`); }
            break;
        }
    }
    if (!found) { console.log(`❌ Not found: ${targetWord}`); notFound++; }
}

fs.writeFileSync('./data.js', 'const dictionaryData = ' + JSON.stringify(dictionaryData, null, 4) + ';');
console.log(`\n✅ Added: ${addedCount} | ⚠️ Had: ${alreadyHasExample} | ❌ Not found: ${notFound}`);
