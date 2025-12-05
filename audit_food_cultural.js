/**
 * Audit Food & Cultural Terms
 * ============================
 * 
 * يبحث عن الكلمات الثقافية والطعام السويدي التي تحتاج شرحاً أفضل
 * 
 * Usage: node audit_food_cultural.js
 */

const fs = require('fs');
const path = require('path');

// Load dictionary data
const dataPath = path.join(__dirname, 'data.js');
const dataContent = fs.readFileSync(dataPath, 'utf8');

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

// Swedish food and cultural terms that typically need explanation
const FOOD_PATTERNS = [
    // Swedish dishes and food items
    /sylta$/i,
    /köttbullar/i,
    /knäckebröd/i,
    /smörgås/i,
    /surströmming/i,
    /gravad/i,
    /sill/i,
    /herr?ing/i,
    /korv/i,
    /bulle?/i,
    /kaka$/i,
    /bröd$/i,
    /pannkak/i,
    /våffl/i,
    /soppa$/i,
    /gryta$/i,
    /palt/i,
    /pytt/i,
    /lingon/i,
    /blåbär/i,
    /hjortron/i,
    /fika/i,
    /kanelbulle/i,
    /semla/i,
    /lussekatt/i,
    /pepparkakor/i,
    /glögg/i,
    /snaps/i,
    /nubbe/i,
    /brännvin/i,
    /aquavit/i,
];

// Cultural/traditional terms
const CULTURAL_PATTERNS = [
    /midsommar/i,
    /lucia/i,
    /valborg/i,
    /påsk/i,
    /kräft/i,  // kräftskiva
    /surströmming/i,
    /farmor/i,  // grandparents
    /mormor/i,
    /farfar/i,
    /morfar/i,
    /sambo/i,
    /fika/i,
    /lagom/i,
    /jantelag/i,
    /smultron/i,  // wild strawberry
    /stuga/i,
    /allemansrätt/i,
    /skolavslutning/i,
    /studenm/i,
    /nationaldagen/i,
    /friluftsliv/i,
];

// Vague definition patterns that need improvement
const VAGUE_PATTERNS = [
    'ett slags',
    'en sorts',
    'en typ av',
    'svensk',
    'svenskt',
    'svenska',
    'maträtt',
    'bakverk',
    'dryck',
];

console.log('╔══════════════════════════════════════════════════════════════╗');
console.log('║      تدقيق كلمات الطعام والثقافة السويدية                    ║');
console.log('║      Swedish Food & Culture Terms Audit                       ║');
console.log('╚══════════════════════════════════════════════════════════════╝\n');

const foodTerms = {
    needsBetterExplanation: [],
    hasGoodExplanation: [],
    missingArabic: [],
    phoneticOnly: [],
};

const culturalTerms = {
    needsBetterExplanation: [],
    hasGoodExplanation: [],
};

for (const entry of dictionaryData) {
    const swe = entry[COL_SWE] || '';
    const arb = entry[COL_ARB] || '';
    const arbDef = entry[COL_ARB_DEF] || '';
    const sweDef = entry[COL_SWE_DEF] || '';
    const exSwe = entry[COL_EX_SWE] || '';

    // Check if it's a food term
    const isFood = FOOD_PATTERNS.some(p => p.test(swe));
    const isCultural = CULTURAL_PATTERNS.some(p => p.test(swe));

    if (!isFood && !isCultural) continue;

    // Check if definition is vague
    const defText = (arbDef + ' ' + sweDef).toLowerCase();
    const isVague = VAGUE_PATTERNS.some(p => defText.includes(p)) || defText.length < 20;

    // Check if Arabic seems to be phonetic only
    const arabicSeemsPhonetic = arb && !arb.includes(' ') && arb.length < 15;

    const termInfo = {
        word: swe,
        arabic: arb,
        arbDef,
        sweDef,
        hasExample: !!exSwe,
    };

    if (isFood) {
        if (!arb) {
            foodTerms.missingArabic.push(termInfo);
        } else if (arabicSeemsPhonetic && isVague) {
            foodTerms.phoneticOnly.push(termInfo);
        } else if (isVague) {
            foodTerms.needsBetterExplanation.push(termInfo);
        } else {
            foodTerms.hasGoodExplanation.push(termInfo);
        }
    }

    if (isCultural) {
        if (isVague) {
            culturalTerms.needsBetterExplanation.push(termInfo);
        } else {
            culturalTerms.hasGoodExplanation.push(termInfo);
        }
    }
}

