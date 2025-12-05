/**
 * Data Quality Audit Script
 * =========================
 * 
 * يفحص جودة بيانات القاموس ويحدد المدخلات التي تحتاج لتحسين
 * 
 * Usage: node audit_data_quality.js
 */

const fs = require('fs');
const path = require('path');

// Load dictionary data
const dataPath = path.join(__dirname, 'data.js');
const dataContent = fs.readFileSync(dataPath, 'utf8');

// Extract array from the file
const match = dataContent.match(/const dictionaryData = (\[[\s\S]*\]);/);
if (!match) {
    console.error('Could not parse dictionary data');
    process.exit(1);
}

let dictionaryData;
try {
    dictionaryData = eval(match[1]);
} catch (e) {
    console.error('Error evaluating dictionary data:', e.message);
    process.exit(1);
}

// Column indices
const COL_ID = 0;
const COL_TYPE = 1;
const COL_SWE = 2;
const COL_ARB = 3;
const COL_ARB_DEF = 4;
const COL_SWE_DEF = 5;
const COL_FORMS = 6;
const COL_EX_SWE = 7;
const COL_EX_ARB = 8;
const COL_IDIOM_SWE = 9;
const COL_IDIOM_ARB = 10;

// Arabic letters for transliteration detection
const ARABIC_LETTERS = /[\u0600-\u06FF]/;
const SWEDISH_SOUNDS_IN_ARABIC = [
    // Common Swedish phonetic patterns written in Arabic
    /سلارف/,  // slarf
    /سيلتا/,  // sylta
    /كورف/,   // korv
    /بولار/,  // bullar
    /كاكا/,   // kaka
    /فيسكا/,  // fiska
    /سومار/,  // sommar
    /فينتر/,  // vinter
    /شوكلاد/, // choklad
    /كافي/,   // kaffe
    /ميولك/,  // mjölk
    /بريود/,  // bröd
    /أوست/,   // ost
    /سموور/, // smör
];

// Generic/vague definitions that need improvement
const VAGUE_DEFINITIONS = [
    'طبق سويدي',
    'طعام سويدي',
    'أكلة سويدية',
    'شيء سويدي',
    'نوع من',
    'ett slags',
    'en sorts',
];

/**
 * Check if Arabic text appears to be phonetic transliteration
 */
function isPhoneticTransliteration(arabicText, swedishWord) {
    if (!arabicText) return false;

    const trimmed = arabicText.trim();

    // If it has spaces, it's likely a real translation
    if (trimmed.includes(' ') && trimmed.split(' ').length >= 2) {
        return false;
    }

    // Check if Arabic text matches Swedish sounds patterns (explicit transliterations)
    for (const pattern of SWEDISH_SOUNDS_IN_ARABIC) {
        if (pattern.test(arabicText)) {
            return true;
        }
    }

    // List of common real Arabic words (not transliterations)
    const realArabicWords = [
        'شاذ', 'تام', 'طارئ', 'حذر', 'متروك', 'ناشط', 'مفرط', 'أبتر',
        'جزئي', 'كامل', 'قطعي', 'مطلق', 'نسبي', 'عام', 'خاص', 'جديد',
        'قديم', 'كبير', 'صغير', 'طويل', 'قصير', 'عريض', 'ضيق', 'سريع',
        'بطيء', 'ثقيل', 'خفيف', 'صعب', 'سهل', 'جيد', 'سيء', 'حار',
        'بارد', 'رطب', 'جاف', 'نظيف', 'قذر', 'جميل', 'قبيح', 'عالٍ',
        'منخفض', 'غني', 'فقير', 'صحي', 'مريض', 'حي', 'ميت', 'سعيد',
        'حزين', 'غاضب', 'هادئ', 'مشغول', 'فارغ', 'مفتوح', 'مغلق',
        'مفضلة', 'طعام', 'شراب', 'مكان', 'شخص', 'عمل', 'فعل', 'حالة',
        'صفة', 'نوع', 'شيء', 'أمر', 'قضية', 'مسألة', 'موضوع', 'فكرة',
        'رأي', 'قرار', 'حكم', 'قانون', 'نظام', 'قاعدة', 'شرط', 'سبب',
        'نتيجة', 'هدف', 'غاية', 'وسيلة', 'طريقة', 'أسلوب', 'منهج',
        // More common Arabic adjectives and nouns
        'مطلع', 'جزئياً', 'إداري', 'أكاديمي', 'عدواني', 'طموح',
        'متناقض', 'مقبول', 'مناسب', 'ملائم', 'تحالف', 'متحالف',
        'روحاني', 'تجريدي', 'لامعقول', 'عمومي', 'يومي', 'وحيد',
    ];

    // Check if it's a known real Arabic word
    for (const word of realArabicWords) {
        if (trimmed === word || trimmed.includes(word)) {
            return false;
        }
    }

    // Check for patterns that indicate phonetic transliteration:
    // 1. Uncommon letter combinations in Arabic
    // 2. Words that look like Swedish sounds

    // Pattern: p, g sounds written in Arabic (غ، ب) at unusual positions
    // Swedish has sounds that don't exist naturally in Arabic roots

    // Check if word seems to follow Swedish phonetic patterns
    // rather than Arabic morphological patterns
    const swedishLower = swedishWord.toLowerCase().replace(/[^a-zåäö]/g, '');

    // If Arabic is very short (1-2 chars) and Swedish is longer, might be abbreviation
    if (trimmed.length <= 4 && swedishLower.length > 6) {
        return false; // Probably abbreviation, not transliteration
    }

    // Check for typical Arabic word endings (تاء مربوطة، ألف ممدودة، etc)
    const hasArabicEnding = /[ةاءىيون]$/.test(trimmed);

    // Check for Arabic definite article
    const hasDefiniteArticle = trimmed.startsWith('ال');

    // If it has typical Arabic morphology, it's probably real
    if (hasArabicEnding || hasDefiniteArticle) {
        return false;
    }

    // Final check: Compare lengths - transliterations often match Swedish word length
    // Real translations are often longer due to Arabic morphology
    if (trimmed.length >= 4 && trimmed.length <= swedishLower.length + 2) {
        // Could be transliteration, but only flag if no Arabic meaning detected
        // This is a weak signal, so let's not flag based on length alone
    }

    return false; // Default to not flagging to reduce false positives
}

