const fs = require('fs');

// Read data.js
let dataContent = fs.readFileSync('./data.js', 'utf-8');

// Parse
let dictionaryData;
let prefix = "";
let suffix = "";

if (dataContent.includes('const dictionaryData =')) {
    prefix = "const dictionaryData = ";
    suffix = ";";
    dictionaryData = JSON.parse(dataContent.replace(prefix, '').replace(/;$/, ''));
} else {
    console.error("Could not parse data.js structure.");
    process.exit(1);
}

const COL_SWE = 2;
const COL_EX = 6;
const COL_EX_ARB = 7;

// High-quality manual updates for common adverbs found in the list
const updates = {
    "Aldrig": { swe: "Jag har aldrig varit i Paris.", arb: "لم أذهب إلى باريس قط." },
    "Alltid": { swe: "Han kommer alltid i tid till mötet.", arb: "يأتي دائماً في الوقت المحدد للاجتماع." },
    "Kanske": { swe: "Kanske kan vi ses imorgon?", arb: "ربما يمكننا أن نلتقي غداً؟" },
    "Ibland": { swe: "Ibland går jag en promenad på kvällen.", arb: "أحياناً أذهب للمشي في المساء." },
    "Ofta": { swe: "Vi reser ofta till Spanien på sommaren.", arb: "نسافر غالباً إلى إسبانيا في الصيف." },
    "Sällan": { swe: "Det händer sällan att han blir arg.", arb: "نادراً ما يغضب." },
    "Gärna": { swe: "Jag följer gärna med på bio.", arb: "أرافقكم بكل سرور إلى السينما." },
    "Förmodligen": { swe: "Han är förmodligen försenad på grund av trafiken.", arb: "من المحتمل أنه تأخر بسبب حركة المرور." },
    "Egentligen": { swe: "Vad menar du egentligen med det?", arb: "ما الذي تعنيه بذلك في الواقع؟" },
    "Faktiskt": { swe: "Jag vet faktiskt inte vad som hände.", arb: "أنا في الواقع لا أعرف ما حدث." },
    "Naturligtvis": { swe: "Naturligtvis får du låna bilen.", arb: "بالطبع يمكنك استعارة السيارة." },
    "Troligen": { swe: "Det kommer troligen att regna i eftermiddag.", arb: "من المرجح أن تمطر بعد الظهر." },
    "Möjligen": { swe: "Kan du möjligen hjälpa mig med detta?", arb: "هل يمكنك مساعدتي في هذا من فضلك؟" },
    "Ju": { swe: "Du vet ju att jag inte gillar fisk.", arb: "أنت تعلم بالتأكيد أنني لا أحب السمك." },
    "Väl": { swe: "Det går väl bra om vi kommer lite senare?", arb: "لا بأس إذا جئنا متأخرين قليلاً، أليس كذلك؟" },
    "Nog": { swe: "Det är nog bäst att vi går hem nu.", arb: "من الأفضل على الأرجح أن نذهب للمنزل الآن." },
    "Bara": { swe: "Jag ville bara säga hej.", arb: "أردت فقط أن أقول مرحباً." },
    "Endast": { swe: "Erbjudandet gäller endast idag.", arb: "العرض ساري اليوم فقط." },
    "Redan": { swe: "Har du redan ätit middag?", arb: "هل تناولت العشاء بالفعل؟" },
    "Ännu": { swe: "Jag har inte fått svar ännu.", arb: "لم أتلقَ رداً بعد." },
    "Hittills": { swe: "Hittills har allt gått bra.", arb: "سارت الأمور على ما يرام حتى الآن." },
    "Strax": { swe: "Maten är klar strax.", arb: "الطعام سيكون جاهزاً قريباً." },
    "Snart": { swe: "Vi ses snart igen.", arb: "نلتقي قريباً مجدداً." },
    "Nyligen": { swe: "De har nyligen flyttat till en ny lägenhet.", arb: "لقد انتقلوا مؤخراً إلى شقة جديدة." },
    "Tidigare": { swe: "Jag har aldrig sett honom tidigare.", arb: "لم أره من قبل." },
    "Senare": { swe: "Vi kan prata mer om det senare.", arb: "يمكننا التحدث أكثر عن ذلك لاحقاً." },
    "Hemma": { swe: "Jag trivs bäst hemma.", arb: "أشعر براحة أكبر في المنزل." },
    "Borta": { swe: "Borta bra men hemma bäst.", arb: "الغربة جيدة لكن الوطن أفضل." },
    "Inne": { swe: "Det är varmt och skönt inne.", arb: "الجو دافئ ومريح في الداخل." },
    "Ute": { swe: "Barnen leker ute i trädgården.", arb: "الأطفال يلعبون في الخارج في الحديقة." },
    "Upp": { swe: "Solen går upp i öster.", arb: "تشرق الشمس من الشرق." },
    "Ner": { swe: "Priserna har gått ner på sistone.", arb: "لقد انخفضت الأسعار في الآونة الأخيرة." },
    "Hit": { swe: "Kom hit är du snäll.", arb: "تعال إلى هنا من فضلك." },
    "Dit": { swe: "Vi kan gå dit tillsammans.", arb: "يمكننا الذهاب إلى هناك معاً." },
    "Var": { swe: "Var bor du någonstans?", arb: "أين تسكن؟" },
    "Vart": { swe: "Vart är du på väg?", arb: "إلى أين أنت ذاهب؟" },
    "Därför": { swe: "Jag var sjuk, därför kom jag inte.", arb: "كنت مريضاً، ولهذا السبب لم آتِ." },
    "Alltså": { swe: "Jag tänker, alltså finns jag.", arb: "أنا أفكر، إذن أنا موجود." },
    "Ändå": { swe: "Det regnade, men vi gick ut ändå.", arb: "كانت تمطر، لكننا خرجنا رغم ذلك." },
    "Dessutom": { swe: "Matchen var tråkig, och dessutom regnade det.", arb: "المباراة كانت مملة، وعلاوة على ذلك كانت تمطر." },
    "Tyvärr": { swe: "Tyvärr kan jag inte komma på festen.", arb: "للأسف لا أستطيع الحضور إلى الحفلة." },
    "Lyckligtvis": { swe: "Lyckligtvis blev ingen skadad i olyckan.", arb: "لحسن الحظ لم يصب أحد في الحادث." },
    "Särskilt": { swe: "Jag gillar inte fisk, särskilt inte sill.", arb: "لا أحب السمك، وخصوصاً الرنجة." },
    "Ganska": { swe: "Det var ganska kallt ute idag.", arb: "كان الجو بارداً نوعاً ما في الخارج اليوم." },
    "Mycket": { swe: "Tack så mycket för hjälpen!", arb: "شكراً جزيلاً للمساعدة!" },
    "Lite": { swe: "Jag vill ha lite socker i kaffet.", arb: "أريد القليل من السكر في القهوة." },
    "Helt": { swe: "Jag håller helt med dig.", arb: "أنا أتفق معك تماماً." },
    "Nästan": { swe: "Vi är nästan framme nu.", arb: "لقد وصلنا تقريباً الآن." },
    "Ungefär": { swe: "Det tar ungefär en timme att köra dit.", arb: "تستغرق القيادة إلى هناك حوالي ساعة." },
    "Lagom": { swe: "Vattnet är lagom varmt för ett bad.", arb: "الماء دافئ بشكل مناسب للاستحمام." }
};

let modifiedCount = 0;

dictionaryData.forEach(entry => {
    // Check type Adverb to be safe, though word matching is robust
    if (entry[1] && entry[1].trim() === "Adverb.") {
        const word = entry[COL_SWE].trim();
        if (updates[word]) {
            console.log(`Updating Adverb: ${word}`);
            entry[COL_EX] = updates[word].swe;
            entry[COL_EX_ARB] = updates[word].arb;
            modifiedCount++;
        }
    }
});

// Write back
const newContent = prefix + JSON.stringify(dictionaryData, null, 2) + suffix;
fs.writeFileSync('./data.js', newContent, 'utf-8');

console.log(`\n✅ Fixed ${modifiedCount} common Adverbs.`);
