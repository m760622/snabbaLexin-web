// Absolute final script for the last 9 adverbs
const fs = require('fs');

const dataContent = fs.readFileSync('./data.js', 'utf-8');
const match = dataContent.match(/const dictionaryData = (\[[\s\S]*?\]);/);
const dictionaryData = eval(match[1]);

const adverbDefinitions = {
    "Lexin028361": "بشكل تقريبي، عن قرب",
    "Lexin028370": "بانسجام، بشكل مناسب",
    "Lexin028375": "بصحبة، معاً",
    "Lexin028438": "كيفية التصرف، طريقة العمل",
    "Lexin028466": "في البداية، أولاً",
    "Lexin028535": "في كثير من الأحيان",
    "Lexin028619": "بشكل واضح، جلياً",
    "Lexin028826": "بإخلاص وأمانة",
    "Lexin028909": "بالتأكيد، يقيناً",
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
