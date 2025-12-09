/**
 * Add Swedish definitions for words missing them
 */

const fs = require('fs');

const dataContent = fs.readFileSync('./data.js', 'utf-8');
let dictionaryData;
try {
    dictionaryData = JSON.parse(dataContent.replace('const dictionaryData = ', '').replace(/;$/, ''));
} catch (e) {
    const match = dataContent.match(/(?:const|var|let)\s+dictionaryData\s*=\s*(\[[\s\S]*?\]);/);
    dictionaryData = eval(match[1]);
}

const COL_SWE = 2;
const COL_SWE_DEF = 4;

// Swedish definitions for the 24 words
const definitions = {
    "Fjärrkontroll": "en apparat som används för att styra elektroniska apparater på avstånd",
    "Busschaufför": "en person som kör buss",
    "Brandman": "en person som arbetar med att släcka bränder och rädda liv",
    "Tågstation": "en plats där tåg stannar för att ta upp och släppa av passagerare",
    "Nödutgång": "en utgång som används vid nödsituationer som brand eller fara",
    "Häftapparat": "ett verktyg som används för att fästa papper ihop med häftklamrar",
    "Anteckningsbok": "en bok med tomma sidor för att skriva anteckningar",
    "Värktablett": "en medicin som lindrar smärta",
    "Översvämning": "när vatten täcker ett område som vanligtvis är torrt",
    "Öl": "en alkoholhaltig dryck som bryggs av malt och humle",
    "Skidåkning": "aktiviteten att åka skidor på snö",
    "Klär sig": "att ta på sig kläder",
    "Tvättar sig": "att rengöra sin kropp med vatten och tvål",
    "Snyter sig": "att blåsa näsan i en näsduk",
    "Kommer ihåg": "att minnas något från förr",
    "Ber om ursäkt": "att uttrycka att man är ledsen för något man gjort",
    "Skridskoåkning": "aktiviteten att åka skridskor på is",
    "Trädgårdsarbete": "arbete som utförs i en trädgård, som att plantera och sköta växter",
    "Överraskad": "förvånad över något oväntat",
    "Förväntansfull": "ivrig och spänd inför något som ska hända",
    "Besvärad": "orolig eller störd av något",
    "Hälften": "en av två lika delar av något",
    "Anlöpning": "imma som bildas på en yta när varm luft möter en kall yta",
    "Ambassador": "en diplomat som representerar sitt land i ett annat land"
};

let updatedCount = 0;

dictionaryData.forEach((entry) => {
    const word = entry[COL_SWE];
    const sweDef = entry[COL_SWE_DEF] || '';

    if (!sweDef.trim() && definitions[word]) {
        entry[COL_SWE_DEF] = definitions[word];
        updatedCount++;
        console.log(`✅ Updated: ${word}`);
    }
});

// Write back to data.js
const output = 'const dictionaryData = ' + JSON.stringify(dictionaryData, null, 2) + ';';
fs.writeFileSync('./data.js', output);

console.log(`\n📊 تم تحديث ${updatedCount} كلمة`);
console.log('✅ تم حفظ التغييرات في data.js');
