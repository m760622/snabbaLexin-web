// البحث عن أنماط مشبوهة في الترجمات
// Suspicious patterns finder for translations

const fs = require('fs');

// Load data
const dataContent = fs.readFileSync('data.js', 'utf8');
const dataMatch = dataContent.match(/const dictionaryData = (\[[\s\S]*?\]);/);
if (!dataMatch) {
    console.error('Could not parse data.js');
    process.exit(1);
}

let dictionaryData;
try {
    dictionaryData = eval(dataMatch[1]);
} catch (e) {
    console.error('Error parsing data:', e);
    process.exit(1);
}

console.log(`Total entries: ${dictionaryData.length}\n`);

// Common Swedish words to detect (might be left in Arabic translations by mistake)
const swedishWords = [
    'och', 'att', 'det', 'som', 'är', 'på', 'en', 'av', 'för', 'med',
    'har', 'till', 'den', 'om', 'inte', 'men', 'hade', 'kan', 'ett', 'var',
    'hon', 'han', 'jag', 'de', 'vi', 'man', 'sig', 'skulle', 'eller', 'efter',
    'nu', 'ska', 'så', 'när', 'vara', 'vid', 'från', 'sin', 'kommer', 'blev',
    'alla', 'mycket', 'bara', 'också', 'andra', 'hur', 'få', 'varit', 'mer', 'utan',
    // Common words that shouldn't appear in Arabic translation
    'göra', 'säga', 'kunna', 'vilja', 'komma', 'gå', 'ta', 'ge', 'se', 'göra',
    'någon', 'något', 'ingen', 'inget', 'mellan', 'efter', 'under', 'genom'
];

// Swedish letter patterns that shouldn't appear in Arabic
const swedishPatterns = [
    /\bär\b/,      // är
    /\boch\b/,     // och
    /\batt\b/,     // att
    /\bdet\b/,     // det
    /\bsom\b/,     // som
    /\bpå\b/,      // på
    /\bmed\b/,     // med
    /\bför\b/,     // för
    /[åäöÅÄÖ]/,    // Swedish special characters
];

// Results containers
const shortTranslations = [];
const duplicateTranslations = new Map(); // translation -> list of entries
const swedishInArabic = [];

for (const entry of dictionaryData) {
    const id = entry[0];
    const type = entry[1];
    const swedishWord = entry[2];
    const arabicTranslation = entry[3];
    const arabicExplanation = entry[4];

    // Skip if no Arabic translation
    if (!arabicTranslation || arabicTranslation.trim() === '') continue;

    // 1. Check for very short translations (single word, less than 3 chars)
    const trimmedTranslation = arabicTranslation.trim();
    // Count Arabic words (split by spaces, commas)
    const arabicWords = trimmedTranslation.split(/[\s,،]+/).filter(w => w.length > 0);

    // Check if it's just one very short Arabic word (less than 3 characters)
    if (arabicWords.length === 1 && trimmedTranslation.length <= 2) {
        shortTranslations.push({
            id,
            type,
            swedish: swedishWord,
            arabic: arabicTranslation,
            explanation: arabicExplanation
        });
    }

    // 2. Track duplicate translations
    const normalizedTranslation = trimmedTranslation.toLowerCase();
    if (!duplicateTranslations.has(normalizedTranslation)) {
        duplicateTranslations.set(normalizedTranslation, []);
    }
    duplicateTranslations.get(normalizedTranslation).push({
        id,
        type,
        swedish: swedishWord,
        arabic: arabicTranslation
    });

    // 3. Check for Swedish text in Arabic fields
    const arabicFields = [arabicTranslation, arabicExplanation, entry[8], entry[10]].filter(Boolean);

    for (const field of arabicFields) {
        // Check for Swedish patterns
        for (const pattern of swedishPatterns) {
            if (pattern.test(field)) {
                swedishInArabic.push({
                    id,
                    type,
                    swedish: swedishWord,
                    field: field,
                    pattern: pattern.toString()
                });
                break; // Only report once per entry
            }
        }
    }
}

