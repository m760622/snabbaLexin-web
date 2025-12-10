const fs = require('fs');

// Read data.js
let dataContent = fs.readFileSync('./data.js', 'utf-8');

// Parse
let dictionaryData;
if (dataContent.includes('const dictionaryData =')) {
    dictionaryData = JSON.parse(dataContent.replace('const dictionaryData = ', '').replace(/;$/, ''));
} else {
    const match = dataContent.match(/(?:const|var|let)\s+dictionaryData\s*=\s*(\[[\s\S]*?\]);/);
    dictionaryData = eval(match[1]);
}

console.log("Checking for words defined as 'نبات أو شجرة'...\n");

const weirdDef = "نبات أو شجرة";
const results = dictionaryData.filter(e => e[4] === weirdDef);

console.log(`Found ${results.length} entries.`);
console.log("Listing first 50:\n");

results.slice(0, 50).forEach(e => {
    console.log(`[${e[0]}] ${e[2]} (${e[1]}) -> ${e[3]}`);
});
