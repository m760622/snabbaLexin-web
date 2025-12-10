const fs = require('fs');

// Read data.js
let dataContent = fs.readFileSync('./data.js', 'utf-8');

// Parse
let dictionaryData;
if (dataContent.includes('const dictionaryData =')) {
    const match = dataContent.match(/(?:const|var|let)\s+dictionaryData\s*=\s*(\[[\s\S]*?\]);/);
    if (match) {
        dictionaryData = eval(match[1]);
    } else {
        dictionaryData = JSON.parse(dataContent.replace('const dictionaryData = ', '').replace(/;$/, ''));
    }
}

const COL_SWE = 2; // Word
const COL_EX_SWE = 7; // Example SWE (Correct index)

let missingOrWeak = [];

dictionaryData.forEach(e => {
    const word = e[COL_SWE] ? e[COL_SWE].trim() : "";

    // Check for multi-word phrases (space present)
    if (word.includes(" ")) {
        const exSwe = e[COL_EX_SWE] || "";
        const cleanEx = exSwe.toLowerCase().trim();
        const cleanWord = word.toLowerCase().trim();

        // Condition: Example is empty OR Example is just the word itself (tautology)
        if (!exSwe || cleanEx === cleanWord || cleanEx === cleanWord + ".") {
            // Exclude if it looks like I already fixed it (long sentence)
            if (exSwe.length > word.length + 10 && exSwe.includes(" ")) {
                return;
            }

            missingOrWeak.push({
                word: word,
                type: e[1],
                current_ex: exSwe
            });
        }
    }
});

console.log(`Found ${missingOrWeak.length} Idioms/Phrases with Missing or Weak examples.`);
console.log(JSON.stringify(missingOrWeak.slice(0, 100), null, 2));