/**
 * Check if definition is too vague
 */
function isVagueDefinition(definition) {
    if (!definition) return true;

    const normalized = definition.toLowerCase().trim();

    // Check against vague patterns
    for (const vague of VAGUE_DEFINITIONS) {
        if (normalized.includes(vague.toLowerCase())) {
            return true;
        }
    }

    // Definition is too short
    if (definition.length < 10) {
        return true;
    }

    return false;
}

/**
 * Detect noun gender from forms
 */
function detectNounGender(forms) {
    if (!forms || forms.trim() === '') return null;

    const formsArray = forms.split(',').map(f => f.trim()).filter(f => f);
    if (formsArray.length < 2) return null;

    const definiteSingular = formsArray[1] || '';

    if (definiteSingular.endsWith('et') && !definiteSingular.endsWith('ket')) {
        return 'ett';
    }

    if (definiteSingular.endsWith('an') ||
        definiteSingular.endsWith('en') ||
        definiteSingular.endsWith('n')) {
        return 'en';
    }

    return null; // Unknown
}

// Run audit
console.log('╔══════════════════════════════════════════════════════════════╗');
console.log('║           تدقيق جودة بيانات القاموس                          ║');
console.log('║           Dictionary Data Quality Audit                       ║');
console.log('╚══════════════════════════════════════════════════════════════╝\n');

const issues = {
    phoneticTranslations: [],
    missingExamples: [],
    missingDefinitions: [],
    vagueDefinitions: [],
    nounsWithoutGender: [],
    missingForms: [],
};

let totalEntries = 0;
let nounCount = 0;
let verbCount = 0;

for (const entry of dictionaryData) {
    totalEntries++;

    const id = entry[COL_ID] || '';
    const type = entry[COL_TYPE] || '';
    const swe = entry[COL_SWE] || '';
    const arb = entry[COL_ARB] || '';
    const arbDef = entry[COL_ARB_DEF] || '';
    const sweDef = entry[COL_SWE_DEF] || '';
    const forms = entry[COL_FORMS] || '';
    const exSwe = entry[COL_EX_SWE] || '';
    const exArb = entry[COL_EX_ARB] || '';

    const typeLower = type.toLowerCase();
    const isNoun = typeLower.includes('subst');
    const isVerb = typeLower.includes('verb');

    if (isNoun) nounCount++;
    if (isVerb) verbCount++;

    // Check for phonetic translations
    if (isPhoneticTransliteration(arb, swe)) {
        issues.phoneticTranslations.push({
            id,
            word: swe,
            arabic: arb,
            type
        });
    }

    // Check for missing examples
    if (!exSwe && !exArb) {
        issues.missingExamples.push({
            id,
            word: swe,
            type
        });
    }

    // Check for missing definitions
    if (!arbDef && !sweDef) {
        issues.missingDefinitions.push({
            id,
            word: swe,
            type
        });
    }

    // Check for vague definitions
    if (isVagueDefinition(arbDef) && isVagueDefinition(sweDef)) {
        if (arbDef || sweDef) { // Only if there's some definition
            issues.vagueDefinitions.push({
                id,
                word: swe,
                arbDef,
                sweDef,
                type
            });
        }
    }

    // Check for nouns without clear gender
    if (isNoun) {
        const gender = detectNounGender(forms);
        if (!gender && forms) {
            issues.nounsWithoutGender.push({
                id,
                word: swe,
                forms
            });
        }
    }

    // Check for missing forms (nouns and verbs)
    if ((isNoun || isVerb) && !forms) {
        issues.missingForms.push({
            id,
            word: swe,
            type
        });
    }
}

