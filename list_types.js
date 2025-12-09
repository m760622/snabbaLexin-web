const fs = require('fs');

const dataContent = fs.readFileSync('./data.js', 'utf-8');
let dictionaryData;
try {
    const match = dataContent.match(/(?:const|var|let)\s+dictionaryData\s*=\s*(\[[\s\S]*?\]);/);
    if (match) {
        dictionaryData = eval(match[1]);
    } else {
        console.error('Could not parse dictionaryData');
        process.exit(1);
    }
} catch (e) {
    console.error('Error parsing:', e);
    process.exit(1);
}

const types = {};
dictionaryData.forEach(entry => {
    const type = (entry[1] || '').trim();
    if (type) {
        types[type] = (types[type] || 0) + 1;
    }
});

console.log('Unique Types and Counts:');
Object.keys(types).sort().forEach(type => {
    console.log(`${type}: ${types[type]}`);
});
