const fs = require('fs');

// Read data.js
let dataContent = fs.readFileSync('./data.js', 'utf-8');

// Define fixes
const fixes = {
    "ADDED200001": "يقوم بارتداء الملابس", // Klär sig
    "ADDED200002": "ينظف جسمه بالماء والصابون", // Tvättar sig
    "ADDED200006": "يخرج المخاط من أنفه في منديل", // Snyter sig
    "ADDED200007": "يستحضر شيئاً من الذاكرة", // Kommer ihåg
    "ADDED200008": "يعرب عن أسفه لخطأ ارتكبه", // Ber om ursäkt
    "ADDED200017": "يشعر بالدهشة من شيء غير متوقع", // Överraskad
    "ADDED200021": "ينتظر حدوث شيء بشوق وتوتر", // Förväntansfull
    "ADDED200022": "يشعر بعدم الراحة أو الإحراج من شيء ما" // Besvärad
};

let modifiedCount = 0;

// Naive replacement approach since data.js structure can be complex,
// but we know the 'field' content from the JSON.
// Better approach: Parse, Modify, Stringify.

// Parse
let dictionaryData;
let prefix = "";
let suffix = "";

if (dataContent.includes('const dictionaryData =')) {
    prefix = "const dictionaryData = ";
    suffix = ";";
    dictionaryData = JSON.parse(dataContent.replace(prefix, '').replace(/;$/, ''));
} else {
    console.error("Could not parse data.js structure for writing.");
    process.exit(1);
}

const COL_ID = 0;
const COL_ARB_DEF = 5; // Index 5 matches the "incorrect" field seen in grep (actually 4 in grep? let's verify)
// Grep output for ADDED200001:
// 0: "ADDED200001"
// 1: "Verb."
// 2: "Klär sig"
// 3: "يرتدي ملابسه"
// 4: "att ta på sig kläder"  <-- THIS IS IT (Index 4)
// 5: "Klär sig"            <-- SWE DEF (Index 5)

// Wait, standard structure is:
// ID, TYPE, SWE, ARB, ARB_DEF, SWE_DEF, ...
// Let's re-verify matching `index` in script vs `data.js`.
// In `data.js`, the array is flat for each entry.
// [ID, TYPE, SWE, ARB, ARB_DEF, SWE_DEF, ...]
// So Index 4 is ARB_DEF.

const TARGET_COL = 4;

dictionaryData.forEach(entry => {
    const id = entry[COL_ID];
    if (fixes[id]) {
        console.log(`Fixing ${id}: "${entry[TARGET_COL]}" -> "${fixes[id]}"`);
        entry[TARGET_COL] = fixes[id];
        modifiedCount++;
    }
});

// Write back
const newContent = prefix + JSON.stringify(dictionaryData, null, 2) + suffix;
fs.writeFileSync('./data.js', newContent, 'utf-8');

console.log(`\n✅ Fixed ${modifiedCount} entries.`);
