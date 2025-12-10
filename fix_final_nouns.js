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

// Fixes for the final 12 missing nouns
const updates = {
    "Allmän rättshjälp": { swe: "Du kan ha rätt till allmän rättshjälp om du har låg inkomst.", arb: "قد يحق لك الحصول على المساعدة القانونية العامة إذا كان دخلك منخفضاً." },
    "Arbete": { swe: "Vi söker personal för arbete på kvällar och helger.", arb: "نبحث عن موظفين للعمل في الأمسيات وعطلات نهاية الأسبوع." },
    "Offentligt biträde": { swe: "Domstolen utsåg ett offentligt biträde åt den misstänkte.", arb: "عينت المحكمة محامياً عاماً للمشتبه به." },
    "Rabies ( Vattuskräck )": { swe: "Rabies är en farlig och dödlig virussjukdom.", arb: "داء الكلب مرض فيروسي خطير ومميت." },
    "Rakblad": { swe: "Han skar sig på ett vasst rakblad.", arb: "جرح نفسه بشفرة حلاقة حادة." },
    "Röda hund": { swe: "Alla barn erbjuds vaccin mot röda hund.", arb: "يتم تقديم التطعيم ضد الحصبة الألمانية لجميع الأطفال." },
    "Sandalett": { swe: "Hon köpte ett par fina sandaletter till sommaren.", arb: "اشترت زوجاً جميلاً من الصنادل الصيفية للصيف." },
    "Skärpa": { swe: "Bilden saknar skärpa och är lite suddig.", arb: "تفتقر الصورة إلى الدقة وتبدو ضبابية قليلاً." },
    "Stridskrafter": { swe: "Landets stridskrafter sattes i högsta beredskap.", arb: "وضعت القوات المسلحة للبلاد في حالة تأهب قصوى." },
    "Välstånd": { swe: "Landet har upplevt en period av ökat välstånd.", arb: "شهدت البلاد فترة من ازدياد الرخاء." },
    "Öppen förskola": { swe: "På öppen förskola kan föräldrar och barn träffas och leka.", arb: "في الروضة المفتوحة، يمكن للآباء والأطفال اللقاء واللعب." },
    "Antiseptika": { swe: "Antiseptika används för att rengöra sår och förhindra infektion.", arb: "تستخدم المطهرات لتنظيف الجروح ومنع العدوى." }
};

let modifiedCount = 0;

dictionaryData.forEach(entry => {
    const word = entry[COL_SWE] ? entry[COL_SWE].trim() : "";
    if (updates[word]) {
        console.log(`Updating Noun: ${word}`);
        entry[COL_EX] = updates[word].swe;
        entry[COL_EX_ARB] = updates[word].arb;
        modifiedCount++;
    }
});

// Write back
const newContent = prefix + JSON.stringify(dictionaryData, null, 2) + suffix;
fs.writeFileSync('./data.js', newContent, 'utf-8');

console.log(`\n✅ Fixed ${modifiedCount} remaining missing nouns.`);
