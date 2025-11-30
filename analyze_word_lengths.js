const fs = require('fs');
const path = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/wordConnectData.js';

try {
    const content = fs.readFileSync(path, 'utf8');

    // Extract dictionary
    const dictMatch = content.match(/const WC_DICTIONARY = (\[[\s\S]*?\]);/);
    if (!dictMatch) throw new Error("Could not find WC_DICTIONARY");

    const dictionary = eval(dictMatch[1]);
    const words = dictionary.map(e => e.w);

    // Group by length
    const byLength = {};
    words.forEach(w => {
        const len = w.length;
        if (!byLength[len]) byLength[len] = [];
        byLength[len].push(w);
    });

    console.log("Word Length Distribution:");
    Object.keys(byLength).sort((a, b) => a - b).forEach(len => {
        console.log(`Length ${len}: ${byLength[len].length} words`);
    });

    // Helper to check candidates
    function findCandidates(targetCount, minLen, maxLen) {
        let candidates = 0;
        // We iterate over potential "Root Words" (longest words in the range)
        // Actually, the root word could be longer than maxLen if the wheel is larger?
        // User says "Longest word 4 letters" for levels 1-3. So wheel is likely 4 letters.
        // So root word must be <= maxLen.

        const potentialRoots = words.filter(w => w.length >= minLen && w.length <= maxLen);

        for (const root of potentialRoots) {
            const rootLetters = root.split('').sort();

            // Find all subwords that meet the length criteria
            const validSubwords = words.filter(w => {
                if (w.length < minLen || w.length > maxLen) return false;

                // Check if w can be formed from root
                const wLetters = w.split('').sort();
                let i = 0, j = 0;
                while (i < wLetters.length && j < rootLetters.length) {
                    if (wLetters[i] === rootLetters[j]) {
                        i++;
                        j++;
                    } else {
                        j++;
                    }
                }
                return i === wLetters.length;
            });

            // We need exactly targetCount words? Or at least?
            // User said "contains 2 words", "contains 3 words". Usually implies exactly.
            // But "at least" is safer for generation. Let's assume we pick exactly N.
            if (validSubwords.length >= targetCount) {
                candidates++;
            }
        }
        return candidates;
    }

    console.log("\nFeasibility Check:");
    console.log("Levels 1-3 (2 words, len 3-4):", findCandidates(2, 3, 4));
    console.log("Levels 4-6 (3 words, len 4-5):", findCandidates(3, 4, 5));
    console.log("Levels 7-9 (4 words, len 5-6):", findCandidates(4, 5, 6));
    console.log("Level 10 (5 words, len 6-7):", findCandidates(5, 6, 7));

} catch (e) {
    console.error("Error:", e);
}
