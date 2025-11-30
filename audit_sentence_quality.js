const fs = require('fs');

const DATA_FILE = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/wordConnectData.js';

function auditSentenceQuality() {
    const content = fs.readFileSync(DATA_FILE, 'utf8');

    const match = content.match(/const WC_DICTIONARY = (\[[\s\S]*?\]);/);
    if (!match) {
        console.error("Could not find WC_DICTIONARY");
        return;
    }

    const dictionary = eval('(' + match[1] + ')');
    const issues = [];
    const shortSentences = [];

    console.log(`Auditing ${dictionary.length} words for quality criteria...`);

    dictionary.forEach(entry => {
        const word = entry.w;
        const sentence = entry.s ? entry.s.trim() : "";
        const translation = entry.t ? entry.t.trim() : "";
        const sentenceTrans = entry.st ? entry.st.trim() : "";

        // 1. Word Length > 2
        if (word.length <= 2) {
            issues.push({ word, reason: "Word length must be > 2" });
        }

        // 2. Sentence Length >= 4 words
        // Split by spaces, filter empty
        const wordCount = sentence.split(/\s+/).filter(w => w.length > 0).length;
        if (wordCount < 4) {
            shortSentences.push({ word, sentence, count: wordCount });
        }

        // 3. Meaning/Translation exists
        if (!translation || isLatin(translation)) {
            // Basic check: translation shouldn't be empty or purely Latin (should be Arabic)
            // actually isLatin check might be too strict if it contains some latin terms, 
            // but let's just check if it has Arabic chars.
            if (!hasArabic(translation)) {
                issues.push({ word, reason: "Missing or invalid Arabic definition" });
            }
        }

        if (!sentenceTrans || !hasArabic(sentenceTrans)) {
            // Sentence translation missing
            // This might be acceptable if we fix it, but let's flag it.
            issues.push({ word, reason: "Missing Arabic sentence translation" });
        }
    });

    function hasArabic(text) {
        return /[\u0600-\u06FF]/.test(text);
    }

    function isLatin(text) {
        return /^[A-Za-z0-9\s\.,!?-]+$/.test(text);
    }

    if (issues.length === 0 && shortSentences.length === 0) {
        console.log("✅ All words pass the strict quality audit.");
    } else {
        if (issues.length > 0) {
            console.log(`❌ Found ${issues.length} critical issues (length/translation):`);
            issues.forEach(i => console.log(`- Word: "${i.word}" | Reason: ${i.reason}`));
        }

        if (shortSentences.length > 0) {
            console.log(`⚠️ Found ${shortSentences.length} words with short sentences (< 4 words):`);
            // Show first 10
            shortSentences.slice(0, 20).forEach(i => console.log(`- Word: "${i.word}" | Count: ${i.count} | S: "${i.sentence}"`));
            if (shortSentences.length > 20) console.log(`... and ${shortSentences.length - 20} more.`);
        }
    }
}

auditSentenceQuality();
