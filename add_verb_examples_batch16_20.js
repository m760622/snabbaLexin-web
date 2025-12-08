/**
 * دفعات 16-20: إضافة أمثلة للأفعال المتبقية من القائمة
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
    // الأفعال ذات المعاني المتعددة والأفعال الباقية
    "Kontrar": { exSwe: "Laget kontrar snabbt.", exArb: "الفريق يشن هجمة مرتدة سريعة." },
    "Kravlar": { exSwe: "Bebisen kravlar på golvet.", exArb: "الرضيع يزحف على الأرض." },
    "Krockar": { exSwe: "Bilarna krockar i korsningen.", exArb: "السيارتان تصطدمان في التقاطع." },
    "Kryssar": { exSwe: "Båten kryssar mot vinden.", exArb: "القارب يبحر متعرجاً ضد الريح." },
    "Kränger": { exSwe: "Han kränger gamla möbler.", exArb: "يبيع الأثاث القديم." },
    "Kuttrar": { exSwe: "Duvorna kuttrar på taket.", exArb: "الحمام يهدل على السطح." },
    "Kvackar": { exSwe: "Ankan kvackar vid dammen.", exArb: "البطة تصوت عند البركة." },
    "Köpslår": { exSwe: "De köpslår om priset.", exArb: "يتفاوضون على السعر." },
    "Matchar": { exSwe: "Skorna matchar klänningen.", exArb: "الحذاء يلائم الفستان." },
    "Mjuknar": { exSwe: "Smöret mjuknar i värmen.", exArb: "الزبدة تلين في الحرارة." },
    "Muddrar": { exSwe: "De muddrar hamnen.", exArb: "ينظفون قاع الميناء." },
    "Muttrar": { exSwe: "Han muttrar något ohörbart.", exArb: "يتمتم بشيء غير مسموع." },
    "Mästrar": { exSwe: "Han mästrar sina kollegor.", exArb: "ينتقد زملاءه." },
    "Mörknar": { exSwe: "Himlen mörknar mot kvällen.", exArb: "السماء تعتم مع المساء." },
    "Nydanar": { exSwe: "De nydanar organisationen.", exArb: "يجددون المنظمة." },
    "Nyttjar": { exSwe: "Han nyttjar sina rättigheter.", exArb: "يستخدم حقوقه." },
    "Närvara": { exSwe: "Alla måste närvara vid mötet.", exArb: "يجب أن يحضر الجميع الاجتماع." },
    "Omdanar": { exSwe: "De omdanar staden.", exArb: "يعيدون تشكيل المدينة." },
    "Omtalar": { exSwe: "Rapporten omtalar problemet.", exArb: "التقرير يذكر المشكلة." },

    // S-verbs
    "Samlar": { exSwe: "Hon samlar frimärken.", exArb: "تجمع الطوابع." },
    "Sandar": { exSwe: "De sandar vägen på vintern.", exArb: "يرشون الرمل على الطريق في الشتاء." },
    "Sargar": { exSwe: "Kritiken sargar honom.", exArb: "النقد يجرحه." },
    "Satsar": { exSwe: "Han satsar allt på ett kort.", exArb: "يراهن بكل شيء على ورقة واحدة." },
    "Saxar": { exSwe: "Hon saxar bilder ur tidningen.", exArb: "تقص الصور من المجلة." },
    "Scannar": { exSwe: "Hon scannar dokumentet.", exArb: "تمسح المستند ضوئياً." },
    "Segar": { exSwe: "Degen segar när man knådar.", exArb: "العجين يتماسك عند العجن." },
    "Separ": { exSwe: "Paret separar efter tio år.", exArb: "الزوجان ينفصلان بعد عشر سنوات." },
    "Sippar": { exSwe: "Vattnet sippar genom väggen.", exArb: "الماء يتسرب عبر الجدار." },
    "Sitter": { exSwe: "Hon sitter på stolen.", exArb: "تجلس على الكرسي." },
    "Skarvar": { exSwe: "Han skarvar på sanningen.", exArb: "يبالغ في الحقيقة." },
    "Skelnar": { exSwe: "Marken skelnar i kylan.", exArb: "الأرض تجمد في البرد." },
    "Skingrar": { exSwe: "Solen skingrar dimman.", exArb: "الشمس تبدد الضباب." },
    "Skippar": { exSwe: "Han skippar middagen.", exArb: "يتخطى العشاء." },
    "Skirrar": { exSwe: "De skirrar om i panik.", exArb: "يتفرقون في ذعر." },
    "Skjutsar": { exSwe: "Hon skjutsar barnen till skolan.", exArb: "توصل الأطفال للمدرسة." },
    "Skojar": { exSwe: "Han skojar bara.", exArb: "إنه يمزح فقط." },
    "Skonar": { exSwe: "Kungen skonar fången.", exArb: "الملك يعفو عن السجين." },
    "Skrapar": { exSwe: "Han skrapar bilen på vintern.", exArb: "يكشط الجليد عن السيارة في الشتاء." },
    "Skrattar": { exSwe: "Alla skrattar åt skämtet.", exArb: "الجميع يضحكون على النكتة." },
    "Skrämmer": { exSwe: "Ljudet skrämmer barnen.", exArb: "الصوت يخيف الأطفال." },
    "Skummar": { exSwe: "Han skummar av fetttet.", exArb: "يزيل الدهن من السطح." },
    "Skurar": { exSwe: "Hon skurar golvet.", exArb: "تفرك الأرض." },
    "Skutar": { exSwe: "Han skutar på sparkcykeln.", exArb: "يركب السكوتر." },
    "Skyfflar": { exSwe: "Han skyfflar snö.", exArb: "يجرف الثلج." },
    "Skyltar": { exSwe: "Vägen skyltar mot centrum.", exArb: "الطريق مشار إليه نحو المركز." },
    "Skärar": { exSwe: "Bonden skärar säden.", exArb: "المزارع يحصد القمح." },
    "Skördar": { exSwe: "De skördar äpplen på hösten.", exArb: "يحصدون التفاح في الخريف." },
    "Sladdrar": { exSwe: "Hon sladdrar om grannar.", exArb: "تثرثر عن الجيران." },
    "Slamsar": { exSwe: "Han slamsar med jobbet.", exArb: "يتكاسل في العمل." },
    "Slantar": { exSwe: "Han slantar en krona till tiggaren.", exArb: "يرمي كرونة للمتسول." },
    "Slappar": { exSwe: "Vi slappar hemma idag.", exArb: "نسترخي في البيت اليوم." },
    "Slinker": { exSwe: "Han slinker in obemärkt.", exArb: "يتسلل دون أن يلاحظه أحد." },
    "Slinter": { exSwe: "Foten slinter på isen.", exArb: "القدم تنزلق على الجليد." },
    "Slirar": { exSwe: "Hjulen slirar på gruset.", exArb: "العجلات تنزلق على الحصى." },
    "Slitnar": { exSwe: "Tyget slitnar med tiden.", exArb: "القماش يبلى مع الوقت." },
    "Slockar": { exSwe: "Elden slockar långsamt.", exArb: "النار تنطفئ ببطء." },
    "Sloknar": { exSwe: "Blommorna sloknar utan vatten.", exArb: "الزهور تذبل بدون ماء." },
    "Slorvar": { exSwe: "Hon slorvar med maten.", exArb: "ترمي الطعام." },
    "Sluttar": { exSwe: "Marken sluttar mot sjön.", exArb: "الأرض تنحدر نحو البحيرة." },
    "Slänger": { exSwe: "Han slänger soporna.", exArb: "يرمي القمامة." },

    // More S-verbs
    "Smackar": { exSwe: "Han smackar när han äter.", exArb: "يصدر صوتاً عند الأكل." },
    "Smittar": { exSwe: "Sjukdomen smittar lätt.", exArb: "المرض معدي بسهولة." },
    "Smiter": { exSwe: "Tjuven smiter från platsen.", exArb: "اللص يهرب من المكان." },
    "Smutsar": { exSwe: "Han smutsar ner kläderna.", exArb: "يوسخ الملابس." },
    "Smällar": { exSwe: "Dörren smäller igen.", exArb: "الباب يغلق بقوة." },
    "Snackar": { exSwe: "De snackar i telefon.", exArb: "يتحدثون في الهاتف." },
    "Snappar": { exSwe: "Hunden snappar efter flugan.", exArb: "الكلب يحاول الإمساك بالذبابة." },
    "Snarkar": { exSwe: "Han snarkar högt.", exArb: "يشخر بصوت عالٍ." },
    "Snattar": { exSwe: "Pojken snattar godis.", exArb: "الولد يسرق الحلوى." },
    "Sneglar": { exSwe: "Hon sneglar på honom.", exArb: "تلقي نظرة خفية عليه." },
    "Snittar": { exSwe: "Han snittar brödet.", exArb: "يشرح الخبز." },
    "Snobbar": { exSwe: "Hon snobbar med sin rikedom.", exArb: "تتعالى بثروتها." },
    "Snuddar": { exSwe: "Bollen snuddar vid ribban.", exArb: "الكرة تلامس العارضة." },
    "Snurrar": { exSwe: "Hjulet snurrar fort.", exArb: "العجلة تدور بسرعة." },
    "Snycker": { exSwe: "Han snycker av glädje.", exArb: "ينشج من الفرح." },
    "Snyftar": { exSwe: "Hon snyftar av sorg.", exArb: "تنشج من الحزن." },
    "Snyter": { exSwe: "Hon snyter sig.", exArb: "تنفث أنفها." },
    "Snorar": { exSwe: "Bebisen snorar.", exArb: "أنف الرضيع يسيل." },
    "Somnar": { exSwe: "Barnet somnar snabbt.", exArb: "الطفل ينام بسرعة." },
    "Sorerar": { exSwe: "De sorterar soporna.", exArb: "يفرزون القمامة." }
};

console.log('═══════════════════════════════════════════════════════════════');
console.log('     إضافة أمثلة للدفعة 16-20');
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
