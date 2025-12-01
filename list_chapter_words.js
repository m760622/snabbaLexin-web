const fs = require('fs');

const DATA_FILE = 'wordConnectData.js';
const content = fs.readFileSync(DATA_FILE, 'utf8');
const match = content.match(/const WC_PREDEFINED_LEVELS = ({[\s\S]*?});/);
const levels = eval('(' + match[1] + ')');

const chapters = {
    1: "Mat & Dryck (Food & Drink)",
    2: "Naturen (Nature)",
    3: "Resor (Travel)",
    4: "Vardag (Daily Life)",
    5: "Kroppen (Body)",
    6: "Kläder (Clothes)",
    7: "Familj (Family)",
    8: "Hus & Hem (House & Home)",
    9: "Stad & Trafik (City & Traffic)",
    10: "Djur (Animals)"
};

console.log("Listing words per chapter...\n");

for (let ch = 1; ch <= 10; ch++) {
    console.log(`=== Chapter ${ch}: ${chapters[ch]} ===`);
    const chapterWords = new Set();
    for (let l = 1; l <= 10; l++) {
        const id = `${ch}-${l}`;
        if (levels[id]) {
            levels[id].words.forEach(w => chapterWords.add(w));
        }
    }
    console.log(Array.from(chapterWords).join(', '));
    console.log("\n");
}
