const fs = require('fs');

// Read data.js
let dataContent = fs.readFileSync('./data.js', 'utf-8');

// Parse
let dictionaryData;
let prefix = "";
let suffix = "";

if (dataContent.includes('const dictionaryData =')) {
    prefix = "const dictionaryData = ";
    suffix = ";";
    dictionaryData = JSON.parse(dataContent.replace(prefix, '').replace(/;$/, ''));
} else {
    process.exit(1);
}

const COL_SWE = 2;
const COL_EX = 6;
const COL_EX_ARB = 7;

// Fixes for the flagged technical tautologies
const updates = {
    // Bygg
    "Betongbro": { swe: "En betongbro kräver mindre underhåll än en träbro.", arb: "تتطلب الجسور الخرسانية صيانة أقل من الجسور الخشبية." },
    "Betongkvalitet": { swe: "Det är viktigt att kontrollera betongkvaliteten innan gjutning.", arb: "من المهم التحقق من جودة الخرسانة قبل الصب." },
    "Betongsten": { swe: "Betongsten används ofta för att lägga marksten i trädgårdar.", arb: "تستخدم أحجار الخرسانة غالباً لرصف الأرضيات في الحدائق." },
    "Blindprov": { swe: "Ett blindprov genomfördes för att testa materialets hållbarhet.", arb: "تم إجراء اختبار أعمى لفحص متانة المادة." },
    "Bokföra": { swe: "Alla utgifter måste bokföras noggrant i projektet.", arb: "يجب تسجيل جميع النفقات بدقة في المشروع." },
    "Bottenplatta": { swe: "Huset vilar på en gjuten bottenplatta av betong.", arb: "يستند المنزل على قاعدة أرضية مصبوبة من الخرسانة." },
    "Brandisolering": { swe: "Vi måste installera brandisolering i väggarna.", arb: "يجب علينا تركيب عزل ضد الحريق في الجدران." },
    "Brandsäker": { swe: "Dörren är klassad som brandsäker i 60 minuter.", arb: "الباب مصنف كـ مقاوم للحريق لمدة 60 دقيقة." },
    "Budgivning": { swe: "Budgivningen på huset blev mycket intensiv.", arb: "كانت المزايدة على المنزل مكثفة للغاية." },
    "Bygga": { swe: "Vi planerar att bygga en ny altan i sommar.", arb: "نخطط لبناء شرفة جديدة هذا الصيف." },
    "Byggherre": { swe: "Byggherren ansvarar för att byggprojektet följer lagar och regler.", arb: "صاحب المشروع (رب العمل) مسؤول عن امتثال مشروع البناء للقوانين واللوائح." },
    "Byggnadsdel": { swe: "Taket är en kritisk byggnadsdel som måste skyddas mot fukt.", arb: "السقف جزء حيوي من المبنى يجب حمايته من الرطوبة." },
    "Byggnorm": { swe: "Alla nya hus måste följa gällande byggnorm.", arb: "يجب أن تلتزم جميع المنازل الجديدة بمعايير البناء المعمول بها." },
    "Bäring": { swe: "Konstruktionen har god bäring och klarar tunga laster.", arb: "يتمتع الهيكل بقدرة تحمل جيدة ويستطيع مقاومة الأحمال الثقيلة." },
    "Cementblandare": { swe: "Vi hyrde en cementblandare för att blanda bruket.", arb: "استأجرنا خلاطة أسمنت لخلط المونة." },
    "Certifikat": { swe: "Elektrikern måste ha ett giltigt certifikat.", arb: "يجب أن يكون لدى الكهربائي شهادة سارية المفعول." },
    "Densitet": { swe: "Materialet har hög densitet och isolerar bra mot ljud.", arb: "تتميز المادة بكثافة عالية وتعزل الصوت بشكل جيد." },
    "Diameter": { swe: "Röret har en diameter på 10 centimeter.", arb: "يبلغ قطر الأنبوب 10 سنتيمترات." },
    "Dimensionstolerans": { swe: "Vi måste hålla oss inom snäva dimensionstoleranser.", arb: "يجب علينا الالتزام بتفاوتات الأبعاد الدقيقة." },
    "Dirigera om": { swe: "Trafiken fick dirigeras om på grund av vägarbetet.", arb: "تم تحويل حركة المرور بسبب أعمال الطرق." },

    // Medicin (Examples from stats, though specific words weren't listed in sample, I'll check generic placeholders if any)
    // Since audit said "Bad: 22" for Medicin, and they are likely placeholders "Medicin: Word".
    // I will try to catch common ones if I knew them, but based on Bygg pattern, it's likely "Medicin: [Word]".
    // I'll stick to fixing the known Bygg ones first, as they were explicitly sampled.
};

let modifiedCount = 0;

dictionaryData.forEach(entry => {
    const word = entry[COL_SWE] ? entry[COL_SWE].trim() : "";
    if (updates[word]) {
        console.log(`Updating Technical: ${word}`);
        entry[COL_EX] = updates[word].swe;
        entry[COL_EX_ARB] = updates[word].arb;
        modifiedCount++;
    }
});

// Write back
const newContent = prefix + JSON.stringify(dictionaryData, null, 2) + suffix;
fs.writeFileSync('./data.js', newContent, 'utf-8');

console.log(`\n✅ Fixed ${modifiedCount} Technical tautologies.`);
