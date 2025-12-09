/**
 * Check limits for other Medicin categories
 */

const fs = require('fs');

const dataContent = fs.readFileSync('./data.js', 'utf-8');
let dictionaryData;
try {
    const match = dataContent.match(/(?:const|var|let)\s+dictionaryData\s*=\s*(\[[\s\S]*?\]);/);
    if (match) {
        dictionaryData = eval(match[1]);
    }
} catch (e) { }

const COL_TYPE = 1;
const COL_SWE = 2;
const COL_ARB_DEF = 5;

const counts = {
    'Medicin.': 0,
    'MedicinTB.': 0,
    'MedicinR': 0
};

const missing = {
    'Medicin.': [],
    'MedicinTB.': [],
    'MedicinR': []
};

dictionaryData.forEach(entry => {
    const type = (entry[COL_TYPE] || '').trim();
    if (counts.hasOwnProperty(type)) {
        counts[type]++;
        if (!entry[COL_ARB_DEF] || entry[COL_ARB_DEF].trim() === '') {
            missing[type].push(entry[COL_SWE]);
        }
    }
});

console.log('Missing Definitions Check:');
for (const type in missing) {
    console.log(`${type}: ${missing[type].length} missing out of ${counts[type]}`);
    if (missing[type].length > 0) {
        console.log(`Examples: ${missing[type].slice(0, 3).join(', ')}`);
    }
}