// Output results
console.log('='.repeat(80));
console.log('1. ترجمات قصيرة جداً (Very Short Translations - 2 characters or less)');
console.log('='.repeat(80));
console.log(`Found: ${shortTranslations.length} entries\n`);

for (const item of shortTranslations.slice(0, 30)) {
    console.log(`ID: ${item.id}`);
    console.log(`  Type: ${item.type}`);
    console.log(`  Swedish: ${item.swedish}`);
    console.log(`  Arabic: "${item.arabic}"`);
    console.log(`  Explanation: ${item.explanation}`);
    console.log();
}

if (shortTranslations.length > 30) {
    console.log(`... and ${shortTranslations.length - 30} more\n`);
}

console.log('\n' + '='.repeat(80));
console.log('2. ترجمات متطابقة لكلمات مختلفة (Duplicate Translations)');
console.log('='.repeat(80));

const duplicates = [...duplicateTranslations.entries()]
    .filter(([_, entries]) => entries.length > 1)
    .sort((a, b) => b[1].length - a[1].length);

console.log(`Found: ${duplicates.length} duplicate translation groups\n`);

// Show top duplicates with different Swedish words
let shownDuplicates = 0;
for (const [translation, entries] of duplicates) {
    // Get unique Swedish words
    const swedishWords = [...new Set(entries.map(e => e.swedish))];

    // Only show if there are different Swedish words with same translation
    if (swedishWords.length > 1) {
        console.log(`Arabic: "${translation}"`);
        console.log(`  Used for ${entries.length} entries:`);
        for (const e of entries.slice(0, 5)) {
            console.log(`    - ${e.swedish} (${e.type}) [${e.id}]`);
        }
        if (entries.length > 5) {
            console.log(`    ... and ${entries.length - 5} more`);
        }
        console.log();
        shownDuplicates++;
        if (shownDuplicates >= 30) break;
    }
}

console.log('\n' + '='.repeat(80));
console.log('3. نص سويدي في الحقول العربية (Swedish Text in Arabic Fields)');
console.log('='.repeat(80));
console.log(`Found: ${swedishInArabic.length} entries with Swedish text in Arabic fields\n`);

for (const item of swedishInArabic.slice(0, 30)) {
    console.log(`ID: ${item.id}`);
    console.log(`  Swedish Word: ${item.swedish}`);
    console.log(`  Field with Swedish: "${item.field}"`);
    console.log(`  Pattern matched: ${item.pattern}`);
    console.log();
}

if (swedishInArabic.length > 30) {
    console.log(`... and ${swedishInArabic.length - 30} more\n`);
}

// Summary
console.log('\n' + '='.repeat(80));
console.log('ملخص التحليل (Analysis Summary)');
console.log('='.repeat(80));
console.log(`1. Very short translations: ${shortTranslations.length}`);
console.log(`2. Duplicate translation groups: ${duplicates.length}`);
console.log(`   - With different Swedish words: ${duplicates.filter(([_, entries]) => new Set(entries.map(e => e.swedish)).size > 1).length}`);
console.log(`3. Swedish text in Arabic fields: ${swedishInArabic.length}`);
console.log(`\nTotal entries analyzed: ${dictionaryData.length}`);

// Save detailed results to files
fs.writeFileSync('suspicious_short.json', JSON.stringify(shortTranslations, null, 2), 'utf8');
fs.writeFileSync('suspicious_duplicates.json', JSON.stringify(
    duplicates.filter(([_, entries]) => new Set(entries.map(e => e.swedish)).size > 1).map(([t, e]) => ({ translation: t, entries: e })),
    null, 2
), 'utf8');
fs.writeFileSync('suspicious_swedish_in_arabic.json', JSON.stringify(swedishInArabic, null, 2), 'utf8');

console.log('\nDetailed results saved to:');
console.log('- suspicious_short.json');
console.log('- suspicious_duplicates.json');
console.log('- suspicious_swedish_in_arabic.json');
