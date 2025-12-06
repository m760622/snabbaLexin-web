const fs = require('fs');
const dataContent = fs.readFileSync('./data.js', 'utf-8');
const match = dataContent.match(/(?:const|var|let)\s+dictionaryData\s*=\s*(\[[\s\S]*?\]);/);
const dictionaryData = eval(match[1]);

// Random sample of 30 entries
const sample = [];
const usedIndices = new Set();

while (sample.length < 30) {
    const idx = Math.floor(Math.random() * dictionaryData.length);
    if (!usedIndices.has(idx)) {
        usedIndices.add(idx);
        const entry = dictionaryData[idx];
        if (entry[2] && entry[3]) {
            sample.push({
                id: entry[0],
                type: entry[1],
                swe: entry[2],
                arb: entry[3],
                arbDef: entry[4] || '',
                sweDef: entry[5] || ''
            });
        }
    }
}

console.log(JSON.stringify(sample, null, 2));
