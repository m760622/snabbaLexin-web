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

const shortWords = [];

Object.keys(themes).forEach(chapter => {
    const levels = themes[chapter];
    levels.forEach((level, index) => {
        const levelId = `${chapter}-${index + 1}`;
        level.targets.forEach(word => {
            if (word.length < 3) {
                shortWords.push({
                    word: word,
                    level: levelId
                });
            }
        });
    });
});

if (shortWords.length > 0) {
    console.log("Found the following words with fewer than 3 letters:");
    shortWords.forEach(item => {
        console.log(`- [${item.level}] ${item.word}`);
    });
    console.log(`Total: ${shortWords.length}`);
} else {
    console.log("No words with fewer than 3 letters found.");
}
