/**
 * NEW EXAMPLES - BATCH 19
 * Health, Body & Medical (50 examples)
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
    // HEALTH & ILLNESS
    "Sjukdom|Substantiv": { exSwe: "Sjukdomen sprider sig snabbt.", exArb: "ينتشر المرض بسرعة." },
    "Feber|Substantiv": { exSwe: "Barnet har hög feber.", exArb: "الطفل لديه حمى عالية." },
    "Förkylning|Substantiv": { exSwe: "Jag har en förkylning.", exArb: "لدي زكام." },
    "Influensa|Substantiv": { exSwe: "Influensan är vanlig på vintern.", exArb: "الإنفلونزا شائعة في الشتاء." },
    "Allergi|Substantiv": { exSwe: "Hon har allergi mot nötter.", exArb: "لديها حساسية من المكسرات." },
    "Smärta|Substantiv": { exSwe: "Smärtan är outhärdlig.", exArb: "الألم لا يُطاق." },
    "Sår|Substantiv": { exSwe: "Såret måste rengöras.", exArb: "يجب تنظيف الجرح." },
    "Blåmärke|Substantiv": { exSwe: "Han har ett blåmärke på armen.", exArb: "لديه كدمة على ذراعه." },
    "Svullnad|Substantiv": { exSwe: "Svullnaden gick ner.", exArb: "خف التورم." },
    "Infektion|Substantiv": { exSwe: "Infektionen kräver antibiotika.", exArb: "تحتاج العدوى إلى مضادات حيوية." },
    // MEDICAL
    "Medicin|Substantiv": { exSwe: "Ta medicinen tre gånger om dagen.", exArb: "تناول الدواء ثلاث مرات يومياً." },
    "Tablett|Substantiv": { exSwe: "Svälj tabletten med vatten.", exArb: "ابلع الحبة مع الماء." },
    "Spruta|Substantiv": { exSwe: "Sjuksköterskan gav en spruta.", exArb: "أعطت الممرضة حقنة." },
    "Bandage|Substantiv": { exSwe: "Lägg bandage på såret.", exArb: "ضع ضمادة على الجرح." },
    "Plåster|Substantiv": { exSwe: "Sätt ett plåster på snittet.", exArb: "ضع لاصقة على القطع." },
    "Recept|Substantiv": { exSwe: "Läkaren skrev ett recept.", exArb: "كتب الطبيب وصفة طبية." },
    "Undersökning|Substantiv": { exSwe: "Jag ska på en undersökning.", exArb: "سأذهب لفحص طبي." },
    "Operation|Substantiv": { exSwe: "Operationen gick bra.", exArb: "نجحت العملية." },
    "Röntgen|Substantiv": { exSwe: "De tog en röntgenbild.", exArb: "أخذوا صورة أشعة." },
    "Blodprov|Substantiv": { exSwe: "Jag tog ett blodprov.", exArb: "أجريت فحص دم." },
    // HEALTHCARE
    "Sjukhus|Substantiv": { exSwe: "Han ligger på sjukhuset.", exArb: "هو راقد في المستشفى." },
    "Klinik|Substantiv": { exSwe: "Kliniken öppnar klockan åtta.", exArb: "تفتح العيادة الساعة الثامنة." },
    "Vårdcentral|Substantiv": { exSwe: "Jag har tid på vårdcentralen.", exArb: "لدي موعد في المركز الصحي." },
    "Apotek|Substantiv": { exSwe: "Köp medicinen på apoteket.", exArb: "اشترِ الدواء من الصيدلية." },
    "Akut|Substantiv": { exSwe: "Hon åkte till akuten.", exArb: "ذهبت إلى الطوارئ." },
    "Ambulans|Substantiv": { exSwe: "Ring ambulansen!", exArb: "اتصل بالإسعاف!" },
    "Patient|Substantiv": { exSwe: "Patienten mår bättre.", exArb: "المريض يشعر بتحسن." },
    // WELLBEING
    "Hälsa|Substantiv": { exSwe: "Hälsan är det viktigaste.", exArb: "الصحة هي الأهم." },
    "Kondition|Substantiv": { exSwe: "Han har bra kondition.", exArb: "لديه لياقة بدنية جيدة." },
    "Motion|Substantiv": { exSwe: "Motion är bra för kroppen.", exArb: "الرياضة مفيدة للجسم." },
    "Träning|Substantiv": { exSwe: "Jag går på träning varje dag.", exArb: "أذهب للتمرين كل يوم." },
    "Diet|Substantiv": { exSwe: "Hon följer en strikt diet.", exArb: "تتبع حمية صارمة." },
    "Vikt|Substantiv": { exSwe: "Jag vill gå ner i vikt.", exArb: "أريد إنقاص وزني." },
    "Stress|Substantiv": { exSwe: "Stress är skadligt för hälsan.", exArb: "الإجهاد ضار بالصحة." },
    "Avslappning|Substantiv": { exSwe: "Avslappning är viktigt.", exArb: "الاسترخاء مهم." },
    // MORE BODY
    "Hjärna|Substantiv": { exSwe: "Hjärnan styr kroppen.", exArb: "الدماغ يتحكم في الجسم." },
    "Lunga|Substantiv": { exSwe: "Lungorna behöver frisk luft.", exArb: "الرئتان تحتاجان هواءً نقياً." },
    "Lever|Substantiv": { exSwe: "Levern renar blodet.", exArb: "الكبد ينقي الدم." },
    "Njure|Substantiv": { exSwe: "Vi har två njurar.", exArb: "لدينا كليتان." },
    "Muskel|Substantiv": { exSwe: "Muskeln gör ont.", exArb: "العضلة تؤلم." },
    "Nerv|Substantiv": { exSwe: "Nerven är skadad.", exArb: "العصب تالف." },
    "Led|Substantiv": { exSwe: "Han har ont i lederna.", exArb: "مفاصله تؤلمه." },
    "Skelett|Substantiv": { exSwe: "Skelettet består av ben.", exArb: "الهيكل العظمي يتكون من عظام." },
    // SENSES
    "Syn|Substantiv": { exSwe: "Min syn har försämrats.", exArb: "ضعف بصري." },
    "Hörsel|Substantiv": { exSwe: "Hans hörsel är bra.", exArb: "سمعه جيد." },
    "Smak|Substantiv": { exSwe: "Maten har ingen smak.", exArb: "الطعام بلا طعم." },
    "Lukt|Substantiv": { exSwe: "Lukten är stark.", exArb: "الرائحة قوية." },
    "Känsel|Substantiv": { exSwe: "Känseln i fingrarna är borta.", exArb: "فقدت الإحساس في الأصابع." },
    "Andning|Substantiv": { exSwe: "Andningen är tung.", exArb: "التنفس ثقيل." },
    "Puls|Substantiv": { exSwe: "Pulsen är hög.", exArb: "النبض مرتفع." }
};

console.log('═══════════════════════════════════════════════════════════════');
console.log('     ADDING EXAMPLES - NEW BATCH 19 (50 Health/Body Words)');
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
