const fs = require('fs');

// Read data.js
let dataContent = fs.readFileSync('./data.js', 'utf-8');

// Parse
let dictionaryData;
if (dataContent.includes('const dictionaryData =')) {
    const match = dataContent.match(/(?:const|var|let)\s+dictionaryData\s*=\s*(\[[\s\S]*?\]);/);
    dictionaryData = eval(match[1]);
} else {
    dictionaryData = JSON.parse(dataContent.replace('const dictionaryData = ', '').replace(/;$/, ''));
}

const items = [];
dictionaryData.forEach(e => {
    const word = e[2] ? e[2].trim() : "";
    const type = e[1] ? e[1].trim() : "";
    const exSwe = e[6] || "";

    if (type === "Adjektiv." && exSwe.toLowerCase().replace(/[.,!?-]/g, '').trim() === word.toLowerCase().trim()) {
        items.push(word);
    }
});

console.log(JSON.stringify(items, null, 2));
