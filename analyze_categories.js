const fs = require('fs');
const dataContent = fs.readFileSync('./data.js', 'utf-8');
const match = dataContent.match(/(?:const|var|let)\s+dictionaryData\s*=\s*(\[[\s\S]*?\]);/);
const dictionaryData = eval(match[1]);

// Categories to analyze
const categories = {
    partikelverb: { pattern: /partikelverb|verb.*parti/i, entries: [] },
    medical: { pattern: /medicin|läkemedel|sjuk|diagnos|symptom|behandling/i, typePattern: /^Medicin/i, entries: [] },
    legal: { pattern: /juridik|lag\.|rätt|domstol|brott|straff/i, typePattern: /^Juridik/i, entries: [] }
};

// Analyze
for (const entry of dictionaryData) {
    const type = entry[1] || '';
    const swe = entry[2] || '';
    const arb = entry[3] || '';
    const sweDef = entry[5] || '';

    // Skip empty
    if (!swe || !arb) continue;

    // Partikelverb - verbs with particles like "kommer ihåg", "går ut"
    if (type.includes('Verb') && (swe.includes(' ') || sweDef.match(/\bav\b|\bpå\b|\but\b|\bin\b|\bom\b|\bupp\b|\bner\b|\bihåg\b/i))) {
        categories.partikelverb.entries.push({ swe, arb, type, def: sweDef.slice(0, 50) });
    }

    // Medical terms
    if (type.match(/^Medicin/i)) {
        categories.medical.entries.push({ swe, arb, type, def: sweDef.slice(0, 50) });
    }

    // Legal terms
    if (type.match(/^Juridik/i)) {
        categories.legal.entries.push({ swe, arb, type, def: sweDef.slice(0, 50) });
    }
}

console.log('\n📊 CATEGORY ANALYSIS\n' + '='.repeat(50));

// Print stats
console.log('\n📌 Partikelverb (Phrasal Verbs):', categories.partikelverb.entries.length);
console.log('📌 Medical Terms:', categories.medical.entries.length);
console.log('📌 Legal Terms:', categories.legal.entries.length);

// Sample from each category
console.log('\n\n🔵 PARTIKELVERB SAMPLE (15 entries):\n' + '-'.repeat(50));
const pvSample = categories.partikelverb.entries.slice(0, 15);
for (const e of pvSample) {
    console.log(`  ${e.swe} → ${e.arb}`);
    if (e.def) console.log(`     [${e.def}...]`);
}

console.log('\n\n🏥 MEDICAL TERMS SAMPLE (15 entries):\n' + '-'.repeat(50));
const medSample = categories.medical.entries.slice(0, 15);
for (const e of medSample) {
    console.log(`  ${e.swe} → ${e.arb}`);
}

console.log('\n\n⚖️ LEGAL TERMS SAMPLE (15 entries):\n' + '-'.repeat(50));
const legalSample = categories.legal.entries.slice(0, 15);
for (const e of legalSample) {
    console.log(`  ${e.swe} → ${e.arb}`);
}

// Save full data
fs.writeFileSync('./category_analysis.json', JSON.stringify(categories, null, 2));
console.log('\n\n✅ Full data saved to category_analysis.json');
