// Find and fix Detsamma entry
const fs = require('fs');
const data = fs.readFileSync('./data.js', 'utf-8');
const match = data.match(/const dictionaryData = (\[[\s\S]*?\]);/);
const dict = eval(match[1]);

// Find Detsamma entry
const entry = dict.find(e => e[2] === 'Detsamma');
if (entry) {
    console.log('ID:', entry[0]);
    console.log('Type:', entry[1]);
    console.log('Swedish:', entry[2]);
    console.log('Arabic:', entry[3]);
    console.log('Example SWE:', entry[7]);
    console.log('Example ARB:', entry[8]);
}
