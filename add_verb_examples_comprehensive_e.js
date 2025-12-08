/**
 * دفعة نهائية E: إضافة أمثلة لجميع الأفعال المتبقية
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
    // الأفعال النهائية المتبقية
    "Tar igen sig": { exSwe: "Han tar igen sig efter sjukdomen.", exArb: "يتعافى بعد المرض." },
    "Tillfrisknar": { exSwe: "Patienten tillfrisknar snabbt.", exArb: "المريض يتحسن بسرعة." },
    "Tillfångatar": { exSwe: "Polisen tillfångatar tjuven.", exArb: "الشرطة تقبض على اللص." },
    "Tillkännager": { exSwe: "Presidenten tillkännager beslutet.", exArb: "الرئيس يعلن القرار." },
    "Trummar ihop": { exSwe: "Han trummar ihop laget.", exArb: "يجمع الفريق." },
    "Underförstår": { exSwe: "Han underförstår att hon vet.", exArb: "يفهم ضمنياً أنها تعرف." },
    "Underhandlar": { exSwe: "De underhandlar om fred.", exArb: "يتفاوضون على السلام." },
    "Understödjer": { exSwe: "Staten understödjer familjen.", exArb: "الدولة تعيل العائلة." },
    "Undertecknar": { exSwe: "Han undertecknar kontraktet.", exArb: "يوقع العقد." },
    "Återanpassar": { exSwe: "Programmet återanpassar fångar.", exArb: "البرنامج يعيد تأهيل السجناء." },
    "Återberättar": { exSwe: "Hon återberättar historien.", exArb: "تروي القصة مرة أخرى." },
    "Adjungerar": { exSwe: "De adjungerar en expert.", exArb: "يستدعون خبيراً كعضو مؤقت." },
    "Alternerar": { exSwe: "De alternerar mellan uppdrag.", exArb: "يتناوبون بين المهام." },
    "Apporterar": { exSwe: "Hunden apporterar pinnen.", exArb: "الكلب يحضر العصا." },
    "Asfalterar": { exSwe: "De asfalterar vägen.", exArb: "يزفتون الطريق." },
    "Attraherar": { exSwe: "Hon attraherar uppmärksamhet.", exArb: "تجذب الانتباه." },
    "Balsamerar": { exSwe: "De balsamerar kroppen.", exArb: "يحنطون الجثة." },
    "Censurerar": { exSwe: "Regeringen censurerar pressen.", exArb: "الحكومة تراقب الصحافة." },
    "Cirkulerar": { exSwe: "Blod cirkulerar i kroppen.", exArb: "الدم يدور في الجسم." },
    "Definierar": { exSwe: "Han definierar begreppet.", exArb: "يعرف المفهوم." },
    "Degraderar": { exSwe: "Generalen degraderas.", exArb: "ينزل رتبة الجنرال." },
    "Deklamerar": { exSwe: "Hon deklamerar en dikt.", exArb: "تلقي قصيدة." },
    "Deklarerar": { exSwe: "Han deklarerar sin inkomst.", exArb: "يصرح بدخله." },
    "Dementerar": { exSwe: "Ministern dementerar anklagelsen.", exArb: "الوزير ينفي الاتهام." },
    "Deporterar": { exSwe: "De deporterar flyktingar.", exArb: "يرحلون اللاجئين." },
    "Deserterar": { exSwe: "Soldaten deserterar.", exArb: "الجندي يفر من الخدمة." },
    "Doktorerar": { exSwe: "Hon doktorerar i kemi.", exArb: "تحضر الدكتوراه في الكيمياء." },
    "Expedierar": { exSwe: "Han expedierar kunder.", exArb: "يخدم الزبائن." },
    "Förvärvsarbetar": { exSwe: "Båda föräldrarna förvärvsarbetar.", exArb: "كلا الوالدين يعملان." },
    "Galopperar": { exSwe: "Hästen galopperar.", exArb: "الحصان يعدو." },
    "Gratinerar": { exSwe: "Hon gratinerar potatisen.", exArb: "تشوي البطاطس في الفرن." },
    "Grimaserar": { exSwe: "Han grimaserar av smärta.", exArb: "يكشر من الألم." },
    "Immigrerar": { exSwe: "Familjen immigrerar till USA.", exArb: "العائلة تهاجر إلى أمريكا." },
    "Inkasserar": { exSwe: "Bolaget inkasserar skulden.", exArb: "الشركة تجني الدين." },
    "Kverulerar": { exSwe: "Han kverulerar om allt.", exArb: "يتذمر من كل شيء." },
    "Marscherar": { exSwe: "Soldaterna marscherar.", exArb: "الجنود يخطون." },
    "Orienterar": { exSwe: "De orienterar i skogen.", exArb: "يمارسون رياضة الاستشراد في الغابة." },
    "Perforerar": { exSwe: "Maskinen perforerar papperet.", exArb: "الآلة تخرم الورق." },
    "Promoverar": { exSwe: "Rektorn promoverar doktorerna.", exArb: "العميد يمنح شهادات الدكتوراه." },
    "Ramponerar": { exSwe: "Stormen ramponerar huset.", exArb: "العاصفة تحطم البيت." },
    "Reklamerar": { exSwe: "Han reklamerar på varan.", exArb: "يشتكي من السلعة." },
    "Remitterar": { exSwe: "Läkaren remitterar patienten.", exArb: "الطبيب يحول المريض." },
    "Replikerar": { exSwe: "Hon replikerar skarpt.", exArb: "ترد بحدة." },
    "Revalverar": { exSwe: "Centralbanken revalverar valutan.", exArb: "البنك المركزي يرفع قيمة العملة." },
    "Spekulerar": { exSwe: "Han spekulerar i aktier.", exArb: "يضارب في الأسهم." },
    "Stipulerar": { exSwe: "Avtalet stipulerar villkoren.", exArb: "الاتفاقية تحدد الشروط." },
    "Stoltserar": { exSwe: "Han stoltserar med sin bil.", exArb: "يتباهى بسيارته." },
    "Suggererar": { exSwe: "Reklamen suggererar behov.", exArb: "الإعلان يوحي بالحاجة." },
    "Tapetserar": { exSwe: "De tapetserar rummet.", exArb: "يورقون الغرفة." },
    "Vikarierar": { exSwe: "Hon vikarierar för läraren.", exArb: "تنوب عن المعلم." },
    "Bryter samman": { exSwe: "Hon bryter samman efter förlusten.", exArb: "تنهار بعد الخسارة." },
    "Geniförklarar": { exSwe: "Kritikerna geniförklarar honom.", exArb: "النقاد يعتبرونه عبقرياً." },
    "Grabbar tag i": { exSwe: "Han grabbar tag i armen.", exArb: "يمسك بالذراع." },
    "Håller i gång": { exSwe: "Musiken håller festen i gång.", exArb: "الموسيقى تبقي الحفلة مستمرة." },
    "Knycklar ihop": { exSwe: "Han knycklar ihop papperet.", exArb: "يكوم الورقة." },
    "Kvicknar till": { exSwe: "Patienten kvicknar till.", exArb: "المريض يستعيد وعيه." },
    "Missuppfattar": { exSwe: "Du missuppfattar mig.", exArb: "تسيء فهمي." },
    "Motsätter sig": { exSwe: "Han motsätter sig förslaget.", exArb: "يعارض الاقتراح." },
    "Sammanträffar": { exSwe: "De sammanträffar på kaféet.", exArb: "يلتقون في المقهى." },
    "Spjärnar emot": { exSwe: "Barnet spjärnar emot.", exArb: "الطفل يقاوم." },
    "Stryker under": { exSwe: "Han stryker under det viktiga.", exArb: "يؤكد على المهم." },
    "Säger upp sig": { exSwe: "Hon säger upp sig från jobbet.", exArb: "تستقيل من العمل." },
    "Sätter sig in": { exSwe: "Han sätter sig in i problemet.", exArb: "يتفهم المشكلة." },
    "Tillägnar sig": { exSwe: "Hon tillägnar sig nya språk.", exArb: "تتعلم لغات جديدة." },
    "Urskuldar sig": { exSwe: "Han urskuldar sig hela tiden.", exArb: "يتعذر طوال الوقت." },
    "Abstraherar": { exSwe: "Konstnären abstraherar verkligheten.", exArb: "الفنان يجرد الواقع." },
    "Accelererar": { exSwe: "Bilen accelererar snabbt.", exArb: "السيارة تتسارع بسرعة." },
    "Ackumulerar": { exSwe: "Skulden ackumuleras.", exArb: "الدين يتراكم." },
    "Affischerar": { exSwe: "De affischerar på väggar.", exArb: "يضعون ملصقات على الجدران." },
    "Arkebuserar": { exSwe: "Soldaterna arkebuserar fången.", exArb: "الجنود يعدمون السجين رمياً بالرصاص." },
    "Artikulerar": { exSwe: "Hon artikulerar tydligt.", exArb: "تنطق بوضوح." },
    "Härbärgerar": { exSwe: "Hotellet härbärgerar flyktingar.", exArb: "الفندق يؤوي اللاجئين." },
    "Impregnerar": { exSwe: "De impregnerar tyget.", exArb: "يعالجون القماش ضد الماء." },
    "Infiltrerar": { exSwe: "Spionen infiltrerar gruppen.", exArb: "الجاسوس يتسلل للمجموعة." },
    "Inkvarterar": { exSwe: "Armén inkvarterar soldater.", exArb: "الجيش يسكن الجنود." },
    "Installerar": { exSwe: "Han installerar programmet.", exArb: "يثبت البرنامج." },
    "Kondenserar": { exSwe: "Ångan kondenserar.", exArb: "البخار يتكثف." },
    "Konfirmerar": { exSwe: "Prästen konfirmerar ungdomarna.", exArb: "القسيس يثبت الشباب." }
};

console.log('═══════════════════════════════════════════════════════════════');
console.log('     إضافة أمثلة للدفعة النهائية E');
console.log('═══════════════════════════════════════════════════════════════\n');

let addedCount = 0, alreadyHasExample = 0, notFound = 0;
for (const [targetWord, example] of Object.entries(verbExamples)) {
    let found = false;
    for (let i = 0; i < dictionaryData.length; i++) {
        const entry = dictionaryData[i];
        if (entry[2] && entry[2].toLowerCase() === targetWord.toLowerCase() && entry[1] && entry[1].includes('Verb')) {
            if (!entry[7] || entry[7].trim() === '') {
                found = true;
                dictionaryData[i][7] = example.exSwe;
                dictionaryData[i][8] = example.exArb;
                addedCount++;
                console.log(`✅ ${entry[2]}`);
                break;
            }
        }
    }
    if (!found) {
        let existsWithExample = false;
        for (let i = 0; i < dictionaryData.length; i++) {
            const entry = dictionaryData[i];
            if (entry[2] && entry[2].toLowerCase() === targetWord.toLowerCase() && entry[1] && entry[1].includes('Verb')) {
                if (entry[7] && entry[7].trim() !== '') { existsWithExample = true; alreadyHasExample++; break; }
            }
        }
        if (!existsWithExample) notFound++;
    }
}
fs.writeFileSync('./data.js', 'const dictionaryData = ' + JSON.stringify(dictionaryData, null, 4) + ';');
console.log(`\n✅ المضافة: ${addedCount} | ⚠️ موجودة: ${alreadyHasExample} | ❌ غير موجودة: ${notFound}`);
