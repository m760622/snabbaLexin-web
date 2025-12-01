const fs = require('fs');

const generatorPath = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/generate_advanced_levels.js';
const content = fs.readFileSync(generatorPath, 'utf8');

// Extract the ADVANCED_THEMES object
const match = content.match(/const ADVANCED_THEMES = ({[\s\S]*?});/);
if (!match) {
    console.error("Could not find ADVANCED_THEMES object.");
    process.exit(1);
}

let themes;
try {
    eval('themes = ' + match[1]);
} catch (e) {
    console.error("Error parsing themes:", e);
    process.exit(1);
}

const wordMap = {};
const duplicates = [];

Object.keys(themes).forEach(chapter => {
    const levels = themes[chapter];
    levels.forEach((level, index) => {
        const levelId = `${chapter}-${index + 1}`;
        level.targets.forEach(word => {
            if (wordMap[word]) {
                duplicates.push({
                    word: word,
                    locations: [wordMap[word], levelId]
                });
                // Keep tracking all locations
                wordMap[word] = wordMap[word] + ", " + levelId;
            } else {
                wordMap[word] = levelId;
            }
        });
    });
});

if (duplicates.length > 0) {
    console.log("Found duplicate words:");
    duplicates.forEach(d => {
        console.log(`- "${d.word}" appears in: ${d.locations.join(' and ')}`); // Note: this logic is slightly flawed for >2 occurrences but sufficient for detection
    });
    console.log(`Total duplicates found: ${duplicates.length}`);
} else {
    console.log("No duplicate words found across levels.");
}
