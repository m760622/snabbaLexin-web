const fs = require('fs');
const dataContent = fs.readFileSync('./data.js', 'utf-8');
const match = dataContent.match(/const dictionaryData = (\[[\s\S]*?\]);/);
const dictionaryData = eval(match[1]);

const adverbDefinitions = {
    "Lexin029286": "بشكل عرضي، بالعرض، مستقيماً",
    "Lexin029292": "بشكل مفاجئ، فجأة",
    "Lexin012999": "مكسور، محطم (صفة من فعل)",
};

let count = 0;
dictionaryData.forEach(e => {
    if (adverbDefinitions[e[0]] && (!e[4] || e[4].trim() === '')) {
        e[4] = adverbDefinitions[e[0]];
        count++;
    }
});

fs.writeFileSync('./data.js', dataContent.replace(/const dictionaryData = \[[\s\S]*?\];/, `const dictionaryData = ${JSON.stringify(dictionaryData, null, 4)};`));
console.log(`✅ Updated ${count} adverbs - ALL DONE!`);
