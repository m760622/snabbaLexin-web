const fs = require('fs');
const content = fs.readFileSync('data.js', 'utf8');
const match = content.match(/const dictionaryData = (\[[\s\S]*?\]);/);
if (!match) {
    console.log('Could not parse data');
    process.exit(1);
}
const data = eval(match[1]);

// Column indices
const COL_SWE = 0, COL_TYPE = 1, COL_ARB = 2, COL_SWE_DEF = 3, COL_ARB_DEF = 4;

// Group by category prefix and count missing definitions
const categoryStats = {};

data.forEach(row => {
    const type = row[COL_TYPE] || 'Unknown';
    const category = type.split('.')[0] || type;
    const arbDef = row[COL_ARB_DEF] || '';

    if (!categoryStats[category]) {
        categoryStats[category] = { total: 0, missing: 0 };
    }
    categoryStats[category].total++;
    if (arbDef.trim() === '') {
        categoryStats[category].missing++;
    }
});

console.log('=== All Categories Status ===\n');
console.log('Category'.padEnd(20) + 'Total'.padEnd(10) + 'Missing'.padEnd(10) + 'Complete %');
console.log('-'.repeat(50));

let totalAll = 0, missingAll = 0;

Object.keys(categoryStats).sort().forEach(cat => {
    const stats = categoryStats[cat];
    const pct = ((stats.total - stats.missing) / stats.total * 100).toFixed(1);
    console.log(cat.padEnd(20) + String(stats.total).padEnd(10) + String(stats.missing).padEnd(10) + pct + '%');
    totalAll += stats.total;
    missingAll += stats.missing;
});

console.log('-'.repeat(50));
console.log('TOTAL'.padEnd(20) + String(totalAll).padEnd(10) + String(missingAll).padEnd(10) + ((totalAll - missingAll) / totalAll * 100).toFixed(1) + '%');
