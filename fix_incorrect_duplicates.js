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

// Fixes map: ID -> New Arabic Translation
const fixes = {
    "Lexin032476": "عبر", // Över (Preposition) - was "في"
    "Lexin030043": "ساعة", // Ur (Substantiv) - was "في"
    "Lexin015337": "ممتع", // Kul (Adjektiv) - was "لطيف"
    // "Lexin029112": "أنيق" // Tuff - Keeping as is (Cool/Stylish)
    // "Lexin025188": "أنيق" // Smart - Keeping as is (Chic)
};

let modifiedCount = 0;

dictionaryData.forEach(entry => {
    const id = entry[COL_ID];
    if (fixes[id]) {
        console.log(`Fixing ${id} (${entry[2]}): "${entry[COL_ARB]}" -> "${fixes[id]}"`);
        entry[COL_ARB] = fixes[id];
        modifiedCount++;
    }
});

// Write back
const newContent = prefix + JSON.stringify(dictionaryData, null, 2) + suffix;
fs.writeFileSync('./data.js', newContent, 'utf-8');

console.log(`\n✅ Fixed ${modifiedCount} translations.`);
