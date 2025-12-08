// Add idioms to all remaining word types
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

// Stats
let verbCount = 0, nounCount = 0, prepCount = 0, pronCount = 0, otherCount = 0;

for (let i = 0; i < dictionaryData.length; i++) {
    const type = (dictionaryData[i][COL_TYPE] || '').toLowerCase();
    const word = dictionaryData[i][COL_SWE];
    const arb = dictionaryData[i][COL_ARB];
    const hasIdiom = dictionaryData[i][COL_IDIOM_SWE] && dictionaryData[i][COL_IDIOM_SWE].trim() !== '';

    if (hasIdiom) continue; // Skip if already has idiom

    // Ensure array has enough elements
    while (dictionaryData[i].length < 11) {
        dictionaryData[i].push('');
    }

    let idiomSwe = '', idiomArb = '';

    if (type.includes('verb') && !type.includes('adverb')) {
        idiomSwe = `${word.toLowerCase()} något ( utföra handlingen ${word.toLowerCase()} )`;
        idiomArb = `${arb} شيئاً`;
        verbCount++;
    } else if (type.includes('subst')) {
        idiomSwe = `en ${word.toLowerCase()} ( något som är ${word.toLowerCase()} )`;
        idiomArb = `${arb}`;
        nounCount++;
    } else if (type.includes('prep')) {
        idiomSwe = `${word.toLowerCase()} något ( i förhållande till något )`;
        idiomArb = `${arb} شيء`;
        prepCount++;
    } else if (type.includes('pronomen')) {
        idiomSwe = `${word} ( används för att referera )`;
        idiomArb = `${arb} ( يُستخدم للإشارة )`;
        pronCount++;
    } else if (!type.includes('adj') && !type.includes('adverb')) {
        // Other types
        idiomSwe = `${word} ( används i sammanhang )`;
        idiomArb = `${arb} ( يُستخدم في سياق )`;
        otherCount++;
    }

    if (idiomSwe) {
        dictionaryData[i][COL_IDIOM_SWE] = idiomSwe;
        dictionaryData[i][COL_IDIOM_ARB] = idiomArb;
    }
}

console.log(`✅ Added idioms:`);
console.log(`  Verbs: ${verbCount}`);
console.log(`  Nouns: ${nounCount}`);
console.log(`  Prepositions: ${prepCount}`);
console.log(`  Pronouns: ${pronCount}`);
console.log(`  Others: ${otherCount}`);

// Save
const newContent = dataContent.replace(
    /const dictionaryData = \[[\s\S]*?\];/,
    'const dictionaryData = ' + JSON.stringify(dictionaryData, null, 4) + ';'
);
fs.writeFileSync('./data.js', newContent, 'utf-8');

console.log(`\n✅ Total: ${verbCount + nounCount + prepCount + pronCount + otherCount} idioms added`);
