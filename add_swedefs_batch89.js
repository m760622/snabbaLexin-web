const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, 'data.js');
let fileContent = fs.readFileSync(dataPath, 'utf8');
const tempFile = path.join(__dirname, 'temp_update_defs_batch89.js');
fs.writeFileSync(tempFile, fileContent.replace('const dictionaryData =', 'module.exports ='));
const dictionaryData = require(tempFile);

const updates = {
    "Lexin027401": "Få bästa möjliga resultat",
    "Lexin027402": "Medicin för sömn",
    "Lexin027403": "Svårigheter att sova",
    "Lexin027404": "Sjö med sötvatten",
    "Lexin027405": "Ta fäste i tunntarmen",
    "Lexin027406": "Ta sig in genom huden",
    "Lexin027407": "Tappar och stavar",
    "Lexin027408": "Tapparna i ögat",
    "Lexin027409": "Ta hela kuren",
    "Lexin027410": "Tarmen",
    "Lexin027411": "Testet",
    "Lexin027412": "Tillfällig tinnitus",
    "Lexin027413": "Giftigt utslag",
    "Lexin027414": "Tredagarsfeber",
    "Lexin027415": "Trumhinnan fick hål",
    "Lexin027416": "Trumhinnan är röd",
    "Lexin027417": "Tvina",
    "Lexin027418": "Tyna bort",
    "Lexin027419": "Tyst miljö",
    "Lexin027420": "Underlätta vardagen"
};

let count = 0;
dictionaryData.forEach(entry => { if (updates[entry[0]]) { entry[5] = updates[entry[0]]; count++; } });
console.log(`Updated ${count} entries.`);
fs.writeFileSync(dataPath, `const dictionaryData = ${JSON.stringify(dictionaryData, null, 2)};`, 'utf8');
fs.unlinkSync(tempFile);
console.log("Done batch 89.");
