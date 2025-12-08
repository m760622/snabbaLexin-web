// Absolute last 5 adverbs
const fs = require('fs');
const dataContent = fs.readFileSync('./data.js', 'utf-8');
const match = dataContent.match(/const dictionaryData = (\[[\s\S]*?\]);/);
const dictionaryData = eval(match[1]);

const adverbDefinitions = {
    "Lexin028506": "كثيراً، بين الحين والآخر",
    "Lexin028529": "غالباً، كثيراً",
    "Lexin028620": "بوضوح، بشكل واضح",
    "Lexin028825": "بصدق، بأمانة",
    "Lexin028908": "مؤكداً، حتماً",
};

let updateCount = 0;
dictionaryData.forEach(entry => {
    if (adverbDefinitions[entry[0]] && (!entry[4] || entry[4].trim() === '')) {
        entry[4] = adverbDefinitions[entry[0]];
        updateCount++;
    }
});

fs.writeFileSync('./data.js', dataContent.replace(
    /const dictionaryData = \[[\s\S]*?\];/,
    `const dictionaryData = ${JSON.stringify(dictionaryData, null, 4)};`
));
console.log(`✅ Updated ${updateCount} adverbs`);
