// Script to separate combined Swedish|Arabic definitions
// Run with: node split_definitions.js

const fs = require('fs');

// Read data.js
let content = fs.readFileSync('data.js', 'utf8');

// Extract the array
const match = content.match(/const dictionaryData = (\[[\s\S]*\]);/);
if (!match) {
    console.error('Could not parse data.js');
    process.exit(1);
}

let data = eval(match[1]);
console.log(`Total entries: ${data.length}`);

// Column indices
const COL_ARB_DEF = 4;  // Arabic definition
const COL_SWE_DEF = 5;  // Swedish definition

let fixedCount = 0;

data.forEach((entry, index) => {
    const arbDef = entry[COL_ARB_DEF] || '';

    // Check if it contains the separator " | "
    if (arbDef.includes(' | ')) {
        const parts = arbDef.split(' | ');

        if (parts.length === 2) {
            const swedishPart = parts[0].trim();
            const arabicPart = parts[1].trim();

            // Check if first part looks Swedish (Latin chars) and second looks Arabic
            const hasLatinInFirst = /[a-zA-ZåäöÅÄÖ]/.test(swedishPart);
            const hasArabicInSecond = /[\u0600-\u06FF]/.test(arabicPart);

            if (hasLatinInFirst && hasArabicInSecond) {
                // Update the entry
                entry[COL_ARB_DEF] = arabicPart;  // Arabic definition

                // Only update Swedish def if it's empty or same as word
                if (!entry[COL_SWE_DEF] || entry[COL_SWE_DEF] === entry[2]) {
                    entry[COL_SWE_DEF] = swedishPart;  // Swedish definition
                }

                fixedCount++;

                if (fixedCount <= 5) {
                    console.log(`\nFixed entry ${index}:`);
                    console.log(`  Word: ${entry[2]}`);
                    console.log(`  Was: ${arbDef}`);
                    console.log(`  Now ARB_DEF: ${entry[COL_ARB_DEF]}`);
                    console.log(`  Now SWE_DEF: ${entry[COL_SWE_DEF]}`);
                }
            }
        }
    }
});

console.log(`\n✅ Fixed ${fixedCount} entries with combined definitions`);

// Write back
const output = `const dictionaryData = ${JSON.stringify(data, null, 2)};`;
fs.writeFileSync('data.js', output, 'utf8');
console.log('✅ Saved to data.js');