// Print report
console.log('📊 ملخص التدقيق / Audit Summary');
console.log('═══════════════════════════════════════════════════════════════\n');

console.log(`📚 إجمالي المدخلات / Total Entries: ${totalEntries.toLocaleString()}`);
console.log(`📝 الأسماء / Nouns: ${nounCount.toLocaleString()}`);
console.log(`🔄 الأفعال / Verbs: ${verbCount.toLocaleString()}`);
console.log('');

console.log('⚠️  المشاكل المكتشفة / Issues Found:');
console.log('───────────────────────────────────────────────────────────────\n');

console.log(`🔤 ترجمات صوتية فقط / Phonetic-only translations: ${issues.phoneticTranslations.length}`);
console.log(`💡 بدون أمثلة / Missing examples: ${issues.missingExamples.length}`);
console.log(`📖 بدون تعريف / Missing definitions: ${issues.missingDefinitions.length}`);
console.log(`❓ تعريفات غامضة / Vague definitions: ${issues.vagueDefinitions.length}`);
console.log(`🏷️  أسماء بدون جنس واضح / Nouns without clear gender: ${issues.nounsWithoutGender.length}`);
console.log(`📋 بدون تصريفات / Missing forms: ${issues.missingForms.length}`);

// Calculate quality score
const totalIssues =
    issues.phoneticTranslations.length +
    issues.missingExamples.length +
    issues.missingDefinitions.length;

const qualityScore = Math.max(0, 100 - (totalIssues / totalEntries * 100));

console.log('\n');
console.log(`📈 درجة الجودة / Quality Score: ${qualityScore.toFixed(1)}%`);
console.log('');

// Show examples of each issue
console.log('\n📋 أمثلة على المشاكل / Issue Examples:');
console.log('═══════════════════════════════════════════════════════════════\n');

if (issues.phoneticTranslations.length > 0) {
    console.log('🔤 ترجمات صوتية / Phonetic Translations (أول 10):');
    console.log('───────────────────────────────────────────────────────────────');
    issues.phoneticTranslations.slice(0, 10).forEach((item, i) => {
        console.log(`   ${i + 1}. ${item.word} → "${item.arabic}"`);
    });
    console.log('');
}

if (issues.vagueDefinitions.length > 0) {
    console.log('❓ تعريفات غامضة / Vague Definitions (أول 10):');
    console.log('───────────────────────────────────────────────────────────────');
    issues.vagueDefinitions.slice(0, 10).forEach((item, i) => {
        console.log(`   ${i + 1}. ${item.word}: "${item.arbDef || item.sweDef}"`);
    });
    console.log('');
}

// Save detailed report to file
const reportPath = path.join(__dirname, 'data_quality_report.json');
const report = {
    generatedAt: new Date().toISOString(),
    summary: {
        totalEntries,
        nounCount,
        verbCount,
        qualityScore: qualityScore.toFixed(1) + '%',
        issuesCounts: {
            phoneticTranslations: issues.phoneticTranslations.length,
            missingExamples: issues.missingExamples.length,
            missingDefinitions: issues.missingDefinitions.length,
            vagueDefinitions: issues.vagueDefinitions.length,
            nounsWithoutGender: issues.nounsWithoutGender.length,
            missingForms: issues.missingForms.length,
        }
    },
    issues
};

fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');
console.log(`\n✅ تم حفظ التقرير المفصل في / Detailed report saved to:`);
console.log(`   ${reportPath}`);
console.log('');

// Priority recommendations
console.log('🎯 توصيات الأولوية / Priority Recommendations:');
console.log('═══════════════════════════════════════════════════════════════\n');

console.log('1️⃣  الأولوية العليا / Highest Priority:');
console.log('   → إصلاح الترجمات الصوتية - هذه لا تفيد المتعلم');
console.log('   → Fix phonetic translations - these don\'t help learners\n');

console.log('2️⃣  الأولوية الثانية / Second Priority:');
console.log('   → إضافة أمثلة للكلمات الشائعة');
console.log('   → Add examples for common words\n');

console.log('3️⃣  الأولوية الثالثة / Third Priority:');
console.log('   → تحسين التعريفات الغامضة');
console.log('   → Improve vague definitions\n');
