/**
 * دفعة أخيرة F: إضافة أمثلة لآخر الأفعال المتبقية (98 فعل)
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
    // آخر الأفعال المتبقية
    "Gängar sig": { exSwe: "Paret gängar sig på sommaren.", exArb: "الزوجان يتزوجان في الصيف." },
    "Snedtänder": { exSwe: "Han snedtänder lätt.", exArb: "يغضب بسهولة." },
    "Mankerar": { exSwe: "Helikoptern mankerar.", exArb: "الطائرة المروحية تتعطل." },
    "Passerar": { exSwe: "Hon passerar potatisen.", exArb: "تهرس البطاطس." },
    "Reglerar": { exSwe: "Han reglerar skulden.", exArb: "يسدد الدين." },
    "Sauterar": { exSwe: "Kocken sauterar grönsakerna.", exArb: "الطاهي يقلي الخضروات." },
    "Projicerar": { exSwe: "Han projicerar sina känslor.", exArb: "ينقل مشاعره على الآخرين." },
    "Sublimerar": { exSwe: "Isen sublimerar.", exArb: "الجليد يتسامى." },
    "Auskulterar": { exSwe: "Läkaren auskulterar hjärtat.", exArb: "الطبيب يسمع القلب." },
    "Konspirerar": { exSwe: "De konspirerar mot kungen.", exArb: "يتآمرون ضد الملك." },
    "Koordinerar": { exSwe: "Hon koordinerar projektet.", exArb: "تنسق المشروع." },
    "Massakrerar": { exSwe: "Armén massakrerar civilbefolkningen.", exArb: "الجيش يذبح المدنيين." },
    "Masturberar": { exSwe: "Han masturberar.", exArb: "يستمني." },
    "Medicinerar": { exSwe: "Läkaren medicinerar patienten.", exArb: "الطبيب يعالج المريض." },
    "Moraliserar": { exSwe: "Han moraliserar över andra.", exArb: "يعظ الآخرين." },
    "Nolltaxerar": { exSwe: "Han nolltaxerar.", exArb: "يصرح بدخل صفر." },
    "Projekterar": { exSwe: "Arkitekten projekterar huset.", exArb: "المهندس يخطط البيت." },
    "Pulvriserar": { exSwe: "Maskinen pulvriserar kryddorna.", exArb: "الآلة تسحق التوابل." },
    "Restituerar": { exSwe: "Staten restituerar pengarna.", exArb: "الدولة تسترد الأموال." },
    "Retuscherar": { exSwe: "Fotografen retuscherar bilden.", exArb: "المصور ينقح الصورة." },
    "Spankulerar": { exSwe: "De spankulerar i parken.", exArb: "يتمشون في الحديقة." },
    "Stencilerar": { exSwe: "Hon stencilerar affischer.", exArb: "تطبع ملصقات بالإستنسيل." },
    "Subtraherar": { exSwe: "Barnet subtraherar tal.", exArb: "الطفل يطرح الأرقام." },
    "Suspenderar": { exSwe: "Chefen suspenderar arbetaren.", exArb: "المدير يوقف العامل مؤقتاً." },
    "Telefonerar": { exSwe: "Hon telefonerar sina vänner.", exArb: "تتصل بأصدقائها." },
    "Trakasserar": { exSwe: "Han trakasserar sina kollegor.", exArb: "يضايق زملاءه." },
    "Avdramatiserar": { exSwe: "Hon avdramatiserar situationen.", exArb: "تبسط الوضع." },
    "Kurar ihop sig": { exSwe: "Katten kurar ihop sig.", exArb: "القطة تتكور." },
    "Missminner sig": { exSwe: "Han missminner sig om datumet.", exArb: "يتذكر التاريخ خطأً." },
    "Ställer in sig": { exSwe: "Hon ställer in sig på förändring.", exArb: "تتأقلم مع التغيير." },
    "Ställer samman": { exSwe: "Han ställer samman rapporten.", exArb: "يجمع التقرير." },
    "Ställer sig in": { exSwe: "Han ställer sig in hos chefen.", exArb: "يتملق المدير." },
    "Tillrättavisar": { exSwe: "Läraren tillrättavisar eleven.", exArb: "المعلم يوبخ التلميذ." },
    "Vinnlägger sig": { exSwe: "Hon vinnlägger sig om kvalitet.", exArb: "تجتهد في الجودة." },
    "Ackrediterar": { exSwe: "Ambassaden ackrediterar diplomaten.", exArb: "السفارة تعتمد الدبلوماسي." },
    "Aktualiserar": { exSwe: "Händelsen aktualiserar frågan.", exArb: "الحدث يطرح السؤال." },
    "Desinficerar": { exSwe: "Hon desinficerar såret.", exArb: "تطهر الجرح." },
    "Dramatiserar": { exSwe: "Han dramatiserar allt.", exArb: "يبالغ في كل شيء." },
    "Gestikulerar": { exSwe: "Hon gestikulerar när hon pratar.", exArb: "تومئ بيديها عند الكلام." },
    "Intervenerar": { exSwe: "Armén intervenerar.", exArb: "الجيش يتدخل." },
    "Magnetiserar": { exSwe: "Strömmen magnetiserar järnet.", exArb: "التيار يمغنط الحديد." },
    "Passiviserar": { exSwe: "TV passiviserar barn.", exArb: "التلفزيون يجعل الأطفال سلبيين." },
    "Prospekterar": { exSwe: "De prospekterar efter guld.", exArb: "ينقبون عن الذهب." },
    "Steriliserar": { exSwe: "Sjuksköterskan steriliserar instrumenten.", exArb: "الممرضة تعقم الأدوات." },
    "Telegraferar": { exSwe: "Han telegraferar nyheten.", exArb: "يرسل الخبر برقياً." },
    "Transfererar": { exSwe: "Han transfererar pengar.", exArb: "يحول الأموال." },
    "Vandaliserar": { exSwe: "Ungdomar vandaliserar bussen.", exArb: "الشباب يخربون الحافلة." },
    "Gaddar ihop sig": { exSwe: "De gaddar ihop sig mot chefen.", exArb: "يتحالفون ضد المدير." },
    "Hankar sig fram": { exSwe: "Han hankar sig fram.", exArb: "يدبر أموره بصعوبة." },
    "Installerar sig": { exSwe: "De installerar sig i nya lägenheten.", exArb: "يستقرون في الشقة الجديدة." },
    "Legitimerar sig": { exSwe: "Hon legitimerar sig med passet.", exArb: "تثبت هويتها بالجواز." },
    "Sätter sig över": { exSwe: "Han sätter sig över reglerna.", exArb: "يتجاهل القواعد." },
    "Tuffar till sig": { exSwe: "Hon tuffar till sig inför mötet.", exArb: "تقوي نفسها للاجتماع." },
    "Ackompanjerar": { exSwe: "Han ackompanjerar sångaren.", exArb: "يصاحب المغني." },
    "Alfabetiserar": { exSwe: "Programmet alfabetiserar vuxna.", exArb: "البرنامج يعلم الكبار القراءة." },
    "Automatiserar": { exSwe: "De automatiserar fabriken.", exArb: "يؤتمتون المصنع." },
    "Centrifugerar": { exSwe: "Maskinen centrifugerar kläder.", exArb: "الآلة تجفف الملابس." },
    "Exemplifierar": { exSwe: "Hon exemplifierar teorin.", exArb: "تمثل النظرية بأمثلة." },
    "Gymnastiserar": { exSwe: "Hon gymnastiserar varje morgon.", exArb: "تمارس الرياضة كل صباح." },
    "Intensifierar": { exSwe: "De intensifierar arbetet.", exArb: "يكثفون العمل." },
    "Interpellerar": { exSwe: "Riksdagen interpellerar ministern.", exArb: "البرلمان يستجوب الوزير." },
    "Klassificerar": { exSwe: "Forskaren klassificerar arterna.", exArb: "الباحث يصنف الأنواع." },
    "Kollationerar": { exSwe: "Hon kollationerar dokumenten.", exArb: "تقارن الوثائق." },
    "Omorganiserar": { exSwe: "De omorganiserar företaget.", exArb: "يعيدون تنظيم الشركة." },
    "Rehabiliterar": { exSwe: "Terapeuten rehabiliterar patienten.", exArb: "المعالج يعيد تأهيل المريض." },
    "Övertrasserar": { exSwe: "Han övertrasserar kontot.", exArb: "يتجاوز حد الحساب." },
    "Klamrar sig fast": { exSwe: "Hon klamrar sig fast vid hoppet.", exArb: "تتمسك بالأمل." },
    "Prostituerar sig": { exSwe: "Hon prostituerar sig.", exArb: "تمارس البغاء." },
    "Revanscherar sig": { exSwe: "Laget revanscherar sig.", exArb: "الفريق يأخذ بثأره." },
    "Sammangaddar sig": { exSwe: "De sammangaddar sig.", exArb: "يتحالفون." },
    "Diagnostiserar": { exSwe: "Läkaren diagnostiserar sjukdomen.", exArb: "الطبيب يشخص المرض." },
    "Effektiviserar": { exSwe: "De effektiviserar processerna.", exArb: "يفعلون العمليات." },
    "Kriminaliserar": { exSwe: "Lagen kriminaliserar handlingen.", exArb: "القانون يجرم الفعل." },
    "Nationaliserar": { exSwe: "Regeringen nationaliserar industrin.", exArb: "الحكومة تؤمم الصناعة." },
    "Skatteplanerar": { exSwe: "Han skatteplanerar.", exArb: "يخطط لتقليل الضرائب." },
    "Decentraliserar": { exSwe: "Staten decentraliserar makten.", exArb: "الدولة تلغي مركزية السلطة." },
    "Diskvalificerar": { exSwe: "Domaren diskvalificerar spelaren.", exArb: "الحكم يسقط أهلية اللاعب." }
};

console.log('═══════════════════════════════════════════════════════════════');
console.log('     إضافة أمثلة للدفعة الأخيرة F');
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
