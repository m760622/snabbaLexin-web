const fs = require('fs');
const path = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/wordConnectData.js';

try {
    const content = fs.readFileSync(path, 'utf8');

    // Remove the original const declarations from the content to avoid syntax errors in eval
    let cleanContent = content
        .replace(/const WC_PREDEFINED_LEVELS =/g, 'WC_PREDEFINED_LEVELS =')
        .replace(/const WC_DICTIONARY =/g, 'WC_DICTIONARY =')
        .replace(/const WC_ROOT_WORDS =/g, 'WC_ROOT_WORDS =');

    let modifiedContent = `
        var WC_PREDEFINED_LEVELS = {};
        var WC_DICTIONARY = [];
        var WC_ROOT_WORDS = [];
        ${cleanContent}
        sandbox.WC_PREDEFINED_LEVELS = WC_PREDEFINED_LEVELS;
        sandbox.WC_DICTIONARY = WC_DICTIONARY;
        sandbox.WC_ROOT_WORDS = WC_ROOT_WORDS;
    `;

    const sandbox = {
        WC_PREDEFINED_LEVELS: {},
        WC_DICTIONARY: [],
        WC_ROOT_WORDS: [],
        console: console
    };

    // Evaluate the code in the sandbox context
    // We need to use a function to execute the string in the context of 'sandbox' being available if we were using vm, 
    // but here we are using a simple eval hack where we prepend the sandbox assignment.
    // Actually, since we are using 'sandbox' in the string, we need to make sure 'sandbox' is defined in the scope where eval runs.
    // It is defined above.

    eval(modifiedContent);

    const dictionary = sandbox.WC_DICTIONARY;
    const issues = [];

    console.log(`Auditing ${dictionary.length} dictionary entries...`);

    dictionary.forEach(entry => {
        const word = entry.w.toUpperCase();
        const sentence = (entry.s || "").toUpperCase();

        // Basic check: is the word a substring of the sentence?
        // We might want to be smarter (e.g. check for word boundaries), but let's start with simple inclusion.
        // The user said "clearly the same word", so "MAT" in "MATEN" is likely acceptable, but "MAT" in "TOMAT" might not be (though unlikely here).
        // Let's check for simple substring first.

        if (!sentence.includes(word)) {
            // Try to be a bit more flexible for inflections if strict match fails?
            // For now, let's report it.
            issues.push({
                word: entry.w,
                sentence: entry.s,
                issue: "Word not found in sentence"
            });
        }
    });

    if (issues.length > 0) {
        console.log(`Found ${issues.length} issues where the word is not in the sentence:`);
        issues.forEach(issue => {
            console.log(`- Word: "${issue.word}" | Sentence: "${issue.sentence}"`);
        });
    } else {
        console.log("✅ All words are present in their sentences.");
    }

} catch (e) {
    console.error("Error running audit:", e);
}
