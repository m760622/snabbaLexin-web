const fs = require('fs');

try {
    console.log('Loading data.js...');
    let dataContent = fs.readFileSync('data.js', 'utf8');

    // Brutal force: replace const with global assignment
    // Assuming the file starts with "const dictionaryData ="
    dataContent = dataContent.replace('const dictionaryData =', 'global.dictionaryData =');

    // Execute
    eval(dataContent);

    const dictionaryData = global.dictionaryData;

    if (!dictionaryData) {
        throw new Error("dictionaryData not found after eval");
    }

    console.log(`Data loaded. Total entries: ${dictionaryData.length}`);

    // LOGIC FROM memory.html
    const COL_SWE = 2;
    const COL_ARB = 3;

    function getRandomWords(count) {
        console.log(`Selecting ${count} random words...`);
        const suitable = dictionaryData.filter(entry => {
            if (!Array.isArray(entry)) {
                // console.warn('Found invalid entry (not array):', entry);
                return false;
            }
            const word = entry[COL_SWE];
            const translation = entry[COL_ARB];

            // Check if word exists
            if (!word) {
                // console.warn('Found entry with no Swedish word at index 2:', entry);
                return false;
            }

            // Critical check
            // Note: In memory.html, the check is: "return word && word.length >= 2 && word.length <= 10;"
            // It DOES NOT check for Arabic translation explicitly in the filter, but uses it later.
            // If Arabic is missing or undefined, it might cause issues later.

            if (word.length < 2 || word.length > 10) return false;

            // Checking if Arabic exists is implied but let's see if that's the issue
            return true;
        });

        console.log(`Found ${suitable.length} suitable words.`);

        if (suitable.length < count) {
            console.error('Not enough suitable words found!');
            return [];
        }

        const shuffled = suitable.sort(() => Math.random() - 0.5);

        return shuffled.slice(0, count).map(entry => {
            if (!entry[COL_ARB]) {
                console.warn("WARNING: Selected entry has no arabic translation:", entry);
            }
            return {
                swedish: entry[COL_SWE],
                arabic: entry[COL_ARB]
            };
        });
    }

    function createCards(numPairs) {
        console.log(`Creating cards for ${numPairs} pairs...`);
        const words = getRandomWords(numPairs);

        let cards = [];

        words.forEach((word, i) => {
            cards.push({
                id: `swe-${i}`,
                pairId: i,
                type: 'swedish',
                content: word.swedish
            });
            cards.push({
                id: `arb-${i}`,
                pairId: i,
                type: 'arabic',
                content: word.arabic
            });
        });

        // Shuffle
        cards.sort(() => Math.random() - 0.5);
        console.log(`Successfully created ${cards.length} cards.`);
        return cards;
    }

    // Run the test
    createCards(6);
    createCards(8);
    createCards(12);
    console.log('Test completed successfully.');

} catch (error) {
    console.error('CRITICAL ERROR:', error);
}
