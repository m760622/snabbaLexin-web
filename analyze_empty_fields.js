/**
 * Analyze Empty Fields in Dictionary Data
 * Counts empty examples and definitions by word type
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

let content = fs.readFileSync(DATA_FILE, 'utf8');
const match = content.match(/const\s+dictionaryData\s*=\s*(\[[\s\S]*\]);/);
if (!match) { console.error('Could not find dictionaryData'); process.exit(1); }

let data = eval(match[1]);

// Column indices
const COL_TYPE = 1;           // Word type (Substantiv., Verb., etc.)
const COL_ARB_DEF = 4;        // Arabic definition
const COL_SWE_DEF = 5;        // Swedish definition
const COL_SWE_EXAMPLE = 7;    // Swedish example
const COL_ARB_EXAMPLE = 8;    // Arabic example
const COL_SWE_IDIOM = 9;      // Swedish idiom
const COL_ARB_IDIOM = 10;     // Arabic idiom

// Statistics by word type
const stats = {};
let totalEntries = data.length;

// Process each entry
for (const entry of data) {
    const wordType = entry[COL_TYPE] || 'Unknown';

    if (!stats[wordType]) {
        stats[wordType] = {
            total: 0,
            emptyArbDef: 0,
            emptySweDef: 0,
            emptySweExample: 0,
            emptyArbExample: 0,
            emptySweIdiom: 0,
            emptyArbIdiom: 0
        };
    }

    stats[wordType].total++;

    if (!entry[COL_ARB_DEF] || entry[COL_ARB_DEF].trim() === '') stats[wordType].emptyArbDef++;
    if (!entry[COL_SWE_DEF] || entry[COL_SWE_DEF].trim() === '') stats[wordType].emptySweDef++;
    if (!entry[COL_SWE_EXAMPLE] || entry[COL_SWE_EXAMPLE].trim() === '') stats[wordType].emptySweExample++;
    if (!entry[COL_ARB_EXAMPLE] || entry[COL_ARB_EXAMPLE].trim() === '') stats[wordType].emptyArbExample++;
    if (!entry[COL_SWE_IDIOM] || entry[COL_SWE_IDIOM].trim() === '') stats[wordType].emptySweIdiom++;
    if (!entry[COL_ARB_IDIOM] || entry[COL_ARB_IDIOM].trim() === '') stats[wordType].emptyArbIdiom++;
}

// Calculate totals
let totals = {
    total: 0,
    emptyArbDef: 0,
    emptySweDef: 0,
    emptySweExample: 0,
    emptyArbExample: 0,
    emptySweIdiom: 0,
    emptyArbIdiom: 0
};

// Print results
console.log('\n📊 تحليل الحقول الفارغة في القاموس');
console.log('═══════════════════════════════════════════════════════════════════════════════════════\n');

// Sort by total count
const sortedTypes = Object.entries(stats).sort((a, b) => b[1].total - a[1].total);

console.log('نوع الكلمة'.padEnd(20) + ' | المجموع | تعريف ع | تعريف س | مثال س | مثال ع | تعبير س | تعبير ع');
console.log('─'.repeat(95));

for (const [type, s] of sortedTypes) {
    console.log(
        type.padEnd(20) + ' | ' +
        String(s.total).padStart(7) + ' | ' +
        String(s.emptyArbDef).padStart(7) + ' | ' +
        String(s.emptySweDef).padStart(7) + ' | ' +
        String(s.emptySweExample).padStart(6) + ' | ' +
        String(s.emptyArbExample).padStart(6) + ' | ' +
        String(s.emptySweIdiom).padStart(7) + ' | ' +
        String(s.emptyArbIdiom).padStart(7)
    );

    totals.total += s.total;
    totals.emptyArbDef += s.emptyArbDef;
    totals.emptySweDef += s.emptySweDef;
    totals.emptySweExample += s.emptySweExample;
    totals.emptyArbExample += s.emptyArbExample;
    totals.emptySweIdiom += s.emptySweIdiom;
    totals.emptyArbIdiom += s.emptyArbIdiom;
}

console.log('─'.repeat(95));
console.log(
    'الإجمالي'.padEnd(20) + ' | ' +
    String(totals.total).padStart(7) + ' | ' +
    String(totals.emptyArbDef).padStart(7) + ' | ' +
    String(totals.emptySweDef).padStart(7) + ' | ' +
    String(totals.emptySweExample).padStart(6) + ' | ' +
    String(totals.emptyArbExample).padStart(6) + ' | ' +
    String(totals.emptySweIdiom).padStart(7) + ' | ' +
    String(totals.emptyArbIdiom).padStart(7)
);

console.log('\n═══════════════════════════════════════════════════════════════════════════════════════');
console.log('\n📈 ملخص النسب المئوية:');
console.log(`   • تعريفات عربية فارغة: ${totals.emptyArbDef} (${(totals.emptyArbDef / totals.total * 100).toFixed(1)}%)`);
console.log(`   • تعريفات سويدية فارغة: ${totals.emptySweDef} (${(totals.emptySweDef / totals.total * 100).toFixed(1)}%)`);
console.log(`   • أمثلة سويدية فارغة: ${totals.emptySweExample} (${(totals.emptySweExample / totals.total * 100).toFixed(1)}%)`);
console.log(`   • أمثلة عربية فارغة: ${totals.emptyArbExample} (${(totals.emptyArbExample / totals.total * 100).toFixed(1)}%)`);
console.log(`   • تعابير سويدية فارغة: ${totals.emptySweIdiom} (${(totals.emptySweIdiom / totals.total * 100).toFixed(1)}%)`);
console.log(`   • تعابير عربية فارغة: ${totals.emptyArbIdiom} (${(totals.emptyArbIdiom / totals.total * 100).toFixed(1)}%)`);
console.log('\n');
