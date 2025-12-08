// Show 3 sample adverbs with idioms
const fs = require('fs');
const data = fs.readFileSync('./data.js', 'utf-8');
const match = data.match(/const dictionaryData = (\[[\s\S]*?\]);/);
const dict = eval(match[1]);

const adverbs = dict.filter(e => (e[1] || '').toLowerCase().includes('adverb') && e[9]);
const samples = [adverbs[50], adverbs[100], adverbs[200]];

samples.forEach((e, i) => {
    console.log((i + 1) + '. ' + e[2] + ' (' + e[3] + ')');
    console.log('   التعبير: ' + e[9]);
    console.log('   الترجمة: ' + e[10]);
    console.log('');
});
