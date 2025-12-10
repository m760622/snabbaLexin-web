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
    process.exit(1);
}

const COL_SWE = 2; // Word
const COL_EX = 6;  // Example SE
const COL_EX_ARB = 7; // Example AR

const updates = {
    // Adverbs / Idioms
    "Huller om buller": { swe: "Leksakerna låg huller om buller på golvet.", arb: "كانت الألعاب مبعثرة بفوضى (رأساً على عقب) على الأرض." },
    "Pö om pö": { swe: "Vi betalade skulden pö om pö.", arb: "سددنا الدين شيئاً فشيئاً (بالتدريج)." },
    "Till spillo": { swe: "Mycket mat gick till spillo under festen.", arb: "ذهب الكثير من الطعام هدراً خلال الحفلة." },
    "Till pass": { swe: "Det kom väl till pass att jag hade paraplyet med mig.", arb: "كان من المفيد (جاء في وقته) أنني أحضرت المظلة معي." },
    "Till viljes": { swe: "Han gjorde allt för att gå henne till viljes.", arb: "فعل كل شيء ليرضي رغباتها (ينفذ إرادتها)." },
    "Till övers": { swe: "Jag har inga pengar till övers denna månad.", arb: "ليس لدي أي مال فائض (زائد) هذا الشهر." },
    "Till synes": { swe: "Hon var till synes oberörd av kritiken.", arb: "كانت ظاهرياً غير متأثرة بالنقد." },
    "A, à jour": { swe: "Jag håller mig à jour med nyheterna.", arb: "أبقي نفسي مطلعاً (مواكباً) على الأخبار." },
    "Fifty - fifty": { swe: "Chansen är fifty-fifty att vi vinner.", arb: "فرصة الفوز هي خمسين خمسين (متساوية)." },
    "Vice versa": { swe: "Hon gillar honom och vice versa.", arb: "هي تحبه والعكس صحيح." },
    "Kort sagt": { swe: "Kort sagt, vi har inte råd.", arb: "باختصار، لا نملك المال الكافي." }, // From audit context usually
    "Ytterst sällan": { swe: "Det händer ytterst sällan att det snöar här.", arb: "نادراً جداً ما تثلج هنا." },
    "I princip": { swe: "Jag håller med dig i princip, men...", arb: "أنا أتفق معك من حيث المبدأ، ولكن..." },

    // Nouns / Phrases
    "Deja vu": { swe: "Jag fick en stark känsla av deja vu.", arb: "انتابني شعور قوي بـ (ديجا فو) شوهد من قبل." },
    "Enfant terrible": { swe: "Han kallas för modevärldens enfant terrible.", arb: "يُلقب بالطفل المشاغب (المتمرد) في عالم الموضة." },
    "Know - how": { swe: "Företaget har unik teknisk know-how.", arb: "الشركة تمتلك دراية فنية (خبرة عملية) فريدة." },
    "Mun - mot - mun - metoden": { swe: "Hon räddade honom med mun-mot-mun-metoden.", arb: "أنقذته بطريقة التنفس الاصطناعي (من الفم للفم)." },
    "Science fiction": { swe: "Han älskar att läsa science fiction.", arb: "يحب قراءة الخيال العلمي." },
    "Sit up": { swe: "Han gör 50 sit-ups varje morgon.", arb: "يقوم بـ 50 تمرين ضغط معدة كل صباح." },
    "Slow motion": { swe: "Målet visades i slow motion på TV.", arb: "عُرض الهدف بالتصوير البطيء على التلفزيون." },
    "World Wide Web": { swe: "Internets grund är World Wide Web.", arb: "أساس الإنترنت هو الشبكة العنكبوتية العالمية." },
    "Öppet köp": { swe: "Du har 30 dagars öppet köp på varan.", arb: "لديك حق إرجاع البضاعة (شراء مفتوح) لمدة 30 يوماً." },
    "Pommes frites": { swe: "Hamburgare med pommes frites.", arb: "همبرغر مع بطاطس مقلية." },
    "Alter ego": { swe: "Stålmannen är Clark Kents alter ego.", arb: "سوبرمان هو الأنا الآخر (الشخصية البديلة) لكلارك كينت." },
    "F - skatt": { swe: "Företagare måste betala F-skatt.", arb: "يجب على أصحاب الشركات دفع ضريبة الشركات (F-skatt)." },

    // Verbs / Se. (Assuming finding them by Word match works)
    "Begav sig": { swe: "Det var på den tiden det begav sig.", arb: "كان ذلك في الأيام الخوالي (حينما حدثت الأمور)." },
    "Hyr ut": { swe: "Familjen hyr ut ett rum till studenter.", arb: "تؤجر العائلة غرفة للطلاب." },
    "Kallar in": { swe: "Chefen kallar in personal för extraarbete.", arb: "يستدعي المدير الموظفين للعمل الإضافي." },
    "Skärmar av": { swe: "De skärmade av en del av rummet.", arb: "قاموا بحجب (فصل) جزء من الغرفة." },
    "Svor, svär": { swe: "Han svor på att tala sanning.", arb: "أقسم على قول الحقيقة." },
    "Tog, tar": { swe: "Hon tog boken från hyllan.", arb: "أخذت الكتاب من الرف." },
    "Velat, vill": { swe: "Jag har alltid velat resa dit.", arb: "لطالما أردت السفر إلى هناك." },
    "Årlig kontrollbesiktning": { swe: "Bilen måste genomgå årlig kontrollbesiktning.", arb: "يجب أن تخضع السيارة لفحص سنوي إلزامي." }
};

let modifiedCount = 0;

dictionaryData.forEach(entry => {
    const word = entry[COL_SWE] ? entry[COL_SWE].trim() : "";
    if (updates[word]) {
        console.log(`Fixing Expression [${word}]...`);
        entry[COL_EX] = updates[word].swe;
        entry[COL_EX_ARB] = updates[word].arb;
        modifiedCount++;
    }
});

const newContent = prefix + JSON.stringify(dictionaryData, null, 2) + suffix;
fs.writeFileSync('./data.js', newContent, 'utf-8');

console.log(`\n✅ Fixed ${modifiedCount} Expressions/Idioms.`);
