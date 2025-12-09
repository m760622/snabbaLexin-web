const fs = require('fs');
const c = fs.readFileSync('data.js', 'utf8');
const m = c.match(/const dictionaryData = (\[[\s\S]*?\]);/);
const d = eval(m[1]);

// Get max columns per category
const cats = {};
d.forEach(r => {
    const type = r[1] || 'Unknown';
    if (!cats[type]) {
        cats[type] = { count: 0, maxCols: 0, minCols: 999 };
    }
    cats[type].count++;
    cats[type].maxCols = Math.max(cats[type].maxCols, r.length);
    cats[type].minCols = Math.min(cats[type].minCols, r.length);
});

// Sort by max columns descending
const sorted = Object.entries(cats).sort((a, b) => b[1].maxCols - a[1].maxCols);

console.log('=== الفئات مرتبة حسب عدد الأعمدة (تنازلي) ===\n');
console.log('الفئة                         الأعمدة        العدد');
console.log('-'.repeat(55));
sorted.forEach(([cat, info]) => {
    const colsStr = info.maxCols === info.minCols ? String(info.maxCols) : info.minCols + '-' + info.maxCols;
    console.log(`${cat.padEnd(30)}${colsStr.padEnd(15)}${info.count}`);
});
