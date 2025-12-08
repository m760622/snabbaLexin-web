/**
 * دفعات 21-25: إضافة أمثلة للأفعال المتبقية
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

const verbExamples = {
    // P-R verbs  
    "Penslar": { exSwe: "Hon penslar väggarna.", exArb: "تطلي الجدران بالفرشاة." },
    "Pimplar": { exSwe: "De pimplar öl på baren.", exArb: "يشربون البيرة في الحانة." },
    "Pjoskar": { exSwe: "Mormor pjoskar med barnbarnen.", exArb: "الجدة تدلل أحفادها." },
    "Pruttar": { exSwe: "Bebisen pruttar ofta.", exArb: "الرضيع يضرط كثيراً." },
    "Pryglar": { exSwe: "Han pryglar tjuven.", exArb: "يضرب اللص." },
    "Präntar": { exSwe: "Barnet präntar sitt namn.", exArb: "الطفل يكتب اسمه بعناية." },
    "Pröjsar": { exSwe: "Han pröjsar för middagen.", exArb: "يدفع ثمن العشاء." },
    "Påskina": { exSwe: "Han påskiner att han vet allt.", exArb: "يتظاهر بأنه يعرف كل شيء." },
    "Rasslar": { exSwe: "Löven rasslar i vinden.", exArb: "الأوراق تحشحش في الريح." },
    "Rådslår": { exSwe: "De rådslår om framtiden.", exArb: "يتشاورون حول المستقبل." },
    "Röntgar": { exSwe: "Läkaren röntgar armen.", exArb: "الطبيب يصور الذراع بالأشعة." },
    "Saluför": { exSwe: "Företaget saluför produkter.", exArb: "الشركة تسوق المنتجات." },
    "Samåker": { exSwe: "De samåker till jobbet.", exArb: "يتشاركون السيارة للعمل." },
    "Shoppar": { exSwe: "Hon shoppar kläder online.", exArb: "تتسوق الملابس عبر الإنترنت." },
    "Skeppar": { exSwe: "De skeppar varor till USA.", exArb: "يشحنون البضائع إلى أمريكا." },
    "Skrålar": { exSwe: "Han skrålar sånger på festen.", exArb: "يغني بصوت عالٍ في الحفلة." },

    // S-T verbs
    "Smakar": { exSwe: "Hon smakar på maten.", exArb: "تتذوق الطعام." },
    "Smaskar": { exSwe: "Barnet smaskar när det äter.", exArb: "الطفل يصدر صوتاً عند الأكل." },
    "Sneddar": { exSwe: "Han sneddar över gräsmattan.", exArb: "يقطع عبر العشب." },
    "Sniglar": { exSwe: "Trafiken sniglar sig framåt.", exArb: "حركة المرور تتحرك ببطء." },
    "Snörar": { exSwe: "Hon snörar skorna.", exArb: "تربط رباط الحذاء." },
    "Sorrar": { exSwe: "Insekterna sorrar runt lampan.", exArb: "الحشرات تطن حول المصباح." },
    "Spackar": { exSwe: "Han spacklar hålen i väggen.", exArb: "يملأ الثقوب في الجدار بالمعجون." },
    "Spanar": { exSwe: "Polisen spanar efter tjuven.", exArb: "الشرطة تتجسس على اللص." },
    "Spelas": { exSwe: "Matchen spelas imorgon.", exArb: "تُلعب المباراة غداً." },
    "Spetsar": { exSwe: "Han spetsar öronen.", exArb: "يرهف أذنيه." },
    "Spiller": { exSwe: "Barnet spiller mjölk.", exArb: "الطفل يسكب الحليب." },
    "Spinnar": { exSwe: "Katten spinnar av belåtenhet.", exArb: "القطة تخرخر من الرضا." },
    "Spirar": { exSwe: "Fröet spirar på våren.", exArb: "البذرة تنبت في الربيع." },
    "Spolar": { exSwe: "Hon spolar toaletten.", exArb: "تشد سيفون المرحاض." },
    "Sprattar": { exSwe: "Fisken sprattar i nätet.", exArb: "السمكة تتخبط في الشبكة." },
    "Springer": { exSwe: "Han springer varje morgon.", exArb: "يركض كل صباح." },
    "Spritter": { exSwe: "Gnistor spritter från elden.", exArb: "الشرر يتطاير من النار." },
    "Sprutar": { exSwe: "Vattnet sprutar ur slangen.", exArb: "الماء يتدفق من الخرطوم." },
    "Spränger": { exSwe: "De spränger berget.", exArb: "يفجرون الجبل." },
    "Spårar": { exSwe: "Hunden spårar rådjuret.", exArb: "الكلب يتتبع أثر الغزال." },
    "Spänner": { exSwe: "Han spänner bältet.", exArb: "يشد الحزام." },
    "Stackar": { exSwe: "Bonden stackar höet.", exArb: "المزارع يكدس التبن." },
    "Stakar": { exSwe: "Han stakar sig fram på skidor.", exArb: "يدفع نفسه على الزلاجات." },
    "Stammar": { exSwe: "Han stammar lite.", exArb: "يتلعثم قليلاً." },
    "Stampar": { exSwe: "Barnet stampar i marken.", exArb: "الطفل يدوس بقدمه على الأرض." },
    "Stannar": { exSwe: "Bussen stannar vid hållplatsen.", exArb: "الحافلة تتوقف عند الموقف." },
    "Startar": { exSwe: "Hon startar bilen.", exArb: "تشغل السيارة." },
    "Stickar": { exSwe: "Mormor stickar en tröja.", exArb: "الجدة تحيك قميصاً." },
    "Stiger": { exSwe: "Solen stiger på morgonen.", exArb: "الشمس تشرق في الصباح." },
    "Stillar": { exSwe: "Vattnet stillar törsten.", exArb: "الماء يروي العطش." },
    "Stinker": { exSwe: "Soporna stinker.", exArb: "القمامة تنتن." },
    "Stirrar": { exSwe: "Han stirrar på henne.", exArb: "يحدق فيها." },
    "Stockar": { exSwe: "Trafiken stockar sig.", exArb: "حركة المرور تتكدس." },
    "Stoppar": { exSwe: "Polisen stoppar bilen.", exArb: "الشرطة توقف السيارة." },
    "Stormar": { exSwe: "Det stormar ute.", exArb: "تعصف الرياح في الخارج." },
    "Stottar": { exSwe: "Han stottar sig på käppen.", exArb: "يتكئ على العصا." },
    "Straffar": { exSwe: "Domaren straffar brottslingen.", exArb: "القاضي يعاقب المجرم." },
    "Strejkar": { exSwe: "Arbetarna strejkar.", exArb: "العمال يضربون." },
    "Strilar": { exSwe: "Regnet strilar ner.", exArb: "المطر يرذ." },
    "Strippar": { exSwe: "Hon strippar kabeln.", exArb: "تقشر الكابل." },
    "Strosar": { exSwe: "De strosar på stranden.", exArb: "يتمشون على الشاطئ." },
    "Stryker": { exSwe: "Hon stryker skjortan.", exArb: "تكوي القميص." },
    "Strålar": { exSwe: "Solen strålar idag.", exArb: "الشمس تشع اليوم." },
    "Stunder": { exSwe: "Det stundar val.", exArb: "الانتخابات قادمة." },
    "Styrker": { exSwe: "Träningen styrker kroppen.", exArb: "التمرين يقوي الجسم." },
    "Stänger": { exSwe: "Hon stänger dörren.", exArb: "تغلق الباب." },
    "Stänker": { exSwe: "Bilar stänker vatten på fotgängare.", exArb: "السيارات ترش الماء على المشاة." },
    "Störtar": { exSwe: "Planet störtar i havet.", exArb: "الطائرة تسقط في البحر." },
    "Svamlar": { exSwe: "Han svamlar om ingenting.", exArb: "يثرثر عن لا شيء." },
    "Svansar": { exSwe: "Hunden svansar glatt.", exArb: "الكلب يهز ذيله بسعادة." },
    "Svarnar": { exSwe: "Himlen svarnar.", exArb: "السماء تعتم." },
    "Svettar": { exSwe: "Han svettar efter träningen.", exArb: "يتعرق بعد التمرين." },
    "Svetsar": { exSwe: "Han svetsar rören ihop.", exArb: "يلحم الأنابيب معاً." },
    "Sviker": { exSwe: "Han sviker sina löften.", exArb: "يخلف وعوده." },
    "Svingar": { exSwe: "Han svingar svärd.", exArb: "يلوح بالسيف." },
    "Svinner": { exSwe: "Tiden svinner fort.", exArb: "الوقت يمر بسرعة." },
    "Svullar": { exSwe: "Foten svullar efter skadan.", exArb: "القدم تنتفخ بعد الإصابة." },
    "Svämmar": { exSwe: "Floden svämmar över.", exArb: "النهر يفيض." },
    "Svänger": { exSwe: "Bilen svänger till höger.", exArb: "السيارة تنعطف يميناً." },
    "Svärmar": { exSwe: "Bin svärmar runt bikupan.", exArb: "النحل يتجمع حول الخلية." },
    "Synar": { exSwe: "Läkaren synar såret.", exArb: "الطبيب يفحص الجرح." },
    "Synkar": { exSwe: "De synkar sina kalendrar.", exArb: "يزامنون تقويماتهم." },
    "Synlar": { exSwe: "Polisen synlar brottsplatsen.", exArb: "الشرطة تفحص مسرح الجريمة." }
};

console.log('═══════════════════════════════════════════════════════════════');
console.log('     إضافة أمثلة للدفعة 21-25');
console.log('═══════════════════════════════════════════════════════════════\n');

let addedCount = 0, alreadyHasExample = 0, notFound = 0;
for (const [targetWord, example] of Object.entries(verbExamples)) {
    let found = false;
    for (let i = 0; i < dictionaryData.length; i++) {
        const entry = dictionaryData[i];
        if (entry[2] && entry[2].toLowerCase() === targetWord.toLowerCase() && entry[1] && entry[1].includes('Verb')) {
            found = true;
            if (entry[7] && entry[7].trim() !== '') { alreadyHasExample++; }
            else { dictionaryData[i][7] = example.exSwe; dictionaryData[i][8] = example.exArb; addedCount++; console.log(`✅ ${entry[2]}`); }
            break;
        }
    }
    if (!found) notFound++;
}
fs.writeFileSync('./data.js', 'const dictionaryData = ' + JSON.stringify(dictionaryData, null, 4) + ';');
console.log(`\n✅ المضافة: ${addedCount} | ⚠️ موجودة: ${alreadyHasExample} | ❌ غير موجودة: ${notFound}`);
