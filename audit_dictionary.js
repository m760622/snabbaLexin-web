/**
 * Dictionary Quality Audit Script
 * Comprehensive analysis to find potential errors and issues
 * Run: node audit_dictionary.js
 */

const fs = require('fs');

// Read the data.js file
const dataContent = fs.readFileSync('./data.js', 'utf-8');
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

console.log(`\n📚 Dictionary Quality Audit`);
console.log(`${'='.repeat(50)}`);
console.log(`Total entries: ${dictionaryData.length}\n`);

// Column indices
const COL_ID = 0;
const COL_TYPE = 1;
const COL_SWE = 2;
const COL_ARB = 3;
const COL_ARB_DEF = 4;
const COL_DEF = 5;
const COL_FORMS = 6;
const COL_EX = 7;
const COL_EX_ARB = 8;

// Issue categories
const issues = {
    missingArabic: [],           // No Arabic translation
    missingDefinition: [],       // No Swedish or Arabic definition
    veryShortTranslation: [],    // Translation < 3 chars
    duplicateEntries: [],        // Same Swedish word appears multiple times
    potentialTypos: [],          // Suspicious characters or patterns
    emptyForms: [],              // Words with type but no forms
    inconsistentType: [],        // Type doesn't match forms
    falseFriends: [],            // Known Swedish-Arabic false friends
    questionableTranslations: [] // Translations that seem off
};

// Known false friends and common mistakes
const falseFriends = {
    'gift': ['سم', 'زواج'], // Can mean poison OR married
    'glass': ['آيس كريم', 'زجاج'], // Ice cream, not glass
    'bra': ['جيد', 'حمالة صدر'], // Good, not bra
    'semester': ['إجازة', 'فصل دراسي'], // Vacation, not semester
    'kock': ['طباخ', 'ديك'], // Chef, not cock
    'slut': ['نهاية', 'عاهرة'], // End, not slut
    'fart': ['سرعة', 'ريح البطن'], // Speed, not fart
    'prick': ['نقطة', 'قضيب'], // Dot/point, not prick
    'sex': ['ستة', 'جنس'], // Six, not sex
    'bad': ['حمام', 'سيء'], // Bath, not bad
    'eventuellt': ['ربما', 'في النهاية'], // Maybe, not eventually
    'aktuell': ['حالي', 'فعلي'], // Current, not actual
    'chef': ['رئيس', 'طباخ'], // Boss, not chef
    'blankett': ['استمارة', 'بطانية'], // Form, not blanket
    'gymnasium': ['ثانوية', 'صالة رياضية'], // High school, not gym
    'mening': ['معنى/جملة', 'معنى فقط'], // Meaning AND sentence
    'magasin': ['مجلة/متجر', 'مخزن'], // Magazine/store, not just storage
};

// Check for duplicates
const wordCount = {};
for (const entry of dictionaryData) {
    const swe = (entry[COL_SWE] || '').trim().toLowerCase();
    if (swe) {
        wordCount[swe] = (wordCount[swe] || 0) + 1;
    }
}

