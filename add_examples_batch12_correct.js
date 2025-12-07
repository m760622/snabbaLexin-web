/**
 * ADD EXAMPLES - BATCH 12 FINAL (Correct Word Matching)
 * Final batch to reach 500 examples target
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
    // SPORTS & HOBBIES
    // ==========================================
    "Ishockey|Substantiv": { exSwe: "Sverige är bra på ishockey.", exArb: "السويد جيدة في هوكي الجليد." },
    "Basket|Substantiv": { exSwe: "Vi spelar basket.", exArb: "نلعب كرة السلة." },
    "Handboll|Substantiv": { exSwe: "Handboll är populärt.", exArb: "كرة اليد شائعة." },
    "Bordtennis|Substantiv": { exSwe: "Vi spelar bordtennis.", exArb: "نلعب تنس الطاولة." },
    "Golf|Substantiv": { exSwe: "Han gillar golf.", exArb: "يحب الغولف." },
    "Skidåkning|Substantiv": { exSwe: "Skidåkning är kul.", exArb: "التزلج ممتع." },
    "Skridskoåkning|Substantiv": { exSwe: "Skridskoåkning är roligt.", exArb: "التزلج على الجليد ممتع." },
    "Ridning|Substantiv": { exSwe: "Hon gillar ridning.", exArb: "تحب ركوب الخيل." },
    "Fiske|Substantiv": { exSwe: "Vi åker på fiske.", exArb: "نذهب للصيد." },
    "Camping|Substantiv": { exSwe: "Vi campar i skogen.", exArb: "نخيم في الغابة." },
    "Vandring|Substantiv": { exSwe: "Vandring i bergen är härligt.", exArb: "المشي في الجبال رائع." },
    "Cykling|Substantiv": { exSwe: "Cykling är bra motion.", exArb: "ركوب الدراجة رياضة جيدة." },
    "Gympa|Substantiv": { exSwe: "Jag går på gympa.", exArb: "أذهب للجمباز." },
    "Yoga|Substantiv": { exSwe: "Yoga är avslappnande.", exArb: "اليوغا مريحة." },
    "Trädgårdsarbete|Substantiv": { exSwe: "Jag gillar trädgårdsarbete.", exArb: "أحب العمل في الحديقة." },
    "Matlagning|Substantiv": { exSwe: "Matlagning är min hobby.", exArb: "الطبخ هوايتي." },
    "Bakning|Substantiv": { exSwe: "Jag älskar bakning.", exArb: "أحب الخَبْز." },
    "Sömnad|Substantiv": { exSwe: "Sömnad är kreativt.", exArb: "الخياطة إبداعية." },
    "Hantverk|Substantiv": { exSwe: "Jag gör hantverk.", exArb: "أعمل الحرف اليدوية." },
    "Fotografering|Substantiv": { exSwe: "Fotografering är min passion.", exArb: "التصوير شغفي." },

    // ==========================================
    // VEHICLES & PARTS
    // ==========================================
    "Flygplats|Substantiv": { exSwe: "Jag är på flygplatsen.", exArb: "أنا في المطار." },
    "Tågstation|Substantiv": { exSwe: "Vi möts på tågstationen.", exArb: "نتقابل في محطة القطار." },
    "Busstation|Substantiv": { exSwe: "Busstationen är nära.", exArb: "محطة الحافلات قريبة." },
    "Parkeringsplats|Substantiv": { exSwe: "Jag hittade en parkeringsplats.", exArb: "وجدت موقفاً للسيارة." },
    "Tankstation|Substantiv": { exSwe: "Vi stannar vid tankstationen.", exArb: "نتوقف عند محطة الوقود." },
    "Hjul|Substantiv": { exSwe: "Hjulet är punka.", exArb: "العجلة مثقوبة." },
    "Däck|Substantiv": { exSwe: "Byt däck.", exArb: "غيّر الإطار." },
    "Motor|Substantiv": { exSwe: "Motorn fungerar inte.", exArb: "المحرك لا يعمل." },
    "Broms|Substantiv": { exSwe: "Bromsarna behöver bytas.", exArb: "المكابح تحتاج للتغيير." },
    "Ratt|Substantiv": { exSwe: "Håll i ratten.", exArb: "أمسك بالمقود." },
    "Baksäte|Substantiv": { exSwe: "Barnen sitter i baksätet.", exArb: "الأطفال يجلسون في المقعد الخلفي." },
    "Säkerhetsbälte|Substantiv": { exSwe: "Använd säkerhetsbältet.", exArb: "استخدم حزام الأمان." },
    "Bagageutrymme|Substantiv": { exSwe: "Väskan ligger i bagageutrymmet.", exArb: "الحقيبة في صندوق السيارة." },
    "Vindruta|Substantiv": { exSwe: "Vindrutorna är smutsiga.", exArb: "الزجاج الأمامي متسخ." },
    "Strålkastare|Substantiv": { exSwe: "Tänd strålkastarna.", exArb: "أشعل المصابيح الأمامية." },
    "Backspegel|Substantiv": { exSwe: "Titta i backspegeln.", exArb: "انظر في المرآة الخلفية." },
    "Tuta|Substantiv": { exSwe: "Tryck på tutan.", exArb: "اضغط على الزامور." },

    // ==========================================
    // EMOTIONS & STATES (More)
    // ==========================================
    "Överraskad|Adjektiv": { exSwe: "Jag blev överraskad.", exArb: "فوجئت." },
    "Förvirrad|Adjektiv": { exSwe: "Jag är förvirrad.", exArb: "أنا مشوش." },
    "Frustrerad|Adjektiv": { exSwe: "Han är frustrerad.", exArb: "هو محبط." },
    "Uppspelt|Adjektiv": { exSwe: "Barnen är uppspelta.", exArb: "الأطفال متحمسون." },
    "Dyster|Adjektiv": { exSwe: "Han ser dyster ut.", exArb: "يبدو كئيباً." },
    "Fundersam|Adjektiv": { exSwe: "Hon är fundersam.", exArb: "هي متأملة." },
    "Spänd|Adjektiv": { exSwe: "Jag är spänd.", exArb: "أنا متوتر." },
    "Avslappnad|Adjektiv": { exSwe: "Jag känner mig avslappnad.", exArb: "أشعر بالاسترخاء." },
    "Inspirerad|Adjektiv": { exSwe: "Jag är inspirerad.", exArb: "أنا ملهم." },
    "Lättad|Adjektiv": { exSwe: "Jag är lättad.", exArb: "أنا مرتاح." },
    "Kär|Adjektiv": { exSwe: "Han är kär.", exArb: "هو واقع في الحب." },
    "Svartsjuk|Adjektiv": { exSwe: "Hon är svartsjuk.", exArb: "هي غيورة." },
    "Missnöjd|Adjektiv": { exSwe: "Kunden är missnöjd.", exArb: "الزبون غير راضٍ." },
    "Nöjd|Adjektiv": { exSwe: "Jag är nöjd med resultatet.", exArb: "أنا راضٍ عن النتيجة." },
    "Förväntansfull|Adjektiv": { exSwe: "Barnen är förväntansfulla.", exArb: "الأطفال متحمسون." },

    // ==========================================
    // BUSINESS & COMMERCE
    // ==========================================
    "Faktura|Substantiv": { exSwe: "Betala fakturan.", exArb: "ادفع الفاتورة." },
    "Offert|Substantiv": { exSwe: "Jag skickar en offert.", exArb: "أرسل عرض سعر." },
    "Avtal|Substantiv": { exSwe: "Vi skrev under avtalet.", exArb: "وقّعنا العقد." },
    "Kontrakt|Substantiv": { exSwe: "Läs kontraktet.", exArb: "اقرأ العقد." },
    "Beställning|Substantiv": { exSwe: "Din beställning är klar.", exArb: "طلبك جاهز." },
    "Leverans|Substantiv": { exSwe: "Leveransen kommer imorgon.", exArb: "التسليم يأتي غداً." },
    "Garanti|Substantiv": { exSwe: "Det finns garantin.", exArb: "يوجد ضمان." },
    "Retur|Substantiv": { exSwe: "Jag vill göra en retur.", exArb: "أريد عمل إرجاع." },
    "Byte|Substantiv": { exSwe: "Kan jag göra ett byte?", exArb: "هل يمكنني عمل استبدال؟" },
    "Reklamation|Substantiv": { exSwe: "Jag gör en reklamation.", exArb: "أقدم شكوى." },
    "Moms|Substantiv": { exSwe: "Priset är inklusive moms.", exArb: "السعر شامل الضريبة." },
    "Budget|Substantiv": { exSwe: "Vi har en begränsad budget.", exArb: "لدينا ميزانية محدودة." },
    "Investering|Substantiv": { exSwe: "Det är en bra investering.", exArb: "هذا استثمار جيد." },
    "Vinst|Substantiv": { exSwe: "Företaget gör vinst.", exArb: "الشركة تحقق ربحاً." },
    "Förlust|Substantiv": { exSwe: "Vi gick med förlust.", exArb: "خسرنا." },
    "Kostnad|Substantiv": { exSwe: "Kostnaden är hög.", exArb: "التكلفة عالية." },
    "Utgift|Substantiv": { exSwe: "Vi har många utgifter.", exArb: "لدينا مصاريف كثيرة." },
    "Inkomst|Substantiv": { exSwe: "Min inkomst är bra.", exArb: "دخلي جيد." },

    // ==========================================
    // LEGAL & FORMAL
    // ==========================================
    "Pass|Substantiv": { exSwe: "Ta med passet.", exArb: "خذ جواز السفر." },
    "Visum|Substantiv": { exSwe: "Jag behöver visum.", exArb: "أحتاج تأشيرة." },
    "Körkort|Substantiv": { exSwe: "Jag har körkort.", exArb: "لدي رخصة قيادة." },
    "Legitimation|Substantiv": { exSwe: "Visa din legitimation.", exArb: "أرِ هويتك." },
    "Personnummer|Substantiv": { exSwe: "Vad är ditt personnummer?", exArb: "ما هو رقمك الشخصي؟" },
    "Ansökan|Substantiv": { exSwe: "Skicka in ansökan.", exArb: "قدم الطلب." },
    "Tillstånd|Substantiv": { exSwe: "Du behöver tillstånd.", exArb: "تحتاج تصريحاً." },
    "Intyg|Substantiv": { exSwe: "Jag behöver ett intyg.", exArb: "أحتاج شهادة." },
    "Bevis|Substantiv": { exSwe: "Det finns inga bevis.", exArb: "لا يوجد دليل." },
    "Dom|Substantiv": { exSwe: "Domstolen gav sin dom.", exArb: "أصدرت المحكمة حكمها." },
    "Straff|Substantiv": { exSwe: "Straffet var hårt.", exArb: "كانت العقوبة قاسية." },
    "Böter|Substantiv": { exSwe: "Han fick böter.", exArb: "حصل على غرامة." },
    "Vittne|Substantiv": { exSwe: "Vittnet talade.", exArb: "تكلم الشاهد." },
    "Advokat|Substantiv": { exSwe: "Jag behöver en advokat.", exArb: "أحتاج محامياً." },

    // ==========================================
    // MORE COMMON VERBS
    // ==========================================
    "Vågar|Verb": { exSwe: "Jag vågar inte.", exArb: "لا أجرؤ." },
    "Lyckas|Verb": { exSwe: "Jag lyckades!", exArb: "نجحت!" },
    "Misslyckas|Verb": { exSwe: "Han misslyckades.", exArb: "فشل." },
    "Påverkar|Verb": { exSwe: "Vädret påverkar humöret.", exArb: "الطقس يؤثر على المزاج." },
    "Beror på|Verb": { exSwe: "Det beror på.", exArb: "هذا يعتمد." },
    "Stör|Verb": { exSwe: "Stör inte!", exArb: "لا تزعج!" },
    "Avbryter|Verb": { exSwe: "Avbryt inte mig.", exArb: "لا تقاطعني." },
    "Ersätter|Verb": { exSwe: "Vi ersätter produkten.", exArb: "سنستبدل المنتج." },
    "Rekommenderar|Verb": { exSwe: "Jag rekommenderar detta.", exArb: "أنصح بهذا." },
    "Föredrar|Verb": { exSwe: "Jag föredrar kaffe.", exArb: "أفضل القهوة." },
    "Undviker|Verb": { exSwe: "Jag undviker socker.", exArb: "أتجنب السكر." },
    "Uppskattar|Verb": { exSwe: "Jag uppskattar din hjälp.", exArb: "أقدر مساعدتك." },
    "Respekterar|Verb": { exSwe: "Jag respekterar dig.", exArb: "أحترمك." },
    "Förväntar|Verb": { exSwe: "Jag förväntar mig mer.", exArb: "أتوقع المزيد." },
    "Märker|Verb": { exSwe: "Jag märker ingen skillnad.", exArb: "لا ألاحظ فرقاً." },
    "Inser|Verb": { exSwe: "Jag inser problemet.", exArb: "أدرك المشكلة." },
    "Erkänner|Verb": { exSwe: "Han erkänner sitt misstag.", exArb: "يعترف بخطئه." },
    "Förnekar|Verb": { exSwe: "Han förnekar allt.", exArb: "ينكر كل شيء." },
    "Bekräftar|Verb": { exSwe: "Jag bekräftar bokningen.", exArb: "أؤكد الحجز." },
    "Avbokar|Verb": { exSwe: "Jag avbokar mötet.", exArb: "ألغي الاجتماع." }
};

console.log('═══════════════════════════════════════════════════════════════');
console.log('     ADDING EXAMPLES - BATCH 12 FINAL (Sports, Vehicles, Business)');
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
