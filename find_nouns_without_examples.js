/**
 * Find next batch of nouns without examples (skipping already processed)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.js');

let content = fs.readFileSync(DATA_FILE, 'utf8');
const match = content.match(/const\s+dictionaryData\s*=\s*(\[[\s\S]*\]);/);
if (!match) { console.error('Could not find dictionaryData'); process.exit(1); }

let data = eval(match[1]);

const COL_ID = 0;
const COL_TYPE = 1;
const COL_SWE_WORD = 2;
const COL_ARB_WORD = 3;
const COL_SWE_DEF = 5;
const COL_SWE_EXAMPLE = 7;

// Find nouns without examples
const nounsWithoutExamples = [];

for (let i = 0; i < data.length; i++) {
    const entry = data[i];

    if (entry[COL_TYPE] === 'Substantiv.' &&
        (!entry[COL_SWE_EXAMPLE] || entry[COL_SWE_EXAMPLE].trim() === '')) {
        nounsWithoutExamples.push({
            index: i,
            id: entry[COL_ID],
            sweWord: entry[COL_SWE_WORD],
            arbWord: entry[COL_ARB_WORD],
            sweDef: entry[COL_SWE_DEF] || ''
        });
    }
}

console.log(`\n📊 Found ${nounsWithoutExamples.length} nouns without examples\n`);

// Take first 100 for next batch
const batch = nounsWithoutExamples.slice(0, 100);

const outputFile = path.join(__dirname, 'nouns_pending_batch.json');
fs.writeFileSync(outputFile, JSON.stringify(batch, null, 2), 'utf8');

console.log(`✅ Saved ${batch.length} nouns to nouns_pending_batch.json`);
console.log('\n📝 Sample nouns:');
batch.slice(0, 10).forEach((n, i) => {
    console.log(`   ${i + 1}. ${n.sweWord} - ${n.arbWord}`);
});
console.log('   ...\n');
