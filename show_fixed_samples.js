// Show 3 sample fixed entries
const fs = require('fs');
const data = fs.readFileSync('./data.js', 'utf-8');
const match = data.match(/const dictionaryData = (\[[\s\S]*?\]);/);
const dict = eval(match[1]);

// Find entries with the generic pattern we used for fixes
const fixedEntries = dict.filter(e => {
    const ex = e[7] || '';
    return ex.startsWith('Det är ') || ex.startsWith('Jag brukar ') || ex.startsWith('Han gör det ');
});

// Get 3 random samples
const samples = [];
for (let i = 0; i < 3 && i < fixedEntries.length; i++) {
    const idx = Math.floor(Math.random() * fixedEntries.length);
    samples.push(fixedEntries[idx]);
}

console.log('=== ٣ أمثلة من الإصلاحات ===\n');

samples.forEach((e, i) => {
    console.log(`${i + 1}. ${e[2]} (${e[1]})`);
    console.log(`   🇸🇪 ${e[7]}`);
    console.log(`   🇸🇦 ${e[8]}`);
    console.log('');
});
