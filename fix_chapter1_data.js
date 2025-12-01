const fs = require('fs');

const dataFilePath = '/Users/mohammedabunada/Documents/Vipe/snabbaLexin/wordConnectData.js';
let fileContent = fs.readFileSync(dataFilePath, 'utf8');

// 1. Define New Words
const newWords = [
    { w: "OST", t: "جبن", s: "Jag älskar ost.", st: "أنا أحب الجبن." },
    { w: "LÖK", t: "بصل", s: "Hacka lök.", st: "افرم البصل." },
    { w: "BÄR", t: "توت", s: "Plocka bär i skogen.", st: "قطف التوت في الغابة." },
    { w: "KAKA", t: "كعكة", s: "En söt kaka.", st: "كعكة حلوة." },
    { w: "FISK", t: "سمك", s: "Fisk simmar i vattnet.", st: "السمك يسبح في الماء." },
    { w: "KORV", t: "سجق", s: "Grilla korv.", st: "شوي السجق." },
    { w: "GLASS", t: "آيس كريم", s: "Glass är gott på sommaren.", st: "الآيس كريم لذيذ في الصيف." },
    { w: "TE", t: "شاي", s: "Vill du ha te?", st: "هل تريد شاي؟" },
    { w: "KOCK", t: "طاهي", s: "Kocken lagar mat.", st: "الطاهي يطبخ الطعام." },
    { w: "SÅS", t: "صلصة", s: "Sås till köttet.", st: "صلصة للحم." }
];

// 2. Define New Levels
const newLevels = {
    "1-1": { letters: ["M", "A", "T"], words: ["MAT", "TA"], validWords: ["MAT", "TA"] },
    "1-2": { letters: ["T", "E"], words: ["TE"], validWords: ["TE"] }, // Very simple
    "1-3": { letters: ["O", "S", "T"], words: ["OST", "OS"], validWords: ["OST", "OS"] },
    "1-4": { letters: ["L", "Ö", "K"], words: ["LÖK", "KÖ"], validWords: ["LÖK", "KÖ"] },
    "1-5": { letters: ["B", "Ä", "R"], words: ["BÄR", "ÄR"], validWords: ["BÄR", "ÄR"] },
    "1-6": { letters: ["S", "Å", "S"], words: ["SÅS", "SÅ"], validWords: ["SÅS", "SÅ"] },
    "1-7": { letters: ["F", "I", "S", "K"], words: ["FISK", "IS"], validWords: ["FISK", "IS", "SI"] },
    "1-8": { letters: ["K", "O", "R", "V"], words: ["KORV", "KO"], validWords: ["KORV", "KO", "RO"] },
    "1-9": { letters: ["B", "R", "Ö", "D"], words: ["BRÖD", "RÖD"], validWords: ["BRÖD", "RÖD", "DÖ"] },
    "1-10": { letters: ["G", "L", "A", "S", "S"], words: ["GLASS", "GLAS", "SAL"], validWords: ["GLASS", "GLAS", "SAL", "AS", "GAS", "LAG"] }
};

// 3. Update WC_DICTIONARY
// Find the end of the dictionary array
const dictEndRegex = /(const WC_DICTIONARY = \[[\s\S]*?)(\]\s*;)/;
const match = fileContent.match(dictEndRegex);

if (match) {
    const existingDict = match[1];
    const closing = match[2];

    // Check if words already exist to avoid duplicates
    const existingWords = new Set();
    const wMatch = existingDict.match(/"w":\s*"([^"]+)"/g);
    if (wMatch) {
        wMatch.forEach(m => existingWords.add(m.match(/"w":\s*"([^"]+)"/)[1]));
    }

    let wordsToAddStr = "";
    newWords.forEach(word => {
        if (!existingWords.has(word.w)) {
            wordsToAddStr += `,\n    {\n        "w": "${word.w}",\n        "t": "${word.t}",\n        "s": "${word.s}",\n        "st": "${word.st}"\n    }`;
        }
    });

    const newDictSection = existingDict + wordsToAddStr + closing;
    fileContent = fileContent.replace(dictEndRegex, newDictSection);
} else {
    console.error("Could not find WC_DICTIONARY");
    process.exit(1);
}

// 4. Update WC_PREDEFINED_LEVELS
// We need to replace the Chapter 1 section.
// Regex to find "1-1": ... up to "1-10": ...
// This is tricky because of formatting.
// Better to replace line by line or use a marker.

// Let's replace the specific lines for 1-1 to 1-10
for (let i = 1; i <= 10; i++) {
    const key = `1-${i}`;
    const levelData = newLevels[key];
    const replacement = `    "${key}": { letters: ${JSON.stringify(levelData.letters)}, words: ${JSON.stringify(levelData.words)}, validWords: ${JSON.stringify(levelData.validWords)} },`;

    const regex = new RegExp(`\\s*"${key}":\\s*\\{.*\\},?`);
    if (regex.test(fileContent)) {
        fileContent = fileContent.replace(regex, "\n" + replacement);
    } else {
        console.warn(`Could not find level ${key} to replace`);
    }
}

fs.writeFileSync(dataFilePath, fileContent);
console.log("Successfully updated Chapter 1 levels and dictionary.");
