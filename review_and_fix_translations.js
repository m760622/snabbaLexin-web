/**
 * مراجعة وإصلاح الترجمات المشبوهة
 * Review and Fix Suspicious Translations
 * 
 * This script helps you:
 * 1. Review and validate short translations
 * 2. Identify duplicate translations that need more context
 * 3. Generate reports for manual review
 */

const fs = require('fs');

// Load data
const dataContent = fs.readFileSync('data.js', 'utf8');
const startMarker = 'const dictionaryData = ';
const startIndex = dataContent.indexOf(startMarker);
const arrayStart = dataContent.indexOf('[', startIndex);

let dictionaryData;
try {
    dictionaryData = eval(dataContent.slice(arrayStart));
} catch (e) {
    console.error('Error parsing data:', e);
    process.exit(1);
}

console.log(`\n📚 Total entries: ${dictionaryData.length}\n`);

// ========================================
// 1. Analyze Short Translations
// ========================================

const shortTranslations = [];
const validShortWords = new Set([
    // Valid Arabic prepositions and particles (1-2 chars)
    'في', 'من', 'إلى', 'على', 'عن', 'مع', 'لـ', 'بـ', 'كـ',
    // Valid Arabic pronouns
    'هو', 'هي', 'ك', 'ي', 'له', 'لي',
    // Valid Arabic conjunctions
    'و', 'أو', 'أن', 'لا', 'ما',
    // Valid Arabic interjections
    'آه', 'أخ',
    // Valid single-meaning words
    'دم', 'فم', 'يد', 'أب', 'أخ', 'أم', 'فك', 'حس', 'فن', 'سد', 'سم', 'صب', 'صف', 'زر', 'دب', 'غش', 'حد', 'حق', 'حل', 'خس', 'مخ', 'طن',
    // Letters
    'آ', 'أ', 'آس', 'آص', 'دي', 'جي', 'سي',
]);

for (const entry of dictionaryData) {
    const arabicTranslation = entry[3];
    if (!arabicTranslation || arabicTranslation.trim() === '') continue;

    const trimmed = arabicTranslation.trim();
    if (trimmed.length <= 2) {
        shortTranslations.push({
            id: entry[0],
            type: entry[1],
            swedish: entry[2],
            arabic: trimmed,
            explanation: entry[4],
            isValid: validShortWords.has(trimmed)
        });
    }
}

const validShort = shortTranslations.filter(s => s.isValid);
const needsReviewShort = shortTranslations.filter(s => !s.isValid);

console.log('='.repeat(60));
console.log('📝 SHORT TRANSLATIONS ANALYSIS');
console.log('='.repeat(60));
console.log(`✅ Valid short translations: ${validShort.length}`);
console.log(`⚠️  Need review: ${needsReviewShort.length}\n`);

if (needsReviewShort.length > 0) {
    console.log('Translations that need review:');
    for (const item of needsReviewShort) {
        console.log(`  ${item.id}: "${item.swedish}" → "${item.arabic}" (${item.explanation})`);
    }
    console.log();
}

// ========================================
// 2. Analyze Duplicate Translations  
// ========================================

const duplicateMap = new Map();

for (const entry of dictionaryData) {
    const arabicTranslation = entry[3];
    if (!arabicTranslation || arabicTranslation.trim() === '') continue;

    const normalized = arabicTranslation.trim();
    if (!duplicateMap.has(normalized)) {
        duplicateMap.set(normalized, []);
    }
    duplicateMap.get(normalized).push({
        id: entry[0],
        type: entry[1],
        swedish: entry[2],
        explanation: entry[4]
    });
}

// Find duplicates with different Swedish words
const problematicDuplicates = [];
for (const [translation, entries] of duplicateMap) {
    const uniqueSwedish = [...new Set(entries.map(e => e.swedish))];
    if (uniqueSwedish.length > 1 && entries.length >= 5) {
        // Only flag duplicates with 5+ entries
        problematicDuplicates.push({
            translation,
            count: entries.length,
            uniqueWords: uniqueSwedish.length,
            samples: entries.slice(0, 5)
        });
    }
}

