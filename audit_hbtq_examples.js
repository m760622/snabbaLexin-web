const fs = require('fs');

// Read data.js
let dataContent = fs.readFileSync('./data.js', 'utf-8');

// Parse
let dictionaryData;
if (dataContent.includes('const dictionaryData =')) {
    const match = dataContent.match(/(?:const|var|let)\s+dictionaryData\s*=\s*(\[[\s\S]*?\]);/);
    if (match) {
        dictionaryData = eval(match[1]);
    } else {
        // Fallback for very large files or different formatting
        dictionaryData = JSON.parse(dataContent.replace('const dictionaryData = ', '').replace(/;$/, ''));
    }
}

const CATEGORY = "HBTQI.";
const results = dictionaryData.filter(e => e[1] && e[1].trim() === CATEGORY);

console.log(`Found ${results.length} HBTQI entries.\n`);

results.forEach(e => {
    console.log(`ID: ${e[0]}`);
    console.log(`Word: ${e[2]}`);
    console.log(`Arb: ${e[3]}`);
    console.log(`Swe Ex: ${e[6] || "MISSING"}`); // Index 6 is usually Example
    console.log(`Arb Ex: ${e[7] || "MISSING"}`); // Index 7 is usually Example Arb
    console.log('---');
});
