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

const weirdDef = "نبات أو شجرة";
const results = dictionaryData.filter(e => e[4] === weirdDef);

console.log(`Found ${results.length} entries. Saving to plant_errors.json...`);

const output = results.map(e => ({
    id: e[0],
    type: e[1],
    swe: e[2],
    arb: e[3]
}));

fs.writeFileSync('plant_errors.json', JSON.stringify(output, null, 2));
console.log("Done.");