// Sort by count (most duplicated first)
problematicDuplicates.sort((a, b) => b.count - a.count);

console.log('='.repeat(60));
console.log('🔄 DUPLICATE TRANSLATIONS ANALYSIS');
console.log('='.repeat(60));
console.log(`Found ${problematicDuplicates.length} translations used for 5+ different Swedish words\n`);

console.log('Top 20 most duplicated translations:');
for (const dup of problematicDuplicates.slice(0, 20)) {
    console.log(`\n  "${dup.translation}" → ${dup.count} Swedish words`);
    console.log('    Examples:');
    for (const sample of dup.samples) {
        console.log(`      - ${sample.swedish} (${sample.type})`);
    }
}

// ========================================
// 3. Generate Suggested Improvements
// ========================================

console.log('\n' + '='.repeat(60));
console.log('💡 SUGGESTED IMPROVEMENTS');
console.log('='.repeat(60));

// Create improvement suggestions for the most problematic duplicates
const improvements = [];

for (const dup of problematicDuplicates.slice(0, 30)) {
    const suggestion = {
        currentTranslation: dup.translation,
        affectedEntries: dup.count,
        suggestion: `Consider adding context or synonyms for different meanings`,
        examples: dup.samples.map(s => ({
            swedish: s.swedish,
            type: s.type,
            currentArabic: dup.translation,
            suggestedArabic: `${dup.translation} (${s.type.replace('.', '')})`
        }))
    };
    improvements.push(suggestion);
}

// ========================================
// 4. Save Reports
// ========================================

// Report: Short translations needing review
const shortReport = {
    summary: {
        total: shortTranslations.length,
        valid: validShort.length,
        needsReview: needsReviewShort.length
    },
    needsReview: needsReviewShort,
    valid: validShort
};
fs.writeFileSync('report_short_translations.json', JSON.stringify(shortReport, null, 2), 'utf8');

// Report: Duplicate translations
const duplicateReport = {
    summary: {
        totalDuplicateGroups: problematicDuplicates.length,
        topAffected: problematicDuplicates.slice(0, 30).map(d => ({
            translation: d.translation,
            count: d.count
        }))
    },
    duplicates: problematicDuplicates
};
fs.writeFileSync('report_duplicate_translations.json', JSON.stringify(duplicateReport, null, 2), 'utf8');

// Report: Improvement suggestions
fs.writeFileSync('report_improvements.json', JSON.stringify(improvements, null, 2), 'utf8');

console.log('\n📁 Reports saved:');
console.log('  - report_short_translations.json');
console.log('  - report_duplicate_translations.json');
console.log('  - report_improvements.json');

// ========================================
// 5. Summary Statistics
// ========================================

console.log('\n' + '='.repeat(60));
console.log('📊 SUMMARY');
console.log('='.repeat(60));
console.log(`Total entries: ${dictionaryData.length}`);
console.log(`Short translations (≤2 chars): ${shortTranslations.length}`);
console.log(`  - Valid: ${validShort.length}`);
console.log(`  - Needs review: ${needsReviewShort.length}`);
console.log(`Duplicate translation groups (5+): ${problematicDuplicates.length}`);
console.log(`Improvement suggestions: ${improvements.length}`);

// Calculate overall dictionary quality score
const qualityScore = Math.round(
    ((dictionaryData.length - needsReviewShort.length) / dictionaryData.length) * 100 *
    ((dictionaryData.length - problematicDuplicates.reduce((sum, d) => sum + d.count, 0) / 2) / dictionaryData.length) * 100
) / 100;

console.log(`\n🎯 Estimated Quality Score: ${Math.min(qualityScore, 100)}%`);
console.log('\nNote: Duplicate translations are not necessarily errors -');
console.log('synonyms in Swedish may have the same Arabic translation.');
console.log('Review the reports to decide which ones need differentiation.\n');
