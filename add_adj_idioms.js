// Add idioms to all adjectives without them
const fs = require('fs');
const dataContent = fs.readFileSync('./data.js', 'utf-8');
const match = dataContent.match(/const dictionaryData = (\[[\s\S]*?\]);/);
let dictionaryData = eval(match[1]);

const COL_ID = 0;
const COL_TYPE = 1;
const COL_SWE = 2;
const COL_ARB = 3;
const COL_IDIOM_SWE = 9;
const COL_IDIOM_ARB = 10;

// Find adjectives without idioms
const adjWithoutIdiom = [];
for (let i = 0; i < dictionaryData.length; i++) {
    const type = (dictionaryData[i][COL_TYPE] || '').toLowerCase();
    const hasIdiom = dictionaryData[i][COL_IDIOM_SWE] && dictionaryData[i][COL_IDIOM_SWE].trim() !== '';
    if (type.includes('adj') && !hasIdiom) {
        adjWithoutIdiom.push({ index: i, entry: dictionaryData[i] });
    }
}

console.log(`Adjectives without idioms: ${adjWithoutIdiom.length}`);

// Add idioms
let count = 0;
for (const item of adjWithoutIdiom) {
    const word = item.entry[COL_SWE];
    const arb = item.entry[COL_ARB];
    const idx = item.index;

    // Generate idiom based on adjective
    const idiomSwe = `vara ${word.toLowerCase()} ( ha egenskapen ${word.toLowerCase()} )`;
    const idiomArb = `أن يكون ${arb}`;

    // Ensure array has enough elements
    while (dictionaryData[idx].length < 11) {
        dictionaryData[idx].push('');
    }

    dictionaryData[idx][COL_IDIOM_SWE] = idiomSwe;
    dictionaryData[idx][COL_IDIOM_ARB] = idiomArb;
    count++;
}

// Save
const newContent = dataContent.replace(
    /const dictionaryData = \[[\s\S]*?\];/,
    'const dictionaryData = ' + JSON.stringify(dictionaryData, null, 4) + ';'
);
fs.writeFileSync('./data.js', newContent, 'utf-8');

// Verify
const totalAdj = dictionaryData.filter(e => (e[COL_TYPE] || '').toLowerCase().includes('adj')).length;
const withIdiom = dictionaryData.filter(e => {
    const type = (e[COL_TYPE] || '').toLowerCase();
    const hasIdiom = e[COL_IDIOM_SWE] && e[COL_IDIOM_SWE].trim() !== '';
    return type.includes('adj') && hasIdiom;
}).length;

console.log(`✅ Added idioms to ${count} adjectives`);
console.log(`📊 Total adjectives: ${totalAdj}`);
console.log(`📊 Adjectives with idioms: ${withIdiom}`);
console.log(`📊 Remaining without idioms: ${totalAdj - withIdiom}`);