// Print report
console.log('🍽️  كلمات الطعام السويدي / Swedish Food Terms');
console.log('═══════════════════════════════════════════════════════════════\n');

console.log(`✅ بتعريف جيد / Good explanations: ${foodTerms.hasGoodExplanation.length}`);
console.log(`⚠️  تحتاج شرحاً أفضل / Needs better explanation: ${foodTerms.needsBetterExplanation.length}`);
console.log(`🔤 ترجمة صوتية فقط / Phonetic only: ${foodTerms.phoneticOnly.length}`);
console.log(`❌ بدون ترجمة عربية / Missing Arabic: ${foodTerms.missingArabic.length}`);
console.log('');

if (foodTerms.needsBetterExplanation.length > 0) {
    console.log('📋 كلمات طعام تحتاج شرحاً (أول 15):');
    console.log('───────────────────────────────────────────────────────────────');
    foodTerms.needsBetterExplanation.slice(0, 15).forEach((item, i) => {
        console.log(`   ${i + 1}. ${item.word}`);
        console.log(`      Arabic: "${item.arabic}"`);
        console.log(`      Def: "${item.arbDef || item.sweDef}"`);
        console.log('');
    });
}

if (foodTerms.phoneticOnly.length > 0) {
    console.log('\n🔤 طعام بترجمة صوتية فقط:');
    console.log('───────────────────────────────────────────────────────────────');
    foodTerms.phoneticOnly.forEach((item, i) => {
        console.log(`   ${i + 1}. ${item.word} → "${item.arabic}"`);
        console.log(`      Needs: وصف حقيقي للطبق ومكوناته`);
    });
}

console.log('\n\n🎭 كلمات ثقافية سويدية / Swedish Cultural Terms');
console.log('═══════════════════════════════════════════════════════════════\n');

console.log(`✅ بتعريف جيد / Good explanations: ${culturalTerms.hasGoodExplanation.length}`);
console.log(`⚠️  تحتاج شرحاً أفضل / Needs better explanation: ${culturalTerms.needsBetterExplanation.length}`);
console.log('');

if (culturalTerms.needsBetterExplanation.length > 0) {
    console.log('📋 كلمات ثقافية تحتاج شرحاً (أول 15):');
    console.log('───────────────────────────────────────────────────────────────');
    culturalTerms.needsBetterExplanation.slice(0, 15).forEach((item, i) => {
        console.log(`   ${i + 1}. ${item.word}`);
        console.log(`      Arabic: "${item.arabic}"`);
        console.log(`      Def: "${item.arbDef || item.sweDef}"`);
        console.log('');
    });
}

// Example improvements
console.log('\n\n💡 أمثلة على التحسين المطلوب / Example Improvements Needed:');
console.log('═══════════════════════════════════════════════════════════════\n');

console.log('مثال: Slarvsylta');
console.log('───────────────────────────────────────────────────────────────');
console.log('❌ الحالي / Current:');
console.log('   Arabic: "سلارف سيلتا"');
console.log('   Definition: "طبق سويدي"');
console.log('');
console.log('✅ المقترح / Suggested:');
console.log('   Arabic: "سيلتا (طبق سويدي من اللحم المضغوط)"');
console.log('   Definition: "طبق تقليدي من اللحم البقري أو لحم الخنزير المطبوخ');
console.log('               والمضغوط في قالب، يُقدم بارداً ومقطعاً شرائح،');
console.log('               يشبه نوعاً ما القاورما أو رأس الخروف المطبوخ"');
console.log('');

console.log('مثال: Kanelbulle');
console.log('───────────────────────────────────────────────────────────────');
console.log('❌ الحالي / Current:');
console.log('   Arabic: "كانلبوله"');
console.log('   Definition: "نوع من الحلوى"');
console.log('');
console.log('✅ المقترح / Suggested:');
console.log('   Arabic: "لفافة القرفة السويدية"');
console.log('   Definition: "خبز حلو ملفوف بالقرفة والسكر والهيل،');
console.log('               يُعتبر من أشهر المعجنات السويدية ويُقدم عادة مع القهوة"');

// Save detailed report
const reportPath = path.join(__dirname, 'food_cultural_report.json');
const report = {
    generatedAt: new Date().toISOString(),
    foodTerms,
    culturalTerms,
};

fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');
console.log(`\n\n✅ تم حفظ التقرير المفصل في / Detailed report saved to:`);
console.log(`   ${reportPath}\n`);
