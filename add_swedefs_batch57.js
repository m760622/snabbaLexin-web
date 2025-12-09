
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
console.log("Reading data.js...");
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch57.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

console.log("Requiring temp file...");
const dictionaryData = require(tempFile);

const updates = {
    "Lexin017799": "Att ljuga i ett intyg eller använda ett falskt intyg",
    "Lexin017834": "Att säga att man inte accepterar domen (första steget att överklaga)",
    "Lexin017840": "Polisens register över personer som är skäligen misstänkta",
    "Lexin018008": "Att tända eld på hus/egendom",
    "Lexin018075": "Den andra personen i rättegången (fienden)",
    "Lexin018184": "Möte i domstolen innan rättegången för att reda ut vad som gäller",
    "Lexin018186": "Regeln att man måste prata i rätten (inte bara läsa papper)",
    "Lexin018237": "Gåva för att få fördelar",
    "Lexin018240": "Att ge eller ta emot en muta",
    "Lexin018268": "När en tjänsteman använder sin makt fel (brott)",
    "Lexin018269": "När myndigheter fattar beslut som påverkar människor",
    "Lexin018291": "Att vägra lyda order (militär/sjöfart)",
    "Lexin018310": "Rättegång om små summor (småmål)",
    "Lexin018325": "Vårdnadshavare (för barn)",
    "Lexin018328": "Offret i ett brottmål",
    "Lexin018329": "Jurist som hjälper offret i rätten",
    "Lexin018472": "Tester för att bli militär",
    "Lexin018499": "Rätt att hålla möten",
    "Lexin018549": "Brott som handlar om knark",
    "Lexin018602": "Att bli medborgare i ett nytt land",
    "Lexin018671": "Att inte kunna jobba fullt ut pga sjukdom",
    "Lexin018684": "Något blir mindre/lägre",
    "Lexin018703": "Säga nej till anklagelsen",
    "Lexin018820": "Vanlig svårighetsgrad på brottet (inte grovt)",
    "Lexin018828": "Böter med fast belopp (t.ex. fortkörning)",
    "Lexin018856": "Jurist som intygar att dokument är äkta",
    "Lexin018949": "Rätt att använda någons egendom",
    "Lexin018959": "När regeringen kortar ett straff",
    "Lexin018994": "Politiker som dömer tillsammans med domaren",
    "Lexin019021": "Förbud att starta/driva företag",
    "Lexin019022": "Lagen om näringsförbud",
    "Lexin019024": "Företagare",
    "Lexin019027": "Att driva företag",
    "Lexin019039": "Nära släkting (föräldrar, barn, syskon)",
    "Lexin019098": "Nödläge (t.ex. brand/fara)",
    "Lexin019102": "Testamente skrivet i panik (gäller bara kort tid)",
    "Lexin019106": "Rätt att försvara sig med våld",
    "Lexin019111": "Att säga att man accepterar domen (kan inte överklaga sen)",
    "Lexin019150": "Skära i en död kropp för att se dödsorsak",
    "Lexin019185": "Att inte ha pengar att betala skulder (konkursmässig)",
    "Lexin019211": "Måste göras (tvång)",
    "Lexin019241": "När pantbanken tar för hög ränta",
    "Lexin019290": "Advokat som staten betalar för den misstänkte",
    "Lexin019293": "Torg, parker och gator (alla får vara där)",
    "Lexin019299": "Göra känt för alla",
    "Lexin019330": "Ta på någon sexuellt mot deras vilja",
    "Lexin019331": "Att störa eller krafsa på någon",
    "Lexin019379": "När något inte gäller längre",
    "Lexin019444": "Behandla någon sämre pga hudfärg/kön (lagbrott)",
    "Lexin019448": "Gå in där man inte får vara",
    "Lexin019450": "Tvinga någon att göra något (brott)",
    "Lexin019484": "Köra bil utan körkort",
    "Lexin019490": "Använda annans sak utan lov (men inte stöld)",
    "Lexin019536": "Person som företräder någon annan",
    "Lexin019550": "Domen ska gälla direkt (behöver inte vänta)",
    "Lexin019573": "Beslut att personen ska sitta kvar i häktet",
    "Lexin019577": "När myndigheten tar hand om någon (tvång)",
    "Lexin019613": "Titta på beslutet en gång till och kanske ändra det",
    "Lexin019617": "Ny bedömning av ärendet",
    "Lexin019643": "Fakta runt omkring händelsen",
    "Lexin019680": "Under 18 år (kan inte bestämma själv)",
    "Lexin019805": "Böter som polisen skriver ut direkt",
    "Lexin019819": "Oärlig (om pengar)",
    "Lexin019839": "Maffia och gängbrottslighet",
    "Lexin019918": "Att ljuga i rätten (om man är part)",
    "Lexin019930": "Dödsbo som inte är uppdelat än",
    "Lexin019996": "Som sviker ett förtroende",
    "Lexin020171": "Lämna något som säkerhet för lån",
    "Lexin020271": "Brev från ena parten till domstolen",
    "Lexin020392": "Tvätta svarta pengar",
    "Lexin020531": "Utredning om hur brottslingen lever (för straffval)",
    "Lexin020733": "Skyldighet",
    "Lexin020791": "Hålla tal i rätten för sin sak",
    "Lexin020862": "Polisens jobb att lösa brottet",
    "Lexin020887": "Att vara gift med flera samtidigt",
    "Lexin021015": "Hur man brukar döma/göra",
    "Lexin021075": "När brottet är för gammalt för att straffas",
    "Lexin021151": "Få tillbaka pengar för att varan var felaktig",
    "Lexin021204": "Regler för hur rättegången går till",
    "Lexin021360": "Tillfälligt pass (rosa)",
    "Lexin021400": "Utreda om någon får stanna i Sverige",
    "Lexin021410": "Tillstånd att få överklaga till högsta domstolen",
    "Lexin021412": "Tid då man måste sköta sig (annars straff)",
    "Lexin021413": "När prövotiden är slut",
    "Lexin021436": "Psykisk sjukdom",
    "Lexin021441": "Må dåligt psykiskt",
    "Lexin021578": "Precis när man gör brottet",
    "Lexin021579": "Lova att man talar sanning (i papper)",
    "Lexin021581": "Pank (konkursmässig)",
    "Lexin021583": "Starkare misstanke än 'skäligen'",
    "Lexin021896": "Skatt när man säljer hus med vinst",
    "Lexin021928": "Risk att man gör nya brott",
    "Lexin022043": "Skriva in i registret",
    "Lexin022073": "Rätt att kräva tillbaka pengar av den som är skyldig",
    "Lexin022087": "Klaga på en vara",
    "Lexin022104": "Försök att rädda företag från konkurs",
    "Lexin022147": "Rätt att tro på vilken gud man vill",
    "Lexin022160": "Att skickas vidare till en specialist",
    "Lexin022245": "Pass för statslösa",
    "Lexin022248": "Förbud att resa med barn (vid vårdnadstvist)"
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
