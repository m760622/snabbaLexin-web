/**
 * ADD EXAMPLES - BATCH 9 (Correct Word Matching)
 * Focus on activities, directions, senses, relationships, and more nouns
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
    // DIRECTIONS & POSITIONS
    // ==========================================
    "Höger|Substantiv": { exSwe: "Sväng till höger.", exArb: "انعطف يميناً." },
    "Vänster|Substantiv": { exSwe: "Sväng till vänster.", exArb: "انعطف يساراً." },
    "Rakt|Adverb": { exSwe: "Gå rakt fram.", exArb: "امشِ مستقيماً." },
    "Nära|Adverb": { exSwe: "Skolan ligger nära hemmet.", exArb: "المدرسة قريبة من البيت." },
    "Långt|Adverb": { exSwe: "Det är långt till stan.", exArb: "المسافة بعيدة إلى المدينة." },
    "Framme|Adverb": { exSwe: "Vi är framme!", exArb: "وصلنا!" },
    "Hemma|Adverb": { exSwe: "Jag är hemma.", exArb: "أنا في البيت." },
    "Borta|Adverb": { exSwe: "Han är borta.", exArb: "هو غائب." },
    "Ute|Adverb": { exSwe: "Barnen leker ute.", exArb: "الأطفال يلعبون في الخارج." },
    "Inne|Adverb": { exSwe: "Det är varmt inne.", exArb: "الجو دافئ في الداخل." },
    "Uppe|Adverb": { exSwe: "Hon är uppe på övervåningen.", exArb: "هي في الطابق العلوي." },
    "Nere|Adverb": { exSwe: "Köket är nere.", exArb: "المطبخ في الأسفل." },
    "Ovanför|Preposition": { exSwe: "Tavlan hänger ovanför soffan.", exArb: "اللوحة معلقة فوق الأريكة." },
    "Nedanför|Preposition": { exSwe: "Parkeringen är nedanför huset.", exArb: "الموقف تحت البناية." },
    "Innanför|Preposition": { exSwe: "Skriv innanför linjerna.", exArb: "اكتب داخل السطور." },
    "Utanför|Preposition": { exSwe: "Vänta utanför.", exArb: "انتظر في الخارج." },

    // ==========================================
    // SENSES & PERCEPTIONS
    // ==========================================
    "Ljud|Substantiv": { exSwe: "Jag hör ett ljud.", exArb: "أسمع صوتاً." },
    "Röst|Substantiv": { exSwe: "Hon har en fin röst.", exArb: "لديها صوت جميل." },
    "Doft|Substantiv": { exSwe: "Blommorna har en härlig doft.", exArb: "للزهور رائحة رائعة." },
    "Smak|Substantiv": { exSwe: "Kakan har god smak.", exArb: "الكعكة لها طعم لذيذ." },
    "Känsla|Substantiv": { exSwe: "Jag har en bra känsla.", exArb: "لدي شعور جيد." },
    "Syn|Substantiv": { exSwe: "Min syn är dålig.", exArb: "بصري ضعيف." },
    "Hörsel|Substantiv": { exSwe: "Hans hörsel är utmärkt.", exArb: "سمعه ممتاز." },

    // ==========================================
    // RELATIONSHIPS & SOCIAL
    // ==========================================
    "Vän|Substantiv": { exSwe: "Han är min bästa vän.", exArb: "هو أفضل صديق لي." },
    "Kompis|Substantiv": { exSwe: "Vi är kompisar sedan barndomen.", exArb: "نحن أصدقاء منذ الطفولة." },
    "Granne|Substantiv": { exSwe: "Min granne är trevlig.", exArb: "جاري لطيف." },
    "Partner|Substantiv": { exSwe: "Hon bor med sin partner.", exArb: "تسكن مع شريكها." },
    "Fru|Substantiv": { exSwe: "Min fru arbetar som lärare.", exArb: "زوجتي تعمل كمعلمة." },
    "Man|Substantiv": { exSwe: "Hennes man är läkare.", exArb: "زوجها طبيب." },
    "Barn|Substantiv": { exSwe: "Vi har två barn.", exArb: "لدينا طفلان." },
    "Bebis|Substantiv": { exSwe: "Bebisen sover.", exArb: "الرضيع نائم." },
    "Ungdom|Substantiv": { exSwe: "Ungdomen gillar sport.", exArb: "الشباب يحبون الرياضة." },
    "Vuxen|Substantiv": { exSwe: "Vuxna arbetar.", exArb: "البالغون يعملون." },
    "Pensionär|Substantiv": { exSwe: "Morfar är pensionär.", exArb: "جدي متقاعد." },

    // ==========================================
    // CONCEPTS & ABSTRACT
    // ==========================================
    "Liv|Substantiv": { exSwe: "Livet är vackert.", exArb: "الحياة جميلة." },
    "Död|Substantiv": { exSwe: "Döden är en del av livet.", exArb: "الموت جزء من الحياة." },
    "Dröm|Substantiv": { exSwe: "Jag hade en konstig dröm.", exArb: "حلمت حلماً غريباً." },
    "Hopp|Substantiv": { exSwe: "Ge inte upp hoppet.", exArb: "لا تفقد الأمل." },
    "Lycka|Substantiv": { exSwe: "Lycka är viktigare än pengar.", exArb: "السعادة أهم من المال." },
    "Kärlek|Substantiv": { exSwe: "Kärlek är det viktigaste.", exArb: "الحب هو الأهم." },
    "Hat|Substantiv": { exSwe: "Hat förstör.", exArb: "الكراهية تدمر." },
    "Sanning|Substantiv": { exSwe: "Säg sanningen.", exArb: "قل الحقيقة." },
    "Lögn|Substantiv": { exSwe: "Ljug aldrig.", exArb: "لا تكذب أبداً." },
    "Hemlighet|Substantiv": { exSwe: "Jag har en hemlighet.", exArb: "لدي سر." },
    "Problem|Substantiv": { exSwe: "Vi har ett problem.", exArb: "لدينا مشكلة." },
    "Lösning|Substantiv": { exSwe: "Det finns alltid en lösning.", exArb: "هناك دائماً حل." },
    "Orsak|Substantiv": { exSwe: "Vad är orsaken?", exArb: "ما السبب؟" },
    "Resultat|Substantiv": { exSwe: "Resultatet var bra.", exArb: "النتيجة كانت جيدة." },
    "Mål|Substantiv": { exSwe: "Mitt mål är att lära mig svenska.", exArb: "هدفي تعلم السويدية." },
    "Plan|Substantiv": { exSwe: "Vi har en plan.", exArb: "لدينا خطة." },
    "Idé|Substantiv": { exSwe: "Jag har en idé.", exArb: "لدي فكرة." },
    "Fråga|Substantiv": { exSwe: "Har du någon fråga?", exArb: "هل لديك سؤال؟" },
    "Svar|Substantiv": { exSwe: "Jag vet svaret.", exArb: "أعرف الجواب." },
    "Kunskap|Substantiv": { exSwe: "Kunskap är makt.", exArb: "المعرفة قوة." },
    "Erfarenhet|Substantiv": { exSwe: "Han har mycket erfarenhet.", exArb: "لديه خبرة كبيرة." },
    "Minne|Substantiv": { exSwe: "Jag har goda minnen.", exArb: "لدي ذكريات جميلة." },
    "Tanke|Substantiv": { exSwe: "Vad är dina tankar?", exArb: "ما أفكارك؟" },
    "Åsikt|Substantiv": { exSwe: "Vad är din åsikt?", exArb: "ما رأيك؟" },

    // ==========================================
    // MORE VERBS - SOCIAL & MENTAL
    // ==========================================
    "Träffar|Verb": { exSwe: "Jag träffar mina vänner.", exArb: "ألتقي بأصدقائي." },
    "Hälsar|Verb": { exSwe: "Han hälsar på grannen.", exArb: "يحيي الجار." },
    "Presenterar|Verb": { exSwe: "Hon presenterar sig.", exArb: "تُعرّف عن نفسها." },
    "Bjuder|Verb": { exSwe: "Jag bjuder på fika.", exArb: "أدعو على القهوة." },
    "Diskuterar|Verb": { exSwe: "Vi diskuterar problemet.", exArb: "نناقش المشكلة." },
    "Föreslår|Verb": { exSwe: "Jag föreslår att vi går.", exArb: "أقترح أن نذهب." },
    "Accepterar|Verb": { exSwe: "Jag accepterar din inbjudan.", exArb: "أقبل دعوتك." },
    "Vägrar|Verb": { exSwe: "Han vägrar svara.", exArb: "يرفض الإجابة." },
    "Tvivlar|Verb": { exSwe: "Jag tvivlar på det.", exArb: "أشك في ذلك." },
    "Tror|Verb": { exSwe: "Jag tror att det stämmer.", exArb: "أعتقد أن ذلك صحيح." },
    "Vet|Verb": { exSwe: "Jag vet inte.", exArb: "لا أعرف." },
    "Förstår|Verb": { exSwe: "Jag förstår vad du menar.", exArb: "أفهم ما تعني." },
    "Lär|Verb": { exSwe: "Jag lär mig svenska.", exArb: "أتعلم السويدية." },
    "Glömmer|Verb": { exSwe: "Glöm inte mig!", exArb: "لا تنساني!" },
    "Kommer ihåg|Verb": { exSwe: "Jag kommer ihåg dig.", exArb: "أتذكرك." },
    "Funderar|Verb": { exSwe: "Jag funderar på det.", exArb: "أفكر في الأمر." },
    "Planerar|Verb": { exSwe: "Vi planerar en resa.", exArb: "نخطط لرحلة." },
    "Bestämmer|Verb": { exSwe: "Du bestämmer.", exArb: "أنت تقرر." },
    "Väljer|Verb": { exSwe: "Välj en.", exArb: "اختر واحدة." },
    "Jämför|Verb": { exSwe: "Jämför priserna.", exArb: "قارن الأسعار." },
    "Beskriver|Verb": { exSwe: "Beskriv huset.", exArb: "صف البيت." },
    "Förklarar|Verb": { exSwe: "Kan du förklara?", exArb: "هل يمكنك أن تشرح؟" },
    "Berättar|Verb": { exSwe: "Berätta en historia.", exArb: "احكِ قصة." },
    "Lovar|Verb": { exSwe: "Jag lovar.", exArb: "أعد." },
    "Förlåter|Verb": { exSwe: "Jag förlåter dig.", exArb: "أسامحك." },
    "Ber om ursäkt|Verb": { exSwe: "Jag ber om ursäkt.", exArb: "أعتذر." },
    "Tackar|Verb": { exSwe: "Jag tackar dig.", exArb: "أشكرك." },
    "Gratulerar|Verb": { exSwe: "Jag gratulerar dig!", exArb: "أهنئك!" }
};

console.log('═══════════════════════════════════════════════════════════════');
console.log('     ADDING EXAMPLES - BATCH 9 (Directions, Senses, Relationships)');
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
