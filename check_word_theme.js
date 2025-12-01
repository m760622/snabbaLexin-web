const fs = require('fs');

const LEXIN_PATH = 'Lexin20210201.csv';
const content = fs.readFileSync(LEXIN_PATH, 'utf8');
const lines = content.split('\n');

const wordToCheck = "LUGN";
const themeKeywords = ["mat", "äta", "dryck", "smak", "koka", "steka", "restaurang", "kök", "frukt", "grönsak", "bröd", "vatten", "kaffe", "te", "lunch", "middag", "frukost", "hungrig", "mätt", "recept", "skål", "tallrik", "glas", "kopp", "äpple", "banan", "bär", "kaka", "tårta", "glass", "ost", "smör", "mjölk", "kött", "fisk", "kyckling", "krydda", "salt", "socker", "peppar"];

console.log(`Checking why '${wordToCheck}' matched Food theme...`);

for (const line of lines) {
    if (line.toLowerCase().includes('lugn')) {
        console.log("\nFound Entry:");
        console.log(line);

        const lowerLine = line.toLowerCase();
        const matches = themeKeywords.filter(k => {
            // Use the same regex logic as the generator
            const suffixes = "(?:en|et|ar|er|na|a|s|an|on|or|erna|arna|t|de|r|te|dd|tt)?";
            const regex = new RegExp(`(?<![A-ZÅÄÖ])${k}${suffixes}(?![A-ZÅÄÖ])`, 'i');
            return regex.test(lowerLine);
        });

        if (matches.length > 0) {
            console.log(`\nMatched Keywords: ${matches.join(', ')}`);
        } else {
            console.log("\nNo keywords matched in this line.");
        }
    }
}
