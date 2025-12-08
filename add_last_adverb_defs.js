// Final script for the last 11 adverbs
const fs = require('fs');

const dataContent = fs.readFileSync('./data.js', 'utf-8');
const match = dataContent.match(/const dictionaryData = (\[[\s\S]*?\]);/);
const dictionaryData = eval(match[1]);

const adverbDefinitions = {
    "Lexin028317": "كدين، لصالح (مالياً)",
    "Lexin028351": "للتعريف، للإعلان",
    "Lexin028376": "كفاية، بما يكفي",
    "Lexin028387": "من قبل، سابقاً",
    "Lexin028434": "بما يكفي، كفاية",
    "Lexin028469": "معاً، سوياً",
    "Lexin028581": "بالمجموع، إجمالاً",
    "Lexin028595": "إلى أي كان، عشوائياً",
    "Lexin028696": "على عكس، ضد",
    "Lexin028787": "على ما يبدو، بوضوح",
    "Lexin028829": "بإخلاص، بأمانة",
    "Lexin028912": "بالتأكيد، حتماً",
};

let updateCount = 0;
dictionaryData.forEach(entry => {
    const id = entry[0];
    if (adverbDefinitions[id] && (!entry[4] || entry[4].trim() === '')) {
        entry[4] = adverbDefinitions[id];
        updateCount++;
    }
});

const newContent = dataContent.replace(
    /const dictionaryData = \[[\s\S]*?\];/,
    `const dictionaryData = ${JSON.stringify(dictionaryData, null, 4)};`
);

fs.writeFileSync('./data.js', newContent);
console.log(`✅ Updated ${updateCount} adverbs`);
