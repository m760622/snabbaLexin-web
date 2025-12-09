
const fs = require('fs');

// Load dictionaryData
const dataContent = fs.readFileSync('./data.js', 'utf8');
const start = dataContent.indexOf('const dictionaryData = [');
if (start === -1) {
    console.error('Could not find dictionaryData start');
    process.exit(1);
}

// Extract the array content safely
// precise matching for the end of the array is hard with regex, so we'll just eval it in a safe-ish way 
// or better, just import it if it was a module. But it is a const declaration.
// Let's us a simple robust parsing approach that has worked before or just require it if possible.
// Since data.js is simple JS, I can try to require it if I wrap it or modify it slightly, but reading and evaling the array part is standard here.

// Actually, let's just use `eval` on the file content after stripping the assignment. 
// It's a local file, so it's relatively safe for this investigation.
const arrayContent = dataContent.substring(dataContent.indexOf('['), dataContent.lastIndexOf(']') + 1);
const dictionaryData = eval(arrayContent);

console.log(`Loaded ${dictionaryData.length} entries.`);

const explicitDefinitionKeyword = [];
const arabicDefOnly = [];

dictionaryData.forEach(entry => {
    const swedishWord = entry[2];
    const arabicDef = entry[4] || "";
    const swedishDef = entry[5] || "";

    // Check for "Definition" text in Arabic column
    const arLower = arabicDef.trim().toLowerCase();
    if (arLower === "definition" || arLower === "تعريف" || arLower === "definition / تعريف" || arabicDef.includes("Definition / تعريف")) {
        explicitDefinitionKeyword.push({
            word: swedishWord,
            arabicDef: arabicDef,
            swedishDef: swedishDef
        });
    }

    // Check for Arabic Def ONLY (Swedish def is empty, Arabic is not)
    if (arabicDef.trim() !== "" && swedishDef.trim() === "") {
        arabicDefOnly.push({
            word: swedishWord,
            arabicDef: arabicDef,
            swedishDef: swedishDef
        });
    }

    // Check for Swedish Def ONLY (Arabic def is empty, Swedish is not) (Just for context)
    // We can just log the count.
});

console.log("\n--- Words containing EXACT 'Definition' or 'تعريف' or 'Definition / تعريف' in Arabic Definition column ---");
console.log(`Count: ${explicitDefinitionKeyword.length}`);
explicitDefinitionKeyword.forEach(item => {
    console.log(`Word: ${item.word} | ArabDef: ${item.arabicDef}`);
});

// Save Arabic Only list to file with more details
const outputPath = './words_missing_swedish_def.json';
const richData = arabicDefOnly.map(item => ({
    id: dictionaryData.find(entry => entry[2] === item.word && entry[4] === item.arabicDef)[0], // lookup ID safely
    word: item.word,
    arabicDef: item.arabicDef
}));
fs.writeFileSync(outputPath, JSON.stringify(richData, null, 2), 'utf8');
console.log(`\nSaved ${richData.length} words with detailed info to ${outputPath}`);

console.log("\n--- Words with Arabic Definition ONLY (Empty Swedish Definition) ---");
console.log(`Count: ${arabicDefOnly.length}`);
// Show first 20 to avoid spamming if there are many
arabicDefOnly.slice(0, 20).forEach(item => {
    console.log(`Word: ${item.word} | ArabDef: ${item.arabicDef}`);
});
