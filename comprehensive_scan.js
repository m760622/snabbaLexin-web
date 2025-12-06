/**
 * Comprehensive Dictionary Scan
 * Deep analysis of all 34,000+ entries
 */

const fs = require('fs');
const dataContent = fs.readFileSync('./data.js', 'utf-8');
const match = dataContent.match(/(?:const|var|let)\s+dictionaryData\s*=\s*(\[[\s\S]*?\]);/);
const dictionaryData = eval(match[1]);

console.log('\n🔍 COMPREHENSIVE DICTIONARY SCAN');
console.log('='.repeat(60));
console.log(`📚 Total entries: ${dictionaryData.length}\n`);

// Issue tracking
const issues = {
    critical: [],      // Serious errors
    warnings: [],      // Need attention
    suggestions: []    // Minor improvements
};

// Statistics
const stats = {
    totalWithArabic: 0,
    totalWithDefinition: 0,
    uniqueTypes: {},
    shortTranslations: 0,
    longTranslations: 0,
    wordsWithExamples: 0,
    wordsWithIdioms: 0
};

// Common Swedish-Arabic translation issues
const commonMistakes = {
    // False friends
    'aktuell': { wrong: ['فعلي', 'حقيقي'], correct: 'حالي/راهن' },
    'chef': { wrong: ['طباخ', 'شيف'], correct: 'رئيس/مدير' },
    'semester': { wrong: ['فصل', 'semestre'], correct: 'إجازة' },
    'eventuell': { wrong: ['في النهاية', 'حتمي'], correct: 'محتمل' },
    'gymnasium': { wrong: ['صالة رياضية', 'جيم'], correct: 'مدرسة ثانوية' },
    'kontrollera': { wrong: ['يتحكم'], correct: 'يفحص/يتحقق' },
    // Common errors
    'också': { wrong: ['ايضا'], correct: 'أيضاً' }, // Spelling
};

// Analyze each entry
for (let i = 0; i < dictionaryData.length; i++) {
    const entry = dictionaryData[i];
    const id = entry[0] || '';
    const type = entry[1] || '';
    const swe = (entry[2] || '').trim();
    const arb = (entry[3] || '').trim();
    const arbDef = (entry[4] || '').trim();
    const sweDef = (entry[5] || '').trim();
    const forms = (entry[6] || '').trim();
    const exSwe = (entry[7] || '').trim();
    const exArb = (entry[8] || '').trim();
    const idiom = (entry[9] || '').trim();

    if (!swe) continue;

    // Statistics
    if (arb) stats.totalWithArabic++;
    if (arbDef || sweDef) stats.totalWithDefinition++;
    if (exSwe) stats.wordsWithExamples++;
    if (idiom) stats.wordsWithIdioms++;
    stats.uniqueTypes[type] = (stats.uniqueTypes[type] || 0) + 1;

    // Check for issues
    const sweLower = swe.toLowerCase();

    // 1. Missing Arabic translation
    if (!arb) {
        issues.critical.push({
            type: 'MISSING_ARABIC',
            id, swe, wordType: type
        });
    }

    // 2. Very short translations (might be incomplete)
    if (arb && arb.length < 2) {
        issues.warnings.push({
            type: 'SHORT_TRANSLATION',
            id, swe, arb, wordType: type
        });
        stats.shortTranslations++;
    }

    // 3. Check for common mistakes
    for (const [word, check] of Object.entries(commonMistakes)) {
        if (sweLower === word || sweLower.startsWith(word + ' ')) {
            for (const wrongTrans of check.wrong) {
                if (arb.includes(wrongTrans)) {
                    issues.warnings.push({
                        type: 'POSSIBLE_MISTAKE',
                        id, swe, arb,
                        suggestion: `قد يكون الأصح: ${check.correct}`
                    });
                }
            }
        }
    }

    // 4. Arabic text with Latin characters (unusual)
    if (arb && arb.match(/[a-zA-Z]{4,}/) && !arb.match(/[أ-ي]/)) {
        issues.warnings.push({
            type: 'LATIN_IN_ARABIC',
            id, swe, arb
        });
    }

    // 5. Swedish text in Arabic field
    if (arb && arb.match(/^[a-zA-ZåäöÅÄÖ\s]+$/) && arb.length > 3) {
        issues.critical.push({
            type: 'SWEDISH_AS_ARABIC',
            id, swe, arb
        });
    }

    // 6. Verbs without forms
    if (type.match(/^Verb/i) && !forms) {
        issues.suggestions.push({
            type: 'VERB_NO_FORMS',
            id, swe
        });
    }

    // 7. Nouns without gender info in forms
    if (type.match(/^Subst/i) && forms && !forms.match(/\w+(en|et|an|n),/)) {
        issues.suggestions.push({
            type: 'NOUN_UNCLEAR_GENDER',
            id, swe, forms: forms.slice(0, 30)
        });
    }
}

