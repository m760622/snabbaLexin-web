/**
 * NEW EXAMPLES - BATCH 18
 * Work, School & Education (50 examples)
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
    // SCHOOL
    "Lärare|Substantiv": { exSwe: "Läraren undervisar matematik.", exArb: "يدرّس المعلم الرياضيات." },
    "Elev|Substantiv": { exSwe: "Eleven sitter i klassrummet.", exArb: "الطالب يجلس في الفصل." },
    "Klassrum|Substantiv": { exSwe: "Klassrummet är stort.", exArb: "الفصل كبير." },
    "Lektion|Substantiv": { exSwe: "Lektionen börjar klockan åtta.", exArb: "تبدأ الحصة الساعة الثامنة." },
    "Läxa|Substantiv": { exSwe: "Jag har mycket läxor idag.", exArb: "لدي واجبات كثيرة اليوم." },
    "Prov|Substantiv": { exSwe: "Vi har prov imorgon.", exArb: "لدينا اختبار غداً." },
    "Betyg|Substantiv": { exSwe: "Han fick bra betyg.", exArb: "حصل على درجات جيدة." },
    "Kurs|Substantiv": { exSwe: "Jag går en språkkurs.", exArb: "أحضر دورة لغة." },
    "Föreläsning|Substantiv": { exSwe: "Föreläsningen var intressant.", exArb: "كانت المحاضرة ممتعة." },
    "Examen|Substantiv": { exSwe: "Hon tog examen i juni.", exArb: "تخرجت في يونيو." },
    // SCHOOL SUPPLIES
    "Penna|Substantiv": { exSwe: "Kan jag låna din penna?", exArb: "هل يمكنني استعارة قلمك؟" },
    "Bläckpenna|Substantiv": { exSwe: "Skriv med bläckpenna.", exArb: "اكتب بقلم الحبر." },
    "Suddgummi|Substantiv": { exSwe: "Suddgummit raderar blyerts.", exArb: "الممحاة تمحو الرصاص." },
    "Linjal|Substantiv": { exSwe: "Dra en linje med linjalen.", exArb: "ارسم خطاً بالمسطرة." },
    "Häfte|Substantiv": { exSwe: "Skriv i häftet.", exArb: "اكتب في الدفتر." },
    "Lärobok|Substantiv": { exSwe: "Läroboken är tung.", exArb: "الكتاب المدرسي ثقيل." },
    "Tavla|Substantiv": { exSwe: "Läraren skriver på tavlan.", exArb: "يكتب المعلم على السبورة." },
    "Krita|Substantiv": { exSwe: "Han ritar med krita.", exArb: "يرسم بالطباشير." },
    // WORK
    "Jobb|Substantiv": { exSwe: "Jag har ett bra jobb.", exArb: "لدي عمل جيد." },
    "Arbetsplats|Substantiv": { exSwe: "Min arbetsplats ligger i centrum.", exArb: "مكان عملي في وسط المدينة." },
    "Kollega|Substantiv": { exSwe: "Mina kollegor är trevliga.", exArb: "زملائي لطيفون." },
    "Chef|Substantiv": { exSwe: "Chefen vill träffa dig.", exArb: "المدير يريد مقابلتك." },
    "Möte|Substantiv": { exSwe: "Vi har möte klockan tio.", exArb: "لدينا اجتماع الساعة العاشرة." },
    "Projekt|Substantiv": { exSwe: "Projektet är nästan klart.", exArb: "المشروع شبه جاهز." },
    "Deadline|Substantiv": { exSwe: "Deadline är på fredag.", exArb: "الموعد النهائي يوم الجمعة." },
    "Semester|Substantiv": { exSwe: "Jag tar semester i juli.", exArb: "آخذ إجازة في يوليو." },
    "Lön|Substantiv": { exSwe: "Lönen kommer den 25:e.", exArb: "يأتي الراتب في الخامس والعشرين." },
    "Tjänst|Substantiv": { exSwe: "Han söker en ny tjänst.", exArb: "يبحث عن وظيفة جديدة." },
    // PROFESSIONS
    "Läkare|Substantiv": { exSwe: "Läkaren undersöker patienten.", exArb: "الطبيب يفحص المريض." },
    "Sjuksköterska|Substantiv": { exSwe: "Sjuksköterskan ger medicin.", exArb: "الممرضة تعطي الدواء." },
    "Ingenjör|Substantiv": { exSwe: "Han arbetar som ingenjör.", exArb: "يعمل مهندساً." },
    "Advokat|Substantiv": { exSwe: "Advokaten försvarar klienten.", exArb: "المحامي يدافع عن الموكل." },
    "Polis|Substantiv": { exSwe: "Polisen hjälper människor.", exArb: "الشرطي يساعد الناس." },
    "Brandman|Substantiv": { exSwe: "Brandmännen släcker elden.", exArb: "رجال الإطفاء يطفئون النار." },
    "Kock|Substantiv": { exSwe: "Kocken lagar mat på restaurangen.", exArb: "الطاهي يطبخ في المطعم." },
    "Frisör|Substantiv": { exSwe: "Frisören klipper mitt hår.", exArb: "الحلاق يقص شعري." },
    "Elektriker|Substantiv": { exSwe: "Elektrikern fixar lampan.", exArb: "الكهربائي يصلح المصباح." },
    "Snickare|Substantiv": { exSwe: "Snickaren bygger möbler.", exArb: "النجار يصنع الأثاث." },
    "Målare|Substantiv": { exSwe: "Målaren målar väggen.", exArb: "الدهان يطلي الجدار." },
    "Mekaniker|Substantiv": { exSwe: "Mekanikern reparerar bilen.", exArb: "الميكانيكي يصلح السيارة." },
    // BUSINESS
    "Företag|Substantiv": { exSwe: "Företaget har 50 anställda.", exArb: "الشركة لديها 50 موظفاً." },
    "Kund|Substantiv": { exSwe: "Kunden är alltid viktig.", exArb: "العميل مهم دائماً." },
    "Avtal|Substantiv": { exSwe: "Vi skrev ett avtal.", exArb: "وقعنا عقداً." },
    "Faktura|Substantiv": { exSwe: "Fakturan ska betalas.", exArb: "الفاتورة يجب دفعها." },
    "Budget|Substantiv": { exSwe: "Vi följer budgeten.", exArb: "نلتزم بالميزانية." },
    "Vinst|Substantiv": { exSwe: "Företaget gjorde vinst.", exArb: "حققت الشركة ربحاً." },
    "Förlust|Substantiv": { exSwe: "De gick med förlust.", exArb: "تكبدوا خسارة." },
    "Investering|Substantiv": { exSwe: "Det är en bra investering.", exArb: "هذا استثمار جيد." },
    "Marknadsföring|Substantiv": { exSwe: "Marknadsföringen är viktig.", exArb: "التسويق مهم." },
    "Strategi|Substantiv": { exSwe: "Vi behöver en ny strategi.", exArb: "نحتاج استراتيجية جديدة." }
};

console.log('═══════════════════════════════════════════════════════════════');
console.log('     ADDING EXAMPLES - NEW BATCH 18 (50 Work/School Words)');
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
