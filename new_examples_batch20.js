/**
 * NEW EXAMPLES - BATCH 20
 * Travel, Transport & Places (50 examples)
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
    // TRANSPORT
    "Bil|Substantiv": { exSwe: "Bilen står parkerad utanför.", exArb: "السيارة متوقفة في الخارج." },
    "Buss|Substantiv": { exSwe: "Bussen kommer om fem minuter.", exArb: "تأتي الحافلة بعد خمس دقائق." },
    "Tåg|Substantiv": { exSwe: "Tåget avgår från spår tre.", exArb: "يغادر القطار من الرصيف الثالث." },
    "Tunnelbana|Substantiv": { exSwe: "Ta tunnelbanan till centrum.", exArb: "خذ المترو إلى المركز." },
    "Spårvagn|Substantiv": { exSwe: "Spårvagnen kör genom staden.", exArb: "يسير الترام عبر المدينة." },
    "Flygplan|Substantiv": { exSwe: "Flygplanet landar om en timme.", exArb: "تهبط الطائرة بعد ساعة." },
    "Båt|Substantiv": { exSwe: "Båten seglar över havet.", exArb: "يبحر القارب عبر البحر." },
    "Färja|Substantiv": { exSwe: "Färjan går till Finland.", exArb: "تذهب العبّارة إلى فنلندا." },
    "Cykel|Substantiv": { exSwe: "Jag cyklar till jobbet.", exArb: "أركب الدراجة للعمل." },
    "Motorcykel|Substantiv": { exSwe: "Motorcykeln är snabb.", exArb: "الدراجة النارية سريعة." },
    // TRAVEL ITEMS
    "Biljett|Substantiv": { exSwe: "Köp biljetten i automaten.", exArb: "اشترِ التذكرة من الآلة." },
    "Pass|Substantiv": { exSwe: "Passet är giltigt i tio år.", exArb: "جواز السفر صالح لعشر سنوات." },
    "Visum|Substantiv": { exSwe: "Du behöver visum för att resa dit.", exArb: "تحتاج تأشيرة للسفر إلى هناك." },
    "Bagage|Substantiv": { exSwe: "Bagaget är för tungt.", exArb: "الأمتعة ثقيلة جداً." },
    "Resväska|Substantiv": { exSwe: "Packa resväskan!", exArb: "احزم حقيبة السفر!" },
    "Handbagage|Substantiv": { exSwe: "Handbagaget får väga max åtta kilo.", exArb: "يجب ألا يزيد وزن حقيبة اليد عن ثمانية كيلو." },
    "Karta|Substantiv": { exSwe: "Titta på kartan.", exArb: "انظر إلى الخريطة." },
    "Kompass|Substantiv": { exSwe: "Kompassen visar norr.", exArb: "البوصلة تشير إلى الشمال." },
    "Guide|Substantiv": { exSwe: "Guiden visar oss runt.", exArb: "المرشد يرينا المكان." },
    "Turistbyrå|Substantiv": { exSwe: "Fråga på turistbyrån.", exArb: "اسأل في مكتب السياحة." },
    // PLACES TO STAY
    "Hotell|Substantiv": { exSwe: "Vi bor på ett hotell.", exArb: "نقيم في فندق." },
    "Rum|Substantiv": { exSwe: "Rummet är rent.", exArb: "الغرفة نظيفة." },
    "Bokning|Substantiv": { exSwe: "Jag har en bokning.", exArb: "لدي حجز." },
    "Reception|Substantiv": { exSwe: "Fråga i receptionen.", exArb: "اسأل في الاستقبال." },
    "Incheckning|Substantiv": { exSwe: "Incheckningen börjar klockan tre.", exArb: "يبدأ تسجيل الوصول الساعة الثالثة." },
    "Utcheckning|Substantiv": { exSwe: "Utcheckning senast klockan elva.", exArb: "تسجيل المغادرة قبل الساعة الحادية عشرة." },
    // DIRECTIONS
    "Riktning|Substantiv": { exSwe: "I vilken riktning?", exArb: "في أي اتجاه؟" },
    "Höger|Substantiv": { exSwe: "Sväng till höger.", exArb: "انعطف يميناً." },
    "Vänster|Substantiv": { exSwe: "Gå till vänster.", exArb: "اذهب يساراً." },
    "Rakt fram|": { exSwe: "Gå rakt fram.", exArb: "امشِ مباشرة." },
    "Korsning|Substantiv": { exSwe: "Sväng vid korsningen.", exArb: "انعطف عند التقاطع." },
    "Rondell|Substantiv": { exSwe: "Ta andra avfarten i rondellen.", exArb: "خذ المخرج الثاني في الدوار." },
    "Gata|Substantiv": { exSwe: "Gatan är lång.", exArb: "الشارع طويل." },
    "Väg|Substantiv": { exSwe: "Vägen går genom skogen.", exArb: "الطريق يمر عبر الغابة." },
    "Stig|Substantiv": { exSwe: "Följ stigen.", exArb: "اتبع الممر." },
    // PLACES
    "Station|Substantiv": { exSwe: "Stationen ligger här.", exArb: "المحطة هنا." },
    "Terminal|Substantiv": { exSwe: "Gå till terminal fem.", exArb: "اذهب إلى الصالة الخامسة." },
    "Hållplats|Substantiv": { exSwe: "Hållplatsen är där borta.", exArb: "محطة الحافلات هناك." },
    "Parkering|Substantiv": { exSwe: "Parkeringen är full.", exArb: "موقف السيارات ممتلئ." },
    // COUNTRIES & NATIONALITIES
    "Land|Substantiv": { exSwe: "Sverige är ett fint land.", exArb: "السويد بلد جميل." },
    "Stad|Substantiv": { exSwe: "Stockholm är en stor stad.", exArb: "ستوكهولم مدينة كبيرة." },
    "By|Substantiv": { exSwe: "Byn är liten och lugn.", exArb: "القرية صغيرة وهادئة." },
    "Gräns|Substantiv": { exSwe: "Vi passerade gränsen.", exArb: "عبرنا الحدود." },
    "Huvudstad|Substantiv": { exSwe: "Paris är Frankrikes huvudstad.", exArb: "باريس عاصمة فرنسا." },
    // MORE TRAVEL
    "Resa|Substantiv": { exSwe: "Resan tar fyra timmar.", exArb: "الرحلة تستغرق أربع ساعات." },
    "Semester|Substantiv": { exSwe: "Vi åker på semester.", exArb: "سنذهب في إجازة." },
    "Utflykt|Substantiv": { exSwe: "Vi gör en utflykt imorgon.", exArb: "سنقوم برحلة غداً." },
    "Vandring|Substantiv": { exSwe: "Vandringen var lång.", exArb: "كانت المشي لمسافات طويلة." },
    "Camping|Substantiv": { exSwe: "Vi sov på en camping.", exArb: "نمنا في مخيم." },
    "Strand|Substantiv": { exSwe: "Stranden är vacker.", exArb: "الشاطئ جميل." }
};

console.log('═══════════════════════════════════════════════════════════════');
console.log('     ADDING EXAMPLES - NEW BATCH 20 (50 Travel/Transport Words)');
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
