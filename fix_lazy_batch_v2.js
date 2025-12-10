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
    process.exit(1);
}

const LAZY_PATTERN = /är viktigt/i;

const CAT_MAP = {
    "Medicin.": { sv: "medicin", ar: "الطب" },
    "MedicinMN.": { sv: "medicin", ar: "الطب" },
    "MedicinMR.": { sv: "medicin", ar: "الطب" },
    "MedicinTB.": { sv: "medicin", ar: "الطب" },
    "MedicinR.": { sv: "medicin", ar: "الطب" },

    "Juridik.": { sv: "juridik", ar: "القانون" },
    "JuridikS.": { sv: "juridik", ar: "القانون" },
    "JuridikTB.": { sv: "juridik", ar: "القانون" },
    "JuridikR.": { sv: "juridik", ar: "القانون" },
    "JuridikMN.": { sv: "juridik", ar: "القانون" },

    "Bygg.": { sv: "byggbranschen", ar: "البناء" },
    "Tandvård.": { sv: "tandvård", ar: "طب الأسنان" },
    "Militär.": { sv: "militären", ar: "العسكرية" },
    "Religion.": { sv: "religion", ar: "الدين" },
    "Ekobrott": { sv: "juridik", ar: "القانون" },
    "Samhälle.": { sv: "samhällskunskap", ar: "العلوم الاجتماعية" },
    "SamhälleTB.": { sv: "samhällskunskap", ar: "العلوم الاجتماعية" },
    "SamhälleR.": { sv: "samhällskunskap", ar: "العلوم الاجتماعية" },
    "SamhälleMN.": { sv: "samhällskunskap", ar: "العلوم الاجتماعية" },
};

let stats = {
    replaced: 0,
    cleared: 0,
    skipped: 0
};

dictionaryData.forEach(e => {
    const word = e[2];
    const type = e[1] ? e[1].trim() : "";

    // Check both columns 6 and 7
    [6, 7].forEach(idx => {
        let exSwe = e[idx] || "";
        // Safety check: pattern match AND short length to ensure it's a template
        if (LAZY_PATTERN.test(exSwe) && exSwe.length < word.length + 25) {

            // Determine action based on category
            if (CAT_MAP[type]) {
                // Technical -> Replace with "Term" sentence
                const map = CAT_MAP[type];
                e[idx] = `${word} är en term inom ${map.sv}.`;
                // If the next column is Arabic example, update it too
                if (idx === 7 && e[8]) {
                    // e[8] is likely "Word important." in Arabic. Replace it.
                    // But we should verify. Usually e[idx+1] is translation.
                    // Let's assume standard structure: ExSwe is idx, ExArb is idx+1.
                    e[idx + 1] = `${word} هو مصطلح في ${map.ar}.`;
                } else if (idx === 6 && e[7]) {
                    e[idx + 1] = `${word} هو مصطلح في ${map.ar}.`;
                }
                stats.replaced++;
            } else {
                // General (Substantiv) -> Clear it
                e[idx] = "";
                if (idx === 7 && e[8]) e[idx + 1] = "";
                else if (idx === 6 && e[7]) e[idx + 1] = "";
                stats.cleared++;
            }
        }
    });
});

console.log(`\nExecution Complete.`);
console.log(`Replaced (Technical): ${stats.replaced}`);
console.log(`Cleared (General): ${stats.cleared}`);

// Write back
const newContent = prefix + JSON.stringify(dictionaryData, null, 2) + suffix;
fs.writeFileSync('./data.js', newContent, 'utf-8');
