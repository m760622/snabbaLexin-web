
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_data_clean_forms.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

const dictionaryData = require(tempFile);

const garbageStart = "Definition:";
let cleanedCount = 0;

console.log('--- Cleaning Forms ---');

dictionaryData.forEach((entry) => {
    // Check all columns for "Definition:" garbage, but specifically Forms (Index 6)
    // Actually, let's just check Index 6 as seen in the grep
    const forms = entry[6];
    if (forms && typeof forms === 'string' && forms.trim().startsWith(garbageStart)) {
        console.log(`Cleaning ID ${entry[0]}: Removed garbage forms "${forms}"`);
        entry[6] = ""; // Clear it, it's not a real form list
        cleanedCount++;
    }
});

console.log(`--- Finished ---`);
console.log(`Total forms cleaned: ${cleanedCount}`);

const newContent = `const dictionaryData = ${JSON.stringify(dictionaryData, null, 2)};`;
fs.writeFileSync(dataPath, newContent, 'utf8');

fs.unlinkSync(tempFile);
