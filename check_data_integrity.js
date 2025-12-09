
const fs = require('fs');
const path = require('path');

// Load data.js content
const dataPath = path.join(__dirname, 'data.js');
const dataContent = fs.readFileSync(dataPath, 'utf8');

// Extract the array
// logic to parse the file similar to other scripts or just regex if it's simple structure
// But data.js is a big variable assignment.
// We can try to require it if it exports, but it usually just sets a global.
// Let's use a clever regex approach or eval approach to get the array.
// Since it is `const dictionaryData = [...]`, we can strip the preample/postamble and JSON.parse (if it's strict JSON) or eval.
// Given the size, eval is risky but it's local code.
// Let's try to just use node to require it, but we need to suppress the window/document errors if it relies on them.
// Actually, looking at data.js (from previous read), it's just `const dictionaryData = [...]`.
// We can append `module.exports = dictionaryData;` to a temporary file and require that.

const tempFile = path.join(__dirname, 'temp_data_check.js');
let fileContent = fs.readFileSync(dataPath, 'utf8');
// Replace const declaration with module.exports
fileContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, fileContent);

const dictionaryData = require(tempFile);

// Check logic
const arabicPattern = /[\u0600-\u06FF]/;

console.log('Total entries:', dictionaryData.length);
console.log('--- Analyzing ---');

let badEntries = [];

dictionaryData.forEach((entry, index) => {
    const id = entry[0];
    const swedishDef = entry[5]; // Index 5 is Swedish Definition
    const forms = entry[6]; // Index 6 is Forms

    // Check if Swedish Definition contains Arabic
    if (swedishDef && arabicPattern.test(swedishDef)) {
        // Exclude cases where it might be legitimate (very rare, maybe a loan word explanation?)
        // But generally Swedish def should be Swedish.
        console.log(`[SUSPICIOUS] ID: ${id} | Swedish Def contains Arabic: "${swedishDef}"`);
        badEntries.push(entry);
    }
});

console.log('--- Summary ---');
console.log(`Found ${badEntries.length} suspicious entries.`);

// Cleanup
fs.unlinkSync(tempFile);
