const fs = require('fs');
const content = fs.readFileSync('data.js', 'utf8');
const match = content.match(/const dictionaryData = (\[[\s\S]*?\]);/);
if (!match) {
    console.log('Could not parse data');
    process.exit(1);
}
const data = eval(match[1]);

// Column indices
const COL_ARB_DEF = 4;
const COL_SWE_DEF = 6;

// Analyze patterns in Arabic definitions
const patterns = {};
const prefixes = [];

data.forEach(row => {
    const arbDef = row[COL_ARB_DEF] || '';
    const sweDef = row[COL_SWE_DEF] || '';

    if (arbDef.trim() !== '' && sweDef.trim() === '') {
        // Extract prefix (before colon)
        const colonIndex = arbDef.indexOf(':');
        if (colonIndex > 0 && colonIndex < 50) {
            const prefix = arbDef.substring(0, colonIndex).trim();
            if (!patterns[prefix]) {
                patterns[prefix] = { count: 0, examples: [] };
            }
            patterns[prefix].count++;
            if (patterns[prefix].examples.length < 3) {
                patterns[prefix].examples.push(arbDef);
            }
        }
    }
});

console.log('=== Arabic Definition Patterns Analysis ===\n');
Object.keys(patterns)
    .sort((a, b) => patterns[b].count - patterns[a].count)
    .slice(0, 25)
    .forEach(prefix => {
        console.log(`\n"${prefix}" (${patterns[prefix].count} occurrences)`);
        patterns[prefix].examples.forEach(ex => {
            console.log(`  - ${ex.substring(0, 80)}...`);
        });
    });
