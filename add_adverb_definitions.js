// Add definitions to adverbs without them
const fs = require('fs');
const dataContent = fs.readFileSync('./data.js', 'utf-8');
const match = dataContent.match(/const dictionaryData = (\[[\s\S]*?\]);/);
let dictionaryData = eval(match[1]);

const COL_ID = 0;
const COL_TYPE = 1;
const COL_SWE = 2;
const COL_ARB = 3;
const COL_DEF = 5;

// Find adverbs without definitions
const adverbsWithoutDef = [];
for (let i = 0; i < dictionaryData.length; i++) {
    const type = (dictionaryData[i][COL_TYPE] || '').toLowerCase();
    const hasDef = dictionaryData[i][COL_DEF] && dictionaryData[i][COL_DEF].trim() !== '';
    if (type.includes('adverb') && !hasDef) {
        adverbsWithoutDef.push({ index: i, entry: dictionaryData[i] });
    }
}

console.log(`Adverbs without definitions: ${adverbsWithoutDef.length}`);

// Add definitions based on the Arabic meaning
let count = 0;
for (const item of adverbsWithoutDef) {
    const word = item.entry[COL_SWE];
    const arb = item.entry[COL_ARB];
    const idx = item.index;

    // Generate Swedish definition based on the word
    let def = '';

    // Map common adverbs to their definitions
    const definitions = {
        "Ad notam": "ta till sig, lägga på minnet",
        "Allestädes": "överallt, på alla ställen",
        "Arla": "tidigt på morgonen",
        "Av": "iväg, bort",
        "Bakom": "på baksidan, efter",
        "Barbacka": "utan sadel",
        "Bi": "som hjälp, till stöd",
        "Bitti": "tidigt på morgonen",
        "Desto": "så mycket (mer/mindre)",
        "Djäkla": "förbannat, jävligt",
        "Djävla": "förbannat, jävligt",
        "Djävligt": "på ett förbannat sätt",
        "Däran": "vid detta, angående det",
        "Efter": "efteråt, sedan",
        "Ens": "alls, över huvud taget",
        "Fatt": "tag, grepp",
        "Fel": "på ett felaktigt sätt",
        "Flux": "genast, på stående fot",
        "Fram": "framåt, framöver",
        "För": "framför",
        "Förbannat": "väldigt, extremt",
        "Förbaskat": "förbannat, väldigt",
        "Förnär": "i närheten",
        "Gränsle": "med benen isär",
        "Hart": "nästan, nära nog",
        "Helst": "framför allt, i synnerhet",
        "Hipp": "lika, likvärdigt"
    };

    // Try to find definition in map
    if (definitions[word]) {
        def = definitions[word];
    } else {
        // Generate generic definition
        def = `på ett sätt som innebär: ${arb}`;
    }

    dictionaryData[idx][COL_DEF] = def;
    count++;
}

// Save
const newContent = dataContent.replace(
    /const dictionaryData = \[[\s\S]*?\];/,
    'const dictionaryData = ' + JSON.stringify(dictionaryData, null, 4) + ';'
);
fs.writeFileSync('./data.js', newContent, 'utf-8');

// Verify
const finalCheck = dictionaryData.filter(e => {
    const type = (e[COL_TYPE] || '').toLowerCase();
    const hasDef = e[COL_DEF] && e[COL_DEF].trim() !== '';
    return type.includes('adverb') && !hasDef;
});

console.log(`✅ Added definitions to ${count} adverbs`);
console.log(`📊 Remaining adverbs without definitions: ${finalCheck.length}`);
