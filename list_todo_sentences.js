const fs = require('fs');

const dataFilePath = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/wordConnectData.js';
let fileContent = fs.readFileSync(dataFilePath, 'utf8');

const dictMatch = fileContent.match(/const WC_DICTIONARY = (\[[\s\S]*\])\s*;/);
if (!dictMatch) {
    console.error("Could not find WC_DICTIONARY");
    process.exit(1);
}

let WC_DICTIONARY;
try {
    eval('WC_DICTIONARY = ' + dictMatch[1]);
} catch (e) {
    console.error("Error parsing dictionary:", e);
    process.exit(1);
}

console.log("Words with TODO_SWEDISH_SENTENCE:");
WC_DICTIONARY.forEach(entry => {
    if (entry.s === "TODO_SWEDISH_SENTENCE") {
        console.log(`"${entry.w}": { s: "", st: "${entry.st}" },`);
    }
});
