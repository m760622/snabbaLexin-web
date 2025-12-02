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

const shortSentences = [];

Object.keys(themes).forEach(chapter => {
    const levels = themes[chapter];
    levels.forEach((level, index) => {
        const levelId = `${chapter}-${index + 1}`;
        Object.keys(level.data).forEach(word => {
            const entry = level.data[word];
            if (entry && entry.s) {
                const wordCount = entry.s.trim().split(/\s+/).length;
                if (wordCount < 4) {
                    shortSentences.push({
                        word: word,
                        sentence: entry.s,
                        level: levelId
                    });
                }
            }
        });
    });
});

if (shortSentences.length > 0) {
    console.log("Found the following sentences with fewer than 4 words:");
    shortSentences.forEach(item => {
        console.log(`- [${item.level}] ${item.word}: "${item.sentence}"`);
    });
    console.log(`Total: ${shortSentences.length}`);
} else {
    console.log("No sentences with fewer than 4 words found.");
}
