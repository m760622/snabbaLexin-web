
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
console.log("Reading data.js...");
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch81.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

console.log("Requiring temp file...");
const dictionaryData = require(tempFile);

const updates = {
    "Lexin027948": "Tappa vätska ur magen (ascites)",
    "Lexin027952": "Får inte luft",
    "Lexin027986": "Tunntarm och tjocktarm",
    "Lexin027988": "Små ludd som tar upp näring",
    "Lexin027989": "Slemhinnan i tarmen",
    "Lexin027991": "Tarmarna slutar fungera (akut)",
    "Lexin027992": "Ileus (akut mage)",
    "Lexin028035": "Skriva under ett avtal",
    "Lexin028173": "Manlig könskörtel",
    "Lexin028174": "Testiklarna",
    "Lexin028176": "Manligt könshormon",
    "Lexin028260": "Krymper tillbaka",
    "Lexin028404": "Myndighet som kontrollerar andra",
    "Lexin028410": "Smärta som blir värre",
    "Lexin028442": "Att växa",
    "Lexin028443": "GH (tillväxthormon)",
    "Lexin028484": "Del av hjärnan vid tinningen (hörsel/minne)",
    "Lexin028485": "Ringningar/susningar i öronen",
    "Lexin028513": "Laparoskopi (operation med små hål)",
    "Lexin028515": "Artroskopi (kameraundersökning av led)",
    "Lexin028538": "Kolon",
    "Lexin028539": "Koloncancer",
    "Lexin028628": "Duodenum (första delen av tunntarmen)",
    "Lexin028676": "Kameraundersökning i brösthålan",
    "Lexin028685": "Blev torrt",
    "Lexin028699": "Hosta utan slem",
    "Lexin028795": "Elektrisk smärtlindring",
    "Lexin028801": "Att flytta organ/vävnad (t.ex. njurtransplantation)",
    "Lexin028836": "Skador av olycka/våld",
    "Lexin028862": "Skakningar (vid parkinson)",
    "Lexin028863": "När bebisar skriker mycket i 3 månader",
    "Lexin028999": "Sår pga att man legat för länge (liggsår)",
    "Lexin029055": "Kommer in",
    "Lexin029056": "Trycker ut",
    "Lexin029060": "Pressar sig ut",
    "Lexin029061": "Kissar på sig vid stark trängning",
    "Lexin029120": "Tablett man tuggar",
    "Lexin029143": "Det stora fingret",
    "Lexin029156": "Organ för smakning/tuggning",
    "Lexin029175": "Tarmen där näring tas upp",
    "Lexin029269": "OCD",
    "Lexin029284": "Brott tvärs över benet",
    "Lexin029290": "Skelettmuskulatur (kan styras)",
    "Lexin029330": "Känsla av tyngd (t.ex. i benen)",
    "Lexin029337": "Diabetes typ 1 eller 2",
    "Lexin029434": "Måste kissa ofta",
    "Lexin029435": "Ofta kissnödig",
    "Lexin029453": "Att behöva gå på toaletten",
    "Lexin029478": "Inflammatorisk tarmsjukdom (sår i tjocktarmen)",
    "Lexin029484": "Ultraljud",
    "Lexin029485": "Undersökning med ultraljud",
    "Lexin029487": "UV-strålning (sol/solarium)",
    "Lexin029489": "Femte grundsmaken (kött/buljong)",
    "Lexin029549": "Fettvävnad under huden",
    "Lexin029550": "Isolerande fett under huden",
    "Lexin029581": "Mandibeln",
    "Lexin029608": "För lite mat/näring",
    "Lexin029690": "Klinik för unga (sex/hälsa)",
    "Lexin029691": "Mottagning för ungdomar",
    "Lexin029795": "Mätning av lungfunktion (PEF)",
    "Lexin029856": "Magen känns svullen",
    "Lexin029857": "Uppblåst mage",
    "Lexin029938": "Hålla balansen",
    "Lexin029939": "Balansera kroppen",
    "Lexin030056": "Kiss",
    "Lexin030058": "Där urinen samlas",
    "Lexin030059": "Blåsan",
    "Lexin030060": "Medicin som ökar urinen (mot ödem)",
    "Lexin030062": "Hur urinen flödar",
    "Lexin030063": "När njurarna inte renas (uremi)",
    "Lexin030064": "Uremi (njursvikt)",
    "Lexin030065": "Att kissa ofrivilligt",
    "Lexin030066": "Läckage av urin",
    "Lexin030067": "Rören från njurarna till blåsan",
    "Lexin030068": "Urin som läcker",
    "Lexin030069": "Odling av bakterier i urinen",
    "Lexin030070": "Test för urinvägsinfektion",
    "Lexin030071": "Njurar, urinledare, blåsa, urinrör",
    "Lexin030072": "Urinvägarna",
    "Lexin030074": "Att inte kunna kissa (stopp)",
    "Lexin030075": "Röret som urinen går ut genom",
    "Lexin030076": "Uretra",
    "Lexin030077": "Akut behov av att kissa",
    "Lexin030078": "Trängningar till att kissa",
    "Lexin030079": "Njurar till urinröret",
    "Lexin030081": "Restprodukt som njurarna renar bort",
    "Lexin030089": "Ur led (luxation)",
    "Lexin030096": "Röntgen av njurar med kontrast",
    "Lexin030128": "Att andas ut",
    "Lexin030171": "Krystfasen vid förlossning",
    "Lexin030186": "Att ta bort som möjlighet",
    "Lexin030297": "Extrem trötthet (burnout)",
    "Lexin030322": "Graviditet utanför livmodern (t.ex. i äggledaren)",
    "Lexin030434": "Att kroppen gör sig av med ämnen",
    "Lexin030466": "Fattiga länder",
    "Lexin030469": "Intellektuell funktionsnedsättning",
    "Lexin030476": "Att vidga (t.ex. pupillen)",
    "Lexin030506": "UVI (urinvägsinfektion)",
    "Lexin030511": "Vad man vaccineras med",
    "Lexin030512": "Att ge vaccin"
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
