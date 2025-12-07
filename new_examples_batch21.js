/**
 * NEW EXAMPLES - BATCH 21
 * Technology, Communication & Media (50 examples)
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
    // TECHNOLOGY
    "Telefon|Substantiv": { exSwe: "Telefonen ringer.", exArb: "الهاتف يرن." },
    "Mobiltelefon|Substantiv": { exSwe: "Jag glömde mobiltelefonen hemma.", exArb: "نسيت الهاتف المحمول في البيت." },
    "Internet|Substantiv": { exSwe: "Internet fungerar inte.", exArb: "الإنترنت لا يعمل." },
    "Hemsida|Substantiv": { exSwe: "Besök vår hemsida.", exArb: "زُر موقعنا الإلكتروني." },
    "App|Substantiv": { exSwe: "Ladda ner appen gratis.", exArb: "حمّل التطبيق مجاناً." },
    "Mejl|Substantiv": { exSwe: "Jag skickar ett mejl.", exArb: "سأرسل إيميلاً." },
    "Meddelande|Substantiv": { exSwe: "Du har ett nytt meddelande.", exArb: "لديك رسالة جديدة." },
    "Sociala medier|": { exSwe: "Hon är aktiv på sociala medier.", exArb: "هي نشطة على وسائل التواصل الاجتماعي." },
    "Sökmotor|Substantiv": { exSwe: "Använd en sökmotor.", exArb: "استخدم محرك بحث." },
    "Wifi|Substantiv": { exSwe: "Finns det wifi här?", exArb: "هل يوجد واي فاي هنا؟" },
    // SOFTWARE
    "Program|Substantiv": { exSwe: "Installera programmet.", exArb: "ثبّت البرنامج." },
    "Uppdatering|Substantiv": { exSwe: "Det finns en ny uppdatering.", exArb: "يوجد تحديث جديد." },
    "Virus|Substantiv": { exSwe: "Datorn har fått virus.", exArb: "أصاب الكمبيوتر فيروس." },
    "Antivirus|Substantiv": { exSwe: "Installera ett antivirusprogram.", exArb: "ثبّت برنامج مكافحة الفيروسات." },
    "Backup|Substantiv": { exSwe: "Gör en backup av dina filer.", exArb: "اعمل نسخة احتياطية من ملفاتك." },
    "Nerladdning|Substantiv": { exSwe: "Nerladdningen tar lång tid.", exArb: "التحميل يستغرق وقتاً طويلاً." },
    "Uppladdning|Substantiv": { exSwe: "Uppladdningen misslyckades.", exArb: "فشل الرفع." },
    // MEDIA
    "TV|Substantiv": { exSwe: "Vi tittar på TV på kvällen.", exArb: "نشاهد التلفاز في المساء." },
    "Radio|Substantiv": { exSwe: "Lyssna på radio.", exArb: "استمع للراديو." },
    "Nyheter|Substantiv": { exSwe: "Jag läser nyheterna varje dag.", exArb: "أقرأ الأخبار كل يوم." },
    "Tidning|Substantiv": { exSwe: "Köp en tidning.", exArb: "اشترِ جريدة." },
    "Artikel|Substantiv": { exSwe: "Artikeln var intressant.", exArb: "كانت المقالة ممتعة." },
    "Reklam|Substantiv": { exSwe: "Det är för mycket reklam.", exArb: "هناك إعلانات كثيرة جداً." },
    "Film|Substantiv": { exSwe: "Vi ska se en film.", exArb: "سنشاهد فيلماً." },
    "Serie|Substantiv": { exSwe: "Jag tittar på en serie.", exArb: "أشاهد مسلسلاً." },
    // COMMUNICATION
    "Samtal|Substantiv": { exSwe: "Vi hade ett långt samtal.", exArb: "أجرينا محادثة طويلة." },
    "Diskussion|Substantiv": { exSwe: "Diskussionen var givande.", exArb: "كان النقاش مفيداً." },
    "Argument|Substantiv": { exSwe: "Han har starka argument.", exArb: "لديه حجج قوية." },
    "Åsikt|Substantiv": { exSwe: "Vad är din åsikt?", exArb: "ما رأيك؟" },
    "Förslag|Substantiv": { exSwe: "Jag har ett förslag.", exArb: "لدي اقتراح." },
    "Beslut|Substantiv": { exSwe: "Vi måste ta ett beslut.", exArb: "يجب أن نتخذ قراراً." },
    "Överenskommelse|Substantiv": { exSwe: "Vi kom till en överenskommelse.", exArb: "توصلنا إلى اتفاق." },
    // LANGUAGE
    "Språk|Substantiv": { exSwe: "Hur många språk pratar du?", exArb: "كم لغة تتكلم؟" },
    "Ord|Substantiv": { exSwe: "Lär dig nya ord varje dag.", exArb: "تعلم كلمات جديدة كل يوم." },
    "Mening|Substantiv": { exSwe: "Skriv en mening.", exArb: "اكتب جملة." },
    "Grammatik|Substantiv": { exSwe: "Grammatiken är svår.", exArb: "القواعد صعبة." },
    "Uttal|Substantiv": { exSwe: "Hans uttal är bra.", exArb: "نطقه جيد." },
    "Översättning|Substantiv": { exSwe: "Översättningen är inte korrekt.", exArb: "الترجمة غير صحيحة." },
    "Ordbok|Substantiv": { exSwe: "Använd en ordbok.", exArb: "استخدم قاموساً." },
    // OFFICE
    "Dokument|Substantiv": { exSwe: "Skriv under dokumentet.", exArb: "وقّع على المستند." },
    "Kopia|Substantiv": { exSwe: "Jag behöver en kopia.", exArb: "أحتاج نسخة." },
    "Original|Substantiv": { exSwe: "Behåll originalet.", exArb: "احتفظ بالأصل." },
    "Mapp|Substantiv": { exSwe: "Lägg pappret i mappen.", exArb: "ضع الورقة في الملف." },
    "Formulär|Substantiv": { exSwe: "Fyll i formuläret.", exArb: "املأ الاستمارة." },
    "Ansökan|Substantiv": { exSwe: "Skicka in din ansökan.", exArb: "أرسل طلبك." },
    "Kontrakt|Substantiv": { exSwe: "Skriv under kontraktet.", exArb: "وقّع على العقد." },
    "Intyg|Substantiv": { exSwe: "Du behöver ett intyg.", exArb: "تحتاج شهادة." },
    "Bevis|Substantiv": { exSwe: "Har du bevis?", exArb: "هل لديك دليل؟" },
    "Underskrift|Substantiv": { exSwe: "Jag behöver din underskrift.", exArb: "أحتاج توقيعك." }
};

console.log('═══════════════════════════════════════════════════════════════');
console.log('     ADDING EXAMPLES - NEW BATCH 21 (50 Technology/Media Words)');
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
