const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, 'data.js');
let fileContent = fs.readFileSync(dataPath, 'utf8');
const tempFile = path.join(__dirname, 'temp_update_defs_batch96.js');
fs.writeFileSync(tempFile, fileContent.replace('const dictionaryData =', 'module.exports ='));
const dictionaryData = require(tempFile);

const updates = {
  "ADDED200037": "Avbokar",
  "ADDED200038": "Kamuflerar",
  "ADDED200039": "Klonar",
  "ADDED200040": "Maximerar",
  "ADDED200041": "Minimerar",
  "ADDED200042": "Konsumerar",
  "ADDED300000": "Rakt",
  "ADDED300001": "Hälften",
  "ADDED300002": "Anagrammatisk",
  "ADDED300003": "Aritmetik",
  "ADDED300004": "Arkitektonisk",
  "ADDED300005": "Elvisp",
  "ADDED300006": "Automatik",
  "ADDED300007": "Avslut",
  "ADDED300008": "Anlöpning",
  "ADDED300009": "Antiseptika",
  "ADDED300010": "Ambassador",
  "ADDED300011": "Altruism"
};

let count = 0;
dictionaryData.forEach(entry => { if (updates[entry[0]]) { entry[5] = updates[entry[0]]; count++; } });
console.log(`Batch 96: Updated ${count} entries.`);
fs.writeFileSync(dataPath, `const dictionaryData = ${JSON.stringify(dictionaryData, null, 2)};`, 'utf8');
fs.unlinkSync(tempFile);