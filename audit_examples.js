/**
 * Audit Script: Check for mismatched examples
 * This script finds entries where the example sentence doesn't match the word
 */

const fs = require('fs');

// Load and parse
const dataContent = fs.readFileSync('./data.js', 'utf-8');
let dictionaryData;
try {
    dictionaryData = JSON.parse(dataContent.replace('const dictionaryData = ', '').replace(/;$/, ''));
} catch (e) {
    const match = dataContent.match(/(?:const|var|let)\s+dictionaryData\s*=\s*(\[[\s\S]*?\]);/);
    dictionaryData = eval(match[1]);
}

// Known mismatches from the batch scripts (ID -> intended word)
const batchExamples = {
    // Batch 4 examples
    "Lexin004318": { intended: "Bråkar", example: "bråkar" },
    "Lexin030559": { intended: "Vägg", example: "vägg" }
};

console.log('═══════════════════════════════════════════════════════════════');
console.log('          AUDIT: CHECKING FOR MISMATCHED EXAMPLES');
console.log('═══════════════════════════════════════════════════════════════\n');

let issues = [];

for (const entry of dictionaryData) {
    const id = entry[0];
    const type = entry[1];
    const sweWord = entry[2];
    const exampleSwe = entry[7];

    if (!exampleSwe || exampleSwe.trim() === '') continue;

    // Check if the Swedish word appears in the example (case insensitive)
    const wordLower = sweWord.toLowerCase().replace(/[^a-zåäö]/g, '');
    const exampleLower = exampleSwe.toLowerCase();

    // For verbs, check the root form
    let wordVariants = [wordLower];

    // Add common verb endings for Swedish verbs
    if (type && type.includes('Verb')) {
        // Remove common endings to get root
        const root = wordLower.replace(/ar$|er$|r$|s$/, '');
        wordVariants.push(root);
        wordVariants.push(root + 'a');
        wordVariants.push(root + 'ar');
        wordVariants.push(root + 'er');
        wordVariants.push(root + 'de');
        wordVariants.push(root + 'te');
        wordVariants.push(root + 't');
    }

    // Check if any variant appears in the example
    const wordAppearsInExample = wordVariants.some(v =>
        v.length >= 3 && exampleLower.includes(v)
    );

    if (!wordAppearsInExample && sweWord.length >= 3) {
        // This might be a mismatch
        issues.push({
            id,
            type,
            word: sweWord,
            example: exampleSwe
        });
    }
}

// Filter to show only likely issues (not pronouns, short words, etc.)
const likelyIssues = issues.filter(i =>
    i.word.length >= 4 &&
    !['Jag', 'Du', 'Han', 'Hon', 'Vi', 'De', 'Ni', 'Det', 'Den'].includes(i.word)
);

console.log(`Found ${likelyIssues.length} potential mismatches:\n`);

likelyIssues.slice(0, 50).forEach((issue, idx) => {
    console.log(`${idx + 1}. ${issue.word} (${issue.id}) - ${issue.type}`);
    console.log(`   Example: "${issue.example.substring(0, 60)}..."`);
    console.log('');
});

if (likelyIssues.length > 50) {
    console.log(`... and ${likelyIssues.length - 50} more.`);
}

// Save full report
fs.writeFileSync('./example_audit_report.json', JSON.stringify(likelyIssues, null, 2));
console.log(`\n✅ Full report saved to example_audit_report.json`);
