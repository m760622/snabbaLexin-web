
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
console.log("Reading data.js...");
let fileContent = fs.readFileSync(dataPath, 'utf8');

const tempFile = path.join(__dirname, 'temp_update_defs_batch60.js');
const exportContent = fileContent.replace('const dictionaryData =', 'module.exports =');
fs.writeFileSync(tempFile, exportContent);

console.log("Requiring temp file...");
const dictionaryData = require(tempFile);

const updates = {
    "Lexin032018": "När tiden gått ut så man inte kan åtalas längre",
    "Lexin032021": "Åklagaren väljer att inte åtala fast brottet är bevisat (t.ex. vid annat straff)",
    "Lexin032038": "Att lämna tillbaka pengar",
    "Lexin032047": "Att börja begå brott igen",
    "Lexin032059": "När hovrätten skickar tillbaka målet till tingsrätten",
    "Lexin032071": "Att ta tillbaka något (t.ex. ett erkännande eller ansökan)",
    "Lexin032109": "Något man gör för att fixa ett problem",
    "Lexin032192": "Skäl som gör att man inte får gifta sig (t.ex. under 18 eller redan gift)",
    "Lexin032250": "Att ändra vad man begär i rättegången",
    "Lexin032282": "Brott där man förtalar eller skämmer ut någon",
    "Lexin032289": "Myndigheten slutar jobba med ärendet",
    "Lexin032391": "som gäller båda två",
    "Lexin032521": "Avtal eller pakt",
    "Lexin032533": "Kommunal nämnd som kontrollerar förmyndare och gode män",
    "Lexin032538": "Att hota vittnen eller domare",
    "Lexin032563": "Klaga på en dom till högre instans",
    "Lexin032566": "Brevet där man skriver att man överklagar",
    "Lexin032591": "Att ge eller sälja rätten till något",
    "Lexin032592": "Köpa eller sälja hus",
    "Lexin032679": "Ta ut mer pengar än som finns på kontot",
    "Lexin032681": "Brott mot en regel",
    "Lexin001195": "ett av två val",
    "Lexin001682": "ord som binder ihop satser",
    "Lexin006342": "därför att",
    "Lexin006556": "alternativt",
    "Lexin017564": "fastän",
    "Lexin027523": "både det ena och det andra",
    "Lexin030703": "oavsett om",
    "Lexin030722": "inget av alternativen",
    "Lexin032392": "växlande (ena stunden si, andra så)",
    "Lexin001085": "Väg som leder in på en större väg (motorväg)",
    "Lexin001835": "Gasen som kommer ut ur bilen",
    "Lexin001836": "Utsläpp från bilen",
    "Lexin001837": "Röret där avgaserna kommer ut",
    "Lexin002175": "Högsta punkten på en backe (där sikten är skymd)",
    "Lexin003335": "Särskild stol för barn i bilen",
    "Lexin003563": "Använda blinkers",
    "Lexin003825": "Dra en annan bil med lina",
    "Lexin003827": "Linan man bogserar med",
    "Lexin004176": "Del av bromssystemet (inuti hjulet)",
    "Lexin004963": "Knapp för att starta kall motor (på äldre bilar)",
    "Lexin005835": "Anordning för att dra släpvagn",
    "Lexin005850": "Kroken bak på bilen för släp",
    "Lexin007331": "När man inte märker att man kör för fort",
    "Lexin007973": "Rem som driver fläkten i motorn",
    "Lexin008304": "Stabilt sidoläge (för medvetslösa)",
    "Lexin009071": "Vanlig bilmotor (bensin/diesel)",
    "Lexin010147": "Rem i motorn som driver generatorn",
    "Lexin010906": "Lika långsamt som man går (ca 5-7 km/h)",
    "Lexin011068": "Bana där man tränar att köra på halt väglag",
    "Lexin011821": "Stor bil som man kan bo i",
    "Lexin012304": "Regel att man ska lämna företräde åt höger",
    "Lexin013036": "Panelen framför ratten med mätare",
    "Lexin013676": "Del i motorn som styr ventilerna",
    "Lexin014890": "Pedalen längst till vänster (på manuell bil)",
    "Lexin015749": "Papper på att man får övningsköra",
    "Lexin015750": "Blinkers",
    "Lexin021988": "Upphöjning i gatan som delar körbanor",
    "Lexin022051": "Det blåa och gula papperet till bilen",
    "Lexin022053": "Skylten med bilens nummer",
    "Lexin022543": "Kurs om faror i trafiken (Halkan)",
    "Lexin026402": "Reaktionssträcka + bromssträcka",
    "Lexin028156": "Bil som klarar svår terräng (Jeep)",
    "Lexin028983": "Myndigheten som sköter vägar och tåg",
    "Lexin029186": "Del som ger motorn mer effekt",
    "Lexin031488": "Där vägar möts",
    "Lexin000125": "Smittsam gulsot (virus)",
    "Lexin000153": "När t.ex. en led rör sig fel",
    "Lexin000154": "Konstiga reaktioner",
    "Lexin000155": "Blodgrupperna A, B, AB och 0",
    "Lexin000162": "Avbrytande av graviditet",
    "Lexin000166": "Varböld",
    "Lexin000180": "Upptagning (av t.ex. näring eller medicin)",
    "Lexin000205": "Medicin mot högt blodtryck",
    "Lexin000207": "Luktar som nagellackborttagning (vid diabeteskoma)",
    "Lexin000239": "Förmåga att anpassa sig",
    "Lexin000240": "Ögats anpassning till ljus/mörker",
    "Lexin000243": "Damp/ADHD utan hyperaktivitet",
    "Lexin000245": "Sjukdom i binjurarna (brist på kortisol)",
    "Lexin000251": "Hormon som minskar urinmängden",
    "Lexin000252": "Koncentrationssvårigheter och överaktivitet",
    "Lexin000263": "Träning att klara vardagen (äta, klä på sig)",
    "Lexin000282": "Stresshormon (kick)",
    "Lexin000297": "Talsvårigheter efter stroke",
    "Lexin000303": "Sjukdomar som påverkar känslorna (depression/mani)",
    "Lexin000305": "Nerver som leder in till hjärnan (känsel)",
    "Lexin000337": "När blodkroppar klumpar ihop sig",
    "Lexin000347": "Svår brist på vita blodkroppar",
    "Lexin000352": "Sjukdom som slår ut immunförsvaret (HIV)",
    "Lexin000387": "Vaccination",
    "Lexin000388": "När kroppen själv bildar antikroppar",
    "Lexin000391": "Sätts igång",
    "Lexin000414": "Plötslig och kraftig (motsats till kronisk)",
    "Lexin000415": "Akut ont i magen (t.ex. blindtarm)",
    "Lexin000416": "Njurinflammation (akut)",
    "Lexin000417": "Förkylning i luftrören",
    "Lexin000418": "När njurarna plötsligt slutar fungera",
    "Lexin000419": "Ledinflammation i flera leder samtidigt",
    "Lexin000420": "Njurbäckeninflammation",
    "Lexin000423": "När man inte kan kissa (totalstopp)"
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
