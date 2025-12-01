const words = [
    { w: "MAT", s: "Jag vill ha mat." }, // Exact match
    { w: "MAT", s: "Maten är god." }, // Suffix match (should pass)
    { w: "MAT", s: "Det är en automat." }, // Substring match (should fail)
    { w: "BIL", s: "Bilen är röd." }, // Suffix match (should pass)
    { w: "BIL", s: "Jag har en bil." }, // Exact match
    { w: "BIL", s: "Det är en bild." }, // 'd' is not a common suffix for bil? 'bild' is a different word.
    // Wait, 'bild' starts with 'bil'. 
    // If I allow 'd', 'bil' matches 'bild'. This is bad.
    // 'd' is a suffix for verbs (talade). For nouns? 'bord' -> 'bordet'.
    // 'bil' -> 'bilar'.
];

const suffixes = ["en", "et", "ar", "er", "na", "a", "s", "an", "on", "or", "erna", "arna"];
const suffixPattern = `(?:${suffixes.join('|')})?`;

console.log("Testing Regex...");

words.forEach(item => {
    const word = item.w;
    const sentence = item.s;

    // Strict regex (current)
    const strictRegex = new RegExp(`(?<![A-ZÅÄÖ])${word}(?![A-ZÅÄÖ])`, 'i');

    // Suffix regex
    const suffixRegex = new RegExp(`(?<![A-ZÅÄÖ])${word}${suffixPattern}(?![A-ZÅÄÖ])`, 'i');

    console.log(`Word: ${word}, Sentence: "${sentence}"`);
    console.log(`  Strict: ${strictRegex.test(sentence)}`);
    console.log(`  Suffix: ${suffixRegex.test(sentence)}`);
});
