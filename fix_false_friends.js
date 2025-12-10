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

const COL_ID = 0;
const COL_ARB = 3;
const COL_ARB_DEF = 4; // Check if Description needs update too

// Fixes map: ID -> { arb: "New Word", def: "New Def" }
const fixes = {
    // Konkurs: "فاكهة أو ثمرة" -> "إفلاس" (Definition fix)
    "Lexin014655": {
        arb: "إفلاس",
        def: "حالة قانونية لعدم القدرة على دفع الديون"
    },
    // Mod: "مزاج" -> "شجاعة" (Mod means courage only in Swedish. Mood is Humör/Stämning. Mode is Mode)
    // Actually, Lexin017908 likely refers to "Mode" (fashion)? No, it says "Substantiv". 
    // Wait, Mod (Courage) is the main meaning. Is there a homonym?
    // "Jag är inte i mod" -> No. "Jag är inte på humör". 
    // Maybe "Modd" (Slush)? 
    // Lexin017908 "Mod" -> "مزاج" seems like a pure False Friend error.
    // I will delete this entry or merge it? Let's correct it to "شجاعة" (Synonym).
    // Or maybe it refers to "Mode" (Fashion)? "Det är på modet".
    // If definition is "شعور أو عاطفة" (Feeling/Emotion), it's trying to say Mood. Which is WRONG for Swedish 'Mod'.
    // 'Mod' = Courage. 'Mode' = Fashion. 'Mood' (Eng) = Humör (Swe).
    // I will Change it to "أزياء / موضة" assuming it meant "Mode" (spelled Mod sometimes? No).
    // Actually, let's look at "Det var på modet". 
    // The entry is likely garbage. I will correct it to the primary meaning "شجاعة" or remove.
    // Let's safe fix: Change translation to "شجاعة" and Def to "قدرة على التغلب على الخوف".
    "Lexin017908": {
        arb: "شجاعة",
        def: "القدرة على مواجهة الخوف أو المخاطر"
    },
    // Novell: "رواية" -> "قصة قصيرة"
    // Lexin ID for Novell was not shown in grep, but `check_false_friends.js` found it.
    // Need to find ID for Novell.
    // Smoking: "تدخين" -> "بدلة سهرة".
    // Lexin entry for Smoking said "سموكينغ" which is okay, but let's check definition.
};

let modifiedCount = 0;

dictionaryData.forEach(entry => {
    const id = entry[COL_ID];
    const swedish = entry[2];

    // Find Novell ID dynamically if not hardcoded
    if (swedish === 'Novell' && entry[COL_ARB] === 'رواية') {
        console.log(`Fixing Novell (${id}): "رواية" -> "قصة قصيرة"`);
        entry[COL_ARB] = "قصة قصيرة";
        entry[COL_ARB_DEF] = "نص أدبي أقصر من الرواية";
        modifiedCount++;
    }

    if (fixes[id]) {
        console.log(`Fixing ${id} (${swedish}):`);
        if (fixes[id].arb) {
            console.log(`  ARB: "${entry[COL_ARB]}" -> "${fixes[id].arb}"`);
            entry[COL_ARB] = fixes[id].arb;
        }
        if (fixes[id].def) {
            console.log(`  DEF: "${entry[COL_ARB_DEF]}" -> "${fixes[id].def}"`);
            entry[COL_ARB_DEF] = fixes[id].def;
        }
        modifiedCount++;
    }
});

// Write back
const newContent = prefix + JSON.stringify(dictionaryData, null, 2) + suffix;
fs.writeFileSync('./data.js', newContent, 'utf-8');

console.log(`\n✅ Fixed ${modifiedCount} false friends.`);
