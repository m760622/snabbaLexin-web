const fs = require('fs');

const DATA_FILE = 'wordConnectData.js';

try {
    const content = fs.readFileSync(DATA_FILE, 'utf8');

    // Extract dictionary
    const dictMatch = content.match(/const WC_DICTIONARY = \[\s*([\s\S]*?)\];/);
    if (!dictMatch) {
        console.error("Could not find WC_DICTIONARY in data file.");
        process.exit(1);
    }

    const dictContent = dictMatch[1];
    const entries = [];

    // Parse entries roughly
    const lines = dictContent.split('\n');
    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith('{')) continue;

        // Extract fields
        const wMatch = trimmed.match(/w:\s*"([^"]+)"/);
        const sMatch = trimmed.match(/s:\s*"([^"]+)"/);
        const tMatch = trimmed.match(/t:\s*"([^"]+)"/); // Arabic translation of word
        const stMatch = trimmed.match(/st:\s*"([^"]+)"/); // Arabic translation of sentence

        if (wMatch && sMatch) {
            entries.push({
                w: wMatch[1],
                s: sMatch[1],
                t: tMatch ? tMatch[1] : "",
                st: stMatch ? stMatch[1] : ""
            });
        }
    }

    console.log(`Total words in dictionary: ${entries.length}`);

    const longSentences = entries.filter(e => {
        const wordCount = e.s.split(/\s+/).filter(w => w.length > 0).length;
        return wordCount > 5;
    });

    console.log(`\nFound ${longSentences.length} words with sentences > 5 words:`);
    console.log("============================================================");

    longSentences.forEach(e => {
        const wc = e.s.split(/\s+/).filter(w => w.length > 0).length;
        console.log(`[${e.w}] (${wc} words)`);
        console.log(`  SV: ${e.s}`);
        console.log(`  AR: ${e.st}`);
        console.log("---");
    });

} catch (e) {
    console.error("Error:", e);
}
