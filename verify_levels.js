const fs = require('fs');

const dataFilePath = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/wordConnectData.js';
const fileContent = fs.readFileSync(dataFilePath, 'utf8');

const levelsMatch = fileContent.match(/const WC_PREDEFINED_LEVELS = (\{[\s\S]*?\});/);
if (!levelsMatch) {
    console.error("Could not find WC_PREDEFINED_LEVELS");
    process.exit(1);
}

let levels;
try {
    eval('levels = ' + levelsMatch[1]);
} catch (e) {
    console.error("Error parsing levels:", e);
    process.exit(1);
}

let errorCount = 0;

Object.keys(levels).forEach(levelId => {
    const level = levels[levelId];
    const wheelLetters = level.letters.map(l => l.toUpperCase());

    level.words.forEach(word => {
        const wordLetters = word.toUpperCase().split('');
        const wheelCopy = [...wheelLetters];
        let valid = true;

        for (const char of wordLetters) {
            const index = wheelCopy.indexOf(char);
            if (index === -1) {
                valid = false;
                break;
            }
            wheelCopy.splice(index, 1); // Remove used letter
        }

        if (!valid) {
            console.error(`Error in Level ${levelId}: Word "${word}" cannot be formed from wheel [${wheelLetters.join(', ')}]`);
            errorCount++;
        }
    });
});

if (errorCount === 0) {
    console.log("All levels verified successfully!");
} else {
    console.log(`Found ${errorCount} errors.`);
}
