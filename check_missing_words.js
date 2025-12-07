/**
 * FIND ALL REMAINING MISSING WORDS
 * Check all batch files for words that still don't exist in the dictionary
 */

const fs = require('fs');

// Read dictionary
const dataContent = fs.readFileSync('./data.js', 'utf-8');
let dictionaryData;
try {
    dictionaryData = JSON.parse(dataContent.replace('const dictionaryData = ', '').replace(/;$/, ''));
} catch (e) {
    const match = dataContent.match(/(?:const|var|let)\s+dictionaryData\s*=\s*([\s\S]*?);/);
    dictionaryData = eval(match[1]);
}

// Create set of existing words
const existingWords = new Set(dictionaryData.map(e => (e[2] || '').toLowerCase()));

console.log('═══════════════════════════════════════════════════════════════');
console.log('     CHECKING FOR REMAINING MISSING WORDS');
console.log('═══════════════════════════════════════════════════════════════\n');
console.log('Dictionary size: ' + dictionaryData.length + ' entries\n');

// List of all words we tried to add examples to
const testedWords = [
    // From batch 4
    "Fjärrkontroll", "Bord", "Stol", "Säng", "Soffa", "Lampa", "Spegel", "Gardin",
    "Matta", "Kudde", "Täcke", "Lakan", "Handduk", "Tvål", "Tandborste", "Tandkräm",
    "Kam", "Sax", "Nål", "Knapp", "Nyckel", "Lås", "Klocka", "Väckarklocka", "Telefon",
    "Kniv", "Gaffel", "Sked", "Tallrik", "Skål", "Kopp", "Glas", "Flaska", "Burk",
    "Kastrull", "Stekpanna", "Ugn", "Mikrovågsugn", "Kylskåp", "Frys", "Diskmaskin",
    "Tvättmaskin", "Dammsugare", "Rum", "Kök", "Badrum", "Sovrum", "Vardagsrum",
    "Hall", "Balkong", "Garage", "Källare", "Vind", "Trappa", "Hiss", "Dörr", "Fönster",
    "Vägg", "Golv", "Tak", "Sol", "Måne", "Stjärna", "Himmel", "Moln", "Regn", "Snö",
    "Is", "Storm", "Åska", "Blixt", "Regnbåge", "Träd", "Löv", "Blomma", "Gräs",
    "Buske", "Sten", "Sand", "Jord", "Hund", "Katt", "Häst", "Ko", "Gris", "Höna",
    "Tupp", "Anka", "Fågel", "Fisk", "Björn", "Varg", "Räv", "Hare", "Mus", "Orm",
    "Groda", "Fjäril", "Bi", "Myra", "Spindel",
    // From batch 5
    "Dag", "Kväll", "Morgon", "Natt", "Vecka", "Månad", "År", "Timme", "Minut",
    "Sekund", "Vår", "Sommar", "Höst", "Vinter", "Måndag", "Tisdag", "Onsdag",
    "Torsdag", "Fredag", "Lördag", "Söndag", "Lärare", "Läkare", "Sjuksköterska",
    "Polis", "Ingenjör", "Advokat", "Kock", "Frisör", "Författare", "Journalist",
    "Fotograf", "Målare", "Snickare", "Elektriker", "Bonde", "Pilot", "Kassör",
    "Städare", "Skola", "Universitet", "Lektion", "Prov", "Läxa", "Penna", "Papper",
    "Suddgummi", "Linjal", "Väska", "Elev", "Student", "Klass", "Betyg", "Ämne",
    "Matematik", "Historia", "Geografi", "Glad", "Ledsen", "Arg", "Trött", "Hungrig",
    "Törstig", "Sjuk", "Frisk", "Lycklig", "Orolig", "Nervös", "Lugn", "Förvånad",
    "Besviken", "Stolt", "Generad", "Avundsjuk", "Tacksam", "Ensam", "Uttråkad",
    "Ny", "Gammal", "Ung", "Stor", "Liten", "Lång", "Kort", "Tjock", "Tunn",
    "Snabb", "Långsam", "Varm", "Kall", "Het", "Sval", "Mjuk", "Hård", "Lätt",
    "Tung", "Billig", "Dyr", "Fin", "Ful", "Smart", "Dum", "Rolig", "Tråkig",
    "Intressant", "Svår", "Enkel", "Viktig", "Farlig", "Möjlig", "Omöjlig", "Nödvändig",
    // Rakt, Hälften need to be checked
    "Rakt", "Hälften", "Vänster", "Anagrammatisk", "Aritmetik", "Arkitektonisk",
    "Elvisp", "Automatik", "Avslut", "Avstängning", "Avtryck", "Anlöpning",
    "Antiseptika", "Arbetsbelastning", "Ambassador", "Altruism"
];

let missing = [];
let found = 0;

for (const word of testedWords) {
    if (existingWords.has(word.toLowerCase())) {
        found++;
    } else {
        missing.push(word);
        console.log('❌ Still missing: ' + word);
    }
}

console.log('\n═══════════════════════════════════════════════════════════════');
console.log('📊 Results:');
console.log('   ✅ Found in dictionary: ' + found);
console.log('   ❌ Still missing: ' + missing.length);
console.log('═══════════════════════════════════════════════════════════════');

if (missing.length > 0) {
    console.log('\nMissing words list:');
    console.log(JSON.stringify(missing, null, 2));
}
