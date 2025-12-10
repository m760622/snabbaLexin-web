const fs = require('fs');

// Read data.js
let dataContent = fs.readFileSync('./data.js', 'utf-8');

// Parse
let dictionaryData;
let prefix = "";
let suffix = "";

if (dataContent.includes('const dictionaryData =')) {
    prefix = "const dictionaryData = ";
    suffix = ";";
    dictionaryData = JSON.parse(dataContent.replace(prefix, '').replace(/;$/, ''));
} else {
    console.error("Could not parse data.js structure.");
    process.exit(1);
}

// 1. FIX ADJECTIVES
console.log("Fixing Adjectives...");
const adjUpdates = {
    "Långvarig": {
        swe: "En långvarig förkylning kan vara mycket tröttsam.",
        arb: "قد تكون النزلة البردية طويلة الأمد مرهقة للغاية."
    },
    "Mållös": {
        swe: "Hon blev helt mållös av förvåning när hon fick beskedet.",
        arb: "أصبحت عاجزة عن الكلام تماماً من شدة الدهشة عندما تلقت الخبر."
    },
    "Målmedveten": {
        swe: "Hon är en mycket målmedveten person som vet vad hon vill.",
        arb: "إنها شخصية حازمة الأهداف وتعرف تماماً ما تريده."
    }
};

let adjFixed = 0;
dictionaryData.forEach(entry => {
    const word = entry[2] ? entry[2].trim() : "";
    if (adjUpdates[word]) {
        console.log(`Updating Adjektiv: ${word}`);
        entry[6] = adjUpdates[word].swe;
        entry[7] = adjUpdates[word].arb;
        adjFixed++;
    }
});
console.log(`✅ Fixed ${adjFixed} adjectives.`);


// 2. AUDIT ADVERBS
console.log("\nAuditing Adverbs...");
const ADV_CATEGORY = "Adverb.";
let advIssues = [];
const PLACEHOLDER_PATTERN = /används ofta/i;

dictionaryData.forEach(e => {
    if (e[1] && e[1].trim() === ADV_CATEGORY) {
        const word = e[2];
        const exSwe = e[6] || "";
        const exArb = e[7] || "";

        if (!exSwe || exSwe.trim() === "") {
            if (advIssues.length < 50) advIssues.push({ word, reason: "MISSING" });
        } else if (PLACEHOLDER_PATTERN.test(exSwe) || PLACEHOLDER_PATTERN.test(exArb)) {
            if (advIssues.length < 50) advIssues.push({ word, reason: "PLACEHOLDER" });
        } else if (exSwe.length < 10) {
            if (advIssues.length < 50) advIssues.push({ word, reason: "SHORT", ex: exSwe });
        }
    }
});

console.log(`Found ${advIssues.length} issues in Adverbs.`);
advIssues.forEach(item => {
    console.log(`[${item.reason}] ${item.word} ("${item.ex || ''}")`);
});


// Write back fixes
const newContent = prefix + JSON.stringify(dictionaryData, null, 2) + suffix;
fs.writeFileSync('./data.js', newContent, 'utf-8');
