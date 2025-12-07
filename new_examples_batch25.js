/**
 * NEW EXAMPLES - BATCH 25
 * More nouns - society, emotions, abstract (50 examples)
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
    // SOCIETY & POLITICS
    "Medborgare|Substantiv": { exSwe: "Han är svensk medborgare.", exArb: "هو مواطن سويدي." },
    "Samhället|Substantiv": { exSwe: "Vi lever i ett öppet samhälle.", exArb: "نعيش في مجتمع منفتح." },
    "Politik|Substantiv": { exSwe: "Jag är inte intresserad av politik.", exArb: "لست مهتماً بالسياسة." },
    "Makt|Substantiv": { exSwe: "Kunskap är makt.", exArb: "المعرفة قوة." },
    "Frihet|Substantiv": { exSwe: "Frihet är viktigt.", exArb: "الحرية مهمة." },
    "Jämlikhet|Substantiv": { exSwe: "Vi kämpar för jämlikhet.", exArb: "نناضل من أجل المساواة." },
    "Rättvisa|Substantiv": { exSwe: "Alla vill ha rättvisa.", exArb: "الجميع يريد العدالة." },
    "Säkerhet|Substantiv": { exSwe: "Säkerheten är viktig.", exArb: "الأمان مهم." },
    "Fred|Substantiv": { exSwe: "Vi vill ha fred.", exArb: "نريد السلام." },
    "Krig|Substantiv": { exSwe: "Krig förstör allt.", exArb: "الحرب تدمر كل شيء." },
    // EMOTIONS & FEELINGS
    "Lycka|Substantiv": { exSwe: "Lycka är att vara med familjen.", exArb: "السعادة أن تكون مع العائلة." },
    "Ångest|Substantiv": { exSwe: "Ångest är vanligt.", exArb: "القلق شائع." },
    "Ilska|Substantiv": { exSwe: "Kontrollera din ilska.", exArb: "تحكم في غضبك." },
    "Förväntan|Substantiv": { exSwe: "Med stor förväntan.", exArb: "بترقب كبير." },
    "Besvikelse|Substantiv": { exSwe: "Det var en besvikelse.", exArb: "كانت خيبة أمل." },
    "Stolthet|Substantiv": { exSwe: "Han är fylld av stolthet.", exArb: "هو مليء بالفخر." },
    "Skam|Substantiv": { exSwe: "Skam är en svår känsla.", exArb: "العار شعور صعب." },
    "Avund|Substantiv": { exSwe: "Avund är destruktivt.", exArb: "الحسد مدمر." },
    "Empati|Substantiv": { exSwe: "Visa empati för andra.", exArb: "أظهر التعاطف مع الآخرين." },
    // ABSTRACT CONCEPTS
    "Idé|Substantiv": { exSwe: "Jag har en idé.", exArb: "لدي فكرة." },
    "Teori|Substantiv": { exSwe: "Det är bara en teori.", exArb: "هذه مجرد نظرية." },
    "Fakta|Substantiv": { exSwe: "Ge mig fakta.", exArb: "أعطني الحقائق." },
    "Åsikt|Substantiv": { exSwe: "Det är min åsikt.", exArb: "هذا رأيي." },
    "Princip|Substantiv": { exSwe: "Det är en viktig princip.", exArb: "هذا مبدأ مهم." },
    "Värde|Substantiv": { exSwe: "Vad är värdet?", exArb: "ما القيمة؟" },
    "Syfte|Substantiv": { exSwe: "Vad är syftet?", exArb: "ما الهدف؟" },
    "Mål|Substantiv": { exSwe: "Vi nådde vårt mål.", exArb: "وصلنا لهدفنا." },
    "Metod|Substantiv": { exSwe: "Vi använder en ny metod.", exArb: "نستخدم طريقة جديدة." },
    "Process|Substantiv": { exSwe: "Processen tar tid.", exArb: "العملية تستغرق وقتاً." },
    "Nivå|Substantiv": { exSwe: "På vilken nivå?", exArb: "على أي مستوى؟" },
    // EDUCATION & LEARNING
    "Utbildning|Substantiv": { exSwe: "Utbildning är viktigt.", exArb: "التعليم مهم." },
    "Forskning|Substantiv": { exSwe: "Forskningen visar detta.", exArb: "البحث يظهر هذا." },
    "Studie|Substantiv": { exSwe: "Studien tar två år.", exArb: "الدراسة تستغرق سنتين." },
    "Ämne|Substantiv": { exSwe: "Vilket är ditt favoritämne?", exArb: "ما مادتك المفضلة؟" },
    "Uppgift|Substantiv": { exSwe: "Uppgiften är svår.", exArb: "المهمة صعبة." },
    "Övning|Substantiv": { exSwe: "Övning ger färdighet.", exArb: "الممارسة تصنع الكمال." },
    "Kapitel|Substantiv": { exSwe: "Läs kapitel ett.", exArb: "اقرأ الفصل الأول." },
    "Sida|Substantiv": { exSwe: "Öppna sida fem.", exArb: "افتح الصفحة الخامسة." },
    // NATURE & ENVIRONMENT
    "Natur|Substantiv": { exSwe: "Naturen är vacker.", exArb: "الطبيعة جميلة." },
    "Miljö|Substantiv": { exSwe: "Vi måste skydda miljön.", exArb: "يجب أن نحمي البيئة." },
    "Klimat|Substantiv": { exSwe: "Klimatet förändras.", exArb: "المناخ يتغير." },
    "Luft|Substantiv": { exSwe: "Luften är frisk.", exArb: "الهواء منعش." },
    "Vatten|Substantiv": { exSwe: "Vattnet är rent.", exArb: "الماء نظيف." },
    "Eld|Substantiv": { exSwe: "Elden brinner.", exArb: "النار تشتعل." },
    "Sol|Substantiv": { exSwe: "Solen skiner.", exArb: "الشمس تشرق." },
    "Måne|Substantiv": { exSwe: "Månen lyser.", exArb: "القمر يضيء." },
    "Stjärna|Substantiv": { exSwe: "Stjärnorna lyser.", exArb: "النجوم تلمع." },
    "Himmel|Substantiv": { exSwe: "Himlen är blå.", exArb: "السماء زرقاء." },
    "Hav|Substantiv": { exSwe: "Havet är djupt.", exArb: "البحر عميق." }
};

console.log('═══════════════════════════════════════════════════════════════');
console.log('     ADDING EXAMPLES - NEW BATCH 25 (Society/Emotions/Abstract)');
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
