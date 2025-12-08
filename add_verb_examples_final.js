/**
 * دفعة أخيرة: إضافة أمثلة للأفعال المتكررة من أعلى القائمة
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
    // الأفعال المتكررة باستمرار في أعلى القائمة (معاني ثانوية)
    "Må": { exSwe: "Må du leva länge!", exArb: "عسى أن تعيش طويلاً!" },
    "Benar": { exSwe: "Hon benar håret.", exArb: "تفرق شعرها." },
    "Betar": { exSwe: "Korna betar på ängen.", exArb: "البقر يرعى في المرج." },
    "Beslår": { exSwe: "Smeden beslår hästen.", exArb: "الحداد يحدو الحصان." },
    "Gnor": { exSwe: "Han gnor på med arbetet.", exArb: "يكدح في العمل." },
    "Berikar": { exSwe: "Erfarenheten berikar livet.", exArb: "الخبرة تثري الحياة." },
    "Utropar": { exSwe: "Auktionisten utropar priset.", exArb: "المزاد يعلن السعر." },
    "Böjer": { exSwe: "Han böjer huvudet.", exArb: "يحني رأسه." },
    "Föder": { exSwe: "Hon föder ett barn.", exArb: "تلد طفلاً." },
    "Ingår": { exSwe: "Frukost ingår i priset.", exArb: "الفطور مشمول في السعر." },
    "Kapar": { exSwe: "Sjörövarna kapar fartyget.", exArb: "القراصنة يخطفون السفينة." },
    "Kutar": { exSwe: "Han kutar över gatan.", exArb: "يركض عبر الشارع." },
    "Myser": { exSwe: "Bebisen myser i sängen.", exArb: "الرضيع يرتاح في السرير." },
    "Pyser": { exSwe: "Luften pyser ur däcket.", exArb: "الهواء يتسرب من الإطار." },
    "Röjer": { exSwe: "De röjer undan skräpet.", exArb: "يزيلون القمامة." },
    "Ömmar": { exSwe: "Musklerna ömmar efter träningen.", exArb: "العضلات تؤلم بعد التمرين." },
    "Avsätter": { exSwe: "Styrelsen avsätter VD:n.", exArb: "مجلس الإدارة يعزل المدير." },
    "Bekänner": { exSwe: "Han bekänner sina synder.", exArb: "يعترف بخطاياه." },
    "Bestiger": { exSwe: "De bestiger berget.", exArb: "يتسلقون الجبل." },
    "Anslår": { exSwe: "De anslår medel för projektet.", exArb: "يخصصون أموالاً للمشروع." },
    "Biktar": { exSwe: "Prästen biktar församlingen.", exArb: "القسيس يسمع اعتراف الجماعة." },
    "Bockar": { exSwe: "Han bockar sig för publiken.", exArb: "ينحني للجمهور." },
    "Bussar": { exSwe: "Skolan bussar eleverna.", exArb: "المدرسة تنقل التلاميذ بالحافلة." },
    "Bärgar": { exSwe: "De bärgar vraket.", exArb: "ينقذون الحطام." },
    "Diktar": { exSwe: "Han diktar verser.", exArb: "ينظم الشعر." },
    "Diskar": { exSwe: "Hon diskar tallrikarna.", exArb: "تغسل الصحون." },
    "Driver": { exSwe: "Han driver företaget.", exArb: "يدير الشركة." },
    "Dubbar": { exSwe: "De dubbar filmen till svenska.", exArb: "يدبلجون الفيلم للسويدية." },
    "Fattar": { exSwe: "Jag fattar inte.", exArb: "لا أفهم." },
    "Filmar": { exSwe: "Regissören filmar scenen.", exArb: "المخرج يصور المشهد." },
    "Flyger": { exSwe: "Fågeln flyger högt.", exArb: "الطائر يطير عالياً." },
    "Fryser": { exSwe: "Vattnet fryser till is.", exArb: "الماء يتجمد." },
    "Fräser": { exSwe: "Han fräser på köttbullar.", exArb: "يطبخ كرات اللحم." },
    "Fuskar": { exSwe: "Han fuskar på provet.", exArb: "يغش في الامتحان." },
    "Garvar": { exSwe: "Han garvar åt skämtet.", exArb: "يضحك على النكتة." },
    "Hackar": { exSwe: "Han hackar ved.", exArb: "يقطع الحطب." },
    "Håller": { exSwe: "Hon håller ett tal.", exArb: "تلقي خطاباً." },
    "Hänger": { exSwe: "Tavlan hänger på väggen.", exArb: "اللوحة معلقة على الجدار." },
    "Krusar": { exSwe: "Den varma luften krusar håret.", exArb: "الهواء الحار يجعد الشعر." },
    "Lackar": { exSwe: "Hon lackar naglarna.", exArb: "تطلي أظافرها." },
    "Langar": { exSwe: "Han langar salt till henne.", exArb: "يناولها الملح." },
    "Mognar": { exSwe: "Äpplen mognar på hösten.", exArb: "التفاح ينضج في الخريف." },
    "Muckar": { exSwe: "De muckar gräl.", exArb: "يثيرون شجاراً." },
    "Pallar": { exSwe: "Jag pallar inte mer.", exArb: "لا أتحمل أكثر." },
    "Rimmar": { exSwe: "Orden rimmar.", exArb: "الكلمات تسجع." },
    "Runkar": { exSwe: "Tåget runkar fram.", exArb: "القطار يتمايل." },
    "Servar": { exSwe: "Hon servar bilen.", exArb: "تصين السيارة." },
    "Siktar": { exSwe: "Han siktar mot stjärnorna.", exArb: "يصوب نحو النجوم." },
    "Snusar": { exSwe: "Han snusar tobak.", exArb: "يستخدم التبغ العطوس." },
    "Surfar": { exSwe: "Han surfar på vågor.", exArb: "يركب الأمواج." },
    "Sveper": { exSwe: "Hon sveper in sig i filten.", exArb: "تلف نفسها بالبطانية." },
    "Sätter": { exSwe: "Hon sätter blommor i vasen.", exArb: "تضع الزهور في المزهرية." },
    "Textar": { exSwe: "Han textar på mobilen.", exArb: "يرسل رسالة نصية." },
    "Tillgå": { exSwe: "Resurser tillgår projektet.", exArb: "الموارد متاحة للمشروع." },
    "Travar": { exSwe: "Hästen travar på fältet.", exArb: "الحصان يعدو في الحقل." },
    "Vallar": { exSwe: "Herden vallar fåren.", exArb: "الراعي يرعى الأغنام." },
    "Vräker": { exSwe: "Han vräker ut saker.", exArb: "يرمي الأغراض." },
    "Vädrar": { exSwe: "Hon vädrar rummet.", exArb: "تهوي الغرفة." },
    "Avdunstar": { exSwe: "Parfymen avdunstar.", exArb: "العطر يتبخر." },
    "Befordrar": { exSwe: "Chefen befordrar henne.", exArb: "المدير يرقيها." },
    "Upprättar": { exSwe: "Han upprättar ett kontrakt.", exArb: "يعد عقداً." },
    "Duschar": { exSwe: "Hon duschar varje morgon.", exArb: "تستحم كل صباح." },
    "Grundar": { exSwe: "De grundar ett företag.", exArb: "يؤسسون شركة." }
};

console.log('═══════════════════════════════════════════════════════════════');
console.log('     إضافة أمثلة للدفعة الأخيرة (الأفعال المتكررة)');
console.log('═══════════════════════════════════════════════════════════════\n');

let addedCount = 0, alreadyHasExample = 0, notFound = 0;
for (const [targetWord, example] of Object.entries(verbExamples)) {
    let found = false;
    for (let i = 0; i < dictionaryData.length; i++) {
        const entry = dictionaryData[i];
        if (entry[2] && entry[2].toLowerCase() === targetWord.toLowerCase() && entry[1] && entry[1].includes('Verb')) {
            // Check if this SPECIFIC entry (with no example) matches
            if (!entry[7] || entry[7].trim() === '') {
                found = true;
                dictionaryData[i][7] = example.exSwe;
                dictionaryData[i][8] = example.exArb;
                addedCount++;
                console.log(`✅ ${entry[2]}`);
                break; // Only update first match without example
            }
        }
    }
    if (!found) {
        // Check if it exists with example
        let existsWithExample = false;
        for (let i = 0; i < dictionaryData.length; i++) {
            const entry = dictionaryData[i];
            if (entry[2] && entry[2].toLowerCase() === targetWord.toLowerCase() && entry[1] && entry[1].includes('Verb')) {
                if (entry[7] && entry[7].trim() !== '') {
                    existsWithExample = true;
                    alreadyHasExample++;
                    break;
                }
            }
        }
        if (!existsWithExample) notFound++;
    }
}
fs.writeFileSync('./data.js', 'const dictionaryData = ' + JSON.stringify(dictionaryData, null, 4) + ';');
console.log(`\n✅ المضافة: ${addedCount} | ⚠️ موجودة: ${alreadyHasExample} | ❌ غير موجودة: ${notFound}`);
