
const fs = require('fs');
const path = require('path');

// Load data.js content
const dataPath = path.join(__dirname, 'data.js');
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_data_clean.js');
// Replace const declaration with module.exports so we can require it
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

const dictionaryData = require(tempFile);

const garbagePhrase = "på ett sätt som innebär";
let cleanedCount = 0;

console.log('Total entries before clean:', dictionaryData.length);
console.log('--- Cleaning Entries ---');

dictionaryData.forEach((entry) => {
    // index 3: Headword (Arabic)
    // index 4: Definition (Arabic)

    let def = entry[4];
    if (!def) return;

    const originalDef = def;
    let modified = false;

    // 1. Split by separator
    let parts = def.split('|');

    // 2. Clean each part
    parts = parts.map(p => {
        let cleanP = p.trim();
        // Remove garbage phrase (case insensitive just in case, though usually lowercase)
        if (cleanP.includes(garbagePhrase)) {
            cleanP = cleanP.replace(/på ett sätt som innebär:?/gi, '').trim();
            modified = true;
        }
        return cleanP;
    }).filter(p => p.length > 0); // Remove empty parts

    // 3. Deduplicate
    let uniqueParts = [...new Set(parts)];
    if (uniqueParts.length < parts.length) modified = true;

    // 4. Remove Headword redundancy
    // If we have multiple parts, and one of them is EXACTLY the headword, remove it.
    // Example: "Word | Word definition" -> "Word definition"
    const headword = (entry[3] || '').trim();
    if (uniqueParts.length > 1 && headword) {
        const index = uniqueParts.indexOf(headword);
        if (index !== -1) {
            uniqueParts.splice(index, 1);
            modified = true;
        }
    }

    // 5. Reassemble
    const newDef = uniqueParts.join(' | ');

    if (newDef !== originalDef) {
        entry[4] = newDef;
        cleanedCount++;
        if (cleanedCount <= 5) {
            console.log(`Cleaned ${entry[0]}: "${originalDef}" -> "${newDef}"`);
        }
    }
});

console.log(`--- Finished ---`);
console.log(`Total entries cleaned: ${cleanedCount}`);

// Save back
const newContent = `const dictionaryData = ${JSON.stringify(dictionaryData, null, 2)};`;
fs.writeFileSync(dataPath, newContent, 'utf8');
console.log('Saved updated data.js');

// Cleanup
fs.unlinkSync(tempFile);
