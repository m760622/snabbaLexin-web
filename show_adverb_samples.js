// Show 3 adverbs with idioms
const fs = require('fs');
const data = fs.readFileSync('./data.js', 'utf-8');
const match = data.match(/const dictionaryData = (\[[\s\S]*?\]);/);
const dict = eval(match[1]);

// Find adverbs with our added idioms pattern
const adverbs = dict.filter(e => {
    const type = (e[1] || '').toLowerCase();
    const idiom = e[9] || '';
    return type.includes('adverb') && idiom.startsWith('göra något ');
});

// Get 3 samples
const samples = adverbs.slice(10, 13);

console.log('=== ٣ ظروف (Adverb) تم تعديلها ===\n');

samples.forEach((e, i) => {
    console.log(`${i + 1}. ${e[2]} (${e[3]})`);
    console.log(`   التعبير السويدي: ${e[9]}`);
    console.log(`   التعبير العربي: ${e[10]}`);
    console.log('');
});
