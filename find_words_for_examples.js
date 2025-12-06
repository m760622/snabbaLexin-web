/**
 * Find common words without examples
 * Prioritizes: Verbs, common nouns, adjectives
 */

const fs = require('fs');
const dataContent = fs.readFileSync('./data.js', 'utf-8');
const match = dataContent.match(/(?:const|var|let)\s+dictionaryData\s*=\s*(\[[\s\S]*?\]);/);
const dictionaryData = eval(match[1]);

// Common Swedish words (high frequency)
const commonWords = new Set([
    // Verbs (most important - 200 most common)
    'är', 'var', 'har', 'hade', 'kan', 'kunde', 'ska', 'skulle', 'vill', 'ville',
    'måste', 'får', 'fick', 'gör', 'gjorde', 'säger', 'sa', 'sade', 'kommer', 'kom',
    'går', 'gick', 'tar', 'tog', 'ser', 'såg', 'ger', 'gav', 'vet', 'visste',
    'tror', 'trodde', 'finns', 'fanns', 'blir', 'blev', 'står', 'stod', 'sitter', 'satt',
    'ligger', 'låg', 'håller', 'höll', 'lägger', 'lade', 'sätter', 'satte', 'börjar', 'började',
    'slutar', 'slutade', 'arbetar', 'arbetade', 'använder', 'använde', 'behöver', 'behövde',
    'tycker', 'tyckte', 'tänker', 'tänkte', 'menar', 'menade', 'känner', 'kände',
    'heter', 'kallas', 'lever', 'levde', 'bor', 'bodde', 'äter', 'åt', 'dricker', 'drack',
    'sover', 'sov', 'vaknar', 'vaknade', 'springer', 'sprang', 'hoppar', 'hoppade',
    'läser', 'läste', 'skriver', 'skrev', 'lyssnar', 'lyssnade', 'tittar', 'tittade',
    'pratar', 'pratade', 'talar', 'talade', 'frågar', 'frågade', 'svarar', 'svarade',
    'betalar', 'betalade', 'köper', 'köpte', 'säljer', 'sålde', 'öppnar', 'öppnade',
    'stänger', 'stängde', 'hjälper', 'hjälpte', 'lär', 'lärde', 'studerar', 'studerade',
    'spelar', 'spelade', 'sjunger', 'sjöng', 'dansar', 'dansade', 'reser', 'reste',
    'kör', 'körde', 'flyger', 'flög', 'simmar', 'simmade', 'cyklar', 'cyklade',
    'träffar', 'träffade', 'möter', 'mötte', 'väntar', 'väntade', 'minns', 'mindes',
    'glömmer', 'glömde', 'förstår', 'förstod', 'lär sig', 'lärde sig',

    // Nouns (200 most common)
    'dag', 'år', 'tid', 'sätt', 'man', 'barn', 'liv', 'land', 'del', 'hem',
    'vatten', 'pengar', 'arbete', 'jobb', 'skola', 'hus', 'rum', 'bil', 'väg', 'stad',
    'kvinna', 'flicka', 'pojke', 'familj', 'vän', 'mor', 'far', 'bror', 'syster', 'fru',
    'mat', 'bröd', 'mjölk', 'kaffe', 'te', 'frukt', 'kött', 'fisk', 'grönsaker',
    'kläder', 'sko', 'byxa', 'skjorta', 'jacka', 'mössa', 'väska', 'nyckel',
    'telefon', 'dator', 'bord', 'stol', 'säng', 'soffa', 'lampa', 'fönster', 'dörr',
    'bok', 'tidning', 'papper', 'penna', 'språk', 'ord', 'brev', 'fråga', 'svar',
    'problem', 'lösning', 'hjälp', 'möte', 'beslut', 'val', 'pris', 'kostnad',
    'läkare', 'lärare', 'polis', 'sjuksköterska', 'chef', 'kollega', 'kund',
    'sjukhus', 'butik', 'bank', 'bibliotek', 'restaurang', 'hotell', 'flygplats',
    'väder', 'sol', 'regn', 'snö', 'vind', 'sommar', 'vinter', 'vår', 'höst',
    'morgon', 'kväll', 'natt', 'vecka', 'månad', 'timme', 'minut',

    // Adjectives (100 most common)  
    'bra', 'dålig', 'stor', 'liten', 'ny', 'gammal', 'ung', 'lång', 'kort', 'hög',
    'låg', 'bred', 'smal', 'tjock', 'tunn', 'tung', 'lätt', 'snabb', 'långsam',
    'varm', 'kall', 'het', 'sval', 'vacker', 'ful', 'ren', 'smutsig', 'ljus', 'mörk',
    'glad', 'ledsen', 'arg', 'rädd', 'trött', 'hungrig', 'törstig', 'sjuk', 'frisk',
    'svår', 'lätt', 'enkel', 'viktig', 'intressant', 'tråkig', 'rolig', 'annorlunda',
    'samma', 'annan', 'egen', 'svensk', 'utländsk', 'gratis', 'billig', 'dyr',
    'öppen', 'stängd', 'full', 'tom', 'klar', 'färdig', 'redo', 'säker', 'farlig'
]);

// Find words without examples
const wordsNeedingExamples = [];

for (let i = 0; i < dictionaryData.length; i++) {
    const entry = dictionaryData[i];
    const swe = (entry[2] || '').trim().toLowerCase();
    const arb = entry[3] || '';
    const exSwe = (entry[7] || '').trim();
    const type = entry[1] || '';

    // Skip if already has example
    if (exSwe) continue;

    // Skip if no Arabic translation
    if (!arb) continue;

    // Prioritize common words and important types
    const isCommon = commonWords.has(swe);
    const isVerb = type.includes('Verb');
    const isNoun = type.includes('Subst');
    const isAdj = type.includes('Adj');

    if (isCommon || isVerb || isNoun || isAdj) {
        wordsNeedingExamples.push({
            index: i,
            id: entry[0],
            swe: entry[2],
            arb: arb,
            type: type,
            isCommon: isCommon,
            priority: isCommon ? 1 : (isVerb ? 2 : (isNoun ? 3 : 4))
        });
    }
}

// Sort by priority
wordsNeedingExamples.sort((a, b) => a.priority - b.priority);

// Take top 2000
const top2000 = wordsNeedingExamples.slice(0, 2000);

console.log(`\n📊 WORDS NEEDING EXAMPLES`);
console.log(`Total found: ${wordsNeedingExamples.length}`);
console.log(`Common words: ${wordsNeedingExamples.filter(w => w.isCommon).length}`);
console.log(`Verbs: ${wordsNeedingExamples.filter(w => w.type.includes('Verb')).length}`);
console.log(`Nouns: ${wordsNeedingExamples.filter(w => w.type.includes('Subst')).length}`);
console.log(`\nTop 20 needing examples:`);

for (const w of top2000.slice(0, 20)) {
    console.log(`  ${w.swe} (${w.type}) → ${w.arb.slice(0, 30)}`);
}

// Save for processing
fs.writeFileSync('./words_needing_examples.json', JSON.stringify(top2000, null, 2));
console.log(`\n✅ Saved ${top2000.length} words to words_needing_examples.json`);
