
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch5.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

const dictionaryData = require(tempFile);

const updates = {
    "Lexin027774": "Att ta arbetet med sig hem",
    "Lexin028429": "Ämne som eleven väljer själv",
    "Lexin028508": "Granska den (t.ex. en text eller rapport)",
    "Lexin028820": "Städning av trapphus",
    "Lexin029668": "Fråga sig om det är klokt",
    "Lexin029683": "Andelen arbetslösa ungdomar",
    "Lexin029692": "Skola för ungdomar (t.ex. gymnasium)",
    "Lexin029718": "Institution för juridik vid universitet",
    "Lexin030464": "Statlig insats för att hjälpa unga arbetslösa",
    "Lexin030891": "Verkar ha tappat lusten för skolan",
    "Lexin030984": "Studier på högre nivå efter examen",
    "Lexin031060": "Ha som önskemål att arbeta med",
    "Lexin031067": "Vilken uppfinningsrikedom (uttryck)",
    "Lexin031589": "Rum där man väntar (t.ex. hos läkare eller arbetsförmedling)",
    "Lexin031805": "Person som ger råd om yrkes- och studieval",
    "Lexin031825": "Skola för yrkesutbildning",
    "Lexin031827": "Val av framtida yrke",
    "Lexin005345": "Bestämd artikel (den)",
    "Lexin000137": "Pris per styck eller enhet",
    "Lexin000138": "Glastyp av hög kvalitet (AA)",
    "Lexin000140": "Standardavtal för byggnads-, anläggnings- och installationsentreprenader",
    "Lexin000169": "Tydlig och exakt bestämning av position",
    "Lexin000174": "Apparat som absorberar något (t.ex. värme eller ljud)",
    "Lexin000175": "Material som har förmåga att absorbera",
    "Lexin000176": "Ta upp i sig (om vätska, ljud eller ljus)",
    "Lexin000179": "Förmåga hos en yta att absorbera strålning",
    "Lexin000181": "Yta som absorberar ljud",
    "Lexin000182": "Minskning av ljud eller signal genom absorption",
    "Lexin000183": "Kvoten mellan absorberad och infallande energi",
    "Lexin000184": "Filter som tar bort vissa våglängder genom absorption",
    "Lexin000185": "Förmåga att suga upp eller ta till sig",
    "Lexin000217": "Anpassning till nytt klimat eller nya förhållanden",
    "Lexin000225": "Arbete där lönen baseras på prestation/resultat",
    "Lexin000226": "Lön baserad på utfört arbete (ackord)",
    "Lexin000228": "Formellt erkännande av kompetens",
    "Lexin000229": "Anordning för lagring av energi (t.ex. batteri)",
    "Lexin000266": "Hantering och skötsel av organisationens uppgifter",
    "Lexin000269": "Uppgifter som rör pappersarbete och organisation",
    "Lexin000313": "Moraliska principer inom affärslivet",
    "Lexin000314": "Grundläggande tanke bakom ett företags verksamhet",
    "Lexin000317": "Sätt att bedriva affärer",
    "Lexin000318": "Del av marknaden där företaget verkar",
    "Lexin000319": "Dokument som beskriver hur företaget ska nå sina mål",
    "Lexin000320": "Långsiktig plan för företagets affärer",
    "Lexin000333": "Handla enligt moraliska principer",
    "Lexin000339": "Material som sand, grus och krossad sten (ballast/aggregat)",
    "Lexin000386": "Förankring som är spänd och tar last aktivt",
    "Lexin000389": "System där reservdelar arbetar parallellt med huvudsystemet",
    "Lexin000395": "Handling eller sysselsättning",
    "Lexin000399": "Kol som behandlats för att bli mycket absorberande"
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
fs.writeFileSync(dataPath, newContent, 'utf8');
fs.unlinkSync(tempFile);
