const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
console.log("Reading data.js...");
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch88.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

console.log("Requiring temp file...");
const dictionaryData = require(tempFile);

const updates = {
    "Lexin024966": "Slemlösande medicin",
    "Lexin025078": "Slutna benbrott",
    "Lexin025123": "Släktingar",
    "Lexin025226": "Smittan överförs genom",
    "Lexin025449": "Snurrar i huvudet",
    "Lexin025518": "Sociala livet",
    "Lexin025605": "Soldaterna",
    "Lexin025647": "Somna om",
    "Lexin025697": "Sova hela natten utan avbrott",
    "Lexin025984": "Mastceller spricker",
    "Lexin026062": "SSRI-läkemedel",
    "Lexin026105": "Infektion med stafylokocker",
    "Lexin026420": "Födelsemärke på nacken",
    "Lexin026633": "Strömmar ut i slemhinnan",
    "Lexin026730": "Stympa liken",
    "Lexin026899": "Ständigt närvarande tinnitus",
    "Lexin026950": "Stör koncentrationsförmågan",
    "Lexin026955": "Störningar i blodcirkulationen",
    "Lexin027033": "Suger blod",
    "Lexin027276": "Svår upplevelse",
    "Lexin027326": "Svårbehandlad",
    "Lexin027327": "Svårbehandlade",
    "Lexin027329": "Svårläkta sår",
    "Lexin027330": "Svälja tabletter",
    "Lexin027331": "Sväljer",
    "Lexin027332": "Svämma över",
    "Lexin027333": "Svämmar över",
    "Lexin027334": "Svårt att andas",
    "Lexin027335": "Svårt att koncentrera sig",
    "Lexin027336": "Svårt att sova",
    "Lexin027337": "Svårt sjuk",
    "Lexin027338": "Svårtolkad",
    "Lexin027339": "Svåruppfattad",
    "Lexin027340": "Svåröverskådlig",
    "Lexin027341": "Svettas",
    "Lexin027342": "Svettas mycket",
    "Lexin027343": "Svettningar",
    "Lexin027344": "Svider",
    "Lexin027345": "Svider i ögonen",
    "Lexin027346": "Svider i halsen",
    "Lexin027347": "Svidande smärta",
    "Lexin027348": "Svimma",
    "Lexin027349": "Svimmar",
    "Lexin027350": "Svimmat",
    "Lexin027351": "Svimning",
    "Lexin027352": "Svindel",
    "Lexin027353": "Svindlar",
    "Lexin027354": "Svullna",
    "Lexin027355": "Svullna leder",
    "Lexin027356": "Svullna ögonlock",
    "Lexin027357": "Svullnad",
    "Lexin027358": "Svullnar",
    "Lexin027359": "Svullnar upp",
    "Lexin027360": "Svullen",
    "Lexin027361": "Svullet",
    "Lexin027362": "Svält",
    "Lexin027363": "Svälter",
    "Lexin027364": "Svämmar",
    "Lexin027365": "Syfilis",
    "Lexin027366": "Syfte",
    "Lexin027367": "Syftar",
    "Lexin027368": "Syftar till",
    "Lexin027369": "Syfte med",
    "Lexin027370": "Sympatisk",
    "Lexin027371": "Sympatiska nervsystemet",
    "Lexin027372": "Symptom",
    "Lexin027373": "Symptom på",
    "Lexin027374": "Symptomfri",
    "Lexin027375": "Symptomfria",
    "Lexin027376": "Symptomfritt",
    "Lexin027377": "Syn",
    "Lexin027378": "Synfel",
    "Lexin027379": "Synfält",
    "Lexin027380": "Synförmåga",
    "Lexin027381": "Synförmågan",
    "Lexin027382": "Synförsämring",
    "Lexin027384": "Synlig",
    "Lexin027385": "Synliga",
    "Lexin027386": "Synligt",
    "Lexin027387": "Synnerv",
    "Lexin027388": "Synnerven",
    "Lexin027389": "Synproblem",
    "Lexin027390": "Synrubbning",
    "Lexin027391": "Synrubbningar",
    "Lexin027392": "Synskada",
    "Lexin027393": "Synskadad",
    "Lexin027394": "Synskadade",
    "Lexin027395": "Synskärpa",
    "Lexin027396": "Synskärpan",
    "Lexin027397": "Synstörning",
    "Lexin027398": "Synstörningar",
    "Lexin027399": "Syntest",
    "Lexin027400": "Synundersökning"
};

let count = 0;
dictionaryData.forEach(entry => {
    if (updates[entry[0]]) {
        entry[5] = updates[entry[0]];
        count++;
    }
});

console.log(`Updated ${count} entries.`);
const newContent = `const dictionaryData = ${JSON.stringify(dictionaryData, null, 2)};`;
console.log("Writing data.js...");
fs.writeFileSync(dataPath, newContent, 'utf8');
fs.unlinkSync(tempFile);
console.log("Done.");
