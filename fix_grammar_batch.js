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

const COL_SWE = 2;
const COL_EX = 6;
const COL_EX_ARB = 7;

const updates = {
    // --- Pronouns ---
    "Jag": { swe: "Jag heter Anna och kommer från Sverige.", arb: "اسمي آنا وأنا من السويد." },
    "Du": { swe: "Du är min bästa vän.", arb: "أنت صديقي المفضل." },
    "Han": { swe: "Han arbetar som lärare på skolan.", arb: "هو يعمل مدرساً في المدرسة." },
    "Hon": { swe: "Hon läser en intressant bok just nu.", arb: "هي تقرأ كتاباً ممتعاً في هذه اللحظة." },
    "Det": { swe: "Det regnar ute idag.", arb: "إنها تمطر في الخارج اليوم." },
    "Vi": { swe: "Vi ska åka på semester nästa vecka.", arb: "سنذهب في إجازة الأسبوع القادم." },
    "Ni": { swe: "Ni är välkomna till festen!", arb: "أنتم مدعوون إلى الحفلة!" },
    "De": { swe: "De spelar fotboll i parken.", arb: "هم يلعبون كرة القدم في الحديقة." }, // Watch case sensitivity "De" vs "Dom" vs "Dem"
    "Sig": { swe: "Han kammar sig framför spegeln.", arb: "هو يمشط شعره أمام المرآة." },
    "Man": { swe: "Man får inte röka här inne.", arb: "لا يُسمح للمرء بالتدخين هنا." },
    "Min": { swe: "Det här är min bil.", arb: "هذه سيارتي." },
    "Din": { swe: "Är det här din väska?", arb: "هل هذه حقيبتك؟" },
    "Vår": { swe: "Vår familj bor i Stockholm.", arb: "عائلتنا تسكن في ستوكهولم." },
    "Er": { swe: "Är det er tur att diska?", arb: "هل هذا دوركم في غسل الصحون؟" }, // Or "er" object form
    "Någon": { swe: "Har du sett någon här?", arb: "هل رأيت أحداً هنا؟" },
    "Ingen": { swe: "Ingen var hemma när jag ringde.", arb: "لم يكن أحد في المنزل عندما اتصلت." },
    "Alla": { swe: "Alla var glada över nyheten.", arb: "كان الجميع سعداء بالخبر." },
    "Allt": { swe: "Jag har glömt allt du sa.", arb: "لقد نسيت كل ما قلته." },

    // --- Prepositions ---
    "På": { swe: "Boken ligger på bordet.", arb: "الكتاب موجود على الطاولة." },
    "I": { swe: "Han bor i ett stort hus.", arb: "هو يسكن في منزل كبير." },
    "Med": { swe: "Jag dricker kaffe med mjölk.", arb: "أشرب القهوة مع الحليب." },
    "Av": { swe: "Bordet är gjort av trä.", arb: "الطاولة مصنوعة من الخشب." },
    "För": { swe: "Den här presenten är för dig.", arb: "هذه الهدية لك." }, // "för" also conj
    "Till": { swe: "Vi ska åka till stranden.", arb: "سنذهب إلى الشاطئ." },
    "Om": { swe: "Tala inte om det!", arb: "لا تتحدث عن ذلك!" }, // Also conj
    "Vid": { swe: "Vi möts vid stationen.", arb: "نلتقي عند المحطة." },
    "Från": { swe: "Jag kommer från Göteborg.", arb: "أنا قادم من غوتنبرغ." },
    "Över": { swe: "Bron går över floden.", arb: "الجسر يمتد فوق النهر." },
    "Under": { swe: "Katten ligger under sängen.", arb: "القطة تحت السرير." },
    "Mellan": { swe: "Sverige ligger mellan Norge och Finland.", arb: "تقع السويد بين النرويج وفنلندا." },
    "Genom": { swe: "Vi gick genom skogen.", arb: "مشينا عبر الغابة." },
    "Utan": { swe: "Jag dricker te utan socker.", arb: "أشرب الشاي بدون سكر." }, // Also conj "not X but Y"
    "Mot": { swe: "Han vände ansiktet mot solen.", arb: "أدار وجهه نحو الشمس." },
    "Hos": { swe: "Jag var hos läkaren igår.", arb: "كنت عند الطبيب البارحة." },

    // --- Conjunctions ---
    "Och": { swe: "Jag gillar kaffe och kaka.", arb: "أنا أحب القهوة والكعك." },
    "Men": { swe: "Jag är trött, men jag kan inte sova.", arb: "أنا متعب، لكنني لا أستطيع النوم." },
    "Eller": { swe: "Vill du ha te eller kaffe?", arb: "هل تريد شاياً أم قهوة؟" },
    "Att": { swe: "Han sa att han skulle komma.", arb: "قال إنه سيأتي." },
    "Om": { swe: "Jag vet inte om han kommer.", arb: "لا أعرف ما إذا كان سيأتي." },
    "När": { swe: "När jag var liten bodde vi i Malmö.", arb: "عندما كنت صغيراً عشنا في مالمو." },
    "Därför": { swe: "Det regnade, därför stannade vi inne.", arb: "كانت تمطر، ولذلك بقينا في الداخل." }, // Adverb/Conj?
    "Eftersom": { swe: "Jag kunde inte komma eftersom jag var sjuk.", arb: "لم أستطع المجيء لأنني كنت مريضاً." },
    "Medan": { swe: "Du kan vänta här medan jag handlar.", arb: "يمكنك الانتظار هنا بينما أتسوق." },
    "Innan": { swe: "Tvätta händerna innan du äter.", arb: "اغسل يديك قبل أن تأكل." },

    // --- Interjections ---
    "Hej": { swe: "Hej! Hur mår du?", arb: "مرحباً! كيف حالك؟" },
    "Aj": { swe: "Aj! Det gjorde ont.", arb: "آي! هذا مؤلم." },
    "Tack": { swe: "Tack för hjälpen!", arb: "شكراً للمساعدة!" }, // Verb/Interj? usually interj usage
    "Förlåt": { swe: "Förlåt att jag är sen.", arb: "آسف لأنني تأخرت." },
    "Grattis": { swe: "Grattis på födelsedagen!", arb: "عيد ميلاد سعيد! (مبروك)" },
    "Skål": { swe: "Skål för brudparet!", arb: "في صحة العروسين!" },
    "Välkommen": { swe: "Välkommen hem!", arb: "أهلاً بك في المنزل!" }
};

let modifiedCount = 0;

dictionaryData.forEach(entry => {
    // Check Part of Speech roughly to allow cross-category fixes (e.g. För is Prep and Conj)
    // We update all matching WORDS because the example usually fits both or is generic enough.
    // Or we stick to exact matches.
    const word = entry[COL_SWE] ? entry[COL_SWE].trim() : "";

    // Some words have punctuation like "Aj!" in dictionary?
    // The previous audit showed "Aj" : "aj". So plain.

    if (updates[word]) {
        console.log(`Updating ${word}...`);
        entry[COL_EX] = updates[word].swe;
        entry[COL_EX_ARB] = updates[word].arb;
        modifiedCount++;
    }
});

const newContent = prefix + JSON.stringify(dictionaryData, null, 2) + suffix;
fs.writeFileSync('./data.js', newContent, 'utf-8');

console.log(`\n✅ Fixed ${modifiedCount} Grammar Words.`);
