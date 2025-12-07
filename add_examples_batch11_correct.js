/**
 * ADD EXAMPLES - BATCH 11 (Correct Word Matching)
 * Focus on more specific vocabulary
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
    // ==========================================
    // KITCHEN & COOKING (More specific)
    // ==========================================
    "Spis|Substantiv": { exSwe: "Jag lagar mat på spisen.", exArb: "أطبخ على الموقد." },
    "Elvisp|Substantiv": { exSwe: "Använd elvispen.", exArb: "استخدم الخلاط الكهربائي." },
    "Rivjärn|Substantiv": { exSwe: "Riv osten med rivjärnet.", exArb: "ابرش الجبن بالمبشرة." },
    "Lock|Substantiv": { exSwe: "Lägg på locket.", exArb: "ضع الغطاء." },
    "Handtag|Substantiv": { exSwe: "Ta tag i handtaget.", exArb: "امسك المقبض." },
    "Servett|Substantiv": { exSwe: "Ta en servett.", exArb: "خذ منديلاً." },
    "Duk|Substantiv": { exSwe: "Lägg duken på bordet.", exArb: "ضع المفرش على الطاولة." },
    "Vas|Substantiv": { exSwe: "Sätt blommorna i vasen.", exArb: "ضع الأزهار في المزهرية." },
    "Ljusstake|Substantiv": { exSwe: "Tänd ljuset i ljusstaken.", exArb: "أشعل الشمعة في حامل الشموع." },
    "Bricka|Substantiv": { exSwe: "Bär maten på en bricka.", exArb: "احمل الطعام على صينية." },
    "Kryddor|Substantiv": { exSwe: "Tillsätt kryddor.", exArb: "أضف التوابل." },
    "Salt|Substantiv": { exSwe: "Mer salt, tack.", exArb: "المزيد من الملح، من فضلك." },
    "Peppar|Substantiv": { exSwe: "Vill du ha peppar?", exArb: "هل تريد فلفل؟" },
    "Socker|Substantiv": { exSwe: "Jag tar socker i kaffet.", exArb: "آخذ سكر في القهوة." },
    "Mjöl|Substantiv": { exSwe: "Mjölet är slut.", exArb: "نفد الطحين." },
    "Deg|Substantiv": { exSwe: "Kavla ut degen.", exArb: "افرد العجين." },
    "Buljong|Substantiv": { exSwe: "Tillsätt buljong.", exArb: "أضف المرق." },
    "Vinäger|Substantiv": { exSwe: "Tillsätt lite vinäger.", exArb: "أضف قليلاً من الخل." },
    "Olja|Substantiv": { exSwe: "Stek i olja.", exArb: "اقلِ بالزيت." },
    "Smör|Substantiv": { exSwe: "Bre smör på brödet.", exArb: "ادهن الخبز بالزبدة." },

    // ==========================================
    // MORE FOODS
    // ==========================================
    "Ost|Substantiv": { exSwe: "Svensk ost är god.", exArb: "الجبن السويدي لذيذ." },
    "Ägg|Substantiv": { exSwe: "Jag kokar ägg.", exArb: "أسلق البيض." },
    "Fil|Substantiv": { exSwe: "Jag äter fil till frukost.", exArb: "آكل اللبن للفطور." },
    "Yoghurt|Substantiv": { exSwe: "Yoghurten är god.", exArb: "الزبادي لذيذ." },
    "Grädde|Substantiv": { exSwe: "Vill du ha grädde?", exArb: "هل تريد كريمة؟" },
    "Glass|Substantiv": { exSwe: "Jag vill ha glass.", exArb: "أريد آيس كريم." },
    "Sylt|Substantiv": { exSwe: "Jag sätter sylt på mackan.", exArb: "أضع مربى على الشطيرة." },
    "Honung|Substantiv": { exSwe: "Honung är söt.", exArb: "العسل حلو." },
    "Godis|Substantiv": { exSwe: "Barnen älskar godis.", exArb: "الأطفال يحبون الحلوى." },
    "Choklad|Substantiv": { exSwe: "Jag äter choklad.", exArb: "آكل الشوكولاتة." },
    "Kex|Substantiv": { exSwe: "Ta ett kex.", exArb: "خذ بسكويتة." },
    "Bulle|Substantiv": { exSwe: "Kanelbullen är god.", exArb: "كعكة القرفة لذيذة." },
    "Tårta|Substantiv": { exSwe: "Vi bakar en tårta.", exArb: "نخبز كعكة." },
    "Bakelse|Substantiv": { exSwe: "Jag köper en bakelse.", exArb: "أشتري حلوى." },
    "Chips|Substantiv": { exSwe: "Vi äter chips.", exArb: "نأكل رقائق البطاطس." },
    "Nötter|Substantiv": { exSwe: "Jag äter nötter.", exArb: "آكل المكسرات." },
    "Mandel|Substantiv": { exSwe: "Mandlar är goda.", exArb: "اللوز لذيذ." },
    "Russin|Substantiv": { exSwe: "Jag gillar russin.", exArb: "أحب الزبيب." },

    // ==========================================
    // DRINKS
    // ==========================================
    "Juice|Substantiv": { exSwe: "Jag dricker apelsinjuice.", exArb: "أشرب عصير برتقال." },
    "Läsk|Substantiv": { exSwe: "Läsk är osunt.", exArb: "المشروبات الغازية غير صحية." },
    "Saft|Substantiv": { exSwe: "Saften är för söt.", exArb: "العصير حلو جداً." },
    "Öl|Substantiv": { exSwe: "Han dricker öl.", exArb: "يشرب البيرة." },
    "Vin|Substantiv": { exSwe: "Vi dricker rött vin.", exArb: "نشرب نبيذاً أحمر." },
    "Vatten|Substantiv": { exSwe: "Drick mycket vatten.", exArb: "اشرب الكثير من الماء." },
    "Mineralvatten|Substantiv": { exSwe: "Jag tar mineralvatten.", exArb: "آخذ ماء معدني." },
    "Te|Substantiv": { exSwe: "Jag dricker te.", exArb: "أشرب الشاي." },
    "Kaffe|Substantiv": { exSwe: "Jag behöver kaffe.", exArb: "أحتاج قهوة." },
    "Kakao|Substantiv": { exSwe: "Barnen dricker kakao.", exArb: "الأطفال يشربون الكاكاو." },

    // ==========================================
    // FURNITURE (More)
    // ==========================================
    "Bokhylla|Substantiv": { exSwe: "Böckerna står i bokhyllan.", exArb: "الكتب في المكتبة." },
    "Skrivbord|Substantiv": { exSwe: "Datorn står på skrivbordet.", exArb: "الكمبيوتر على المكتب." },
    "Byrå|Substantiv": { exSwe: "Kläderna ligger i byrån.", exArb: "الملابس في الكومود." },
    "Garderob|Substantiv": { exSwe: "Jackan hänger i garderoben.", exArb: "السترة معلقة في الخزانة." },
    "Skåp|Substantiv": { exSwe: "Tallrikarna står i skåpet.", exArb: "الأطباق في الخزانة." },
    "Låda|Substantiv": { exSwe: "Öppna lådan.", exArb: "افتح الدرج." },
    "Hylla|Substantiv": { exSwe: "Lägg boken på hyllan.", exArb: "ضع الكتاب على الرف." },
    "Krok|Substantiv": { exSwe: "Häng jackan på kroken.", exArb: "علّق السترة على العلاقة." },
    "Matta|Substantiv": { exSwe: "Mattan är mjuk.", exArb: "السجادة ناعمة." },
    "Pall|Substantiv": { exSwe: "Sätt dig på pallen.", exArb: "اجلس على الكرسي الصغير." },
    "Fåtölj|Substantiv": { exSwe: "Jag sitter i fåtöljen.", exArb: "أجلس في الكرسي بذراعين." },
    "Gungstol|Substantiv": { exSwe: "Farfar sitter i gungstolen.", exArb: "جدي يجلس في الكرسي الهزاز." },

    // ==========================================
    // NATURE & OUTDOORS (More)
    // ==========================================
    "Park|Substantiv": { exSwe: "Vi går i parken.", exArb: "نتمشى في الحديقة." },
    "Trädgård|Substantiv": { exSwe: "Jag arbetar i trädgården.", exArb: "أعمل في الحديقة." },
    "Rabatt|Substantiv": { exSwe: "Blommorna växer i rabatten.", exArb: "الأزهار تنمو في الحوض." },
    "Gräsmatta|Substantiv": { exSwe: "Jag klipper gräsmattan.", exArb: "أقص العشب." },
    "Häck|Substantiv": { exSwe: "Häcken behöver klippas.", exArb: "السياج الحي يحتاج للقص." },
    "Bäck|Substantiv": { exSwe: "Bäcken rinner genom skogen.", exArb: "النهر الصغير يجري عبر الغابة." },
    "Damm|Substantiv": { exSwe: "Andorna simmar i dammen.", exArb: "البط يسبح في البركة." },
    "Vattenfall|Substantiv": { exSwe: "Vattenfallet är vackert.", exArb: "الشلال جميل." },
    "Öken|Substantiv": { exSwe: "Öknen är het.", exArb: "الصحراء حارة." },
    "Djungel|Substantiv": { exSwe: "Djungeln är grön.", exArb: "الغابة المطيرة خضراء." },
    "Vulkan|Substantiv": { exSwe: "Vulkanen hade utbrott.", exArb: "ثار البركان." },
    "Grotta|Substantiv": { exSwe: "Vi utforskar grottan.", exArb: "نستكشف الكهف." },
    "Kulle|Substantiv": { exSwe: "Barnen springer uppför kullen.", exArb: "الأطفال يركضون صعوداً على التل." },
    "Dal|Substantiv": { exSwe: "Byn ligger i dalen.", exArb: "القرية في الوادي." },
    "Ö|Substantiv": { exSwe: "Vi åker till en ö.", exArb: "نذهب إلى جزيرة." },
    "Halvö|Substantiv": { exSwe: "Sverige ligger på en halvö.", exArb: "السويد على شبه جزيرة." },
    "Kust|Substantiv": { exSwe: "Vi bor vid kusten.", exArb: "نسكن على الساحل." },
    "Hamn|Substantiv": { exSwe: "Båtarna ligger i hamnen.", exArb: "القوارب في الميناء." },

    // ==========================================
    // WEATHER & CLIMATE (More)
    // ==========================================
    "Dimma|Substantiv": { exSwe: "Det är dimma ute.", exArb: "هناك ضباب في الخارج." },
    "Frost|Substantiv": { exSwe: "Det är frost på marken.", exArb: "هناك صقيع على الأرض." },
    "Hagel|Substantiv": { exSwe: "Det haglar.", exArb: "يتساقط البَرَد." },
    "Dagg|Substantiv": { exSwe: "Daggen ligger på gräset.", exArb: "الندى على العشب." },
    "Fukt|Substantiv": { exSwe: "Fukten är hög.", exArb: "الرطوبة عالية." },
    "Torka|Substantiv": { exSwe: "Det är torka i landet.", exArb: "هناك جفاف في البلاد." },
    "Översvämning|Substantiv": { exSwe: "Översvämningen förstörde huset.", exArb: "الفيضان دمر البيت." },
    "Orkan|Substantiv": { exSwe: "Orkanen var stark.", exArb: "كانت العاصفة قوية." },

    // ==========================================
    // VERBS (More Actions)
    // ==========================================
    "Smälter|Verb": { exSwe: "Isen smälter.", exArb: "يذوب الجليد." },
    "Fryser|Verb": { exSwe: "Jag fryser.", exArb: "أشعر بالبرد." },
    "Svettas|Verb": { exSwe: "Jag svettas.", exArb: "أتعرق." },
    "Nyser|Verb": { exSwe: "Jag nyser.", exArb: "أعطس." },
    "Hostar|Verb": { exSwe: "Han hostar.", exArb: "يسعل." },
    "Snyter sig|Verb": { exSwe: "Jag snyter mig.", exArb: "أنظف أنفي." },
    "Gapar|Verb": { exSwe: "Han gapar.", exArb: "يتثاءب." },
    "Suckar|Verb": { exSwe: "Hon suckar.", exArb: "تتنهد." },
    "Viskar|Verb": { exSwe: "Hon viskar.", exArb: "تهمس." },
    "Ropar|Verb": { exSwe: "Han ropar.", exArb: "يصرخ." },
    "Skriker|Verb": { exSwe: "Bebisen skriker.", exArb: "الطفل يصرخ." },
    "Klagar|Verb": { exSwe: "Han klagar alltid.", exArb: "يتذمر دائماً." },
    "Skäller|Verb": { exSwe: "Hunden skäller.", exArb: "الكلب ينبح." },
    "Jamar|Verb": { exSwe: "Katten jamar.", exArb: "القطة تموء." },
    "Kvittrar|Verb": { exSwe: "Fåglarna kvittrar.", exArb: "الطيور تغرد." },
    "Surrar|Verb": { exSwe: "Biet surrar.", exArb: "النحلة تطن." }
};

console.log('═══════════════════════════════════════════════════════════════');
console.log('     ADDING EXAMPLES - BATCH 11 (Kitchen, Food, Nature)');
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
