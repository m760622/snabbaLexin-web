const fs = require('fs');

const generatorPath = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/generate_advanced_levels.js';
let content = fs.readFileSync(generatorPath, 'utf8');

// Define the BEST version for each duplicate word
const bestVersions = {
    "SILA": { t: "يصفي", s: "Sila mygg och svälja kameler.", st: "يصفي البعوض ويبتلع الجمال (مثل)." },
    "ROT": { t: "جذر", s: "Kärleken är roten till allt gott.", st: "الحب هو جذر كل خير." },
    "TRO": { t: "إيمان", s: "Tro kan försätta berg.", st: "الإيمان يمكنه نقل الجبال." },
    "MOS": { t: "هريس", s: "Jag vill ha korv med mos.", st: "أريد سجقاً مع الهريس." }
};

// Replace ALL occurrences of these words with the BEST version
for (const [word, data] of Object.entries(bestVersions)) {
    // Regex to match any definition of this word
    // Matches: "WORD": { t: "...", s: "...", st: "..." }
    const regex = new RegExp(`"${word}": \\{ t: "[^"]+", s: "[^"]+", st: "[^"]+" \\}`, 'g');

    const replacement = `"${word}": { t: "${data.t}", s: "${data.s}", st: "${data.st}" }`;

    content = content.replace(regex, replacement);
}

fs.writeFileSync(generatorPath, content);
console.log("Globally fixed duplicate word collisions in generate_advanced_levels.js");
