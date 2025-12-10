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

const SAMPLE_SIZE = 20;
const total = dictionaryData.length;

console.log(`\n🎲 Random Audit of ${SAMPLE_SIZE} entries (Total: ${total})\n`);

for (let i = 0; i < SAMPLE_SIZE; i++) {
    const randomIndex = Math.floor(Math.random() * total);
    const item = dictionaryData[randomIndex];

    console.log(`[${i + 1}] ID: ${item[0]} (${item[1]})`);
    console.log(`   🇸🇪 ${item[2]}`);
    console.log(`   🇦🇪 ${item[3]}`);
    console.log(`   📝 Def: ${item[4]}`);
    console.log('--------------------------------------------------');
}
