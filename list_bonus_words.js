const fs = require('fs');

const data = JSON.parse(fs.readFileSync('new_level_data.json', 'utf8'));
const levels = data.levels;

console.log(`Total Levels: ${Object.keys(levels).length}`);

// Pick one level from each chapter to show examples
for (let i = 1; i <= 10; i++) {
    const levelId = `${i}-5`; // Middle level of each chapter
    const level = levels[levelId];
    if (!level) continue;

    const targets = new Set(level.words);
    const bonus = level.validWords.filter(w => !targets.has(w));

    console.log(`\nLevel ${levelId} [${level.letters.join('')}]`);
    console.log(`Targets: ${level.words.join(', ')}`);
    console.log(`Bonus (${bonus.length}): ${bonus.join(', ')}`);
}
