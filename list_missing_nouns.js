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

const CATEGORY = "Substantiv.";
console.log("Missing Noun Examples:");

dictionaryData.forEach(e => {
    if (e[1] && e[1].trim() === CATEGORY) {
        const id = e[0];
        const word = e[2];
        const exSwe = e[6] || "";
        if (!exSwe || exSwe.trim() === "") {
            console.log(`"${word}": { swe: "", arb: "" }, // ID: ${id}`);
        }
    }
});