// Print results
console.log('📊 STATISTICS');
console.log('-'.repeat(60));
console.log(`  With Arabic translation: ${stats.totalWithArabic} (${(stats.totalWithArabic / dictionaryData.length * 100).toFixed(1)}%)`);
console.log(`  With definition: ${stats.totalWithDefinition} (${(stats.totalWithDefinition / dictionaryData.length * 100).toFixed(1)}%)`);
console.log(`  With examples: ${stats.wordsWithExamples}`);
console.log(`  With idioms: ${stats.wordsWithIdioms}`);

console.log('\n📁 WORD TYPES');
console.log('-'.repeat(60));
const sortedTypes = Object.entries(stats.uniqueTypes).sort((a, b) => b[1] - a[1]);
for (const [t, count] of sortedTypes.slice(0, 15)) {
    console.log(`  ${t.padEnd(25)} ${count}`);
}

console.log('\n\n🔴 CRITICAL ISSUES: ' + issues.critical.length);
console.log('-'.repeat(60));
for (const issue of issues.critical.slice(0, 10)) {
    console.log(`  [${issue.type}] ${issue.swe}: ${issue.arb || '(empty)'}`);
}
if (issues.critical.length > 10) console.log(`  ... and ${issues.critical.length - 10} more`);

console.log('\n\n🟡 WARNINGS: ' + issues.warnings.length);
console.log('-'.repeat(60));
for (const issue of issues.warnings.slice(0, 10)) {
    console.log(`  [${issue.type}] ${issue.swe}: ${issue.arb}`);
    if (issue.suggestion) console.log(`     → ${issue.suggestion}`);
}
if (issues.warnings.length > 10) console.log(`  ... and ${issues.warnings.length - 10} more`);

console.log('\n\n🔵 SUGGESTIONS: ' + issues.suggestions.length);
console.log('-'.repeat(60));
console.log(`  Verbs without forms: ${issues.suggestions.filter(i => i.type === 'VERB_NO_FORMS').length}`);
console.log(`  Nouns with unclear gender: ${issues.suggestions.filter(i => i.type === 'NOUN_UNCLEAR_GENDER').length}`);

// Summary
console.log('\n\n📈 QUALITY SCORE');
console.log('='.repeat(60));
const qualityScore = 100 - (issues.critical.length * 2 + issues.warnings.length * 0.5) / dictionaryData.length * 100;
console.log(`  Score: ${qualityScore.toFixed(1)}%`);
console.log(`  Rating: ${qualityScore > 95 ? '⭐⭐⭐⭐⭐ Excellent' : qualityScore > 90 ? '⭐⭐⭐⭐ Very Good' : qualityScore > 80 ? '⭐⭐⭐ Good' : '⭐⭐ Needs Work'}`);

// Save detailed report
const report = {
    summary: {
        totalEntries: dictionaryData.length,
        qualityScore: qualityScore.toFixed(1) + '%',
        criticalCount: issues.critical.length,
        warningCount: issues.warnings.length,
        suggestionCount: issues.suggestions.length
    },
    statistics: stats,
    issues: {
        critical: issues.critical,
        warnings: issues.warnings.slice(0, 100),
        suggestions: issues.suggestions.slice(0, 50)
    }
};

fs.writeFileSync('./comprehensive_scan.json', JSON.stringify(report, null, 2));
console.log('\n\n✅ Full report saved to comprehensive_scan.json');
