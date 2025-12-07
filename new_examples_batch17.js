/**
 * NEW EXAMPLES - BATCH 17
 * Food, Nature & Animals (50 examples)
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
    // FRUITS
    "Äpple|Substantiv": { exSwe: "Äpplet är rött.", exArb: "التفاحة حمراء." },
    "Päron|Substantiv": { exSwe: "Päronet är moget.", exArb: "الكمثرى ناضجة." },
    "Banan|Substantiv": { exSwe: "Apor älskar bananer.", exArb: "القرود تحب الموز." },
    "Druva|Substantiv": { exSwe: "Vi odlar druvor.", exArb: "نزرع العنب." },
    "Citron|Substantiv": { exSwe: "Citronen är sur.", exArb: "الليمون حامض." },
    "Jordgubbe|Substantiv": { exSwe: "Jordgubbar är söta.", exArb: "الفراولة حلوة." },
    "Hallon|Substantiv": { exSwe: "Hallonen växer i trädgården.", exArb: "التوت ينمو في الحديقة." },
    "Blåbär|Substantiv": { exSwe: "Vi plockar blåbär i skogen.", exArb: "نقطف التوت البري في الغابة." },
    "Vattenmelon|Substantiv": { exSwe: "Vattenmelon är gott på sommaren.", exArb: "البطيخ لذيذ في الصيف." },
    "Ananas|Substantiv": { exSwe: "Ananasen kommer från tropikerna.", exArb: "الأناناس يأتي من المناطق الاستوائية." },
    // VEGETABLES
    "Tomat|Substantiv": { exSwe: "Tomater används i sallad.", exArb: "يُستخدم الطماطم في السلطة." },
    "Gurka|Substantiv": { exSwe: "Gurkan är fräsch.", exArb: "الخيار طازج." },
    "Morot|Substantiv": { exSwe: "Morötter är nyttiga.", exArb: "الجزر مفيد." },
    "Lök|Substantiv": { exSwe: "Lök får ögonen att tåras.", exArb: "البصل يجعل العيون تدمع." },
    "Vitlök|Substantiv": { exSwe: "Vitlök är bra för hälsan.", exArb: "الثوم مفيد للصحة." },
    "Paprika|Substantiv": { exSwe: "Röd paprika är söt.", exArb: "الفلفل الأحمر حلو." },
    "Broccoli|Substantiv": { exSwe: "Barn ska äta broccoli.", exArb: "على الأطفال أكل البروكلي." },
    "Spenat|Substantiv": { exSwe: "Spenat innehåller järn.", exArb: "السبانخ يحتوي على حديد." },
    // ANIMALS
    "Hund|Substantiv": { exSwe: "Hunden skäller.", exArb: "الكلب ينبح." },
    "Katt|Substantiv": { exSwe: "Katten sover på soffan.", exArb: "القطة تنام على الأريكة." },
    "Häst|Substantiv": { exSwe: "Hästen springer snabbt.", exArb: "الحصان يركض بسرعة." },
    "Ko|Substantiv": { exSwe: "Kon ger mjölk.", exArb: "البقرة تعطي الحليب." },
    "Får|Substantiv": { exSwe: "Fåren betar på ängen.", exArb: "الخراف ترعى في المرج." },
    "Get|Substantiv": { exSwe: "Geten klättrar på berget.", exArb: "الماعز يتسلق الجبل." },
    "Gris|Substantiv": { exSwe: "Grisen lever på gården.", exArb: "الخنزير يعيش في المزرعة." },
    "Höna|Substantiv": { exSwe: "Hönan lägger ägg.", exArb: "الدجاجة تبيض." },
    "Anka|Substantiv": { exSwe: "Ankan simmar i dammen.", exArb: "البطة تسبح في البركة." },
    "Kanin|Substantiv": { exSwe: "Kaninen äter morötter.", exArb: "الأرنب يأكل الجزر." },
    // WILD ANIMALS
    "Björn|Substantiv": { exSwe: "Björnen sover på vintern.", exArb: "الدب ينام في الشتاء." },
    "Varg|Substantiv": { exSwe: "Vargen ylar på natten.", exArb: "الذئب يعوي في الليل." },
    "Räv|Substantiv": { exSwe: "Räven är listig.", exArb: "الثعلب ماكر." },
    "Älg|Substantiv": { exSwe: "Älgen är stor.", exArb: "الأيل كبير." },
    "Rådjur|Substantiv": { exSwe: "Rådjuret sprang över vägen.", exArb: "ركض الظبي عبر الطريق." },
    "Ekorre|Substantiv": { exSwe: "Ekorren samlar nötter.", exArb: "السنجاب يجمع المكسرات." },
    "Igelkott|Substantiv": { exSwe: "Igelkotten har taggar.", exArb: "القنفذ له أشواك." },
    // BIRDS
    "Fågel|Substantiv": { exSwe: "Fågeln sjunger vackert.", exArb: "الطائر يغني بجمال." },
    "Örn|Substantiv": { exSwe: "Örnen flyger högt.", exArb: "النسر يطير عالياً." },
    "Uggla|Substantiv": { exSwe: "Ugglan ser i mörkret.", exArb: "البومة ترى في الظلام." },
    "Svan|Substantiv": { exSwe: "Svanarna simmar på sjön.", exArb: "البجع يسبح في البحيرة." },
    "Duva|Substantiv": { exSwe: "Duvan är en fredssymbol.", exArb: "الحمامة رمز للسلام." },
    // NATURE
    "Träd|Substantiv": { exSwe: "Trädet tappar löven på hösten.", exArb: "الشجرة تفقد أوراقها في الخريف." },
    "Blomma|Substantiv": { exSwe: "Blommorna luktar gott.", exArb: "الزهور رائحتها طيبة." },
    "Gräs|Substantiv": { exSwe: "Gräset är grönt.", exArb: "العشب أخضر." },
    "Löv|Substantiv": { exSwe: "Löven faller på hösten.", exArb: "الأوراق تسقط في الخريف." },
    "Gren|Substantiv": { exSwe: "Fågeln sitter på grenen.", exArb: "الطائر يجلس على الغصن." },
    "Rot|Substantiv": { exSwe: "Trädet har djupa rötter.", exArb: "للشجرة جذور عميقة." },
    "Frö|Substantiv": { exSwe: "Plantera fröet i jorden.", exArb: "ازرع البذرة في التربة." },
    "Jord|Substantiv": { exSwe: "Jorden är bördig.", exArb: "التربة خصبة." },
    "Sand|Substantiv": { exSwe: "Barnen leker i sanden.", exArb: "يلعب الأطفال في الرمل." },
    "Sten|Substantiv": { exSwe: "Stenen är tung.", exArb: "الحجر ثقيل." }
};

console.log('═══════════════════════════════════════════════════════════════');
console.log('     ADDING EXAMPLES - NEW BATCH 17 (50 Food/Nature/Animals)');
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
