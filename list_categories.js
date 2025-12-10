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
        dictionaryData = JSON.parse(dataContent.replace('const dictionaryData = ', '').replace(/;$/, ''));
    }
}

let counts = {};

dictionaryData.forEach(e => {
    let type = e[1] ? e[1].trim() : "UNKNOWN";
    counts[type] = (counts[type] || 0) + 1;
});

console.log("--- Category Distribution ---");
Object.entries(counts)
    .sort((a, b) => b[1] - a[1]) // Sort by count desc
    .forEach(([type, count]) => {
        console.log(`${type}: ${count}`);
    });
