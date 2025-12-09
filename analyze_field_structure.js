const fs = require('fs');
const c = fs.readFileSync('data.js', 'utf8');
const m = c.match(/const dictionaryData = (\[[\s\S]*?\]);/);
const d = eval(m[1]);

// Group by category and check field count
const categories = {};
d.forEach(row => {
    const type = row[1] || 'Unknown';
    if (!categories[type]) {
        categories[type] = { count: 0, fieldCounts: {}, example: null };
    }
    categories[type].count++;
    const fieldCount = row.length;
    categories[type].fieldCounts[fieldCount] = (categories[type].fieldCounts[fieldCount] || 0) + 1;
    if (!categories[type].example && row.length >= 11) {
        categories[type].example = row;
    }
});

console.log('=== Categories by Field Count ===\n');
Object.keys(categories).slice(0, 15).forEach(cat => {
    const info = categories[cat];
    console.log(`${cat}: ${info.count} items`);
    console.log(`  Field counts: ${JSON.stringify(info.fieldCounts)}`);
    if (info.example) {
        console.log(`  Example fields 5-7:`);
        console.log(`    5: ${String(info.example[5]).substring(0, 50)}`);
        console.log(`    6: ${String(info.example[6]).substring(0, 50)}`);
        console.log(`    7: ${String(info.example[7]).substring(0, 50)}`);
    }
    console.log('');
});
