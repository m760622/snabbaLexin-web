/**
 * NEW EXAMPLES - BATCH 24
 * More verbs and adjectives (50 examples)
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
    // MORE VERBS - S, T, U, V
    "Smälter|Verb": { exSwe: "Isen smälter.", exArb: "الجليد يذوب." },
    "Snurrar|Verb": { exSwe: "Hjulet snurrar.", exArb: "العجلة تدور." },
    "Sorterar|Verb": { exSwe: "Sortera posten.", exArb: "رتّب البريد." },
    "Spelar|Verb": { exSwe: "Barnen spelar fotboll.", exArb: "يلعب الأطفال كرة القدم." },
    "Sprider|Verb": { exSwe: "Nyheten sprider sig snabbt.", exArb: "ينتشر الخبر بسرعة." },
    "Startar|Verb": { exSwe: "Starta datorn.", exArb: "شغّل الكمبيوتر." },
    "Stiger|Verb": { exSwe: "Priset stiger.", exArb: "السعر يرتفع." },
    "Störar|Verb": { exSwe: "Stör inte mig!", exArb: "لا تزعجني!" },
    "Summerar|Verb": { exSwe: "Summera resultaten.", exArb: "لخّص النتائج." },
    "Svettas|Verb": { exSwe: "Jag svettas när det är varmt.", exArb: "أعرق عندما يكون الجو حاراً." },
    "Säljer|Verb": { exSwe: "Han säljer frukt.", exArb: "يبيع الفاكهة." },
    "Tackar|Verb": { exSwe: "Jag tackar dig.", exArb: "أشكرك." },
    "Talar|Verb": { exSwe: "Hon talar fem språk.", exArb: "تتكلم خمس لغات." },
    "Testar|Verb": { exSwe: "Testa produkten först.", exArb: "اختبر المنتج أولاً." },
    "Tittar|Verb": { exSwe: "Vi tittar på film.", exArb: "نشاهد فيلماً." },
    "Torkar|Verb": { exSwe: "Torka händerna.", exArb: "جفف يديك." },
    "Träffar|Verb": { exSwe: "Jag träffar vänner ikväll.", exArb: "سأقابل أصدقاء الليلة." },
    "Trycker|Verb": { exSwe: "Tryck på knappen.", exArb: "اضغط على الزر." },
    "Tvingar|Verb": { exSwe: "Tvinga mig inte.", exArb: "لا تجبرني." },
    "Underhåller|Verb": { exSwe: "Clownen underhåller barnen.", exArb: "المهرج يسلي الأطفال." },
    "Undrar|Verb": { exSwe: "Jag undrar vad som hände.", exArb: "أتساءل ما الذي حدث." },
    "Uppfattar|Verb": { exSwe: "Jag uppfattade inte det.", exArb: "لم أفهم ذلك." },
    "Utvärderar|Verb": { exSwe: "Vi utvärderar resultaten.", exArb: "نقيّم النتائج." },
    "Vaknar|Verb": { exSwe: "Jag vaknar tidigt.", exArb: "أستيقظ باكراً." },
    "Varnar|Verb": { exSwe: "Jag varnar dig.", exArb: "أحذرك." },
    // ADJECTIVES - MORE
    "Aktuell|Adjektiv": { exSwe: "Det är en aktuell fråga.", exArb: "هذه مسألة راهنة." },
    "Alternativ|Adjektiv": { exSwe: "Finns det alternativa lösningar?", exArb: "هل توجد حلول بديلة؟" },
    "Användbar|Adjektiv": { exSwe: "Verktyget är användbart.", exArb: "الأداة مفيدة." },
    "Automatisk|Adjektiv": { exSwe: "Dörren är automatisk.", exArb: "الباب أوتوماتيكي." },
    "Bekväm|Adjektiv": { exSwe: "Soffan är bekväm.", exArb: "الأريكة مريحة." },
    "Central|Adjektiv": { exSwe: "Hotellet ligger centralt.", exArb: "الفندق في موقع مركزي." },
    "Daglig|Adjektiv": { exSwe: "Det är en daglig rutin.", exArb: "هذا روتين يومي." },
    "Digital|Adjektiv": { exSwe: "Vi lever i en digital värld.", exArb: "نعيش في عالم رقمي." },
    "Ekonomisk|Adjektiv": { exSwe: "Det är ekonomiskt läge.", exArb: "إنه وضع اقتصادي." },
    "Elektrisk|Adjektiv": { exSwe: "Bilen är elektrisk.", exArb: "السيارة كهربائية." },
    "Exakt|Adjektiv": { exSwe: "Ge mig exakt tid.", exArb: "أعطني الوقت بالضبط." },
    "Fantastisk|Adjektiv": { exSwe: "Det var fantastiskt!", exArb: "كان رائعاً!" },
    "Flexibel|Adjektiv": { exSwe: "Vi är flexibla med tiden.", exArb: "نحن مرنون بخصوص الوقت." },
    "Framtida|Adjektiv": { exSwe: "Framtida planer.", exArb: "خطط مستقبلية." },
    "Färdig|Adjektiv": { exSwe: "Maten är färdig.", exArb: "الطعام جاهز." },
    "Glad|Adjektiv": { exSwe: "Jag är glad idag.", exArb: "أنا سعيد اليوم." },
    "Grundläggande|Adjektiv": { exSwe: "Det är grundläggande kunskap.", exArb: "هذه معرفة أساسية." },
    "Historisk|Adjektiv": { exSwe: "Det är en historisk plats.", exArb: "هذا مكان تاريخي." },
    "Intensiv|Adjektiv": { exSwe: "Kursen är intensiv.", exArb: "الدورة مكثفة." },
    "Klassisk|Adjektiv": { exSwe: "Jag gillar klassisk musik.", exArb: "أحب الموسيقى الكلاسيكية." },
    "Komplett|Adjektiv": { exSwe: "Samlingen är komplett.", exArb: "المجموعة كاملة." },
    "Konstig|Adjektiv": { exSwe: "Det är konstigt.", exArb: "هذا غريب." },
    "Kulturell|Adjektiv": { exSwe: "Det är en kulturell händelse.", exArb: "هذا حدث ثقافي." },
    "Levande|Adjektiv": { exSwe: "Fisken är levande.", exArb: "السمكة حية." }
};

console.log('═══════════════════════════════════════════════════════════════');
console.log('     ADDING EXAMPLES - NEW BATCH 24 (Verbs + Adjectives)');
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
