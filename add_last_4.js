const fs = require('fs');
const dataContent = fs.readFileSync('./data.js', 'utf-8');
const match = dataContent.match(/const dictionaryData = (\[[\s\S]*?\]);/);
const dictionaryData = eval(match[1]);

const adverbDefinitions = {
    "Lexin028558": "حميماً جداً، قريب جداً",
    "Lexin028588": "بشكل إجمالي، ككل",
    "Lexin028692": "على العكس، بعكس",
    "Lexin028785": "بوضوح، ظاهرياً",
};

let count = 0;
dictionaryData.forEach(e => {
    if (adverbDefinitions[e[0]] && (!e[4] || e[4].trim() === '')) {
        e[4] = adverbDefinitions[e[0]];
        count++;
    }
});

fs.writeFileSync('./data.js', dataContent.replace(/const dictionaryData = \[[\s\S]*?\];/, `const dictionaryData = ${JSON.stringify(dictionaryData, null, 4)};`));
console.log(`✅ Updated ${count}`);