// Analyze each entry
for (const entry of dictionaryData) {
    const id = entry[COL_ID] || '';
    const type = entry[COL_TYPE] || '';
    const swe = (entry[COL_SWE] || '').trim();
    const arb = (entry[COL_ARB] || '').trim();
    const arbDef = (entry[COL_ARB_DEF] || '').trim();
    const sweDef = (entry[COL_DEF] || '').trim();
    const forms = (entry[COL_FORMS] || '').trim();

    // Skip empty entries
    if (!swe) continue;

    // 1. Missing Arabic translation
    if (!arb || arb.length === 0) {
        issues.missingArabic.push({ id, swe, type });
    }

    // 2. Missing both definitions
    if (!arbDef && !sweDef) {
        issues.missingDefinition.push({ id, swe, arb, type });
    }

    // 3. Very short translation (potential issue)
    if (arb && arb.length < 2 && !arb.match(/^[أ-ي]$/)) {
        issues.veryShortTranslation.push({ id, swe, arb, type });
    }

    // 4. Duplicates
    const sweLower = swe.toLowerCase();
    if (wordCount[sweLower] > 1) {
        if (!issues.duplicateEntries.find(d => d.swe.toLowerCase() === sweLower)) {
            issues.duplicateEntries.push({ swe, count: wordCount[sweLower] });
        }
    }

    // 5. Potential typos (unusual characters)
    if (swe.match(/[^\wåäöéèêëàáâãæøßüïîíìç\s\-\(\)\.\']/i)) {
        issues.potentialTypos.push({ id, swe, arb, reason: 'Unusual character' });
    }

    // 6. Empty forms for content words
    if ((type.includes('Verb') || type.includes('Subst')) && !forms) {
        issues.emptyForms.push({ id, swe, type });
    }

    // 7. False friends check
    const sweBase = swe.toLowerCase().replace(/[^a-zåäö]/g, '');
    if (falseFriends[sweBase]) {
        const expectedTranslations = falseFriends[sweBase];
        const hasCorrect = expectedTranslations.some(t => arb.includes(t) || arbDef.includes(t));
        if (!hasCorrect && arb) {
            issues.falseFriends.push({
                id, swe, arb,
                expected: expectedTranslations[0],
                note: `Possible false friend - expected: ${expectedTranslations.join(' or ')}`
            });
        }
    }

    // 8. Questionable translations (common patterns)
    // Check if Arabic looks like Swedish transliteration
    if (arb && arb.match(/[bcdfghjklmnpqrstvwxyz]{3,}/i)) {
        issues.questionableTranslations.push({ id, swe, arb, reason: 'Contains Latin characters' });
    }
}

// Generate report
console.log(`\n🔍 ISSUES FOUND:`);
console.log(`${'='.repeat(50)}\n`);

console.log(`❌ Missing Arabic translation: ${issues.missingArabic.length}`);
console.log(`❌ Missing definitions: ${issues.missingDefinition.length}`);
console.log(`⚠️  Very short translations: ${issues.veryShortTranslation.length}`);
console.log(`🔄 Duplicate entries: ${issues.duplicateEntries.length}`);
console.log(`🔤 Potential typos: ${issues.potentialTypos.length}`);
console.log(`📝 Empty forms: ${issues.emptyForms.length}`);
console.log(`⚡ Possible false friends: ${issues.falseFriends.length}`);
console.log(`❓ Questionable translations: ${issues.questionableTranslations.length}`);

// Detailed reports
const report = {
    summary: {
        totalEntries: dictionaryData.length,
        issueCount: {
            missingArabic: issues.missingArabic.length,
            missingDefinition: issues.missingDefinition.length,
            veryShortTranslation: issues.veryShortTranslation.length,
            duplicates: issues.duplicateEntries.length,
            potentialTypos: issues.potentialTypos.length,
            emptyForms: issues.emptyForms.length,
            falseFriends: issues.falseFriends.length,
            questionableTranslations: issues.questionableTranslations.length
        }
    },
    details: {
        missingArabic: issues.missingArabic.slice(0, 50),
        missingDefinition: issues.missingDefinition.slice(0, 50),
        duplicates: issues.duplicateEntries.slice(0, 50),
        falseFriends: issues.falseFriends,
        questionableTranslations: issues.questionableTranslations.slice(0, 50)
    }
};

// Save detailed report
fs.writeFileSync('./audit_report.json', JSON.stringify(report, null, 2));
console.log(`\n✅ Detailed report saved to audit_report.json`);

// Print sample issues
if (issues.falseFriends.length > 0) {
    console.log(`\n📌 FALSE FRIENDS (Check these!):`);
    console.log(`${'─'.repeat(50)}`);
    issues.falseFriends.slice(0, 10).forEach(f => {
        console.log(`  ${f.swe}: "${f.arb}" - Expected: ${f.expected}`);
    });
}

if (issues.duplicateEntries.length > 0) {
    console.log(`\n📌 DUPLICATES (Top 10):`);
    console.log(`${'─'.repeat(50)}`);
    issues.duplicateEntries
        .sort((a, b) => b.count - a.count)
        .slice(0, 10)
        .forEach(d => {
            console.log(`  "${d.swe}" appears ${d.count} times`);
        });
}

if (issues.questionableTranslations.length > 0) {
    console.log(`\n📌 QUESTIONABLE (Sample):`);
    console.log(`${'─'.repeat(50)}`);
    issues.questionableTranslations.slice(0, 10).forEach(q => {
        console.log(`  ${q.swe}: "${q.arb}" - ${q.reason}`);
    });
}

console.log(`\n✨ Audit complete!`);
