
const fs = require('fs');
const path = require('path');

// Load data.js content
const dataPath = path.join(__dirname, 'data.js');
let fileContent = fs.readFileSync(dataPath, 'utf8');

// We need to parse the array safely. 
// Since the file is HUGE and just `const dictionaryData = [...]`, we can extract the JSON part.
// However, `data.js` might contain comments or non-strict JSON.
// The safest way given previous successful scripts is to use a temporary file with module.exports.

const tempFile = path.join(__dirname, 'temp_data_fix.js');
// Replace const declaration with module.exports so we can require it
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

const dictionaryData = require(tempFile);

const arabicPattern = /[\u0600-\u06FF]/;
let fixedCount = 0;

console.log('Total entries before fix:', dictionaryData.length);
console.log('--- Fixing Entries ---');

dictionaryData.forEach((entry) => {
    // entry structure: [ID, Type, Swe, Arb, ArbDef, SweDef, Forms, ...]
    // Index 4: COL_ARB_DEF
    // Index 5: COL_SWE_DEF

    let arbDef = entry[4] || "";
    let sweDef = entry[5] || "";

    // Check if Swedish Definition contains Arabic
    if (sweDef && arabicPattern.test(sweDef)) {

        // Strategy:
        // move content from sweDef to arbDef (append if arbDef exists)
        // clear sweDef

        if (arbDef) {
            // Avoid duplicating if it's the exact same string
            if (arbDef !== sweDef) {
                // If arbDef is just a short version of sweDef (or vice versa), we want the most complete one.
                // Or just append. "Definition 1 - Definition 2"
                entry[4] = `${arbDef} | ${sweDef}`;
            }
            // If they are equal, we don't need to change arbDef, just clear sweDef
        } else {
            entry[4] = sweDef;
        }

        entry[5] = ""; // Clear Swedish definition
        fixedCount++;

        if (fixedCount <= 5) {
            console.log(`Fixed ${entry[0]}: Moved "${sweDef}" to Arabic Def.`);
        }
    }
});

console.log(`--- Finished ---`);
console.log(`Total entries fixed: ${fixedCount}`);

// Now valid JSON stringify and write back to data.js
// We desire the format: const dictionaryData = [\n  [...],\n  ...\n];
const newContent = `const dictionaryData = ${JSON.stringify(dictionaryData, null, 2)};`;

fs.writeFileSync(dataPath, newContent, 'utf8');
console.log('Saved updated data.js');

// Cleanup
fs.unlinkSync(tempFile);
