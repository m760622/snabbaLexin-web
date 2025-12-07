/**
 * NEW EXAMPLES - BATCH 15
 * Common adjectives (50 examples)
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
    // PERSONALITY & CHARACTER
    // ==========================================
    "Artig|Adjektiv": {
        exSwe: "Barnet är mycket artigt.",
        exArb: "الطفل مهذب جداً."
    },
    "Blyg|Adjektiv": {
        exSwe: "Hon är lite blyg.",
        exArb: "هي خجولة قليلاً."
    },
    "Modig|Adjektiv": {
        exSwe: "Soldaten var mycket modig.",
        exArb: "كان الجندي شجاعاً جداً."
    },
    "Försiktig|Adjektiv": {
        exSwe: "Var försiktig på vägen!",
        exArb: "كن حذراً في الطريق!"
    },
    "Snäll|Adjektiv": {
        exSwe: "Han är snäll mot alla.",
        exArb: "هو لطيف مع الجميع."
    },
    "Generös|Adjektiv": {
        exSwe: "Hon är en generös person.",
        exArb: "هي شخص كريم."
    },
    "Ärlig|Adjektiv": {
        exSwe: "Det är viktigt att vara ärlig.",
        exArb: "من المهم أن تكون صادقاً."
    },
    "Pålitlig|Adjektiv": {
        exSwe: "Han är en pålitlig vän.",
        exArb: "هو صديق يمكن الاعتماد عليه."
    },
    "Ambitiös|Adjektiv": {
        exSwe: "Hon är väldigt ambitiös.",
        exArb: "هي طموحة جداً."
    },
    "Kreativ|Adjektiv": {
        exSwe: "Konstnären är mycket kreativ.",
        exArb: "الفنان مبدع جداً."
    },
    // ==========================================
    // SIZE & SHAPE
    // ==========================================
    "Bred|Adjektiv": {
        exSwe: "Floden är bred här.",
        exArb: "النهر عريض هنا."
    },
    "Smal|Adjektiv": {
        exSwe: "Gatan är för smal för bilar.",
        exArb: "الشارع ضيق جداً للسيارات."
    },
    "Tjock|Adjektiv": {
        exSwe: "Boken är tjock.",
        exArb: "الكتاب سميك."
    },
    "Tunn|Adjektiv": {
        exSwe: "Isen är för tunn att gå på.",
        exArb: "الجليد رقيق جداً للمشي عليه."
    },
    "Djup|Adjektiv": {
        exSwe: "Sjön är mycket djup.",
        exArb: "البحيرة عميقة جداً."
    },
    "Grund|Adjektiv": {
        exSwe: "Vattnet är grunt här.",
        exArb: "الماء ضحل هنا."
    },
    "Platt|Adjektiv": {
        exSwe: "Marken är helt platt.",
        exArb: "الأرض مسطحة تماماً."
    },
    "Rund|Adjektiv": {
        exSwe: "Jorden är rund.",
        exArb: "الأرض كروية."
    },
    "Fyrkantig|Adjektiv": {
        exSwe: "Bordet är fyrkantigt.",
        exArb: "الطاولة مربعة."
    },
    "Spetsig|Adjektiv": {
        exSwe: "Kniven är spetsig.",
        exArb: "السكين حادة."
    },
    // ==========================================
    // QUALITY & STATE
    // ==========================================
    "Ren|Adjektiv": {
        exSwe: "Vattnet är rent.",
        exArb: "الماء نظيف."
    },
    "Ful|Adjektiv": {
        exSwe: "Byggnaden är ful.",
        exArb: "المبنى قبيح."
    },
    "Gammal|Adjektiv": {
        exSwe: "Huset är hundra år gammalt.",
        exArb: "عمر البيت مائة سنة."
    },
    "Modern|Adjektiv": {
        exSwe: "Köket är modernt.",
        exArb: "المطبخ عصري."
    },
    "Enkel|Adjektiv": {
        exSwe: "Uppgiften är enkel.",
        exArb: "المهمة سهلة."
    },
    "Komplicerad|Adjektiv": {
        exSwe: "Situationen är komplicerad.",
        exArb: "الموقف معقد."
    },
    "Viktig|Adjektiv": {
        exSwe: "Det är en viktig fråga.",
        exArb: "هذا سؤال مهم."
    },
    "Nödvändig|Adjektiv": {
        exSwe: "Vatten är nödvändigt för livet.",
        exArb: "الماء ضروري للحياة."
    },
    "Möjlig|Adjektiv": {
        exSwe: "Allt är möjligt.",
        exArb: "كل شيء ممكن."
    },
    "Omöjlig|Adjektiv": {
        exSwe: "Det är omöjligt att göra.",
        exArb: "من المستحيل فعل ذلك."
    },
    // ==========================================
    // FEELINGS & EMOTIONS
    // ==========================================
    "Orolig|Adjektiv": {
        exSwe: "Jag är orolig för honom.",
        exArb: "أنا قلق عليه."
    },
    "Lugn|Adjektiv": {
        exSwe: "Var lugn, allt blir bra.",
        exArb: "كن هادئاً، كل شيء سيكون على ما يرام."
    },
    "Stressad|Adjektiv": {
        exSwe: "Jag är stressad inför provet.",
        exArb: "أنا متوتر قبل الامتحان."
    },
    "Avslappnad|Adjektiv": {
        exSwe: "Jag känner mig avslappnad.",
        exArb: "أشعر بالاسترخاء."
    },
    "Besviken|Adjektiv": {
        exSwe: "Han blev besviken på resultatet.",
        exArb: "أصيب بخيبة أمل من النتيجة."
    },
    "Nöjd|Adjektiv": {
        exSwe: "Jag är nöjd med mitt arbete.",
        exArb: "أنا راضٍ عن عملي."
    },
    "Förvånad|Adjektiv": {
        exSwe: "Jag blev förvånad över nyheten.",
        exArb: "تفاجأت بالخبر."
    },
    "Rädd|Adjektiv": {
        exSwe: "Barnet är rädd för mörker.",
        exArb: "الطفل يخاف من الظلام."
    },
    "Ensam|Adjektiv": {
        exSwe: "Jag känner mig ensam ibland.",
        exArb: "أشعر بالوحدة أحياناً."
    },
    "Tacksam|Adjektiv": {
        exSwe: "Jag är tacksam för din hjälp.",
        exArb: "أنا ممتن لمساعدتك."
    },
    // ==========================================
    // WEATHER & TEMPERATURE
    // ==========================================
    "Varm|Adjektiv": {
        exSwe: "Sommaren är varm i Sverige.",
        exArb: "الصيف حار في السويد."
    },
    "Kall|Adjektiv": {
        exSwe: "Vintern är kall i norr.",
        exArb: "الشتاء بارد في الشمال."
    },
    "Fuktig|Adjektiv": {
        exSwe: "Luften är fuktig idag.",
        exArb: "الهواء رطب اليوم."
    },
    "Torr|Adjektiv": {
        exSwe: "Sommaren var torr i år.",
        exArb: "كان الصيف جافاً هذا العام."
    },
    "Blåsig|Adjektiv": {
        exSwe: "Det är blåsigt ute.",
        exArb: "الجو عاصف في الخارج."
    },
    "Solig|Adjektiv": {
        exSwe: "Det är en solig dag.",
        exArb: "إنه يوم مشمس."
    },
    "Molnig|Adjektiv": {
        exSwe: "Himlen är molnig.",
        exArb: "السماء غائمة."
    },
    "Dimmig|Adjektiv": {
        exSwe: "Det är dimmigt på morgonen.",
        exArb: "الجو ضبابي في الصباح."
    },
    "Regnig|Adjektiv": {
        exSwe: "Hösten är regnig.",
        exArb: "الخريف ماطر."
    },
    "Snöig|Adjektiv": {
        exSwe: "Det är en snöig vinter.",
        exArb: "إنه شتاء ثلجي."
    }
};

console.log('═══════════════════════════════════════════════════════════════');
console.log('     ADDING EXAMPLES - NEW BATCH 15 (50 Common Adjectives)');
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
