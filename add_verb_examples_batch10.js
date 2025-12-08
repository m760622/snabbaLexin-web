/**
 * دفعات إضافية: إضافة أمثلة للأفعال المتبقية
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
    "Anmanar": { exSwe: "Polisen anmanar honom att stanna.", exArb: "الشرطة تأمره بالتوقف." },
    "Babblar": { exSwe: "Bebisen babblar glatt.", exArb: "الرضيع يثرثر بسعادة." },
    "Bleknar": { exSwe: "Färgen bleknar i solen.", exArb: "اللون يبهت في الشمس." },
    "Bluffar": { exSwe: "Han bluffar i pokerspelet.", exArb: "يخادع في لعبة البوكر." },
    "Breddar": { exSwe: "De breddar vägen.", exArb: "يوسعون الطريق." },
    "Brummar": { exSwe: "Björnen brummar i skogen.", exArb: "الدب يهدر في الغابة." },
    "Bucklar": { exSwe: "Olyckan bucklar bilen.", exArb: "الحادث يعوج السيارة." },
    "Crawlar": { exSwe: "Han crawlar över bassängen.", exArb: "يسبح بطريقة الكراول عبر المسبح." },
    "Draggar": { exSwe: "De draggar efter liket i sjön.", exArb: "يبحثون عن الجثة في البحيرة." },
    "Dreglar": { exSwe: "Hunden dreglar när den ser mat.", exArb: "الكلب يسيل لعابه عندما يرى الطعام." },
    "Dryftar": { exSwe: "De dryftar frågan på mötet.", exArb: "يناقشون السؤال في الاجتماع." },
    "Fingrar": { exSwe: "Han fingrar på telefonen.", exArb: "يعبث بالهاتف." },
    "Fjädrar": { exSwe: "Bilen fjädrar bra på ojämn väg.", exArb: "السيارة تنبض جيداً على الطريق الوعر." },
    "Fjärtar": { exSwe: "Bebisen fjärtar efter maten.", exArb: "الرضيع يضرط بعد الطعام." },
    "Fjäskar": { exSwe: "Han fjäskar för chefen.", exArb: "يتزلف للمدير." },
    "Flabbar": { exSwe: "De flabbar åt hans skämt.", exArb: "يضحكون بصوت عالٍ على نكتته." },
    "Flaggar": { exSwe: "De flaggar på nationaldagen.", exArb: "يرفعون العلم في العيد الوطني." },
    "Flottar": { exSwe: "De flottar timmer nerför floden.", exArb: "يطوفون الأخشاب عبر النهر." },
    "Fnissar": { exSwe: "Flickorna fnissar i hörnet.", exArb: "البنات يضحكن بخفوت في الزاوية." },
    "Forslar": { exSwe: "De forslar varor till affären.", exArb: "ينقلون البضائع إلى المتجر." },
    "Frälser": { exSwe: "Gud frälser de troende.", exArb: "الله يخلص المؤمنين." },
    "Gillrar": { exSwe: "Jägaren gillrar en fälla.", exArb: "الصياد ينصب فخاً." },
    "Glappar": { exSwe: "Dörren glappar lite.", exArb: "الباب ينفتح قليلاً." },
    "Glufsar": { exSwe: "Hunden glufsar i sig maten.", exArb: "الكلب يلتهم الطعام." },
    "Gläfser": { exSwe: "Den lilla hunden gläfser högljutt.", exArb: "الكلب الصغير ينبح بصوت عالٍ." },
    "Glödgar": { exSwe: "Smeden glödgar järnet.", exArb: "الحداد يحمي الحديد." },
    "Gnäggar": { exSwe: "Hästen gnäggar i stallet.", exArb: "الحصان يصهل في الإسطبل." },
    "Gnäller": { exSwe: "Barnet gnäller hela tiden.", exArb: "الطفل يتذمر طوال الوقت." },
    "Gottgör": { exSwe: "Han gottgör skadan han orsakat.", exArb: "يعوض الضرر الذي سببه." },
    "Graverar": { exSwe: "Konstnären graverar i metall.", exArb: "الفنان ينقش على المعدن." },
    "Grundar": { exSwe: "De grundar ett nytt företag.", exArb: "يؤسسون شركة جديدة." },
    "Gräver": { exSwe: "Hunden gräver i trädgården.", exArb: "الكلب يحفر في الحديقة." },
    "Guppar": { exSwe: "Korkar guppar på vattnet.", exArb: "الفلين يطفو على الماء." },
    "Gurglar": { exSwe: "Han gurglar med vatten.", exArb: "يتغرغر بالماء." },
    "Gyttrar": { exSwe: "Trafiken gyttrar ihop sig.", exArb: "حركة المرور تتكدس." },
    "Gäspar": { exSwe: "Hon gäspar av trötthet.", exArb: "تتثاءب من التعب." },
    "Halverar": { exSwe: "De halverar priset.", exArb: "يخفضون السعر للنصف." },
    "Handlar": { exSwe: "Jag handlar mat varje dag.", exArb: "أتسوق الطعام كل يوم." },
    "Harvar": { exSwe: "Bonden harvar åkern.", exArb: "المزارع يمشط الحقل." },
    "Haspar": { exSwe: "Han haspar ur sig orden.", exArb: "يلفظ الكلمات بصعوبة." },
    "Helgar": { exSwe: "De helgar minnet av de döda.", exArb: "يخلدون ذكرى الموتى." },
    "Hesnar": { exSwe: "Rösten hesnar av att sjunga.", exArb: "الصوت يبح من الغناء." },
    "Hissar": { exSwe: "De hissar flaggan.", exArb: "يرفعون العلم." },
    "Hoppar": { exSwe: "Barnen hoppar i vattnet.", exArb: "الأطفال يقفزون في الماء." },
    "Hostar": { exSwe: "Han hostar på grund av rökning.", exArb: "يسعل بسبب التدخين." },
    "Hukar": { exSwe: "Han hukar bakom bilen.", exArb: "يحني جسمه خلف السيارة." },
    "Hugger": { exSwe: "Han hugger ved.", exArb: "يقطع الحطب." },
    "Hungrar": { exSwe: "Folket hungrar på grund av kriget.", exArb: "الناس يجوعون بسبب الحرب." },
    "Hurrar": { exSwe: "Publiken hurrar när laget vinner.", exArb: "الجمهور يهتف عندما يفوز الفريق." },
    "Husar": { exSwe: "De husar i ett gammalt hus.", exArb: "يقيمون في بيت قديم." },
    "Huttar": { exSwe: "Han huttar av kyla.", exArb: "يرتجف من البرد." },
    "Hyser": { exSwe: "Hotellet hyser flyktingar.", exArb: "الفندق يؤوي اللاجئين." },
    "Hälsar": { exSwe: "Hon hälsar på grannarna.", exArb: "تسلم على الجيران." },
    "Hästar": { exSwe: "Vi hästar oss till stationen.", exArb: "نسرع إلى المحطة." },
    "Höstar": { exSwe: "De höstar in skörden.", exArb: "يحصدون المحصول في الخريف." },
    "Iglar": { exSwe: "Gräset iglar igen efter regnet.", exArb: "العشب ينمو مرة أخرى بعد المطر." },
    "Ilar": { exSwe: "Han ilar förbi oss.", exArb: "يمر بسرعة بجانبنا." },
    "Immar": { exSwe: "Speglarna immar i badrummet.", exArb: "المرايا تتبخر في الحمام." },
    "Intar": { exSwe: "Armén intar staden.", exArb: "الجيش يحتل المدينة." },
    "Irrar": { exSwe: "Han irrar runt i stan.", exArb: "يتجول بلا هدف في المدينة." },
    "Jagar": { exSwe: "Katten jagar möss.", exArb: "القطة تصيد الفئران." },
    "Jamrar": { exSwe: "Barnet jamrar sig.", exArb: "الطفل يتأوه." },
    "Jargar": { exSwe: "Han jargar hela tiden.", exArb: "يستعجل طوال الوقت." },
    "Jämrar": { exSwe: "Han jämrar sig av smärta.", exArb: "يتأوه من الألم." },
    "Jäser": { exSwe: "Degen jäser i värmen.", exArb: "العجين يختمر في الحرارة." },
    "Kallar": { exSwe: "Hon kallar på mig.", exArb: "تناديني." },
    "Kammar": { exSwe: "Hon kammar sitt hår.", exArb: "تمشط شعرها." },
    "Kappar": { exSwe: "De kappar om segern.", exArb: "يتنافسون على الفوز." },
    "Kassar": { exSwe: "Han kassar varorna.", exArb: "يسجل البضائع في صندوق الدفع." },
    "Kastar": { exSwe: "Pojken kastar bollen.", exArb: "الولد يرمي الكرة." },
    "Kilar": { exSwe: "Han kilar iväg.", exArb: "ينطلق بسرعة." },
    "Kittlar": { exSwe: "Hon kittlar barnet.", exArb: "تدغدغ الطفل." },
    "Klamrar": { exSwe: "Han klamrar sig fast.", exArb: "يتمسك بقوة." },
    "Klankar": { exSwe: "De klankar ner på allt.", exArb: "ينتقدون كل شيء." },
    "Klappar": { exSwe: "Hon klappar hunden.", exArb: "تربت على الكلب." },
    "Klapprar": { exSwe: "Tänderna klapprar av kyla.", exArb: "الأسنان تصطك من البرد." },
    "Klassas": { exSwe: "Produkten klassas som farlig.", exArb: "المنتج يصنف كخطير." },
    "Klaver": { exSwe: "Han klaver sig genom talet.", exArb: "يتعثر في الكلام." },
    "Knackar": { exSwe: "Någon knackar på dörren.", exArb: "أحد يطرق الباب." },
    "Knarkar": { exSwe: "Han knarkar droger.", exArb: "يتعاطى المخدرات." },
    "Knarrar": { exSwe: "Golvet knarrar.", exArb: "الأرضية تصرير." },
    "Knycker": { exSwe: "Tjuven knycker plånboken.", exArb: "اللص يسرق المحفظة." }
};

console.log('═══════════════════════════════════════════════════════════════');
console.log('     إضافة أمثلة للدفعات الإضافية من الأفعال');
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
