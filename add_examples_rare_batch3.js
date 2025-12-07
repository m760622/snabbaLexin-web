/**
 * ADD EXAMPLES - RARE WORDS BATCH 3 FINAL
 * Focus on more useful rare words to exceed 500 total
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
    // MORE USEFUL RARE VERBS (L-Z)
    // ==========================================
    "Laborerar|Verb": { exSwe: "Vi laborerar med kemikalier.", exArb: "نجري تجارب بالمواد الكيميائية." },
    "Lackerar|Verb": { exSwe: "Han lackerar möbeln.", exArb: "يلاكي الأثاث." },
    "Landstiger|Verb": { exSwe: "Soldaterna landstiger på stranden.", exArb: "الجنود ينزلون على الشاطئ." },
    "Lanserar|Verb": { exSwe: "Företaget lanserar en ny produkt.", exArb: "الشركة تطلق منتجاً جديداً." },
    "Laserar|Verb": { exSwe: "Vi laserar med laserstrålar.", exArb: "نستخدم أشعة الليزر." },
    "Legitimerar|Verb": { exSwe: "Han legitimerar sig.", exArb: "يُظهر هويته." },
    "Likviderar|Verb": { exSwe: "De likviderar företaget.", exArb: "يصفّون الشركة." },
    "Livnär|Verb": { exSwe: "Hon livnär sig på skrivande.", exArb: "تكسب قوتها من الكتابة." },
    "Lockar|Verb": { exSwe: "Reklamen lockar kunder.", exArb: "الإعلان يجذب الزبائن." },
    "Lurar|Verb": { exSwe: "Bedragaren lurar folk.", exArb: "المحتال يخدع الناس." },
    "Lyser|Verb": { exSwe: "Lampan lyser starkt.", exArb: "المصباح يضيء بقوة." },
    "Manipulerar|Verb": { exSwe: "Han manipulerar andra.", exArb: "يتلاعب بالآخرين." },
    "Marknadsför|Verb": { exSwe: "Vi marknadsför produkten.", exArb: "نسوّق المنتج." },
    "Maskerar|Verb": { exSwe: "Hon maskerar sig för festen.", exArb: "تتنكر للحفلة." },
    "Masserar|Verb": { exSwe: "Terapeuten masserar ryggen.", exArb: "المعالج يدلك الظهر." },
    "Maximerar|Verb": { exSwe: "Vi maximerar vinsten.", exArb: "نعظّم الأرباح." },
    "Medierar|Verb": { exSwe: "Han medierar mellan parterna.", exArb: "يتوسط بين الأطراف." },
    "Memorerar|Verb": { exSwe: "Hon memorerar dikten.", exArb: "تحفظ القصيدة." },
    "Minimerar|Verb": { exSwe: "Vi minimerar kostnaderna.", exArb: "نقلل التكاليف." },
    "Moderniserar|Verb": { exSwe: "De moderniserar fabriken.", exArb: "يحدّثون المصنع." },
    "Modifierar|Verb": { exSwe: "Han modifierar bilen.", exArb: "يعدّل السيارة." },
    "Moniterar|Verb": { exSwe: "Vi moniterar systemen.", exArb: "نراقب الأنظمة." },
    "Motiverar|Verb": { exSwe: "Hon motiverar sitt beslut.", exArb: "تبرر قرارها." },
    "Multiplicerar|Verb": { exSwe: "Multiplicera 5 med 3.", exArb: "اضرب 5 في 3." },
    "Mumlar|Verb": { exSwe: "Han mumlar något.", exArb: "يتمتم بشيء." },
    "Navigerar|Verb": { exSwe: "Kaptenen navigerar skeppet.", exArb: "القبطان يبحر بالسفينة." },
    "Negligerar|Verb": { exSwe: "Han negligerar sina plikter.", exArb: "يهمل واجباته." },
    "Neutraliserar|Verb": { exSwe: "Vi neutraliserar hotet.", exArb: "نحيّد التهديد." },
    "Nominerar|Verb": { exSwe: "De nominerar en kandidat.", exArb: "يرشحون مرشحاً." },
    "Normaliserar|Verb": { exSwe: "Situationen normaliseras.", exArb: "الوضع يعود إلى طبيعته." },
    "Noterar|Verb": { exSwe: "Jag noterar det.", exArb: "ألاحظ ذلك." },
    "Numrerar|Verb": { exSwe: "Numrera sidorna.", exArb: "رقّم الصفحات." },
    "Objektifierar|Verb": { exSwe: "Man ska inte objektifiera människor.", exArb: "لا ينبغي تشييء البشر." },
    "Observerar|Verb": { exSwe: "Vi observerar stjärnorna.", exArb: "نراقب النجوم." },
    "Ockuperar|Verb": { exSwe: "Armén ockuperar territoriet.", exArb: "الجيش يحتل الأرض." },
    "Offrar|Verb": { exSwe: "Han offrar sin tid.", exArb: "يضحي بوقته." },
    "Opererar|Verb": { exSwe: "Kirurgen opererar patienten.", exArb: "الجراح يجري العملية." },
    "Optimerar|Verb": { exSwe: "Vi optimerar prestandan.", exArb: "نحسّن الأداء." },
    "Ordinerar|Verb": { exSwe: "Läkaren ordinerar medicin.", exArb: "الطبيب يصف الدواء." },
    "Organiserar|Verb": { exSwe: "Hon organiserar evenemanget.", exArb: "تنظم الفعالية." },
    "Orienterar|Verb": { exSwe: "Vi orienterar oss i skogen.", exArb: "نتوجه في الغابة." },
    "Paketerar|Verb": { exSwe: "Vi paketerar produkterna.", exArb: "نغلف المنتجات." },
    "Panikerar|Verb": { exSwe: "Panikera inte!", exArb: "لا تصب بالذعر!" },
    "Patrullerar|Verb": { exSwe: "Polisen patrullerar området.", exArb: "الشرطة تقوم بدورية في المنطقة." },
    "Pensionerar|Verb": { exSwe: "Han pensioneras nästa år.", exArb: "سيتقاعد العام القادم." },
    "Pläderar|Verb": { exSwe: "Advokaten pläderar för sin klient.", exArb: "المحامي يترافع عن موكله." },
    "Polerar|Verb": { exSwe: "Han polerar bilen.", exArb: "يلمّع السيارة." },
    "Praktiserar|Verb": { exSwe: "Hon praktiserar på företaget.", exArb: "تتدرب في الشركة." },
    "Pressar|Verb": { exSwe: "Han pressar citronen.", exArb: "يعصر الليمونة." },
    "Prioriterar|Verb": { exSwe: "Vi prioriterar säkerhet.", exArb: "نعطي الأولوية للسلامة." },
    "Privatiserar|Verb": { exSwe: "Regeringen privatiserar företaget.", exArb: "الحكومة تخصخص الشركة." },
    "Procedera|Verb": { exSwe: "Vi procederar enligt planen.", exArb: "نتابع وفق الخطة." },
    "Producerar|Verb": { exSwe: "Fabriken producerar bilar.", exArb: "المصنع ينتج السيارات." },
    "Programmerar|Verb": { exSwe: "Han programmerar datorer.", exArb: "يبرمج الحواسيب." },
    "Propagerar|Verb": { exSwe: "De propagerar för fred.", exArb: "يروجون للسلام." },
    "Protesterar|Verb": { exSwe: "Folket protesterar mot lagen.", exArb: "الشعب يحتج على القانون." },
    "Provocerar|Verb": { exSwe: "Han provocerar henne.", exArb: "يستفزها." },
    "Publicerar|Verb": { exSwe: "Vi publicerar rapporten.", exArb: "ننشر التقرير." },
    "Rasar|Verb": { exSwe: "Byggnaden rasar.", exArb: "المبنى ينهار." },
    "Raserar|Verb": { exSwe: "De raserar huset.", exArb: "يهدمون البيت." },
    "Rationaliserar|Verb": { exSwe: "Vi rationaliserar produktionen.", exArb: "نرشّد الإنتاج." },
    "Reagerar|Verb": { exSwe: "Han reagerar starkt.", exArb: "يتفاعل بقوة." },
    "Reciterar|Verb": { exSwe: "Hon reciterar poesi.", exArb: "تلقي الشعر." },
    "Redogör|Verb": { exSwe: "Han redogör för situationen.", exArb: "يشرح الوضع." },
    "Reformerar|Verb": { exSwe: "Regeringen reformerar systemet.", exArb: "الحكومة تصلح النظام." },
    "Registrerar|Verb": { exSwe: "Jag registrerar mig på kursen.", exArb: "أسجل في الدورة." },
    "Regisserar|Verb": { exSwe: "Hon regisserar filmen.", exArb: "تخرج الفيلم." },
    "Reglerar|Verb": { exSwe: "Lagen reglerar marknaden.", exArb: "القانون ينظم السوق." },
    "Rehabiliterar|Verb": { exSwe: "Vi rehabiliterar patienten.", exArb: "نعيد تأهيل المريض." },
    "Relaterar|Verb": { exSwe: "Jag kan relatera till det.", exArb: "أستطيع أن أتعاطف مع ذلك." },
    "Relaxerar|Verb": { exSwe: "Jag relaxerar på stranden.", exArb: "أسترخي على الشاطئ." },
    "Renoverar|Verb": { exSwe: "Vi renoverar lägenheten.", exArb: "نجدد الشقة." },
    "Reparerar|Verb": { exSwe: "Mekanikern reparerar bilen.", exArb: "الميكانيكي يصلح السيارة." },
    "Representerar|Verb": { exSwe: "Hon representerar företaget.", exArb: "تمثل الشركة." },
    "Respekterar|Verb": { exSwe: "Jag respekterar din åsikt.", exArb: "أحترم رأيك." },
    "Restaurerar|Verb": { exSwe: "De restaurerar slottet.", exArb: "يرممون القصر." },
    "Revolterar|Verb": { exSwe: "Folket revolterar.", exArb: "الشعب يثور." },
    "Revolutionerar|Verb": { exSwe: "Tekniken revolutionerar industrin.", exArb: "التكنولوجيا تحدث ثورة في الصناعة." },
    "Ritualiserar|Verb": { exSwe: "Han ritualiserar sina rutiner.", exArb: "يحول روتينه إلى طقوس." },
    "Rivaliserar|Verb": { exSwe: "De två lagen rivaliserar.", exArb: "الفريقان يتنافسان." },
    "Röjer|Verb": { exSwe: "De röjer vägen.", exArb: "يفتحون الطريق." },
    "Röstar|Verb": { exSwe: "Vi röstar i valet.", exArb: "نصوت في الانتخابات." },
    "Saboterar|Verb": { exSwe: "Han saboterar projektet.", exArb: "يخرب المشروع." },
    "Sällar sig|Verb": { exSwe: "Han sällar sig till gruppen.", exArb: "ينضم إلى المجموعة." },
    "Sanerar|Verb": { exSwe: "Vi sanerar marken.", exArb: "ننظف الأرض من التلوث." },
    "Sanktionerar|Verb": { exSwe: "Styrelsen sanktionerar beslutet.", exArb: "المجلس يصادق على القرار." },
    "Seglar|Verb": { exSwe: "Vi seglar på sjön.", exArb: "نبحر في البحيرة." },
    "Separerar|Verb": { exSwe: "De separerade.", exArb: "انفصلا." },
    "Serverar|Verb": { exSwe: "Servitören serverar maten.", exArb: "النادل يقدم الطعام." },
    "Signalerar|Verb": { exSwe: "Lampan signalerar fara.", exArb: "المصباح يشير إلى الخطر." },
    "Signerar|Verb": { exSwe: "Hon signerar kontraktet.", exArb: "توقع العقد." },
    "Simulerar|Verb": { exSwe: "Vi simulerar situationen.", exArb: "نحاكي الوضع." },
    "Sinkar|Verb": { exSwe: "Trafiken sinkar oss.", exArb: "الازدحام يؤخرنا." },
    "Skanderar|Verb": { exSwe: "Demonstranterna skanderar slagord.", exArb: "المتظاهرون يهتفون بشعارات." },
    "Skisserar|Verb": { exSwe: "Han skisserar idén.", exArb: "يرسم الفكرة." },
    "Skjuter|Verb": { exSwe: "Soldaten skjuter.", exArb: "الجندي يطلق النار." },
    "Sköter|Verb": { exSwe: "Hon sköter barnen.", exArb: "تعتني بالأطفال." },
    "Smider|Verb": { exSwe: "Han smider planer.", exArb: "يحيك الخطط." },
    "Solidariserar|Verb": { exSwe: "Vi solidariserar oss med dem.", exArb: "نتضامن معهم." },
    "Specialiserar|Verb": { exSwe: "Han specialiserar sig på hjärtkirurgi.", exArb: "يتخصص في جراحة القلب." },
    "Specificerar|Verb": { exSwe: "Vänligen specificera detaljerna.", exArb: "يرجى تحديد التفاصيل." },
    "Spekulerar|Verb": { exSwe: "Han spekulerar på börsen.", exArb: "يضارب في البورصة." },
    "Sponsrar|Verb": { exSwe: "Företaget sponsrar evenemanget.", exArb: "الشركة ترعى الفعالية." },
    "Stabiliserar|Verb": { exSwe: "Vi stabiliserar ekonomin.", exArb: "نستقر الاقتصاد." },
    "Standardiserar|Verb": { exSwe: "Vi standardiserar processen.", exArb: "نوحّد العملية." },
    "Stimulerar|Verb": { exSwe: "Kaffet stimulerar hjärnan.", exArb: "القهوة تنشط الدماغ." },
    "Stöttar|Verb": { exSwe: "Familjen stöttar mig.", exArb: "العائلة تدعمني." },
    "Strukturerar|Verb": { exSwe: "Vi strukturerar arbetet.", exArb: "نهيكل العمل." },
    "Subventionerar|Verb": { exSwe: "Staten subventionerar jordbruket.", exArb: "الدولة تدعم الزراعة." },
    "Summerar|Verb": { exSwe: "Summera rapporten.", exArb: "لخّص التقرير." },
    "Symboliserar|Verb": { exSwe: "Duvan symboliserar fred.", exArb: "الحمامة ترمز للسلام." },
    "Synkroniserar|Verb": { exSwe: "Vi synkroniserar klockor.", exArb: "نزامن الساعات." },
    "Systematiserar|Verb": { exSwe: "Han systematiserar informationen.", exArb: "ينظم المعلومات." },
    "Testar|Verb": { exSwe: "Vi testar produkten.", exArb: "نختبر المنتج." },
    "Tolererar|Verb": { exSwe: "Jag tolererar inte det.", exArb: "لا أتحمل ذلك." },
    "Transformerar|Verb": { exSwe: "Vi transformerar företaget.", exArb: "نحوّل الشركة." },
    "Transporterar|Verb": { exSwe: "De transporterar varor.", exArb: "ينقلون البضائع." },
    "Traumatiserar|Verb": { exSwe: "Olyckan traumatiserade honom.", exArb: "الحادث صدمه نفسياً." },
    "Trimmar|Verb": { exSwe: "Han trimmar häcken.", exArb: "يشذب السياج." },
    "Triumferar|Verb": { exSwe: "Laget triumferade.", exArb: "الفريق انتصر." },
    "Undervisar|Verb": { exSwe: "Hon undervisar i engelska.", exArb: "تدرّس الإنجليزية." },
    "Uppdaterar|Verb": { exSwe: "Jag uppdaterar programmet.", exArb: "أحدّث البرنامج." },
    "Uppfinner|Verb": { exSwe: "Han uppfann telefonen.", exArb: "اخترع الهاتف." },
    "Uppskattar|Verb": { exSwe: "Jag uppskattar din hjälp.", exArb: "أقدر مساعدتك." },
    "Urbaniserar|Verb": { exSwe: "Landet urbaniseras.", exArb: "البلد يتحضر." },
    "Utmanar|Verb": { exSwe: "Han utmanar konkurrenten.", exArb: "يتحدى المنافس." },
    "Utnyttjar|Verb": { exSwe: "Han utnyttjar situationen.", exArb: "يستغل الوضع." },
    "Utvärderar|Verb": { exSwe: "Vi utvärderar resultaten.", exArb: "نقيّم النتائج." },
    "Varierar|Verb": { exSwe: "Priserna varierar.", exArb: "الأسعار تتفاوت." },
    "Ventilerar|Verb": { exSwe: "Vi ventilerar rummet.", exArb: "نهّوي الغرفة." },
    "Verifierar|Verb": { exSwe: "Vi verifierar informationen.", exArb: "نتحقق من المعلومات." },
    "Visualiserar|Verb": { exSwe: "Jag visualiserar målet.", exArb: "أتخيل الهدف." }
};

console.log('═══════════════════════════════════════════════════════════════');
console.log('     ADDING EXAMPLES - RARE WORDS BATCH 3 FINAL');
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
