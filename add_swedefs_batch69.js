
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
console.log("Reading data.js...");
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch69.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

console.log("Requiring temp file...");
const dictionaryData = require(tempFile);

const updates = {
    "Lexin008516": "Känsla av att man fryser mycket (vid feber)",
    "Lexin008530": "Som man är rädd för (t.ex. sjukdom)",
    "Lexin008576": "Prickar i ansiktet (pigment)",
    "Lexin008590": "Saker som inte ska vara i kroppen (t.ex. en kula)",
    "Lexin008592": "Ämnen som inte hör hemma i kroppen (droger/gifter)",
    "Lexin008594": "Bågar som syns i halsen",
    "Lexin008595": "Delar av ryggmärgen som styr muskler",
    "Lexin008597": "På framsidan och långt ner",
    "Lexin008598": "Rummet mellan hornhinnan och linsen i ögat",
    "Lexin008614": "Skador av syra eller lut",
    "Lexin008620": "Pollen",
    "Lexin008631": "Hur fuktigt det är",
    "Lexin008648": "Avslutad",
    "Lexin008655": "Tillräckligt bra",
    "Lexin008656": "Graviditet som gått hela tiden (40 veckor)",
    "Lexin008704": "Tarmvred där tarmen står stilla (paralys)",
    "Lexin008705": "Symtom utan fel på nerverna (psykiskt/stress)",
    "Lexin008706": "När en kroppsdel tappar sin funktion",
    "Lexin008707": "Fungerar som den ska",
    "Lexin008714": "När något inte fungerar som det ska",
    "Lexin008735": "Stora finnar eller bölder",
    "Lexin008781": "Läran om energi och materia",
    "Lexin008784": "Läran om hur kroppen fungerar",
    "Lexin008789": "Trötthet i kroppen (inte huvudet)",
    "Lexin008790": "Att röra på sig",
    "Lexin008795": "Motion",
    "Lexin008821": "Att man inte pratar mycket (t.ex. vid depression)",
    "Lexin008827": "Dike (t.ex. i hjärnan)",
    "Lexin008845": "Sjunka till botten",
    "Lexin008875": "Antikroppar man fått (passiv immunitet)",
    "Lexin008883": "Klar",
    "Lexin008890": "Synintryck (röd, blå, grön)",
    "Lexin008896": "Att inte se skillnad på rött och grönt",
    "Lexin008912": "Som sitter fast",
    "Lexin008917": "Små spindeldjur som suger blod",
    "Lexin008928": "Märke på huden man föds med",
    "Lexin008931": "Förloppet när barnet föds",
    "Lexin008936": "Mamman som föder",
    "Lexin008937": "Att äta",
    "Lexin008938": "Mat",
    "Lexin008940": "Allergi mot mat (t.ex. nötter/mjölk)",
    "Lexin008941": "När många blir sjuka av dålig mat",
    "Lexin008983": "Ge gener vidare till barn",
    "Lexin009011": "Skydd över sår",
    "Lexin009025": "Göra redo",
    "Lexin009042": "Koppling",
    "Lexin009069": "När kroppen gör av med energi",
    "Lexin009072": "Avgaser från cellerna (koldioxid och vatten)",
    "Lexin009092": "Grop",
    "Lexin009098": "När benbrottet läker långsamt",
    "Lexin009099": "När effekten kommer senare",
    "Lexin009114": "Profylaktisk",
    "Lexin009115": "Behandling för att inte bli sjuk",
    "Lexin009116": "Vård för att hålla folk friska (vaccin m.m.)",
    "Lexin009118": "För att hindra sjukdom",
    "Lexin009152": "Ihopkopplad",
    "Lexin009218": "Helst",
    "Lexin009272": "När man fått i sig gift",
    "Lexin009273": "Att vara förgiftad (intoxikation)",
    "Lexin009277": "Delar upp sig i grenar (t.ex. blodkärl)",
    "Lexin009312": "När huden blir hård (förhårdnad)",
    "Lexin009318": "Situationen",
    "Lexin009323": "När mjuk vävnad blir hård (ärr)",
    "Lexin009324": "Hård hud (t.ex. på hälen)",
    "Lexin009326": "Höga fetter i blodet (risk för hjärtat)",
    "Lexin009328": "Högt kolesterol",
    "Lexin009330": "Hypertoni",
    "Lexin009378": "Hosta man får vid förkylning",
    "Lexin009389": "När ena halvan av ansiktet hänger",
    "Lexin009390": "När man inte kan röra musklerna",
    "Lexin009403": "Hur sjukdomen utvecklas över tid",
    "Lexin009409": "När barnet kommer ut",
    "Lexin009410": "Själva födandet",
    "Lexin009411": "Vägen ut för barnet (slidan)",
    "Lexin009412": "Smärtan när livmodern drar ihop sig",
    "Lexin009430": "Del av hjärnstammen (styr andning)",
    "Lexin009438": "Pågå",
    "Lexin009447": "Skickar vidare",
    "Lexin009466": "Kunna göra något",
    "Lexin009491": "Känslor (syn, hörsel, känsel)",
    "Lexin009496": "Byts ut till nytt",
    "Lexin009518": "Mat med bakterier i",
    "Lexin009520": "Smutsig (ej ren)",
    "Lexin009524": "Leda till",
    "Lexin009552": "Lurig (om sjukdom som inte syns)",
    "Lexin009562": "Ge",
    "Lexin009563": "Har fått",
    "Lexin009586": "Ändrar läge",
    "Lexin009599": "Medicin man får på recept",
    "Lexin009607": "När muskler blir svaga och slappa",
    "Lexin009630": "Viktigast",
    "Lexin009648": "Stora ögon (vid struma)",
    "Lexin009651": "När något blir större",
    "Lexin009682": "När man blir svagare",
    "Lexin009694": "Sätt att skydda sig psykiskt (t.ex. förnekelse)",
    "Lexin009733": "Nervskada (ofta i fötterna)",
    "Lexin009737": "Att bli sämre",
    "Lexin009778": "Blir tjockare",
    "Lexin009806": "Trångt ställe (stenos)",
    "Lexin009807": "Trycks bort (om minnen)"
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
