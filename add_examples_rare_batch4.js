/**
 * ADD EXAMPLES - RARE WORDS BATCH 4 BONUS
 * Final push to exceed 500 total examples
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
    // More rare but useful nouns
    "Aning|Substantiv": { exSwe: "Jag har ingen aning.", exArb: "ليس لدي فكرة." },
    "Andedräkt|Substantiv": { exSwe: "Han har dålig andedräkt.", exArb: "لديه رائحة فم سيئة." },
    "Ansträngning|Substantiv": { exSwe: "Det krävde stor ansträngning.", exArb: "تطلب مجهوداً كبيراً." },
    "Ansvarstagande|Substantiv": { exSwe: "Visa ansvarstagande!", exArb: "أظهر تحمل المسؤولية!" },
    "Anteckning|Substantiv": { exSwe: "Jag gör anteckningar.", exArb: "أدون ملاحظات." },
    "Anvisiningar|Substantiv": { exSwe: "Följ anvisningarna.", exArb: "اتبع التعليمات." },
    "Arbetslöshet|Substantiv": { exSwe: "Arbetslösheten är hög.", exArb: "البطالة مرتفعة." },
    "Avbrytare|Substantiv": { exSwe: "Tryck på strömbrytaren.", exArb: "اضغط على مفتاح الكهرباء." },
    "Äktenskap|Substantiv": { exSwe: "De har ett lyckligt äktenskap.", exArb: "لديهم زواج سعيد." },
    "Backe|Substantiv": { exSwe: "Vi åker nedför backen.", exArb: "ننزل من التلة." },
    "Bakgrund|Substantiv": { exSwe: "Vad är din bakgrund?", exArb: "ما خلفيتك؟" },
    "Ballad|Substantiv": { exSwe: "Det blev en riktig ballad.", exArb: "حدثت فوضى كبيرة." },
    "Bank|Substantiv": { exSwe: "Jag går till banken.", exArb: "أذهب إلى البنك." },
    "Barnvakt|Substantiv": { exSwe: "Vi behöver en barnvakt.", exArb: "نحتاج مربية أطفال." },
    "Barndom|Substantiv": { exSwe: "Jag minns min barndom.", exArb: "أتذكر طفولتي." },
    "Begåvning|Substantiv": { exSwe: "Han har en stor begåvning.", exArb: "لديه موهبة كبيرة." },
    "Behandling|Substantiv": { exSwe: "Behandlingen var effektiv.", exArb: "العلاج كان فعالاً." },
    "Bekant|Substantiv": { exSwe: "Han är en bekant till mig.", exArb: "هو معرفة لي." },
    "Bekräftelse|Substantiv": { exSwe: "Jag väntar på en bekräftelse.", exArb: "أنتظر تأكيداً." },
    "Belopp|Substantiv": { exSwe: "Beloppet är 500 kronor.", exArb: "المبلغ 500 كرونة." },
    "Bensin|Substantiv": { exSwe: "Bensinen är slut.", exArb: "نفد البنزين." },
    "Beräkning|Substantiv": { exSwe: "Min beräkning var korrekt.", exArb: "حسابي كان صحيحاً." },
    "Berg|Substantiv": { exSwe: "Berget är högt.", exArb: "الجبل مرتفع." },
    "Besked|Substantiv": { exSwe: "Väntar på besked.", exArb: "أنتظر الرد." },
    "Besökare|Substantiv": { exSwe: "Vi har besökare.", exArb: "لدينا زوار." },
    "Besvär|Substantiv": { exSwe: "Det är inga besvär.", exArb: "لا مشكلة." },
    "Betydelse|Substantiv": { exSwe: "Det har stor betydelse.", exArb: "له أهمية كبيرة." },
    "Bibliotek|Substantiv": { exSwe: "Jag lånar böcker på biblioteket.", exArb: "أستعير كتباً من المكتبة." },
    "Bidrag|Substantiv": { exSwe: "Han får bidrag.", exArb: "يحصل على إعانة." },
    "Bifall|Substantiv": { exSwe: "Förslaget fick bifall.", exArb: "الاقتراح نال الموافقة." },

    // More rare adjectives
    "Beklämd|Adjektiv": { exSwe: "Han verkar beklämd.", exArb: "يبدو مكتئباً." },
    "Belägen|Adjektiv": { exSwe: "Huset är beläget på en kulle.", exArb: "البيت يقع على تل." },
    "Bemedlad|Adjektiv": { exSwe: "Han är en bemedlad man.", exArb: "هو رجل ميسور." },
    "Benägen|Adjektiv": { exSwe: "Han är benägen att hjälpa.", exArb: "هو ميال للمساعدة." },
    "Besatt|Adjektiv": { exSwe: "Han är besatt av arbete.", exArb: "هو مهووس بالعمل." },
    "Beskaffad|Adjektiv": { exSwe: "Hur är saken beskaffad?", exArb: "ما طبيعة الأمر؟" },
    "Beslöjad|Adjektiv": { exSwe: "Kvinnan var beslöjad.", exArb: "المرأة كانت محجبة." },
    "Beslutsam|Adjektiv": { exSwe: "Hon är en beslutsam person.", exArb: "هي شخص حازم." },
    "Besvärad|Adjektiv": { exSwe: "Han ser besvärad ut.", exArb: "يبدو منزعجاً." },
    "Betryggande|Adjektiv": { exSwe: "Resultatet är betryggande.", exArb: "النتيجة مطمئنة." },

    // More verbs
    "Ägar|Verb": { exSwe: "Han äger ett hus.", exArb: "يملك بيتاً." },
    "Ärver|Verb": { exSwe: "Hon ärver huset.", exArb: "ترث البيت." },
    "Återkommer|Verb": { exSwe: "Jag återkommer imorgon.", exArb: "سأعود غداً." },
    "Återställer|Verb": { exSwe: "Vi återställer ordningen.", exArb: "نستعيد النظام." },
    "Återtar|Verb": { exSwe: "Han återtar sitt ord.", exArb: "يتراجع عن كلامه." },
    "Åtrår|Verb": { exSwe: "Han åtrår framgång.", exArb: "يتوق للنجاح." },
    "Avlönar|Verb": { exSwe: "Företaget avlönar arbetarna.", exArb: "الشركة تدفع رواتب العمال." },
    "Avlöser|Verb": { exSwe: "Vakten avlöses.", exArb: "يتم تبديل الحارس." },
    "Avmäter|Verb": { exSwe: "Han avmäter avståndet.", exArb: "يقيس المسافة." },
    "Avnjuter|Verb": { exSwe: "Hon avnjuter maten.", exArb: "تستمتع بالطعام." },
    "Avråder|Verb": { exSwe: "Jag avråder dig från det.", exArb: "أنصحك بعدم فعل ذلك." },
    "Avser|Verb": { exSwe: "Vad avser du?", exArb: "ماذا تقصد؟" },
    "Avslutar|Verb": { exSwe: "Vi avslutar mötet.", exArb: "ننهي الاجتماع." },
    "Avslöpa|Verb": { exSwe: "Tiden avslöjade sanningen.", exArb: "الزمن كشف الحقيقة." },
    "Avstår|Verb": { exSwe: "Jag avstår från rökning.", exArb: "أمتنع عن التدخين." },
    "Avtar|Verb": { exSwe: "Regnet avtar.", exArb: "المطر يخف." },
    "Avtjänar|Verb": { exSwe: "Han avtjänar ett straff.", exArb: "يقضي عقوبة." },
    "Avväger|Verb": { exSwe: "Vi avväger alternativen.", exArb: "نوازن بين البدائل." },
    "Avviser|Verb": { exSwe: "Jag avvisar förslaget.", exArb: "أرفض الاقتراح." },
    "Avyter|Verb": { exSwe: "Företaget avytter fastigheten.", exArb: "الشركة تبيع العقار." }
};

console.log('═══════════════════════════════════════════════════════════════');
console.log('     ADDING EXAMPLES - RARE WORDS BATCH 4 BONUS');
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
