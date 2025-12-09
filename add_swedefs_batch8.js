
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch8.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

const dictionaryData = require(tempFile);

const updates = {
    "Lexin001897": "Process för att göra en yta jämn",
    "Lexin001901": "Värde baserat på fastighetens förväntade intäkter",
    "Lexin001917": "Ta bort last från en konstruktion eller fordon",
    "Lexin001922": "Leda bort t.ex. vatten eller elektricitet",
    "Lexin001929": "System för att leda bort smutsvatten",
    "Lexin001930": "Rör som transporterar avloppsvatten",
    "Lexin001931": "Det samlade systemet av avloppsrör i ett område",
    "Lexin001932": "Pump som används för att flytta avloppsvatten",
    "Lexin001934": "Ränna i golv eller mark för att leda bort vatten",
    "Lexin001935": "Vatten som har använts och ska renas",
    "Lexin001954": "Kontroll av mätarställning för t.ex. el eller vatten",
    "Lexin001980": "Plan yta i en trappa eller slänt",
    "Lexin002001": "Lager som skiljer två material åt",
    "Lexin002002": "Anordning för att skilja ämnen åt (t.ex. oljeavskiljare)",
    "Lexin002016": "Dike som grävs för att skära av vattenflöde",
    "Lexin002034": "Del av konstruktion som blir smalare",
    "Lexin002036": "En del av en större helhet (t.ex. vägavsnitt)",
    "Lexin002054": "Mätning av sträckan mellan två punkter",
    "Lexin002057": "Plats för tillfällig förvaring av material",
    "Lexin002062": "Tid för ett material att svalna efter uppvärmning",
    "Lexin002080": "De regler som gäller för avtalet",
    "Lexin002084": "Den typ av avtal som används (t.ex. totalentreprenad)",
    "Lexin002092": "Tiden som avtalet gäller",
    "Lexin002104": "Märke efter ett föremål i ett mjukt material",
    "Lexin002132": "Ritning som visar höjdskillnader på marken",
    "Lexin002138": "Konstruktion som bär upp last över en öppning",
    "Lexin002139": "Beslag som används vid avväxling av balkar",
    "Lexin002145": "Stång som något vrider sig kring",
    "Lexin002146": "Den tyngd som vilar på en fordonsaxel",
    "Lexin002148": "Trycket som en axel utövar mot underlaget",
    "Lexin002149": "Kraft som verkar längs med en axel",
    "Lexin002177": "Ventil som hindrar flöde i motsatt riktning",
    "Lexin002189": "Kar för bad",
    "Lexin002194": "Rum utrustat för personlig hygien",
    "Lexin002220": "Gård på baksidan av ett hus",
    "Lexin002269": "Justering för att uppnå jämvikt (t.ex. i ventilationssystem)",
    "Lexin002274": "Ekonomisk redovisning av tillgångar och skulder",
    "Lexin002284": "Långsträckt bärande byggelement",
    "Lexin002286": "Bro som bärs upp av balkar",
    "Lexin002288": "Utstickande plattform på husfasad",
    "Lexin002289": "Betongplattan som utgör balkongens golv",
    "Lexin002292": "Material (sten/grus) som ger tyngd eller stabilitet",
    "Lexin002293": "Maskin för att sprida ballast på järnväg eller väg",
    "Lexin002302": "Räcke med stolpar (balustrar)",
    "Lexin002323": "Järnband som används för att hålla ihop konstruktioner",
    "Lexin002324": "Lastmaskin på larvfötter",
    "Lexin002327": "Såg med ett oändligt sågblad (band)",
    "Lexin002329": "Våg som väger material på ett transportband",
    "Lexin002344": "Fyllning av jord eller sten för att bygga en bank",
    "Lexin002346": "Höjden på en väg- eller järnvägsbank",
    "Lexin002349": "Att packa jord eller fyllning hårt",
    "Lexin002351": "Påle som används för att förstärka en bank",
    "Lexin002352": "Pålning genom en bank för stabilisering",
    "Lexin002428": "Utformad så att barn inte skadas",
    "Lexin002438": "Mätare som visar höjd baserat på lufttryck",
    "Lexin002444": "Hinder för att skydda eller avgränsa",
    "Lexin002469": "Den lägsta nivån av energieförbrukning",
    "Lexin002471": "Behandling av trä med ånga för att göra det böjligt",
    "Lexin002472": "Ram som utgör grunden för en konstruktion",
    "Lexin002482": "Rum uppvärmt till hög temperatur för svettbad",
    "Lexin002497": "Samling regler för byggande utfärdade av Boverket",
    "Lexin002499": "Avloppsvatten från bad, disk och tvätt",
    "Lexin002508": "Extra material som lämnas för slutlig bearbetning",
    "Lexin002513": "Uppföra byggnader på mark",
    "Lexin002514": "Tomt där det finns en byggnad",
    "Lexin002516": "Samling av byggnader inom ett område",
    "Lexin002517": "Miljön runt och mellan byggnader",
    "Lexin002522": "Trögflytande restprodukt vid tjär- eller oljetillverkning",
    "Lexin002563": "Byggnad som redan finns på platsen",
    "Lexin002564": "Hur marken används idag",
    "Lexin002565": "Ledningar eller service som redan finns i marken",
    "Lexin002574": "Antal boende per ytenhet",
    "Lexin002594": "Tillförsel av fukt",
    "Lexin002625": "Sätta gränser för; minska",
    "Lexin002626": "Upphandling där bara inbjudna får lämna anbud",
    "Lexin002666": "Utredning för att klargöra vad som behöver byggas",
    "Lexin002733": "Hur mycket en konstruktion belastas i förhållande till maxkapacitet",
    "Lexin002734": "Nivån på den last som verkar",
    "Lexin002740": "Vilken sort av last det är (t.ex. vind, snö)",
    "Lexin002741": "Hur lasten varierar över tid",
    "Lexin002742": "De värden som beskriver lastens storlek",
    "Lexin002753": "Anordning för att lysa upp",
    "Lexin002754": "Ritningar som visar armaturernas placering",
    "Lexin002757": "Det värde banken godtar som säkerhet för lån",
    "Lexin002772": "Lager som täcker en yta (t.ex. golvbeläggning)", // Handling Duplicate
    "Lexin002773": "Ytskikt på t.ex. en väg eller golv",
    "Lexin002781": "Företag som hyr ut personal",
    "Lexin002802": "Fixpunkt för höjdmätning",
    "Lexin002859": "Arbete som utförs för att minska arbetslöshet (eller vid kris)",
    "Lexin002860": "Plan för hur man ska agera vid kriser",
    "Lexin002861": "Åtgärd som vidtas för att vara redo för kris",
    "Lexin002865": "Fast berggrund",
    "Lexin002867": "Verktyg för att borra i berg",
    "Lexin002868": "Maskin avsedd för bergborrning",
    "Lexin002872": "Indelning av berg i kvalitetsklasser",
    "Lexin002873": "System för att bedöma bergets egenskaper",
    "Lexin002874": "Krossat bergmaterial",
    "Lexin002875": "Volym av berg",
    "Lexin002876": "Material utvunnet ur berg (sten, grus)",
    "Lexin002877": "Nivån där berget börjar under marken"
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
