/**
 * Script to populate noun gender (en/ett) in column 13 for all Substantiv entries
 * Uses the same detection logic from details.js
 */

const fs = require('fs');

// Read data.js
const content = fs.readFileSync('data.js', 'utf8');
const match = content.match(/const dictionaryData = (\[[\s\S]*?\]);/);
const data = eval(match[1]);

// Gender detection function (same as in details.js)
function detectNounGender(forms) {
    if (!forms || forms.trim() === '') return null;

    const formsArray = forms.split(',').map(f => f.trim()).filter(f => f);
    if (formsArray.length < 2) return null;

    const baseWord = formsArray[0].toLowerCase();

    // Scan all forms to find the definite singular
    for (const form of formsArray) {
        const lower = form.toLowerCase();

        if (lower === baseWord) continue;

        // Check for Ett-word patterns
        if (lower.endsWith('et') && !lower.endsWith('het')) {
            if (lower === baseWord + 'et' || lower === baseWord + 't') {
                return 'ett';
            }
            if (lower.length > baseWord.length && lower.endsWith('et')) {
                return 'ett';
            }
        }

        if (lower.endsWith('t') && lower.length === baseWord.length + 1) {
            return 'ett';
        }
    }

    // Scan for en-patterns
    for (const form of formsArray) {
        const lower = form.toLowerCase();
        if (lower === baseWord) continue;

        if (lower.endsWith('en') || lower.endsWith('an') || lower.endsWith('n')) {
            if (lower.length >= baseWord.length) {
                return 'en';
            }
        }
    }

    return 'en'; // Default
}

// Count stats
let updated = 0;
let alreadySet = 0;
let noForms = 0;

// Process each entry
data.forEach((entry, index) => {
    const type = (entry[1] || '').toLowerCase();

    // Only process nouns (Substantiv)
    if (type.includes('substantiv')) {
        const forms = entry[6] || '';
        const existingGender = entry[13];

        // Ensure array has enough elements
        while (entry.length < 14) {
            entry.push('');
        }

        if (existingGender && existingGender.trim()) {
            alreadySet++;
        } else if (forms && forms.includes(',')) {
            const gender = detectNounGender(forms);
            if (gender) {
                entry[13] = gender;
                updated++;
            }
        } else {
            noForms++;
        }
    }
});

console.log('=== Gender Population Results ===');
console.log(`Updated: ${updated}`);
console.log(`Already set: ${alreadySet}`);
console.log(`No forms available: ${noForms}`);

// Write back to data.js
const newContent = content.replace(
    /const dictionaryData = \[[\s\S]*?\];/,
    'const dictionaryData = ' + JSON.stringify(data, null, 2) + ';'
);

fs.writeFileSync('data.js', newContent);
console.log('\n✅ data.js updated successfully!');
