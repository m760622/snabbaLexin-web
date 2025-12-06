/**
 * Swedish Suffix Extractor
 * Analyzes dictionary data to extract noun suffixes and their genders (En/Ett)
 * Run: node extract_suffixes.js
 */

const fs = require('fs');

// Read the data.js file
const dataContent = fs.readFileSync('./data.js', 'utf-8');

// Extract the array - find the dictionaryData variable
const match = dataContent.match(/(?:const|var|let)\s+dictionaryData\s*=\s*(\[[\s\S]*?\]);/);
if (!match) {
    console.error('Could not find dictionaryData in data.js');
    process.exit(1);
}

let dictionaryData;
try {
    dictionaryData = eval(match[1]);
} catch (e) {
    console.error('Error parsing dictionary data:', e);
    process.exit(1);
}

console.log(`Loaded ${dictionaryData.length} dictionary entries`);

// Column indices
const COL_TYPE = 1;
const COL_SWE = 2;
const COL_FORMS = 6;

// Suffix maps
const ettSuffixes = {};  // { suffix: count }
const enSuffixes = {};

// Analyze each word
let processedCount = 0;
let ettCount = 0;
let enCount = 0;

for (const entry of dictionaryData) {
    const word = (entry[COL_SWE] || '').toLowerCase().trim();
    const forms = (entry[COL_FORMS] || '').toLowerCase().trim();
    const type = (entry[COL_TYPE] || '').toLowerCase();

    // Skip if no forms or word is too short
    if (!forms || word.length < 4) continue;

    // Parse forms
    const formParts = forms.split(',').map(f => f.trim());
    if (formParts.length < 2) continue;

    // Determine gender from definite singular form
    // Look for definite form in ANY position (not just second)
    let gender = null;

    for (const formPart of formParts) {
        // Skip if too short or contains spaces (compound words)
        if (formPart.length < 3 || formPart.includes(' ')) continue;

        // Ett-words: definite ends with -et (huset, bordet)
        if (formPart.match(/\w+et$/) && !formPart.match(/\w+(en|an)$/) && formPart.startsWith(word.slice(0, 3))) {
            gender = 'ett';
            ettCount++;
            break;
        }
        // En-words: definite ends with -en, -an, -n (bilen, flickan, ventilen)
        if (formPart.match(/\w+(en|an)$/) && formPart.startsWith(word.slice(0, 3))) {
            gender = 'en';
            enCount++;
            break;
        }
    }

    if (!gender) continue;

    processedCount++;

    // Extract suffixes of different lengths (2-6 characters)
    for (let len = 2; len <= Math.min(6, word.length - 2); len++) {
        const suffix = word.slice(-len);

        // Skip if suffix starts with a vowel (usually not a distinct word part)
        if (suffix.match(/^[aeiouåäö]/)) continue;

        const targetMap = gender === 'ett' ? ettSuffixes : enSuffixes;
        targetMap[suffix] = (targetMap[suffix] || 0) + 1;
    }
}

console.log(`\nProcessed ${processedCount} words with valid forms`);
console.log(`Ett-words: ${ettCount}, En-words: ${enCount}`);

// Filter to only include suffixes that appear 3+ times
const minOccurrences = 3;

const filteredEtt = {};
const filteredEn = {};

for (const [suffix, count] of Object.entries(ettSuffixes)) {
    if (count >= minOccurrences) {
        filteredEtt[suffix] = count;
    }
}

for (const [suffix, count] of Object.entries(enSuffixes)) {
    if (count >= minOccurrences) {
        filteredEn[suffix] = count;
    }
}

// Remove ambiguous suffixes (appear in both Ett and En with similar frequency)
const ambiguousThreshold = 0.7; // If one gender has less than 70% of occurrences, it's ambiguous

for (const suffix of Object.keys(filteredEtt)) {
    const ettOccur = filteredEtt[suffix] || 0;
    const enOccur = enSuffixes[suffix] || 0;
    const total = ettOccur + enOccur;

    if (total > 0 && ettOccur / total < ambiguousThreshold) {
        delete filteredEtt[suffix];
    }
}

for (const suffix of Object.keys(filteredEn)) {
    const enOccur = filteredEn[suffix] || 0;
    const ettOccur = ettSuffixes[suffix] || 0;
    const total = ettOccur + enOccur;

    if (total > 0 && enOccur / total < ambiguousThreshold) {
        delete filteredEn[suffix];
    }
}

// Sort by suffix length (longer first for matching priority)
const sortByLength = (a, b) => b.length - a.length;

const result = {
    ett: Object.keys(filteredEtt).sort(sortByLength),
    en: Object.keys(filteredEn).sort(sortByLength),
    meta: {
        generatedAt: new Date().toISOString(),
        totalWords: dictionaryData.length,
        processedWords: processedCount,
        minOccurrences: minOccurrences,
        ettSuffixCount: Object.keys(filteredEtt).length,
        enSuffixCount: Object.keys(filteredEn).length
    }
};

// Save to JSON file
fs.writeFileSync('./learned_suffixes.json', JSON.stringify(result, null, 2));

console.log(`\n✅ Saved to learned_suffixes.json`);
console.log(`   Ett suffixes: ${result.ett.length}`);
console.log(`   En suffixes: ${result.en.length}`);
console.log(`\nTop 20 Ett suffixes:`, result.ett.slice(0, 20));
console.log(`Top 20 En suffixes:`, result.en.slice(0, 20));
