/**
 * إضافة أمثلة للدفعة الخامسة من الأفعال الشائعة بدون أمثلة
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
    // === الأفعال 1-50 ===
    "Servar": { exSwe: "Spelaren servar bollen perfekt.", exArb: "اللاعب يضرب ضربة الإرسال بشكل مثالي." },
    "Siktar": { exSwe: "Jägaren siktar på målet.", exArb: "الصياد يصوب على الهدف." },
    "Skelar": { exSwe: "Han skelar lite.", exArb: "يحول قليلاً." },
    "Skipar": { exSwe: "Domaren skipar rättvisa.", exArb: "القاضي يقيم العدل." },
    "Skiter": { exSwe: "Fågeln skiter på bilen.", exArb: "الطائر يتغوط على السيارة." },
    "Skålar": { exSwe: "Vi skålar för de nygifta!", exArb: "نشرب نخب العروسين!" },
    "Slavar": { exSwe: "Hon slavar på jobbet.", exArb: "تكدح في العمل." },
    "Smilar": { exSwe: "Barnet smilar mot kameran.", exArb: "الطفل يبتسم للكاميرا." },
    "Småler": { exSwe: "Hon småler mystiskt.", exArb: "تبتسم بطريقة غامضة." },
    "Smädar": { exSwe: "Han smädar sina motståndare.", exArb: "يشتم خصومه." },
    "Snidar": { exSwe: "Konstnären snidar en figur i trä.", exArb: "الفنان ينحت تمثالاً من الخشب." },
    "Snusar": { exSwe: "Han snusar under läppen.", exArb: "يضع السعوط تحت شفته." },
    "Snäser": { exSwe: "Chefen snäser åt personalen.", exArb: "المدير يوبخ الموظفين." },
    "Spexar": { exSwe: "Han spexar på festen.", exArb: "يمزح في الحفلة." },
    "Spisar": { exSwe: "Vi spisar middag klockan sex.", exArb: "نتناول العشاء الساعة السادسة." },
    "Spökar": { exSwe: "Det spökar i det gamla huset.", exArb: "هناك أشباح في البيت القديم." },
    "Stenar": { exSwe: "Mobben stenar brottslingen.", exArb: "الحشد يرجم المجرم." },
    "Stojar": { exSwe: "Barnen stojar i lekrummet.", exArb: "الأطفال يصخبون في غرفة اللعب." },
    "Suktar": { exSwe: "Han suktar efter framgång.", exArb: "يتوق للنجاح." },
    "Surfar": { exSwe: "Hon surfar på nätet.", exArb: "تتصفح الإنترنت." },
    "Surnar": { exSwe: "Mjölken surnar i värmen.", exArb: "الحليب يحمض في الحرارة." },
    "Sussar": { exSwe: "Bebisen sussar i vagnen.", exArb: "الرضيع ينام في العربة." },
    "Sveper": { exSwe: "Stormen sveper över landet.", exArb: "العاصفة تجتاح البلاد." },
    "Svider": { exSwe: "Såret svider när jag tvättar det.", exArb: "الجرح يؤلم عندما أغسله." },
    "Syltar": { exSwe: "Mormor syltar jordgubbar.", exArb: "الجدة تصنع مربى الفراولة." },
    "Sätter": { exSwe: "Tryckaren sätter texten.", exArb: "الطباع ينضد النص." },
    "Tafsar": { exSwe: "Han tafsar på henne olämpligt.", exArb: "يلمسها بطريقة غير لائقة." },
    "Tampas": { exSwe: "Han tampas med problemen.", exArb: "يكافح مع المشاكل." },
    "Textar": { exSwe: "De textar filmen till svenska.", exArb: "يضعون ترجمة للفيلم بالسويدية." },
    "Tickar": { exSwe: "Klockan tickar på väggen.", exArb: "الساعة تدق على الحائط." },
    "Tipsar": { exSwe: "Han tipsar polisen om brottet.", exArb: "يبلغ الشرطة عن الجريمة." },
    "Travar": { exSwe: "Hästen travar på banan.", exArb: "الحصان يعدو خبباً على المضمار." },
    "Träter": { exSwe: "De träter om småsaker.", exArb: "يتشاجرون على أمور صغيرة." },
    "Tullar": { exSwe: "Han tullar på varorna vid gränsen.", exArb: "يدفع الرسوم الجمركية على البضائع عند الحدود." },
    "Tumlar": { exSwe: "Barnen tumlar i gräset.", exArb: "الأطفال يتدحرجون على العشب." },
    "Tystar": { exSwe: "Läraren tystar klassen.", exArb: "المعلم يسكت الفصل." },
    "Täljer": { exSwe: "Farfar täljer pinnar vid elden.", exArb: "الجد ينحت العصي عند النار." },
    "Tältar": { exSwe: "Vi tältar vid sjön.", exArb: "نخيم عند البحيرة." },
    "Tärnar": { exSwe: "Kocken tärnar grönsakerna.", exArb: "الطاهي يقطع الخضروات مكعبات." },
    "Vallar": { exSwe: "Herden vallar fåren.", exArb: "الراعي يرعى الأغنام." },
    "Valpar": { exSwe: "Hunden valpar i vår.", exArb: "الكلبة تلد جراء في الربيع." },
    "Varvar": { exSwe: "Föraren varvar motorn.", exArb: "السائق يرفع دورات المحرك." },
    "Vidrör": { exSwe: "Hon vidrör hans hand.", exArb: "تلمس يده." },

    // === الأفعال 51-100 ===
    "Viggar": { exSwe: "De viggar upp hjulen.", exArb: "يثبتون العجلات بالأوتاد." },
    "Vikar": { exSwe: "Hon vikar papper till kranar.", exArb: "تطوي الورق على شكل طيور." },
    "Villar": { exSwe: "Dimman villar bort fotvandrarna.", exArb: "الضباب يضل المتجولين." },
    "Vinkar": { exSwe: "Barnen vinkar till fartyget.", exArb: "الأطفال يلوحون للسفينة." },
    "Viskar": { exSwe: "Hon viskar hemligheten i hans öra.", exArb: "تهمس بالسر في أذنه." },
    "Vistar": { exSwe: "De vistar på landet om sommaren.", exArb: "يقيمون في الريف في الصيف." },
    "Vräker": { exSwe: "Hyresvärden vräker hyresgästen.", exArb: "المالك يطرد المستأجر." },
    "Vrider": { exSwe: "Hon vrider om nyckeln.", exArb: "تدير المفتاح." },
    "Väcker": { exSwe: "Mamman väcker barnen tidigt.", exArb: "الأم توقظ الأطفال مبكراً." },
    "Vädrar": { exSwe: "Hon vädrar rummet.", exArb: "تهوي الغرفة." },
    "Vägar": { exSwe: "De vägar paketet.", exArb: "يزنون الطرد." },
    "Väljer": { exSwe: "Jag väljer den röda tröjan.", exArb: "أختار القميص الأحمر." },
    "Vänder": { exSwe: "Hon vänder sidan.", exArb: "تقلب الصفحة." },
    "Väntar": { exSwe: "Jag väntar på bussen.", exArb: "أنتظر الحافلة." },
    "Värker": { exSwe: "Mitt huvud värker.", exArb: "رأسي يؤلمني." },
    "Väsnas": { exSwe: "Barnen väsnas i trappan.", exArb: "الأطفال يصخبون في الدرج." },
    "Växer": { exSwe: "Barnen växer fort.", exArb: "الأطفال ينمون بسرعة." },
    "Ympar": { exSwe: "Trädgårdsmästaren ympar trädet.", exArb: "البستاني يطعم الشجرة." },
    "Yrar": { exSwe: "Han yrar i febern.", exArb: "يهذي من الحمى." },
    "Ålar": { exSwe: "Han ålar sig under staketet.", exArb: "يتزحلق تحت السياج." },
    "Åmar": { exSwe: "De åmar sig över fjället.", exArb: "يتسلقون الجبل بصعوبة." },
    "Ältar": { exSwe: "Hon ältar degen.", exArb: "تعجن العجين." },
    "Ängar": { exSwe: "Ängorna ängar fint på sommaren.", exArb: "المروج تزدهر جميلاً في الصيف." },
    "Ärvar": { exSwe: "Hon ärvar huset efter sin mormor.", exArb: "ترث البيت من جدتها." },
    "Ökar": { exSwe: "Priserna ökar varje år.", exArb: "الأسعار ترتفع كل عام." },
    "Önskar": { exSwe: "Jag önskar dig lycka till!", exArb: "أتمنى لك حظاً سعيداً!" },
    "Öppnar": { exSwe: "Han öppnar dörren.", exArb: "يفتح الباب." },
    "Överger": { exSwe: "Han överger sin familj.", exArb: "يهجر عائلته." },
    "Överlever": { exSwe: "De överlever olyckan.", exArb: "ينجون من الحادث." },
    "Åskar": { exSwe: "Det åskar kraftigt ute.", exArb: "ترعد السماء بشدة في الخارج." }
};

console.log('═══════════════════════════════════════════════════════════════');
console.log('     إضافة أمثلة للدفعة الخامسة من الأفعال');
console.log('═══════════════════════════════════════════════════════════════\n');

let addedCount = 0, alreadyHasExample = 0, notFound = 0;

for (const [targetWord, example] of Object.entries(verbExamples)) {
    let found = false;
    for (let i = 0; i < dictionaryData.length; i++) {
        const entry = dictionaryData[i];
        if (entry[2] && entry[2].toLowerCase() === targetWord.toLowerCase() && entry[1] && entry[1].includes('Verb')) {
            found = true;
            if (entry[7] && entry[7].trim() !== '') {
                alreadyHasExample++;
            } else {
                dictionaryData[i][7] = example.exSwe;
                dictionaryData[i][8] = example.exArb;
                addedCount++;
                console.log(`✅ ${entry[2]}`);
            }
            break;
        }
    }
    if (!found) notFound++;
}

fs.writeFileSync('./data.js', 'const dictionaryData = ' + JSON.stringify(dictionaryData, null, 4) + ';');

console.log(`\n✅ المضافة: ${addedCount} | ⚠️ موجودة: ${alreadyHasExample} | ❌ غير موجودة: ${notFound}`);
