/**
 * إصلاح النص السويدي في الحقول العربية
 * Fix Swedish text in Arabic fields
 * 
 * This script fixes entries where Swedish word forms are incorrectly placed
 * in the Arabic explanation field (field 4) instead of the forms field (field 6)
 */

const fs = require('fs');

// Load data
const dataContent = fs.readFileSync('data.js', 'utf8');
const startIndex = dataContent.indexOf('[');

let dictionaryData;
try {
    dictionaryData = eval(dataContent.slice(startIndex));
} catch (e) {
    console.error('Error parsing data:', e);
    process.exit(1);
}

console.log(`\n📚 Total entries: ${dictionaryData.length}\n`);

// Categories of issues
const medicalTerms = []; // These are OK - international terms
const swedishForms = []; // These need fixing
const completeSwedish = []; // Completely Swedish explanations

// Patterns for Swedish word forms (conjugations)
const swedishFormPatterns = [
    /^[a-zA-Z]+,\s*[a-zA-Z]+,\s*[a-zA-Z]+$/,  // word, word, word
    /^[a-zA-Z]+,\s*[a-zA-Z]+$/,  // word, word
    /^[a-zA-Z\-]+,\s*[a-zA-Z\-]+$/,  // word-word, word-word
    /^[a-zA-Z]+ [a-zA-Z]+,\s*[a-zA-Z]+ [a-zA-Z]+,\s*[a-zA-Z]+ [a-zA-Z]+$/,  // verb phrase forms
];

// Check each entry
for (const entry of dictionaryData) {
    const id = entry[0];
    const arabicExplanation = entry[4];

    if (!arabicExplanation || typeof arabicExplanation !== 'string') continue;

    // Check if the explanation is purely Swedish word forms
    const isPurelySwedishForms = swedishFormPatterns.some(p => p.test(arabicExplanation.trim()));

    if (isPurelySwedishForms) {
        swedishForms.push({
            entry,
            id,
            swedish: entry[2],
            wrongField: arabicExplanation,
            currentForms: entry[6] || ''
        });
    } else if (/^[a-zA-Z]+$/.test(arabicExplanation.trim())) {
        // Completely Latin text (like "Klusterbomb")
        completeSwedish.push({
            entry,
            id,
            swedish: entry[2],
            wrongField: arabicExplanation
        });
    }
}

console.log('='.repeat(60));
console.log('📊 Analysis Results:');
console.log('='.repeat(60));
console.log(`Swedish forms in Arabic field: ${swedishForms.length}`);
console.log(`Complete Swedish text: ${completeSwedish.length}`);
console.log();

// Fix Type 1: Move Swedish forms from field 4 to field 6
console.log('='.repeat(60));
console.log('🔧 Fixing: Swedish forms moved to correct field');
console.log('='.repeat(60));

let fixedForms = 0;
for (const item of swedishForms) {
    const entry = item.entry;

    console.log(`\nID: ${item.id}`);
    console.log(`  Swedish: ${item.swedish}`);
    console.log(`  Field 4 (Arabic explanation) was: "${item.wrongField}"`);
    console.log(`  Field 6 (forms) was: "${item.currentForms}"`);

    // Move the Swedish forms to field 6
    entry[6] = item.wrongField;
    entry[4] = ""; // Clear the Arabic explanation (needs proper translation)

    console.log(`  ✓ Moved forms to field 6`);
    console.log(`  ✓ Cleared field 4 (needs Arabic translation)`);

    fixedForms++;
}

// Fix Type 2: Clear completely Swedish explanations
console.log('\n' + '='.repeat(60));
console.log('🔧 Fixing: Completely Swedish explanations');
console.log('='.repeat(60));

let fixedComplete = 0;
for (const item of completeSwedish) {
    const entry = item.entry;

    console.log(`\nID: ${item.id}`);
    console.log(`  Swedish: ${item.swedish}`);
    console.log(`  Field 4 was: "${item.wrongField}" (pure Swedish)`);

    // Clear the field - it needs proper Arabic translation
    entry[4] = "";

    console.log(`  ✓ Cleared field 4 (needs Arabic translation)`);

    fixedComplete++;
}

console.log('\n' + '='.repeat(60));
console.log('📊 Summary:');
console.log('='.repeat(60));
console.log(`Fixed Swedish forms: ${fixedForms}`);
console.log(`Fixed complete Swedish: ${fixedComplete}`);
console.log(`Total fixed: ${fixedForms + fixedComplete}`);

if (fixedForms + fixedComplete > 0) {
    // Backup original
    const backupName = `data.js.backup_swedish_fix_${Date.now()}`;
    fs.writeFileSync(backupName, dataContent, 'utf8');
    console.log(`\n📦 Backup saved to: ${backupName}`);

    // Generate new data.js content
    const newContent = `const dictionaryData = ${JSON.stringify(dictionaryData, null, 2)};`;

    // Write fixed data
    fs.writeFileSync('data.js', newContent, 'utf8');
    console.log('💾 Fixed data saved to: data.js');

    // Save list of entries that need Arabic translation
    const needsTranslation = [
        ...swedishForms.map(s => ({ id: s.id, swedish: s.swedish, forms: s.wrongField })),
        ...completeSwedish.map(s => ({ id: s.id, swedish: s.swedish, hadValue: s.wrongField }))
    ];
    fs.writeFileSync('needs_arabic_translation.json', JSON.stringify(needsTranslation, null, 2), 'utf8');
    console.log('📋 List of entries needing translation: needs_arabic_translation.json');
}

console.log('\n✨ Done!\n');
