const fs = require('fs');
const c = fs.readFileSync('data.js', 'utf8');
const m = c.match(/const dictionaryData = (\[[\s\S]*?\]);/);
const d = eval(m[1]);

// Find a regular verb or noun with actual forms (comma-separated in index 6)
const verb = d.find(r => r[1] === 'Verb.' && r[6] && r[6].includes(',') && !r[6].includes('.'));
const noun = d.find(r => r[1] === 'Substantiv.' && r[6] && r[6].includes(','));

console.log('=== Regular Verb Example ===');
if (verb) {
    verb.forEach((f, i) => console.log(i + ': ' + String(f).substring(0, 100)));
}

console.log('\n=== Regular Noun Example ===');
if (noun) {
    noun.forEach((f, i) => console.log(i + ': ' + String(f).substring(0, 100)));
}

// Check Bygg category structure
const byggWord = d.find(r => r[1] === 'Bygg.');
console.log('\n=== Bygg Category Structure ===');
if (byggWord) {
    byggWord.forEach((f, i) => console.log(i + ': ' + String(f).substring(0, 100)));
}
