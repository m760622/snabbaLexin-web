// Script to find entries with Swedish | Arabic pattern
const fs = require('fs');

let content = fs.readFileSync('data.js', 'utf8');
const match = content.match(/const dictionaryData = (\[[\s\S]*\]);/);
let data = eval(match[1]);

const arabicRegex = /[\u0600-\u06FF]/;
const latinRegex = /[a-zA-ZåäöÅÄÖ]/;

let results = [];

data.forEach((entry, idx) => {
    // Check all fields
    entry.forEach((field, fieldIdx) => {
        if (typeof field === 'string' && field.includes(' | ')) {
            const parts = field.split(' | ');
            if (parts.length === 2) {
                const part1 = parts[0].trim();
                const part2 = parts[1].trim();

                // Check if one part is Swedish (Latin) and other is Arabic
                const part1Latin = latinRegex.test(part1) && !arabicRegex.test(part1);
                const part1Arabic = arabicRegex.test(part1) && !latinRegex.test(part1);
                const part2Latin = latinRegex.test(part2) && !arabicRegex.test(part2);
                const part2Arabic = arabicRegex.test(part2) && !latinRegex.test(part2);

                // Swedish | Arabic OR Arabic | Swedish
                if ((part1Latin && part2Arabic) || (part1Arabic && part2Latin)) {
                    results.push({
                        word: entry[2],
                        fieldIdx,
                        value: field,
                        pattern: part1Latin ? 'Swedish | Arabic' : 'Arabic | Swedish'
                    });
                }
            }
        }
    });
});

console.log(`Found ${results.length} entries with Swedish | Arabic pattern:\n`);

results.slice(0, 30).forEach(r => {
    console.log(`[Field ${r.fieldIdx}] ${r.word}:`);
    console.log(`  Pattern: ${r.pattern}`);
    console.log(`  Value: "${r.value.substring(0, 120)}..."\n`);
});

if (results.length > 30) {
    console.log(`... and ${results.length - 30} more`);
}
